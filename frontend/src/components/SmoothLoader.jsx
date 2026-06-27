import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const SmoothLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const loaderRef = useRef(null);
  const progressTextRef = useRef(null);
  const barRef = useRef(null);
  const bgRef = useRef(null);
  const brandRef = useRef(null);

  useEffect(() => {
    let currentProgress = 0;
    
    // Disable scrolling during load
    document.body.style.overflow = 'hidden';
    
    const interval = setInterval(() => {
      // Non-linear progress simulation for realistic feel
      const jump = currentProgress < 30 ? Math.random() * 15 + 5
                 : currentProgress < 80 ? Math.random() * 5 + 2
                 : Math.random() * 20 + 10;
                 
      currentProgress += Math.floor(jump);
      if (currentProgress > 100) currentProgress = 100;
      
      setProgress(currentProgress);
      
      if (currentProgress === 100) {
        clearInterval(interval);
        
        // Premium out-animation sequence
        const tl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = '';
            onComplete();
          }
        });
        
        tl.to(progressTextRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in'
        })
        .to(brandRef.current, {
          y: -30,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in'
        }, "<")
        .to(barRef.current, {
          scaleX: 0,
          transformOrigin: 'right',
          duration: 0.6,
          ease: 'power3.inOut'
        }, "-=0.3")
        .to(bgRef.current, {
          yPercent: -100,
          duration: 1,
          ease: 'power4.inOut'
        }, "-=0.1");
      }
    }, 120);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div 
      ref={loaderRef} 
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center pointer-events-none"
    >
      {/* Background Panel */}
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-[#0B0D17] w-full h-full"
      />
      
      <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-8">
        
        {/* Sleek Logo / Brand */}
        <div ref={brandRef} className="mb-12 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border border-[rgba(255,255,255,0.1)] flex items-center justify-center mb-4">
            <div className="w-2 h-2 bg-[#FF6B35] rounded-full shadow-[0_0_10px_#FF6B35] animate-pulse" />
          </div>
          <span className="text-white tracking-[0.2em] text-sm font-medium uppercase opacity-80">
            Portfolio
          </span>
        </div>

        {/* Minimal Progress Bar */}
        <div className="relative w-full h-[2px] bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden mb-8">
          <div 
            ref={barRef}
            className="absolute top-0 left-0 h-full bg-[#FF6B35] origin-left shadow-[0_0_10px_#FF6B35]"
            style={{ width: `${progress}%`, transition: 'width 0.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
          />
        </div>
        
        {/* Typography Progress */}
        <div className="flex items-start overflow-hidden h-16" ref={progressTextRef}>
          <span className="text-5xl md:text-6xl font-light text-white tracking-tighter leading-none" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {progress}
          </span>
          <span className="text-xl md:text-2xl text-[rgba(255,255,255,0.4)] font-light ml-1 leading-none mt-1">
            %
          </span>
        </div>
      </div>
    </div>
  );
};

export default SmoothLoader;
