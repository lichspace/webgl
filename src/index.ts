import { Application } from "./application";
import { createAttributeSetters, createBufferInfoFromArrays, setAttributes, createVAOAndSetAttributes, drawBufferInfo } from "./utils";

const app = new Application({
    canvas: document.querySelector("canvas") as HTMLCanvasElement,
    width: 800,
    height: 600,
    backgroundColor: '#000',
});
const { gl } = app;

async function renderTriangles() {
    const program = await Application.autoCreateProgram(gl, './shader/triangle.vert', './shader/triangle.frag');
    gl.useProgram(program);

    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer( positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    const u_color = gl.getUniformLocation(program, "u_color");

    document.addEventListener('click', ()=>{
        for (let index = 0; index < 10; index++) {
            const positions = [ Math.random(), 0, 0, Math.random(), Math.random(), 0];
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

            gl.uniform3f(u_color, Math.random(), Math.random(), Math.random());
            gl.drawArrays(gl.TRIANGLES, 0, 3);
        }
    })

}

renderTriangles();