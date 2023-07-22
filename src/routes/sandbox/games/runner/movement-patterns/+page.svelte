<script lang="ts">
	import { onMount } from 'svelte';
	import { loadImage } from '../utils';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;
	let canvasWidth: number;
	let canvasHeight: number;

	const numberOfBats = 1000;
	const batsArray: Bat[] = [];
	let gameFrame = 0;

	let enemySliderValue = 20;
	$: nbOfEnemies = Math.floor(Math.exp(enemySliderValue / 14.478));
	let twitch: number = 5;

	class Bat {
		x: number;
		speed: number;
		spriteWidth: number;
		spriteHeight: number;
		y: number;
		width: number;
		height: number;
		frame: number;
		flapSpeed: number;
		image: HTMLImageElement;
		constructor() {
			this.image = loadImage('/runner/character/bat/fly.png');
			this.speed = Math.random() * 4 - 2;
			this.spriteWidth = 44;
			this.spriteHeight = 92;
			this.width = this.spriteWidth * 2;
			this.height = this.spriteHeight * 2;
			this.x = Math.random() * (canvasWidth - this.width);
			this.y = Math.random() * (canvasHeight - this.height);
			this.frame = 0;
			this.flapSpeed = 4 - Math.floor(this.speed);
		}
		update() {
			if (gameFrame % this.flapSpeed === 0) {
				this.x += Math.random() * 5 - 2.5;
				this.y += Math.random() * 5 - 2.5;
				this.frame > 5 ? (this.frame = 0) : this.frame++;
			}
		}
		draw() {
			ctx?.drawImage(
				this.image,
				this.frame * this.spriteWidth,
				0,
				this.spriteWidth,
				this.spriteHeight,
				this.x,
				this.y,
				this.width,
				this.height
			);
		}
	}

	onMount(() => {
		ctx = canvas.getContext('2d');
		canvasWidth = canvas.width = 500;
		canvasHeight = canvas.height = 800;

		for (let i = 0; i < numberOfBats; i++) {
			batsArray.push(new Bat());
		}

		animate();
	});
	function animate() {
		if (ctx) {
			// Fill the canvas with a background color
			ctx.fillStyle = 'grey'; // Replace 'lightblue' with the color you want
			ctx.fillRect(0, 0, canvasWidth, canvasHeight);

			// Draw the bats
			for (let i = 0; i < nbOfEnemies; i++) {
				batsArray[i].update();
				batsArray[i].draw();
			}
		}

		gameFrame++;
		requestAnimationFrame(animate);
	}
</script>

<div class="flex flex-col items-center mt-5">
	<div class="flex gap-4">
		<label for="enemySliderValue">Enemies</label>
		<input
			bind:value={enemySliderValue}
			name="enemySliderValue"
			type="range"
			min="0"
			max="100"
			class="range range-lg range-primary mb-4 w-96"
		/>
		{nbOfEnemies}
	</div>

	<canvas class="w-[500px] h-[800px]" bind:this={canvas} />
</div>
