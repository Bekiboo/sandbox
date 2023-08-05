<script lang="ts">
	import { onMount } from 'svelte';

	let root: HTMLDivElement;
	let ballsContainer: HTMLDivElement;
	let balls: { element: HTMLDivElement; velocityY: number; velocityX: number }[] = [];
	const NUM_BALLS = 5; // Number of balls to generate

	const GRAVITY = 0.3;
	const bounceFactor = -0.6;

	const dropBall = (ball: { element: HTMLDivElement; velocityY: number; velocityX: number }) => {
		const ballBottom = ball.element.offsetTop + ball.element.clientHeight;

		ball.velocityY += GRAVITY;
		ball.element.style.top = `${ball.element.offsetTop + ball.velocityY}px`;
		ball.element.style.left = `${ball.element.offsetLeft + ball.velocityX}px`;

		if (ballBottom > root.clientHeight) {
			ball.velocityY *= bounceFactor;
			ball.element.style.top = `${root.clientHeight - ball.element.clientHeight}px`;
		}
	};

	const resetBall = (ball: { element: HTMLDivElement; velocityY: number; velocityX: number }) => {
		ball.element.style.top = '0px';
		ball.element.style.left = '0px';
		ball.velocityY = 0;
	};

	function updateFunction() {
		balls.forEach(dropBall);
	}

	function run60TimesPerSecond() {
		const interval = 1000 / 60;

		let lastTime = 0;
		let accumulatedTime = 0;

		function step(timestamp: number) {
			if (!lastTime) {
				lastTime = timestamp;
			}

			const deltaTime = timestamp - lastTime;
			lastTime = timestamp;

			accumulatedTime += deltaTime;

			while (accumulatedTime >= interval) {
				updateFunction();
				accumulatedTime -= interval;
			}

			requestAnimationFrame(step);
		}

		requestAnimationFrame(step);
	}

	onMount(() => {
		for (let i = 0; i < NUM_BALLS; i++) {
			const ballDiv = document.createElement('div');
			ballDiv.className = 'absolute w-8 h-8 bg-red-500 rounded-full';
			balls.push({ element: ballDiv, velocityY: 1, velocityX: Math.random() * 3 });
			ballsContainer.appendChild(ballDiv);
		}

		run60TimesPerSecond();
	});
</script>

<div bind:this={root}>
	<div bind:this={ballsContainer} />
	<h1>Welcome to SvelteKit</h1>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

	<button class="btn btn-primary mt-80" on:click={() => balls.forEach(resetBall)}>Click</button>
</div>
