type Subscriber = (dicePool: DicePool) => void

export class DicePool {
	dice: Die[] = []
	id = ''
	subscribers: Subscriber[] = []

	constructor(public name: string) {
		this.id = crypto.randomUUID()
	}

	subscribe(runner: Subscriber): () => void {
		this.subscribers.push(runner)
		runner(this)
		return () => {
			this.subscribers = this.subscribers.filter((i) => i !== runner)
		}
	}

	notify(): void {
		for (const runner of this.subscribers) {
			runner(this)
		}
	}

	addDie(sides: number, name: string, color?: string): void {
		this.dice.push(new Die(sides, name, color))
		this.notify()
	}

	roll(die: Die): void {
		die.roll()
		this.notify()
	}

	rollAll(): void {
		for (const die of this.dice) {
			die.roll()
		}
		this.notify()
	}

	reset(die: Die): void {
		die.reset()
		this.notify()
	}

	resetAll(): void {
		for (const die of this.dice) {
			die.reset()
		}
		this.notify()
	}

	getDie(name: string): Die | undefined {
		return this.dice.find((die) => die.name === name)
	}
}

export class Die {
	private _color: string
	private _result: number

	constructor(
		public sides: number,
		public name: string,
		color = 'white'
	) {
		this._color = color
		this._result = 0
	}

	get color(): string {
		return this._color
	}

	get result(): number {
		return this._result
	}

	roll(): void {
		this._result = Math.floor(Math.random() * this.sides) + 1
	}

	reset(): void {
		this._result = 0
	}
}
