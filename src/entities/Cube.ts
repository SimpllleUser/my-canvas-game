import { Canvas } from "./Canvas.ts";
import type { IGameObject } from "../types/GameObject.ts";
import type { IPosition } from "../types/Main.ts";
import { Projectile } from "./Projectile.ts";
import { Bullet } from "./Bullet.ts";

const ELEMENT = {
  width: 50,
  height: 50,
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
  mousePosition: IPosition;
  projectile: Projectile;
  center: IPosition;
  bullets: Bullet[];
  nextBulletIndex = 0;

  constructor() {
    super();
    this.velocity = 10;
    this.position = { x: 0, y: 0 };
    this.direction = { Up: false, Down: false, Left: false, Right: false };
    this.mousePosition = { x: 0, y: 0 };
    this.center = { x: 0, y: 0 };
    this.projectile = new Projectile();
    this.bullets = Array.from({ length: 10 }, () => new Bullet());
    this.initEventListeners();
    this.animate();
  }

  initEventListeners() {
    addEventListener("keydown", (event) => {
      this.moveRight(event, true);
      this.moveLeft(event, true);
      this.moveUp(event, true);
      this.moveBottom(event, true);
    });

    addEventListener("keyup", (event) => {
      this.moveRight(event, false);
      this.moveLeft(event, false);
      this.moveUp(event, false);
      this.moveBottom(event, false);
    });

    this.canvas.addEventListener("mousemove", ({ x, y }: MouseEvent) => {
      const { scale } = this.getData();
      const canvasX = x / scale;
      const canvasY = y / scale;

      if (
        canvasX > 0 &&
        canvasY > 0 &&
        canvasX < this.canvas.width &&
        canvasY < this.canvas.height
      ) {
        this.center = {
          x: this.position.x + this.element.width / 2,
          y: this.position.y + this.element.height / 2,
        };
        this.mousePosition = {
          x: canvasX - this.center.x,
          y: canvasY - this.center.y,
        };
        this.projectile.setStart(this.center);
        this.projectile.setTo({ x: canvasX, y: canvasY });
      }
    });

    this.canvas.addEventListener("mousedown", () => {
      this.projectile.canRender = true;
      if (this.nextBulletIndex >= 10) return;
      this.bullets[this.nextBulletIndex].setPosition(this.center);
      this.bullets[this.nextBulletIndex].setDirection(
        this.calculationDirectionForBullet(),
      );
      this.bullets[this.nextBulletIndex].activate();
      this.nextBulletIndex++;
    });
  }

  calculationDirectionForBullet() {
    const { x: dx, y: dy } = this.mousePosition;
    const magnitude = Math.sqrt(dx * dx + dy * dy);
    const directionX = magnitude > 0 ? dx / magnitude : 0;
    const directionY = magnitude > 0 ? dy / magnitude : 0;
    return { x: directionX, y: directionY };
  }

  sightCalculationAngel() {
    const { x, y } = this.mousePosition;
    const angle = Math.atan2(y, x);
    const ARC_WIDTH = Math.PI;
    return {
      angle,
      startAngle: angle - ARC_WIDTH / 2,
      endAngle: angle + ARC_WIDTH / 2,
    };
  }

  drawSight() {
    const { startAngle, endAngle } = this.sightCalculationAngel();
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(
      this.position.x + this.element.width / 2,
      this.position.y + this.element.height / 2,
      this.element.width * 0.6,
      startAngle,
      endAngle,
    );
    this.ctx.strokeStyle = "orange";
    this.ctx.lineWidth = 5;
    this.ctx.stroke();
    this.ctx.restore();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();

    this.bullets.forEach((bullet) => {
      bullet.update();
      bullet.draw();
    });

    this.ctx.fillStyle = this.element.color;
    this.canMove() && this.setMoveDirection();
    this.drawSight();
    this.ctx.fillRect(
      this.position.x,
      this.position.y,
      this.element.width,
      this.element.height,
    );

    this.projectile.draw();
    this.ctx.restore();
  }

  animate() {
    this.draw();
    requestAnimationFrame(() => this.animate());
  }

  canMove() {
    const canRight =
      this.position.x + this.element.width + this.velocity < this.canvas.width;
    const canLeft = this.position.x > 0;
    const canUp = this.position.y > 0;
    const canDown =
      this.position.y + this.element.height + this.velocity <
      this.canvas.height;

    return {
      canRight,
      canLeft,
      canUp,
      canDown,
    };
  }

  setMoveDirection() {
    const { canRight, canLeft, canUp, canDown } = this.canMove();
    if (this.direction.Right && canRight) {
      this.position.x += this.velocity;
    }
    if (this.direction.Left && canLeft) {
      this.position.x -= this.velocity;
    }
    if (this.direction.Up && canUp) {
      this.position.y -= this.velocity;
    }
    if (this.direction.Down && canDown) {
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
