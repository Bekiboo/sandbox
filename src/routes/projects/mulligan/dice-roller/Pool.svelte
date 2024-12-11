<script lang="ts">
	import type { DicePool } from './Die'

	interface Props {
		dicePool: DicePool;
	}

	let { dicePool }: Props = $props();

	let selected: unknown | null = $state(null)
</script>

<div class="flex gap-2 mb-2">
	<h2>Dice Pool</h2>
</div>
<div class="flex flex-wrap gap-2">
	{#each $dicePool.dice as die}
		<button
			type="button"
			class="flex items-center justify-center w-6 h-6 font-bold text-black rounded cursor-pointer"
			style="background: {die.color}"
			draggable="true"
			ondrag={() => console.log('dragging')}
			onfocus={() => (selected = die)}
			onfocusout={() => (selected = null)}
			class:selected={selected === die}
		>
			{die.name}
		</button>
	{/each}
	<button
		class="h-6 w-6 rounded text-slate-500 text-2xl border-slate-500
        border flex items-center justify-center cursor-pointer hover:border-slate-300
        hover:text-slate-300 duration-100 pb-[.13rem]"
		onclick={() => dicePool.addDie(6, 'd6')}
	>
		&#10010;
	</button>
</div>

<style>
	.selected {
		border: 2px solid #000;
	}
</style>
