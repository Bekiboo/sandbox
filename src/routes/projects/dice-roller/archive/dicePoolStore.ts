import { writable } from 'svelte/store'
import { DicePool, Die } from './Die'

export function createDicePool(name: string) {
	const dicePool = new DicePool(name)
	const { subscribe, set } = writable(dicePool)

	return {
		subscribe,
		addDie: (sides: number, name: string) => {
			dicePool.addDie(sides, name)
			set(dicePool)
		},
		roll: (die: Die) => {
			dicePool.roll(die)
			set(dicePool)
		},
		rollAll: () => {
			dicePool.rollAll()
			set(dicePool)
		},
		reset: (die: Die) => {
			dicePool.reset(die)
			set(dicePool)
		},
		resetAll: () => {
			dicePool.resetAll()
			set(dicePool)
		}
	}
}
