<script lang="ts">
	import ProjectCard from './ProjectCard.svelte'
	import { projects } from './projects'
	import { DateTime } from 'luxon'
</script>

<main class="max-w-screen-xl px-8 mx-auto lg:px-16">
	<header class="my-4 lg:my-16">
		<h1 class="text-6xl">Bekiboo's Sandbox</h1>
		<p class="max-w-[60ch] mt-4">
			This website is home to my successful and unsuccesful experiments. It's a dedicated place for
			testing, failing, refining, and showcasing my latest attemps to unravel the mysteries of web
			development.
		</p>
	</header>

	<!-- Tiles -->
	<div class="flex flex-wrap justify-center w-full gap-6">
		{#each projects as project}
			<ProjectCard {project} />
		{/each}
	</div>
</main>
