<script lang="ts">
	import { onMount } from 'svelte'
	import type { Color, Mouse } from '../utils'
	import { Particle } from './particles'
	import ControlPanel from './ControlPanel.svelte'

	let canvas: HTMLCanvasElement = $state()
	let ctx: CanvasRenderingContext2D
	let controlPanel: HTMLDivElement = $state()
	let wrapper: HTMLDivElement = $state()

	const textPos = { x: 1, y: 25 }

	// Controls
	let text: string = $state('Hi')
	let connectParticles: boolean = $state(true)
	let connectDistance: number = $state(50)
	let connectingLineWidth: number = $state(2)
	let particleSize: number = $state(4)
	let fontWeight: string = $state('normal')
	let fontFamily: string = $state('sans-serif')
	let particleShape: string = $state('circle')

	// TODO: add color picker to the control panel
	const colors = {
		butterScotch: { r: 220, g: 148, b: 76, a: 1 },
		aquamarine: { r: 76, g: 224, b: 179, a: 1 },
		myrtleGreen: { r: 55, g: 119, b: 113, a: 1 },
		prussianBlue: { r: 0, g: 38, b: 66, a: 1 },
		claret: { r: 132, g: 0, b: 50, a: 1 }
	}

	const mouse: Mouse = {
		x: 0,
		y: 0,
		radius: 50
	}

	let textCoordinates: any

	let particles: Particle[] = []

	const animate = () => {
		canvas.width = wrapper.clientWidth

		// if (window.innerWidth > 768) {
		// 	canvas.height = wrapper.clientHeight - controlPanel.clientHeight
		// }
		ctx.clearRect(0, 0, canvas.width, canvas.height)

		for (let i = 0; i < particles.length; i++) {
			particles[i].draw(ctx)
			particles[i].update(mouse)
		}

		if (connectParticles) connect()

		requestAnimationFrame(animate)
	}

	onMount(() => {
		if (canvas) {
			ctx = canvas.getContext('2d')!
		}

		canvas.width = wrapper.clientWidth
		// if (window.innerWidth > 768) {
		// 	canvas.height = wrapper.clientHeight - controlPanel.clientHeight
		// } else {
		canvas.height = wrapper.clientHeight
		// }

		init()
		animate()
	})

	function init() {
		ctx.textAlign = 'center'
		ctx.fillStyle = 'white'
		ctx.font = `${fontWeight} 16pt ${fontFamily}`
		const textWidth = ctx.measureText(text).width

		// TODO: fix the space between letters and text vertical alignment

		let spaceBetweenLetters = 0

		if (window.innerWidth > 768) {
			spaceBetweenLetters = 15
		} else {
			spaceBetweenLetters = 8
		}

		ctx.fillText(text, canvas.clientWidth / 2, canvas.clientHeight / 22)

		textCoordinates = ctx.getImageData((canvas.clientWidth - textWidth) / 2, 0, 150, 50)

		particles = []

		for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
			for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
				if (textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 3] > 128) {
					let positionX = x
					let positionY = y
					particles.push(
						new Particle(
							positionX * spaceBetweenLetters +
								canvas.clientWidth / 2 -
								(textWidth * spaceBetweenLetters) / 2,
							positionY * spaceBetweenLetters,
							particleShape,
							colors.butterScotch as Color,
							colors.aquamarine as Color,
							particleSize
						)
					)
				}
			}
		}
	}

	function connect() {
		let opacityValue = 1

		for (let a = 0; a < particles.length; a++) {
			for (let b = a; b < particles.length; b++) {
				let dx = particles[a].x - particles[b].x
				let dy = particles[a].y - particles[b].y
				let distance = Math.sqrt(dx * dx + dy * dy)

				if (distance < connectDistance) {
					opacityValue = 1 - distance / connectDistance
					ctx.strokeStyle = `rgba(${
						(particles[a].currentColor.r + particles[b].currentColor.r) / 2
					}, ${(particles[a].currentColor.g + particles[b].currentColor.g) / 2}, ${
						(particles[a].currentColor.b + particles[b].currentColor.b) / 2
					}, ${opacityValue})`
					ctx.lineWidth = connectingLineWidth
					ctx.beginPath()
					ctx.moveTo(particles[a].x, particles[a].y)
					ctx.lineTo(particles[b].x, particles[b].y)
					ctx.stroke()
				}
			}
		}
	}

	function mouseMove(event: MouseEvent) {
		mouse.x = event.offsetX
		mouse.y = event.offsetY
	}

	function touchMove(event: TouchEvent) {
		event.preventDefault()
		mouse.x = event.touches[0].clientX
		mouse.y = event.touches[0].clientY
	}

	function mouseClick() {
		const timeoutLength = 2000
		mouse.radius += 50

		setTimeout(() => {
			mouse.radius -= 50
		}, timeoutLength)
	}
</script>

<div class="relative overflow-hidden wrapper" bind:this={wrapper}>
	<canvas
		onmousemove={mouseMove}
		ontouchmove={touchMove}
		onclick={mouseClick}
		bind:this={canvas}
	></canvas>
	<ControlPanel
		bind:controlPanel
		bind:text
		bind:connectParticles
		bind:connectDistance
		bind:connectingLineWidth
		bind:particleSize
		bind:fontWeight
		bind:fontFamily
		bind:particleShape
		{init}
	/>
</div>

<svelte:window onresize={init} />

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		width: 100%;
	}
	canvas {
		width: 100%;
		height: 100%;
	}
</style>
