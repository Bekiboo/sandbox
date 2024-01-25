<script lang="ts">
	import { onMount } from 'svelte'
	import { tooltip } from './tooltip/tooltip'

	export let element: any
	const { row, column, metallicity, name, symbol, number, electronicConfiguration } = element
	export let categories: any
	export let cursorPosition: { x: number; y: number }

	let elementButton: HTMLButtonElement
	let elementButtonCenter: { x: number; y: number } = { x: 0, y: 0 }

	function getElementButtonCenter() {
		elementButtonCenter = {
			x: elementButton.offsetLeft + elementButton.offsetWidth / 2,
			y: elementButton.offsetTop + elementButton.offsetHeight / 2
		}
	}

	function getDistanceBetweenCursorAndElementButtonCenter(cursorPos: { x: number; y: number }) {
		return Math.sqrt(
			Math.pow(elementButtonCenter?.x - cursorPos.x, 2) +
				Math.pow(elementButtonCenter?.y - cursorPos.y, 2)
		)
	}

	// function getMouseIntensity(cursorPos) {
	// 	const distance = getDistanceBetweenCursorAndElementButtonCenter(cursorPos)
	// 	const radius = elementButton?.offsetWidth / 2
	// 	if (distance > radius) return 0
	// 	return 1 - distance / radius
	// }

	$: intensity = getDistanceBetweenCursorAndElementButtonCenter(cursorPosition)

	onMount(() => {
		getElementButtonCenter()
	})
</script>

<button
	style="
            grid-column: {column + 1} / span 1;
            grid-row: {row + 1} / span 1;
            background-color: {categories[metallicity].color};
			border: 1px solid rgba(255,255,255, {1 - intensity / 225});

            "
	class="w-12 h-12 opacity-80 hover:opacity-100"
	on:click={() => console.log(element.groupBlock)}
	data-tooltip={electronicConfiguration}
	use:tooltip
	bind:this={elementButton}
>
	<div class="p-1 text-white">
		<div class="text-[0.6rem] -mb-1 text-left">{number}</div>
		<div class="text-2xl text-center">{symbol}</div>
	</div>
</button>

<svelte:window on:resize={getElementButtonCenter} />
