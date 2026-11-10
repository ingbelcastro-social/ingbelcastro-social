import React from "react";
import { AbsoluteFill, Audio, Img, interpolate, staticFile, useCurrentFrame, Easing } from "remotion";
import { loadFont as loadOswald } from "@remotion/google-fonts/Oswald";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { Icon, Illus } from "./Lungo";
import words from "../public/pdc7r/words.json";
const { fontFamily: OSW } = loadOswald("normal", { weights: ["700"], subsets: ["latin", "latin-ext"] });
const { fontFamily: INT } = loadInter("normal", { weights: ["600", "800"], subsets: ["latin", "latin-ext"] });

// Reel «animazione ingegneristica» con voce: Pompa di calore o caldaia (venerdì 13/11)
const OR = "#F07A35";
const ease = Easing.out(Easing.cubic);
const C = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const io = (t: number, a: number, b: number) => interpolate(t, [a, b], [0, 1], { ...C, easing: ease });
const win = (t: number, a: number, b: number, f = 0.25) => Math.min(io(t, a, a + f), 1 - io(t, b - f, b));
export const PDC7_DUR = 30;
type W = { text: string; start: number; end: number };

function chunks(ws: W[]) {
  const out: W[][] = []; let cur: W[] = [];
  ws.forEach((w, i) => { const p = ws[i - 1]; if (cur.length && (cur.length >= 3 || w.start - p.end > 0.35 || /[.,?!]$/.test(p.text))) { out.push(cur); cur = []; } cur.push(w); });
  if (cur.length) out.push(cur); return out;
}
const CH = chunks(words as W[]);

const Vis: React.FC<{ a: number; b: number; t: number; children: React.ReactNode }> = ({ a, b, t, children }) => {
  const o = win(t, a, b); if (o <= 0) return null;
  return <g opacity={o} transform={`translate(0 ${(1 - io(t, a, a + 0.35)) * 60})`}>{children}</g>;
};
const Lab: React.FC<{ x: number; y: number; s: string; size?: number; c?: string }> = ({ x, y, s, size = 64, c = "#fff" }) =>
  <text x={x} y={y} textAnchor="middle" fontFamily={OSW} fontWeight={700} fontSize={size} fill={c}>{s}</text>;

