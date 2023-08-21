<script lang="ts">
	import { onMount } from 'svelte';

	export let canvasDimensions = {
		width: 600,
		height: 800
	};

	export let game: any;

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	let lastTime = 1;

	onMount(() => {
		canvas.width = canvasDimensions.width;
		canvas.height = canvasDimensions.height;

		canvas = document.querySelector('canvas') as HTMLCanvasElement;
		ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

		animate(0);
	});

	function animate(timestamp: number) {
		if (ctx) {
			ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);

			let deltaTime = timestamp - lastTime;
			lastTime = timestamp;

			game.update(deltaTime);
			game.draw();

			requestAnimationFrame(animate);
		}
	}
</script>

<div class="wrapper">
	<canvas />

	<div class="content">
		<slot />
	</div>
</div>

<!-- <svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp} /> -->

<style>
	.wrapper {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		min-height: 100vh;
	}
	canvas {
		grid-column: 1;
		grid-row: 1;
		width: 100%;
		height: 100%;
	}

	.content {
		grid-column: 1;
		grid-row: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
