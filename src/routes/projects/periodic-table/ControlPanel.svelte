<script lang="ts">
	export let labels: 'groups' | 'ionizationEnergy' | 'atomicSize' | 'valenceElectrons' = 'groups'
</script>

<div class="flex gap-8">
	<div>
		<h4>Color Scheme</h4>
		<div class="form-control">
			<label class="cursor-pointer label">
				<input
					class="radio radio-primary"
					type="radio"
					name="color-scheme"
					value="metallicity"
					checked
				/>
				<span class="ml-2 label-text">Metallicity</span>
			</label>
		</div>
	</div>

	<div>
		<h4>Labels</h4>
		<div class="form-control">
			<label class="cursor-pointer label">
				<input
					bind:group={labels}
					class="radio radio-primary"
					type="radio"
					name="labels"
					value="groups"
				/>
				<span class="ml-2 label-text">Groups & Periods</span>
			</label>
			<label class="cursor-pointer label">
				<input
					bind:group={labels}
					class="radio radio-primary"
					type="radio"
					name="labels"
					value="ionizationEnergy"
				/>
				<span class="ml-2 label-text">Ionization energy</span>
			</label>
			<label class="cursor-pointer label">
				<input
					bind:group={labels}
					class="radio radio-primary"
					type="radio"
					name="labels"
					value="atomicSize"
				/>
				<span class="ml-2 label-text">Atomic Size</span>
			</label>
			<label class="cursor-pointer label">
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
