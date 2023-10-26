<script lang="ts">
	import { emoji } from './emoji'
	import { useMachine } from './useMachine'

	type State = 'start' | 'playing' | 'won' | 'paused' | 'gameover'

	const { state, send } = useMachine(gameMachine, 'start')

	function gameMachine(state: State, event: { type: string; data?: any }) {
		switch (state) {
			case 'start':
				if (event.type === 'CLICK') {
					return 'playing'
				}
			case 'playing':
				if (event.type === 'ESCAPE') {
					console.log('paused')

					return 'paused'
				}
				if (event.type === 'CLICK') {
					selectCard(event.data)
					selected.length == 2 && matchCards()

					if (matches.length == emoji.length) {
						return 'gameover'
					}

					return 'playing'
				}
			case 'paused':
				if (event.type === 'ESCAPE') {
					return 'playing'
				}
			case 'gameover':
				if (event.type === 'CLICK') {
					resetGame()
					return 'playing'
				}

			default:
				return state
		}
	}

	let size = 20
	let grid = createGrid()
	let maxMatches = grid.length / 2
	let selected: number[] = []
	let matches: string[] = []
	let timerId: any | null = null
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
		$state = 'won'
		resetGame()
	}

	function gameLost() {
		$state = 'gameover'
		resetGame()
	}

	function handleKeyDown(e: KeyboardEvent) {
		e.key === 'Escape' && send({ type: 'ESCAPE' })
	}

	$: if ($state === 'playing') {
		!timerId && startGameTimer()
	}

	$: selected.length == 2 && matchCards()
	$: maxMatches == matches.length && gameWon()
	$: time == 0 && gameLost()
</script>

{#if $state == 'playing'}
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

{#if $state === 'start'}
	<div class="flex flex-col justify-center items-center w-screen h-screen">
		<h1 class="text-2xl">Matching Game</h1>
		<button
			on:click={() => send({ type: 'CLICK' })}
			class="btn btn-primary mt-4 uppercase btn-lg btn-wide">Play</button
		>
	</div>
{/if}
{#if $state == 'gameover'}
	<div class="flex flex-col justify-center items-center w-screen h-screen">
		<h1 class="text-2xl">You lost 💩</h1>
		<button
			on:click={() => ($state = 'playing')}
			class="btn btn-primary mt-4 uppercase btn-lg btn-wide">Play again</button
		>
	</div>
{/if}

{#if $state == 'won'}
	<div class="flex flex-col justify-center items-center w-screen h-screen">
		<h1 class="text-2xl">You won!</h1>
		<button
			on:click={() => ($state = 'playing')}
			class="btn btn-primary mt-4 uppercase btn-lg btn-wide">Play again</button
		>
	</div>
{/if}

<svelte:window on:keydown={handleKeyDown} />

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
