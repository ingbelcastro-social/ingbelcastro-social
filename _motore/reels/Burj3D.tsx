import React, { useMemo } from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { loadFont as loadOswald } from "@remotion/google-fonts/Oswald";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
const { fontFamily: OSW } = loadOswald("normal", { weights: ["700"], subsets: ["latin", "latin-ext"] });
const { fontFamily: INT } = loadInter("normal", { weights: ["600", "800"], subsets: ["latin", "latin-ext"] });

// EngiPlanet · Le Grandi Opere #3 — Burj Khalifa in 3D
const OR = "#D98A58";
const C = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const io = (t: number, a: number, b: number) => interpolate(t, [a, b], [0, 1], { ...C, easing: Easing.out(Easing.cubic) });
const win = (t: number, a: number, b: number, f = 0.3) => Math.min(io(t, a, a + f), 1 - io(t, b - f, b));
export const BJ_DUR = 90;
const N = 27, HT = 0.36, TOPB = 0.6, SP = 1.3, HTOT = N * HT + TOPB + SP;
const wingLen = (i: number, w: number) => 2.0 * Math.max(0, 1 - Math.floor((i + w) / 3) / 9.4);

const Tier: React.FC<{ i: number; k: number; clad: number; lit: number; hl: number }> = ({ i, k, clad, lit, hl }) => {
  if (k <= 0) return null;
  const wd = 0.55 * (1 - 0.45 * i / N), rc = 0.44 - 0.2 * i / N;
  const col = new THREE.Color("#8f8f8a").lerp(new THREE.Color("#6f9fc4"), clad);
  const mat = <meshStandardMaterial color={col} metalness={0.15 + 0.7 * clad} roughness={0.85 - 0.6 * clad} emissive={hl > 0 ? OR : "#7fc4ff"} emissiveIntensity={hl > 0 ? 0.9 * hl : 0.1 * lit} />;
  return (
    <group position={[0, i * HT, 0]} scale={[1, k, 1]}>
      {lit > 0 && <mesh position={[0, HT * 0.95, 0]}><cylinderGeometry args={[rc + 0.02, rc + 0.02, 0.025, 6]} /><meshBasicMaterial color="#ffe2a8" transparent opacity={0.9 * lit} /></mesh>}
      <mesh position={[0, HT / 2, 0]} castShadow><cylinderGeometry args={[rc, rc, HT * 0.9, 6]} />{mat}</mesh>
      {[0, 1, 2].map((w) => { const L = wingLen(i, w); if (L < 0.12) return null;
        return <group key={w} rotation={[0, (w * 2 * Math.PI) / 3, 0]}>
          <mesh position={[0.2 + L / 2, HT / 2, 0]} castShadow><boxGeometry args={[L, HT * 0.9, wd]} />{mat}</mesh>
          <mesh position={[0.2 + L, HT / 2, 0]} castShadow><cylinderGeometry args={[wd / 2, wd / 2, HT * 0.9, 16]} />{mat}</mesh>
        </group>; })}
    </group>
  );
};

const Rig: React.FC<{ R: number }> = ({ R }) => {
  const { camera } = useThree();
  const K = [0, 4.5, 5.5, 10, 11, 18, 19.5, 25.5, 27, 36, 43, 52, 53.5, 59, 60.5, 66, 73, 90];
  const e = { ...C, easing: Easing.inOut(Easing.cubic) };
  const a = interpolate(R, K, [0.7, 0.3, 0.3, 0.1, 0, -0.3, -0.3, -0.1, 0.2, -0.5, -0.2, 0.6, 0.6, 0.9, 0.9, 1.3, 1.7, 2.0], e);
  const r = interpolate(R, K, [26, 28, 16, 15, 13, 13, 2.5, 2.5, 28, 28, 22, 26, 11, 11, 28, 28, 30, 30], e);
  const h = interpolate(R, K, [1.2, 6, 5, 4.5, 2.4, 2.0, 15, 15, 4, 5, 7, 11, 11.4, 11.8, 5, 6, 2, 3], e);
  const ly = interpolate(R, K, [8.6, 9.8, 1.6, 1.6, -0.5, -0.5, 0.2, 0.2, 9.8, 9.8, 8.6, 9.8, 11.2, 11.2, 9.8, 9.8, 9.4, 9.4], e);
  camera.position.set(Math.sin(a) * r, h, Math.cos(a) * r);
  camera.lookAt(0, ly, 0);
  return null;
};

