import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { FotoReale } from "./FotoReale";
import { loadFont as loadOswald } from "@remotion/google-fonts/Oswald";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
const { fontFamily: OSW } = loadOswald("normal", { weights: ["700"], subsets: ["latin", "latin-ext"] });
const { fontFamily: INT } = loadInter("normal", { weights: ["600", "800"], subsets: ["latin", "latin-ext"] });

// EngiPlanet · Le Grandi Opere #2 — Torre di Pisa in 3D
const OR = "#D98A58";
const C = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const io = (t: number, a: number, b: number) => interpolate(t, [a, b], [0, 1], { ...C, easing: Easing.out(Easing.cubic) });
const ioe = (t: number, a: number, b: number) => interpolate(t, [a, b], [0, 1], { ...C, easing: Easing.inOut(Easing.cubic) });
const win = (t: number, a: number, b: number, f = 0.3) => Math.min(io(t, a, a + f), 1 - io(t, b - f, b));
export const P3_DUR = 90;
const VIS = 1.5; // esagerazione visiva dell'inclinazione
const H0 = 1.15, HL = 0.86, HB = 0.8, RT = 0.8;
const yOf = (i: number) => (i === 0 ? 0 : H0 + (i - 1) * HL);
const HTOT = H0 + 6 * HL + HB;

const tiltDeg = (R: number) => R < 4 ? 5.5 : interpolate(R, [4, 10, 16, 22, 29, 34, 41, 50, 62], [0, 0, 0.8, 1.0, 1.6, 2.0, 5.5, 5.5, 5.0], C);
const built = (i: number, R: number) => {
  if (R < 4) return 1;
  if (i <= 2) return io(R, 4.6 + i * 1.5, 5.8 + i * 1.5);
  if (i <= 6) return io(R, 22.4 + (i - 3) * 1.4, 23.5 + (i - 3) * 1.4);
  return io(R, 29.6, 31.2);
};

const Level: React.FC<{ i: number; k: number; hl: number }> = ({ i, k, hl }) => {
  if (k <= 0) return null;
  const h = i === 0 ? H0 : i === 7 ? HB : HL, r = i === 7 ? 0.56 : RT, ri = i === 0 ? RT : i === 7 ? 0.5 : 0.6;
  const marble = hl > 0 ? new THREE.Color("#efe9dc").lerp(new THREE.Color(OR), 0.75 * hl) : new THREE.Color("#efe9dc");
  const n = i === 7 ? 6 : 18;
  return (
    <group position={[0, yOf(i), 0]} scale={[1, k, 1]}>
      <mesh position={[0, h / 2, 0]} castShadow><cylinderGeometry args={[ri, ri, h, 40]} /><meshStandardMaterial color={i === 0 ? marble : "#d8d1c0"} roughness={0.6} /></mesh>
      {i > 0 && Array.from({ length: n }, (_, c) => { const a = (c / n) * Math.PI * 2; return <mesh key={c} position={[Math.cos(a) * (r - 0.04), h / 2, Math.sin(a) * (r - 0.04)]} castShadow><cylinderGeometry args={[0.035, 0.035, h - 0.08, 8]} /><meshStandardMaterial color={marble} roughness={0.5} /></mesh>; })}
      {i === 0 && Array.from({ length: 15 }, (_, c) => { const a = (c / 15) * Math.PI * 2; return <mesh key={c} position={[Math.cos(a) * (RT + 0.01), h / 2, Math.sin(a) * (RT + 0.01)]}><cylinderGeometry args={[0.05, 0.05, h - 0.1, 8]} /><meshStandardMaterial color="#fbf8f0" /></mesh>; })}
      <mesh position={[0, h - 0.03, 0]} castShadow><cylinderGeometry args={[r + 0.05, r + 0.05, 0.07, 40]} /><meshStandardMaterial color={marble} roughness={0.5} /></mesh>
      {i === 7 && Array.from({ length: 7 }, (_, c) => { const a = (c / 7) * Math.PI * 2; return <mesh key={`b${c}`} position={[Math.cos(a) * 0.33, 0.42, Math.sin(a) * 0.33]}><coneGeometry args={[0.09, 0.2, 10]} /><meshStandardMaterial color={OR} metalness={0.7} roughness={0.3} emissive={OR} emissiveIntensity={0.25} /></mesh>; })}
    </group>
  );
};

