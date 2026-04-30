import React from 'react';
import projectsData from '../data/projects';

const ProjectsSection = ({ projects = projectsData }) => {
  const orderedProjects = [...projects].sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));

  return (
    <section id="projects" className="section-block reveal-block depth-shift" data-depth="8">
      <div className="container">
        <div className="section-head">
          <p>Selected Work</p>
          <h2>Projects that combine product thinking with engineering depth.</h2>
          <span>Each project reflects a balance of usability, data insight, and technical execution.</span>
        </div>

        <div className="project-grid">
          {orderedProjects.map((project) => (
            <article key={project.id || project.title} className="project-tile hover-target">
              <small>{project.category}</small>
              <h3>{project.title}</h3>
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
