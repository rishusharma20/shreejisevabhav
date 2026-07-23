"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Sparkles } from "lucide-react";

interface DivineIntroProps {
  onComplete: () => void;
}

// ── ULTRA PREMIUM CUSTOM VECTOR: Semi-Realistic Mor Pankh (Lord Krishna's Peacock Feather) ──
const MorPankh = ({ className = "" }) => (
  <svg width="240" height="320" viewBox="0 0 100 150" fill="none" className={`select-none pointer-events-none ${className}`}>
    <defs>
      {/* Stem metallic gold gradient */}
      <linearGradient id="pankh-stem-gold" x1="50" y1="150" x2="50" y2="10">
        <stop offset="0%" stopColor="#8A6623" />
        <stop offset="30%" stopColor="#E5C158" />
        <stop offset="60%" stopColor="#FFF2CC" />
        <stop offset="85%" stopColor="#D4A853" />
        <stop offset="100%" stopColor="#C59B27" />
      </linearGradient>
      {/* Divine radial glow backdrop */}
      <radialGradient id="eye-glow-radial" cx="50%" cy="30%" r="50%">
        <stop offset="0%" stopColor="rgba(212, 168, 83, 0.45)" />
        <stop offset="60%" stopColor="rgba(0, 168, 150, 0.15)" />
        <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
      </radialGradient>
      {/* Peacock eye rings */}
      <radialGradient id="ring-gold-outer" cx="50%" cy="32%" r="28%">
        <stop offset="0%" stopColor="#FFF9E6" />
        <stop offset="35%" stopColor="#FDEAA8" />
        <stop offset="70%" stopColor="#D4A853" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
      <radialGradient id="ring-peacock-green" cx="50%" cy="32%" r="20%">
        <stop offset="0%" stopColor="#00F5D4" />
        <stop offset="30%" stopColor="#00BBF9" />
        <stop offset="70%" stopColor="#1A5E63" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
      <radialGradient id="ring-royal-blue" cx="50%" cy="32%" r="13%">
        <stop offset="0%" stopColor="#7209B7" />
        <stop offset="45%" stopColor="#3F37C9" />
        <stop offset="85%" stopColor="#03045E" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
      <linearGradient id="barb-gold-metallic" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#9C772F" />
        <stop offset="50%" stopColor="#FFF2CC" />
        <stop offset="100%" stopColor="#D4A853" />
      </linearGradient>
    </defs>
    
    {/* Divine glow backdrop */}
    <circle cx="50" cy="45" r="42" fill="url(#eye-glow-radial)" />

    {/* Main Stem with 3D gradient */}
    <path d="M 50 148 C 49 100 47 48 50 12" stroke="url(#pankh-stem-gold)" strokeWidth="3.2" strokeLinecap="round" />
    
    {/* Multi-layered Semi-Realistic Eye */}
    {/* Layer 1: Golden outer boundary */}
    <ellipse cx="50" cy="45" rx="30" ry="34" fill="url(#ring-gold-outer)" filter="drop-shadow(0 4px 15px rgba(212,168,83,0.35))" />
    {/* Layer 2: Peacock green and teal transition ring */}
    <ellipse cx="50" cy="44" rx="20" ry="24" fill="url(#ring-peacock-green)" />
    {/* Layer 3: Royal blue and sapphire core */}
    <ellipse cx="50" cy="43" rx="12" ry="15" fill="url(#ring-royal-blue)" />
    {/* Layer 4: Tiny divine cream highlight for realistic reflection */}
    <ellipse cx="46.5" cy="37.5" rx="2.5" ry="3" fill="#FFFBF4" opacity="0.9" />

    {/* 3D feathery barbs (Left & Right curves) */}
    {Array.from({ length: 48 }).map((_, idx) => {
      const isLeft = idx % 2 === 0;
      const BarbIndex = Math.floor(idx / 2);
      const angle = (BarbIndex - 12) * 8.5;
      const length = 28 - Math.abs(BarbIndex - 12) * 0.85;
      const radians = (angle * Math.PI) / 180;
      const startY = 22 + BarbIndex * 4.2;
      const controlOffset = isLeft ? -15 : 15;
      const targetX = 50 + (isLeft ? -1 : 1) * Math.abs(Math.sin(radians)) * length;
      const targetY = startY - Math.cos(radians) * length;
      
      return (
        <g key={idx}>
          {/* Barb back shadow for realism */}
          <path
            d={`M 50 ${startY} Q ${50 + controlOffset * 0.4} ${startY - 5} ${targetX} ${targetY}`}
            stroke="#07221E"
            strokeWidth="1.2"
            opacity="0.25"
          />
          {/* Colored barb */}
          <path
            d={`M 50 ${startY} Q ${50 + controlOffset * 0.4} ${startY - 4} ${targetX} ${targetY}`}
            stroke={BarbIndex % 3 === 0 ? "url(#barb-gold-metallic)" : BarbIndex % 3 === 1 ? "#00BBF9" : "#00F5D4"}
            strokeWidth="0.8"
            opacity="0.85"
          />
        </g>
      );
    })}
  </svg>
);

