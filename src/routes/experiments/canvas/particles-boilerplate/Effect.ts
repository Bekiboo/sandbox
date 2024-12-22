import { Particle } from './Particles'

export class Effect {
	width: number
	height: number
	particles: Particle[]
	numberOfParticles: number
	constructor(width, height) {
		this.width = width
		this.height = height
		this.particles = []
		this.numberOfParticles = 100
		this.init()
	}
	init() {
		for (let i = 0; i < this.numberOfParticles; i++) {
			this.particles.push(new Particle(this))
		}
	}
	render(ctx) {
		this.particles.forEach((particle) => {
			particle.draw(ctx)
		})
	}
}
