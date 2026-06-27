import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ProfileIDCard = () => {
  const cardRef = useRef(null);

  useEffect(() => {
    // Elegant slow entrance
    gsap.fromTo(cardRef.current,
      { opacity: 0, scale: 0.9, y: 30 },
      { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        duration: 1.5, 
        ease: 'power3.out',
        delay: 1
      }
    );

    // Subtle magnetic drift
    const ctx = gsap.context(() => {
      gsap.to(cardRef.current, {
        y: -10,
        x: 5,
        rotationZ: 1,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      className="fixed bottom-8 right-8 z-50 pointer-events-none hidden md:block"
      style={{ perspective: '1000px' }}
    >
      <a 
        href="https://wa.me/+918339966406"
        target="_blank"
        rel="noopener noreferrer"
        ref={cardRef}
        className="liquid-glass p-4 rounded-2xl flex items-center gap-4 pointer-events-auto cursor-pointer group hover:scale-105 transition-transform duration-500 block outline-none"
      >
        <div className="w-12 h-12 rounded-full overflow-hidden bg-tech-border relative">
          <img 
            src="/profile-image.jpeg" 
            alt="Profile" 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        </div>
        <div className="pr-2">
          <h4 className="font-serif font-medium text-tech-primary leading-tight">Subham Sadangi</h4>
          <p className="text-xs text-tech-secondary uppercase tracking-widest mt-1">Available</p>
        </div>
      </a>
    </div>
  );
};

export default ProfileIDCard;
