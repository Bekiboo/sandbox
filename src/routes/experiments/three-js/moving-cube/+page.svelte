<script lang="ts">
	import { Canvas } from '@threlte/core'
	import Scene from './Scene.svelte'
</script>

<div class="relative">
	<div class="absolute left-2 top-2">
		<div class="flex justify-center w-full">
			<kbd class="kbd">W</kbd>
		</div>
		<div class="flex justify-center w-full">
			<kbd class="kbd">A</kbd>
			<kbd class="kbd">S</kbd>
			<kbd class="kbd">D</kbd>
		</div>
		<div class="flex justify-center w-full mt-2">
			<kbd class="kbd">Space</kbd>
		</div>
	</div>

	<div class="h-screen w-sceen">
		<Canvas>
			<Scene />
		</Canvas>
	</div>
</div>
