<script lang="ts">
	import { onMount } from 'svelte'

	export let controlPanel: HTMLDivElement

	export let FOV = 75
	export let castShadow = true

	let isOpen = true

	onMount(() => {
		if (window.innerWidth > 768) {
			isOpen = true
		} else {
			isOpen = false
		}
	})

	const open = () => {
		isOpen = !isOpen
	}
</script>

<div
	on:click={open}
	on:keydown={open}
	role="button"
	tabindex="0"
	class="absolute w-4 h-20 -translate-y-10 bg-primary top-1/2 right-64 handle md:hidden"
	class:isOpen
	class:isClosed={!isOpen}
/>
<div
	class="absolute right-0 flex flex-col w-64 h-full gap-8 p-2 overflow-y-scroll md:overflow-auto md:justify-center md:h-auto md:static md:flex-row md:w-full bg-neutral"
	bind:this={controlPanel}
	class:isOpen
	class:isClosed={!isOpen}
>
	<div class="form-control">
		<label class="cursor-pointer label">
			<span class="label-text">Field of View</span>
			<input type="range" min="10" max="125" class="range range-primary" bind:value={FOV} />{FOV}°
		</label>
		<label class="cursor-pointer label">
			<span class="label-text">Shadows</span>
			<input type="checkbox" class="ml-2 checkbox checkbox-primary" bind:checked={castShadow} />
		</label>
	</div>
</div>

<style>
	.label {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.label > span {
		margin-bottom: 0.25rem;
		text-align: left;
		@apply text-base font-bold;
	}
	.handle {
		clip-path: polygon(0% 15%, 100% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 85%);
	}
	.isOpen {
		transition: 0.3s ease-in-out;
		transform: translateX(0);
	}
	.isClosed {
		transition: 0.3s ease-in-out;
		transform: translateX(16rem);
	}
</style>
