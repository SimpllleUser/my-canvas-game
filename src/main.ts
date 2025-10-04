import { Game } from "./entities/Game.ts";
import { Cube } from "./entities/Cube.ts";
import type { IGameObject } from "./types/GameObject.ts";
import { BaseWeapon } from "./entities/BaseWeapon.ts";

const baseWeapon = new BaseWeapon();
const cube = new Cube(baseWeapon);
const objects: IGameObject[] = [cube];

const game = new Game(objects);
game.run();
