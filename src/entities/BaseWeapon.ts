import { BulletIndicator } from "./BulletIndicator.ts";
import { Bullet } from "./Bullet.ts";
import { Canvas } from "./Canvas.ts";
import type { IPosition } from "../types/Main.ts";

export class BaseWeapon extends Canvas {
  bullets: Bullet[];
  nextBulletIndex = 0;
  bulletAmount = 10;
  bulletIndicator: BulletIndicator;
  fireBlockingState: boolean;
  mousePosition: IPosition;
  center: IPosition;

  constructor() {
    super();
    this.bullets = Array.from(
      { length: this.bulletAmount },
      () => new Bullet(),
    );
    this.bulletIndicator = new BulletIndicator();
    this.fireBlockingState = false;
    this.initRenderBulletCount();
    this.initEventListeners();
    this.initMouseDownEvent();
    this.mousePosition = { x: 0, y: 0 };
    this.center = { x: 0, y: 0 };
  }

  updateCenter(position: IPosition) {
    this.center = position;
  }
  updateMousePosition(position: IPosition) {
    this.mousePosition = position;
  }

  getBulletAmountText() {
    return `Bullets: ${this.bulletAmount - this.nextBulletIndex}`;
  }

  initRenderBulletCount() {
    const bulletCountBody = document.createElement("div");
    bulletCountBody.setAttribute("id", "bullet-count");
    bulletCountBody.innerText = this.getBulletAmountText();
    document.querySelector("#app")!.appendChild(bulletCountBody);
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
        if (this.fireBlockingState) return;
        this.rechargeBullets();
      }
    });
  }

  initMouseDownEvent() {
    this.canvas.addEventListener("mousedown", () => {
      if (this.fireBlockingState) return;
      if (this.nextBulletIndex >= 10) return;
      this.bullets[this.nextBulletIndex].setPosition(this.center);
      this.bullets[this.nextBulletIndex].setDirection(
        this.calculationDirectionForBullet(this.mousePosition),
      );
      this.bullets[this.nextBulletIndex].activate();
      this.nextBulletIndex++;
      this.updateBulletCountText();
      this.bulletIndicator.update();
    });
  }

  calculationDirectionForBullet(mousePosition: IPosition) {
    const { x: dx, y: dy } = mousePosition;
    const magnitude = Math.sqrt(dx * dx + dy * dy);
    const directionX = magnitude > 0 ? dx / magnitude : 0;
    const directionY = magnitude > 0 ? dy / magnitude : 0;
    return { x: directionX, y: directionY };
  }

  public draw() {
    this.bullets.forEach((bullet) => {
      bullet.update();
      bullet.draw();
    });
    this.bulletIndicator.draw();
  }
}
