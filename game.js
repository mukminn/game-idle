// ============================================
// REAL IDLE RPG GAME - VISUAL CANVAS GAME
// Characters move, animate, and fight visually
// ============================================

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// ========== GAME STATE ==========
const GameState = {
    hero: {
        x: 200,
        y: canvas.height / 2,
        width: 80,
        height: 120,
        hp: 1000,
        maxHp: 1000,
        atk: 100,
        def: 50,
        level: 1,
        state: 'idle', // idle, attacking, hit, dead
        animFrame: 0,
        animTimer: 0,
        direction: 1 // 1 = right, -1 = left
    },
    
    enemy: {
        x: canvas.width - 300,
        y: canvas.height / 2,
        width: 80,
        height: 120,
        hp: 500,
        maxHp: 500,
        atk: 50,
        def: 25,
        level: 1,
        state: 'idle',
        animFrame: 0,
        animTimer: 0,
        direction: -1
    },
    
    battle: {
        active: true,
        speed: 1,
        lastAttackTime: 0,
        attackInterval: 2000
    },
    
    stage: {
        current: 1,
        subStage: 1,
        progress: 0,
        maxProgress: 100
    },
    
    currency: {
        bp: 0,
        crystal: 100
    },
    
    stats: {
        kills: 0,
        totalDamage: 0
    },
    
    effects: [],
    damageNumbers: []
};

// ========== CHARACTER DRAWING ==========
function drawHero() {
    const h = GameState.hero;
    ctx.save();
    ctx.translate(h.x, h.y);
    ctx.scale(h.direction, 1);
    
    // Body
    ctx.fillStyle = '#4a90e2';
    ctx.fillRect(-h.width/2, -h.height/2, h.width, h.height);
    
    // Head
    ctx.fillStyle = '#ffdbac';
    ctx.beginPath();
    ctx.arc(0, -h.height/2 + 20, 20, 0, Math.PI * 2);
    ctx.fill();
    
    // Weapon
    ctx.strokeStyle = '#8b4513';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(h.width/2 - 10, -20);
    ctx.lineTo(h.width/2 + 20, -20);
    ctx.stroke();
    
    // Attack animation
    if (h.state === 'attacking') {
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(h.width/2 + 20, -20);
        ctx.lineTo(h.width/2 + 40, -40);
        ctx.stroke();
    }
    
    // Hit flash
    if (h.state === 'hit') {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
        ctx.fillRect(-h.width/2, -h.height/2, h.width, h.height);
    }
    
    ctx.restore();
}

function drawEnemy() {
    const e = GameState.enemy;
    ctx.save();
    ctx.translate(e.x, e.y);
    ctx.scale(e.direction, 1);
    
    // Body
    ctx.fillStyle = '#8b0000';
    ctx.fillRect(-e.width/2, -e.height/2, e.width, e.height);
    
    // Head
    ctx.fillStyle = '#654321';
    ctx.beginPath();
    ctx.arc(0, -e.height/2 + 20, 20, 0, Math.PI * 2);
    ctx.fill();
    
    // Eyes
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(-8, -e.height/2 + 15, 6, 6);
    ctx.fillRect(2, -e.height/2 + 15, 6, 6);
    
    // Weapon
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-e.width/2 + 10, -20);
    ctx.lineTo(-e.width/2 - 20, -20);
    ctx.stroke();
    
    // Attack animation
    if (e.state === 'attacking') {
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(-e.width/2 - 20, -20);
        ctx.lineTo(-e.width/2 - 40, -40);
        ctx.stroke();
    }
    
    // Hit flash
    if (e.state === 'hit') {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
        ctx.fillRect(-e.width/2, -e.height/2, e.width, e.height);
    }
    
    // Death animation
    if (e.state === 'dead') {
        ctx.globalAlpha = 0.5;
        ctx.rotate(Math.PI / 4);
    }
    
    ctx.restore();
}

