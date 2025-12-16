# Economy Design Document - Idle RPG

## 📊 Overview

Dokumen ini menjelaskan desain ekonomi game secara detail, termasuk semua mata uang, sink/source mechanisms, balancing formulas, dan monetization strategy.

---

## 💰 Currency Systems

### 1. Battle Point (BP)

#### Source Mechanisms

**Primary Sources:**
```
1. Enemy Kills
   - Base: 1-10 BP per kill
   - Formula: Base BP × Stage Multiplier × VIP Bonus × Event Bonus
   - Stage Multiplier: 1 + (Stage × 0.1)
   - Example: Stage 100, VIP 5, No Event
     = 5 × (1 + 100×0.1) × 1.25 × 1.0
     = 5 × 11 × 1.25
     = 68.75 BP per kill

2. Stage Completion
   - Base: 100 BP
   - Formula: 100 × Stage Multiplier
   - Boss Stage: 500 × Stage Multiplier

3. Idle Rewards
   - Rate: Stage BP Rate × Time Offline
   - Max: 8-48 hours (VIP dependent)
   - Formula: (BP per Second × Seconds Offline) × VIP Bonus

4. Daily Quests
   - Total: 300 BP per day
   - Breakdown:
     * Kill 100 enemies: 50 BP
     * Complete 10 stages: 100 BP
     * Upgrade equipment: 50 BP
     * Complete voyage: 100 BP

5. Achievement Rewards
   - One-time rewards
   - Range: 100 - 10,000 BP
   - Based on milestone achievements
```

#### Sink Mechanisms

**Primary Sinks:**
```
1. Hero Upgrades
   - Level Up: Exponential cost
   - Formula: Base Cost × (Level^1.5)
   - Example: Level 50 = 1000 × (50^1.5) = 353,553 BP
   - Star Up: 10,000 × (Star Level^2)
   - Evolution: 100,000 × Evolution Stage

2. Equipment Enhance
   - Level Up: Base × (Level^1.5) × Rarity Multiplier
   - Rarity Multipliers:
     * Common: 1.0x
     * Uncommon: 1.2x
     * Rare: 1.5x
     * Epic: 2.0x
     * Legendary: 3.0x
     * Mythic: 5.0x
     * Ancient: 10.0x

3. Skill Upgrades
   - Level Up: Base × (Level^1.2)
   - Base Cost: 100 BP
   - Example: Level 50 = 100 × (50^1.2) = 1,585 BP

4. BP Shop Purchases
   - Materials: 100-1000 BP
   - Common Equipment: 500-2000 BP
   - Consumables: 50-500 BP
```

#### Daily BP Flow (Example Player - Stage 100)

**Sources:**
- Enemy Kills (1 hour play): ~25,000 BP
- Stage Completions: ~5,000 BP
- Idle Rewards (8 hours): ~20,000 BP
- Daily Quests: 300 BP
- **Total Daily Source: ~50,300 BP**

**Sinks:**
- Hero Upgrades: ~20,000 BP
- Equipment Enhance: ~15,000 BP
- Skill Upgrades: ~10,000 BP
- Shop Purchases: ~5,000 BP
- **Total Daily Sink: ~50,000 BP**

**Balance:** Slight positive flow untuk progression

---

### 2. Kristal (Premium Currency)

#### Source Mechanisms

**Free Sources:**
```
1. Daily Login
   - Day 1: 100
   - Day 2: 200
   - Day 3: 300
   - Day 4: 400
   - Day 5: 500
   - Day 6: 600
   - Day 7: 1000
   - Weekly Total: 3,100

2. Achievement Milestones
   - Stage 10: 100
   - Stage 50: 500
   - Stage 100: 1000
   - Stage 500: 5000
   - Power milestones: 100-5000

3. Event Rewards
   - Daily events: 50-200
   - Weekly events: 500-2000
   - Limited events: 1000-5000

4. Invite Friends
   - Per friend: 100 (max 10)
   - Total: 1000

5. Battle Pass (Free Track)
   - 30 levels
   - Total: ~500 Crystals

6. Leaderboard Rewards
   - Weekly: 100-5000 (based on rank)
```

