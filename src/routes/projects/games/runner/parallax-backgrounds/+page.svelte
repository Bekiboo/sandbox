<script lang="ts">
	import { onMount } from 'svelte';
	import { loadImage } from '../utils';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;
	let canvasWidth: number;
	let canvasHeight: number;

	let gameSpeed = 3;

	let backgroundLayer1: HTMLImageElement;
	let backgroundLayer2: HTMLImageElement;
	let backgroundLayer3: HTMLImageElement;
	let backgroundLayer4: HTMLImageElement;
	let backgroundLayer5: HTMLImageElement;

	let gameObjects: Layer[] = [];

	onMount(() => {
		ctx = canvas.getContext('2d');
		canvasWidth = canvas.width = 800;
		canvasHeight = canvas.height = 700;

		backgroundLayer1 = loadImage('/runner/background/1.png');
		backgroundLayer2 = loadImage('/runner/background/2.png');
		backgroundLayer3 = loadImage('/runner/background/3.png');
		backgroundLayer4 = loadImage('/runner/background/4.png');
		backgroundLayer5 = loadImage('/runner/background/5.png');

		gameObjects = [
			new Layer(backgroundLayer1, 0.2),
			new Layer(backgroundLayer2, 0.4),
			new Layer(backgroundLayer3, 0.6),
			new Layer(backgroundLayer4, 0.8),
			new Layer(backgroundLayer5, 1)
		];

		animate();
	});

	class Layer {
		x: number;
		y: number;
		width: number;
		height: number;
		x2: number;
		image: any;
		speedModifier: number;
		speed: number;
		constructor(image: any, speedModifier: number) {
			this.x = 0;
			this.y = 0;
			this.width = 2400;
			this.height = 700;
			this.x2 = this.width;
			this.image = image;
			this.speedModifier = speedModifier;
			this.speed = gameSpeed * this.speedModifier;
		}
		update() {
			this.speed = gameSpeed * this.speedModifier;
			if (this.speed > 0) {
				// Moving forward
				if (this.x <= -this.width) this.x = this.width;
				if (this.x2 <= -this.width) this.x2 = this.width;
				this.x = Math.floor(this.x - this.speed);
				this.x2 = Math.floor(this.x2 - this.speed);
			} else {
				// Moving backward
				if (this.x >= this.width) this.x = -this.width;
				if (this.x2 >= this.width) this.x2 = -this.width;
				this.x = Math.floor(this.x - this.speed);
				this.x2 = Math.floor(this.x2 - this.speed);
			}
		}
		draw() {
			ctx?.drawImage(this.image, this.x, this.y, this.width, this.height);
			ctx?.drawImage(this.image, this.x2, this.y, this.width, this.height);
		}
	}

	function animate() {
		ctx?.clearRect(0, 0, canvasWidth, canvasHeight);

		gameObjects.forEach((object) => {
			object.update();
			object.draw();
		});

		requestAnimationFrame(animate);
	}
</script>

<div class="flex flex-col items-center mt-5">
	<input
		bind:value={gameSpeed}
		type="range"
		min="-50"
		max="50"
		class="range range-lg range-primary mb-4 w-96"
	/>

	<canvas class="w-[800px] h-[700px]" bind:this={canvas} />
</div>
