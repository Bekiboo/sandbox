export function generateUUID(): string {
	// Source: https://stackoverflow.com/a/2117523/114157
	let dt = new Date().getTime();
	const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		const r = (dt + Math.random() * 16) % 16 | 0;
		dt = Math.floor(dt / 16);
		return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
	});
	return uuid;
}

export const throttle = (
	fn: (...args: unknown[]) => unknown,
	delay: number
): ((...args: unknown[]) => void) => {
	let last = 0;
	return (...args: unknown[]) => {
		const now = new Date().getTime();
		if (now - last < delay) {
			return;
		}
		last = now;
		return fn(...args);
	};
};
