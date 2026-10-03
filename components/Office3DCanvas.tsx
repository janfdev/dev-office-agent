'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import type { SquadMember, AgentRole } from '@/types/agent';

interface Office3DCanvasProps {
  squad: SquadMember[];
  activeHandshake?: {
    from: AgentRole;
    to: AgentRole;
    label: string;
  };
}

// 3D Workstation with Desk, Chair, Correctly-Faced Laptop, Coffee Cup, and Expressive Human Character
function Workstation3D({ member }: { member: SquadMember }) {
  const [x, y, z] = member.position3D;
  const isWorking = member.state === 'WORKING' || member.state === 'TESTING';
  const isThinking = member.state === 'THINKING';
  const isError = member.state === 'ERROR';
  const isIdle = member.state === 'IDLE';

  // Refs for zero-rerender procedural 60fps animations
  const leftHandRef = useRef<THREE.Mesh>(null);
  const rightHandRef = useRef<THREE.Mesh>(null);
  const coffeeArmRef = useRef<THREE.Group>(null);
  const laptopScreenRef = useRef<THREE.Mesh>(null);
  const laptopScreenLightRef = useRef<THREE.PointLight>(null);

  // Status indicator colors
  const statusColor = isError 
    ? '#f43f5e' 
    : isWorking 
    ? '#06b6d4' 
    : isThinking 
    ? '#f59e0b' 
    : '#10b981';

  // Custom clothes & outfit palette
  const suitColor = {
    pm: '#0284c7',       // Navy Blazer
    backend: '#059669',  // Tech Emerald Hoodie
    frontend: '#db2777', // Rose Coral Jacket
    qa: '#7c3aed',       // Violet Lab Vest
  }[member.role];

  // Specific role laptop screen colors
  const roleScreenGlow = {
    pm: '#38bdf8',       // Specs & Project Blueprint
    backend: '#10b981',  // Terminal & Database Matrix
    frontend: '#f43f5e', // UI Component Canvas
    qa: '#a855f7',       // Playwright Runner Purple
  }[member.role];

  // Procedural Animation Loop: Typing on Laptop when WORKING, Sipping Coffee when IDLE
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (isWorking) {
      // 1. ACTIVE WORKING: Hands over keyboard typing
      const typingSpeed = 16;
      if (leftHandRef.current && rightHandRef.current) {
        leftHandRef.current.position.y = 0.15 + Math.sin(time * typingSpeed) * 0.025;
        leftHandRef.current.position.z = 0.28 + Math.cos(time * typingSpeed * 0.5) * 0.015;
        rightHandRef.current.position.y = 0.15 + Math.cos(time * typingSpeed + 1.5) * 0.025;
        rightHandRef.current.position.z = 0.28 + Math.sin(time * typingSpeed * 0.5) * 0.015;
      }
      // Laptop Screen Glowing Pulsing with Active Code Execution
      if (laptopScreenRef.current && laptopScreenLightRef.current) {
        const pulse = 0.9 + Math.sin(time * 8) * 0.25;
        (laptopScreenRef.current.material as THREE.MeshBasicMaterial).color.set(roleScreenGlow);
        laptopScreenLightRef.current.intensity = pulse * 1.5;
      }
      // Rest coffee cup on the desk
      if (coffeeArmRef.current) {
        coffeeArmRef.current.position.set(0.48, 0.49, 0.15);
        coffeeArmRef.current.rotation.set(0, 0, 0);
      }
    } else if (isIdle) {
      // 2. IDLE: Relaxing, Hands relaxed, Sipping Coffee Mug periodically
      if (leftHandRef.current && rightHandRef.current) {
        leftHandRef.current.position.set(-0.24, 0.08, 0.1);
        rightHandRef.current.position.set(0.24, 0.08, 0.1);
      }
      // Laptop Screen Dimmed / Sleep mode
      if (laptopScreenRef.current && laptopScreenLightRef.current) {
        (laptopScreenRef.current.material as THREE.MeshBasicMaterial).color.set('#1e293b');
        laptopScreenLightRef.current.intensity = 0.08;
      }
      // Gentle rhythmic coffee sipping motion (every 4 seconds)
      if (coffeeArmRef.current) {
        const sipCycle = Math.sin(time * 1.8);
        if (sipCycle > 0.3) {
          // Bring cup near the face
          const lift = (sipCycle - 0.3) * 0.45;
          coffeeArmRef.current.position.set(0.18, 0.82 + lift * 0.2, -0.32);
          coffeeArmRef.current.rotation.set(-0.35, 0.2, -0.2);
        } else {
          // Rest cup calmly on the side of desk
          coffeeArmRef.current.position.set(0.48, 0.49, 0.15);
          coffeeArmRef.current.rotation.set(0, 0, 0);
        }
      }
    } else {
      // THINKING / PLANNING: Hand on chin
      if (leftHandRef.current && rightHandRef.current) {
        leftHandRef.current.position.set(-0.2, 0.12, 0.1);
        rightHandRef.current.position.set(0.12, 0.52, -0.2);
      }
      if (coffeeArmRef.current) {
        coffeeArmRef.current.position.set(0.48, 0.49, 0.15);
        coffeeArmRef.current.rotation.set(0, 0, 0);
      }
    }
  });

  return (
    <group position={[x, y, z]}>
      {/* 1. Office Desk */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.08, 0.9]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Desk Metal Legs */}
      <mesh position={[-0.65, 0.22, -0.35]}>
        <cylinderGeometry args={[0.03, 0.03, 0.44]} />
        <meshStandardMaterial color="#64748b" metalness={0.8} />
      </mesh>
      <mesh position={[0.65, 0.22, -0.35]}>
        <cylinderGeometry args={[0.03, 0.03, 0.44]} />
        <meshStandardMaterial color="#64748b" metalness={0.8} />
      </mesh>
      <mesh position={[-0.65, 0.22, 0.35]}>
        <cylinderGeometry args={[0.03, 0.03, 0.44]} />
        <meshStandardMaterial color="#64748b" metalness={0.8} />
      </mesh>
      <mesh position={[0.65, 0.22, 0.35]}>
        <cylinderGeometry args={[0.03, 0.03, 0.44]} />
        <meshStandardMaterial color="#64748b" metalness={0.8} />
      </mesh>

      {/* 2. Sleek 3D Laptop Facing Character */}
      <group position={[0, 0.49, -0.08]}>
        {/* Laptop Base & Keyboard */}
        <mesh position={[0, 0.01, -0.1]}>
          <boxGeometry args={[0.44, 0.015, 0.26]} />
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Trackpad */}
        <mesh position={[0, 0.018, -0.18]}>
          <boxGeometry args={[0.13, 0.002, 0.065]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        {/* Keyboard keys area */}
        <mesh position={[0, 0.018, -0.09]}>
          <boxGeometry args={[0.38, 0.002, 0.10]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>

        {/* Laptop Screen (Hinge at z = 0.03, Screen tilts back towards +z) */}
        <group position={[0, 0.02, 0.03]} rotation={[0.32, 0, 0]}>
          {/* Outer Lid */}
          <mesh position={[0, 0.14, 0.006]}>
            <boxGeometry args={[0.44, 0.28, 0.012]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Display Matrix facing character */}
          <mesh ref={laptopScreenRef} position={[0, 0.14, -0.001]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[0.41, 0.25]} />
            <meshBasicMaterial color={isWorking ? roleScreenGlow : '#0f172a'} />
          </mesh>
          {/* Screen Light illuminating Agent face */}
          <pointLight
            ref={laptopScreenLightRef}
            position={[0, 0.15, -0.2]}
            color={roleScreenGlow}
            intensity={isWorking ? 1.8 : 0.1}
            distance={1.4}
          />
        </group>
      </group>

      {/* 3. Steaming Coffee Mug (Interactive Coffee Break / Sipping Animation) */}
      <group ref={coffeeArmRef} position={[0.48, 0.49, 0.15]}>
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.05, 0.042, 0.1, 16]} />
          <meshStandardMaterial color={isIdle ? '#f59e0b' : '#94a3b8'} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.105, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.005, 16]} />
          <meshStandardMaterial color="#3f271d" roughness={0.1} />
        </mesh>
        <mesh position={[0.06, 0.06, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.026, 0.008, 8, 16]} />
          <meshStandardMaterial color="#cbd5e1" />
        </mesh>
        {isIdle && (
          <group position={[0, 0.16, 0]}>
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.022, 8, 8]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.45} />
            </mesh>
            <mesh position={[0.01, 0.03, 0]}>
              <sphereGeometry args={[0.016, 8, 8]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
            </mesh>
          </group>
        )}
      </group>

      {/* 4. Ergonomic Office Chair */}
      <mesh position={[0, 0.35, -0.45]}>
        <boxGeometry args={[0.5, 0.06, 0.5]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <mesh position={[0, 0.65, -0.68]}>
        <boxGeometry args={[0.48, 0.55, 0.06]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <mesh position={[0, 0.18, -0.45]}>
        <cylinderGeometry args={[0.04, 0.04, 0.35]} />
        <meshStandardMaterial color="#475569" metalness={0.9} />
      </mesh>

      {/* 5. Expressive 3D Human Character with Prominent Big Eyes, Pupils, Brows, Smile */}
      <group position={[0, 0.55, -0.42]}>
        {/* Torso */}
        <mesh position={[0, 0.25, 0]} rotation={[isWorking ? 0.12 : -0.05, 0, 0]}>
          <boxGeometry args={[0.42, 0.45, 0.28]} />
          <meshStandardMaterial color={suitColor} roughness={0.6} />
        </mesh>

        {/* Head & Human Face */}
        <group position={[0, 0.62, isWorking ? 0.05 : 0]}>
          {/* Head Sphere */}
          <mesh>
            <sphereGeometry args={[0.20, 24, 24]} />
            <meshStandardMaterial color="#fed7aa" roughness={0.35} />
          </mesh>

          {/* LARGE ANIME/STYLIZED EYES (Z = +0.19, clearly protruding and visible) */}
          {/* Left Eye */}
          <group position={[-0.07, 0.04, 0.19]}>
            {/* Sclera (White base) */}
            <mesh>
              <sphereGeometry args={[0.048, 16, 16]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            {/* Iris (Colored circle) */}
            <mesh position={[0, 0, 0.032]}>
              <sphereGeometry args={[0.03, 14, 14]} />
              <meshBasicMaterial color="#0f172a" />
            </mesh>
            {/* Cute Sparkle 1 */}
            <mesh position={[0.012, 0.012, 0.05]}>
              <sphereGeometry args={[0.012, 8, 8]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            {/* Cute Sparkle 2 */}
            <mesh position={[-0.01, -0.01, 0.05]}>
              <sphereGeometry args={[0.006, 8, 8]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            {/* Dark Eyebrow */}
            <mesh position={[0, 0.065, 0.01]} rotation={[0, 0, -0.1]}>
              <boxGeometry args={[0.08, 0.02, 0.025]} />
              <meshBasicMaterial color="#1e293b" />
            </mesh>
          </group>

          {/* Right Eye */}
          <group position={[0.07, 0.04, 0.19]}>
            {/* Sclera (White base) */}
            <mesh>
              <sphereGeometry args={[0.048, 16, 16]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            {/* Iris (Colored circle) */}
            <mesh position={[0, 0, 0.032]}>
              <sphereGeometry args={[0.03, 14, 14]} />
              <meshBasicMaterial color="#0f172a" />
            </mesh>
            {/* Cute Sparkle 1 */}
            <mesh position={[0.012, 0.012, 0.05]}>
              <sphereGeometry args={[0.012, 8, 8]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            {/* Cute Sparkle 2 */}
            <mesh position={[-0.01, -0.01, 0.05]}>
              <sphereGeometry args={[0.006, 8, 8]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            {/* Dark Eyebrow */}
            <mesh position={[0, 0.065, 0.01]} rotation={[0, 0, 0.1]}>
              <boxGeometry args={[0.08, 0.02, 0.025]} />
              <meshBasicMaterial color="#1e293b" />
            </mesh>
          </group>

          {/* Cute Nose */}
          <mesh position={[0, -0.02, 0.21]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.025, 0.045, 10]} />
            <meshStandardMaterial color="#fca5a5" roughness={0.4} />
          </mesh>

          {/* Cheerful Mouth / Smile */}
          <mesh position={[0, -0.08, 0.19]} rotation={[0, 0, 0]}>
            <torusGeometry args={[0.045, 0.01, 8, 16, Math.PI * 0.75]} />
            <meshBasicMaterial color="#e11d48" />
          </mesh>

          {/* Pink Cheeks Blush */}
          <mesh position={[-0.12, -0.03, 0.165]}>
            <sphereGeometry args={[0.04, 10, 10]} />
            <meshBasicMaterial color="#f472b6" transparent opacity={0.5} />
          </mesh>
          <mesh position={[0.12, -0.03, 0.165]}>
            <sphereGeometry args={[0.04, 10, 10]} />
            <meshBasicMaterial color="#f472b6" transparent opacity={0.5} />
          </mesh>

          {/* Hair & Accessories */}
          {member.role === 'qa' ? (
            // QA Headset
            <group position={[0, 0.04, 0]}>
              <mesh>
                <torusGeometry args={[0.22, 0.035, 10, 24, Math.PI]} />
                <meshStandardMaterial color="#c084fc" metalness={0.7} />
              </mesh>
              {/* Ear cushions */}
              <mesh position={[-0.21, 0, 0]}>
                <sphereGeometry args={[0.065, 14, 14]} />
                <meshStandardMaterial color="#7c3aed" roughness={0.3} />
              </mesh>
              <mesh position={[0.21, 0, 0]}>
                <sphereGeometry args={[0.065, 14, 14]} />
                <meshStandardMaterial color="#7c3aed" roughness={0.3} />
              </mesh>
              {/* Hair */}
              <mesh position={[0, 0.13, -0.02]}>
                <sphereGeometry args={[0.19, 16, 16]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>
            </group>
          ) : member.role === 'frontend' ? (
            // Frontend Stylish Hair & Glasses
            <group position={[0, 0.06, 0]}>
              <mesh position={[0, 0.1, -0.02]}>
                <sphereGeometry args={[0.21, 18, 18]} />
                <meshStandardMaterial color="#be185d" roughness={0.4} />
              </mesh>
              {/* Glasses rim around eyes */}
              <mesh position={[0, -0.02, 0.22]}>
                <boxGeometry args={[0.28, 0.05, 0.02]} />
                <meshStandardMaterial color="#38bdf8" />
              </mesh>
            </group>
          ) : member.role === 'backend' ? (
            // Backend Hoodie
            <group position={[0, 0.08, -0.04]}>
              <mesh>
                <sphereGeometry args={[0.21, 18, 18]} />
                <meshStandardMaterial color="#047857" roughness={0.7} />
              </mesh>
            </group>
          ) : (
            // Lead PM Slick Hair
            <mesh position={[0, 0.14, -0.02]}>
              <sphereGeometry args={[0.20, 18, 18]} />
              <meshStandardMaterial color="#1e293b" roughness={0.3} />
            </mesh>
          )}
        </group>

        {/* Arms */}
        <mesh ref={leftHandRef} position={[-0.24, 0.15, 0.28]} rotation={[0.4, 0, 0]}>
          <boxGeometry args={[0.09, 0.09, 0.32]} />
          <meshStandardMaterial color={suitColor} />
        </mesh>
        <mesh ref={rightHandRef} position={[0.24, 0.15, 0.28]} rotation={[0.4, 0, 0]}>
          <boxGeometry args={[0.09, 0.09, 0.32]} />
          <meshStandardMaterial color={suitColor} />
        </mesh>

        {/* Status Point Light above character */}
        <pointLight position={[0, 1.1, 0]} color={statusColor} intensity={2.2} distance={2.5} />
      </group>

      {/* 6. 3D Floating Name & Live Behavior Tag (HTML Overlay) */}
      <Html position={[0, 1.75, 0]} center distanceFactor={8}>
        <div className="flex flex-col items-center pointer-events-none select-none">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/90 border border-border shadow-xl backdrop-blur-md">
            <span
              className={`size-2 rounded-full ${
                isWorking ? 'animate-ping' : ''
              }`}
              style={{ backgroundColor: statusColor }}
            />
            <span className="text-[11px] font-bold text-slate-100 whitespace-nowrap">
              {member.name}
            </span>
            <span className="text-[9px] font-mono uppercase text-cyan-400 border-l border-slate-700 pl-1.5">
              {isWorking ? '💻 TYPING' : isIdle ? '☕ COFFEE' : member.state}
            </span>
          </div>
          <div className="text-[9px] text-slate-400 font-mono bg-slate-900/80 px-2 py-0.5 rounded-md mt-1 border border-slate-800">
            {isWorking ? `Job: ${member.currentTask || 'Executing code'}` : 'Taking coffee break'}
          </div>
        </div>
      </Html>
    </group>
  );
}

// Data Transmission Beam between two agents in 3D
function HandshakeBeam({ from, to }: { from: [number, number, number]; to: [number, number, number] }) {
  const points = React.useMemo(() => {
    const start = new THREE.Vector3(from[0], from[1] + 1.2, from[2]);
    const end = new THREE.Vector3(to[0], to[1] + 1.2, to[2]);
    const mid = new THREE.Vector3(
      (start.x + end.x) / 2,
      Math.max(start.y, end.y) + 1.2,
      (start.z + end.z) / 2
    );
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    return curve.getPoints(30);
  }, [from, to]);

  const geometry = React.useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  return (
    <group>
      {/* @ts-ignore */}
      <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0x06b6d4, linewidth: 3 }))} />
    </group>
  );
}

export default function Office3DCanvas({ squad, activeHandshake }: Office3DCanvasProps) {
  const fromMember = activeHandshake ? squad.find(m => m.role === activeHandshake.from) : null;
  const toMember = activeHandshake ? squad.find(m => m.role === activeHandshake.to) : null;

  return (
    <div className="w-full h-[420px] sm:h-[480px] rounded-2xl overflow-hidden bg-slate-950 border border-cyan-950/40 relative shadow-2xl">
      {/* Header Overlay */}
      <div className="absolute top-3 left-4 z-10 flex items-center gap-2 pointer-events-none">
        <span className="size-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase">
          3D VIRTUAL SQUAD OFFICE
        </span>
      </div>

      <div className="absolute top-3 right-4 z-10 text-[10px] font-mono text-muted-foreground pointer-events-none bg-slate-900/80 px-2 py-1 rounded-md border border-slate-800">
        🖱️ Drag / Scroll to Rotate View
      </div>

      <Canvas
        camera={{ position: [5, 5.5, 6], fov: 42 }}
        shadows
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <color attach="background" args={['#070b14']} />
        
        {/* Ambient & Directional Office Lighting */}
        <ambientLight intensity={0.9} />
        <directionalLight
          position={[6, 9, 5]}
          intensity={1.6}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[0, 4, 0]} intensity={1.2} color="#38bdf8" distance={10} />

        {/* 3D Office Floor with Grid lines */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[12, 12]} />
          <meshStandardMaterial color="#090d16" roughness={0.4} metalness={0.1} />
        </mesh>
        <gridHelper args={[12, 24, 0x083344, 0x111c2e]} position={[0, 0.01, 0]} />

        {/* Office Mini Server Rack in Corner */}
        <mesh position={[-3.8, 1, -3.8]} castShadow>
          <boxGeometry args={[0.9, 2.0, 0.7]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
        </mesh>
        <pointLight position={[-3.8, 1.2, -3.4]} color="#10b981" intensity={2} distance={3} />

        {/* The 4 Workstations */}
        {squad.map((member) => (
          <Workstation3D key={member.role} member={member} />
        ))}

        {/* 3D Handshake Laser Beam when collaborating */}
        {fromMember && toMember && (
          <HandshakeBeam
            from={fromMember.position3D}
            to={toMember.position3D}
          />
        )}

        {/* Smooth Orbit Camera Controls */}
        <OrbitControls
          enablePan={false}
          minDistance={4}
          maxDistance={12}
          maxPolarAngle={Math.PI / 2.1} // Prevent going below floor
        />
      </Canvas>
    </div>
  );
}
