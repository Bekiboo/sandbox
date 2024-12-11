<script lang="ts">
	import Die from './Die.svelte'
	import type { DicePool } from './Die'

	interface Props {
		dicePool: DicePool;
	}

	let { dicePool }: Props = $props();

	async function rollAll() {
		dicePool.resetAll()
		setTimeout(() => {
			dicePool.rollAll()
		}, 1)
	}
</script>

<div class="flex flex-wrap gap-2 min-h-[4rem]">
	{#each $dicePool.dice as die}
		<Die {die} {dicePool} />
	{/each}
</div>
<div class="flex justify-center gap-2 mt-4">
	<button class="btn btn-primary" onclick={rollAll}>Roll</button>
	<button class="btn btn-error" onclick={() => dicePool.resetAll()}>Reset</button>
</div>
