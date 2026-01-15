import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Sparkles,
  Float,
  Text3D,
  Center
} from '@react-three/drei';
import * as THREE from 'three';

// Plastic Waste Scene - Bottles, bags transforming to road material
function PlasticWasteScene({ phase }: { phase: number }) {
  const bottlesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (bottlesRef.current) {
      bottlesRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  const bottles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 4,
        Math.random() * 2,
        (Math.random() - 0.5) * 4
      ] as [number, number, number],
      scale: 0.3 + Math.random() * 0.3,
      rotation: Math.random() * Math.PI
    }));
  }, []);

  return (
    <group ref={bottlesRef}>
      {bottles.map((bottle, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5}>
          <mesh position={bottle.position} rotation={[0, bottle.rotation, 0]}>
            <cylinderGeometry args={[0.1, 0.15, 0.5, 8]} />
            <meshStandardMaterial 
              color={phase >= 2 ? "#00d4aa" : "#88aaff"} 
              transparent 
              opacity={0.7}
              emissive={phase >= 2 ? "#00ff88" : "#4488ff"}
              emissiveIntensity={phase >= 2 ? 0.5 : 0.2}
            />
          </mesh>
        </Float>
      ))}
      
      {/* Transformation arrow particles */}
      {phase >= 2 && (
        <Sparkles count={100} scale={6} size={4} speed={1} color="#00ff88" />
      )}
      
      {/* Road output */}
      {phase >= 3 && (
        <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[6, 3]} />
          <meshStandardMaterial 
            color="#2a2a3a" 
            emissive="#00ff88"
            emissiveIntensity={0.2}
          />
        </mesh>
      )}
    </group>
  );
}

// E-Waste Scene - Circuit boards, phones transforming to solar panels
function EWasteScene({ phase }: { phase: number }) {
  const circuitsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (circuitsRef.current) {
      circuitsRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const circuits = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 4,
        Math.random() * 2,
        (Math.random() - 0.5) * 4
      ] as [number, number, number],
      scale: 0.5 + Math.random() * 0.5
    }));
  }, []);

  return (
    <group ref={circuitsRef}>
      {circuits.map((circuit, i) => (
        <Float key={i} speed={1.5} rotationIntensity={0.3}>
          <mesh position={circuit.position}>
            <boxGeometry args={[0.4 * circuit.scale, 0.05, 0.3 * circuit.scale]} />
            <meshStandardMaterial 
              color={phase >= 2 ? "#00d4ff" : "#226622"} 
              metalness={0.8}
              emissive={phase >= 2 ? "#00d4ff" : "#114411"}
              emissiveIntensity={0.3}
            />
          </mesh>
          {/* Circuit traces */}
          <mesh position={[circuit.position[0], circuit.position[1] + 0.03, circuit.position[2]]}>
            <boxGeometry args={[0.35 * circuit.scale, 0.01, 0.25 * circuit.scale]} />
            <meshStandardMaterial color="#ffcc00" metalness={0.9} />
          </mesh>
        </Float>
      ))}
      
      {phase >= 2 && (
        <Sparkles count={80} scale={5} size={3} speed={0.8} color="#00d4ff" />
      )}
      
      {/* Solar panel output */}
      {phase >= 3 && (
        <group position={[0, -0.5, 0]}>
          <mesh rotation={[-0.3, 0, 0]}>
            <boxGeometry args={[2, 0.1, 1.5]} />
            <meshStandardMaterial 
              color="#1a237e" 
              metalness={0.9}
              emissive="#0066ff"
              emissiveIntensity={0.4}
            />
          </mesh>
        </group>
      )}
    </group>
  );
}

// Organic Waste Scene - Food, leaves transforming to compost/biogas
function OrganicWasteScene({ phase }: { phase: number }) {
  const organicsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (organicsRef.current) {
      organicsRef.current.rotation.y = state.clock.elapsedTime * 0.25;
    }
  });

  const organics = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 4,
        Math.random() * 2,
        (Math.random() - 0.5) * 4
      ] as [number, number, number],
      type: Math.random() > 0.5 ? 'leaf' : 'food'
    }));
  }, []);

  return (
    <group ref={organicsRef}>
      {organics.map((item, i) => (
        <Float key={i} speed={2} rotationIntensity={0.4}>
          {item.type === 'leaf' ? (
            <mesh position={item.position}>
              <coneGeometry args={[0.2, 0.4, 4]} />
              <meshStandardMaterial 
                color={phase >= 2 ? "#00ff88" : "#4a6b35"} 
                emissive={phase >= 2 ? "#00ff88" : "#2a4a1a"}
                emissiveIntensity={0.3}
              />
            </mesh>
          ) : (
            <mesh position={item.position}>
              <sphereGeometry args={[0.15, 8, 8]} />
              <meshStandardMaterial 
                color={phase >= 2 ? "#88ff88" : "#8b4513"} 
                emissive={phase >= 2 ? "#00ff44" : "#5a2a0a"}
                emissiveIntensity={0.2}
              />
            </mesh>
          )}
        </Float>
      ))}
      
      {phase >= 2 && (
        <Sparkles count={120} scale={6} size={5} speed={1.2} color="#88ff44" />
      )}
      
      {/* Biogas/Compost output */}
      {phase >= 3 && (
        <group position={[0, -1, 0]}>
          <mesh>
            <cylinderGeometry args={[0.8, 1, 0.5, 16]} />
            <meshStandardMaterial 
              color="#3a2a1a" 
              emissive="#44aa22"
              emissiveIntensity={0.3}
            />
          </mesh>
          {/* Rising biogas particles */}
          <Sparkles count={50} scale={[2, 4, 2]} position={[0, 2, 0]} size={6} speed={2} color="#44ff88" />
        </group>
      )}
    </group>
  );
}

