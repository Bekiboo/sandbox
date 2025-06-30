// import type { Color, Mouse, Point } from '../utils'
import type { Effect } from './Effect'

export class Particle {
	x: number
	y: number
	effect: Effect
	speedX: number
	speedY: number
	speedModifier: number
	history: { x: number; y: number }[]
	maxLength: number
	angle: number
	timer: number
	color: string

	constructor(effect) {
		this.effect = effect
		this.x = Math.floor(Math.random() * this.effect.width)
		this.y = Math.floor(Math.random() * this.effect.height)
		this.speedModifier = Math.floor(Math.random() * 2 + 1)
		this.history = [{ x: this.x, y: this.y }]
		this.maxLength = Math.floor(Math.random() * 200 + 10)
		this.angle = 0
		this.timer = this.maxLength * 2
		this.color = 'hsl(' + Math.floor(Math.random() * 50 + 165) + ', 100%, 50%, 0.25)'
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.beginPath()
		ctx.moveTo(this.history[0].x, this.history[0].y)
		this.history.forEach((point) => {
			ctx.strokeStyle = this.color
			ctx.lineTo(point.x, point.y)
		})
		ctx.stroke()
	}

	update() {
		this.timer--
		if (this.timer >= 1) {
			const x = Math.floor(this.x / this.effect.cellSize)
			const y = Math.floor(this.y / this.effect.cellSize)
			const index = x + y * this.effect.cols
			const angle = this.effect.flowField[index]

			this.speedX = Math.cos(angle) * 5
			this.speedY = Math.sin(angle) * 5
			this.x += this.speedX * this.speedModifier
			this.y += this.speedY * this.speedModifier

			this.history.push({ x: this.x, y: this.y })
			if (this.history.length > this.maxLength) {
				this.history.shift()
			}
		} else if (this.history.length > 1) {
			this.history.shift()
		} else {
			this.reset()
		}
	}

	reset() {
		this.x = Math.floor(Math.random() * this.effect.width)
		this.y = Math.floor(Math.random() * this.effect.height)
		this.history = [{ x: this.x, y: this.y }]
		this.timer = this.maxLength * 2
	}
}
