<script>
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<svelte:head>
	<title>Matching Game</title>
</svelte:head>

<div class="select-none">
	{@render children?.()}
</div>
