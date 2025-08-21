import { Canvas } from "./Canvas.ts";
import type { IGameObject } from "../types/GameObject.ts";

const ELEMENT = {
  width: 15,
  height: 15,
  color: "blue",
};

export class Cube extends Canvas implements IGameObject {
  element = ELEMENT;

  constructor() {
    super();
  }

  draw() {
    this.ctx.save();
    this.ctx.fillStyle = this.element.color;
    this.ctx.fillRect(0, 0, this.element.width, this.element.height);
    this.ctx.restore();
  }
}
