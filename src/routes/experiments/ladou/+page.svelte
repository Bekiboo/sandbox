<script lang="ts">
	import people from './people.json'

	type People = {
		name: string
		age: number
		city: string
		favoriteFoods: string[]
	}

	let peopleList: People[] = people
	let editedCard = null

	function deleteCard(i) {
		peopleList.splice(i, 1)
		peopleList = peopleList
	}
</script>

<h1 class="text-center">People</h1>

<section class="flex flex-wrap justify-center text-black">
	{#each peopleList as person, i}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="flex justify-between p-3 m-3 border rounded-md bg-slate-300 group w-96"
			on:click|stopPropagation
		>
			<div>
				<h2 class="text-lg font-bold">{person.name}</h2>
				<p>{person.age} years old - {person.city}</p>
				<p>Favorite foods: {person.favoriteFoods.join(', ')}</p>
			</div>
			<div class="flex flex-col w-12">
				<button
					class="{editedCard == i ? 'block' : 'hidden'} group-hover:block"
					on:click={() => (editedCard = i)}>Edit</button
				>
				<button class={editedCard == i ? 'block' : 'hidden'} on:click={() => deleteCard(i)}
					>Delete</button
				>
			</div>
		</div>
	{/each}
</section>

<svelte:window on:click={() => (editedCard = null)} />