// ========== ANIMATIONS ==========
function updateHeroAnimation(deltaTime) {
    const h = GameState.hero;
    h.animTimer += deltaTime;
    
    switch(h.state) {
        case 'idle':
            // Idle breathing animation
            h.y = canvas.height / 2 + Math.sin(h.animTimer * 2) * 5;
            break;
            
        case 'attacking':
            // Attack forward motion
            if (h.animTimer < 0.2) {
                h.x += 30 * deltaTime * 10;
            } else if (h.animTimer < 0.4) {
                h.x -= 30 * deltaTime * 10;
            } else {
                h.x = 200;
                h.state = 'idle';
                h.animTimer = 0;
            }
            break;
            
        case 'hit':
            // Hit recoil
            if (h.animTimer < 0.15) {
                h.x -= 20 * deltaTime * 10;
            } else if (h.animTimer < 0.3) {
                h.x += 20 * deltaTime * 10;
            } else {
                h.x = 200;
                h.state = 'idle';
                h.animTimer = 0;
            }
            break;
    }
}

function updateEnemyAnimation(deltaTime) {
    const e = GameState.enemy;
    e.animTimer += deltaTime;
    
    switch(e.state) {
        case 'idle':
            // Idle breathing
            e.y = canvas.height / 2 + Math.sin(e.animTimer * 2) * 5;
            break;
            
        case 'attacking':
            // Attack forward motion
            if (e.animTimer < 0.2) {
                e.x -= 30 * deltaTime * 10;
            } else if (e.animTimer < 0.4) {
                e.x += 30 * deltaTime * 10;
            } else {
                e.x = canvas.width - 300;
                e.state = 'idle';
                e.animTimer = 0;
            }
            break;
            
        case 'hit':
            // Hit recoil
            if (e.animTimer < 0.15) {
                e.x += 20 * deltaTime * 10;
            } else if (e.animTimer < 0.3) {
                e.x -= 20 * deltaTime * 10;
            } else {
                e.x = canvas.width - 300;
                e.state = 'idle';
                e.animTimer = 0;
            }
            break;
            
        case 'dead':
            // Death fall
            e.y += 100 * deltaTime;
            if (e.y > canvas.height + 100) {
                spawnEnemy();
            }
            break;
    }
}

// ========== COMBAT ==========
function heroAttack() {
    const h = GameState.hero;
    const e = GameState.enemy;
    
    if (h.state !== 'idle' || e.hp <= 0) return;
    
    h.state = 'attacking';
    h.animTimer = 0;
    
    // Calculate damage
    const damage = Math.max(1, Math.floor(h.atk * (0.8 + Math.random() * 0.4) - e.def * 0.5));
    e.hp -= damage;
    GameState.stats.totalDamage += damage;
    
    // Show damage number
    showDamageNumber(e.x, e.y - 50, damage, false);
    
    // Set enemy to hit state
    if (e.hp > 0) {
        e.state = 'hit';
        e.animTimer = 0;
    } else {
        enemyDefeated();
    }
    
    updateUI();
}

function enemyAttack() {
    const h = GameState.hero;
    const e = GameState.enemy;
    
    if (e.state !== 'idle' || h.hp <= 0) return;
    
    e.state = 'attacking';
    e.animTimer = 0;
    
    // Calculate damage
    const damage = Math.max(1, Math.floor(e.atk * (0.8 + Math.random() * 0.4) - h.def * 0.3));
    h.hp -= damage;
    
    // Show damage number
    showDamageNumber(h.x, h.y - 50, damage, false);
    
    // Set hero to hit state
    if (h.hp > 0) {
        h.state = 'hit';
        h.animTimer = 0;
    } else {
        heroDefeated();
    }
    
    updateUI();
}

