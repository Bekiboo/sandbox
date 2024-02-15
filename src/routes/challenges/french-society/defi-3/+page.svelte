<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { quintInOut } from 'svelte/easing'
	import { draw } from 'svelte/transition'

	let board = Array(9).fill(null)
	let xIsNext = true
	let winner = null

	let query = new URLSearchParams($page.url.searchParams.toString())
	if (query.has('board')) {
		board = JSON.parse(query.get('board'))
	}

	const calculateWinner = (squares) => {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		]
		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i]
			if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
				return squares[a]
			}
		}
		return null
	}

	const handleClick = (i) => {
		const squares = [...board]
		if (winner || squares[i]) return
		squares[i] = xIsNext ? 'X' : 'O'
		board = squares
		xIsNext = !xIsNext
		winner = calculateWinner(squares)

		$page.url.searchParams.set('board', JSON.stringify(board))
		goto(`?${$page.url.searchParams.toString()}`)
	}

	const reset = () => {
		board = Array(9).fill(null)
		xIsNext = true
		winner = null
	}

	$: status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`

	$: drawBoard = board.every((square) => square !== null)

	$: gameOver = winner || drawBoard

	$: gameOver && console.log('Game Over')

	$: gameOver && alert('Game Over')

	$: gameOver && reset()
</script>

<main>
	<h1>Tic Tac Toe</h1>
	<div class="status">{status}</div>
	<div class="board">
		{#each board as square, i}
			<button class="square" on:click={() => handleClick(i)}>
				{#if square == 'X'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="rotate-45"
						><path transition:draw={{ duration: 150, easing: quintInOut }} d="M5 12h14" /><path
							transition:draw={{ duration: 150, delay: 150, easing: quintInOut }}
							d="M12 5v14"
						/></svg
					>
				{:else if square == 'O'}
					<!-- SVG for a simple circle -->
					<svg
						data-slot="icon"
						fill="none"
						stroke-width="1.5"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<circle transition:draw={{ duration: 300, easing: quintInOut }} cx="12" cy="12" r="9"
						></circle>
					</svg>
				{/if}
			</button>
		{/each}
	</div>
</main>

<style>
	.board {
		display: grid;
		grid-template-columns: repeat(3, 100px);
		grid-template-rows: repeat(3, 100px);
		outline: 5px solid #ccc;
		width: min-content;
		margin: auto;
	}

	.square {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 3rem;
		border: 5px solid #ccc;
	}

	.status {
		margin-bottom: 10px;
	}
</style>
