<script lang="ts">
	import { T } from '@threlte/core'
</script>

<!-- large ball -->
<T.Mesh position={[0, 2, 0]} castShadow>
	<T.SphereGeometry args={[5, 32, 32]} />
	<T.MeshStandardMaterial color={'#fff'} />
</T.Mesh>

<!-- medium ball -->
<T.Mesh position={[0, 7, 0]} castShadow>
	<T.SphereGeometry args={[3, 32, 32]} />
	<T.MeshStandardMaterial color={'#fff'} />
</T.Mesh>

<!-- small ball -->
<T.Mesh position={[0, 11, 0]} castShadow>
	<T.SphereGeometry args={[2, 32, 32]} />
	<T.MeshStandardMaterial color={'#fff'} />
</T.Mesh>

<!-- carrot -->
<T.Mesh position={[0, 11, 2]} rotation={[Math.PI / 2, 0, 0]} castShadow>
	<T.ConeGeometry args={[1, 5, 32]} />
	<T.MeshStandardMaterial color={'orange'} />
</T.Mesh>

<!-- left eye -->
<T.Mesh position={[-1, 12, 1.5]} castShadow>
	<T.SphereGeometry args={[0.5, 32, 32]} />
	<T.MeshStandardMaterial color={'grey'} />
</T.Mesh>

<!-- right eye -->
<T.Mesh position={[1, 12, 1.5]} castShadow>
	<T.SphereGeometry args={[0.5, 32, 32]} />
	<T.MeshStandardMaterial color={'grey'} />
</T.Mesh>

<!-- top button -->
<T.Mesh position={[0, 8, 2.5]} rotation={[Math.PI / 2.5, 0, 0]} castShadow>
	<T.CylinderGeometry args={[0.5, 0.5, 1, 32]} />
	<T.MeshStandardMaterial color={'grey'} />
</T.Mesh>

<!-- middle button -->
<T.Mesh position={[0, 6, 2.8]} rotation={[Math.PI / 2.5, 0, 0]} castShadow>
	<T.CylinderGeometry args={[0.5, 0.5, 1, 32]} />
	<T.MeshStandardMaterial color={'grey'} />
</T.Mesh>

<!-- bottom button -->
<T.Mesh position={[0, 4, 4.2]} rotation={[Math.PI / 2.5, 0, 0]} castShadow>
	<T.CylinderGeometry args={[0.5, 0.5, 1, 32]} />
	<T.MeshStandardMaterial color={'grey'} />
</T.Mesh>

<!-- right arm -->
<T.Mesh position={[3, 7, 0]} rotation={[0, 0, Math.PI / 1.5]} castShadow>
	<T.CylinderGeometry args={[0.3, 0.3, 5, 32]} />
	<T.MeshStandardMaterial color={'brown'} />
</T.Mesh>

<!-- left arm -->
<T.Mesh position={[-3, 7, 0]} rotation={[0, 0, Math.PI / 2.5]} castShadow>
	<T.CylinderGeometry args={[0.3, 0.3, 5, 32]} />
	<T.MeshStandardMaterial color={'brown'} />
</T.Mesh>

<!-- top hat -->
<T.Mesh position={[0, 14.5, 0]} rotation={[0, 0, 0]} castShadow>
	<T.CylinderGeometry args={[1.5, 1.5, 3, 32]} />
	<T.MeshStandardMaterial color={'gray'} />
</T.Mesh>
<T.Mesh position={[0, 13, 0]} rotation={[0, 0, 0]} castShadow>
	<T.CylinderGeometry args={[2, 2, 0.5, 32]} />
	<T.MeshStandardMaterial color={'gray'} />
</T.Mesh>