const Rig: React.FC<{ R: number }> = ({ R }) => {
  const { camera } = useThree();
  const K = [0, 4, 10, 21, 24, 33, 35, 41, 43, 47, 49, 62, 66, 90];
  const e = { ...C, easing: Easing.inOut(Easing.cubic) };
  const a = interpolate(R, K, [0.55, 0.25, 0, 0, -0.45, -0.1, 0, 0, -0.3, -0.3, 0, 0, 0.45, 0.95], e);
  const r = interpolate(R, K, [20, 20, 15, 15, 21, 21, 21, 21, 16, 16, 18, 18, 21, 22], e);
  const h = interpolate(R, K, [5, 4.5, 1.6, 1.6, 5, 4.5, 3.5, 3.5, 2.4, 2.4, 1.4, 1.4, 5, 5.5], e);
  const ly = interpolate(R, K, [7, 7, 3.0, 3.0, 7, 7, 7, 7, 5, 5, 4.8, 4.8, 7, 7], e);
  const sh = R > 34 && R < 37 ? Math.sin(R * 50) * 0.04 * (1 - io(R, 35.5, 37)) : 0;
  camera.position.set(Math.sin(a) * r + sh, h, Math.cos(a) * r);
  camera.lookAt(0, ly, 0);
  return null;
};

const Txt: React.FC<{ it: React.ReactNode; en: string; op: number; top?: number; size?: number }> = ({ it, en, op, top = 400, size = 96 }) => (
  <div style={{ position: "absolute", left: 60, right: 60, top, textAlign: "center", opacity: op, transform: `translateY(${(1 - op) * 30}px)` }}>
    <div style={{ fontFamily: OSW, fontWeight: 700, fontSize: size, lineHeight: 1.04, color: "#fff", textTransform: "uppercase", textShadow: "0 6px 30px rgba(0,0,0,.9)" }}>{it}</div>
    <div style={{ fontFamily: INT, fontWeight: 600, fontStyle: "italic", fontSize: 38, color: "#d8d8d8", marginTop: 14, textShadow: "0 4px 20px rgba(0,0,0,.9)" }}>{en}</div>
  </div>
);
const O: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: OR }}>{children}</span>;

