<script lang="ts">
	import { T } from '@threlte/core'
	import { interactivity, OrbitControls } from '@threlte/extras'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import Piece from './models/Piece.svelte'

	interactivity()

	const TILE_SIZE = 4
	const BOARD_SIZE = 8
	const COL_NAMES = ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a']

	type RGB = [r: number, g: number, b: number]

	const BLACK: RGB = [0.35, 0.44, 0.62]
	const WHITE: RGB = [0.8, 0.8, 0.8]
	const WHITE_HIGHLIGHT: RGB = [1.5, 1.5, 1.5]
	const BLACK_HIGHLIGHT: RGB = [0.5804, 0.6745, 0.9412]
	const BLACK_TILE: RGB = [0.35, 0.44, 0.62]
	const WHITE_TILE: RGB = [0.9, 0.9, 0.9]
	const BLACK_TILE_HIGHLIGHT: RGB = [1, 0.32, 0.19]
	const WHITE_TILE_HIGHLIGHT: RGB = [1, 0.32, 0.19]
	const FRAME_COLOR: RGB = [0.5529, 0.4667, 0.3725]

	function generateChessboard(rows: number, cols: number) {
		const chessboard: {
			name: string
			color: RGB
			side: 'white' | 'black'
			pos: [x: number, y: number, z: number]
		}[] = []
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				const x = i * TILE_SIZE - (BOARD_SIZE * TILE_SIZE) / 2 + TILE_SIZE / 2
				const z = j * TILE_SIZE - (BOARD_SIZE * TILE_SIZE) / 2 + TILE_SIZE / 2
				const tileValue = {
					name: `${COL_NAMES[i]}${j + 1}`,
					color: (i + j) % 2 === 0 ? WHITE_TILE : BLACK_TILE,
					side: (i + j) % 2 === 0 ? 'black' : 'white',
					pos: [x, 0, z]
				}
				chessboard.push(tileValue as any)
			}
		}
		return chessboard
	}

	const chessboard = generateChessboard(BOARD_SIZE, BOARD_SIZE)

	const INITIAL_POSITIONS = [
		{ type: 'Pawn', side: 'white', color: WHITE, pos: 'a2' },
		{ type: 'Pawn', side: 'white', color: WHITE, pos: 'b2' },
		{ type: 'Pawn', side: 'white', color: WHITE, pos: 'c2' },
		{ type: 'Pawn', side: 'white', color: WHITE, pos: 'd2' },
		{ type: 'Pawn', side: 'white', color: WHITE, pos: 'e2' },
		{ type: 'Pawn', side: 'white', color: WHITE, pos: 'f2' },
		{ type: 'Pawn', side: 'white', color: WHITE, pos: 'g2' },
		{ type: 'Pawn', side: 'white', color: WHITE, pos: 'h2' },
		{ type: 'Pawn', side: 'black', color: BLACK, pos: 'a7' },
		{ type: 'Pawn', side: 'black', color: BLACK, pos: 'b7' },
		{ type: 'Pawn', side: 'black', color: BLACK, pos: 'c7' },
		{ type: 'Pawn', side: 'black', color: BLACK, pos: 'd7' },
		{ type: 'Pawn', side: 'black', color: BLACK, pos: 'e7' },
		{ type: 'Pawn', side: 'black', color: BLACK, pos: 'f7' },
		{ type: 'Pawn', side: 'black', color: BLACK, pos: 'g7' },
		{ type: 'Pawn', side: 'black', color: BLACK, pos: 'h7' },
		{ type: 'Rook', side: 'white', color: WHITE, pos: 'a1' },
		{ type: 'Rook', side: 'white', color: WHITE, pos: 'h1' },
		{ type: 'Rook', side: 'black', color: BLACK, pos: 'a8' },
		{ type: 'Rook', side: 'black', color: BLACK, pos: 'h8' },
		{ type: 'Knight', side: 'white', color: WHITE, pos: 'b1' },
		{ type: 'Knight', side: 'white', color: WHITE, pos: 'g1' },
		{ type: 'Knight', side: 'black', color: BLACK, pos: 'b8' },
		{ type: 'Knight', side: 'black', color: BLACK, pos: 'g8' },
		{ type: 'Bishop', side: 'white', color: WHITE, pos: 'c1' },
		{ type: 'Bishop', side: 'white', color: WHITE, pos: 'f1' },
		{ type: 'Bishop', side: 'black', color: BLACK, pos: 'c8' },
		{ type: 'Bishop', side: 'black', color: BLACK, pos: 'f8' },
		{ type: 'Queen', side: 'white', color: WHITE, pos: 'd1' },
		{ type: 'Queen', side: 'black', color: BLACK, pos: 'd8' },
		{ type: 'King', side: 'white', color: WHITE, pos: 'e1' },
		{ type: 'King', side: 'black', color: BLACK, pos: 'e8' }
	]

	let currentPositions = INITIAL_POSITIONS

	let hoveredPiece = null

	const startHoverPiece = (e: CustomEvent, i: number) => {
		e.stopPropagation()
		hoveredPiece = currentPositions[i]
		if (currentPositions[i].side === 'white') {
			currentPositions[i].color = WHITE_HIGHLIGHT
		} else {
			currentPositions[i].color = BLACK_HIGHLIGHT
		}
	}

	const stopHoverPiece = (e: CustomEvent, i: number) => {
		e.stopPropagation()
		hoveredPiece = null
		if (currentPositions[i].side === 'white') {
			currentPositions[i].color = WHITE
		} else {
			currentPositions[i].color = BLACK
		}
	}

	// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)

	let selectedPiece: any = null

	const click = (e: CustomEvent, i: number) => {
		e.stopPropagation()
		selectedPiece = currentPositions[i]
	}

	let hoveredTile = null

	const startHoverTile = (e: any, i: number) => {
		e.stopPropagation()
		if (!selectedPiece) return
		hoveredTile = chessboard[i]
		if (hoveredTile.side === 'white') {
			chessboard[i].color = BLACK_TILE_HIGHLIGHT
		} else {
			chessboard[i].color = WHITE_TILE_HIGHLIGHT
		}
	}

	const stopHoverTile = (e: CustomEvent, i: number) => {
		e.stopPropagation()
		hoveredTile = null
		if (chessboard[i].side === 'white') {
			chessboard[i].color = BLACK_TILE
		} else {
			chessboard[i].color = WHITE_TILE
		}
	}
