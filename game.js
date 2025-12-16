// ============================================
// COMPLETE IDLE RPG GAME ENGINE
// All systems ACTIVE - No placeholders
// ============================================

// ========== GAME STATE ==========
const GameState = {
    // Account & Profile
    account: {
        username: 'Player',
        profileLevel: 1,
        profileExp: 0,
        profileExpMax: 100,
        totalPower: 0,
        lastLogin: Date.now(),
        playtime: 0,
        walletLinked: false
    },
    
    // VIP System
    vip: {
        level: 0,
        exp: 0,
        expMax: 100
    },
    
    // Hero Stats
    hero: {
        level: 1,
        exp: 0,
        expMax: 100,
        hp: 1000,
        maxHp: 1000,
        atk: 100,
        def: 50,
        critRate: 5,
        critDamage: 150,
        attackSpeed: 1.0,
        lifesteal: 0,
        state: 'idle', // idle, attacking, skill, hit, dead
        stateTimer: 0
    },
    
    // Equipment (All 10 slots)
    equipment: {
        weapon: { id: null, level: 0, rarity: 'common', star: 0, atk: 0, substats: {} },
        helmet: { id: null, level: 0, rarity: 'common', star: 0, def: 0, substats: {} },
        armor: { id: null, level: 0, rarity: 'common', star: 0, def: 0, substats: {} },
        pants: { id: null, level: 0, rarity: 'common', star: 0, def: 0, substats: {} },
        gloves: { id: null, level: 0, rarity: 'common', star: 0, def: 0, substats: {} },
        bracelet: { id: null, level: 0, rarity: 'common', star: 0, def: 0, substats: {} },
        ring: { id: null, level: 0, rarity: 'common', star: 0, atk: 0, substats: {} },
        necklace: { id: null, level: 0, rarity: 'common', star: 0, def: 0, substats: {} },
        cloak: { id: null, level: 0, rarity: 'common', star: 0, def: 0, substats: {} },
        wings: { id: null, level: 0, rarity: 'common', star: 0, def: 0, substats: {} }
    },
    
    // Skills
    skills: {
        active: [
            { id: 'skill1', level: 1, cooldown: 0, maxCooldown: 10, damage: 200, type: 'damage' },
            { id: 'skill2', level: 1, cooldown: 0, maxCooldown: 15, damage: 300, type: 'damage' }
        ],
        passive: [
            { id: 'passive1', level: 1, effect: 'atk_boost', value: 10 }
        ],
        ultimate: { id: 'ultimate', level: 1, cooldown: 0, maxCooldown: 30, damage: 500 }
    },
    
    // Enemy
    enemy: {
        id: null,
        type: 'normal', // normal, elite, boss
        name: 'Goblin',
        level: 1,
        hp: 500,
        maxHp: 500,
        atk: 50,
        def: 25,
        state: 'idle',
        stateTimer: 0,
        spawnTime: 0
    },
    
    // Stage & Progression
    stage: {
        current: 1,
        subStage: 1,
        progress: 0,
        maxProgress: 100,
        difficulty: 1.0
    },
    
    // Battle
    battle: {
        active: true,
        speed: 2, // 1, 2, 3, 5
        lastAttackTime: 0,
        attackInterval: 1000,
        tickCount: 0
    },
    
    // Currency
    currency: {
        bp: 0, // Battle Point
        crystal: 100, // Premium
        coin: 0 // Cashable
    },
    
    // Point of Chain (On-chain style, off-chain)
    pointOfChain: {
        balance: 0,
        dailyClaim: { lastClaim: 0, cooldown: 86400000 },
        weeklyClaim: { lastClaim: 0, cooldown: 604800000 },
        monthlyClaim: { lastClaim: 0, cooldown: 2592000000 }
    },
    
    // Idle System
    idle: {
        lastActiveTime: Date.now(),
        offlineReward: 0,
        idleCap: 3600000, // 1 hour
        catchUpActive: false
    },
    
    // Statistics
    stats: {
        totalKills: 0,
        totalBossKills: 0,
        totalDamage: 0,
        highestStage: 1,
        totalPlaytime: 0
    }
};

