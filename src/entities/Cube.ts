import { Canvas } from "./Canvas.ts";
import type { IObject } from "../types/GameObject.ts";

const ELEMENT = {
  width: 15,
  height: 15,
  color: "blue",
};

export class Cube extends Canvas implements IObject {
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
