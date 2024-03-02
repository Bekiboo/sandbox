<script lang="ts">
	import { T } from '@threlte/core'
	import { Grid, OrbitControls } from '@threlte/extras'
	import { BufferGeometry, Float32BufferAttribute, MathUtils } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'

	// interactivity()

	let cameraPos: [x: number, y: number, z: number] = [10, 20, 40]
	let lightPos: [x: number, y: number, z: number] = [5, 10, 5]

	const BRICK_DIMENSIONS = { x: 2, y: 0.5, z: 0.5 }

	const leftWall = -10
	const rightWall = 10
	const frontWall = 10
	const backWall = -10
	const topWall = 10
	const bottomWall = -10

	let bricks = []

	// Generate back wall
	for (let x = leftWall; x < rightWall; x += BRICK_DIMENSIONS.x) {
		for (let y = bottomWall; y < topWall; y += BRICK_DIMENSIONS.y) {
			bricks.push({ pos: { x, y, z: backWall }, rotation: { x: 0, y: 0, z: 0 } })
		}
	}

	// Generate front wall
	for (let x = leftWall; x < rightWall; x += BRICK_DIMENSIONS.x) {
		for (let y = bottomWall; y < topWall; y += BRICK_DIMENSIONS.y) {
			bricks.push({
				pos: { x, y, z: frontWall - BRICK_DIMENSIONS.z },
				rotation: { x: 0, y: Math.PI, z: 0 }
			})
		}
	}

	// Generate left wall
	for (let z = backWall; z < frontWall; z += BRICK_DIMENSIONS.z) {
		for (let y = bottomWall; y < topWall; y += BRICK_DIMENSIONS.y) {
			bricks.push({ pos: { x: leftWall, y, z }, rotation: { x: 0, y: Math.PI / 2, z: 0 } })
		}
	}

	// Generate right wall
	for (let z = backWall; z < frontWall; z += BRICK_DIMENSIONS.z) {
		for (let y = bottomWall; y < topWall; y += BRICK_DIMENSIONS.y) {
			bricks.push({
				pos: { x: rightWall - BRICK_DIMENSIONS.x, y, z },
				rotation: { x: 0, y: -Math.PI / 2, z: 0 }
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
	>
		<T.BoxGeometry args={[BRICK_DIMENSIONS.x, BRICK_DIMENSIONS.y, BRICK_DIMENSIONS.z]} />
		<T.MeshStandardMaterial color={`hsl(0, ${60 + Math.random() * 20}%, 50%)`} />
	</T.Mesh>
{/each}

<!-- GROUND -->
<T.Mesh position={[0, -1.25, 0]} receiveShadow>
	<T.BoxGeometry args={[3000, 2, 3000]} />
	<T.MeshStandardMaterial color={'#fff'} />
</T.Mesh>
