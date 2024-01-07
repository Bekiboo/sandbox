import type { DicePool } from './Die'

export function getDicePools(): DicePool[] {
	let dicePools: DicePool[] = []

	try {
		const storedData = localStorage.getItem('dicePools')
		dicePools = JSON.parse(storedData || '[]')
	} catch (error) {
		console.error('Error parsing dice pools:', error)
		// Handle the error as needed, e.g., provide a default value or notify the user.
	}

	return dicePools
}

export function createDicePool(newDicePool: DicePool): void {
	const dicePools = getDicePools()
	dicePools.push(newDicePool)
	saveDicePools(dicePools)
}

export function updateDicePool(updatedDicePool: DicePool): void {
	const dicePools = getDicePools()
	const index = dicePools.findIndex((dp) => dp.id === updatedDicePool.id)

	if (index !== -1) {
		dicePools[index] = updatedDicePool
		saveDicePools(dicePools)
	} else {
		console.error('Dice pool not found for update:', updatedDicePool)
		// Handle the error as needed, e.g., notify the user.
	}
}

export function deleteDicePool(dicePoolId: string): void {
	const dicePools = getDicePools()
	const updatedDicePools = dicePools.filter((dp) => dp.id !== dicePoolId)
	saveDicePools(updatedDicePools)
}

function saveDicePools(dicePools: DicePool[]): void {
	localStorage.setItem('dicePools', JSON.stringify(dicePools))
}
