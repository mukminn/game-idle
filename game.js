// Game State
const gameState = {
    // Hero Stats
    hero: {
        level: 38,
        exp: 45,
        expMax: 2100,
        hp: 346,
        maxHp: 1000,
        atk: 100,
        def: 50,
        power: 362300
    },
    
    // Equipment
    equipment: {
        weapon: { level: 37, atk: 370 },
        helmet: { level: 34, def: 170 },
        chest: { level: 37, def: 185 },
        shield: { level: 36, def: 180 },
        necklace: { level: 36, def: 180 },
        pants: { level: 39, def: 195 },
        belt: { level: 36, def: 180 },
        gloves: { level: 36, def: 180 },
        wings: { stage: 1, level: 0 }
    },
    
    // Currency
    gold: 41247,
    crystals: 1613,
    hex: 7588.85,
    bp: 0,
    
    // Battle
    currentStage: 4,
    currentSubStage: 1,
    stageName: 'Blazing Desert Wastes',
    enemy: {
        name: 'Bear',
        hp: 405,
        maxHp: 500,
        atk: 50,
        def: 25
    },
    
    // Battle State
    battleActive: false,
    battleSpeed: 1.6,
    battleInterval: null,
    
    // VIP
    vipLevel: 0,
    
    // Statistics
    totalKills: 0,
    totalBpEarned: 0,
    highestStage: 4,
    playtime: 0,
    
    // Quest
    quest: {
        type: 'arena',
        current: 0,
        target: 1,
        reward: 500
    },
    
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
    generateProgressSquares();
    
    // Load from localStorage if available
    loadGame();
    
    // Auto-save every 30 seconds
    setInterval(saveGame, 30000);
    
    // Auto-start battle (only if tutorial not shown)
    const tutorialShown = localStorage.getItem('tutorial_shown');
    if (tutorialShown) {
        setTimeout(() => {
            startBattle();
        }, 1000);
    }
}

// Generate Progress Squares
function generateProgressSquares() {
    const container = document.getElementById('progress-squares');
    container.innerHTML = '';
    const totalSquares = 10;
    const currentSquare = gameState.currentSubStage;
    
    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        square.className = 'progress-square';
        
        if (i < currentSquare - 1) {
            square.classList.add('completed');
        } else if (i === currentSquare - 1) {
            square.classList.add('active');
        }
        
        container.appendChild(square);
    }
}

// Update All UI Elements
function updateUI() {
    // VIP
    document.getElementById('vip-level').textContent = gameState.vipLevel;
    
    // Power
    document.getElementById('total-power').textContent = formatNumber(gameState.hero.power);
    
    // Currencies
    document.getElementById('gold-amount').textContent = formatNumber(gameState.gold);
    document.getElementById('crystal-amount').textContent = formatNumber(gameState.crystals);
    document.getElementById('hex-amount').textContent = formatNumber(gameState.hex);
    document.getElementById('nav-currency').textContent = formatNumber(gameState.gold);
    
    // Stage
    document.getElementById('stage-name').textContent = `${gameState.stageName} ${gameState.currentStage}-${gameState.currentSubStage}`;
    
    // Hero Level & EXP
    document.getElementById('hero-level-display').textContent = gameState.hero.level;
    const expPercent = (gameState.hero.exp / gameState.hero.expMax) * 100;
    document.getElementById('exp-bar-fill').style.width = expPercent + '%';
    document.getElementById('exp-text').textContent = `${gameState.hero.exp}/${formatNumber(gameState.hero.expMax)}`;
    
    // Battle Speed
    document.getElementById('battle-speed-display').textContent = gameState.battleSpeed.toFixed(1);
    
    // Update battle status text
    const battleStatusText = document.getElementById('battle-status-text');
    if (battleStatusText) {
        battleStatusText.textContent = gameState.battleActive ? '⚔️ Auto Battle: ON' : '⚔️ Auto Battle: OFF';
    }
    
    // Hero HP Bar
    const heroHpPercent = (gameState.hero.hp / gameState.hero.maxHp) * 100;
    document.getElementById('hero-hp-fill').style.width = heroHpPercent + '%';
    document.getElementById('hero-hp-text').textContent = Math.floor(gameState.hero.hp);
    
    // Enemy HP Bar
    const enemyHpPercent = (gameState.enemy.hp / gameState.enemy.maxHp) * 100;
    document.getElementById('enemy-hp-fill').style.width = enemyHpPercent + '%';
    document.getElementById('enemy-hp-text').textContent = Math.floor(gameState.enemy.hp);
    
    // Equipment Levels
    document.getElementById('weapon-level').textContent = gameState.equipment.weapon.level;
    document.getElementById('chest-level').textContent = gameState.equipment.chest.level;
    document.getElementById('helmet-level').textContent = gameState.equipment.helmet.level;
    document.getElementById('shield-level').textContent = gameState.equipment.shield.level;
    document.getElementById('necklace-level').textContent = gameState.equipment.necklace.level;
    document.getElementById('pants-level').textContent = gameState.equipment.pants.level;
    document.getElementById('belt-level').textContent = gameState.equipment.belt.level;
    document.getElementById('gloves-level').textContent = gameState.equipment.gloves.level;
    document.getElementById('wings-stage').textContent = gameState.equipment.wings.stage;
    
    // Quest
    document.getElementById('quest-progress').textContent = gameState.quest.current;
    document.getElementById('quest-target').textContent = gameState.quest.target;
    document.getElementById('quest-reward').textContent = gameState.quest.reward;
    
    // Update Power
    gameState.hero.power = calculatePower();
    document.getElementById('total-power').textContent = formatNumber(gameState.hero.power);
}

