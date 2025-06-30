<script lang="ts">
	import '../app.css'
	import { page } from '$app/stores'
	import Breadcrumbs from '$lib/components/layout/Breadcrumbs.svelte'

	
	let { children } = $props()
</script>

<main class="flex flex-col mx-auto">
	<Breadcrumbs />
	{#if !$page.error}
		{@render children?.()}
	{:else}
		<div>Page not found</div>
	{/if}
</main>
