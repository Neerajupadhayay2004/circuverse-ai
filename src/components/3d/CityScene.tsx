import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera,
  Sparkles,
  Stars,
  Trail,
  Float
} from '@react-three/drei';
import * as THREE from 'three';

// Growing Tree Component
function GrowingTree({ position, delay, phase }: { position: [number, number, number]; delay: number; phase: number }) {
  const trunkRef = useRef<THREE.Mesh>(null);
  const leavesRef = useRef<THREE.Mesh>(null);
  const [growth, setGrowth] = useState(0);

  useEffect(() => {
    if (phase >= 3) {
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setGrowth(g => {
            if (g >= 1) {
              clearInterval(interval);
              return 1;
            }
            return g + 0.02;
          });
        }, 30);
        return () => clearInterval(interval);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setGrowth(0);
    }
  }, [phase, delay]);

  useFrame((state) => {
    if (leavesRef.current && growth > 0) {
      leavesRef.current.rotation.y = Math.sin(state.clock.elapsedTime + delay) * 0.1;
    }
  });

  if (phase < 3 || growth === 0) return null;

  return (
    <group position={position}>
      {/* Trunk */}
      <mesh ref={trunkRef} position={[0, growth * 0.5, 0]} scale={[1, growth, 1]}>
        <cylinderGeometry args={[0.05, 0.08, 1, 8]} />
        <meshStandardMaterial color="#4a3728" roughness={0.9} />
      </mesh>
      {/* Leaves */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh ref={leavesRef} position={[0, growth * 1.2, 0]} scale={growth}>
          <coneGeometry args={[0.4, 0.8, 8]} />
          <meshStandardMaterial 
            color="#00d4aa" 
            emissive="#00d4aa"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>
      {/* Glow particles */}
      {growth > 0.5 && (
        <Sparkles 
          count={10} 
          scale={0.5} 
          size={2} 
          speed={0.3} 
          color="#00ff88"
          position={[0, growth * 1.2, 0]}
        />
      )}
    </group>
  );
}

// Solar Panel Component
function SolarPanel({ position, delay, phase }: { position: [number, number, number]; delay: number; phase: number }) {
  const panelRef = useRef<THREE.Group>(null);
  const [deployed, setDeployed] = useState(0);

  useEffect(() => {
    if (phase >= 3) {
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setDeployed(d => {
            if (d >= 1) {
              clearInterval(interval);
              return 1;
            }
            return d + 0.03;
          });
        }, 30);
        return () => clearInterval(interval);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setDeployed(0);
    }
  }, [phase, delay]);

  useFrame((state) => {
    if (panelRef.current && deployed > 0) {
      // Track sun position
      panelRef.current.rotation.x = -0.3 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  if (phase < 3 || deployed === 0) return null;

  return (
    <group ref={panelRef} position={position}>
      {/* Pole */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1, 8]} />
        <meshStandardMaterial color="#666" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Panel */}
      <group position={[0, 1.1, 0]} rotation={[-0.5 * deployed, 0, 0]} scale={[deployed, deployed, 1]}>
        <mesh>
          <boxGeometry args={[0.8, 0.05, 0.5]} />
          <meshStandardMaterial 
            color="#1a237e" 
            metalness={0.9} 
            roughness={0.1}
            emissive="#0066ff"
            emissiveIntensity={0.2 * deployed}
          />
        </mesh>
        {/* Grid lines */}
        <mesh position={[0, 0.03, 0]}>
          <boxGeometry args={[0.75, 0.01, 0.45]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.5} />
        </mesh>
      </group>
    </group>
  );
}

// Animated Vehicle on Road
function Vehicle({ phase, roadRadius = 6 }: { phase: number; roadRadius?: number }) {
  const vehicleRef = useRef<THREE.Group>(null);
  const trailRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (vehicleRef.current && phase >= 4) {
      const angle = state.clock.elapsedTime * 0.5;
      vehicleRef.current.position.x = Math.cos(angle) * roadRadius;
      vehicleRef.current.position.z = Math.sin(angle) * roadRadius;
      vehicleRef.current.rotation.y = -angle + Math.PI / 2;
    }
  });

  if (phase < 4) return null;

  return (
    <Trail
      width={1}
      length={8}
      color="#00d4ff"
      attenuation={(t) => t * t}
    >
      <group ref={vehicleRef} position={[roadRadius, 0.15, 0]}>
        {/* Car body */}
        <mesh>
          <boxGeometry args={[0.4, 0.15, 0.2]} />
          <meshStandardMaterial 
            color="#00d4aa" 
            metalness={0.8} 
            roughness={0.2}
            emissive="#00d4aa"
            emissiveIntensity={0.3}
          />
        </mesh>
        {/* Cabin */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.2, 0.1, 0.18]} />
          <meshStandardMaterial color="#88ccff" transparent opacity={0.7} />
        </mesh>
        {/* Wheels */}
        {[[-0.12, -0.08, 0.12], [-0.12, -0.08, -0.12], [0.12, -0.08, 0.12], [0.12, -0.08, -0.12]].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
            <meshStandardMaterial color="#333" />
          </mesh>
        ))}
        {/* Headlights */}
        <pointLight position={[0.25, 0, 0]} intensity={0.5} color="#ffffff" distance={3} />
      </group>
    </Trail>
  );
}

