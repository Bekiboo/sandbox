<script lang="ts">
	import { page } from '$app/stores';
	import AnimatedRoutes from '$lib/components/AnimatedRoutes.svelte';
</script>

<nav class="flex justify-center my-6">
	<ul class="steps">
		<a href="/sandbox/fkit/login" class="step step-primary">Sign In</a>
		<a
			href="/sandbox/fkit/login/username"
			class="step"
			class:step-primary={$page.route.id?.match(/username|photo/g)}
		>
			Choose Username
		</a>
		<a
			href="/sandbox/fkit/login/photo"
			class="step"
			class:step-primary={$page.route.id?.includes('photo')}
		>
			Upload Photo
		</a>
	</ul>
</nav>

<AnimatedRoutes>
	<main class="card w-4/6 bg-neutral text-neutral-content mx-auto">
		<div class="card-body items-center text-center">
			<slot />
		</div>
	</main>
</AnimatedRoutes>
