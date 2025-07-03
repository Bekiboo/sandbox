export abstract class Entity {
  x: number;
  y: number;
  size: number;

  constructor(x: number, y: number, size: number) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  abstract update(deltaTime: number, ...args: any[]): void;
  abstract draw(ctx: CanvasRenderingContext2D): void;

  // Méthode utilitaire pour vérifier les collisions
  isCollidingWith(other: Entity): boolean {
    return Math.hypot(this.x - other.x, this.y - other.y) < this.size + other.size;
  }

  // Méthode utilitaire pour vérifier si l'entité est dans les limites du canvas
  isInBounds(width: number, height: number): boolean {
    return this.x >= 0 && this.x <= width && this.y >= 0 && this.y <= height;
  }
}
