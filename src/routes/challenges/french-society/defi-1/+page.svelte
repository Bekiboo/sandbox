<script lang="ts">
	import RadialGradientBorder from './RadialGradientBorder.svelte'
</script>

<main>
	<RadialGradientBorder intensity={1.25}>
		<form>
			<label for="name">Email d'entreprise</label>
			<input type="text" name="name" id="name" />

			<label for="name">Comment pouvons-nous vous aider?</label>
			<textarea name="message" id="message" cols="30" rows="4"></textarea>

			<RadialGradientBorder intensity={1.25} borderRadius={'1rem'}>
				<button type="button">Envoyer</button>
			</RadialGradientBorder>
		</form>
	</RadialGradientBorder>
</main>

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}
	form {
		display: flex;
		padding: 2rem;
		flex-direction: column;
		width: 40rem;
		border-radius: 2rem;
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.75);
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
		font-weight: 700;
		cursor: pointer;
		width: 10rem;
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.75);
	}

	button:hover {
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.95);
		transition: box-shadow 0.2s ease-in-out;
	}

	button:active {
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.75);
		transition: box-shadow 0.1s ease-in-out;
	}
</style>
