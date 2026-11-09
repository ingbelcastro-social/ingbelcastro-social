import React, { useMemo } from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import * as THREE from "three";
import { loadFont as loadOswald } from "@remotion/google-fonts/Oswald";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
const { fontFamily: OSW } = loadOswald("normal", { weights: ["700"], subsets: ["latin", "latin-ext"] });
const { fontFamily: INT } = loadInter("normal", { weights: ["800"], subsets: ["latin", "latin-ext"] });

// Prova 3D: l'edificio nasce dal progetto (stile nero + arancio)
const OR = "#F07A35";
const C = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const io = (t: number, a: number, b: number) => interpolate(t, [a, b], [0, 1], { ...C, easing: Easing.out(Easing.cubic) });
export const B3D_DUR = 12;

const XS = [-2, 0, 2], ZS = [-1.5, 1.5], FLOORS = 4, FH = 1.2;

const Rebar: React.FC<{ x: number; z: number; y: number; k: number }> = ({ x, z, y, k }) => k <= 0 ? null : (
  <>{[[-0.1, -0.1], [0.1, -0.1], [-0.1, 0.1], [0.1, 0.1]].map(([dx, dz], i) => (
    <mesh key={i} position={[x + dx, y + 0.25 * k, z + dz]}><cylinderGeometry args={[0.018, 0.018, 0.5 * k, 6]} /><meshStandardMaterial color="#b0703f" metalness={0.6} roughness={0.4} /></mesh>))}</>
);

const Scene: React.FC<{ t: number }> = ({ t }) => {
  const lines = useMemo(() => {
    const g: [number, number, number, number][] = [];
    for (let i = -8; i <= 8; i++) { g.push([i * 0.5, -4, i * 0.5, 4]); g.push([-4, i * 0.5, 4, i * 0.5]); }
    return g;
  }, []);
  const plan = io(t, 0.2, 1.4);
  const parts: React.ReactNode[] = [];
  for (let f = 0; f < FLOORS; f++) {
    const t0 = 1.6 + f * 2.0; const y0 = f * FH;
    XS.forEach((x) => ZS.forEach((z, j) => {
      const k = io(t, t0 + (XS.indexOf(x) * 2 + j) * 0.08, t0 + 0.7 + (XS.indexOf(x) * 2 + j) * 0.08);
      if (k > 0) parts.push(<mesh key={`c${f}${x}${z}`} position={[x, y0 + (FH * k) / 2, z]} castShadow receiveShadow><boxGeometry args={[0.32, FH * k, 0.32]} /><meshStandardMaterial color="#9a9a96" roughness={0.9} /></mesh>);
      const top = io(t, t0 + 1.0, t0 + 1.5);
      if (k > 0.99 && top < 1) parts.push(<Rebar key={`r${f}${x}${z}`} x={x} z={z} y={y0 + FH} k={1 - top} />);
    }));
    const beam = io(t, t0 + 0.8, t0 + 1.2);
    if (beam > 0) {
      ZS.forEach((z) => parts.push(<mesh key={`bx${f}${z}`} position={[0, y0 + FH - 0.12 + (1 - beam) * 1.5, z]} castShadow><boxGeometry args={[4.32, 0.24, 0.3]} /><meshStandardMaterial color="#8d8d89" roughness={0.9} /></mesh>));
      XS.forEach((x) => parts.push(<mesh key={`bz${f}${x}`} position={[x, y0 + FH - 0.12 + (1 - beam) * 1.5, 0]} castShadow><boxGeometry args={[0.3, 0.24, 3.3]} /><meshStandardMaterial color="#8d8d89" roughness={0.9} /></mesh>));
    }
    const slab = io(t, t0 + 1.1, t0 + 1.6);
    if (slab > 0) parts.push(<mesh key={`s${f}`} position={[0, y0 + FH + 0.06, 0]} scale={[slab, 1, slab]} castShadow receiveShadow><boxGeometry args={[4.6, 0.12, 3.6]} /><meshStandardMaterial color="#b4b4ae" roughness={0.95} /></mesh>);
  }
  // gru
  const hookA = t * 0.35;
  return (
    <>
      <color attach="background" args={["#060606"]} />
      <fog attach="fog" args={["#060606", 14, 28]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 10, 4]} intensity={2.2} castShadow shadow-mapSize={[2048, 2048]} shadow-camera-left={-8} shadow-camera-right={8} shadow-camera-top={8} shadow-camera-bottom={-8} />
      <pointLight position={[-4, 3, -3]} intensity={12} color={OR} distance={12} />
      {/* tavolo e progetto */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[30, 30]} /><meshStandardMaterial color="#0d0d0d" roughness={1} /></mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]} receiveShadow><planeGeometry args={[8.4, 8.4]} /><meshStandardMaterial color="#121212" roughness={1} /></mesh>
      {lines.map(([x1, z1, x2, z2], i) => <mesh key={i} position={[(x1 + x2) / 2, 0.005, (z1 + z2) / 2]}><boxGeometry args={[Math.max(0.006, Math.abs(x2 - x1)) * plan, 0.001, Math.max(0.006, Math.abs(z2 - z1)) * plan]} /><meshBasicMaterial color="#3a2a20" /></mesh>)}
      {XS.map((x) => ZS.map((z) => <mesh key={`p${x}${z}`} position={[x, 0.006, z]}><boxGeometry args={[0.5 * plan, 0.002, 0.5 * plan]} /><meshBasicMaterial color={OR} /></mesh>))}
      <mesh position={[0, 0.006, 0]}><boxGeometry args={[4.9 * plan, 0.002, 0.02]} /><meshBasicMaterial color={OR} /></mesh>
      <mesh position={[0, 0.006, 0]}><boxGeometry args={[0.02, 0.002, 3.9 * plan]} /><meshBasicMaterial color={OR} /></mesh>
      {parts}
      {/* gru a torre */}
      <group position={[3.6, 0, -2.2]} scale={[1, io(t, 0.6, 1.6), 1]}>
        <mesh position={[0, 3.5, 0]} castShadow><boxGeometry args={[0.18, 7, 0.18]} /><meshStandardMaterial color={OR} metalness={0.3} roughness={0.6} /></mesh>
        <group position={[0, 7, 0]} rotation={[0, Math.sin(hookA) * 0.6 + 2.4, 0]}>
          <mesh position={[1.6, 0, 0]} castShadow><boxGeometry args={[5, 0.14, 0.14]} /><meshStandardMaterial color={OR} /></mesh>
          <mesh position={[-1.1, 0, 0]}><boxGeometry args={[0.6, 0.35, 0.35]} /><meshStandardMaterial color="#444" /></mesh>
          <mesh position={[3.2, -1.2, 0]}><cylinderGeometry args={[0.01, 0.01, 2.4, 4]} /><meshBasicMaterial color="#ccc" /></mesh>
          <mesh position={[3.2, -2.45, 0]}><boxGeometry args={[1.2, 0.12, 0.16]} /><meshStandardMaterial color="#777" /></mesh>
        </group>
      </group>
    </>
  );
};

