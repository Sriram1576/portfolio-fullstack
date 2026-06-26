import React, { useRef, useMemo, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// High-Tech Wireframe Grid Terrain
const TechGrid = () => {
  const gridRef = useRef();

  useFrame((state, delta) => {
    if (gridRef.current) {
      // Endless scrolling effect
      gridRef.current.position.z = (state.clock.elapsedTime * 2) % 2;
    }
  });

  return (
    <group rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -2, -10]}>
      {/* Primary Grid */}
      <mesh ref={gridRef}>
        <planeGeometry args={[100, 100, 40, 40]} />
        <meshBasicMaterial 
          color="#22c55e" 
          wireframe={true} 
          transparent={true} 
          opacity={0.15} 
        />
      </mesh>
      
      {/* Fade out grid in distance */}
      <mesh position={[0, 0, 0.1]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial 
          color="#0f172a" 
          transparent={true} 
          opacity={0.8}
        />
      </mesh>
    </group>
  );
};

// Subtle floating data particles that react to mouse
const DataParticles = ({ mousePos }) => {
  const particlesRef = useRef();

  useFrame((state, delta) => {
    if (particlesRef.current) {
      // Basic rotation
      particlesRef.current.rotation.y -= delta * 0.05;
      particlesRef.current.rotation.x += delta * 0.02;
      
      // Mouse interaction (parallax)
      const targetX = mousePos.current.x * 0.5;
      const targetY = mousePos.current.y * 0.5;
      particlesRef.current.position.x += (targetX - particlesRef.current.position.x) * 0.05;
      particlesRef.current.position.y += (targetY - particlesRef.current.position.y) * 0.05;
    }
  });

  // Generate random particles
  const particlesCount = 1000;
  const positions = useMemo(() => {
    const arr = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 30;
    }
    return arr;
  }, []);

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        color="#22c55e" 
        transparent={true} 
        opacity={0.4} 
        sizeAttenuation={true} 
      />
    </points>
  );
};

export default function CanvasBackground() {
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        // 60% base color (Deep Indigo)
        background: '#0f172a',
        overflow: 'hidden',
        pointerEvents: 'none'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <fog attach="fog" args={['#0f172a', 5, 20]} />
        <TechGrid />
        <DataParticles mousePos={mousePos} />
      </Canvas>
    </div>
  );
}
