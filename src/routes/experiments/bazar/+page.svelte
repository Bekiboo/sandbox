<script lang="ts">
	let showDatePicker = false
	let dateInput: Date

	function toggleDatePicker() {
		showDatePicker = !showDatePicker
	}

	function selectDate(date: Date) {
		dateInput = date // Mettez à jour le champ de texte avec la date sélectionnée
		showDatePicker = false // Masquez le calendrier pop-up
	}
</script>

<input type="text" bind:value={dateInput} placeholder="dd/mm/yy" />
<button on:click={toggleDatePicker}>Sélectionner une date</button>

{#if showDatePicker}
	<!-- Affichez ici votre calendrier pop-up personnalisé -->
{/if}
