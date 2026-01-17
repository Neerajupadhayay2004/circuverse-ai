import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Sparkles, 
  Float, 
  MeshDistortMaterial,
  Text,
  Trail,
  Stars,
  MeshWobbleMaterial,
  Sphere,
  Box,
  Torus
} from '@react-three/drei';
import * as THREE from 'three';

// Step 1: Data Input Visualization
function DataInputNode({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const cubesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
    if (cubesRef.current) {
      cubesRef.current.children.forEach((child, i) => {
        child.position.y = Math.sin(state.clock.elapsedTime * 2 + i) * 0.2;
      });
    }
  });

  return (
    <group ref={groupRef} position={[-6, 0, 0]}>
      {/* Input portal */}
      <mesh>
        <torusGeometry args={[1, 0.1, 16, 100]} />
        <meshStandardMaterial
          color={active ? "#00d4ff" : "#334455"}
          emissive={active ? "#00d4ff" : "#000000"}
          emissiveIntensity={active ? 0.8 : 0}
        />
      </mesh>
      
      {/* Floating data cubes */}
      <group ref={cubesRef}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Float key={i} speed={2} floatIntensity={0.5}>
            <Box
              args={[0.2, 0.2, 0.2]}
              position={[
                Math.cos((i / 6) * Math.PI * 2) * 0.6,
                Math.sin((i / 6) * Math.PI * 2) * 0.6,
                0
              ]}
            >
              <meshStandardMaterial
                color={active ? "#00ff88" : "#667788"}
                emissive={active ? "#00ff88" : "#000000"}
                emissiveIntensity={active ? 0.5 : 0}
              />
            </Box>
          </Float>
        ))}
      </group>
      
      {active && <Sparkles count={50} scale={3} size={2} speed={0.5} color="#00d4ff" />}
    </group>
  );
}

// Step 2: AI Brain Processing
function AIBrainNode({ active }: { active: boolean }) {
  const brainRef = useRef<THREE.Mesh>(null);
  const neuronsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (brainRef.current) {
      brainRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      brainRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
    }
    if (neuronsRef.current && active) {
      neuronsRef.current.rotation.z = state.clock.elapsedTime * 0.8;
    }
  });

  return (
    <group position={[-3, 0, 0]}>
      {/* Central AI brain */}
      <Sphere ref={brainRef} args={[0.8, 32, 32]}>
        <MeshDistortMaterial
          color={active ? "#8b5cf6" : "#445566"}
          distort={active ? 0.4 : 0.1}
          speed={active ? 3 : 1}
          roughness={0.2}
          metalness={0.8}
          emissive={active ? "#8b5cf6" : "#000000"}
          emissiveIntensity={active ? 0.6 : 0}
        />
      </Sphere>
      
      {/* Neural connections */}
      <group ref={neuronsRef}>
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const radius = 1.2;
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle) * radius,
                0
              ]}
            >
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshStandardMaterial
                color={active ? "#00d4ff" : "#556677"}
                emissive={active ? "#00d4ff" : "#000000"}
                emissiveIntensity={active ? 1 : 0}
              />
            </mesh>
          );
        })}
      </group>
      
      {active && <Sparkles count={80} scale={4} size={3} speed={1} color="#8b5cf6" />}
    </group>
  );
}

// Step 3: Transformation Engine
function TransformEngineNode({ active }: { active: boolean }) {
  const gearRef1 = useRef<THREE.Mesh>(null);
  const gearRef2 = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (gearRef1.current) {
      gearRef1.current.rotation.z = state.clock.elapsedTime * (active ? 2 : 0.3);
    }
    if (gearRef2.current) {
      gearRef2.current.rotation.z = -state.clock.elapsedTime * (active ? 2 : 0.3);
    }
    if (coreRef.current && active) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
      coreRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Rotating gears */}
      <Torus ref={gearRef1} args={[0.8, 0.15, 6, 8]} position={[0.4, 0.4, 0]}>
        <meshStandardMaterial
          color={active ? "#f59e0b" : "#556677"}
          emissive={active ? "#f59e0b" : "#000000"}
          emissiveIntensity={active ? 0.5 : 0}
          metalness={0.9}
          roughness={0.1}
        />
      </Torus>
      
      <Torus ref={gearRef2} args={[0.6, 0.12, 6, 8]} position={[-0.3, -0.3, 0]}>
        <meshStandardMaterial
          color={active ? "#22c55e" : "#556677"}
          emissive={active ? "#22c55e" : "#000000"}
          emissiveIntensity={active ? 0.5 : 0}
          metalness={0.9}
          roughness={0.1}
        />
      </Torus>
      
      {/* Energy core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial
          color={active ? "#00ff88" : "#445566"}
          emissive={active ? "#00ff88" : "#000000"}
          emissiveIntensity={active ? 0.8 : 0}
          wireframe
        />
      </mesh>
      
      {active && <Sparkles count={100} scale={4} size={3} speed={1.5} color="#f59e0b" />}
    </group>
  );
}

// Step 4: 3D Generation
function Generation3DNode({ active }: { active: boolean }) {
  const cityRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (cityRef.current) {
      cityRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <group position={[3, 0, 0]}>
      <group ref={cityRef}>
        {/* Mini city buildings */}
        {[
          { pos: [0, 0, 0], height: 0.8 },
          { pos: [0.4, 0, 0.4], height: 0.5 },
          { pos: [-0.4, 0, 0.3], height: 0.6 },
          { pos: [0.2, 0, -0.4], height: 0.7 },
          { pos: [-0.3, 0, -0.3], height: 0.4 },
        ].map((b, i) => (
          <Float key={i} speed={1} floatIntensity={active ? 0.3 : 0}>
            <Box
              args={[0.2, b.height, 0.2]}
              position={[b.pos[0], b.height / 2, b.pos[2]]}
            >
              <meshStandardMaterial
                color={active ? "#00d4aa" : "#556677"}
                emissive={active ? "#00ff88" : "#000000"}
                emissiveIntensity={active ? 0.4 : 0}
              />
            </Box>
          </Float>
        ))}
        
        {/* Ground plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <circleGeometry args={[1, 32]} />
          <meshStandardMaterial
            color={active ? "#0a2a1a" : "#112233"}
            emissive={active ? "#00ff88" : "#000000"}
            emissiveIntensity={active ? 0.1 : 0}
          />
        </mesh>
      </group>
      
      {active && <Sparkles count={60} scale={3} size={2} speed={0.8} color="#00d4aa" />}
    </group>
  );
}

// Step 5: Impact Analysis
function ImpactAnalysisNode({ active }: { active: boolean }) {
  const chartsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (chartsRef.current) {
      chartsRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group position={[6, 0, 0]}>
      <group ref={chartsRef}>
        {/* Rising bar charts */}
        {[
          { x: -0.4, color: "#22c55e", height: active ? 1.2 : 0.3 },
          { x: -0.15, color: "#3b82f6", height: active ? 0.9 : 0.2 },
          { x: 0.1, color: "#f59e0b", height: active ? 1.0 : 0.25 },
          { x: 0.35, color: "#8b5cf6", height: active ? 0.7 : 0.15 },
        ].map((bar, i) => (
          <Box key={i} args={[0.15, bar.height, 0.15]} position={[bar.x, bar.height / 2, 0]}>
            <meshStandardMaterial
              color={bar.color}
              emissive={active ? bar.color : "#000000"}
              emissiveIntensity={active ? 0.6 : 0}
            />
          </Box>
        ))}
        
        {/* Circular progress */}
        <Torus args={[0.7, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]} position={[0, 1.5, 0]}>
          <meshStandardMaterial
            color={active ? "#00ff88" : "#445566"}
            emissive={active ? "#00ff88" : "#000000"}
            emissiveIntensity={active ? 0.8 : 0}
          />
        </Torus>
      </group>
      
      {active && <Sparkles count={80} scale={4} size={3} speed={1} color="#22c55e" />}
    </group>
  );
}

