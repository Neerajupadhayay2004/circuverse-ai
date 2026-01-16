import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Enhanced Growing Tree with Leaves
export function EnhancedTree({ position, phase, delay = 0 }: { 
  position: [number, number, number]; 
  phase: number;
  delay?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const leavesRef = useRef<THREE.Group>(null);
  
  const growthProgress = phase >= 3 ? Math.min(1, (phase - 2.5) * 2) : 0;
  const scale = 0.1 + growthProgress * 0.9;
  
  useFrame((state) => {
    if (leavesRef.current && phase >= 3) {
      leavesRef.current.rotation.y = state.clock.elapsedTime * 0.3 + delay;
      // Subtle breathing animation
      const breathe = 1 + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.05;
      leavesRef.current.scale.setScalar(breathe);
    }
  });
  
  const groupScale = scale;
  
  if (phase < 2) return null;
  
  return (
    <group position={position} scale={[groupScale, groupScale, groupScale]}>
      {/* Tree Trunk */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 1, 8]} />
        <meshStandardMaterial color="#5D4037" roughness={0.9} />
      </mesh>
      
      {/* Layered Leaves */}
      <group ref={leavesRef}>
        <mesh position={[0, 1.2, 0]}>
          <coneGeometry args={[0.6, 0.8, 8]} />
          <meshStandardMaterial color="#2E7D32" roughness={0.7} />
        </mesh>
        <mesh position={[0, 1.6, 0]}>
          <coneGeometry args={[0.45, 0.6, 8]} />
          <meshStandardMaterial color="#43A047" roughness={0.7} />
        </mesh>
        <mesh position={[0, 1.9, 0]}>
          <coneGeometry args={[0.3, 0.4, 8]} />
          <meshStandardMaterial color="#66BB6A" roughness={0.7} />
        </mesh>
      </group>
      
      {phase >= 3 && (
        <Sparkles
          count={20}
          scale={1.5}
          size={2}
          speed={0.3}
          color="#00ff88"
          position={[0, 1.5, 0]}
        />
      )}
    </group>
  );
}

// Solar Panel with Animation
export function EnhancedSolarPanel({ position, phase, rotation = 0 }: { 
  position: [number, number, number]; 
  phase: number;
  rotation?: number;
}) {
  const panelRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  const deployProgress = phase >= 3 ? Math.min(1, (phase - 2) * 1.5) : 0;
  
  useFrame((state) => {
    if (panelRef.current && phase >= 3) {
      // Track sun position (simulate)
      const sunAngle = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
      panelRef.current.rotation.x = -Math.PI / 6 + sunAngle;
    }
    if (glowRef.current && phase >= 4) {
      const pulse = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.3;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = pulse;
    }
  });
  
  if (phase < 2) return null;
  
  return (
    <group position={position} rotation={[0, rotation, 0]} scale={[deployProgress, deployProgress, deployProgress]}>
      {/* Panel Frame */}
      <mesh rotation={[-Math.PI / 6, 0, 0]} position={[0, 0.8, 0]}>
        <boxGeometry args={[1.2, 0.05, 0.8]} />
        <meshStandardMaterial color="#1a237e" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Solar Cells Grid */}
      {[-0.4, 0, 0.4].map((x) => (
        [-0.25, 0.25].map((z) => (
          <mesh 
            key={`${x}-${z}`}
            rotation={[-Math.PI / 6, 0, 0]} 
            position={[x, 0.83, z]}
          >
            <boxGeometry args={[0.35, 0.02, 0.35]} />
            <meshStandardMaterial 
              color="#0d47a1" 
              metalness={0.95} 
              roughness={0.05}
              emissive="#00d4ff"
              emissiveIntensity={phase >= 4 ? 0.3 : 0}
            />
          </mesh>
        ))
      )).flat()}
      
      {/* Support Pole */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
        <meshStandardMaterial color="#37474f" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Energy Glow Effect */}
      {phase >= 4 && (
        <mesh ref={glowRef} rotation={[-Math.PI / 6, 0, 0]} position={[0, 0.85, 0]}>
          <planeGeometry args={[1.4, 1]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
      )}
      
      {phase >= 4 && (
        <Sparkles
          count={15}
          scale={1}
          size={1.5}
          speed={0.5}
          color="#00d4ff"
          position={[0, 1, 0]}
        />
      )}
    </group>
  );
}

