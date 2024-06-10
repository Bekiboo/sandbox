<script lang="ts">
	export let value = 0
	export let skill = '__________'
	export let total
</script>

<div class="flex items-center gap-4">
	<div>
		<button
			class="w-4 h-4 border rounded-l-full rounded-b-full rotate-45 duration-100 {value >= 2
				? 'bg-white'
				: ''}"
			on:click={() => (value != 2 ? (value = 2) : (value = 0))}
		></button>
		<button
			class="w-4 h-4 border rounded-l-full rounded-b-full rotate-45 duration-100 {value >= 4
				? 'bg-white'
				: ''}"
			on:click={() => (value != 4 ? (value = 4) : (value = 2))}
		></button>
		<button
			class="w-4 h-4 border rounded-l-full rounded-b-full rotate-45 duration-100 {value >= 6
				? 'bg-white'
				: ''}"
			on:click={() => (value != 6 ? (value = 6) : (value = 4))}
		></button>
		<button
			class="w-4 h-4 border rounded-l-full rounded-b-full rotate-45 duration-100 {value >= 8
				? 'bg-white'
				: ''}"
			on:click={() => (value != 8 ? (value = 8) : (value = 6))}
		></button>
		<button
			class="w-4 h-4 border rounded-l-full rounded-b-full rotate-45 duration-100 {value >= 10
				? 'bg-white'
				: ''}"
			on:click={() => (value != 10 ? (value = 10) : (value = 8))}
		></button>
	</div>

	<div class="w-8 text-center border">
		{total}
	</div>

	<div class="uppercase">
		{skill}
	</div>
</div>