function enemyDefeated() {
    const e = GameState.enemy;
    e.state = 'dead';
    e.animTimer = 0;
    
    GameState.stats.kills++;
    
    // Rewards
    const bpReward = Math.floor(10 * GameState.stage.current);
    GameState.currency.bp += bpReward;
    
    // Show loot effect
    showLootEffect(e.x, e.y, bpReward);
    
    // Progress stage
    GameState.stage.progress += 10;
    if (GameState.stage.progress >= GameState.stage.maxProgress) {
        GameState.stage.subStage++;
        if (GameState.stage.subStage > 10) {
            GameState.stage.subStage = 1;
            GameState.stage.current++;
        }
        GameState.stage.progress = 0;
    }
    
    // Spawn new enemy after delay
    setTimeout(() => {
        spawnEnemy();
    }, 1000);
    
    updateUI();
}

function heroDefeated() {
    const h = GameState.hero;
    h.state = 'dead';
    
    // Respawn after 2 seconds
    setTimeout(() => {
        h.hp = h.maxHp;
        h.state = 'idle';
        h.x = 200;
        h.y = canvas.height / 2;
        updateUI();
    }, 2000);
}

function spawnEnemy() {
    const e = GameState.enemy;
    e.hp = 500 * GameState.stage.current;
    e.maxHp = e.hp;
    e.atk = 50 * GameState.stage.current;
    e.def = 25 * GameState.stage.current;
    e.state = 'idle';
    e.animTimer = 0;
    e.x = canvas.width - 300;
    e.y = canvas.height / 2;
    updateUI();
}

// ========== EFFECTS ==========
function showDamageNumber(x, y, damage, isCrit) {
    GameState.damageNumbers.push({
        x: x,
        y: y,
        value: damage,
        isCrit: isCrit,
        timer: 0,
        life: 1.0
    });
}

function updateDamageNumbers(deltaTime) {
    GameState.damageNumbers = GameState.damageNumbers.filter(dmg => {
        dmg.timer += deltaTime;
        dmg.y -= 50 * deltaTime;
        dmg.life -= deltaTime;
        return dmg.life > 0;
    });
}

function drawDamageNumbers() {
    GameState.damageNumbers.forEach(dmg => {
        ctx.save();
        ctx.globalAlpha = dmg.life;
        ctx.font = dmg.isCrit ? 'bold 32px Arial' : 'bold 24px Arial';
        ctx.fillStyle = dmg.isCrit ? '#ffd700' : '#ff4757';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.textAlign = 'center';
        ctx.strokeText(`-${dmg.value}`, dmg.x, dmg.y);
        ctx.fillText(`-${dmg.value}`, dmg.x, dmg.y);
        ctx.restore();
    });
}

function showLootEffect(x, y, amount) {
    GameState.effects.push({
        type: 'loot',
        x: x,
        y: y,
        timer: 0,
        life: 2.0,
        amount: amount
    });
}

function updateEffects(deltaTime) {
    GameState.effects = GameState.effects.filter(effect => {
        effect.timer += deltaTime;
        effect.y -= 30 * deltaTime;
        effect.life -= deltaTime;
        return effect.life > 0;
    });
}

function drawEffects() {
    GameState.effects.forEach(effect => {
        if (effect.type === 'loot') {
            ctx.save();
            ctx.globalAlpha = effect.life / 2;
            ctx.font = 'bold 20px Arial';
            ctx.fillStyle = '#f39c12';
            ctx.textAlign = 'center';
            ctx.fillText(`+${effect.amount} BP`, effect.x, effect.y);
            ctx.restore();
        }
    });
}

// ========== GAME LOOP ==========
let lastTime = 0;

