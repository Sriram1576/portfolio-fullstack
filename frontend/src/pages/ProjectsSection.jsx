import React, { useEffect, useState } from 'react';
import { projectsAPI } from '../services/api';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let alive = true;

    const fetchProjects = async () => {
      try {
        const response = await projectsAPI.getAll();
        if (alive) {
          setProjects(response.data?.data || []);
        }
      } catch (error) {
        if (alive) {
          setProjects([]);
        }
      }
    };

    fetchProjects();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <section id="projects" className="section-block reveal-block depth-shift" data-depth="8">
      <div className="container">
        <div className="section-head">
          <p>Selected Work</p>
          <h2>Projects that combine product thinking with engineering depth.</h2>
          <span>Each project reflects a balance of usability, data insight, and technical execution.</span>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <article key={project._id || project.title} className="project-tile hover-target">
              <small>{project.category}</small>
              <h3>{String(project.title || '').replaceAll('_', ' ')}</h3>
              <p>{project.description}</p>
              <div>
                {(project.technologies || []).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
