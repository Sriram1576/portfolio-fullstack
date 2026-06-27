import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 1. HOVER EFFECTS
export const createHoverEffect = (element, scale = 1.05, duration = 0.3) => {
  const tl = gsap.timeline({ paused: true });
  
  tl.to(element, {
    scale,
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    duration,
    ease: 'power2.out'
  }, 0);
  
  return {
    enter: () => tl.play(),
    leave: () => tl.reverse()
  };
};

// 2. SMOOTH LOADER (Entrance animation)
export const createSmoothLoaderAnimation = (loaderElement, duration = 1.5) => {
  const tl = gsap.timeline();
  
  tl.fromTo(loaderElement, 
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out' }
  )
  .to(loaderElement, { opacity: 0, scale: 0.8, duration: 0.4, ease: 'back.in' }, duration - 0.4);
  
  return tl;
};

// 3. 3D MOTION EFFECTS (Rotation, perspective)
export const create3DMotionEffect = (element, config = {}) => {
  const {
    rotationX = 5,
    rotationY = 5,
    intensity = 1
  } = config;
  
  return {
    onMouseMove: (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const mouseX = e.clientX - rect.left - centerX;
      const mouseY = e.clientY - rect.top - centerY;
      
      const rotX = (mouseY / centerY) * rotationX * intensity;
      const rotY = -(mouseX / centerX) * rotationY * intensity;
      
      gsap.to(element, {
        rotationX: rotX,
        rotationY: rotY,
        duration: 0.6,
        ease: 'power2.out'
      });
    },
    onMouseLeave: () => {
      gsap.to(element, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.6,
        ease: 'power2.out'
      });
    }
  };
};

// 4. ENTRANCE REVEAL ANIMATIONS
export const createEntranceReveal = (element, config = {}) => {
  const {
    direction = 'bottom', // 'top', 'bottom', 'left', 'right'
    duration = 0.8,
    delay = 0,
    stagger = 0.1
  } = config;
  
  const fromValues = {
    top: { y: -50, opacity: 0 },
    bottom: { y: 50, opacity: 0 },
    left: { x: -50, opacity: 0 },
    right: { x: 50, opacity: 0 }
  };
  
  const from = fromValues[direction] || fromValues.bottom;
  
  gsap.fromTo(element,
    from,
    {
      y: 0,
      x: 0,
      opacity: 1,
      duration,
      delay,
      ease: 'power3.out',
      stagger: typeof element.length !== 'undefined' ? stagger : 0
    }
  );
};

// 5. MICRO INTERACTIONS (Scale, glow, shadow)
export const createMicroInteraction = (element, type = 'glow') => {
  const tl = gsap.timeline({ paused: true });
  
  const interactions = {
    glow: () => {
      tl.to(element, {
        boxShadow: '0 0 20px rgba(255, 107, 53, 0.6)',
        duration: 0.3,
        ease: 'power2.inOut'
      }, 0);
    },
    scale: () => {
      tl.to(element, {
        scale: 1.08,
        duration: 0.3,
        ease: 'back.out'
      }, 0);
    },
    shadow: () => {
      tl.to(element, {
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
        duration: 0.3,
        ease: 'power2.out'
      }, 0);
    }
  };
  
  interactions[type]?.();
  
  return {
    play: () => tl.play(),
    reverse: () => tl.reverse()
  };
};

// 6. PARALLAX SCROLLING EFFECTS
export const createParallaxEffect = (element, speed = 0.5) => {
  gsap.to(element, {
    y: (index) => index * 100 * (1 - speed),
    scrollTrigger: {
      trigger: element,
      start: 'top center',
      end: 'bottom center',
      scrub: 1,
      markers: false
    },
    ease: 'none'
  });
};

// Parallax scroll effect for sections
export const createParallaxScroll = (element, speed = 0.5) => {
  gsap.to(element, {
    y: (index) => index * speed * 200,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.2,
      invalidateOnRefresh: true
    }
  });
};

// 7. CUSTOM CURSOR EFFECTS
export const createCursorEffect = (element, config = {}) => {
  const { speed = 0.2, distance = 50 } = config;
  
  return {
    onMouseMove: (e) => {
      const x = e.clientX;
      const y = e.clientY;
      
      gsap.to(element, {
        x: x - distance,
        y: y - distance,
        duration: speed,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }
  };
};

// 8. COMBINED SMOOTH TRANSITIONS
export const createSmoothTransition = (fromElement, toElement, duration = 0.6) => {
  const tl = gsap.timeline();
  
  tl.to(fromElement, {
    opacity: 0,
    y: -20,
    duration: duration / 2,
    ease: 'power2.inOut'
  }, 0)
  .fromTo(toElement,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: duration / 2, ease: 'power2.inOut' },
    duration / 2
  );
  
  return tl;
};

// TEXT REVEAL ANIMATION
export const createTextReveal = (textElement, duration = 1) => {
  const chars = textElement.textContent.split('');
  textElement.innerHTML = chars.map(char => `<span class="char">${char}</span>`).join('');
  
  gsap.fromTo('.char',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.05, stagger: 0.05, ease: 'power2.out' }
  );
};

// STAGGER ANIMATION FOR MULTIPLE ELEMENTS
export const createStaggerAnimation = (elements, config = {}) => {
  const {
    from = { opacity: 0, y: 20 },
    to = { opacity: 1, y: 0 },
    duration = 0.6,
    stagger = 0.1,
    ease = 'power2.out'
  } = config;
  
  gsap.fromTo(elements, from, {
    ...to,
    duration,
    stagger,
    ease
  });
};

// SCROLL REVEAL ANIMATION
export const createScrollReveal = (element, config = {}) => {
  const {
    from = { opacity: 0, y: 50 },
    to = { opacity: 1, y: 0 },
    duration = 0.8,
    ease = 'power2.out',
    stagger = 0
  } = config;
  
  gsap.fromTo(element,
    from,
    {
      ...to,
      duration,
      ease,
      stagger,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'top 20%',
        scrub: false,
        markers: false
      }
    }
  );
};

// BATCH ANIMATION
export const createBatchAnimation = (elements, animation) => {
  elements.forEach((element, index) => {
    setTimeout(() => {
      animation(element);
    }, index * 100);
  });
};

// ELASTIC ANIMATION
export const createElasticAnimation = (element, targetValue = 1.1, duration = 0.6) => {
  gsap.to(element, {
    scale: targetValue,
    duration,
    ease: 'elastic.out(1, 0.5)',
    overwrite: 'auto'
  });
};

// BOUNCE ANIMATION
export const createBounceAnimation = (element, height = 20, duration = 0.8) => {
  gsap.to(element, {
    y: -height,
    duration: duration / 2,
    ease: 'power2.out',
    yoyo: true,
    repeat: 1
  });
};

// PULSE ANIMATION
export const createPulseAnimation = (element, scale = 1.05, duration = 0.6) => {
  gsap.to(element, {
    scale,
    opacity: 0.8,
    duration: duration / 2,
    ease: 'power2.inOut',
    yoyo: true,
    repeat: -1
  });
};

// FLOAT ANIMATION
export const createFloatAnimation = (element, distance = 10, duration = 3) => {
  gsap.to(element, {
    y: -distance,
    duration,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1
  });
};
