# Progression Curves & Balancing Formulas

## 📈 Overview

Dokumen ini menjelaskan semua formula progression, balancing curves, dan mathematical models untuk game Idle RPG.

---

## 🎮 Hero Progression

### Level System

#### EXP Required Formula
```
EXP Required for Level N = Base EXP × (Level^1.8) × Level Multiplier

Base EXP = 100
Level Multiplier:
- Level 1-10: 1.0x
- Level 11-25: 1.2x
- Level 26-50: 1.5x
- Level 51-100: 2.0x
- Level 101-200: 3.0x
- Level 201+: 5.0x
```

**Example Calculations:**
```
Level 10: 100 × (10^1.8) × 1.0 = 100 × 63.1 = 6,310 EXP
Level 50: 100 × (50^1.8) × 1.5 = 100 × 1,678 × 1.5 = 251,700 EXP
Level 100: 100 × (100^1.8) × 2.0 = 100 × 6,310 × 2.0 = 1,262,000 EXP
```

#### EXP Gain Formula
```
EXP per Kill = Base EXP × Stage Multiplier × VIP Bonus × Event Bonus

Base EXP = 10
Stage Multiplier = 1 + (Stage Number × 0.05)
VIP Bonus = 1 + (VIP Level × 0.05)
Event Bonus = 1.0 - 2.0 (based on active events)
```

**Example:**
```
Stage 100, VIP 5, No Event:
= 10 × (1 + 100×0.05) × (1 + 5×0.05) × 1.0
= 10 × 6.0 × 1.25 × 1.0
= 75 EXP per kill
```

### Stat Growth

#### HP Growth
```
Base HP = 100
HP per Level = 50 + (Level × 2)
Total HP = Base HP + Σ(HP per Level from 1 to Current Level)

Formula: Total HP = 100 + (50×Level) + (Level×(Level+1))
```

**Example:**
```
Level 50:
= 100 + (50×50) + (50×51)
= 100 + 2,500 + 2,550
= 5,150 HP
```

#### ATK Growth
```
Base ATK = 10
ATK per Level = 5 + (Level × 0.5)
Total ATK = Base ATK + Σ(ATK per Level from 1 to Current Level)

Formula: Total ATK = 10 + (5×Level) + (Level×(Level+1)×0.25)
```

#### DEF Growth
```
Base DEF = 5
DEF per Level = 2 + (Level × 0.3)
Total DEF = Base DEF + Σ(DEF per Level from 1 to Current Level)

Formula: Total DEF = 5 + (2×Level) + (Level×(Level+1)×0.15)
```

### Star System

#### Star Up Cost
```
Cost for Star N = Base Cost × (Star Level^2) × Rarity Multiplier

Base Cost = 10,000 BP
Rarity Multiplier:
- 0-3 Stars: 1.0x
- 4-6 Stars: 1.5x
- 7-9 Stars: 2.0x
- 10 Stars: 3.0x
```

#### Star Up Benefits
```
Stat Bonus per Star = 10%
Total Stat Bonus = Base Stats × (1 + Star Level × 0.10)
```

**Example:**
```
5 Star Hero with 1000 ATK:
= 1000 × (1 + 5 × 0.10)
= 1000 × 1.5
= 1500 ATK
```

---

## ⚔️ Equipment Progression

### Enhance (Level Up)

#### Cost Formula
```
Enhance Cost = Base Cost × (Level^1.5) × Rarity Multiplier × Slot Multiplier

Base Cost = 100 BP
Rarity Multipliers:
- Common: 1.0x
- Uncommon: 1.2x
- Rare: 1.5x
- Epic: 2.0x
- Legendary: 3.0x
- Mythic: 5.0x
- Ancient: 10.0x

Slot Multipliers:
- Weapon: 1.5x
- Armor pieces: 1.0x
- Accessories: 1.2x
```

**Example:**
```
Epic Weapon, Level 30:
= 100 × (30^1.5) × 2.0 × 1.5
= 100 × 164.3 × 2.0 × 1.5
= 49,290 BP
```

#### Stat Growth per Level
```
Stat Increase = Base Stat × (Level × 0.05) × Rarity Multiplier

Rarity Multipliers:
- Common: 1.0x
- Uncommon: 1.1x
- Rare: 1.2x
- Epic: 1.3x
- Legendary: 1.5x
- Mythic: 2.0x
- Ancient: 3.0x
```

