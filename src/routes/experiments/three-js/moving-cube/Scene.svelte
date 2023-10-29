<script lang="ts">
	import { T, useFrame } from '@threlte/core'
	import { Grid, interactivity, OrbitControls } from '@threlte/extras'
	import { BufferGeometry, Float32BufferAttribute, MathUtils } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import { handleKeysDown, handleKeysUp } from './keyboardInputHandler'

	interactivity()

	let cameraPos: [x: number, y: number, z: number] = [10, 20, 40]
	let lightPos: [x: number, y: number, z: number] = [5, 10, 5]

	const count = 100
	const distance = 2

	const GRAVITY = 0.03

	const points = new Float32Array(count * 3)
	for (let i = 0; i < points.length; i++) {
		points[i] = MathUtils.randFloatSpread(distance * 2)
	}

	const geometry = new BufferGeometry()
	geometry.setAttribute('position', new Float32BufferAttribute(points, 3))

	let player = {
		pos: {
			x: 0,
			y: 0,
			z: 0
		},
		velocity: {
			x: 0,
			y: 0,
			z: 0
		}
	}

	let keysPressed: string[] = []

	function handleKeyDown(e: KeyboardEvent) {
		keysPressed = handleKeysDown(e, keysPressed)
	}

	function handleKeyUp(e: KeyboardEvent) {
		keysPressed = handleKeysUp(e, keysPressed)
	}

	useFrame((state, delta) => {
		if (keysPressed.includes('right')) {
			player.pos.x += 0.1
		}
		if (keysPressed.includes('left')) {
			player.pos.x -= 0.1
		}
		if (keysPressed.includes('forward')) {
			player.pos.z -= 0.1
		}
		if (keysPressed.includes('backward')) {
			player.pos.z += 0.1
		}
		if (keysPressed.includes('jump')) {
			player.velocity.y = -0.3
		}
		player.pos.y -= player.velocity.y
		player.velocity.y += GRAVITY

		if (player.pos.y < 0) {
			player.pos.y = 0
		}

		// cameraPos[0] = player.pos.x + 2
		// cameraPos[1] = player.pos.y + 2
		// cameraPos[2] = player.pos.z + 5
	})
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
<T.Mesh position={[player.pos.x, player.pos.y, player.pos.z]} castShadow>
	<T.BoxGeometry args={[0.5, 0.5, 0.5]} />
	<T.MeshStandardMaterial color={'red'} />
</T.Mesh>

<!-- GROUND -->
<T.Mesh position={[0, -1.25, 0]} receiveShadow>
	<T.BoxGeometry args={[30, 2, 30]} />
	<T.MeshStandardMaterial color={'#fff'} />
</T.Mesh>

<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp} />