**Paid Sources:**
```
Purchase Packages:
- Starter Pack: $5 = 500 Crystals (100 per $)
- Value Pack: $10 = 1200 Crystals (120 per $)
- Premium Pack: $20 = 2500 Crystals (125 per $)
- Mega Pack: $50 = 7000 Crystals (140 per $)
- Ultimate Pack: $100 = 15000 Crystals (150 per $)
```

#### Sink Mechanisms

**Primary Sinks:**
```
1. Battle Pass
   - Premium: 1000 Crystals
   - Premium+: 2000 Crystals

2. Shop Purchases
   - Premium Equipment: 500-5000
   - Materials Pack: 200-2000
   - Convenience Items: 50-500

3. Speed Upgrades
   - Instant complete: 10-100 per upgrade
   - Skip time: 1 Crystal per minute

4. Shop Refresh
   - Free refresh: Every 6 hours
   - Instant refresh: 50 Crystals

5. VIP Upgrades
   - VIP Level Up: 1000-10000 Crystals

6. Cosmetic Purchases
   - Skins: 500-2000
   - Wings: 1000-3000
   - Titles: 200-1000
```

#### Crystal Economy Balance

**Free Player (Monthly):**
- Daily Login: 3,100 × 4 = 12,400
- Achievements: ~5,000
- Events: ~3,000
- Battle Pass: 500
- Leaderboard: ~500
- **Total: ~21,400 Crystals/month**

**Paid Player (Monthly - $50):**
- Free sources: 21,400
- Purchase: 7,000
- **Total: ~28,400 Crystals/month**

---

### 3. Koin (Cashable Coin - Optional)

**Note:** Sistem ini opsional dan hanya aktif jika ada blockchain integration.

#### Source Mechanisms

```
1. World Boss Rewards
   - Top 10: 100-1000 Koin
   - Top 50: 50-500 Koin
   - Participation: 10-50 Koin

2. Voyage Rewards (Rare)
   - Success rate: 5%
   - Reward: 10-100 Koin

3. Market Sales
   - Sell equipment: 1-10% of value
   - Sell materials: 0.5-5% of value

4. Special Events
   - Limited time rewards
   - 50-500 Koin
```

#### Conversion Rates

```
Koin → Real Currency:
- 100 Koin = $1 USD
- Minimum withdrawal: 1000 Koin ($10)
- Withdrawal fee: 5%

Koin → In-Game:
- 100 Koin = 1000 Crystals
- 100 Koin = 100,000 BP
```

---

### 4. Material Economy

#### Ore (Equipment Enhance)

**Source:**
- Mining (idle): 10-100 per hour
- Enemy drops: 1-10 per kill (rare)
- Shop: 100 BP per ore
- Voyage: 50-500 per voyage

**Sink:**
- Equipment enhance: 10-1000 per upgrade
- Formula: Base × Equipment Level × Rarity

**Balance:**
- Daily source: ~500-1000
- Daily sink: ~300-800
- Slight surplus untuk stockpiling

#### Essence (Skill Upgrade)

**Source:**
- Boss drops: 10-100 per boss
- Events: 50-500
- Shop: 200 Crystals per 100
- Voyage: 20-200

**Sink:**
- Skill upgrade: 10-500 per upgrade
- Hero evolution: 1000-10000

**Balance:**
- Daily source: ~200-500
- Daily sink: ~150-400
- Balanced dengan occasional spikes

#### Rune (Equipment Enchant)

**Source:**
- Elite enemies: 1-5 per kill (rare)
- Special stages: 10-50
- Events: 20-200
- Shop: 500 Crystals per 10

**Sink:**
- Equipment enchant: 1-10 per enchant
- Rune upgrade: 5-50

**Balance:**
- Daily source: ~50-200
- Daily sink: ~30-150
- Rare resource, encourages strategic use

#### Relic Shard (Legendary Crafting)

**Source:**
- World Boss: 1-10 per boss
- Special events: 5-50
- Shop: 1000 Crystals per 1
- Very rare drops: 0.1% chance

**Sink:**
- Craft legendary equipment: 100-1000 shards
- Equipment awakening: 10-100

**Balance:**
- Weekly source: ~10-100
- Weekly sink: ~5-50
- Very rare, high value

---

## 📈 Economy Balancing

