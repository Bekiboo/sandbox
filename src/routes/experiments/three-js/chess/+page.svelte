<script lang="ts">
	import { Canvas } from '@threlte/core'
	import Scene from './Scene.svelte'
	import ControlPanel from './ControlPanel.svelte'

	let FOV: number = $state(75)
	let castShadow: boolean = $state(true)
</script>

<div class="relative">
	<div class="absolute z-50 w-full">
		<ControlPanel bind:FOV bind:castShadow />
	</div>

	<div class="z-50 w-screen h-screen">
		<Canvas>
			<Scene bind:FOV bind:castShadow />
		</Canvas>
	</div>
</div>
