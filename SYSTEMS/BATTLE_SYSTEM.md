# Auto Battle & Adventure System

## 📋 Overview

Sistem battle yang fully automated dengan stage-based progression, enemy scaling, dan multiple battle modes.

---

## ⚔️ Auto Battle System

### Core Mechanic

#### Fully Automated Combat
```
No Manual Control:
- Hero auto-attacks enemies
- Skills auto-cast berdasarkan priority
- Auto-retry jika kalah
- Auto-progression jika menang

Player Control:
- Upgrade hero/equipment
- Choose skills to use
- Set battle settings
- Choose target stage
```

#### Battle Flow
```
1. Player selects stage
2. Battle starts automatically
3. Hero attacks enemies (auto)
4. Skills cast automatically (priority-based)
5. Battle continues until:
   - All enemies defeated (WIN)
   - Hero HP reaches 0 (LOSE)
6. If WIN: Auto-progress to next stage (if enabled)
7. If LOSE: Auto-retry after 3 seconds (if enabled)
```

### Battle Settings

#### Auto Progression
```
ON: Auto lanjut ke stage berikutnya jika menang
OFF: Stop setelah menang, wait for player input

Checkpoint System:
- Auto-progress stops at boss stages
- Auto-progress stops every 10 stages (optional setting)
- Can set max auto-progress stages
```

#### Auto Retry
```
ON: Auto retry setelah 3 detik jika kalah
OFF: Stop dan show defeat screen

Retry Logic:
- Infinite retries (no cost)
- Can disable untuk manual strategy
- VIP feature: Instant retry (no 3s wait)
```

#### Speed Multiplier
```
Available Speeds:
- x1: Normal speed (free)
- x2: 2x speed (free)
- x3: 3x speed (VIP 1+)
- x4: 4x speed (VIP 2+)
- x5: 5x speed (VIP 3+)

Speed Effect:
- Animation speed
- Battle duration
- Rewards unchanged (same rewards, faster)
```

#### Target Priority
```
Options:
- Nearest: Attack closest enemy
- Lowest HP: Attack weakest enemy
- Highest Threat: Attack strongest enemy
- Random: Random target

Default: Nearest
Can change in settings
```

---

## 🗺️ Stage System

### Stage Structure

#### Hierarchy
```
World → Chapter → Stage

Example:
World 1: Beginner's Journey
  Chapter 1: Forest Path (Stages 1-20)
  Chapter 2: Mountain Trail (Stages 21-40)
  ...
World 2: Dark Realm
  Chapter 1: Shadow Valley (Stages 201-220)
  ...
```

#### Stage Count
```
Total Structure:
- 10 Worlds
- 10 Chapters per World
- 20 Stages per Chapter
Total: 2000+ Stages

Future Expansion:
- New worlds added via updates
- Special event stages
- Endless mode (future)
```

### Stage Types

#### Normal Stage
```
Enemy Composition:
- 10-20 minion enemies
- 0-1 elite enemy (random)
- No boss

Completion:
- Defeat all enemies
- Time limit: None (but affects efficiency)

Rewards:
- BP: 100-1000 (based on stage)
- Materials: Random drops
- Equipment: Rare drops
- EXP: Based on enemies killed
```

#### Boss Stage
```
Enemy Composition:
- 1 Boss enemy
- High HP, high damage
- Special abilities

Completion:
- Defeat boss
- Time limit: None

Rewards:
- BP: 500-5000 (based on stage)
- Materials: Guaranteed drops
- Equipment: Higher drop rate
- EXP: Large amount
- Story progression: Unlock next chapter
```

#### Elite Stage
```
Enemy Composition:
- 3-5 elite enemies
- Higher stats than normal
- Special abilities

Completion:
- Defeat all elites
- Limited attempts: 3 per day

Rewards:
- BP: 300-3000
- Materials: Better drop rates
- Equipment: Higher rarity chance
- EXP: Good amount
```

### Stage Progression

#### Unlock System
```
Linear Progression:
- Complete Stage N to unlock Stage N+1
- Complete Chapter to unlock next Chapter
- Complete World to unlock next World

Checkpoints:
- Boss stages are checkpoints
- Can return to any completed stage
- Progress saved automatically
```

#### Stage Selection
```
Stage Map:
- Visual map dengan stages
- Completed: Green checkmark
- Current: Highlighted
- Locked: Grayed out

Quick Select:
- Jump to any completed stage
- Useful untuk farming
- No restriction (can farm lower stages)
```

---

## 👹 Enemy System

### Enemy Types

#### Minion
```
Stats:
- Low HP (100-1000)
- Low ATK (10-100)
- Low DEF (5-50)
- No special abilities

Purpose:
- Resource farming
- EXP farming
- Filler enemies

Spawn: Groups of 3-5
Rewards: Low (1-10 BP per kill)
```

#### Elite
```
Stats:
- Medium HP (1000-10000)
- Medium ATK (100-1000)
- Medium DEF (50-500)
- Special abilities (stun, burn, etc.)

Purpose:
- Challenge increase
- Better rewards
- Variety in combat

Spawn: 1-2 per stage (random)
Rewards: Medium (10-100 BP per kill)
```

#### Boss
```
Stats:
- High HP (10000-1000000+)
- High ATK (1000-10000+)
- High DEF (500-5000+)
- Multiple special abilities
- Phases (HP thresholds)

Purpose:
- Story progression gates
- Major challenges
- High rewards

Spawn: 1 per boss stage
Rewards: High (500-5000 BP, guaranteed materials)
```

### Enemy Scaling

