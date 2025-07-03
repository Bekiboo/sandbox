import { Entity } from "./Entity";
import { GAME_CONFIG } from "./config";

export enum EnemyType {
  BASE = "base",
  TANK = "tank",
  SHOOTER = "shooter",
  SNIPER = "sniper"
}

export class Enemy extends Entity {
  id: number;
  type: EnemyType;
  speed: number;
  health: number;
  maxHealth: number;
  damage: number;
  lastShootTime = 0;
  shootCooldown: number;
  attackRange: number;
  projectileSpeed: number;
  
  // Sniper-specific properties
  isAiming = false;
  aimStartTime = 0;
  aimDuration = 0;
  aimTargetX = 0;
  aimTargetY = 0;
  edgeDistance = 0;
  moveDirection = { x: 0, y: 0 };
  lastDirectionChange = 0;
  
  private static nextId = 0;

  constructor(x: number, y: number, type: EnemyType = EnemyType.BASE) {
    const config = Enemy.getConfig(type);
    super(x, y, config.SIZE);
    
    this.id = Enemy.nextId++;
    this.type = type;
    this.speed = config.SPEED;
    this.health = config.HEALTH;
    this.maxHealth = config.HEALTH;
    this.damage = config.DAMAGE;
    
    // Shooter-specific properties
    if (type === EnemyType.SHOOTER) {
      this.shootCooldown = GAME_CONFIG.ENEMY.SHOOTER.SHOOT_COOLDOWN;
      this.attackRange = GAME_CONFIG.ENEMY.SHOOTER.ATTACK_RANGE;
      this.projectileSpeed = GAME_CONFIG.ENEMY.SHOOTER.PROJECTILE_SPEED;
    }
    
    // Sniper-specific properties
    if (type === EnemyType.SNIPER) {
      this.shootCooldown = GAME_CONFIG.ENEMY.SNIPER.SHOOT_COOLDOWN;
      this.aimDuration = GAME_CONFIG.ENEMY.SNIPER.AIM_DURATION;
      this.edgeDistance = GAME_CONFIG.ENEMY.SNIPER.EDGE_DISTANCE;
      this.moveDirection = { x: Math.random() - 0.5, y: Math.random() - 0.5 };
      this.lastDirectionChange = 0;
    }
  }

  private static getConfig(type: EnemyType) {
    switch (type) {
      case EnemyType.TANK:
        return GAME_CONFIG.ENEMY.TANK;
      case EnemyType.SHOOTER:
        return GAME_CONFIG.ENEMY.SHOOTER;
      case EnemyType.SNIPER:
        return GAME_CONFIG.ENEMY.SNIPER;
      default:
        return GAME_CONFIG.ENEMY.BASE;
    }
  }

  takeDamage(damage: number): boolean {
    this.health -= damage;
    return this.health <= 0;
  }

  update(deltaTime: number, playerX: number, playerY: number, canvasWidth: number, canvasHeight: number, currentTime: number) {
    const dx = playerX - this.x;
    const dy = playerY - this.y;
    const dist = Math.hypot(dx, dy);
    
    if (dist > 0) {
      // Different behavior based on enemy type
      if (this.type === EnemyType.SHOOTER) {
        // Shooter stops at attack range
        if (dist > this.attackRange) {
          this.x += (dx / dist) * this.speed * deltaTime;
          this.y += (dy / dist) * this.speed * deltaTime;
        }
      } else if (this.type === EnemyType.SNIPER) {
        // Sniper stays near edges and moves randomly
        this.updateSniperMovement(deltaTime, canvasWidth, canvasHeight, currentTime);
      } else {
        // Base and Tank enemies always move toward player
        this.x += (dx / dist) * this.speed * deltaTime;
        this.y += (dy / dist) * this.speed * deltaTime;
      }
    }
  }

  private updateSniperMovement(deltaTime: number, canvasWidth: number, canvasHeight: number, currentTime: number) {
    // Change direction every 2-4 seconds
    if (currentTime - this.lastDirectionChange > 2000 + Math.random() * 2000) {
      this.moveDirection = { 
        x: (Math.random() - 0.5) * 2, 
        y: (Math.random() - 0.5) * 2 
      };
      this.lastDirectionChange = currentTime;
    }
    
    // Move in current direction
    let newX = this.x + this.moveDirection.x * this.speed * deltaTime;
    let newY = this.y + this.moveDirection.y * this.speed * deltaTime;
    
    // Keep near edges - if too far from any edge, move toward closest edge
    const distFromLeft = newX;
    const distFromRight = canvasWidth - newX;
    const distFromTop = newY;
    const distFromBottom = canvasHeight - newY;
    
    const minDistFromEdge = Math.min(distFromLeft, distFromRight, distFromTop, distFromBottom);
    
    if (minDistFromEdge > this.edgeDistance) {
      // Move toward closest edge
      if (distFromLeft === minDistFromEdge) {
        this.moveDirection.x = -Math.abs(this.moveDirection.x);
      } else if (distFromRight === minDistFromEdge) {
        this.moveDirection.x = Math.abs(this.moveDirection.x);
      } else if (distFromTop === minDistFromEdge) {
        this.moveDirection.y = -Math.abs(this.moveDirection.y);
      } else {
        this.moveDirection.y = Math.abs(this.moveDirection.y);
      }
    }
    
    // Apply movement with boundary checks
    this.x = Math.max(this.size, Math.min(canvasWidth - this.size, newX));
    this.y = Math.max(this.size, Math.min(canvasHeight - this.size, newY));
  }

