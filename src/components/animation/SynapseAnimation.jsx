// src/components/SynapseAnimation.jsx

'use client';

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useMemo, useCallback } from "react";
import * as THREE from "three";
import { Html } from '@react-three/drei';

// Brand colors
const COLORS = ["#39FF14", "#FF6700", "#8F8F8F"];

// Helper: random position in a sphere for organic layout
function randomSpherePoint(radius = 1.5) {
  const u = Math.random(), v = Math.random();
  const theta = 2 * Math.PI * u, phi = Math.acos(2 * v - 1);
  return [
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.sin(phi) * Math.sin(theta),
    radius * Math.cos(phi)
  ];
}

// Node component
function Node({
  node,
  pos,
  color,
  hovered,
  setHovered,
  onClick,
  index
}) {
  const ref = useRef();
  const [localHover, setLocalHover] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const scale = 1 + (localHover ? 0.4 : 0.18 * Math.sin(t * 2 + index));
    ref.current.scale.setScalar(scale);
    ref.current.material.emissiveIntensity = localHover ? 2.8 : 1.1;
  });

  return (
    <group>
      <mesh
        ref={ref}
        position={pos}
        onPointerOver={e => {
          e.stopPropagation();
          setHovered(node.id);
          setLocalHover(true);
        }}
        onPointerOut={e => {
          e.stopPropagation();
          setHovered(null);
          setLocalHover(false);
        }}
        onClick={e => {
          e.stopPropagation();
          onClick(node.id);
        }}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[0.19, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} transparent />
      </mesh>
      {hovered === node.id && (
        <Html position={[pos.x, pos.y + 0.28, pos.z]}>
          <div
            style={{
              padding: "3px 10px",
              borderRadius: "10px",
              background: "rgba(30,40,40,0.87)",
              color: "#fff",
              fontWeight: 600,
              fontSize: 13,
              boxShadow: "0 2px 8px rgba(0,0,0,0.24)",
              pointerEvents: "none",
              whiteSpace: "nowrap",
            }}
          >
            {node.label || `Node ${node.id + 1}`}
          </div>
        </Html>
      )}
    </group>
  );
}

// Glowing connection
function Connection({ start, end, color, pulseColor, pulseSpeed = 1 }) {
  const ref = useRef();
  const pulseRef = useRef();

  const diff = useMemo(
    () => new THREE.Vector3().subVectors(end, start),
    [start, end]
  );
  const length = diff.length();
  const mid = useMemo(
    () => new THREE.Vector3().addVectors(start, diff.clone().multiplyScalar(0.5)),
    [start, diff]
  );
  const orientation = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), diff.clone().normalize());
    return q;
  }, [diff]);

  useFrame(({ clock }) => {
    if (!pulseRef.current) return;
    const t = (clock.getElapsedTime() * pulseSpeed) % 1;
    pulseRef.current.position.lerpVectors(start, end, t);
  });

  return (
    <group>
      <mesh ref={ref} position={mid} quaternion={orientation}>
        <cylinderGeometry args={[0.045, 0.045, length, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.4}
          opacity={0.74}
          transparent
        />
      </mesh>
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial
          color={pulseColor}
          emissive={pulseColor}
          emissiveIntensity={2.2}
        />
      </mesh>
    </group>
  );
}

// SCENE component -- all Canvas/Three logic goes here!
function Scene({
  nodes,
  connections,
  handleNodeClick,
  hovered,
  setHovered,
  mouse,
}) {
  // For mouse parallax, need to track animated positions
  const animatedPositions = useMemo(() => nodes.map(() => new THREE.Vector3()), [nodes.length]);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    nodes.forEach((node, i) => {
      const phase = node.phase;
      const mouseEffect = 0.28;
      animatedPositions[i].set(
        node.base[0] + Math.sin(t * 0.7 + phase) * 0.16 + mouse.current.x * mouseEffect,
        node.base[1] + Math.cos(t * 0.9 + phase) * 0.18 + mouse.current.y * mouseEffect,
        node.base[2] + Math.sin(t * 0.55 + phase) * 0.09
      );
    });
  });

  // Map node ids to animated positions for connections
  const nodeIdToPos = useMemo(() => {
    const map = {};
    nodes.forEach((_, i) => {
      map[nodes[i].id] = animatedPositions[i];
    });
    return map;
  }, [nodes, animatedPositions]);

  return (
    <>
      <ambientLight intensity={0.78} />
      <pointLight position={[8, 10, 8]} intensity={2.7} color="#fff" />
      {connections.map((conn, i) => {
        const start = nodeIdToPos[conn.from];
        const end = nodeIdToPos[conn.to];
        if (!start || !end) return null;
        return (
          <Connection
            key={i}
            start={start}
            end={end}
            color={conn.color}
            pulseColor={conn.pulseColor}
            pulseSpeed={1 + (i % 4) * 0.13}
          />
        );
      })}
      {nodes.map((node, i) => (
        <Node
          key={node.id}
          node={node}
          pos={animatedPositions[i]}
          color={node.color}
          hovered={hovered}
          setHovered={setHovered}
          index={i}
          onClick={handleNodeClick}
        />
      ))}
    </>
  );
}

export default function SynapseAnimation() {
  const [nodes, setNodes] = useState(() =>
    Array.from({ length: 4 }, (_, i) => ({
      id: i,
      base: randomSpherePoint(1.25 + 0.7 * Math.random()),
      color: COLORS[i % COLORS.length],
      label: ["Business", "AI", "Cloud", "Clients"][i] || `Node ${i + 1}`,
      phase: Math.random() * Math.PI * 2,
    }))
  );
  const [connections, setConnections] = useState(() =>
    Array.from({ length: 4 }, (_, i) =>
      Array.from({ length: 4 - i - 1 }, (_, j) => ({
        from: i,
        to: i + j + 1,
        color: COLORS[i % COLORS.length],
        pulseColor: COLORS[(i + 1) % COLORS.length],
      }))
    ).flat()
  );
  const [hovered, setHovered] = useState(null);
  const mouse = useRef(new THREE.Vector2(0, 0));

  const handlePointerMove = useCallback((e) => {
    // Canvas relative coords!
    const rect = e.target.getBoundingClientRect();
    mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  }, []);

  const handleNodeClick = (id) => {
    const nextId = nodes.length;
    const fromNode = nodes.find(n => n.id === id);
    const newBase = [
      fromNode.base[0] + (Math.random() - 0.5) * 1.1,
      fromNode.base[1] + (Math.random() - 0.5) * 1.1,
      fromNode.base[2] + (Math.random() - 0.5) * 1.1,
    ];
    setNodes(prev => [
      ...prev,
      {
        id: nextId,
        base: newBase,
        color: COLORS[nextId % COLORS.length],
        label: `Node ${nextId + 1}`,
        phase: Math.random() * Math.PI * 2,
      },
    ]);
    setConnections(prev => [
      ...prev,
      { from: id, to: nextId, color: COLORS[nextId % COLORS.length], pulseColor: COLORS[id % COLORS.length] }
    ]);
  };

  return (
    <div style={{ width: "100%", height: "100%", minHeight: 420 }} onPointerMove={handlePointerMove}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Scene
          nodes={nodes}
          connections={connections}
          handleNodeClick={handleNodeClick}
          hovered={hovered}
          setHovered={setHovered}
          mouse={mouse}
        />
      </Canvas>
    </div>
  );
}
