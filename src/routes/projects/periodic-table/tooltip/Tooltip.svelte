<script lang="ts">
	interface Props {
		message: string;
		x: number;
		y: number;
	}

	let { message, x, y }: Props = $props();
	let tooltipWidth: number = $state()
</script>

<div
	class="p-2 text-white rounded-md bg-slate-700"
	bind:clientWidth={tooltipWidth}
	style="
		top: {y - 56}px;
		left: {x - tooltipWidth / 2}px;"
>
	{message}
</div>

<style>
	div {
		position: absolute;
	}
</style>
