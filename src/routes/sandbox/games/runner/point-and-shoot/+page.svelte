<script lang="ts">
	import { onMount } from 'svelte';
	import { loadImage, loadAudio } from '../utils';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;
	let canvasWidth: number;
	let canvasHeight: number;

	const BAT_INTERVAL = 200; // ms

	let timeToNextBat = 0;
	let batInterval = BAT_INTERVAL;
	let lastTime = 0;

	let batsArray: Bat[] = [];

	class Bat {
		readonly spriteWidth = 15.5;
		readonly spriteHeight = 15.5;
		readonly depth = Math.random() * 0.5 + 0.5;
		readonly width = this.spriteWidth * this.depth * 5;
		readonly height = this.spriteHeight * this.depth * 5;
		readonly image = loadImage('/runner/point-and-shoot/TerrorBatSideIdle.png');

		public markedForDeletion: boolean;

		private x: number;
		private y: number;
		private directionX: number;
		private directionY: number;
		private frame: number;
		private readonly maxFrame = 3;
		private timeSinceFlap: number;
		private readonly flapInterval: number;

		constructor(canvasWidth: number, canvasHeight: number) {
			this.x = canvasWidth;
			this.y = Math.random() * (canvasHeight - this.height);
			this.directionX = ((this.depth + 1) * (this.depth + 1) * (this.depth + 1)) / 4;
			this.directionY = Math.random() * 3 - 1.5;
			this.markedForDeletion = false;
			this.frame = 1;
			this.timeSinceFlap = 0;
			this.flapInterval = Math.random() * 50 + 50;
		}

		update(deltaTime: number) {
			if (this.y < 0 || this.y > canvasHeight - this.height) this.directionY *= -1;
			this.x -= this.directionX;
			if (this.x < 0 - this.width) this.markedForDeletion = true;
			this.timeSinceFlap += deltaTime;
			if (this.timeSinceFlap > this.flapInterval) {
				this.frame >= this.maxFrame ? (this.frame = 0) : this.frame++;
				this.timeSinceFlap = 0;
			}
			this.y += this.directionY;
		}

		draw(ctx: CanvasRenderingContext2D) {
			ctx.save();
			ctx.globalAlpha = this.depth;
			ctx.drawImage(
				this.image,
				this.frame * (this.spriteWidth + 0.5),
				0,
				this.spriteWidth,
				this.spriteHeight,
				this.x,
				this.y,
				this.width,
				this.height
			);
			ctx.restore();
		}

		chechIfCollided(event: MouseEvent) {
			if (
				event.offsetX > this.x &&
				event.offsetX < this.x + this.width &&
				event.offsetY > this.y &&
				event.offsetY < this.y + this.height
			) {
				this.markedForDeletion = true;
				explosions.push(new Explosion(this.x, this.y, this.width));
			}
		}
	}

	const explosionSounds = [
		'/runner/point-and-shoot/hit01.mp3.flac',
		'/runner/point-and-shoot/hit02.mp3.flac',
		'/runner/point-and-shoot/hit04.mp3.flac',
		'/runner/point-and-shoot/hit08.mp3.flac',
		'/runner/point-and-shoot/hit11.mp3.flac'
	];

	let explosions: Explosion[] = [];
	class Explosion {
		image: HTMLImageElement;
		spriteWidth: number;
		spriteHeight: number;
		size: any;
		x: any;
		y: any;
		frame: number;
		sound: HTMLAudioElement;
		timeSinceLastFrame: number;
		frameInterval: number;
		// markedForDeletion: boolean;
		constructor(x: number, y: number, size: number) {
			this.image = loadImage('/runner/point-and-shoot/explosion-16.png');
			this.spriteWidth = 16;
			this.spriteHeight = 16;
			this.size = size;
			this.x = x;
			this.y = y;
			this.frame = 0;
			const randomSoundIndex = Math.floor(Math.random() * explosionSounds.length);
			this.sound = loadAudio(explosionSounds[randomSoundIndex]);
			this.sound.volume = 0.5;
			this.timeSinceLastFrame = 0;
			this.frameInterval = 50;
		}
		update(deltaTime: number) {
			if (this.frame === 0) this.sound.play();
			this.timeSinceLastFrame += deltaTime;
			if (this.timeSinceLastFrame > this.frameInterval) {
				this.frame++;
				this.timeSinceLastFrame = 0;
			}
			// if (this.frame > 5) this.markedForDeletion = true;
		}
		draw(ctx: CanvasRenderingContext2D) {
			ctx.drawImage(
				this.image,
				this.frame * this.spriteWidth,
				0,
				this.spriteWidth,
				this.spriteHeight,
				this.x,
				this.y,
				this.size,
				this.size
			);
		}
	}

	onMount(() => {
		ctx = canvas.getContext('2d');
		canvasWidth = canvas.width = 500;
		canvasHeight = canvas.height = 800;

		animate(0);
	});

	function animate(timestamp: number) {
		if (ctx) {
			ctx.clearRect(0, 0, canvasWidth, canvasHeight);
			ctx.fillStyle = 'grey'; // Replace 'lightblue' with the color you want
			ctx.fillRect(0, 0, canvasWidth, canvasHeight);

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

			requestAnimationFrame(animate);
		}
	}

	function handleClick(event: MouseEvent) {
		batsArray.forEach((bat) => bat.chechIfCollided(event));
	}
</script>

<div class="flex flex-col items-center mt-5">
	<div class="text-xl font-bold text-white">{batsArray.length}</div>
	<canvas on:click={handleClick} class="w-[500px] h-[800px]" bind:this={canvas} />
</div>