// Calculate Total Power
function calculatePower() {
    const totalAtk = gameState.hero.atk + gameState.equipment.weapon.atk;
    const totalDef = gameState.hero.def + 
        gameState.equipment.helmet.def + 
        gameState.equipment.chest.def + 
        gameState.equipment.shield.def + 
        gameState.equipment.necklace.def + 
        gameState.equipment.pants.def + 
        gameState.equipment.belt.def + 
        gameState.equipment.gloves.def;
    return Math.floor((totalAtk * 100) + (totalDef * 50) + (gameState.hero.maxHp * 10) + (gameState.hero.level * 1000));
}

// Battle System
function startBattle() {
    if (gameState.battleActive) {
        return;
    }
    
    gameState.battleActive = true;
    
    const interval = 1000 / gameState.battleSpeed; // Convert to milliseconds
    
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
}

function performBattleTurn() {
    // Hero attacks enemy
    const heroAtk = gameState.hero.atk + gameState.equipment.weapon.atk;
    const damageToEnemy = Math.max(1, Math.floor(heroAtk * (0.8 + Math.random() * 0.4)) - gameState.enemy.def);
    
    // Attack animation
    triggerAttackAnimation('hero');
    setTimeout(() => {
        gameState.enemy.hp -= damageToEnemy;
        showDamageNumber('enemy-damage', damageToEnemy);
        createDamageParticles('enemy-particles', damageToEnemy);
        triggerHitAnimation('enemy');
        
        // Check if enemy is dead
        if (gameState.enemy.hp <= 0) {
            enemyDefeated();
            return;
        }
        
        // Enemy attacks hero (after delay)
        setTimeout(() => {
            const damageToHero = Math.max(1, Math.floor(gameState.enemy.atk * (0.8 + Math.random() * 0.4)) - 
                (gameState.hero.def + 
                 gameState.equipment.helmet.def + 
                 gameState.equipment.chest.def + 
                 gameState.equipment.shield.def));
            
            triggerAttackAnimation('enemy');
            setTimeout(() => {
                gameState.hero.hp -= damageToHero;
                showDamageNumber('hero-damage', damageToHero);
                createDamageParticles('hero-particles', damageToHero);
                triggerHitAnimation('hero');
                
                // Check if hero is dead
                if (gameState.hero.hp <= 0) {
                    heroDefeated();
                    return;
                }
                
                updateUI();
            }, 200);
        }, 300);
        
        updateUI();
    }, 200);
}

