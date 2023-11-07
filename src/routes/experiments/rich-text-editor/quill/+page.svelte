<script lang="ts">
	import { onMount } from 'svelte'

	let editor: HTMLDivElement

	export let toolbarOptions = [
		[{ header: 1 }, { header: 2 }, 'blockquote', 'link', 'image', 'video'],
		['bold', 'italic', 'underline', 'strike'],
		[{ list: 'ordered' }, { list: 'ordered' }],
		[{ align: [] }],
		['clean']
	]

	let content: any

	onMount(async () => {
		const { default: Quill } = await import('quill')

		let quill = new Quill(editor, {
			modules: {
				toolbar: toolbarOptions
			},
			theme: 'snow',
			placeholder: 'Write your story...'
		})
		quill.on('text-change', function () {
			content = quill.getContents()
		})
	})
</script>

<div class="w-screen h-screen overflow-x-hidden bg-gray-200">
	<div class="flex flex-col items-center max-w-2xl mx-auto">
		<div class="h-full text-black">
			<div class="mt-4 editor-wrapper">
				<div bind:this={editor} />
			</div>
			{#if content}
				<pre class="mt-4">{JSON.stringify(content, null, 2)}</pre>
			{/if}
		</div>
	</div>
</div>

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
</style>
