export function loadImage(src: string) {
	const image = new Image();
	image.src = src;
	return image;
}

export function loadAudio(src: string) {
	const audio = new Audio(src);
	return audio;
}

export function preloadAudio(arrayOfSoundPaths: string[]) {
	arrayOfSoundPaths.forEach((soundPath) => {
		const audio = new Audio(soundPath);
		audio.preload = 'auto';
	});
}
