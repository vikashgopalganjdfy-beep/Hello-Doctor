// Audio notification synthesizer using Web Audio API for production-ready alarms

class SoundAlertManager {
  private audioCtx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  constructor() {
    // Check localStorage preference
    const saved = localStorage.getItem('hellodoctor_admin_sound_enabled');
    if (saved !== null) {
      this.soundEnabled = saved === 'true';
    }
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  public setEnabled(enabled: boolean): void {
    this.soundEnabled = enabled;
    localStorage.setItem('hellodoctor_admin_sound_enabled', String(enabled));
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.audioCtx && AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      return this.audioCtx;
    } catch {
      return null;
    }
  }

  /**
   * Plays a 3-tone chime for new patient appointments and alerts
   */
  public playNewBookingAlert(): void {
    if (!this.soundEnabled) return;

    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // Note sequence: D5 (587Hz) -> F#5 (740Hz) -> A5 (880Hz) -> D6 (1174Hz)
      const notes = [
        { freq: 587.33, time: now, duration: 0.18 },
        { freq: 739.99, time: now + 0.15, duration: 0.18 },
        { freq: 880.0, time: now + 0.30, duration: 0.22 },
        { freq: 1174.66, time: now + 0.48, duration: 0.50 },
      ];

      notes.forEach(({ freq, time, duration }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        // Envelope: quick attack, smooth decay
        gain.gain.setValueAtTime(0.001, time);
        gain.gain.exponentialRampToValueAtTime(0.35, time + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(time);
        osc.stop(time + duration);
      });
    } catch (e) {
      console.warn('Audio alert error:', e);
    }
  }

  /**
   * Plays a secondary urgent pulse alarm for emergency requests
   */
  public playEmergencyAlarm(): void {
    if (!this.soundEnabled) return;

    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      for (let i = 0; i < 3; i++) {
        const time = now + i * 0.25;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(950, time);
        osc.frequency.exponentialRampToValueAtTime(650, time + 0.18);

        gain.gain.setValueAtTime(0.3, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(time);
        osc.stop(time + 0.2);
      }
    } catch (e) {
      console.warn('Emergency alert error:', e);
    }
  }
}

export const soundAlert = new SoundAlertManager();
