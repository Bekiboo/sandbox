import { Entity } from "./Entity";
import { GAME_CONFIG } from "./config";

export class Projectile extends Entity {
  vx: number;
  vy: number;

  constructor(x: number, y: number, vx: number, vy: number) {
    super(x, y, GAME_CONFIG.PROJECTILE.SIZE);
    this.vx = vx;
    this.vy = vy;
  }

  update(deltaTime: number) {
    this.x += this.vx * deltaTime;
    this.y += this.vy * deltaTime;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
