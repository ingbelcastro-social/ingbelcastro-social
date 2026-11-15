import React, { useMemo } from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { loadFont as loadOswald } from "@remotion/google-fonts/Oswald";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
const { fontFamily: OSW } = loadOswald("normal", { weights: ["700"], subsets: ["latin", "latin-ext"] });
const { fontFamily: INT } = loadInter("normal", { weights: ["600", "800"], subsets: ["latin", "latin-ext"] });

// EngiPlanet · Le Grandi Opere #4 — Galleria di base del San Gottardo in 3D
const OR = "#D98A58";
const C = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const io = (t: number, a: number, b: number) => interpolate(t, [a, b], [0, 1], { ...C, easing: Easing.out(Easing.cubic) });
const win = (t: number, a: number, b: number, f = 0.3) => Math.min(io(t, a, a + f), 1 - io(t, b - f, b));
export const GT_DUR = 90;
const hM = (x: number) => Math.max(0.35, (1.0 + 4.6 * Math.exp(-(((x + 1.5) / 5) ** 2)) + 0.6 * Math.sin(x * 0.9) + 0.35 * Math.sin(x * 2.3)) * Math.min(1, (12.6 - Math.abs(x)) / 2.2));
const SITES = [-12, -8.5, -1.5, 5.5, 12]; // Erstfeld, Amsteg, Sedrun, Faido, Bodio
const TY = 0.25, TZ = -2, TB = -40; // quota galleria, asse, quota del set «fresa»
const GEO = ["#8a8f98", "#a58d74", "#74887c", "#b6a488", "#8a7f98", "#9c9c86", "#a98c80", "#7f8f9c"];

const Rig: React.FC<{ R: number }> = ({ R }) => {
  const { camera } = useThree();
  const S: number[][] = [
    [0, 20, 3, 9, 0, 4.6, -2], [4.5, 19, 5, 10, 0, 4.8, -2], [11, 17, 4.5, 11, 0, 4.8, -2],
    [12.2, 15.6, 1.0, 0.6, 11, 1.3, -2], [18, 15.9, 1.1, 0.9, 11, 1.3, -2],
    [19.4, 18, 7, 13, 0, 4.6, -2], [25, 17, 7.5, 14, 0, 4.6, -2],
    [26.4, 2.4, TB + 1.3, 4.6, -0.2, TB + 1.0, 0], [31.6, 3.2, TB + 1.2, 4.4, 0.6, TB + 1.0, 0], [33, -0.6, TB + 1.6, 6.4, -1.4, TB + 1.1, 0], [36, 0.2, TB + 1.5, 6.2, -0.8, TB + 1.1, 0],
    [37.4, -15.2, TB + 0.8, 3.4, -11.4, TB + 1.0, 0], [43, -14.2, TB + 0.7, 3.2, -10.6, TB + 1.0, 0],
    [44.4, 0, 4, 23, -1.5, 5.6, -2], [50, 0.8, 4.2, 22, -1.5, 5.6, -2],
    [51.4, 20.5, 3, 6.5, 13.6, 2.6, -1.4], [57, 21, 3.4, 7.5, 13.6, 2.6, -1.4],
    [58.2, 6.2, 1.5, 4.8, 2, 1.5, -2], [65, 5.4, 1.3, 4.2, 2, 1.5, -2],
    [66.2, 18.5, 2.2, 7, 4, 3.4, -2], [72, 19.5, 3.5, 9, 2, 4.2, -2], [90, 21, 5, 11, 0, 4.6, -2],
  ];
  const K = S.map((s) => s[0]); const e = { ...C, easing: Easing.inOut(Easing.cubic) };
  const v = (j: number) => interpolate(R, K, S.map((s) => s[j]), e);
  camera.position.set(v(1), v(2), v(3)); camera.lookAt(v(4), v(5), v(6));
  return null;
};

