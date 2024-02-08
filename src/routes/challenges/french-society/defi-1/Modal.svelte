<script lang="ts">
	import { goto } from '$app/navigation'

	export let text: string
</script>

{#if text}
	<dialog open>
		<p>{text}</p>
		<form method="dialog">
			<button on:click={() => goto('/')}>Back to Home</button>
		</form>
	</dialog>
{/if}

<style>
	dialog {
		position: fixed;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #333;
		padding: 2rem;
		border-radius: 1rem;
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.75);
		z-index: 1000;
		font-size: 1.2rem;
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
</style>
