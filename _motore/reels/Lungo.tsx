import React from "react";
import { AbsoluteFill, Audio, Img, interpolate, staticFile, useCurrentFrame, Easing } from "remotion";
import { loadFont as loadOswald } from "@remotion/google-fonts/Oswald";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
const { fontFamily: OSW } = loadOswald("normal", { weights: ["700"], subsets: ["latin", "latin-ext"] });
const { fontFamily: INT } = loadInter("normal", { weights: ["600", "800"], subsets: ["latin", "latin-ext"] });

// Video lunghi 1920x1080 nello stile «animazione ingegneristica»
const OR = "#F07A35", BLUE = "#7fb6e0";
const ease = Easing.out(Easing.cubic);
const C = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const io = (t: number, a: number, b: number, from = 0, to = 1) => interpolate(t, [a, b], [from, to], { ...C, easing: ease });
const win = (t: number, a: number, b: number, f = 0.3) => Math.min(io(t, a, a + f), 1 - io(t, b - f, b));
const pop = (lt: number, at: number) => { const k = io(lt, at, at + 0.35); return { opacity: k, transform: `translateY(${(1 - k) * 30}px) scale(${0.92 + 0.08 * k})` }; };

type S = any;
export type LungoProps = { title: string; T0: number; cues: Record<string, number>; blocks: { t: number; d: number; cap: string }[]; scenes: S[]; total: number; audio: string };

const Rich: React.FC<{ text: string }> = ({ text }) => (
  <>{(text || "").split("\n").map((ln, i) => (
    <div key={i}>{ln.split(/(\[\[.*?\]\])/).map((p, j) => p.startsWith("[[") ? <span key={j} style={{ color: OR }}>{p.slice(2, -2)}</span> : <span key={j}>{p}</span>)}</div>
  ))}</>
);
const Kick: React.FC<{ s?: string; st?: React.CSSProperties }> = ({ s, st }) => s ? (
  <div style={{ fontFamily: INT, fontWeight: 800, fontSize: 38, color: OR, textTransform: "uppercase", letterSpacing: "0.12em", ...st }}>{s}</div>) : null;
const Title: React.FC<{ s?: string; size?: number; st?: React.CSSProperties }> = ({ s, size = 110, st }) => s ? (
  <div style={{ fontFamily: OSW, fontWeight: 700, fontSize: Math.min(size, 150), lineHeight: 1.05, color: "#fff", textTransform: "uppercase", ...st }}><Rich text={s} /></div>) : null;
const Sub: React.FC<{ s?: string; st?: React.CSSProperties }> = ({ s, st }) => s ? (
  <div style={{ fontFamily: INT, fontWeight: 600, fontSize: 44, lineHeight: 1.3, color: "#e8e8e8", ...st }}><Rich text={s} /></div>) : null;

