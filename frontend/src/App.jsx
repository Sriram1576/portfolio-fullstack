import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import CanvasBackground from './components/CanvasBackground';
import SmoothScrollWrapper from './components/SmoothScrollWrapper';
import Navbar from './components/Navbar';
import HeroSection from './pages/HeroSection';
import StatsSection from './pages/StatsSection';
import ProjectsSection from './pages/ProjectsSection';
import SkillsSection from './pages/SkillsSection';
import ExperienceSection from './pages/ExperienceSection';
import ContactSection from './pages/ContactSection';
import Footer from './components/Footer';
import projects from './data/projects';
import skills from './data/skills';
import experience from './data/experience';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Parallax on glass-panel elements based on data-speed
      document.querySelectorAll('.glass-panel[data-speed]').forEach((el) => {
        const speed = parseFloat(el.dataset.speed) || 1;
        gsap.to(el, {
          yPercent: (1 - speed) * 50,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      });

      // Section headings move slightly slower than scroll
      gsap.utils.toArray('h2, .section-head-animate').forEach((heading) => {
        gsap.to(heading, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: heading,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      });

      // Depth-shift: elements with data-speed get parallax based on speed value
      document.querySelectorAll('[data-speed]').forEach((el) => {
        const speed = parseFloat(el.dataset.speed) || 1;
        gsap.to(el, {
          yPercent: (1 - speed) * 30,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      });
    });

    return () => ctx.revert();
  }, [loading]);

  return (
    <div className="app-shell relative min-h-screen bg-black">
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <SmoothScrollWrapper>
          <CanvasBackground />
          <CustomCursor />
          <Navbar />
          
          <main className="relative z-10 w-full overflow-hidden">
            <HeroSection />
            <StatsSection />
            <ProjectsSection projects={projects} />
            <SkillsSection skills={skills} />
            <ExperienceSection experiences={experience} />
            <ContactSection />
          </main>
          
          <Footer />
        </SmoothScrollWrapper>
      )}
    </div>
  );
}

export default App;
