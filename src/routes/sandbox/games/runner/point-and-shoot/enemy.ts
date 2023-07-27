import { loadImage } from '../utils';

export class Bat {
	readonly spriteWidth = 15.5;
	readonly spriteHeight = 15.5;
	readonly depth = Math.random() * 0.5 + 0.5;
	readonly width = this.spriteWidth * this.depth * 5;
	readonly height = this.spriteHeight * this.depth * 5;
	readonly image = loadImage('/runner/point-and-shoot/TerrorBatSideIdle.png');

	public markedForDeletion = false;

	private x: number;
	private y: number;
	private directionX: number;
	private directionY: number;
	private frame: number;
	private readonly maxFrame = 3;
	private timeSinceFlap: number;
	private readonly flapInterval: number;
	private canvasHeight: number;

	constructor(canvasWidth: number, canvasHeight: number) {
		this.x = canvasWidth;
		this.y = Math.random() * (canvasHeight - this.height);
		this.directionX = ((this.depth + 1) * (this.depth + 1) * (this.depth + 1)) / 4;
		this.directionY = Math.random() * 3 - 1.5;
		this.markedForDeletion = false;
		this.frame = 1;
		this.timeSinceFlap = 0;
		this.flapInterval = Math.random() * 50 + 50;
		this.canvasHeight = canvasHeight;
	}

	update(deltaTime: number) {
		if (this.y < 0 || this.y > this.canvasHeight - this.height) this.directionY *= -1;
		this.x -= this.directionX;
		if (this.x < 0 - this.width) this.markedForDeletion = true;
		this.timeSinceFlap += deltaTime;
		if (this.timeSinceFlap > this.flapInterval) {
			this.frame >= this.maxFrame ? (this.frame = 0) : this.frame++;
			this.timeSinceFlap = 0;
		}
		this.y += this.directionY;
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.drawImage(
			this.image,
			this.frame * (this.spriteWidth + 0.5),
			0,
			this.spriteWidth,
			this.spriteHeight,
			this.x,
			this.y,
			this.width,
			this.height
		);
	}

	chechIfCollided(event: MouseEvent) {
		if (
			event.offsetX > this.x - 10 &&
			event.offsetX < this.x + 10 + this.width &&
			event.offsetY > this.y - 10 &&
			event.offsetY < this.y + 10 + this.height
		) {
			return { x: this.x, y: this.y };
		}
		return false;
	}
}
