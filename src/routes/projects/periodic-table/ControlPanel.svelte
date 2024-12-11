<script lang="ts">
	import { colorSchemes } from './elements';

	interface Props {
		labels?: 'groups' | 'ionizationEnergy' | 'atomicSize' | 'valenceElectrons';
		colorScheme?: 'chemicalFamily' | 'standardState' | 'metallicity' | 'subshellBlock';
	}

	let { labels = $bindable('groups'), colorScheme = $bindable('subshellBlock') }: Props = $props();
</script>

<div class="flex gap-8">
	<div>
		<h4>Color Scheme</h4>
		<div class="form-control">
			{#each Object.keys(colorSchemes) as scheme}
				<label class="justify-start cursor-pointer label">
					<input
						bind:group={colorScheme}
						class="radio radio-primary"
						type="radio"
						name="color-scheme"
						value={scheme}
					/>
					<span class="ml-2 label-text">{colorSchemes[scheme].name}</span>
				</label>
			{/each}
		</div>
	</div>

	<div>
		<h4>Labels</h4>
		<div class="form-control">
			<label class="justify-start cursor-pointer label">
				<input
					bind:group={labels}
					class="radio radio-primary"
					type="radio"
					name="labels"
					value="groups"
				/>
				<span class="ml-2 label-text">Groups & Periods</span>
			</label>
			<label class="justify-start cursor-pointer label">
				<input
					bind:group={labels}
					class="radio radio-primary"
					type="radio"
					name="labels"
					value="ionizationEnergy"
				/>
				<span class="ml-2 label-text">Ionization energy</span>
			</label>
			<label class="justify-start cursor-pointer label">
				<input
					bind:group={labels}
					class="radio radio-primary"
					type="radio"
					name="labels"
					value="atomicSize"
				/>
				<span class="ml-2 label-text">Atomic Size</span>
			</label>
			<label class="justify-start cursor-pointer label">
				<input
					bind:group={labels}
					class="radio radio-primary"
					type="radio"
					name="labels"
					value="valenceElectrons"
				/>
				<span class="ml-2 label-text">Valence Electrons (1A-8A)</span>
			</label>
		</div>
	</div>
</div>
