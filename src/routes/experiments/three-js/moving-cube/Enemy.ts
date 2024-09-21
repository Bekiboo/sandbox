import type { Game } from './Game';

export class Enemy {
	width: number;
	height: number;
	depth: number;
	directionX!: number;
	directionY!: number;
	spriteWidth!: number;
	spriteHeight!: number;
	protected hp!: number;

	public markedForDeletion = false;
	public x!: number;
	public y!: number;
	public z!: number;
	private groundWidth: number;
	private groundDepth: number;

	constructor(game: Game, x, y, z) {
		this.groundDepth = game.depth;
		this.groundWidth = game.width;
		this.x = x;
		this.y = y;
		this.z = z;
	}

	update(deltaTime: number) {
		// // mark for deletion if out of bounds
		// if (this.x < 0 - this.width) this.markedForDeletion = true;
		// // reverse directionY if out of bounds
		// if (this.y < 0 || this.y > this.groundDepth - this.height) this.directionY *= -1;
		// // move
		// this.x -= this.directionX;
		// this.y += this.directionY;
	}

	// draw(ctx: CanvasRenderingContext2D) {
	// 	ctx.drawImage(
	// 		this.image,
	// 		this.frame * (this.spriteWidth + 0.5),
	// 		0,
	// 		this.spriteWidth,
	// 		this.spriteHeight,
	// 		this.x,
	// 		this.y,
	// 		this.width,
	// 		this.height
	// 	);
	// }

	// chechIfCollided(event: MouseEvent) {
	// 	if (
	// 		event.offsetX > this.x - 10 &&
	// 		event.offsetX < this.x + 10 + this.width &&
	// 		event.offsetY > this.y - 10 &&
	// 		event.offsetY < this.y + 10 + this.height
	// 	) {
	// 		return { x: this.x, y: this.y };
	// 	}
	// 	return false;
	// }

	// damageEnemy() {
	// 	this.hp--;
	// 	if (this.hp <= 0) {
	// 		this.markedForDeletion = true;
	// 		return true;
	// 	}
	// }
}
