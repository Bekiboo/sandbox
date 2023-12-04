type Subscriber = (die: Die) => void

export class Die {
	color: string
	result: number
	subscribers: Subscriber[] = []

	constructor(
		public sides: number,
		public name: string
	) {
		this.color = 'white'
		this.result = 0
	}

	subscribe(runner: Subscriber): () => void {
		this.subscribers.push(runner)
		runner(this)
		return () => {
			this.subscribers = this.subscribers.filter((i) => i !== runner)
		}
	}

	notify(): void {
		this.subscribers.forEach((runner) => runner(this))
	}

	roll(): void {
		this.result = Math.floor(Math.random() * this.sides) + 1
		this.notify()
	}

	reset(): void {
		this.result = 0
		this.notify()
	}
}
