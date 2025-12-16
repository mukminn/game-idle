# Skill System

## 📋 Overview

Sistem skill yang comprehensive dengan active skills, passive skills, ultimate skills, dan talent tree untuk customization build.

---

## 🎯 Skill Categories

### Active Skills (Auto Cast)

#### Concept
- Skills yang otomatis digunakan dalam battle
- Cooldown-based system
- Mana/Energy cost (optional, bisa di-remove untuk simplicity)
- Priority system untuk skill casting

#### Skill Examples by Class

**Warrior:**
```
1. Slash
   - Cooldown: 5 seconds
   - Damage: 150% ATK
   - Effect: None
   - Unlock: Level 1

2. Power Strike
   - Cooldown: 8 seconds
   - Damage: 250% ATK
   - Effect: Stun 1 second (10% chance)
   - Unlock: Level 10

3. Whirlwind
   - Cooldown: 12 seconds
   - Damage: 200% ATK (AoE)
   - Effect: Hit all enemies
   - Unlock: Level 25
```

**Mage:**
```
1. Fireball
   - Cooldown: 4 seconds
   - Damage: 180% ATK
   - Effect: Burn (5% damage over 3 seconds)
   - Unlock: Level 1

2. Ice Shard
   - Cooldown: 6 seconds
   - Damage: 200% ATK
   - Effect: Slow (20% attack speed reduction)
   - Unlock: Level 15

3. Chain Lightning
   - Cooldown: 10 seconds
   - Damage: 150% ATK (chains to 3 enemies)
   - Effect: Shock (stun 0.5 seconds)
   - Unlock: Level 30
```

**Assassin:**
```
1. Quick Strike
   - Cooldown: 3 seconds
   - Damage: 120% ATK
   - Effect: None
   - Unlock: Level 1

2. Backstab
   - Cooldown: 8 seconds
   - Damage: 300% ATK (if from behind, visual only)
   - Effect: +50% Crit Rate for this attack
   - Unlock: Level 12

3. Shadow Step
   - Cooldown: 15 seconds
   - Damage: 250% ATK
   - Effect: Dodge next attack
   - Unlock: Level 28
```

#### Skill Priority System
```
Priority Order:
1. Ultimate Skill (if available)
2. High damage skills (damage > 200% ATK)
3. Utility skills (heal, shield, buff)
4. Basic skills (damage < 200% ATK)

Auto-cast Logic:
- Check cooldowns
- Cast highest priority available skill
- If all on cooldown, use basic attack
```

### Passive Skills

#### Concept
- Always active
- Provide stat bonuses atau conditional effects
- Stack dengan equipment
- Upgradeable

#### Passive Skill Examples

**Berserker Rage:**
```
Effect: +20% ATK when HP < 50%
Upgrade: +5% per level (max +50%)
Unlock: Level 5
```

**Iron Skin:**
```
Effect: +15% DEF
Upgrade: +2% per level (max +35%)
Unlock: Level 8
```

**Critical Mastery:**
```
Effect: +10% Crit Rate
Upgrade: +2% per level (max +20%)
Unlock: Level 15
```

**Life Steal Mastery:**
```
Effect: +5% Life Steal
Upgrade: +1% per level (max +15%)
Unlock: Level 20
```

**Elemental Affinity:**
```
Effect: +20% Elemental Damage
Upgrade: +3% per level (max +50%)
Unlock: Level 25
```

### Ultimate Skills

#### Concept
- Powerful skills dengan long cooldown
- High damage atau utility
- Visual effects
- Unlock di level tertentu

#### Ultimate Skill Examples

**Meteor Strike (Mage):**
```
Cooldown: 60 seconds
Damage: 500% ATK (AoE)
Effect: Burn all enemies (10% damage over 5 seconds)
Visual: Meteor falls from sky
Unlock: Level 50
```

**Divine Protection (Paladin):**
```
Cooldown: 90 seconds
Damage: None
Effect: Invincibility for 5 seconds, +50% HP regen
Visual: Golden shield aura
Unlock: Level 50
```

**Time Stop (Assassin):**
```
Cooldown: 120 seconds
Damage: 300% ATK
Effect: Freeze all enemies for 3 seconds
Visual: Time freeze effect
Unlock: Level 50
```

---

## 🌳 Talent Tree System

### Three Paths

#### 1. Damage Path
```
Focus: Maximize damage output

Tier 1 (Level 1-10):
- +5% ATK (Cost: 1 point)
- +5% Crit Rate (Cost: 1 point)
- +10% Crit Damage (Cost: 1 point)

Tier 2 (Level 11-25):
- +10% ATK (Cost: 2 points)
- +10% Skill Damage (Cost: 2 points)
- +15% Crit Damage (Cost: 2 points)

Tier 3 (Level 26-50):
- +15% ATK (Cost: 3 points)
- +20% Elemental Damage (Cost: 3 points)
- +25% Crit Damage (Cost: 3 points)

Ultimate Node (Level 50+):
- Berserker Mode: +100% ATK for 10 seconds after kill
  (Cost: 5 points, requires 20 points in path)
```

#### 2. Defense Path
```
Focus: Survivability and tankiness

Tier 1 (Level 1-10):
- +5% HP (Cost: 1 point)
- +5% DEF (Cost: 1 point)
- +2% Damage Reduction (Cost: 1 point)

Tier 2 (Level 11-25):
- +10% HP (Cost: 2 points)
- +10% DEF (Cost: 2 points)
- +5% Life Steal (Cost: 2 points)

Tier 3 (Level 26-50):
- +15% HP (Cost: 3 points)
- +20% DEF (Cost: 3 points)
- +10% Damage Reduction (Cost: 3 points)

Ultimate Node (Level 50+):
- Last Stand: Invincibility for 3 seconds when HP < 20%
  (Cost: 5 points, requires 20 points in path)
```

