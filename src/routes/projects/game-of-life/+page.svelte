<script lang="ts">
	const GRID_HEIGHT = 50
	const GRID_WIDTH = 50

	let generation = 0

	// create random points in this grid, and store them in a 2D array
	let grid = Array.from({ length: GRID_HEIGHT }, () =>
		Array.from({ length: GRID_WIDTH }, () => Math.random() > 0.7)
	)

	// create a new grid based on the old grid
	function nextGeneration(grid) {
		const newGrid = Array.from({ length: GRID_HEIGHT }, () =>
			Array.from({ length: GRID_WIDTH }, () => false)
		)

		for (let y = 0; y < GRID_HEIGHT; y++) {
			for (let x = 0; x < GRID_WIDTH; x++) {
				const neighbors = countNeighbors(grid, x, y)

				if (grid[y][x]) {
					if (neighbors < 2 || neighbors > 3) {
						newGrid[y][x] = false
					} else {
						newGrid[y][x] = true
					}
				} else {
					if (neighbors === 3) {
						newGrid[y][x] = true
					}
				}
			}
		}

		return newGrid
	}

	function countNeighbors(grid, x, y) {
		let sum = 0

		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				const row = (y + i + GRID_HEIGHT) % GRID_HEIGHT
				const col = (x + j + GRID_WIDTH) % GRID_WIDTH
				sum += grid[row][col]
			}
		}

		sum -= grid[y][x]
		return sum
	}

	// create a new grid every 500ms
	setInterval(() => {
		generation++
		grid = nextGeneration(grid)
	}, 200)
</script>

<!-- Grid -->
<div>
	{#each grid as row, y}
		<div class="flex">
			{#each row as cell, x}
				<div
					class="w-2 h-2 border border-gray-300"
					style="background-color: {cell ? 'black' : 'white'}"
				/>
			{/each}
		</div>
	{/each}
</div>
<span>Generation n°{generation}</span>
