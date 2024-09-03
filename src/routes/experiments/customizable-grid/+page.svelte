<script lang="ts">
	let elements = [
		{
			colStart: 1,
			colEnd: 4,
			rowStart: 1,
			rowEnd: 12,
			name: 'Skills'
		},
		{
			colStart: 4,
			colEnd: 6,
			rowStart: 1,
			rowEnd: 3,
			name: 'Stamina'
		},
		{
			colStart: 6,
			colEnd: 8,
			rowStart: 1,
			rowEnd: 3,
			name: 'Mana'
		},
		{
			colStart: 8,
			colEnd: 10,
			rowStart: 1,
			rowEnd: 3,
			name: 'HP'
		},

		{
			colStart: 4,
			colEnd: 6,
			rowStart: 3,
			rowEnd: 5,
			name: 'Strength'
		},
		{
			colStart: 6,
			colEnd: 8,
			rowStart: 3,
			rowEnd: 5,
			name: 'Dexterity'
		},
		{
			colStart: 8,
			colEnd: 10,
			rowStart: 3,
			rowEnd: 5,
			name: 'Intelligence'
		},

		{
			colStart: 4,
			colEnd: 6,
			rowStart: 5,
			rowEnd: 7,
			name: 'Agility'
		},
		{
			colStart: 6,
			colEnd: 8,
			rowStart: 5,
			rowEnd: 7,
			name: 'Constitution'
		},
		{
			colStart: 8,
			colEnd: 10,
			rowStart: 5,
			rowEnd: 7,
			name: 'Charisma'
		},

		{
			colStart: 4,
			colEnd: 6,
			rowStart: 7,
			rowEnd: 9,
			name: 'Fire Resistance'
		},
		{
			colStart: 6,
			colEnd: 8,
			rowStart: 7,
			rowEnd: 9,
			name: 'Cold Resistance'
		},
		{
			colStart: 8,
			colEnd: 10,
			rowStart: 7,
			rowEnd: 9,
			name: 'Lightning Resistance'
		}
	]

	let grid = {
		columns: 9,
		rows: 16,
		gridUnitSize: 50
	}

	let gridRef

	let cells = []

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

	let colStart = [0, 0]
	let rowStart = [0, 0]

	function dragCell(e, i) {
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

		cells = [...cells]
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
		elements = elements

		cells.forEach((cell) => {
			cell.isHovered = false
		})
		cells = [...cells]
	}
</script>

<div
	class="grid gap-1 p-1 m-4 border w-min hover:bg-red-500"
	style="grid-template-columns: repeat({grid.columns}, {grid.gridUnitSize}px);
    grid-auto-rows: {grid.gridUnitSize}px);
    "
	bind:this={gridRef}
>
	{#each cells as cell, i}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="cursor-pointer truc"
			class:grid-cell-hover={cell.isHovered}
			style="grid-area: {cell.rowStart} / {cell.colStart} / {cell.rowEnd} / {cell.colEnd}; height: 50px"
		>
			<!-- {cell.rowStart}/{cell.colStart} -->
		</div>
	{/each}
	{#each elements as cell, i}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			draggable="true"
			class="cursor-pointer hover:bg-red-300"
			style="grid-area: {cell.rowStart} / {cell.colStart} / {cell.rowEnd} / {cell.colEnd};"
			on:drag={(e) => dragCell(e, i)}
			on:dragend={(e) => dropCell(e, i)}
		>
			<div class="w-full h-full bg-red-500 rounded-lg">{cell.name}</div>
		</div>
	{/each}
</div>

<style>
	.grid {
		display: grid;
	}

	.grid-cell-hover {
		background-color: rgba(255, 0, 0, 0.5);
	}
</style>
