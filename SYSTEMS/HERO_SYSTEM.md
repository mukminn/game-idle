# Hero System

## 📋 Overview

Sistem hero yang comprehensive untuk game Idle RPG. Player memiliki 1 hero utama yang berkembang melalui upgrade, customization, dan progression systems.

---

## 🎮 Hero Concept

### Single Hero Philosophy
- **No Gacha:** Player tidak perlu gacha untuk mendapatkan hero
- **Depth over Breadth:** Focus pada deep customization, bukan banyak karakter
- **Player Identity:** Hero adalah representasi player di game
- **Long-term Progression:** Hero bisa berkembang tanpa batas

---

## 📊 Attribute System

### Primary Attributes

#### HP (Health Points)
```
Base HP: 100
Growth Formula: HP = 100 + (50 × Level) + (Level × (Level + 1))
Max HP: Unlimited (scales with level)

Equipment Bonus: +X HP or +X% HP
Skill Bonus: +X% HP
Talent Bonus: +X% HP
```

#### ATK (Attack)
```
Base ATK: 10
Growth Formula: ATK = 10 + (5 × Level) + (Level × (Level + 1) × 0.25)
Max ATK: Unlimited

Equipment Bonus: +X ATK or +X% ATK
Skill Bonus: +X% ATK
Talent Bonus: +X% ATK
```

#### DEF (Defense)
```
Base DEF: 5
Growth Formula: DEF = 5 + (2 × Level) + (Level × (Level + 1) × 0.15)
Max DEF: Unlimited

Equipment Bonus: +X DEF or +X% DEF
Skill Bonus: +X% DEF
Talent Bonus: +X% DEF
```

### Secondary Attributes

#### Crit Rate (%)
```
Base: 5%
Max: 100% (hard cap)
Sources:
- Equipment substats
- Skill bonuses
- Talent tree
- Set bonuses

Formula: Final Crit Rate = Min(100%, Base + Equipment + Skills + Talents)
```

#### Crit Damage (%)
```
Base: 150%
Max: 500% (soft cap, can exceed with special items)
Sources:
- Equipment substats
- Skill bonuses
- Talent tree
- Set bonuses

Formula: Final Crit Damage = Base + Equipment + Skills + Talents
```

#### Attack Speed
```
Base: 1.0 attacks per second
Max: 5.0 attacks per second (hard cap)
Sources:
- Equipment substats
- Skill bonuses
- Talent tree

Formula: Final Speed = Min(5.0, Base × (1 + Equipment% + Skill% + Talent%))
```

#### Life Steal (%)
```
Base: 0%
Max: 50% (hard cap)
Sources:
- Equipment substats
- Skill bonuses
- Talent tree
- Class bonuses

Formula: Final Life Steal = Min(50%, Base + Equipment + Skills + Talents)
Heal Amount = Damage Dealt × Life Steal%
```

---

## 🔥 Element System

### Available Elements

#### Fire 🔥
```
Properties:
- Strong against: Ice
- Weak against: Water (if implemented)
- Skill theme: Burn, Explosion
- Visual: Red/Orange effects
```

#### Ice ❄️
```
Properties:
- Strong against: Nature
- Weak against: Fire
- Skill theme: Freeze, Slow
- Visual: Blue/White effects
```

#### Lightning ⚡
```
Properties:
- Strong against: Dark
- Weak against: Earth (if implemented)
- Skill theme: Shock, Chain
- Visual: Yellow/Purple effects
```

#### Dark 🌑
```
Properties:
- Strong against: Light
- Weak against: Lightning
- Skill theme: Curse, Drain
- Visual: Black/Purple effects
```

#### Light ☀️
```
Properties:
- Strong against: Dark
- Weak against: Dark (neutral)
- Skill theme: Heal, Purify
- Visual: White/Gold effects
```

#### Nature 🌿
```
Properties:
- Strong against: Fire (resistance)
- Weak against: Ice
- Skill theme: Poison, Regeneration
- Visual: Green/Brown effects
```

### Elemental Advantage System
```
Damage Multiplier:
- Advantage: 1.5x damage
- Neutral: 1.0x damage
- Disadvantage: 0.75x damage

Advantage Chart:
Fire > Ice > Nature > Fire (rock-paper-scissors)
Lightning > Dark > Light > Lightning
Nature neutral to most elements
```

### Element Change
```
Cost: 1000 Crystals
Item Required: Element Change Scroll (rare)
Cooldown: 7 days (can change once per week)
Effect: Change hero element, reset element-specific skills
```

---

## ⚔️ Class System

### Available Classes

#### Warrior ⚔️
```
Base Stats:
- HP: +20%
- ATK: Base
- DEF: +10%

Special Traits:
- Higher HP pool
- Balanced stats
- Tanky playstyle
- Good for beginners

Skill Tree Focus:
- Defense path
- HP regeneration
- Damage reduction
```

#### Assassin 🗡️
```
Base Stats:
- HP: -20%
- ATK: +30%
- DEF: -10%

Special Traits:
- High damage
- Low survivability
- High crit rate
- Glass cannon playstyle

Skill Tree Focus:
- Damage path
- Crit bonuses
- Attack speed
```

