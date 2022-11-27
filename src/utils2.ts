export function setRectangleBufferData(
  gl: WebGL2RenderingContext,
  x: number,
  y: number,
  width: number,
  height: number
) {
  const x1 = x;
  const x2 = x + width;
  const y1 = y;
  const y2 = y + height;
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
    gl.STATIC_DRAW
  );
}

export function bindBuffer({
  gl,
  program,
  name,
  rectangle,
}: {
  gl: WebGL2RenderingContext;
  program: WebGLProgram;
  name: string;
  rectangle?: [x: number, y: number, width: number, height: number];
}) {
  const location = gl.getAttribLocation(program, name);
  const buf = gl.createBuffer();

  gl.enableVertexAttribArray(location);
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);

  if (rectangle) {
    const [x, y, width, height] = rectangle;
    setRectangleBufferData(gl, x, y, width, height);
  }

  gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
}

export function setUniform({
  gl,
  program,
  type,
  name,
  data,
}: {
  gl: WebGL2RenderingContext;
  program: WebGLProgram;
  type: "uniform2f" | "uniform1i";
  name: string;
  data: number[];
}) {
  const location = gl.getUniformLocation(program, name);
  //   gl.uniform2f(location, .1, 0.0);
  gl[type](location, ...data);
}
