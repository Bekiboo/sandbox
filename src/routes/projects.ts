export type Project = {
	title: string;
	description: string;
	path:
		| {
				type: 'internal';
				url: string;
		  }
		| {
				type: 'external';
				url: string;
		  };
	image: string | null;
	dateStarted: string;
	dateUpdated?: string;
	tech: string[];
	status: 'in-progress' | 'done' | 'abandoned' | 'on-hold' | 'idea' | 'archived';
	type: 'project' | 'experiment' | 'prototype' | 'design';
};

export const projects: Project[] = [
	{
		title: 'Cube Runner',
		description: 'A 3D runner game with a cube.',
		path: {
			type: 'external',
			url: 'https://cube-runner.vercel.app/'
		},
		image: 'images/minis/cube.png',
		dateStarted: '2024-09',
		tech: ['svelte', 'threlte', 'three.js'],
		status: 'done',
		type: 'project'
	},
	{
		title: 'Periodic Table',
		description: 'An interactive periodic table with SvelteKit and TailwindCSS.',
		path: {
			type: 'internal',
			url: '/projects/periodic-table'
		},
		image: 'images/minis/periodic-table.png',
		dateStarted: '2024-01',
		tech: ['svelte', 'sveltekit', 'tailwindcss'],
		status: 'in-progress',
		type: 'project'
	},
	{
		title: 'French Society - Defi 2',
		description: 'A chrono with animation.',
		path: {
			type: 'internal',
			url: '/challenges/french-society/defi-2'
		},
		image: 'images/minis/defi-2.png',
		dateStarted: '2024-02',
		tech: ['svelte', 'sveltekit', 'vanilla'],
		status: 'in-progress',
		type: 'project'
	},
	{
		title: 'French Society - Defi 1',
		description: 'A form with validation, feedback, and a sweet animation.',
		path: {
			type: 'internal',
			url: '/challenges/french-society/defi-1'
		},
		image: 'images/minis/defi-1.png',
		dateStarted: '2024-01',
		tech: ['svelte', 'sveltekit', 'superforms', 'zod'],
		status: 'in-progress',
		type: 'project'
	},
	{
		title: 'Dice Roller',
		description: 'A dice roller for role-playing games.',
		path: {
			type: 'internal',
			url: '/projects/mulligan'
		},
		image: 'images/minis/dice-roller.png',
		dateStarted: '2023-10',
		tech: ['svelte', 'sveltekit', 'typescript'],
		status: 'in-progress',
		type: 'project'
	},
	{
		title: '3D Chess',
		description: 'A simple 3D chess board. Not interactive yet.',
		path: {
			type: 'internal',
			url: '/experiments/three-js/chess'
		},
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
		path: {
			type: 'internal',
			url: '/experiments/three-js/connected-dots'
		},
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
		path: {
			type: 'internal',
			url: '/projects/matching-game'
		},
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
		title: 'Shoot the Bats',
		description: 'A simple point & shoot with vanilla TS and Canvas',
		path: {
			type: 'internal',
			url: '/experiments/canvas/point-and-shoot'
		},
		image: 'images/minis/point-and-shoot.png',
		dateStarted: '2023-10',
		tech: ['typescript', 'svelte', 'sveltekit', 'konva', 'canvas'],
		status: 'on-hold',
		type: 'experiment'
	},
	{
		title: 'Particle Text',
		description: 'Write text and see it turn into particles',
		path: {
			type: 'internal',
			url: '/experiments/canvas/particle-text'
		},
		image: 'images/minis/particle-text.png',
		dateStarted: '2023-10',
		tech: ['typescript', 'svelte', 'sveltekit', 'konva', 'canvas'],
		status: 'on-hold',
		type: 'experiment'
	}
];
