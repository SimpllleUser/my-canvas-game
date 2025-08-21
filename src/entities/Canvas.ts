const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;

export class Canvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d")!;

    addEventListener("load", this.setSizeCanvas);
    addEventListener("resize", this.setSizeCanvas);
  }

  private setSizeCanvas() {
    const scale = Math.min(
      window.innerWidth / GAME_WIDTH,
      window.innerHeight / GAME_HEIGHT,
    );
    this.canvas.width = GAME_WIDTH;
    this.canvas.height = GAME_HEIGHT;
    this.canvas.style.width = `${GAME_WIDTH * scale - 10}px`;
    this.canvas.style.height = `${GAME_HEIGHT * scale}px`;
  }

  getData() {
    return { canvas: this.canvas, ctx: this.ctx };
  }
}
