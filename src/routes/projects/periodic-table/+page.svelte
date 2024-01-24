<script lang="ts">
	import { elements, categories } from './elements'
	import { tooltip } from './tooltip/tooltip'

	let labels: 'groups' | 'ionizationEnergy' | 'atomicSize' | 'valenceElectrons' = 'groups'
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
		<!-- Titles -->
		<!-- X-axis -->
		<h3 class="col-start-2 col-end-[18] row-start-1 text-center text-2xl mb-4 h-8">
			{#if labels === 'ionizationEnergy'}
				Ionization Energy Increasing -&gt;
			{:else if labels === 'groups'}
				Groups
			{:else if labels === 'atomicSize'}
				Atomic Size Decreasing -&gt;
			{:else if labels === 'valenceElectrons'}
				Valence Electrons
			{/if}
		</h3>

		<!-- Y-axis -->
		<h3 class="relative w-16 col-start-1 row-start-2 text-2xl">
			<div class="absolute flex gap-4 ml-4 origin-top-left -rotate-90 whitespace-nowrap">
				{#if labels === 'ionizationEnergy'}
					<span>&lt;-</span>Decreasing
				{:else if labels === 'groups'}
					Periods
				{:else if labels === 'atomicSize'}
					<span>&lt;-</span>Increasing
				{/if}
			</div>
		</h3>

		<div class="grid row-start-2 gap-1 mx-auto mb-4 w-min">
			{#each elements as element}
				{@const row = element.row}
				{@const col = element.column}
				{@const metallicity = element.metallicity}
				{@const name = element.name}
				{@const symbol = element.symbol}
				{@const number = element.number}
				{@const electronicConfiguration = element.electronicConfiguration}
				<button
					style="
                        grid-column: {col + 1} / span 1;
                        grid-row: {row + 1} / span 1;
                        background-color: {categories[metallicity].color};"
					class="w-12 h-12 opacity-80 hover:opacity-100"
					on:click={() => console.log(element.groupBlock)}
					data-tooltip={electronicConfiguration}
					use:tooltip
				>
					<div class="p-1 text-white">
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
						class="h-8 row-start-1 bg-red-500"
						style="opacity: {0.1 + i * 0.05}; grid-column: {i + 2}"
					></span>
				{/each}

				<!-- Y-axis -->
				{#each Array(7) as _, i}
					<span
						class="w-8 col-start-1 bg-red-500"
						style="opacity: {1 - i * 0.15}; grid-row: {i + 2}"
					></span>
				{/each}
			{:else if labels === 'atomicSize'}
				<!-- X-axis -->
				{#each Array(18) as _, i}
					<span
						class="h-8 row-start-1 bg-red-500"
						style="opacity: {1 - i * 0.05}; grid-column: {i + 2}"
					></span>
				{/each}

				<!-- Y-axis -->
				{#each Array(7) as _, i}
					<span class="w-8 col-start-1 bg-red-500" style="opacity: {i * 0.15}; grid-row: {i + 2}"
					></span>
				{/each}
			{:else if labels === 'groups'}
				<!-- X-axis Groups -->
				{#each Array(18) as _, i}
					<span class="h-8 row-start-1 font-bold text-center" style="grid-column: {i + 2}"
						>{i + 1}</span
					>
				{/each}

				<!-- Y-axis Periods -->
				{#each Array(7) as _, i}
					<span class="w-8 col-start-1 my-auto font-bold" style="grid-row: {i + 2}">{i + 1}</span>
				{/each}
			{:else if labels === 'valenceElectrons'}
				<!-- X-axis -->
				{#each Array(18) as _, i}
					{#if i == 0 || i == 1}
						<span class="h-8 row-start-1 font-bold text-center" style="grid-column: {i + 2}"
							>{i + 1}</span
						>
					{:else if i > 11}
						<span class="h-8 row-start-1 font-bold text-center" style="grid-column: {i + 2}"
							>{i - 11}</span
						>
					{/if}
				{/each}

				<!-- Y-axis -->
				<div class="w-8 col-start-1"></div>
			{:else}
				<!-- X-axis -->
				<div class="h-8 row-start-1"></div>

				<!-- Y-axis -->
				<div class="w-8 col-start-1"></div>
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
					<span class="ml-2 label-text">Metallicity</span>
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
					<span class="ml-2 label-text">Groups & Periods</span>
				</label>
				<label class="cursor-pointer label">
					<input
						bind:group={labels}
						class="radio radio-primary"
						type="radio"
						name="labels"
						value="ionizationEnergy"
					/>
					<span class="ml-2 label-text">Ionization energy</span>
				</label>
				<label class="cursor-pointer label">
					<input
						bind:group={labels}
						class="radio radio-primary"
						type="radio"
						name="labels"
						value="atomicSize"
					/>
					<span class="ml-2 label-text">Atomic Size</span>
				</label>
				<label class="cursor-pointer label">
					<input
						bind:group={labels}
						class="radio radio-primary"
						type="radio"
						name="labels"
						value="valenceElectrons"
					/>
					<span class="ml-2 label-text">Valence Electrons (1A-8A)</span>
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
