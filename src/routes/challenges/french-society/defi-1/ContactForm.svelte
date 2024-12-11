<script lang="ts">
	import RadialGradientBorder from './RadialGradientBorder.svelte';
	import { ChevronDown, Send } from 'lucide-svelte';
</script>

<RadialGradientBorder>
	<form method="POST">
		<h5>Contact Us</h5>
		<div class="form-field">
			<label for="businessEmail">Business email </label>
			<input type="text" name="businessEmail" id="businessEmail" />
		</div>

		<div class="form-field">
			<label class="flex" for="subject">Subject<ChevronDown /></label>
			<select name="subject" id="subject">
				<option value="" disabled selected>Select a Subject </option>
				<option value="product-inquiry">Product Inquiry</option>
				<option value="technical-support">Technical Support Request</option>
				<option value="media-inquiry">Media Inquiry</option>
				<option value="job-application">Job Application</option>
				<option value="general-feedback">General Feedback</option>
			</select>
		</div>

		<div class="form-field">
			<label for="message">How can we help you?</label>
			<textarea name="message" id="message" cols="30" rows="4"></textarea>
		</div>

		<button type="button">
			Submit
			<Send />
		</button>
	</form>
</RadialGradientBorder>

<style>
	h5 {
		font-size: 2rem;
		font-weight: 700;
		color: #fff;
		text-transform: uppercase;
	}

	form {
		display: flex;
		padding: 2rem;
		flex-direction: column;
		width: 40rem;
		border-radius: 2rem;
		font-family: Poppins;
		gap: 2rem;
	}

	.unfocus {
		pointer-events: none;
		opacity: 0.5;
	}

	.form-field {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	input,
	textarea {
		background-color: #313131;
		border: none;
		border-radius: 1rem;
		color: #fff;
		font-size: 1.2rem;
		padding: 1rem;
		outline: none;
		transition: border-color 0.2s ease-in-out;
	}

	select {
		background-color: #313131;
		border: none;
		border-radius: 1rem;
		padding: 1rem;
		transition: border-color 0.2s ease-in-out;
		cursor: pointer;
		appearance: none;
	}

	select option:disabled {
		display: none;
	}

	textarea {
		resize: none;
	}

	button {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 2rem;
		border-radius: 1rem;
		border: none;
		font-weight: 700;
		cursor: pointer;
		width: 10rem;
		height: 4rem;
		background-color: #212121;
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.75);
		border: 1px solid transparent;
	}

	button:hover {
		transition: all 0.1s ease-in-out;
		/* use border - outline makes the animation flicker */
		border: 1px solid rgba(0, 255, 255, 0.66);
	}

	button:active {
		transition: all 0.1s ease-in-out;
		box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.75);
	}
</style>
