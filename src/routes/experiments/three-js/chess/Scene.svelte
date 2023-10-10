<script lang="ts">
	import { T } from '@threlte/core'
	import { interactivity, OrbitControls } from '@threlte/extras'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import Piece from './models/Piece.svelte'
	import { ChessPiece } from './ChessPiece'
	import {
		BLACK_TILE,
		BLACK_TILE_HIGHLIGHT,
		FRAME_COLOR,
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
			piece.pos
		)
	})

	// let hoveredPiece: ChessPiece | null = null

	const startHoverPiece = (e: CustomEvent, piece: ChessPiece) => {
		e.stopPropagation()
		piece.setStatus('hovered')
		pieces = pieces
	}

	const stopHoverPiece = (e: CustomEvent, piece: ChessPiece) => {
		e.stopPropagation()
		if (piece.status === 'selected') return
		piece.setStatus('idle')
		pieces = pieces
	}

	let selectedPiece: ChessPiece | null = null

	const selectPiece = (e: CustomEvent, piece: ChessPiece) => {
		e.stopPropagation()
		if (selectedPiece === piece) {
			selectedPiece.setStatus('idle')
			selectedPiece = null
		} else if (selectedPiece) {
			selectedPiece.setStatus('idle')
			selectedPiece = piece
			selectedPiece.setStatus('selected')
		} else {
			selectedPiece = piece
			selectedPiece.setStatus('selected')
		}

		pieces = pieces
	}

	let hoveredTile: any = null

	const startHoverTile = (e: CustomEvent, tile: any) => {
		e.stopPropagation()
		if (!selectedPiece) return
		hoveredTile = tile
	}

	const stopHoverTile = (e: CustomEvent) => {
		e.stopPropagation()
		hoveredTile = null
	}

	const selectTile = (e: CustomEvent, tile: any) => {
		e.stopPropagation()
		if (!selectedPiece) return

		// check if tile is occupied
		const pieceOnTile = pieces.find((piece) => piece.pos === tile.name)

		if (pieceOnTile) {
			// check if piece on tile is same side
			if (pieceOnTile.side === selectedPiece.side) {
				selectedPiece.setStatus('idle')
				selectedPiece = pieceOnTile
				selectedPiece.setStatus('selected')
				return
			} else {
				// remove piece on tile
				pieces = pieces.filter((piece) => piece !== pieceOnTile)
			}
		}

		selectedPiece.move(tile.name)
		selectedPiece.setStatus('idle')
		selectedPiece = null

		pieces = pieces
		console.log(pieces)
		console.log(tile)
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

<!---------------- PIECES ---------------->
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
		on:click={(e) => selectPiece(e, piece)}
	/>
{/each}

<!---------------- BOARD ---------------->
{#each chessboard as tile}
	<T.Mesh
		position={tile.pos}
		rotation.x={-Math.PI / 2}
		receiveShadow
		on:pointerenter={(e) => startHoverTile(e, tile)}
		on:pointerleave={(e) => stopHoverTile(e)}
		on:click={(e) => selectTile(e, tile)}
	>
		<T.PlaneGeometry args={[TILE_SIZE, TILE_SIZE]} />
		{#if hoveredTile === tile}
			<T.MeshStandardMaterial
				color={tile.side === 'white'
					? (tile.color = WHITE_TILE_HIGHLIGHT)
					: (tile.color = BLACK_TILE_HIGHLIGHT)}
			/>
		{:else}
			<T.MeshStandardMaterial
				color={tile.side === 'white' ? (tile.color = WHITE_TILE) : (tile.color = BLACK_TILE)}
			/>
		{/if}
	</T.Mesh>
{/each}

<!---------------- FRAME ---------------->
<T.Mesh position={[0, -0.6, 0]} rotation.x={-Math.PI / 2} receiveShadow>
	<T.BoxGeometry args={[TILE_SIZE * BOARD_SIZE * 1.2, TILE_SIZE * BOARD_SIZE * 1.2]} />
	<T.MeshStandardMaterial color={FRAME_COLOR} />
</T.Mesh>
