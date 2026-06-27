import React, { useState, useEffect } from 'react';
import { Github, Linkedin } from 'lucide-react';
import MagneticButton from './MagneticButton';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className={`flex items-center justify-between px-6 py-4 rounded-full transition-all duration-500 ${scrolled ? 'glass-panel shadow-2xl' : 'bg-transparent'}`}>
          <a href="#hero" onClick={() => scrollToSection('hero')} className="text-xl font-bold tracking-tighter text-tech-text hover-target">
            Subham Sadangi
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {['Projects', 'Skills', 'Experience', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="relative text-sm font-medium text-tech-text/70 hover:text-tech-text transition-colors duration-300 hover-target micro-press group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-tech-accent transition-all duration-300 group-hover:w-full rounded-full"></span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <MagneticButton>
              <a href="https://github.com/Sriram1576" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center text-tech-text/70 hover:text-tech-text hover:bg-tech-secondary/5 transition-colors hover-target micro-press">
                <Github size={18} />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center text-tech-text/70 hover:text-tech-text hover:bg-tech-secondary/5 transition-colors hover-target micro-press">
                <Linkedin size={18} />
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
