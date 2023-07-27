<script lang="ts">
	import { onMount } from 'svelte';
	import { loadImage, preloadAudio } from '../utils';
	import { Bat } from './enemy';
	import { Explosion, explosionSounds } from './effects';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;
	let bgCtx: CanvasRenderingContext2D | null;
	let canvasWidth: number;
	let canvasHeight: number;

	const BAT_INTERVAL = 100; // ms

	let timeToNextBat = 0;
	let batInterval = BAT_INTERVAL;
	let lastTime = 0;

	let batsArray: Bat[] = [];

	let explosions: Explosion[] = [];

	onMount(() => {
		preloadAudio(explosionSounds);
		ctx = canvas.getContext('2d');
		bgCtx = canvas.getContext('2d');
		canvasWidth = canvas.width = 1200;
		canvasHeight = canvas.height = 800;

		animate(0);
	});

	function animate(timestamp: number) {
		if (ctx) {
			ctx.clearRect(0, 0, canvasWidth, canvasHeight);

			bgCtx?.drawImage(
				loadImage('/runner/point-and-shoot/cave_brownsmall.png'),
				0,
				0,
				canvasWidth,
				canvasHeight
			);

			let deltaTime = timestamp - lastTime;
			lastTime = timestamp;
			timeToNextBat += deltaTime;

			if (timeToNextBat > batInterval) {
				batsArray.push(new Bat(canvasWidth, canvasHeight));
				timeToNextBat = 0;
				batInterval -= batsArray.length;
				if (batInterval < BAT_INTERVAL) {
					batInterval = BAT_INTERVAL;
				}
			}

			[...batsArray, ...explosions].forEach((bat) => {
				bat.update(deltaTime);
				bat.draw(ctx!);
			});

			batsArray = batsArray.filter((bat) => !bat.markedForDeletion);
			explosions = explosions.filter((explosion) => !explosion.markedForDeletion);

			requestAnimationFrame(animate);
		}
	}

	function handleClick(event: MouseEvent) {
		batsArray.forEach((bat) => {
			let collision = bat.chechIfCollided(event);
			if (collision) {
				explosions.push(new Explosion(collision.x, collision.y, bat.width, bat.depth));
				bat.markedForDeletion = true;
			}
		});
	}
</script>

<svelte:head>
	<meta
		name="viewport"
		content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
	/>
</svelte:head>

<div class="flex flex-col items-center mt-5">
	<div class="text-xl font-bold text-white">{batsArray.length}</div>
	<canvas on:click={handleClick} class="w-[1200px] h-[800px]" bind:this={canvas} />
</div>
