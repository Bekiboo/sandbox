<script lang="ts">
	import { elements, categories } from './elements'

	let labels: 'groups' | 'ionizationEnergy' | 'atomicSize' = 'groups'
</script>

<main class="flex flex-col items-center mx-auto">
	<h1
		class="text-4xl font-bold text-center mb-2 text-gray-700 dark:text-gray-300 uppercase tracking-widest leading-none md:text-5xl md:mb-4 md:leading-none md:tracking-widest"
	>
		Periodic Table of the Elements
	</h1>
	<h2 class="text-2xl text-center mb-4 text-gray-600 dark:text-gray-400">
		CHEM 101 - BYU-Idaho - Julien Connault
	</h2>

	<section class="grid items-center w-min">
		<!-- Titles -->
		<!-- X-axis -->
		<h3 class="col-start-2 col-end-[18] row-start-1 text-center text-2xl mb-4">
			{#if labels === 'ionizationEnergy'}
				Ionization Energy Increasing -&gt;
			{:else if labels === 'groups'}
				Groups
			{:else if labels === 'atomicSize'}
				Atomic Size Decreasing -&gt;
			{/if}
		</h3>

		<!-- Y-axis -->
		<h3 class="relative col-start-1 row-start-2 text-2xl w-16">
			<div class="flex gap-4 absolute -rotate-90 origin-top-left ml-4 whitespace-nowrap">
				{#if labels === 'ionizationEnergy'}
					<span>&lt;-</span>Decreasing
				{:else if labels === 'groups'}
					Periods
				{:else if labels === 'atomicSize'}
					<span>&lt;-</span>Increasing
				{/if}
			</div>
		</h3>

		<div class="row-start-2 grid w-min gap-1 mx-auto mb-4">
			{#each elements as element}
				{@const row = element.row}
				{@const col = element.column}
				{@const metallicity = element.metallicity}
				{@const name = element.name}
				{@const symbol = element.symbol}
				{@const number = element.number}
				<button
					style="
                        grid-column: {col + 1} / span 1;
                        grid-row: {row + 1} / span 1;
                        background-color: {categories[metallicity].color};"
					class="w-12 h-12 opacity-80 hover:opacity-100"
					on:click={() => console.log(element.groupBlock)}
				>
					<div class="text-white p-1">
						<div class="text-[0.6rem] -mb-1 text-left">{number}</div>
						<div class="text-2xl text-center">{symbol}</div>
					</div>
				</button>
			{/each}

			<!-- Divider -->
			<span class="row-start-[8] h-8"></span>

			<!-- Labels -->
			{#if labels === 'ionizationEnergy'}
				<!-- X-axis -->
				{#each Array(18) as _, i}
					<span
						class="row-start-1 h-8 bg-red-500"
						style="opacity: {0.1 + i * 0.05}; grid-column: {i + 2}"
					></span>
				{/each}

				<!-- Y-axis -->
				{#each Array(7) as _, i}
					<span
						class="col-start-1 w-8 bg-red-500"
						style="opacity: {1 - i * 0.15}; grid-row: {i + 2}"
					></span>
				{/each}
			{:else if labels === 'atomicSize'}
				<!-- X-axis -->
				{#each Array(18) as _, i}
					<span
						class="row-start-1 h-8 bg-red-500"
						style="opacity: {1 - i * 0.05}; grid-column: {i + 2}"
					></span>
				{/each}

				<!-- Y-axis -->
				{#each Array(7) as _, i}
					<span class="col-start-1 w-8 bg-red-500" style="opacity: {i * 0.15}; grid-row: {i + 2}"
					></span>
				{/each}
			{:else if labels === 'groups'}
				<!-- X-axis Groups -->
				{#each Array(18) as _, i}
					<span class="row-start-1 h-8" style="grid-column: {i + 2}">{i + 1}</span>
				{/each}

				<!-- Y-axis Periods -->
				{#each Array(7) as _, i}
					<span class="col-start-1 w-8" style="grid-row: {i + 2}">{i + 1}</span>
				{/each}
			{/if}

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
	<div class="flex gap-8">
		<div>
			<h4>Color Scheme</h4>
			<div class="form-control">
				<label class="cursor-pointer label">
					<input
						class="radio radio-primary"
						type="radio"
						name="color-scheme"
						value="metallicity"
						checked
					/>
					<span class="label-text ml-2">Metallicity</span>
				</label>
			</div>
		</div>

		<div>
			<h4>Labels</h4>
			<div class="form-control">
				<label class="cursor-pointer label">
					<input
						bind:group={labels}
						class="radio radio-primary"
						type="radio"
						name="labels"
						value="groups"
					/>
					<span class="label-text ml-2">Groups & Periods</span>
				</label>
				<label class="cursor-pointer label">
					<input
						bind:group={labels}
						class="radio radio-primary"
						type="radio"
						name="labels"
						value="ionizationEnergy"
					/>
					<span class="label-text ml-2">Ionization energy</span>
				</label>
				<label class="cursor-pointer label">
					<input
						bind:group={labels}
						class="radio radio-primary"
						type="radio"
						name="labels"
						value="atomicSize"
					/>
					<span class="label-text ml-2">Atomic Size</span>
				</label>
			</div>
		</div>
	</div>
</main>

<style>
	section {
		grid-template-columns: repeat(20, 1fr);
	}
</style>
