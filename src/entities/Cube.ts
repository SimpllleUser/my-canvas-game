import { Canvas } from "./Canvas.ts";
import type { IGameObject } from "../types/GameObject.ts";
import type { IPosition } from "../types/Main.ts";

const ELEMENT = {
  width: 15,
  height: 15,
  color: "blue",
};

interface Directions {
  Up: boolean;
  Down: boolean;
  Left: boolean;
  Right: boolean;
}

export class Cube extends Canvas implements IGameObject {
  element = ELEMENT;

  velocity: number;
  position: IPosition;
  direction: Directions;

  constructor() {
    super();

    this.velocity = 10;
    this.position = {
      x: 0,
      y: 0,
    };
    this.direction = {
      Up: false,
      Down: false,
      Left: false,
      Right: false,
    };

    addEventListener("keydown", (event) => {
      this.moveRight(event, true);
      this.moveLeft(event, true);
      this.moveUp(event, true);
      this.moveBottom(event, true);
      this.setMoveDirection();
    });
    addEventListener("keyup", (event) => {
      this.moveRight(event, false);
      this.moveLeft(event, false);
      this.moveUp(event, false);
      this.moveBottom(event, false);
      this.setMoveDirection();
    });
  }

  draw() {
    this.ctx.save();
    this.ctx.fillStyle = this.element.color;
    this.ctx.fillRect(
      this.position.x,
      this.position.y,
      this.element.width,
      this.element.height,
    );
    this.ctx.restore();
  }

  setMoveDirection() {
    if (this.direction.Right) {
      this.position.x += this.velocity;
    }
    if (this.direction.Left) {
      this.position.x -= this.velocity;
    }
    if (this.direction.Up) {
      this.position.y -= this.velocity;
    }
    if (this.direction.Down) {
      this.position.y += this.velocity;
    }
  }

  moveRight({ key }: KeyboardEvent, state: boolean) {
    if (key === "ArrowRight" || key.toLowerCase() === "d") {
      this.direction.Right = state;
    }
  }
  moveLeft({ key }: KeyboardEvent, state: boolean) {
    if (key === "ArrowLeft" || key.toLowerCase() === "a") {
      this.direction.Left = state;
    }
  }
  moveUp({ key }: KeyboardEvent, state: boolean) {
    if (key === "ArrowUp" || key.toLowerCase() === "w") {
      this.direction.Up = state;
    }
  }
  moveBottom({ key }: KeyboardEvent, state: boolean) {
    if (key === "ArrowDown" || key.toLowerCase() === "s") {
      this.direction.Down = state;
    }
  }
}
