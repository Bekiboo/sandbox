<script lang="ts">
	import { emoji } from './emoji'

	type State = 'start' | 'playing' | 'won' | 'lost'

	let state: State = 'start'
	let size = 20
	let grid = createGrid()
	let maxMatches = grid.length / 2
	let selected: number[] = []
	let matches: string[] = []
	let timerId: NodeJS.Timer | null = null
	let time = 60

	function startGameTimer() {
		timerId = setInterval(() => {
			time--
		}, 1000)
	}

	function createGrid() {
		let cards = new Set<string>()
		let maxSize = size / 2

		while (cards.size < maxSize) {
			const randomIndex = Math.floor(Math.random() * emoji.length)
			cards.add(emoji[randomIndex])
		}

		return shuffle([...cards, ...cards])
	}

	function shuffle<Items>(array: Items[]) {
		return array.sort(() => Math.random() - 0.5)
	}

	function selectCard(cardIndex: number) {
		selected = selected.concat(cardIndex)
	}

	function matchCards() {
		const [first, second] = selected

		if (grid[first] === grid[second]) {
			matches = matches.concat(grid[first])
		}

		setTimeout(() => {
			selected = []
		}, 500)
	}

	function resetGame() {
		timerId && clearInterval(timerId)
		grid = createGrid()
		maxMatches = grid.length / 2
		selected = []
		matches = []
		timerId = null
		time = 60
	}

	function gameWon() {
		state = 'won'
		resetGame()
	}

	function gameLost() {
		state = 'lost'
		resetGame()
	}

	$: if (state === 'playing') {
		!timerId && startGameTimer()
	}

	$: selected.length == 2 && matchCards()
	$: maxMatches == matches.length && gameWon()
	$: time == 0 && gameLost()

	// $: console.log({ state, selected, matches })
</script>

{#if state === 'start'}
	<h1>Matching Game</h1>
	<button on:click={() => (state = 'playing')}>Play</button>
{/if}

{#if state == 'playing'}
	<h1 class="timer" class:pulse={time <= 10}>{time}</h1>
	<div class="grid grid-cols-5 gap-2 m-auto w-fit">
		{#each grid as card, cardIndex}
			{@const isSelected = selected.includes(cardIndex)}
			{@const isSelectedOrMatched = isSelected || matches.includes(card)}
			{@const isMatched = matches.includes(card)}

			<button
				class="flex items-center justify-center w-32 h-32 text-6xl bg-primary card"
				class:isSelected
				class:flip={isSelectedOrMatched}
				class:disabled={isSelectedOrMatched}
				on:click={() => selectCard(cardIndex)}
			>
				<div class="back" class:isMatched>{card}</div>
			</button>
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

<style>
	.card {
		transition: rotate 0.3s ease-out;
		transform-style: preserve-3d;
	}

	.card.flip {
		rotate: y 180deg;
		pointer-events: none;
	}

	.back {
		@apply absolute inset-0 grid place-items-center;
		backface-visibility: hidden;
		rotate: y 180deg;
	}

	.isSelected {
		@apply border-4 border-solid border-primary;
	}

	.isMatched {
		@apply opacity-40 transition-opacity ease-in-out duration-300;
	}

	/* .matches {
		@apply flex flex-row flex-wrap justify-center gap-4 text-2xl;
	} */

	.timer {
		@apply text-6xl text-center;
	}

	.pulse {
		@apply animate-pulse text-accent;
	}
</style>
