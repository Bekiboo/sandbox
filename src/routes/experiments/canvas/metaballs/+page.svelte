<script lang="ts">
	import { onMount } from 'svelte'
	import { Ball } from './Ball'
	import { MetaBallsEffect } from './MetaBallsEffect'

	let canvas: HTMLCanvasElement = $state()
	let ctx: CanvasRenderingContext2D | null
	let effect: MetaBallsEffect | null

	onMount(() => {
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight
		ctx = canvas.getContext('2d')

		effect = new MetaBallsEffect(canvas.width, canvas.height, ctx)
		animate()
	})

	function animate() {
		effect.update()
		effect.draw(ctx)

		requestAnimationFrame(animate)
	}
</script>

<div class="relative w-screen h-screen bg-stone-500">
	<canvas bind:this={canvas} class="w-screen h-screen bg-stone-600 blur-md contrast-[20]">
	</canvas>
</div>

<style>
	canvas {
		color: white;
	}
</style>
