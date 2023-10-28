<script lang="ts">
	import { T, useFrame } from '@threlte/core'
	import { Grid, interactivity, OrbitControls } from '@threlte/extras'
	import { BufferGeometry, Float32BufferAttribute, MathUtils } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'

	interactivity()

	let cameraPos: [x: number, y: number, z: number] = [2, 2, 5]
	let lightPos: [x: number, y: number, z: number] = [5, 10, 5]

	const count = 100
	const distance = 2

	const GRAVITY = 0.01

	const points = new Float32Array(count * 3)
	for (let i = 0; i < points.length; i++) {
		points[i] = MathUtils.randFloatSpread(distance * 2)
	}

	const geometry = new BufferGeometry()
	geometry.setAttribute('position', new Float32BufferAttribute(points, 3))

	function isGrounded() {
		return player.pos.y === -0.25
	}

	let player = {
		pos: {
			x: 0,
			y: -0.25,
			z: 0
		},
		velocity: {
			x: 0,
			y: 0,
			z: 0
		}
	}

	let keyPressed: string[] = []

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') {
			keyPressed.push('right')
		}
		if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') {
			keyPressed.push('left')
		}
		if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') {
			keyPressed.push('forward')
		}
		if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') {
			keyPressed.push('backward')
		}
		if (e.key === ' ') {
			keyPressed.push('jump')
		}
	}

	function handleKeyUp(e: KeyboardEvent) {
		if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') {
			keyPressed = keyPressed.filter((key) => key !== 'right')
		}
		if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') {
			keyPressed = keyPressed.filter((key) => key !== 'left')
		}
		if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') {
			keyPressed = keyPressed.filter((key) => key !== 'forward')
		}
		if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') {
			keyPressed = keyPressed.filter((key) => key !== 'backward')
		}
		if (e.key === ' ') {
			keyPressed = keyPressed.filter((key) => key !== 'jump')
		}
	}

	useFrame((state, delta) => {
		if (keyPressed.includes('right')) {
			player.pos.x += 0.1
		}
		if (keyPressed.includes('left')) {
			player.pos.x -= 0.1
		}
		if (keyPressed.includes('forward')) {
			player.pos.z -= 0.1
		}
		if (keyPressed.includes('backward')) {
			player.pos.z += 0.1
		}
		if (keyPressed.includes('jump')) {
			// if (isGrounded()) {
			player.velocity.y = -0.2
			// }
		}
		player.pos.y -= player.velocity.y
		player.velocity.y += GRAVITY

		if (player.pos.y < -0.25) {
			player.pos.y = -0.25
		}

		// cameraPos[0] = player.pos.x + 2
		// cameraPos[1] = player.pos.y + 2
		// cameraPos[2] = player.pos.z + 5
	})

	// $: console.log(player.velocity.y)
</script>

<T.PerspectiveCamera position={cameraPos} makeDefault fov={75} near={0.1} far={1000000}>
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
<T.Mesh position={[0, -1, 0]} receiveShadow>
	<T.BoxGeometry args={[30, 1, 30]} />
	<T.MeshStandardMaterial color={'#fff'} />
</T.Mesh>

<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp} />
