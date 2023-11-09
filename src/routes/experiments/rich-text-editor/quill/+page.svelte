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

	let content = {
		ops: [
			{
				insert: 'Hi there,'
			},
			{
				attributes: {
					header: 2
				},
				insert: '\n'
			},
			{
				insert: 'this is a '
			},
			{
				attributes: {
					italic: true
				},
				insert: 'basic'
			},
			{
				insert: ' example of '
			},
			{
				attributes: {
					bold: true
				},
				insert: 'Quill'
			},
			{
				insert:
					'. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:\nThat’s a bullet list with one …'
			},
			{
				attributes: {
					list: 'bullet'
				},
				insert: '\n'
			},
			{
				insert: '… or two list items.'
			},
			{
				attributes: {
					list: 'bullet'
				},
				insert: '\n'
			},
			{
				insert:
					'Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:\nbody {'
			},
			{
				attributes: {
					'code-block': true
				},
				insert: '\n'
			},
			{
				insert: '\t\t  display: none;'
			},
			{
				attributes: {
					'code-block': true
				},
				insert: '\n'
			},
			{
				insert: '\t\t}'
			},
			{
				attributes: {
					'code-block': true
				},
				insert: '\n'
			},
			{
				insert:
					'I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.\nWow, that’s amazing. Good work, boy! 👏 '
			},
			{
				attributes: {
					blockquote: true
				},
				insert: '\n'
			},
			{
				insert: '— Mom'
			},
			{
				attributes: {
					blockquote: true
				},
				insert: '\n'
			},
			{
				insert: '\n'
			}
		]
	}

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
		quill.setContents(content)
	})
</script>

<div class="w-screen h-screen p-4 overflow-x-hidden bg-gray-200">
	<div class="max-w-4xl mx-auto">
		<div class="h-full text-black">
			<div class="mt-4 bg-white editor-wrapper">
				<div bind:this={editor} />
			</div>
			{#if content}
				<pre class="mt-4 wrap">{JSON.stringify(content, null, 2)}</pre>
			{/if}
		</div>
	</div>
</div>

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
</style>
