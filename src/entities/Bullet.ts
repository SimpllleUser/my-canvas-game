import { Canvas } from "./Canvas.ts";
import type { IPosition } from "../types/Main.ts";

const element = {
  width: 5,
  height: 5,
  color: "red",
};

export class Bullet extends Canvas {
  element = element;
  position: IPosition;
  direction: IPosition;
  isActive: boolean;
  speed: number;
  constructor() {
    super();
    this.position = { x: 0, y: 0 };
    this.direction = { x: 0, y: 0 };
    this.isActive = false;
    this.speed = 5;
  }

  setPosition({ x, y }: IPosition) {
    this.position = { x, y };
  }

  setDirection({ x, y }: IPosition) {
    this.direction = { x, y };
  }

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }

  draw() {
    if (!this.isActive) return;
    this.ctx.save();
    this.ctx.fillStyle = this.element.color;
    this.ctx.beginPath();
    this.ctx.arc(
      this.position.x,
      this.position.y,
      this.element.width * 5,
      0,
      2 * Math.PI,
    );
    this.ctx.fill();
    this.ctx.restore();
  }

  update() {
    this.position.x += this.direction.x * this.speed;
    this.position.y += this.direction.y * this.speed;
    if (this.position.x > this.canvas.width || this.position.x < 0) {
      this.deactivate();
    }
  }
}
