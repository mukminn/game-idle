# Backend Architecture Document - Idle RPG

## 🏗️ Overview

Dokumen ini menjelaskan arsitektur backend untuk game Idle RPG, termasuk server architecture, database design, API specifications, security measures, dan scalability considerations.

---

## 🎯 Architecture Principles

1. **Server Authoritative:** All game logic runs on server
2. **Scalable:** Designed untuk handle millions of players
3. **Secure:** Anti-cheat dan fraud prevention
4. **Reliable:** High availability dan data persistence
5. **Performant:** Low latency, high throughput

---

## 🏛️ System Architecture

### High-Level Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│  API Gateway │────▶│ Game Server │
│  (Mobile/   │     │  (Load       │     │  (Business  │
│    Web)     │     │   Balancer)  │     │   Logic)    │
└─────────────┘     └─────────────┘     └─────────────┘
                                                  │
                                                  ▼
                                         ┌─────────────┐
                                         │  Database   │
                                         │  (PostgreSQL│
                                         │   / MongoDB) │
                                         └─────────────┘
                                                  │
                                                  ▼
                                         ┌─────────────┐
                                         │  Cache      │
                                         │  (Redis)    │
                                         └─────────────┘
```

### Component Breakdown

#### 1. API Gateway
- **Purpose:** Entry point, load balancing, rate limiting
- **Technology:** Nginx, AWS API Gateway, atau Kong
- **Functions:**
  - Request routing
  - Authentication
  - Rate limiting
  - SSL/TLS termination
  - Request logging

#### 2. Game Server
- **Purpose:** Business logic, game calculations
- **Technology:** Node.js, Python (FastAPI), atau Go
- **Functions:**
  - Player authentication
  - Game state management
  - Battle calculations
  - Economy transactions
  - Event processing

#### 3. Database
- **Purpose:** Persistent data storage
- **Technology:** PostgreSQL (relational) + MongoDB (document)
- **Functions:**
  - Player data
  - Game state
  - Transaction logs
  - Analytics data

#### 4. Cache Layer
- **Purpose:** Fast data access, session management
- **Technology:** Redis
- **Functions:**
  - Player session data
  - Frequently accessed data
  - Rate limiting counters
  - Real-time leaderboards

---

## 💾 Database Design

### PostgreSQL Schema (Relational Data)

#### Users Table
```sql
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255),
    auth_provider VARCHAR(50), -- 'email', 'google', 'wallet'
    auth_provider_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    is_banned BOOLEAN DEFAULT FALSE
);
```

#### Player Profiles Table
```sql
CREATE TABLE player_profiles (
    profile_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    account_level INTEGER DEFAULT 1,
    account_exp BIGINT DEFAULT 0,
    vip_level INTEGER DEFAULT 0,
    total_power BIGINT DEFAULT 0,
    current_stage INTEGER DEFAULT 1,
    highest_stage INTEGER DEFAULT 1,
    total_monsters_killed BIGINT DEFAULT 0,
    total_bosses_defeated INTEGER DEFAULT 0,
    total_playtime_seconds BIGINT DEFAULT 0,
    avatar_id INTEGER DEFAULT 1,
    frame_id INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Currencies Table
```sql
CREATE TABLE player_currencies (
    currency_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    battle_points BIGINT DEFAULT 0,
    crystals BIGINT DEFAULT 0,
    coins BIGINT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id)
);
```

#### Hero Data Table
```sql
CREATE TABLE hero_data (
    hero_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    level INTEGER DEFAULT 1,
    exp BIGINT DEFAULT 0,
    star_level INTEGER DEFAULT 0,
    evolution_stage INTEGER DEFAULT 0,
    element VARCHAR(20) DEFAULT 'fire',
    class VARCHAR(20) DEFAULT 'warrior',
    base_hp BIGINT DEFAULT 100,
    base_atk BIGINT DEFAULT 10,
    base_def BIGINT DEFAULT 5,
    crit_rate DECIMAL(5,2) DEFAULT 5.0,
    crit_damage DECIMAL(5,2) DEFAULT 150.0,
    attack_speed DECIMAL(5,2) DEFAULT 1.0,
    life_steal DECIMAL(5,2) DEFAULT 0.0,
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id)
);
```

#### Equipment Table
```sql
CREATE TABLE equipment (
    equipment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    slot_type VARCHAR(20) NOT NULL, -- 'weapon', 'helmet', etc.
    item_id INTEGER NOT NULL, -- Reference to item database
    rarity VARCHAR(20) NOT NULL,
    level INTEGER DEFAULT 1,
    star_level INTEGER DEFAULT 0,
    awaken_level INTEGER DEFAULT 0,
    is_equipped BOOLEAN DEFAULT FALSE,
    substats JSONB, -- Array of substat objects
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Skills Table
```sql
CREATE TABLE hero_skills (
    skill_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    skill_type VARCHAR(20) NOT NULL, -- 'active', 'passive', 'ultimate'
    skill_name VARCHAR(50) NOT NULL,
    level INTEGER DEFAULT 1,
    evolution_stage INTEGER DEFAULT 0,
    is_unlocked BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Transactions Table
```sql
CREATE TABLE transactions (
    transaction_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id),
    transaction_type VARCHAR(50) NOT NULL, -- 'purchase', 'upgrade', 'reward'
    currency_type VARCHAR(20) NOT NULL, -- 'bp', 'crystals', 'coins'
    amount BIGINT NOT NULL,
    balance_before BIGINT NOT NULL,
    balance_after BIGINT NOT NULL,
    description TEXT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### MongoDB Collections (Document Data)

#### Player Inventory
```javascript
{
  _id: ObjectId,
  user_id: UUID,
  items: [
    {
      item_id: Integer,
      quantity: Integer,
      metadata: Object
    }
  ],
  materials: {
    ore: Integer,
    essence: Integer,
    runes: Integer,
    relic_shards: Integer
  },
  updated_at: ISODate
}
```

#### Battle Logs
```javascript
{
  _id: ObjectId,
  user_id: UUID,
  stage_number: Integer,
  battle_result: String, // 'win', 'lose'
  damage_dealt: Integer,
  damage_taken: Integer,
  duration_seconds: Integer,
  rewards: Object,
  timestamp: ISODate
}
```

#### Event Participation
```javascript
{
  _id: ObjectId,
  user_id: UUID,
  event_id: String,
  progress: Integer,
  rewards_claimed: [String],
  started_at: ISODate,
  updated_at: ISODate
}
```

---

## 🔌 API Design

### Authentication Endpoints

#### POST /api/auth/register
```json
Request:
{
  "username": "player123",
  "email": "player@example.com",
  "password": "securepassword",
  "auth_provider": "email"
}

Response:
{
  "success": true,
  "data": {
    "user_id": "uuid",
    "token": "jwt_token",
    "expires_in": 3600
  }
}
```

#### POST /api/auth/login
```json
Request:
{
  "email": "player@example.com",
  "password": "securepassword"
}

Response:
{
  "success": true,
  "data": {
    "user_id": "uuid",
    "token": "jwt_token",
    "expires_in": 3600
  }
}
```

### Game State Endpoints

#### GET /api/game/player/profile
```json
Response:
{
  "success": true,
  "data": {
    "profile": {
      "account_level": 10,
      "vip_level": 3,
      "current_stage": 50,
      "total_power": 50000
    },
    "currencies": {
      "battle_points": 100000,
      "crystals": 5000,
      "coins": 100
    },
    "hero": {
      "level": 25,
      "hp": 5000,
      "atk": 500,
      "def": 250
    }
  }
}
```

#### POST /api/game/hero/upgrade
```json
Request:
{
  "upgrade_type": "level", // "level", "star", "evolution"
  "cost": 10000
}

Response:
{
  "success": true,
  "data": {
    "new_level": 26,
    "new_stats": {
      "hp": 5250,
      "atk": 525,
      "def": 262
    },
    "remaining_bp": 90000
  }
}
```

#### POST /api/game/equipment/enhance
```json
Request:
{
  "equipment_id": "uuid",
  "target_level": 20
}

Response:
{
  "success": true,
  "data": {
    "equipment": {
      "level": 20,
      "stats": {...}
    },
    "cost_paid": 5000
  }
}
```

### Battle Endpoints

#### POST /api/battle/start
```json
Request:
{
  "stage_number": 50,
  "speed_multiplier": 2
}

Response:
{
  "success": true,
  "data": {
    "battle_id": "uuid",
    "enemy_data": {...},
    "estimated_duration": 30
  }
}
```

#### GET /api/battle/status/:battle_id
```json
Response:
{
  "success": true,
  "data": {
    "status": "in_progress", // "in_progress", "completed", "failed"
    "progress": 75,
    "current_hp": 5000,
    "enemy_hp": 2000
  }
}
```

#### POST /api/battle/claim-rewards
```json
Request:
{
  "battle_id": "uuid"
}

Response:
{
  "success": true,
  "data": {
    "rewards": {
      "battle_points": 5000,
      "materials": {...},
      "equipment": [...]
    }
  }
}
```

### Idle Rewards Endpoints

#### GET /api/idle/rewards
```json
Response:
{
  "success": true,
  "data": {
    "idle_time_seconds": 28800, // 8 hours
    "max_idle_time_seconds": 28800,
    "rewards": {
      "battle_points": 50000,
      "materials": {...},
      "equipment": [...]
    },
    "can_claim": true
  }
}
```

#### POST /api/idle/claim
```json
Response:
{
  "success": true,
  "data": {
    "claimed_rewards": {...},
    "next_idle_reset": "2025-01-28T00:00:00Z"
  }
}
```

---

## 🔒 Security Measures

### Authentication & Authorization

#### JWT Tokens
- **Algorithm:** HS256 atau RS256
- **Expiration:** 1 hour (access), 7 days (refresh)
- **Storage:** HttpOnly cookies (web) atau secure storage (mobile)

#### Rate Limiting
- **Per IP:** 100 requests/minute
- **Per User:** 1000 requests/minute
- **Per Endpoint:** Specific limits per endpoint

### Anti-Cheat Measures

#### Server-Side Validation
```python
def validate_upgrade_request(user_id, upgrade_type, cost):
    # Check if user has enough currency
    current_balance = get_user_currency(user_id)
    if current_balance < cost:
        raise InsufficientFundsError()
    
    # Check if upgrade is valid
    current_level = get_user_level(user_id)
    max_level = get_max_level_for_stage(user_id)
    if current_level >= max_level:
        raise InvalidUpgradeError()
    
    # Check rate limiting
    if get_upgrade_count_today(user_id) > MAX_UPGRADES_PER_DAY:
        raise RateLimitError()
    
    return True
```

#### Anomaly Detection
- **Unrealistic Progression:** Flag jika player progress terlalu cepat
- **Impossible Stats:** Validate semua stat values
- **Modified Client:** Detect tampered client requests
- **Exploit Detection:** Monitor untuk known exploits

#### Transaction Logging
- **All Transactions:** Log semua currency transactions
- **Audit Trail:** Complete history untuk setiap action
- **Fraud Detection:** Automated flagging untuk suspicious activity

### Data Protection

#### Encryption
- **At Rest:** Database encryption
- **In Transit:** TLS 1.3 untuk semua connections
- **Sensitive Data:** Hash passwords, encrypt PII

#### Backup & Recovery
- **Daily Backups:** Automated daily backups
- **Point-in-Time Recovery:** Transaction logs untuk recovery
- **Disaster Recovery:** Multi-region backups

---

## ⚡ Performance Optimization

### Caching Strategy

#### Redis Cache Layers
```
Layer 1: Player Session Data (TTL: 1 hour)
- Current game state
- Active battle data
- Inventory snapshot

Layer 2: Frequently Accessed Data (TTL: 5 minutes)
- Leaderboard data
- Shop items
- Event data

Layer 3: Static Data (TTL: 24 hours)
- Item database
- Skill database
- Stage configurations
```

### Database Optimization

#### Indexing
```sql
-- User lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);

-- Player data
CREATE INDEX idx_profiles_user_id ON player_profiles(user_id);
CREATE INDEX idx_profiles_stage ON player_profiles(highest_stage);

-- Transactions
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);

