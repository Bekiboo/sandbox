import { Entity } from "./Entity";
import { GAME_CONFIG } from "./config";

export class Player extends Entity {
  speed = GAME_CONFIG.PLAYER.SPEED;
  health: number = GAME_CONFIG.PLAYER.MAX_HEALTH;
  maxHealth = GAME_CONFIG.PLAYER.MAX_HEALTH;
  isInvulnerable = false;
  invulnerabilityTimer = 0;
  flickerTimer = 0;
  isVisible = true;

  constructor(x: number, y: number) {
    super(x, y, GAME_CONFIG.PLAYER.SIZE);
  }

  takeDamage(damage: number): boolean {
    if (this.isInvulnerable) return false;
    
    this.health -= damage;
    if (this.health <= 0) {
      this.health = 0;
      return true; // Player is dead
    }
    
    // Start invulnerability period
    this.isInvulnerable = true;
    this.invulnerabilityTimer = GAME_CONFIG.PLAYER.INVULNERABILITY_DURATION;
    this.flickerTimer = 0;
    
    return false;
  }

  update(deltaTime: number, keys: Record<string, boolean>, canvasWidth: number, canvasHeight: number) {
    // Handle invulnerability
    if (this.isInvulnerable) {
      this.invulnerabilityTimer -= deltaTime * 1000;
      this.flickerTimer += deltaTime * 1000;
      
      // Flicker effect
      if (this.flickerTimer >= GAME_CONFIG.PLAYER.FLICKER_INTERVAL) {
        this.isVisible = !this.isVisible;
        this.flickerTimer = 0;
      }
      
      // End invulnerability
      if (this.invulnerabilityTimer <= 0) {
        this.isInvulnerable = false;
        this.isVisible = true;
      }
    }

    // Movement with boundary checking - Using key codes for layout-independent controls
    if ((keys["ArrowUp"] || keys["KeyW"]) && this.y > this.size) {
      this.y -= this.speed * deltaTime;
    }
    if ((keys["ArrowDown"] || keys["KeyS"]) && this.y < canvasHeight - this.size) {
      this.y += this.speed * deltaTime;
    }
    if ((keys["ArrowLeft"] || keys["KeyA"]) && this.x > this.size) {
      this.x -= this.speed * deltaTime;
    }
    if ((keys["ArrowRight"] || keys["KeyD"]) && this.x < canvasWidth - this.size) {
      this.x += this.speed * deltaTime;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Only draw if visible (for flicker effect)
    if (this.isVisible) {
      ctx.fillStyle = "blue";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
