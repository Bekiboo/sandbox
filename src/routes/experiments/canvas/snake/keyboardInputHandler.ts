export function handleKeysDown(e: KeyboardEvent) {
	if (e.code === 'KeyD' || e.key === 'ArrowRight') {
		return 'right';
	}
	if (e.code === 'KeyA' || e.key === 'ArrowLeft') {
		return 'left';
	}
	if (e.code === 'KeyW' || e.key === 'ArrowUp') {
		return 'up';
	}
	if (e.code === 'KeyS' || e.key === 'ArrowDown') {
		return 'down';
	}
}
