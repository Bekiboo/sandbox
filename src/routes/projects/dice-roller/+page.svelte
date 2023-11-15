<!-- This page is to make a highly customizable dice roller. -->
<script lang="ts">
	import { fly } from 'svelte/transition'

	class Die {
		color: string
		result: number
		constructor(
			public sides: number,
			public name: string
		) {
			this.color = 'white'
			this.result = 0
		}

		roll() {
			this.result = Math.floor(Math.random() * this.sides) + 1
		}

		reset() {
			this.result = 0
		}
	}

	let dice: Die[] = [new Die(6, 'd6'), new Die(6, 'd6'), new Die(6, 'd6'), new Die(6, 'd6')]

	function roll() {
		reset()
		dice = dice
		setTimeout(() => {
			for (let die of dice) {
				die.roll()
			}
			dice = dice
		}, 100)
	}

	function reset() {
		for (let die of dice) {
			die.reset()
		}
	}

	function reroll(die: Die) {
		die.reset()
		dice = dice
		setTimeout(() => {
			die.roll()
			dice = dice
		}, 100)
	}
</script>

<div class="flex flex-col w-48 gap-8 mx-auto mt-8 select-none">
	<div>
		<div class="flex gap-2 mb-2">
			<h2>Dice Pool</h2>
			<button
				class="h-6 w-6 rounded text-slate-500 text-2xl border-slate-500
				border flex items-center justify-center cursor-pointer hover:border-slate-300
				hover:text-slate-300 duration-100 pb-[.13rem]"
				on:click={() => (dice = [...dice, new Die(6, 'd6')])}
			>
				&#10010;
			</button>
		</div>
		<div class="flex flex-wrap gap-2">
			{#each dice as die}
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
		<div class="flex flex-wrap gap-2 min-h-[4rem]">
			{#each dice as die, i}
				{#if die.result != 0}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div
						in:fly={{ y: 20, duration: Math.random() * 500, delay: 20 * i }}
						class="flex items-center justify-center w-6 h-6 font-bold text-black rounded cursor-pointer"
						style="background: {die.color}"
						on:dblclick={() => reroll(die)}
					>
						{die.result}
					</div>
				{:else}
					<div class="flex items-center justify-center w-6 h-6 font-bold text-black rounded">
						&nbsp;
					</div>
				{/if}
			{/each}
		</div>
		<div class="flex justify-center gap-2 mt-4">
			<button class="btn btn-primary" on:click={roll}>Roll</button>
			<button class="btn btn-error" on:click={reset}>Reset</button>
		</div>
	</div>
</div>
