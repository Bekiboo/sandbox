<script lang="ts">
	import Element from './Element.svelte';
	import Titles from './Titles.svelte';
	import Labels from './Labels.svelte';
	import { elements, colorSchemes } from './elements';
	import ControlPanel from './ControlPanel.svelte';
	import { throttle } from '$lib/utils';
	import { fly } from 'svelte/transition';

	let labels: 'groups' | 'ionizationEnergy' | 'atomicSize' | 'valenceElectrons' = 'groups';
	let colorScheme: 'metallicity' | 'chemicalFamily' | 'standardState' | 'subshellBlock' =
		'subshellBlock';
	let selectedElement: any = null;
	let cursorPosition = { x: 0, y: 0 };

	const handleMouseMove = (e: MouseEvent) => {
		cursorPosition = { x: e.clientX, y: e.clientY };
	};
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
				<Element
					{element}
					colorScheme={colorSchemes[colorScheme]}
					{cursorPosition}
					bind:selectedElement
				/>
			{/each}

			<!-- Info -->
			{#if selectedElement}
				<div
					class="flex flex-col col-start-6 col-end-12 row-span-3 row-start-2 gap-2 text-sm text-white"
					in:fly
				>
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
						<span>{selectedElement?.chemicalFamily}</span>
					</div>
					<div class="flex items-center justify-between">
						<span>Atomic Mass</span>
						<span>{selectedElement?.atomicMass}</span>
					</div>
				</div>
			{/if}

			<!-- Divider -->
			<span class="row-start-[8] h-8"></span>

			<Labels {labels} />

			<!-- Legend -->
		</div>
		<div class="flex justify-between w-full row-start-[12] col-start-2 col-span-12">
			<ControlPanel bind:labels bind:colorScheme />
			<div
				class="flex flex-col gap-2 text-xs text-gray-600 dark:text-gray-400 row-start-[9] col-start-2 col-span-3 row-span-6"
			>
				<h3 class="text-lg font-bold">Legend</h3>
				{#each Object.keys(colorSchemes[colorScheme].group) as key}
					<div class="flex items-center justify-between">
						<div
							class="w-6 h-6 mr-2"
							style="background-color: {colorSchemes[colorScheme].group[key].color};"
						></div>
						<span class="text-lg">{colorSchemes[colorScheme].group[key].name}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>
</main>

<svelte:window on:mousemove={throttle(handleMouseMove, 50)} />

<style>
	section {
		grid-template-columns: repeat(20, 1fr);
	}
</style>
