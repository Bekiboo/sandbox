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
		<input type="text" name="imgUrl" placeholder="Type here" class="w-full input input-bordered" />
		<p>
			{form?.imgUrl ?? ''}
		</p>
		<button type="submit" class="w-full btn btn-primary">
			{#if !isLoading}
				Get Caption
			{:else}
				<span class="loading loading-spinner loading-lg" />
			{/if}
		</button>
	</form>

	<p>
		{#if form?.results && !isLoading}
			{#each form?.results as result}<div class="mt-4">
					<a
						target="_blank"
						href="https://huggingface.co/{result?.model}"
						class="text-xl link link-secondary">{result?.model}</a
					>
					<p>{result?.caption.generated_text}</p>
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
