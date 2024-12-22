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

	function init() {
		const effect = new Effect(canvas)

		function animate() {
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			effect.render(ctx)
			requestAnimationFrame(animate)
		}
		animate()
	}
</script>

<div class="w-screen h-screen overflow-hidden bg-stone-900">
	<canvas bind:this={canvas} class="w-[110%] h-[110%]"> </canvas>
</div>

<style>
	canvas {
		color: white;
	}
</style>
