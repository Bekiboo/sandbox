<script lang="ts">
	import { T } from '@threlte/core'
	import { interactivity, OrbitControls } from '@threlte/extras'
	import { DEG2RAD } from 'three/src/math/MathUtils'

	import Pawn from './models/Pawn.svelte'
	import Queen from './models/Queen.svelte'
	import Bishop from './models/Bishop.svelte'
	import King from './models/King.svelte'
	import Rook from './models/Rook.svelte'
	import Knight from './models/Knight.svelte'

	interactivity()

	const TILE_SIZE = 4
	const BOARD_SIZE = 8
	const COL_NAMES = ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a']

	type RGB = [r: number, g: number, b: number]

	const BLACK: RGB = [0.2, 0.2, 0.2]
	const WHITE: RGB = [0.8, 0.8, 0.8]
	const WHITE_HIGHLIGHT: RGB = [1, 1, 1]
	const BLACK_HIGHLIGHT: RGB = [0.3, 0.3, 0.3]
	const BLACK_TILE: RGB = [0.4549, 0.5412, 0.7216]
	const WHITE_TILE: RGB = [0.9, 0.9, 0.9]
	const BLACK_TILE_HIGHLIGHT: RGB = [0.5549, 0.6412, 0.8216]
	const WHITE_TILE_HIGHLIGHT: RGB = [1, 1, 1]
	const FRAME_COLOR: RGB = [0.1882, 0.1882, 0.2118]

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
		{ piece: 'pawn', side: 'white', color: WHITE, pos: 'a2' },
		{ piece: 'pawn', side: 'white', color: WHITE, pos: 'b2' },
		{ piece: 'pawn', side: 'white', color: WHITE, pos: 'c2' },
		{ piece: 'pawn', side: 'white', color: WHITE, pos: 'd2' },
		{ piece: 'pawn', side: 'white', color: WHITE, pos: 'e2' },
		{ piece: 'pawn', side: 'white', color: WHITE, pos: 'f2' },
		{ piece: 'pawn', side: 'white', color: WHITE, pos: 'g2' },
		{ piece: 'pawn', side: 'white', color: WHITE, pos: 'h2' },
		{ piece: 'pawn', side: 'black', color: BLACK, pos: 'a7' },
		{ piece: 'pawn', side: 'black', color: BLACK, pos: 'b7' },
		{ piece: 'pawn', side: 'black', color: BLACK, pos: 'c7' },
		{ piece: 'pawn', side: 'black', color: BLACK, pos: 'd7' },
		{ piece: 'pawn', side: 'black', color: BLACK, pos: 'e7' },
		{ piece: 'pawn', side: 'black', color: BLACK, pos: 'f7' },
		{ piece: 'pawn', side: 'black', color: BLACK, pos: 'g7' },
		{ piece: 'pawn', side: 'black', color: BLACK, pos: 'h7' },
		{ piece: 'rook', side: 'white', color: WHITE, pos: 'a1' },
		{ piece: 'rook', side: 'white', color: WHITE, pos: 'h1' },
		{ piece: 'rook', side: 'black', color: BLACK, pos: 'a8' },
		{ piece: 'rook', side: 'black', color: BLACK, pos: 'h8' },
		{ piece: 'knight', side: 'white', color: WHITE, pos: 'b1' },
		{ piece: 'knight', side: 'white', color: WHITE, pos: 'g1' },
		{ piece: 'knight', side: 'black', color: BLACK, pos: 'b8' },
		{ piece: 'knight', side: 'black', color: BLACK, pos: 'g8' },
		{ piece: 'bishop', side: 'white', color: WHITE, pos: 'c1' },
		{ piece: 'bishop', side: 'white', color: WHITE, pos: 'f1' },
		{ piece: 'bishop', side: 'black', color: BLACK, pos: 'c8' },
		{ piece: 'bishop', side: 'black', color: BLACK, pos: 'f8' },
		{ piece: 'queen', side: 'white', color: WHITE, pos: 'd1' },
		{ piece: 'queen', side: 'black', color: BLACK, pos: 'd8' },
		{ piece: 'king', side: 'white', color: WHITE, pos: 'e1' },
		{ piece: 'king', side: 'black', color: BLACK, pos: 'e8' }
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

	let selectedPiece: any = null

	const click = (e: CustomEvent, i: number) => {
		e.stopPropagation()
		if (selectedPiece) {
			selectedPiece.color = selectedPiece.side === 'white' ? WHITE : BLACK
		}
	}

	let hoveredTile = null

	const startHoverTile = (e: any, i: number) => {
		e.stopPropagation()
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

<T.AmbientLight intensity={0.1} />

<T.DirectionalLight
	position={[50, 100, 50]}
	castShadow
	shadow.camera.left={-25}
	shadow.camera.right={25}
	shadow.camera.top={25}
	shadow.camera.bottom={-25}
/>

<!-- Pieces -->
{#each currentPositions as piece, i}
	{@const tile = chessboard.find((tile) => tile.name === piece.pos)}
	{#if piece.piece === 'pawn'}
		<Pawn
			position={tile?.pos}
			scale={0.1}
			rotation={[-Math.PI / 2, 0, 0]}
			color={piece.color}
			name={'piece'}
			on:pointerenter={(e) => startHoverPiece(e, i)}
			on:pointerleave={(e) => stopHoverPiece(e, i)}
			on:click={(e) => click(e, i)}
		/>
	{:else if piece.piece === 'queen'}
		<Queen
			position={tile?.pos}
			scale={0.1}
			rotation={[-Math.PI / 2, 0, 0]}
			color={piece.color}
			on:pointerenter={(e) => startHoverPiece(e, i)}
			on:pointerleave={(e) => stopHoverPiece(e, i)}
		/>
	{:else if piece.piece === 'bishop'}
		<Bishop
			position={tile?.pos}
			scale={0.1}
			rotation={[-Math.PI / 2, 0, 0]}
			color={piece.color}
			on:pointerenter={(e) => startHoverPiece(e, i)}
			on:pointerleave={(e) => stopHoverPiece(e, i)}
		/>
	{:else if piece.piece === 'king'}
		<King
			position={tile?.pos}
			scale={0.1}
			rotation={[-Math.PI / 2, 0, 0]}
			color={piece.color}
			on:pointerenter={(e) => startHoverPiece(e, i)}
			on:pointerleave={(e) => stopHoverPiece(e, i)}
		/>
	{:else if piece.piece === 'rook'}
		<Rook
			position={tile?.pos}
			scale={0.1}
			rotation={[-Math.PI / 2, 0, 0]}
			color={piece.color}
			on:pointerenter={(e) => startHoverPiece(e, i)}
			on:pointerleave={(e) => stopHoverPiece(e, i)}
		/>
	{:else if piece.piece === 'knight'}
		<Knight
			position={tile?.pos}
			scale={0.1}
			rotation={[-Math.PI / 2, 0, (Math.PI / 2) * (piece.side === 'white' ? 1 : -1)]}
			color={piece.color}
			on:pointerenter={(e) => startHoverPiece(e, i)}
			on:pointerleave={(e) => stopHoverPiece(e, i)}
		/>
	{/if}
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
