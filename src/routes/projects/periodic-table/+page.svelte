<script lang="ts">
	import Element from './Element.svelte'
	import Titles from './Titles.svelte'
	import Labels from './Labels.svelte'
	import { elements, categories } from './elements'
	import ControlPanel from './ControlPanel.svelte'
	import { throttle } from '$lib/utils'

	let labels: 'groups' | 'ionizationEnergy' | 'atomicSize' | 'valenceElectrons' = 'groups'
	let selectedElement: any = null
	let cursorPosition = { x: 0, y: 0 }

	const handleMouseMove = (e: MouseEvent) => {
		cursorPosition = { x: e.clientX, y: e.clientY }
	}
</script>

<main class="flex flex-col items-center mx-auto">
	<h1
		class="mb-2 text-4xl font-bold leading-none tracking-widest text-center text-gray-700 uppercase dark:text-gray-300 md:text-5xl md:mb-4 md:leading-none md:tracking-widest"
	>
		Periodic Table of the Elements
	</h1>
	<h2 class="mb-4 text-2xl text-center text-gray-600 dark:text-gray-400">
		CHEM 101 - BYU-Idaho - Julien Connault
	</h2>

	<section class="grid items-center w-min">
		<Titles {labels} />

		<div class="grid row-start-2 gap-1 mx-auto mb-4 w-min">
			{#each elements as element}
				<Element {element} {categories} {cursorPosition} bind:selectedElement />
			{/each}

			<!-- Info -->
			<div
				class="flex flex-col col-start-6 col-end-12 row-span-3 row-start-2 gap-2 text-sm text-white"
			>
				{#if selectedElement}
					<div class="flex items-center justify-between">
						<span class="text-xl">{selectedElement?.name} ({selectedElement.symbol})</span>
					</div>
					<div class="flex items-center justify-between">
						<span>Atomic Number</span>
						<span>{selectedElement?.number}</span>
					</div>
					<div class="flex items-center justify-between">
						<span>Electron Configuration</span>
						<span>{selectedElement?.electronicConfiguration}</span>
					</div>
					<div class="flex items-center justify-between">
						<span>Group</span>
						<span>{selectedElement?.groupBlock}</span>
					</div>
					<div class="flex items-center justify-between">
						<span>Atomic Mass</span>
						<span>{selectedElement?.atomicMass}</span>
					</div>
				{/if}
			</div>

			<!-- Divider -->
			<span class="row-start-[8] h-8"></span>

			<Labels {labels} />

			<!-- Legend -->
			<div
				class="flex flex-col gap-2 text-xs text-gray-600 dark:text-gray-400 row-start-[9] col-start-2 col-span-3 row-span-3"
			>
				{#each Object.values(categories) as category}
					<button class="flex items-center" on:click={() => console.log(category.name)}>
						<div class="w-6 h-6 mr-2" style="background-color: {category.color};"></div>
						<div class="text-lg">{category.name}</div>
					</button>
				{/each}
			</div>
		</div>
	</section>

	<!-- Control Panel -->
	<ControlPanel bind:labels />
</main>

<svelte:window on:mousemove={throttle(handleMouseMove, 50)} />

<style>
	section {
		grid-template-columns: repeat(20, 1fr);
	}
</style>
