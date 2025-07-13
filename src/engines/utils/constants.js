export const GAME_CONSTANTS = {
  MINIMUM_HP_THRESHOLD: 30, // Minimum HP requiring 30 correct answers
  PLAYER_STARTING_HEARTS: 3,
  REVIVAL_TIMEOUT: 60000, // 60 seconds in milliseconds

  DAMAGE_MULTIPLIERS: {
    FAST: 1.5,
    NORMAL: 1.0,
    SLOW: 0.5,
  },

  RESPONSE_TIME_THRESHOLDS: {
    FAST: 10000, // 10 seconds
    SLOW: 25000, // 25 seconds
  },

  PLAYER_STATUSES: {
    WAITING: "waiting",
    READY: "ready",
    ACTIVE: "active",
    KNOCKED_OUT: "knocked_out",
    REVIVED: "revived",
  },

  BOSS_STATUSES: {
    WAITING: "waiting",
    ACTIVE: "active",
    DEFEATED: "defeated",
    COOLDOWN: "cooldown",
    ENDED: "ended",
  },

  BADGE_TYPES: {
    BOSS_DEFEATED: "boss_defeated",
    LAST_HIT: "last_hit",
    MVP: "mvp",
    HERO: "hero",
  },

  MILESTONE_BADGES: [10, 25, 50, 100],

  HP_SCALING_FACTOR: 5, // Additional HP per player
};
