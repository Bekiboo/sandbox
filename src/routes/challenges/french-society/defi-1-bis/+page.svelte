<script lang="ts">
	import { onMount } from 'svelte'

	let form: HTMLFormElement
	let formCenter: { x: number; y: number }
	let cursor: { x: number; y: number }
	let angle: number
	let intensity: number

	onMount(() => {
		formCenter = {
			x: form.offsetLeft + form.offsetWidth / 2,
			y: form.offsetTop + form.offsetHeight / 2
		}
		console.log(formCenter)
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

	function getMouseAngle(deltaX: number, deltaY: number) {
		let radians = Math.atan2(deltaY, deltaX)
		let degrees = radians * (180 / Math.PI) - 90

		if (degrees < 0) {
			degrees += 360
		}

		return degrees
	}

	function getMouseIntensity(deltaX: number, deltaY: number, maxIntensity: number) {
		const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2)
		const divRadius = Math.sqrt(form.offsetWidth ** 2 + form.offsetHeight ** 2) / 2

		const scalingFactor = 1 - Math.min(distance / divRadius, 1)
		const intensity = scalingFactor * maxIntensity

		return intensity
	}

	function handleMouseMove(e: MouseEvent) {
		cursor = { x: e.clientX, y: e.clientY }
		const deltaX = cursor.x - formCenter.x
		const deltaY = cursor.y - formCenter.y

		angle = getMouseAngle(deltaX, deltaY)
		intensity = getMouseIntensity(deltaX, deltaY, 100)
	}

	function handleResize() {
		formCenter = {
			x: form.offsetLeft + form.offsetWidth / 2,
			y: form.offsetTop + form.offsetHeight / 2
		}
	}
</script>

<form
	bind:this={form}
	action="POST"
	style="background: radial-gradient({angle}deg, red, #212121 {intensity}%);"
>
	<div class="wrapper">
		<label for="name">Email d'entreprise</label>
		<input type="text" name="name" id="name" />
		<label for="name">Comment pouvons-nous vous aider?</label>
		<textarea name="message" id="message" cols="30" rows="4"></textarea>
		<button type="submit">Envoyer</button>
	</div>
</form>

<svelte:window on:resize={handleResize} on:mousemove={throttle(handleMouseMove, 50)} />

<style>
	:root {
		--form-border-width: 0.1rem;
		--form-radius: 2rem;
	}

	form {
		margin: 8rem auto;
		width: 40rem;
		padding: var(--form-border-width);
		border-radius: var(--form-radius);
		box-shadow: -1px 7px 16px 0px rgba(0, 0, 0, 0.75);
	}

	.wrapper {
		position: relative;
		display: flex;
		flex-direction: column;
		background-color: #212121;
		padding: 2rem;
		border-radius: var(--form-radius);
		background-clip: padding-box;
	}

	input,
	textarea {
		background-color: #313131;
		border: none;
		border-radius: 1rem;
		color: #fff;
		font-size: 1.2rem;
		padding: 1rem;
		margin-bottom: 2rem;
		margin-top: 0.5rem;
		outline: none;
		transition: border-color 0.2s ease-in-out;
	}

	textarea {
		resize: none;
	}

	button {
		padding: 1rem 2rem;
		border-radius: 1rem;
		border: 1px solid white;
		font-weight: 700;
		cursor: pointer;
		width: 10rem;
	}

	button:hover {
		border: 1px solid red;
		transition: all 100ms ease-in-out;
	}
</style>
