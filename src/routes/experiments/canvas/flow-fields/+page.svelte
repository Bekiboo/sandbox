<script lang="ts">
	import { onMount } from 'svelte'
	import { Effect } from './Effect'
	import ControlPanel from './ControlPanel.svelte'

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
			effect.update()
			requestAnimationFrame(animate)
		}
		animate()
	}
</script>

<div class="relative w-screen h-screen overflow-hidden bg-stone-900">
	<canvas bind:this={canvas} class="w-[110%] h-[110%]"> </canvas>
	<ControlPanel />
</div>

<style>
	canvas {
		color: white;
	}
</style>
