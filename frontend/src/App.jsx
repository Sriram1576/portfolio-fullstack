import React, { useEffect, useState } from 'react';
import './index.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import ParallaxBackground from './components/ParallaxBackground';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import HeroSection from './pages/HeroSection';
import StatsSection from './pages/StatsSection';
import ProjectsSection from './pages/ProjectsSection';
import SkillsSection from './pages/SkillsSection';
import ExperienceSection from './pages/ExperienceSection';
import ContactSection from './pages/ContactSection';
import Footer from './components/Footer';
import { contentAPI } from './services/api';

function App() {
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(true);
  const [homeContent, setHomeContent] = useState({
    projects: [],
    skills: [],
    experience: []
  });

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2600);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let alive = true;

    const fetchHomeContent = async () => {
      const requestStart = performance.now();

      try {
        setContentLoading(true);
        const response = await contentAPI.getHome();
        const data = response.data?.data || {};

        if (alive) {
          setHomeContent({
            projects: data.projects || [],
            skills: data.skills || [],
            experience: data.experience || []
          });
        }

        if (process.env.NODE_ENV !== 'production') {
          const durationMs = Number((performance.now() - requestStart).toFixed(2));
          // Request timing helps compare latency before/after optimization.
          console.info('[home-content] load ms:', durationMs, 'cache:', response.data?.meta?.cache);
        }
      } catch (error) {
        if (alive) {
          setHomeContent({
            projects: [],
            skills: [],
            experience: []
          });
        }
      } finally {
        if (alive) {
          setContentLoading(false);
        }
      }
    };

    fetchHomeContent();

    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (loading) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal-block').forEach((item) => {
        gsap.fromTo(
          item,
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 84%'
            }
          }
        );
      });

      gsap.utils.toArray('.depth-shift').forEach((item) => {
        const depth = Number(item.dataset.depth || 8);
        gsap.to(item, {
          yPercent: -Math.min(depth, 6),
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2
          }
        });
      });

      gsap.to('.hero-copy h1', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2
        }
      });

      gsap.to('.hero-copy p', {
        yPercent: -5,
        opacity: 0.9,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2
        }
      });

      gsap.to('.hero-card', {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.1
        }
      });

      gsap.to('.top-nav-wrap', {
        backgroundColor: 'rgba(2, 7, 16, 0.9)',
        borderBottomColor: 'rgba(104, 182, 255, 0.34)',
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: '+=420',
          scrub: 1
        }
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [loading]);

  return (
    <div className="app-shell">
      {loading && <Loader />}
      <ParallaxBackground />
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main className="experience-main">
        <HeroSection />
        <StatsSection />
        <ProjectsSection projects={homeContent.projects} loading={contentLoading} />
        <SkillsSection skills={homeContent.skills} loading={contentLoading} />
        <ExperienceSection experiences={homeContent.experience} loading={contentLoading} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