// Second Vehicle
function Vehicle2({ phase, roadRadius = 8 }: { phase: number; roadRadius?: number }) {
  const vehicleRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (vehicleRef.current && phase >= 4) {
      const angle = -state.clock.elapsedTime * 0.3 + Math.PI;
      vehicleRef.current.position.x = Math.cos(angle) * roadRadius;
      vehicleRef.current.position.z = Math.sin(angle) * roadRadius;
      vehicleRef.current.rotation.y = -angle - Math.PI / 2;
    }
  });

  if (phase < 4) return null;

  return (
    <Trail
      width={0.8}
      length={6}
      color="#ff6644"
      attenuation={(t) => t * t}
    >
      <group ref={vehicleRef} position={[roadRadius, 0.15, 0]}>
        {/* Bus body */}
        <mesh>
          <boxGeometry args={[0.6, 0.25, 0.25]} />
          <meshStandardMaterial 
            color="#ff8844" 
            metalness={0.6} 
            roughness={0.3}
            emissive="#ff6622"
            emissiveIntensity={0.2}
          />
        </mesh>
        {/* Windows */}
        <mesh position={[0, 0.05, 0.13]}>
          <boxGeometry args={[0.5, 0.12, 0.01]} />
          <meshStandardMaterial color="#88ccff" transparent opacity={0.7} />
        </mesh>
        {/* Wheels */}
        {[[-0.2, -0.13, 0.14], [-0.2, -0.13, -0.14], [0.2, -0.13, 0.14], [0.2, -0.13, -0.14]].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.02, 16]} />
            <meshStandardMaterial color="#222" />
          </mesh>
        ))}
      </group>
    </Trail>
  );
}

// Plastic Road Ring
function PlasticRoad({ radius, phase }: { radius: number; phase: number }) {
  const roadRef = useRef<THREE.Mesh>(null);
  const [visibility, setVisibility] = useState(0);

  useEffect(() => {
    if (phase >= 3) {
      const interval = setInterval(() => {
        setVisibility(v => Math.min(v + 0.05, 1));
      }, 30);
      return () => clearInterval(interval);
    } else {
      setVisibility(0);
    }
  }, [phase]);

  if (visibility === 0) return null;

  return (
    <mesh ref={roadRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
      <ringGeometry args={[radius - 0.3, radius + 0.3, 64]} />
      <meshStandardMaterial 
        color="#2a2a3a"
        metalness={0.3}
        roughness={0.7}
        transparent
        opacity={visibility}
        emissive="#00ff88"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

// Polluted Building Component
function PollutedBuilding({ position, scale, delay, phase }: { position: [number, number, number]; scale: number; delay: number; phase: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [morphProgress, setMorphProgress] = useState(0);

  useEffect(() => {
    if (phase >= 3) {
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setMorphProgress(p => Math.min(p + 0.02, 1));
        }, 30);
        return () => clearInterval(interval);
      }, delay * 100);
      return () => clearTimeout(timer);
    } else {
      setMorphProgress(0);
    }
  }, [phase, delay]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1 + delay) * 0.02;
    }
  });

  const color = new THREE.Color('#4a3728').lerp(new THREE.Color('#00d4aa'), morphProgress);

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1 * scale, (2 + Math.random() * 3) * scale, 1 * scale]} />
      <meshStandardMaterial 
        color={color}
        metalness={0.3 + morphProgress * 0.3}
        roughness={0.7 - morphProgress * 0.3}
        emissive={color}
        emissiveIntensity={morphProgress * 0.3}
      />
    </mesh>
  );
}

