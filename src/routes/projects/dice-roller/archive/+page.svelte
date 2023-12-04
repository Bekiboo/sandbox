<script lang="ts">
	import { fly } from 'svelte/transition'
	import { createDicePool } from './dicePoolStore'
	import { Die } from './Die'
	import DiceTray from './DiceTray.svelte'

	let dicePool = createDicePool('pool1')

	dicePool.addDie(new Die(6, 'd6'))
	dicePool.addDie(new Die(6, 'd6'))
	dicePool.addDie(new Die(6, 'd6'))
	dicePool.addDie(new Die(6, 'd6'))
	dicePool.addDie(new Die(6, 'd6'))
</script>

<div class="flex flex-col w-48 gap-8 mx-auto mt-8 select-none">
	<div>
		<div class="flex gap-2 mb-2">
			<h2>Dice Pool</h2>
			<button
				class="h-6 w-6 rounded text-slate-500 text-2xl border-slate-500
				border flex items-center justify-center cursor-pointer hover:border-slate-300
				hover:text-slate-300 duration-100 pb-[.13rem]"
				on:click={() => dicePool.addDie(new Die(6, 'd6'))}
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
	</div>

	<div>
		<h2>Rolls</h2>
		<DiceTray {dicePool} />
	</div>
</div>
