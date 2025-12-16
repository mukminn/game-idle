// Game State
const gameState = {
    // Hero Stats
    hero: {
        level: 1,
        exp: 0,
        expMax: 100,
        hp: 1000,
        maxHp: 1000,
        atk: 100,
        def: 50,
        power: 150
    },
    
    // Equipment
    equipment: {
        weapon: { level: 0, atk: 0 },
        helmet: { level: 0, def: 0 },
        armor: { level: 0, def: 0 }
    },
    
    // Currency
    bp: 0,
    crystals: 100,
    
    // Battle
    currentStage: 1,
    enemy: {
        name: 'Goblin',
        hp: 500,
        maxHp: 500,
        atk: 50,
        def: 25
    },
    
    // Battle State
    battleActive: false,
    battleSpeed: 1,
    battleInterval: null,
    
    // Statistics
    totalKills: 0,
    totalBpEarned: 0,
    highestStage: 1,
    playtime: 0,
    
    // Upgrade Costs
    costs: {
        levelUp: 100,
        atkUpgrade: 50,
        defUpgrade: 50,
        hpUpgrade: 50,
        equipment: 50
    }
};

// Initialize Game
function initGame() {
    updateUI();
    startPlaytime();
    
    // Load from localStorage if available
    loadGame();
    
    // Auto-save every 30 seconds
    setInterval(saveGame, 30000);
}

// Update All UI Elements
function updateUI() {
    // Currency
    document.getElementById('bp').textContent = formatNumber(gameState.bp);
    document.getElementById('crystals').textContent = formatNumber(gameState.crystals);
    
    // Hero Stats
    document.getElementById('hero-level').textContent = gameState.hero.level;
    document.getElementById('hero-exp').textContent = gameState.hero.exp;
    document.getElementById('hero-exp-max').textContent = gameState.hero.expMax;
    document.getElementById('hero-hp-stat').textContent = gameState.hero.maxHp;
    document.getElementById('hero-atk-stat').textContent = gameState.hero.atk;
    document.getElementById('hero-def-stat').textContent = gameState.hero.def;
    document.getElementById('hero-power').textContent = calculatePower();
    
    // Hero HP Bar
    const heroHpPercent = (gameState.hero.hp / gameState.hero.maxHp) * 100;
    document.getElementById('hero-hp-bar').style.width = heroHpPercent + '%';
    document.getElementById('hero-hp-text').textContent = `${gameState.hero.hp}/${gameState.hero.maxHp}`;
    
    // Enemy Stats
    document.getElementById('current-stage').textContent = gameState.currentStage;
    document.getElementById('enemy-name').textContent = gameState.enemy.name;
    document.getElementById('enemy-name-display').textContent = gameState.enemy.name;
    document.getElementById('enemy-atk').textContent = gameState.enemy.atk;
    document.getElementById('enemy-def').textContent = gameState.enemy.def;
    
    // Enemy HP Bar
    const enemyHpPercent = (gameState.enemy.hp / gameState.enemy.maxHp) * 100;
    document.getElementById('enemy-hp-bar').style.width = enemyHpPercent + '%';
    document.getElementById('enemy-hp-text').textContent = `${gameState.enemy.hp}/${gameState.enemy.maxHp}`;
    
    // Upgrade Costs
    document.getElementById('level-up-cost').textContent = gameState.costs.levelUp;
    document.getElementById('atk-upgrade-cost').textContent = gameState.costs.atkUpgrade;
    document.getElementById('def-upgrade-cost').textContent = gameState.costs.defUpgrade;
    document.getElementById('hp-upgrade-cost').textContent = gameState.costs.hpUpgrade;
    
    // Equipment
    const totalAtk = gameState.equipment.weapon.atk;
    const totalDef = gameState.equipment.helmet.def + gameState.equipment.armor.def;
    document.getElementById('weapon-stat').textContent = `+${totalAtk} ATK`;
    document.getElementById('helmet-stat').textContent = `+${totalDef / 2} DEF`;
    document.getElementById('armor-stat').textContent = `+${totalDef / 2} DEF`;
    
    // Statistics
    document.getElementById('total-kills').textContent = gameState.totalKills;
    document.getElementById('total-bp-earned').textContent = formatNumber(gameState.totalBpEarned);
    document.getElementById('highest-stage').textContent = gameState.highestStage;
    document.getElementById('playtime').textContent = Math.floor(gameState.playtime);
    
    // Update button states
    updateButtonStates();
}

// Update Button States
function updateButtonStates() {
    document.getElementById('level-up-btn').disabled = gameState.bp < gameState.costs.levelUp;
    document.getElementById('atk-upgrade-btn').disabled = gameState.bp < gameState.costs.atkUpgrade;
    document.getElementById('def-upgrade-btn').disabled = gameState.bp < gameState.costs.defUpgrade;
    document.getElementById('hp-upgrade-btn').disabled = gameState.bp < gameState.costs.hpUpgrade;
    
    const equipCost = gameState.costs.equipment;
    document.getElementById('upgrade-weapon').disabled = gameState.bp < equipCost;
    document.getElementById('upgrade-helmet').disabled = gameState.bp < equipCost;
    document.getElementById('upgrade-armor').disabled = gameState.bp < equipCost;
}

