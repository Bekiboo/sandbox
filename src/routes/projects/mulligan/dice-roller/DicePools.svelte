<script lang="ts">
	import { onMount } from 'svelte'
	import { DicePool } from './Die'
	import { createDicePool, dicePoolsStore, getDicePools } from './diceRollerService'
	import Pool from './Pool.svelte'

	$: console.log($dicePoolsStore)

	// onMount(() => {
	// 	getDicePools()
	// })

	// $: console.log(dicePools)
</script>

<!-- 
<button on:click={addDicePool}>New Dice Pool</button>

{#each dicePools as dicePool}
	<Pool {dicePool} />
{/each} -->
