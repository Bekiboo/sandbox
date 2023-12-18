<script lang="ts">
	import { fly } from 'svelte/transition'
	import type { DicePool, Die } from './Die'
	import { backIn } from 'svelte/easing'

	export let die: Die
	export let dicePool: DicePool

	function rollOne(die: Die) {
		dicePool.reset(die)
		setTimeout(() => {
			dicePool.roll(die)
		}, 100)
	}
</script>

{#if die.result != 0}
	<button
		type="button"
		in:fly={{ y: 20, duration: Math.random() * 500, easing: backIn }}
		class="flex items-center justify-center w-6 h-6 font-bold text-black rounded cursor-pointer"
		style="background: {die.color}"
		on:dblclick={() => rollOne(die)}
	>
		{die.result}
	</button>
{:else}
	<div class="flex items-center justify-center w-6 h-6 font-bold text-black rounded">&nbsp;</div>
{/if}
