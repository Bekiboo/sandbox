<script lang="ts">
	import { onMount } from 'svelte'

	interface Props {
		FOV?: number
		castShadow?: boolean
	}

	let { FOV = $bindable(75), castShadow = $bindable() }: Props = $props()

	let isOpen = $state(true)

	onMount(() => {
		if (window.innerWidth > 768) {
			isOpen = true
		} else {
			isOpen = false
		}
	})
</script>

<div
	class="absolute right-0 z-50 flex flex-col w-64 h-full gap-8 p-2 overflow-y-scroll md:overflow-auto md:justify-center md:h-auto md:flex-row bg-neutral"
	class:isOpen
	class:isClosed={!isOpen}
>
	<div class="form-control">
		<label class="cursor-pointer label">
			<span class="label-text">Field of View</span>
			<input
				type="range"
				min="10"
				max="125"
				class="range range-primary"
				bind:value={FOV}
			/>{FOV}°
		</label>
		<label class="cursor-pointer label">
			<span class="label-text">Shadows</span>
			<input
				type="checkbox"
				class="ml-2 checkbox checkbox-primary"
				bind:checked={castShadow}
			/>
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
