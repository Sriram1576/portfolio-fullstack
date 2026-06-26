import React, { useEffect, useRef } from 'react';
import { Code2, Brain, Server, Sparkles } from 'lucide-react';
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
      gsap.fromTo('.skills-head-anim', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      );

      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(item,
          { opacity: 0, scale: 0.9, y: 40 },
          {
            opacity: 1, scale: 1, y: 0,
            duration: 0.6,
            ease: 'back.out(1.2)',
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

  const iconForCategory = (category) => {
    if (category === 'Frontend') return <Code2 size={24} className="text-tech-accent" />;
    if (category === 'Backend' || category === 'Database') return <Server size={24} className="text-tech-accent" />;
    if (category === 'Tools') return <Sparkles size={24} className="text-tech-accent" />;
    return <Brain size={24} className="text-tech-accent" />;
  };

  return (
    <section id="skills" className="relative z-10 py-32 px-4 max-w-7xl mx-auto" ref={sectionRef}>
      <div className="mb-16">
        <h2 className="skills-head-anim text-sm font-bold tracking-widest text-tech-accent uppercase mb-4">Capabilities</h2>
        <p className="skills-head-anim text-4xl md:text-6xl font-bold tracking-tighter text-white">Skills shaped for<br/>modern product teams.</p>
      </div>

      <div className="bento-grid-dense">
        {orderedSkills.map((skill, idx) => (
          <article 
            key={skill.id || skill.name} 
            className="glass-panel p-6 flex flex-col justify-between hover-target group"
            ref={(el) => (itemsRef.current[idx] = el)}
          >
            <div className="flex justify-between items-start mb-8">
              <div className="p-3 bg-tech-surface rounded-2xl group-hover:bg-white/10 transition-colors">
                {iconForCategory(skill.category)}
              </div>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-tech-surface text-gray-400 border border-tech-border">
                {skill.category}
              </span>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{skill.name}</h3>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-3">
                <div 
                  className="h-full bg-gradient-to-r from-tech-accent/80 to-tech-accent/40 rounded-full"
                  style={{ width: `${skill.proficiency}%` }}
                />
              </div>
              <p className="text-sm text-gray-400">
                {skill.proficiency}% proficiency · {skill.yearsOfExperience} years
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
