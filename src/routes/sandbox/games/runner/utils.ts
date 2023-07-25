export function loadImage(src: string) {
	const image = new Image();
	image.src = src;
	return image;
}

// export function isCircleColliding(item1, item2) {
// 	const dx = item1.x - item2.x;
// 	const dy = item1.y - item2.y;
// 	const distance = Math.sqrt(dx * dx + dy * dy);
// 	return distance < item1.radius + item2.radius;
// }
