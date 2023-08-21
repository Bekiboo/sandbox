import type { Mouse } from '../utils'

export class Animation {
	ctx: CanvasRenderingContext2D
	width: number
	height: number
	// timer: number;
	constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
		this.ctx = ctx
		this.width = width
		this.height = height
		// this.timer = 0;
	}

	update(deltaTime: number, mouse: Mouse) {}

	draw(ctx: CanvasRenderingContext2D) {}
}
