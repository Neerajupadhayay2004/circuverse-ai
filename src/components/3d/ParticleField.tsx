import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function WasteParticles({ phase }: { phase: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const { positions, colors, targetPositions } = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const targetPositions = new Float32Array(count * 3);
    
    // Initial scattered waste positions
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 5 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Target: organized sustainable pattern (hexagonal grid)
      const gridX = (i % 40 - 20) * 0.4;
      const gridY = (Math.floor(i / 40) % 50 - 25) * 0.4;
      const gridZ = Math.sin(gridX * 0.5) * Math.cos(gridY * 0.5) * 2;
      
      targetPositions[i3] = gridX;
      targetPositions[i3 + 1] = gridY;
      targetPositions[i3 + 2] = gridZ;
      
      // Colors: waste (red/brown) to sustainable (green/blue)
      colors[i3] = 0.8;     // R
      colors[i3 + 1] = 0.3; // G
      colors[i3 + 2] = 0.2; // B
    }
    
    return { positions, colors, targetPositions };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const positionAttr = pointsRef.current.geometry.getAttribute('position') as THREE.BufferAttribute;
    const colorAttr = pointsRef.current.geometry.getAttribute('color') as THREE.BufferAttribute;
    const positions = positionAttr.array as Float32Array;
    const colors = colorAttr.array as Float32Array;
    
    const t = state.clock.elapsedTime;
    const morphProgress = phase >= 2 ? Math.min((phase - 1) / 2, 1) : 0;
    
    for (let i = 0; i < positions.length / 3; i++) {
      const i3 = i * 3;
      
      // Morph positions
      if (phase >= 2) {
        positions[i3] += (targetPositions[i3] - positions[i3]) * 0.02;
        positions[i3 + 1] += (targetPositions[i3 + 1] - positions[i3 + 1]) * 0.02;
        positions[i3 + 2] += (targetPositions[i3 + 2] - positions[i3 + 2]) * 0.02;
      } else {
        // Chaotic movement for waste
        positions[i3] += Math.sin(t * 2 + i) * 0.01;
        positions[i3 + 1] += Math.cos(t * 2 + i * 0.5) * 0.01;
        positions[i3 + 2] += Math.sin(t + i * 0.3) * 0.01;
      }
      
      // Morph colors from waste to sustainable
      if (phase >= 2) {
        colors[i3] += (0.0 - colors[i3]) * 0.02;      // R -> 0
        colors[i3 + 1] += (0.8 - colors[i3 + 1]) * 0.02; // G -> 0.8
        colors[i3 + 2] += (0.5 - colors[i3 + 2]) * 0.02; // B -> 0.5
      }
    }
    
    positionAttr.needsUpdate = true;
    colorAttr.needsUpdate = true;
    
    pointsRef.current.rotation.y = t * 0.1;
    pointsRef.current.rotation.x = Math.sin(t * 0.05) * 0.2;
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors}>
      <PointMaterial
        vertexColors
        size={0.08}
        sizeAttenuation
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </Points>
  );
}

function EnergyBeams({ phase }: { phase: number }) {
  const beamsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (beamsRef.current) {
      beamsRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  if (phase < 2) return null;

  return (
    <group ref={beamsRef}>
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 3, 0, Math.sin(angle) * 3]}>
            <cylinderGeometry args={[0.02, 0.02, 15, 8]} />
            <meshStandardMaterial
              color="#00ff88"
              emissive="#00ff88"
              emissiveIntensity={1}
              transparent
              opacity={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function CentralCore({ phase }: { phase: number }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      coreRef.current.rotation.z = state.clock.elapsedTime * 0.3;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      coreRef.current.scale.setScalar(phase >= 2 ? scale : 0.5);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.8;
    }
  });

  return (
    <group>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.8, 2]} />
        <meshStandardMaterial
          color={phase >= 2 ? "#00d4aa" : "#ff4444"}
          emissive={phase >= 2 ? "#00ff88" : "#ff0000"}
          emissiveIntensity={phase >= 2 ? 0.8 : 0.3}
          wireframe
        />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[1.5, 0.05, 16, 100]} />
        <meshStandardMaterial
          color={phase >= 2 ? "#00d4ff" : "#ff6644"}
          emissive={phase >= 2 ? "#00d4ff" : "#ff6644"}
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  );
}

interface ParticleFieldProps {
  phase: number;
}

export default function ParticleField({ phase }: ParticleFieldProps) {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
      <color attach="background" args={['#020208']} />
      <fog attach="fog" args={['#020208', 10, 30]} />
      
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00d4aa" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00d4ff" />
      
      <WasteParticles phase={phase} />
      <CentralCore phase={phase} />
      <EnergyBeams phase={phase} />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.2}
      />
    </Canvas>
  );
}
