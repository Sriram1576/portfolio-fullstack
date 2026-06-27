import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StatsSection = () => {
  const stats = [
    { value: '10+', label: 'Projects Delivered' },
    { value: '4', label: 'Core Tech Stacks' },
    { value: '3', label: 'Internships & Training' },
    { value: '100%', label: 'Commitment to Quality' }
  ];
  
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.stat-card',
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%'
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative z-10 py-12 px-4 max-w-7xl mx-auto" ref={sectionRef}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((item) => (
          <article className="stat-card glass-panel p-8 text-center hover-target" key={item.label}>
            <p className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-tech-accent/80 to-tech-accent/40 bg-clip-text text-transparent mb-2">
              {item.value}
            </p>
            <span className="text-sm text-tech-text/70 font-medium uppercase tracking-wider">{item.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
