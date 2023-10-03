<script lang="ts">
	import { projects } from './projects'
</script>

<header class="my-4 lg:my-16">
	<h1 class="text-6xl">Bekiboo's Sandbox</h1>
	<p class="max-w-[60ch] mt-4">
		This website is home to my successful and unsuccesful experiments. It's a dedicated place for
		testing, failing, refining, and showcasing my latest attemps to unravel the mysteries of web
		development.
	</p>
</header>

<!-- Tiles -->
<div class="flex flex-wrap justify-center w-full gap-6">
	{#each projects as project}
		<div class="flex-grow w-64 shadow-xl card bg-base-100 image-full">
			{#if project.image}
				<figure>
					<img src={project.image} alt={project.title} />
				</figure>
			{:else}
				<figure>
					<div
						class="w-full h-full"
						style="background-color: hsl({Math.random() * 360}, 100%, 50%);"
					/>
				</figure>
			{/if}
			<div class="card-body">
				<h2 class="card-title">{project.title}</h2>
				<p>{project.description}</p>
				<div class="justify-end card-actions">
					<a class="btn btn-primary" target="_blank" href={project.path}>View</a>
				</div>
			</div>
		</div>
	{/each}
</div>

<!-- <div class="shadow-xl card w-96 bg-base-100 image-full">
			<figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
			<div class="card-body">
				<h2 class="card-title">Shoes!</h2>
				<p>If a dog chews shoes, whose shoes does he chooses?</p>
				<div class="justify-end card-actions">
					<button class="btn btn-primary">Buy Now</button>
				</div>
			</div>
		</div> -->
