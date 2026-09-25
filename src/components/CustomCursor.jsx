import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const spotlightRef = useRef(null);

  useGSAP(() => {
    // Disable custom cursor on touch devices to avoid touch interference
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const spotlight = spotlightRef.current;

    if (!dot || !ring) return;

    // Center origins for smooth scaling
    gsap.set([dot, ring], { opacity: 0, scale: 0.5, transformOrigin: '50% 50%' });

    const xToDot = gsap.quickTo(dot, 'x', { duration: 0.05, ease: 'power2.out' });
    const yToDot = gsap.quickTo(dot, 'y', { duration: 0.05, ease: 'power2.out' });

    const xToRing = gsap.quickTo(ring, 'x', { duration: 0.15, ease: 'power3.out' });
    const yToRing = gsap.quickTo(ring, 'y', { duration: 0.15, ease: 'power3.out' });

    const xToSpotlight = spotlight
      ? gsap.quickTo(spotlight, 'x', { duration: 0.25, ease: 'power2.out' })
      : null;
    const yToSpotlight = spotlight
      ? gsap.quickTo(spotlight, 'y', { duration: 0.25, ease: 'power2.out' })
      : null;

    let isVisible = false;

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;

      // Reveal cursor on initial mouse movement
      if (!isVisible) {
        gsap.to([dot, ring], { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' });
        if (spotlight) gsap.to(spotlight, { opacity: 1, duration: 0.3 });
        isVisible = true;
      }

      // Exact center offsets
      xToDot(x - 6);
      yToDot(y - 6);
      xToRing(x - 24);
      yToRing(y - 24);

      if (xToSpotlight && yToSpotlight) {
        xToSpotlight(x - 350);
        yToSpotlight(y - 350);
      }
    };

    // Hover scale effects for clickable/interactive UI elements
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest('a, button, input, textarea, [role="button"]');

      if (isInteractive) {
        gsap.to(ring, { scale: 1.6, borderColor: 'rgba(229, 9, 20, 0.9)', duration: 0.2 });
        gsap.to(dot, { scale: 0.5, duration: 0.2 });
      } else {
        gsap.to(ring, { scale: 1, borderColor: 'rgba(229, 9, 20, 0.6)', duration: 0.2 });
        gsap.to(dot, { scale: 1, duration: 0.2 });
      }
    };

    const handleMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, scale: 0.5, duration: 0.3, ease: 'power2.inOut' });
      if (spotlight) gsap.to(spotlight, { opacity: 0, duration: 0.3 });
      isVisible = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  });

  return (
    <>
      {/* Global Mouse Follower Spotlight Beam */}
      <div
        ref={spotlightRef}
        className="fixed top-0 left-0 w-[700px] h-[700px] rounded-full pointer-events-none z-[9998] opacity-0 blur-[100px] hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(229,9,20,0.18) 0%, rgba(229,9,20,0.05) 45%, transparent 75%)',
        }}
      />

      {/* Custom Cursor Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-3 h-3 bg-red-600 rounded-full shadow-[0_0_15px_#E50914] hidden md:block"
      />

      {/* Custom Cursor Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-12 h-12 border border-red-600/60 rounded-full flex items-center justify-center backdrop-blur-[1px] hidden md:block"
      />
    </>
  );
};

export default CustomCursor;