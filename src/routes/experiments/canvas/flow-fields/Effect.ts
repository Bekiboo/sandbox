import { Particle } from './Particles'

export class Effect {
	canvas: HTMLCanvasElement
	width: number
	height: number
	particles: Particle[]
	numberOfParticles: number
	cellSize: number
	rows: number
	cols: number
	flowField: number[]
	curve: number
	zoom: number
	debug: boolean
	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas
		this.width = this.canvas.width
		this.height = this.canvas.height
		this.particles = []
		this.cellSize = 20
		this.curve = 2
		this.zoom = 0.13
		this.debug = false
		this.init()

		window.addEventListener('keydown', (e) => {
			if (e.key === 'd') {
				this.debug = !this.debug
			}
		})

		window.addEventListener('resize', (e: UIEvent) => {
			const target = e.target as Window
			this.resize(target.innerWidth, target.innerHeight)
		})
	}
	init() {
		// create flow field
		this.rows = Math.floor(this.height / this.cellSize)
		this.cols = Math.floor(this.width / this.cellSize)
		this.flowField = []
		for (let y = 0; y < this.rows; y++) {
			for (let x = 0; x < this.cols; x++) {
				// const angle = (Math.cos(Math.random() + 18) + Math.sin(Math.random() + 18)) * this.curve
				const angle = (Math.cos(x * this.zoom) + Math.sin(y * this.zoom)) * this.curve
				this.flowField.push(angle)
			}
		}

		// create particles
		this.particles = []
		this.numberOfParticles = this.width * this.height * 0.001
		for (let i = 0; i < this.numberOfParticles; i++) {
			this.particles.push(new Particle(this))
		}
	}

	drawGrid(ctx: CanvasRenderingContext2D) {
		ctx.save()
		ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
		for (let y = 0; y < this.rows; y++) {
			for (let x = 0; x < this.cols; x++) {
				const index = x + y * this.cols
				const angle = this.flowField[index]
				const x1 = x * this.cellSize
				const y1 = y * this.cellSize
				const x2 = x1 + Math.cos(angle) * 20
				const y2 = y1 + Math.sin(angle) * 20
				ctx.beginPath()
				ctx.moveTo(x1, y1)
				ctx.lineTo(x2, y2)
				ctx.stroke()
			}
		}
		ctx.restore()
	}

	resize(width: number, height: number) {
		this.canvas.width = width
		this.canvas.height = height
		this.width = this.canvas.width
		this.height = this.canvas.height
		this.init()
	}

	render(ctx: CanvasRenderingContext2D) {
		this.particles.forEach((particle) => {
			particle.draw(ctx)
			particle.update()
		})
		if (this.debug) {
			this.drawGrid(ctx)
		}
	}
}
