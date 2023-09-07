<script lang="ts">
	import { T } from '@threlte/core'

	const CELL_SIZE = 4
	const BOARD_SIZE = 8

	function generateChessboard(rows: number, cols: number, cellValue1: number, cellValue2: number) {
		const chessboard = []
		for (let i = 0; i < rows; i++) {
			const row = []
			for (let j = 0; j < cols; j++) {
				const cellValue = (i + j) % 2 === 0 ? cellValue1 : cellValue2
				row.push(cellValue)
			}
			chessboard.push(row)
		}
		return chessboard
	}

	const Chessboard = generateChessboard(BOARD_SIZE, BOARD_SIZE, 0, 1)
</script>

{#each Chessboard as row, i}
	{#each row as cell, j}
		<T.Mesh
			position={[
				i * CELL_SIZE - (BOARD_SIZE * CELL_SIZE) / 2,
				0,
				j * CELL_SIZE - (BOARD_SIZE * CELL_SIZE) / 2
			]}
			rotation.x={-Math.PI / 2}
			receiveShadow
		>
			<T.PlaneGeometry args={[CELL_SIZE, CELL_SIZE]} />
			<T.MeshStandardMaterial color={cell ? [0.9, 0.9, 0.9] : [0.1, 0.1, 0.1]} />
		</T.Mesh>
	{/each}
{/each}