// ---------- icone animate (viewBox 200) ----------
export const Icon: React.FC<{ n: string; lt: number; size?: number; color?: string }> = ({ n, lt, size = 200, color = "#fff" }) => {
  const s = Math.sin, W = color, sw = 7;
  const g = (() => {
    switch (n) {
      case "sole": return <g><g transform={`rotate(${lt * 25} 100 100)`}>{Array.from({ length: 12 }, (_, i) => <line key={i} x1={100} y1={30 - 6 * s(lt * 4 + i)} x2={100} y2={52} stroke={OR} strokeWidth={8} strokeLinecap="round" transform={`rotate(${i * 30} 100 100)`} />)}</g><circle cx={100} cy={100} r={38 + 2 * s(lt * 3)} fill={OR} /></g>;
      case "luna": return <g><path d="M120,40 A62,62 0 1,0 150,140 A50,50 0 1,1 120,40 Z" fill="#e6e6e6" />{[[40, 50], [160, 60], [60, 160]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={5} fill="#fff" opacity={0.3 + 0.7 * Math.abs(s(lt * 2 + i * 2))} />)}</g>;
      case "batteria": { const k = (lt * 0.35) % 1; return <g><rect x={30} y={60} width={130} height={80} rx={12} fill="none" stroke={W} strokeWidth={sw} /><rect x={160} y={85} width={14} height={30} rx={4} fill={W} /><rect x={40} y={70} width={110 * k} height={60} rx={6} fill={OR} /><path d="M100,72 L84,104 L100,104 L92,130 L118,94 L102,94 Z" fill="#fff" opacity={0.9} /></g>; }
      case "casa": return <g><path d="M30,100 L100,40 L170,100" fill="none" stroke={W} strokeWidth={sw} strokeLinejoin="round" /><rect x={50} y={95} width={100} height={75} fill="none" stroke={W} strokeWidth={sw} /><rect x={65} y={110} width={28} height={24} fill={OR} opacity={0.4 + 0.6 * Math.max(0, s(lt * 2))} /><rect x={108} y={110} width={28} height={24} fill={OR} opacity={0.4 + 0.6 * Math.max(0, s(lt * 2 + 2))} /><rect x={88} y={140} width={24} height={30} fill={W} /></g>;
      case "rete": return <g><path d="M60,175 L85,35 L115,35 L140,175 M70,120 L130,120 M78,80 L122,80 M60,60 L140,60" fill="none" stroke={W} strokeWidth={6} />{[0, 1, 2, 3].map((i) => { const x = ((lt * 50 + i * 50) % 200); return <circle key={i} cx={x} cy={60} r={6} fill={OR} />; })}</g>;
      case "pannello": { const x = ((lt * 80) % 300) - 50; return <g><clipPath id="pc"><path d="M40,60 L170,60 L150,150 L20,150 Z" /></clipPath><path d="M40,60 L170,60 L150,150 L20,150 Z" fill="#1d2a3a" stroke={W} strokeWidth={6} /><g clipPath="url(#pc)"><path d="M75,60 L55,150 M110,60 L90,150 M140,60 L120,150 M30,105 L160,105" stroke="#8aa" strokeWidth={3} /><rect x={x} y={40} width={30} height={140} fill="rgba(255,255,255,.35)" transform={`skewX(-20)`} /></g><line x1={95} y1={150} x2={95} y2={180} stroke={W} strokeWidth={6} /></g>; }
      case "pompa": return <g><rect x={25} y={45} width={150} height={115} rx={10} fill="none" stroke={W} strokeWidth={sw} /><circle cx={80} cy={102} r={40} fill="none" stroke={W} strokeWidth={4} /><g transform={`rotate(${lt * 400} 80 102)`}>{[0, 120, 240].map((a) => <path key={a} d="M80,102 Q95,75 80,66 Q70,85 80,102" fill={OR} transform={`rotate(${a} 80 102)`} />)}</g>{[0, 1, 2].map((i) => <line key={i} x1={135} x2={160} y1={75 + i * 25} y2={75 + i * 25} stroke={W} strokeWidth={4} />)}</g>;
      case "auto": return <g><path d="M25,130 L35,95 Q45,75 70,75 L130,75 Q150,75 160,95 L175,130 Z" fill="none" stroke={W} strokeWidth={sw} strokeLinejoin="round" /><circle cx={60} cy={135} r={16} fill={W} /><circle cx={140} cy={135} r={16} fill={W} /><path d="M105,85 L92,108 L104,108 L96,128 L118,100 L106,100 Z" fill={OR} opacity={0.5 + 0.5 * Math.abs(s(lt * 4))} /></g>;
      case "induzione": return <g><rect x={20} y={50} width={160} height={100} rx={12} fill="none" stroke={W} strokeWidth={sw} />{[[65, 100, 30], [140, 100, 22]].map(([x, y, r], i) => <g key={i}><circle cx={x} cy={y} r={r} fill="none" stroke={OR} strokeWidth={5} opacity={0.5 + 0.5 * Math.abs(s(lt * 3 + i))} /><circle cx={x} cy={y} r={r - 12} fill="none" stroke={OR} strokeWidth={3} opacity={0.4} /></g>)}</g>;
      case "ingranaggio": return <g transform={`rotate(${lt * 60} 100 100)`}>{Array.from({ length: 8 }, (_, i) => <rect key={i} x={90} y={30} width={20} height={30} rx={4} fill={W} transform={`rotate(${i * 45} 100 100)`} />)}<circle cx={100} cy={100} r={48} fill="none" stroke={W} strokeWidth={14} /><circle cx={100} cy={100} r={14} fill={OR} /></g>;
      case "euro": return <g transform={`translate(100 100) scale(${Math.cos(lt * 2.5)} 1) translate(-100 -100)`}><circle cx={100} cy={100} r={70} fill={OR} /><text x={100} y={128} textAnchor="middle" fontFamily={OSW} fontWeight={700} fontSize={90} fill="#fff">€</text></g>;
      case "bolletta": return <g><path d="M50,25 L150,25 L150,175 L135,165 L120,175 L105,165 L90,175 L75,165 L60,175 L50,165 Z" fill="none" stroke={W} strokeWidth={6} strokeLinejoin="round" />{[0, 1, 2].map((i) => <rect key={i} x={68} y={55 + i * 22} width={64 * io(lt, 0.2 + i * 0.3, 0.6 + i * 0.3)} height={7} rx={3} fill={W} />)}<text x={100} y={150} textAnchor="middle" fontFamily={OSW} fontWeight={700} fontSize={40} fill={OR}>€</text></g>;
      case "contratto": { const k = (lt * 0.7) % 1; return <g><rect x={45} y={25} width={110} height={150} rx={6} fill="none" stroke={W} strokeWidth={6} />{[0, 1, 2].map((i) => <line key={i} x1={65} x2={135} y1={55 + i * 22} y2={55 + i * 22} stroke={W} strokeWidth={5} />)}<path d={`M65,140 ${Array.from({ length: 8 }, (_, i) => `L${65 + i * 9 * k},${140 - (i % 2) * 14}`).join(" ")}`} fill="none" stroke={OR} strokeWidth={4} /><g transform={`translate(${65 + 63 * k},${120})`}><path d="M0,20 L10,-30 L22,-26 L12,24 Z" fill={OR} /></g></g>; }
      case "libro": return <g><path d="M100,50 L100,165 M100,50 Q60,30 25,45 L25,160 Q60,145 100,165 Q140,145 175,160 L175,45 Q140,30 100,50" fill="none" stroke={W} strokeWidth={6} strokeLinejoin="round" /><path d="M100,50 Q130,35 165,48 L165,150 Q130,140 100,158 Z" fill={OR} opacity={0.6} transform={`translate(100 0) scale(${Math.cos(lt * 2)} 1) translate(-100 0)`} /></g>;
      case "calendario": return <g><rect x={30} y={40} width={140} height={130} rx={10} fill="none" stroke={W} strokeWidth={6} /><rect x={30} y={40} width={140} height={32} rx={8} fill={OR} />{Array.from({ length: 9 }, (_, i) => <circle key={i} cx={60 + (i % 3) * 40} cy={98 + Math.floor(i / 3) * 25} r={5} fill={W} />)}<path d="M120,140 L135,155 L162,120" fill="none" stroke={OR} strokeWidth={8} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - io(lt % 3, 0.3, 0.9)} /></g>;
      case "lente": return <g transform={`translate(${12 * s(lt * 1.5)},${10 * Math.cos(lt * 1.5)})`}><circle cx={85} cy={85} r={45} fill="rgba(240,122,53,.15)" stroke={W} strokeWidth={9} /><line x1={118} y1={118} x2={165} y2={165} stroke={W} strokeWidth={14} strokeLinecap="round" /></g>;
      case "neve": return <g><g transform={`rotate(${lt * 15} 100 100)`}>{[0, 60, 120].map((a) => <g key={a} transform={`rotate(${a} 100 100)`}><line x1={100} y1={35} x2={100} y2={165} stroke={BLUE} strokeWidth={7} strokeLinecap="round" /><path d="M85,50 L100,62 L115,50 M85,150 L100,138 L115,150" fill="none" stroke={BLUE} strokeWidth={5} /></g>)}</g></g>;
      case "fiamma": { const f = 1 + 0.08 * s(lt * 13) + 0.04 * s(lt * 29); return <g transform={`translate(100 175) scale(${1 / f} ${f}) translate(-100 -175)`}><path d="M100,25 C130,70 160,95 150,135 C142,165 120,178 100,178 C80,178 58,165 50,135 C42,105 70,90 75,60 C85,80 95,85 100,25 Z" fill={OR} /><path d="M100,95 C112,115 125,128 120,148 C116,162 108,168 100,168 C92,168 82,160 80,148 C78,132 92,125 100,95 Z" fill="#ffd27a" /></g>; }
      case "ok": return <g><circle cx={100} cy={100} r={70} fill="none" stroke={OR} strokeWidth={9} /><path d="M65,102 L90,127 L138,75" fill="none" stroke="#fff" strokeWidth={12} strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - io(lt, 0.15, 0.6)} /></g>;
      case "x": return <g><circle cx={100} cy={100} r={70} fill="none" stroke="#888" strokeWidth={9} /><path d="M72,72 L128,128 M128,72 L72,128" fill="none" stroke="#fff" strokeWidth={12} strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - io(lt, 0.15, 0.6)} /></g>;
      case "scudo": return <g><path d="M100,25 L165,50 L160,110 Q150,155 100,178 Q50,155 40,110 L35,50 Z" fill="none" stroke={W} strokeWidth={sw} strokeLinejoin="round" /><path d="M72,100 L93,121 L130,82" fill="none" stroke={OR} strokeWidth={10} strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - io(lt, 0.2, 0.7)} /></g>;
      case "infissi": { const x = 30 + Math.abs(((lt * 60) % 120) - 60); return <g><rect x={70} y={30} width={100} height={140} fill="none" stroke={W} strokeWidth={sw} /><line x1={120} y1={30} x2={120} y2={170} stroke={W} strokeWidth={5} /><line x1={70} y1={100} x2={170} y2={100} stroke={W} strokeWidth={5} /><path d={`M${x - 30},100 L${x},100 M${x - 10},88 L${x},100 L${x - 10},112`} fill="none" stroke={BLUE} strokeWidth={6} strokeLinecap="round" /></g>; }
      case "mattone": return <g>{Array.from({ length: 4 }, (_, r) => Array.from({ length: 3 }, (_, c) => <rect key={`${r}${c}`} x={25 + c * 52 + (r % 2) * 26 - 13} y={40 + r * 32} width={48} height={28} rx={3} fill={(r + c) % 3 === 0 ? OR : "#666"} opacity={io(lt, 0.05 * (r * 3 + c), 0.05 * (r * 3 + c) + 0.3)} />))}</g>;
      case "impianto": return <g>{Array.from({ length: 5 }, (_, i) => <rect key={i} x={40 + i * 26} y={70} width={18} height={95} rx={8} fill="none" stroke={W} strokeWidth={5} />)}{[0, 1, 2].map((i) => <path key={i} d={`M${60 + i * 40},60 q8,-12 0,-24 q-8,-12 0,-24`} fill="none" stroke={OR} strokeWidth={5} opacity={0.4 + 0.6 * Math.abs(s(lt * 3 + i))} transform={`translate(0 ${-4 * ((lt * 2 + i) % 2)})`} />)}</g>;
      case "superficie": { const k = 1 + 0.1 * s(lt * 3); return <g transform={`translate(100 100) scale(${k}) translate(-100 -100)`}><rect x={55} y={55} width={90} height={90} fill="rgba(240,122,53,.2)" stroke={W} strokeWidth={6} />{[[100, 30, 0], [170, 100, 90], [100, 170, 180], [30, 100, 270]].map(([x, y, r], i) => <path key={i} d="M-12,6 L0,-8 L12,6" fill="none" stroke={OR} strokeWidth={6} transform={`translate(${x} ${y}) rotate(${r})`} />)}</g>; }
      case "warn": return <g><path d="M100,25 L180,165 L20,165 Z" fill="none" stroke={OR} strokeWidth={9} strokeLinejoin="round" /><text x={100} y={150} textAnchor="middle" fontFamily={OSW} fontWeight={700} fontSize={90} fill="#fff" opacity={0.6 + 0.4 * Math.abs(s(lt * 3))}>!</text></g>;
      default: return <circle cx={100} cy={100} r={60} fill={OR} />;
    }
  })();
  return <svg width={size} height={size} viewBox="0 0 200 200" style={{ overflow: "visible" }}>{g}</svg>;
};

