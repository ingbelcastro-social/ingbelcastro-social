import React from "react";
import { AbsoluteFill, Audio, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { loadFont as loadOswald } from "@remotion/google-fonts/Oswald";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
const { fontFamily: OSW } = loadOswald("normal", { weights: ["700"], subsets: ["latin", "latin-ext"] });
const { fontFamily: INT } = loadInter("normal", { weights: ["600", "800"], subsets: ["latin", "latin-ext"] });

// Meraviglie dell'ingegneria #2 — Tower Bridge (3D, testi IT + EN)
const OR = "#F07A35";
const C = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const io = (t: number, a: number, b: number) => interpolate(t, [a, b], [0, 1], { ...C, easing: Easing.out(Easing.cubic) });
const ioe = (t: number, a: number, b: number) => interpolate(t, [a, b], [0, 1], { ...C, easing: Easing.inOut(Easing.cubic) });
const win = (t: number, a: number, b: number, f = 0.3) => Math.min(io(t, a, a + f), 1 - io(t, b - f, b));
export const TB_DUR = 42;

const TX = 2.2, TW = 1.1, TH = 6.2, DECK = 0.9, WALK = 4.6, LEAF = TX - TW / 2; // metà luce mobile

const Lattice: React.FC<{ x: number; k: number }> = ({ x, k }) => {
  if (k <= 0) return null;
  const h = TH * k, s = TW / 2, m = <meshStandardMaterial color={OR} emissive={OR} emissiveIntensity={0.35} metalness={0.4} roughness={0.5} />;
  const items: React.ReactNode[] = [];
  [[-s, -s], [s, -s], [-s, s], [s, s]].forEach(([dx, dz], i) => items.push(<mesh key={`c${i}`} position={[x + dx, h / 2, dz]}><boxGeometry args={[0.07, h, 0.07]} />{m}</mesh>));
  for (let y = 0.6; y < h; y += 0.6) items.push(
    <mesh key={`h${y}`} position={[x, y, -s]}><boxGeometry args={[TW, 0.05, 0.05]} />{m}</mesh>,
    <mesh key={`h2${y}`} position={[x, y, s]}><boxGeometry args={[TW, 0.05, 0.05]} />{m}</mesh>,
    <mesh key={`d${y}`} position={[x, y - 0.3, s]} rotation={[0, 0, Math.atan2(0.6, TW)]}><boxGeometry args={[Math.hypot(0.6, TW), 0.03, 0.03]} />{m}</mesh>);
  return <>{items}</>;
};

const Tower: React.FC<{ x: number; stone: number; steel: number }> = ({ x, stone, steel }) => (
  <group>
    <mesh position={[x, -0.3, 0]} receiveShadow castShadow><boxGeometry args={[TW + 0.9, 1.6, TW + 1.4]} /><meshStandardMaterial color="#8b8478" roughness={0.9} /></mesh>
    {stone < 0.95 && <Lattice x={x} k={steel} />}
    {stone > 0 && <group>
      <mesh position={[x, TH / 2, 0]} castShadow><boxGeometry args={[TW, TH, TW]} /><meshStandardMaterial color="#c9c2b2" roughness={0.85} transparent opacity={stone} /></mesh>
      <mesh position={[x, TH + 0.55, 0]} rotation={[0, Math.PI / 4, 0]} castShadow><coneGeometry args={[TW * 0.78, 1.1, 4]} /><meshStandardMaterial color="#3d4650" roughness={0.6} transparent opacity={stone} /></mesh>
      {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([a, b], i) => <mesh key={i} position={[x + a * TW * 0.45, TH + 0.35, b * TW * 0.45]}><coneGeometry args={[0.1, 0.7, 6]} /><meshStandardMaterial color="#3d4650" transparent opacity={stone} /></mesh>)}
      {Array.from({ length: 4 }, (_, i) => <mesh key={`w${i}`} position={[x, 1.6 + i * 1.1, TW / 2 + 0.01]}><planeGeometry args={[0.25, 0.5]} /><meshBasicMaterial color="#1b1b1b" transparent opacity={stone} /></mesh>)}
    </group>}
  </group>
);

const Chain: React.FC<{ sgn: number; k: number }> = ({ sgn, k }) => {
  if (k <= 0) return null;
  const pts = Array.from({ length: 20 }, (_, i) => { const u = i / 19; const x = sgn * (TX + TW / 2 + u * 4.6); const y = 4.2 - 3.6 * Math.sin(u * Math.PI / 2) * 0.9 + 0.2 * u; return new THREE.Vector3(x, y, 0); });
  const curve = new THREE.CatmullRomCurve3(pts);
  return <>{[-0.6, 0.6].map((z) => <mesh key={z} position={[0, 0, z]} scale={[1, 1, 1]}><tubeGeometry args={[curve, 40, 0.06 * k, 6, false]} /><meshStandardMaterial color="#6aa6c8" metalness={0.5} roughness={0.4} /></mesh>)}</>;
};

