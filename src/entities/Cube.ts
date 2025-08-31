import { Canvas } from "./Canvas.ts";
import type { IGameObject } from "../types/GameObject.ts";
import type { IPosition } from "../types/Main.ts";
import { Bullet } from "./Bullet.ts";
import { BulletIndicator } from "./BulletIndicator.ts";
import { Sight } from "./Sight.ts";

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
  center: IPosition;
  bullets: Bullet[];
  nextBulletIndex = 0;
  bulletAmount = 10;
  bulletIndicator: BulletIndicator;
  sight: Sight;
  fireBlockingState = false;

  constructor() {
    super();
    this.velocity = 10;
    this.position = { x: 0, y: 0 };
    this.direction = { Up: false, Down: false, Left: false, Right: false };
    this.mousePosition = { x: 0, y: 0 };
    this.center = { x: 0, y: 0 };
    this.sight = new Sight();
    this.bullets = Array.from(
      { length: this.bulletAmount },
      () => new Bullet(),
    );
    this.bulletIndicator = new BulletIndicator();
    this.initEventListeners();
    this.animate();
    this.initRenderBulletCount();
  }

  getBulletAmountText() {
    return `Bullets: ${this.bulletAmount - this.nextBulletIndex}`;
  }

  initRenderBulletCount() {
    const bulletCountBody = document.createElement("div");
    bulletCountBody.setAttribute("id", "bullet-count");
    bulletCountBody.innerText = this.getBulletAmountText();
    document.body.appendChild(bulletCountBody);
  }

  updateBulletCountText() {
    document.querySelector("#bullet-count")!.innerHTML =
      this.getBulletAmountText();
  }

  setFireBlockingState(state: boolean) {
    this.fireBlockingState = state;
  }

  rechargeBullets() {
    this.setFireBlockingState(true);
    this.nextBulletIndex = 0;
    this.bulletAmount = 0;
    this.updateBulletCountText();
    this.bulletIndicator.reset(() => {
      this.bulletAmount++;
      this.updateBulletCountText();
      const isFullBullets = this.bulletAmount === 10;
      this.setFireBlockingState(!isFullBullets);
    });
  }

  initEventListeners() {
    addEventListener("keydown", (event) => {
      if (event.key.toLowerCase() === "r") {
        this.rechargeBullets();
      }
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

        this.sight.updatePosition({ x: canvasX, y: canvasY });
      }
    });

    this.canvas.addEventListener("mousedown", () => {
      if (this.fireBlockingState) return;
      if (this.nextBulletIndex >= 10) return;
      this.bullets[this.nextBulletIndex].setPosition(this.center);
      this.bullets[this.nextBulletIndex].setDirection(
        this.calculationDirectionForBullet(),
      );
      this.bullets[this.nextBulletIndex].activate();
      this.nextBulletIndex++;
      this.updateBulletCountText();
      this.bulletIndicator.update();
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

    this.bulletIndicator.draw();
    this.sight.draw();
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
