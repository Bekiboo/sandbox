/* eslint-disable @typescript-eslint/no-explicit-any */
import { writable } from 'svelte/store';

export function useMachine(machine: any, initial: any) {
	const gameState = writable(initial);

	function send(event: any) {
		gameState.update((gameState) => machine(gameState, event));
	}

	return { gameState, send };
}