function triggerAttackAnimation(character) {
    const charElement = document.querySelector(`.${character === 'hero' ? 'hero' : 'enemy'}-character`);
    const effectElement = document.getElementById(`${character}-attack-effect`);
    
    if (charElement) {
        charElement.classList.add('attacking');
        setTimeout(() => {
            charElement.classList.remove('attacking');
        }, 300);
    }
    
    if (effectElement) {
        effectElement.classList.add('active');
        setTimeout(() => {
            effectElement.classList.remove('active');
        }, 400);
    }
}

function triggerHitAnimation(character) {
    const charElement = document.querySelector(`.${character === 'hero' ? 'hero' : 'enemy'}-character`);
    
    if (charElement) {
        charElement.classList.add('hit');
        setTimeout(() => {
            charElement.classList.remove('hit');
        }, 300);
    }
}

function createDamageParticles(containerId, damage) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const particle = document.createElement('div');
    particle.className = 'damage-particle';
    particle.textContent = `-${Math.floor(damage)}`;
    particle.style.setProperty('--random-x', Math.random());
    particle.style.left = '50%';
    particle.style.top = '50%';
    
    container.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 1000);
}

function showDamageNumber(elementId, damage) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = Math.floor(damage);
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = 'floatUp 1s ease-out forwards';
        }, 10);
    }
}

function enemyDefeated() {
    gameState.enemy.hp = 0;
    
    // Calculate rewards
    const goldReward = Math.floor(10 * gameState.currentStage * 1.1);
    const expReward = Math.floor(10 * gameState.currentStage * 1.05);
    
    gameState.gold += goldReward;
    gameState.totalBpEarned += goldReward;
    gameState.hero.exp += expReward;
    gameState.totalKills++;
    
    // Show reward popup
    showRewardPopup(goldReward, expReward);
    
    // Show reward message
    if (gameState.totalKills % 5 === 0) {
        showStatusMessage(`💰 +${goldReward} Gold | +${expReward} EXP | Total Kills: ${gameState.totalKills}`, 2000);
    }
    
    // Check for level up
    const oldLevel = gameState.hero.level;
    checkLevelUp();
    if (gameState.hero.level > oldLevel) {
        showStatusMessage(`🎉 LEVEL UP! Level ${gameState.hero.level}!`, 3000);
    }
    
    // Progress stage
    if (gameState.totalKills % 10 === 0) {
        gameState.currentSubStage++;
        if (gameState.currentSubStage > 10) {
            gameState.currentSubStage = 1;
            gameState.currentStage++;
            if (gameState.currentStage > gameState.highestStage) {
                gameState.highestStage = gameState.currentStage;
            }
            showStatusMessage(`🌟 Stage ${gameState.currentStage} Unlocked!`, 3000);
        }
        generateProgressSquares();
    }
    
    // Spawn new enemy after delay
    setTimeout(() => {
        spawnNewEnemy();
        updateUI();
    }, 500);
}

function showRewardPopup(gold, exp) {
    const popup = document.getElementById('reward-popup');
    const goldAmount = document.getElementById('reward-gold');
    
    if (popup && goldAmount) {
        goldAmount.textContent = `+${formatNumber(gold)}`;
        popup.classList.add('show');
        
        setTimeout(() => {
            popup.classList.remove('show');
        }, 1500);
    }
}

function heroDefeated() {
    gameState.hero.hp = 0;
    
    // Reset hero HP after 2 seconds
    setTimeout(() => {
        gameState.hero.hp = gameState.hero.maxHp;
        updateUI();
    }, 2000);
}

function spawnNewEnemy() {
    // Scale enemy based on stage
    const stageMultiplier = 1 + (gameState.currentStage * 0.1);
    const baseHp = 500;
    const baseAtk = 50;
    const baseDef = 25;
    
    const enemyNames = ['Goblin', 'Orc', 'Bear', 'Troll', 'Demon', 'Dragon'];
    const enemyIndex = Math.min(Math.floor(gameState.currentStage / 5), enemyNames.length - 1);
    
    gameState.enemy = {
        name: enemyNames[enemyIndex],
        hp: Math.floor(baseHp * Math.pow(gameState.currentStage, 1.15)),
        maxHp: Math.floor(baseHp * Math.pow(gameState.currentStage, 1.15)),
        atk: Math.floor(baseAtk * Math.pow(gameState.currentStage, 1.1)),
        def: Math.floor(baseDef * Math.pow(gameState.currentStage, 1.05))
    };
    
    // Heal hero
    gameState.hero.hp = gameState.hero.maxHp;
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
    }
}

