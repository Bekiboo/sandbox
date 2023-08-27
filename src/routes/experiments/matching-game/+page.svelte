<script lang="ts">
	import { emoji } from './emoji'

	type State = 'start' | 'playing' | 'paused' | 'won' | 'lost'

	let state: State = 'playing'
	let size = 20
	let grid = createGrid()
	let maxMatches = grid.length / 2
	let selected: number[] = []
	let matches: string[] = []

	function createGrid() {
		// only want unique cards
		let cards = new Set<string>()
		// half because we duplicate the cards
		let maxSize = size / 2

		while (cards.size < maxSize) {
			// pick random emoji
			const randomIndex = Math.floor(Math.random() * emoji.length)
			cards.add(emoji[randomIndex])
		}

		// duplicate and shuffle cards
		return shuffle([...cards, ...cards])
	}

	function shuffle<Items>(array: Items[]) {
		return array.sort(() => Math.random() - 0.5)
	}
</script>

{#if state === 'start'}
	<h1>Matching Game</h1>
	<button on:click={() => (state = 'playing')}>Play</button>
{/if}

{#if state == 'playing'}
	<div class="grid grid-cols-5 gap-2 m-auto w-fit">
		{#each grid as card, cardIndex}
			<button class="flex items-center justify-center w-32 h-32 text-6xl bg-accent card"
				><div>{card}</div></button
			>
		{/each}
	</div>
{/if}

{#if state == 'lost'}
	<h1>You lost 💩</h1>
	<button on:click={() => (state = 'playing')}>Play again</button>
{/if}

{#if state == 'won'}
	<h1>You won</h1>
	<button on:click={() => (state = 'playing')}>Play again</button>
{/if}
