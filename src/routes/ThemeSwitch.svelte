<!-- Theme switch component -->
<script lang="ts">
	import { writable } from 'svelte/store';

	export const theme = writable('light');

	theme.subscribe((value) => {
		if (value === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	});
</script>

<!-- https://www.youtube.com/watch?v=mt56gKUeppk&t=65s -->
