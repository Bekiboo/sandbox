<script lang="ts">
	import { page } from '$app/stores'
	import AnimatedRoutes from '../components/AnimatedRoutes.svelte'
</script>

<div class="grid-wrapper">
	<canvas class="w-full h-full border border-white" />
	<div class="body-wrapper">
		<nav class="flex justify-center my-6">
			<ul class="steps">
				<a href="/projects/fkit/login" class="step step-primary">Sign In</a>
				<a
					href="/projects/fkit/login/username"
					class="step"
					class:step-primary={$page.route.id?.match(/username|photo/g)}
				>
					Choose Username
				</a>
				<a
					href="/projects/fkit/login/photo"
					class="step"
					class:step-primary={$page.route.id?.includes('photo')}
				>
					Upload Photo
				</a>
			</ul>
		</nav>

		<AnimatedRoutes>
			<main class="w-4/6 mx-auto card bg-neutral text-neutral-content">
				<div class="items-center text-center card-body">
					<slot />
				</div>
			</main>
		</AnimatedRoutes>
	</div>
</div>

<style>
	.grid-wrapper {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		height: 100vh;
	}

	.body-wrapper {
		grid-row: 1;
		grid-column: 1;
	}

	canvas {
		grid-row: 1;
		grid-column: 1;
	}
</style>
