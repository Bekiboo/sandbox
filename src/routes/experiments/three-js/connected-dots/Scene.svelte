<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import { interactivity, OrbitControls } from '@threlte/extras';
	import {
		BufferGeometry,
		Float32BufferAttribute,
		MathUtils,
		Mesh,
		Points,
		PointsMaterial
	} from 'three';
	import { DEG2RAD } from 'three/src/math/MathUtils.js';

	interactivity();

	let cameraPosition: [x: number, y: number, z: number] = [2, 3, 5];
	let lightPosition: [x: number, y: number, z: number] = [5, 10, 5];

	const count = 1000;
	const distance = 2;

	const points = new Float32Array(count * 3);
	for (let i = 0; i < points.length; i++) {
		points[i] = MathUtils.randFloatSpread(distance * 2);
	}

	const geometry = $state(new BufferGeometry());
	geometry.setAttribute('position', new Float32BufferAttribute(points, 3));

	// const pointMaterial = new PointsMaterial({
	// 	color: 0xff0000,
	// 	size: 0.1
	// })

	let direction = 1;

	const { camera, scene } = useThrelte();

	useTask((delta) => {
		if (Math.random() < 0.01) {
			direction *= -1;
		}

		const positions = geometry.attributes.position.array as Float32Array;
		for (let i = 0; i < positions.length; i += 3) {
			const x = positions[i];
			const y = positions[i + 1];
			const z = positions[i + 2];

			positions[i] = x + Math.sin(x) * 0.05 * direction;
			positions[i + 1] = y + Math.sin(y) * 0.01 * direction;
			positions[i + 2] = z + Math.sin(z) * 0.01 * direction;
		}

		geometry.attributes.position.needsUpdate = true;
	});
</script>

<T.PerspectiveCamera position={cameraPosition} makeDefault fov={75} near={0.1} far={1000000}>
	<OrbitControls maxPolarAngle={85 * DEG2RAD} minPolarAngle={20 * DEG2RAD} />
</T.PerspectiveCamera>

<T.DirectionalLight position={lightPosition} />

<T.AmbientLight intensity={0.5} />

<T.Points position.y={0} position.x={0}>
	<T is={geometry} />

	<T.PointsMaterial color="red" size={0.05} />
</T.Points>
