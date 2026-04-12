import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Download } from 'lucide-react';
import gsap from 'gsap';

const HeroSection = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    if (!heroRef.current) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-animate',
        { y: 45, opacity: 0, rotateX: -10 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.13,
          duration: 1.1,
          ease: 'power4.out',
          delay: 0.25
        }
      );

    }, heroRef);

    const heroCard = heroRef.current.querySelector('.hero-card');
    const onMove = (event) => {
      const rect = heroCard.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      gsap.to(heroCard, {
        rotateY: px * 12,
        rotateX: -py * 10,
        transformPerspective: 900,
        duration: 0.35,
        ease: 'power3.out'
      });
    };

    const onLeave = () => {
      gsap.to(heroCard, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.45,
        ease: 'power3.out'
      });
    };

    heroCard.addEventListener('mousemove', onMove);
    heroCard.addEventListener('mouseleave', onLeave);

    return () => {
      ctx.revert();
      heroCard.removeEventListener('mousemove', onMove);
      heroCard.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="container hero-grid">
        <div className="hero-copy reveal-block depth-shift" data-depth="10">
          <p className="eyebrow hero-animate">Full-Stack Developer • Data Science & AI/ML Student</p>
          <h1 className="hero-animate">
            <span>Building</span> <span>immersive digital</span> <span>experiences</span>
          </h1>
          <p className="hero-animate">
            I am a B.Tech Data Science student at GIET and pursuing an AI/ML major track with IIT Ropar,
            while building reliable web products with React, Node.js, and data-driven engineering.
          </p>
          <div className="hero-cta hero-animate">
            <button className="btn btn-primary hover-target" onClick={() => scrollToSection('projects')}>
              View projects <ArrowUpRight size={18} />
            </button>
            <button className="btn btn-secondary hover-target" onClick={() => scrollToSection('contact')}>
              Contact me
            </button>
            <a
              className="resume-link hover-target"
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              <Download size={16} /> Resume
            </a>
          </div>
        </div>

        <aside className="hero-card hero-animate hover-target reveal-block depth-shift" data-depth="16">
          <h3>What I bring</h3>
          <ul>
            <li>
              <strong>End-to-end delivery</strong>
              <span>From APIs and databases to responsive React interfaces.</span>
            </li>
            <li>
              <strong>Practical AI integration</strong>
              <span>ML-backed features connected to real product workflows.</span>
            </li>
            <li>
              <strong>Performance-first mindset</strong>
              <span>Fast load times, stable UX, and maintainable codebases.</span>
            </li>
          </ul>
          <div className="hero-card-foot">
            <div>
              <p className="meta-label">Current focus</p>
              <p className="meta-value">Data Science + AI/ML + Full-Stack</p>
            </div>
            <div>
              <p className="meta-label">Location</p>
              <p className="meta-value">Odisha, India</p>
            </div>
          </div>
        </aside>
      </div>
      <div className="hero-scroll-cue reveal-block">
        <span>SCROLL</span>
      </div>
    </section>
  );
};

export default HeroSection;
