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

	const init = () => {
		const effect = new Effect(canvas.width, canvas.height)
		effect.render(ctx)
	}
</script>

<canvas bind:this={canvas} class="w-full h-full"> </canvas>
