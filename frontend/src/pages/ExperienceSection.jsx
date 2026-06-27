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
      gsap.fromTo('.editorial-exp-header', 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, y: 0, stagger: 0.2, duration: 1.5, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      );

      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(item,
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0,
            duration: 1,
            ease: 'power2.out',
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
    <section id="experience" className="relative z-10 py-32 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto bg-tech-base" ref={sectionRef}>
      <div className="mb-24 flex flex-col md:flex-row md:justify-between md:items-end gap-8">
        <div>
          <p className="editorial-exp-header text-tech-secondary font-medium tracking-[0.2em] uppercase text-sm mb-6 flex items-center gap-4">
            <span className="w-12 h-[1px] bg-tech-accent"></span>
            Career
          </p>
          <h2 className="editorial-exp-header text-4xl md:text-6xl font-serif font-medium text-tech-primary tracking-tight">
            Professional <br/>
            <span className="italic text-tech-secondary">milestones.</span>
          </h2>
        </div>
      </div>

      <div className="space-y-12">
        {orderedExperiences.map((exp, idx) => (
          <article 
            key={exp.id || exp.title} 
            className="group grid grid-cols-1 md:grid-cols-12 gap-8 items-start py-8 border-b border-tech-border hover:border-tech-primary transition-colors duration-500"
            ref={(el) => (itemsRef.current[idx] = el)}
          >
            {/* Timeline & Company */}
            <div className="md:col-span-3">
              {exp.type && (
                <span className="inline-block px-2.5 py-1 mb-3 text-[10px] font-bold tracking-widest uppercase rounded bg-tech-surface text-tech-accent border border-tech-accent/30">
                  {exp.type}
                </span>
              )}
              <p className="text-tech-secondary font-medium tracking-widest text-xs uppercase mb-2">{exp.period || '2023 — Present'}</p>
              <h4 className="text-xl font-serif italic text-tech-primary">{exp.company}</h4>
            </div>

            {/* Role & Description */}
            <div className="md:col-span-6">
              <h3 className="text-2xl md:text-3xl font-medium text-tech-primary mb-6 group-hover:text-tech-accent transition-colors duration-300">
                {exp.title}
              </h3>
              <p className="text-tech-secondary leading-relaxed font-light text-lg">
                {exp.description}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="md:col-span-3 flex flex-wrap gap-2 md:justify-end">
              {(exp.technologies || []).map((tag) => (
                <span key={tag} className="px-3 py-1 text-[11px] font-semibold tracking-wider rounded-full border border-tech-border text-tech-secondary uppercase group-hover:border-tech-primary/30 transition-colors">
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
