"use client";

import * as React from "react";

/**
 * SigmaSound — a subtle UI sound system using the Web Audio API.
 * Generates short synthesized tones for hover, click, transition, and boot events.
 * Audio is gated behind a user gesture (first click) per browser autoplay policies.
 *
 * Usage:
 *   const { play } = useSigmaSound();
 *   play("hover"); // short tick
 *   play("click"); // deeper click
 *   play("transition"); // sweep
 *
 * Or use the imperative singleton:
 *   sigmaSound.play("hover");
 */

export type SoundType = "hover" | "click" | "transition" | "boot" | "error" | "open" | "close" | "complete";

class SoundEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  enabled = false;

  init() {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.12;
      this.master.connect(this.ctx.destination);
      this.enabled = true;
    } catch {
      this.enabled = false;
    }
  }

  play(type: SoundType) {
    if (!this.enabled || !this.ctx || !this.master) return;
    const now = this.ctx.currentTime;

    switch (type) {
      case "hover":
        this.beep(2400, now, 0.03, 0.08);
        break;
      case "click":
        this.beep(180, now, 0.05, 0.18, "square");
        break;
      case "open":
        this.sweep(200, 600, now, 0.12, 0.1);
        break;
      case "close":
        this.sweep(600, 200, now, 0.08, 0.08);
        break;
      case "transition":
        this.sweep(80, 400, now, 0.5, 0.15);
        this.noise(now, 0.3, 0.05);
        break;
      case "boot":
        this.beep(220, now, 0.15, 0.2);
        this.beep(440, now + 0.08, 0.15, 0.15);
        this.beep(880, now + 0.16, 0.2, 0.1);
        break;
      case "complete":
        this.beep(523, now, 0.1, 0.15);
        this.beep(659, now + 0.08, 0.1, 0.15);
        this.beep(784, now + 0.16, 0.15, 0.12);
        break;
      case "error":
        this.beep(150, now, 0.2, 0.25, "sawtooth");
        break;
    }
  }

  private beep(
    freq: number,
    start: number,
    duration: number,
    gain: number,
    type: OscillatorType = "sine"
  ) {
    if (!this.ctx || !this.master) return;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);
    g.gain.setValueAtTime(0, start);
    g.gain.linearRampToValueAtTime(gain, start + 0.005);
    g.gain.exponentialRampToValueAtTime(0.001, start + duration);
    osc.connect(g);
    g.connect(this.master);
    osc.start(start);
    osc.stop(start + duration + 0.05);
  }

  private sweep(
    from: number,
    to: number,
    start: number,
    duration: number,
    gain: number
  ) {
    if (!this.ctx || !this.master) return;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(from, start);
    osc.frequency.exponentialRampToValueAtTime(to, start + duration);
    g.gain.setValueAtTime(0, start);
    g.gain.linearRampToValueAtTime(gain, start + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, start + duration);
    osc.connect(g);
    g.connect(this.master);
    osc.start(start);
    osc.stop(start + duration + 0.05);
  }

  private noise(start: number, duration: number, gain: number) {
    if (!this.ctx || !this.master) return;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    const g = this.ctx.createGain();
    g.gain.value = gain;
    const filter = this.ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 1000;
    src.connect(filter);
    filter.connect(g);
    g.connect(this.master);
    src.start(start);
  }
}

// Singleton
export const sigmaSound = new SoundEngine();

// React hook
export function useSigmaSound() {
  const [enabled, setEnabled] = React.useState(false);

  const init = React.useCallback(() => {
    if (sigmaSound.enabled) return;
    sigmaSound.init();
    setEnabled(sigmaSound.enabled);
    sigmaSound.play("boot");
  }, []);

  const play = React.useCallback((type: SoundType) => {
    if (!sigmaSound.enabled) return;
    sigmaSound.play(type);
  }, []);

  const toggle = React.useCallback(() => {
    if (!sigmaSound.enabled) {
      init();
    } else {
      sigmaSound.enabled = false;
      setEnabled(false);
    }
  }, [init]);

  return { enabled, init, play, toggle };
}
