export const GAME_CONFIG = {
  CANVAS: {
    WIDTH: 800,
    HEIGHT: 600,
  },
  PLAYER: {
    SPEED: 200,
    SIZE: 20,
    MAX_HEALTH: 100,
    INVULNERABILITY_DURATION: 2000, // ms
    FLICKER_INTERVAL: 100, // ms
  },
  ENEMY: {
    BASE: {
      SPEED: 50,
      SIZE: 16,
      HEALTH: 2,
      DAMAGE: 20,
    },
    TANK: {
      SPEED: 25,
      SIZE: 24,
      HEALTH: 10,
      DAMAGE: 30,
    },
    SHOOTER: {
      SPEED: 30,
      SIZE: 12,
      HEALTH: 2,
      DAMAGE: 15,
      ATTACK_RANGE: 150,
      SHOOT_COOLDOWN: 2000, // ms
      PROJECTILE_SPEED: 200,
    },
    SNIPER: {
      SPEED: 15,
      SIZE: 14,
      HEALTH: 3,
      DAMAGE: 80, // Massive damage
      SHOOT_COOLDOWN: 8000, // 8 seconds between shots
      AIM_DURATION: 1000, // 1 second aiming time
      EDGE_DISTANCE: 80, // Stay this far from edges
    },
    SPAWN_RADIUS: 100, // Minimum distance from player when spawning
    SPAWN_INTERVAL: 1000, // ms
  },
  PROJECTILE: {
    SPEED: 400,
    SIZE: 5,
    ACCURACY: 0.2, // radians of deviation
  },
  SHOOTING: {
    COOLDOWN: 0.3, // seconds
  },
  SCORING: {
    ENEMY_KILL: 10, // Points for killing an enemy
    SURVIVAL_BONUS: 1, // Points per second survived
  },
} as const;
