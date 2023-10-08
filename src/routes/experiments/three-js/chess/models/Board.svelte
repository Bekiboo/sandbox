<script lang="ts">
	import { T } from '@threlte/core'

	const CELL_SIZE = 4
	const BOARD_SIZE = 8
	const ROW_NAMES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

	function generateChessboard(rows: number, cols: number, cellValue1: number, cellValue2: number) {
		const chessboard = []
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				const cellValue = {
					name: `${ROW_NAMES[i]}${j + 1}`,
					color: (i + j) % 2 === 0 ? cellValue1 : cellValue2,
					x: i * CELL_SIZE - (BOARD_SIZE * CELL_SIZE) / 2 + CELL_SIZE / 2,
					y: j * CELL_SIZE - (BOARD_SIZE * CELL_SIZE) / 2 + CELL_SIZE / 2
				}
				chessboard.push(cellValue)
			}
		}
		return chessboard
	}

	const Chessboard = generateChessboard(BOARD_SIZE, BOARD_SIZE, 0, 1)
	console.log(Chessboard)
</script>

{#each Chessboard as cell}
	<T.Mesh position={[cell.x, 0, cell.y]} rotation.x={-Math.PI / 2} receiveShadow>
		<T.PlaneGeometry args={[CELL_SIZE, CELL_SIZE]} />
		<T.MeshStandardMaterial color={cell.color ? [0.9, 0.9, 0.9] : [0.1, 0.1, 0.1]} />
	</T.Mesh>
{/each}
