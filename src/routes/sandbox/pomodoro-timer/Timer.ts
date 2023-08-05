export class Timer {
	#interval: ReturnType<typeof setInterval> | number;
	#time: number;
	#duration: number;
	#callback: () => void;

	constructor(duration: number, callback: () => void) {
		this.#duration = duration;
		this.#callback = callback;
		this.#time = 0;
		this.#interval = 0;
	}

	start() {
		this.#interval = setInterval(() => {
			this.#time++;
			if (this.#time === this.#duration) {
				this.#callback();
				this.stop();
			}
		}, 1000);
	}

	stop() {
		clearInterval(this.#interval);
	}

	reset() {
		this.#time = 0;
	}
}
