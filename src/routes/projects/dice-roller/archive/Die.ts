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

	roll() {
		this._result = Math.floor(Math.random() * this.sides) + 1
	}

	reset() {
		this._result = 0
	}
}

export class DicePool {
	dice: Die[] = []
	constructor(public name: string) {}

	addDie(die: Die) {
		this.dice.push(die)
	}

	roll(die: Die) {
		die.roll()
	}

	rollAll() {
		this.dice.forEach((die) => die.roll())
	}

	reset(die: Die) {
		die.reset()
	}

	resetAll() {
		this.dice.forEach((die) => die.reset())
	}
}
