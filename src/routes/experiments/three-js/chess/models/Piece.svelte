<script>
	import { T } from '@threlte/core';
	import { useGltf } from '@threlte/extras';

	let {
		fallback,
		error,
		children,
		type,
		color,
		ref = $bindable(),
		pointerEntered,
		pointerLeft,
		clicked,
		...props
	} = $props();

	const gltf = useGltf(`../../models/${type}.gltf`);
</script>

<T.Group
	bind:ref
	dispose={false}
	{...props}
	onpointerenter={pointerEntered}
	onpointerleave={pointerLeft}
	onclick={clicked}
>
	{#await gltf}
		{@render fallback?.()}
	{:then gltf}
		<T.Mesh geometry={gltf.nodes.mesh_0.geometry} castShadow>
			<T.MeshStandardMaterial {color} />
		</T.Mesh>
	{:catch err}
		{@render error?.({ error: err })}
	{/await}

	{@render children?.({ ref })}
</T.Group>

<!-- <script lang="ts">
	import { Group } from 'three'
	import { T, forwardEventHandlers } from '@threlte/core'
	import { useGltf } from '@threlte/extras'

	export const ref = new Group()
	export let color: [r: number, g: number, b: number] = [0.8, 0.8, 0.8]
	export let type: string = 'Pawn'

	const gltf = useGltf(`../../models/${type}.gltf`)

	const component = forwardEventHandlers()
</script>

<T is={ref} dispose={false} {...$$restProps} bind:this={$component}>
	{#await gltf}
		<slot name="fallback" />
	{:then gltf}
		<T.Mesh geometry={gltf.nodes.mesh_0.geometry} castShadow>
			<T.MeshStandardMaterial {color} />
		</T.Mesh>
	{:catch error}
		<slot name="error" {error} />
	{/await}

	<slot {ref} />
</T>
-->
