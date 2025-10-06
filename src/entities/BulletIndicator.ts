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
  element: { width: number; height: number };
  amountOfBullets: number;
  constructor(amountOfBullets: number) {
    super();
    this.amountOfBullets = amountOfBullets;
    this.element = { ...element, width: amountOfBullets * 20 };
    this.position = { x: 0, y: this.canvas.height - 20 };
    this.bulletPoints = this.getFullBulletPoints();
  }

  getFullBulletPoints() {
    return Array.from({ length: this.amountOfBullets }).map((_, index) => ({
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

  reset(onReset: CallableFunction = () => {}, intervalDuration?: number) {
    const newBullets = this.getFullBulletPoints();
    let indexBullet = 0;
    this.bulletPoints = [];
    let interval = setInterval(() => {
      this.bulletPoints.push(newBullets[indexBullet]);
      indexBullet++;
      onReset();
      if (indexBullet >= newBullets.length) clearInterval(interval);
    }, intervalDuration);
  }
}