// ---------- illustrazioni grandi (viewBox 800x700) ----------
const Flow: React.FC<{ d: string; lt: number; color?: string; n?: number; on?: number }> = ({ d, lt, color = OR, n = 7, on = 1 }) => (
  <g opacity={on}>
    <path d={d} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth={8} strokeLinecap="round" />
    <path d={d} fill="none" stroke={color} strokeWidth={8} strokeLinecap="round" pathLength={100} strokeDasharray="3 11" strokeDashoffset={-lt * 40} />
  </g>
);
const House: React.FC<{ lt: number; lights?: number }> = ({ lt, lights = 0.5 }) => (
  <g>
    <path d="M400,330 L560,210 L720,330" fill="#151515" stroke="#fff" strokeWidth={6} strokeLinejoin="round" />
    <rect x={430} y={325} width={260} height={230} fill="#151515" stroke="#fff" strokeWidth={6} />
    {[[460, 360], [610, 360]].map(([x, y], i) => <rect key={i} x={x} y={y} width={55} height={50} fill={OR} opacity={lights * (0.75 + 0.25 * Math.sin(lt * 2 + i))} />)}
    <rect x={530} y={455} width={60} height={100} fill="#333" />
  </g>
);
const Panels: React.FC<{ lt: number; shine: number }> = ({ lt, shine }) => (
  <g>{[0, 1, 2].map((i) => <path key={i} d={`M${445 + i * 48},${300 - i * 36} L${490 + i * 48},${266 - i * 36} L${520 + i * 48},${290 - i * 36} L${475 + i * 48},${324 - i * 36} Z`} fill="#1d2a3a" stroke="#9ab" strokeWidth={3} />)}
    <path d="M440,330 L600,210" stroke={`rgba(255,255,255,${0.5 * shine * Math.abs(Math.sin(lt * 1.5))})`} strokeWidth={14} /></g>
);
export const Illus: React.FC<{ n: string; lt: number; d: number; s?: S }> = ({ n, lt, d, s }) => {
  const sin = Math.sin;
  const ground = <line x1={20} y1={555} x2={780} y2={555} stroke="#333" strokeWidth={4} />;
  switch (n) {
    case "day": case "night": case "grid": {
      const night = n === "night";
      const sunX = interpolate(lt, [0, d], [120, 300], C), sunY = 140 - 40 * sin(Math.PI * Math.min(1, lt / d));
      return <g>{ground}
        {night ? <g transform="translate(70 40) scale(0.7)"><Icon n="luna" lt={lt} /></g> : <g transform={`translate(${sunX - 70} ${sunY - 70}) scale(0.7)`}><Icon n="sole" lt={lt} /></g>}
        {!night && Array.from({ length: 5 }, (_, i) => <line key={i} x1={sunX} y1={sunY} x2={470 + i * 25} y2={290 - i * 18} stroke="rgba(240,122,53,.25)" strokeWidth={3} strokeDasharray="6 10" strokeDashoffset={-lt * 30} />)}
        <House lt={lt} lights={night ? 1 : 0.15} /><Panels lt={lt} shine={night ? 0 : 1} />
        <g transform="translate(90 450)"><rect x={0} y={0} width={150} height={100} rx={12} fill="#151515" stroke="#fff" strokeWidth={6} /><rect x={12} y={12} width={126 * (night ? 1 - 0.6 * Math.min(1, lt / d) : n === "grid" ? 0.05 : 0.2 + 0.8 * Math.min(1, lt / d))} height={76} rx={6} fill={OR} /><text x={75} y={135} textAnchor="middle" fontFamily={INT} fontWeight={800} fontSize={26} fill="#ccc">BATTERIA</text></g>
        <g transform="translate(720 300) scale(0.55)"><Icon n="rete" lt={lt} /></g><text x={775} y={430} textAnchor="middle" fontFamily={INT} fontWeight={800} fontSize={26} fill="#ccc">RETE</text>
        {n === "day" && <Flow d="M470,300 C380,330 300,400 240,470" lt={lt} on={io(lt, 1.6, 2.2)} />}
        {n === "day" && <Flow d="M520,300 L560,380" lt={lt} />}
        {night && <Flow d="M240,500 C320,520 380,520 430,500" lt={lt} on={io(lt, 1.8, 2.4)} />}
        {n === "grid" && <Flow d="M600,250 C660,250 720,280 755,330" lt={lt} on={io(lt, 0.8, 1.4)} />}
      </g>;
    }
    case "pdcneve": return <g>{ground}<House lt={lt} lights={0.8} />
      <g transform="translate(150 400) scale(0.8)"><Icon n="pompa" lt={lt} /></g>
      {Array.from({ length: 30 }, (_, i) => { const x = (i * 97) % 780 + 10, y = ((lt * (40 + (i % 5) * 10) + i * 53) % 560); return <circle key={i} cx={x + 10 * sin(lt + i)} cy={y} r={3 + (i % 3)} fill="#dfefff" opacity={0.8} />; })}
      <Flow d="M20,470 L150,470" lt={lt} color={BLUE} /><Flow d="M310,480 C360,480 390,470 430,470" lt={lt} />
      <text x={90} y={600} textAnchor="middle" fontFamily={OSW} fontWeight={700} fontSize={40} fill={BLUE}>ARIA FREDDA</text><text x={560} y={600} textAnchor="middle" fontFamily={OSW} fontWeight={700} fontSize={40} fill={OR}>CALORE IN CASA</text></g>;
    case "caldaia": { const f = 1 + 0.1 * sin(lt * 13); return <g>
      <rect x={110} y={120} width={200} height={300} rx={18} fill="#151515" stroke="#fff" strokeWidth={6} /><rect x={160} y={260} width={100} height={110} rx={10} fill="#000" stroke="#555" strokeWidth={3} />
      <g transform={`translate(210 365) scale(${0.45 / f} ${0.45 * f}) translate(-100 -175)`}><Icon n="fiamma" lt={lt} /></g>
      {[150, 190, 230, 270].map((x) => <line key={x} x1={x} y1={420} x2={x} y2={470} stroke="#888" strokeWidth={8} />)}
      <Flow d="M270,470 L270,520 L560,520 L560,420" lt={lt} /><Flow d="M640,420 L640,560 L190,560 L190,470" lt={lt} color="#a55" />
      <g transform="translate(480 250) scale(1)"><Icon n="impianto" lt={lt} /></g>
      <text x={210} y={170} textAnchor="middle" fontFamily={INT} fontWeight={800} fontSize={28} fill="#ccc">GAS</text></g>; }
    case "radiatore": { const T = Math.round(interpolate(lt, [0.3, 2.2], [20, 70], C)); return <g>
      {Array.from({ length: 8 }, (_, i) => <rect key={i} x={120 + i * 55} y={250} width={40} height={260} rx={18} fill={`rgba(240,122,53,${0.25 + 0.5 * io(lt, 0.3 + i * 0.1, 1.2 + i * 0.1)})`} stroke="#fff" strokeWidth={5} />)}
      {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M${160 + i * 70},230 q14,-25 0,-50 q-14,-25 0,-50`} fill="none" stroke={OR} strokeWidth={5} opacity={0.3 + 0.6 * Math.abs(sin(lt * 2 + i))} transform={`translate(0 ${-20 * ((lt * 0.8 + i * 0.3) % 1)})`} />)}
      <g transform="translate(640 200)"><rect x={0} y={0} width={40} height={280} rx={20} fill="none" stroke="#fff" strokeWidth={5} /><rect x={10} y={270 - 250 * (T - 20) / 60} width={20} height={250 * (T - 20) / 60} rx={10} fill={OR} /><circle cx={20} cy={300} r={32} fill={OR} /><text x={20} y={360} textAnchor="middle" fontFamily={OSW} fontWeight={700} fontSize={56} fill="#fff">{T} °C</text></g></g>; }
    case "pavimento": { let p = "M120,460"; for (let i = 0; i < 6; i++) p += ` L680,${460 + i * 16} L680,${468 + i * 16} L120,${468 + i * 16} L120,${476 + i * 16}`; return <g>
      <path d="M60,560 L740,560 L640,420 L160,420 Z" fill="#141414" stroke="#fff" strokeWidth={5} />
      <g transform="translate(0 -20)"><Flow d={p} lt={lt} n={30} /></g>
      {Array.from({ length: 7 }, (_, i) => <path key={i} d={`M${180 + i * 75},400 q12,-22 0,-44 q-12,-22 0,-44`} fill="none" stroke={OR} strokeWidth={4} opacity={0.25 + 0.5 * Math.abs(sin(lt * 2 + i))} transform={`translate(0 ${-25 * ((lt * 0.6 + i * 0.2) % 1)})`} />)}
      <text x={400} y={640} textAnchor="middle" fontFamily={OSW} fontWeight={700} fontSize={50} fill={OR}>ACQUA A BASSA TEMPERATURA</text></g>; }
    case "fancoil": return <g>
      <rect x={170} y={180} width={460} height={200} rx={20} fill="#151515" stroke="#fff" strokeWidth={6} />
      {[0, 1, 2].map((i) => <g key={i} transform={`translate(${210 + i * 135} 210) scale(0.7)`}><circle cx={100} cy={100} r={80} fill="none" stroke="#555" strokeWidth={6} /><g transform={`rotate(${lt * 500 + i * 40} 100 100)`}>{[0, 90, 180, 270].map((a) => <path key={a} d="M100,100 Q125,55 100,35 Q85,70 100,100" fill={OR} transform={`rotate(${a} 100 100)`} />)}</g></g>)}
      {Array.from({ length: 6 }, (_, i) => { const k = (lt * 0.8 + i / 6) % 1; return <path key={i} d={`M${200 + i * 75},400 q20,${60 * k} 0,${120 * k}`} fill="none" stroke={i % 2 ? BLUE : OR} strokeWidth={5} opacity={1 - k} />; })}</g>;
    case "cappotto": { const k = io(lt, 0.4, 2.0); return <g>{ground}
      <rect x={180} y={180} width={440} height={375} fill="#151515" stroke="#fff" strokeWidth={6} />
      <rect x={180 - 30 * k} y={180 - 30 * k} width={440 + 60 * k} height={375 + 30 * k} fill="none" stroke={OR} strokeWidth={30 * k} opacity={0.85} />
      {Array.from({ length: 5 }, (_, i) => { const x = 260 + i * 70, ph = (lt * 0.9 + i * 0.2) % 1, y = 480 - 260 * (ph < 0.6 ? ph / 0.6 : 1 - (ph - 0.6) / 0.4 * 0.5); return <path key={i} d={`M${x},${y + 30} L${x},${y} M${x - 12},${y + 14} L${x},${y} L${x + 12},${y + 14}`} fill="none" stroke={OR} strokeWidth={6} strokeLinecap="round" />; })}
      <text x={400} y={640} textAnchor="middle" fontFamily={OSW} fontWeight={700} fontSize={56} fill="#fff">IL CALORE <tspan fill={OR}>RESTA DENTRO</tspan></text></g>; }
    case "dispersioni": return <g>{ground}
      <rect x={250} y={250} width={300} height={305} fill="#151515" stroke="#fff" strokeWidth={6} /><path d="M220,255 L400,120 L580,255" fill="none" stroke="#fff" strokeWidth={6} />
      <rect x={290} y={300} width={70} height={60} fill="rgba(127,182,224,.3)" stroke="#aaa" strokeWidth={3} /><rect x={440} y={300} width={70} height={60} fill="rgba(127,182,224,.3)" stroke="#aaa" strokeWidth={3} />
      {[[250, 420, 180], [550, 420, 0], [330, 180, -120], [470, 180, -60], [250, 330, 180], [550, 330, 0], [400, 120, -90]].map(([x, y, r], i) => { const k = (lt * 0.9 + i * 0.15) % 1; return <g key={i} transform={`translate(${x} ${y}) rotate(${r}) translate(${20 + 140 * k} 0)`} opacity={1 - k}><path d="M0,0 L60,0 M42,-16 L62,0 L42,16" fill="none" stroke={OR} strokeWidth={9} strokeLinecap="round" /></g>; })}
      <text x={400} y={640} textAnchor="middle" fontFamily={OSW} fontWeight={700} fontSize={56} fill="#fff">IL CALORE <tspan fill={OR}>SCAPPA</tspan></text></g>;
    case "condominio": return <g>{ground}<rect x={230} y={80} width={340} height={475} fill="#151515" stroke="#fff" strokeWidth={6} />
      {Array.from({ length: 24 }, (_, i) => { const c = i % 4, r = Math.floor(i / 4); const on = Math.sin(lt * 1.3 + i * 1.7) > 0.1; return <rect key={i} x={262 + c * 76} y={110 + r * 72} width={46} height={44} fill={on ? OR : "#2a2a2a"} opacity={on ? 0.85 : 1} />; })}</g>;
    case "facciata": return <g><rect x={120} y={60} width={560} height={500} fill="#151515" stroke="#fff" strokeWidth={6} />
      {Array.from({ length: 6 }, (_, i) => { const c = i % 2, r = Math.floor(i / 2); return <g key={i}><rect x={200 + c * 260} y={100 + r * 150} width={120} height={80} fill="#2a2a2a" /><g transform={`translate(${330 + c * 260} ${120 + r * 150}) scale(0.45)`}><Icon n="pompa" lt={lt + i * 0.3} /></g></g>; })}</g>;
    case "giornata": {
      const p = io(lt, 0.4, 0.4 + (s?.grow_d || 6));
      const pts = Array.from({ length: 61 }, (_, i) => { const x = 60 + i * 11.3, y = 520 - 380 * Math.exp(-(((i - 30) / 13) ** 2)); return [x, y]; });
      const vis = pts.slice(0, Math.max(2, Math.round(61 * p)));
      const line = vis.map(([x, y], i) => `${i ? "L" : "M"}${x},${y}`).join(" ");
      const [sx, sy] = vis[vis.length - 1];
      return <g><line x1={50} y1={520} x2={760} y2={520} stroke="#555" strokeWidth={4} />
        <path d={`${line} L${sx},520 L60,520 Z`} fill="rgba(240,122,53,.25)" /><path d={line} fill="none" stroke={OR} strokeWidth={7} />
        <g transform={`translate(${sx - 45} ${sy - 110}) scale(0.45)`}><Icon n="sole" lt={lt} /></g>
        {["6", "9", "12", "15", "18", "21"].map((h, i) => <text key={h} x={60 + i * 135.6} y={565} textAnchor="middle" fontFamily={INT} fontWeight={800} fontSize={28} fill="#999">{h}:00</text>)}</g>;
    }
    default: return <g />;
  }
};

// ---------- scene ----------
const Chips: React.FC<{ s: S; lt: number }> = ({ s, lt }) => s.chips ? (
  <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 26 }}>{s.chips.map(([t, ic, lab]: any, i: number) => (
    <div key={i} style={{ ...pop(lt, t), display: "flex", alignItems: "center", gap: 18, background: "rgba(17,17,17,.85)", border: `2px solid ${OR}`, borderRadius: 999, padding: "8px 28px 8px 10px", alignSelf: "flex-start" }}>
      <Icon n={ic} lt={lt - t} size={64} /><span style={{ fontFamily: INT, fontWeight: 800, fontSize: 36, color: "#fff" }}>{lab}</span></div>))}</div>) : null;

const Scene: React.FC<{ s: S; lt: number }> = ({ s, lt }) => {
  const d = s.z - s.a;
  const L: React.CSSProperties = { position: "absolute", left: 140, top: 0, bottom: 0, width: 900, display: "flex", flexDirection: "column", justifyContent: "center", gap: 22 };
  const CEN: React.CSSProperties = { position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 26, padding: "0 160px" };
  switch (s.type) {
    case "kin": {
      const big = (s.lines?.[0]?.[1] || "").replace(/\[\[|\]\]/g, "").split("\n")[0];
      return <>
        <div style={{ position: "absolute", top: 300, left: -200 + lt * 30, whiteSpace: "nowrap", fontFamily: OSW, fontWeight: 700, fontSize: 380, color: "transparent", WebkitTextStroke: "3px rgba(240,122,53,.12)", textTransform: "uppercase" }}>{big}</div>
        <div style={CEN}><div style={pop(lt, 0)}><Kick s={s.kick} /></div>
          {s.lines?.map(([t, x]: any, i: number) => <div key={i} style={pop(lt, t)}><Title s={x} size={s.size || 130} /></div>)}
          <div style={{ height: 8, width: 300 * io(lt, 0.3, 1.0), background: OR, borderRadius: 4 }} />
          {s.sub && <div style={pop(lt, s.sub_t || 1)}><Sub s={s.sub} /></div>}</div></>;
    }
    case "icons": {
      const items = s.items.filter((x: any) => x[1] !== "freccia");
      return <div style={CEN}><div style={pop(lt, 0)}><Kick s={s.kick} /></div>{s.title && <div style={pop(lt, 0.15)}><Title s={s.title} size={s.size || 96} /></div>}
        <div style={{ display: "flex", gap: 70, marginTop: 30, alignItems: "flex-start" }}>{items.map(([t, ic, a, b]: any, i: number) => (
          <div key={i} style={{ ...pop(lt, t), width: 360, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div style={{ width: 250, height: 250, borderRadius: 125, background: "rgba(25,25,25,.9)", border: `3px solid ${OR}`, boxShadow: `0 0 ${30 + 20 * Math.sin(lt * 3 + i)}px rgba(240,122,53,.35)`, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon n={ic} lt={lt - t} size={180} /></div>
            {a && <div style={{ fontFamily: OSW, fontWeight: 700, fontSize: 52, color: "#fff", textTransform: "uppercase", lineHeight: 1.05 }}>{a}</div>}
            {b && <div style={{ fontFamily: INT, fontWeight: 600, fontSize: 34, color: "#bbb" }}>{b}</div>}</div>))}</div></div>;
    }
    case "energia": case "photo": case "giornata": {
      const illus = s.type === "energia" ? s.mode : s.type === "giornata" ? "giornata" : s.illus;
      const k = io(lt, 0, 0.6);
      return <>
        {s.img && <Img src={staticFile(s.img)} style={{ position: "absolute", inset: -60, width: 2040, height: 1200, objectFit: "cover", filter: "blur(30px) brightness(.35)", transform: `scale(${1.05 + 0.04 * lt / d})` }} />}
        <div style={L}><div style={pop(lt, 0)}><Kick s={s.kick} /></div><div style={pop(lt, 0.15)}><Title s={s.title} size={(s.size || 120) * 0.85} /></div>
          {s.sub && <div style={pop(lt, s.sub_t || 1)}><Sub s={s.sub} /></div>}<Chips s={s} lt={lt} />
          {s.type === "giornata" && s.marks && <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 10 }}>{s.marks.map(([t, , a, b]: any, i: number) => <div key={i} style={{ ...pop(lt, t), fontFamily: INT, fontWeight: 800, fontSize: 38, color: "#fff" }}><span style={{ color: OR }}>{a}</span> · {b}</div>)}</div>}</div>
        {s.img ? <div style={{ position: "absolute", left: 1060, top: 230, width: 740, height: 620, borderRadius: 30, overflow: "hidden", border: `6px solid ${OR}`, boxShadow: "0 30px 80px rgba(0,0,0,.6)", opacity: k, transform: `translateX(${(1 - k) * 300}px) rotate(${(1 - k) * 4}deg)` }}>
          <Img src={staticFile(s.img)} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${1.02 + 0.1 * lt / d}) translateX(${-15 * lt / d}px)` }} /></div>
          : <svg width={880} height={770} viewBox="0 0 800 700" style={{ position: "absolute", left: 1000, top: 160, opacity: k, transform: `translateX(${(1 - k) * 200}px)`, overflow: "visible" }}><Illus n={illus} lt={lt} d={d} s={s} /></svg>}
      </>;
    }
    case "counter": {
      const v = interpolate(lt, [s.count_t || 1, (s.count_t || 1) + (s.count_d || 2)], [s.from || 0, s.to], { ...C, easing: Easing.out(Easing.quad) });
      const frac = s.suf?.includes("%") ? v / 100 : v / (s.to || 1);
      const fmt = Math.round(v).toLocaleString("it-IT");
      return <>
        <div style={L}><div style={pop(lt, 0)}><Kick s={s.kick} /></div><div style={pop(lt, 0.1)}><Title s={s.title} size={90} /></div>
          {s.unit && <div style={pop(lt, (s.count_t || 1) + 0.5)}><Sub s={s.unit} /></div>}</div>
        <svg width={620} height={620} viewBox="0 0 620 620" style={{ position: "absolute", left: 1150, top: 230 }}>
          <circle cx={310} cy={310} r={260} fill="none" stroke="#222" strokeWidth={40} />
          <circle cx={310} cy={310} r={260} fill="none" stroke={OR} strokeWidth={40} strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - Math.min(1, frac)} transform="rotate(-90 310 310)" />
          <g transform="translate(250 120) scale(0.6)"><Icon n={s.icon || "ok"} lt={lt} /></g>
          <text x={310} y={380} textAnchor="middle" fontFamily={OSW} fontWeight={700} fontSize={fmt.length > 4 ? 120 : 150} fill="#fff">{s.pre?.trim()}{fmt}{s.suf}</text>
        </svg></>;
    }
    case "timeline": {
      const p = io(lt, 0.4, 0.4 + (s.grow_d || 3));
      return <div style={{ position: "absolute", inset: 0 }}>
        <div style={{ position: "absolute", top: 200, left: 0, right: 0, textAlign: "center" }}><div style={pop(lt, 0)}><Kick s={s.kick} /></div><div style={pop(lt, 0.15)}><Title s={s.title} size={s.size || 80} /></div></div>
        <div style={{ position: "absolute", left: 210, top: 640, width: 1500 * p, height: 10, background: OR, borderRadius: 5 }} />
        <div style={{ position: "absolute", left: 210 + 1500 * p - 22, top: 622, width: 44, height: 44, borderRadius: 22, background: "#fff", boxShadow: `0 0 30px ${OR}` }} />
        {s.marks.map(([t, x, a, b]: any, i: number) => <div key={i} style={{ position: "absolute", left: 210 + 1500 * x - 200, top: 600, width: 400, textAlign: "center", ...pop(lt, t) }}>
          <div style={{ width: 36, height: 36, borderRadius: 18, background: OR, margin: "22px auto 26px" }} /><div style={{ fontFamily: OSW, fontWeight: 700, fontSize: 52, color: "#fff", textTransform: "uppercase" }}>{a}</div><div style={{ fontFamily: INT, fontWeight: 600, fontSize: 34, color: "#bbb" }}>{b}</div></div>)}</div>;
    }
    case "warn": {
      const pulse = 1 + 0.06 * Math.sin(lt * 4);
      return <div style={CEN}><div style={{ display: "flex", alignItems: "center", gap: 70, padding: "60px 80px", border: `5px solid ${OR}`, borderRadius: 30, background: "rgba(40,16,8,.75)", ...pop(lt, 0) }}>
        <div style={{ transform: `scale(${pulse})`, position: "relative" }}><Icon n={s.icon || "warn"} lt={lt} size={230} /><div style={{ position: "absolute", right: -10, top: -10, width: 70, height: 70, borderRadius: 35, background: OR, fontFamily: OSW, fontWeight: 700, fontSize: 52, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>!</div></div>
        <div style={{ textAlign: "left", display: "flex", flexDirection: "column", gap: 20, maxWidth: 1000 }}><Title s={s.title} size={84} />{s.sub && <div style={pop(lt, s.sub_t || 1)}><Sub s={s.sub} /></div>}</div></div></div>;
    }
    case "check": return <div style={L}><div style={pop(lt, 0)}><Kick s={s.kick} /></div><div style={pop(lt, 0.1)}><Title s={s.title} size={100} /></div>
      <div style={{ display: "flex", flexDirection: "column", gap: 26, marginTop: 20, width: 1500 }}>{s.items.map(([t, x]: any, i: number) => (
        <div key={i} style={{ ...pop(lt, t), display: "flex", alignItems: "center", gap: 30 }}><Icon n="ok" lt={lt - t} size={90} /><span style={{ fontFamily: INT, fontWeight: 800, fontSize: 52, color: "#fff" }}><Rich text={x} /></span></div>))}</div></div>;
    case "cards": {
      const k = io(lt, 0, 0.5);
      return <>
        <div style={{ position: "absolute", left: 150, top: 300, width: 400, height: 480, borderRadius: 34, background: OR, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: OSW, fontWeight: 700, fontSize: 300, color: "#fff",
          transform: `perspective(1200px) rotateY(${(1 - k) * 90}deg)`, boxShadow: "0 30px 80px rgba(240,122,53,.3)" }}>{s.n}</div>
        <div style={{ position: "absolute", left: 640, top: 0, bottom: 0, width: s.illus ? 640 : 1150, display: "flex", flexDirection: "column", justifyContent: "center", gap: 28 }}>
          <div style={pop(lt, 0.2)}><Title s={s.title} size={s.illus ? 76 : 92} /></div>{s.sub && <div style={pop(lt, Math.min(s.sub_t || 1, 1.5))}><Sub s={s.sub} /></div>}</div>
        {s.illus && <svg width={560} height={490} viewBox="0 0 800 700" style={{ position: "absolute", left: 1320, top: 300, opacity: io(lt, 0.4, 1) }}><Illus n={s.illus} lt={lt} d={d} /></svg>}</>;
    }
    case "cta": {
      const bt = s.btn_t ?? 1.5; const pulse = 1 + 0.05 * Math.max(0, Math.sin((lt - bt) * 4));
      return <div style={CEN}><Img src={staticFile("brands/ingbelcastro/logo-white.png")} style={{ height: 220, ...pop(lt, 0) }} />
        <div style={pop(lt, 0.3)}><Title s={s.title} size={86} /></div>{s.sub && <div style={pop(lt, 0.8)}><Sub s={s.sub} /></div>}
        {s.btn && <div style={{ ...pop(lt, bt), transform: `scale(${pulse * io(lt, bt, bt + 0.3)})`, background: OR, color: "#fff", fontFamily: OSW, fontWeight: 700, fontSize: 56, padding: "18px 60px", borderRadius: 999, textTransform: "uppercase" }}>{s.btn}</div>}</div>;
    }
    default: return <div style={CEN}><Title s={s.title || s.kick} /></div>;
  }
};