const Bridge: React.FC<{ t: number; open: number; stone: number }> = ({ t, open, stone }) => {
  const steelL = io(t, 3.6, 7.0), steelR = io(t, 4.0, 7.4);
  const walk = io(t, 7.0, 8.2), chains = io(t, 7.6, 8.8), side = io(t, 6.4, 7.6), leaves = io(t, 8.2, 9.2);
  const ang = (open * 86 * Math.PI) / 180;
  return (
    <group>
      <Tower x={-TX} stone={stone} steel={steelL} /><Tower x={TX} stone={stone} steel={steelR} />
      {/* passerelle alte */}
      {[-0.35, 0.35].map((z) => <mesh key={z} position={[0, WALK, z]} scale={[walk, 1, 1]} castShadow><boxGeometry args={[2 * TX - TW, 0.32, 0.22]} /><meshStandardMaterial color="#5f97b8" metalness={0.4} roughness={0.5} /></mesh>)}
      {/* bascule (ruotano attorno al bordo interno delle torri) */}
      {[-1, 1].map((s) => <group key={s} position={[s * (TX - TW / 2), DECK, 0]} rotation={[0, 0, -s * ang]} scale={[leaves, 1, 1]}>
        <mesh position={[-s * LEAF / 2, 0, 0]} castShadow><boxGeometry args={[LEAF, 0.16, 1.5]} /><meshStandardMaterial color="#5f97b8" metalness={0.3} roughness={0.6} /></mesh>
        <mesh position={[-s * LEAF / 2, 0.1, 0]}><boxGeometry args={[LEAF, 0.02, 0.06]} /><meshBasicMaterial color="#e8e8e8" /></mesh>
      </group>)}
      {/* campate laterali */}
      {[-1, 1].map((s) => <mesh key={`sd${s}`} position={[s * (TX + TW / 2 + 2.3), DECK, 0]} scale={[side, 1, 1]} castShadow><boxGeometry args={[4.6, 0.16, 1.5]} /><meshStandardMaterial color="#6f6f6f" roughness={0.8} /></mesh>)}
      <Chain sgn={-1} k={chains} /><Chain sgn={1} k={chains} />
    </group>
  );
};

const Ship: React.FC<{ t: number }> = ({ t }) => {
  const z = interpolate(t, [19.5, 27.5], [-16, 12], C);
  if (t < 19.3 || t > 27.8) return null;
  return <group position={[0, 0, z]}>
    <mesh position={[0, 0.25, 0]} castShadow><boxGeometry args={[1.3, 0.6, 3.6]} /><meshStandardMaterial color="#1d1d1d" /></mesh>
    <mesh position={[0, 0.75, 0.3]}><boxGeometry args={[0.8, 0.5, 1.4]} /><meshStandardMaterial color="#e6e6e6" /></mesh>
    <mesh position={[0, 2.4, 0]}><cylinderGeometry args={[0.04, 0.04, 3.0, 6]} /><meshStandardMaterial color="#ddd" /></mesh>
    <mesh position={[0, 2.6, 0.5]} rotation={[0, Math.PI / 2, 0]}><planeGeometry args={[1.0, 2.2]} /><meshStandardMaterial color="#f2efe6" side={THREE.DoubleSide} /></mesh>
  </group>;
};

const Bus: React.FC<{ t: number; open: number }> = ({ t, open }) => {
  if (t < 29.4 || t > 33.2) return null;
  const x = interpolate(t, [29.6, 31.6], [-7.5, 5.5], C);
  const y = DECK + 0.35 + (Math.abs(x) < TX ? Math.max(0, 0.9 - (x * x) / 6) : 0);
  return <group position={[x, y, 0.35]} rotation={[0, 0, Math.abs(x) < TX ? -x * 0.08 : 0]}>
    <mesh castShadow><boxGeometry args={[0.9, 0.55, 0.4]} /><meshStandardMaterial color="#c8102e" /></mesh>
    <mesh position={[0, 0.3, 0]}><boxGeometry args={[0.85, 0.05, 0.38]} /><meshStandardMaterial color="#f0f0f0" /></mesh>
  </group>;
};

