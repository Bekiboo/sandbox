<script lang="ts">
	import { onMount } from 'svelte'
	import type { Mouse } from '../utils'

	let canvas: HTMLCanvasElement
	let ctx: CanvasRenderingContext2D
	let controlPanel: HTMLDivElement
	let wrapper: HTMLDivElement

	// Controls
	let text = 'TEXT'
	const textPos = { x: 1, y: 20 }
	let connectParticles = true
	let connectDistance = 32
	let connectingLineWidth = 2
	let particleSize = 1
	let fontWeight = 300
	let particleShape = 'circle'

	const mouse: Mouse = {
		x: 0,
		y: 0,
		radius: 50
	}

	let textCoordinates: any

	let particleArray: Particle[] = []

	class Particle {
		x: any
		y: any
		size = particleSize
		basePos: any
		density = Math.random() * 40 + 5
		greenAndBlue = 255

		constructor(x: number, y: number) {
			this.x = x
			this.y = y
			this.basePos = { x: this.x, y: this.y }
		}

		draw() {
			ctx.fillStyle = `rgb(255, ${this.greenAndBlue}, ${this.greenAndBlue}, 1)`
			ctx.beginPath()

			if (particleShape === 'circle') ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
			if (particleShape === 'square') ctx.rect(this.x, this.y, this.size, this.size)
			ctx.closePath()

			ctx.fill()
		}

		update() {
			let dx = mouse.x - this.x
			let dy = mouse.y - this.y
			let distanceToMouse = Math.sqrt(dx * dx + dy * dy)

			if (distanceToMouse < mouse.radius) {
				let forceDirectionX = dx / distanceToMouse
				let forceDirectionY = dy / distanceToMouse
				let maxDistanceToMouse = mouse.radius
				let force = (maxDistanceToMouse - distanceToMouse) / maxDistanceToMouse
				let directionX = forceDirectionX * force * this.density
				let directionY = forceDirectionY * force * this.density

				this.x -= directionX
				this.y -= directionY
			} else {
				if (this.x !== this.basePos.x) {
					let dx = this.x - this.basePos.x
					this.x -= dx / 10
				}
				if (this.y !== this.basePos.y) {
					let dy = this.y - this.basePos.y
					this.y -= dy / 10
				}
			}

			let distanceToBase = this.findDistance(this, this.basePos)

			if (distanceToBase != 0) {
				this.greenAndBlue = 255 / (distanceToBase / 2)
			}
		}

		findDistance(a: any, b: any) {
			let dx = a.x - b.x
			let dy = a.y - b.y
			return Math.sqrt(dx * dx + dy * dy)
		}
	}

	const animate = () => {
		canvas.width = wrapper.clientWidth
		canvas.height = wrapper.clientHeight - controlPanel.clientHeight

		ctx.clearRect(0, 0, canvas.width, canvas.height)

		for (let i = 0; i < particleArray.length; i++) {
			particleArray[i].draw()
			particleArray[i].update()
		}

		if (connectParticles) connect()

		requestAnimationFrame(animate)
	}

	onMount(() => {
		if (canvas) {
			ctx = canvas.getContext('2d')!
		}
		document.fonts.ready.then(() => {
			init()
		})

		animate()
	})

	function init() {
		ctx.fillStyle = 'white'
		ctx.font = `${fontWeight} 16px Lemon-Milk`
		ctx.fillText(text, textPos.x, textPos.y)

		textCoordinates = ctx.getImageData(0, 0, 150, 50)

		particleArray = []

		for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
			for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
				if (textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 3] > 128) {
					let positionX = x
					let positionY = y
					particleArray.push(new Particle(positionX * 15, positionY * 15))
				}
			}
		}
	}

	function connect() {
		let opacityValue = 1

		for (let a = 0; a < particleArray.length; a++) {
			for (let b = a; b < particleArray.length; b++) {
				let dx = particleArray[a].x - particleArray[b].x
				let dy = particleArray[a].y - particleArray[b].y
				let distance = Math.sqrt(dx * dx + dy * dy)

				if (distance < connectDistance) {
					opacityValue = 1 - distance / connectDistance
					ctx.strokeStyle = `rgba(255, ${
						(particleArray[a].greenAndBlue + particleArray[b].greenAndBlue) / 2
					}, ${
						(particleArray[a].greenAndBlue + particleArray[b].greenAndBlue) / 2
					}, ${opacityValue})`
					ctx.lineWidth = connectingLineWidth
					ctx.beginPath()
					ctx.moveTo(particleArray[a].x, particleArray[a].y)
					ctx.lineTo(particleArray[b].x, particleArray[b].y)
					ctx.stroke()
				}
			}
		}
	}

	function mouseMove(event: MouseEvent) {
		mouse.x = event.offsetX
		mouse.y = event.offsetY
	}

	function mouseClick() {
		const timeoutLength = 2000
		mouse.radius += 50

		setTimeout(() => {
			mouse.radius -= 50
		}, timeoutLength)
	}
</script>

<div class="wrapper" bind:this={wrapper}>
	<div class="control-panel" bind:this={controlPanel}>
		<div class="flex gap-8">
			<div class="form-control gap-5">
				<input bind:value={text} on:input={init} type="text" />
				<select
					class="select select-primary w-full max-w-xs"
					bind:value={fontWeight}
					on:change={init}
				>
					<option selected>300</option>
					<option>400</option>
					<option>500</option>
					<option>700</option>
				</select>
			</div>
			<div class="form-control gap-5">
				<label class="cursor-pointer label">
					<span class="label-text">Connect Particles</span>
					<input
						type="checkbox"
						class="checkbox checkbox-primary ml-2"
						bind:checked={connectParticles}
					/>
				</label>
				<input
					type="range"
					min="0"
					max="100"
					class="range range-primary"
					bind:value={connectDistance}
				/>
				<input
					type="range"
					min="0"
					max="10"
					class="range range-primary"
					bind:value={connectingLineWidth}
				/>
			</div>
			<div class="form-control gap-5">
				<input
					type="range"
					min=".5"
					max="20"
					class="range range-primary"
					bind:value={particleSize}
					on:change={init}
				/>
				<div class="form-control">
					<label class="label cursor-pointer">
						<span class="label-text">Circles</span>
						<input
							bind:group={particleShape}
							value="circle"
							type="radio"
							name="radio-10"
							class="radio radio-primary"
						/>
					</label>
				</div>
				<div class="form-control">
					<label class="label cursor-pointer">
						<span class="label-text">Squares</span>
						<input
							bind:group={particleShape}
							value="square"
							type="radio"
							name="radio-10"
							class="radio radio-primary"
							checked
						/>
					</label>
				</div>
			</div>
		</div>
	</div>

	<canvas on:mousemove={mouseMove} on:click={mouseClick} bind:this={canvas} />
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
	canvas {
		width: 100%;
		height: 100%;
	}

	.control-panel {
		width: 100%;
		height: 100%;
	}
</style>