// Animated Vehicle on Plastic Road
export function AnimatedVehicle({ phase, roadY = 0.05 }: { phase: number; roadY?: number }) {
  const vehicleRef = useRef<THREE.Group>(null);
  const wheelRefs = useRef<THREE.Mesh[]>([]);
  
  useFrame((state) => {
    if (vehicleRef.current && phase >= 4) {
      // Move along road
      const t = state.clock.elapsedTime * 0.8;
      const x = Math.sin(t) * 6;
      const z = Math.cos(t) * 6;
      vehicleRef.current.position.set(x, roadY + 0.2, z);
      vehicleRef.current.rotation.y = -t + Math.PI / 2;
      
      // Rotate wheels
      wheelRefs.current.forEach(wheel => {
        if (wheel) wheel.rotation.x = t * 5;
      });
    }
  });
  
  if (phase < 4) return null;
  
  return (
    <group ref={vehicleRef}>
      {/* Car Body */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.6, 0.2, 0.3]} />
        <meshStandardMaterial color="#4caf50" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Car Top */}
      <mesh position={[0.05, 0.3, 0]}>
        <boxGeometry args={[0.35, 0.15, 0.28]} />
        <meshStandardMaterial color="#66bb6a" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Wheels */}
      {[[-0.2, 0.05, 0.16], [-0.2, 0.05, -0.16], [0.2, 0.05, 0.16], [0.2, 0.05, -0.16]].map((pos, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) wheelRefs.current[i] = el; }}
          position={pos as [number, number, number]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.05, 0.05, 0.04, 12]} />
          <meshStandardMaterial color="#212121" roughness={0.8} />
        </mesh>
      ))}
      
      {/* Headlights */}
      <pointLight position={[0.35, 0.15, 0]} intensity={0.5} color="#ffeb3b" distance={2} />
    </group>
  );
}

