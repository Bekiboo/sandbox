import { loadImage } from '../utils';
import type { Game } from './game';

export abstract class Enemy {
	width!: number;
	height!: number;
	depth!: number;
	directionX!: number;
	directionY!: number;
	frame!: number;
	maxFrame!: number;
	flapInterval!: number;
	timeSinceFlap!: number;
	image!: HTMLImageElement;
	spriteWidth!: number;
	spriteHeight!: number;
	protected hp!: number;

	public markedForDeletion = false;
	protected x!: number;
	protected y!: number;
	private canvasHeight: number;

	constructor(game: Game) {
		this.canvasHeight = game.height;
	}

	update(deltaTime: number) {
		// mark for deletion if out of bounds
		if (this.x < 0 - this.width) this.markedForDeletion = true;
		// reverse directionY if out of bounds
		if (this.y < 0 || this.y > this.canvasHeight - this.height) this.directionY *= -1;

		// move
		this.x -= this.directionX;

		this.y += this.directionY;

		// flap wings
		this.timeSinceFlap += deltaTime;
		if (this.timeSinceFlap > this.flapInterval) {
			this.frame >= this.maxFrame ? (this.frame = 0) : this.frame++;
			this.timeSinceFlap = 0;
		}
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

	damageEnemy() {
		this.hp--;
		if (this.hp <= 0) {
			this.markedForDeletion = true;
			return true;
		}
	}
}

export class Bat extends Enemy {
	readonly image: HTMLImageElement;
	readonly spriteWidth = 15.5;
	readonly spriteHeight = 15.5;
	readonly depth = Math.random() * 0.5 + 0.5;
	readonly width = this.spriteWidth * this.depth * 5;
	readonly height = this.spriteHeight * this.depth * 5;
	directionX = (this.depth + 1) ** 3 / 4;
	directionY = Math.random() * 3 - 1.5;
	frame = 1;
	readonly maxFrame = 3;
	readonly flapInterval = Math.random() * 50 + 50;
	timeSinceFlap = 0;
	protected hp = 1;

	constructor(game: Game) {
		super(game);
		this.x = game.width;
		this.y = Math.random() * (game.height - this.height);
		this.image = loadImage('/runner/point-and-shoot/enemies/Bat.png');
	}
}

export class AngryBat extends Enemy {
	readonly image: HTMLImageElement;
	readonly spriteWidth = 15.5;
	readonly spriteHeight = 15.5;
	readonly depth = Math.random() * 0.5 + 0.5;
	readonly width = this.spriteWidth * this.depth * 5;
	readonly height = this.spriteHeight * this.depth * 5;
	directionX = (this.depth + 1) ** 3;
	directionY = Math.random() * 3 - 1.5;
	frame = 1;
	readonly maxFrame = 3;
	readonly flapInterval = Math.random() * 50 + 50;
	timeSinceFlap = 0;
	protected hp = 2;

	constructor(game: Game) {
		super(game);
		this.x = game.width;
		this.y = Math.random() * (game.height - this.height);
		this.image = loadImage('/runner/point-and-shoot/enemies/AngryBat.png');
	}
}