// Calculate Total Power
function calculatePower() {
    const totalAtk = gameState.hero.atk + gameState.equipment.weapon.atk;
    const totalDef = gameState.hero.def + gameState.equipment.helmet.def + gameState.equipment.armor.def;
    return Math.floor((totalAtk * 10) + (totalDef * 5) + (gameState.hero.maxHp * 0.1));
}

// Battle System
function startBattle() {
    if (gameState.battleActive) {
        stopBattle();
        return;
    }
    
    gameState.battleActive = true;
    document.getElementById('toggle-battle').textContent = 'Stop Battle';
    document.getElementById('battle-status').textContent = 'Fighting...';
    document.getElementById('battle-status').style.background = '#f44336';
    
    const speed = parseInt(document.getElementById('battle-speed').value);
    const interval = 1000 / speed; // Convert to milliseconds
    
    gameState.battleInterval = setInterval(() => {
        performBattleTurn();
    }, interval);
}

function stopBattle() {
    gameState.battleActive = false;
    if (gameState.battleInterval) {
        clearInterval(gameState.battleInterval);
        gameState.battleInterval = null;
    }
    document.getElementById('toggle-battle').textContent = 'Start Battle';
    document.getElementById('battle-status').textContent = 'Stopped';
    document.getElementById('battle-status').style.background = '#9e9e9e';
}

function performBattleTurn() {
    // Hero attacks enemy
    const heroAtk = gameState.hero.atk + gameState.equipment.weapon.atk;
    const damageToEnemy = Math.max(1, heroAtk - gameState.enemy.def);
    gameState.enemy.hp -= damageToEnemy;
    
    addBattleLog(`Hero attacks for ${damageToEnemy} damage!`, 'log-damage');
    
    // Check if enemy is dead
    if (gameState.enemy.hp <= 0) {
        enemyDefeated();
        return;
    }
    
    // Enemy attacks hero
    const damageToHero = Math.max(1, gameState.enemy.atk - (gameState.hero.def + gameState.equipment.helmet.def + gameState.equipment.armor.def));
    gameState.hero.hp -= damageToHero;
    
    addBattleLog(`${gameState.enemy.name} attacks for ${damageToHero} damage!`, 'log-damage');
    
    // Check if hero is dead
    if (gameState.hero.hp <= 0) {
        heroDefeated();
        return;
    }
    
    updateUI();
}

function enemyDefeated() {
    gameState.enemy.hp = 0;
    
    // Calculate rewards
    const bpReward = Math.floor(10 * gameState.currentStage * 1.1);
    const expReward = Math.floor(10 * gameState.currentStage * 1.05);
    
    gameState.bp += bpReward;
    gameState.totalBpEarned += bpReward;
    gameState.hero.exp += expReward;
    gameState.totalKills++;
    
    addBattleLog(`Enemy defeated! +${bpReward} BP, +${expReward} EXP`, 'log-kill');
    
    // Check for level up
    checkLevelUp();
    
    // Spawn new enemy or progress stage
    spawnNewEnemy();
    
    updateUI();
}

function heroDefeated() {
    gameState.hero.hp = 0;
    addBattleLog('Hero defeated! Restarting...', 'log-damage');
    
    // Reset hero HP
    setTimeout(() => {
        gameState.hero.hp = gameState.hero.maxHp;
        updateUI();
    }, 2000);
}

function spawnNewEnemy() {
    // Progress stage every 10 kills
    if (gameState.totalKills % 10 === 0) {
        gameState.currentStage++;
        if (gameState.currentStage > gameState.highestStage) {
            gameState.highestStage = gameState.currentStage;
        }
    }
    
    // Scale enemy based on stage
    const stageMultiplier = 1 + (gameState.currentStage * 0.1);
    const baseHp = 500;
    const baseAtk = 50;
    const baseDef = 25;
    
    gameState.enemy = {
        name: getEnemyName(gameState.currentStage),
        hp: Math.floor(baseHp * Math.pow(gameState.currentStage, 1.15)),
        maxHp: Math.floor(baseHp * Math.pow(gameState.currentStage, 1.15)),
        atk: Math.floor(baseAtk * Math.pow(gameState.currentStage, 1.1)),
        def: Math.floor(baseDef * Math.pow(gameState.currentStage, 1.05))
    };
    
    // Heal hero
    gameState.hero.hp = gameState.hero.maxHp;
}

function getEnemyName(stage) {
    const enemies = ['Goblin', 'Orc', 'Troll', 'Demon', 'Dragon', 'Boss'];
    const index = Math.min(Math.floor(stage / 20), enemies.length - 1);
    return enemies[index];
}

