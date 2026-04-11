import React, { useEffect } from 'react';
import gsap from 'gsap';

const Cursor = () => {
  useEffect(() => {
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    if (isTouchDevice) return undefined;

    let mouseX = 0;
    let mouseY = 0;
    const trail = [];

    if (!cursor || !cursorDot) return undefined;

    const mouseMoveHandler = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.18,
        ease: 'power3.out'
      });

      gsap.to(cursorDot, {
        x: mouseX,
        y: mouseY,
        duration: 0.08,
        ease: 'power2.out'
      });

      const trailElement = document.createElement('div');
      trailElement.className = 'cursor-trail';
      trailElement.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      document.body.appendChild(trailElement);

      trail.push(trailElement);

      gsap.to(trailElement, {
        opacity: 1,
        duration: 0.1
      });

      gsap.to(trailElement, {
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        onComplete: () => trailElement.remove()
      });

      if (trail.length > 50) {
        trail[0].remove();
        trail.shift();
      }
    };

    document.addEventListener('mousemove', mouseMoveHandler);

    const hoverTargets = document.querySelectorAll('.hover-target');
    const onEnter = () => cursor.classList.add('hover');
    const onLeave = () => cursor.classList.remove('hover');

    hoverTargets.forEach(target => {
      target.addEventListener('mouseenter', onEnter);
      target.addEventListener('mouseleave', onLeave);
    });

    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      hoverTargets.forEach(target => {
        target.removeEventListener('mouseenter', onEnter);
        target.removeEventListener('mouseleave', onLeave);
      });
      trail.forEach(item => item.remove());
    };
  }, []);

  return (
    <>
      <div className="cursor"></div>
      <div className="cursor-dot"></div>
    </>
  );
};

export default Cursor;
