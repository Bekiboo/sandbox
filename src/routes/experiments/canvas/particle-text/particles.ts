import type { Color, Mouse, Point } from '../utils'

export class Particle {
	x: number
	y: number
	size: number
	basePos: Point
	density = Math.random() * 40 + 5
	shape: string
	startColor: Color
	endColor: Color
	currentColor: Color

	constructor(
		x: number,
		y: number,
		shape: string,
		startColor: Color,
		endColor: Color,
		size: number
	) {
		this.x = x
		this.y = y
		this.basePos = { x: this.x, y: this.y }
		this.shape = shape
		this.startColor = startColor
		this.endColor = endColor
		this.currentColor = this.startColor
		this.size = size
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = `rgba(${this.currentColor.r}, ${this.currentColor.g}, ${this.currentColor.b}, ${this.currentColor.a})`
		ctx.beginPath()

		if (this.shape === 'circle') ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
		if (this.shape === 'square')
			ctx.rect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2)
		ctx.closePath()

		ctx.fill()
	}

	update(mouse: Mouse) {
		const dx = mouse.x - this.x
		const dy = mouse.y - this.y
		const distanceToMouse = Math.sqrt(dx * dx + dy * dy)

		if (distanceToMouse < mouse.radius) {
			const forceDirectionX = dx / distanceToMouse
			const forceDirectionY = dy / distanceToMouse
			const maxDistanceToMouse = mouse.radius
			const force = (maxDistanceToMouse - distanceToMouse) / maxDistanceToMouse
			const directionX = forceDirectionX * force * this.density
			const directionY = forceDirectionY * force * this.density

			this.x -= directionX
			this.y -= directionY
		} else {
			if (this.x !== this.basePos.x) {
				const dx = this.x - this.basePos.x
				this.x -= dx / 10
			}
			if (this.y !== this.basePos.y) {
				const dy = this.y - this.basePos.y
				this.y -= dy / 10
			}
		}

		const distanceToBase = this.findDistance(this, this.basePos)

		if (distanceToBase <= 0) {
			this.currentColor = this.startColor
		} else if (distanceToBase >= 50) {
			this.currentColor = this.endColor
		} else {
			const ratio = distanceToBase / 50

			this.currentColor = {
				r: this.startColor.r + ratio * (this.endColor.r - this.startColor.r),
				g: this.startColor.g + ratio * (this.endColor.g - this.startColor.g),
				b: this.startColor.b + ratio * (this.endColor.b - this.startColor.b),
				a: 1
			}
		}
	}

	findDistance(a: Point, b: Point) {
		const dx = a.x - b.x
		const dy = a.y - b.y
		return Math.sqrt(dx * dx + dy * dy)
	}
}
