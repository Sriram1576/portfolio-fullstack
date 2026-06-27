import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import ProfileIDCard from './components/ProfileIDCard';
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
            scrub: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, [loading]);

  return (
    <div className="app-shell relative min-h-screen bg-tech-base text-tech-text">
      <CustomCursor />
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <div className="relative z-10 font-sans selection:bg-tech-secondary selection:text-tech-text">
          <Navbar />
          <ProfileIDCard />
          
          <main className="relative z-10 w-full overflow-hidden">
            <HeroSection />
            <StatsSection />
            <ProjectsSection projects={projects} />
            <SkillsSection skills={skills} />
            <ExperienceSection experiences={experience} />
            <ContactSection />
          </main>
          
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
