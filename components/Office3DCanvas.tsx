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

// 3D Workstation with Desk, Chair, Monitors, and Stylized 3D Character
function Workstation3D({ member }: { member: SquadMember }) {
  const [x, y, z] = member.position3D;
  const isWorking = member.state === 'WORKING' || member.state === 'TESTING';
  const isThinking = member.state === 'THINKING';
  const isError = member.state === 'ERROR';

  // State color
  const statusColor = isError 
    ? '#f43f5e' 
    : isWorking 
    ? '#06b6d4' 
    : isThinking 
    ? '#f59e0b' 
    : '#10b981';

  // Clothing color mapping
  const suitColor = {
    pm: '#0284c7',       // Navy Blazer
    backend: '#059669',  // Tech Emerald Hoodie
    frontend: '#db2777', // Rose Coral Jacket
    qa: '#7c3aed',       // Violet Lab Vest
  }[member.role];

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

      {/* 2. Dual Monitors on Desk */}
      <mesh position={[-0.3, 0.75, 0.1]} rotation={[0, 0.15, 0]}>
        <boxGeometry args={[0.55, 0.35, 0.03]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      {/* Glowing screen */}
      <mesh position={[-0.3, 0.75, 0.12]} rotation={[0, 0.15, 0]}>
        <planeGeometry args={[0.5, 0.3]} />
        <meshBasicMaterial color={statusColor} />
      </mesh>

      <mesh position={[0.3, 0.75, 0.1]} rotation={[0, -0.15, 0]}>
        <boxGeometry args={[0.55, 0.35, 0.03]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      {/* Glowing screen 2 */}
      <mesh position={[0.3, 0.75, 0.12]} rotation={[0, -0.15, 0]}>
        <planeGeometry args={[0.5, 0.3]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>

      {/* 3. Ergonomic Office Chair */}
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

      {/* 4. Stylized 3D Character Sitting on Chair */}
      <group position={[0, 0.55, -0.42]}>
        {/* Torso with Customized Outfit */}
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[0.42, 0.45, 0.28]} />
          <meshStandardMaterial color={suitColor} roughness={0.6} />
        </mesh>

        {/* Head */}
        <mesh position={[0, 0.62, 0]}>
          <sphereGeometry args={[0.18, 20, 20]} />
          <meshStandardMaterial color="#fed7aa" roughness={0.5} />
        </mesh>

        {/* Hair/Cap/Headset */}
        {member.role === 'qa' ? (
          // QA Headset
          <group position={[0, 0.64, 0]}>
            <mesh>
              <torusGeometry args={[0.19, 0.03, 10, 20, Math.PI]} />
              <meshStandardMaterial color="#c084fc" />
            </mesh>
          </group>
        ) : (
          <mesh position={[0, 0.74, -0.02]}>
            <sphereGeometry args={[0.17, 16, 16]} />
            <meshStandardMaterial color="#334155" />
          </mesh>
        )}

        {/* Arms on Desk (Typing stance) */}
        <mesh position={[-0.26, 0.15, 0.22]} rotation={[0.4, 0, 0]}>
          <boxGeometry args={[0.1, 0.1, 0.32]} />
          <meshStandardMaterial color={suitColor} />
        </mesh>
        <mesh position={[0.26, 0.15, 0.22]} rotation={[0.4, 0, 0]}>
          <boxGeometry args={[0.1, 0.1, 0.32]} />
          <meshStandardMaterial color={suitColor} />
        </mesh>

        {/* Status Point Light above character */}
        <pointLight position={[0, 1.1, 0]} color={statusColor} intensity={2.5} distance={2.5} />
      </group>

      {/* 5. 3D Floating Name & Status Badge Tag (HTML Overlay) */}
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
              {member.state}
            </span>
          </div>
          <div className="text-[9px] text-slate-400 font-mono bg-slate-900/80 px-2 py-0.5 rounded-md mt-1 border border-slate-800">
            {member.clothing}
          </div>
        </div>
      </Html>
    </group>
  );
}

// Data Transmission Beam between two agents in 3D
function HandshakeBeam({ from, to }: { from: [number, number, number]; to: [number, number, number] }) {
  const lineRef = useRef<THREE.Line>(null);

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
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[6, 9, 5]}
          intensity={1.5}
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
