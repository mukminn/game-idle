# Equipment & Gear System

## 📋 Overview

Sistem equipment yang comprehensive dengan 9 slot gear, multiple rarity tiers, upgrade systems, dan set bonuses.

---

## 🎒 Equipment Slots

### 9 Equipment Slots

#### 1. Weapon ⚔️
```
Type: Primary damage source
Primary Stat: ATK
Substats: ATK%, Crit Rate%, Crit Damage%, Attack Speed%
Visual: Visible on hero
Rarity Impact: Highest on damage output
```

#### 2. Helmet 🪖
```
Type: Head protection
Primary Stat: DEF or HP
Substats: HP%, DEF%, Elemental Resistance%
Visual: Visible on hero
Set Piece: Part of armor sets
```

#### 3. Pants 👖
```
Type: Leg protection
Primary Stat: DEF or HP
Substats: HP%, DEF%, Movement Speed% (visual only)
Visual: Visible on hero
Set Piece: Part of armor sets
```

#### 4. Armor 🧥
```
Type: Body protection
Primary Stat: DEF or HP
Substats: HP%, DEF%, All Resistance%
Visual: Visible on hero
Set Piece: Part of armor sets
```

#### 5. Bracers 💪
```
Type: Arm protection
Primary Stat: ATK or DEF
Substats: ATK%, DEF%, Crit Rate%
Visual: Visible on hero
Set Piece: Part of accessory sets
```

#### 6. Gloves 🧤
```
Type: Hand protection
Primary Stat: ATK
Substats: ATK%, Attack Speed%, Crit Rate%
Visual: Visible on hero
Set Piece: Part of accessory sets
```

#### 7. Ring 💍
```
Type: Accessory
Primary Stat: Mix (ATK, DEF, HP)
Substats: All secondary stats
Visual: Subtle effect
Set Piece: Part of accessory sets
```

#### 8. Necklace 📿
```
Type: Accessory
Primary Stat: Mix (ATK, DEF, HP)
Substats: All secondary stats
Visual: Visible on hero
Set Piece: Part of accessory sets
```

#### 9. Wings 🦅
```
Type: Special accessory
Primary Stat: All stats (balanced)
Substats: All secondary stats
Visual: Prominent visual effect
Special: Often cosmetic-focused, can have unique bonuses
```

---

## ⭐ Rarity System

### Rarity Tiers

#### Common (Gray)
```
Base Stat Multiplier: 1.0x
Substat Slots: 0
Max Level: 10
Max Stars: 3
Drop Rate: 50%
Value: Starter equipment
```

#### Uncommon (Green)
```
Base Stat Multiplier: 1.2x
Substat Slots: 1
Max Level: 20
Max Stars: 5
Drop Rate: 25%
Value: Early game upgrade
```

#### Rare (Blue)
```
Base Stat Multiplier: 1.5x
Substat Slots: 2
Max Level: 30
Max Stars: 7
Drop Rate: 10%
Value: Mid game standard
```

#### Epic (Purple)
```
Base Stat Multiplier: 2.0x
Substat Slots: 3
Max Level: 40
Max Stars: 8
Drop Rate: 3%
Value: Strong equipment
```

#### Legendary (Orange)
```
Base Stat Multiplier: 3.0x
Substat Slots: 4
Max Level: 50
Max Stars: 9
Drop Rate: 1%
Value: End game target
```

#### Mythic (Red)
```
Base Stat Multiplier: 5.0x
Substat Slots: 5
Max Level: 60
Max Stars: 10
Drop Rate: 0.1%
Value: Ultra rare, powerful
```

#### Ancient (Gold)
```
Base Stat Multiplier: 10.0x
Substat Slots: 6
Max Level: 80
Max Stars: 10
Drop Rate: 0.01%
Value: Ultimate equipment
Special: Unique visual effects, exclusive bonuses
```

---

## 📊 Equipment Properties

### Base Stats

