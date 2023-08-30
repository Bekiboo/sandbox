<script lang="ts">
	import { enhance } from '$app/forms'
	import type { ActionData } from './$types'

	export let form: ActionData

	let caption = ''

	let loading = false

	$: console.log(form?.captions)
</script>

<div class="flex flex-col items-center justify-center h-screen px-16">
	<h1 class="text-2xl font-bold">Image to Caption</h1>
	<h2>A HuggingFace model comparator</h2>
	<form method="POST" use:enhance class="flex flex-col gap-4 mt-12">
		{#if form?.missing}
			<p class="text-red-500">No URL provided</p>
		{/if}
		<input
			type="text"
			name="imgUrl"
			placeholder="Type here"
			class="max-w-6xl w-96 input input-bordered"
		/>
		<p>
			{form?.imgUrl ?? ''}
		</p>
		<button type="submit" class="btn btn-primary">
			{#if !loading}
				Get Caption
			{:else}
				<span class="loading loading-spinner loading-lg" />
			{/if}
		</button>
	</form>

	<p>
		{#if form?.captions}
			{#each form?.captions as caption}<div class="mt-4">
					<h3 class="text-xl">{caption?.modelName}</h3>
					<p class="text-white">{caption?.caption.generated_text}</p>
				</div>
			{/each}
		{/if}
	</p>
</div>
