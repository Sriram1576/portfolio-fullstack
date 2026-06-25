import React from 'react';
import experienceData from '../data/experience';

const ExperienceSection = ({ experiences = experienceData }) => {
  const orderedExperiences = [...experiences].sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));

  return (
    <section id="experience" className="relative z-10 py-32 px-4 max-w-7xl mx-auto">
      <div className="mb-16 max-w-2xl">
        <h2 className="text-sm font-bold tracking-widest text-neon-purple uppercase mb-4">Experience</h2>
        <p className="text-4xl md:text-6xl font-bold tracking-tighter text-white">Growth through real-world projects.</p>
      </div>

      <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[19px] before:w-[2px] before:bg-gradient-to-b before:from-neon-purple before:to-transparent pl-12">
        {orderedExperiences.map((exp) => (
          <article key={exp.id || exp.title} className="glass-panel p-8 relative group hover-target">
            <div className="absolute left-[-48px] top-8 w-10 h-10 rounded-full bg-black border-2 border-neon-purple flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)] group-hover:scale-110 transition-transform">
              <div className="w-3 h-3 bg-neon-purple rounded-full" />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-1">{exp.title}</h3>
            <h4 className="text-neon-purple font-medium mb-4">{exp.company}</h4>
            <p className="text-gray-400 mb-6">{exp.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {(exp.technologies || []).map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-gray-300">
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