// Connecting energy beams between nodes
function EnergyConnections({ activeStep }: { activeStep: number }) {
  const beamRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (beamRef.current) {
      beamRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          (child.material as THREE.MeshStandardMaterial).opacity = 
            0.3 + Math.sin(state.clock.elapsedTime * 3 + i * 2) * 0.3;
        }
      });
    }
  });

  const connections = [
    { from: [-5, 0, 0], to: [-4, 0, 0], active: activeStep >= 1 },
    { from: [-2, 0, 0], to: [-1, 0, 0], active: activeStep >= 2 },
    { from: [1, 0, 0], to: [2, 0, 0], active: activeStep >= 3 },
    { from: [4, 0, 0], to: [5, 0, 0], active: activeStep >= 4 },
  ];

  return (
    <group ref={beamRef}>
      {connections.map((conn, i) => (
        <mesh key={i} position={[(conn.from[0] + conn.to[0]) / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.03, 0.03, 1, 8]} />
          <meshStandardMaterial
            color={conn.active ? "#00ff88" : "#334455"}
            emissive={conn.active ? "#00ff88" : "#000000"}
            emissiveIntensity={conn.active ? 1 : 0}
            transparent
            opacity={conn.active ? 0.8 : 0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

// Floating particles traveling between nodes
function TravelingParticles({ activeStep }: { activeStep: number }) {
  const particlesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((child, i) => {
        const t = (state.clock.elapsedTime * 0.5 + i * 0.2) % 1;
        const startX = -6 + i * 3;
        const endX = startX + 3;
        child.position.x = startX + (endX - startX) * t;
        child.position.y = Math.sin(t * Math.PI) * 0.5;
        child.position.z = Math.sin(t * Math.PI * 2) * 0.2;
      });
    }
  });

  if (activeStep < 1) return null;

  return (
    <group ref={particlesRef}>
      {Array.from({ length: Math.min(activeStep, 4) }).map((_, i) => (
        <Trail key={i} width={0.2} length={6} color="#00ff88" attenuation={(w) => w}>
          <mesh>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial
              color="#00ff88"
              emissive="#00ff88"
              emissiveIntensity={1}
            />
          </mesh>
        </Trail>
      ))}
    </group>
  );
}

interface ProcessVisualization3DProps {
  activeStep: number;
}

export default function ProcessVisualization3D({ activeStep }: ProcessVisualization3DProps) {
  return (
    <Canvas camera={{ position: [0, 5, 12], fov: 50 }}>
      <color attach="background" args={['#030308']} />
      <fog attach="fog" args={['#030308', 15, 35]} />
      
      <Stars radius={100} depth={50} count={3000} factor={4} fade speed={0.5} />
      
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 10, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, 5, 5]} intensity={0.8} color="#00d4ff" />
      <pointLight position={[10, 5, 5]} intensity={0.8} color="#00ff88" />
      
      <DataInputNode active={activeStep >= 0} />
      <AIBrainNode active={activeStep >= 1} />
      <TransformEngineNode active={activeStep >= 2} />
      <Generation3DNode active={activeStep >= 3} />
      <ImpactAnalysisNode active={activeStep >= 4} />
      
      <EnergyConnections activeStep={activeStep} />
      <TravelingParticles activeStep={activeStep} />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.2}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
      />
    </Canvas>
  );
}
