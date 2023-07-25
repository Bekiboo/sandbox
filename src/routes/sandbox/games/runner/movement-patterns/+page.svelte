<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { loadImage } from '../utils';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;
	let canvasWidth: number;
	let canvasHeight: number;

	const numberOfBats = 1000;
	const batsArray: Bat[] = [];
	let gameFrame = 0;

	let laser1: laser;
	let pointerPos: { x: number; y: number } = { x: 0, y: 0 };
	let firing = false;

	let enemyDial = 20;
	$: nbOfEnemies = Math.floor(Math.exp(enemyDial / 14.478));
	let twitchDial: number = 2;

	class laser {
		image: HTMLImageElement;
		spriteWidth: number;
		spriteHeight: number;
		width: number;
		height: number;
		x: number;
		y: number;
		frame: number;
		animationSpeed: number;
		constructor() {
			this.image = loadImage('/runner/character/laser.png');
			this.spriteWidth = 32;
			this.spriteHeight = 32;
			this.width = this.spriteWidth;
			this.height = this.spriteHeight;
			this.x = pointerPos.x - this.width / 2;
			this.y = pointerPos.y - this.height / 2;
			this.frame = 0;
			this.animationSpeed = 4;
		}
		updatePos(event: MouseEvent) {
			this.x = event.offsetX - this.width / 2;
			this.y = event.offsetY - this.height / 2;
		}
		updateAnimation() {
			if (gameFrame % this.animationSpeed === 0) {
				this.frame > 2 ? (this.frame = 0) : this.frame++;
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
				this.x += Math.random() * (1 * twitchDial) - 0.5 * twitchDial;
				this.y += Math.random() * (1 * twitchDial) - 0.5 * twitchDial;
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

		animate(0);
	});

	onDestroy(() => {
		ctx = null;
		batsArray.length = 0;
	});

	function animate(timestamp: number) {
		if (ctx) {
			// Fill the canvas with a background color
			ctx.fillStyle = 'grey'; // Replace 'lightblue' with the color you want
			ctx.fillRect(0, 0, canvasWidth, canvasHeight);

			// Draw the bats
			for (let i = 0; i < nbOfEnemies; i++) {
				batsArray[i].update();
				batsArray[i].draw();
			}

			// Draw the laser if left click
			if (firing) {
				laser1.updateAnimation();
				laser1.draw();
			}
		}

		gameFrame++;
		requestAnimationFrame(animate);
	}

	function onMouseMove(event: MouseEvent) {
		if (event.buttons === 1) {
			laser1.updatePos(event);
		}
	}
	function onMouseDown(event: MouseEvent) {
		pointerPos.x = event.offsetX;
		pointerPos.y = event.offsetY;
		firing = true;
		laser1 = new laser();
	}
	function onMouseUp() {
		pointerPos.x = 0;
		pointerPos.y = 0;
		firing = false;
	}
</script>

<div class="flex flex-col items-center mt-5">
	<div class="flex gap-4">
		<label for="enemyDial">Enemies</label>
		<input
			bind:value={enemyDial}
			name="enemyDial"
			type="range"
			min="0"
			max="100"
			class="range range-lg range-primary mb-4 w-96"
		/>
		{nbOfEnemies}
	</div>
	<div class="flex gap-4">
		<label for="twitchDial">Twitching</label>
		<input
			bind:value={twitchDial}
			name="twitchDial"
			type="range"
			min="0"
			max="100"
			class="range range-lg range-primary mb-4 w-96"
		/>
		{twitchDial}
	</div>

	<canvas
		on:mousedown={onMouseDown}
		on:mousemove={onMouseMove}
		class="w-[500px] h-[800px]"
		bind:this={canvas}
	/>
</div>

<svelte:window on:mouseup={onMouseUp} />
