import { Entity } from "./Entity";

export class EnemyProjectile extends Entity {
  vx: number;
  vy: number;
  damage: number;

  constructor(x: number, y: number, vx: number, vy: number, damage: number) {
    super(x, y, 3); // Smaller than player projectiles
    this.vx = vx;
    this.vy = vy;
    this.damage = damage;
  }

  update(deltaTime: number) {
    this.x += this.vx * deltaTime;
    this.y += this.vy * deltaTime;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
