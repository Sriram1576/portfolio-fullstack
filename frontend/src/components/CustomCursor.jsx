import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    // Only initialize on devices with a fine pointer (non-touch)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const circle = circleRef.current;
    
    if (!dot || !circle) return;

    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(circle, { xPercent: -50, yPercent: -50 });

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let circleX = mouseX;
    let circleY = mouseY;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Move dot immediately
      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: 'power2.out',
      });
    };

    const tick = () => {
      // Lagging trailing effect
      circleX += (mouseX - circleX) * 0.15;
      circleY += (mouseY - circleY) * 0.15;
      
      gsap.set(circle, {
        x: circleX,
        y: circleY,
      });
    };

    gsap.ticker.add(tick);

    // Add hover effects for interactive elements
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, input, textarea, [role="button"], .hover-scale, .hover-lift');
      if (target) {
        gsap.to(circle, {
          scale: 1.5,
          opacity: 0.5,
          duration: 0.3,
          backgroundColor: 'rgba(255, 107, 53, 0.2)', // Accent color glow (#FF6B35)
          borderColor: 'transparent'
        });
        gsap.to(dot, {
          scale: 0,
          duration: 0.3
        });
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, input, textarea, [role="button"], .hover-scale, .hover-lift');
      if (target) {
        gsap.to(circle, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          backgroundColor: 'transparent',
          borderColor: 'rgba(255, 107, 53, 0.5)'
        });
        gsap.to(dot, {
          scale: 1,
          duration: 0.3
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to([dot, circle], { opacity: 0, duration: 0.3 });
    };

    const onMouseEnter = () => {
      gsap.to([dot, circle], { opacity: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-[#FF6B35] rounded-full pointer-events-none z-[10005] shadow-[0_0_10px_#FF6B35] hidden md:block"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={circleRef}
        className="fixed top-0 left-0 w-10 h-10 border border-[#FF6B35]/50 rounded-full pointer-events-none z-[10004] transition-colors hidden md:block box-border"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
