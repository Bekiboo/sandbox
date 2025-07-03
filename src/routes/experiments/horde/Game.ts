import { Player } from "./Player";
import { Enemy, EnemyType } from "./Enemy";
import { Projectile } from "./Projectile";
import { EnemyProjectile } from "./EnemyProjectile";
import { SniperBullet } from "./SniperBullet";
import { ParticleSystem } from "./ParticleSystem";
import { GAME_CONFIG } from "./config";

export enum GameState {
  MENU = "menu",
  PLAYING = "playing",
  GAME_OVER = "game_over"
}

export class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  offscreenCanvas: OffscreenCanvas | null = null;
  offscreenCtx: OffscreenCanvasRenderingContext2D | null = null;
  worker: Worker | null = null;
  particleSystem: ParticleSystem;
  player: Player;
  enemies: Enemy[] = [];
  projectiles: Projectile[] = [];
  enemyProjectiles: EnemyProjectile[] = [];
  sniperBullets: SniperBullet[] = [];
  private keys: { [key: string]: boolean } = {};
  private lastShootTime = 0;
  private shootCooldown = GAME_CONFIG.SHOOTING.COOLDOWN;
  
  // Game state management
  gameState: GameState = GameState.MENU;
  score = 0;
  survivalTime = 0;
  lastSurvivalScoreTime = 0;
  
  // Performance optimization
  private imageData: ImageData | null = null;
  private bufferCanvas: HTMLCanvasElement | null = null;
  private bufferCtx: CanvasRenderingContext2D | null = null;
  private performanceMode: 'canvas' | 'imagedata' = 'canvas';
  private showPerformanceInfo = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    
    // Optimized 2D context with GPU acceleration
    this.ctx = canvas.getContext("2d", {
      alpha: false,           // No transparency for better performance
      desynchronized: true,   // Reduce latency
      willReadFrequently: false // Optimize for writing
    })!;
    
    // Enable GPU acceleration hints
    this.ctx.imageSmoothingEnabled = false; // Pixel-perfect rendering
    
    // Initialize systems
    this.initializeDoubleBuffering();
    this.initializeOffscreenCanvas();
    this.particleSystem = new ParticleSystem(canvas, this.ctx);
    
    // Auto-detect performance mode
    this.detectPerformanceMode();
    
    this.player = new Player(canvas.width / 2, canvas.height / 2);

    window.addEventListener("keydown", (e) => {
      this.keys[e.code] = true;
      // Toggle performance info with P key
      if (e.code === 'KeyP') {
        this.showPerformanceInfo = !this.showPerformanceInfo;
      }
    });
    window.addEventListener("keyup", (e) => (this.keys[e.code] = false));
  }

  private detectPerformanceMode() {
    // Simple performance detection
    const userAgent = navigator.userAgent;
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    
    this.performanceMode = (isMobile || isLowEnd) ? 'imagedata' : 'canvas';
    console.log(`Performance mode: ${this.performanceMode}`);
  }

  private initializeDoubleBuffering() {
    // Create buffer canvas for smoother rendering
    this.bufferCanvas = document.createElement('canvas');
    this.bufferCanvas.width = this.canvas.width;
    this.bufferCanvas.height = this.canvas.height;
    this.bufferCtx = this.bufferCanvas.getContext('2d', {
      alpha: false,
      desynchronized: true
    });
  }

  private initializeOffscreenCanvas() {
    // Check if OffscreenCanvas is supported
    if (typeof OffscreenCanvas !== 'undefined') {
      try {
        this.offscreenCanvas = new OffscreenCanvas(this.canvas.width, this.canvas.height);
        this.offscreenCtx = this.offscreenCanvas.getContext('2d');
        console.log('OffscreenCanvas initialized successfully');
      } catch (e) {
        console.log('OffscreenCanvas not available, falling back to regular canvas');
      }
    }
  }

  startGame() {
    this.gameState = GameState.PLAYING;
    this.score = 0;
    this.survivalTime = 0;
    this.lastSurvivalScoreTime = 0;
    this.enemies = [];
    this.projectiles = [];
    this.enemyProjectiles = [];
    this.sniperBullets = [];
    this.player = new Player(this.canvas.width / 2, this.canvas.height / 2);
    
    // Initialize Web Worker for heavy computations
    this.initializeWorker();
  }

  private initializeWorker() {
    // Create worker for physics calculations
    try {
      // Note: In a real implementation, you'd serve the worker file separately
      const workerCode = `
        self.addEventListener('message', (e) => {
          const { type, data } = e.data;
          
          switch (type) {
            case 'UPDATE_ENEMIES':
              const result = updateEnemies(data);
              self.postMessage({ type: 'ENEMIES_UPDATED', data: result });
              break;
              
            case 'CHECK_COLLISIONS':
              const collisions = checkCollisions(data);
              self.postMessage({ type: 'COLLISIONS_CHECKED', data: collisions });
              break;
          }
        });
        
        function updateEnemies(data) {
          const { enemies, playerX, playerY, deltaTime } = data;
          
          return enemies.map(enemy => {
            const dx = playerX - enemy.x;
            const dy = playerY - enemy.y;
            const dist = Math.hypot(dx, dy);
            
            if (dist > 0) {
              if (enemy.type === 'shooter') {
                if (dist > enemy.attackRange) {
                  enemy.x += (dx / dist) * enemy.speed * deltaTime;
                  enemy.y += (dy / dist) * enemy.speed * deltaTime;
                }
              } else {
                enemy.x += (dx / dist) * enemy.speed * deltaTime;
                enemy.y += (dy / dist) * enemy.speed * deltaTime;
              }
            }
            
            return enemy;
          });
        }
        
        function checkCollisions(data) {
          const { enemies, projectiles, player } = data;
          const collisions = {
            enemyProjectile: [],
            playerEnemy: [],
            enemyEnemy: []
          };
          
          // Simplified collision detection
          projectiles.forEach((projectile, pIndex) => {
            enemies.forEach((enemy, eIndex) => {
              const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
              if (dist < projectile.size + enemy.size) {
                collisions.enemyProjectile.push({ projectileIndex: pIndex, enemyIndex: eIndex });
              }
            });
          });
          
          return collisions;
        }
      `;
      
      const blob = new Blob([workerCode], { type: 'application/javascript' });
      this.worker = new Worker(URL.createObjectURL(blob));
      
      this.worker.onmessage = (e) => {
        this.handleWorkerMessage(e.data);
      };
      
      console.log('Web Worker initialized successfully');
    } catch (error) {
      console.log('Web Worker not available, using main thread');
    }
  }

  private handleWorkerMessage(data: any) {
    const { type, data: result } = data;
    
    switch (type) {
      case 'ENEMIES_UPDATED':
        // Update enemies with calculated positions
        result.forEach((updatedEnemy: any, index: number) => {
          if (this.enemies[index]) {
            this.enemies[index].x = updatedEnemy.x;
            this.enemies[index].y = updatedEnemy.y;
          }
        });
        break;
        
      case 'COLLISIONS_CHECKED':
        // Handle collision results
        this.processCollisionResults(result);
        break;
    }
  }

  private processCollisionResults(collisions: any) {
    // Process collision results from worker
    collisions.enemyProjectile.forEach((collision: any) => {
      const { projectileIndex, enemyIndex } = collision;
      if (this.enemies[enemyIndex] && this.projectiles[projectileIndex]) {
        const enemy = this.enemies[enemyIndex];
        const isDead = enemy.takeDamage(1);
        if (isDead) {
          this.enemies.splice(enemyIndex, 1);
          this.score += GAME_CONFIG.SCORING.ENEMY_KILL;
        }
        this.projectiles.splice(projectileIndex, 1);
      }
    });
  }

  gameOver() {
    this.gameState = GameState.GAME_OVER;
  }

  backToMenu() {
    this.gameState = GameState.MENU;
  }

  spawnEnemy() {
    const minDistance = GAME_CONFIG.ENEMY.SPAWN_RADIUS; // Minimum distance from player
    let x: number, y: number;
    let attempts = 0;
    const maxAttempts = 50;

    // Randomly choose enemy type first
    const rand = Math.random();
    let enemyType: EnemyType;
    if (rand < 0.05) {
      enemyType = EnemyType.SNIPER; // 5% chance
    } else if (rand < 0.15) {
      enemyType = EnemyType.TANK; // 10% chance
    } else if (rand < 0.35) {
      enemyType = EnemyType.SHOOTER; // 20% chance
    } else {
      enemyType = EnemyType.BASE; // 65% chance
    }

    // Special spawning for snipers - always spawn near edges
    if (enemyType === EnemyType.SNIPER) {
      const edge = Math.floor(Math.random() * 4);
      const edgeDistance = GAME_CONFIG.ENEMY.SNIPER.EDGE_DISTANCE;
      
      switch (edge) {
        case 0: // Top edge
          x = Math.random() * this.canvas.width;
          y = edgeDistance;
          break;
        case 1: // Right edge
          x = this.canvas.width - edgeDistance;
          y = Math.random() * this.canvas.height;
          break;
        case 2: // Bottom edge
          x = Math.random() * this.canvas.width;
          y = this.canvas.height - edgeDistance;
          break;
        case 3: // Left edge
          x = edgeDistance;
          y = Math.random() * this.canvas.height;
          break;
        default:
          x = edgeDistance;
          y = edgeDistance;
      }
    } else {
      // Normal spawning for other enemy types
      // Keep trying to find a valid spawn position
      do {
        x = Math.random() * this.canvas.width;
        y = Math.random() * this.canvas.height;
        attempts++;
      } while (
        Math.hypot(x - this.player.x, y - this.player.y) < minDistance &&
        attempts < maxAttempts
      );

      // If we couldn't find a good spot after many attempts, spawn at canvas edges
      if (attempts >= maxAttempts) {
        const edge = Math.floor(Math.random() * 4);
        switch (edge) {
          case 0: // Top edge
            x = Math.random() * this.canvas.width;
            y = 0;
            break;
          case 1: // Right edge
            x = this.canvas.width;
            y = Math.random() * this.canvas.height;
            break;
          case 2: // Bottom edge
            x = Math.random() * this.canvas.width;
            y = this.canvas.height;
            break;
          case 3: // Left edge
            x = 0;
            y = Math.random() * this.canvas.height;
            break;
        }
      }
    }

    this.enemies.push(new Enemy(x, y, enemyType));
  }

  findNearestEnemy() {
    let closest: Enemy | null = null;
    let minDist = Infinity;
    for (const enemy of this.enemies) {
      const dist = Math.hypot(this.player.x - enemy.x, this.player.y - enemy.y);
      if (dist < minDist) {
        minDist = dist;
        closest = enemy;
      }
    }
    return closest;
  }

  shoot(timestamp: number) {
    if (timestamp - this.lastShootTime < this.shootCooldown * 1000) return;

    const target = this.findNearestEnemy();
    if (!target) return;

    const dx = target.x - this.player.x;
    const dy = target.y - this.player.y;
    const angle = Math.atan2(dy, dx);
    const accuracy = GAME_CONFIG.PROJECTILE.ACCURACY;
    const deviation = (Math.random() - 0.5) * accuracy;
    const finalAngle = angle + deviation;

    const speed = GAME_CONFIG.PROJECTILE.SPEED;
    const vx = Math.cos(finalAngle) * speed;
    const vy = Math.sin(finalAngle) * speed;
    
    this.projectiles.push(new Projectile(this.player.x, this.player.y, vx, vy));

    this.lastShootTime = timestamp;
  }

  update(deltaTime: number, timestamp: number) {
    if (this.gameState !== GameState.PLAYING) return;

    // Update survival time and score
    this.survivalTime += deltaTime;
    if (timestamp - this.lastSurvivalScoreTime >= 1000) {
      this.score += GAME_CONFIG.SCORING.SURVIVAL_BONUS;
      this.lastSurvivalScoreTime = timestamp;
    }

    // Update particle system
    this.particleSystem.update(deltaTime);

    this.player.update(deltaTime, this.keys, this.canvas.width, this.canvas.height);

    // Update enemies and handle their shooting
    this.enemies.forEach((e) => {
      e.update(deltaTime, this.player.x, this.player.y, this.canvas.width, this.canvas.height, timestamp);
      
      // Handle enemy shooting
      if (e.type === EnemyType.SHOOTER) {
        const projectileData = e.shoot(timestamp, this.player.x, this.player.y);
        if (projectileData) {
          this.enemyProjectiles.push(new EnemyProjectile(
            projectileData.x,
            projectileData.y,
            projectileData.vx,
            projectileData.vy,
            projectileData.damage
          ));
        }
      }
      
      // Handle sniper aiming and shooting
      if (e.type === EnemyType.SNIPER) {
        if (e.canStartAiming(timestamp)) {
          e.startAiming(timestamp, this.player.x, this.player.y);
        }
        
        if (e.isReadyToShoot(timestamp)) {
          const sniperShot = e.fireSniperShot(timestamp);
          if (sniperShot) {
            this.sniperBullets.push(new SniperBullet(
              sniperShot.x,
              sniperShot.y,
              sniperShot.angle,
              this.canvas.width,
              this.canvas.height,
              sniperShot.shooterId
            ));
            
            // Add impressive muzzle flash effect for sniper
            this.particleSystem.createExplosion(sniperShot.x, sniperShot.y, "white", 30, 2);
          }
        }
      }
    });

    // Handle enemy-enemy collisions
    for (let i = 0; i < this.enemies.length; i++) {
      for (let j = i + 1; j < this.enemies.length; j++) {
        this.enemies[i].handleEnemyCollision(this.enemies[j]);
      }
    }

    // Update projectiles
    this.projectiles.forEach((p) => p.update(deltaTime));
    this.enemyProjectiles.forEach((p) => p.update(deltaTime));

    // Check player-enemy collisions
    if (!this.player.isInvulnerable) {
      this.enemies.forEach((enemy, index) => {
        if (this.player.isCollidingWith(enemy)) {
          const isDead = this.player.takeDamage(enemy.damage);
          if (isDead) {
            this.gameOver();
            return;
          }
          // Create explosion effect based on enemy type
          const explosionProps = this.getExplosionProperties(enemy);
          this.particleSystem.createExplosion(
            enemy.x, 
            enemy.y, 
            explosionProps.color,
            explosionProps.particleCount,
            explosionProps.sizeMultiplier
          );
          // Remove the enemy that hit the player
          this.enemies.splice(index, 1);
        }
      });
      
      // Check player-enemy projectile collisions
      this.enemyProjectiles.forEach((projectile, index) => {
        if (this.player.isCollidingWith(projectile)) {
          const isDead = this.player.takeDamage(projectile.damage);
          if (isDead) {
            this.gameOver();
            return;
          }
          // Create small explosion with bright color
          this.particleSystem.createExplosion(projectile.x, projectile.y, "cyan", 6, 0.7);
          // Remove the projectile that hit the player
          this.enemyProjectiles.splice(index, 1);
        }
      });
    }

    // Check player-sniper bullet collisions
    this.sniperBullets.forEach((bullet, index) => {
      if (bullet.intersectsWithPoint(this.player.x, this.player.y, this.player.size)) {
        const isDead = this.player.takeDamage(bullet.damage);
        if (isDead) {
          this.gameOver();
          return;
        }
        // Create large explosion effect
        this.particleSystem.createExplosion(this.player.x, this.player.y, "red", 25, 1.5);
        // Remove the bullet
        this.sniperBullets.splice(index, 1);
      }
    });

    // Player projectile-enemy collisions
    this.projectiles = this.projectiles.filter((p) => {
      const hitIndex = this.enemies.findIndex((e) => p.isCollidingWith(e));
      if (hitIndex !== -1) {
        const enemy = this.enemies[hitIndex];
        const isDead = enemy.takeDamage(1); // Player projectiles do 1 damage
        
        if (isDead) {
          // Create explosion effect based on enemy type
          const explosionProps = this.getExplosionProperties(enemy);
          this.particleSystem.createExplosion(
            enemy.x, 
            enemy.y, 
            explosionProps.color,
            explosionProps.particleCount,
            explosionProps.sizeMultiplier
          );
          this.enemies.splice(hitIndex, 1);
          this.score += GAME_CONFIG.SCORING.ENEMY_KILL; // Add score for killing enemy
        } else {
          // Create small impact effect when hitting but not killing
          this.particleSystem.createExplosion(p.x, p.y, "white", 4, 0.5);
        }
        return false; // Remove projectile
      }
      return p.isInBounds(this.canvas.width, this.canvas.height);
    });

    // Clean up enemy projectiles that are off screen
    this.enemyProjectiles = this.enemyProjectiles.filter((p) => 
      p.isInBounds(this.canvas.width, this.canvas.height)
    );

    // Handle sniper bullet-enemy collisions
    this.sniperBullets.forEach((bullet, bulletIndex) => {
      const hitEnemies = bullet.intersectsWithEnemies(this.enemies);
      
      if (hitEnemies.length > 0) {
        // Remove all hit enemies and award score
        hitEnemies.forEach(enemy => {
          const enemyIndex = this.enemies.indexOf(enemy);
          if (enemyIndex !== -1) {
            // Create explosion effect
            const explosionProps = this.getExplosionProperties(enemy);
            this.particleSystem.createExplosion(
              enemy.x, 
              enemy.y, 
              explosionProps.color,
              explosionProps.particleCount,
              explosionProps.sizeMultiplier
            );
            this.enemies.splice(enemyIndex, 1);
            this.score += GAME_CONFIG.SCORING.ENEMY_KILL;
          }
        });
        
        // Remove the bullet after it hits enemies
        this.sniperBullets.splice(bulletIndex, 1);
      }
    });
    
    // Clean up sniper bullets after a short time (they should be instant but we keep them briefly for visual effect)
    this.sniperBullets = this.sniperBullets.filter((bullet, index) => {
      // Remove bullets after 0.5 seconds for better visual effect
      if (Date.now() - bullet.creationTime > 500) {
        return false;
      }
      return true;
    });

    this.shoot(timestamp);
  }

  draw() {
    // Clear main canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    if (this.gameState === GameState.PLAYING) {
      // Draw game entities directly on main canvas for now (simpler)
      this.renderEnemiesByType(this.ctx);
      this.renderProjectiles(this.ctx);
      this.renderSniperBullets(this.ctx);
      this.player.draw(this.ctx);
      
      // Render particles directly on main canvas
      this.particleSystem.renderCanvas();
      
      // Draw UI on main canvas
      this.drawHealthBar();
      this.drawScore();
      this.drawPerformanceInfo();
    }
  }

  private drawPerformanceInfo() {
    // Show performance info when toggled
    if (this.showPerformanceInfo) {
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
      this.ctx.fillRect(10, this.canvas.height - 130, 280, 120);
      
      this.ctx.fillStyle = "white";
      this.ctx.font = "14px Arial";
      this.ctx.textAlign = "left";
      
      const info = [
        `Enemies: ${this.enemies.length}`,
        `Projectiles: ${this.projectiles.length + this.enemyProjectiles.length}`,
        `Sniper Bullets: ${this.sniperBullets.length}`,
        `Particles: ${this.particleSystem.getParticleCount()}`,
        `Mode: ${this.performanceMode}`,
        `GPU: ${this.ctx.imageSmoothingEnabled ? 'Smooth' : 'Pixelated'}`,
        `Worker: ${this.worker ? 'Active' : 'Inactive'}`,
        `OffscreenCanvas: ${this.offscreenCanvas ? 'Active' : 'Inactive'}`,
        `Press P to toggle`
      ];
      
      info.forEach((text, index) => {
        this.ctx.fillText(text, 15, this.canvas.height - 110 + index * 14);
      });
      
      this.ctx.textAlign = "left"; // Reset
    }
  }

  private batchRender(ctx: CanvasRenderingContext2D) {
    // Batch similar entities for better GPU performance
    
    // Render all enemies by type (reduces context switches)
    this.renderEnemiesByType(ctx);
    
    // Render all projectiles in one batch
    this.renderProjectiles(ctx);
    
    // Render particles before player (background layer)
    if (this.performanceMode === 'canvas') {
      this.particleSystem.renderCanvas();
    } else {
      this.particleSystem.renderToImageData();
    }
    
    // Render player last (on top)
    this.player.draw(ctx);
  }

  private renderEnemiesByType(ctx: CanvasRenderingContext2D) {
    // Group enemies by type to minimize GPU state changes
    const baseEnemies = this.enemies.filter(e => e.type === EnemyType.BASE);
    const tankEnemies = this.enemies.filter(e => e.type === EnemyType.TANK);
    const shooterEnemies = this.enemies.filter(e => e.type === EnemyType.SHOOTER);
    const sniperEnemies = this.enemies.filter(e => e.type === EnemyType.SNIPER);
    
    // Draw sniper aiming lasers first (behind everything)
    ctx.save();
    ctx.strokeStyle = "rgba(255, 0, 0, 0.7)";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    
    sniperEnemies.forEach(sniper => {
      if (sniper.isAiming) {
        const laser = sniper.getSniperLaserPath(this.canvas.width, this.canvas.height);
        ctx.beginPath();
        ctx.moveTo(laser.x1, laser.y1);
        ctx.lineTo(laser.x2, laser.y2);
        ctx.stroke();
      }
    });
    
    ctx.restore();
    
    // Render base enemies
    ctx.fillStyle = "red";
    ctx.beginPath();
    baseEnemies.forEach(e => {
      ctx.moveTo(e.x + e.size, e.y);
      ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
    });
    ctx.fill();
    
    // Render tank enemies
    ctx.fillStyle = "darkred";
    ctx.beginPath();
    tankEnemies.forEach(e => {
      ctx.moveTo(e.x + e.size, e.y);
      ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
    });
    ctx.fill();
    
    // Render shooter enemies
    ctx.fillStyle = "purple";
    ctx.beginPath();
    shooterEnemies.forEach(e => {
      ctx.moveTo(e.x + e.size, e.y);
      ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
    });
    ctx.fill();
    
    // Render sniper enemies
    ctx.fillStyle = "darkgreen";
    ctx.beginPath();
    sniperEnemies.forEach(e => {
      ctx.moveTo(e.x + e.size, e.y);
      ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
    });
    ctx.fill();
  }

  private renderProjectiles(ctx: CanvasRenderingContext2D) {
    // Render player projectiles
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    this.projectiles.forEach(p => {
      ctx.moveTo(p.x + p.size, p.y);
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    });
    ctx.fill();
    
    // Render enemy projectiles
    ctx.fillStyle = "orange";
    ctx.beginPath();
    this.enemyProjectiles.forEach(p => {
      ctx.moveTo(p.x + p.size, p.y);
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    });
    ctx.fill();
  }

  private renderSniperBullets(ctx: CanvasRenderingContext2D) {
    this.sniperBullets.forEach(bullet => {
      bullet.draw(ctx);
    });
  }

  private drawScore() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Arial";
    this.ctx.textAlign = "right";
    this.ctx.fillText(`Score: ${this.score}`, this.canvas.width - 20, 30);
    this.ctx.fillText(`Time: ${Math.floor(this.survivalTime)}s`, this.canvas.width - 20, 60);
    this.ctx.textAlign = "left";
  }

  private drawHealthBar() {
    const barWidth = 200;
    const barHeight = 20;
    const barX = 20;
    const barY = 20;
    
    // Background
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.ctx.fillRect(barX - 2, barY - 2, barWidth + 4, barHeight + 4);
    
    // Health bar background
    this.ctx.fillStyle = "darkred";
    this.ctx.fillRect(barX, barY, barWidth, barHeight);
    
    // Health bar fill
    const healthPercentage = this.player.health / this.player.maxHealth;
    const healthWidth = barWidth * healthPercentage;
    
    // Color based on health percentage
    if (healthPercentage > 0.6) {
      this.ctx.fillStyle = "green";
    } else if (healthPercentage > 0.3) {
      this.ctx.fillStyle = "orange";
    } else {
      this.ctx.fillStyle = "red";
    }
    
    this.ctx.fillRect(barX, barY, healthWidth, barHeight);
    
    // Health text
    this.ctx.fillStyle = "white";
    this.ctx.font = "16px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      `${Math.ceil(this.player.health)}/${this.player.maxHealth}`,
      barX + barWidth / 2,
      barY + barHeight / 2 + 5
    );
    
    // Reset text align
    this.ctx.textAlign = "left";
  }

  private getExplosionProperties(enemy: Enemy): { color: string; particleCount: number; sizeMultiplier: number } {
    switch (enemy.type) {
      case EnemyType.BASE:
        return { color: "red", particleCount: 10, sizeMultiplier: 1 };
      case EnemyType.TANK:
        return { color: "darkred", particleCount: 20, sizeMultiplier: 1.5 };
      case EnemyType.SHOOTER:
        return { color: "purple", particleCount: 8, sizeMultiplier: 0.8 };
      case EnemyType.SNIPER:
        return { color: "green", particleCount: 15, sizeMultiplier: 1.2 };
      default:
        return { color: "orange", particleCount: 10, sizeMultiplier: 1 };
    }
  }
}