  // Handle collision with other enemies - they can overlap by half their size
  handleEnemyCollision(other: Enemy) {
    if (other === this) return;
    
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    const dist = Math.hypot(dx, dy);
    
    // Calculate minimum distance (allow 50% overlap)
    const minDistance = (this.size + other.size) * 0.5;
    
    if (dist < minDistance && dist > 0) {
      // Calculate overlap
      const overlap = minDistance - dist;
      
      // Normalize direction
      const normalX = dx / dist;
      const normalY = dy / dist;
      
      // Separate enemies based on their mass (size)
      const totalMass = this.size + other.size;
      const thisMass = this.size / totalMass;
      const otherMass = other.size / totalMass;
      
      // Apply separation force
      const separationForce = overlap * 0.5;
      this.x += normalX * separationForce * otherMass;
      this.y += normalY * separationForce * otherMass;
      other.x -= normalX * separationForce * thisMass;
      other.y -= normalY * separationForce * thisMass;
    }
  }

  canShoot(timestamp: number): boolean {
    return this.type === EnemyType.SHOOTER && 
           timestamp - this.lastShootTime >= this.shootCooldown;
  }

  shoot(timestamp: number, playerX: number, playerY: number) {
    if (!this.canShoot(timestamp)) return null;
    
    const dx = playerX - this.x;
    const dy = playerY - this.y;
    const dist = Math.hypot(dx, dy);
    
    if (dist === 0) return null;
    
    const vx = (dx / dist) * this.projectileSpeed;
    const vy = (dy / dist) * this.projectileSpeed;
    
    this.lastShootTime = timestamp;
    
    return {
      x: this.x,
      y: this.y,
      vx,
      vy,
      damage: this.damage
    };
  }

  // Sniper-specific methods
  startAiming(timestamp: number, playerX: number, playerY: number) {
    if (this.type !== EnemyType.SNIPER) return;
    
    this.isAiming = true;
    this.aimStartTime = timestamp;
    this.aimTargetX = playerX;
    this.aimTargetY = playerY;
  }

  canStartAiming(timestamp: number): boolean {
    return this.type === EnemyType.SNIPER && 
           !this.isAiming && 
           timestamp - this.lastShootTime >= this.shootCooldown;
  }

  isReadyToShoot(timestamp: number): boolean {
    return this.type === EnemyType.SNIPER && 
           this.isAiming && 
           timestamp - this.aimStartTime >= this.aimDuration;
  }

  getSniperLaserPath(canvasWidth: number, canvasHeight: number): { x1: number, y1: number, x2: number, y2: number } {
    if (this.type !== EnemyType.SNIPER || !this.isAiming) {
      return { x1: 0, y1: 0, x2: 0, y2: 0 };
    }
    
    const dx = this.aimTargetX - this.x;
    const dy = this.aimTargetY - this.y;
    const angle = Math.atan2(dy, dx);
    
    // Extend the line to canvas boundaries
    const maxDistance = Math.max(canvasWidth, canvasHeight) * 2;
    const x2 = this.x + Math.cos(angle) * maxDistance;
    const y2 = this.y + Math.sin(angle) * maxDistance;
    
    return { x1: this.x, y1: this.y, x2, y2 };
  }

  fireSniperShot(timestamp: number): { x: number, y: number, angle: number, shooterId: number } | null {
    if (!this.isReadyToShoot(timestamp)) return null;
    
    const dx = this.aimTargetX - this.x;
    const dy = this.aimTargetY - this.y;
    const angle = Math.atan2(dy, dx);
    
    this.lastShootTime = timestamp;
    this.isAiming = false;
    
    return { x: this.x, y: this.y, angle, shooterId: this.id };
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Different colors for different enemy types
    switch (this.type) {
      case EnemyType.BASE:
        ctx.fillStyle = "red";
        break;
      case EnemyType.TANK:
        ctx.fillStyle = "darkred";
        break;
      case EnemyType.SHOOTER:
        ctx.fillStyle = "purple";
        break;
    }
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
