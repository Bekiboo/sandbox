<script lang="ts">
	import { enhance } from '$app/forms'
	import type { ActionData } from './$types'

	export let form: ActionData

	let isLoading = false
</script>

<div class="flex flex-col items-center h-screen max-w-xs py-12 mx-auto md:max-w-lg">
	<h1 class="text-2xl font-bold md:text-4xl">Image to Caption</h1>
	<h2 class="mt-1 md:text-xl text-secondary">A HuggingFace model comparator</h2>
	<form
		method="POST"
		use:enhance={() => {
			isLoading = true
			return async ({ result, update }) => {
				update()
				isLoading = false
			}
		}}
		class="flex flex-col w-full gap-4 mt-12"
		class:isLoading
	>
		{#if form?.missing}
			<p class="text-error">No URL provided</p>
		{/if}
		{#if form?.badUrl}
			<p class="text-error">URL not valid</p>
		{/if}
		<input
			type="text"
			name="imgUrl"
			placeholder="Enter image URL here"
			class="w-full input input-bordered"
		/>
		<button type="submit" class="w-full btn btn-primary">
			{#if !isLoading}
				Get Caption
			{:else}
				<span class="loading loading-spinner loading-lg" />
			{/if}
		</button>
	</form>

	{#if form?.serverError}
		<p class="m-4 text-xl font-bold text-error">Something went wrong</p>
	{/if}

	<p>
		{#if form?.results && !isLoading}
			{#each form?.results as result}
				{@const {
					model,
					caption: { generated_text }
				} = result}
				<div class="mt-4">
					<a
						target="_blank"
						href="https://huggingface.co/{model}"
						class="text-xl link link-secondary">{model}</a
					>
					<p>{generated_text}</p>
				</div>
			{/each}
		{/if}
	</p>
</div>

<style>
	.isLoading {
		pointer-events: none;
		opacity: 0.5;
	}
</style>
