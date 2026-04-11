import React, { useEffect } from 'react';

const ScrollProgress = () => {
  useEffect(() => {
    const scrollProgress = document.querySelector('.scroll-progress');

    if (!scrollProgress) return;

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;

      scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return <div className="scroll-progress"></div>;
};

export default ScrollProgress;
