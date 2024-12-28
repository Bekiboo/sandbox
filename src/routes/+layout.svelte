<script lang="ts">
	import '../app.css'
	import { page } from '$app/stores'
	import Breadcrumbs from '$lib/components/layout/Breadcrumbs.svelte'

	interface Props {
		children?: import('svelte').Snippet
	}

	let { children }: Props = $props()
</script>

<main class="flex flex-col max-w-screen-xl mx-auto">
	<Breadcrumbs />
	{#if !$page.error}
		{@render children?.()}
	{:else}
		<div>Page not found</div>
	{/if}
</main>
