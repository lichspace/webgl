import { Application } from "./application";
import { createImageTexture } from "./image/creatImageTexture";
import { loadImage } from "./image/loadImg";
import { bindBuffer, setUniform } from "./utils2";

const app = new Application({
  canvas: document.querySelector("canvas") as HTMLCanvasElement,
  width: 800,
  height: 600,
  backgroundColor: "#000",
});
const { gl } = app;

async function renderTriangles() {
  const program = await Application.autoCreateProgram(
    gl,
    "./shader/triangle.vert",
    "./shader/triangle.frag"
  );

  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());

  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

  const u_color = gl.getUniformLocation(program, "u_color");

  document.addEventListener("click", () => {
    for (let index = 0; index < 10; index++) {
      const positions = [Math.random(), 0, 0, Math.random(), Math.random(), 0];
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(positions),
        gl.STATIC_DRAW
      );

      gl.uniform3f(u_color, Math.random(), Math.random(), Math.random());
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
  });
}

// renderTriangles();

async function renderImage() {
  const image = await loadImage("/assets/img/apple.png");
  const program = await Application.autoCreateProgram(
    gl,
    "./shader/image.vert",
    "./shader/image.frag"
  );

  // Create a vertex array object (attribute state)
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);

  bindBuffer({
    gl,
    program,
    name: "a_position",
    rectangle: [(app.width - image.width)/2, (app.height - image.height)/ 2, image.width, image.height],
  });

  bindBuffer({
    gl,
    program,
    name: "a_texCoord",
    rectangle: [0.0, 0.0, 1.0, 1.0],
  });

  const imageTextureNumber = createImageTexture(gl, image);

  setUniform({
    gl,
    program,
    type: "uniform2f",
    name: "u_resolution",
    data: [gl.canvas.width, gl.canvas.height],
  });

  setUniform({
    gl,
    program,
    type: "uniform1i",
    name: "u_image",
    data: [imageTextureNumber],
  });

  app.clear();
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

renderImage();
