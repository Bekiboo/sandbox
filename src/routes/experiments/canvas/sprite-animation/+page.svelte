<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement = $state();
	let ctx: CanvasRenderingContext2D | null;
	let canvasWidth: number;
	let canvasHeight: number;
	let playerImage: HTMLImageElement;
	const SPRITE_WIDTH = 575;
	const SPRITE_HEIGHT = 523;
	let playerState: string = $state('idle');

	let gameFrame = 0;
	const staggerFrames = 5;
	const spriteAnimations: { [key: string]: { loc: { x: number; y: number }[] } } = {};
	const animationStates = [
		{ name: 'idle', frames: 7 },
		{ name: 'jump', frames: 7 },
		{ name: 'fall', frames: 7 },
		{ name: 'run', frames: 9 },
		{ name: 'dizzy', frames: 11 },
		{ name: 'sit', frames: 5 },
		{ name: 'roll', frames: 7 },
		{ name: 'bite', frames: 7 },
		{ name: 'KO', frames: 12 },
		{ name: 'getHit', frames: 4 }
	];

	// Populate the spriteAnimations object with the animation frame positions
	animationStates.forEach((state, index) => {
		let frames: { loc: { x: number; y: number }[] } = {
			loc: []
		};
		for (let j = 0; j < state.frames; j++) {
			let positionX = j * SPRITE_WIDTH;
			let positionY = index * SPRITE_HEIGHT;
			frames.loc.push({ x: positionX, y: positionY });
		}
		spriteAnimations[state.name] = frames;
	});

	onMount(() => {
		ctx = canvas.getContext('2d');
		canvasWidth = canvas.width = 600;
		canvasHeight = canvas.height = 600;

		playerImage = new Image();
		playerImage.src = '/runner/shadow_dog.png';
		animate();
	});

	function animate() {
		ctx?.clearRect(0, 0, canvasWidth, canvasHeight);

		// Calculate the current position in the animation cycle
		let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
		let frameX = SPRITE_WIDTH * position;
		let frameY = spriteAnimations[playerState].loc[position].y;
		frameX = position * SPRITE_WIDTH;
		ctx?.drawImage(
			playerImage, // The source image
			frameX, // The x-coordinate in the source image
			frameY, // The y-coordinate in the source image
			SPRITE_WIDTH, // The width of the sprite to draw
			SPRITE_HEIGHT, // The height of the sprite to draw
			0, // The x-coordinate in the destination canvas
			0, // The y-coordinate in the destination canvas
			SPRITE_WIDTH, // The width to draw the sprite in the destination canvas
			SPRITE_HEIGHT // The height to draw the sprite in the destination canvas
		);

		// Increment the gameFrame for the next animation cycle
		gameFrame++;

		// Request the next animation frame to continue the animation loop
		requestAnimationFrame(animate);
	}
</script>

<div class="flex flex-col items-center mt-5">
	<div class="flex gap-2 w-full justify-center">
		{#each animationStates as { name }}
			<button
				onclick={() => {
					playerState = name;
				}}
				class="btn btn-outline btn-sm hover:btn-primary capitalize"
				class:btn-primary={playerState === name}
				value={name}>{name}</button
			>
		{/each}
	</div>

	<canvas class="w-[600px] h-[600px]" bind:this={canvas}></canvas>
</div>
