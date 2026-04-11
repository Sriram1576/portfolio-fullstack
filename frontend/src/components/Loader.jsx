import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Loader = () => {
  const loaderRef = useRef(null);

  useEffect(() => {
    if (!loaderRef.current) return undefined;

    const letters = loaderRef.current.querySelectorAll('.loader-letter');
    const ctx = gsap.context(() => {
      gsap.to('.loader-letter', {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.06,
        duration: 0.7,
        ease: 'power4.out'
      });

      gsap.to('.loader-progress-fill', {
        scaleX: 1,
        duration: 2.15,
        ease: 'power2.inOut'
      });

      gsap.to('.loader-status', {
        opacity: 1,
        y: 0,
        delay: 0.45,
        duration: 0.7,
        ease: 'power3.out'
      });

      gsap.to('.loader-orb', {
        y: -18,
        x: 10,
        yoyo: true,
        repeat: -1,
        duration: 2.5,
        ease: 'sine.inOut'
      });
    }, loaderRef);

    letters.forEach((letter, index) => {
      letter.style.transitionDelay = `${index * 32}ms`;
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="loader-container" ref={loaderRef}>
      <div className="loader-orb"></div>
      <div className="loader-text" aria-label="Loading portfolio">
        {'SUBHAM'.split('').map((letter, index) => (
          <span key={`${letter}-${index}`} className="loader-letter">{letter}</span>
        ))}
      </div>
      <p className="loader-caption">IMMERSIVE EXPERIENCE LOADING</p>
      <div className="loader-progress-track">
        <div className="loader-progress-fill"></div>
      </div>
      <div className="loader-status">Calibrating depth, motion and interaction layers...</div>
    </div>
  );
};

export default Loader;
