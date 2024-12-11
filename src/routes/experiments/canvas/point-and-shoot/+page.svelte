<script lang="ts">
	import { onMount } from 'svelte';
	import { preloadAudio } from '../utils';
	import { explosionSounds } from './effects';
	import { Game } from './game';

	let canvas: HTMLCanvasElement = $state();
	let ctx: CanvasRenderingContext2D;
	let bgCtx: CanvasRenderingContext2D;
	let canvasWidth: number;
	let canvasHeight: number;

	let lastTime = 1;

	let game: Game;

	onMount(() => {
		preloadAudio(explosionSounds);
		if (canvas) {
			ctx = canvas.getContext('2d')!;
			bgCtx = canvas.getContext('2d')!;
		}
		canvasWidth = canvas.width = 600;
		canvasHeight = canvas.height = 800;

		game = new Game(ctx, bgCtx, canvas.width, canvas.height);

		animate(0);
	});

	function animate(timestamp: number) {
		if (ctx) {
			ctx.clearRect(0, 0, canvasWidth, canvasHeight);

			let deltaTime = timestamp - lastTime;
			lastTime = timestamp;

			game.update(deltaTime);
			game.draw();

			requestAnimationFrame(animate);
		}
	}

	function handleClick(event: MouseEvent) {
		game.checkForCollision(event);
	}
</script>

<svelte:head>
	<meta
		name="viewport"
		content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
	/>
</svelte:head>

<div class="flex flex-col items-center mt-5">
	<canvas onclick={handleClick} class="w-[600px] h-[800px]" bind:this={canvas}></canvas>
</div>
