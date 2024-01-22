<script lang="ts">
	import RadialGradientBorder from './RadialGradientBorder.svelte'
</script>

<RadialGradientBorder intensity={1.25}>
	<form action="POST">
		<label for="name">Email d'entreprise</label>
		<input type="text" name="name" id="name" />

		<label for="name">Comment pouvons-nous vous aider?</label>
		<textarea name="message" id="message" cols="30" rows="4"></textarea>

		<button type="submit">Envoyer</button>
	</form>
</RadialGradientBorder>

<style>
	:root {
		--wrapper-border-width: 0.1rem;
		--wrapper-radius: 2rem;
	}

	form {
		position: relative;
		display: flex;
		padding: 2rem;
		flex-direction: column;
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
