import { Canvas } from "./Canvas.ts";
import type { IElement, IPosition } from "../types/Main.ts";

const element = {
  width: 10,
  height: 5,
  color: "grey",
};

export class Sight extends Canvas {
  position: IPosition;
  playerElement: IElement;
  gapSize = 10;

  constructor(playerElement: IElement) {
    super();
    this.playerElement = playerElement;
    this.position = { x: 0, y: 0 };
    document.getElementById("canvas")!.style.cursor = "none";
  }

  updatePosition({ x, y }: IPosition) {
    this.position = { x, y };
  }

  drawSightPart(rotateAngle: number) {
    this.ctx.save();
    this.ctx.translate(this.position.x, this.position.y);
    this.ctx.rotate(rotateAngle);
    this.ctx.translate(this.gapSize, 0);
    this.ctx.fillStyle = element.color;
    this.ctx.fillRect(
      -element.width / 2,
      -element.height / 2,
      element.width,
      element.height,
    );
    this.ctx.restore();
  }

  sightCalculationAngel(mousePosition: IPosition) {
    const { x, y } = mousePosition;
    const angle = Math.atan2(y, x);
    const ARC_WIDTH = Math.PI;
    return {
      angle,
      startAngle: angle - ARC_WIDTH / 2,
      endAngle: angle + ARC_WIDTH / 2,
    };
  }

  drawSight(mousePosition: IPosition, playerPosition: IPosition) {
    const { startAngle, endAngle } = this.sightCalculationAngel(mousePosition);
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(
      playerPosition.x + this.playerElement.width / 2,
      playerPosition.y + this.playerElement.height / 2,
      this.playerElement.width * 0.6,
      startAngle,
      endAngle,
    );
    this.ctx.strokeStyle = "orange";
    this.ctx.lineWidth = 5;
    this.ctx.stroke();
    this.ctx.restore();
  }

  draw() {
    Array.from({ length: 4 }).forEach((_, index) => {
      const rotateAngle = (index * Math.PI) / 2;
      this.drawSightPart(rotateAngle);
    });
  }
}