### Refine (Star Up)

#### Cost Formula
```
Refine Cost = Base Cost × (Star Level^1.8) × Rarity Multiplier

Base Cost = 1,000 BP
```

#### Stat Bonus
```
Stat Bonus per Star = 5%
Total Stat = Base Stat × (1 + Star Level × 0.05)
```

### Awaken

#### Cost Formula
```
Awaken Cost = Base Cost × (Awaken Level^2) × Rarity Multiplier

Base Cost = 5,000 BP
Requires: Duplicate Equipment + Materials
```

#### Benefits
```
Stat Bonus per Awaken Level = 10%
Set Bonus Unlock:
- Awaken 1: Unlock 2-piece set
- Awaken 3: Unlock 4-piece set
- Awaken 5: Unlock 6-piece set
```

---

## 🎯 Skill Progression

### Skill Level Up

#### Cost Formula
```
Skill Upgrade Cost = Base Cost × (Level^1.2) × Skill Tier Multiplier

Base Cost = 100 BP
Skill Tier Multipliers:
- Basic Skill: 1.0x
- Advanced Skill: 1.5x
- Ultimate Skill: 2.0x
```

#### Damage Scaling
```
Skill Damage = Base Damage × (1 + Level × 0.05) × Skill Tier Multiplier

Base Damage = 100% of ATK
Skill Tier Multipliers:
- Basic: 1.0x
- Advanced: 1.5x
- Ultimate: 3.0x
```

**Example:**
```
Level 50 Advanced Skill:
= 100% × (1 + 50×0.05) × 1.5
= 100% × 3.5 × 1.5
= 525% of ATK
```

### Cooldown Reduction
```
Cooldown = Base Cooldown × (1 - Level × 0.01) × Minimum Cooldown Cap

Base Cooldown = 10 seconds
Minimum Cooldown Cap = 0.3 (30% of base)
```

**Example:**
```
Level 50 Skill:
= 10 × (1 - 50×0.01) × 0.3
= 10 × 0.5 × 0.3
= 1.5 seconds (capped at 3 seconds minimum)
```

---

## 🗺️ Stage Progression

### Enemy Scaling

#### Enemy HP Formula
```
Enemy HP = Base HP × (Stage Number^1.15) × Enemy Type Multiplier

Base HP = 100
Enemy Type Multipliers:
- Minion: 1.0x
- Elite: 3.0x
- Boss: 10.0x
```

**Example:**
```
Stage 100 Boss:
= 100 × (100^1.15) × 10.0
= 100 × 251.2 × 10.0
= 251,200 HP
```

#### Enemy ATK Formula
```
Enemy ATK = Base ATK × (Stage Number^1.1) × Enemy Type Multiplier

Base ATK = 10
Enemy Type Multipliers:
- Minion: 1.0x
- Elite: 2.0x
- Boss: 5.0x
```

#### Enemy DEF Formula
```
Enemy DEF = Base DEF × (Stage Number^1.05) × Enemy Type Multiplier

Base DEF = 5
Enemy Type Multipliers:
- Minion: 1.0x
- Elite: 1.5x
- Boss: 3.0x
```

### Reward Scaling

#### BP Reward per Kill
```
BP per Kill = Base BP × (Stage Number^0.8) × VIP Bonus × Event Bonus

Base BP = 5
```

**Example:**
```
Stage 100, VIP 5:
= 5 × (100^0.8) × 1.25 × 1.0
= 5 × 39.8 × 1.25
= 248.75 BP per kill
```

#### Stage Completion Bonus
```
Completion Bonus = Base Bonus × (Stage Number^0.9)

Base Bonus = 100 BP
```

---

## 💰 Economy Progression

### Upgrade Cost Scaling

#### Hero Level Up Cost
```
Level Up Cost = Base Cost × (Level^1.5) × Class Multiplier

Base Cost = 1,000 BP
Class Multipliers:
- Warrior: 1.0x
- Assassin: 1.2x
- Tank: 0.9x
- Ranger: 1.1x
- Mage: 1.3x
- Paladin: 1.0x
```

#### Equipment Enhance Cost
```
Enhance Cost = Base Cost × (Level^1.5) × Rarity Multiplier

Base Cost = 100 BP
```

