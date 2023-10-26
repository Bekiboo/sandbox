/* eslint-disable @typescript-eslint/no-explicit-any */
import { writable } from 'svelte/store'

export function useMachine(machine: any, initial: any) {
	const state = writable(initial)

	function send(event: any) {
		console.log('event', event)

		state.update((state) => machine(state, event))
	}

	return { state, send }
}
