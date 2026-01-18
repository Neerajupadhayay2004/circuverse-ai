import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles, Stars, Float, Trail } from '@react-three/drei';
import * as THREE from 'three';

function GalaxyCore({ phase }: { phase: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
    if (coreRef.current) {
      coreRef.current.rotation.z = state.clock.elapsedTime * 0.5;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      coreRef.current.scale.setScalar(scale);
    }
  });

  const isTransformed = phase >= 3;

  return (
    <group ref={groupRef}>
      {/* Central Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.8, 2]} />
        <meshStandardMaterial
          color={isTransformed ? "#00d4aa" : "#ff6644"}
          emissive={isTransformed ? "#00ff88" : "#ff4422"}
          emissiveIntensity={0.8}
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Inner Glow */}
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color={isTransformed ? "#00ffaa" : "#ff8866"}
          emissive={isTransformed ? "#00ffcc" : "#ff6644"}
          emissiveIntensity={1.2}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

function SpiralArms({ phase }: { phase: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const armParticles = useMemo(() => {
    const particles: { pos: [number, number, number]; color: string; size: number }[] = [];
    const arms = 3;
    const particlesPerArm = 150;
    
    for (let arm = 0; arm < arms; arm++) {
      const armOffset = (arm / arms) * Math.PI * 2;
      
      for (let i = 0; i < particlesPerArm; i++) {
        const t = i / particlesPerArm;
        const angle = armOffset + t * Math.PI * 4;
        const radius = 1 + t * 4;
        const spread = 0.3 + t * 0.5;
        
        const x = Math.cos(angle) * radius + (Math.random() - 0.5) * spread;
        const y = (Math.random() - 0.5) * spread * 0.5;
        const z = Math.sin(angle) * radius + (Math.random() - 0.5) * spread;
        
        particles.push({
          pos: [x, y, z],
          color: phase >= 3 ? (Math.random() > 0.5 ? '#00ff88' : '#00d4ff') : (Math.random() > 0.5 ? '#ff6644' : '#ff8844'),
          size: 0.03 + Math.random() * 0.04
        });
      }
    }
    return particles;
  }, [phase]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {armParticles.map((particle, i) => (
        <Float key={i} speed={1 + Math.random()} floatIntensity={0.2}>
          <mesh position={particle.pos}>
            <sphereGeometry args={[particle.size, 8, 8]} />
            <meshStandardMaterial
              color={particle.color}
              emissive={particle.color}
              emissiveIntensity={0.6}
              transparent
              opacity={0.8}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function OrbitingPlanets({ phase }: { phase: number }) {
  const planets = useMemo(() => [
    { radius: 2.5, speed: 0.8, size: 0.15, color: phase >= 3 ? '#00ff88' : '#ff6644' },
    { radius: 3.5, speed: 0.5, size: 0.2, color: phase >= 3 ? '#00d4ff' : '#ff8844' },
    { radius: 4.5, speed: 0.3, size: 0.12, color: phase >= 3 ? '#00ffcc' : '#ffaa44' },
  ], [phase]);

  return (
    <group>
      {planets.map((planet, i) => (
        <OrbitingPlanet key={i} {...planet} offset={i * Math.PI * 0.66} />
      ))}
    </group>
  );
}

function OrbitingPlanet({ radius, speed, size, color, offset }: { radius: number; speed: number; size: number; color: string; offset: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * speed + offset;
      meshRef.current.position.x = Math.cos(t) * radius;
      meshRef.current.position.z = Math.sin(t) * radius;
      meshRef.current.position.y = Math.sin(t * 2) * 0.3;
    }
  });

  return (
    <Trail width={0.3} length={6} color={color} attenuation={(w) => w}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
        />
      </mesh>
    </Trail>
  );
}

function EnergyRings({ phase }: { phase: number }) {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.3;
      ring1Ref.current.rotation.z = t * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.25;
      ring2Ref.current.rotation.y = t * 0.35;
    }
  });

  const ringColor = phase >= 3 ? '#00d4aa' : '#ff6644';

  return (
    <group>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2, 0.02, 8, 64]} />
        <meshStandardMaterial
          color={ringColor}
          emissive={ringColor}
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.5, 0.015, 8, 64]} />
        <meshStandardMaterial
          color={ringColor}
          emissive={ringColor}
          emissiveIntensity={0.4}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}

function Scene({ phase }: { phase: number }) {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 0]} intensity={2} color={phase >= 3 ? "#00ffaa" : "#ff8866"} distance={10} />
      <pointLight position={[5, 3, 5]} intensity={0.5} color="#0066ff" />
      <pointLight position={[-5, -3, -5]} intensity={0.5} color="#ff00ff" />
      
      <GalaxyCore phase={phase} />
      <SpiralArms phase={phase} />
      <OrbitingPlanets phase={phase} />
      <EnergyRings phase={phase} />
      
      <Stars radius={50} depth={50} count={2000} factor={3} fade speed={1} />
      <Sparkles 
        count={200} 
        scale={12} 
        size={2} 
        speed={0.5} 
        color={phase >= 3 ? "#00ff88" : "#ff8844"} 
      />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate 
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
}

export default function GalaxyTransformScene({ phase = 0 }: { phase?: number }) {
  return (
    <Canvas camera={{ position: [0, 3, 8], fov: 50 }}>
      <Scene phase={phase} />
    </Canvas>
  );
}