export const ReelPdc7: React.FC = () => {
  const f = useCurrentFrame(); const t = f / 30;
  const ch = CH.find((c) => t >= c[0].start - 0.05 && t < c[c.length - 1].end + 0.35);
  const endIn = io(t, 26.8, 27.3);
  const stamp = io(t, 16.6, 16.9);
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 35%, #1e150e 0%, #070707 70%)" }}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        {Array.from({ length: 14 }, (_, i) => <line key={i} x1={0} x2={1080} y1={(i * 140 + t * 15) % 1960} y2={(i * 140 + t * 15) % 1960} stroke="rgba(240,122,53,.05)" />)}
        {Array.from({ length: 9 }, (_, i) => <line key={`v${i}`} y1={0} y2={1920} x1={i * 135} x2={i * 135} stroke="rgba(240,122,53,.05)" />)}
        {Array.from({ length: 22 }, (_, i) => { const y = 1920 - ((t * (20 + (i % 5) * 8) + i * 157) % 2000); return <circle key={i} cx={(i * 331) % 1080} cy={y} r={2 + (i % 3)} fill={OR} opacity={0.2} />; })}
        {/* area visiva: viewBox 800x700 scalata su 1000x875 */}
        <g transform="translate(40 330) scale(1.25)">
          <Vis a={0} b={4.3} t={t}>
            <g transform={`translate(70 150) scale(${1.25 + 0.04 * Math.sin(t * 4)})`}><Icon n="pompa" lt={t} /></g>
            <g transform={`translate(480 150) scale(${1.25 + 0.04 * Math.sin(t * 4 + 2)})`}><Icon n="fiamma" lt={t} /></g>
            <circle cx={400} cy={275} r={60 * io(t, 0.4, 0.8)} fill={OR} /><Lab x={400} y={298} s="VS" size={64} />
            <Lab x={195} y={470} s="POMPA DI CALORE" size={44} c={t > 2.5 ? OR : "#fff"} /><Lab x={605} y={470} s="CALDAIA" size={44} c={t > 3.1 ? OR : "#fff"} />
          </Vis>
          <Vis a={4.3} b={6.4} t={t}><Illus n="cappotto" lt={t - 4.3} d={2.1} /></Vis>
          <Vis a={6.4} b={7.9} t={t}><Illus n="pavimento" lt={t - 6.4} d={1.5} /></Vis>
          <Vis a={7.9} b={10.35} t={t}><Illus n="pdcneve" lt={t - 7.9} d={2.4} />
            <g opacity={io(t, 8.9, 9.2)} transform={`translate(560 70) scale(${0.9 + 0.1 * io(t, 8.9, 9.3)})`}><rect x={-200} y={-55} width={400} height={95} rx={47} fill={OR} /><Lab x={0} y={13} s="✓ PIÙ EFFICIENTE" size={48} /></g></Vis>
          <Vis a={10.35} b={12.7} t={t}><Illus n="dispersioni" lt={t - 10.35} d={2.3} /></Vis>
          <Vis a={12.7} b={14.85} t={t}>
            <g transform="translate(110 160) scale(1.1)"><Icon n="pompa" lt={t} /></g><Lab x={400} y={320} s="+" size={140} c={OR} />
            <g transform="translate(470 160) scale(1.1)"><Icon n="fiamma" lt={t} /></g><Lab x={400} y={520} s="SISTEMA IBRIDO" size={64} c={OR} /></Vis>
          <Vis a={14.85} b={19.6} t={t}><Illus n="caldaia" lt={t - 14.85} d={4.7} />
            <g opacity={stamp} transform={`translate(400 300) rotate(-12) scale(${2 - stamp})`}><rect x={-330} y={-80} width={660} height={160} rx={18} fill="rgba(7,7,7,.85)" stroke="#e5484d" strokeWidth={10} /><Lab x={0} y={-8} s="DAL 2025" size={52} c="#e5484d" /><Lab x={0} y={58} s="NIENTE DETRAZIONI" size={58} c="#fff" /></g></Vis>
        </g>
      </svg>
      {/* logo */}
      <div style={{ position: "absolute", top: 232, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: 1 - endIn }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(7,7,7,.85)", padding: "8px 22px", borderRadius: 40 }}>
          <Img src={staticFile("brands/ingbelcastro/logo-white.png")} style={{ height: 54 }} /><span style={{ fontFamily: INT, fontWeight: 800, fontSize: 34, color: "#fff" }}>@ing.belcastro</span></div></div>
      {/* sottotitoli parola per parola */}
      {ch && t < 19.6 && <div style={{ position: "absolute", top: 1300, left: 50, right: 50, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 34px" }}>
        {ch.map((w, i) => <span key={i} style={{ fontFamily: OSW, fontWeight: 700, fontSize: 108, lineHeight: 1.05, textTransform: "uppercase", color: t >= w.start && t < w.end + 0.15 ? OR : "#fff", textShadow: "0 6px 30px rgba(0,0,0,.9)" }}>{w.text.replace(/[.,]$/, "")}</span>)}</div>}
      {/* riepilogo */}
      <AbsoluteFill style={{ opacity: win(t, 19.6, 26.9, 0.35), background: "rgba(7,7,7,.92)" }}>
        <div style={{ position: "absolute", top: 400, left: 0, right: 0, textAlign: "center", fontFamily: OSW, fontWeight: 700, fontSize: 110, color: "#fff", textTransform: "uppercase" }}>Quale <span style={{ color: OR }}>scegliere?</span></div>
        {[["cappotto", "Casa isolata", "pompa di calore"], ["lente", "Poco isolata", "prima le dispersioni, o ibrido"], ["fiamma", "Solo caldaia a gas", "niente detrazioni dal 2025"]].map(([ic, a, b], i) => {
          const k = io(t, 20.3 + i * 1.6, 20.7 + i * 1.6);
          return <div key={i} style={{ position: "absolute", top: 640 + i * 270, left: 80, right: 60, display: "flex", alignItems: "center", gap: 36, opacity: k, transform: `translateX(${(1 - k) * 150}px)` }}>
            <div style={{ width: 180, height: 180, minWidth: 180, borderRadius: 90, background: "#181818", border: `4px solid ${OR}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {ic === "cappotto" ? <svg width={150} height={130} viewBox="0 0 800 700"><Illus n="cappotto" lt={t} d={5} /></svg> : <Icon n={ic} lt={t - 20} size={130} />}</div>
            <div><div style={{ fontFamily: OSW, fontWeight: 700, fontSize: 70, color: "#fff", textTransform: "uppercase", lineHeight: 1.05 }}>{a}</div>
              <div style={{ fontFamily: INT, fontWeight: 800, fontSize: 46, color: OR, lineHeight: 1.2 }}>{b}</div></div></div>;
        })}
      </AbsoluteFill>
      {/* chiusura */}
      <AbsoluteFill style={{ opacity: endIn, background: "#000", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 36 }}>
        <Img src={staticFile("brands/ingbelcastro/logo-white.png")} style={{ width: 420 }} />
        <div style={{ fontFamily: OSW, fontWeight: 700, fontSize: 92, color: "#fff", textTransform: "uppercase", textAlign: "center", lineHeight: 1.05 }}>Ti è stato<br />utile?</div>
        <div style={{ background: OR, color: "#fff", fontFamily: OSW, fontWeight: 700, fontSize: 70, padding: "14px 54px", borderRadius: 999, textTransform: "uppercase", transform: `scale(${1 + 0.04 * Math.sin(t * 5)})` }}>Salvalo e condividilo</div>
        <div style={{ fontFamily: INT, fontWeight: 800, fontSize: 40, color: "#ccc", textAlign: "center", lineHeight: 1.3 }}>Domani<br /><span style={{ color: OR }}>Meraviglie dell'ingegneria #1</span></div>
      </AbsoluteFill>
      <Audio src={staticFile("pdc7r/voce.wav")} />
      <Audio src={staticFile("beat100.wav")} volume={0.13} />
    </AbsoluteFill>
  );
};
