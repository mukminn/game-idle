# Game Modes

## 📋 Overview

Berbagai mode game tambahan selain main battle system, termasuk Adventure Mode, Voyage System, Shop, dan Special Market.

---

## 🗺️ Adventure Mode

### Story Campaign

#### Concept
- Main progression path
- Unlock fitur secara bertahap
- Story-driven (optional cutscenes)
- Chapter-based structure

#### Chapter Structure
```
Chapter 1: Tutorial & Introduction
- Stages 1-20
- Unlock: Equipment System
- Story: Hero's journey begins

Chapter 2: First Challenges
- Stages 21-40
- Unlock: Skill System
- Story: Facing first boss

Chapter 3: Growing Stronger
- Stages 41-60
- Unlock: Voyage System
- Story: Discovering new powers

Chapter 4: Exploration
- Stages 61-80
- Unlock: Shop System
- Story: Exploring new lands

Chapter 5: Social Awakening
- Stages 81-100
- Unlock: Social Features
- Story: Meeting other heroes

... (continues for 10+ chapters)
```

#### Feature Unlock Schedule
```
Stage 1: Tutorial (unlocked)
Stage 10: Equipment System
Stage 25: Skill System
Stage 50: Voyage System
Stage 75: Shop System
Stage 100: Social Features
Stage 150: Advanced Features
Stage 200: Endgame Features
```

#### Chapter Rewards
```
Per Chapter Completion:
- Crystals: 100-1000 (based on chapter)
- BP: 1000-10000
- Materials: Chapter-specific
- Equipment: Guaranteed rare+
- Achievement: Chapter completion
```

---

## 🚢 Voyage System

### Concept

#### Core Mechanic
- Kirim hero ke voyage (expedition)
- Hero tidak bisa battle selama voyage
- Passive rewards saat kembali
- Risk/reward mechanic

#### Voyage Types

**Short Voyage:**
```
Duration: 1 hour
Risk Level: Low (90% success)
Rewards:
- BP: 1000-5000
- Materials: Common-Rare
- Equipment: Common-Uncommon (rare)

Cost: Free
Cooldown: None
Best For: Active players, quick rewards
```

**Medium Voyage:**
```
Duration: 4 hours
Risk Level: Medium (80% success)
Rewards:
- BP: 5000-20000
- Materials: Rare-Epic
- Equipment: Uncommon-Rare (common)

Cost: Free
Cooldown: None
Best For: Semi-active players, balanced rewards
```

**Long Voyage:**
```
Duration: 12 hours
Risk Level: High (70% success)
Rewards:
- BP: 20000-100000
- Materials: Epic-Legendary
- Equipment: Rare-Epic (uncommon)

Cost: Free
Cooldown: None
Best For: Idle players, high rewards
```

**Extended Voyage:**
```
Duration: 24 hours
Risk Level: Very High (60% success)
Rewards:
- BP: 50000-200000
- Materials: Epic-Mythic
- Equipment: Epic-Legendary (rare)

Cost: Free
Cooldown: None
Best For: Very idle players, maximum rewards
VIP Requirement: VIP 5+
```

### Risk System

#### Success Rate Formula
```
Success Rate = Base Rate + (Hero Power / Power Threshold) × Bonus

Base Rates:
- Short: 90%
- Medium: 80%
- Long: 70%
- Extended: 60%

Power Threshold: 10000
Bonus: 0.01% per 100 power above threshold
Max Success Rate: 95% (hard cap)
```

#### Failure Consequences
```
On Failure:
- Lose 50% of rewards
- Still get 50% of BP
- No materials/equipment
- Can use items to prevent failure (cost: Crystals)
```

#### Success Boosters
```
Items to Increase Success:
- Voyage Charm (Common): +5% success (cost: 50 Crystals)
- Voyage Charm (Rare): +10% success (cost: 200 Crystals)
- Voyage Charm (Epic): +20% success (cost: 500 Crystals)
```

### Voyage Slots

#### Slot System
```
Free Players: 1 slot
VIP 1-2: 1 slot
VIP 3-4: 2 slots
VIP 5-7: 3 slots
VIP 8-10: 4 slots
VIP 11+: 5 slots (max)
```

#### Slot Management
```
- Can start multiple voyages simultaneously
- Each slot independent
- Can cancel voyage (no rewards, no refund)
- Can speed up dengan Crystals (1 Crystal = 1 minute)
```

---

## 🎁 Voyage Pack System

### Daily Pack
```
Availability: Once per day (free)
Reset: Daily at server reset (00:00)
Rewards: Random RNG

Reward Pool:
- BP: 1000-10000 (weighted)
- Materials: Common-Rare (weighted)
- Equipment: Common-Uncommon (rare)
- Crystals: 10-100 (very rare, 1% chance)

Guaranteed: At least 1000 BP
```

### Weekly Pack
```
Availability: Once per week (free)
Reset: Weekly on Monday 00:00
Rewards: Better than daily

Reward Pool:
- BP: 10000-50000 (weighted)
- Materials: Rare-Epic (weighted)
- Equipment: Uncommon-Rare (common)
- Crystals: 50-500 (rare, 5% chance)

Guaranteed: At least 10000 BP + 1 Rare Material
```

