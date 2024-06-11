<script lang="ts">
	import { writable } from 'svelte/store'
	import { browser } from '$app/environment'
	import Skill from './skill.svelte'
	import D20 from './Icon-D20.svelte'
	import SkillIcon from './Icon-Skill.svelte'
	import IconDc20 from './Icon-DC20.svelte'

	// Define the character sheet store
	export const blankCS = {
		name: '',
		characterName: '',
		class: '',
		ancestry: '',
		level: 1,
		combatMastery: '',
		might: 0,
		agility: 0,
		charisma: 0,
		intelligence: 0,
		prime: 0,
		awareness: 0,
		athletics: 0,
		intimidation: 0,
		investigation: 0
	}

	// Ensure the initial value is either an object or the default test object
	const initialCS = (browser && JSON.parse(localStorage.getItem('CharacterSheet'))) || blankCS

	export const CS = writable(initialCS)

	CS.subscribe((val) => {
		if (browser) localStorage.setItem('CharacterSheet', JSON.stringify(val))
	})

	$: $CS.prime = Math.max($CS.might, $CS.agility, $CS.charisma, $CS.intelligence)
	$: $CS.combatMastery = Math.round($CS.level / 2)
</script>

<IconDc20 size="12rem" />

<div>Player name: <input type="text" bind:value={$CS.name} /></div>
<div>Character name: <input type="text" bind:value={$CS.characterName} /></div>
<div>Class & Subclass: <input type="text" bind:value={$CS.class} /></div>
<div>Ancestry & Background: <input type="text" bind:value={$CS.ancestry} /></div>
<div>Level: <input type="number" bind:value={$CS.level} /></div>
<div>Combat Mastery: {$CS.combatMastery}</div>
-----------------------
<section>
	<h2>Attributes & Skills</h2>

	<div>Prime: {$CS.prime}</div>

	<div>MIG: <input type="number" class="input input-bordered" bind:value={$CS.might} /></div>

	<div>AGI: <input type="number" class="input input-bordered" bind:value={$CS.agility} /></div>

	<div>CHA: <input type="number" class="input input-bordered" bind:value={$CS.charisma} /></div>

	<div>INT: <input type="number" class="input input-bordered" bind:value={$CS.intelligence} /></div>
</section>

<div>Combat Mastery (CM): {$CS.combatMastery}</div>

<section>
	<h2>Skills</h2>
	<Skill bind:value={$CS.awareness} total={$CS.awareness + $CS.prime} skill="Awareness" />
	<Skill bind:value={$CS.athletics} total={$CS.athletics + $CS.might} skill="Athletics" />
	<Skill bind:value={$CS.intimidation} total={$CS.intimidation + $CS.might} skill="Intimidation" />
	<Skill
		bind:value={$CS.investigation}
		total={$CS.investigation + $CS.intelligence}
		skill="Investigation"
	/>
</section>
