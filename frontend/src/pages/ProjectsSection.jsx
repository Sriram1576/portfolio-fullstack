import React from 'react';

const ProjectsSection = ({ projects = [], loading = false }) => {

  return (
    <section id="projects" className="section-block reveal-block depth-shift" data-depth="8">
      <div className="container">
        <div className="section-head">
          <p>Selected Work</p>
          <h2>Projects that combine product thinking with engineering depth.</h2>
          <span>Each project reflects a balance of usability, data insight, and technical execution.</span>
        </div>

        <div className="project-grid">
          {loading && <p className="section-message">Loading projects...</p>}
          {!loading && projects.length === 0 && <p className="section-message">Projects are temporarily unavailable.</p>}
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
