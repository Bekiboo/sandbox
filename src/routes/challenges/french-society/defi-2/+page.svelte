<script lang="ts">
	import { onMount, onDestroy, tick } from 'svelte'
	import { fly } from 'svelte/transition'

	let reverse: boolean = false
	$: direction = reverse ? -1 : 1

	const initialDuration = {
		days: 1,
		hours: 10,
		minutes: 12,
		seconds: 0
	}

	let currentTime = calculateInitialTime(initialDuration)

	let timeRemaining = {
		days: { tens: 0, ones: 0 },
		hours: { tens: 0, ones: 0 },
		minutes: { tens: 0, ones: 0 },
		seconds: { tens: 0, ones: 0 }
	}

	function calculateInitialTime(duration: {
		days: number
		hours: number
		minutes: number
		seconds: number
	}) {
		return (
			duration.days * 24 * 60 * 60 * 1000 +
			duration.hours * 60 * 60 * 1000 +
			duration.minutes * 60 * 1000 +
			duration.seconds * 1000
		)
	}

	function calculateTimeRemaining() {
		currentTime -= 1000 * direction
		updateTimeRemaining(currentTime)
	}

	function updateTimeRemaining(timeLeft: number) {
		timeRemaining = {
			days: calculateTimePart(timeLeft, 1000 * 60 * 60 * 24),
			hours: calculateTimePart(timeLeft % (1000 * 60 * 60 * 24), 1000 * 60 * 60),
			minutes: calculateTimePart(timeLeft % (1000 * 60 * 60), 1000 * 60),
			seconds: calculateTimePart(timeLeft % (1000 * 60), 1000)
		}
	}

	function calculateTimePart(timeLeft: number, divisor: number) {
		return {
			tens: Math.floor(timeLeft / divisor / 10),
			ones: Math.floor((timeLeft / divisor) % 10)
		}
	}

	let intervalId: NodeJS.Timeout | null = null

	onMount(() => {
		calculateTimeRemaining()
		intervalId = setInterval(() => {
			tick()
			calculateTimeRemaining()
		}, 1000)
	})

	onDestroy(() => {
		if (intervalId) {
			clearInterval(intervalId)
		}
	})
</script>

<main>
	<div class="countdown-container">
		<div class="header">
			<span>J</span>
			<span>H</span>
			<span>M</span>
			<span>S</span>
		</div>
		<div>
			{#each Object.values(timeRemaining) as digit, index}
				{#each Object.values(digit) as number}
					<div>
						{#each Array(10) as _, i}
							{#if number == i}
								<span
									class="digits"
									out:fly={{ y: 40 * direction, duration: 500 }}
									in:fly={{ y: -40 * direction, duration: 500 }}>{number}</span
								>
							{/if}
						{/each}
					</div>
				{/each}
				{#if index !== 3}
					<span>:</span>
				{/if}
			{/each}
		</div>
	</div>

	<div class="checkbox">
		<input type="checkbox" id="toggle" bind:checked={reverse} />
		<label for="toggle">
			<div class="toggle-button">Changer de sens!</div>
		</label>
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}
	.countdown-container {
		font-size: 2rem;
		width: 24rem;
	}

	.countdown-container div {
		display: flex;
		justify-content: space-around;
	}

	.digits {
		position: absolute;
	}

	.header {
		color: dimgray;
	}

	.checkbox {
		position: relative;
		display: flex;
		flex-direction: row-reverse;
		gap: 1rem;
		align-items: center;
		justify-content: center;
		margin-top: 2rem;
	}
</style>
