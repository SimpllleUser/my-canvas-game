import { Canvas } from "./Canvas.ts";
import type { IGameObject } from "../types/GameObject.ts";

export class Game extends Canvas {
  objects: IGameObject[];

  constructor(objects: IGameObject[]) {
    super();
    this.objects = objects;
  }

  setObject(object: IGameObject) {
    this.objects.push(object);
  }

  run() {
    setInterval(() => {
      this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.objects.forEach((object) => object.draw());
    }, 16);
  }
}
