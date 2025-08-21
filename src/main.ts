import { Canvas } from "./entities/Canvas.ts";
import { Game } from "./entities/Game.ts";

const game = new Game(new Canvas());
game.run();
