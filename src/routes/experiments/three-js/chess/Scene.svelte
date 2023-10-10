<script lang="ts">
	import { T } from '@threlte/core'
	import { interactivity, OrbitControls } from '@threlte/extras'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import Piece from './models/Piece.svelte'
	import { ChessPiece } from './chess'
	import {
		BLACK,
		BLACK_HIGHLIGHT,
		BLACK_TILE,
		BLACK_TILE_HIGHLIGHT,
		FRAME_COLOR,
		WHITE,
		WHITE_HIGHLIGHT,
		WHITE_TILE,
		WHITE_TILE_HIGHLIGHT,
		TILE_SIZE,
		BOARD_SIZE,
		generateChessboard,
		INITIAL_POSITIONS
	} from './gameSettings'

	interactivity()

	let chessboard = generateChessboard(BOARD_SIZE, BOARD_SIZE)

	let pieces = INITIAL_POSITIONS.map((piece) => {
		return new ChessPiece(
			piece.type as 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king',
			piece.side as 'white' | 'black',
			piece.color,
			piece.pos
		)
	})

	let hoveredPiece = null

	const startHoverPiece = (e: CustomEvent, piece: ChessPiece) => {
		e.stopPropagation()
		hoveredPiece = piece
		piece.side === 'white' ? (piece.color = WHITE_HIGHLIGHT) : (piece.color = BLACK_HIGHLIGHT)

		pieces = pieces
	}

	const stopHoverPiece = (e: CustomEvent, piece: ChessPiece) => {
		e.stopPropagation()
		hoveredPiece = piece
		piece.side === 'white' ? (piece.color = WHITE) : (piece.color = BLACK)

		pieces = pieces
	}

	let selectedPiece: any = null

	const click = (e: CustomEvent, piece: ChessPiece) => {
		e.stopPropagation()
		selectedPiece = piece
	}

	let hoveredTile = null

	const startHoverTile = (e: any, pos: string) => {
		e.stopPropagation()
		let tile = chessboard.find((tile) => tile.name === pos)
		if (!tile) return
		if (!selectedPiece) return
		hoveredTile = tile
		if (hoveredTile.side === 'white') {
			tile.color = BLACK_TILE_HIGHLIGHT
		} else {
			tile.color = WHITE_TILE_HIGHLIGHT
		}
		chessboard = chessboard
	}

	const stopHoverTile = (e: CustomEvent, pos: string) => {
		e.stopPropagation()
		let tile = chessboard.find((tile) => tile.name === pos)
		if (!tile) return
		hoveredTile = null
		if (tile.side === 'white') {
			tile.color = BLACK_TILE
		} else {
			tile.color = WHITE_TILE
		}
		chessboard = chessboard
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
{#each pieces as piece}
	{@const tile = chessboard.find((tile) => tile.name === piece.pos)}
	<Piece
		type={piece.type}
		position={tile?.pos}
		scale={0.1}
		rotation={[-Math.PI / 2, 0, (Math.PI / 2) * (piece.side === 'white' ? 1 : -1)]}
		color={piece.color}
		on:pointerenter={(e) => startHoverPiece(e, piece)}
		on:pointerleave={(e) => stopHoverPiece(e, piece)}
		on:click={(e) => click(e, piece)}
	/>
{/each}

<!-- Board -->
{#each chessboard as tile}
	<T.Mesh
		position={tile.pos}
		rotation.x={-Math.PI / 2}
		receiveShadow
		on:pointerenter={(e) => startHoverTile(e, tile.name)}
		on:pointerleave={(e) => stopHoverTile(e, tile.name)}
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
