<script lang="ts">
	import { onMount } from 'svelte';
	import { loadImage } from '../utils';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;
	let canvasWidth: number;
	let canvasHeight: number;
	// let rect1 = {
	// 	x: 0,
	// 	y: 0,
	// 	width: 100,
	// 	height: 100
	// };
	// let rect2 = {
	// 	x: 0,
	// 	y: 0,
	// 	width: 100,
	// 	height: 100
	// };

	// if (
	// 	rect1.x > rect2.x + rect2.width &&
	// 	rect1.x + rect1.width < rect2.x &&
	// 	rect1.y > rect2.y + rect2.height &&
	// 	rect1.y + rect1.height < rect2.y
	// ) {
	// 	console.log('no collision');
	// } else {
	// 	console.log('collision detected');
	// }

	const circle1 = {
		radius: 20,
		x: 10,
		y: 10
	};

	const circle2 = {
		radius: 20,
		x: 40,
		y: 10
	};

	let dx = circle1.x - circle2.x;
	let dy = circle1.y - circle2.y;
	let distance = Math.sqrt(dx * dx + dy * dy);
	let sumOfRadii = circle1.radius + circle2.radius;

	if (distance < sumOfRadii) {
		console.log('collision detected');
	} else if (distance === sumOfRadii) {
		console.log('collision detected');
	} else if (distance > sumOfRadii) {
		console.log('no collision');
	}

	onMount(() => {
		ctx = canvas.getContext('2d');
		canvasWidth = canvas.width = 500;
		canvasHeight = canvas.height = 800;

		// for (let i = 0; i < numberOfBats; i++) {
		// 	batsArray.push(new Bat());
		// }

		animate();
	});
	function animate() {
		if (ctx) {
			// Fill the canvas with a background color
			ctx.fillStyle = 'grey'; // Replace 'lightblue' with the color you want
			ctx.fillRect(0, 0, canvasWidth, canvasHeight);

			ctx.fillStyle = 'red';
			ctx.beginPath();
			ctx.arc(100, 75, 50, 0, 2 * Math.PI);
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(120, 75, 60, 0, 2 * Math.PI);
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(100, 75, 50, 0, 2 * Math.PI);
			ctx.stroke();
			// 	// Draw the bats
			// 	for (let i = 0; i < nbOfEnemies; i++) {
			// 		batsArray[i].update();
			// 		batsArray[i].draw();
			// 	}
			// }

			// gameFrame++;
			requestAnimationFrame(animate);
		}
	}
</script>

<div class="flex flex-col items-center mt-5">
	<canvas class="w-[500px] h-[800px]" bind:this={canvas} />
</div>
