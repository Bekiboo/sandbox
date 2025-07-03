// Game physics and collision detection worker
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
      
    case 'CALCULATE_PATHFINDING':
      const paths = calculatePathfinding(data);
      self.postMessage({ type: 'PATHFINDING_CALCULATED', data: paths });
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
  
  // Check projectile-enemy collisions
  projectiles.forEach((projectile, pIndex) => {
    enemies.forEach((enemy, eIndex) => {
      const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
      if (dist < projectile.size + enemy.size) {
        collisions.enemyProjectile.push({ projectileIndex: pIndex, enemyIndex: eIndex });
      }
    });
  });
  
  // Check player-enemy collisions
  enemies.forEach((enemy, eIndex) => {
    const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
    if (dist < player.size + enemy.size) {
      collisions.playerEnemy.push({ enemyIndex: eIndex });
    }
  });
  
  // Check enemy-enemy collisions
  for (let i = 0; i < enemies.length; i++) {
    for (let j = i + 1; j < enemies.length; j++) {
      const dist = Math.hypot(enemies[i].x - enemies[j].x, enemies[i].y - enemies[j].y);
      const minDistance = (enemies[i].size + enemies[j].size) * 0.5;
      
      if (dist < minDistance) {
        collisions.enemyEnemy.push({ 
          enemy1Index: i, 
          enemy2Index: j,
          overlap: minDistance - dist,
          distance: dist
        });
      }
    }
  }
  
  return collisions;
}

function calculatePathfinding(data) {
  // Advanced pathfinding algorithms can be implemented here
  // For now, simple direct path
  const { enemies, obstacles, playerX, playerY } = data;
  
  return enemies.map(enemy => {
    return {
      x: enemy.x,
      y: enemy.y,
      targetX: playerX,
      targetY: playerY,
      path: [{ x: playerX, y: playerY }] // Simple direct path
    };
  });
}
