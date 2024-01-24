import Tooltip from './Tooltip.svelte'

export function tooltip(element: HTMLElement) {
	let message: string
	let tooltipComponent: Tooltip | null = null

	function mouseOver(event: MouseEvent) {
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

	function mouseMove(event: MouseEvent) {
		// Update the position only if the tooltip exists
		if (tooltipComponent) {
			tooltipComponent.$set({
				x: event.pageX,
				y: event.pageY
			})
		}
	}

	function mouseLeave() {
		// Destroy the tooltip only if it exists
		if (tooltipComponent) {
			tooltipComponent.$destroy()
			tooltipComponent = null
		}
	}

	element.addEventListener('mouseover', mouseOver)
	element.addEventListener('mouseleave', mouseLeave)
	element.addEventListener('mousemove', mouseMove)

	return {
		destroy() {
			element.removeEventListener('mouseover', mouseOver)
			element.removeEventListener('mouseleave', mouseLeave)
			element.removeEventListener('mousemove', mouseMove)

			// Ensure the tooltip is destroyed when the component is destroyed
			if (tooltipComponent) {
				tooltipComponent.$destroy()
				tooltipComponent = null
			}
		}
	}
}
