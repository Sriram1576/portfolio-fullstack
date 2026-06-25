import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Download, Briefcase, MapPin, Sparkles } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import NeuralCanvas from '../components/NeuralCanvas';
import gsap from 'gsap';

const HeroSection = () => {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);

  useEffect(() => {
    if (!heroRef.current) return undefined;

    const ctx = gsap.context(() => {
      // Manual split text animation
      const textElements = headlineRef.current.querySelectorAll('.word');
      
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        '.hero-chip-badge',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'back.out(1.5)' }
      )
      .fromTo(
        textElements,
        { y: 100, opacity: 0, rotateX: -40, transformOrigin: '0% 50% -50' },
        { y: 0, opacity: 1, rotateX: 0, stagger: 0.08, duration: 1.2, ease: 'power4.out' },
        "-=0.4"
      )
      .fromTo(
        '.hero-desc',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        "-=0.8"
      )
      .fromTo(
        '.hero-cta-btn',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'back.out(1.2)' },
        "-=0.6"
      );

    }, heroRef);

    // Magnetic card effect
    const heroCard = heroRef.current.querySelector('.hero-info-card');
    if (heroCard) {
      const onMove = (event) => {
        const rect = heroCard.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        gsap.to(heroCard, {
          rotateY: px * 20,
          rotateX: -py * 20,
          transformPerspective: 1000,
          duration: 0.4,
          ease: 'power3.out'
        });
      };

      const onLeave = () => {
        gsap.to(heroCard, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.5)'
        });
      };

      heroCard.addEventListener('mousemove', onMove);
      heroCard.addEventListener('mouseleave', onLeave);

      return () => {
        ctx.revert();
        heroCard.removeEventListener('mousemove', onMove);
        heroCard.removeEventListener('mouseleave', onLeave);
      };
    }
    
    return () => ctx.revert();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden" ref={heroRef}>
      {/* WebGL/Canvas Background */}
      <NeuralCanvas />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Content */}
          <div className="lg:col-span-7 xl:col-span-8" data-speed="0.8">
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="hero-chip-badge inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-purple-400/10 text-purple-400 border border-purple-400/20 text-sm font-medium backdrop-blur-sm micro-spring">
                <Sparkles size={14} /> Open for internships
              </span>
              <span className="hero-chip-badge inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 text-zinc-300 border border-white/10 text-sm font-medium backdrop-blur-sm micro-spring">
                <Briefcase size={14} /> Freelance projects
              </span>
              <span className="hero-chip-badge inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 text-zinc-300 border border-white/10 text-sm font-medium backdrop-blur-sm micro-spring">
                <MapPin size={14} /> Odisha, India
              </span>
            </div>

            <h1 
              ref={headlineRef}
              className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6 leading-[1.1] perspective-[1000px]"
            >
              <span className="block overflow-hidden pb-2"><span className="word inline-block">Building</span></span>
              <span className="block overflow-hidden pb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-rose-400"><span className="word inline-block">immersive digital</span></span>
              <span className="block overflow-hidden pb-2"><span className="word inline-block">experiences</span></span>
            </h1>

            <p className="hero-desc text-lg md:text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
              I am a B.Tech Data Science student at GIET and pursuing an AI/ML major track with IIT Ropar,
              while building reliable web products with React, Node.js, and data-driven engineering.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <MagneticButton>
                <button 
                  className="hero-cta-btn bg-white text-black px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:bg-zinc-200 transition-colors micro-press"
                  onClick={() => scrollToSection('projects')}
                >
                  View projects <ArrowUpRight size={18} />
                </button>
              </MagneticButton>
              <MagneticButton>
                <button 
                  className="hero-cta-btn bg-white/10 text-white px-8 py-4 rounded-full font-semibold border border-white/20 hover:bg-white/20 transition-colors backdrop-blur-md micro-press"
                  onClick={() => scrollToSection('contact')}
                >
                  Contact me
                </button>
              </MagneticButton>
              <MagneticButton>
                <a
                  className="hero-cta-btn text-zinc-300 hover:text-white flex items-center gap-2 font-medium ml-4 transition-colors group micro-press"
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Download size={18} className="group-hover:-translate-y-1 transition-transform" /> 
                  <span className="border-b border-zinc-600 group-hover:border-white pb-0.5 transition-colors">Resume</span>
                </a>
              </MagneticButton>
            </div>
          </div>

          {/* Side Info Card */}
          <div className="lg:col-span-5 xl:col-span-4 hidden lg:block">
            <div className="hero-info-card bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 relative overflow-hidden transform-style-3d shadow-2xl" data-speed="0.6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              
              <h3 className="text-xl font-bold text-white mb-6">What I bring</h3>
              
              <ul className="space-y-6 mb-8 relative z-10">
                <li className="group">
                  <strong className="block text-purple-400 font-medium mb-1 group-hover:translate-x-1 transition-transform">End-to-end delivery</strong>
                  <span className="text-zinc-400 text-sm">From APIs and databases to responsive React interfaces.</span>
                </li>
                <li className="group">
                  <strong className="block text-purple-400 font-medium mb-1 group-hover:translate-x-1 transition-transform">Practical AI integration</strong>
                  <span className="text-zinc-400 text-sm">ML-backed features connected to real product workflows.</span>
                </li>
                <li className="group">
                  <strong className="block text-purple-400 font-medium mb-1 group-hover:translate-x-1 transition-transform">Performance-first mindset</strong>
                  <span className="text-zinc-400 text-sm">Fast load times, stable UX, and maintainable codebases.</span>
                </li>
              </ul>
              
              <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-4 relative z-10">
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider font-mono mb-1">Current focus</p>
                  <p className="text-sm font-medium text-zinc-300">Data Science & AI/ML</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider font-mono mb-1">Location</p>
                  <p className="text-sm font-medium text-zinc-300">Odisha, India</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
        <span className="text-xs tracking-widest text-zinc-400 uppercase font-mono">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-zinc-400 to-transparent"></div>
      </div>
    </section>
  );
};

export default HeroSection;
