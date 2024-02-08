export type Project = {
	title: string
	description: string
	path: string
	image: string | null
	dateStarted: string
	dateUpdated?: string
	tech: string[]
	status: 'in-progress' | 'done' | 'abandoned' | 'on-hold' | 'idea' | 'archived'
	type: 'project' | 'experiment' | 'prototype' | 'design'
}

export const projects: Project[] = [
	{
		title: 'Periodic Table',
		description: 'An interactive periodic table with SvelteKit and TailwindCSS.',
		path: '/projects/periodic-table',
		image: 'images/minis/periodic-table.png',
		dateStarted: '2024-01',
		tech: ['svelte', 'sveltekit', 'tailwindcss'],
		status: 'in-progress',
		type: 'project'
	},
	{
		title: 'French Society - Defi 2',
		description: 'A chrono with animation.',
		path: '/challenges/french-society/defi-2',
		image: 'images/minis/defi-2.png',
		dateStarted: '2024-02',
		tech: ['svelte', 'sveltekit', 'vanilla'],
		status: 'in-progress',
		type: 'project'
	},
	{
		title: 'French Society - Defi 1',
		description: 'A form with validation, feedback, and a sweet animation.',
		path: '/challenges/french-society/defi-1',
		image: 'images/minis/defi-1.png',
		dateStarted: '2024-01',
		tech: ['svelte', 'sveltekit', 'superforms', 'zod'],
		status: 'in-progress',
		type: 'project'
	},
	{
		title: 'Image to Caption',
		description: 'Compare different Hugging Face models for image captioning.',
		path: '/experiments/ai/image-to-caption',
		image: 'images/minis/image-to-caption.png',
		dateStarted: '2023-08',
		tech: [
			'Hugging Face',
			'typescript',
			'svelte',
			'sveltekit',
			'konva',
			'canvas',
			'webgl',
			'glsl',
			'shaders',
			'3d',
			'3d-models',
			'3d-objects',
			'3d-graphics',
			'3d-animation',
			'3d-visualisation'
		],
		status: 'done',
		type: 'experiment'
	},
	{
		title: '3D Chess',
		description: 'A simple 3D chess board. Not interactive yet.',
		path: '/experiments/three-js/chess',
		image: 'images/minis/chess.png',
		dateStarted: '2023-10',
		tech: [
			'three.js',
			'typescript',
			'svelte',
			'sveltekit',
			'konva',
			'canvas',
			'webgl',
			'glsl',
			'shaders',
			'3d',
			'3d-models',
			'3d-objects',
			'3d-graphics',
			'3d-animation',
			'3d-visualisation'
		],
		status: 'in-progress',
		type: 'experiment'
	},
	{
		title: 'Particles test',
		description: 'TODO',
		path: '/experiments/three-js/connected-dots',
		image: 'images/minis/connected-dots.png',
		dateStarted: '2023-10',
		tech: [
			'three.js',
			'typescript',
			'svelte',
			'sveltekit',
			'konva',
			'canvas',
			'webgl',
			'glsl',
			'shaders',
			'3d',
			'3d-models',
			'3d-objects',
			'3d-graphics',
			'3d-animation',
			'3d-visualisation'
		],
		status: 'on-hold',
		type: 'experiment'
	},
	{
		title: 'Matching Game',
		description: 'A simple matching game based on Joy of Code tutorial',
		path: '/projects/matching-game',
		image: 'images/minis/matching-game.png',
		dateStarted: '2023-10',
		tech: [
			'three.js',
			'typescript',
			'svelte',
			'sveltekit',
			'konva',
			'canvas',
			'webgl',
			'glsl',
			'shaders',
			'3d',
			'3d-models',
			'3d-objects',
			'3d-graphics',
			'3d-animation',
			'3d-visualisation'
		],
		status: 'in-progress',
		type: 'project'
	},
	{
		title: 'Scrapbook',
		description: 'An experiment with SvelteKit and Konva.js',
		path: '/experiments/canvas/scrapbook',
		image: null,
		dateStarted: '2023-10',
		tech: ['typescript', 'svelte', 'sveltekit', 'konva', 'canvas'],
		status: 'in-progress',
		type: 'experiment'
	},
	{
		title: 'Shoot the Bats',
		description: 'A simple point & shoot with vanilla TS and Canvas',
		path: '/experiments/canvas/point-and-shoot',
		image: 'images/minis/point-and-shoot.png',
		dateStarted: '2023-10',
		tech: ['typescript', 'svelte', 'sveltekit', 'konva', 'canvas'],
		status: 'on-hold',
		type: 'experiment'
	},
	{
		title: 'Particle Text',
		description: 'Write text and see it turn into particles',
		path: '/experiments/canvas/particle-text',
		image: 'images/minis/particle-text.png',
		dateStarted: '2023-10',
		tech: ['typescript', 'svelte', 'sveltekit', 'konva', 'canvas'],
		status: 'on-hold',
		type: 'experiment'
	}
]
