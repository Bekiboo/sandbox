<script lang="ts">
	import Die from './Die.svelte'
	import type { DicePool } from './Die'

	export let dicePool: DicePool

	async function rollAll() {
		dicePool.resetAll()
		setTimeout(() => {
			dicePool.rollAll()
		}, 1)
	}
</script>

<div class="flex flex-wrap gap-2 min-h-[4rem]">
	{#each $dicePool.dice as die}
		<Die {die} on:roll={() => dicePool.reset(die)} />
	{/each}
</div>
<div class="flex justify-center gap-2 mt-4">
	<button class="btn btn-primary" on:click={rollAll}>Roll</button>
	<button class="btn btn-error" on:click={() => dicePool.resetAll()}>Reset</button>
</div>
