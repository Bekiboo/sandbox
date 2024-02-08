<script lang="ts">
	export let borderColor = 'rgba(0,255,255,.66)'
	export let bgColor = '#212121'
	export let borderWidth = '0.1rem'
	export let borderRadius = '2rem'

	let pos = { x: '0', y: '0' }
	let wrapper: HTMLDivElement

	// This should be in $lib/utils
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

	function handleMouseMove({ clientX, clientY }: MouseEvent) {
		const { top, left, width, height } = wrapper.getBoundingClientRect()
		pos = {
			x: ((100 * (clientX - left)) / width).toFixed(2),
			y: ((100 * (clientY - top)) / height).toFixed(2)
		}
	}

	// Hide the radial gradient when the mouse leaves the window
	function mouseOut(e: MouseEvent) {
		if (e.relatedTarget === null) {
			pos = { x: '-1000', y: '-1000' }
		}
	}
</script>

<div
	class="wrapper"
	bind:this={wrapper}
	style:--pos-x="{pos.x}%"
	style:--pos-y="{pos.y}%"
	style:--borderColor={borderColor}
	style:--bgColor={bgColor}
	style:--borderWidth={borderWidth}
	style:--borderRadius={borderRadius}
>
	<div class="content">
		<slot />
	</div>
</div>

<svelte:window on:mouseout={mouseOut} on:mousemove={throttle(handleMouseMove, 50)} />

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