function checkLevelUp() {
    while (gameState.hero.exp >= gameState.hero.expMax) {
        gameState.hero.exp -= gameState.hero.expMax;
        gameState.hero.level++;
        
        // Increase stats on level up
        gameState.hero.maxHp += 50;
        gameState.hero.hp = gameState.hero.maxHp;
        gameState.hero.atk += 5;
        gameState.hero.def += 2;
        
        // Calculate new exp requirement
        gameState.hero.expMax = Math.floor(100 * Math.pow(gameState.hero.level, 1.8));
        
        // Increase upgrade costs
        gameState.costs.levelUp = Math.floor(100 * Math.pow(gameState.hero.level, 1.5));
        gameState.costs.atkUpgrade = Math.floor(50 * Math.pow(gameState.hero.level, 1.2));
        gameState.costs.defUpgrade = Math.floor(50 * Math.pow(gameState.hero.level, 1.2));
        gameState.costs.hpUpgrade = Math.floor(50 * Math.pow(gameState.hero.level, 1.2));
        
        addBattleLog(`Level Up! Now Level ${gameState.hero.level}!`, 'log-level');
    }
}

function addBattleLog(message, className = '') {
    const log = document.getElementById('battle-log');
    const logEntry = document.createElement('div');
    logEntry.className = className;
    logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    log.insertBefore(logEntry, log.firstChild);
    
    // Keep only last 50 entries
    while (log.children.length > 50) {
        log.removeChild(log.lastChild);
    }
}

// Upgrade Functions
function levelUp() {
    if (gameState.bp >= gameState.costs.levelUp) {
        gameState.bp -= gameState.costs.levelUp;
        gameState.hero.expMax = Math.floor(100 * Math.pow(gameState.hero.level, 1.8));
        gameState.hero.exp = gameState.hero.expMax;
        checkLevelUp();
        updateUI();
    }
}

function upgradeAtk() {
    if (gameState.bp >= gameState.costs.atkUpgrade) {
        gameState.bp -= gameState.costs.atkUpgrade;
        gameState.hero.atk += 10;
        gameState.costs.atkUpgrade = Math.floor(gameState.costs.atkUpgrade * 1.2);
        updateUI();
    }
}

function upgradeDef() {
    if (gameState.bp >= gameState.costs.defUpgrade) {
        gameState.bp -= gameState.costs.defUpgrade;
        gameState.hero.def += 5;
        gameState.costs.defUpgrade = Math.floor(gameState.costs.defUpgrade * 1.2);
        updateUI();
    }
}

function upgradeHp() {
    if (gameState.bp >= gameState.costs.hpUpgrade) {
        gameState.bp -= gameState.costs.hpUpgrade;
        const hpIncrease = 100;
        gameState.hero.maxHp += hpIncrease;
        gameState.hero.hp += hpIncrease;
        gameState.costs.hpUpgrade = Math.floor(gameState.costs.hpUpgrade * 1.2);
        updateUI();
    }
}

function upgradeEquipment(type) {
    if (gameState.bp >= gameState.costs.equipment) {
        gameState.bp -= gameState.costs.equipment;
        
        if (type === 'weapon') {
            gameState.equipment.weapon.level++;
            gameState.equipment.weapon.atk += 10;
        } else if (type === 'helmet') {
            gameState.equipment.helmet.level++;
            gameState.equipment.helmet.def += 5;
        } else if (type === 'armor') {
            gameState.equipment.armor.level++;
            gameState.equipment.armor.def += 5;
        }
        
        gameState.costs.equipment = Math.floor(gameState.costs.equipment * 1.3);
        updateUI();
    }
}

// Utility Functions
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(2) + 'K';
    return num.toString();
}

function startPlaytime() {
    setInterval(() => {
        gameState.playtime++;
        updateUI();
    }, 1000);
}

// Save/Load Game
function saveGame() {
    localStorage.setItem('idleRPG_save', JSON.stringify(gameState));
}

function loadGame() {
    const save = localStorage.getItem('idleRPG_save');
    if (save) {
        try {
            const loaded = JSON.parse(save);
            Object.assign(gameState, loaded);
            updateUI();
        } catch (e) {
            console.error('Failed to load save:', e);
        }
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initGame();
    
    // Battle Controls
    document.getElementById('toggle-battle').addEventListener('click', startBattle);
    document.getElementById('battle-speed').addEventListener('change', (e) => {
        if (gameState.battleActive) {
            stopBattle();
            startBattle();
        }
    });
    
    // Upgrades
    document.getElementById('level-up-btn').addEventListener('click', levelUp);
    document.getElementById('atk-upgrade-btn').addEventListener('click', upgradeAtk);
    document.getElementById('def-upgrade-btn').addEventListener('click', upgradeDef);
    document.getElementById('hp-upgrade-btn').addEventListener('click', upgradeHp);
    
    // Equipment
    document.getElementById('upgrade-weapon').addEventListener('click', () => upgradeEquipment('weapon'));
    document.getElementById('upgrade-helmet').addEventListener('click', () => upgradeEquipment('helmet'));
    document.getElementById('upgrade-armor').addEventListener('click', () => upgradeEquipment('armor'));
    
    // Auto-save on page unload
    window.addEventListener('beforeunload', saveGame);
});

