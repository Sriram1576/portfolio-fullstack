# Quick Reference - Premium Portfolio Components

## 🚀 Quick Start

### Install & Run
```bash
cd frontend
npm install  # Only if needed
npm start    # Development server
npm run build # Production build
```

## 📦 Components Quick Reference

### 1. **SmoothLoader**
```jsx
import SmoothLoader from './components/SmoothLoader';

<SmoothLoader onComplete={() => setLoading(false)} />
```
**Features:** Gradient spinner, progress bar, auto-complete
**Props:** `onComplete` (callback)

### 2. **ThreeDBackground**
```jsx
import ThreeDBackground from './components/ThreeDBackground';

<ThreeDBackground />
```
**Features:** Particle system, 3D shapes, mouse tracking
**Props:** None (full-screen background)

### 3. **EnhancedCustomCursor**
```jsx
import EnhancedCustomCursor from './components/EnhancedCustomCursor';

<EnhancedCustomCursor />
```
**Features:** Dual-layer tracking, hover effects, global
**Props:** None (global cursor)

### 4. **PremiumHeroSection**
```jsx
import PremiumHeroSection from './components/PremiumHeroSection';

<PremiumHeroSection />
```
**Features:** Hero with 3D, animations, stat cards
**Props:** None (uses defaults)

### 5. **AnimatedCard**
```jsx
import AnimatedCard from './components/AnimatedCard';

<AnimatedCard delay={0.2} hover3D={true} glowEffect={true}>
  <div>Card Content</div>
</AnimatedCard>
```
**Props:**
- `delay` (number) - Animation delay in seconds
- `hover3D` (boolean) - Enable 3D hover effect
- `glowEffect` (boolean) - Enable glow effect
- `className` (string) - Additional CSS classes

### 6. **ParallaxSection**
```jsx
import ParallaxSection from './components/ParallaxSection';

<ParallaxSection speed={0.5} id="section-id">
  <div>Content</div>
</ParallaxSection>
```
**Props:**
- `speed` (number) - Parallax speed (0-1)
- `id` (string) - Section ID
- `className` (string) - Additional classes

## 🎨 Animation Utilities

### Import
```jsx
import {
  createHoverEffect,
  create3DMotionEffect,
  createEntranceReveal,
  createMicroInteraction,
  createParallaxEffect,
  createScrollReveal,
  createBounceAnimation,
  createFloatAnimation,
  createPulseAnimation,
  // ... more utilities
} from './utils/animationUtils';
```

### Usage Examples

#### Hover Effect
```jsx
const ref = useRef(null);

useEffect(() => {
  const hover = createHoverEffect(ref.current, 1.05, 0.3);
  ref.current.addEventListener('mouseenter', hover.enter);
  ref.current.addEventListener('mouseleave', hover.leave);
}, []);

return <div ref={ref}>Hover me!</div>;
```

#### 3D Motion
```jsx
const ref = useRef(null);

useEffect(() => {
  const effect3D = create3DMotionEffect(ref.current, {
    rotationX: 8,
    rotationY: 8,
    intensity: 0.8
  });
  
  ref.current.addEventListener('mousemove', effect3D.onMouseMove);
  ref.current.addEventListener('mouseleave', effect3D.onMouseLeave);
}, []);
```

#### Entrance Reveal
```jsx
const ref = useRef(null);

useEffect(() => {
  createEntranceReveal(ref.current, {
    direction: 'bottom',
    duration: 0.8,
    delay: 0.2
  });
}, []);
```

#### Scroll Reveal
```jsx
const ref = useRef(null);

useEffect(() => {
  createScrollReveal(ref.current, {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0 },
    duration: 0.8
  });
}, []);
```

#### Micro Interaction
```jsx
const ref = useRef(null);

useEffect(() => {
  const glow = createMicroInteraction(ref.current, 'glow');
  
  ref.current.addEventListener('mouseenter', glow.play);
  ref.current.addEventListener('mouseleave', glow.reverse);
}, []);
```

#### Bounce Animation
```jsx
const ref = useRef(null);

useEffect(() => {
  createBounceAnimation(ref.current, 20, 0.8);
}, []);
```

#### Float Animation
```jsx
const ref = useRef(null);

useEffect(() => {
  createFloatAnimation(ref.current, 15, 3);
}, []);
```

#### Pulse Animation
```jsx
const ref = useRef(null);

useEffect(() => {
  createPulseAnimation(ref.current, 1.05, 0.6);
}, []);
```

## 🎯 CSS Classes

