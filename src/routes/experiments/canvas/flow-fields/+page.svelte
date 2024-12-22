<script lang="ts">
	import { onMount } from 'svelte'
	import { Effect } from './Effect'

	let canvas: HTMLCanvasElement = $state()
	let ctx: CanvasRenderingContext2D | null

	onMount(() => {
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight
		ctx = canvas.getContext('2d')

		init()
	})

	// const flowField = {
	// 	rows: 20,
	// 	cols: 20,
	// 	field: []
	// }

	// const resolution = 20

	// const noise = new SimplexNoise()

	function init() {
		// for (let i = 0; i < flowField.rows; i++) {
		// 	flowField.field[i] = []
		// 	for (let j = 0; j < flowField.cols; j++) {
		// 		flowField.field[i][j] = Math.random() * Math.PI * 2
		// 	}
		// }

		const effect = new Effect(canvas)

		function animate() {
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			effect.render(ctx)
			requestAnimationFrame(animate)
		}
		animate()
	}
</script>

<canvas bind:this={canvas} class="w-screen h-screen"> </canvas>

<style>
	canvas {
		color: white;
	}
</style>
