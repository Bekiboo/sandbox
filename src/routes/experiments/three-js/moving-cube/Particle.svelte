<script lang="ts" module>
	const geometry = new BoxGeometry(0.2, 0.2, 0.2);
	const material = new MeshStandardMaterial();
	export const muted = writable(true);
</script>

<script lang="ts">
	import { T } from '@threlte/core';
	// import { PositionalAudio } from '@threlte/extras';
	import { Collider, RigidBody, type ContactEvent } from '@threlte/rapier';
	import { writable } from 'svelte/store';
	import type { Euler, Vector3 } from 'three';
	import { BoxGeometry, MeshStandardMaterial } from 'three';
	// import { clamp } from 'three/src/math/MathUtils.js';
	interface Props {
		position?: Vector3 | undefined;
		rotation?: Euler | undefined;
	}

	let { position = undefined, rotation = undefined }: Props = $props();
	// const audios: {
	// 	threshold: number;
	// 	volume: number;
	// 	stop: (() => any) | undefined;
	// 	play: ((...args: any[]) => any) | undefined;
	// 	source: string;
	// }[] = new Array(9).fill(0).map((_, i) => {
	// 	return {
	// 		threshold: i / 10,
	// 		play: undefined,
	// 		stop: undefined,
	// 		volume: (i + 2) / 10,
	// 		source: `/audio/ball_bounce_${i + 1}.mp3`
	// 	};
	// });
	//   const fireSound = (e: ContactEvent) => {
	//     if ($muted) return
	//     const volume = clamp((e.detail.totalForceMagnitude - 30) / 1100, 0.1, 1)
	//     const audio = audios.find((a) => a.volume >= volume)
	//     audio?.stop?.()
	//     audio?.play?.()
	//   }
	let rotationCasted = $derived(rotation?.toArray() as [x: number, y: number, z: number]);
</script>

<T.Group position={position?.toArray()} rotation={rotationCasted}>
	<!-- on:contact={fireSound} -->
	<RigidBody type={'dynamic'}>
		<!-- {#each audios as audio}
      <PositionalAudio
        autoplay={false}
        detune={600 - Math.random() * 1200}
        bind:stop={audio.stop}
        bind:play={audio.play}
        src={audio.source}
        volume={audio.volume}
      />
    {/each} -->
		<Collider
			contactForceEventThreshold={30}
			restitution={0.4}
			shape={'cuboid'}
			args={[0.1, 0.1, 0.1]}
		/>
		<T.Mesh castShadow receiveShadow {geometry} {material} />
	</RigidBody>
</T.Group>
