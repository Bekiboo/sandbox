import Tooltip from './Tooltip.svelte'

export function tooltip(element: HTMLElement) {
	let message: string
	let tooltipComponent: Tooltip | null = null

	function click(event: MouseEvent) {
		if (element.dataset.tooltip) {
			message = element.dataset.tooltip
		}

		// Only create a new tooltip if it doesn't exist
		if (!tooltipComponent) {
			tooltipComponent = new Tooltip({
				props: {
					message: message,
					x: event.pageX,
					y: event.pageY
				},
				target: document.body
			})
		}
	}

	element.addEventListener('click', click)
	document.addEventListener('click', (event: MouseEvent) => {
		if (tooltipComponent && !element.contains(event.target as Node)) {
			tooltipComponent.$destroy()
			tooltipComponent = null
		}
	})

	return {
		destroy() {
			element.removeEventListener('click', click)
			document.removeEventListener('click', click)

			// Ensure the tooltip is destroyed when the component is destroyed
			if (tooltipComponent) {
				tooltipComponent.$destroy()
				tooltipComponent = null
			}
		}
	}
}
