<script lang="ts">
	export let controlPanel: HTMLDivElement

	export let text = 'Text'
	export let connectParticles = false
	export let connectDistance = 32
	export let connectingLineWidth = 2
	export let particleSize = 10
	export let fontWeight = 'normal'
	export let fontFamily = 'sans-serif'
	export let particleShape = 'square'
	export let init: () => void
</script>

<div class="absolute w-60 p-2 right-0 flex flex-col gap-8 bg-neutral" bind:this={controlPanel}>
	<div class="form-control">
		<label class="label cursor-pointer">
			<span class="label-text">Text Input</span>
			<input
				class="input input-bordered input-primary"
				bind:value={text}
				on:input={init}
				type="text"
			/>
		</label>
		<label class="label cursor-pointer">
			<span class="label-text">Font Style</span>
			<select
				class="select select-primary w-full max-w-xs"
				bind:value={fontWeight}
				on:change={init}
			>
				<option selected>normal</option>
				<option>bold</option>
				<option>italic</option>
			</select>
		</label>
		<label class="label cursor-pointer">
			<span class="label-text">Font Family</span>
			<select
				class="select select-primary w-full max-w-xs"
				bind:value={fontFamily}
				on:change={init}
			>
				<option selected>sans-serif</option>
				<option>serif</option>
			</select>
		</label>
	</div>
	<div class="form-control">
		<label class="label cursor-pointer">
			<span class="label-text">Connect Particles</span>
			<input
				type="checkbox"
				class="checkbox checkbox-primary ml-2"
				bind:checked={connectParticles}
			/>
		</label>
		<label class="label cursor-pointer">
			<span class="label-text">Connect Distance</span>
			<input
				type="range"
				min="0"
				max="100"
				class="range range-primary"
				bind:value={connectDistance}
			/>
		</label>
		<label class="label cursor-pointer">
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
		<label class="label cursor-pointer">
			<span class="label-text">Particle Size</span>
			<input
				type="range"
				min=".5"
				max="12"
				class="range range-primary"
				bind:value={particleSize}
				on:change={init}
			/>
		</label>

		<div class="form-control">
			<label class="label cursor-pointer">
				<span class="label-text">Circles</span>
				<input
					bind:group={particleShape}
					value="circle"
					type="radio"
					name="radio-10"
					class="radio radio-primary"
					checked
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
</style>
