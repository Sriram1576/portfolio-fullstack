import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import experienceData from '../data/experience';

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = ({ experiences = experienceData }) => {
  const orderedExperiences = [...experiences].sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section headers
      gsap.fromTo('.exp-head-anim', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      );

      // Stagger items one by one
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(item,
          { opacity: 0, x: -50 },
          {
            opacity: 1, x: 0,
            duration: 0.8,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%'
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="relative z-10 py-32 px-4 max-w-7xl mx-auto" ref={sectionRef}>
      <div className="mb-16 max-w-2xl">
        <h2 className="exp-head-anim text-sm font-bold tracking-widest text-tech-accent uppercase mb-4">Experience</h2>
        <p className="exp-head-anim text-4xl md:text-6xl font-bold tracking-tighter text-white">Growth through real-world projects.</p>
      </div>

      <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[19px] before:w-[2px] before:bg-gradient-to-b before:from-tech-accent/80 before:to-transparent pl-12">
        {orderedExperiences.map((exp, idx) => (
          <article 
            key={exp.id || exp.title} 
            className="glass-panel p-8 relative group hover-target"
            ref={(el) => (itemsRef.current[idx] = el)}
          >
            <div className="absolute left-[-48px] top-8 w-10 h-10 rounded-full bg-black border-2 border-tech-accent flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)] group-hover:scale-110 transition-transform">
              <div className="w-3 h-3 bg-tech-accent rounded-full" />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-1">{exp.title}</h3>
            <h4 className="text-tech-accent font-medium mb-4">{exp.company}</h4>
            <p className="text-gray-400 mb-6">{exp.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {(exp.technologies || []).map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-tech-surface border border-tech-border text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
