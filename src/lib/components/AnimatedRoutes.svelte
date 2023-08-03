<script>
	import { fly } from 'svelte/transition';
	import { page } from '$app/stores';
	export let direction = '-100%';
</script>

{#key $page.url}
	<div in:fly={{ x: 100, duration: 100 }}>
		<slot />
	</div>
{/key}
