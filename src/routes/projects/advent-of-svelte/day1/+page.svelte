<script lang="ts">
	import { onMount } from 'svelte'

	const jsonFilePath = 'https://advent.sveltesociety.dev/data/2023/day-one.json'

	type Child = {
		name: string
		tally: number
	}

	let name: string = ''
	let tally: number = 0

	let childrenList: Child[] = []

	onMount(async () => {
		try {
			const response = await fetch(jsonFilePath)

			if (!response.ok) {
				throw new Error(`Failed to fetch ${jsonFilePath}`)
			}

			childrenList = await response.json()
		} catch (error) {
			console.error(error)
		}
	})

	function addChild() {
		childrenList = [{ name, tally }, ...childrenList]
		name = ''
		tally = 0
	}
</script>

<div class="flex w-96 mx-auto my-8 gap-4">
	<div class="flex flex-col gap-2 mb-2">
		<input class="input" type="text" placeholder="Child's name" bind:value={name} />
		<input class="input" type="number" placeholder="Tally" bind:value={tally} />
	</div>
	<button class="btn btn-primary h-full btn-group-vertical" on:click={addChild}>Add</button>
</div>

<div class="flex mx-auto w-96 gap-4">
	<div class="w-full">
		<header class="text-xl font-bold mb-1">Nice</header>
		{#if childrenList.length > 0}
			<ul class="px-2 h-96 overflow-auto">
				{#each childrenList as child}
					{#if child.tally > 0}
						<div>{child.name}</div>
					{/if}
				{/each}
			</ul>
		{:else}
			<p>Loading...</p>
		{/if}
	</div>
	<div class="w-full">
		<header class="text-xl font-bold mb-1">Naughty</header>
		{#if childrenList.length > 0}
			<ul class="px-2 h-96 overflow-auto">
				{#each childrenList as child}
					{#if child.tally < 0}
						<div>{child.name}</div>
					{/if}
				{/each}
			</ul>
		{:else}
			<p>Loading...</p>
		{/if}
	</div>
</div>
