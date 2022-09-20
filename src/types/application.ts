export interface IApplication {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    gl: WebGL2RenderingContext;
    resize(width: number, height: number ): void
}