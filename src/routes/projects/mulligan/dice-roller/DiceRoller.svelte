<script lang="ts">
	import DiceTray from './Tray.svelte'
	import { DicePool } from './Die'
	import Pool from './Pool.svelte'
	import DicePools from './DicePools.svelte'
	import { onMount } from 'svelte'

	let dicePool = new DicePool('dicePool')
	dicePool.addDie(6, 'd6')
	dicePool.addDie(6, 'd6')
	dicePool.addDie(6, 'd6')
</script>

<DicePools />

<div class="flex flex-col w-48 gap-8 mx-auto mt-8 select-none">
	<div>
		<h2>Rolls</h2>
		<DiceTray {dicePool} />
	</div>
</div>
