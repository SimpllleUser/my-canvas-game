import { BaseWeapon } from "./BaseWeapon.ts";
import { ArrowBullet } from "./ArrowBullet.ts";

export class BowWeapon extends BaseWeapon {
  constructor() {
    super(5, new ArrowBullet());
  }
}
