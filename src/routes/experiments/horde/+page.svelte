<script lang="ts">
  import { onMount } from "svelte";
  import { Game, GameState } from "./Game";
  import { GAME_CONFIG } from "./config";

  let canvas: HTMLCanvasElement;
  let game: Game;
  let gameState = $state(GameState.MENU);
  let score = $state(0);
  let survivalTime = $state(0);
  let enemySpawnInterval: number;

  onMount(() => {
    canvas.width = GAME_CONFIG.CANVAS.WIDTH;
    canvas.height = GAME_CONFIG.CANVAS.HEIGHT;

    game = new Game(canvas);

    let lastTime = 0;

    function loop(timestamp: number) {
      const delta = (timestamp - lastTime) / 1000;
      lastTime = timestamp;

      game.update(delta, timestamp);
      game.draw();
      
      // Update reactive state
      gameState = game.gameState;
      score = game.score;
      survivalTime = Math.floor(game.survivalTime);

      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
  });

  function startGame() {
    game.startGame();
    // Start enemy spawning
    enemySpawnInterval = setInterval(() => {
      if (game.gameState === GameState.PLAYING) {
        game.spawnEnemy();
      }
    }, GAME_CONFIG.ENEMY.SPAWN_INTERVAL);
  }

  function backToMenu() {
    game.backToMenu();
    if (enemySpawnInterval) {
      clearInterval(enemySpawnInterval);
    }
  }
</script>

<div class="relative w-fit mx-auto bg-black">
  <canvas bind:this={canvas} class="game-canvas" width="800" height="600"></canvas>
  
  <!-- Menu State -->
  {#if gameState === GameState.MENU}
    <div class="absolute inset-0 bg-black/80 flex items-center justify-center">
      <div class="text-center text-white">
        <h1 class="text-6xl font-bold mb-4 text-blue-400">Space Shooter</h1>
        <p class="text-xl mb-8 text-gray-300">Survive as long as you can!</p>
        <button 
          onclick={startGame}
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors"
        >
          Start Game
        </button>
        <div class="mt-8 text-gray-400">
          <p class="mb-2">Controls:</p>
          <p>Arrow Keys or WASD/ZQSD to move</p>
          <p>Auto-shooting enabled</p>
        </div>
      </div>
    </div>
  {/if}

  <!-- Game Over State -->
  {#if gameState === GameState.GAME_OVER}
    <div class="absolute inset-0 bg-black/90 flex items-center justify-center">
      <div class="text-center text-white">
        <h1 class="text-5xl font-bold mb-4 text-red-400">Game Over</h1>
        <div class="mb-8">
          <p class="text-3xl mb-2">Final Score: <span class="text-yellow-400 font-bold">{score}</span></p>
          <p class="text-xl text-gray-300">Survival Time: {survivalTime}s</p>
        </div>
        <div class="flex gap-4 justify-center">
          <button 
            onclick={startGame}
            class="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors"
          >
            Play Again
          </button>
          <button 
            onclick={backToMenu}
            class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors"
          >
            Main Menu
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .game-canvas {
    border: 2px solid #333;
    background-color: #000;
    display: block;
  }
</style>
