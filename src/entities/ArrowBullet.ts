import { BaseBullet } from "./BaseBullet.ts";

export class ArrowBullet extends BaseBullet {
  constructor() {
    super();
    this.speed = 1;
  }
  arrowAngel() {
    const { x, y } = this.mousePosition;
    const angle = Math.atan2(y, x);
    const ARC_WIDTH = Math.PI;
    return {
      angle,
      startAngle: angle - ARC_WIDTH / 2,
      endAngle: angle + ARC_WIDTH / 2,
    };
  }
  draw() {
    if (!this.isActive) return;
    this.ctx.save();
    this.ctx.fillStyle = this.element.color;
    const radius = this.element.width * 5;
    const length = radius * 2;
    const headLength = radius / 2;
    const shaftWidth = radius / 5;
    const headWidth = radius / 1.5;
    const x = this.position.x;
    const y = this.position.y;
    this.ctx.translate(x, y);
    this.ctx.rotate(this.arrowAngel().angle);
    this.ctx.beginPath();
    this.ctx.moveTo(-length / 2, -shaftWidth / 2);
    this.ctx.lineTo(length / 2 - headLength, -shaftWidth / 2);
    this.ctx.lineTo(length / 2 - headLength, -headWidth / 2);
    this.ctx.lineTo(length / 2, 0);
    this.ctx.lineTo(length / 2 - headLength, headWidth / 2);
    this.ctx.lineTo(length / 2 - headLength, shaftWidth / 2);
    this.ctx.lineTo(-length / 2, shaftWidth / 2);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();
  }
}
