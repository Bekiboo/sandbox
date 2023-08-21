<script lang="ts">
	import { onMount } from 'svelte'
	import { Animation } from './animation'
	import type { Mouse } from '../utils'

	let canvas: HTMLCanvasElement
	let ctx: CanvasRenderingContext2D
	let canvasWidth: number
	let canvasHeight: number

	let lastTime = 1

	let animation: Animation

	const mouse: Mouse = {
		x: 0,
		y: 0,
		radius: 50
	}

	let textCoordinates: any
	let adjustX = -30
	let adjustY = 0

	let particleArray: Particle[] = []

	class Particle {
		x: any
		y: any
		size = 0.8
		baseX: any
		baseY: any
		density = Math.random() * 40 + 5
		constructor(x: number, y: number) {
			this.x = x * 2
			this.y = y * 2
			this.baseX = this.x
			this.baseY = this.y
		}

		draw() {
			ctx.fillStyle = 'white'
			ctx.beginPath()
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
			ctx.closePath()
			ctx.fill()
		}

		update() {
			let dx = mouse.x - this.x
			let dy = mouse.y - this.y
			let distance = Math.sqrt(dx * dx + dy * dy)

			if (distance < mouse.radius) {
				let forceDirectionX = dx / distance
				let forceDirectionY = dy / distance
				let maxDistance = mouse.radius
				let force = (maxDistance - distance) / maxDistance
				let directionX = forceDirectionX * force * this.density
				let directionY = forceDirectionY * force * this.density

				this.x -= directionX
				this.y -= directionY
			} else {
				if (this.x !== this.baseX) {
					let dx = this.x - this.baseX
					this.x -= dx / 10
				}
				if (this.y !== this.baseY) {
					let dy = this.y - this.baseY
					this.y -= dy / 10
				}
			}

			this.connect()
		}

		connect() {
			for (let i = 0; i < particleArray.length; i++) {
				let dx = this.x - particleArray[i].x
				let dy = this.y - particleArray[i].y
				let distance = Math.sqrt(dx * dx + dy * dy)

				if (distance < 16) {
					ctx.strokeStyle = 'white'
					ctx.lineWidth = 1
					ctx.beginPath()
					ctx.moveTo(this.x, this.y)
					ctx.lineTo(particleArray[i].x, particleArray[i].y)
					ctx.stroke()
				}
			}
		}

		onClick(timeoutLength: number) {}
	}

	onMount(() => {
		if (canvas) {
			ctx = canvas.getContext('2d')!
		}
		canvasWidth = canvas.width = 600
		canvasHeight = canvas.height = 800

		document.fonts.ready.then(() => {
			ctx.fillStyle = 'white'
			ctx.font = '300 16px Lemon-Milk'
			ctx.fillText('Julien', 40, 40)

			textCoordinates = ctx.getImageData(0, 0, 150, 50)

			init()
		})

		animation = new Animation(ctx, canvas.width, canvas.height)

		animate(0)
	})

	function animate(timestamp: number) {
		if (ctx) {
			ctx.clearRect(0, 0, canvasWidth, canvasHeight)
			// ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
			// ctx.fillRect(0, 0, canvasWidth, canvasHeight)

			// let deltaTime = timestamp - lastTime
			lastTime = timestamp

			for (let i = 0; i < particleArray.length; i++) {
				particleArray[i].draw()
				particleArray[i].update()
			}

			// animation.update(deltaTime, mouse)
			// animation.draw()

			requestAnimationFrame(animate)
		}
	}

	function init() {
		particleArray = []

		for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
			for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
				if (textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 3] > 128) {
					let positionX = x + adjustX
					let positionY = y + adjustY
					particleArray.push(new Particle(positionX * 5, positionY * 5))
				}
			}
		}
	}

	function mouseMove(event: MouseEvent) {
		mouse.x = event.offsetX
		mouse.y = event.offsetY
	}

	function mouseClick(event: MouseEvent) {
		const timeoutLength = 2000
		mouse.radius += 50

		setTimeout(() => {
			mouse.radius -= 50
		}, timeoutLength)

		for (let i = 0; i < particleArray.length; i++) {
			particleArray[i].onClick(timeoutLength)
		}
	}
</script>

<svelte:head>
	<meta
		name="viewport"
		content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
	/>
</svelte:head>

<div class="flex flex-col items-center mt-5">
	<canvas
		on:mousemove={mouseMove}
		on:click={mouseClick}
		class="w-[600px] h-[800px] border"
		bind:this={canvas}
	/>
</div>

<div class="font-lemonMilk font-bold">test</div>
<div class="font-lemonMilk font-thin">test</div>
<div class="font-lemonMilk text-white font-medium uppercase">Julien Connault</div>