const Rig: React.FC<{ t: number }> = ({ t }) => {
  const { camera } = useThree();
  const a = interpolate(t, [0, 3, 12, 17, 19, 28, 30, 34, 42], [0.35, 0.5, 1.1, 1.35, 0.95, 0.75, 0.2, 0.15, 0.4], { ...C, easing: Easing.inOut(Easing.cubic) });
  const r = interpolate(t, [0, 3, 12, 14, 17, 19, 28, 30, 34], [24, 22, 25, 18.5, 18.5, 23, 23, 21, 24], { ...C, easing: Easing.inOut(Easing.cubic) });
  const h = interpolate(t, [0, 12, 14, 17, 19, 34], [3, 6, 4, 4, 3, 3], C);
  camera.position.set(Math.sin(a) * r, h, Math.cos(a) * r);
  camera.lookAt(0, interpolate(t, [0, 12, 14, 17, 19], [5.6, 6.0, 5.2, 5.2, 5.6], C), 0);
  return null;
};

const Txt: React.FC<{ it: React.ReactNode; en: string; op: number; top?: number; size?: number }> = ({ it, en, op, top = 400, size = 96 }) => (
  <div style={{ position: "absolute", left: 60, right: 60, top, textAlign: "center", opacity: op, transform: `translateY(${(1 - op) * 30}px)` }}>
    <div style={{ fontFamily: OSW, fontWeight: 700, fontSize: size, lineHeight: 1.04, color: "#fff", textTransform: "uppercase", textShadow: "0 6px 30px rgba(0,0,0,.9)" }}>{it}</div>
    <div style={{ fontFamily: INT, fontWeight: 600, fontStyle: "italic", fontSize: 38, color: "#d8d8d8", marginTop: 14, textShadow: "0 4px 20px rgba(0,0,0,.9)" }}>{en}</div>
  </div>
);
const O: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: OR }}>{children}</span>;

