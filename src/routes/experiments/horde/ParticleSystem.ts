import { GAME_CONFIG } from "./config";

export class ParticleSystem {
  private particles: Particle[] = [];
  private particlePool: Particle[] = [];
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private imageData: ImageData;
  private data: Uint8ClampedArray;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.imageData = ctx.createImageData(canvas.width, canvas.height);
    this.data = this.imageData.data;
  }

  createExplosion(x: number, y: number, color: string = "orange", particleCount: number = 12, sizeMultiplier: number = 1) {
    console.log(`Creating explosion at (${x}, ${y}) with ${particleCount} particles`); // Debug
    
    for (let i = 0; i < particleCount; i++) {
      const particle = this.getParticle();
      particle.reset(x, y, color, sizeMultiplier);
      this.particles.push(particle);
    }
  }



  private getParticle(): Particle {
    if (this.particlePool.length > 0) {
      return this.particlePool.pop()!;
    }
    return new Particle();
  }

  private returnParticle(particle: Particle) {
    this.particlePool.push(particle);
  }

  update(deltaTime: number) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      particle.update(deltaTime);
      
      if (particle.isDead()) {
        this.particles.splice(i, 1);
        this.returnParticle(particle);
      }
    }
  }

  // GPU-optimized rendering using ImageData
  renderToImageData() {
    // Clear previous frame
    this.data.fill(0);
    
    // Render particles directly to pixel data
    for (const particle of this.particles) {
      this.renderParticleToImageData(particle);
    }
    
    // Draw to canvas in one operation
    this.ctx.putImageData(this.imageData, 0, 0);
  }

  private renderParticleToImageData(particle: Particle) {
    const x = Math.floor(particle.x);
    const y = Math.floor(particle.y);
    const size = Math.floor(particle.size);
    
    if (x < 0 || x >= this.canvas.width || y < 0 || y >= this.canvas.height) return;
    
    const alpha = particle.alpha * 255;
    const [r, g, b] = particle.color;
    
    // Draw particle as a small square for performance
    for (let px = x; px < x + size && px < this.canvas.width; px++) {
      for (let py = y; py < y + size && py < this.canvas.height; py++) {
        const index = (py * this.canvas.width + px) * 4;
        this.data[index] = r;     // R
        this.data[index + 1] = g; // G
        this.data[index + 2] = b; // B
        this.data[index + 3] = alpha; // A
      }
    }
  }

  // Simple, direct rendering - circles for particles
  renderCanvas() {
    this.ctx.save();
    
    for (const particle of this.particles) {
      const [r, g, b] = particle.color;
      this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${particle.alpha})`;
      
      // Draw as circle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
    }
    
    this.ctx.restore();
  }

  getParticleCount(): number {
    return this.particles.length;
  }
}

class Particle {
  x = 0;
  y = 0;
  vx = 0;
  vy = 0;
  size = 2;
  alpha = 1;
  life = 1;
  maxLife = 1;
  color: [number, number, number] = [255, 255, 255];
  friction = 0.98;

  reset(x: number, y: number, colorString: string = "orange", sizeMultiplier: number = 1) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 200; // Reduced speed
    this.vy = (Math.random() - 0.5) * 200;
    this.size = (Math.random() * 3 + 2) * sizeMultiplier; // Smaller size (2-5 pixels) with multiplier
    this.alpha = 1;
    this.life = 1;
    this.maxLife = Math.random() * 0.5 + 0.3; // Shorter life (0.3-0.8s)
    this.friction = 0.95;
    
    // Parse color string
    this.color = this.parseColor(colorString);
  }



  private parseColor(colorString: string): [number, number, number] {
    switch (colorString) {
      case "orange": return [255, 165, 0];
      case "red": return [255, 0, 0];
      case "yellow": return [255, 255, 0];
      case "white": return [255, 255, 255];
      case "blue": return [0, 100, 255];
      case "green": return [0, 255, 0];
      case "purple": return [128, 0, 128];
      case "darkred": return [139, 0, 0];
      case "cyan": return [0, 255, 255];
      case "pink": return [255, 192, 203];
      default: return [255, 255, 255];
    }
  }

  update(deltaTime: number) {
    this.x += this.vx * deltaTime;
    this.y += this.vy * deltaTime;
    
    this.vx *= this.friction;
    this.vy *= this.friction;
    
    this.life -= deltaTime / this.maxLife;
    this.alpha = Math.max(0, this.life);
    
    if (this.life <= 0) {
      this.life = 0;
    }
  }

  isDead(): boolean {
    return this.life <= 0;
  }
}