#### HP Formula
```
Enemy HP = Base HP × (Stage Number^1.15) × Enemy Type Multiplier

Base HP = 100
Enemy Type Multipliers:
- Minion: 1.0x
- Elite: 3.0x
- Boss: 10.0x

Example (Stage 100 Boss):
= 100 × (100^1.15) × 10.0
= 100 × 251.2 × 10.0
= 251,200 HP
```

#### ATK Formula
```
Enemy ATK = Base ATK × (Stage Number^1.1) × Enemy Type Multiplier

Base ATK = 10
Enemy Type Multipliers:
- Minion: 1.0x
- Elite: 2.0x
- Boss: 5.0x
```

#### DEF Formula
```
Enemy DEF = Base DEF × (Stage Number^1.05) × Enemy Type Multiplier

Base DEF = 5
Enemy Type Multipliers:
- Minion: 1.0x
- Elite: 1.5x
- Boss: 3.0x
```

### Boss Categories

#### Story Boss
```
Purpose: Campaign progression
Frequency: Every 20 stages (end of chapter)
Characteristics:
- Unique design
- Story significance
- One-time clear (can replay)
- Unlocks next chapter

Rewards:
- Story progression
- High BP
- Guaranteed materials
- Achievement unlock
```

#### World Boss
```
Purpose: Daily/weekly challenge
Frequency: Daily atau weekly
Characteristics:
- Very high HP (millions)
- Multiple players can participate (optional)
- Damage ranking
- Time-limited (24 hours)

Rewards:
- Based on damage dealt
- Ranking rewards
- Participation rewards
- Rare materials
```

#### Timed Boss
```
Purpose: Event content
Frequency: During events
Characteristics:
- Limited time availability
- Special mechanics
- Event-themed rewards
- Higher difficulty

Rewards:
- Event currency
- Exclusive items
- Special materials
- Event achievements
```

---

## ⚔️ Combat Mechanics

### Damage Formula

#### Basic Damage
```
Damage = (ATK × Skill Multiplier) - (DEF × Defense Reduction)

Skill Multiplier:
- Basic Attack: 1.0x
- Active Skills: 1.5x - 5.0x (based on skill)
- Ultimate Skills: 5.0x - 10.0x

Defense Reduction:
- Formula: DEF / (DEF + 1000)
- Example: 500 DEF = 500/1500 = 33% reduction
```

#### Critical Hit
```
Crit Chance: Based on Crit Rate stat
Crit Damage: Based on Crit Damage stat

If Crit:
Final Damage = Damage × (Crit Damage% / 100)

Example:
Base Damage: 1000
Crit Damage: 200%
Final Damage: 1000 × 2.0 = 2000
```

#### Elemental Damage
```
Elemental Advantage:
- Advantage: 1.5x damage
- Neutral: 1.0x damage
- Disadvantage: 0.75x damage

Final Damage = Damage × Elemental Multiplier
```

#### Final Damage Calculation
```
Final Damage = Base Damage × Crit Multiplier × Elemental Multiplier × Buffs × Debuffs

Buffs:
- Skill buffs: +X% damage
- Equipment buffs: +X% damage
- Set bonuses: +X% damage

Debuffs:
- Enemy debuffs: -X% damage
- Status effects: Various
```

### Healing & Life Steal

#### Life Steal
```
Heal Amount = Damage Dealt × Life Steal%

Life Steal%:
- Base: 0%
- Max: 50% (hard cap)
- Sources: Equipment, Skills, Talents

Healing:
- Applied after damage dealt
- Cannot exceed max HP
- Visual: Green numbers
```

#### Regeneration
```
HP Regen = Base Regen × (1 + Regen Bonus%)

Base Regen: 1% max HP per second
Regen Bonus: From skills, equipment, talents

Applied: Every second during battle
```

### Status Effects

#### Buffs (Positive)
```
Damage Boost: +X% damage
Attack Speed Boost: +X% attack speed
Crit Rate Boost: +X% crit rate
Shield: Absorb X damage
Invincibility: Take no damage
```

#### Debuffs (Negative)
```
Burn: X% damage over time
Freeze: Cannot attack for X seconds
Stun: Cannot act for X seconds
Slow: -X% attack speed
Poison: X% damage over time
```

---

## 📊 Battle Results

### Victory Conditions
```
- All enemies defeated
- Boss HP reaches 0
- Time limit not exceeded (if applicable)
```

### Defeat Conditions
```
- Hero HP reaches 0
- Time limit exceeded (if applicable)
```

### Battle Statistics
```
Displayed After Battle:
- Duration
- Damage Dealt
- Damage Taken
- Highest Single Hit
- Crits Landed
- Skills Used
- Rewards Earned
```

### Rewards Distribution
```
Immediate Rewards:
- BP
- EXP
- Materials (if dropped)
- Equipment (if dropped)

Delayed Rewards:
- Stage completion bonus
- Achievement progress
- Leaderboard update
```

---

## 🎯 Battle Optimization

### Efficiency Tips
```
1. Upgrade hero before pushing stages
2. Optimize equipment for current stage
3. Choose skills based on enemy type
4. Use appropriate talent tree path
5. Farm lower stages untuk materials
6. Focus on one upgrade path at a time
```

### Strategy Considerations
```
Early Game:
- Focus on ATK upgrades
- Use damage skills
- Push stages for progression

Mid Game:
- Balance ATK and DEF
- Optimize equipment sets
- Farm materials

Late Game:
- Min-max stats
- Optimize builds
- Focus on endgame content
```

---

**Document Version:** 1.0.0  
**Last Updated:** 2025-01-27

