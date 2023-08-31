<script lang="ts">
	import { T, useFrame } from '@threlte/core'
	import { interactivity } from '@threlte/extras'
	import { spring } from 'svelte/motion'

	interactivity()
	const scale = spring(1)

	let rotation = 0
	useFrame((state, delta) => {
		rotation += delta
	})

	const rectangles = [
		{ x: 0, y: 1, z: 0, width: 1, height: 2, color: [1, 0.8, 0], rotationSpeed: 1 },
		{ x: 2, y: 1, z: 0, width: 1, height: 2, color: [0, 0.8, 1], rotationSpeed: 2 },
		{ x: 2, y: 1, z: 2, width: 1, height: 2, color: [1, 0, 0], rotationSpeed: 0.5 },
		{ x: 0, y: 1, z: 2, width: 1, height: 2, color: [0, 0, 1], rotationSpeed: 0.1 },
		{ x: 2, y: 3.2, z: 0, width: 1, height: 2, color: [0.5, 0.5, 0], rotationSpeed: 3 }
	]
</script>

<T.PerspectiveCamera
	makeDefault
	position={[10, 5, 10]}
	on:create={({ ref }) => {
		ref.lookAt(0, 1, 0)
	}}
/>

<T.DirectionalLight color={[0.5, 0.8, 0.5]} position={[0, 10, 10]} castShadow />

{#each rectangles as { x, y, z, width, height, color, rotationSpeed }, i}
	<T.Mesh
		rotation.y={rotation * rotationSpeed}
		position.y={y * $scale}
		position.x={x}
		position.z={z}
		scale={$scale}
		castShadow
	>
		<T.BoxGeometry args={[width, height, 1]} />
		<T.MeshStandardMaterial {color} />
	</T.Mesh>
{/each}

<T.Mesh rotation.x={-Math.PI / 2} receiveShadow>
	<T.CircleGeometry args={[4, 40]} />
	<T.MeshStandardMaterial color={[1, 1, 1]} />
</T.Mesh>

<!-- on:pointerenter={() => scale.set(2)}
on:pointerleave={() => scale.set(1)} -->
