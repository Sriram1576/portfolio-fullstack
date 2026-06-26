import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorDot = useRef(null);
  const cursorRing = useRef(null);

  useEffect(() => {
    const dot = cursorDot.current;
    const ring = cursorRing.current;

    if (!dot || !ring) return;

    // Set initial centers
    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { xPercent: -50, yPercent: -50 });

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isHovering = false;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // The dot follows the mouse instantly (or with a tiny duration for smoothness)
      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: 'power2.out',
      });
    };

    const tick = () => {
      // Lerp for smooth trailing effect on the ring
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      
      gsap.set(ring, {
        x: ringX,
        y: ringY,
      });
    };

    // Use GSAP's ticker for performant continuous updates
    gsap.ticker.add(tick);

    const onMouseOver = (e) => {
      // Elements that should trigger the hover effect
      const target = e.target.closest('.hover-target, a, button, input, textarea, [role="button"]');
      if (target) {
        isHovering = true;
        gsap.to(dot, { scale: 0, duration: 0.3, ease: 'power2.out' });
        gsap.to(ring, { 
          scale: 1.5, 
          backgroundColor: 'rgba(168, 85, 247, 0.1)', 
          borderColor: 'rgba(168, 85, 247, 0.8)',
          duration: 0.3, 
          ease: 'power2.out' 
        });
      }
    };

    const onMouseOut = (e) => {
      const target = e.target.closest('.hover-target, a, button, input, textarea, [role="button"]');
      if (target) {
        isHovering = false;
        gsap.to(dot, { scale: 1, duration: 0.3, ease: 'power2.out' });
        gsap.to(ring, { 
          scale: 1, 
          backgroundColor: 'transparent',
          borderColor: 'rgba(6, 182, 212, 0.5)',
          duration: 0.3, 
          ease: 'power2.out' 
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    };

    const onMouseEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    };

    // Attach global event listeners
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Hide default cursor across the document
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      gsap.ticker.remove(tick);
      
      // Restore default cursor on cleanup
      document.body.style.cursor = 'auto';
    };
  }, []);

  const styles = {
    dot: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '8px',
      height: '8px',
      backgroundColor: '#06b6d4',
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: 9999,
      mixBlendMode: 'difference',
      willChange: 'transform',
    },
    ring: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '40px',
      height: '40px',
      border: '1px solid rgba(6, 182, 212, 0.5)',
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: 9998,
      boxSizing: 'border-box',
      mixBlendMode: 'difference',
      transition: 'background-color 0.3s, border-color 0.3s',
      willChange: 'transform',
    }
  };

  return (
    <>
      <div ref={cursorRing} style={styles.ring} className="custom-cursor-ring" />
      <div ref={cursorDot} style={styles.dot} className="custom-cursor-dot" />
    </>
  );
}