// Construction Waste Scene - Debris transforming to building blocks
function ConstructionWasteScene({ phase }: { phase: number }) {
  const debrisRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (debrisRef.current) {
      debrisRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  const debris = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 4,
        Math.random() * 2,
        (Math.random() - 0.5) * 4
      ] as [number, number, number],
      size: 0.2 + Math.random() * 0.4
    }));
  }, []);

  return (
    <group ref={debrisRef}>
      {debris.map((item, i) => (
        <Float key={i} speed={1} rotationIntensity={0.2}>
          <mesh position={item.position}>
            <boxGeometry args={[item.size, item.size * 0.6, item.size * 0.8]} />
            <meshStandardMaterial 
              color={phase >= 2 ? "#00d4aa" : "#888888"} 
              roughness={0.8}
              emissive={phase >= 2 ? "#00aa88" : "#444444"}
              emissiveIntensity={0.2}
            />
          </mesh>
        </Float>
      ))}
      
      {phase >= 2 && (
        <Sparkles count={60} scale={5} size={3} speed={0.6} color="#ffaa44" />
      )}
      
      {/* Building blocks output */}
      {phase >= 3 && (
        <group position={[0, -0.5, 0]}>
          {[[-0.5, 0, -0.5], [0.5, 0, -0.5], [-0.5, 0, 0.5], [0.5, 0, 0.5], [0, 0.6, 0]].map((pos, i) => (
            <mesh key={i} position={pos as [number, number, number]}>
              <boxGeometry args={[0.8, 0.5, 0.8]} />
              <meshStandardMaterial 
                color="#00d4aa" 
                emissive="#00ff88"
                emissiveIntensity={0.3}
              />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}

// Textile Waste Scene
function TextileWasteScene({ phase }: { phase: number }) {
  const textilesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (textilesRef.current) {
      textilesRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const textiles = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 4,
        Math.random() * 2,
        (Math.random() - 0.5) * 4
      ] as [number, number, number],
      color: ['#ff6688', '#6688ff', '#88ff66', '#ffaa44'][Math.floor(Math.random() * 4)]
    }));
  }, []);

  return (
    <group ref={textilesRef}>
      {textiles.map((item, i) => (
        <Float key={i} speed={2.5} rotationIntensity={0.6}>
          <mesh position={item.position}>
            <planeGeometry args={[0.4, 0.4]} />
            <meshStandardMaterial 
              color={phase >= 2 ? "#00d4aa" : item.color} 
              side={THREE.DoubleSide}
              emissive={phase >= 2 ? "#00ff88" : item.color}
              emissiveIntensity={0.2}
            />
          </mesh>
        </Float>
      ))}
      
      {phase >= 2 && (
        <Sparkles count={80} scale={5} size={4} speed={1} color="#ff88aa" />
      )}
      
      {/* Insulation panel output */}
      {phase >= 3 && (
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[2, 0.3, 1.5]} />
          <meshStandardMaterial 
            color="#ffcc88" 
            emissive="#ff8844"
            emissiveIntensity={0.2}
          />
        </mesh>
      )}
    </group>
  );
}

// Scene selector based on waste type
function WasteScene({ wasteType, phase }: { wasteType: string; phase: number }) {
  const type = wasteType.toLowerCase();
  
  if (type.includes('plastic')) {
    return <PlasticWasteScene phase={phase} />;
  } else if (type.includes('electronic') || type.includes('e-waste')) {
    return <EWasteScene phase={phase} />;
  } else if (type.includes('organic') || type.includes('food')) {
    return <OrganicWasteScene phase={phase} />;
  } else if (type.includes('construction') || type.includes('building')) {
    return <ConstructionWasteScene phase={phase} />;
  } else if (type.includes('textile') || type.includes('cloth')) {
    return <TextileWasteScene phase={phase} />;
  } else {
    return <PlasticWasteScene phase={phase} />;
  }
}

interface WasteTypeVisualizationProps {
  wasteType: string;
  phase: number;
}

export default function WasteTypeVisualization({ wasteType, phase }: WasteTypeVisualizationProps) {
  return (
    <Canvas camera={{ position: [5, 4, 5], fov: 50 }}>
      <color attach="background" args={['#050510']} />
      <fog attach="fog" args={['#050510', 5, 20]} />
      
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00d4aa" />
      <pointLight position={[-10, 5, -10]} intensity={0.5} color="#00d4ff" />
      
      <WasteScene wasteType={wasteType} phase={phase} />
      
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}

export { PlasticWasteScene, EWasteScene, OrganicWasteScene, ConstructionWasteScene, TextileWasteScene };
