<script lang="ts">
	import { onMount } from 'svelte';
	import { handleKeysDown } from './keyboardInputHandler';

	let canvas: HTMLCanvasElement = $state();
	let ctx: CanvasRenderingContext2D;

	const CELL_SIZE = 20;
	const GRID_WIDTH = 24;
	const GRID_HEIGHT = 32;

	let snake = [
		{ x: 3, y: 2 },
		{ x: 4, y: 2 },
		{ x: 4, y: 3 },
		{ x: 4, y: 4 }
	];

	let head = { x: 4, y: 4 };
	let snakeDirection = 'right';

	let apples = [];

	let ticksSinceLastApple = 0;

	onMount(() => {
		if (canvas) ctx = canvas.getContext('2d');
		canvas.height = CELL_SIZE * GRID_HEIGHT;
		canvas.width = CELL_SIZE * GRID_WIDTH;

		animate();
	});

	function animate() {
		setInterval(() => {
			ctx.clearRect(0, 0, canvas?.width, canvas?.height);
			moveSnake();
			drawApples();
			ticksSinceLastApple++;
			if (ticksSinceLastApple % 10 == 0) {
				addApple();
			}
		}, 200);
	}

	function drawSnakePart(x: number, y: number) {
		ctx.beginPath();
		ctx.rect((x - 1) * CELL_SIZE, (y - 1) * CELL_SIZE, CELL_SIZE, CELL_SIZE);
		ctx.closePath();

		ctx.fillStyle = 'rgba(0,255,0,1)';
		ctx.fill();
	}

	function moveSnake() {
		switch (snakeDirection) {
			case 'up':
				snake.shift();
				head = {
					x: head.x,
					y: head.y - 1 < 1 ? GRID_HEIGHT : head.y - 1
				};
				snake.push(head);
				break;

			case 'down':
				snake.shift();
				head = {
					x: head.x,
					y: head.y + 1 > GRID_HEIGHT ? 1 : head.y + 1
				};
				snake.push(head);
				break;

			case 'left':
				snake.shift();
				head = {
					x: head.x - 1 < 1 ? GRID_WIDTH : head.x - 1,
					y: head.y
				};
				snake.push(head);
				break;

			case 'right':
				snake.shift();
				head = {
					x: head.x + 1 > GRID_WIDTH ? 1 : head.x + 1,
					y: head.y
				};
				snake.push(head);
				break;
		}
		snake.forEach((part) => drawSnakePart(part.x, part.y));

		apples.forEach((apple) => {
			if (head.x == apple.x && head.y == apple.y) {
				apples = apples.filter((eatenApple) => eatenApple.x != apple.x && eatenApple.y != apple.y);
				snake = [snake[0], ...snake];
			}
		});
	}

	function addApple() {
		apples.push({
			x: Math.floor(Math.random() * GRID_WIDTH),
			y: Math.floor(Math.random() * GRID_HEIGHT)
		});
	}

	function drawApples() {
		apples.forEach((apple) => {
			ctx.beginPath();
			ctx.rect((apple.x - 1) * CELL_SIZE, (apple.y - 1) * CELL_SIZE, CELL_SIZE, CELL_SIZE);
			ctx.closePath();

			ctx.fillStyle = 'rgba(255,0,0,1)';
			ctx.fill();
		});
	}

	function handleKeyDown(e) {
		const direction = handleKeysDown(e);
		if (!direction) return;

		snakeDirection = direction;
	}
</script>

<canvas
	style="width: {CELL_SIZE * GRID_WIDTH}; height: {CELL_SIZE * GRID_HEIGHT}"
	bind:this={canvas}
></canvas>

<svelte:window onkeydown={handleKeyDown} />

<style>
	canvas {
		border: white 1px solid;
		margin-inline: auto;
	}
</style>
