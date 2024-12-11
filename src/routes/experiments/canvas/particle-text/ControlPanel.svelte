<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		controlPanel: HTMLDivElement;
		text?: string;
		connectParticles?: boolean;
		connectDistance?: number;
		connectingLineWidth?: number;
		particleSize?: number;
		fontWeight?: string;
		fontFamily?: string;
		particleShape?: string;
		init: () => void;
	}

	let {
		controlPanel = $bindable(),
		text = $bindable(),
		connectParticles = $bindable(),
		connectDistance = $bindable(),
		connectingLineWidth = $bindable(),
		particleSize = $bindable(),
		fontWeight = $bindable(),
		fontFamily = $bindable(),
		particleShape = $bindable(),
		init
	}: Props = $props();

	let isOpen = $state(true);

	onMount(() => {
		if (window.innerWidth > 768) {
			isOpen = true;
			particleSize = 7;
		} else {
			isOpen = false;
			particleSize = 3;
		}
	});

	const open = () => {
		isOpen = !isOpen;
	};

	const checkWidth = () => {
		if (window.innerWidth > 768) {
			isOpen = true;
			particleSize = 7;
		} else {
			isOpen = false;
			particleSize = 3;
		}
	};
</script>

<div
	onclick={open}
	onkeydown={open}
	role="button"
	tabindex="0"
	class="absolute w-4 h-20 -translate-y-10 bg-primary top-1/2 right-64 handle md:hidden"
	class:isOpen
	class:isClosed={!isOpen}
></div>
<div
	class="absolute right-0 flex flex-col w-64 h-full gap-8 p-2 overflow-y-scroll md:overflow-auto md:justify-center md:h-auto md:static md:flex-row md:w-full bg-neutral"
	bind:this={controlPanel}
	class:isOpen
	class:isClosed={!isOpen}
>
	<div class="form-control">
		<label class="cursor-pointer label">
			<span class="label-text">Text Input</span>
			<input
				class="input input-bordered input-primary"
				bind:value={text}
				oninput={init}
				type="text"
			/>
		</label>
		<label class="cursor-pointer label">
			<span class="label-text">Font Style</span>
			<select class="w-full max-w-xs select select-primary" bind:value={fontWeight} onchange={init}>
				<option selected>normal</option>
				<option>bold</option>
				<option>italic</option>
			</select>
		</label>
		<label class="cursor-pointer label">
			<span class="label-text">Font Family</span>
			<select class="w-full max-w-xs select select-primary" bind:value={fontFamily} onchange={init}>
				<option selected>sans-serif</option>
				<option>serif</option>
			</select>
		</label>
	</div>
	<div class="form-control">
		<label class="cursor-pointer label">
			<span class="label-text">Connect Particles</span>
			<input
				type="checkbox"
				class="ml-2 checkbox checkbox-primary"
				bind:checked={connectParticles}
			/>
		</label>
		<label class="cursor-pointer label">
			<span class="label-text">Connect Distance</span>
			<input
				type="range"
				min="0"
				max="100"
				class="range range-primary"
				bind:value={connectDistance}
			/>
		</label>
		<label class="cursor-pointer label">
			<span class="label-text">Connecting Line Width</span>
			<input
				type="range"
				min="0.5"
				max="10"
				class="range range-primary"
				bind:value={connectingLineWidth}
			/>
		</label>
	</div>
	<div class="form-control">
		<label class="cursor-pointer label">
			<span class="label-text">Particle Size</span>
			<input
				type="range"
				min=".5"
				max="12"
				class="range range-primary"
				bind:value={particleSize}
				onchange={init}
			/>
		</label>

		<div class="form-control">
			<label class="cursor-pointer label">
				<span class="label-text">Circles</span>
				<input
					bind:group={particleShape}
					value="circle"
					type="radio"
					name="radio-10"
					class="radio radio-primary"
					onchange={init}
					checked
				/>
			</label>
		</div>
		<div class="form-control">
			<label class="cursor-pointer label">
				<span class="label-text">Squares</span>
				<input
					bind:group={particleShape}
					value="square"
					type="radio"
					name="radio-10"
					class="radio radio-primary"
					onchange={init}
					checked
				/>
			</label>
		</div>
	</div>
</div>

<svelte:window onresize={checkWidth} />

<style>
	.label {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.label > span {
		margin-bottom: 0.25rem;
		text-align: left;
		@apply text-base font-bold;
	}
	.handle {
		clip-path: polygon(0% 15%, 100% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 85%);
	}
	.isOpen {
		transition: 0.3s ease-in-out;
		transform: translateX(0);
	}
	.isClosed {
		transition: 0.3s ease-in-out;
		transform: translateX(16rem);
	}
</style>
