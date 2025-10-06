import { Canvas } from "./Canvas.ts";
import type { IGameObject } from "../types/GameObject.ts";
import type { IPosition } from "../types/Main.ts";
import { Sight } from "./Sight.ts";
import type { BaseWeapon } from "./BaseWeapon.ts";
import { PlayerMovement } from "./PlayerMovement.ts";

const PLAYER_BODY = {
  width: 50,
  height: 50,
  color: "blue",
};

export class Player extends Canvas implements IGameObject {
  element = PLAYER_BODY;
  position: IPosition;
  mousePosition: IPosition;
  center: IPosition;
  weapon: BaseWeapon;
  sight: Sight;
  playerMovement: PlayerMovement;

  constructor(weapon: BaseWeapon) {
    super();
    this.position = this.getBasePosition();
    this.mousePosition = this.getBasePosition();
    this.center = this.getBasePosition();
    this.sight = new Sight(this.element);
    this.initEventListeners();
    this.animate();
    this.weapon = weapon;
    this.playerMovement = new PlayerMovement(PLAYER_BODY);
  }

  changeWeapon(weapon: BaseWeapon) {
    this.weapon = weapon;
    this.weapon.rechargeBullets();
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
