# Account & Profile System

## 📋 Overview

Sistem akun dan profil yang comprehensive untuk game Idle RPG, termasuk authentication, profile management, VIP system, dan statistik tracking.

---

## 🔐 Authentication System

### Login Methods

#### 1. Guest Account
**Features:**
- Auto-generated unique ID
- No email/password required
- Data stored locally + server (linked to device ID)
- **Warning:** Data loss risk jika uninstall

**Implementation:**
```
Guest ID Format: GUEST_<timestamp>_<random>
Device ID: Generated dari device fingerprint
```

**Upgrade Path:**
- Prompt untuk upgrade ke permanent account
- One-time migration process
- Preserve all progress

#### 2. Email Login
**Features:**
- Email + Password authentication
- Email verification (optional but recommended)
- Password recovery via email
- Account permanen

**Security:**
- Password hashing: bcrypt (cost factor 12)
- Email verification token (24h expiry)
- Password reset token (1h expiry)
- Rate limiting: 5 attempts per 15 minutes

#### 3. Social Login
**Supported Providers:**
- Google Sign-In (OAuth 2.0)
- Facebook Login (optional)
- Apple Sign-In (iOS only)

**Implementation:**
- OAuth 2.0 flow
- Store provider ID + email
- Link multiple providers to one account

#### 4. Wallet Login (Blockchain - Optional)
**Supported Wallets:**
- MetaMask
- WalletConnect
- Web3 wallets

**Features:**
- Wallet address sebagai identifier
- NFT integration ready
- Blockchain rewards (optional)

---

## 👤 Profile System

### Basic Profile Data

#### Username
```
Rules:
- Length: 3-20 characters
- Allowed: Letters, numbers, underscore
- Unique across platform
- Filtered for inappropriate content
- Can change: 1x per month (free), unlimited (VIP 5+)
```

#### Avatar System
```
Default Avatars: 10 free options
Unlockable Avatars:
- Achievement rewards
- Event rewards
- VIP rewards
- Purchase (cosmetic only)
```

#### Frame System
```
Default: No frame
Unlockable Frames:
- VIP frames (by VIP level)
- Event frames (limited time)
- Achievement frames
- Seasonal frames
```

### Account Level System

#### Level Progression
```
Level Range: 1-100
EXP Source: All gameplay activities
EXP Formula: Account EXP = Σ(Activity EXP)

Activity EXP:
- Complete stage: 10 EXP
- Defeat boss: 50 EXP
- Daily quest: 25 EXP
- Achievement: 100-1000 EXP
```

#### Level Benefits
```
Every Level:
- +1 Talent Point (max 50)
- Unlock new features (at milestones)
- Profile badge upgrade

Milestone Levels:
- Level 10: Unlock advanced features
- Level 25: Unlock social features
- Level 50: Unlock endgame content
- Level 100: Max level, prestige system (future)
```

---

## 📊 Statistik System

### Core Statistics

#### Total Power
```
Definition: Highest power achieved
Calculation: Real-time power calculation
Update: On every stat change
Display: In profile, leaderboard
```

#### Total Monsters Killed
```
Tracking: Increment on every enemy kill
Reset: Never (lifetime stat)
Display: Profile, achievements
```

#### Total Bosses Defeated
```
Tracking: Increment on boss kill
Types: Story Boss, World Boss, Event Boss
Reset: Never (lifetime stat)
```

#### Total Playtime
```
Tracking: Active playtime (not idle)
Unit: Hours (displayed as Xh Ym)
Reset: Never (lifetime stat)
Privacy: Can hide in settings
```

### Advanced Statistics

#### Progression Stats
```
- Current Stage
- Highest Stage Reached
- Stages Completed Today
- Average Stage Clear Time
```

#### Economy Stats
```
- Total BP Earned (lifetime)
- Total Crystals Spent
- Total Equipment Obtained
- Total Upgrades Performed
```

#### Combat Stats
```
- Total Damage Dealt
- Total Damage Taken
- Highest Single Hit
- Total Crits Landed
- Win Rate
```

#### Social Stats
```
- Friends Count
- Invites Sent
- Invites Completed
- Guild Contributions (if applicable)
```

---

## 👑 VIP System

### VIP Level Structure

#### Level 0 (Free)
```
Benefits:
- Base drop rates
- Speed: x1, x2
- Idle time: 8 hours
- 1 idle reward slot
- No shop discount
```

#### VIP 1-5 (Low Tier)
```
VIP 1: $10 spent
- +5% Drop Rate
- Speed: +x3
- Idle time: 12 hours

VIP 2: $30 spent
- +10% Drop Rate
- Speed: +x4
- Idle time: 12 hours

VIP 3: $50 spent
- +15% Drop Rate
- Speed: +x5
- Idle time: 16 hours
- +1 Idle Slot

VIP 4: $100 spent
- +20% Drop Rate
- Speed: All options
- Idle time: 16 hours
- +2 Idle Slots

VIP 5: $200 spent
- +25% Drop Rate
- Speed: All options
- Idle time: 20 hours
- +3 Idle Slots
- +5% Shop Discount
```

