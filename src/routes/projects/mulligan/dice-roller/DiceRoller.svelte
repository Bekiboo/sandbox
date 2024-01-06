<script lang="ts">
	import DiceTray from './Tray.svelte'
	import { DicePool } from './Die'
	import Pool from './Pool.svelte'

	let dicePool = new DicePool('dicePool')
	dicePool.addDie(6, 'd6')
	dicePool.addDie(6, 'd6')
	dicePool.addDie(6, 'd6')
</script>

<div class="flex flex-col w-48 gap-8 mx-auto mt-8 select-none">
	<div>
		<Pool {dicePool} />
	</div>

	<div>
		<h2>Rolls</h2>
		<DiceTray {dicePool} />
	</div>
</div>