#### Stat Ranges by Slot
```
Weapon:
- ATK: 10-1000 (based on rarity and level)
- ATK%: 5%-50% (substat)

Armor Pieces (Helmet, Pants, Armor):
- DEF: 5-500
- HP: 50-5000
- DEF%: 5%-50% (substat)
- HP%: 5%-50% (substat)

Accessories (Bracers, Gloves, Ring, Necklace):
- Mixed stats
- ATK: 5-500
- DEF: 5-500
- HP: 25-2500

Wings:
- Balanced stats
- All stats: 3-300
- Special bonuses possible
```

### Substats System

#### Substat Types
```
Primary Substats:
- ATK%
- DEF%
- HP%
- Crit Rate%
- Crit Damage%
- Attack Speed%
- Life Steal%

Elemental Substats:
- Fire Damage%
- Ice Damage%
- Lightning Damage%
- Dark Damage%
- Light Damage%
- Nature Damage%

Resistance Substats:
- Fire Resistance%
- Ice Resistance%
- All Resistance%
```

#### Substat Generation
```
On Drop/Craft:
- Random substats generated
- Number based on rarity
- Values within ranges
- Can reroll with items (cost: Crystals)

Substat Ranges:
- ATK%/DEF%/HP%: 5%-50%
- Crit Rate%: 1%-10%
- Crit Damage%: 5%-50%
- Attack Speed%: 1%-20%
- Life Steal%: 1%-10%
```

---

## 🔧 Upgrade Systems

### 1. Enhance (Level Up)

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
- Armor: 1.0x
- Accessories: 1.2x
- Wings: 1.3x
```

#### Material Requirements
```
Ore Required = Base Ore × (Level^1.3) × Rarity Multiplier

Base Ore = 10
Rarity Multipliers:
- Common: 1.0x
- Uncommon: 1.2x
- Rare: 1.5x
- Epic: 2.0x
- Legendary: 3.0x
- Mythic: 5.0x
- Ancient: 10.0x
```

#### Stat Growth
```
Stat Increase per Level = Base Stat × 0.05 × Rarity Multiplier

Example:
Epic Weapon, Level 30, Base ATK 100:
= 100 × 0.05 × 2.0
= 10 ATK per level
Total at Level 30: 100 + (10 × 30) = 400 ATK
```

### 2. Refine (Star Up)

#### Cost Formula
```
Refine Cost = Base Cost × (Star Level^1.8) × Rarity Multiplier

Base Cost = 1,000 BP
Materials: Essence + Ore
```

#### Benefits
```
Stat Bonus per Star = 5%
Total Stat = Base Stat × (1 + Star Level × 0.05)

Example:
5 Star Equipment with 1000 ATK:
= 1000 × (1 + 5 × 0.05)
= 1000 × 1.25
= 1250 ATK
```

### 3. Awaken

#### Requirements
```
- Duplicate equipment (same rarity, same slot)
- Awaken materials (Essence, special items)
- BP cost
```

#### Cost Formula
```
Awaken Cost = Base Cost × (Awaken Level^2) × Rarity Multiplier

Base Cost = 5,000 BP
Materials: Duplicate + Essence
```

#### Benefits
```
Stat Bonus per Awaken Level = 10%
Set Bonus Unlock:
- Awaken 1: Unlock 2-piece set bonus
- Awaken 3: Unlock 4-piece set bonus
- Awaken 5: Unlock 6-piece set bonus

Total Stat = Base Stat × (1 + Awaken Level × 0.10)
```

### 4. Enchant

#### Enchant System
```
Enchant Slots: Based on rarity
- Rare: 1 slot
- Epic: 2 slots
- Legendary: 3 slots
- Mythic: 4 slots
- Ancient: 5 slots

Enchant Types: Runes
- Attack Rune: +ATK%
- Defense Rune: +DEF%
- HP Rune: +HP%
- Crit Rune: +Crit Rate%
- Speed Rune: +Attack Speed%
```

#### Enchant Cost
```
Cost = Base Cost × Rune Tier × Slot Number

Base Cost = 100 BP
Rune Tier: 1-5 (higher tier = better bonus)
Slot Number: 1st slot = 1x, 2nd = 2x, 3rd = 3x, etc.
```

#### Enchant Benefits
```
Rune Tier 1: +5% stat
Rune Tier 2: +10% stat
Rune Tier 3: +15% stat
Rune Tier 4: +20% stat
Rune Tier 5: +25% stat