### Animation Classes
```jsx
// Entrance animations
<div className="reveal-up">Up reveal</div>
<div className="reveal-down">Down reveal</div>
<div className="reveal-left">Left reveal</div>
<div className="reveal-right">Right reveal</div>

// Hover effects
<div className="hover-scale">Scales on hover</div>
<div className="hover-lift">Lifts on hover</div>

// Micro interactions
<div className="glow-effect">Pulsing glow</div>
<div className="shadow-pop">Shadow animation</div>
<div className="scale-bounce">Bounce scale</div>

// Utilities
<div className="glass-panel">Glass panel</div>
<div className="floating-glass">Floating glass</div>
<div className="stagger-item">Stagger animation</div>
<div className="animate-blob">Blob animation</div>
<div className="animate-spin-slow">Slow spin</div>
```

## 🎨 Tailwind Classes

### Colors
```jsx
// Primary colors
bg-tech-base        // Dark navy background
bg-tech-surface     // Darker blue
text-tech-text      // Light text
bg-tech-accent      // Orange accent
bg-tech-accent2     // Blue accent
bg-tech-accent3     // Purple accent

// Usage
<button className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
  Button
</button>
```

### Glass Effects
```jsx
<div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
  Glass panel
</div>
```

### Custom Animations
```jsx
animate-blob         // Morphing blob
animate-spin-slow    // Slow rotation
animate-pulse-glow   // Glow pulse
```

## 🔧 Common Patterns

### Full Animation Sequence
```jsx
useEffect(() => {
  const tl = gsap.timeline();
  
  // Entrance
  tl.fromTo(headingRef.current, 
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8 }
  );
  
  // Content reveal
  tl.fromTo(contentRef.current,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6 },
    '-=0.4' // Overlap timing
  );
}, []);
```

### Staggered Elements
```jsx
gsap.fromTo(elementArray,
  { opacity: 0, y: 20 },
  {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
  }
);
```

### Scroll Trigger
```jsx
gsap.to(element, {
  y: 100,
  scrollTrigger: {
    trigger: element,
    start: 'top center',
    end: 'bottom center',
    scrub: 1,
    markers: false
  }
});
```

### Parallax Section
```jsx
<ParallaxSection speed={0.5}>
  <div>This content will have parallax</div>
</ParallaxSection>
```

## 📊 Performance Tips

1. **Use GPU-accelerated properties:**
   - `transform` (translate, scale, rotate)
   - `opacity`
   - Avoid `left`, `top`, `width`, `height`

2. **Cleanup animations:**
   ```jsx
   useEffect(() => {
     // Setup
     return () => {
       // Cleanup
       gsap.killTweensOf(ref.current);
     };
   }, []);
   ```

3. **Optimize animations on mobile:**
   ```jsx
   const isMobile = window.innerWidth < 768;
   <AnimatedCard hover3D={!isMobile} />
   ```

4. **Use requestAnimationFrame for updates:**
   ```jsx
   const animate = () => {
     requestAnimationFrame(animate);
     // Update logic
   };
   ```

## 🐛 Debugging

### Check if animation is applied
```jsx
// In browser console
gsap.getTweensOf(element)
ScrollTrigger.getAll()
```

### Disable animations temporarily
```jsx
gsap.globalTimeline.pause()
gsap.globalTimeline.resume()
```

### View animation timeline
```jsx
// React DevTools - Profiler
// GSAP Codepen - inspect animations
```

## 📚 Resources

- [GSAP Documentation](https://gsap.com/)
- [Three.js Documentation](https://threejs.org/)
- [Lenis Documentation](https://lenis.studiofreight.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Documentation](https://react.dev/)

## ✨ Example: Custom Component

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { createEntranceReveal, createMicroInteraction } from '../utils/animationUtils';

export default function MyComponent() {
  const titleRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    // Title animation
    createEntranceReveal(titleRef.current, {
      direction: 'bottom',
      duration: 0.8,
      delay: 0.2
    });

    // Card hover effect
    const glow = createMicroInteraction(cardRef.current, 'glow');
    cardRef.current.addEventListener('mouseenter', glow.play);
    cardRef.current.addEventListener('mouseleave', glow.reverse);
  }, []);

  return (
    <div>
      <h1 ref={titleRef} className="text-4xl font-bold">
        My Title
      </h1>
      <div
        ref={cardRef}
        className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 hover:border-white/40 transition-all"
      >
        Card content
      </div>
    </div>
  );
}
```

## 🎉 Ready to Animate!

You now have all the tools to create premium animations. Mix and match components and utilities to build amazing experiences!

**Happy animating! 🚀**
