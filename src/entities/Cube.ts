import { Canvas } from "./Canvas.ts";
import type { IGameObject } from "../types/GameObject.ts";
import type { IPosition } from "../types/Main.ts";
import { Sight } from "./Sight.ts";
import type { BaseWeapon } from "./BaseWeapon.ts";
import { PlayerMovement } from "./PlayerMovement.ts";

const ELEMENT = {
  width: 50,
  height: 50,
  color: "blue",
};

const getBasePosition = () => ({ x: 0, y: 0 });

export class Cube extends Canvas implements IGameObject {
  element = ELEMENT;
  position: IPosition;
  mousePosition: IPosition;
  center: IPosition;
  weapon: BaseWeapon;
  sight: Sight;
  playerMovement: PlayerMovement;

  constructor(weapon: BaseWeapon) {
    super();
    this.position = getBasePosition();
    this.mousePosition = getBasePosition();
    this.center = getBasePosition();
    this.sight = new Sight(this.element);
    this.initEventListeners();
    this.animate();
    this.weapon = weapon;
    this.playerMovement = new PlayerMovement(ELEMENT);
  }

  initEventListeners() {
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

        this.weapon.updateCenter(this.center);
        this.weapon.updateMousePosition(this.mousePosition);

        this.sight.updatePosition({ x: canvasX, y: canvasY });
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();

    this.ctx.fillStyle = this.element.color;
    this.playerMovement?.setMoveDirection(this.position);
    this.sight.drawSight(this.mousePosition, this.position);
    this.ctx.fillRect(
      this.position.x,
      this.position.y,
      this.element.width,
      this.element.height,
    );

    this.weapon?.draw();
    this.sight.draw();
    this.ctx.restore();
  }

  animate() {
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}
