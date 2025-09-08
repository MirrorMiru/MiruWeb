// OSTManager.js
export default class OSTManager extends Phaser.Scene {
    constructor() {
      super({ key: 'OSTManager', active: true, visible: false });
      this.MAX_MUSIC_VOLUME = 0.6;    // ← new: maximum music volume (60%)
    }
  
    create() {
      this.currentSound  = null;
      // start at max (i.e. slider at 100% → music at 60%)
      this.masterVolume = this.MAX_MUSIC_VOLUME;
    }
  
    /**
     * Change the global master volume (0.0–1.0) *capped* at MAX_MUSIC_VOLUME.
     * Immediately applies to the currently playing track.
     *
     * @param {number} volume  — player’s slider 0.0–1.0
     */
    setMasterVolume(volume) {
      // clamp the slider, then scale by MAX_MUSIC_VOLUME
      this.masterVolume = Phaser.Math.Clamp(volume, 0, 1) * this.MAX_MUSIC_VOLUME;
      if (this.currentSound) {
        this.currentSound.setVolume(this.masterVolume);
      }
    }
  
    /**
     * Cross-fades to a new looped track.
     * @param {string} key — the cache key of a preloaded audio file
     * @param {number} duration — fade duration in ms (>=0)
     */
    crossfadeTo(key, duration = 1000) {
      if (this.currentSound && this.currentSound.key === key) return;
  
      const oldSound = this.currentSound;
      // start new sound at zero, then fade up to this.masterVolume
      const newSound = key
        ? this.sound.add(key, { loop: true, volume: duration > 0 ? 0 : this.masterVolume })
        : null;
  
      if (newSound) newSound.play();
  
      if (duration <= 0 || !isFinite(duration)) {
        if (oldSound) {
          oldSound.stop();
          this.sound.remove(oldSound);
        }
        this.currentSound = newSound;
        return;
      }
  
      this.tweens.addCounter({
        from: 0,
        to:   100,
        duration,
        onUpdate: tween => {
          const t = tween.getValue() / 100;
          if (newSound) newSound.setVolume(t * this.masterVolume);
          if (oldSound) oldSound.setVolume((1 - t) * this.masterVolume);
        },
        onComplete: () => {
          if (oldSound) {
            oldSound.stop();
            this.sound.remove(oldSound);
          }
          this.currentSound = newSound;
        }
      });
    }
  
    /**
     * Fades out and stops the current track over `duration` ms.
     * @param {number} duration — fade-out time in ms
     */
    stopMusic(duration = 1000) {
      const s = this.currentSound;
      if (!s) return;
  
      if (duration <= 0 || !isFinite(duration)) {
        s.stop();
        this.sound.remove(s);
        this.currentSound = null;
        return;
      }
  
      this.tweens.add({
        targets: s,
        volume: 0,
        duration,
        onComplete: () => {
          s.stop();
          this.sound.remove(s);
          this.currentSound = null;
        }
      });
    }
  }
  