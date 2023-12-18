<script lang="ts">
	import DiceTray from './Tray.svelte'
	import { DicePool } from './Die'
	import OptionWheel from './OptionWheel.svelte'
	import Pool from './Pool.svelte'

	let dicePool = new DicePool('dicePool')
	dicePool.addDie(6, 'd6')
	dicePool.addDie(6, 'd6')
	dicePool.addDie(6, 'd6')

	let options = ['one', 'two', 'three', 'four', 'five', 'six']
</script>

<OptionWheel {options} />

<div class="flex flex-col w-48 gap-8 mx-auto mt-8 select-none">
	<div>
		<Pool {dicePool} />
	</div>

	<div>
		<h2>Rolls</h2>
		<DiceTray {dicePool} />
	</div>
</div>
