import type { IApplication } from "../types/application";

type InitOption = {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    backgroundColor: string;
}
export class Application implements IApplication {
    public canvas: HTMLCanvasElement;
    public width: number;
    public height: number;
    public gl: WebGL2RenderingContext;
    constructor({ canvas, width, height, backgroundColor }: InitOption) {
        this.canvas = canvas;
        this.resize(width, height)
        this.canvas.style.backgroundColor = backgroundColor;
        this.gl = canvas.getContext("webgl2") as WebGL2RenderingContext;
    }

    resize(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.canvas.width = width;
        this.canvas.height = height;
    }
}