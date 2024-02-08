<script lang="ts">
	import { fly } from 'svelte/transition'

	export let errors
</script>

{#if errors}
	<small class="error-message" in:fly={{ x: -100, duration: 200 }}>{errors[0]}</small>
{/if}

<style>
	.error-message {
		position: absolute;
		right: 0;
		color: rgba(255, 0, 0, 0.75);
		font-size: 1rem;
	}
</style>
