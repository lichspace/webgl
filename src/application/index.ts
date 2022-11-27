import type { IApplication } from "../types/application";

type InitOption = {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    backgroundColor: string;
}
export class Application implements IApplication {
    static async fetchText(url: string) {
        return await fetch(url).then((response) => response.text());
    }

    static createShader(gl: WebGL2RenderingContext, type: number, source: string) {
        const shader = gl.createShader(type) as WebGLShader;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (success) {
            return shader;
        }
        gl.deleteShader(shader);
    }

    static createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
        const program = gl.createProgram() as WebGLProgram;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        const success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (success) {
            return program;
        }
        gl.deleteProgram(program);
    }

    static async autoCreateProgram(gl: WebGL2RenderingContext, vertUrl: string, fragUrl: string) {
        const vertexShaderSource = await this.fetchText(vertUrl);
        const fragmentShaderSource = await this.fetchText(fragUrl);
        const vertexShader = this.createShader(gl, gl.VERTEX_SHADER, vertexShaderSource) as WebGLShader;
        const fragmentShader = this.createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource) as WebGLShader;

        // Link the two shaders into a program
        const program = this.createProgram(gl, vertexShader, fragmentShader);
        gl.useProgram(program as WebGLProgram);
        return program as WebGLProgram;
    }

    public canvas: HTMLCanvasElement;
    public width!: number;
    public height!: number;
    public gl: WebGL2RenderingContext;
    constructor({ canvas, width, height, backgroundColor }: InitOption) {
        this.canvas = canvas;
        this.gl = canvas.getContext("webgl2") as WebGL2RenderingContext;
        this.resize(width, height)
        this.canvas.style.backgroundColor = backgroundColor;
    }

    resize(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.canvas.width = width;
        this.canvas.height = height;
        this.gl.viewport(0, 0, width, height);
    }

    clear() {
        // Clear the canvas
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
}