#### 3. Idle Reward Path
```
Focus: Offline progression and resource gain

Tier 1 (Level 1-10):
- +5% BP Gain (Cost: 1 point)
- +5% Drop Rate (Cost: 1 point)
- +1 Hour Idle Time (Cost: 1 point)

Tier 2 (Level 11-25):
- +10% BP Gain (Cost: 2 points)
- +10% Drop Rate (Cost: 2 points)
- +2 Hours Idle Time (Cost: 2 points)
- +10% Material Gain (Cost: 2 points)

Tier 3 (Level 26-50):
- +15% BP Gain (Cost: 3 points)
- +20% Drop Rate (Cost: 3 points)
- +3 Hours Idle Time (Cost: 3 points)
- +20% Material Gain (Cost: 3 points)

Ultimate Node (Level 50+):
- Idle Master: Double idle rewards once per day
  (Cost: 5 points, requires 20 points in path)
```

### Talent Point System
```
Earned: 1 point per level up
Total Available: 50 points (Level 1-50)
Reset: Can reset dengan item (cost: 500 Crystals)
Reset Cooldown: Once per week
```

### Talent Tree Rules
```
- Can invest in multiple paths
- Ultimate nodes require 20 points in that path
- Total points limited (strategic choices)
- Can reset and reallocate
- Visual tree dengan connections
```

---

## ⬆️ Skill Upgrade System

### Level Upgrade

#### Cost Formula
```
Skill Upgrade Cost = Base Cost × (Level^1.2) × Skill Tier Multiplier

Base Cost = 100 BP
Skill Tier Multipliers:
- Basic Skill: 1.0x
- Advanced Skill: 1.5x
- Ultimate Skill: 2.0x
```

#### Material Requirements
```
Essence Required = Base Essence × (Level^1.1) × Skill Tier Multiplier

Base Essence = 5
Skill Tier Multipliers:
- Basic: 1.0x
- Advanced: 1.5x
- Ultimate: 2.0x
```

#### Benefits per Level
```
Damage Scaling:
- +5% damage per level
- Formula: Base Damage × (1 + Level × 0.05)

Cooldown Reduction:
- -1% cooldown per level
- Formula: Base Cooldown × (1 - Level × 0.01)
- Minimum: 30% of base cooldown

Effect Enhancement:
- Certain levels unlock additional effects
- Example: Level 10 = +Burn effect, Level 25 = +Stun chance
```

### Evolution System

#### Evolution Stages
```
Stage I (Base): Unlocked at skill unlock
Stage II: Requires Level 25 + Materials
Stage III: Requires Level 50 + Materials
Stage MAX: Requires Level 100 + Rare Materials
```

#### Evolution Benefits
```
Stage II:
- +50% base damage
- New visual effect
- Additional effect (e.g., AoE)

Stage III:
- +100% base damage (total 2.5x)
- Enhanced visual effect
- Stronger additional effects

Stage MAX:
- +200% base damage (total 4x)
- Ultimate visual effect
- Unique bonus effect
```

#### Evolution Requirements
```
Stage II:
- Essence: 100
- Special Material: 10
- BP: 10,000

Stage III:
- Essence: 500
- Special Material: 50
- BP: 50,000

Stage MAX:
- Essence: 2000
- Rare Material: 100
- BP: 200,000
```

---

## 🎲 Skill Unlock System

### Unlock Schedule

#### By Level
```
Level 1: First active skill (class-based)
Level 5: First passive skill
Level 10: Second active skill
Level 15: Second passive skill
Level 25: Third active skill
Level 30: Third passive skill
Level 50: Ultimate skill
```

#### By Achievement
```
Defeat 100 Enemies: Unlock skill slot
Defeat 10 Bosses: Unlock advanced skill
Reach Stage 50: Unlock ultimate skill (early)
Complete Achievement: Unlock exclusive skill
```

#### By Purchase (Optional)
```
Skill Unlock Scroll: 500 Crystals
- Unlock any skill early
- One-time use
- Can purchase multiple
```

---

## 🔄 Skill Management

### Skill Loadout
```
Active Slots: 3-5 skills (based on level)
- Level 1-10: 1 slot
- Level 11-25: 2 slots
- Level 26-50: 3 slots
- Level 51+: 4 slots
- Ultimate: Always available (separate slot)

Passive Slots: Unlimited (all unlocked passives active)
```

### Skill Priority Settings
```
Can set priority order:
1. Highest priority (cast first)
2. Medium priority
3. Low priority (cast last)

Auto-optimize: AI suggests best priority (optional)
```

### Skill Presets (Future)
```
Save multiple skill loadouts:
- PvE Build
- Boss Build
- Farming Build
- Quick switch between presets
```

---

## 📊 Skill Power Calculation

### Skill Contribution to Power
```
Skill Power = Base Skill Power × Level Multiplier × Evolution Multiplier

Base Skill Power = 100 per skill
Level Multiplier = 1 + (Level × 0.05)
Evolution Multiplier:
- Stage I: 1.0x
- Stage II: 1.5x
- Stage III: 2.0x
- Stage MAX: 3.0x
```

### Total Skill Power
```
Total Skill Power = Σ(All Active Skills Power) + Σ(All Passive Skills Power)

Active Skills: Counted fully
Passive Skills: Counted at 50% (less impact on combat)
```

---

**Document Version:** 1.0.0  
**Last Updated:** 2025-01-27

