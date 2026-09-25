import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const NetflixPreloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const letterRef = useRef(null);
  const ribbonLeftRef = useRef(null);
  const ribbonCenterRef = useRef(null);
  const ribbonRightRef = useRef(null);
  const nameRef = useRef(null);

  // Synthesize Netflix "Ta-Dum" audio using Web Audio API
  const playTaDum = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const playTone = (freq, type, duration, delay, gainValue) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
        
        gain.gain.setValueAtTime(gainValue, ctx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + duration);
      };

      // First deep thump
      playTone(80, 'sine', 0.8, 0, 0.8);
      playTone(120, 'triangle', 0.6, 0, 0.5);

      // Second reverberating metallic impact ("Dum")
      playTone(95, 'sine', 1.2, 0.12, 1.0);
      playTone(180, 'triangle', 1.0, 0.12, 0.6);
      playTone(320, 'sawtooth', 0.4, 0.12, 0.2);
    } catch (err) {
      // Audio playback blocked or un-instantiated
    }
  };

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // Play synthesized sound
    playTaDum();

    // GSAP Sequence: Classic Netflix intro assembly
    tl.set(preloaderRef.current, { autoAlpha: 1 })
      .set([ribbonLeftRef.current, ribbonCenterRef.current, ribbonRightRef.current], { 
        scaleY: 0, 
        transformOrigin: "bottom center" 
      })
      .set(nameRef.current, { opacity: 0, y: 20 })

      // 1. Unfold Left & Right Vertical Pillars
      .to([ribbonLeftRef.current, ribbonRightRef.current], {
        scaleY: 1,
        duration: 0.35,
        ease: "power4.out",
        stagger: 0.05
      })
      
      // 2. Unfold Center Diagonal Ribbons
      .to(ribbonCenterRef.current, {
        scaleY: 1,
        duration: 0.4,
        ease: "power3.inOut"
      }, "-=0.2")

      // 3. Zoom letter forward with subtle 3D expansion
      .to(letterRef.current, {
        scale: 1.15,
        duration: 0.8,
        ease: "power1.inOut"
      })

      // 4. Reveal Portfolio Name below
      .to(nameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.5")

      // 5. Explode/Zoom screen towards viewer
      .to(letterRef.current, {
        scale: 45,
        opacity: 0,
        filter: "blur(20px)",
        duration: 0.7,
        ease: "expo.in"
      }, "+=0.3")

      .to(nameRef.current, {
        opacity: 0,
        duration: 0.2
      }, "-=0.7")

      // 6. Fade Out Overlay Container
      .to(preloaderRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut"
      }, "-=0.3");

  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] bg-[#141414] flex flex-col items-center justify-center select-none overflow-hidden"
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Animated Netflix "N" Ribbon Logo */}
        <div ref={letterRef} className="relative w-24 h-36 md:w-32 md:h-48">
          <svg 
            viewBox="0 0 100 150" 
            className="w-full h-full drop-shadow-[0_0_25px_rgba(229,9,20,0.6)]"
          >
            {/* Left Vertical Ribbon */}
            <rect 
              ref={ribbonLeftRef} 
              x="10" 
              y="10" 
              width="24" 
              height="130" 
              fill="#B81D24" 
            />
            
            {/* Right Vertical Ribbon */}
            <rect 
              ref={ribbonRightRef} 
              x="66" 
              y="10" 
              width="24" 
              height="130" 
              fill="#B81D24" 
            />

            {/* Center Diagonal Ribbon (Slightly brighter red for depth) */}
            <path 
              ref={ribbonCenterRef} 
              d="M 10 10 L 34 10 L 90 140 L 66 140 Z" 
              fill="#E50914" 
            />
          </svg>

          {/* Bottom Arc Curve Shadow (Characteristic Netflix Curve) */}
          <div className="absolute -bottom-2 left-0 right-0 h-4 bg-[#141414] rounded-t-[50%]" />
        </div>

        {/* User / Portfolio Name Tag */}
        <div ref={nameRef} className="mt-8 text-center">
          <h1 
            className="text-2xl md:text-3xl font-black tracking-[0.25em] text-[#E50914] uppercase drop-shadow-md"
            style={{ fontFamily: "'Bebas Neue', 'Helvetica Neue', 'Arial', sans-serif" }}
          >
            HARITHA
          </h1>
          <p className="text-xs tracking-[0.4em] text-gray-400 uppercase mt-1">
            Portfolio
          </p>
        </div>
      </div>
    </div>
  );
};

export default NetflixPreloader;