#### Skill Upgrade Cost
```
Skill Cost = Base Cost × (Level^1.2) × Skill Tier Multiplier

Base Cost = 100 BP
```

### Material Requirements

#### Ore Requirements
```
Ore Needed = Base Ore × (Level^1.3) × Rarity Multiplier

Base Ore = 10
```

#### Essence Requirements
```
Essence Needed = Base Essence × (Level^1.2) × Skill Tier Multiplier

Base Essence = 5
```

---

## 📊 Power Calculation

### Total Power Formula
```
Total Power = Hero Power + Equipment Power + Skill Power + Bonus Power

Hero Power = (HP × 0.1) + (ATK × 10) + (DEF × 5)
Equipment Power = Σ(Equipment Stat Contribution)
Skill Power = Σ(Skill Level × 100)
Bonus Power = Set Bonuses + Talent Bonuses
```

### Stat Contribution to Power
```
HP Contribution = HP × 0.1
ATK Contribution = ATK × 10
DEF Contribution = DEF × 5
Crit Rate Contribution = Crit Rate × 50
Crit Damage Contribution = (Crit Damage - 150) × 2
```

---

## 🎯 Difficulty Curves

### Soft Wall Formula
```
Soft Wall Stage = Base Stage × (10 × Wall Number)

Wall Number: 1, 2, 3, ...
Difficulty Increase: +20% enemy stats
```

### Hard Wall Formula
```
Hard Wall Stage = Base Stage × (50 × Wall Number)

Wall Number: 1, 2, 3, ...
Difficulty Increase: +50% enemy stats
```

### Wall Placement
```
Soft Walls: Every 10 stages (10, 20, 30, ...)
Medium Walls: Every 50 stages (50, 100, 150, ...)
Hard Walls: Every 100 stages (100, 200, 300, ...)
```

---

## ⏱️ Time-Based Progression

### Idle Reward Rate
```
BP per Second = Stage BP Rate × VIP Bonus × Idle Path Bonus

Stage BP Rate = (BP per Kill × Kills per Second)
Kills per Second = Attack Speed × (1 / Enemy Kill Time)
```

### Voyage Rewards
```
Voyage Reward = Base Reward × Voyage Duration × Success Rate × Power Multiplier

Base Reward = 1000 BP per hour
Success Rate = Min(0.95, 0.70 + (Hero Power / 10000) × 0.01)
Power Multiplier = 1 + (Hero Power / 50000) × 0.1
```

---

## 🔄 Catch-Up Mechanics

### New Player Bonus
```
EXP Bonus = 1.0 + (Days Since Start × -0.01)
BP Bonus = 1.0 + (Days Since Start × -0.01)

Days Since Start: 0-30
Max Bonus: +50% (Day 0)
Min Bonus: +0% (Day 30+)
```

### Returning Player Bonus
```
Days Offline: 7+
Bonus Multiplier = 1.0 + (Days Offline × 0.05)
Max Bonus: +200% (40+ days offline)
Duration: 3 days after return
```

---

## 📈 Progression Milestones

### Key Milestones
```
Stage 10: Unlock Equipment System
Stage 25: Unlock Skill System
Stage 50: Unlock Voyage System
Stage 100: Unlock Shop
Stage 200: Unlock Social Features
Stage 500: Unlock Advanced Features
```

### Power Milestones
```
Power 1,000: Unlock Elite Stages
Power 10,000: Unlock World Boss
Power 50,000: Unlock Advanced Voyage
Power 100,000: Unlock Endgame Content
```

---

## 🎲 RNG & Drop Rates

### Drop Rate Formula
```
Drop Rate = Base Rate × VIP Bonus × Event Bonus × Luck Stat

Base Rates:
- Common Equipment: 50%
- Uncommon Equipment: 25%
- Rare Equipment: 10%
- Epic Equipment: 3%
- Legendary Equipment: 1%
- Mythic Equipment: 0.1%
- Ancient Equipment: 0.01%
```

### Material Drop Rates
```
Ore: 10% per kill
Essence: 5% per boss kill
Rune: 1% per elite kill
Relic Shard: 0.1% per world boss kill
```

---

**Document Version:** 1.0.0  
**Last Updated:** 2025-01-27  
**Note:** Semua formula dapat di-adjust berdasarkan playtesting dan balancing needs.

