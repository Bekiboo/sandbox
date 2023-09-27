<script lang="ts">
	import { page } from '$app/stores'

	$: breadcrumb = $page.route.id?.split('/').slice(1) ?? []
</script>

<!-- {#if breadcrumb.length > 0} -->
<nav class="absolute flex justify-center w-screen text-sm breadcrumbs text-secondary">
	<ul>
		<li><a href="/">Home</a></li>
		{#each breadcrumb as beadcrumb, i}
			{@const url = breadcrumb.slice(0, i + 1).join('/')}
			<li><a href="/{url}">{beadcrumb.charAt(0).toUpperCase() + beadcrumb.slice(1)}</a></li>
		{/each}
	</ul>
</nav>
<!-- {/if} -->