export const Pisa3D: React.FC = () => {
  const f = useCurrentFrame(); const { width, height } = useVideoConfig(); const R = f / 30;
  const deg = tiltDeg(R), th = (-deg * VIS * Math.PI) / 180; // rotazione attorno a z: negativa = verso +x (sud)
  const banana = R < 4 ? 1 : io(R, 22.4, 28);
  const hl = win(R, 22.2, 29, 0.5);
  const sink = R < 4 ? 1 : io(R, 10.5, 16);
  const soilView = win(R, 10, 22, 0.8);
  const lead = Math.floor(interpolate(R, [42, 46.5], [0, 24], C));
  const drill = (k: number) => io(R, 49.5 + k * 0.7, 52 + k * 0.7) * (1 - io(R, 62.5, 64));
  const year = Math.round(interpolate(R, [16.6, 20], [1178, 1272], C));
  const topX = Math.sin(-th) * HTOT, topY = Math.cos(th) * HTOT;
  const plumb = win(R, 35.5, 41.5, 0.4);
  const endIn = io(R, 86, 86.6);
  const degTxt = interpolate(R, [34.5, 37, 52, 62], [2.0, 5.5, 5.5, 5.0], C).toFixed(1).replace(".", ",");
  return (
    <AbsoluteFill style={{ background: "#07090c" }}>
      <ThreeCanvas width={width} height={height} shadows camera={{ fov: 45, position: [6, 4, 15] }}>
        <Rig R={R} />
        <color attach="background" args={["#07090c"]} />
        <fog attach="fog" args={["#07090c", 22, 46]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[7, 12, 9]} intensity={2.2} castShadow shadow-mapSize={[2048, 2048]} shadow-camera-left={-10} shadow-camera-right={10} shadow-camera-top={12} shadow-camera-bottom={-6} />
        <pointLight position={[-3, 4, 4]} intensity={14} color={OR} distance={16} />
        {/* plastico: prato + terreno in sezione */}
        <mesh position={[0, -0.02, -4.4]} receiveShadow><boxGeometry args={[18, 0.04, 11.2]} /><meshStandardMaterial color="#27412b" roughness={1} /></mesh>
        <mesh position={[0, -0.4, -4.4]}><boxGeometry args={[18, 0.76, 11.2]} /><meshStandardMaterial color="#b29668" roughness={1} /></mesh>
        <mesh position={[0, -2.0, -4.4]}><boxGeometry args={[18, 2.4, 11.2]} /><meshStandardMaterial color="#6f5b49" roughness={1} /></mesh>
        <mesh position={[0, -3.6, -4.4]}><boxGeometry args={[18, 0.8, 11.2]} /><meshStandardMaterial color="#8d7a5c" roughness={1} /></mesh>
        {/* argilla che si schiaccia sotto il lato sud */}
        <mesh position={[0.55, -1.25, 1.22]} scale={[1.9, 0.9 * sink + 0.001, 0.02]}><sphereGeometry args={[1, 32, 16]} /><meshBasicMaterial color="#3b2e24" transparent opacity={0.85 * sink} /></mesh>
        {/* fondazione */}
        <mesh position={[0, -0.25, 0]} rotation={[0, 0, th]}><cylinderGeometry args={[1.15, 1.15, 0.5, 40]} /><meshStandardMaterial color="#9c9485" /></mesh>
        {/* torre */}
        <group rotation={[0, 0, th]}>
          {[0, 1, 2].map((i) => <Level key={i} i={i} k={built(i, R)} hl={0} />)}
          <group position={[0, yOf(3), 0]} rotation={[0, 0, (banana * 1.4 * VIS * Math.PI) / 180]}><group position={[0, -yOf(3), 0]}>
            {[3, 4, 5, 6, 7].map((i) => <Level key={i} i={i} k={built(i, R)} hl={i < 7 ? hl : 0} />)}
          </group></group>
        </group>
        {/* filo a piombo */}
        {plumb > 0 && <group>
          <mesh position={[topX, topY / 2, 0.95]}><cylinderGeometry args={[0.02, 0.02, topY, 6]} /><meshBasicMaterial color="#fff" transparent opacity={plumb} /></mesh>
          <mesh position={[topX, 0.12, 0.95]}><coneGeometry args={[0.1, 0.24, 10]} /><meshBasicMaterial color={OR} transparent opacity={plumb} /></mesh>
          <mesh position={[topX / 2 + 0.4, 0.03, 0.95]}><boxGeometry args={[Math.abs(topX - 0.8), 0.05, 0.05]} /><meshBasicMaterial color={OR} transparent opacity={plumb} /></mesh>
        </group>}
        {/* lingotti di piombo sul lato nord */}
        {Array.from({ length: lead }, (_, i) => <mesh key={i} position={[-1.05 - (i % 4) * 0.27, 0.07 + Math.floor(i / 8) * 0.14, 0.2 + ((Math.floor(i / 4) % 2) ? 0.3 : -0.3)]} castShadow><boxGeometry args={[0.24, 0.12, 0.5]} /><meshStandardMaterial color="#8f99a6" metalness={0.8} roughness={0.35} /></mesh>)}
        {/* trivelle inclinate */}
        {[0, 1, 2].map((k) => { const d = drill(k); if (d <= 0) return null; const x0 = -4.6 - k * 0.5, x1 = -0.5 + k * 0.12, y1 = -0.85 - k * 0.2;
          const L = Math.hypot(x1 - x0, y1) * d, ang = Math.atan2(y1, x1 - x0);
          return <group key={k} position={[x0, 0, 1.3]} rotation={[0, 0, ang]}>
            <mesh position={[L / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.06, 0.06, L, 10]} /><meshStandardMaterial color={OR} emissive={OR} emissiveIntensity={0.6} /></mesh>
            {R > 53 && Array.from({ length: 4 }, (_, j) => { const q = 1 - ((R * 0.5 + j * 0.25 + k * 0.1) % 1); return <mesh key={j} position={[L * q, 0.12, 0]}><sphereGeometry args={[0.06, 8, 8]} /><meshBasicMaterial color="#e2c9a0" /></mesh>; })}
          </group>; })}
      </ThreeCanvas>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 900, background: "linear-gradient(rgba(7,9,12,.88), rgba(7,9,12,.55) 62%, rgba(7,9,12,0))" }} />
      {/* etichette del terreno */}
      <div style={{ position: "absolute", left: 60, top: 1410, opacity: soilView, fontFamily: INT, fontWeight: 800, fontSize: 30, color: "#f1dfc0", textShadow: "0 2px 10px #000" }}>SABBIA E LIMO</div>
      <div style={{ position: "absolute", left: 60, top: 1560, opacity: soilView, fontFamily: INT, fontWeight: 800, fontSize: 30, color: "#f1dfc0", textShadow: "0 2px 10px #000" }}>ARGILLA MOLLE</div>
      <div style={{ position: "absolute", left: 60, right: 60, top: 1310, display: "flex", justifyContent: "space-between", opacity: soilView, fontFamily: OSW, fontWeight: 700, fontSize: 40, color: OR }}><span>← NORD</span><span>SUD →</span></div>
      {/* targhetta */}
      <div style={{ position: "absolute", top: 232, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: 1 - endIn }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(7,7,7,.85)", padding: "8px 22px", borderRadius: 40 }}>
          <Img src={staticFile("engiplanet/avatar-engiplanet-simbolo.jpg")} style={{ height: 58, width: 58, borderRadius: 29 }} /><span style={{ fontFamily: INT, fontWeight: 800, fontSize: 34, color: "#fff", letterSpacing: "0.08em" }}>ENGIPLANET</span></div></div>
      <div style={{ position: "absolute", top: 322, left: 0, right: 0, textAlign: "center", fontFamily: INT, fontWeight: 800, fontSize: 30, color: OR, opacity: 1 - endIn }}>LE GRANDI OPERE · #2</div>
      {/* testi */}
      <Txt op={win(R, 0.1, 4, 0.2)} it={<>Pende da <O>850 anni</O></>} en="It has been leaning for 850 years" size={110} />
      <Txt op={win(R, 1.2, 4, 0.2)} top={640} it={<>Perché non cade?</>} en="Why doesn't it fall?" size={84} />
      <Txt op={win(R, 4, 10, 0.3)} it={<>Pisa, <O>1173</O>:<br />si comincia</>} en="Pisa, 1173: construction begins" />
      <Txt op={win(R, 5.5, 10, 0.3)} top={700} it={<>marmo bianco · 8 ordini<br />circa <O>56 metri</O></>} en="white marble · 8 storeys · about 56 metres" size={62} />
      <Txt op={win(R, 10, 16, 0.3)} it={<>Al 3° piano<br />il terreno <O>cede</O></>} en="At the third storey, the ground gives way" size={92} />
      <Txt op={win(R, 11.5, 16, 0.3)} top={700} it={<>sotto c'è <O>argilla molle</O>:<br />il lato sud sprofonda</>} en="soft clay below: the south side sinks" size={62} />
      <Txt op={win(R, 16, 22, 0.3)} it={<>Guerre: cantiere fermo<br /><O>{year}</O></>} en="Wars: work stops for almost a century" size={88} />
      <Txt op={win(R, 18, 22, 0.3)} top={700} it={<>la pausa <O>la salva</O>: l'argilla<br />ha il tempo di consolidarsi</>} en="the pause saves it: the clay has time to consolidate" size={60} />
      <Txt op={win(R, 22, 29, 0.3)} it={<>I costruttori<br /><O>correggono</O></>} en="The builders try to correct it" />
      <Txt op={win(R, 24, 29, 0.3)} top={700} it={<>piani più alti da un lato:<br />la torre è <O>curva, a banana</O></>} en="taller on one side: the tower is curved like a banana" size={60} />
      <Txt op={win(R, 29, 34, 0.3)} it={<><O>1372</O>: la cella<br />campanaria</>} en="1372: the bell chamber, with 7 bells" size={92} />
      <Txt op={win(R, 30.5, 34, 0.3)} top={700} it={<><O>7 campane</O> · quasi 200 anni<br />per finirla</>} en="seven bells · almost 200 years to complete" size={60} />
      <Txt op={win(R, 34, 41.5, 0.3)} it={<>1990: <O>{degTxt}°</O></>} en="1990: the tilt reaches 5.5 degrees" size={120} />
      <Txt op={win(R, 36, 41.5, 0.3)} top={600} it={<>cima fuori piombo di <O>oltre 4 m</O><br />e si muove di 1,5 mm l'anno</>} en="the top overhangs by more than 4 m, moving 1.5 mm a year" size={58} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 1230, display: "flex", justifyContent: "center", opacity: win(R, 38, 41.5, 0.25) }}>
        <div style={{ transform: `rotate(-8deg) scale(${1.5 - 0.5 * io(R, 38, 38.3)})`, border: "9px solid #e5484d", borderRadius: 16, padding: "10px 40px", background: "rgba(7,7,7,.85)", fontFamily: OSW, fontWeight: 700, fontSize: 76, color: "#e5484d" }}>CHIUSA AL PUBBLICO</div></div>
      <Txt op={win(R, 41.5, 48, 0.3)} it={<>Primo intervento:<br /><O>il piombo</O></>} en="First step: lead counterweights" size={92} />
      <Txt op={win(R, 43, 48, 0.3)} top={700} it={<>centinaia di tonnellate di lingotti<br />sul <O>lato nord</O>, per fermarla</>} en="hundreds of tonnes of lead ingots on the north side" size={58} />
      <Txt op={win(R, 48, 56, 0.3)} it={<>La soluzione:<br /><O>sottoescavazione</O></>} en="The solution: underexcavation" size={90} />
      <Txt op={win(R, 50, 56, 0.3)} top={700} it={<>trivelle inclinate tolgono terra<br />sotto il <O>lato nord</O>, poco alla volta</>} en="angled drills remove soil under the north side, little by little" size={58} />
      <Txt op={win(R, 56, 63, 0.3)} it={<>La torre<br /><O>torna indietro</O></>} en="The tower moves back" />
      <Txt op={win(R, 57.5, 63, 0.3)} top={700} it={<>oltre <O>40 cm</O> in cima:<br />circa il 10% di pendenza in meno</>} en="over 40 cm at the top: about 10% less tilt" size={60} />
      <Txt op={win(R, 63, 70, 0.3)} it={<>2001: <O>riapre</O></>} en="2001: it reopens to the public" size={110} />
      <Txt op={win(R, 64.5, 70, 0.3)} top={640} it={<>dal 2008 i sensori<br />la danno <O>ferma</O></>} en="since 2008, sensors show it has stopped moving" size={64} />
      <AbsoluteFill style={{ opacity: win(R, 70, 78.4, 0.4), background: "rgba(7,7,7,.72)" }}>
        <Txt op={io(R, 70.2, 70.7)} top={620} it={<>Non l'hanno<br />raddrizzata.</>} en="They didn't straighten it." size={100} />
        <Txt op={io(R, 72.5, 73)} top={960} it={<><O>L'hanno salvata.</O></>} en="They saved it." size={124} />
      </AbsoluteFill>
      <FotoReale R={R} a={78.4} b={83.2} img="fotoreali/pisa.jpg" place="Piazza dei Miracoli · Pisa" credit="__CREDIT_pisa__" />
      <AbsoluteFill style={{ opacity: win(R, 83, 86.6, 0.3), background: "rgba(7,7,7,.95)" }}>
        <Txt op={io(R, 83.2, 83.6)} top={700} it={<>Quale grande opera<br />vuoi <O>vedere</O>?</>} en="Which great work should be next? Comment below" size={96} />
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: endIn, background: "#000", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 36 }}>
        <Img src={staticFile("engiplanet/logo-engiplanet-originale.jpg")} style={{ width: 560, height: 560, borderRadius: 280 }} />
        <div style={{ fontFamily: INT, fontWeight: 800, fontSize: 36, color: OR, letterSpacing: "0.15em" }}>LE GRANDI OPERE</div>
        <div style={{ fontFamily: OSW, fontWeight: 700, fontSize: 80, color: "#fff", textTransform: "uppercase" }}>Segui per la <span style={{ color: OR }}>#3</span></div>
        <div style={{ fontFamily: INT, fontWeight: 800, fontSize: 40, color: "#ccc" }}>@engiplanet</div>
      </AbsoluteFill>
      <div style={{ position: "absolute", top: 1860, left: 0, right: 0, textAlign: "center", fontFamily: INT, fontWeight: 600, fontSize: 22, color: "#999", opacity: 1 - endIn }}>Animazione 3D illustrativa · inclinazione accentuata per renderla visibile</div>
    </AbsoluteFill>
  );
};
