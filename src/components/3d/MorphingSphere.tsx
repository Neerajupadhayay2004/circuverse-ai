import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

function CoreSphere({ phase }: { phase: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const isClean = phase >= 3;
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshDistortMaterial
          color={isClean ? "#00d4aa" : "#886644"}
          attach="material"
          distort={isClean ? 0.4 : 0.6}
          speed={isClean ? 3 : 1.5}
          roughness={isClean ? 0.2 : 0.6}
          metalness={isClean ? 0.8 : 0.3}
          emissive={isClean ? "#00ff88" : "#664422"}
          emissiveIntensity={isClean ? 0.5 : 0.2}
        />
      </mesh>
    </Float>
  );
}

function ParticleHalo({ phase }: { phase: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const isClean = phase >= 3;
  
  const particles = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 2.2 + Math.random() * 0.5;
      
      return {
        position: [
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        ] as [number, number, number],
        size: 0.03 + Math.random() * 0.04,
        speed: 0.5 + Math.random() * 0.5
      };
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <Float key={i} speed={p.speed} floatIntensity={0.3}>
          <mesh position={p.position}>
            <sphereGeometry args={[p.size, 8, 8]} />
            <meshStandardMaterial
              color={isClean ? "#00ff88" : "#aa6644"}
              emissive={isClean ? "#00ffaa" : "#884422"}
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

function OrbitalRings({ phase }: { phase: number }) {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);
  const isClean = phase >= 3;
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1.current) {
      ring1.current.rotation.x = Math.PI / 3 + t * 0.2;
      ring1.current.rotation.z = t * 0.1;
    }
    if (ring2.current) {
      ring2.current.rotation.x = -Math.PI / 4 + t * 0.15;
      ring2.current.rotation.y = t * 0.12;
    }
    if (ring3.current) {
      ring3.current.rotation.y = Math.PI / 6 + t * 0.18;
      ring3.current.rotation.z = t * 0.08;
    }
  });

  const ringColor = isClean ? '#00d4ff' : '#996644';

  return (
    <group>
      <mesh ref={ring1}>
        <torusGeometry args={[2.8, 0.02, 8, 100]} />
        <meshStandardMaterial
          color={ringColor}
          emissive={ringColor}
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[3.2, 0.015, 8, 100]} />
        <meshStandardMaterial
          color={ringColor}
          emissive={ringColor}
          emissiveIntensity={0.4}
          transparent
          opacity={0.5}
        />
      </mesh>
      <mesh ref={ring3}>
        <torusGeometry args={[3.6, 0.01, 8, 100]} />
        <meshStandardMaterial
          color={ringColor}
          emissive={ringColor}
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}

function Scene({ phase }: { phase: number }) {
  const isClean = phase >= 3;
  
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={1.5} color={isClean ? "#00ffaa" : "#ffaa66"} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#0088ff" />
      <pointLight position={[-5, -5, 5]} intensity={0.6} color="#ff0088" />
      
      <CoreSphere phase={phase} />
      <ParticleHalo phase={phase} />
      <OrbitalRings phase={phase} />
      
      <Stars radius={30} depth={30} count={1500} factor={2} fade speed={0.5} />
      <Sparkles 
        count={150} 
        scale={8} 
        size={1.5} 
        speed={0.4} 
        color={isClean ? "#00ff88" : "#ffaa44"} 
      />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate 
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export default function MorphingSphere({ phase = 0 }: { phase?: number }) {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
      <Scene phase={phase} />
    </Canvas>
  );
}
