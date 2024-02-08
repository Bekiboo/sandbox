<script lang="ts">
	import ContactForm from './ContactForm.svelte'

	export let data
</script>

<main class="flex items-center justify-center h-screen bg-zinc-800">
	<ContactForm formData={data.form} />
</main>
