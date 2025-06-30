import { Ball } from './Ball'

export class MetaBallsEffect {
	width: number
	height: number
	metaballs: Ball[]
	numberOfBalls: number
	ctx: CanvasRenderingContext2D
	constructor(width: number, height: number, ctx: CanvasRenderingContext2D) {
		this.width = width
		this.height = height
		this.metaballs = []
		this.numberOfBalls = 20
		this.ctx = ctx
		this.init()
	}

	init() {
		for (let i = 0; i < this.numberOfBalls; i++) {
			this.metaballs.push(new Ball(this))
		}
		this.metaballs.forEach((ball) => {
			ball.draw(this.ctx)
		})
	}

	update() {
		this.metaballs.forEach((ball) => ball.update())
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.clearRect(0, 0, this.width, this.height)
		this.metaballs.forEach((ball) => ball.draw(ctx))
	}
}
