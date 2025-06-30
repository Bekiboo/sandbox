<script lang="ts">
	import { onMount } from 'svelte'
	import { elements } from './InitialElements.svelte'

	let grid = {
		columns: 18,
		rows: 32,
		gridUnitSize: 25
	}

	let gridRef: HTMLDivElement = $state()

	let cells = $state([])

	onMount(() => {
		for (let i = 0; i < grid.columns; i++) {
			for (let j = 0; j < grid.rows; j++) {
				cells.push({
					colStart: i + 1,
					colEnd: i + 2,
					rowStart: j + 1,
					rowEnd: j + 2,
					isHovered: false
				})
			}
		}
	})


	// to store the previous and current column and row start positions
	let colStart = [0, 0]
	let rowStart = [0, 0]

	function dragCell(e: MouseEvent, i: number) {
		const el = elements[i]
		const elHeight = el.rowEnd - el.rowStart
		const elWidth = el.colEnd - el.colStart

		const rect = gridRef.getBoundingClientRect()

		colStart.push(Math.floor((e.clientX - rect.left) / grid.gridUnitSize + 0.5))
		rowStart.push(Math.floor((e.clientY - rect.top) / grid.gridUnitSize + 0.5))

		colStart.shift()
		rowStart.shift()

		// highlight the hovered cell
		cells.forEach((cell) => {
			if (
				cell.colStart > colStart[0] - 1 &&
				cell.colEnd <= colStart[0] + elWidth &&
				cell.rowStart > rowStart[0] - 1 &&
				cell.rowEnd <= rowStart[0] + elHeight
			) {
				cell.isHovered = true
			} else {
				cell.isHovered = false
			}
		})
	}

	function dropCell(e, i) {
		const el = elements[i]
		const elHeight = el.rowEnd - el.rowStart
		const elWidth = el.colEnd - el.colStart
		const newPos = {
			colStart: colStart[0] > grid.columns - elWidth + 1 ? grid.columns - elWidth + 1 : colStart[0],
			colEnd: colStart[0] + elWidth > grid.columns + 1 ? grid.columns + 1 : colStart[0] + elWidth,
			rowStart: rowStart[0] > grid.rows - elHeight + 1 ? grid.rows - elHeight + 1 : rowStart[0],
			rowEnd: rowStart[0] + elHeight > grid.rows + 1 ? grid.rows + 1 : rowStart[0] + elHeight,
			name: el.name
		}
		elements[i] = newPos

		cells.forEach((cell) => {
			cell.isHovered = false
		})
	}

	function throttle(func, limit) {
		let lastFunc: any
		let lastRan: any

		return function (...args) {
			if (!lastRan) {
				func.apply(this, args)
				lastRan = Date.now()
			} else {
				clearTimeout(lastFunc)
				lastFunc = setTimeout(() => {
					if (Date.now() - lastRan >= limit) {
						func.apply(this, args)
						lastRan = Date.now()
					}
				}, limit - (Date.now() - lastRan))
			}
		}
	}

	const throttledDragCell = throttle((e, i) => dragCell(e, i), 20)

</script>

<div
	class="grid gap-1 p-1 m-4 border w-min"
	style="grid-template-columns: repeat({grid.columns}, {grid.gridUnitSize}px);
    grid-auto-rows: {grid.gridUnitSize}px);
    "
	bind:this={gridRef}
>
	{#each cells as cell, i}
	{@const gridArea = `${cell.rowStart} / ${cell.colStart} / ${cell.rowEnd} / ${cell.colEnd}`}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="rounded-lg cursor-pointer h-[25px]"
			class:bg-stone-500={cell.isHovered}
			style="grid-area: {gridArea}"
		>
			<!-- {cell.rowStart}/{cell.colStart} -->
		</div>
	{/each}
	{#each elements as cell, i}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			draggable="true"
			class="cursor-pointer"
			style="grid-area: {cell.rowStart} / {cell.colStart} / {cell.rowEnd} / {cell.colEnd};"
			ondrag={(e) => throttledDragCell(e, i)}
			ondragend={(e) => dropCell(e, i)}
		>
			<div class="w-full h-full p-1 rounded-lg bg-stone-700">{cell.name}</div>
		</div>
	{/each}
</div>
