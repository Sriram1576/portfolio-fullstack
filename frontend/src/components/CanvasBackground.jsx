import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

const GlassKnot = () => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Smoothly rotate the object over time
    meshRef.current.rotation.x += delta * 0.15;
    meshRef.current.rotation.y += delta * 0.2;

    // Parallax effect responsive to mouse position
    const targetX = (state.pointer.x * Math.PI) / 4;
    const targetY = (state.pointer.y * Math.PI) / 4;
    
    // Lerp towards the target rotation for smoothness
    meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.05;
    meshRef.current.rotation.x += (-targetY - meshRef.current.rotation.x) * 0.05;
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <torusKnotGeometry args={[1.5, 0.4, 128, 32]} />
        <meshPhysicalMaterial
          metalness={0.1}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.05}
          color="#a855f7"
          emissive="#7c3aed"
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
};

const BackgroundParticles = ({ count = 60 }) => {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 30;
      const z = (Math.random() - 0.5) * 30 - 5;
      const scale = Math.random() * 0.05 + 0.01;
      const speed = Math.random() * 0.2 + 0.1;
      const offset = Math.random() * Math.PI * 2;
      temp.push({ x, y, z, scale, speed, offset });
    }
    return temp;
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();
    
    particles.forEach((particle, i) => {
      const { x, y, z, scale, speed, offset } = particle;
      // Gentle floating motion
      dummy.position.set(
        x + Math.sin(time * speed + offset) * 0.5,
        y + Math.cos(time * speed + offset) * 0.5,
        z
      );
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#c084fc" transparent opacity={0.3} />
    </instancedMesh>
  );
};

export default function CanvasBackground() {
  return (
    <div 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: -1, 
        background: 'radial-gradient(ellipse at 20% 50%, #1a0533 0%, #0a0015 40%, #050010 100%)', 
        overflow: 'hidden',
        pointerEvents: 'none' // Ensures it doesn't block clicks
      }}
    >
      {/* 
        pointerEvents: 'auto' is needed on Canvas to receive mouse events 
        even though parent has none. 
      */}
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }} 
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        style={{ pointerEvents: 'auto' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 10]} intensity={1.5} />
          <spotLight position={[-10, -10, -10]} intensity={2} color="#a855f7" />
          <spotLight position={[10, -10, 10]} intensity={2} color="#ec4899" />
          
          <GlassKnot />
          <BackgroundParticles count={60} />
          <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />
        </Suspense>
      </Canvas>
    </div>
  );
}
