import { Game } from "./entities/Game.ts";
import { Player } from "./entities/Player.ts";
import type { IGameObject } from "./types/GameObject.ts";
import { BowWeapon } from "./entities/BowWeapon.ts";
import { BaseWeapon } from "./entities/BaseWeapon.ts";
import { BaseBullet } from "./entities/BaseBullet.ts";

const weapons = [
  {
    name: "base",
    entity: new BaseWeapon(10, new BaseBullet()),
  },
  {
    name: "bow",
    entity: new BowWeapon(),
  },
];

const baseWeapon = new BowWeapon();
const player = new Player(baseWeapon);
const objects: IGameObject[] = [player];
let actualWeapon = weapons[0];

document.addEventListener("keydown", ({ keyCode }) => {
  if (keyCode === 81) {
    if (actualWeapon.name === "base") {
      actualWeapon = weapons[1];
      player.changeWeapon(actualWeapon.entity);
    } else if (actualWeapon.name === "bow") {
      actualWeapon = weapons[0];
      player.changeWeapon(actualWeapon.entity);
    }
  }
});

const game = new Game(objects);
game.run();