Can replace existing enchant (cost: Crystals)
```

---

## 🎯 Set Bonus System

### Set Types

#### Warrior Set (2/4/6)
```
2-Piece: +10% ATK
4-Piece: +20% HP, +10% DEF
6-Piece: +30% ATK, +15% Life Steal

Pieces: Weapon, Helmet, Armor, Pants, Bracers, Gloves
```

#### Mage Set (2/4/6)
```
2-Piece: +15% Skill Damage
4-Piece: +25% ATK, -10% Skill Cooldown
6-Piece: +50% Skill Damage, +20% Crit Rate

Pieces: Weapon, Helmet, Armor, Ring, Necklace, Wings
```

#### Tank Set (2/4/6)
```
2-Piece: +20% DEF
4-Piece: +30% HP, +15% Damage Reduction
6-Piece: +50% DEF, +25% HP, +10% Life Steal

Pieces: Helmet, Armor, Pants, Bracers, Gloves, Ring
```

#### Assassin Set (2/4/6)
```
2-Piece: +20% Crit Rate
4-Piece: +30% Crit Damage, +15% Attack Speed
6-Piece: +50% Crit Rate, +40% Crit Damage, +25% Attack Speed

Pieces: Weapon, Gloves, Ring, Necklace, Bracers, Wings
```

### Set Bonus Rules
```
- Must equip pieces of same set
- Bonuses stack (2-piece + 4-piece + 6-piece all active)
- Awaken level determines which bonuses unlock
- Can mix sets (strategic choice)
```

---

## 🎲 Equipment Acquisition

### Drop Sources

#### Normal Enemies
```
Drop Rate: 10% per kill
Rarity Distribution:
- Common: 50%
- Uncommon: 30%
- Rare: 15%
- Epic: 4%
- Legendary: 1%
- Mythic: 0.1%
- Ancient: 0.01%
```

#### Elite Enemies
```
Drop Rate: 50% per kill
Rarity Distribution:
- Uncommon: 30%
- Rare: 40%
- Epic: 20%
- Legendary: 8%
- Mythic: 1.5%
- Ancient: 0.5%
```

#### Bosses
```
Drop Rate: 100% (guaranteed)
Rarity Distribution:
- Rare: 20%
- Epic: 40%
- Legendary: 30%
- Mythic: 8%
- Ancient: 2%
```

### Crafting System
```
Craft Requirements:
- Relic Shards (100-1000 based on rarity)
- Materials (Ore, Essence)
- BP cost
- Recipe (unlocked via progression)

Craft Benefits:
- Choose slot type
- Guaranteed rarity (based on materials)
- Can reroll substats (cost: Crystals)
```

### Shop Purchases
```
BP Shop:
- Common-Uncommon: 500-2000 BP
- Rare: 2000-5000 BP

Crystal Shop:
- Epic: 500-1000 Crystals
- Legendary: 2000-5000 Crystals
- Mythic: 10000+ Crystals
```

---

## 🔄 Equipment Management

### Inventory System
```
Max Slots: 100 (base)
Expansion: +10 slots per expansion (cost: Crystals)
Auto-Sell: Can set to auto-sell Common/Uncommon (optional)
Lock System: Lock equipment to prevent accidental sell/upgrade
```

### Equipment Comparison
```
Compare Feature:
- Side-by-side stat comparison
- Power difference
- Substat comparison
- Set bonus preview
```

### Loadout System (Future)
```
Multiple Loadouts:
- Save different equipment sets
- Quick switch between builds
- Name custom loadouts
- Max 3 loadouts (free), 10 (VIP 10+)
```

---

## 📊 Equipment Power Calculation

### Power Formula
```
Equipment Power = Base Stat Power + Substat Power + Set Bonus Power

Base Stat Power:
- ATK: ×10
- DEF: ×5
- HP: ×0.1

Substat Power:
- ATK%/DEF%/HP%: Applied to base, then calculated
- Crit Rate%: ×50
- Crit Damage%: ×2 (above 150%)
- Attack Speed%: ×100
- Life Steal%: ×20

Set Bonus Power:
- Calculated based on active set bonuses
```

---

**Document Version:** 1.0.0  
**Last Updated:** 2025-01-27

