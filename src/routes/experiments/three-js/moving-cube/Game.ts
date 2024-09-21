import { Enemy } from './Enemy';

export class Game {
	ctx: CanvasRenderingContext2D;
	bgCtx: CanvasRenderingContext2D;
	width: number;
	depth: number;
	enemies: Enemy[];
	enemyInterval: number;
	enemyTimer: number;
	constructor(width: number, depth: number) {
		this.width = width;
		this.depth = depth;
		this.enemies = [];
		this.#addNewEnemy();
		this.enemyInterval = 1;
		this.enemyTimer = 0;
	}

	update(delta: number) {
		this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
		if (this.enemyTimer > this.enemyInterval) {
			this.#addNewEnemy();
			this.enemyTimer = 0;
		} else {
			this.enemyTimer += delta;
		}

		// this.enemies.forEach((enemy) => enemy.update(delta));
	}

	#addNewEnemy() {
		// randomize enemy position
		const x = Math.random() * this.width - this.width / 2;
		const z = Math.random() * this.depth - this.depth / 2;
		this.enemies.push(new Enemy(this, x, 0.5, z));
	}

	// checkForCollision(event: MouseEvent) {
	// 	this.enemies.forEach((enemy) => {
	// 		const collision = enemy.chechIfCollided(event);
	// 		if (collision) {
	// 			const isDead = enemy.damageEnemy();
	// 			if (isDead)
	// 				this.explosions.push(new Explosion(collision.x, collision.y, enemy.width, enemy.depth));
	// 		}
	// 	});
	// }
}
