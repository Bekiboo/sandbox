<script lang="ts">
	import { T } from '@threlte/core'
	import { Grid, OrbitControls } from '@threlte/extras'
	import { BufferGeometry, Float32BufferAttribute, MathUtils } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'

	// interactivity()

	let cameraPos: [x: number, y: number, z: number] = [20, 20, 80]
	let lightPos: [x: number, y: number, z: number] = [5, 10, 5]

	const BRICK = { x: 2, y: 1, z: 1 }

	const leftWall = -8
	const rightWall = 16
	const frontWall = 8
	const backWall = -12
	const ceilling = 8
	const floor = 0

	let bricks = []

	// Generate back wall
	for (let x = leftWall; x < rightWall; x += BRICK.x) {
		for (let y = floor; y < ceilling; y += BRICK.y) {
			let shift = 0
			y % 2 == 0 ? (shift = 0) : (shift = BRICK.x / 2)
			bricks.push({
				pos: { x: x + shift + BRICK.z / 2, y: y + BRICK.y / 2, z: backWall - BRICK.z / 2 },
				rotation: { x: 0, y: 0, z: 0 }
			})
		}
	}

	// Generate right wall
	for (let z = backWall; z < frontWall; z += BRICK.x) {
		for (let y = floor; y < ceilling; y += BRICK.y) {
			let shift = 0
			y % 2 == 0 ? (shift = 0) : (shift = BRICK.x / 2)
			bricks.push({
				pos: { x: rightWall, y: y + BRICK.y / 2, z: z + shift },
				rotation: { x: 0, y: Math.PI / 2, z: 0 }
			})
		}
	}

	// Generate left wall
	for (let z = backWall; z < frontWall; z += BRICK.x) {
		for (let y = floor; y < ceilling; y += BRICK.y) {
			let shift = 0
			y % 2 != 0 ? (shift = 0) : (shift = BRICK.x / 2)
			bricks.push({
				pos: { x: leftWall, y: y + BRICK.y / 2, z: z + shift },
				rotation: { x: 0, y: Math.PI / 2, z: 0 }
			})
		}
	}

	// Generate front wall
	for (let x = leftWall; x < rightWall; x += BRICK.x) {
		for (let y = floor; y < ceilling; y += BRICK.y) {
			let shift = 0
			y % 2 != 0 ? (shift = 0) : (shift = BRICK.x / 2)
			bricks.push({
				pos: { x: x + shift + BRICK.z / 2, y: y + BRICK.y / 2, z: frontWall - BRICK.z / 2 },
				rotation: { x: 0, y: 0, z: 0 }
			})
		}
	}
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

<!-- BRICKS -->
{#each bricks as brick}
	<T.Mesh
		position={[brick.pos.x, brick.pos.y, brick.pos.z]}
		rotation={[brick.rotation.x, brick.rotation.y, brick.rotation.z]}
		castShadow
	>
		<T.BoxGeometry args={[BRICK.x, BRICK.y, BRICK.z]} />
		<T.MeshStandardMaterial color={`hsl(20, ${Math.random() * 100}%, 40%)`} />
	</T.Mesh>
{/each}

<!-- GROUND -->
<T.Mesh position={[0, -1, 0]} receiveShadow>
	<T.BoxGeometry args={[30, 2, 30]} />
	<T.MeshStandardMaterial color={'#fff'} />
</T.Mesh>