const Txt: React.FC<{ it: React.ReactNode; en: string; op: number; top?: number; size?: number }> = ({ it, en, op, top = 390, size = 96 }) => (
  <div style={{ position: "absolute", left: 60, right: 60, top, textAlign: "center", opacity: op, transform: `translateY(${(1 - op) * 30}px)` }}>
    <div style={{ fontFamily: OSW, fontWeight: 700, fontSize: size, lineHeight: 1.04, color: "#fff", textTransform: "uppercase", textShadow: "0 6px 30px rgba(0,0,0,.95)" }}>{it}</div>
    <div style={{ fontFamily: INT, fontWeight: 600, fontStyle: "italic", fontSize: 38, color: "#d8d8d8", marginTop: 14, textShadow: "0 4px 20px rgba(0,0,0,.95)" }}>{en}</div>
  </div>
);
const O: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: OR }}>{children}</span>;

export const Burj3D: React.FC = () => {
  const f = useCurrentFrame(); const { width, height } = useVideoConfig(); const R = f / 30;
  const hook = R < 4.5;
  const tiers = hook ? N : R < 19 ? 0 : R < 26.5 ? io(R, 19.5, 22) : interpolate(R, [26.5, 35.5], [1, N], C);
  const clad = (i: number) => hook ? 1 : io(R, 60 + (i / N) * 4.5, 61.2 + (i / N) * 4.5);
  const lit = hook ? 1 : io(R, 66.3, 68);
  const spire = hook ? 1 : io(R, 53.5, 58);
  const topB = hook ? 1 : io(R, 35.5, 36.5);
  const xray = win(R, 10.5, 18.6, 0.7);
  const pile = io(R, 11.5, 15), raft = io(R, 14.5, 16.5);
  const pump = io(R, 37, 41.5) * (1 - io(R, 42.5, 43.2));
  const wind = win(R, 43.3, 52, 0.6);
  const metres = hook ? 828 : spire > 0 ? Math.round(694 + 134 * spire) : Math.round((tiers * HT / HTOT) * 828);
  const floors = Math.min(163, Math.round((tiers / N) * 163));
  const endIn = io(R, 86, 86.6);
  const piles = useMemo(() => { const p: number[][] = []; for (let w = 0; w < 3; w++) for (let j = 0; j < 9; j++) for (const s of [-0.22, 0.22]) { const a = (w * 2 * Math.PI) / 3, d = 0.35 + j * 0.25; p.push([Math.cos(a) * d - Math.sin(a) * s, -Math.sin(a) * d - Math.cos(a) * s]); } for (let j = 0; j < 6; j++) p.push([Math.cos(j) * 0.2, Math.sin(j) * 0.2]); return p; }, []);
  const city = useMemo(() => Array.from({ length: 70 }, (_, i) => { const a = i * 2.39996, d = 6 + ((i * 37) % 100) / 100 * 14; return [Math.cos(a) * d, Math.sin(a) * d, 0.3 + ((i * 53) % 100) / 100 * (i % 9 === 0 ? 2.6 : 1.1), 0.35 + ((i * 17) % 10) / 20]; }), []);
  const cmp: [string, number][] = [["Torre Eiffel", 330], ["Empire State", 443], ["Taipei 101", 508], ["Burj Khalifa", 828]];
  return (
    <AbsoluteFill style={{ background: "#05080f" }}>
      <ThreeCanvas width={width} height={height} shadows camera={{ fov: 45, position: [8, 6, 26], far: 200 }}>
        <Rig R={R} />
        <color attach="background" args={["#05080f"]} />
        <fog attach="fog" args={["#05080f", 30, 90]} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[12, 22, 14]} intensity={1.8} color="#cfe0ff" castShadow shadow-mapSize={[2048, 2048]} shadow-camera-left={-14} shadow-camera-right={14} shadow-camera-top={16} shadow-camera-bottom={-4} />
        <pointLight position={[3, 1.2, 4]} intensity={22} color={OR} distance={14} />
        <pointLight position={[-4, 8, -3]} intensity={18} color="#6aa6ff" distance={22} />
        {/* deserto e città */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow><planeGeometry args={[200, 200]} /><meshStandardMaterial color="#1c1710" roughness={1} transparent opacity={1 - 0.8 * xray} /></mesh>
        {Array.from({ length: 21 }, (_, i) => <mesh key={i} position={[(i - 10) * 2, 0.005, 0]}><boxGeometry args={[0.02, 0.002, 40]} /><meshBasicMaterial color="#3a2a20" /></mesh>)}
        {Array.from({ length: 21 }, (_, i) => <mesh key={`z${i}`} position={[0, 0.005, (i - 10) * 2]}><boxGeometry args={[40, 0.002, 0.02]} /><meshBasicMaterial color="#3a2a20" /></mesh>)}
        {city.map(([x, z, hh, w], i) => <mesh key={i} position={[x, hh / 2, z]} castShadow><boxGeometry args={[w, hh, w]} /><meshStandardMaterial color="#141b26" emissive="#ffcf8a" emissiveIntensity={0.03 + 0.05 * lit} transparent opacity={1 - 0.85 * xray} /></mesh>)}
        {/* tracciato a Y sul terreno */}
        {[0, 1, 2].map((w) => <group key={w} rotation={[0, (w * 2 * Math.PI) / 3, 0]}><mesh position={[0.2 + 1.1 * io(R, 5.6 + w * 0.5, 7 + w * 0.5), 0.02, 0]}><boxGeometry args={[2.2 * (hook ? 0 : io(R, 5.6 + w * 0.5, 7 + w * 0.5)) + 0.001, 0.01, 0.6]} /><meshBasicMaterial color={OR} transparent opacity={hook ? 0 : 0.9 * (1 - io(R, 26, 27))} /></mesh></group>)}
        {/* fondazioni: pali + platea */}
        {xray > 0 && piles.map(([x, z], i) => <mesh key={i} position={[x, -0.3 - 1.25 * pile, z]}><cylinderGeometry args={[0.05, 0.05, 2.5 * pile + 0.001, 8]} /><meshStandardMaterial color={OR} emissive={OR} emissiveIntensity={0.5} transparent opacity={xray} /></mesh>)}
        {xray > 0 && [0, 1, 2].map((w) => <group key={`r${w}`} rotation={[0, (w * 2 * Math.PI) / 3, 0]}><mesh position={[1.35, -0.16, 0]} scale={[raft, 1, 1]}><boxGeometry args={[2.7, 0.28, 0.8]} /><meshStandardMaterial color="#b9b4a8" transparent opacity={xray} /></mesh></group>)}
        {/* torre */}
        {Array.from({ length: N }, (_, i) => { const k = Math.min(1, Math.max(0, tiers - i)); const hl = wind > 0 && Math.abs(((R - 46) * 5) % N - i) < 1.6 && R > 46 ? wind : 0; return <Tier key={i} i={i} k={k} clad={clad(i)} lit={lit} hl={hl} />; })}
        {topB > 0 && <mesh position={[0, N * HT + (TOPB * topB) / 2, 0]} castShadow><cylinderGeometry args={[0.12, 0.2, TOPB * topB, 12]} /><meshStandardMaterial color="#9aa7b4" metalness={0.8} roughness={0.3} /></mesh>}
        {spire > 0 && <mesh position={[0, N * HT + TOPB + (SP * spire) / 2 - 0.02, 0]} castShadow><cylinderGeometry args={[0.012, 0.1, SP * spire, 10]} /><meshStandardMaterial color="#dfe6ee" metalness={0.9} roughness={0.2} emissive={OR} emissiveIntensity={0.5 * win(R, 53.5, 59, 0.5)} /></mesh>}
        {(hook || lit > 0) && <mesh position={[0, HTOT + 0.05, 0]}><sphereGeometry args={[0.07, 12, 12]} /><meshBasicMaterial color="#ff4040" transparent opacity={0.5 + 0.5 * Math.sin(R * 6)} /></mesh>}
        {/* pompa del calcestruzzo */}
        {pump > 0 && <group><mesh position={[0.5, (8.5 * pump) / 2, 0.5]}><cylinderGeometry args={[0.04, 0.04, 8.5 * pump, 8]} /><meshBasicMaterial color={OR} /></mesh><mesh position={[0.5, 8.5 * pump, 0.5]}><sphereGeometry args={[0.13, 12, 12]} /><meshBasicMaterial color="#fff" /></mesh></group>}
        {/* vento */}
        {wind > 0 && Array.from({ length: 46 }, (_, i) => { const y = 1 + ((i * 29) % 100) / 100 * 10, z = -5 + ((i * 47) % 100) / 10, x = ((R * (9 + (i % 5) * 2) + i * 3.1) % 30) - 15; return <mesh key={i} position={[x, y, z]}><boxGeometry args={[1.2 + (i % 3) * 0.6, 0.02, 0.02]} /><meshBasicMaterial color="#ffffff" transparent opacity={0.35 * wind} /></mesh>; })}
      </ThreeCanvas>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 900, background: "linear-gradient(rgba(5,8,15,.9), rgba(5,8,15,.55) 62%, rgba(5,8,15,0))" }} />
      {/* targhetta */}
      <div style={{ position: "absolute", top: 232, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: 1 - endIn }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(7,7,7,.85)", padding: "8px 22px", borderRadius: 40 }}>
          <Img src={staticFile("engiplanet/avatar-engiplanet-simbolo.jpg")} style={{ height: 58, width: 58, borderRadius: 29 }} /><span style={{ fontFamily: INT, fontWeight: 800, fontSize: 34, color: "#fff", letterSpacing: "0.08em" }}>ENGIPLANET</span></div></div>
      <div style={{ position: "absolute", top: 322, left: 0, right: 0, textAlign: "center", fontFamily: INT, fontWeight: 800, fontSize: 30, color: OR, opacity: 1 - endIn }}>LE GRANDI OPERE · #3</div>
      {/* testi */}
      <Txt op={win(R, 0.1, 4.5, 0.2)} it={<><O>828 metri</O></>} en="828 metres: the tallest building on Earth" size={150} />
      <Txt op={win(R, 1.4, 4.5, 0.2)} top={660} it={<>Come fa a stare in piedi?</>} en="How does it stand?" size={76} />
      <Txt op={win(R, 4.5, 10, 0.3)} it={<>Dubai, <O>2004</O>:<br />si parte dal deserto</>} en="Dubai, 2004: it starts in the desert" size={90} />
      <div style={{ position: "absolute", left: 110, right: 110, top: 690, opacity: win(R, 5.8, 10, 0.3), background: "rgba(7,7,7,.85)", border: `3px solid ${OR}`, borderRadius: 24, padding: "24px 32px", fontFamily: INT, color: "#fff", textAlign: "center" }}>
        <div style={{ fontWeight: 800, fontSize: 38 }}>Architetto: <span style={{ color: OR }}>Adrian Smith</span> (SOM)</div>
        <div style={{ fontWeight: 800, fontSize: 38, marginTop: 8 }}>Strutture: <span style={{ color: OR }}>Bill Baker</span></div></div>
      <Txt op={win(R, 10, 18.6, 0.3)} it={<>Sotto la sabbia:<br /><O>oltre 190 pali</O></>} en="Under the sand: more than 190 piles" size={92} />
      <Txt op={win(R, 12, 18.6, 0.3)} top={670} it={<>lunghi più di <O>40 m</O>, reggono per attrito.<br />Sopra, una platea spessa <O>3,7 m</O></>} en="over 40 m long, held by friction · a 3.7 m thick raft on top" size={56} />
      <Txt op={win(R, 18.6, 26.5, 0.3)} it={<>Il segreto:<br />la pianta a <O>Y</O></>} en="The secret: a Y-shaped plan" />
      <Txt op={win(R, 20.5, 26.5, 0.3)} top={670} it={<>nucleo esagonale + 3 ali:<br />ogni ala <O>sostiene le altre</O></>} en="“buttressed core”: each wing braces the others" size={60} />
      <Txt op={win(R, 26.5, 36.5, 0.3)} it={<><O>{metres} m</O></>} en={`${floors} floors · about one floor every 3 days`} size={150} />
      <Txt op={win(R, 28.5, 36.5, 0.3)} top={660} it={<><O>330.000 m³</O> di calcestruzzo<br /><O>39.000 t</O> di acciaio d'armatura</>} en="330,000 m³ of concrete · 39,000 tonnes of rebar" size={58} />
      <Txt op={win(R, 36.5, 43.2, 0.3)} it={<>Calcestruzzo pompato<br />fino a <O>{Math.round(605 * io(R, 37, 41.5))} m</O></>} en="Concrete pumped up to 605 m: a world record" size={88} />
      <Txt op={win(R, 38.5, 43.2, 0.3)} top={670} it={<>gettato <O>di notte</O>, con ghiaccio<br />nell'impasto contro il caldo</>} en="poured at night, with ice in the mix to beat the heat" size={58} />
      <Txt op={win(R, 43.2, 52, 0.3)} it={<>Il vero nemico:<br /><O>il vento</O></>} en="The real enemy: the wind" />
      <Txt op={win(R, 45.5, 52, 0.3)} top={670} it={<>la torre si restringe <O>a spirale</O>:<br />la forma cambia e «confonde» il vento</>} en="it steps back in a spiral, so the wind never gets organised" size={56} />
      <Txt op={win(R, 52, 59.5, 0.3)} it={<>La guglia:<br /><O>4.000 t</O> d'acciaio</>} en="The spire: 4,000 tonnes of steel" size={92} />
      <Txt op={win(R, 54, 59.5, 0.3)} top={670} it={<>montata <O>dentro</O> la torre<br />e spinta in alto con i martinetti</>} en="assembled inside the tower and jacked up into place" size={58} />
      <Txt op={win(R, 59.5, 66.2, 0.3)} it={<><O>26.000</O> pannelli<br />di vetro</>} en="26,000 glass panels, cut one by one" />
      <Txt op={win(R, 61.5, 66.2, 0.3)} top={670} it={<>riflettono il sole del deserto<br />e resistono al <O>caldo estremo</O></>} en="they reflect the desert sun and resist extreme heat" size={58} />
      <Txt op={win(R, 66.2, 73, 0.3)} it={<>4 gennaio 2010:<br /><O>inaugurato</O></>} en="Opened on 4 January 2010" size={92} />
      <Txt op={win(R, 68, 73, 0.3)} top={670} it={<><O>163 piani</O> · 22 milioni<br />di ore di lavoro</>} en="163 floors · 22 million man-hours" size={60} />
      {/* confronto */}
      <AbsoluteFill style={{ opacity: win(R, 73, 79.5, 0.4), background: "rgba(5,8,15,.93)" }}>
        <Txt op={io(R, 73.2, 73.7)} top={390} it={<>Quanto è <O>alto</O>?</>} en="How tall is it, really?" size={100} />
        <div style={{ position: "absolute", left: 90, right: 90, top: 700, height: 860, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          {cmp.map(([n, m], i) => { const k = io(R, 73.8 + i * 0.7, 74.8 + i * 0.7); const last = i === 3;
            return <div key={n} style={{ width: 190, textAlign: "center" }}>
              <div style={{ fontFamily: OSW, fontWeight: 700, fontSize: 48, color: last ? OR : "#fff", opacity: k }}>{Math.round(m * k)} m</div>
              <div style={{ height: (m / 828) * 660 * k, background: last ? OR : "#4a5360", borderRadius: "10px 10px 0 0", margin: "8px 34px 0" }} />
              <div style={{ fontFamily: INT, fontWeight: 800, fontSize: 28, color: "#ddd", marginTop: 12, opacity: k }}>{n}</div></div>; })}
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: win(R, 79.5, 86.6, 0.3), background: "rgba(5,8,15,.95)" }}>
        <Txt op={io(R, 79.7, 80.1)} top={700} it={<>Quale grande opera<br />vuoi <O>vedere</O>?</>} en="Which great work should be next? Comment below" size={96} />
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: endIn, background: "#000", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 36 }}>
        <Img src={staticFile("engiplanet/logo-engiplanet-originale.jpg")} style={{ width: 560, height: 560, borderRadius: 280 }} />
        <div style={{ fontFamily: INT, fontWeight: 800, fontSize: 36, color: OR, letterSpacing: "0.15em" }}>LE GRANDI OPERE</div>
        <div style={{ fontFamily: OSW, fontWeight: 700, fontSize: 80, color: "#fff", textTransform: "uppercase" }}>Segui per la <span style={{ color: OR }}>#4</span></div>
        <div style={{ fontFamily: INT, fontWeight: 800, fontSize: 40, color: "#ccc" }}>@engiplanet</div>
      </AbsoluteFill>
      <div style={{ position: "absolute", top: 1860, left: 0, right: 0, textAlign: "center", fontFamily: INT, fontWeight: 600, fontSize: 22, color: "#999", opacity: 1 - endIn }}>Animazione 3D illustrativa · proporzioni semplificate</div>
    </AbsoluteFill>
  );
};
