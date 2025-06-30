import type { MetaBallsEffect } from './MetaBallsEffect'

export class Ball {
	effect: MetaBallsEffect
	x: number
	y: number
	radius: number
	speedX: number
	speedY: number
	color: string
	constructor(effect: MetaBallsEffect) {
		this.effect = effect
		this.x = Math.random() * this.effect.width
		this.y = Math.random() * this.effect.height
		this.radius = Math.random() * 50 + 25
		this.speedX = Math.random() * 1 - 0.5
		this.speedY = Math.random() * 1 - 0.5
		this.color = 'hsl(' + Math.floor(Math.random() * 50 + 340) + ', 100%, 50%, 0.3)'
	}

	update() {
		if (this.x + this.radius > this.effect.width || this.x - this.radius < 0) {
			this.speedX *= -1
		}
		if (this.y + this.radius > this.effect.height || this.y - this.radius < 0) {
			this.speedY *= -1
		}
		this.x += this.speedX
		this.y += this.speedY
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
		ctx.fillStyle = this.color
		ctx.fill()
	}
}
