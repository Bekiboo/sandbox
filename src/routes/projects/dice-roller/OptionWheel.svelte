<script lang="ts">
	export let options: string[] = []
</script>

<div class="flex flex-col gap-4">
	{#each options as option}
		<div class="flex items-center justify-center w-6 h-6 font-bold text-white rounded">
			{option}
		</div>
	{/each}
</div>
