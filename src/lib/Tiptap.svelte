<script lang="ts">
	import './styles.css'

	import { onMount } from 'svelte'
	import { Editor } from '@tiptap/core'
	import StarterKit from '@tiptap/starter-kit'
	import { Undo, Redo } from 'lucide-svelte'

	let element: HTMLDivElement
	let editor: Editor

	let json: any

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit],
			editorProps: {
				attributes: {
					class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none'
				}
			},
			content: `
			  <h2>
				Hi there,
			  </h2>
			  <p>
				this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
			  </p>
			  <ul>
				<li>
				  That’s a bullet list with one …
				</li>
				<li>
				  … or two list items.
				</li>
			  </ul>
			  <p>
				Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
			  </p>
			  <pre><code class="language-css">body {
		  display: none;
		}</code></pre>
			  <p>
				I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
			  </p>
			  <blockquote>
				Wow, that’s amazing. Good work, boy! 👏
				<br />
				— Mom
			  </blockquote>
			`,
			onTransaction: () => {
				json = editor.getJSON()

				// force re-render so `editor.isActive` works as expected
				editor = editor
			}
		})
	})
</script>

<div class="w-screen h-screen p-4 overflow-x-hidden text-black bg-gray-200">
	<div class="max-w-4xl mx-auto">
		{#if editor}
			<div class="my-4">
				<div class="flex flex-wrap gap-1">
					<button
						on:click={() => editor.chain().focus().toggleBold().run()}
						disabled={!editor.can().chain().focus().toggleBold().run()}
						class={editor.isActive('bold') ? 'is-active' : ''}
					>
						<div class="font-bold">B</div>
					</button>
					<button
						on:click={() => editor.chain().focus().toggleItalic().run()}
						disabled={!editor.can().chain().focus().toggleItalic().run()}
						class={editor.isActive('italic') ? 'is-active' : ''}
					>
						<i>I</i>
					</button>
					<button
						on:click={() => editor.chain().focus().toggleStrike().run()}
						disabled={!editor.can().chain().focus().toggleStrike().run()}
						class={editor.isActive('strike') ? 'is-active' : ''}
					>
						<s>S</s>
					</button>
					<button
						on:click={() => editor.chain().focus().setParagraph().run()}
						class={editor.isActive('paragraph') ? 'is-active' : ''}
					>
						paragraph
					</button>
					<button
						on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
						class={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
					>
						h1
					</button>
					<button
						on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
						class={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
					>
						h2
					</button>
					<button
						on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
						class={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
					>
						h3
					</button>
					<button
						on:click={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
						class={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
					>
						h4
					</button>
					<button
						on:click={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
						class={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
					>
						h5
					</button>
					<button
						on:click={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
						class={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
					>
						h6
					</button>
					<button
						on:click={() => editor.chain().focus().toggleBulletList().run()}
						class={editor.isActive('bulletList') ? 'is-active' : ''}
					>
						bullet list
					</button>
					<button
						on:click={() => editor.chain().focus().toggleOrderedList().run()}
						class={editor.isActive('orderedList') ? 'is-active' : ''}
					>
						ordered list
					</button>
					<!-- <button
						on:click={() => editor.chain().focus().toggleCode().run()}
						disabled={!editor.can().chain().focus().toggleCode().run()}
						class={editor.isActive('code') ? 'is-active' : ''}
					>
						code
					</button> -->
					<!-- <button on:click={() => editor.chain().focus().unsetAllMarks().run()}>
						clear marks
					</button> -->
					<!-- <button on:click={() => editor.chain().focus().clearNodes().run()}> clear nodes </button> -->
					<!-- <button
						on:click={() => editor.chain().focus().toggleCodeBlock().run()}
						class={editor.isActive('codeBlock') ? 'is-active' : ''}
					>
						code block
					</button> -->
					<!-- <button on:click={() => editor.chain().focus().setHardBreak().run()}> hard break </button> -->
					<button
						on:click={() => editor.chain().focus().toggleBlockquote().run()}
						class={editor.isActive('blockquote') ? 'is-active' : ''}
					>
						blockquote
					</button>
					<button on:click={() => editor.chain().focus().setHorizontalRule().run()}>
						horizontal rule
					</button>
					<button
						on:click={() => editor.chain().focus().undo().run()}
						disabled={!editor.can().chain().focus().undo().run()}
					>
						<Undo />
					</button>
					<button
						on:click={() => editor.chain().focus().redo().run()}
						disabled={!editor.can().chain().focus().redo().run()}
					>
						<Redo />
					</button>
				</div>
			</div>
		{/if}

		<div class="p-4 bg-white" bind:this={element} />

		{#if editor}
			<div class="m-4 overflow-x-hidden">
				<pre class="p-4">{JSON.stringify(json, null, 2)}</pre>
			</div>
		{/if}
	</div>
</div>

<style>
	button {
		@apply px-2 py-1 text-2xl;
	}
	.is-active {
		@apply bg-blue-300 rounded-full;
	}
</style>
