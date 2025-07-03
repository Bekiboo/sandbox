<script lang="ts">
    import { onMount, onDestroy } from 'svelte';

    const GRID_HEIGHT = 60;
    const GRID_WIDTH = 60;
    const CELL_SIZE = 8; // Size of each cell in pixels
    const INITIAL_LIVE_CHANCE = 0.7;

    let generation = $state(0);
    let isRunning = $state(true);
    let intervalId: number | undefined;
    let simulationSpeedMs = $state(200);

    let canvasElement: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;

    // Create random points in this grid, and store them in a 2D array
    let grid = $state(Array.from({ length: GRID_HEIGHT }, () =>
        Array.from({ length: GRID_WIDTH }, () => Math.random() > INITIAL_LIVE_CHANCE)
    ));

    // Game of Life rules constants
    const BIRTH_THRESHOLD = 3;
    const SURVIVAL_MIN_THRESHOLD = 2;
    const SURVIVAL_MAX_THRESHOLD = 3;

    // Create a new grid based on the old grid
    function nextGeneration(currentGrid: boolean[][]): boolean[][] {
        const newGrid = Array.from({ length: GRID_HEIGHT }, () =>
            Array.from({ length: GRID_WIDTH }, () => false)
        );

        for (let y = 0; y < GRID_HEIGHT; y++) {
            for (let x = 0; x < GRID_WIDTH; x++) {
                const neighbors = countNeighbors(currentGrid, x, y);

                if (currentGrid[y][x]) {
                    if (neighbors < SURVIVAL_MIN_THRESHOLD || neighbors > SURVIVAL_MAX_THRESHOLD) {
                        newGrid[y][x] = false;
                    } else {
                        newGrid[y][x] = true;
                    }
                } else {
                    if (neighbors === BIRTH_THRESHOLD || neighbors === 6) {
                        newGrid[y][x] = true;
                    }
                }
            }
        }
        return newGrid;
    }

    function countNeighbors(grid: boolean[][], x: number, y: number): number {
        let sum = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                const row = (y + i + GRID_HEIGHT) % GRID_HEIGHT;
                const col = (x + j + GRID_WIDTH) % GRID_WIDTH;
                sum += grid[row][col] ? 1 : 0;
            }
        }
        sum -= grid[y][x] ? 1 : 0;
        return sum;
    }

    // Function to draw the grid on the canvas
    function drawGrid() {
        if (!ctx) return;

        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height); // Clear the entire canvas

        for (let y = 0; y < GRID_HEIGHT; y++) {
            for (let x = 0; x < GRID_WIDTH; x++) {
                if (grid[y][x]) {
                    ctx.fillStyle = 'black'; // Alive cell color
                    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                } else {
                    ctx.fillStyle = 'white'; // Dead cell color
                    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                }
                // Optional: Draw borders for cells
                ctx.strokeStyle = '#eee'; // Light gray border
                ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }
    }

    // Game loop function
    function gameLoop() {
        generation++;
        grid = nextGeneration(grid);
        drawGrid(); // Redraw the grid after updating the state
    }

    function startGame() {
        if (intervalId) clearInterval(intervalId);
        intervalId = window.setInterval(gameLoop, simulationSpeedMs);
        isRunning = true;
    }

    function pauseGame() {
        if (intervalId) clearInterval(intervalId);
        isRunning = false;
    }

    function resetGame() {
        pauseGame();
        generation = 0;
        grid = Array.from({ length: GRID_HEIGHT }, () =>
            Array.from({ length: GRID_WIDTH }, () => Math.random() > INITIAL_LIVE_CHANCE)
        );
        drawGrid(); // Draw the new initial grid
        startGame();
    }

    // Svelte lifecycle hook: onMount is called after the component is first rendered
    onMount(() => {
        // Get the canvas context
        ctx = canvasElement.getContext('2d')!;

        // Set canvas dimensions
        canvasElement.width = GRID_WIDTH * CELL_SIZE;
        canvasElement.height = GRID_HEIGHT * CELL_SIZE;

        // Start the game loop
        startGame();
    });

    // Svelte effect: Reactively restart the game when simulationSpeedMs changes
    $effect(() => {
        if (isRunning) {
            startGame();
        }
    });

    // Svelte lifecycle hook: onDestroy is called when the component is removed from the DOM
    onDestroy(() => {
        if (intervalId) clearInterval(intervalId);
    });

    // Reactive statement: When the grid state changes, redraw the canvas
    // This is crucial for initial draw and if grid is directly manipulated (e.g., reset)
    $effect(() => {
        drawGrid();
    });

</script>

<style>
    canvas {
        display: block; /* Remove extra space below canvas */
        margin: 20px auto; /* Center the canvas */
        border: 1px solid #ccc;
        background-color: white; /* Ensure background is white */
    }

    .controls {
        text-align: center;
        margin-top: 10px;
    }

    .controls button, .controls label, .controls input {
        margin: 0 5px;
    }
</style>

<canvas bind:this={canvasElement}></canvas>

<div class="controls">
    <span>Generation n°{generation}</span>
    <br>
    <button onclick={isRunning ? pauseGame : startGame}>
        {isRunning ? 'Pause' : 'Play'}
    </button>
    <button onclick={resetGame}>Reset</button>
    <label for="speed-slider">Speed: {simulationSpeedMs}ms</label>
    <input
        type="range"
        id="speed-slider"
        min="10"
        max="1000"
        bind:value={simulationSpeedMs}
    />
</div>