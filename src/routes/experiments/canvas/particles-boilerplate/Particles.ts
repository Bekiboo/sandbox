import type { Effect } from './Effect'

export class Particle {
	x: number
	y: number
	effect: Effect

	constructor(effect) {
		this.x = Math.floor(Math.random() * effect.width)
		this.y = Math.floor(Math.random() * effect.height)
		this.effect = effect
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.fillRect(this.x, this.y, 10, 10)
	}
}
