<script lang="ts">
	interface Props {
		labels?: 'groups' | 'ionizationEnergy' | 'atomicSize' | 'valenceElectrons';
	}

	let { labels = 'groups' }: Props = $props();
</script>

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
