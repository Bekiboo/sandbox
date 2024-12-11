<script lang="ts">
	import IconSkill from './Icon-Skill.svelte'

	interface Props {
		value?: number;
		skill?: string;
		total: any;
	}

	let { value = $bindable(0), skill = '__________', total }: Props = $props();
</script>

<div class="flex items-center gap-4">
	<div class="flex">
		<button onclick={() => (value != 2 ? (value = 2) : (value = 0))}>
			<IconSkill stroke="white" size="2rem" fill={value >= 2 ? '#ccc' : 'transparent'}></IconSkill>
		</button>
		<button onclick={() => (value != 4 ? (value = 4) : (value = 2))}>
			<IconSkill stroke="white" size="2rem" fill={value >= 4 ? '#ccc' : 'transparent'}></IconSkill>
		</button>
		<button onclick={() => (value != 6 ? (value = 6) : (value = 4))}>
			<IconSkill stroke="white" size="2rem" fill={value >= 6 ? '#ccc' : 'transparent'}></IconSkill>
		</button>
		<button onclick={() => (value != 8 ? (value = 8) : (value = 6))}>
			<IconSkill stroke="white" size="2rem" fill={value >= 8 ? '#ccc' : 'transparent'}></IconSkill>
		</button>
		<button onclick={() => (value != 10 ? (value = 10) : (value = 8))}>
			<IconSkill stroke="white" size="2rem" fill={value >= 10 ? '#ccc' : 'transparent'}></IconSkill>
		</button>
	</div>

	<div class="w-8 text-center border">
		{total}
	</div>

	<div class="uppercase">
		{skill}
	</div>
</div>
