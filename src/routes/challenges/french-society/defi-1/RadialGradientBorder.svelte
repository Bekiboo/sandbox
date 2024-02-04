<script lang="ts">
	import { onMount } from 'svelte'

	export let borderColor = 'rgba(255,0,0,.66)'
	export let bgColor = '#212121'
	export let borderWidth = '0.1rem'
	export let borderRadius = '2rem'

	let wrapper: HTMLDivElement
	let wrapperCenter: { x: number; y: number } = { x: 0, y: 0 }
	let wrapperDims: { width: number; height: number } = { width: 0, height: 0 }
	let cursor: { x: number; y: number }
	let dx: number
	let dy: number

	onMount(() => {
		wrapperCenter = {
			x: wrapper.offsetLeft + wrapper.offsetWidth / 2,
			y: wrapper.offsetTop + wrapper.offsetHeight / 2
		}
		wrapperDims = {
			width: wrapper.offsetWidth,
			height: wrapper.offsetHeight
		}
	})

	const throttle = (fn: Function, delay: number) => {
		let last = 0
		return (...args: any[]) => {
			const now = new Date().getTime()
			if (now - last < delay) {
				return
			}
			last = now
			return fn(...args)
		}
	}

	function handleMouseMove(e: MouseEvent) {
		cursor = { x: e.clientX, y: e.clientY }

		dx = wrapperCenter.x - cursor.x - wrapperDims.width / 2
		dy = wrapperCenter.y - cursor.y - wrapperDims.height / 2
	}

	function handleResize() {
		wrapperCenter = {
			x: wrapper.offsetLeft + wrapper.offsetWidth / 2,
			y: wrapper.offsetTop + wrapper.offsetHeight / 2
		}
	}
</script>

<div
	class="wrapper"
	bind:this={wrapper}
	style:--pos-x="{-dx}px"
	style:--pos-y="{-dy}px"
	style:--borderColor={borderColor}
	style:--bgColor={bgColor}
	style:--borderWidth={borderWidth}
	style:--borderRadius={borderRadius}
>
	<div class="content">
		<slot />
	</div>
</div>

<svelte:window on:resize={handleResize} on:mousemove={throttle(handleMouseMove, 50)} />

<style>
	.wrapper {
		width: min-content;
		z-index: 1;
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.75);
		background: radial-gradient(
			circle at left var(--pos-x) top var(--pos-y),
			var(--borderColor) 10%,
			var(--bgColor) 50%
		);
		padding: var(--borderWidth);
		border-radius: var(--borderRadius);
	}

	.content {
		background-clip: padding-box;
		z-index: -1;

		border-radius: var(--borderRadius);
		background-color: var(--bgColor);
	}
</style>