</script>

<T.PerspectiveCamera
	position={[0, 50, -50]}
	makeDefault
	fov={75}
	near={0.1}
	far={1000}
	on:create={({ ref }) => {
		ref.lookAt(0, 0, 0)
	}}
>
	<OrbitControls maxPolarAngle={85 * DEG2RAD} minPolarAngle={20 * DEG2RAD} />
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.3} />

<T.DirectionalLight
	position={[25, 80, 25]}
	castShadow
	shadow.camera.left={-25}
	shadow.camera.right={25}
	shadow.camera.top={25}
	shadow.camera.bottom={-25}
/>

<!-- Pieces -->
{#each currentPositions as piece, i}
	{@const tile = chessboard.find((tile) => tile.name === piece.pos)}
	<Piece
		type={piece.type}
		position={tile?.pos}
		scale={0.1}
		rotation={[-Math.PI / 2, 0, (Math.PI / 2) * (piece.side === 'white' ? 1 : -1)]}
		color={piece.color}
		on:pointerenter={(e) => startHoverPiece(e, i)}
		on:pointerleave={(e) => stopHoverPiece(e, i)}
		on:click={(e) => click(e, i)}
	/>
{/each}

<!-- Board -->
{#each chessboard as tile, i}
	<T.Mesh
		position={tile.pos}
		rotation.x={-Math.PI / 2}
		receiveShadow
		on:pointerenter={(e) => startHoverTile(e, i)}
		on:pointerleave={(e) => stopHoverTile(e, i)}
	>
		<T.PlaneGeometry args={[TILE_SIZE, TILE_SIZE]} />
		<T.MeshStandardMaterial color={tile.color} />
	</T.Mesh>
{/each}

<!-- Frame -->
<T.Mesh position={[0, -0.6, 0]} rotation.x={-Math.PI / 2} receiveShadow>
	<T.BoxGeometry args={[TILE_SIZE * BOARD_SIZE * 1.2, TILE_SIZE * BOARD_SIZE * 1.2]} />
	<T.MeshStandardMaterial color={FRAME_COLOR} />
</T.Mesh>
