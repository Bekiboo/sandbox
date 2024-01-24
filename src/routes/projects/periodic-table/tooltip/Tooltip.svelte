<script lang="ts">
	export let message: string
	export let x: number
	export let y: number
	let tooltipWidth: number
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
