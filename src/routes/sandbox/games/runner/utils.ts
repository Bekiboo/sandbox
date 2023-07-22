export function loadImage(src: string) {
	const image = new Image();
	image.src = src;
	return image;
}
