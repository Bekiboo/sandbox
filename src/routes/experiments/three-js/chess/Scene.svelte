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
	const ROW_NAMES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

	const BLACK: [r: number, g: number, b: number] = [0.2, 0.2, 0.2]
	const WHITE: [r: number, g: number, b: number] = [0.8, 0.8, 0.8]
	const WHITE_HIGHLIGHT: [r: number, g: number, b: number] = [1, 1, 1]
	const BLACK_HIGHLIGHT: [r: number, g: number, b: number] = [0.3, 0.3, 0.3]

	function generateChessboard(rows: number, cols: number, color1: number[], color2: number[]) {
		const chessboard: {
			name: string
			color: [r: number, g: number, b: number]
			side: 'white' | 'black'
			pos: [x: number, y: number, z: number]
		}[] = []
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				const x = i * TILE_SIZE - (BOARD_SIZE * TILE_SIZE) / 2 + TILE_SIZE / 2
				const z = j * TILE_SIZE - (BOARD_SIZE * TILE_SIZE) / 2 + TILE_SIZE / 2
				const tileValue = {
					name: `${ROW_NAMES[i]}${j + 1}`,
					color: (i + j) % 2 === 0 ? color1 : color2,
					side: (i + j) % 2 === 0 ? 'white' : 'black',
					pos: [x, 0, z]
				}
				chessboard.push(tileValue as any)
			}
		}
		return chessboard
	}

	const chessboard = generateChessboard(BOARD_SIZE, BOARD_SIZE, BLACK, WHITE)

	const INITIAL_BOARD = [
		{ piece: 'pawn', side: 'white', color: WHITE, position: 'a2' },
		{ piece: 'pawn', side: 'white', color: WHITE, position: 'b2' },
		{ piece: 'pawn', side: 'white', color: WHITE, position: 'c2' },
		{ piece: 'pawn', side: 'white', color: WHITE, position: 'd2' },
		{ piece: 'pawn', side: 'white', color: WHITE, position: 'e2' },
		{ piece: 'pawn', side: 'white', color: WHITE, position: 'f2' },
		{ piece: 'pawn', side: 'white', color: WHITE, position: 'g2' },
		{ piece: 'pawn', side: 'white', color: WHITE, position: 'h2' },
		{ piece: 'pawn', side: 'black', color: BLACK, position: 'a7' },
		{ piece: 'pawn', side: 'black', color: BLACK, position: 'b7' },
		{ piece: 'pawn', side: 'black', color: BLACK, position: 'c7' },
		{ piece: 'pawn', side: 'black', color: BLACK, position: 'd7' },
		{ piece: 'pawn', side: 'black', color: BLACK, position: 'e7' },
		{ piece: 'pawn', side: 'black', color: BLACK, position: 'f7' },
		{ piece: 'pawn', side: 'black', color: BLACK, position: 'g7' },
		{ piece: 'pawn', side: 'black', color: BLACK, position: 'h7' },
		{ piece: 'rook', side: 'white', color: WHITE, position: 'a1' },
		{ piece: 'rook', side: 'white', color: WHITE, position: 'h1' },
		{ piece: 'rook', side: 'black', color: BLACK, position: 'a8' },
		{ piece: 'rook', side: 'black', color: BLACK, position: 'h8' },
		{ piece: 'knight', side: 'white', color: WHITE, position: 'b1' },
		{ piece: 'knight', side: 'white', color: WHITE, position: 'g1' },
		{ piece: 'knight', side: 'black', color: BLACK, position: 'b8' },
		{ piece: 'knight', side: 'black', color: BLACK, position: 'g8' },
		{ piece: 'bishop', side: 'white', color: WHITE, position: 'c1' },
		{ piece: 'bishop', side: 'white', color: WHITE, position: 'f1' },
		{ piece: 'bishop', side: 'black', color: BLACK, position: 'c8' },
		{ piece: 'bishop', side: 'black', color: BLACK, position: 'f8' },
		{ piece: 'queen', side: 'white', color: WHITE, position: 'd1' },
		{ piece: 'queen', side: 'black', color: BLACK, position: 'd8' },
		{ piece: 'king', side: 'white', color: WHITE, position: 'e1' },
		{ piece: 'king', side: 'black', color: BLACK, position: 'e8' }
	]

	let currentBoard = INITIAL_BOARD

	let hoveredPiece = null

	const startHoverPiece = (e: CustomEvent, i: number) => {
		e.stopPropagation()
		hoveredPiece = currentBoard[i]
		if (currentBoard[i].side === 'white') {
			currentBoard[i].color = WHITE_HIGHLIGHT
		} else {
			currentBoard[i].color = BLACK_HIGHLIGHT
		}
	}

	const stopHoverPiece = (e: CustomEvent, i: number) => {
		e.stopPropagation()
		hoveredPiece = null
		if (currentBoard[i].side === 'white') {
			currentBoard[i].color = WHITE
		} else {
			currentBoard[i].color = BLACK
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
			chessboard[i].color = BLACK_HIGHLIGHT
		} else {
			chessboard[i].color = WHITE_HIGHLIGHT
		}
	}

	const stopHoverTile = (e: CustomEvent, i: number) => {
		e.stopPropagation()
		hoveredTile = null
		if (chessboard[i].side === 'white') {
			chessboard[i].color = BLACK
		} else {
			chessboard[i].color = WHITE
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
	position={[5, 10, 5]}
	castShadow
	shadow.camera.left={-20}
	shadow.camera.right={20}
	shadow.camera.top={20}
	shadow.camera.bottom={-20}
/>

<!-- Pieces -->
{#each currentBoard as piece, i}
	{@const tile = chessboard.find((tile) => tile.name === piece.position)}
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
	<T.MeshStandardMaterial color={[0.4, 0.4, 0.4]} />
</T.Mesh>
