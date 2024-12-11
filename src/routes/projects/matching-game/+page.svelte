<script lang="ts">
	import { emoji } from './emoji';
	import { useMachine } from './useMachine';

	type GameState = 'start' | 'playing' | 'won' | 'paused' | 'gameover';

	const { gameState, send } = useMachine(gameMachine, 'start');

	function gameMachine(gameState: GameState, event: { type: string; data?: any }) {
		switch (gameState) {
			case 'start':
				if (event.type === 'CLICK') {
					return 'playing';
				}
			case 'playing':
				if (event.type === 'ESCAPE') {
					console.log('paused');

					return 'paused';
				}
				if (event.type === 'CLICK') {
					selectCard(event.data);
					selected.length == 2 && matchCards();

					if (matches.length == emoji.length) {
						return 'gameover';
					}

					return 'playing';
				}
			case 'paused':
				if (event.type === 'ESCAPE') {
					return 'playing';
				}
			case 'gameover':
				if (event.type === 'CLICK') {
					resetGame();
					return 'playing';
				}

			default:
				return gameState;
		}
	}

	let size = 20;
	let grid = $state(createGrid());
	let maxMatches = $state(grid.length / 2);
	let selected: number[] = $state([]);
	let matches: string[] = $state([]);
	let timerId: any | null = $state(null);
	let time = $state(60);

	function startGameTimer() {
		timerId = setInterval(() => {
			time--;
		}, 1000);
	}

	function createGrid() {
		let cards = new Set<string>();
		let maxSize = size / 2;

		while (cards.size < maxSize) {
			const randomIndex = Math.floor(Math.random() * emoji.length);
			cards.add(emoji[randomIndex]);
		}

		return shuffle([...cards, ...cards]);
	}

	function shuffle<Items>(array: Items[]) {
		return array.sort(() => Math.random() - 0.5);
	}

	function selectCard(cardIndex: number) {
		selected = selected.concat(cardIndex);
	}

	function matchCards() {
		const [first, second] = selected;

		if (grid[first] === grid[second]) {
			matches = matches.concat(grid[first]);
		}

		setTimeout(() => {
			selected = [];
		}, 500);
	}

	function resetGame() {
		timerId && clearInterval(timerId);
		grid = createGrid();
		maxMatches = grid.length / 2;
		selected = [];
		matches = [];
		timerId = null;
		time = 60;
	}

	function gameWon() {
		$gameState = 'won';
		resetGame();
	}

	function gameLost() {
		$gameState = 'gameover';
		resetGame();
	}

	function handleKeyDown(e: KeyboardEvent) {
		e.key === 'Escape' && send({ type: 'ESCAPE' });
	}

	$effect(() => {
		if ($gameState === 'playing') {
			!timerId && startGameTimer();
		}
	});

	$effect(() => {
		selected.length == 2 && matchCards();
	});
	$effect(() => {
		maxMatches == matches.length && gameWon();
	});
	$effect(() => {
		time == 0 && gameLost();
	});
</script>

{#if $gameState == 'playing'}
	<h1 class="timer" class:pulse={time <= 10}>{time}</h1>
	<div class="grid grid-cols-5 gap-2 m-auto w-fit">
		{#each grid as card, cardIndex}
			{@const isSelected = selected.includes(cardIndex)}
			{@const isSelectedOrMatched = isSelected || matches.includes(card)}
			{@const isMatched = matches.includes(card)}

			<button
				class="flex items-center justify-center w-16 h-16 text-4xl md:w-32 md:h-32 md:text-6xl bg-primary card"
				class:isSelected
				class:flip={isSelectedOrMatched}
				class:disabled={isSelectedOrMatched}
				onclick={() => selectCard(cardIndex)}
			>
				<div class="absolute inset-0 grid back place-items-center" class:isMatched>{card}</div>
			</button>
		{/each}
	</div>
{/if}

{#if $gameState === 'start'}
	<div class="flex flex-col items-center justify-center w-screen h-screen">
		<h1 class="text-2xl">Matching Game</h1>
		<button
			onclick={() => send({ type: 'CLICK' })}
			class="mt-4 uppercase btn btn-primary btn-lg btn-wide">Play</button
		>
	</div>
{/if}
{#if $gameState == 'gameover'}
	<div class="flex flex-col items-center justify-center w-screen h-screen">
		<h1 class="text-2xl">You lost 💩</h1>
		<button
			onclick={() => ($gameState = 'playing')}
			class="mt-4 uppercase btn btn-primary btn-lg btn-wide">Play again</button
		>
	</div>
{/if}

{#if $gameState == 'won'}
	<div class="flex flex-col items-center justify-center w-screen h-screen">
		<h1 class="text-2xl">You won!</h1>
		<button
			onclick={() => ($gameState = 'playing')}
			class="mt-4 uppercase btn btn-primary btn-lg btn-wide">Play again</button
		>
	</div>
{/if}

<svelte:window onkeydown={handleKeyDown} />

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
