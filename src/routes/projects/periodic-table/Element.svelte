<script lang="ts">
	import { throttle } from '$lib/utils';
	import { onMount } from 'svelte';

	export let element: any;
	const { row, column, metallicity, symbol, number, chemicalFamily, standardState, subshellBlock } =
		element;
	export let colorScheme: { name: string; group: any };
	export let cursorPosition: { x: number; y: number };
	export let selectedElement: string | null;

	let button: HTMLButtonElement;
	let buttonCenter: { x: number; y: number } = { x: 0, y: 0 };
	let intensity: number = 1000;

	let color: string;

	$: switch (colorScheme.name) {
		case 'Metallicity':
			color = colorScheme.group[metallicity].color;
			break;

		case 'Chemical Family':
			color = colorScheme.group[chemicalFamily].color;
			break;
		case 'Standard State':
			color = colorScheme.group[standardState].color;
			break;
		case 'Subshell Blocks':
			color = colorScheme.group[subshellBlock].color;
			break;

		default:
			color = '#333';
			break;
	}

	function getButtonCenter() {
		buttonCenter = {
			x: button.offsetLeft + button.offsetWidth / 2,
			y: button.offsetTop + button.offsetHeight / 2
		};
	}

	function getDistFromCursorToButton(cursorPos: { x: number; y: number }) {
		return Math.sqrt(
			Math.pow(buttonCenter?.x - cursorPos.x, 2) + Math.pow(buttonCenter?.y - cursorPos.y, 2)
		);
	}

	$: intensity = getDistFromCursorToButton(cursorPosition);

	onMount(() => {
		getButtonCenter();
	});
</script>

<button
	style="
            grid-column: {column + 1} / span 1;
            grid-row: {row + 1} / span 1;
			background-color: {color};
			border: 1px solid rgba(255,255,255, {1 - intensity / 225});
            "
	class="w-12 h-12 opacity-80 hover:opacity-100"
	bind:this={button}
	on:click={() => (selectedElement = element)}
	class:!bg-white={selectedElement == element}
	class:!opacity-100={selectedElement == element}
>
	<div class="p-1 text-white" class:!text-black={selectedElement == element}>
		<div class="text-[0.6rem] -mb-1 text-left">{number}</div>
		<div class="text-2xl text-center">{symbol}</div>
	</div>
</button>

<svelte:window on:resize={throttle(getButtonCenter, 50)} />

<style>
	button {
		transition: background-color 0.3s ease-in-out;
	}
</style>
