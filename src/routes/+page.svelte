<script lang="ts">
	import ThemeSwitch from './ThemeSwitch.svelte';
</script>

<header>
	<!-- dark/light theme switch -->
	<div class="flex justify-end">
		<ThemeSwitch />
	</div>
</header>

<main>
	<button class="mt-10 ml-20">Click Me</button>
</main>

<style>
	main {
		background-color: var(--primary);
	}
</style>
