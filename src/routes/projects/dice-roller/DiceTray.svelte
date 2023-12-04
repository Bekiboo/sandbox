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

<div class="rolls-container">
	{#each $dice as die}
		{#if die.result != 0}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				in:fly={{ y: 20, duration: Math.random() * 500 }}
				class=""
				style="background: {die.color}"
				on:dblclick={() => reroll(die)}
			>
				{die.result}
			</div>
		{:else}
			<div class="">&nbsp;</div>
		{/if}
	{/each}
</div>
<div class="roll-buttons">
	<button class="roll-button" on:click={roll}>Roll</button>
	<button class="reset-button" on:click={reset}>Reset</button>
</div>

<style>
	.rolls-container {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		min-height: 4rem;
	}

	.rolls-container > div {
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
</style>
