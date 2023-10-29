export function handleKeysDown(e: KeyboardEvent, keysPressed: string[]) {
	if (e.code === 'KeyD' || e.key === 'ArrowRight') {
		keysPressed.push('right')
	}
	if (e.code === 'KeyA' || e.key === 'ArrowLeft') {
		keysPressed.push('left')
	}
	if (e.code === 'KeyW' || e.key === 'ArrowUp') {
		keysPressed.push('forward')
	}
	if (e.code === 'KeyS' || e.key === 'ArrowDown') {
		keysPressed.push('backward')
	}
	if (e.code === 'Space') {
		keysPressed.push('jump')
	}

	return keysPressed
}

export function handleKeysUp(e: KeyboardEvent, keysPressed: string[]) {
	if (e.code === 'KeyD' || e.key === 'ArrowRight') {
		keysPressed = keysPressed.filter((key) => key !== 'right')
	}
	if (e.code === 'KeyA' || e.key === 'ArrowLeft') {
		keysPressed = keysPressed.filter((key) => key !== 'left')
	}
	if (e.code === 'KeyW' || e.key === 'ArrowUp') {
		keysPressed = keysPressed.filter((key) => key !== 'forward')
	}
	if (e.code === 'KeyS' || e.key === 'ArrowDown') {
		keysPressed = keysPressed.filter((key) => key !== 'backward')
	}
	if (e.code === 'Space') {
		keysPressed = keysPressed.filter((key) => key !== 'jump')
	}

	return keysPressed
}