const Txt: React.FC<{ it: React.ReactNode; en: string; op: number; top?: number; size?: number }> = ({ it, en, op, top = 390, size = 96 }) => (
  <div style={{ position: "absolute", left: 60, right: 60, top, textAlign: "center", opacity: op, transform: `translateY(${(1 - op) * 30}px)` }}>
    <div style={{ fontFamily: OSW, fontWeight: 700, fontSize: size, lineHeight: 1.04, color: "#fff", textTransform: "uppercase", textShadow: "0 6px 30px rgba(0,0,0,.95)" }}>{it}</div>
    <div style={{ fontFamily: INT, fontWeight: 600, fontStyle: "italic", fontSize: 38, color: "#d8d8d8", marginTop: 14, textShadow: "0 4px 20px rgba(0,0,0,.95)" }}>{en}</div>
  </div>
);
const O: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: OR }}>{children}</span>;
const XCyl: React.FC<{ x0: number; x1: number; y: number; z: number; r: number; children: React.ReactNode }> = ({ x0, x1, y, z, r, children }) => Math.abs(x1 - x0) < 0.01 ? null : (
  <mesh position={[(x0 + x1) / 2, y, z]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[r, r, Math.abs(x1 - x0), 14]} />{children}</mesh>
);

export const Gottardo3D: React.FC = () => {
  const f = useCurrentFrame(); const { width, height } = useVideoConfig(); const R = f / 30;
  const hook = R < 4.5;
  const geo = win(R, 5, 11.6, 0.8);
  const exc = hook ? 1 : interpolate(R, [18.6, 25, 43, 57.5, 59.5], [0, 0.3, 0.6, 0.93, 1], C);
  const plan = hook ? 0 : io(R, 11.4, 12.4) * (1 - io(R, 59, 60));
  const hot = win(R, 46.5, 50.6, 0.6);
  const mOp = hook ? 0.5 : 0.42 + 0.45 * geo;
  const segs = useMemo(() => Array.from({ length: 8 }, (_, i) => { const x0 = -12.6 + i * 3.15, x1 = x0 + 3.15; const sh = new THREE.Shape(); sh.moveTo(x0, 0); for (let k = 0; k <= 16; k++) { const x = x0 + ((x1 - x0) * k) / 16; sh.lineTo(x, hM(x)); } sh.lineTo(x1, 0); sh.lineTo(x0, 0); return new THREE.ExtrudeGeometry(sh, { depth: 4, bevelEnabled: false }); }), []);
  // set «fresa»
  const adv = Math.min(3.2, Math.max(0, (R - 26.4) / 3)); const Xh = 0.55 * (Math.floor(adv) + Math.min(1, (adv % 1) * 1.5));
  const grip = (adv % 1) < 0.67 && R > 26.4 && R < 36.2 ? 1 : 0.2;
  const tbmOn = R > 25.5 && R < 44;
  const flash = Math.max(0, 1 - Math.abs(R - 59.6) / 1.2);
  const trainX = interpolate(R, [66.4, 70.5], [-14, 15], C);
  const pile = io(R, 51.6, 56);
  const endIn = io(R, 86, 86.6);
  const tube = (z: number) => SITES.slice(0, -1).map((a, i) => { const b = SITES[i + 1], m = (a + b) / 2; return <React.Fragment key={`${z}${i}`}>
    <XCyl x0={a} x1={a + (m - a) * exc} y={TY} z={z} r={0.1}><meshStandardMaterial color={OR} emissive={hot > 0 ? "#ff3b1f" : OR} emissiveIntensity={0.7 + hot} /></XCyl>
    <XCyl x0={b - (b - m) * exc} x1={b} y={TY} z={z} r={0.1}><meshStandardMaterial color={OR} emissive={hot > 0 ? "#ff3b1f" : OR} emissiveIntensity={0.7 + hot} /></XCyl></React.Fragment>; });
  return (
    <AbsoluteFill style={{ background: "#05080f" }}>
      <ThreeCanvas width={width} height={height} shadows camera={{ fov: 45, position: [20, 3, 9], far: 200 }}>
        <Rig R={R} />
        <color attach="background" args={["#05080f"]} />
        <fog attach="fog" args={["#05080f", 30, 80]} />
        <ambientLight intensity={0.55} />
        <directionalLight position={[10, 18, 12]} intensity={1.9} color="#dfe8ff" />
        <pointLight position={[6, 2, 4]} intensity={30} color={OR} distance={20} />
        {/* montagna in sezione */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, -2]}><planeGeometry args={[120, 60]} /><meshStandardMaterial color="#0d1218" roughness={1} /></mesh>
        <group position={[0, 0, -4]}>{segs.map((g, i) => <mesh key={i} geometry={g}><meshStandardMaterial color={new THREE.Color("#6f7884").lerp(new THREE.Color(GEO[i]), geo)} roughness={0.95} transparent opacity={mOp} depthWrite={false} /></mesh>)}</group>
        {Array.from({ length: 9 }, (_, i) => { const x = -4.5 + i * 0.8; return hM(x) > 3.6 ? <mesh key={i} position={[x, hM(x) - 0.12, -2]}><coneGeometry args={[0.5, 0.5, 6]} /><meshStandardMaterial color="#eef3fa" transparent opacity={0.85} /></mesh> : null; })}
        {/* sondaggi geologici */}
        {geo > 0 && [-10, -7, -4, -1.5, 1.5, 4.5, 8].map((x, i) => { const k = io(R, 5.6 + i * 0.45, 7.2 + i * 0.45), L = (hM(x) - TY) * k; return <mesh key={i} position={[x, hM(x) - L / 2, 0.06]}><cylinderGeometry args={[0.035, 0.035, L + 0.001, 6]} /><meshBasicMaterial color="#fff" transparent opacity={geo} /></mesh>; })}
        {/* tracciato di progetto + canne scavate */}
        {plan > 0 && [TZ - 0.3, TZ + 0.3].map((z) => <XCyl key={z} x0={-12} x1={-12 + 24 * plan} y={TY} z={z} r={0.04}><meshBasicMaterial color="#ffffff" transparent opacity={0.45} /></XCyl>)}
        {(hook || R > 18.6) && <>{tube(TZ - 0.3)}{tube(TZ + 0.3)}</>}
        {/* portale sud ingrandito: 2 canne + cunicoli trasversali */}
        {R > 11.5 && R < 19.5 && <group>
          {[TZ - 0.3, TZ + 0.3].map((z) => <mesh key={z} position={[12.02, TY, z]} rotation={[0, Math.PI / 2, 0]}><ringGeometry args={[0.13, 0.2, 24]} /><meshBasicMaterial color={OR} side={THREE.DoubleSide} /></mesh>)}
          {Array.from({ length: 6 }, (_, i) => <mesh key={i} position={[11.4 - i * 0.9, TY, TZ]} rotation={[Math.PI / 2, 0, 0]} scale={[1, io(R, 14 + i * 0.3, 14.8 + i * 0.3) + 0.001, 1]}><cylinderGeometry args={[0.03, 0.03, 0.6, 6]} /><meshBasicMaterial color="#fff" /></mesh>)}
        </group>}
        {/* cantieri e pozzo di Sedrun */}
        {R > 19 && R < 26 && SITES.map((x, i) => <mesh key={i} position={[x, TY, TZ]} scale={io(R, 19.6 + i * 0.5, 20.2 + i * 0.5) * (1 + 0.15 * Math.sin(R * 5 + i))}><sphereGeometry args={[0.3, 16, 16]} /><meshBasicMaterial color="#fff" /></mesh>)}
        {R > 21 && <mesh position={[-1.5, (hM(-1.5) + TY) / 2, TZ]} scale={[1, io(R, 21.6, 23.5), 1]}><cylinderGeometry args={[0.07, 0.07, hM(-1.5) - TY, 8]} /><meshStandardMaterial color={OR} emissive={OR} emissiveIntensity={0.8} /></mesh>}
        {/* copertura e calore */}
        {R > 44 && R < 51 && <mesh position={[-1.5, TY + ((hM(-1.5) - TY) * io(R, 44.8, 46.2)) / 2, 0.08]}><boxGeometry args={[0.09, (hM(-1.5) - TY) * io(R, 44.8, 46.2) + 0.001, 0.02]} /><meshBasicMaterial color="#fff" /></mesh>}
        {/* smarino */}
        {R > 51 && <group><mesh position={[14.6, 1.1 * pile, -1]} scale={[1, pile + 0.001, 1]}><coneGeometry args={[1.9, 2.2, 20]} /><meshStandardMaterial color="#8d8a84" roughness={1} /></mesh>
          {R < 57.5 && Array.from({ length: 8 }, (_, i) => { const q = (R * 0.6 + i / 8) % 1; return <mesh key={i} position={[12 + 2.6 * q, 0.3 + 2.0 * q, -2 + q]}><boxGeometry args={[0.14, 0.14, 0.14]} /><meshStandardMaterial color="#b7b2a8" /></mesh>; })}</group>}
        {/* incontro dei fronti */}
        {flash > 0 && <><mesh position={[2, TY, TZ + 0.3]} scale={0.2 + 0.7 * flash}><sphereGeometry args={[0.5, 16, 16]} /><meshBasicMaterial color="#fff" transparent opacity={0.8 * flash} /></mesh><pointLight position={[2, 1, 0]} intensity={40 * flash} color="#fff" distance={14} /></>}
        {/* treno */}
        {R > 66.3 && R < 70.6 && <XCyl x0={trainX - 1.6} x1={trainX + 1.6} y={TY} z={TZ + 0.3} r={0.16}><meshBasicMaterial color="#ffffff" /></XCyl>}
        {/* ---------- set della fresa (TBM) ---------- */}
        {tbmOn && <group position={[0, TB, 0]}>
          <pointLight position={[Xh - 1, 2.2, 3.4]} intensity={16} color="#fff" distance={14} /><pointLight position={[-11.5, 1.8, 3]} intensity={14} color="#fff" distance={12} />
          <mesh position={[-4, -1.35, -0.3]}><boxGeometry args={[34, 0.5, 4.2]} /><meshStandardMaterial color="#4a4640" roughness={1} /></mesh>
          <mesh position={[-4, 0.2, -1.75]}><boxGeometry args={[34, 3.4, 1]} /><meshStandardMaterial color="#5d5850" roughness={1} /></mesh>
          <mesh position={[Xh + 0.14 + 4, 0.2, -0.6]}><boxGeometry args={[8, 3.4, 3.3]} /><meshStandardMaterial color="#8a8276" roughness={1} transparent opacity={0.38} depthWrite={false} /></mesh>
          {/* testa rotante */}
          <group position={[Xh, 0, 0]} rotation={[R * 2.2, 0, 0]}>
            <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[1.02, 1.02, 0.2, 40]} /><meshStandardMaterial color="#9aa3ad" metalness={0.8} roughness={0.35} /></mesh>
            {Array.from({ length: 18 }, (_, i) => { const a = i * 2.4, r = 0.18 + (i % 6) * 0.15; return <mesh key={i} position={[0.12, Math.cos(a) * r, Math.sin(a) * r]}><boxGeometry args={[0.08, 0.1, 0.1]} /><meshStandardMaterial color={OR} emissive={OR} emissiveIntensity={0.5} /></mesh>; })}
            {[0, 1, 2].map((i) => <mesh key={i} rotation={[(i * Math.PI) / 3, 0, 0]} position={[0.11, 0, 0]}><boxGeometry args={[0.04, 1.9, 0.07]} /><meshStandardMaterial color="#59616b" /></mesh>)}
          </group>
          <mesh position={[Xh - 0.75, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.96, 0.96, 1.2, 32]} /><meshStandardMaterial color="#d7dbe0" metalness={0.6} roughness={0.4} /></mesh>
          <mesh position={[Xh - 3.2, -0.1, 0]}><boxGeometry args={[4, 0.5, 0.5]} /><meshStandardMaterial color="#7d8791" metalness={0.6} roughness={0.4} /></mesh>
          {[-1, 1].map((s) => <mesh key={s} position={[Xh - 2.4 - 0.55 * ((adv % 1) < 0.67 ? Math.min(1, (adv % 1) * 1.5) : 0), -0.1, s * (0.55 + 0.42 * grip)]}><boxGeometry args={[0.9, 0.9, 0.22]} /><meshStandardMaterial color={OR} emissive={OR} emissiveIntensity={0.4 * grip} /></mesh>)}
          {Array.from({ length: 3 }, (_, i) => <mesh key={i} position={[Xh - 5.6 - i * 1.5, -0.25, 0]}><boxGeometry args={[1.3, 1.0, 1.1]} /><meshStandardMaterial color={i % 2 ? "#59616b" : "#6d7781"} metalness={0.4} roughness={0.6} /></mesh>)}
          {R < 36.4 && Array.from({ length: 10 }, (_, i) => { const q = (R * 0.5 + i / 10) % 1; return <mesh key={i} position={[Xh - 0.4 - 7.5 * q, 0.42, 0.1]}><boxGeometry args={[0.1, 0.08, 0.1]} /><meshStandardMaterial color="#c9c0ae" /></mesh>; })}
          {/* messa in sicurezza: ancoraggi + anelli di rivestimento */}
          {Array.from({ length: 9 }, (_, i) => { const x = -13.6 + i * 0.6, k = io(R, 37.6 + i * 0.4, 38.3 + i * 0.4), kr = io(R, 39.4 + i * 0.35, 40.2 + i * 0.35); return <group key={i} position={[x, 0, 0]}>
            {[1.5, 2.0, 2.5, 3.0].map((a) => <mesh key={a} position={[0, Math.sin(a) * 1.3, Math.cos(a) * 1.3]} rotation={[a - Math.PI / 2, 0, 0]} scale={[1, k + 0.001, 1]}><cylinderGeometry args={[0.025, 0.025, 0.5, 5]} /><meshBasicMaterial color={OR} /></mesh>)}
            <mesh rotation={[0, Math.PI / 2, 0]} scale={kr + 0.001}><torusGeometry args={[1.05, 0.07, 8, 40]} /><meshStandardMaterial color="#d9d6cf" roughness={0.8} /></mesh></group>; })}
        </group>}
      </ThreeCanvas>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 900, background: "linear-gradient(rgba(5,8,15,.9), rgba(5,8,15,.55) 62%, rgba(5,8,15,0))" }} />
      {/* targhetta */}
      <div style={{ position: "absolute", top: 232, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: 1 - endIn }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(7,7,7,.85)", padding: "8px 22px", borderRadius: 40 }}>
          <Img src={staticFile("engiplanet/avatar-engiplanet-simbolo.jpg")} style={{ height: 58, width: 58, borderRadius: 29 }} /><span style={{ fontFamily: INT, fontWeight: 800, fontSize: 34, color: "#fff", letterSpacing: "0.08em" }}>ENGIPLANET</span></div></div>
      <div style={{ position: "absolute", top: 322, left: 0, right: 0, textAlign: "center", fontFamily: INT, fontWeight: 800, fontSize: 30, color: OR, opacity: 1 - endIn }}>LE GRANDI OPERE · #4</div>
      {/* testi */}
      <Txt op={win(R, 0.1, 4.5, 0.2)} it={<><O>57 km</O><br />sotto le Alpi</>} en="57 km under the Alps" size={120} />
      <Txt op={win(R, 1.6, 4.5, 0.2)} top={720} it={<>la galleria ferroviaria<br />più lunga del mondo</>} en="the longest railway tunnel in the world" size={60} />
      <Txt op={win(R, 4.5, 11.5, 0.3)} it={<>1 · Lo studio:<br /><O>leggere la montagna</O></>} en="Step 1 · Study: reading the mountain" size={84} />
      <Txt op={win(R, 6.5, 11.5, 0.3)} top={670} it={<>sondaggi e cunicoli esplorativi:<br />ogni tratto ha una <O>roccia diversa</O></>} en="boreholes and exploratory tunnels: every stretch has different rock" size={56} />
      <Txt op={win(R, 11.5, 18.8, 0.3)} it={<>2 · Il progetto:<br /><O>due canne</O></>} en="Step 2 · Design: two single-track tubes" size={88} />
      <Txt op={win(R, 13.5, 18.8, 0.3)} top={670} it={<>collegate ogni <O>325 m</O> da cunicoli<br />di sicurezza · <O>152 km</O> di scavi in tutto</>} en="linked every 325 m by safety passages · 152 km of tunnels in total" size={56} />
      <Txt op={win(R, 18.8, 25.8, 0.3)} it={<>3 · Il cantiere:<br /><O>5 fronti insieme</O></>} en="Step 3 · Five construction sites at once" size={84} />
      <Txt op={win(R, 20.8, 25.8, 0.3)} top={670} it={<>Erstfeld · Amsteg · Sedrun · Faido · Bodio<br />a Sedrun si scende da un <O>pozzo di 800 m</O></>} en="at Sedrun, workers go down an 800 m deep shaft" size={52} />
      <Txt op={win(R, 25.8, 36.6, 0.3)} it={<>4 · La fresa:<br />lunga <O>410 metri</O></>} en="Step 4 · The tunnel boring machine: 410 m long" size={88} />
      <Txt op={win(R, 28, 32.2, 0.3)} top={670} it={<>la testa ruota e frantuma la roccia:<br />quasi <O>10 m</O> di diametro</>} en="the rotating head crushes the rock: almost 10 m across" size={56} />
      <Txt op={win(R, 32.2, 36.6, 0.3)} top={670} it={<>le <O>ganasce</O> si puntano alla roccia<br />e spingono avanti la macchina</>} en="the grippers brace against the rock and push it forward" size={56} />
      <Txt op={win(R, 36.6, 43.6, 0.3)} it={<>5 · La messa<br />in <O>sicurezza</O></>} en="Step 5 · Securing the tunnel" size={90} />
      <Txt op={win(R, 38.4, 43.6, 0.3)} top={670} it={<>ancoraggi nella roccia, calcestruzzo<br />spruzzato e <O>anelli di rivestimento</O></>} en="rock bolts, sprayed concrete and lining rings" size={56} />
      <Txt op={win(R, 43.6, 50.8, 0.3)} it={<><O>2.300 m</O> di roccia<br />sopra la testa</>} en="2,300 m of rock overhead: the deepest railway tunnel" size={92} />
      <Txt op={win(R, 46.5, 50.8, 0.3)} top={670} it={<>la roccia arriva a <O>46 °C</O>:<br />si lavora con aria raffreddata</>} en="the rock reaches 46 °C: crews work with cooled air" size={58} />
      <Txt op={win(R, 50.8, 57.6, 0.3)} it={<><O>28 milioni</O><br />di tonnellate</>} en="28 million tonnes of excavated rock" size={104} />
      <Txt op={win(R, 52.8, 57.6, 0.3)} top={670} it={<>80% con le frese, 20% con esplosivo.<br />Parte della roccia torna <O>calcestruzzo</O></>} en="80% by TBM, 20% by blasting · part of it is reused as concrete" size={54} />
      <Txt op={win(R, 57.6, 65.6, 0.3)} it={<>15 ottobre 2010:<br /><O>l'incontro</O></>} en="15 October 2010: the breakthrough" size={92} />
      <Txt op={win(R, 60.4, 65.6, 0.3)} top={670} it={<>errore su 57 km: <O>8 cm</O> in orizzontale,<br /><O>1 cm</O> in verticale</>} en="deviation over 57 km: 8 cm horizontally, 1 cm vertically" size={58} />
      <Txt op={win(R, 65.6, 72.4, 0.3)} it={<>2016: <O>si parte</O></>} en="2016: the tunnel opens after 17 years of work" size={110} />
      <Txt op={win(R, 67.6, 72.4, 0.3)} top={640} it={<>treni fino a <O>250 km/h</O><br />sotto le Alpi, in piano</>} en="trains up to 250 km/h, on a flat route under the Alps" size={60} />
      <AbsoluteFill style={{ opacity: win(R, 72.4, 79.5, 0.4), background: "rgba(5,8,15,.93)" }}>
        <Txt op={io(R, 72.6, 73)} top={390} it={<>Il Gottardo<br />in <O>4 numeri</O></>} en="The Gotthard Base Tunnel in four numbers" size={92} />
        {[["57 km", "di lunghezza · length"], ["2.300 m", "di roccia sopra · rock overhead"], ["17 anni", "di lavori · years of work"], ["8 cm", "di errore all'incontro · breakthrough deviation"]].map(([a, b], i) => { const k = io(R, 73.4 + i * 0.8, 74 + i * 0.8);
          return <div key={a} style={{ position: "absolute", left: 110, right: 110, top: 760 + i * 190, display: "flex", alignItems: "baseline", gap: 30, opacity: k, transform: `translateX(${(1 - k) * 120}px)` }}>
            <div style={{ fontFamily: OSW, fontWeight: 700, fontSize: 110, color: OR, minWidth: 400, textAlign: "right" }}>{a}</div>
            <div style={{ fontFamily: INT, fontWeight: 800, fontSize: 32, color: "#fff", lineHeight: 1.2 }}>{b}</div></div>; })}
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: win(R, 79.5, 86.6, 0.3), background: "rgba(5,8,15,.95)" }}>
        <Txt op={io(R, 79.7, 80.1)} top={700} it={<>Quale grande opera<br />vuoi <O>vedere</O>?</>} en="Which great work should be next? Comment below" size={96} />
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: endIn, background: "#000", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 36 }}>
        <Img src={staticFile("engiplanet/logo-engiplanet-originale.jpg")} style={{ width: 560, height: 560, borderRadius: 280 }} />
        <div style={{ fontFamily: INT, fontWeight: 800, fontSize: 36, color: OR, letterSpacing: "0.15em" }}>LE GRANDI OPERE</div>
        <div style={{ fontFamily: OSW, fontWeight: 700, fontSize: 80, color: "#fff", textTransform: "uppercase" }}>Segui per la <span style={{ color: OR }}>#5</span></div>
        <div style={{ fontFamily: INT, fontWeight: 800, fontSize: 40, color: "#ccc" }}>@engiplanet</div>
      </AbsoluteFill>
      <div style={{ position: "absolute", top: 1860, left: 0, right: 0, textAlign: "center", fontFamily: INT, fontWeight: 600, fontSize: 22, color: "#999", opacity: 1 - endIn }}>Animazione 3D illustrativa · proporzioni semplificate</div>
    </AbsoluteFill>
  );
};
