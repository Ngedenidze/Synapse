"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

interface BackgroundSpheresProps {
  isDark: boolean;
}
function CameraAspectUpdater() {
  const { camera, size } = useThree();

  useEffect(() => {
    if ((camera as THREE.PerspectiveCamera).isPerspectiveCamera) {
      (camera as THREE.PerspectiveCamera).aspect = size.width / size.height;
      camera.updateProjectionMatrix();
    }
  }, [camera, size]);

  return null; // no render output
}


export default function BackgroundSpheres({ isDark }: BackgroundSpheresProps) {
  // Colors based on theme
const colorA = isDark ? new THREE.Color("#c9f6ff") : new THREE.Color("#a390fa");
const colorB = isDark ? new THREE.Color("#fff3ea") : new THREE.Color("#5eead4");

  // Cluster centers
  const center1: [number, number, number] = [-10, 8, -2];
  const center2: [number, number, number] = [10, -5, 5];
return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
      resize={{ scroll: false, debounce: { scroll: 50, resize: 50 } }}
      gl={{ alpha: true }}
      camera={{ position: [0, 1, 20], fov: 60 }}
    >
      <CameraAspectUpdater />
      <ambientLight intensity={0.5} />
      <pointLight position={[-10, 10, 20]} intensity={12} color={colorA} />
      <pointLight position={[0, -10, 10]} intensity={0.8} color={colorB} />

      <SphereCluster
        count={600}
        center={center1}
        radius={8}
        colorA={colorA}
        colorB={colorB}
      />

      <SphereCluster
        count={400}
        center={center2}
        radius={6}
        colorA={colorB}
        colorB={colorA}
      />

      <MovingSpheres
        count={100}
        start={center1}
        end={center2}
        colorA={colorA}
        colorB={colorB}
      />
    </Canvas>
  );
}


interface SphereClusterProps {
  count: number;
  center: [number, number, number];
  radius: number;
  colorA: THREE.Color;
  colorB: THREE.Color;
}

function SphereCluster({ count, center, radius, colorA, colorB }: SphereClusterProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const items = useMemo(() => {
    const arr: { position: THREE.Vector3; scale: number }[] = [];
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const x = center[0] + radius * Math.sin(phi) * Math.cos(theta);
      const y = center[1] + radius * Math.sin(phi) * Math.sin(theta);
      const z = center[2] + radius * Math.cos(phi);
      arr.push({ position: new THREE.Vector3(x, y, z), scale: 0.01 + Math.random() * 0.05 });
    }
    return arr;
  }, [count, center, radius]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    items.forEach((item, idx) => {
      const scale = item.scale + Math.sin(time * 2 + idx) * 0.05;
      dummy.position.copy(item.position);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(idx, dummy.matrix);

      const t = (Math.sin(time + idx) + 1) / 2;
      meshRef.current.setColorAt(idx, new THREE.Color().lerpColors(colorA, colorB, t));
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.instanceColor!.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      castShadow={false}
      receiveShadow={false}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        vertexColors
        toneMapped={false}
        emissiveIntensity={1}
        emissive={new THREE.Color(0xffffff)}
        transparent
        opacity={0.2}
      />
    </instancedMesh>
  );
}

interface MovingSpheresProps {
  count: number;
  start: [number, number, number];
  end: [number, number, number];
  colorA: THREE.Color;
  colorB: THREE.Color;
}

function MovingSpheres({ count, start, end, colorA, colorB }: MovingSpheresProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Precompute vectors
  const startVec = useMemo(() => new THREE.Vector3(...start), [start]);
  const endVec = useMemo(() => new THREE.Vector3(...end), [end]);
  const direction = useMemo(() => endVec.clone().sub(startVec), [startVec, endVec]);
  const length = direction.length();
  const unitDirection = direction.clone().normalize();

  // Find two vectors perpendicular to the direction for the spiral plane
  const arbitraryVec = new THREE.Vector3(0, 1, 0);
  if (Math.abs(unitDirection.dot(arbitraryVec)) > 0.99) {
    arbitraryVec.set(1, 0, 0); // If parallel, pick another vector
  }
  const axis1 = new THREE.Vector3().crossVectors(unitDirection, arbitraryVec).normalize();
  const axis2 = new THREE.Vector3().crossVectors(unitDirection, axis1).normalize();

  // Each sphere gets random offset and phase
  const items = useMemo(() => {
    const arr: { offset: number; phase: number; scale: number }[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        offset: Math.random(),
        phase: Math.random() * Math.PI * 1,
        scale: 0.05 + Math.random() * 0.05,
      });
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    items.forEach((item, idx) => {
      // Move forward/backwards along line (ping-pong)
      const progress = (item.offset + (time * 0.03)) % 2;
      const posFactor = progress <= 1 ? progress : 2 - progress;

      // Base position along main line
      const basePos = startVec.clone().add(unitDirection.clone().multiplyScalar(posFactor * length));

      // Spiral parameters
      const spiralRadius = 1; // Radius of spiral
      const spiralFrequency = 1; // How many rotations per unit progress

      // Angle for spiral rotation based on progress and phase offset
      const angle = posFactor * spiralFrequency * Math.PI * 3 + item.phase;

      // Offset vector in the spiral plane
      const spiralOffset = axis1.clone().multiplyScalar(Math.cos(angle) * spiralRadius)
        .add(axis2.clone().multiplyScalar(Math.sin(angle) * spiralRadius));

      // Final position = base + spiral offset
      const finalPos = basePos.add(spiralOffset);

      // Scale pulse
      const scale = item.scale + Math.sin(time * 3 + item.phase) * 0.02;

      dummy.position.copy(finalPos);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(idx, dummy.matrix);

      // Color lerp based on pulse
      const t = (Math.sin(time * 3 + item.phase) + 1) / 2;
      meshRef.current.setColorAt(idx, new THREE.Color().lerpColors(colorA, colorB, t));
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.instanceColor!.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      castShadow={false}
      receiveShadow={false}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        vertexColors
        toneMapped={false}
        emissiveIntensity={0.2}
        emissive={new THREE.Color(0xFFFFFF)}
        transparent
        opacity={0.3}
      />
    </instancedMesh>
  );
}
