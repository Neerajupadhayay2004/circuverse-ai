import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  Float,
  Text3D,
  Center,
  MeshTransmissionMaterial
} from '@react-three/drei';
import * as THREE from 'three';

// Morphing waste to product visualization
function MorphingObject({ phase }: { phase: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const geometry = useMemo(() => {
    if (phase < 2) {
      // Waste - irregular shape
      return new THREE.DodecahedronGeometry(1.5, 0);
    } else if (phase === 2) {
      // Processing - sphere
      return new THREE.SphereGeometry(1.5, 32, 32);
    } else {
      // Product - cube (building block)
      return new THREE.BoxGeometry(2, 2, 2);
    }
  }, [phase]);

  const color = useMemo(() => {
    if (phase < 2) return '#8b4513';
    if (phase === 2) return '#00d4ff';
    return '#00d4aa';
  }, [phase]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      
      // Pulse effect during transformation
      if (phase === 2) {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 5) * 0.1;
        meshRef.current.scale.setScalar(scale);
      }
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color={color}
          metalness={phase >= 2 ? 0.8 : 0.2}
          roughness={phase >= 2 ? 0.2 : 0.8}
          emissive={color}
          emissiveIntensity={phase === 2 ? 0.5 : 0.2}
        />
      </mesh>
    </Float>
  );
}

// Particle stream effect
function ParticleStream({ phase }: { phase: number }) {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 500;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2 * 10;
      const radius = 2 + (i / count) * 3;
      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = (i / count - 0.5) * 10;
      pos[i * 3 + 2] = Math.sin(theta) * radius;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current && phase >= 1) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const offset = state.clock.elapsedTime * 2 + i * 0.01;
        const theta = (i / count) * Math.PI * 2 * 10 + offset;
        const radius = 2 + Math.sin(offset + i * 0.1) * 0.5;
        positions[i * 3] = Math.cos(theta) * radius;
        positions[i * 3 + 2] = Math.sin(theta) * radius;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const color = phase < 2 ? '#ff6644' : phase === 2 ? '#00d4ff' : '#00d4aa';

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color={color}
        transparent
        opacity={phase >= 1 ? 0.8 : 0.3}
        sizeAttenuation
      />
    </points>
  );
}

// Energy rings
function EnergyRings({ phase }: { phase: number }) {
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      ringsRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });

  if (phase < 2) return null;

  return (
    <group ref={ringsRef}>
      {[1, 2, 3].map((i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2 + i * 0.5, 0.02, 16, 100]} />
          <meshBasicMaterial 
            color={i === 1 ? '#00d4ff' : i === 2 ? '#00d4aa' : '#9966ff'}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

function TransformContent({ phase }: { phase: number }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00d4ff" />
      
      <MorphingObject phase={phase} />
      <ParticleStream phase={phase} />
      <EnergyRings phase={phase} />

      {/* Background glow */}
      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial 
          color={phase >= 3 ? '#002211' : '#110505'}
          transparent
          opacity={0.5}
        />
      </mesh>
    </>
  );
}

interface TransformAnimationProps {
  phase: number;
  className?: string;
}

export default function TransformAnimation({ phase, className = '' }: TransformAnimationProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={60} />
        <TransformContent phase={phase} />
      </Canvas>
    </div>
  );
}
