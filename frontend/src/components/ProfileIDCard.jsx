import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Image as ImageIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProfileIDCard = () => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    // Hanging pendulum animation on load
    gsap.set(containerRef.current, { transformOrigin: 'top center', rotation: -60, y: -600 });
    
    // 1. Natural Drop (Gravity + Bounce)
    gsap.to(containerRef.current, {
      y: 0,
      duration: 1.5,
      ease: 'bounce.out',
      delay: 2.2, 
    });

    // 1b. Natural Pendulum Swing (Rotational Inertia)
    gsap.to(containerRef.current, {
      rotation: 0,
      duration: 2.8,
      ease: 'elastic.out(1, 0.2)', 
      delay: 2.2 
    });

    // Sub-animation: card wobble
    gsap.fromTo(cardRef.current, 
      { rotationY: -45, rotationX: 15 },
      { 
        rotationY: 0, 
        rotationX: 0, 
        duration: 3.5, 
        ease: 'elastic.out(1, 0.15)', 
        delay: 2.4 
      }
    );

    // Continuous subtle swinging (breeze)
    gsap.to(containerRef.current, {
      rotation: 1.5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 5
    });

    // 3. Scroll to Vanish (and reappear on scroll up)
    gsap.to(containerRef.current, {
      y: -800, // Pull it up
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top', // Finishes hiding when hero is out of view
        scrub: true, // This ensures it reverses perfectly when scrolling up
      }
    });

  }, []);

  return (
    <div 
      ref={containerRef}
      // 4. Moved to the right side so it doesn't block the main headline
      className="fixed top-0 right-8 md:right-16 lg:right-32 xl:right-48 z-50 flex flex-col items-center pointer-events-none"
      style={{ perspective: '1000px' }}
    >
      {/* 2. Fabric/Collage Thread Lanyard */}
      <div 
        className="w-6 h-32 md:h-48 relative z-0"
        style={{
          backgroundColor: '#0f172a',
          backgroundImage: `
            linear-gradient(45deg, rgba(255,255,255,0.03) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.03) 75%, rgba(255,255,255,0.03)),
            linear-gradient(-45deg, rgba(255,255,255,0.03) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.03) 75%, rgba(255,255,255,0.03))
          `,
          backgroundSize: '10px 10px',
          boxShadow: 'inset 0 0 15px rgba(0,0,0,0.9), 2px 0 10px rgba(0,0,0,0.5)',
        }}
      >
        {/* Fabric Stitches */}
        <div className="absolute inset-y-0 left-1 w-[1px] border-l-[1.5px] border-dashed border-white/20"></div>
        <div className="absolute inset-y-0 right-1 w-[1px] border-r-[1.5px] border-dashed border-white/20"></div>
      </div>

      {/* The ID Card Clip / Holder */}
      <div className="w-10 h-5 bg-zinc-300 rounded-sm -mt-2 z-10 border border-zinc-400 shadow-[0_5px_10px_rgba(0,0,0,0.5)] relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-2 bg-zinc-500 rounded-full inset-shadow"></div>
      </div>

      {/* The Physical ID Card */}
      <div 
        ref={cardRef}
        className="w-48 h-64 md:w-56 md:h-72 floating-glass rounded-xl mt-1 p-2 flex items-center justify-center relative overflow-hidden pointer-events-auto cursor-pointer"
        style={{
          border: '2px solid rgba(34, 197, 94, 0.4)', // Tech Accent Green border
          boxShadow: '0 20px 40px rgba(0,0,0,0.6), inset 0 0 20px rgba(34,197,94,0.1)'
        }}
      >
        {/* Holographic glare effect */}
        <div className="absolute top-0 left-0 w-[150%] h-[150%] bg-gradient-to-tr from-transparent via-white/10 to-transparent -rotate-45 -translate-y-1/2 pointer-events-none" />
        
        {/* Card Hole punch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-2 bg-black/60 rounded-full border border-white/10 shadow-inner"></div>

        {/* The User Image Placeholder */}
        <div className="w-full h-full bg-[#050505] rounded-lg border border-tech-border flex flex-col items-center justify-center overflow-hidden relative group mt-4">
          <ImageIcon size={48} className="text-zinc-700 mb-4 group-hover:text-tech-accent transition-colors duration-300" />
          <p className="text-xs font-mono text-zinc-500 text-center px-4">Image Placeholder<br/>(Drop photo here)</p>
          
          {/* Subtle scanline effect */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none opacity-30"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileIDCard;
