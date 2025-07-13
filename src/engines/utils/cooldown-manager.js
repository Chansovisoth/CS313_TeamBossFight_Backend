import { GAME_CONSTANTS } from "../utils/constants.js";

export class CooldownManager {
  constructor() {
    this.cooldownTimers = new Map(); // Map<bossId, cooldownInfo>
  }

  /**
   * Start cooldown period for a boss
   */
  startCooldown(bossId, duration, onEndCallback) {
    const cooldownDuration = duration * 1000; // Convert to milliseconds
    const endsAt = new Date(Date.now() + cooldownDuration);

    // Clear any existing timer
    this.clearCooldown(bossId);

    const timer = setTimeout(() => {
      this.endCooldown(bossId);
      if (onEndCallback) onEndCallback(bossId);
    }, cooldownDuration);

    this.cooldownTimers.set(bossId, {
      endsAt,
      timer,
      duration: cooldownDuration,
    });

    return { endsAt, duration: cooldownDuration };
  }

  /**
   * End cooldown period
   */
  endCooldown(bossId) {
    const cooldown = this.cooldownTimers.get(bossId);
    if (cooldown) {
      clearTimeout(cooldown.timer);
      this.cooldownTimers.delete(bossId);
    }
  }

  /**
   * Clear cooldown without calling callback
   */
  clearCooldown(bossId) {
    const cooldown = this.cooldownTimers.get(bossId);
    if (cooldown) {
      clearTimeout(cooldown.timer);
      this.cooldownTimers.delete(bossId);
    }
  }

  /**
   * Check if boss is on cooldown
   */
  isBossOnCooldown(bossId) {
    const cooldown = this.cooldownTimers.get(bossId);
    return cooldown && new Date() < cooldown.endsAt;
  }

  /**
   * Get cooldown remaining time in milliseconds
   */
  getCooldownRemaining(bossId) {
    const cooldown = this.cooldownTimers.get(bossId);
    if (!cooldown) return 0;

    const remaining = cooldown.endsAt - new Date();
    return Math.max(0, remaining);
  }

  /**
   * Get cooldown info
   */
  getCooldownInfo(bossId) {
    const cooldown = this.cooldownTimers.get(bossId);
    if (!cooldown) return null;

    return {
      endsAt: cooldown.endsAt,
      duration: cooldown.duration,
      remaining: this.getCooldownRemaining(bossId),
    };
  }

  /**
   * Clear all cooldowns
   */
  clearAllCooldowns() {
    for (const [bossId] of this.cooldownTimers) {
      this.clearCooldown(bossId);
    }
  }
}