const Cam: React.FC<{ t: number }> = ({ t }) => null;

export const Build3D: React.FC = () => {
  const f = useCurrentFrame(); const { width, height } = useVideoConfig(); const t = f / 30;
  const ang = 0.9 + t * 0.12, r = interpolate(t, [0, 12], [11, 16.5]), h = interpolate(t, [0, 12], [6.5, 8.5]);
  return (
    <AbsoluteFill style={{ background: "#060606" }}>
      <ThreeCanvas width={width} height={height} shadows camera={{ fov: 42, position: [Math.cos(ang) * r, h, Math.sin(ang) * r] }}
        onCreated={({ camera }: any) => camera.lookAt(0, 2, 0)}>
        <CamRig t={t} ang={ang} r={r} h={h} />
        <Scene t={t} />
      </ThreeCanvas>
      <div style={{ position: "absolute", top: 232, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(7,7,7,.85)", padding: "8px 22px", borderRadius: 40 }}>
          <Img src={staticFile("brands/ingbelcastro/logo-white.png")} style={{ height: 54 }} /><span style={{ fontFamily: INT, fontWeight: 800, fontSize: 34, color: "#fff" }}>@ing.belcastro</span></div></div>
      <div style={{ position: "absolute", top: 1380, left: 60, right: 60, textAlign: "center", fontFamily: OSW, fontWeight: 700, fontSize: 100, color: "#fff", textTransform: "uppercase", lineHeight: 1.05, opacity: io(t, 0.3, 0.9), textShadow: "0 6px 30px #000" }}>
        Dal <span style={{ color: OR }}>progetto</span><br />al cantiere</div>
    </AbsoluteFill>
  );
};

import { useThree } from "@react-three/fiber";
const CamRig: React.FC<{ t: number; ang: number; r: number; h: number }> = ({ ang, r, h }) => {
  const { camera } = useThree();
  camera.position.set(Math.cos(ang) * r, h, Math.sin(ang) * r);
  camera.lookAt(0, interpolate(ang, [0.9, 2.34], [1.0, 3.2]), 0);
  return null;
};