export const TowerBridge: React.FC = () => {
  const f = useCurrentFrame(); const { width, height } = useVideoConfig(); const t = f / 30;
  const built = t < 3.2 ? 1 : 0; // nel gancio il ponte è già finito
  const open = t < 3.2 ? 0.18 * ioe(t, 1.0, 2.6) : ioe(t, 20.0, 23.5) * (1 - ioe(t, 26.5, 29.0)) + (t > 29.3 && t < 33.2 ? 0.12 * Math.sin(Math.PI * io(t, 29.4, 32.8)) : 0);
  const stone = built ? 1 : t < 9.6 ? 0 : io(t, 9.6, 11.2) * (1 - 0.8 * win(t, 13.6, 17.4, 0.5));
  const tb = built ? 99 : t;
  const deg = Math.round(open * 86);
  const photo = io(t, 34.4, 35.0), endIn = io(t, 39.0, 39.5);
  return (
    <AbsoluteFill style={{ background: "#07090c" }}>
      <ThreeCanvas width={width} height={height} shadows camera={{ fov: 45, position: [6, 4, 15] }}>
        <Rig t={t} />
        <color attach="background" args={["#07090c"]} />
        <fog attach="fog" args={["#07090c", 18, 40]} />
        <ambientLight intensity={0.45} />
        <directionalLight position={[8, 12, 10]} intensity={2.0} castShadow shadow-mapSize={[2048, 2048]} shadow-camera-left={-12} shadow-camera-right={12} shadow-camera-top={12} shadow-camera-bottom={-12} />
        <pointLight position={[0, 5, 3]} intensity={10} color={OR} distance={14} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow><planeGeometry args={[80, 80]} /><meshStandardMaterial color="#0e1a24" roughness={0.35} metalness={0.3} /></mesh>
        {Array.from({ length: 30 }, (_, i) => <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[((i * 37) % 30) - 15, 0.0, ((t * 0.6 + i * 1.3) % 30) - 15]}><planeGeometry args={[1.2, 0.04]} /><meshBasicMaterial color="#2c4a60" /></mesh>)}
        {[-1, 1].map((s) => <mesh key={s} position={[s * 11.5, 0.4, 0]} receiveShadow><boxGeometry args={[4, 1.2, 30]} /><meshStandardMaterial color="#1a1a1a" /></mesh>)}
        <Bridge t={tb} open={open} stone={stone} />
        <Ship t={t} /><Bus t={t} open={open} />
      </ThreeCanvas>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 900, background: "linear-gradient(rgba(7,9,12,.85), rgba(7,9,12,.55) 60%, rgba(7,9,12,0))" }} />
      {/* logo e serie */}
      <div style={{ position: "absolute", top: 232, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: 1 - endIn }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(7,7,7,.85)", padding: "8px 22px", borderRadius: 40 }}>
          <Img src={staticFile("brands/ingbelcastro/logo-white.png")} style={{ height: 54 }} /><span style={{ fontFamily: INT, fontWeight: 800, fontSize: 34, color: "#fff" }}>@ing.belcastro</span></div></div>
      <div style={{ position: "absolute", top: 322, left: 0, right: 0, textAlign: "center", fontFamily: INT, fontWeight: 800, fontSize: 30, color: OR, opacity: 1 - endIn }}>LE GRANDI OPERE · #1</div>
      {/* testi */}
      <Txt op={win(t, 0.1, 3.3, 0.2)} it={<>Un ponte<br />che si <O>apre in due</O></>} en="A bridge that splits in two" size={108} />
      <Txt op={win(t, 3.4, 6.6, 0.25)} it={<>Londra, <O>1886</O></>} en="London, 1886: work begins" />
      <Txt op={win(t, 6.6, 9.6, 0.25)} it={<><O>11.000 t</O> di acciaio</>} en="11,000 tonnes of steel" />
      <Txt op={win(t, 9.6, 13.6, 0.25)} it={<>Poi la pietra<br /><O>la riveste</O></>} en="Then stone covers it" />
      <Txt op={win(t, 13.6, 17.5, 0.25)} it={<>La pietra è un <O>vestito</O>:<br />dentro è acciaio</>} en="The stone is just a coat: inside, it's steel" size={84} />
      <Txt op={win(t, 17.5, 20.0, 0.25)} it={<>1894: <O>aperto</O></>} en="Opened in 1894, after 8 years" />
      <Txt op={win(t, 20.0, 26.5, 0.25)} it={<>Arriva una nave:<br />si alza fino a <O>{deg}°</O></>} en="A ship arrives: the bascules lift up to 86°" size={90} top={380} />
      <Txt op={win(t, 23.6, 26.5, 0.25)} top={640} it={<>in circa <O>1 minuto</O></>} en="in about one minute" size={72} />
      <Txt op={win(t, 26.5, 29.4, 0.25)} it={<>A vapore<br />fino al <O>1976</O></>} en="Steam-powered until 1976" />
      <Txt op={win(t, 29.4, 33.4, 0.25)} it={<>1952: un autobus<br /><O>salta il varco</O></>} en="1952: a bus jumped the gap" size={90} />
      {/* foto dell'ing. */}
      <AbsoluteFill style={{ opacity: photo * (1 - io(t, 37.8, 38.3)), background: "#07090c" }}>
        <div style={{ position: "absolute", left: 90, right: 90, top: 380, height: 1100, borderRadius: 34, overflow: "hidden", border: `6px solid ${OR}`, transform: `scale(${0.94 + 0.06 * photo}) rotate(${(1 - photo) * -3}deg)` }}>
          <Img src={staticFile("ing/tower-bridge-ing.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${1.04 + 0.05 * io(t, 34.4, 38.0)})` }} /></div>
        <Txt op={io(t, 34.8, 35.3)} top={1500} it={<>Io ci sono stato.<br /><O>E tu?</O></>} en="I was there. What about you?" size={88} />
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: win(t, 38.0, 39.6, 0.3), background: "rgba(7,7,7,.95)" }}>
        <Txt op={io(t, 38.1, 38.5)} top={700} it={<>Quale grande opera<br />vuoi <O>vedere</O>?</>} en="Which great work should be next? Comment below" size={96} />
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: endIn, background: "#000", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 36 }}>
        <Img src={staticFile("brands/ingbelcastro/logo-white.png")} style={{ width: 440 }} />
        <div style={{ fontFamily: INT, fontWeight: 800, fontSize: 36, color: OR, letterSpacing: "0.15em" }}>LE GRANDI OPERE</div>
        <div style={{ fontFamily: OSW, fontWeight: 700, fontSize: 80, color: "#fff", textTransform: "uppercase" }}>Segui per la <span style={{ color: OR }}>#2</span></div>
        <div style={{ fontFamily: INT, fontWeight: 800, fontSize: 40, color: "#ccc" }}>@ing.belcastro</div>
      </AbsoluteFill>
      <div style={{ position: "absolute", top: 1860, left: 0, right: 0, textAlign: "center", fontFamily: INT, fontWeight: 600, fontSize: 22, color: "#999", opacity: (1 - endIn) * (1 - photo) }}>Animazione 3D illustrativa · proporzioni semplificate</div>
    </AbsoluteFill>
  );
};
