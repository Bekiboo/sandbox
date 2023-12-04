<script lang="ts">
	import { fly } from 'svelte/transition'
	import type { Die } from './Die'

	export let dice: any

	async function roll() {
		await reset()
		for (let die of $dice) {
			setTimeout(() => {
				die.roll()
			}, 200)
		}
	}

	async function reset() {
		for (let die of $dice) {
			die.reset()
		}
	}

	async function reroll(die: Die) {
		die.reset()
		setTimeout(() => {
			die.roll()
		}, 200)
	}
</script>

<div class="flex flex-wrap gap-1 min-h-[4rem]">
	{#each $dice as die}
		{#if die.result != 0}
			<button
				in:fly={{ y: 20, duration: Math.random() * 1000 }}
				class="flex items-center justify-center w-6 h-6 font-bold text-black rounded cursor-pointer"
				style="background: {die.color}"
				on:dblclick={() => reroll(die)}
			>
				{die.result}
			</button>
		{:else}
			<div class="flex items-center w-6 h-6 justify-center font-bold text-black rounded">
				&nbsp;
			</div>
		{/if}
	{/each}
</div>
<div class="flex justify-center gap-2 mt-4">
	<button class="btn btn-primary" on:click={roll}>Roll</button>
	<button class="btn btn-error" on:click={reset}>Reset</button>
</div>

<!-- <style>
	.rolls-container {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		min-height: 4rem;
	}

	.rolls-container > button {
		position: relative;
		font-weight: bold;
		color: black;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 0.25rem;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}

	.roll-buttons {
		display: flex;
		justify-content: center;
		gap: 2rem;
		margin-top: 1rem;
	}

	.roll-button,
	.reset-button {
		padding: 0.5rem 1rem;
		font-size: 1rem;
		cursor: pointer;
		border: none;
		border-radius: 0.25rem;
		transition: background-color 0.2s;
	}

	.roll-button {
		background-color: #4caf50;
		color: white;
	}

	.roll-button:hover {
		background-color: #45a049;
	}

	.reset-button {
		background-color: #f44336;
		color: white;
	}

	.reset-button:hover {
		background-color: #d32f2f;
	}
</style> -->
