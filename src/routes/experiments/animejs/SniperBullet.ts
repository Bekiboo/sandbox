import { GAME_CONFIG } from "./config";

export class SniperBullet {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  damage: number;
  active: boolean = true;
  creationTime: number;
  shooterId: number; // ID of the sniper who fired this bullet
  
  constructor(x: number, y: number, angle: number, canvasWidth: number, canvasHeight: number, shooterId: number) {
    this.x1 = x;
    this.y1 = y;
    this.damage = GAME_CONFIG.ENEMY.SNIPER.DAMAGE;
    this.creationTime = Date.now();
    this.shooterId = shooterId;
    
    // Calculate end point at canvas boundary
    const maxDistance = Math.max(canvasWidth, canvasHeight) * 2;
    this.x2 = x + Math.cos(angle) * maxDistance;
    this.y2 = y + Math.sin(angle) * maxDistance;
    
    // Clip to canvas boundaries
    this.clipToCanvas(canvasWidth, canvasHeight);
  }
  
  private clipToCanvas(canvasWidth: number, canvasHeight: number) {
    // Use line-rectangle intersection to clip the line to canvas bounds
    const bounds = [
      { x1: 0, y1: 0, x2: canvasWidth, y2: 0 }, // top
      { x1: canvasWidth, y1: 0, x2: canvasWidth, y2: canvasHeight }, // right
      { x1: canvasWidth, y1: canvasHeight, x2: 0, y2: canvasHeight }, // bottom
      { x1: 0, y1: canvasHeight, x2: 0, y2: 0 } // left
    ];
    
    for (const bound of bounds) {
      const intersection = this.lineIntersection(
        this.x1, this.y1, this.x2, this.y2,
        bound.x1, bound.y1, bound.x2, bound.y2
      );
      
      if (intersection) {
        this.x2 = intersection.x;
        this.y2 = intersection.y;
        break;
      }
    }
  }
  
  private lineIntersection(x1: number, y1: number, x2: number, y2: number, 
                         x3: number, y3: number, x4: number, y4: number) {
    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (Math.abs(denom) < 1e-10) return null;
    
    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom;
    
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return {
        x: x1 + t * (x2 - x1),
        y: y1 + t * (y2 - y1)
      };
    }
    
    return null;
  }
  
  // Check if a point (like player) intersects with the bullet line
  intersectsWithPoint(x: number, y: number, radius: number): boolean {
    if (!this.active) return false;
    
    // Distance from point to line
    const A = this.y2 - this.y1;
    const B = this.x1 - this.x2;
    const C = this.x2 * this.y1 - this.x1 * this.y2;
    
    const distance = Math.abs(A * x + B * y + C) / Math.sqrt(A * A + B * B);
    
    if (distance > radius) return false;
    
    // Check if the closest point on the line is within the line segment
    const closestX = (B * (B * x - A * y) - A * C) / (A * A + B * B);
    const closestY = (A * (-B * x + A * y) - B * C) / (A * A + B * B);
    
    // Check if closest point is within line segment bounds
    const minX = Math.min(this.x1, this.x2);
    const maxX = Math.max(this.x1, this.x2);
    const minY = Math.min(this.y1, this.y2);
    const maxY = Math.max(this.y1, this.y2);
    
    return closestX >= minX && closestX <= maxX && closestY >= minY && closestY <= maxY;
  }
  
  // Check if bullet intersects with any enemy in its path (excluding the shooter)
  intersectsWithEnemies(enemies: any[]): any[] {
    if (!this.active) return [];
    
    const hitEnemies = [];
    
    for (const enemy of enemies) {
      // Skip the sniper that fired this bullet
      if (enemy.id === this.shooterId) continue;
      
      if (this.intersectsWithPoint(enemy.x, enemy.y, enemy.size)) {
        hitEnemies.push(enemy);
      }
    }
    
    return hitEnemies;
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    if (!this.active) return;
    
    const timeSinceCreation = Date.now() - this.creationTime;
    const flashDuration = 150; // Flash effect duration in ms
    const fadeOutDuration = 300; // Total fade out duration in ms
    
    ctx.save();
    
    // Calculate opacity based on time
    let opacity = 1;
    if (timeSinceCreation > flashDuration) {
      // Fade out after flash
      const fadeProgress = (timeSinceCreation - flashDuration) / (fadeOutDuration - flashDuration);
      opacity = Math.max(0, 1 - fadeProgress);
    }
    
    // Draw main bullet line with flash effect
    if (timeSinceCreation < flashDuration) {
      // Flash effect - bright white core
      ctx.shadowColor = "white";
      ctx.shadowBlur = 20;
      ctx.strokeStyle = "white";
      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      
      ctx.beginPath();
      ctx.moveTo(this.x1, this.y1);
      ctx.lineTo(this.x2, this.y2);
      ctx.stroke();
      
      // Reset shadow
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
    }
    
    // Draw the main laser beam (red)
    ctx.strokeStyle = `rgba(255, 0, 0, ${opacity})`;
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.stroke();
    
    // Draw inner core (brighter red)
    ctx.strokeStyle = `rgba(255, 100, 100, ${opacity * 0.8})`;
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.stroke();
    
    ctx.restore();
  }
  
  deactivate() {
    this.active = false;
  }
}
