<script lang="ts">
</script>

<main>
	<h1>LE TITRE PRINCIPAL</h1>
</main>
<footer>
	<div class="footer-left objec">
		<ul>
			<li>Element</li>
			<li>Element</li>
			<li>Element</li>
			<li>Element</li>
			<li>Element</li>
		</ul>
	</div>
	<div class="footer-right">
		<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, similique.</p>
	</div>
</footer>

<!-- CSS TRICKS 
	WRAPPER
-->

<style>
	* {
		outline: red dashed 1px;
	}

	main {
		position: relative;
		background-color: hsl(220, 89%, 33%);
		min-height: 50vh;
	}

	h1 {
		position: absolute;
		bottom: 2rem;
		left: 20%;
	}

	footer {
		background-color: hsl(220, 89%, 25%);
		min-height: 50vh;
		display: flex;
	}

	.footer-left {
		flex-basis: 30%;
		display: flex;
		align-items: end;
	}

	.footer-right {
		flex-basis: 70%;
		margin-left: auto;
	}

	.footer-right > p {
		width: 8rem;
		margin-left: auto;
	}
</style>
