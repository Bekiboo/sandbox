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
		enctype="multipart/form-data"
		method="POST"
		use:enhance={() => {
			isLoading = true

			return async ({ update }) => {
				update()
				isLoading = false
			}
		}}
		class="flex flex-col w-full gap-4 mt-12"
		class:isLoading
	>
		{#if form?.missing}
			<p class="text-error">No URL or file provided</p>
		{/if}
		{#if form?.badUrl}
			<p class="text-error">URL not valid</p>
		{/if}
		<input
			type="text"
			name="imgUrl"
			placeholder="Enter image URL here"
			class="w-full input input-bordered input-primary"
		/>
		<span>or</span>
		<div class="flex">
			<input
				type="file"
				class="w-full max-w-xs file-input file-input-bordered file-input-primary"
				name="imgFile"
				accept="image/*"
			/>
		</div>

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
					caption: { generated_text },
					elapsedTime
				} = result}
				<div class="flex flex-col mt-4 md:items-end md:flex-row md:flex-wrap">
					<a
						target="_blank"
						href="https://huggingface.co/{model}"
						class="md:text-xl link link-secondary">{model}</a
					>
					<span class="text-accent md:ml-4">
						{(elapsedTime / 1000).toFixed(3)}s
					</span>
					<p class="md:mt-1">{generated_text}</p>
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
