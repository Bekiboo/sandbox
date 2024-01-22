<script lang="ts">
	import { onMount } from 'svelte'

	export let borderColor = '255,0,0'
	export let bgColor = '#212121'
	export let intensity = 1

	let wrapper: HTMLDivElement
	let wrapperCenter: { x: number; y: number } = { x: 0, y: 0 }
	let wrapperDims: { width: number; height: number } = { width: 0, height: 0 }
	let cursor: { x: number; y: number }
	let correctedIntensity: number
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

	function getMouseIntensity(
		cursor: { x: number; y: number },
		center: { x: number; y: number },
		radius: number
	) {
		// get distance between cursor and center (pythagore)
		const distance = Math.sqrt(Math.pow(center.x - cursor.x, 2) + Math.pow(center.y - cursor.y, 2))
		if (distance > radius) return 0

		// return a value between 0 and 1.25
		return intensity - distance / radius
	}

	function handleMouseMove(e: MouseEvent) {
		cursor = { x: e.clientX, y: e.clientY }

		correctedIntensity = getMouseIntensity(cursor, wrapperCenter, wrapperDims.width)

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
	style={`
        background: radial-gradient(circle at  ${-dx}px ${-dy}px, rgba(${borderColor}, ${correctedIntensity}), ${bgColor});
        `}
>
	<div class="content">
		<slot />
	</div>
</div>

<svelte:window on:resize={handleResize} on:mousemove={throttle(handleMouseMove, 50)} />

<style>
	:root {
		--wrapper-border-width: 0.1rem;
		--wrapper-radius: 2rem;
	}

	.wrapper {
		margin: 8rem auto;
		width: 40rem;
		padding: var(--wrapper-border-width);
		border-radius: var(--wrapper-radius);
		box-shadow: -1px 7px 16px 0px rgba(0, 0, 0, 0.75);
	}

	.content {
		background-color: #212121;
		border-radius: var(--wrapper-radius);
		background-clip: padding-box;
	}
</style>
