import { Canvas } from "./Canvas.ts";
import type { IGameObject } from "../types/GameObject.ts";

const ELEMENT = {
  width: 15,
  height: 15,
  color: "blue",
};

export class Cube extends Canvas implements IGameObject {
  element = ELEMENT;

  constructor() {
    super();
  }

  draw() {
    this.ctx.save();
    this.ctx.fillStyle = this.element.color;
    this.ctx.fillRect(0, 0, this.element.width, this.element.height);
    this.ctx.restore();
  }
}
// const keys = {
//   ArrowUp: false,
//   ArrowDown: false,
//   ArrowLeft: false,
//   ArrowRight: false
// };
//
// function setupArrowKeysListener(callback: (direction: { x: number; y: number }) => void) {
//   document.addEventListener('keydown', (event) => {
//     if (event.code in keys) {
//       event.preventDefault();
//       (keys as any)[event.code] = true;
//
//       // Викликаємо callback з поточним напрямком
//       const direction = {
//         x: (keys.ArrowRight ? 1 : 0) - (keys.ArrowLeft ? 1 : 0),
//         y: (keys.ArrowDown ? 1 : 0) - (keys.ArrowUp ? 1 : 0)
//       };
//
//       callback(direction);
//     }
//   });
//
//   document.addEventListener('keyup', (event) => {
//     if (event.code in keys) {
//       event.preventDefault();
//       (keys as any)[event.code] = false;
//
//       // Викликаємо callback з поточним напрямком
//       const direction = {
//         x: (keys.ArrowRight ? 1 : 0) - (keys.ArrowLeft ? 1 : 0),
//         y: (keys.ArrowDown ? 1 : 0) - (keys.ArrowUp ? 1 : 0)
//       };
//
//       callback(direction);
//     }
//   });
// }
//
// // Приклад використання
// setupArrowKeysListener((direction) => {
//   if (direction.x !== 0 || direction.y !== 0) {
//     console.log(`Рух: x=${direction.x}, y=${direction.y}`);
//   } else {
//     console.log('Зупинка');
//   }
// });