function gameLoop(currentTime) {
    const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1);
    lastTime = currentTime;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    drawBackground();
    
    // Update animations
    updateHeroAnimation(deltaTime);
    updateEnemyAnimation(deltaTime);
    updateDamageNumbers(deltaTime);
    updateEffects(deltaTime);
    
    // Combat
    if (GameState.battle.active) {
        const now = Date.now();
        const interval = GameState.battle.attackInterval / GameState.battle.speed;
        
        if (now - GameState.battle.lastAttackTime >= interval) {
            GameState.battle.lastAttackTime = now;
            heroAttack();
            
            setTimeout(() => {
                if (GameState.enemy.hp > 0 && GameState.hero.hp > 0) {
                    enemyAttack();
                }
            }, interval * 0.5);
        }
    }
    
    // Draw characters
    drawHero();
    drawEnemy();
    
    // Draw effects
    drawDamageNumbers();
    drawEffects();
    
    requestAnimationFrame(gameLoop);
}

function drawBackground() {
    // Gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(0.5, '#0f3460');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Ground line
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 50);
    ctx.lineTo(canvas.width, canvas.height - 50);
    ctx.stroke();
}

// ========== UI UPDATES ==========
function updateUI() {
    // Hero HP
    const heroHpPercent = (GameState.hero.hp / GameState.hero.maxHp) * 100;
    const heroHpBar = document.getElementById('hero-hp-bar');
    if (heroHpBar) heroHpBar.style.width = heroHpPercent + '%';
    
    const heroHpText = document.getElementById('hero-hp-text');
    if (heroHpText) {
        heroHpText.textContent = `${Math.floor(GameState.hero.hp)}/${GameState.hero.maxHp}`;
    }
    
    // Enemy HP
    const enemyHpPercent = (GameState.enemy.hp / GameState.enemy.maxHp) * 100;
    const enemyHpBar = document.getElementById('enemy-hp-bar');
    if (enemyHpBar) enemyHpBar.style.width = enemyHpPercent + '%';
    
    const enemyHpText = document.getElementById('enemy-hp-text');
    if (enemyHpText) {
        enemyHpText.textContent = `${Math.floor(GameState.enemy.hp)}/${GameState.enemy.maxHp}`;
    }
    
    // Stats
    const statAtk = document.getElementById('stat-atk');
    if (statAtk) statAtk.textContent = GameState.hero.atk;
    
    const statDef = document.getElementById('stat-def');
    if (statDef) statDef.textContent = GameState.hero.def;
    
    const statKills = document.getElementById('stat-kills');
    if (statKills) statKills.textContent = GameState.stats.kills;
    
    // Stage
    const stageDisplay = document.getElementById('current-stage');
    if (stageDisplay) {
        stageDisplay.textContent = `${GameState.stage.current}-${GameState.stage.subStage}`;
    }
    
    const progressBar = document.getElementById('stage-progress');
    if (progressBar) {
        const progress = (GameState.stage.progress / GameState.stage.maxProgress) * 100;
        progressBar.style.width = progress + '%';
    }
    
    // Currency
    const bpDisplay = document.getElementById('currency-bp');
    if (bpDisplay) bpDisplay.textContent = formatNumber(GameState.currency.bp);
    
    // Level
    const levelDisplay = document.getElementById('player-level');
    if (levelDisplay) levelDisplay.textContent = GameState.hero.level;
    
    // Power
    const power = GameState.hero.atk * 10 + GameState.hero.def * 5 + GameState.hero.maxHp * 0.1;
    const powerDisplay = document.getElementById('total-power');
    if (powerDisplay) powerDisplay.textContent = formatNumber(Math.floor(power));
}

function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(2) + 'K';
    return Math.floor(num).toString();
}

// ========== INITIALIZE ==========
function init() {
    // Set initial positions
    GameState.hero.y = canvas.height / 2;
    GameState.enemy.y = canvas.height / 2;
    
    // Spawn first enemy
    spawnEnemy();
    
    // Start game loop
    requestAnimationFrame(gameLoop);
    
    // Update UI
    updateUI();
    
    // Speed controls
    document.querySelectorAll('.speed-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            GameState.battle.speed = parseInt(this.dataset.speed);
        });
    });
}

// Start game
init();
