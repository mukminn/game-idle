# Game Design Document - Idle RPG

## 📖 Table of Contents

1. [Konsep Dasar Game](#1-konsep-dasar-game)
2. [Sistem Akun & Profil](#2-sistem-akun--profil)
3. [Mata Uang & Ekonomi](#3-mata-uang--ekonomi)
4. [Sistem Hero](#4-sistem-hero-karakter-utama)
5. [Equipment & Gear](#5-equipment--gear-lengkap)
6. [Sistem Skill](#6-sistem-skill)
7. [Auto Battle & Adventure](#7-auto-battle--adventure)
8. [Mode Game Tambahan](#8-mode-game-tambahan)
9. [Sosial & Komunitas](#9-sosial--komunitas)
10. [Leaderboard](#10-leaderboard)
11. [Sistem First Purchase](#11-sistem-first-purchase)
12. [Event & Live Ops](#12-event--live-ops)
13. [Sistem Idle Reward](#13-sistem-idle-reward)
14. [Balancing & Progression](#14-balancing--progression)
15. [Backend & Data](#15-backend--data)
16. [Monetization](#16-monetization-halus--aman)

---

## 1. Konsep Dasar Game

### Genre & Platform
- **Genre:** Idle RPG / Auto Battle / Progression RPG
- **Platform:** Mobile (iOS/Android) & Web (Browser)
- **Future:** Blockchain-ready architecture (optional integration)

### Core Gameplay Loop

```
[Auto Battle] → [Collect Resources] → [Upgrade Hero/Equipment] → [Progress Stage] → [Repeat]
```

### Gameplay Philosophy

**Player Control:**
- ❌ **TIDAK** mengontrol pertarungan secara manual
- ✅ **YA** mengontrol:
  - Upgrade atribut hero
  - Mengatur equipment & gear
  - Memilih dan upgrade skill
  - Mengatur strategi pasif (talent tree)
  - Memilih target stage
  - Mengatur auto battle settings

**Core Appeal:**
- Progression yang memuaskan
- Strategi build customization
- Idle rewards yang berarti
- Multiple progression paths
- Long-term goals

### Target Audience
- Casual gamers yang suka idle games
- RPG fans yang suka progression
- Players yang ingin game yang bisa dimainkan sambil melakukan hal lain
- Competitive players (leaderboard)

---

## 2. Sistem Akun & Profil

### 2.1 Login Methods

#### Guest Account
- Auto-generated ID
- Data tersimpan lokal
- **Warning:** Data hilang jika uninstall
- Opsi upgrade ke permanent account

#### Email Login
- Email + Password
- Email verification (optional)
- Password recovery
- Account permanen

#### Social Login
- Google Sign-In
- Facebook (optional)
- Apple Sign-In (iOS)

#### Wallet Login (Optional - Blockchain)
- MetaMask
- WalletConnect
- Web3 wallet integration
- NFT integration ready

### 2.2 Profil Akun

#### Basic Info
```
- Username (3-20 karakter, unique)
- Avatar (default + unlockable)
- Frame Avatar (VIP / Event exclusive)
- Account Level (1-100)
- Account EXP
- Account Creation Date
- Last Login Date
```

#### Statistik Profil
```
- Total Power (highest achieved)
- Total Monsters Killed
- Total Bosses Defeated
- Total Playtime (hours)
- Current Stage
- Highest Stage Reached
- Total BP Earned (lifetime)
- Total Crystals Spent
- VIP Level
- Achievement Points
```

### 2.3 Sistem VIP

#### VIP Levels (0-15)

| VIP Level | Requirements | Benefits |
|-----------|-------------|----------|
| 0 | Free | Base rates |
| 1 | 1x Purchase | +5% Drop Rate, +1 Speed Option |
| 2 | 3x Purchase | +10% Drop Rate, +2 Speed Options |
| 3 | 5x Purchase | +15% Drop Rate, +3 Speed Options, +1 Idle Slot |
| 4 | 10x Purchase | +20% Drop Rate, +4 Speed Options, +2 Idle Slots |
| 5 | 20x Purchase | +25% Drop Rate, +5 Speed Options, +3 Idle Slots, +5% Shop Discount |
| ... | ... | ... |
| 15 | 1000x Purchase | +100% Drop Rate, All Speed Options, Max Idle Slots, +50% Shop Discount, Auto Claim |

#### VIP Benefits Detail

**Drop Rate Bonus:**
- Formula: `Base Drop Rate × (1 + VIP Bonus%)`
- Stack dengan event bonus

**Speed Auto Battle:**
- Free: x1, x2
- VIP 1: +x3
- VIP 2: +x4
- VIP 3+: +x5

**Idle Reward Slots:**
- Free: 1 slot (BP only)
- VIP 3: +1 slot (BP + Materials)
- VIP 4: +1 slot (BP + Materials + Equipment)
- Max: 5 slots

**Shop Discount:**
- VIP 5: 5% discount
- VIP 10: 25% discount
- VIP 15: 50% discount

**Auto Claim:**
- VIP 10+: Auto claim idle rewards
- VIP 15: Auto claim semua rewards

---

## 3. Mata Uang & Ekonomi

### 3.1 Battle Point (BP)

**Sumber:**
- Membunuh musuh (base: 1-10 BP per kill)
- Stage completion bonus
- Idle rewards
- Daily quests
- Achievement rewards

**Penggunaan:**
- Upgrade hero attributes
- Upgrade equipment (enhance)
- Buy items di BP Shop
- Skill upgrade (basic)

**Formula Drop:**
```
BP per Kill = Base BP × Stage Multiplier × VIP Bonus × Event Bonus
Stage Multiplier = 1 + (Stage Number × 0.1)
```

### 3.2 Kristal (Premium Currency)

**Sumber:**
- First purchase bonus
- Daily login rewards
- Achievement milestones
- Event rewards
- Invite friend rewards
- Battle Pass rewards
- **Purchase** (real money)

**Penggunaan:**
- Buy premium items
- Speed up upgrades
- Buy Battle Pass
- Buy VIP Shop items
- Refresh shop
- Buy convenience items

**Conversion Rate:**
- 1 USD = 100 Kristal (base)
- Bonus packages available

### 3.3 Koin (Cashable Coin - Optional)

**Sumber:**
- Boss rewards (rare)
- Voyage rewards (rare)
- Market sales
- Special events

**Penggunaan:**
- Withdraw (blockchain integration)
- Convert to real currency
- Buy exclusive items
- Trade with other players (optional)

**Note:** Sistem ini opsional dan bisa diaktifkan jika ada blockchain integration.

### 3.4 Material Upgrade

#### Ore
- **Sumber:** Mining, idle rewards, shop
- **Penggunaan:** Equipment enhance
- **Types:** Iron, Silver, Gold, Platinum, Mythril

#### Essence
- **Sumber:** Boss drops, events
- **Penggunaan:** Skill upgrade, hero evolution
- **Types:** Fire, Ice, Dark, Light, Nature

#### Rune
- **Sumber:** Elite enemies, special stages
- **Penggunaan:** Equipment enchant
- **Types:** Attack, Defense, HP, Crit, Speed

#### Relic Shard
- **Sumber:** World Boss, special events
- **Penggunaan:** Craft legendary equipment
- **Rarity:** Common, Rare, Epic, Legendary

### 3.5 Economy Sinks

**BP Sinks:**
- Hero upgrades (exponential cost)
- Equipment enhance (exponential cost)
- Skill upgrades

**Crystal Sinks:**
- Premium shop items
- Battle Pass
- Convenience purchases
- VIP upgrades

**Material Sinks:**
- Equipment crafting
- Equipment upgrade
- Skill evolution

---

## 4. Sistem Hero (Karakter Utama)

### 4.1 Hero Concept

**Single Hero System:**
- Player memiliki 1 hero utama
- **TIDAK** ada gacha karakter
- Hero berkembang melalui upgrade dan customization
- Focus pada depth, bukan breadth

### 4.2 Atribut Dasar

#### Primary Stats
```
HP (Health Points)
- Base: 100
- Growth per level: +50
- Max: 1,000,000+

ATK (Attack)
- Base: 10
- Growth per level: +5
- Max: 100,000+

DEF (Defense)
- Base: 5
- Growth per level: +2
- Max: 50,000+
```

#### Secondary Stats
```
Crit Rate (%)
- Base: 5%
- Max: 100%
- Formula: Crit Chance = Base + Equipment + Skill

Crit Damage (%)
- Base: 150%
- Max: 500%
- Formula: Crit DMG = Base + Equipment + Skill

Attack Speed
- Base: 1.0 attacks/second
- Max: 5.0 attacks/second
- Formula: Atk Speed = Base × (1 + Equipment Bonus + Skill Bonus)

Life Steal (%)
- Base: 0%
- Max: 50%
- Formula: Heal = Damage × Life Steal%
```

### 4.3 Hero Elements

**Available Elements:**
- 🔥 Fire
- ❄️ Ice
- ⚡ Lightning
- 🌑 Dark
- ☀️ Light
- 🌿 Nature

**Element System:**
- Hero memiliki 1 primary element
- Element menentukan:
  - Skill damage type
  - Elemental resistance
  - Elemental advantage (Fire > Ice > Nature > Fire)

**Element Change:**
- Bisa diubah dengan item (rare)
- Cost: 1000 Crystals

### 4.4 Hero Classes

**Available Classes:**
- ⚔️ Warrior (High HP, Balanced)
- 🗡️ Assassin (High ATK, Low HP)
- 🛡️ Tank (High DEF, High HP)
- 🎯 Ranger (High Crit, Balanced)
- 🔮 Mage (High ATK, Low DEF)
- ⚖️ Paladin (Balanced, High Life Steal)

**Class Change:**
- Bisa diubah dengan item (rare)
- Cost: 1000 Crystals
- Class menentukan base stats dan skill tree

### 4.5 Hero Progression

#### Level System
```
Level Range: 1 - 1000
EXP Required: Exponential curve
EXP Source: Killing enemies, completing stages
```

**Level Up Benefits:**
- +Base Stats (HP, ATK, DEF)
- +Skill Points
- +Talent Points
- Unlock new skills/features

#### Star System
```
Stars: 0★ - 10★
Star Up Requirements: Materials + BP
Star Up Benefits: +10% all stats per star
```

#### Evolution System
```
Evolution Stages: Base → Evolved → Awakened → Transcended
Requirements: Essence + Materials
Benefits: New skills, stat multipliers, visual changes
```

---

## 5. Equipment & Gear Lengkap

### 5.1 Equipment Slots

**9 Equipment Slots:**
1. ⚔️ Weapon (Pedang/Senjata)
2. 🪖 Helmet (Helm)
3. 👖 Pants (Celana)
4. 🧥 Armor (Jubah)
5. 💪 Bracers (Gelang)
6. 🧤 Gloves (Sarung Tangan)
7. 💍 Ring (Cincin)
8. 📿 Necklace (Kalung)
9. 🦅 Wings (Sayap)

### 5.2 Rarity System

**Rarity Tiers:**
```
Common (Gray)      → Base stats
Uncommon (Green)   → +20% stats
Rare (Blue)        → +50% stats
Epic (Purple)      → +100% stats
Legendary (Orange) → +200% stats
Mythic (Red)       → +400% stats
Ancient (Gold)     → +800% stats
```

**Rarity Benefits:**
- Higher base stats
- More substat slots
- Better set bonuses
- Higher max level

### 5.3 Equipment Properties

#### Base Stats
- Setiap equipment memberikan stat utama
- Weapon: ATK
- Armor pieces: DEF atau HP
- Accessories: Mix of secondary stats

#### Substats
- Random substats saat drop/craft
- Number of substats berdasarkan rarity:
  - Common: 0 substats
  - Uncommon: 1 substat
  - Rare: 2 substats
  - Epic: 3 substats
  - Legendary: 4 substats
  - Mythic: 5 substats
  - Ancient: 6 substats

**Substat Types:**
- ATK%
- DEF%
- HP%
- Crit Rate%
- Crit Damage%
- Attack Speed%
- Life Steal%
- Elemental Damage%
- Elemental Resistance%

### 5.4 Equipment Upgrade Systems

#### Enhance (Level Up)
```
Max Level per Rarity:
- Common: 10
- Uncommon: 20
- Rare: 30
- Epic: 40
- Legendary: 50
- Mythic: 60
- Ancient: 80

Cost: BP + Ore
Formula: Cost = Base × (Level^1.5)
```

#### Refine (Star Up)
```
Max Stars: 10★
Cost: Materials + BP
Benefits: +5% stats per star
```

#### Awaken
```
Awaken Levels: 0-5
Requirements: Duplicate equipment + Materials
Benefits: Unlock set bonus tiers, +10% stats per level
```

#### Enchant
```
Enchant Slots: Based on rarity
Enchant Types: Runes
Benefits: Add specific stat bonuses
Cost: Runes + BP
```

### 5.5 Set Bonus System

**Set Types:**
- 2-Piece Set: Minor bonus
- 4-Piece Set: Medium bonus
- 6-Piece Set: Major bonus

**Set Examples:**
```
Warrior Set (2/4/6):
- 2: +10% ATK
- 4: +20% HP, +10% DEF
- 6: +30% ATK, +15% Life Steal

Mage Set (2/4/6):
- 2: +15% Skill Damage
- 4: +25% ATK, -10% Skill Cooldown
- 6: +50% Skill Damage, +20% Crit Rate
```

---

## 6. Sistem Skill

### 6.1 Skill Categories

#### Active Skills (Auto Cast)
- Skill yang otomatis digunakan dalam battle
- Cooldown based
- Mana/Energy cost
- Upgradeable level

**Examples:**
- Fireball (Mage)
- Slash (Warrior)
- Stealth Strike (Assassin)
- Shield Bash (Tank)

#### Passive Skills
- Always active
- Provide stat bonuses
- Conditional effects
- Stack dengan equipment

**Examples:**
- Berserker Rage (+ATK when HP < 50%)
- Iron Skin (+DEF)
- Critical Mastery (+Crit Rate)

#### Ultimate Skill
- Powerful skill dengan long cooldown
- Unlock di level tertentu
- Visual effects
- High damage/utility

**Examples:**
- Meteor Strike
- Divine Protection
- Time Stop

### 6.2 Talent Tree System

**Three Paths:**

#### 1. Damage Path
```
Nodes:
- +ATK%
- +Crit Rate%
- +Crit Damage%
- +Skill Damage%
- +Elemental Damage%
- Ultimate: +100% ATK for 10s after kill
```

#### 2. Defense Path
```
Nodes:
- +HP%
- +DEF%
- +Life Steal%
- +Damage Reduction%
- +Shield Generation
- Ultimate: Invincibility for 3s when HP < 20%
```

#### 3. Idle Reward Path
```
Nodes:
- +BP Gain%
- +Drop Rate%
- +Idle Time%
- +Material Gain%
- +Gold Gain%
- Ultimate: Double idle rewards once per day
```

**Talent Points:**
- Earned per level up
- Limited points (strategic choices)
- Can reset dengan item (cost: Crystals)

### 6.3 Skill Upgrade System

#### Level Upgrade
```
Max Level: 100
Cost: BP + Essence
Formula: Cost = Base × (Level^1.2)
Benefits: +Damage, -Cooldown, +Effect
```

#### Evolution
```
Evolution Stages: I → II → III → MAX
Requirements: Essence + Materials
Benefits: New effects, visual changes, stat multipliers
```

#### Unlock Effects
- Certain levels unlock additional effects
- Example: Level 10 = +Burn effect, Level 25 = +Stun chance

---

## 7. Auto Battle & Adventure

### 7.1 Auto Battle System

**Core Mechanic:**
- Battle berjalan otomatis tanpa input player
- Hero auto-attack enemies
- Skills auto-cast berdasarkan priority
- Auto-retry jika kalah

**Settings:**
- Auto Progression: ON/OFF
- Auto Retry: ON/OFF
- Speed: x1, x2, x3, x4, x5 (VIP dependent)
- Target Priority: Nearest / Lowest HP / Highest Threat

### 7.2 Stage System

#### Stage Structure
```
World → Chapter → Stage
- 10 Worlds
- 10 Chapters per World
- 20 Stages per Chapter
Total: 2000+ Stages
```

#### Stage Types

**Normal Stage:**
- 10-20 enemies
- 1 Elite enemy (optional)
- Completion reward: BP + Materials

**Boss Stage:**
- 1 Boss enemy
- Higher HP, higher rewards
- Unlock next chapter

**Elite Stage:**
- Multiple elite enemies
- Better drop rates
- Limited attempts (3 per day)

### 7.3 Enemy Types

#### Minion
- Weak enemies
- Spawn in groups
- Low HP, low rewards
- Purpose: Resource farming

#### Elite
- Stronger enemies
- Higher HP, higher rewards
- Special abilities
- Better drop rates

#### Boss
- Very strong enemies
- Unique abilities
- High rewards
- Story progression gates

**Boss Categories:**

1. **Story Boss**
   - Campaign progression
   - One-time clear
   - Story rewards

2. **World Boss**
   - Daily/weekly boss
   - High HP (millions)
   - Damage ranking rewards
   - Guild participation (optional)

3. **Timed Boss**
   - Event bosses
   - Limited time
   - Special rewards

### 7.3 Battle Mechanics

#### Combat Formula
```
Damage = (ATK × Skill Multiplier × Crit Multiplier) - (DEF × Defense Reduction)
Final Damage = Damage × Elemental Advantage × Buffs × Debuffs
```

#### Auto Retry
- Jika hero mati, auto retry setelah 3 detik
- Bisa di-disable
- Cost: None (infinite retries)

#### Auto Progression
- Auto lanjut ke stage berikutnya jika menang
- Stop jika kalah atau mencapai checkpoint
- VIP feature: Auto progress sampai boss stage

---

## 8. Mode Game Tambahan

### 8.1 Adventure Mode

**Story Campaign:**
- Main progression path
- Unlock fitur secara bertahap
- Story cutscenes (optional)
- Chapter rewards

**Unlock Schedule:**
```
Chapter 1: Tutorial (unlocked)
Chapter 2: Unlock Equipment System
Chapter 3: Unlock Skill System
Chapter 4: Unlock Voyage System
Chapter 5: Unlock Shop
Chapter 6: Unlock Social Features
... (continues)
```

### 8.2 Voyage System

**Concept:**
- Kirim hero ke voyage (expedition)
- Hero tidak bisa battle selama voyage
- Passive rewards saat kembali
- Risk/reward mechanic

**Voyage Types:**

#### Short Voyage
- Duration: 1 hour
- Risk: Low
- Rewards: BP, Common Materials

#### Medium Voyage
- Duration: 4 hours
- Risk: Medium
- Rewards: BP, Rare Materials, Equipment

#### Long Voyage
- Duration: 12 hours
- Risk: High
- Rewards: BP, Epic Materials, Rare Equipment

**Risk System:**
- Success Rate: 70% - 95% (based on hero power)
- Failure: Lose 50% rewards
- Can use items to increase success rate

**Voyage Slots:**
- Free: 1 slot
- VIP: +1 slot per VIP level (max 5)

### 8.3 Voyage Pack

**Daily Pack:**
- Free daily pack
- Random rewards
- BP, Materials, Equipment (common-rare)

**Weekly Pack:**
- Free weekly pack
- Better rewards
- Rare-Epic items

**Event Pack:**
- Limited time packs
- Special rewards
- Event-exclusive items

### 8.4 Shop System

#### BP Shop
- Items purchasable dengan BP
- Refresh: Every 6 hours (free) or instant (Crystals)
- Items: Materials, Common Equipment, Consumables

#### Crystal Shop
- Premium items
- Battle Pass
- VIP items
- Convenience items

#### VIP Shop
- Exclusive items untuk VIP
- Better rates
- Exclusive equipment/skins

#### Event Shop
- Limited time items
- Event currency
- Exclusive rewards

### 8.5 Special Market

**Player-to-System Market:**
- Sell equipment untuk BP/Crystals
- Sell materials untuk BP
- Auto-pricing berdasarkan rarity/level

**Auction/Trade (Optional):**
- Player-to-player trading
- Auction house
- Blockchain integration ready

---

## 9. Sosial & Komunitas

### 9.1 Friend System

**Features:**
- Add friends via ID/Username
- Friend list (max 50)
- Send/receive gifts daily
- Friend power ranking
- Visit friend profile

**Friend Gifts:**
- Daily send: 10 BP per friend
- Daily receive: Up to 500 BP (50 friends)
- Reset: Daily at server reset

### 9.2 Invite System

**Invite Rewards:**
- Inviter: 100 Crystals per friend (max 10)
- Invitee: 500 Crystals + Starter Pack

**Milestone Rewards:**
- 5 friends: 500 Crystals
- 10 friends: 1000 Crystals + Exclusive Skin
- 20 friends: 2000 Crystals + Legendary Equipment

### 9.3 Social Rewards

**Login Together:**
- Guild/Group login bonus
- Stacking rewards untuk active groups

**Friend Milestone:**
- Combined friend achievements
- Group rewards

### 9.4 Chat System (Optional)

**Global Chat:**
- World chat
- Stage-based chat channels
- Moderation system

**Guild Chat:**
- Private guild communication
- Guild announcements

---

## 10. Leaderboard

### 10.1 Ranking Types

#### Power Ranking
- Based on total hero power
- Real-time updates
- Top 1000 players

#### Stage Ranking
- Based on highest stage reached
- Tie-breaker: Completion time
- Top 1000 players

#### Boss Damage Ranking
- Based on World Boss damage
- Weekly reset
- Top 100 players per boss

### 10.2 Ranking Rewards

**Weekly Reset:**
- Reset setiap Senin 00:00 (server time)
- Rewards distributed via mail

**Reward Tiers:**
```
Rank 1: 5000 Crystals + Exclusive Title + Legendary Equipment
Rank 2-10: 2000 Crystals + Rare Equipment
Rank 11-50: 1000 Crystals + Epic Equipment
Rank 51-100: 500 Crystals + Materials
Rank 101-500: 200 Crystals
Rank 501-1000: 100 Crystals
```

### 10.3 Ranking Features

- View top players
- Compare dengan friends
- Ranking history
- Season rewards (monthly)

---

## 11. Sistem First Purchase

### 11.1 First Purchase Bonus

**Package Contents:**
- 2000 Crystals (2x value)
- Exclusive Hero Skin
- Legendary Equipment Set
- VIP Level 1
- Starter Materials Pack
- Exclusive Title: "First Hero"

**Value:**
- Normal value: $20
- First purchase: $10
- Bonus value: $30+ in items

### 11.2 Exclusive Items

**Hero Skin:**
- "Founder" skin
- Unique visual
- Cannot be obtained elsewhere

**Wings:**
- "First Flight" wings
- Cosmetic only
- Status symbol

**Title:**
- "First Hero" title
- Displayed in profile
- Permanent

---

## 12. Event & Live Ops

### 12.1 Daily Events

**Daily Login:**
- Day 1: 100 Crystals
- Day 2: 200 Crystals
- Day 3: 300 Crystals + Materials
- Day 4: 400 Crystals + Equipment
- Day 5: 500 Crystals + Rare Materials
- Day 6: 600 Crystals + Epic Equipment
- Day 7: 1000 Crystals + Legendary Equipment
- Reset: Weekly cycle

**Daily Quests:**
- Kill 100 enemies: 50 BP
- Complete 10 stages: 100 BP
- Upgrade equipment: 50 BP
- Complete voyage: 100 BP
- Total: 300 BP + 50 Crystals

### 12.2 Weekly Events

**Weekly Challenges:**
- Reach stage milestone
- Defeat X bosses
- Collect X materials
- Rewards: Crystals, Materials, Equipment

**Weekly Boss:**
- Special boss dengan high rewards
- Damage ranking
- Participation rewards

### 12.3 Limited Time Events

**Seasonal Events:**
- Holiday themes
- Special stages
- Exclusive rewards
- Limited shop

**Double Rewards:**
- Double BP weekends
- Double drop rate events
- Double experience events

### 12.4 Battle Pass (Seasonal Pass)

**Free Track:**
- 30 levels
- Rewards: BP, Materials, Common Equipment
- Progress: Daily/Weekly quests

**Premium Track:**
- Cost: 1000 Crystals
- 30 levels
- Rewards: Crystals, Rare Equipment, Exclusive Skins
- Same progress as free track

**Premium+ Track:**
- Cost: 2000 Crystals
- Instant unlock 10 levels
- Exclusive rewards
- All premium rewards

**Season Duration:**
- 4 weeks per season
- New rewards setiap season
- Progress resets

---

## 13. Sistem Idle Reward

### 13.1 Offline Rewards

**Concept:**
- Player dapat rewards meskipun offline
- Based on stage progress
- Limited by max idle time

**Reward Calculation:**
```
Idle Time = Min(Time Offline, Max Idle Time)
BP Reward = Stage BP Rate × Idle Time × VIP Bonus
Material Reward = Stage Drop Rate × Idle Time × VIP Bonus
```

### 13.2 Max Idle Time

**Base:**
- Free: 8 hours
- VIP 1: 12 hours
- VIP 3: 16 hours
- VIP 5: 20 hours
- VIP 10: 24 hours
- VIP 15: 48 hours

### 13.3 Idle Reward Slots

**Slot System:**
- Multiple reward types dalam 1 claim
- Free: 1 slot (BP only)
- VIP: Additional slots

**Slot Types:**
1. BP Slot
2. Material Slot
3. Equipment Slot
4. Crystal Slot (rare)
5. Essence Slot

### 13.4 Auto Claim

**VIP Feature:**
- VIP 10+: Auto claim saat login
- VIP 15: Auto claim setiap 1 hour (even offline)

**Manual Claim:**
- Free players: Manual claim
- Can claim partial (if multiple slots)

---

## 14. Balancing & Progression

### 14.1 Soft Wall & Hard Wall

**Soft Wall:**
- Natural difficulty increase
- Requires minor upgrades
- Can overcome dengan grinding
- Purpose: Encourage engagement

**Hard Wall:**
- Significant difficulty spike
- Requires major upgrades atau strategy change
- Purpose: Encourage spending atau long-term play

**Wall Placement:**
- Every 10 stages: Soft wall
- Every 50 stages: Medium wall
- Every 100 stages: Hard wall

### 14.2 Scaling Enemy

**Enemy Power Formula:**
```
Enemy Power = Base Power × (Stage Number^1.1) × Difficulty Multiplier
Enemy HP = Base HP × (Stage Number^1.15)
Enemy ATK = Base ATK × (Stage Number^1.1)
```

**Difficulty Multipliers:**
- Normal: 1.0x
- Elite: 2.0x
- Boss: 5.0x

### 14.3 Catch-Up Mechanic

**New Player Bonuses:**
- First 7 days: +50% EXP, +50% BP
- First 30 days: +25% EXP, +25% BP
- Starter packs dengan good value

**Returning Player:**
- 7+ days offline: Welcome back bonus
- Double idle rewards untuk 3 days
- Catch-up quests

### 14.4 Anti Pay-to-Win

**Design Principles:**
1. **Skill Matters:** Strategy dan build > spending
2. **Time = Value:** F2P players bisa catch up dengan time
3. **Convenience > Power:** Spending untuk convenience, bukan raw power
4. **Fair Progression:** No exclusive power items di shop

**Monetization Focus:**
- Skins (cosmetic)
- Convenience (speed, auto-claim)
- Time savers (not power)
- VIP benefits (QoL, not mandatory)

---

## 15. Backend & Data

### 15.1 Server Architecture

**Server Authoritative:**
- All calculations server-side
- Client hanya display
- Anti-cheat built-in

**Database:**
- Player data
- Equipment data
- Transaction logs
- Economy tracking

### 15.2 Anti-Cheat

**Measures:**
- Server-side validation
- Rate limiting
- Anomaly detection
- Transaction logging
- Ban system

**Detection:**
- Impossible stat values
- Unrealistic progression speed
- Modified client detection
- Exploit detection

### 15.3 Log Transaksi

**Logged Events:**
- All purchases
- All upgrades
- All item acquisitions
- All currency transactions
- All progression milestones

**Purpose:**
- Economy tracking
- Fraud detection
- Player support
- Analytics

### 15.4 Economy Sink

**Sink Mechanisms:**
- Upgrade costs (exponential)
- Equipment enhance costs
- Skill upgrade costs
- Shop purchases
- Reset costs

**Balance:**
- Sink rate = Source rate (long-term)
- Periodic adjustments
- Live economy monitoring

### 15.5 Config Live Update

**Updateable Configs:**
- Shop prices
- Drop rates
- Event parameters
- Balancing values
- Feature flags

**Update Method:**
- Hot reload (no client update)
- A/B testing support
- Gradual rollout

---

## 16. Monetization (Halus & Aman)

### 16.1 VIP System
- See Section 2.3 for details
- Pay for convenience, not power
- Fair value proposition

### 16.2 Skins & Cosmetics
- Hero skins
- Weapon skins
- Wing skins
- Avatar frames
- Titles
- **No gameplay impact**

### 16.3 Battle Pass
- See Section 12.4 for details
- Good value untuk engaged players
- Optional purchase

### 16.4 Convenience Items
- Speed boosts (temporary)
- Auto-claim items
- Inventory expansion
- Shop refresh
- **Time savers, not power**

### 16.5 Monetization Philosophy

**DO:**
- ✅ Sell convenience
- ✅ Sell cosmetics
- ✅ Sell time savers
- ✅ Fair value
- ✅ F2P viable

**DON'T:**
- ❌ Sell exclusive power
- ❌ Pay-to-win mechanics
- ❌ Predatory pricing
- ❌ Required spending
- ❌ Unfair advantages

---

## 📊 Summary

Game ini dirancang untuk:
- ✅ Long-term engagement
- ✅ Fair monetization
- ✅ Scalable architecture
- ✅ Player satisfaction
- ✅ Sustainable economy

**Next Steps:**
1. Review detailed system documents
2. Implement prototype
3. Test core loops
4. Iterate berdasarkan feedback
5. Launch dengan content pipeline

---

**Document Version:** 1.0.0  
**Last Updated:** 2025-01-27  
**Status:** Complete Design Phase

