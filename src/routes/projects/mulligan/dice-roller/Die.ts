import { generateUUID } from '$lib/utils'

type Subscriber = (dicePool: DicePool) => void

export class DicePool {
	dice: Die[] = []
	id: string = ''
	subscribers: Subscriber[] = []

	constructor(public name: string) {
		this.id = generateUUID()
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

	addDie(sides: number, name: string, color?: string): void {
		this.dice.push(new Die(sides, name, color))
		this.notify()
	}

	roll(die: Die): void {
		die.roll()
		this.notify()
	}

	rollAll(): void {
		this.dice.forEach((die) => die.roll())
		this.notify()
	}

	reset(die: Die): void {
		die.reset()
		this.notify()
	}

	resetAll(): void {
		this.dice.forEach((die) => die.reset())
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
		color: string = 'white'
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
