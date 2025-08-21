import { Game } from "./entities/Game.ts";
import { Cube } from "./entities/Cube.ts";
import type { IGameObject } from "./types/GameObject.ts";

const cube = new Cube();
const objects: IGameObject[] = [cube];

const game = new Game(objects);
game.run();