### Daily Economy Flow (Mid-Game Player - Stage 100)

#### Sources
```
BP: 50,300
Crystals: 100 (daily average)
Materials: 500-1000
```

#### Sinks
```
BP: 50,000
Crystals: 50 (daily average)
Materials: 300-800
```

#### Net Flow
```
BP: +300 (0.6% surplus)
Crystals: +50 (50% surplus)
Materials: +200-400 (40% surplus)
```

**Purpose:** Slight surplus memungkinkan progression dan stockpiling untuk major upgrades.

### Economy Scaling

**Early Game (Stage 1-50):**
- High source rate (catch-up mechanic)
- Low sink costs
- Fast progression
- **Purpose:** Onboarding, engagement

**Mid Game (Stage 50-200):**
- Balanced source/sink
- Moderate costs
- Steady progression
- **Purpose:** Core gameplay loop

**Late Game (Stage 200+):**
- Lower source rate
- Higher sink costs
- Slower progression
- **Purpose:** Long-term goals, retention

---

## 💵 Monetization Strategy

### Revenue Streams

#### 1. VIP System
- **Target:** Engaged players
- **Price:** $10-$1000 (cumulative)
- **Value:** Convenience, not power
- **Conversion:** 5-10% of players

#### 2. Battle Pass
- **Target:** Active players
- **Price:** $10-$20 per season
- **Value:** High value, time-limited
- **Conversion:** 15-25% of active players

#### 3. Cosmetic Sales
- **Target:** All players
- **Price:** $5-$30 per item
- **Value:** Status, customization
- **Conversion:** 10-20% of players

#### 4. Convenience Items
- **Target:** Busy players
- **Price:** $1-$10 per purchase
- **Value:** Time savers
- **Conversion:** 20-30% of players

#### 5. Starter Packs
- **Target:** New players
- **Price:** $5-$20
- **Value:** High value, one-time
- **Conversion:** 30-40% of new players

### Revenue Projections (Example)

**Assumptions:**
- 10,000 DAU
- 5% VIP conversion = 500 players
- Average VIP spend: $50
- 20% Battle Pass = 2,000 players × $10
- 15% Cosmetic = 1,500 players × $15
- 25% Convenience = 2,500 players × $5

**Monthly Revenue:**
- VIP: 500 × $50 = $25,000
- Battle Pass: 2,000 × $10 = $20,000
- Cosmetics: 1,500 × $15 = $22,500
- Convenience: 2,500 × $5 = $12,500
- **Total: ~$80,000/month**

**ARPU:** $8/month
**ARPPU:** $40/month

---

## 🎯 Economy Goals

### Player Goals
1. **F2P Viable:** Free players bisa enjoy game tanpa spending
2. **Fair Progression:** Spending tidak memberikan unfair advantage
3. **Value Perception:** Paid items memberikan good value
4. **No Paywall:** Tidak ada content yang locked behind paywall

### Business Goals
1. **Sustainable Revenue:** Consistent monthly revenue
2. **Player Retention:** Long-term engagement
3. **Fair Monetization:** Ethical, non-predatory
4. **Scalable Economy:** Bisa scale dengan player base

### Balancing Principles
1. **Source = Sink (Long-term):** Economy balanced over time
2. **Slight Surplus:** Allow progression dan stockpiling
3. **Spike Management:** Control major economy events
4. **Anti-Inflation:** Prevent currency devaluation

---

## 📊 Monitoring & Analytics

### Key Metrics

**Economy Health:**
- Currency inflation rate
- Sink/source ratio
- Average player currency holdings
- Spending distribution

**Player Behavior:**
- Daily currency earned/spent
- Upgrade frequency
- Shop purchase patterns
- VIP conversion rates

**Revenue:**
- ARPU (Average Revenue Per User)
- ARPPU (Average Revenue Per Paying User)
- Conversion rates
- Revenue by source

### Adjustments

**Live Tuning:**
- Adjust drop rates
- Modify shop prices
- Change upgrade costs
- Balance event rewards

**Update Schedule:**
- Weekly: Minor adjustments
- Monthly: Major balance changes
- Quarterly: Economy overhaul (if needed)

---

**Document Version:** 1.0.0  
**Last Updated:** 2025-01-27

