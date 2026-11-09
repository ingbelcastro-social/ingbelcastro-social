import React from "react";
import { AbsoluteFill, Audio, Img, interpolate, staticFile, useCurrentFrame, Easing } from "remotion";
import { loadFont as loadOswald } from "@remotion/google-fonts/Oswald";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { Icon, Illus } from "./Lungo";
import words from "../public/fv6r/words.json";
const { fontFamily: OSW } = loadOswald("normal", { weights: ["700"], subsets: ["latin", "latin-ext"] });
const { fontFamily: INT } = loadInter("normal", { weights: ["600", "800"], subsets: ["latin", "latin-ext"] });

// Reel «animazione ingegneristica» con voce: Fotovoltaico con batteria (martedì 10/11)
const OR = "#F07A35";
const ease = Easing.out(Easing.cubic);
const C = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const io = (t: number, a: number, b: number) => interpolate(t, [a, b], [0, 1], { ...C, easing: ease });
const win = (t: number, a: number, b: number, f = 0.25) => Math.min(io(t, a, a + f), 1 - io(t, b - f, b));
export const FV6_DUR = 30;
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

export const ReelFv6: React.FC = () => {
  const f = useCurrentFrame(); const t = f / 30;
  const ch = CH.find((c) => t >= c[0].start - 0.05 && t < c[c.length - 1].end + 0.35);
  const endIn = io(t, 26.9, 27.4);
  
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 35%, #1e150e 0%, #070707 70%)" }}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        {Array.from({ length: 14 }, (_, i) => <line key={i} x1={0} x2={1080} y1={(i * 140 + t * 15) % 1960} y2={(i * 140 + t * 15) % 1960} stroke="rgba(240,122,53,.05)" />)}
        {Array.from({ length: 9 }, (_, i) => <line key={`v${i}`} y1={0} y2={1920} x1={i * 135} x2={i * 135} stroke="rgba(240,122,53,.05)" />)}
        {Array.from({ length: 22 }, (_, i) => { const y = 1920 - ((t * (20 + (i % 5) * 8) + i * 157) % 2000); return <circle key={i} cx={(i * 331) % 1080} cy={y} r={2 + (i % 3)} fill={OR} opacity={0.2} />; })}
        {/* area visiva: viewBox 800x700 scalata su 1000x875 */}
        <g transform="translate(40 330) scale(1.25)">
          <Vis a={0} b={2.1} t={t}><Illus n="day" lt={t} d={2.1} />
            <g transform={`translate(165 380) scale(${1 + 0.15 * Math.abs(Math.sin(t * 4))})`}><circle r={46} fill={OR} /><Lab x={0} y={26} s="?" size={80} /></g></Vis>
          <Vis a={2.1} b={6.2} t={t}>
            <g transform="translate(-30 60) scale(0.55)"><Illus n="grid" lt={t} d={4} /></g><g transform="translate(410 60) scale(0.55)"><Illus n="day" lt={t - 2.1} d={4} /></g>
            <circle cx={400} cy={250} r={55 * io(t, 2.3, 2.6)} fill={OR} /><Lab x={400} y={272} s="VS" size={60} />
            <Lab x={190} y={480} s="SOLO IMPIANTO" size={46} c={t > 4.4 ? OR : "#fff"} /><Lab x={620} y={480} s="+ BATTERIA" size={46} c={t > 3.3 && t < 4.4 ? OR : "#fff"} /></Vis>
          <Vis a={6.2} b={8.6} t={t}>{(() => { const a = 14 * Math.sin(t * 2.6); return <g>
            <line x1={400} y1={150} x2={400} y2={520} stroke="#fff" strokeWidth={10} /><path d="M330,540 L470,540 L400,500 Z" fill="#fff" />
            <g transform={`rotate(${a} 400 170)`}><line x1={180} y1={170} x2={620} y2={170} stroke={OR} strokeWidth={10} />
              {[180, 620].map((x, k) => <g key={k} transform={`translate(${x} 170) rotate(${-a})`}><line x1={0} y1={0} x2={-60} y2={130} stroke="#aaa" strokeWidth={3} /><line x1={0} y1={0} x2={60} y2={130} stroke="#aaa" strokeWidth={3} /><path d="M-80,130 Q0,175 80,130 Z" fill="#ddd" /><g transform="translate(-45 40) scale(0.45)"><Icon n={k ? "batteria" : "pannello"} lt={t} /></g></g>)}</g></g>; })()}</Vis>
          <Vis a={8.6} b={12.8} t={t}>
            <circle cx={400} cy={300} r={230} fill="#151515" stroke="#fff" strokeWidth={6} />
            <path d="M400,300 L400,70 A230,230 0 0,1 400,530 Z" fill="rgba(240,122,53,.35)" /><path d="M400,300 L400,530 A230,230 0 0,1 400,70 Z" fill="rgba(60,80,140,.35)" />
            <g transform="translate(560 230) scale(0.5)"><Icon n="sole" lt={t} /></g><g transform="translate(140 230) scale(0.5)"><Icon n="luna" lt={t} /></g>
            <line x1={400} y1={300} x2={400 + 190 * Math.sin(t * 1.5)} y2={300 - 190 * Math.cos(t * 1.5)} stroke="#fff" strokeWidth={10} strokeLinecap="round" /><circle cx={400} cy={300} r={16} fill={OR} />
            <g opacity={io(t, 9.2, 9.5)}><Lab x={400} y={630} s="QUANTO" size={64} c="#888" /><line x1={300} y1={610} x2={500 * io(t, 9.9, 10.3) + 300 * (1 - io(t, 9.9, 10.3))} y2={610} stroke="#e5484d" strokeWidth={9} /></g>
            <g opacity={io(t, 11.0, 11.3)}><Lab x={400} y={720} s="QUANDO" size={80} c={OR} /></g></Vis>
          <Vis a={12.8} b={16.7} t={t}><Illus n={t < 15.4 ? "day" : "night"} lt={t < 15.4 ? t - 12.8 : t - 15.4} d={t < 15.4 ? 2.6 : 1.4} />
            <Lab x={400} y={690} s={t < 15.4 ? "MEZZOGIORNO" : "SERA"} size={70} c={OR} /></Vis>
          <Vis a={16.7} b={22.6} t={t}>
            <g transform="translate(230 140) scale(1.7)"><Icon n="bolletta" lt={t - 16.7} /></g>
            {Array.from({ length: 6 }, (_, k) => { const st = 17.4 + k * 0.6; const y = interpolate(t, [st, st + 0.8], [20, 330], { ...C, easing: Easing.in(Easing.quad) }); return t > st ? <g key={k} transform={`translate(${130 + (k % 3) * 40} ${y}) scale(0.4)`} opacity={1 - io(t, st + 0.7, st + 0.9)}><Icon n="euro" lt={t} /></g> : null; })}
            <g opacity={io(t, 20.4, 20.8)} transform="translate(560 160)"><rect x={-150} y={-60} width={300} height={110} rx={55} fill={OR} /><Lab x={0} y={18} s="RISPARMIO" size={52} /></g></Vis>
        </g>
      </svg>
      {/* logo */}
      <div style={{ position: "absolute", top: 232, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: 1 - endIn }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(7,7,7,.85)", padding: "8px 22px", borderRadius: 40 }}>
          <Img src={staticFile("brands/ingbelcastro/logo-white.png")} style={{ height: 54 }} /><span style={{ fontFamily: INT, fontWeight: 800, fontSize: 34, color: "#fff" }}>@ing.belcastro</span></div></div>
      {/* sottotitoli parola per parola */}
      {ch && t < 22.6 && <div style={{ position: "absolute", top: 1300, left: 50, right: 50, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 34px" }}>
        {ch.map((w, i) => <span key={i} style={{ fontFamily: OSW, fontWeight: 700, fontSize: 108, lineHeight: 1.05, textTransform: "uppercase", color: t >= w.start && t < w.end + 0.15 ? OR : "#fff", textShadow: "0 6px 30px rgba(0,0,0,.9)" }}>{w.text.replace(/[.,]$/, "")}</span>)}</div>}
      {/* riepilogo */}
      <AbsoluteFill style={{ opacity: win(t, 22.6, 26.9, 0.35), background: "rgba(7,7,7,.92)" }}>
        <div style={{ position: "absolute", top: 420, left: 0, right: 0, textAlign: "center", fontFamily: OSW, fontWeight: 700, fontSize: 104, color: "#fff", textTransform: "uppercase", lineHeight: 1.05 }}>La batteria<br /><span style={{ color: OR }}>conviene se…</span></div>
        {[["casa", "Di giorno la casa è vuota"], ["luna", "Consumi soprattutto la sera"], ["pompa", "Hai o avrai pompa di calore o auto elettrica"]].map(([ic, a], i) => {
          const k = io(t, 23.1 + i * 1.1, 23.5 + i * 1.1);
          return <div key={i} style={{ position: "absolute", top: 720 + i * 250, left: 80, right: 60, display: "flex", alignItems: "center", gap: 36, opacity: k, transform: `translateX(${(1 - k) * 150}px)` }}>
            <div style={{ width: 170, height: 170, minWidth: 170, borderRadius: 85, background: "#181818", border: `4px solid ${OR}`, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon n={ic} lt={t - 23} size={120} /></div>
            <div style={{ fontFamily: OSW, fontWeight: 700, fontSize: 62, color: "#fff", textTransform: "uppercase", lineHeight: 1.08 }}>{a}</div></div>;
        })}
      </AbsoluteFill>
      {/* chiusura */}
      <AbsoluteFill style={{ opacity: endIn, background: "#000", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 36 }}>
        <Img src={staticFile("brands/ingbelcastro/logo-white.png")} style={{ width: 420 }} />
        <div style={{ fontFamily: OSW, fontWeight: 700, fontSize: 92, color: "#fff", textTransform: "uppercase", textAlign: "center", lineHeight: 1.05 }}>Domani<br />il video completo</div>
        <div style={{ background: OR, color: "#fff", fontFamily: OSW, fontWeight: 700, fontSize: 70, padding: "14px 54px", borderRadius: 999, textTransform: "uppercase", transform: `scale(${1 + 0.04 * Math.sin(t * 5)})` }}>Mercoledì ore 19:00</div>
        <div style={{ fontFamily: INT, fontWeight: 800, fontSize: 40, color: "#ccc" }}>su YouTube · @ing.belcastro</div>
      </AbsoluteFill>
      <Audio src={staticFile("fv6r/voce.wav")} />
      <Audio src={staticFile("beat100.wav")} volume={0.13} />
    </AbsoluteFill>
  );
};
