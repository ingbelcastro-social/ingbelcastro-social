import React from "react";
import { AbsoluteFill, Audio, Img, interpolate, staticFile, useCurrentFrame, Easing } from "remotion";
import { loadFont as loadOswald } from "@remotion/google-fonts/Oswald";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
const { fontFamily: OSW } = loadOswald("normal", { weights: ["700"], subsets: ["latin", "latin-ext"] });
const { fontFamily: INT } = loadInter("normal", { weights: ["600", "800"], subsets: ["latin", "latin-ext"] });

// Meraviglie dell'ingegneria #1 — Torre di Pisa (senza voce)
const OR = "#F07A35";
const ease = Easing.out(Easing.cubic);
const C = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const io = (t: number, a: number, b: number, from = 0, to = 1) => interpolate(t, [a, b], [from, to], { ...C, easing: ease });
const win = (t: number, a: number, b: number, f = 0.3) => Math.min(io(t, a, a + f), 1 - io(t, b - f, b));
export const PISA_DUR = 38;

const GROUND = 1600, PX = 540, W = 160, FH = 90, BASE = 112; // 8 ordini: base + 6 loggiati + cella campanaria
const Floor: React.FC<{ i: number; vis: number; hl?: boolean }> = ({ i, vis, hl }) => {
  if (vis <= 0) return null;
  const top = i === 7, w = top ? 112 : W, h = i === 0 ? BASE : top ? 80 : FH;
  const y0 = GROUND - (i === 0 ? 0 : BASE + (i - 1) * FH);
  const k = Math.min(1, vis);
  const cols = top ? 5 : 7;
  return (
    <g opacity={k} transform={`translate(0 ${(1 - k) * -40})`}>
      <rect x={PX - w / 2} y={y0 - h} width={w} height={h} fill={hl ? "#3a2416" : "#e9e4d8"} stroke={hl ? OR : "#9a9384"} strokeWidth={hl ? 4 : 2} />
      {i > 0 && Array.from({ length: cols }, (_, c) => { const cx = PX - w / 2 + (c + 0.5) * (w / cols); return <path key={c} d={`M${cx - 6},${y0 - 6} L${cx - 6},${y0 - h + 30} A6,6 0 0,1 ${cx + 6},${y0 - h + 30} L${cx + 6},${y0 - 6}`} fill={hl ? "#1a0f08" : "#b9b2a1"} />; })}
      {i === 0 && Array.from({ length: 5 }, (_, c) => <rect key={c} x={PX - W / 2 + 12 + c * 32} y={y0 - 88} width={16} height={70} rx={9} fill="#b9b2a1" />)}
      <rect x={PX - w / 2 - 6} y={y0 - h - 6} width={w + 12} height={8} fill={hl ? OR : "#cfc8b8"} />
    </g>
  );
};

const Big: React.FC<{ children: React.ReactNode; size?: number; top: number; op: number; color?: string }> = ({ children, size = 104, top, op, color = "#fff" }) => (
  <div style={{ position: "absolute", left: 60, right: 60, top, textAlign: "center", opacity: op, transform: `translateY(${(1 - op) * 40}px)`,
    fontFamily: OSW, fontWeight: 700, fontSize: size, lineHeight: 1.04, color, textTransform: "uppercase", textShadow: "0 6px 30px rgba(0,0,0,.85)" }}>{children}</div>
);
const Small: React.FC<{ children: React.ReactNode; top: number; op: number; size?: number; color?: string }> = ({ children, top, op, size = 44, color = "#fff" }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top, textAlign: "center", opacity: op, fontFamily: INT, fontWeight: 800, fontSize: size, color, lineHeight: 1.25, textShadow: "0 4px 20px rgba(0,0,0,.9)" }}>{children}</div>
);
const O: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: OR }}>{children}</span>;

