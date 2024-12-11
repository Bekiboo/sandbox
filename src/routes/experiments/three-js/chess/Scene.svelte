<script lang="ts">
	import { T } from '@threlte/core';
	import { interactivity, OrbitControls } from '@threlte/extras';
	import { DEG2RAD } from 'three/src/math/MathUtils';
	import Piece from './models/Piece.svelte';
	import { ChessPiece } from './ChessPiece';
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
	} from './gameSettings';

	// Needs to be fixed. Since Svelte 5 Migration, can't move or select pieces anymore.

	interface Props {
		FOV?: number;
		castShadow?: boolean;
	}

	let { FOV = $bindable(), castShadow = $bindable() }: Props = $props();

	interactivity();

	let chessboard = generateChessboard(BOARD_SIZE, BOARD_SIZE);

	let pieces = $state(
		INITIAL_POSITIONS.map((piece) => {
			return new ChessPiece(
				piece.type as 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king',
				piece.side as 'white' | 'black',
				piece.pos
			);
		})
	);

	const startHoverPiece = (e: CustomEvent, piece: ChessPiece) => {
		e.stopPropagation();

		if (piece.status === 'selected') return;
		piece.setStatus('hovered');
	};

	const stopHoverPiece = (e: CustomEvent, piece: ChessPiece) => {
		e.stopPropagation();
		if (piece.status === 'selected') return;
		piece.setStatus('idle');
	};

	let selectedPiece: ChessPiece | null = $state(null);

	const selectPiece = (e: CustomEvent, index: number) => {
		e.stopPropagation();
		if (selectedPiece === pieces[index]) {
			selectedPiece.setStatus('idle');
			selectedPiece = null;
		} else if (selectedPiece) {
			selectedPiece.setStatus('idle');
			selectedPiece = pieces[index];
			selectedPiece.setStatus('selected');
		} else {
			selectedPiece = pieces[index];
			selectedPiece.setStatus('selected');
		}
	};

	let hoveredTile: any = $state.raw(null);

	const startHoverTile = (e: CustomEvent, tile: any) => {
		e.stopPropagation();
		if (!selectedPiece) return;
		hoveredTile = tile;
	};

	const stopHoverTile = (e: CustomEvent) => {
		e.stopPropagation();
		hoveredTile = null;
	};

	const selectTile = (e: CustomEvent, tile: any) => {
		e.stopPropagation();
		if (!selectedPiece) return;

		// check if tile is occupied
		const pieceOnTile = pieces.find((piece) => piece.pos === tile.name);

		if (pieceOnTile) {
			// check if piece on tile is same side
			if (pieceOnTile.side === selectedPiece.side) {
				return;
			} else {
				pieceOnTile.pos = 'graveyard';
			}
		}

		selectedPiece.move(tile.name);
		selectedPiece.setStatus('idle');
		selectedPiece = null;
	};
</script>

<T.PerspectiveCamera
	position={[0, 50, -50]}
	makeDefault
	fov={FOV}
	near={0.1}
	far={1000}
	on:create={({ ref }) => {
		ref.lookAt(0, 0, 0);
	}}
>
	<OrbitControls maxPolarAngle={85 * DEG2RAD} />
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.3} />

<T.DirectionalLight
	position={[25, 80, 25]}
	{castShadow}
	shadow.camera.left={-25}
	shadow.camera.right={25}
	shadow.camera.top={25}
	shadow.camera.bottom={-25}
/>

<!---------------- PIECES ---------------->
{#each pieces as piece, i}
	{@const tile = chessboard.find((tile) => tile.name === piece.pos)}
	<Piece
		type={piece.type}
		position={tile?.pos}
		scale={0.1}
		rotation={[-Math.PI / 2, 0, (Math.PI / 2) * (piece.side === 'white' ? 1 : -1)]}
		color={piece.color}
		pointerEntered={(e) => startHoverPiece(e, piece)}
		pointerleft={(e) => stopHoverPiece(e, piece)}
		clicked={(e) => selectPiece(e, i)}
	/>
{/each}

<!---------------- BOARD ---------------->
{#each chessboard as tile, i}
	<T.Mesh
		position={tile.pos}
		rotation.x={-Math.PI / 2}
		receiveShadow
		onpointerenter={(e) => startHoverTile(e, tile)}
		onpointerleave={(e) => stopHoverTile(e)}
		onclick={(e) => selectTile(e, tile)}
	>
		<T.PlaneGeometry args={[TILE_SIZE, TILE_SIZE]} />
		{#if hoveredTile === chessboard[i]}
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
