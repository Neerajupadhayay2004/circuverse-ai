import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment,
  Float,
  Sparkles,
  Cloud,
  Stars
} from '@react-three/drei';
import * as THREE from 'three';

// Polluted Building Component
function PollutedBuilding({ position, scale, delay }: { position: [number, number, number]; scale: number; delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [morphProgress, setMorphProgress] = useState(0);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1 + delay) * 0.05;
    }
  });

  const pollutedColor = new THREE.Color('#4a3728');
  const cleanColor = new THREE.Color('#00d4aa');
  const currentColor = pollutedColor.lerp(cleanColor, morphProgress);

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1 * scale, (2 + Math.random() * 3) * scale, 1 * scale]} />
      <meshStandardMaterial 
        color={currentColor}
        metalness={0.3}
        roughness={0.7}
        emissive={currentColor}
        emissiveIntensity={morphProgress * 0.3}
      />
    </mesh>
  );
}

// Clean/Green Building Component
function GreenBuilding({ position, scale, phase }: { position: [number, number, number]; scale: number; phase: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (phase >= 3) {
      const timer = setTimeout(() => setVisible(true), Math.random() * 1000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useFrame((state) => {
    if (meshRef.current && visible) {
      meshRef.current.scale.y = THREE.MathUtils.lerp(
        meshRef.current.scale.y,
        1,
        0.05
      );
    }
  });

  if (!visible) return null;

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
      <mesh ref={meshRef} position={position} scale={[1, 0, 1]}>
        <cylinderGeometry args={[0.5 * scale, 0.7 * scale, (3 + Math.random() * 2) * scale, 6]} />
        <meshStandardMaterial 
          color="#00d4aa"
          metalness={0.5}
          roughness={0.3}
          emissive="#00d4aa"
          emissiveIntensity={0.4}
        />
      </mesh>
    </Float>
  );
}

// Waste Particle System
function WasteParticles({ phase, count = 200 }: { phase: number; count?: number }) {
  const particlesRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = Math.random() * 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      if (phase < 2) {
        cols[i * 3] = 0.4 + Math.random() * 0.2;
        cols[i * 3 + 1] = 0.2 + Math.random() * 0.1;
        cols[i * 3 + 2] = 0.1;
      } else {
        cols[i * 3] = 0;
        cols[i * 3 + 1] = 0.8 + Math.random() * 0.2;
        cols[i * 3 + 2] = 0.6 + Math.random() * 0.2;
      }
    }
    return cols;
  }, [count, phase]);

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        if (phase >= 2 && phase < 4) {
          // Transform animation - particles rise and converge
          positions[i * 3 + 1] += 0.02;
          if (positions[i * 3 + 1] > 10) {
            positions[i * 3 + 1] = 0;
          }
        } else if (phase >= 4) {
          // Clean state - particles become trees/nature
          positions[i * 3 + 1] = Math.sin(state.clock.elapsedTime + i) * 0.5 + 2;
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={phase >= 2 ? 0.15 : 0.1}
        vertexColors
        transparent
        opacity={phase >= 4 ? 0.3 : 0.8}
        sizeAttenuation
      />
    </points>
  );
}

// AI Scan Grid Effect
function ScanGrid({ active }: { active: boolean }) {
  const gridRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (gridRef.current && active) {
      gridRef.current.position.y = (Math.sin(state.clock.elapsedTime * 2) + 1) * 5;
    }
  });

  if (!active) return null;

  return (
    <mesh ref={gridRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[30, 30, 30, 30]} />
      <meshBasicMaterial 
        color="#00d4ff"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

// Ground Plane
function Ground({ phase }: { phase: number }) {
  const pollutedColor = '#2a1f15';
  const cleanColor = '#0a2a25';
  
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial 
        color={phase >= 3 ? cleanColor : pollutedColor}
        metalness={0.1}
        roughness={0.9}
      />
    </mesh>
  );
}

// Camera Controller for Flythrough
function CameraController({ phase }: { phase: number }) {
  const { camera } = useThree();
  
  const cameraPositions = useMemo(() => ({
    0: { position: [15, 8, 15], target: [0, 2, 0] },
    1: { position: [0, 15, 20], target: [0, 0, 0] },
    2: { position: [-10, 5, 10], target: [0, 3, 0] },
    3: { position: [12, 6, 12], target: [0, 2, 0] },
    4: { position: [8, 10, 8], target: [0, 0, 0] },
  }), []);

  useFrame(() => {
    const config = cameraPositions[phase as keyof typeof cameraPositions] || cameraPositions[0];
    
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, config.position[0], 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, config.position[1], 0.02);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, config.position[2], 0.02);
    
    camera.lookAt(config.target[0], config.target[1], config.target[2]);
  });

  return null;
}

// Main City Scene
function CityContent({ phase }: { phase: number }) {
  const buildingPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let x = -8; x <= 8; x += 2) {
      for (let z = -8; z <= 8; z += 2) {
        if (Math.random() > 0.3) {
          positions.push([x + (Math.random() - 0.5), 0, z + (Math.random() - 0.5)]);
        }
      }
    }
    return positions;
  }, []);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={phase >= 3 ? 0.6 : 0.2} />
      <directionalLight 
        position={[10, 20, 5]} 
        intensity={phase >= 3 ? 1.5 : 0.5} 
        color={phase >= 3 ? '#ffffff' : '#ff8844'}
        castShadow
      />
      <pointLight 
        position={[0, 10, 0]} 
        intensity={phase >= 2 ? 2 : 0} 
        color="#00d4ff"
      />

      {/* Environment */}
      {phase < 3 && (
        <fog attach="fog" args={['#553322', 10, 50]} />
      )}
      
      <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />

      {/* Ground */}
      <Ground phase={phase} />

      {/* Polluted Buildings */}
      {phase < 4 && buildingPositions.map((pos, i) => (
        <PollutedBuilding 
          key={`polluted-${i}`}
          position={[pos[0], (1 + Math.random()) * 0.5, pos[2]]}
          scale={0.8 + Math.random() * 0.4}
          delay={i * 0.1}
        />
      ))}

      {/* Green Buildings */}
      {buildingPositions.slice(0, Math.floor(buildingPositions.length * 0.6)).map((pos, i) => (
        <GreenBuilding 
          key={`green-${i}`}
          position={[pos[0] + 0.5, 0, pos[2] + 0.5]}
          scale={0.6 + Math.random() * 0.3}
          phase={phase}
        />
      ))}

      {/* Waste Particles */}
      <WasteParticles phase={phase} count={300} />

      {/* AI Scan Effect */}
      <ScanGrid active={phase === 1 || phase === 2} />

      {/* Sparkles for clean phase */}
      {phase >= 3 && (
        <Sparkles 
          count={100}
          scale={20}
          size={3}
          speed={0.5}
          color="#00d4aa"
        />
      )}

      {/* Camera */}
      <CameraController phase={phase} />
    </>
  );
}

interface CitySceneProps {
  phase: number;
  className?: string;
}

export default function CityScene({ phase, className = '' }: CitySceneProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[15, 8, 15]} fov={60} />
        <CityContent phase={phase} />
        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          minDistance={5}
          maxDistance={40}
          autoRotate={phase === 0 || phase === 4}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
