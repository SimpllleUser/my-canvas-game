import { Game } from "./entities/Game.ts";
import { Player } from "./entities/Player.ts";
import type { IGameObject } from "./types/GameObject.ts";
import { BowWeapon } from "./entities/BowWeapon.ts";

const baseWeapon = new BowWeapon();
const cube = new Player(baseWeapon);
const objects: IGameObject[] = [cube];

const game = new Game(objects);
game.run();