// ── ULTRA PREMIUM CUSTOM VECTOR: Shri Krishna's Divine Murli (Ornate Gold Flute) ──
const GoldenMurli = ({ className = "" }) => (
  <svg width="340" height="85" viewBox="0 0 240 60" fill="none" className={`select-none pointer-events-none ${className}`}>
    <defs>
      {/* High-end metallic gold cylinder gradient with shineline */}
      <linearGradient id="murli-gold-premium" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8A6623" />
        <stop offset="15%" stopColor="#FDEAA8" />
        <stop offset="35%" stopColor="#D4A853" />
        <stop offset="55%" stopColor="#FFF9E6" />
        <stop offset="80%" stopColor="#D4A853" />
        <stop offset="100%" stopColor="#5E4314" />
      </linearGradient>
      {/* Red silk tassel gradient */}
      <linearGradient id="tassel-silk-red" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8A131C" />
        <stop offset="50%" stopColor="#C82333" />
        <stop offset="100%" stopColor="#E03A45" />
      </linearGradient>
      {/* Gold bead gradient */}
      <linearGradient id="bead-gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFF9E6" />
        <stop offset="70%" stopColor="#D4A853" />
        <stop offset="100%" stopColor="#8A6623" />
      </linearGradient>
    </defs>
    
    {/* 3D Cylindrical body of the flute */}
    <rect x="20" y="24" width="190" height="9" rx="4.5" fill="url(#murli-gold-premium)" filter="drop-shadow(0 4px 12px rgba(94,67,20,0.32))" />
    
    {/* Ornate Gold Filigree Caps on Ends */}
    <rect x="18" y="23" width="3" height="11" rx="1.5" fill="#D4A853" />
    <rect x="209" y="23" width="3" height="11" rx="1.5" fill="#D4A853" />
    <circle cx="212" cy="28.5" r="1.5" fill="#FFFBF4" />
    
    {/* Detailed red silk thread wraps (Sacred bindings) */}
    <rect x="35" y="23" width="4.5" height="11" rx="0.5" fill="#A81D1D" />
    <rect x="75" y="23" width="4.5" height="11" rx="0.5" fill="#A81D1D" />
    <rect x="135" y="23" width="4.5" height="11" rx="0.5" fill="#A81D1D" />
    <rect x="185" y="23" width="4.5" height="11" rx="0.5" fill="#A81D1D" />
    
    {/* Miniature Golden Bells (Ghungroo) hanging at wraps */}
    <g filter="drop-shadow(0 2px 4px rgba(0,0,0,0.18))">
      {/* Bells at center wrap */}
      <circle cx="77.25" cy="36.5" r="2.2" fill="url(#bead-gold)" />
      <line x1="77.25" y1="34" x2="77.25" y2="36.5" stroke="#A81D1D" strokeWidth="0.8" />
      {/* Bells at right wrap */}
      <circle cx="187.25" cy="36.5" r="2.2" fill="url(#bead-gold)" />
      <line x1="187.25" y1="34" x2="187.25" y2="36.5" stroke="#A81D1D" strokeWidth="0.8" />
    </g>

    {/* Intricate Engraved Lotus Patterns (Golden vector overlay) */}
    <g opacity="0.65">
      <path d="M 45 28.5 Q 48 26.5 45 24.5 Q 42 26.5 45 28.5 Z" fill="#FFFBF4" />
      <path d="M 105 28.5 Q 108 26.5 105 24.5 Q 102 26.5 105 28.5 Z" fill="#FFFBF4" />
      <path d="M 165 28.5 Q 168 26.5 165 24.5 Q 162 26.5 165 28.5 Z" fill="#FFFBF4" />
    </g>
    
    {/* Six finger holes with inner shadow effect */}
    <circle cx="90" cy="28.5" r="1.8" fill="#2E1C0A" />
    <circle cx="108" cy="28.5" r="1.8" fill="#2E1C0A" />
    <circle cx="126" cy="28.5" r="1.8" fill="#2E1C0A" />
    <circle cx="150" cy="28.5" r="1.8" fill="#2E1C0A" />
    <circle cx="168" cy="28.5" r="1.8" fill="#2E1C0A" />
    <circle cx="186" cy="28.5" r="1.8" fill="#2E1C0A" />
    
    {/* Blowing hole on the left */}
    <ellipse cx="50" cy="28.5" rx="2.5" ry="1.5" fill="#2E1C0A" />
    
    {/* Beautiful peacock beaded tassels with silk threads hanging from right end */}
    <path d="M 205 28.5 Q 215 42 211 54" stroke="#A81D1D" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M 203 28.5 Q 210 39 205 51" stroke="#D4A853" strokeWidth="1.0" strokeLinecap="round" />
    {/* Silk tassel beads */}
    <circle cx="211" cy="54" r="3.2" fill="url(#tassel-silk-red)" />
    <circle cx="205" cy="51" r="2.2" fill="#028090" />
    {/* Small golden beads */}
    <circle cx="209" cy="38" r="1.5" fill="url(#bead-gold)" />
    <circle cx="205" cy="35" r="1.5" fill="#FFF8E7" />
  </svg>
);

