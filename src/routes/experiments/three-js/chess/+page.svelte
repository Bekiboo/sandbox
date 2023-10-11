<script lang="ts">
	import { Canvas } from '@threlte/core'
	import Scene from './Scene.svelte'
	import ControlPanel from './ControlPanel.svelte'

	let FOV: number = 75
	let controlPanel: HTMLDivElement
	let castShadow: boolean = true
</script>

<div class="relative">
	<div class="absolute">
		<ControlPanel bind:FOV bind:castShadow bind:controlPanel />
	</div>

	<div class="h-screen w-sceen">
		<Canvas>
			<Scene bind:FOV bind:castShadow />
		</Canvas>
	</div>
</div>
