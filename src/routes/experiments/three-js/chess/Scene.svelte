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
	import Board from './models/Board.svelte'

	interactivity()

	const INITIAL_BOARD = [
		{ piece: 'pawn', side: 'white', color: [0.8, 0.8, 0.8], position: [-16, 0, -12] },
		{ piece: 'pawn', side: 'white', color: [0.8, 0.8, 0.8], position: [-12, 0, -12] },
		{ piece: 'pawn', side: 'white', color: [0.8, 0.8, 0.8], position: [-8, 0, -12] },
		{ piece: 'pawn', side: 'white', color: [0.8, 0.8, 0.8], position: [-4, 0, -12] },
		{ piece: 'pawn', side: 'white', color: [0.8, 0.8, 0.8], position: [0, 0, -12] },
		{ piece: 'pawn', side: 'white', color: [0.8, 0.8, 0.8], position: [4, 0, -12] },
		{ piece: 'pawn', side: 'white', color: [0.8, 0.8, 0.8], position: [8, 0, -12] },
		{ piece: 'pawn', side: 'white', color: [0.8, 0.8, 0.8], position: [12, 0, -12] },
		{ piece: 'pawn', side: 'black', color: [0.2, 0.2, 0.2], position: [-16, 0, 8] },
		{ piece: 'pawn', side: 'black', color: [0.2, 0.2, 0.2], position: [-12, 0, 8] },
		{ piece: 'pawn', side: 'black', color: [0.2, 0.2, 0.2], position: [-8, 0, 8] },
		{ piece: 'pawn', side: 'black', color: [0.2, 0.2, 0.2], position: [-4, 0, 8] },
		{ piece: 'pawn', side: 'black', color: [0.2, 0.2, 0.2], position: [0, 0, 8] },
		{ piece: 'pawn', side: 'black', color: [0.2, 0.2, 0.2], position: [4, 0, 8] },
		{ piece: 'pawn', side: 'black', color: [0.2, 0.2, 0.2], position: [8, 0, 8] },
		{ piece: 'pawn', side: 'black', color: [0.2, 0.2, 0.2], position: [12, 0, 8] },
		{ piece: 'rook', side: 'white', color: [0.8, 0.8, 0.8], position: [-16, 0, -16] },
		{ piece: 'rook', side: 'white', color: [0.8, 0.8, 0.8], position: [12, 0, -16] },
		{ piece: 'rook', side: 'black', color: [0.2, 0.2, 0.2], position: [-16, 0, 12] },
		{ piece: 'rook', side: 'black', color: [0.2, 0.2, 0.2], position: [12, 0, 12] },
		{ piece: 'knight', side: 'white', color: [0.8, 0.8, 0.8], position: [-12, 0, -16] },
		{ piece: 'knight', side: 'white', color: [0.8, 0.8, 0.8], position: [8, 0, -16] },
		{ piece: 'knight', side: 'black', color: [0.2, 0.2, 0.2], position: [-12, 0, 12] },
		{ piece: 'knight', side: 'black', color: [0.2, 0.2, 0.2], position: [8, 0, 12] },
		{ piece: 'bishop', side: 'white', color: [0.8, 0.8, 0.8], position: [-8, 0, -16] },
		{ piece: 'bishop', side: 'white', color: [0.8, 0.8, 0.8], position: [4, 0, -16] },
		{ piece: 'bishop', side: 'black', color: [0.2, 0.2, 0.2], position: [-8, 0, 12] },
		{ piece: 'bishop', side: 'black', color: [0.2, 0.2, 0.2], position: [4, 0, 12] },
		{ piece: 'queen', side: 'white', color: [0.8, 0.8, 0.8], position: [-4, 0, -16] },
		{ piece: 'queen', side: 'black', color: [0.2, 0.2, 0.2], position: [-4, 0, 12] },
		{ piece: 'king', side: 'white', color: [0.8, 0.8, 0.8], position: [0, 0, -16] },
		{ piece: 'king', side: 'black', color: [0.2, 0.2, 0.2], position: [0, 0, 12] }
	]

	let currentBoard = INITIAL_BOARD

	let currentPiece = null

	const pointerenter = (e: CustomEvent, i: number) => {
		e.stopPropagation()
		currentPiece = currentBoard[i]
		if (currentBoard[i].side === 'white') {
			currentBoard[i].color = [1, 1, 1]
		} else {
			currentBoard[i].color = [0.3, 0.3, 0.3]
		}
	}

	const pointerleave = (e: CustomEvent, i: number) => {
		e.stopPropagation()
		currentPiece = null
		if (currentBoard[i].side === 'white') {
			currentBoard[i].color = [0.8, 0.8, 0.8]
		} else {
			currentBoard[i].color = [0.2, 0.2, 0.2]
		}
	}

	const click = (e: CustomEvent, i: number) => {
		console.log(e)

		e.stopPropagation()
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

<!-- <T.RectAreaLight
	intensity={1}
	width={4}
	height={4}
	position={[4, 0.1, -12]}
	rotation={[-Math.PI / 2, 0, 0]}
/> -->

<T.DirectionalLight
	position={[5, 10, 5]}
	castShadow
	shadow.camera.left={-20}
	shadow.camera.right={20}
	shadow.camera.top={20}
	shadow.camera.bottom={-20}
/>

{#each currentBoard as piece, i}
	{#if piece.piece === 'pawn'}
		<Pawn
			position={piece.position}
			scale={0.1}
			rotation={[-Math.PI / 2, 0, 0]}
			color={piece.color}
			on:pointerenter={(e) => pointerenter(e, i)}
			on:pointerleave={(e) => pointerleave(e, i)}
		/>
	{:else if piece.piece === 'queen'}
		<Queen
			position={piece.position}
			scale={0.1}
			rotation={[-Math.PI / 2, 0, 0]}
			color={piece.color}
			on:pointerenter={(e) => pointerenter(e, i)}
			on:pointerleave={(e) => pointerleave(e, i)}
		/>
	{:else if piece.piece === 'bishop'}
		<Bishop
			position={piece.position}
			scale={0.1}
			rotation={[-Math.PI / 2, 0, 0]}
			color={piece.color}
			on:pointerenter={(e) => pointerenter(e, i)}
			on:pointerleave={(e) => pointerleave(e, i)}
		/>
	{:else if piece.piece === 'king'}
		<King
			position={piece.position}
			scale={0.1}
			rotation={[-Math.PI / 2, 0, 0]}
			color={piece.color}
			on:pointerenter={(e) => pointerenter(e, i)}
			on:pointerleave={(e) => pointerleave(e, i)}
		/>
	{:else if piece.piece === 'rook'}
		<Rook
			position={piece.position}
			scale={0.1}
			rotation={[-Math.PI / 2, 0, 0]}
			color={piece.color}
			on:pointerenter={(e) => pointerenter(e, i)}
			on:pointerleave={(e) => pointerleave(e, i)}
		/>
	{:else if piece.piece === 'knight'}
		<Knight
			position={piece.position}
			scale={0.1}
			rotation={[-Math.PI / 2, 0, (Math.PI / 2) * (piece.side === 'white' ? 1 : -1)]}
			color={piece.color}
			on:pointerenter={(e) => pointerenter(e, i)}
			on:pointerleave={(e) => pointerleave(e, i)}
		/>
	{/if}
{/each}

<Board />

<!-- <T.Mesh
	rotation.y={rotation}
	position.y={1}
	scale={$scale}
	on:pointerenter={() => scale.set(1.5)}
	on:pointerleave={() => scale.set(1)}
	castShadow
>
	<T.BoxGeometry args={[1, 2, 1]} />
	<T.MeshStandardMaterial color="hotpink" />
</T.Mesh> -->
