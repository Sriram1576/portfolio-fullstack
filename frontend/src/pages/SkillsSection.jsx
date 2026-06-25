import React from 'react';
import { Code2, Brain, Server, Sparkles } from 'lucide-react';
import skillsData from '../data/skills';

const SkillsSection = ({ skills = skillsData }) => {
  const orderedSkills = [...skills].sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));

  const iconForCategory = (category) => {
    if (category === 'Frontend') return <Code2 size={24} className="text-neon-purple" />;
    if (category === 'Backend' || category === 'Database') return <Server size={24} className="text-neon-rose" />;
    if (category === 'Tools') return <Sparkles size={24} className="text-neon-purple" />;
    return <Brain size={24} className="text-neon-rose" />;
  };

  return (
    <section id="skills" className="relative z-10 py-32 px-4 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-sm font-bold tracking-widest text-neon-purple uppercase mb-4">Capabilities</h2>
        <p className="text-4xl md:text-6xl font-bold tracking-tighter text-white">Skills shaped for<br/>modern product teams.</p>
      </div>

      <div className="bento-grid-dense">
        {orderedSkills.map((skill) => (
          <article key={skill.id || skill.name} className="glass-panel p-6 flex flex-col justify-between hover-target group">
            <div className="flex justify-between items-start mb-8">
              <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-colors">
                {iconForCategory(skill.category)}
              </div>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10">
                {skill.category}
              </span>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{skill.name}</h3>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-3">
                <div 
                  className="h-full bg-gradient-to-r from-neon-purple to-neon-rose rounded-full"
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