### Event Pack
```
Availability: During events only
Reset: Per event
Rewards: Event-specific

Reward Pool:
- Event Currency
- Event-exclusive Materials
- Event Equipment
- Special Items

Guaranteed: Event currency + materials
```

### Pack Opening
```
Mechanic:
- Click to open
- Animation (optional)
- Reveal rewards
- Auto-claim to inventory

Visual:
- Pack icon
- Rarity glow (based on best reward)
- Animation on open
```

---

## 🏪 Shop System

### BP Shop

#### Concept
- Items purchasable dengan BP
- Refreshes every 6 hours (free)
- Can refresh instantly (cost: 50 Crystals)
- Limited stock per item

#### Available Items
```
Materials:
- Ore: 100 BP (stock: 10)
- Essence: 500 BP (stock: 5)
- Runes: 1000 BP (stock: 3)
- Relic Shards: 10000 BP (stock: 1, rare)

Equipment:
- Common: 500 BP (stock: 5)
- Uncommon: 2000 BP (stock: 3)
- Rare: 5000 BP (stock: 1, rare)

Consumables:
- HP Potion: 50 BP (stock: 20)
- EXP Boost (1h): 200 BP (stock: 5)
- Drop Rate Boost (1h): 500 BP (stock: 3)
```

#### Refresh System
```
Free Refresh:
- Every 6 hours
- Automatic
- New random items

Instant Refresh:
- Cost: 50 Crystals
- Immediate
- New random items
- Unlimited uses
```

### Crystal Shop

#### Concept
- Premium items
- Real money currency
- Better value items
- Exclusive items

#### Available Items
```
Battle Pass:
- Premium: 1000 Crystals
- Premium+: 2000 Crystals

Material Packs:
- Small Pack: 200 Crystals (100 Ore, 50 Essence)
- Medium Pack: 500 Crystals (500 Ore, 200 Essence)
- Large Pack: 1000 Crystals (2000 Ore, 1000 Essence)

Equipment Packs:
- Rare Pack: 500 Crystals (1 Rare equipment)
- Epic Pack: 2000 Crystals (1 Epic equipment)
- Legendary Pack: 5000 Crystals (1 Legendary equipment)

Convenience:
- Speed Up (1h): 50 Crystals
- Auto Claim (7 days): 500 Crystals
- Inventory Expansion: 200 Crystals per +10 slots
```

### VIP Shop

#### Concept
- Exclusive items untuk VIP
- Better rates
- VIP-only items
- Discounts applied

#### Available Items
```
VIP-Exclusive Equipment:
- VIP 5+: Rare equipment
- VIP 10+: Epic equipment
- VIP 15+: Legendary equipment

VIP Materials:
- Better rates than regular shop
- Exclusive materials
- Bulk discounts

VIP Cosmetics:
- Exclusive skins
- VIP frames
- Special titles
```

### Event Shop

#### Concept
- Limited time items
- Event currency required
- Event-exclusive rewards
- Time-limited availability

#### Event Currency
```
Sources:
- Event quests
- Event battles
- Event achievements
- Event login rewards

Usage:
- Buy event items
- Convert to regular currency (limited)
- Event-exclusive purchases
```

---

## 🛒 Special Market

### Player-to-System Market

#### Concept
- Sell equipment/materials untuk currency
- Auto-pricing system
- Instant sale
- No player-to-player (simpler)

#### Selling System
```
Equipment Sale:
- Price = Base Value × Rarity Multiplier × Level Multiplier
- Base Value: 100 BP
- Rarity Multipliers:
  * Common: 1.0x
  * Uncommon: 2.0x
  * Rare: 5.0x
  * Epic: 10.0x
  * Legendary: 20.0x
  * Mythic: 50.0x
  * Ancient: 100.0x
- Level Multiplier: 1 + (Level × 0.1)

Material Sale:
- Fixed prices
- Ore: 10 BP each
- Essence: 50 BP each
- Runes: 100 BP each
- Relic Shards: 1000 BP each
```

#### Buying from System
```
System Stock:
- Rotating items
- Limited quantities
- Higher prices than selling
- Refresh daily

Items Available:
- Equipment (random)
- Materials (bulk)
- Consumables
```

### Auction/Trade (Optional - Future)

#### Concept
- Player-to-player trading
- Auction house
- Blockchain integration ready
- Optional feature

#### Implementation (If Added)
```
Auction House:
- List items for sale
- Set price atau auction
- Other players can buy/bid
- System takes small fee (5%)

Trade System:
- Direct player-to-player trade
- Both players confirm
- Anti-scam measures
- Limited to prevent RMT abuse
```

---

## 📊 Mode Progression

### Mode Unlock Schedule
```
Stage 1: Adventure Mode (unlocked)
Stage 10: Equipment System (unlocked)
Stage 25: Skill System (unlocked)
Stage 50: Voyage System (unlocked)
Stage 75: Shop System (unlocked)
Stage 100: Social Features (unlocked)
Stage 150: Advanced Modes (unlocked)
```

### Mode Integration
```
All Modes Work Together:
- Adventure: Main progression
- Voyage: Passive rewards
- Shop: Resource management
- Market: Economy balance
- Events: Special content
```

---

**Document Version:** 1.0.0  
**Last Updated:** 2025-01-27

