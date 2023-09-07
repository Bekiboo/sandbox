<script>
	// @ts-nocheck

	import { Group } from 'three'
	import { T, forwardEventHandlers } from '@threlte/core'
	import { useGltf } from '@threlte/extras'

	export const ref = new Group()
	export let color = [0.8, 0.8, 0.8]

	const gltf = useGltf('../models/Pawn.gltf')

	const component = forwardEventHandlers()
</script>

<T is={ref} dispose={false} {...$$restProps} bind:this={$component}>
	{#await gltf}
		<slot name="fallback" />
	{:then gltf}
		<T.Mesh geometry={gltf.nodes.mesh_0.geometry}>
			<T.MeshStandardMaterial {color} />
		</T.Mesh>
	{:catch error}
		<slot name="error" {error} />
	{/await}

	<slot {ref} />
</T>
