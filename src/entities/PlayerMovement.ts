import type { IElement, IPosition } from "../types/Main.ts";
import { Canvas } from "./Canvas.ts";

enum KeyCodes {
  ArrowRight = 68,
  ArrowLeft = 65,
  ArrowUp = 87,
  ArrowDown = 83,
}

interface Directions {
  Up: boolean;
  Down: boolean;
  Left: boolean;
  Right: boolean;
}
const VELOCITY = 10;

export class PlayerMovement extends Canvas {
  direction: Directions;
  velocity: number;
  element: IElement;

  constructor(element: IElement) {
    super();
    this.element = element;
    this.velocity = VELOCITY;
    this.direction = { Up: false, Down: false, Left: false, Right: false };
    this.initKeyEventListener();
  }

  initKeyEventListener() {
    addEventListener("keydown", (event) => {
      const { keyCode } = event;
      this.moveRight(keyCode, true);
      this.moveLeft(keyCode, true);
      this.moveUp(keyCode, true);
      this.moveBottom(keyCode, true);
    });

    addEventListener("keyup", (event) => {
      const { keyCode } = event;

      this.moveRight(keyCode, false);
      this.moveLeft(keyCode, false);
      this.moveUp(keyCode, false);
      this.moveBottom(keyCode, false);
    });
  }

  moveRight(keyCode: KeyCodes, state: boolean) {
    if (keyCode === KeyCodes.ArrowRight) {
      this.direction.Right = state;
    }
  }

  moveLeft(keyCode: KeyCodes, state: boolean) {
    if (keyCode === KeyCodes.ArrowLeft) {
      this.direction.Left = state;
    }
  }

  moveUp(keyCode: KeyCodes, state: boolean) {
    if (keyCode === KeyCodes.ArrowUp) {
      this.direction.Up = state;
    }
  }

  moveBottom(keyCode: KeyCodes, state: boolean) {
    if (keyCode === KeyCodes.ArrowDown) {
      this.direction.Down = state;
    }
  }

  setMoveDirection(position: IPosition) {
    const { canRight, canLeft, canUp, canDown } = this.canMove(position);
    if (this.direction.Right && canRight) {
      position.x += this.velocity;
    }
    if (this.direction.Left && canLeft) {
      position.x -= this.velocity;
    }
    if (this.direction.Up && canUp) {
      position.y -= this.velocity;
    }
    if (this.direction.Down && canDown) {
      position.y += this.velocity;
    }
  }

  canMove(position: IPosition) {
    const canRight =
      position.x + this.element.width + this.velocity < this.canvas.width;
    const canLeft = position.x > 0;
    const canUp = position.y > 0;
    const canDown =
      position.y + this.element.height + this.velocity < this.canvas.height;

    return {
      canRight,
      canLeft,
      canUp,
      canDown,
    };
  }
}
