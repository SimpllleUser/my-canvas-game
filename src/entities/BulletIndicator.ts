import { Canvas } from "./Canvas.ts";
import type { IPosition } from "../types/Main.ts";

const element = {
  width: 200,
  height: 20,
};

const elementBulletPoint = {
  width: 20,
  height: 20,
  color: "green",
};

export class BulletIndicator extends Canvas {
  position: IPosition;
  bulletPoints: IPosition[];
  element = element;
  constructor() {
    super();
    this.position = { x: 0, y: this.canvas.height - 20 };
    this.bulletPoints = Array.from({ length: 10 }).map((_, index) => ({
      x: elementBulletPoint.width * index,
      y: this.canvas.height - 20,
    }));
  }

  update() {
    this.bulletPoints.pop();
  }

  drawBulletPoints({ x, y }: IPosition) {
    this.ctx.save();
    this.ctx.beginPath();
    // Draw filled rectangle
    this.ctx.fillStyle = elementBulletPoint.color;
    this.ctx.fillRect(
      x,
      y,
      elementBulletPoint.width,
      elementBulletPoint.height,
    );
    // Draw border
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(
      x,
      y,
      elementBulletPoint.width,
      elementBulletPoint.height,
    );
    this.ctx.restore();
  }

  drawWrapperIndicator() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.rect(
      this.position.x,
      this.position.y,
      this.element.width,
      this.element.height,
    );
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    this.ctx.restore();
  }

  draw() {
    this.drawWrapperIndicator();
    this.bulletPoints.forEach((bulletPoint) => {
      this.drawBulletPoints(bulletPoint);
    });
  }
}
