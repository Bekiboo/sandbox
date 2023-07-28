import { loadImage } from '../utils';
import type { Explosion } from './effects';
import { Bat, type Enemy } from './enemy';

let enemysArray: Enemy[] = [];
let explosions: Explosion[] = [];

export class Game {
	ctx: CanvasRenderingContext2D;
	bgCtx: CanvasRenderingContext2D;
	width: number;
	height: number;
	enemies: Enemy[];
	enemyInterval: number;
	enemyTimer: number;
	constructor(
		ctx: CanvasRenderingContext2D,
		bgCtx: CanvasRenderingContext2D,
		width: number,
		height: number
	) {
		this.ctx = ctx;
		this.bgCtx = bgCtx;
		this.width = width;
		this.height = height;
		this.enemies = [];
		this.#addNewEnemy();
		this.enemyInterval = 500;
		this.enemyTimer = 0;
	}

	update(deltaTime: number) {
		if (this.enemyTimer > this.enemyInterval) {
			this.#addNewEnemy();
			this.enemyTimer = 0;

			enemysArray = enemysArray.filter((enemy) => !enemy.markedForDeletion);
			explosions = explosions.filter((explosion) => !explosion.markedForDeletion);
		} else {
			this.enemyTimer += deltaTime;
		}

		this.enemies.forEach((enemy) => enemy.update(deltaTime));
	}

	draw() {
		this.bgCtx?.drawImage(
			loadImage('/runner/point-and-shoot/cave_brownsmall.png'),
			0,
			0,
			this.width,
			this.height
		);
		this.enemies.forEach((enemy) => enemy.draw(this.ctx));
	}

	#addNewEnemy() {
		this.enemies.push(new Bat(this));
	}
}
