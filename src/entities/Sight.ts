import { Canvas } from "./Canvas.ts";
import type { IPosition } from "../types/Main.ts";

const element = {
  width: 10,
  height: 5,
  color: "grey",
};

export class Sight extends Canvas {
  position: IPosition;
  gapSize = 10;

  constructor() {
    super();
    this.position = { x: 0, y: 0 };
    document.getElementById("canvas")!.style.cursor = "none";
  }

  updatePosition({ x, y }: IPosition) {
    this.position = { x, y };
  }

  drawSightPart(rotateAngle: number) {
    this.ctx.save();
    this.ctx.translate(this.position.x, this.position.y);
    this.ctx.rotate(rotateAngle);
    this.ctx.translate(this.gapSize, 0);
    this.ctx.fillStyle = element.color;
    this.ctx.fillRect(
      -element.width / 2,
      -element.height / 2,
      element.width,
      element.height,
    );
    this.ctx.restore();
  }

  draw() {
    Array.from({ length: 4 }).forEach((_, index) => {
      const rotateAngle = (index * Math.PI) / 2;
      this.drawSightPart(rotateAngle);
    });
  }
}
