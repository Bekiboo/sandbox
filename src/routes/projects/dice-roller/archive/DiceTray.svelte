<script lang="ts">
	import { fly } from 'svelte/transition'
	import type { Die } from './Die'

	export let dicePool: any

	async function rollAll() {
		dicePool.resetAll()
		setTimeout(() => {
			dicePool.rollAll()
		}, 100)
	}

	function rollOne(die: Die) {
		dicePool.reset(die)
		setTimeout(() => {
			dicePool.roll(die)
		}, 100)
	}
</script>

<div class="flex flex-wrap gap-2 min-h-[4rem]">
	{#each $dicePool.dice as die, i}
		{#if die.result != 0}
			<button
				in:fly={{ y: 20, duration: Math.random() * 1000 }}
				class="flex items-center justify-center w-6 h-6 font-bold text-black rounded cursor-pointer"
				style="background: {die.color}"
				on:dblclick={() => rollOne(die)}
			>
				{die.result}
			</button>
		{:else}
			<div class="flex items-center justify-center w-6 h-6 font-bold text-black rounded">
				&nbsp;
			</div>
		{/if}
	{/each}
</div>
<div class="flex justify-center gap-2 mt-4">
	<button class="btn btn-primary" on:click={rollAll}>Roll</button>
	<button class="btn btn-error" on:click={dicePool.resetAll}>Reset</button>
</div>
