import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls,
  PerspectiveCamera, 
  Sphere,
  Stars,
  Float,
  Html
} from '@react-three/drei';
import * as THREE from 'three';

// Globe with data points
function Globe({ phase }: { phase: number }) {
  const globeRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Generate city points on globe
  const cityPoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const cities = [
      { lat: 40.7128, lng: -74.006 },  // NYC
      { lat: 51.5074, lng: -0.1278 },  // London
      { lat: 35.6762, lng: 139.6503 }, // Tokyo
      { lat: 28.6139, lng: 77.209 },   // Delhi
      { lat: -33.8688, lng: 151.2093 },// Sydney
      { lat: 55.7558, lng: 37.6173 },  // Moscow
      { lat: -23.5505, lng: -46.6333 },// São Paulo
      { lat: 1.3521, lng: 103.8198 },  // Singapore
      { lat: 31.2304, lng: 121.4737 }, // Shanghai
      { lat: 19.4326, lng: -99.1332 }, // Mexico City
    ];
    
    cities.forEach(({ lat, lng }) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const x = -2 * Math.sin(phi) * Math.cos(theta);
      const y = 2 * Math.cos(phi);
      const z = 2 * Math.sin(phi) * Math.sin(theta);
      points.push(new THREE.Vector3(x, y, z));
    });
    
    return points;
  }, []);

  const pointsPositions = useMemo(() => {
    const positions = new Float32Array(cityPoints.length * 3);
    cityPoints.forEach((point, i) => {
      positions[i * 3] = point.x;
      positions[i * 3 + 1] = point.y;
      positions[i * 3 + 2] = point.z;
    });
    return positions;
  }, [cityPoints]);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const globeColor = phase >= 3 ? '#00d4aa' : '#ff6644';
  const atmosphereColor = phase >= 3 ? '#00ff88' : '#ff8866';

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <group>
        {/* Main globe */}
        <mesh ref={globeRef}>
          <sphereGeometry args={[2, 64, 64]} />
          <meshStandardMaterial
            color={phase >= 3 ? '#1a4a3a' : '#3a2a1a'}
            metalness={0.3}
            roughness={0.7}
            wireframe={phase === 1 || phase === 2}
          />
        </mesh>

        {/* Atmosphere glow */}
        <mesh ref={atmosphereRef} scale={1.15}>
          <sphereGeometry args={[2, 32, 32]} />
          <meshBasicMaterial
            color={atmosphereColor}
            transparent
            opacity={0.15}
            side={THREE.BackSide}
          />
        </mesh>

        {/* City points */}
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={cityPoints.length}
              array={pointsPositions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.15}
            color={globeColor}
            transparent
            opacity={0.9}
            sizeAttenuation
          />
        </points>

        {/* Connection lines between cities */}
        {phase >= 2 && cityPoints.slice(0, 5).map((point, i) => {
          const nextPoint = cityPoints[(i + 1) % 5];
          const curve = new THREE.QuadraticBezierCurve3(
            point,
            new THREE.Vector3(
              (point.x + nextPoint.x) / 2,
              (point.y + nextPoint.y) / 2 + 1,
              (point.z + nextPoint.z) / 2
            ),
            nextPoint
          );
          const curvePoints = curve.getPoints(20);
          const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
          
          return (
            <line key={i} geometry={geometry}>
              <lineBasicMaterial 
                color="#00d4ff" 
                transparent 
                opacity={0.5} 
              />
            </line>
          );
        })}

        {/* Orbiting ring */}
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[2.8, 0.02, 16, 100]} />
          <meshBasicMaterial color={globeColor} transparent opacity={0.5} />
        </mesh>
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[3, 0.015, 16, 100]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

// Data particles around globe
function DataParticles({ phase }: { phase: number }) {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 500;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 3 + Math.random() * 2;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return pos;
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
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={phase >= 3 ? '#00d4aa' : '#ff8844'}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function GlobeContent({ phase }: { phase: number }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00d4ff" />
      
      <Stars radius={50} depth={50} count={3000} factor={3} fade speed={1} />
      
      <Globe phase={phase} />
      <DataParticles phase={phase} />
    </>
  );
}

interface GlobalVisualizationProps {
  phase: number;
  className?: string;
}

export default function GlobalVisualization({ phase, className = '' }: GlobalVisualizationProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        <GlobeContent phase={phase} />
        <OrbitControls 
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
}
