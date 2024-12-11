<script lang="ts">
	import type { Project } from './projects'

	interface Props {
		project: Project;
	}

	let { project }: Props = $props();
</script>

<div class="flex-grow w-64 border shadow-xl card bg-base-100 border-opacity-20">
	<!-- IMAGE -->
	{#if project.image}
		<figure>
			<img class="" src={project.image} alt={project.title} />
		</figure>
	{:else}
		<figure>
			<div class="w-full h-full" style="background-color: hsl({Math.random() * 360}, 100%, 50%);"></div>
		</figure>
	{/if}

	<!-- BODY -->
	<div class="card-body">
		<h2 class="card-title">{project.title}</h2>
		<p>{project.description}</p>
		<div class="flex justify-end gap-4 card-actions">
			<a
				class="btn btn-secondary"
				target="_blank"
				href={'https://github.com/Bekiboo/sandbox/tree/master/src/routes' + project.path}>Code</a
			>
			<a class="btn btn-primary" href={project.path}>View</a>
		</div>
	</div>
</div>