// Second vehicle going opposite direction
export function AnimatedVehicle2({ phase, roadY = 0.05 }: { phase: number; roadY?: number }) {
  const vehicleRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (vehicleRef.current && phase >= 4) {
      const t = state.clock.elapsedTime * 0.6 + Math.PI;
      const x = Math.sin(t) * 5;
      const z = Math.cos(t) * 5;
      vehicleRef.current.position.set(x, roadY + 0.15, z);
      vehicleRef.current.rotation.y = -t + Math.PI / 2;
    }
  });
  
  if (phase < 4) return null;
  
  return (
    <group ref={vehicleRef}>
      {/* Bus Body */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.8, 0.3, 0.35]} />
        <meshStandardMaterial color="#2196f3" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Windows */}
      {[-0.25, 0, 0.25].map((x, i) => (
        <mesh key={i} position={[x, 0.25, 0.18]}>
          <boxGeometry args={[0.15, 0.12, 0.01]} />
          <meshStandardMaterial color="#e3f2fd" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

// Recycling Facility with Animation
export function RecyclingFacility({ position, phase }: { 
  position: [number, number, number]; 
  phase: number;
}) {
  const conveyorRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (conveyorRef.current && phase >= 2) {
      const offset = state.clock.elapsedTime * 0.5;
      (conveyorRef.current.material as THREE.MeshStandardMaterial).map?.offset.set(offset, 0);
    }
  });
  
  if (phase < 1) return null;
  
  const scale = phase >= 2 ? 1 : 0.5;
  
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Main Building */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[2.5, 2, 1.5]} />
        <meshStandardMaterial color="#455a64" metalness={0.6} roughness={0.4} />
      </mesh>
      
      {/* Recycling Symbol on Building */}
      <mesh position={[0, 1.2, 0.76]} rotation={[0, 0, 0]}>
        <circleGeometry args={[0.4, 32]} />
        <meshStandardMaterial color="#4caf50" emissive="#4caf50" emissiveIntensity={0.3} />
      </mesh>
      
      {/* Chimney with Green Smoke */}
      <mesh position={[0.8, 2.2, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 0.5, 8]} />
        <meshStandardMaterial color="#37474f" />
      </mesh>
      
      {/* Input Conveyor */}
      <mesh ref={conveyorRef} position={[-1.8, 0.3, 0]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[1.5, 0.1, 0.5]} />
        <meshStandardMaterial color="#616161" />
      </mesh>
      
      {/* Output Products */}
      {phase >= 3 && [
        { pos: [1.5, 0.2, 0.4] as [number, number, number], color: '#4caf50' },
        { pos: [1.7, 0.2, 0] as [number, number, number], color: '#2196f3' },
        { pos: [1.5, 0.2, -0.4] as [number, number, number], color: '#ff9800' },
      ].map((item, i) => (
        <Float key={i} speed={2} floatIntensity={0.3}>
          <mesh position={item.pos}>
            <boxGeometry args={[0.25, 0.25, 0.25]} />
            <meshStandardMaterial 
              color={item.color} 
              emissive={item.color} 
              emissiveIntensity={0.2}
            />
          </mesh>
        </Float>
      ))}
      
      {phase >= 2 && (
        <Sparkles
          count={30}
          scale={3}
          size={2}
          speed={0.5}
          color="#00ff88"
          position={[0, 2, 0]}
        />
      )}
    </group>
  );
}

// Plastic Road with Texture Effect
export function PlasticRoadEnhanced({ phase }: { phase: number }) {
  const roadRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (roadRef.current && phase >= 3) {
      // Subtle shimmer effect
      const shimmer = 0.3 + Math.sin(state.clock.elapsedTime) * 0.1;
      (roadRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = shimmer;
    }
  });
  
  if (phase < 3) return null;
  
  return (
    <group>
      {/* Main circular road */}
      <mesh ref={roadRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[4.5, 6.5, 64]} />
        <meshStandardMaterial 
          color="#1b5e20"
          metalness={0.3}
          roughness={0.7}
          emissive="#00ff88"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Road markings */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        const x = Math.cos(angle) * 5.5;
        const z = Math.sin(angle) * 5.5;
        return (
          <mesh key={i} rotation={[-Math.PI / 2, 0, angle]} position={[x, 0.03, z]}>
            <planeGeometry args={[0.4, 0.1]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        );
      })}
      
      {/* "Made from Recycled Plastic" text simulation with small markers */}
      <mesh position={[0, 0.01, 5.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2, 0.3]} />
        <meshBasicMaterial color="#4caf50" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

// Wind Turbine
export function WindTurbine({ position, phase }: { 
  position: [number, number, number]; 
  phase: number;
}) {
  const bladesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (bladesRef.current && phase >= 3) {
      bladesRef.current.rotation.z = state.clock.elapsedTime * 2;
    }
  });
  
  if (phase < 3) return null;
  
  return (
    <group position={position}>
      {/* Tower */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.1, 0.15, 3, 8]} />
        <meshStandardMaterial color="#eceff1" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Nacelle */}
      <mesh position={[0, 3.1, 0]}>
        <boxGeometry args={[0.3, 0.2, 0.4]} />
        <meshStandardMaterial color="#b0bec5" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Blades */}
      <group ref={bladesRef} position={[0, 3.1, 0.25]}>
        {[0, 120, 240].map((angle) => (
          <mesh key={angle} rotation={[0, 0, (angle * Math.PI) / 180]} position={[0, 0, 0]}>
            <boxGeometry args={[0.08, 1.2, 0.02]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        ))}
      </group>
    </group>
  );
}
