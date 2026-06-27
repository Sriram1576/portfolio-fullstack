import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const counterRef = useRef(null);
  const hasCompletedRef = useRef(false);
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const chars = textRef.current.innerText.split('');
    textRef.current.innerText = '';
    chars.forEach((char) => {
      const span = document.createElement('span');
      span.innerText = char === ' ' ? '\u00A0' : char;
      span.className = 'preloader-char opacity-0 inline-block translate-y-4';
      textRef.current.appendChild(span);
    });

    gsap.to('.preloader-char', {
      y: 0,
      opacity: 1,
      stagger: 0.05,
      duration: 0.8,
      ease: 'power3.out'
    });

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
      }
      setProgress(currentProgress);
    }, 150);

    return () => {
      clearInterval(interval);
      // document.body.style.overflow = ''; (Wait until animation finishes before enabling scroll)
    };
  }, []);

  useEffect(() => {
    if (progress === 100 && !hasCompletedRef.current) {
      hasCompletedRef.current = true;
      
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          if (onComplete) onComplete();
        }
      });

      tl.to(counterRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: 'power3.in'
      })
      .to('.preloader-char', {
        y: -20,
        opacity: 0,
        stagger: 0.03,
        duration: 0.5,
        ease: 'power3.in'
      }, "<")
      .to(containerRef.current, {
        yPercent: -100,
        duration: 1,
        ease: 'power4.inOut'
      });
    }
  }, [progress, onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-950 text-zinc-100"
    >
      <div className="flex flex-col items-center overflow-hidden">
        <h1 
          ref={textRef} 
          className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-4"
        >
          Portfolio Loading
        </h1>
        <div ref={counterRef} className="text-8xl md:text-[9rem] font-light tracking-tighter tabular-nums leading-none">
          {progress}%
        </div>
      </div>
      <div className="absolute bottom-10 left-10 right-10 flex justify-between text-sm uppercase tracking-widest text-tech-text/50">
        <span>Initializing Experience</span>
        <span>Please Wait</span>
      </div>
    </div>
  );
};

export default Preloader;
