<script lang="ts">
	import type { Project } from './projects'

	interface Props {
		project: Project
	}

	let { project }: Props = $props()
</script>

<div
	class="mb-8 overflow-hidden border shadow-xl grow sm:basis-1/3 md:basis-1/4 card bg-base-100 border-opacity-20"
>
	<!-- IMAGE -->
	<div class="h-48">
		{#if project.image}
			<img class="object-cover w-full h-full" src={project.image} alt={project.title} />
		{:else}
			<div
				class="w-full h-full"
				style="background-color: hsl({Math.random() * 360}, 100%, 50%);"
			></div>
		{/if}
	</div>

	<!-- BODY -->
	<div class="card-body">
		<h2 class="card-title">{project.title}</h2>
		<p>{project.description}</p>
		<div class="flex justify-end gap-4 card-actions">
			<a class="btn btn-secondary" target="_blank" href={project.github}>Code</a>
			<a class="btn btn-primary" href={project.path}>View</a>
		</div>
	</div>
</div>