export const Lungo: React.FC<LungoProps> = (p) => {
  const f = useCurrentFrame(); const t = f / 30;
  const cue = (k: string) => p.cues[k] ?? 0;
  const inSig = t < p.T0 + 0.4;
  const blk = p.blocks.findIndex((b) => t >= b.t && t < b.t + b.d);
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 40%, #1c140e 0%, #080808 70%)" }}>
      {/* sfondo vivo: griglia che scorre + particelle */}
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {Array.from({ length: 16 }, (_, i) => <line key={i} x1={((i * 140 + t * 12) % 2240) - 160} x2={((i * 140 + t * 12) % 2240) - 160} y1={0} y2={1080} stroke="rgba(240,122,53,.05)" />)}
        {Array.from({ length: 9 }, (_, i) => <line key={`h${i}`} y1={i * 140} y2={i * 140} x1={0} x2={1920} stroke="rgba(240,122,53,.05)" />)}
        {Array.from({ length: 26 }, (_, i) => { const x = (i * 331) % 1920, y = 1080 - ((t * (12 + (i % 5) * 6) + i * 157) % 1180); return <circle key={i} cx={x + 20 * Math.sin(t * 0.5 + i)} cy={y} r={2 + (i % 3)} fill={OR} opacity={0.15 + 0.1 * (i % 3)} />; })}
      </svg>
      {/* sigla */}
      {inSig && <AbsoluteFill style={{ opacity: 1 - io(t, p.T0 - 0.1, p.T0 + 0.4), alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 40 }}>
        <svg width={1920} height={1080} style={{ position: "absolute" }}>
          {Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2; const r = 1400 * io(t, cue("magia") - 0.3, cue("ing")); return <line key={i} x1={960} y1={430} x2={960 + Math.cos(a + t * 0.2) * r} y2={430 + Math.sin(a + t * 0.2) * r} stroke="rgba(240,122,53,.25)" strokeWidth={3} />; })}
          <circle cx={960} cy={430} r={600 * io(t, cue("naa") - 0.2, cue("naa") + 0.8)} fill="none" stroke={OR} strokeWidth={6} opacity={1 - io(t, cue("naa"), cue("naa") + 1.2)} />
        </svg>
        <Img src={staticFile("brands/ingbelcastro/logo-white.png")} style={{ height: 340, opacity: io(t, cue("ing"), cue("ing") + 0.4), transform: `scale(${0.7 + 0.3 * io(t, cue("ing"), cue("ing") + 0.6)})` }} />
        <div style={{ fontFamily: INT, fontWeight: 800, fontSize: 40, color: OR, letterSpacing: "0.2em", opacity: io(t, cue("nome"), cue("nome") + 0.4) }}>@ING.BELCASTRO</div>
        <div style={{ fontFamily: OSW, fontWeight: 700, fontSize: 92, color: "#fff", textTransform: "uppercase", textAlign: "center", padding: "0 150px", lineHeight: 1.05, ...pop(t, cue("titolo")) }}>{p.title}</div>
      </AbsoluteFill>}
      {/* scene */}
      {p.scenes.filter((s) => t >= s.a - 0.05 && t < s.z + 0.05).map((s, i) => (
        <AbsoluteFill key={i} style={{ opacity: win(t, s.a, s.z, 0.25) }}><Scene s={s} lt={t - s.a} /></AbsoluteFill>
      ))}
      {/* stacco capitolo */}
      {p.blocks.map((b, k) => { const o = win(t, b.t - 0.05, b.t + 1.1, 0.2); if (o <= 0) return null; const w = io(t, b.t, b.t + 0.45);
        return <AbsoluteFill key={k} style={{ opacity: o }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${100 * w}%`, background: "#0b0b0b", borderRight: `12px solid ${OR}` }} />
          <div style={{ position: "absolute", left: 160, top: 360, display: "flex", alignItems: "center", gap: 50, ...pop(t - b.t, 0.15) }}>
            <span style={{ fontFamily: OSW, fontWeight: 700, fontSize: 260, color: OR, lineHeight: 1 }}>{String(k + 1).padStart(2, "0")}</span>
            <span style={{ fontFamily: OSW, fontWeight: 700, fontSize: 96, color: "#fff", textTransform: "uppercase", maxWidth: 1250, lineHeight: 1.05 }}>{b.cap}</span></div></AbsoluteFill>; })}
      {/* testata, capitolo in corso, barra */}
      {!inSig && <div style={{ position: "absolute", left: 50, top: 40, display: "flex", alignItems: "center", gap: 16, background: "rgba(7,7,7,.8)", padding: "10px 24px", borderRadius: 40 }}>
        <Img src={staticFile("brands/ingbelcastro/logo-white.png")} style={{ height: 58 }} /><span style={{ fontFamily: INT, fontWeight: 800, fontSize: 30, color: "#fff" }}>@ing.belcastro</span></div>}
      {blk >= 0 && <div style={{ position: "absolute", right: 60, top: 52, fontFamily: INT, fontWeight: 800, fontSize: 28, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.08em" }}><span style={{ color: OR }}>{String(blk + 1).padStart(2, "0")}</span> · {p.blocks[blk].cap}</div>}
      {!inSig && <div style={{ position: "absolute", left: 90, right: 90, bottom: 40, display: "flex", gap: 8 }}>{p.blocks.map((b, k) => (
        <div key={k} style={{ flex: b.d, height: 8, background: "rgba(255,255,255,.15)", borderRadius: 4, overflow: "hidden" }}><div style={{ height: "100%", width: `${100 * Math.min(1, Math.max(0, (t - b.t) / b.d))}%`, background: OR }} /></div>))}</div>}
      <Audio src={staticFile(p.audio)} />
    </AbsoluteFill>
  );
};
