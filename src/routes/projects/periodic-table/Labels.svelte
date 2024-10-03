<script lang="ts">
	export let labels: 'groups' | 'ionizationEnergy' | 'atomicSize' | 'valenceElectrons' = 'groups';
</script>

{#if labels === 'ionizationEnergy'}
	<!-- X-axis -->
	{#each Array(18) as _, i}
		<span class="h-8 row-start-1 bg-red-500" style="opacity: {0.1 + i * 0.05}; grid-column: {i + 2}"
		></span>
	{/each}

	<!-- Y-axis -->
	{#each Array(7) as _, i}
		<span class="w-8 col-start-1 bg-red-500" style="opacity: {1 - i * 0.15}; grid-row: {i + 2}"
		></span>
	{/each}
{:else if labels === 'atomicSize'}
	<!-- X-axis -->
	{#each Array(18) as _, i}
		<span class="h-8 row-start-1 bg-red-500" style="opacity: {1 - i * 0.05}; grid-column: {i + 2}"
		></span>
	{/each}

	<!-- Y-axis -->
	{#each Array(7) as _, i}
		<span class="w-8 col-start-1 bg-red-500" style="opacity: {i * 0.15}; grid-row: {i + 2}"></span>
	{/each}
{:else if labels === 'groups'}
	<!-- X-axis Groups -->
	{#each Array(18) as _, i}
		<span class="h-8 row-start-1 font-bold text-center" style="grid-column: {i + 2}">{i + 1}</span>
	{/each}

	<!-- Y-axis Periods -->
	{#each Array(7) as _, i}
		<span class="w-8 col-start-1 my-auto font-bold" style="grid-row: {i + 2}">{i + 1}</span>
	{/each}
{:else if labels === 'valenceElectrons'}
	<!-- X-axis -->
	{#each Array(18) as _, i}
		{#if i == 0 || i == 1}
			<span class="h-8 row-start-1 font-bold text-center" style="grid-column: {i + 2}">{i + 1}</span
			>
		{:else if i > 11}
			<span class="h-8 row-start-1 font-bold text-center" style="grid-column: {i + 2}">{i - 9}</span
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
