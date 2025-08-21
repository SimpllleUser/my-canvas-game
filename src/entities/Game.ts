import type { Canvas } from "./Canvas.ts";

const element = {
  width: 15,
  height: 15,
  color: "blue",
};

export class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  constructor(canvas: Canvas) {
    this.canvas = canvas.getData().canvas;
    this.ctx = canvas.getData().ctx;
  }

  draw() {
    this.ctx.save();
    this.ctx.fillStyle = element.color;
    this.ctx.fillRect(0, 0, element.width, element.height);
    this.ctx.restore();
  }

  run() {
    setInterval(() => {
      this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.draw();
    }, 16);
  }
}