-- Equipment
CREATE INDEX idx_equipment_user_id ON equipment(user_id);
CREATE INDEX idx_equipment_equipped ON equipment(user_id, is_equipped);
```

#### Query Optimization
- Use connection pooling
- Implement read replicas untuk read-heavy operations
- Batch operations untuk bulk updates
- Pagination untuk large datasets

### Scalability

#### Horizontal Scaling
- **Load Balancing:** Distribute traffic across multiple servers
- **Database Sharding:** Shard by user_id untuk large scale
- **Microservices:** Separate services untuk different functions

#### Vertical Scaling
- **Server Resources:** Scale up untuk high-traffic periods
- **Database Resources:** Optimize database performance
- **Cache Resources:** Increase cache capacity

---

## 📊 Monitoring & Analytics

### Key Metrics

#### Performance Metrics
- API response time (p50, p95, p99)
- Database query time
- Cache hit rate
- Server CPU/Memory usage

#### Business Metrics
- Daily Active Users (DAU)
- Player retention rates
- Revenue metrics
- Conversion rates

#### Error Metrics
- Error rate by endpoint
- Failed authentication attempts
- Cheat detection alerts
- System errors

### Logging

#### Log Levels
- **ERROR:** Critical errors requiring immediate attention
- **WARN:** Warning conditions
- **INFO:** General informational messages
- **DEBUG:** Detailed debugging information

#### Log Aggregation
- Centralized logging system (ELK stack, CloudWatch, etc.)
- Real-time monitoring dan alerting
- Log retention: 30 days (standard), 1 year (audit logs)

---

## 🚀 Deployment

### Infrastructure

#### Cloud Provider
- **Primary:** AWS, GCP, atau Azure
- **CDN:** CloudFront, Cloudflare untuk static assets
- **Database:** Managed database service (RDS, Cloud SQL)
- **Cache:** Managed Redis (ElastiCache, Memorystore)

#### CI/CD Pipeline
```
Code Commit → Automated Tests → Build → Deploy to Staging → 
Manual Approval → Deploy to Production
```

### Environment Setup

#### Development
- Local development servers
- Local database instances
- Mock external services

#### Staging
- Production-like environment
- Test data
- Integration testing

#### Production
- High availability setup
- Multi-region deployment
- Automated backups
- Monitoring dan alerting

---

## 📝 API Documentation

### Documentation Tools
- **OpenAPI/Swagger:** API specification
- **Postman Collection:** API testing
- **Interactive Docs:** Developer-friendly documentation

### Versioning
- **API Versioning:** `/api/v1/`, `/api/v2/`
- **Backward Compatibility:** Maintain old versions selama transition
- **Deprecation Policy:** 6 months notice sebelum removal

---

**Document Version:** 1.0.0  
**Last Updated:** 2025-01-27  
**Status:** Architecture Design Complete

