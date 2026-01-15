import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Floating particles around the title
function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const { positions, colors } = useMemo(() => {
    const count = 500;
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Sphere distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 8 + Math.random() * 15;
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      
      // Green to blue gradient
      const t = Math.random();
      cols[i * 3] = t * 0.2;
      cols[i * 3 + 1] = 0.8 + t * 0.2;
      cols[i * 3 + 2] = 0.4 + t * 0.6;
    }
    
    return { positions: pos, colors: cols };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={500}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={500}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

// Central glowing orb representing AI
function AICore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = state.clock.elapsedTime * 0.4;
      ring2Ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <group>
      {/* Core sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="#00d4aa"
          emissive="#00d4aa"
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>
      
      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={1.5}
        />
      </mesh>
      
      {/* Orbital ring 1 */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.5, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={1}
        />
      </mesh>
      
      {/* Orbital ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[3, 0.03, 16, 100]} />
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={0.8}
        />
      </mesh>
      
      {/* Data nodes on orbit */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 3, 0, Math.sin(angle) * 3]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
              color="#00d4ff"
              emissive="#00d4ff"
              emissiveIntensity={1}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Circular economy flow visualization
function CircularFlow() {
  const flowRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (flowRef.current) {
      flowRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  const segments = 6;
  const radius = 5;

  return (
    <group ref={flowRef} position={[0, 0, -5]}>
      {Array.from({ length: segments }).map((_, i) => {
        const angle1 = (i / segments) * Math.PI * 2;
        const angle2 = ((i + 1) / segments) * Math.PI * 2;
        
        return (
          <group key={i}>
            {/* Arc segment */}
            <mesh position={[Math.cos(angle1) * radius, Math.sin(angle1) * radius, 0]}>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial
                color="#00d4aa"
                emissive="#00d4aa"
                emissiveIntensity={0.8}
              />
            </mesh>
            
            {/* Connection line */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([
                    Math.cos(angle1) * radius, Math.sin(angle1) * radius, 0,
                    Math.cos(angle2) * radius, Math.sin(angle2) * radius, 0
                  ])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#00d4aa" opacity={0.5} transparent />
            </line>
          </group>
        );
      })}
    </group>
  );
}

// Hexagonal grid pattern
function HexGrid() {
  const gridRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  const hexes = useMemo(() => {
    const result = [];
    for (let x = -6; x <= 6; x += 2) {
      for (let y = -4; y <= 4; y += 1.7) {
        result.push({
          x: x + (Math.floor(y) % 2) * 1,
          y: y,
          z: -8 + Math.random() * 2
        });
      }
    }
    return result;
  }, []);

  return (
    <group ref={gridRef}>
      {hexes.map((hex, i) => (
        <mesh key={i} position={[hex.x, hex.y, hex.z]} rotation={[0, 0, Math.PI / 6]}>
          <ringGeometry args={[0.3, 0.35, 6]} />
          <meshBasicMaterial color="#00d4aa" transparent opacity={0.2} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroBackground() {
  return (
    <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
      <color attach="background" args={['#050510']} />
      <fog attach="fog" args={['#050510', 10, 30]} />
      
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 5]} intensity={2} color="#00d4aa" />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00d4ff" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#ff00aa" />
      
      <AICore />
      <FloatingParticles />
      <CircularFlow />
      <HexGrid />
      
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={100} scale={20} size={2} speed={0.5} color="#00ff88" />
    </Canvas>
  );
}
