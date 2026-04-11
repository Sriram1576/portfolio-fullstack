import React, { useEffect, useState } from 'react';
import { Code2, Brain, Server, Sparkles } from 'lucide-react';
import { skillsAPI } from '../services/api';

const SkillsSection = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    let alive = true;

    const fetchSkills = async () => {
      try {
        const response = await skillsAPI.getAll();
        if (alive) {
          setSkills(response.data?.data || []);
        }
      } catch (error) {
        if (alive) {
          setSkills([]);
        }
      }
    };

    fetchSkills();

    return () => {
      alive = false;
    };
  }, []);

  const iconForCategory = (category) => {
    if (category === 'Frontend') return <Code2 size={20} />;
    if (category === 'Backend' || category === 'Database') return <Server size={20} />;
    if (category === 'Tools') return <Sparkles size={20} />;
    return <Brain size={20} />;
  };

  return (
    <section id="skills" className="section-block section-soft reveal-block depth-shift" data-depth="7">
      <div className="container">
        <div className="section-head">
          <p>Capabilities</p>
          <h2>Skills shaped for modern product teams.</h2>
          <span>Technical depth combined with clarity, collaboration, and execution discipline.</span>
        </div>

        <div className="skills-grid">
          {skills.map((skill) => (
            <article key={skill._id || skill.name} className="skill-tile hover-target">
              <div className="skill-icon">{iconForCategory(skill.category)}</div>
              <h3>{skill.name}</h3>
              <p>
                {skill.category} · {skill.proficiency}% proficiency · {skill.yearsOfExperience} years
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