// Waste Particle System
function WasteParticles({ phase, count = 200 }: { phase: number; count?: number }) {
  const particlesRef = useRef<THREE.Points>(null);
  
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = Math.random() * 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      cols[i * 3] = 0.4 + Math.random() * 0.2;
      cols[i * 3 + 1] = 0.2 + Math.random() * 0.1;
      cols[i * 3 + 2] = 0.1;
    }
    return { positions: pos, colors: cols };
  }, [count]);

  useFrame((state) => {
    if (particlesRef.current) {
      const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const colArray = particlesRef.current.geometry.attributes.color.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        if (phase >= 2 && phase < 4) {
          posArray[i * 3 + 1] += 0.03;
          if (posArray[i * 3 + 1] > 10) {
            posArray[i * 3 + 1] = 0;
          }
          // Color transition
          colArray[i * 3] = THREE.MathUtils.lerp(colArray[i * 3], 0, 0.01);
          colArray[i * 3 + 1] = THREE.MathUtils.lerp(colArray[i * 3 + 1], 0.8, 0.01);
          colArray[i * 3 + 2] = THREE.MathUtils.lerp(colArray[i * 3 + 2], 0.6, 0.01);
        } else if (phase >= 4) {
          posArray[i * 3 + 1] = Math.sin(state.clock.elapsedTime + i) * 0.3 + 2;
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.geometry.attributes.color.needsUpdate = true;
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
        opacity={phase >= 4 ? 0.4 : 0.8}
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
  const [color, setColor] = useState(pollutedColor);
  
  useEffect(() => {
    if (phase >= 3) {
      setColor(cleanColor);
    } else {
      setColor(pollutedColor);
    }
  }, [phase]);
  
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial 
        color={color}
        metalness={0.1}
        roughness={0.9}
      />
    </mesh>
  );
}

// Camera Controller
function CameraController({ phase }: { phase: number }) {
  const { camera } = useThree();
  
  const cameraPositions = useMemo(() => ({
    0: { position: [15, 8, 15], target: [0, 2, 0] },
    1: { position: [0, 15, 20], target: [0, 0, 0] },
    2: { position: [-10, 5, 10], target: [0, 3, 0] },
    3: { position: [12, 6, 12], target: [0, 2, 0] },
    4: { position: [10, 8, 10], target: [0, 1, 0] },
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

// Main City Scene Content
function CityContent({ phase }: { phase: number }) {
  const buildingPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let x = -8; x <= 8; x += 2.5) {
      for (let z = -8; z <= 8; z += 2.5) {
        if (Math.random() > 0.3 && (Math.abs(x) > 2 || Math.abs(z) > 2)) {
          positions.push([x + (Math.random() - 0.5), 0, z + (Math.random() - 0.5)]);
        }
      }
    }
    return positions;
  }, []);

  const treePositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < 30; i++) {
      const angle = (i / 30) * Math.PI * 2;
      const radius = 4 + Math.random() * 2;
      positions.push([
        Math.cos(angle) * radius + (Math.random() - 0.5) * 2,
        -0.4,
        Math.sin(angle) * radius + (Math.random() - 0.5) * 2
      ]);
    }
    return positions;
  }, []);

  const solarPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 10 + Math.random();
      positions.push([
        Math.cos(angle) * radius,
        -0.4,
        Math.sin(angle) * radius
      ]);
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

      {/* Stars */}
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

      {/* Fog for polluted phase */}
      {phase < 3 && <fog attach="fog" args={['#553322', 15, 50]} />}
      {phase >= 3 && <fog attach="fog" args={['#001515', 30, 80]} />}

      {/* Ground */}
      <Ground phase={phase} />

      {/* Plastic Roads */}
      <PlasticRoad radius={6} phase={phase} />
      <PlasticRoad radius={8} phase={phase} />

      {/* Buildings */}
      {buildingPositions.map((pos, i) => (
        <PollutedBuilding 
          key={`building-${i}`}
          position={[pos[0], (1 + Math.random()) * 0.5, pos[2]]}
          scale={0.8 + Math.random() * 0.4}
          delay={i}
          phase={phase}
        />
      ))}

      {/* Growing Trees */}
      {treePositions.map((pos, i) => (
        <GrowingTree 
          key={`tree-${i}`}
          position={pos}
          delay={i * 100}
          phase={phase}
        />
      ))}

      {/* Solar Panels */}
      {solarPositions.map((pos, i) => (
        <SolarPanel 
          key={`solar-${i}`}
          position={pos}
          delay={i * 150}
          phase={phase}
        />
      ))}

      {/* Animated Vehicles */}
      <Vehicle phase={phase} roadRadius={6} />
      <Vehicle2 phase={phase} roadRadius={8} />

      {/* Waste Particles */}
      <WasteParticles phase={phase} count={300} />

      {/* AI Scan Effect */}
      <ScanGrid active={phase === 1 || phase === 2} />

      {/* Sparkles for clean phase */}
      {phase >= 3 && (
        <Sparkles 
          count={150}
          scale={25}
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
