import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Sparkles,
  Float,
  MeshDistortMaterial,
  Sphere,
  Trail,
  Stars
} from '@react-three/drei';
import * as THREE from 'three';

// DNA Helix representing circular economy loop
function CircularDNA({ phase }: { phase: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  const helixPoints = useMemo(() => {
    const points: { pos: [number, number, number]; color: string }[] = [];
    for (let i = 0; i < 60; i++) {
      const t = i / 60;
      const angle = t * Math.PI * 4;
      const y = (t - 0.5) * 6;
      points.push({
        pos: [Math.cos(angle) * 1.5, y, Math.sin(angle) * 1.5],
        color: phase >= 2 ? '#00ff88' : '#4488ff'
      });
      points.push({
        pos: [Math.cos(angle + Math.PI) * 1.5, y, Math.sin(angle + Math.PI) * 1.5],
        color: phase >= 2 ? '#00d4ff' : '#ff6688'
      });
    }
    return points;
  }, [phase]);

  return (
    <group ref={groupRef}>
      {helixPoints.map((point, i) => (
        <Float key={i} speed={1.5} floatIntensity={0.3}>
          <mesh position={point.pos}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial 
              color={point.color}
              emissive={point.color}
              emissiveIntensity={0.5}
            />
          </mesh>
        </Float>
      ))}
      {phase >= 2 && (
        <Sparkles count={200} scale={8} size={3} speed={0.8} color="#00ff88" />
      )}
    </group>
  );
}

// Morphing core sphere
function MorphingCore({ phase }: { phase: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1.2, 64, 64]}>
      <MeshDistortMaterial
        color={phase >= 2 ? "#00d4aa" : "#667788"}
        attach="material"
        distort={phase >= 2 ? 0.6 : 0.3}
        speed={phase >= 2 ? 3 : 1}
        roughness={0.2}
        metalness={0.8}
        emissive={phase >= 2 ? "#00ff88" : "#224488"}
        emissiveIntensity={0.4}
      />
    </Sphere>
  );
}

// Orbiting particles with trails
function OrbitingParticles({ phase }: { phase: number }) {
  const particles = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      offset: (i / 8) * Math.PI * 2,
      radius: 2.5 + Math.random() * 0.5,
      speed: 0.5 + Math.random() * 0.5
    }));
  }, []);

  return (
    <group>
      {particles.map((particle, i) => (
        <OrbitParticle key={i} {...particle} phase={phase} />
      ))}
    </group>
  );
}

function OrbitParticle({ offset, radius, speed, phase }: { offset: number; radius: number; speed: number; phase: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * speed + offset;
      meshRef.current.position.x = Math.cos(t) * radius;
      meshRef.current.position.z = Math.sin(t) * radius;
      meshRef.current.position.y = Math.sin(t * 2) * 0.5;
    }
  });

  return (
    <Trail
      width={0.5}
      length={8}
      color={phase >= 2 ? "#00ff88" : "#4488ff"}
      attenuation={(width) => width}
    >
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.12, 0]} />
        <meshStandardMaterial
          color={phase >= 2 ? "#00ff88" : "#4488ff"}
          emissive={phase >= 2 ? "#00ff88" : "#4488ff"}
          emissiveIntensity={0.8}
        />
      </mesh>
    </Trail>
  );
}

// Energy rings
function EnergyRings({ phase }: { phase: number }) {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.5;
      ring1Ref.current.rotation.y = t * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = t * 0.3;
      ring2Ref.current.rotation.z = t * 0.5;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = t * 0.4;
      ring3Ref.current.rotation.z = t * 0.2;
    }
  });

  const ringColor = phase >= 2 ? "#00d4ff" : "#ff6688";

  return (
    <group>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2, 0.02, 16, 100]} />
        <meshStandardMaterial color={ringColor} emissive={ringColor} emissiveIntensity={0.8} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.3, 0.015, 16, 100]} />
        <meshStandardMaterial color={ringColor} emissive={ringColor} emissiveIntensity={0.6} />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[2.6, 0.01, 16, 100]} />
        <meshStandardMaterial color={ringColor} emissive={ringColor} emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}

// Floating waste-to-product transformation
function TransformingElements({ phase }: { phase: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const elements = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      return {
        startPos: [Math.cos(angle) * 4, (Math.random() - 0.5) * 3, Math.sin(angle) * 4] as [number, number, number],
        endPos: [Math.cos(angle) * 1.5, 0, Math.sin(angle) * 1.5] as [number, number, number],
        delay: i * 0.1
      };
    });
  }, []);

  return (
    <group ref={groupRef}>
      {elements.map((el, i) => {
        const progress = phase >= 2 ? 1 : 0;
        const currentPos: [number, number, number] = [
          el.startPos[0] + (el.endPos[0] - el.startPos[0]) * progress,
          el.startPos[1] + (el.endPos[1] - el.startPos[1]) * progress,
          el.startPos[2] + (el.endPos[2] - el.startPos[2]) * progress
        ];
        
        return (
          <Float key={i} speed={2} floatIntensity={0.5}>
            <mesh position={currentPos}>
              <octahedronGeometry args={[0.15, 0]} />
              <meshStandardMaterial
                color={phase >= 3 ? "#00ff88" : phase >= 2 ? "#00d4ff" : "#ff4444"}
                emissive={phase >= 3 ? "#00ff88" : phase >= 2 ? "#00d4ff" : "#ff4444"}
                emissiveIntensity={0.5}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

interface AdvancedTransformSceneProps {
  phase: number;
}

export default function AdvancedTransformScene({ phase }: AdvancedTransformSceneProps) {
  return (
    <Canvas camera={{ position: [6, 4, 6], fov: 45 }}>
      <color attach="background" args={['#030308']} />
      <fog attach="fog" args={['#030308', 8, 25]} />
      
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00d4aa" />
      <pointLight position={[-10, -5, -10]} intensity={0.8} color="#00d4ff" />
      <spotLight position={[0, 10, 0]} intensity={1} color="#ffffff" angle={0.3} penumbra={1} />
      
      <MorphingCore phase={phase} />
      <EnergyRings phase={phase} />
      <OrbitingParticles phase={phase} />
      <TransformingElements phase={phase} />
      
      {phase >= 2 && <CircularDNA phase={phase} />}
      
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
}
