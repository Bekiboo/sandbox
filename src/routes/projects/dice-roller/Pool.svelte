<script lang="ts">
	import type { DicePool } from './Die'

	export let dicePool: DicePool
</script>

<div class="flex gap-2 mb-2">
	<h2>Dice Pool</h2>
	<button
		class="h-6 w-6 rounded text-slate-500 text-2xl border-slate-500
        border flex items-center justify-center cursor-pointer hover:border-slate-300
        hover:text-slate-300 duration-100 pb-[.13rem]"
		on:click={() => dicePool.addDie(6, 'd6')}
	>
		&#10010;
	</button>
</div>
<div class="flex flex-wrap gap-2">
	{#each $dicePool.dice as die}
		<div
			class="flex items-center justify-center w-6 h-6 font-bold text-black rounded cursor-pointer"
			style="background: {die.color}"
		>
			{die.name}
		</div>
	{/each}
</div>