// Equipment Upgrade Function
function upgradeEquipment(slotType) {
    if (!gameState.equipment[slotType]) {
        showStatusMessage('❌ Equipment slot tidak valid!', 2000);
        return;
    }
    
    const cost = gameState.costs.equipment * (gameState.equipment[slotType].level + 1);
    
    if (gameState.gold < cost) {
        showStatusMessage(`💰 Tidak cukup Gold! Butuh ${formatNumber(cost)}`, 2000);
        return;
    }
    
    gameState.gold -= cost;
    gameState.equipment[slotType].level++;
    
    // Increase stats based on equipment type
    if (slotType === 'weapon') {
        gameState.equipment[slotType].atk += 10;
    } else {
        gameState.equipment[slotType].def = (gameState.equipment[slotType].def || 0) + 5;
    }
    
    showStatusMessage(`⬆️ ${slotType.toUpperCase()} upgraded to Level ${gameState.equipment[slotType].level}!`, 2000);
    updateUI();
    saveGame();
}

// Utility Functions
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(2) + 'K';
    return num.toLocaleString();
}

function startPlaytime() {
    setInterval(() => {
        gameState.playtime++;
    }, 1000);
    
    // Update time display
    setInterval(() => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const timeDisplay = document.getElementById('time-display');
        if (timeDisplay) {
            timeDisplay.textContent = `${hours}:${minutes}`;
        }
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
            generateProgressSquares();
        } catch (e) {
            console.error('Failed to load save:', e);
        }
    }
}

// Tutorial Functions
let currentTutorialStep = 1;
const totalTutorialSteps = 3;

function nextTutorial() {
    document.getElementById(`step-${currentTutorialStep}`).classList.remove('active');
    currentTutorialStep++;
    if (currentTutorialStep > totalTutorialSteps) {
        closeTutorial();
    } else {
        document.getElementById(`step-${currentTutorialStep}`).classList.add('active');
    }
}

function closeTutorial() {
    document.getElementById('tutorial-overlay').classList.add('hidden');
    localStorage.setItem('tutorial_shown', 'true');
    showStatusMessage('🎮 Game dimulai! Pertarungan berjalan otomatis...');
    startBattle();
}

// Show Status Message
function showStatusMessage(message, duration = 3000) {
    const statusMsg = document.getElementById('status-message');
    statusMsg.textContent = message;
    statusMsg.classList.add('show');
    
    setTimeout(() => {
        statusMsg.classList.remove('show');
    }, duration);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Check if tutorial already shown
    const tutorialShown = localStorage.getItem('tutorial_shown');
    if (tutorialShown) {
        document.getElementById('tutorial-overlay').classList.add('hidden');
    }
    
    initGame();
    
    // Sidebar buttons
    document.querySelectorAll('.sidebar-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const feature = this.dataset.feature;
            console.log(`Feature clicked: ${feature}`);
            // Add feature functionality here
        });
    });
    
    // Navigation items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            const nav = this.dataset.nav;
            console.log(`Navigation: ${nav}`);
            // Add navigation functionality here
        });
    });
    
    // Equipment slots
    document.querySelectorAll('.equip-slot').forEach(slot => {
        slot.addEventListener('click', function() {
            const slotType = this.dataset.slot;
            upgradeEquipment(slotType);
        });
    });
    
    // Boss chest
    document.querySelector('.chest-icon')?.addEventListener('click', function() {
        console.log('Boss chest clicked!');
        // Add boss battle functionality here
    });
    
    // Auto-save on page unload
    window.addEventListener('beforeunload', saveGame);
});
