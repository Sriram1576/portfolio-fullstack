import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import skillsData from '../data/skills';

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = ({ skills = skillsData }) => {
  const orderedSkills = [...skills].sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.editorial-skill-header', 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, y: 0, stagger: 0.2, duration: 1.5, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      );

      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(item,
          { opacity: 0, y: 30, filter: 'blur(5px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)',
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%'
            }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="relative z-10 py-32 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto" ref={sectionRef}>
      <div className="mb-20">
        <p className="editorial-skill-header text-tech-secondary font-medium tracking-[0.2em] uppercase text-sm mb-6 flex items-center gap-4">
          <span className="w-12 h-[1px] bg-tech-accent"></span>
          Expertise
        </p>
        <h2 className="editorial-skill-header text-4xl md:text-6xl font-serif font-medium text-tech-primary tracking-tight">
          Capabilities & <br/>
          <span className="italic text-tech-secondary">technical focus.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {orderedSkills.map((skill, idx) => {
          const isPrimary = idx === 0;
          return (
          <article 
            key={skill.id || skill.name} 
            className={`liquid-glass p-10 flex flex-col justify-between group ${isPrimary ? 'md:col-span-2 lg:col-span-2 min-h-[300px]' : 'col-span-1 min-h-[300px]'}`}
            ref={(el) => (itemsRef.current[idx] = el)}
          >
            <div className="flex justify-between items-start mb-12">
              <span className="text-xs font-semibold tracking-widest px-4 py-2 rounded-full bg-tech-primary text-tech-surface uppercase transition-colors">
                {skill.category}
              </span>
              <span className="text-3xl font-serif italic text-tech-primary/20 group-hover:text-tech-accent transition-colors duration-500">
                {String(idx + 1).padStart(2, '0')}
              </span>
            </div>
            
            <div>
              <h3 className={`${isPrimary ? 'text-4xl' : 'text-3xl'} font-serif font-medium text-tech-primary mb-6 group-hover:translate-x-2 transition-transform duration-500`}>
                {skill.name}
              </h3>
              
              <div className="h-[1px] w-full bg-tech-border mb-6 relative overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-tech-accent"
                  style={{ width: `${skill.proficiency}%` }}
                />
              </div>
              
              <p className="text-tech-secondary text-sm font-medium tracking-wide uppercase">
                {skill.proficiency}% proficiency <span className="mx-2 opacity-50">|</span> {skill.yearsOfExperience} years
              </p>
            </div>
          </article>
        )})}
      </div>
    </section>
  );
};

export default SkillsSection;
