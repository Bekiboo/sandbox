<script lang="ts">
	import { page } from '$app/stores'

	let breadcrumbs = $derived($page.route.id?.split('/').slice(1) ?? [])
</script>

<nav class="absolute z-30 flex ml-8 text-sm breadcrumbs text-secondary">
	<ul>
		<li><a href="/">Home</a></li>
		{#each breadcrumbs as crumb, i}
			{@const url = breadcrumbs.slice(0, i + 1).join('/')}
			<li><a href="/{url}">{crumb.charAt(0).toUpperCase() + crumb.slice(1)}</a></li>
		{/each}
	</ul>
</nav>
