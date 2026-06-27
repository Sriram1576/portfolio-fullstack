import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Download } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Elegant slow reveal
      gsap.fromTo('.editorial-reveal',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: 'power3.out'
        }
      );

      gsap.fromTo('.hero-image-card',
        { scale: 0.95, opacity: 0, filter: 'blur(10px)' },
        {
          scale: 1, opacity: 1, filter: 'blur(0px)',
          duration: 2,
          ease: 'power3.out',
          delay: 0.4
        }
      );

      // Parallax for Glow Background removed to fix heavy 100px blur rendering lag during scroll

      // Parallax for Image Card
      gsap.to(cardRef.current, {
        y: 80,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // 3D Mousemove effect
      const xTo = gsap.quickTo(cardRef.current, "rotateY", { duration: 0.5, ease: "power3" });
      const yTo = gsap.quickTo(cardRef.current, "rotateX", { duration: 0.5, ease: "power3" });
      
      const handleMouseMove = (e) => {
        if(!cardRef.current || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        
        xTo(x * 10);
        yTo(-y * 10);
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      const container = containerRef.current;
      if (container) {
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);
      }

      return () => {
        if (container) {
          container.removeEventListener('mousemove', handleMouseMove);
          container.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative min-h-screen pt-32 pb-16 px-6 md:px-12 lg:px-24 flex items-center overflow-hidden"
    >
      <div ref={glowRef} className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-indigo-900/30 to-tech-accent/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse-glow" style={{ willChange: 'transform' }} />

      <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Content */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <p className="editorial-reveal text-tech-secondary font-medium tracking-[0.2em] uppercase text-sm mb-6 flex items-center gap-4">
            <span className="w-12 h-[1px] bg-tech-accent"></span>
            Data Science & Software Engineering
          </p>

          <h1 className="editorial-reveal text-5xl md:text-7xl lg:text-[5.5rem] font-serif font-medium text-tech-primary mb-8 leading-[1.1] tracking-tight">
            Building elegant <br />
            <span className="italic text-tech-secondary">digital solutions.</span>
          </h1>

          <p className="editorial-reveal text-lg md:text-xl text-tech-secondary max-w-xl mb-12 leading-relaxed font-light">
            I craft seamless, high-performance web products merging data-driven engineering with 
            immaculate digital experiences. Currently pursuing Data Science & AI.
          </p>

          <div className="editorial-reveal flex flex-wrap gap-6 items-center">
            <MagneticButton>
              <button 
                className="group bg-tech-primary text-[#0B0D17] px-8 py-4 rounded-full font-medium flex items-center gap-3 hover:bg-tech-accent hover:text-[#0B0D17] transition-all duration-300 hover:shadow-xl hover:shadow-tech-accent/20 active:scale-95"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Selected Works <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </MagneticButton>
            
            <MagneticButton>
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noreferrer"
                className="relative text-tech-primary font-medium flex items-center gap-2 pb-1 hover:text-tech-accent transition-colors duration-300 active:scale-95 group"
              >
                Resume 
                <Download size={16} className="transition-transform duration-300 group-hover:-translate-y-1" />
                <span className="absolute bottom-0 left-0 w-full h-px bg-tech-primary/30 transition-all duration-300 group-hover:bg-transparent"></span>
                <span className="absolute bottom-0 left-0 w-0 h-px bg-tech-accent transition-all duration-300 group-hover:w-full"></span>
              </a>
            </MagneticButton>
            
            <MagneticButton>
              <a 
                className="relative text-tech-primary font-medium pb-1 hover:text-tech-accent transition-colors duration-300 active:scale-95 group"
                href="#contact"
              >
                Get in Touch
                <span className="absolute bottom-0 left-0 w-full h-px bg-tech-primary/30 transition-all duration-300 group-hover:bg-transparent"></span>
                <span className="absolute bottom-0 left-0 w-0 h-px bg-tech-accent transition-all duration-300 group-hover:w-full"></span>
              </a>
            </MagneticButton>
          </div>
        </div>

        {/* Right Image/Content Container */}
        <div className="lg:col-span-5 relative mt-16 lg:mt-0 block" style={{ perspective: '1000px' }}>
          {/* Formatted like the Project Cards: Liquid glass, background image, overlaid text */}
          <div ref={cardRef} className="hero-image-card relative w-full aspect-[3/4] liquid-glass p-8 flex flex-col justify-end overflow-hidden group" style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}>
            
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0 opacity-50 mix-blend-screen pointer-events-none transition-transform duration-1000 group-hover:scale-110">
              <img 
                src="/profile-image.jpeg" 
                alt="Profile Background" 
                className="w-full h-full object-cover"
              />
              {/* Dark Gradient Overlay to ensure text is readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D17] via-[#0B0D17]/80 to-transparent"></div>
            </div>

            {/* Overlaid "What I Bring" Content */}
            <div className="relative z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-2xl font-serif font-medium text-tech-accent mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-tech-accent animate-pulse" />
                What I bring
              </h3>
              
              <ul className="space-y-3 mb-6">
                <li>
                  <strong className="text-tech-primary block text-sm">End-to-end delivery</strong>
                  <span className="text-tech-primary/80 font-light text-xs">From APIs and databases to responsive React interfaces.</span>
                </li>
                <li>
                  <strong className="text-tech-primary block text-sm">Practical AI integration</strong>
                  <span className="text-tech-primary/80 font-light text-xs">ML-backed features connected to real product workflows.</span>
                </li>
                <li>
                  <strong className="text-tech-primary block text-sm">Performance-first mindset</strong>
                  <span className="text-tech-primary/80 font-light text-xs">Fast load times, stable UX, and maintainable codebases.</span>
                </li>
              </ul>

              <div className="flex gap-6 border-t border-tech-primary/20 pt-4">
                <div>
                  <span className="text-tech-accent text-[10px] uppercase tracking-wider block mb-1">Current focus</span>
                  <span className="text-tech-primary text-xs font-medium">Data Science + AI/ML + Full-Stack</span>
                </div>
                <div>
                  <span className="text-tech-accent text-[10px] uppercase tracking-wider block mb-1">Location</span>
                  <span className="text-tech-primary text-xs font-medium">Odisha, India</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
