import React, { useEffect, useRef } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import projectsData from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = ({ projects = projectsData }) => {
  const orderedProjects = [...projects].sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in the section header
      gsap.fromTo('.section-head-animate', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, y: 0, 
          stagger: 0.15, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );

      // Fade in the bento grid cards with Clip-Path Reveal
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card, 
          { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', y: 80, opacity: 0 },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', y: 0, opacity: 1,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handle magnetic hover/liquid-glass effect for bento cards
  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Set CSS variables for a glow effect based on mouse position
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    gsap.to(card, {
      rotateX,
      rotateY,
      scale: 1.02,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.7,
      ease: 'power3.out',
    });
  };

  return (
    <section id="projects" className="section-block relative z-10 py-24" ref={sectionRef}>
      <div className="container px-4 mx-auto">
        <div className="mb-16 md:mb-24 max-w-3xl">
          <p className="text-tech-secondary font-mono text-sm tracking-wider uppercase mb-3 section-head-animate">Selected Work</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-tech-text section-head-animate">
            Projects that combine product thinking with engineering depth.
          </h2>
          <span className="text-lg md:text-xl text-tech-text/70 section-head-animate inline-block">
            Each project reflects a balance of usability, data insight, and technical execution.
          </span>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[400px]">
          {orderedProjects.map((project, idx) => {
            // Logic to determine bento grid spanning sizes
            // Every 1st item spans 2 cols, every 4th item spans 2 cols, etc.
            const isLarge = idx === 0 || idx === 3 || idx === 4;
            const cardClasses = `group relative overflow-hidden glass-panel p-8 flex flex-col justify-between ${isLarge ? 'md:col-span-2' : 'col-span-1'}`;

            return (
              <article 
                key={project.id || project.title} 
                className={cardClasses}
                ref={(el) => (cardsRef.current[idx] = el)}
                onMouseMove={(e) => handleMouseMove(e, idx)}
                onMouseLeave={() => handleMouseLeave(idx)}
              >
                <div 
                  className="absolute inset-0 z-0 opacity-10 overflow-hidden mix-blend-screen pointer-events-none rounded-3xl will-change-transform"
                  style={{ transformStyle: 'preserve-3d', filter: `url(#liquid-${idx})` }}
                  data-speed={idx % 2 === 0 ? '0.9' : '0.7'}
                >
                  <svg className="hidden">
                    <filter id={`liquid-${idx}`}>
                      <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
                      <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                  </svg>
                  <img 
                    src={project.imageUrl || `https://picsum.photos/800/600?random=${idx}`} 
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 blur-sm group-hover:blur-0"
                  />
                </div>

                {/* Background Glow Effect */}
                <div 
                  className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-0"
                  style={{
                    background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(34, 197, 94, 0.15), transparent 40%)'
                  }}
                />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <small className="text-tech-secondary font-mono text-xs uppercase tracking-wider bg-tech-secondary/10 px-3 py-1 rounded-full">{project.category}</small>
                    <div className="flex gap-3">
                      {project.github ? (
                        <a href={project.github} target="_blank" rel="noreferrer" className="text-tech-text/70 hover:text-tech-text transition-colors">
                          <Github size={20} />
                        </a>
                      ) : (
                        <span className="text-tech-text/50 text-sm font-medium">Case study</span>
                      )}
                      <a href="#" className="text-tech-text/70 hover:text-tech-text transition-colors">
                        <ExternalLink size={20} />
                      </a>
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-tech-text mb-3 tracking-tight group-hover:text-tech-secondary transition-colors">{project.title}</h3>
                  <p className="text-tech-text/70 line-clamp-3 mb-6 text-sm md:text-base">{project.description}</p>
                </div>

                <div className="relative z-10 mt-auto">
                  {project.highlights && project.highlights.length > 0 && isLarge && (
                    <ul className="mb-6 space-y-2">
                      {project.highlights.slice(0, 2).map((highlight, hidx) => (
                        <li key={hidx} className="text-sm text-tech-text/80 flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-tech-accent before:rounded-full before:mr-3">
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {(project.technologies || []).slice(0, 4).map((tag) => (
                      <span key={tag} className="text-xs font-medium text-tech-text/80 bg-white/60 border border-tech-border px-3 py-1.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                    {(project.technologies?.length > 4) && (
                      <span className="text-xs font-medium text-tech-text/50 px-2 py-1.5">+{project.technologies.length - 4}</span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
