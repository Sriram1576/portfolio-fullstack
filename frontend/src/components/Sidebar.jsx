import React from 'react';
import { Zap, Terminal, Layers, Cpu, Briefcase, Send } from 'lucide-react';

const Sidebar = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="sidebar-logo hover-target magnetic-btn" data-cursor="hover">
        <Zap className="w-5 h-5" />
      </div>
      <nav className="sidebar-nav flex flex-col gap-8 mt-12">
        <a href="#hero" className="sidebar-icon hover-target icon-bounce" data-cursor="hover" onClick={() => scrollToSection('hero')}>
          <Terminal className="w-5 h-5" />
        </a>
        <a href="#projects" className="sidebar-icon hover-target icon-bounce" data-cursor="hover" onClick={() => scrollToSection('projects')}>
          <Layers className="w-5 h-5" />
        </a>
        <a href="#skills" className="sidebar-icon hover-target icon-bounce" data-cursor="hover" onClick={() => scrollToSection('skills')}>
          <Cpu className="w-5 h-5" />
        </a>
        <a href="#experience" className="sidebar-icon hover-target icon-bounce" data-cursor="hover" onClick={() => scrollToSection('experience')}>
          <Briefcase className="w-5 h-5" />
        </a>
        <a href="#contact" className="sidebar-icon hover-target icon-bounce" data-cursor="hover" onClick={() => scrollToSection('contact')}>
          <Send className="w-5 h-5" />
        </a>
      </nav>
    </>
  );
};

export default Sidebar;
