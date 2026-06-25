import { useRef, useCallback, useEffect, useState } from 'react';
import gsap from 'gsap';

const MagneticButton = ({
  children,
  className = '',
  onClick,
  as: Tag = 'button',
  href,
  target,
  rel,
  ...rest
}) => {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const touch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(touch);
  }, []);

  const BOUNDARY = 60;
  const MAX_DISPLACEMENT = 8;

  const handleMouseMove = useCallback(
    (e) => {
      if (isTouchDevice || !wrapperRef.current || !contentRef.current) return;

      const rect = wrapperRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);
      const maxRadius = Math.max(rect.width, rect.height) / 2 + BOUNDARY;

      if (distance < maxRadius) {
        const strength = 1 - distance / maxRadius;
        const moveX = (distX / maxRadius) * MAX_DISPLACEMENT * strength;
        const moveY = (distY / maxRadius) * MAX_DISPLACEMENT * strength;

        gsap.to(contentRef.current, {
          x: moveX,
          y: moveY,
          duration: 0.3,
          ease: 'power3.out',
          overwrite: true,
        });
      }
    },
    [isTouchDevice]
  );

  const handleMouseLeave = useCallback(() => {
    if (isTouchDevice || !contentRef.current) return;

    gsap.to(contentRef.current, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.3)',
      overwrite: true,
    });
  }, [isTouchDevice]);

  const tagProps = Tag === 'a' ? { href, target, rel } : {};

  return (
    <div
      ref={wrapperRef}
      className={`hover-target ${className}`}
      style={{ display: 'inline-block' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={contentRef}>
        <Tag onClick={onClick} {...tagProps} {...rest}>
          {children}
        </Tag>
      </div>
    </div>
  );
};

export default MagneticButton;
