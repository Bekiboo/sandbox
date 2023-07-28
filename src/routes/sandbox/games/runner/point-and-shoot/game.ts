import { loadImage } from '../utils';
import { Explosion } from './effects';
import { Bat, type Enemy } from './enemies';

export class Game {
	ctx: CanvasRenderingContext2D;
	bgCtx: CanvasRenderingContext2D;
	width: number;
	height: number;
	explosions: Explosion[];
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
		this.explosions = [];
		this.enemies = [];
		this.#addNewEnemy();
		this.enemyInterval = 500;
		this.enemyTimer = 0;
	}

	update(deltaTime: number) {
		this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
		this.explosions = this.explosions.filter((explosion) => !explosion.markedForDeletion);
		if (this.enemyTimer > this.enemyInterval) {
			this.#addNewEnemy();
			this.enemyTimer = 0;
		} else {
			this.enemyTimer += deltaTime;
		}

		this.enemies.forEach((enemy) => enemy.update(deltaTime));
		this.explosions.forEach((explosion) => explosion.update(deltaTime));
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
		this.explosions.forEach((explosion) => explosion.draw(this.ctx));
	}

	#addNewEnemy() {
		this.enemies.push(new Bat(this));
	}

	checkForCollision(event: MouseEvent) {
		this.enemies.forEach((enemy) => {
			const collision = enemy.chechIfCollided(event);
			if (collision) {
				this.explosions.push(new Explosion(collision.x, collision.y, enemy.width, enemy.depth));
				enemy.markedForDeletion = true;
			}
		});
	}
}