export const Pisa: React.FC = () => {
  const f = useCurrentFrame(); const t = f / 30;
  // costruzione: 0-2 torre intera inclinata (gancio), 3-12 ricostruzione storica
  const hook = t < 3.2;
  const build = (i: number) => hook ? 1 : io(t, 3.6 + i * 0.55, 3.9 + i * 0.55) * (i < 3 ? 1 : io(t, 9.0 + (i - 3) * 0.5, 9.3 + (i - 3) * 0.5));
  // inclinazione (gradi, verso sud = destra)
  const tilt = hook ? 5.5 : t < 16.5
    ? interpolate(t, [3.6, 5.3, 6.6, 8.6, 11.8, 16.5], [0, 0, 0.6, 0.9, 2.5, 5.5], C)
    : interpolate(t, [16.5, 22.5, 26.5], [5.5, 5.5, 4.95], { ...C, easing: Easing.inOut(Easing.cubic) });
  const shake = t > 16.5 && t < 19.5 ? Math.sin(t * 40) * 0.12 * (1 - io(t, 18.5, 19.5)) : 0;
  const sink = interpolate(t, [5.3, 6.6, 16.5], [0, 18, 34], C) * (t < 3.2 ? 1 : 1);
  const lead = Math.floor(interpolate(t, [20.0, 22.4], [0, 18], C));
  const drill = io(t, 22.6, 23.4);
  const year = Math.round(interpolate(t, [7.2, 8.8], [1178, 1272], C));
  const endIn = io(t, 34.8, 35.3);
  const curved = win(t, 11.9, 14.9, 0.3);
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 35%, #1e150e 0%, #070707 70%)" }}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        {Array.from({ length: 14 }, (_, i) => <line key={i} x1={0} x2={1080} y1={i * 140} y2={i * 140} stroke="rgba(240,122,53,.05)" />)}
        {Array.from({ length: 9 }, (_, i) => <line key={`v${i}`} y1={0} y2={1920} x1={i * 135} x2={i * 135} stroke="rgba(240,122,53,.05)" />)}
        {/* terreno in sezione: sabbia + argilla molle */}
        <rect x={0} y={GROUND} width={1080} height={420} fill="#2a2018" />
        <rect x={0} y={GROUND + 70} width={1080} height={350} fill="#3b2d22" />
        {Array.from({ length: 40 }, (_, i) => <circle key={i} cx={(i * 97) % 1080} cy={GROUND + 90 + ((i * 53) % 300)} r={3} fill="rgba(255,255,255,.08)" />)}
        <text x={60} y={GROUND + 50} fontFamily={INT} fontWeight={800} fontSize={26} fill="#a08a72">SABBIA E LIMO</text>
        <text x={60} y={GROUND + 120} fontFamily={INT} fontWeight={800} fontSize={26} fill="#a08a72">ARGILLA MOLLE</text>
        <ellipse cx={PX + 70} cy={GROUND + 10} rx={160} ry={sink} fill="rgba(0,0,0,.45)" opacity={hook ? 0 : 1} />
        <line x1={0} x2={1080} y1={GROUND} y2={GROUND} stroke="#5a4a3a" strokeWidth={4} />
        {/* piombo sul lato nord */}
        {Array.from({ length: lead }, (_, i) => <rect key={i} x={PX - 200 - (i % 3) * 46} y={GROUND - 18 - Math.floor(i / 3) * 20} width={42} height={17} rx={2} fill="#8c96a3" stroke="#c9d1db" strokeWidth={1.5} />)}
        {/* trivelle inclinate sotto il lato nord */}
        <g opacity={drill * (1 - io(t, 27.0, 27.6))}>
          {[0, 1, 2].map((k) => { const x0 = PX - 330 - k * 50, y0 = GROUND; const x1 = PX - 110 + k * 10, y1 = GROUND + 95 + k * 25; const L = io(t, 22.8 + k * 0.3, 23.8 + k * 0.3);
            return <g key={k}><line x1={x0} y1={y0} x2={x0 + (x1 - x0) * L} y2={y0 + (y1 - y0) * L} stroke={OR} strokeWidth={8} strokeLinecap="round" />
              {Array.from({ length: 4 }, (_, j) => { const q = ((t * 0.8 + j * 0.25 + k * 0.1) % 1); return t > 24 ? <circle key={j} cx={x1 + (x0 - x1) * q} cy={y1 + (y0 - y1) * q} r={6} fill="#c9a77f" /> : null; })}</g>; })}
        </g>
        {/* torre */}
        <g transform={`rotate(${tilt + shake} ${PX + W / 2} ${GROUND})`}>
          {Array.from({ length: 8 }, (_, i) => <g key={i} transform={i >= 4 ? `rotate(${-0.9 * curved} ${PX} ${GROUND - BASE - 3 * FH})` : undefined}><Floor i={i} vis={build(i)} hl={curved > 0 && i >= 4} /></g>)}
        </g>
        {/* filo a piombo e sbalzo */}
        <g opacity={win(t, 16.8, 20.0, 0.3)}>
          {(() => { const H = BASE + 6 * FH + 80; const a = (tilt * Math.PI) / 180; const topX = PX + W / 2 - (W / 2) * Math.cos(a) + H * Math.sin(a), topY = GROUND - H * Math.cos(a);
            return <g><line x1={PX} y1={topY} x2={PX} y2={GROUND} stroke="#fff" strokeWidth={3} strokeDasharray="12 10" />
              <line x1={PX} y1={topY - 30} x2={topX} y2={topY - 30} stroke={OR} strokeWidth={6} /><text x={(PX + topX) / 2} y={topY - 50} textAnchor="middle" fontFamily={OSW} fontWeight={700} fontSize={44} fill={OR}>oltre 4 m</text></g>; })()}
        </g>
        {/* timbro chiusura */}
        <g opacity={io(t, 18.2, 18.5) * (1 - io(t, 19.8, 20.1))} transform={`translate(540 1150) rotate(-10) scale(${1.6 - 0.6 * io(t, 18.2, 18.5)})`}>
          <rect x={-300} y={-70} width={600} height={140} rx={16} fill="rgba(7,7,7,.85)" stroke="#e5484d" strokeWidth={9} /><text x={0} y={22} textAnchor="middle" fontFamily={OSW} fontWeight={700} fontSize={70} fill="#e5484d">CHIUSA · 1990</text>
        </g>
      </svg>

      {/* logo */}
      <div style={{ position: "absolute", top: 232, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: 1 - endIn }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(7,7,7,.85)", padding: "8px 22px", borderRadius: 40 }}>
          <Img src={staticFile("brands/ingbelcastro/logo-white.png")} style={{ height: 54 }} /><span style={{ fontFamily: INT, fontWeight: 800, fontSize: 34, color: "#fff" }}>@ing.belcastro</span></div></div>
      <Small top={330} op={(1 - endIn) * io(t, 0.1, 0.5)} size={30} color={OR}>LE GRANDI OPERE · #2</Small>

      {/* testi */}
      <Big top={420} op={win(t, 0.1, 3.4, 0.2)} size={118}>Pende da<br /><O>850 anni</O></Big>
      <Big top={680} op={win(t, 1.4, 3.4, 0.2)} size={84}>Perché non cade?</Big>
      <Big top={420} op={win(t, 3.5, 5.3, 0.25)} size={96}>1173<br /><O>si comincia</O></Big>
      <Big top={420} op={win(t, 5.4, 7.2, 0.25)} size={88}>Al 3° piano<br />il terreno <O>cede</O></Big>
      <Small top={1760} op={win(t, 5.6, 7.2, 0.25)} size={34}>sotto c'è argilla molle: il lato sud sprofonda</Small>
      <Big top={420} op={win(t, 7.2, 9.0, 0.25)} size={88}>Guerre: lavori fermi<br /><O>{year}</O></Big>
      <Big top={420} op={win(t, 9.0, 11.9, 0.25)} size={84}>La pausa <O>la salva</O></Big>
      <Small top={560} op={win(t, 9.4, 11.9, 0.25)} size={40}>nel frattempo il terreno si assesta<br />e diventa più resistente</Small>
      <Big top={420} op={win(t, 11.9, 14.9, 0.25)} size={84}>I costruttori<br /><O>correggono</O></Big>
      <Small top={600} op={win(t, 12.4, 14.9, 0.25)} size={40}>i piani alti sono «piegati» verso nord:<br />la torre è leggermente a banana</Small>
      <Big top={420} op={win(t, 14.9, 16.6, 0.25)} size={88}>Ma continua<br />a <O>pendere</O></Big>
      <Big top={420} op={win(t, 16.6, 20.0, 0.25)} size={84}>1990: <O>5,5°</O></Big>
      <Small top={540} op={win(t, 16.9, 20.0, 0.25)} size={40}>la cima è fuori piombo di oltre 4 metri</Small>
      <Big top={420} op={win(t, 20.0, 22.6, 0.25)} size={84}>Primo: <O>piombo</O></Big>
      <Small top={540} op={win(t, 20.3, 22.6, 0.25)} size={40}>centinaia di tonnellate sul lato nord<br />per fermarla</Small>
      <Big top={420} op={win(t, 22.6, 27.4, 0.25)} size={84}>Poi: <O>togliere terra</O></Big>
      <Small top={540} op={win(t, 23.0, 27.4, 0.25)} size={40}>con trivelle inclinate, poco alla volta,<br />sotto il lato nord</Small>
      <Big top={660} op={win(t, 25.3, 27.4, 0.25)} size={64} color={OR}>la cima torna indietro<br />di oltre 40 cm</Big>
      <Big top={420} op={win(t, 27.4, 31.0, 0.25)} size={84}>2001 <O>riapre</O></Big>
      <Small top={540} op={win(t, 28.0, 31.0, 0.25)} size={40}>dal 2008 i sensori la danno ferma</Small>
      <AbsoluteFill style={{ opacity: win(t, 31.0, 35.0, 0.3), background: "rgba(7,7,7,.9)" }}>
        <Big top={560} op={io(t, 31.1, 31.5)} size={90}>Non l'hanno<br />raddrizzata.</Big>
        <Big top={820} op={io(t, 32.0, 32.4)} size={120} color={OR}>L'hanno salvata.</Big>
        <Small top={1080} op={io(t, 32.8, 33.2)} size={46}>Quale grande opera vuoi vedere?<br />Scrivilo nei commenti 👇</Small>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: endIn, background: "#000", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 36 }}>
        <Img src={staticFile("brands/ingbelcastro/logo-white.png")} style={{ width: 440 }} />
        <div style={{ fontFamily: INT, fontWeight: 800, fontSize: 36, color: OR, letterSpacing: "0.15em" }}>LE GRANDI OPERE</div>
        <div style={{ fontFamily: OSW, fontWeight: 700, fontSize: 80, color: "#fff", textTransform: "uppercase" }}>Segui per la <span style={{ color: OR }}>#3</span></div>
        <div style={{ fontFamily: INT, fontWeight: 800, fontSize: 40, color: "#ccc" }}>@ing.belcastro</div>
      </AbsoluteFill>
      <Small top={1860} op={(1 - endIn) * 0.5} size={22}>Animazione illustrativa · proporzioni semplificate</Small>
    </AbsoluteFill>
  );
};