#### VIP 6-10 (Mid Tier)
```
VIP 6: $300 spent
- +30% Drop Rate
- Idle time: 20 hours
- +3 Idle Slots
- +10% Shop Discount

VIP 7: $400 spent
- +35% Drop Rate
- Idle time: 22 hours
- +4 Idle Slots
- +15% Shop Discount

VIP 8: $500 spent
- +40% Drop Rate
- Idle time: 22 hours
- +4 Idle Slots
- +20% Shop Discount

VIP 9: $750 spent
- +50% Drop Rate
- Idle time: 24 hours
- +4 Idle Slots
- +25% Shop Discount

VIP 10: $1000 spent
- +60% Drop Rate
- Idle time: 24 hours
- +5 Idle Slots (max)
- +30% Shop Discount
- Auto Claim Idle Rewards
```

#### VIP 11-15 (High Tier)
```
VIP 11: $1500 spent
- +70% Drop Rate
- +35% Shop Discount
- Exclusive VIP Shop Access

VIP 12: $2000 spent
- +80% Drop Rate
- +40% Shop Discount
- VIP Exclusive Events

VIP 13: $3000 spent
- +90% Drop Rate
- +45% Shop Discount
- Priority Support

VIP 14: $5000 spent
- +95% Drop Rate
- +48% Shop Discount
- Custom Avatar Frame

VIP 15: $10000 spent
- +100% Drop Rate (double)
- +50% Shop Discount (half price)
- All previous benefits
- Exclusive Title: "VIP Legend"
- Auto Claim All Rewards
```

### VIP Progression

#### Spending Calculation
```
VIP Points = Total Real Money Spent (USD)
VIP Level = Function of VIP Points

Formula:
- VIP 1: $10
- VIP 2: $30
- VIP 3: $50
- VIP 4: $100
- VIP 5: $200
- VIP 6: $300
- VIP 7: $400
- VIP 8: $500
- VIP 9: $750
- VIP 10: $1000
- VIP 11: $1500
- VIP 12: $2000
- VIP 13: $3000
- VIP 14: $5000
- VIP 15: $10000
```

#### VIP Benefits Stacking
```
All benefits stack:
- Drop Rate: Base × (1 + VIP Bonus%)
- Speed: Unlock additional options
- Idle Time: Increase max time
- Slots: Add more reward slots
- Discount: Apply to all shop purchases
```

---

## 🎯 Achievement System

### Achievement Categories

#### Progression Achievements
```
- Reach Stage 10/50/100/500/1000
- Reach Account Level 10/25/50/100
- Reach Hero Level 50/100/200/500
- Complete X stages in a day
```

#### Combat Achievements
```
- Defeat 100/1000/10000 monsters
- Defeat 10/50/100 bosses
- Deal 1M/10M/100M damage
- Win 100/1000 battles
```

#### Collection Achievements
```
- Collect 10/50/100 equipment pieces
- Collect all rarity types
- Complete equipment set
- Collect all elements
```

#### Social Achievements
```
- Add 10/50 friends
- Invite 5/10/20 friends
- Join guild (if applicable)
- Participate in events
```

### Achievement Rewards
```
Rewards per Achievement:
- Crystals: 50-5000
- BP: 100-10000
- Exclusive items
- Titles
- Avatar frames
```

---

## 🔔 Notification System

### Notification Types

#### In-Game Notifications
```
- Idle rewards ready
- Daily quests available
- Event started/ending
- Friend gifts received
- Achievement unlocked
```

#### Push Notifications (Optional)
```
- Idle rewards ready (after max time)
- Daily login reminder
- Event notifications
- Friend activity
- Special offers
```

### Notification Settings
```
User can customize:
- Enable/disable push notifications
- Notification types
- Quiet hours
- Frequency limits
```

---

## 🛡️ Security & Privacy

### Data Protection
```
- Encrypted passwords
- Secure session tokens
- HTTPS only
- GDPR compliance
- Data export option
- Account deletion option
```

### Anti-Fraud Measures
```
- Rate limiting
- Suspicious activity detection
- Account verification
- Transaction logging
- Ban system
```

---

## 📱 Platform Integration

### Mobile Features
```
- Biometric authentication (Face ID, Touch ID)
- Cloud save sync
- Push notifications
- In-app purchases
```

### Web Features
```
- Browser-based login
- Local storage
- WebSocket for real-time updates
- Responsive design
```

---

**Document Version:** 1.0.0  
**Last Updated:** 2025-01-27