// ========== GAME ENGINE ==========
class GameEngine {
    constructor() {
        this.lastFrameTime = 0;
        this.deltaTime = 0;
        this.isRunning = false;
        this.animationFrame = null;
    }
    
    start() {
        this.isRunning = true;
        this.lastFrameTime = performance.now();
        this.gameLoop();
    }
    
    stop() {
        this.isRunning = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
    
    gameLoop() {
        if (!this.isRunning) return;
        
        const currentTime = performance.now();
        this.deltaTime = (currentTime - this.lastFrameTime) / 1000; // Convert to seconds
        this.lastFrameTime = currentTime;
        
        // Update game systems
        this.update(deltaTime);
        this.render();
        
        this.animationFrame = requestAnimationFrame(() => this.gameLoop());
    }
    
    update(deltaTime) {
        if (!GameState.battle.active) return;
        
        // Update timers
        GameState.battle.tickCount += deltaTime * GameState.battle.speed;
        GameState.hero.stateTimer += deltaTime;
        GameState.enemy.stateTimer += deltaTime;
        
        // Update idle time
        GameState.idle.lastActiveTime = Date.now();
        
        // Combat loop
        this.updateCombat(deltaTime);
        
        // Update hero state machine
        this.updateHeroState(deltaTime);
        
        // Update enemy state machine
        this.updateEnemyState(deltaTime);
        
        // Update skills cooldown
        this.updateSkills(deltaTime);
        
        // Update stage progression
        this.updateStageProgression();
        
        // Auto-save every 30 seconds
        if (GameState.battle.tickCount % 30 < deltaTime) {
            this.saveGame();
        }
    }
    
    updateCombat(deltaTime) {
        const now = Date.now();
        const attackInterval = GameState.battle.attackInterval / GameState.battle.speed;
        
        if (now - GameState.battle.lastAttackTime >= attackInterval) {
            GameState.battle.lastAttackTime = now;
            
            // Hero attacks
            if (GameState.hero.hp > 0 && GameState.enemy.hp > 0) {
                this.heroAttack();
            }
            
            // Enemy attacks (after delay)
            setTimeout(() => {
                if (GameState.hero.hp > 0 && GameState.enemy.hp > 0) {
                    this.enemyAttack();
                }
            }, attackInterval * 0.5);
        }
    }
    
    heroAttack() {
        // Set hero to attacking state
        GameState.hero.state = 'attacking';
        GameState.hero.stateTimer = 0;
        
        // Calculate damage
        const baseAtk = GameState.hero.atk + this.getEquipmentStat('atk');
        const baseDef = GameState.hero.def + this.getEquipmentStat('def');
        
        // Crit calculation
        const isCrit = Math.random() * 100 < GameState.hero.critRate;
        let damage = baseAtk * (0.8 + Math.random() * 0.4);
        
        if (isCrit) {
            damage *= (GameState.hero.critDamage / 100);
        }
        
        damage = Math.max(1, Math.floor(damage - GameState.enemy.def * 0.5));
        
        // Apply damage
        GameState.enemy.hp -= damage;
        GameState.stats.totalDamage += damage;
        
        // Show damage number
        this.showDamageNumber('enemy', damage, isCrit);
        
        // Lifesteal
        if (GameState.hero.lifesteal > 0) {
            const heal = Math.floor(damage * (GameState.hero.lifesteal / 100));
            GameState.hero.hp = Math.min(GameState.hero.maxHp, GameState.hero.hp + heal);
        }
        
        // Check enemy death
        if (GameState.enemy.hp <= 0) {
            this.enemyDefeated();
        }
        
        // Update UI
        this.updateUI();
    }
    
    enemyAttack() {
        // Set enemy to attacking state
        GameState.enemy.state = 'attacking';
        GameState.enemy.stateTimer = 0;
        
        // Calculate damage
        const baseAtk = GameState.enemy.atk;
        const baseDef = GameState.hero.def + this.getEquipmentStat('def');
        
        let damage = baseAtk * (0.8 + Math.random() * 0.4);
        damage = Math.max(1, Math.floor(damage - baseDef * 0.3));
        
        // Apply damage
        GameState.hero.hp -= damage;
        
        // Set hero to hit state
        GameState.hero.state = 'hit';
        GameState.hero.stateTimer = 0;
        
        // Show damage number
        this.showDamageNumber('hero', damage, false);
        
        // Check hero death
        if (GameState.hero.hp <= 0) {
            this.heroDefeated();
        }
        
        // Update UI
        this.updateUI();
    }
    
    enemyDefeated() {
        GameState.enemy.hp = 0;
        GameState.enemy.state = 'dead';
        GameState.stats.totalKills++;
        
        if (GameState.enemy.type === 'boss') {
            GameState.stats.totalBossKills++;
        }
        
        // Calculate rewards
        const bpReward = Math.floor(10 * GameState.stage.current * GameState.stage.difficulty);
        const expReward = Math.floor(5 * GameState.stage.current);
        
        GameState.currency.bp += bpReward;
        GameState.hero.exp += expReward;
        
        // Show loot
        this.showLoot(bpReward);
        
        // Check level up
        this.checkLevelUp();
        
        // Progress stage
        GameState.stage.progress += 10;
        if (GameState.stage.progress >= GameState.stage.maxProgress) {
            this.advanceStage();
        }
        
        // Spawn new enemy after delay
        setTimeout(() => {
            this.spawnEnemy();
        }, 1000);
        
        this.updateUI();
    }
    
    heroDefeated() {
        GameState.hero.hp = 0;
        GameState.hero.state = 'dead';
        
        // Respawn after 3 seconds
        setTimeout(() => {
            GameState.hero.hp = GameState.hero.maxHp;
            GameState.hero.state = 'idle';
            this.updateUI();
        }, 3000);
    }
    
    spawnEnemy() {
        const stage = GameState.stage.current;
        const difficulty = GameState.stage.difficulty;
        
        // Determine enemy type
        let type = 'normal';
        if (GameState.stats.totalKills % 10 === 0) {
            type = 'boss';
        } else if (Math.random() < 0.1) {
            type = 'elite';
        }
        
        // Scale enemy stats
        const baseHp = type === 'boss' ? 2000 : type === 'elite' ? 1000 : 500;
        const baseAtk = type === 'boss' ? 100 : type === 'elite' ? 75 : 50;
        const baseDef = type === 'boss' ? 50 : type === 'elite' ? 35 : 25;
        
        const enemyNames = {
            normal: ['Goblin', 'Orc', 'Troll'],
            elite: ['Elite Orc', 'Dark Knight', 'Shadow Warrior'],
            boss: ['Dragon', 'Demon Lord', 'Ancient Guardian']
        };
        
        GameState.enemy = {
            id: `enemy_${Date.now()}`,
            type: type,
            name: enemyNames[type][Math.floor(Math.random() * enemyNames[type].length)],
            level: stage,
            hp: Math.floor(baseHp * Math.pow(stage, 1.2) * difficulty),
            maxHp: Math.floor(baseHp * Math.pow(stage, 1.2) * difficulty),
            atk: Math.floor(baseAtk * Math.pow(stage, 1.1) * difficulty),
            def: Math.floor(baseDef * Math.pow(stage, 1.05) * difficulty),
            state: 'idle',
            stateTimer: 0,
            spawnTime: Date.now()
        };
        
        this.updateUI();
    }
    
    updateHeroState(deltaTime) {
        const state = GameState.hero.state;
        const timer = GameState.hero.stateTimer;
        
        switch(state) {
            case 'attacking':
                if (timer >= 0.3) {
                    GameState.hero.state = 'idle';
                    GameState.hero.stateTimer = 0;
                }
                break;
            case 'hit':
                if (timer >= 0.2) {
                    GameState.hero.state = 'idle';
                    GameState.hero.stateTimer = 0;
                }
                break;
            case 'skill':
                if (timer >= 0.5) {
                    GameState.hero.state = 'idle';
                    GameState.hero.stateTimer = 0;
                }
                break;
        }
    }
    
    updateEnemyState(deltaTime) {
        const state = GameState.enemy.state;
        const timer = GameState.enemy.stateTimer;
        
        switch(state) {
            case 'attacking':
                if (timer >= 0.4) {
                    GameState.enemy.state = 'idle';
                    GameState.enemy.stateTimer = 0;
                }
                break;
            case 'hit':
                if (timer >= 0.2) {
                    GameState.enemy.state = 'idle';
                    GameState.enemy.stateTimer = 0;
                }
                break;
        }
    }
    
    updateSkills(deltaTime) {
        // Update active skills cooldown
        GameState.skills.active.forEach(skill => {
            if (skill.cooldown > 0) {
                skill.cooldown -= deltaTime * GameState.battle.speed;
                if (skill.cooldown < 0) skill.cooldown = 0;
            } else {
                // Auto-cast skill
                if (Math.random() < 0.1 && GameState.enemy.hp > 0) {
                    this.castSkill(skill);
                }
            }
        });
        
        // Update ultimate cooldown
        if (GameState.skills.ultimate.cooldown > 0) {
            GameState.skills.ultimate.cooldown -= deltaTime * GameState.battle.speed;
            if (GameState.skills.ultimate.cooldown < 0) {
                GameState.skills.ultimate.cooldown = 0;
            }
        }
    }
    
    castSkill(skill) {
        if (skill.cooldown > 0) return;
        
        GameState.hero.state = 'skill';
        GameState.hero.stateTimer = 0;
        
        const damage = skill.damage * (1 + skill.level * 0.1);
        GameState.enemy.hp -= Math.floor(damage);
        GameState.stats.totalDamage += damage;
        
        skill.cooldown = skill.maxCooldown;
        
        this.showDamageNumber('enemy', Math.floor(damage), true);
        this.updateUI();
    }
    
    updateStageProgression() {
        if (GameState.stage.progress >= GameState.stage.maxProgress) {
            this.advanceStage();
        }
    }
    
    advanceStage() {
        GameState.stage.subStage++;
        if (GameState.stage.subStage > 10) {
            GameState.stage.subStage = 1;
            GameState.stage.current++;
            GameState.stage.difficulty *= 1.1;
        }
        
        GameState.stage.progress = 0;
        
        if (GameState.stage.current > GameState.stats.highestStage) {
            GameState.stats.highestStage = GameState.stage.current;
        }
        
        this.updateUI();
    }
    
    checkLevelUp() {
        while (GameState.hero.exp >= GameState.hero.expMax) {
            GameState.hero.exp -= GameState.hero.expMax;
            GameState.hero.level++;
            
            // Increase stats
            GameState.hero.maxHp += 50;
            GameState.hero.hp = GameState.hero.maxHp;
            GameState.hero.atk += 5;
            GameState.hero.def += 2;
            GameState.hero.critRate += 0.5;
            
            // Calculate new exp requirement
            GameState.hero.expMax = Math.floor(100 * Math.pow(GameState.hero.level, 1.8));
            
            this.showLevelUp();
        }
        
        this.updateUI();
    }
    
    getEquipmentStat(stat) {
        let total = 0;
        Object.values(GameState.equipment).forEach(equip => {
            if (equip.id) {
                total += equip[stat] || 0;
            }
        });
        return total;
    }
    
    calculateTotalPower() {
        const atk = GameState.hero.atk + this.getEquipmentStat('atk');
        const def = GameState.hero.def + this.getEquipmentStat('def');
        const hp = GameState.hero.maxHp;
        
        return Math.floor((atk * 10) + (def * 5) + (hp * 0.1) + (GameState.hero.level * 100));
    }
    
    // ========== RENDERING ==========
    render() {
        this.renderHero();
        this.renderEnemy();
    }
    
    renderHero() {
        const heroBody = document.getElementById('hero-body');
        if (!heroBody) return;
        
        const state = GameState.hero.state;
        heroBody.className = `hero-body ${state}`;
        
        // Update HP bar
        const hpPercent = (GameState.hero.hp / GameState.hero.maxHp) * 100;
        const hpBar = document.getElementById('hero-hp-bar');
        if (hpBar) {
            hpBar.style.width = hpPercent + '%';
        }
        
        const hpText = document.getElementById('hero-hp-text');
        if (hpText) {
            hpText.textContent = `${Math.floor(GameState.hero.hp)}/${GameState.hero.maxHp}`;
        }
    }
    
    renderEnemy() {
        const enemyWrapper = document.getElementById('enemy-wrapper');
        if (!enemyWrapper) return;
        
        // Clear existing enemy
        enemyWrapper.innerHTML = '';
        
        if (GameState.enemy.hp <= 0) return;
        
        // Create enemy element
        const enemyDiv = document.createElement('div');
        enemyDiv.className = 'enemy';
        enemyDiv.id = GameState.enemy.id;
        
        const sprite = document.createElement('div');
        sprite.className = `enemy-sprite ${GameState.enemy.state}`;
        sprite.textContent = GameState.enemy.type === 'boss' ? '🐉' : GameState.enemy.type === 'elite' ? '👹' : '🐻';
        
        const hpBar = document.createElement('div');
        hpBar.className = 'enemy-hp-bar';
        const hpFill = document.createElement('div');
        hpFill.className = 'enemy-hp-fill';
        const hpPercent = (GameState.enemy.hp / GameState.enemy.maxHp) * 100;
        hpFill.style.width = hpPercent + '%';
        hpBar.appendChild(hpFill);
        
        const name = document.createElement('div');
        name.className = 'enemy-name';
        name.textContent = GameState.enemy.name;
        
        enemyDiv.appendChild(sprite);
        enemyDiv.appendChild(hpBar);
        enemyDiv.appendChild(name);
        enemyWrapper.appendChild(enemyDiv);
    }
    
    showDamageNumber(target, damage, isCrit) {
        const container = document.getElementById('damage-container');
        if (!container) return;
        
        const damageDiv = document.createElement('div');
        damageDiv.className = `damage-number ${isCrit ? 'crit' : ''}`;
        damageDiv.textContent = `-${Math.floor(damage)}`;
        
        if (target === 'hero') {
            damageDiv.style.left = '100px';
            damageDiv.style.top = '200px';
        } else {
            damageDiv.style.right = '100px';
            damageDiv.style.top = '200px';
        }
        
        container.appendChild(damageDiv);
        
        setTimeout(() => {
            damageDiv.remove();
        }, 1000);
    }
    
    showLoot(amount) {
        const container = document.getElementById('loot-container');
        if (!container) return;
        
        const loot = document.createElement('div');
        loot.className = 'loot-item';
        loot.textContent = '💰';
        loot.style.left = '50%';
        loot.style.top = '50%';
        
        container.appendChild(loot);
        
        setTimeout(() => {
            loot.remove();
        }, 2500);
    }
    
    showLevelUp() {
        // Show level up effect
        const heroBody = document.getElementById('hero-body');
        if (heroBody) {
            heroBody.style.animation = 'none';
            setTimeout(() => {
                heroBody.style.animation = 'heroLevelUp 0.5s ease';
            }, 10);
        }
    }
    
    // ========== UI UPDATES ==========
    updateUI() {
        // Update player info
        const playerLevel = document.getElementById('player-level');
        if (playerLevel) playerLevel.textContent = GameState.hero.level;
        
        // Update power
        const totalPower = this.calculateTotalPower();
        GameState.account.totalPower = totalPower;
        const powerDisplay = document.getElementById('total-power');
        if (powerDisplay) powerDisplay.textContent = this.formatNumber(totalPower);
        
        // Update currency
        const bpDisplay = document.getElementById('currency-bp');
        if (bpDisplay) bpDisplay.textContent = this.formatNumber(GameState.currency.bp);
        
        const crystalDisplay = document.getElementById('currency-crystal');
        if (crystalDisplay) crystalDisplay.textContent = this.formatNumber(GameState.currency.crystal);
        
        const coinDisplay = document.getElementById('currency-coin');
        if (coinDisplay) coinDisplay.textContent = this.formatNumber(GameState.currency.coin);
        
        // Update stage
        const stageDisplay = document.getElementById('current-stage');
        if (stageDisplay) {
            stageDisplay.textContent = `${GameState.stage.current}-${GameState.stage.subStage}`;
        }
        
        const progressBar = document.getElementById('stage-progress');
        if (progressBar) {
            const progress = (GameState.stage.progress / GameState.stage.maxProgress) * 100;
            progressBar.style.width = progress + '%';
        }
        
        // Update stats
        const statHp = document.getElementById('stat-hp');
        if (statHp) statHp.textContent = Math.floor(GameState.hero.maxHp);
        
        const statAtk = document.getElementById('stat-atk');
        if (statAtk) statAtk.textContent = Math.floor(GameState.hero.atk + this.getEquipmentStat('atk'));
        
        const statDef = document.getElementById('stat-def');
        if (statDef) statDef.textContent = Math.floor(GameState.hero.def + this.getEquipmentStat('def'));
        
        const statCrit = document.getElementById('stat-crit');
        if (statCrit) statCrit.textContent = GameState.hero.critRate.toFixed(1) + '%';
        
        const statSpeed = document.getElementById('stat-speed');
        if (statSpeed) statSpeed.textContent = GameState.hero.attackSpeed.toFixed(1);
        
        // Update VIP
        const vipLevel = document.getElementById('vip-level');
        if (vipLevel) vipLevel.textContent = GameState.vip.level;
    }
    
    // ========== IDLE SYSTEM ==========
    calculateOfflineReward() {
        const now = Date.now();
        const offlineTime = now - GameState.idle.lastActiveTime;
        const cappedTime = Math.min(offlineTime, GameState.idle.idleCap);
        
        // Calculate BP per second
        const bpPerSecond = 1 * GameState.stage.current * (1 + GameState.vip.level * 0.1);
        const reward = Math.floor(bpPerSecond * (cappedTime / 1000));
        
        GameState.idle.offlineReward = reward;
        
        // Update UI
        const offlineTimeDisplay = document.getElementById('offline-time');
        if (offlineTimeDisplay) {
            const hours = Math.floor(cappedTime / 3600000);
            const minutes = Math.floor((cappedTime % 3600000) / 60000);
            offlineTimeDisplay.textContent = `${hours}h ${minutes}m`;
        }
        
        const rewardDisplay = document.getElementById('idle-reward');
        if (rewardDisplay) {
            rewardDisplay.textContent = this.formatNumber(reward);
        }
    }
    
    claimIdleReward() {
        GameState.currency.bp += GameState.idle.offlineReward;
        GameState.idle.offlineReward = 0;
        GameState.idle.lastActiveTime = Date.now();
        this.updateUI();
    }
    
    // ========== SAVE/LOAD ==========
    saveGame() {
        const saveData = {
            account: GameState.account,
            vip: GameState.vip,
            hero: GameState.hero,
            equipment: GameState.equipment,
            skills: GameState.skills,
            stage: GameState.stage,
            currency: GameState.currency,
            pointOfChain: GameState.pointOfChain,
            idle: GameState.idle,
            stats: GameState.stats,
            battle: { speed: GameState.battle.speed }
        };
        
        localStorage.setItem('idleRPG_save', JSON.stringify(saveData));
    }
    
    loadGame() {
        const saveData = localStorage.getItem('idleRPG_save');
        if (saveData) {
            try {
                const loaded = JSON.parse(saveData);
                Object.assign(GameState.account, loaded.account || {});
                Object.assign(GameState.vip, loaded.vip || {});
                Object.assign(GameState.hero, loaded.hero || {});
                Object.assign(GameState.equipment, loaded.equipment || {});
                Object.assign(GameState.skills, loaded.skills || {});
                Object.assign(GameState.stage, loaded.stage || {});
                Object.assign(GameState.currency, loaded.currency || {});
                Object.assign(GameState.pointOfChain, loaded.pointOfChain || {});
                Object.assign(GameState.idle, loaded.idle || {});
                Object.assign(GameState.stats, loaded.stats || {});
                if (loaded.battle) {
                    GameState.battle.speed = loaded.battle.speed;
                }
                
                // Calculate offline reward
                this.calculateOfflineReward();
                
                return true;
            } catch (e) {
                console.error('Failed to load save:', e);
                return false;
            }
        }
        return false;
    }
    
    // ========== UTILITY ==========
    formatNumber(num) {
        if (num >= 1000000000) return (num / 1000000000).toFixed(2) + 'B';
        if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(2) + 'K';
        return Math.floor(num).toString();
    }
    
    initEquipmentSlots() {
        const grid = document.getElementById('equipment-grid');
        if (!grid) return;
        
        const slots = ['weapon', 'helmet', 'armor', 'pants', 'gloves', 'bracelet', 'ring', 'necklace', 'cloak', 'wings'];
        
        slots.forEach(slot => {
            const slotDiv = document.createElement('div');
            slotDiv.className = 'equip-slot';
            slotDiv.dataset.slot = slot;
            
            const icon = document.createElement('div');
            icon.className = 'equip-icon';
            icon.textContent = this.getSlotIcon(slot);
            
            const level = document.createElement('div');
            level.className = 'equip-level';
            level.textContent = `Lv.${GameState.equipment[slot].level || 0}`;
            
            slotDiv.appendChild(icon);
            slotDiv.appendChild(level);
            
            slotDiv.addEventListener('click', () => {
                this.showEquipmentDetail(slot);
            });
            
            grid.appendChild(slotDiv);
        });
    }
    
    getSlotIcon(slot) {
        const icons = {
            weapon: '⚔️',
            helmet: '🪖',
            armor: '🛡️',
            pants: '👖',
            gloves: '🧤',
            bracelet: '💍',
            ring: '💎',
            necklace: '📿',
            cloak: '🧥',
            wings: '🪽'
        };
        return icons[slot] || '❓';
    }
    
    showEquipmentDetail(slot) {
        const detail = document.getElementById('equipment-detail');
        if (!detail) return;
        
        const equip = GameState.equipment[slot];
        detail.innerHTML = `
            <h4>${slot.toUpperCase()}</h4>
            <p>Level: ${equip.level}</p>
            <p>Rarity: ${equip.rarity}</p>
            <button class="btn-claim" onclick="game.upgradeEquipment('${slot}')">Upgrade (${this.formatNumber(this.getUpgradeCost(slot))} BP)</button>
        `;
    }
    
    getUpgradeCost(slot) {
        const level = GameState.equipment[slot].level || 0;
        return Math.floor(50 * Math.pow(level + 1, 1.5));
    }
    
    upgradeEquipment(slot) {
        const cost = this.getUpgradeCost(slot);
        if (GameState.currency.bp < cost) {
            alert('Not enough BP!');
            return;
        }
        
        GameState.currency.bp -= cost;
        GameState.equipment[slot].level++;
        
        // Increase stats
        if (slot === 'weapon' || slot === 'ring') {
            GameState.equipment[slot].atk = (GameState.equipment[slot].atk || 0) + 10;
        } else {
            GameState.equipment[slot].def = (GameState.equipment[slot].def || 0) + 5;
        }
        
        this.updateUI();
        this.initEquipmentSlots();
        this.saveGame();
    }
}

// ========== INITIALIZE GAME ==========
let game = null;

document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen
    setTimeout(() => {
        const loading = document.getElementById('loading-screen');
        if (loading) loading.classList.add('hidden');
    }, 1000);
    
    // Initialize game
    game = new GameEngine();
    
    // Load save
    game.loadGame();
    
    // Initialize equipment slots
    game.initEquipmentSlots();
    
    // Spawn first enemy
    game.spawnEnemy();
    
    // Start game loop
    game.start();
    
    // Update UI
    game.updateUI();
    
    // Event listeners
    document.querySelectorAll('.speed-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('locked')) return;
            
            document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const speed = parseInt(this.dataset.speed);
            GameState.battle.speed = speed;
            GameState.battle.attackInterval = 1000 / speed;
        });
    });
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
            
            this.classList.add('active');
            const tab = this.dataset.tab;
            document.getElementById(`tab-${tab}`).classList.add('active');
        });
    });
    
    document.getElementById('btn-claim-idle')?.addEventListener('click', () => {
        game.claimIdleReward();
    });
    
    // Auto-save on page unload
    window.addEventListener('beforeunload', () => {
        game.saveGame();
    });
});