export default function DivineIntro({ onComplete }: DivineIntroProps) {
  const [phase, setPhase] = useState(1);
  const [isMuted, setIsMuted] = useState(true);
  const [audioStarted, setAudioStarted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Audio interval references
  const windSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const birdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const fluteTimerRef = useRef<NodeJS.Timeout | null>(null);
  const chimeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Skip button available after 8 seconds
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    // Check if intro has already run this session
    const hasSeenIntro = sessionStorage.getItem("hasSeenDivineIntro");
    if (hasSeenIntro) {
      onComplete();
      return;
    }

    // Timeline progressions
    const p1Timer = setTimeout(() => setPhase(2), 3000); // 0-3s: Phase 1 (No text, ambient only)
    const p2Timer = setTimeout(() => setPhase(3), 6000); // 3-6s: Phase 2 (Mor Pankh + Radhe Radhe)
    const skipTimer = setTimeout(() => setCanSkip(true), 8000); // Skip active after 8s
    const p3Timer = setTimeout(() => setPhase(4), 9000); // 6-9s: Phase 3 (Murli + Welcome)
    const p4Timer = setTimeout(() => setPhase(5), 12000); // 9-12s: Phase 4 (Merge + Shreeji Seva Bhav)
    const p5Timer = setTimeout(() => setPhase(6), 15000); // 12-15s: Phase 5 (Bhakti Prem Seva + Offerings)
    const completionTimer = setTimeout(() => handleComplete(), 18000); // 15-18s: Final fade out

    return () => {
      clearTimeout(p1Timer);
      clearTimeout(p2Timer);
      clearTimeout(skipTimer);
      clearTimeout(p3Timer);
      clearTimeout(p4Timer);
      clearTimeout(p5Timer);
      clearTimeout(completionTimer);
      stopAudio();
    };
  }, []);

  // Track phase to dynamically update synthesized audio components
  useEffect(() => {
    if (!audioStarted || isMuted || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;

    // Phase 3 (6-12s): Start flute melody loop
    if (phase === 3 && !fluteTimerRef.current) {
      startFluteMelody(ctx);
    }

    // Phase 5 (12-18s): Trigger temple bells & chimes loop
    if (phase === 5 && !chimeTimerRef.current) {
      startTempleBells(ctx);
    }
  }, [phase, audioStarted, isMuted]);

  // ── WEB AUDIO SYNTHESIZER: Ambient Wind, Chirps, Flute & Chimes ──
  const startAudio = () => {
    if (audioStarted) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;
      setAudioStarted(true);
      setIsMuted(false);

      // 1. Wind Sound Synthesizer (Filtered Noise)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      const windFilter = ctx.createBiquadFilter();
      windFilter.type = "bandpass";
      windFilter.frequency.value = 350;
      windFilter.Q.value = 1.5;

      const windGain = ctx.createGain();
      windGain.gain.setValueAtTime(0.015, ctx.currentTime);

      noiseSource.connect(windFilter);
      windFilter.connect(windGain);
      windGain.connect(ctx.destination);
      noiseSource.start();
      windSourceRef.current = noiseSource;

      // 2. Birds Chirping Loop (Plays from 0-18s)
      const playChirp = () => {
        if (!ctx || ctx.state === "suspended") return;
        const now = ctx.currentTime;
        const notesCount = 2 + Math.floor(Math.random() * 3);
        let offset = 0;

        for (let i = 0; i < notesCount; i++) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          const freq = 2000 + Math.random() * 500;
          osc.frequency.setValueAtTime(freq, now + offset);
          osc.frequency.exponentialRampToValueAtTime(freq + 400, now + offset + 0.08);

          gain.gain.setValueAtTime(0, now + offset);
          gain.gain.linearRampToValueAtTime(0.008, now + offset + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.12);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + offset);
          osc.stop(now + offset + 0.15);
          offset += 0.12 + Math.random() * 0.08;
        }

        birdTimerRef.current = setTimeout(playChirp, 3000 + Math.random() * 4000);
      };
      playChirp();

    } catch (e) {
      console.warn("Audio Context failed to initialize", e);
    }
  };

  // Soft Pentatonic Flute Melody Synth (Starts at 6s)
  const startFluteMelody = (ctx: AudioContext) => {
    const notes = [293.66, 329.63, 392.00, 440.00, 493.88, 587.33, 659.25]; // D4, E4, G4, A4, B4, D5, E5
    let index = 0;

    const playFluteNote = () => {
      if (!ctx || ctx.state === "suspended") return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      const delay = ctx.createDelay();
      const delayGain = ctx.createGain();
      delay.delayTime.value = 0.45;
      delayGain.gain.value = 0.35;

      osc.type = "triangle";
      const baseFreq = notes[index % notes.length];
      osc.frequency.setValueAtTime(baseFreq, now);

      // Breath vibrato modulation
      const vibrato = ctx.createOscillator();
      const vibratoGain = ctx.createGain();
      vibrato.frequency.value = 5.5;
      vibratoGain.gain.value = baseFreq * 0.007;
      vibrato.connect(vibratoGain);
      vibratoGain.connect(osc.frequency);
      vibrato.start(now);
      vibrato.stop(now + 2.5);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1000, now);
      filter.frequency.exponentialRampToValueAtTime(550, now + 1.8);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.5);
      gain.gain.setValueAtTime(0.08, now + 1.4);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      gain.connect(delay);
      delay.connect(delayGain);
      delayGain.connect(delay);
      delayGain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 2.5);

      index = (index + Math.floor(Math.random() * 2) + 1) % notes.length;
      fluteTimerRef.current = setTimeout(playFluteNote, 2000);
    };

    playFluteNote();
  };

  // Temple Chimes and Bells Synth (Starts at 12s)
  const startTempleBells = (ctx: AudioContext) => {
    const playBell = () => {
      if (!ctx || ctx.state === "suspended") return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1500 + Math.random() * 800, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.018, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 2.3);

      chimeTimerRef.current = setTimeout(playBell, 2500 + Math.random() * 3000);
    };

    playBell();
  };

  const toggleMute = () => {
    if (!audioStarted) {
      startAudio();
      return;
    }
    if (audioCtxRef.current) {
      if (audioCtxRef.current.state === "suspended" || isMuted) {
        audioCtxRef.current.resume();
        setIsMuted(false);
      } else {
        audioCtxRef.current.suspend();
        setIsMuted(true);
      }
    }
  };

  const stopAudio = () => {
    if (windSourceRef.current) {
      try { windSourceRef.current.stop(); } catch(e) {}
    }
    if (birdTimerRef.current) clearTimeout(birdTimerRef.current);
    if (fluteTimerRef.current) clearTimeout(fluteTimerRef.current);
    if (chimeTimerRef.current) clearTimeout(chimeTimerRef.current);
    if (audioCtxRef.current) {
      try { audioCtxRef.current.close(); } catch(e) {}
    }
  };

  const handleComplete = () => {
    sessionStorage.setItem("hasSeenDivineIntro", "true");
    stopAudio();
    onComplete();
  };

  // Disney/Ghibli/Toon Style Overlapping Clouds
  const cloudLayers = [
    { id: "tl", className: "absolute w-[60%] h-[40%] top-[-10%] left-[-15%] bg-radial from-[#FFF3DF] via-[#FFEED4]/70 to-transparent filter blur-2xl opacity-75 transform-gpu" },
    { id: "tr", className: "absolute w-[65%] h-[45%] top-[-15%] right-[-15%] bg-radial from-[#FFF8EE] via-[#FFF3DF]/60 to-transparent filter blur-2xl opacity-80 transform-gpu" },
    { id: "bl", className: "absolute w-[70%] h-[50%] bottom-[-15%] left-[-20%] bg-radial from-[#FFE9CC] via-[#FFF2DF]/65 to-transparent filter blur-2xl opacity-70 transform-gpu" },
    { id: "br", className: "absolute w-[75%] h-[55%] bottom-[-20%] right-[-20%] bg-radial from-[#FFF5E6] via-[#FFF3DF]/70 to-transparent filter blur-2xl opacity-80 transform-gpu" },
  ];

  // Floating Flower Petals (Lotus petals)
  const floatingPetals = [
    { id: 1, left: "10%", delay: 0.2, size: 18, duration: 8.5 },
    { id: 2, left: "85%", delay: 1.5, size: 22, duration: 10.5 },
    { id: 3, left: "28%", delay: 3.2, size: 15, duration: 7.5 },
    { id: 4, left: "72%", delay: 4.8, size: 20, duration: 9.5 },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#FFFBF4] flex flex-col items-center justify-center overflow-hidden">
      {/* 1. Animated Cloud Layers (Dissolve/Reveal upwards in Phase 6) */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {cloudLayers.map((cloud) => (
          <motion.div
            key={cloud.id}
            className={cloud.className}
            animate={
              phase === 6
                ? { y: "-120vh", opacity: 0 } // Reveal homepage
                : {
                    x: [0, 20, -15, 0],
                    y: [0, -12, 18, 0],
                  }
            }
            transition={{
              duration: phase === 6 ? 2.5 : 20,
              ease: "easeInOut",
              repeat: phase === 6 ? 0 : Infinity,
            }}
          />
        ))}
      </div>

      {/* 2. Floating Lotus Petals */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {floatingPetals.map((petal) => (
          <motion.div
            key={petal.id}
            className="absolute transform-gpu"
            style={{ left: petal.left, top: "-10%" }}
            animate={{
              y: ["0vh", "110vh"],
              x: [0, 35, -35, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: petal.duration,
              repeat: Infinity,
              ease: "linear",
              delay: petal.delay,
            }}
          >
            <svg width={petal.size} height={petal.size} viewBox="0 0 40 40" fill="none">
              <path d="M20 5 C10 18 10 32 20 35 C30 32 30 18 20 5 Z" fill="#FFB7B2" opacity="0.8" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* 3. Golden particles drifting upward */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold-start/45 transform-gpu"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${20 + Math.random() * 70}%`,
            }}
            animate={
              phase === 6
                ? { y: -300, opacity: 0, transition: { duration: 2 } }
                : {
                    y: [0, -65, 0],
                    opacity: [0.15, 0.8, 0.15],
                  }
            }
            transition={{
              duration: 7 + Math.random() * 5,
              repeat: phase === 6 ? 0 : Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>

      {/* 4. Centerpiece preview stage for early phases (Phase 2 & 3) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <AnimatePresence>
          {/* Phase 2: Mor Pankh enters from the Left as preview */}
          {phase === 2 && (
            <motion.div
              initial={{ x: "-100vw", y: "-20vh", opacity: 0, rotate: -40 }}
              animate={{ x: "-20vw", y: "-10vh", opacity: 1, rotate: 12 }}
              exit={{ opacity: 0, transition: { duration: 0.6 } }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              className="absolute filter drop-shadow-[0_12px_28px_rgba(212,168,83,0.22)]"
            >
              <MorPankh />
            </motion.div>
          )}

          {/* Phase 3: Golden Murli enters from the Right as preview */}
          {phase === 3 && (
            <motion.div
              initial={{ x: "100vw", y: "20vh", opacity: 0, rotate: 35 }}
              animate={{ x: "18vw", y: "10vh", opacity: 1, rotate: -15 }}
              exit={{ opacity: 0, transition: { duration: 0.6 } }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              className="absolute filter drop-shadow-[0_10px_25px_rgba(212,168,83,0.3)]"
            >
              <GoldenMurli />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 5. Structured text stage (nested with Mor Pankh in background and Murli diagonal at bottom) */}
      <div className="relative z-20 w-full max-w-2xl text-center px-6">
        <AnimatePresence mode="wait">
          {/* Phase 1: 0 - 3 Seconds (Ambient Atmosphere only) */}
          {phase === 1 && (
            <motion.div key="p1" className="h-10" />
          )}

          {/* Phase 2: 3 - 6 Seconds: Radhe Radhe (Sanskrit typography) */}
          {phase === 2 && (
            <motion.div
              key="p2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -10, filter: "blur(6px)", transition: { duration: 0.6 } }}
              transition={{ duration: 1.0 }}
              className="flex flex-col items-center justify-center space-y-3"
            >
              <h2 className="font-display text-4xl sm:text-5xl text-[#5C1A1A] font-bold tracking-widest drop-shadow-[0_2px_12px_rgba(212,168,83,0.2)] select-none">
                || श्री राधे राधे ||
              </h2>
              <span className="h-px w-24 bg-gold-start/35 mt-1 block" />
            </motion.div>
          )}

          {/* Phase 3: 6 - 9 Seconds: Welcome to Vrindavan & Welcome to Shreeji Seva Bhav */}
          {phase === 3 && (
            <motion.div
              key="p3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, filter: "blur(6px)", transition: { duration: 0.6 } }}
              transition={{ duration: 1.0 }}
              className="flex flex-col items-center justify-center space-y-4"
            >
              <h3 className="font-display text-2xl sm:text-3xl text-[#5C1A1A] font-semibold leading-relaxed tracking-wider">
                Welcome to Vrindavan
              </h3>
              <p className="font-display text-xs sm:text-sm tracking-[0.25em] text-[#8B6F4E] uppercase font-bold">
                Welcome to Shreeji Seva Bhav
              </p>
            </motion.div>
          )}

          {/* Phase 4: 9 - 12 Seconds: Merger / Title Reveal with Premium Layering */}
          {phase === 4 && (
            <motion.div
              key="p4"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20, filter: "blur(12px)", transition: { duration: 0.8 } }}
              transition={{ duration: 1.2 }}
              className="relative flex flex-col items-center justify-center min-h-[380px] w-full"
            >
              {/* Mor Pankh slightly behind text with a soft edge blur and low opacity */}
              <motion.div
                initial={{ opacity: 0, scale: 1.15, rotate: 10 }}
                animate={{ opacity: 0.35, scale: 1.35, rotate: [10, 14, 10], y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none filter blur-[2px] opacity-40"
              >
                <MorPankh />
              </motion.div>

              {/* Title & Tagline in front of Mor Pankh */}
              <div className="relative z-10 space-y-3 flex flex-col items-center">
                <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-[0.15em] text-[#5C1A1A] drop-shadow-[0_2px_10px_rgba(255,251,244,0.85)]">
                  SHREEJI SEVA BHAV
                </h1>
                <p className="font-display text-xs sm:text-sm tracking-[0.2em] text-[#8B6F4E] uppercase font-bold mt-1 drop-shadow-[0_2px_8px_rgba(255,251,244,0.85)]">
                  Divine Clothing & Jewellery For Your Beloved Thakurji
                </p>
              </div>

              {/* Golden Murli sitting diagonally beneath tagline (3D depth, no text collisions) */}
              <motion.div
                initial={{ opacity: 0, y: 35, rotate: -25, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  rotate: [-12, -9, -12], 
                  x: [0, 5, 0],
                  scale: 1.02 
                }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                className="relative z-20 pointer-events-none select-none mt-10 filter drop-shadow-[0_12px_28px_rgba(212,168,83,0.32)]"
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
              >
                <GoldenMurli />
              </motion.div>
            </motion.div>
          )}

          {/* Phase 5: 12 - 15 Seconds: Made with Bhakti Prem Seva & Devotional prayers */}
          {phase === 5 && (
            <motion.div
              key="p5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: "blur(12px)", transition: { duration: 0.8 } }}
              transition={{ duration: 1.2 }}
              className="relative flex flex-col items-center justify-center min-h-[380px] w-full"
            >
              {/* Mor Pankh behind text */}
              <motion.div
                initial={{ opacity: 0.35, scale: 1.35, rotate: 10 }}
                animate={{ opacity: 0.35, scale: 1.35, rotate: [10, 14, 10], y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none filter blur-[2px] opacity-40"
              >
                <MorPankh />
              </motion.div>

              {/* Prayers and Core values */}
              <div className="relative z-10 space-y-5 flex flex-col items-center">
                <div className="space-y-1">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-[#8B6F4E] font-bold">Made with</p>
                  <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#5C1A1A] tracking-[0.25em] uppercase">
                    Bhakti • Prem • Seva
                  </h3>
                </div>
                <div className="flex flex-col items-center gap-2 text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-bold text-charcoal/80 pt-3 border-t border-gold-start/20 w-full max-w-sm mx-auto">
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    Every Thread is an Offering
                  </motion.span>
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                    Every Ornament is a Prayer
                  </motion.span>
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
                    Every Creation is a Seva
                  </motion.span>
                </div>
              </div>

              {/* Golden Murli sitting diagonally beneath prayers */}
              <motion.div
                initial={{ opacity: 1, rotate: -12, scale: 1.02 }}
                animate={{ 
                  rotate: [-12, -9, -12], 
                  x: [0, 5, 0],
                  scale: 1.02 
                }}
                transition={{ duration: 4.0, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-20 pointer-events-none select-none mt-10 filter drop-shadow-[0_12px_28px_rgba(212,168,83,0.32)]"
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
              >
                <GoldenMurli />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 6. Sound Control and Skip Darshan Buttons */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex items-center justify-between px-8 max-w-7xl mx-auto">
        <button
          onClick={toggleMute}
          className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm border border-gold-start/20 rounded-full text-xs font-semibold text-charcoal hover:bg-white transition-all shadow-sm pointer-events-auto"
          aria-label={isMuted ? "Unmute flute sound" : "Mute flute sound"}
        >
          {isMuted ? (
            <>
              <VolumeX size={14} className="text-[#8B6F4E]" />
              <span className="text-[10px] uppercase tracking-wider text-[#8B6F4E]">Enable Sound</span>
            </>
          ) : (
            <>
              <Volume2 size={14} className="text-gold-start animate-pulse" />
              <span className="text-[10px] uppercase tracking-wider text-gold-start">Playing Music</span>
            </>
          )}
        </button>

        {/* Skip button - appears after 8 seconds */}
        <AnimatePresence>
          {canSkip && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={handleComplete}
              className="flex items-center gap-1.5 px-4.5 py-2.5 bg-white/80 backdrop-blur-sm border border-gold-start/30 rounded-full text-[10px] uppercase tracking-widest font-bold text-[#5C1A1A] hover:bg-white hover:border-[#5C1A1A] hover:scale-[1.03] transition-all shadow-sm pointer-events-auto"
            >
              <span>Skip Darshan</span>
              <Sparkles size={11} className="text-gold-start" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
