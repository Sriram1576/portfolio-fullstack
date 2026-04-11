import React, { useEffect } from 'react';
import gsap from 'gsap';

const ParallaxBackground = () => {
  useEffect(() => {
    const layers = document.querySelectorAll('.parallax-layer');
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    if (isTouchDevice || layers.length === 0) return undefined;

    const mouseMoveHandler = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;

      layers.forEach(layer => {
        const speed = layer.dataset.speed || 0.5;
        gsap.to(layer, {
          x: distX * speed * 0.1,
          y: distY * speed * 0.1,
          duration: 1,
          overwrite: 'auto'
        });
      });
    };

    const scrollHandler = () => {
      const scrollRatio = window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1);
      layers.forEach((layer, index) => {
        gsap.to(layer, {
          yPercent: scrollRatio * (index + 1) * 6,
          duration: 0.4,
          overwrite: 'auto'
        });
      });
    };

    const rafPulse = () => {
      const t = Date.now() * 0.00032;
      gsap.set('.beam-layer', {
        opacity: 0.36 + Math.sin(t * 2.6) * 0.1
      });
      gsap.set('.orb-2', {
        scale: 1 + Math.sin(t * 1.8) * 0.035
      });
      gsap.set('.orb-4', {
        scale: 1 + Math.cos(t * 2.2) * 0.04
      });
      animationId = window.requestAnimationFrame(rafPulse);
    };

    let animationId = window.requestAnimationFrame(rafPulse);
    document.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('scroll', scrollHandler);

    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('scroll', scrollHandler);
      window.cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="parallax-container">
      <div className="parallax-layer grid-layer" data-speed="0.2"></div>
      <div className="parallax-layer orb-layer orb-1" data-speed="0.5"></div>
      <div className="parallax-layer orb-layer orb-2" data-speed="0.3"></div>
      <div className="parallax-layer orb-layer orb-3" data-speed="0.4"></div>
      <div className="parallax-layer orb-layer orb-4" data-speed="0.55"></div>
      <div className="parallax-layer beam-layer" data-speed="0.28"></div>
      <div className="parallax-layer noise-layer" data-speed="0.18"></div>
    </div>
  );
};

export default ParallaxBackground;
