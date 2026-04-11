import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Navbar = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="top-nav-wrap">
      <div className="container nav-shell">
        <a className="brand" href="#hero" onClick={() => scrollToSection('hero')}>Subham Sadangi</a>

        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#projects" onClick={() => scrollToSection('projects')}>Projects</a>
          <a href="#skills" onClick={() => scrollToSection('skills')}>Skills</a>
          <a href="#experience" onClick={() => scrollToSection('experience')}>Experience</a>
          <a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a>
        </nav>

        <div className="social-links" aria-label="Social links">
          <a href="https://github.com/Sriram1576" target="_blank" rel="noreferrer" aria-label="GitHub profile">
            <Github size={18} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
            <Linkedin size={18} />
          </a>
          <a href="mailto:subhamsadangi@gmail.com" aria-label="Email">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
