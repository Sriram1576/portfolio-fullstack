import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import experience from '../data/experience';

const ExperienceSection = () => {
  const experiences = [...experience].sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));

  useEffect(() => {
    if (!experiences.length) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray('.exp-card');
    gsap.set(cards, { y: 64, opacity: 0, scale: 0.96, filter: 'blur(7px)' });

    const triggers = cards.map((card) => gsap.to(card, {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.95,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 82%',
        end: 'top 62%',
        scrub: 0.7
      }
    }));

    const parallaxTriggers = cards.map((card) => gsap.to(card, {
      yPercent: -4,
      ease: 'none',
      scrollTrigger: {
        trigger: card,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.9
      }
    }));

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((tween) => tween.kill());
      parallaxTriggers.forEach((tween) => tween.kill());
      ScrollTrigger.getAll()
        .filter((t) => cards.includes(t.trigger))
        .forEach((t) => t.kill());
    };
  }, [experiences]);

  return (
    <section id="experience" className="section-block depth-shift" data-depth="8">
      <div className="container">
        <div className="section-head">
          <p>Experience</p>
          <h2>Growth through real-world projects and focused learning.</h2>
          <span>I have worked across full-stack engineering, analytics, and workflow automation.</span>
        </div>

        <div className="timeline-wrap exp-timeline">
          {experiences.map((exp) => (
            <article key={exp.id || exp.title} className="timeline-entry exp-card">
              <h3>{exp.title}</h3>
              <h4>{exp.company}</h4>
              <p>{exp.description}</p>
              <div className="exp-tags">
                {(exp.technologies || []).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
