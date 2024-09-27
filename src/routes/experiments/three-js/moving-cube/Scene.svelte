<script lang="ts">
	import { T, useFrame } from '@threlte/core';
	import { Grid, interactivity, OrbitControls } from '@threlte/extras';
	import { BufferGeometry, Float32BufferAttribute, MathUtils } from 'three';
	import { handleKeysDown, handleKeysUp } from './keyboardInputHandler';
	import { DEG2RAD } from 'three/src/math/MathUtils.js';
	import { Game } from './Game';
	import { onMount } from 'svelte';
	import { AutoColliders, Debug, useRapier } from '@threlte/rapier';
	import Emitter from './Emitter.svelte';
	import { Collider, RigidBody, Attractor } from '@threlte/rapier';

	// const { world } = useRapier();
	// const noGravity = () => (world.gravity = { x: 0, y: 0, z: 0 });

	// noGravity();
	interactivity();

	let cameraPos: [x: number, y: number, z: number] = [10, 20, 40];
	let lightPos: [x: number, y: number, z: number] = [5, 10, 5];

	const GRAVITY = 0.02;

	let game: Game;

	let ground = {
		width: 30,
		depth: 30
	};

	onMount(() => {
		game = new Game(ground.width, ground.depth);
		console.log('🚀 ~ onMount ~ game:', game);
	});

	let elapsedTime = 0;

	let player = {
		pos: {
			x: 0,
			y: 1,
			z: 0
		},
		velocity: {
			x: 0,
			y: 0,
			z: 0
		}
	};

	let keysPressed: string[] = [];

	function handleKeyDown(e: KeyboardEvent) {
		keysPressed = handleKeysDown(e, keysPressed);
	}

	function handleKeyUp(e: KeyboardEvent) {
		keysPressed = handleKeysUp(e, keysPressed);
	}

	useFrame((state, delta) => {
		{
			if (keysPressed.includes('right')) {
				player.pos.x += 0.1;
			}
			if (keysPressed.includes('left')) {
				player.pos.x -= 0.1;
			}
			if (keysPressed.includes('forward')) {
				player.pos.z -= 0.1;
			}
			if (keysPressed.includes('backward')) {
				player.pos.z += 0.1;
			}
			if (keysPressed.includes('jump')) {
				player.velocity.y = -0.2;
			}
			switch (true) {
				case player.pos.x > ground.width / 2:
					player.pos.x = ground.width / 2;
					break;
				case player.pos.x < -ground.width / 2:
					player.pos.x = -ground.width / 2;
					break;
				case player.pos.z > ground.depth / 2:
					player.pos.z = ground.depth / 2;
					break;
				case player.pos.z < -ground.depth / 2:
					player.pos.z = -ground.depth / 2;
					break;
			}
		}

		player.pos.y -= player.velocity.y;
		player.velocity.y += GRAVITY;

		if (player.pos.y < 0.5) {
			player.pos.y = 0.5;
		}

		elapsedTime += delta;
		game.update(delta);

		// game = game;
	});
</script>

<T.PerspectiveCamera position={cameraPos} makeDefault fov={15} near={0.1} far={1000000}>
	<OrbitControls maxPolarAngle={85 * DEG2RAD} minPolarAngle={20 * DEG2RAD} />
</T.PerspectiveCamera>

<T.DirectionalLight
	position={lightPos}
	castShadow
	shadow.camera.left={-25}
	shadow.camera.right={25}
	shadow.camera.top={25}
	shadow.camera.bottom={-25}
/>

<T.AmbientLight intensity={0.5} />

<!-- <Grid /> -->

<!-- PLAYER -->
<!-- <Debug /> -->
<T.Mesh position={[player.pos.x, player.pos.y, player.pos.z]} castShadow>
	<T.BoxGeometry args={[1, 1, 1]} />
	<T.MeshStandardMaterial color={'red'} />
	<Attractor range={20} strength={0.003} position={[0, 0, 0]} />
</T.Mesh>

<!-- ENEMIES -->
{#if game?.enemies.length > 0}
	{#each game?.enemies as enemy}
		<T.Mesh position={[enemy.x, enemy.y, enemy.z]} castShadow>
			<T.BoxGeometry args={[1, 1, 1]} />
			<T.MeshStandardMaterial color={'blue'} />
		</T.Mesh>
	{/each}
{/if}

<!-- GROUND -->
<T.Group position={[0, -1, 0]}>
	<AutoColliders shape={'cuboid'}>
		<T.Mesh receiveShadow>
			<T.BoxGeometry args={[ground.width, 2, ground.depth]} />
			<T.MeshStandardMaterial color={'#fff'} />
		</T.Mesh>
	</AutoColliders>
</T.Group>

<Emitter />

<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp} />