#### Tank 🛡️
```
Base Stats:
- HP: +50%
- ATK: -20%
- DEF: +30%

Special Traits:
- Very high HP
- High defense
- Low damage
- Survivability focus

Skill Tree Focus:
- Defense path
- HP bonuses
- Damage mitigation
```

#### Ranger 🎯
```
Base Stats:
- HP: Base
- ATK: +15%
- DEF: Base

Special Traits:
- High crit rate
- Balanced stats
- Ranged attacks (visual)
- Versatile playstyle

Skill Tree Focus:
- Damage path
- Crit bonuses
- Attack speed
```

#### Mage 🔮
```
Base Stats:
- HP: -15%
- ATK: +25%
- DEF: -15%

Special Traits:
- High skill damage
- Low defense
- Area attacks
- Burst damage

Skill Tree Focus:
- Skill damage path
- Cooldown reduction
- Mana efficiency
```

#### Paladin ⚖️
```
Base Stats:
- HP: +15%
- ATK: +10%
- DEF: +15%

Special Traits:
- Balanced stats
- High life steal
- Self-healing
- Sustain focus

Skill Tree Focus:
- Balanced path
- Life steal
- Healing bonuses
```

### Class Change
```
Cost: 1000 Crystals
Item Required: Class Change Scroll (rare)
Cooldown: 7 days
Effect: Change hero class, reset class-specific skills
Note: Stats adjusted, equipment may need re-optimization
```

---

## 📈 Progression Systems

### Level System
```
Level Range: 1 - 1000
EXP Source: Killing enemies, completing stages
EXP Formula: See PROGRESSION_CURVES.md

Level Up Benefits:
- +Base Stats (HP, ATK, DEF)
- +Skill Points (for skill upgrades)
- +Talent Points (for talent tree)
- Unlock new skills/features at milestones
```

### Star System
```
Star Range: 0★ - 10★
Star Up Requirements:
- Materials (Ore, Essence)
- BP cost
- Duplicate equipment (for certain stars)

Star Up Benefits:
- +10% all stats per star
- Unlock new skill tiers
- Visual upgrade (glow effect)

Cost Scaling: Exponential (see PROGRESSION_CURVES.md)
```

### Evolution System
```
Evolution Stages:
1. Base (Starting form)
2. Evolved (Level 50+)
3. Awakened (Level 100+)
4. Transcended (Level 200+)

Requirements per Evolution:
- Hero Level milestone
- Essence materials
- Special evolution items
- BP cost

Evolution Benefits:
- Stat multipliers (+50% per evolution)
- New skills unlocked
- Visual transformation
- Title upgrade
```

---

## 🎨 Customization

### Visual Customization
```
Skins:
- Default skin
- Unlockable skins (achievements, events, purchase)
- Cosmetic only, no gameplay impact

Wings:
- Default: No wings
- Unlockable wings (VIP, events, purchase)
- Visual effect only

Avatar:
- Linked to account profile
- Can change in profile settings
```

### Build Customization
```
Equipment Sets:
- Mix and match for different builds
- Set bonuses for synergy
- Multiple loadouts (future feature)

Skill Loadouts:
- Choose which skills to use
- Skill priority settings
- Multiple presets (future feature)

Talent Tree:
- Three paths to choose from
- Can reset with item (cost: Crystals)
- Strategic choices matter
```

---

## 🔄 Power Calculation

### Total Power Formula
```
Total Power = Hero Base Power + Equipment Power + Skill Power + Bonus Power

Hero Base Power = (HP × 0.1) + (ATK × 10) + (DEF × 5)
Equipment Power = Σ(Equipment Stat Contribution)
Skill Power = Σ(Skill Level × 100)
Bonus Power = Set Bonuses + Talent Bonuses + VIP Bonuses
```

### Stat Contribution to Power
```
HP: 1 HP = 0.1 Power
ATK: 1 ATK = 10 Power
DEF: 1 DEF = 5 Power
Crit Rate: 1% = 50 Power
Crit Damage: 1% above 150% = 2 Power
Attack Speed: 0.1 = 100 Power
Life Steal: 1% = 20 Power
```

---

## 🎯 Hero Milestones

### Level Milestones
```
Level 10: Unlock first evolution
Level 25: Unlock advanced skills
Level 50: Unlock second evolution
Level 100: Unlock third evolution
Level 200: Unlock fourth evolution
Level 500: Unlock prestige system (future)
```

### Power Milestones
```
Power 1,000: Unlock elite stages
Power 10,000: Unlock world boss
Power 50,000: Unlock advanced content
Power 100,000: Unlock endgame content
Power 500,000: Unlock prestige content (future)
```

---

## 🔮 Future Enhancements

### Prestige System (Future)
```
Concept: Reset hero untuk permanent bonuses
Requirements: Level 500+
Benefits: Permanent stat multipliers
Cost: Reset to level 1, keep equipment
```

### Hero Variants (Future)
```
Concept: Alternative hero forms
Requirements: Special events
Benefits: Different playstyle, same progression
Note: Not gacha, special unlock only
```

---

**Document Version:** 1.0.0  
**Last Updated:** 2025-01-27

