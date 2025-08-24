import type { IPosition } from "../types/Main.ts";
import type { IGameObject } from "../types/GameObject.ts";
import { Canvas } from "./Canvas.ts";

const color = "red";

export class Projectile extends Canvas implements IGameObject {
  canRender: boolean;
  positionStart: IPosition;
  positionTo: IPosition;

  constructor() {
    super();
    this.positionStart = { x: 0, y: 0 };
    this.positionTo = { x: 0, y: 0 };
    this.canRender = false;
  }

  draw() {
    if (!this.canRender) return;
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(this.positionStart.x, this.positionStart.y);
    this.ctx.lineTo(this.positionTo.x, this.positionTo.y);
    this.ctx.strokeStyle = color;
    this.ctx.stroke();

    // this.ctx.restore();
    // ctx.beginPath();
    // ctx.moveTo(0, 0);
    // ctx.lineTo(300, 150);
    // ctx.stroke();
    setTimeout(() => {
      this.canRender = false;
    }, 100);
  }

  setStart({ x, y }: IPosition) {
    this.positionStart = { x, y };
  }
  setTo({ x, y }: IPosition) {
    this.positionTo = { x, y };
  }
}
