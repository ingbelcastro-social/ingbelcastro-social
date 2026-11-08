import React from "react";
import { AbsoluteFill, Audio, Img, interpolate, staticFile, useCurrentFrame, Easing } from "remotion";
import { loadFont as loadOswald } from "@remotion/google-fonts/Oswald";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
const { fontFamily: OSW } = loadOswald("normal", { weights: ["700"], subsets: ["latin", "latin-ext"] });
const { fontFamily: INT } = loadInter("normal", { weights: ["600", "800"], subsets: ["latin", "latin-ext"] });

const OR = "#F07A35";
const ease = Easing.out(Easing.cubic);
const C = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const io = (t: number, a: number, b: number, from = 0, to = 1) => interpolate(t, [a, b], [from, to], { ...C, easing: ease });
const win = (t: number, a: number, b: number, f = 0.25) => Math.min(io(t, a, a + f), 1 - io(t, b - f, b));
export const PONTE_DUR = 50;

// Geometria (vista laterale, altezze esagerate)
const SEA = 1250, TL = 170, TR = 910, TOP = 1015, MID = 540, HALF = 370, SAG = 150;
const deckY = (x: number) => 1205 - 12 * Math.sin(Math.PI * Math.min(1, Math.max(0, (x - TL) / (TR - TL))));
const cabY = (x: number) => TOP + SAG * (1 - ((x - MID) / HALF) ** 2);

const Bridge: React.FC<{ tw: number; cab: number; deck: number; sway: number; t: number }> = ({ tw, cab, deck, sway, t }) => {
  const main = Array.from({ length: 75 }, (_, i) => { const x = TL + (i / 74) * (TR - TL); return `${i ? "L" : "M"}${x.toFixed(1)},${cabY(x).toFixed(1)}`; }).join(" ");
  const sideL = `M30,1185 Q110,1120 ${TL},${TOP}`, sideR = `M1050,1185 Q970,1120 ${TR},${TOP}`;
  const halfDeck = (TR - TL) / 2 * deck;
  const dpath = (a: number, b: number) => Array.from({ length: 30 }, (_, i) => { const x = a + (i / 29) * (b - a); return `${i ? "L" : "M"}${x.toFixed(1)},${(deckY(x) + sway * Math.sin(Math.PI * (x - TL) / (TR - TL))).toFixed(1)}`; }).join(" ");
  const towerH = (SEA - 25 - TOP) * tw;
  const hangers = Array.from({ length: 19 }, (_, i) => TL + 20 + i * 38.9).filter((x) => x - TL <= halfDeck || TR - x <= halfDeck);
  return (
    <g>
      {[TL, TR].map((x) => (
        <g key={x}>
          <rect x={x - 9} y={SEA - 25 - towerH} width={6} height={towerH} fill={OR} />
          <rect x={x + 3} y={SEA - 25 - towerH} width={6} height={towerH} fill={OR} />
          {tw > 0.6 && [0.25, 0.6, 0.95].map((k) => <rect key={k} x={x - 9} y={SEA - 25 - towerH * k} width={18} height={4} fill={OR} />)}
        </g>
      ))}
      <path d={main} fill="none" stroke="#fff" strokeWidth={3} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - cab} />
      <path d={sideL} fill="none" stroke="#fff" strokeWidth={3} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - cab} />
      <path d={sideR} fill="none" stroke="#fff" strokeWidth={3} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - cab} />
      {hangers.map((x) => <line key={x} x1={x} x2={x} y1={cabY(x)} y2={deckY(x) + sway * Math.sin(Math.PI * (x - TL) / (TR - TL))} stroke="rgba(255,255,255,.45)" strokeWidth={1.2} />)}
      {deck > 0 && <>
        <path d={dpath(TL - 40, TL + halfDeck)} fill="none" stroke="#e8e8e8" strokeWidth={7} />
        <path d={dpath(TR - halfDeck, TR + 40)} fill="none" stroke="#e8e8e8" strokeWidth={7} />
      </>}
    </g>
  );
};

const Land = () => (
  <g>
    <path d="M0,1080 C60,1060 120,1120 160,1180 L215,1222 L250,1250 L250,1920 L0,1920 Z" fill="#161616" stroke="#2c2c2c" strokeWidth={2} />
    <path d="M1080,1120 C1020,1110 960,1160 925,1195 L870,1235 L840,1250 L840,1920 L1080,1920 Z" fill="#161616" stroke="#2c2c2c" strokeWidth={2} />
  </g>
);

const Sea: React.FC<{ t: number }> = ({ t }) => (
  <g>
    <rect x={0} y={SEA} width={1080} height={700} fill="#0a121a" />
    {Array.from({ length: 10 }, (_, i) => {
      const y = SEA + 18 + i * 22, off = ((t * (30 + i * 6)) % 120);
      return <line key={i} x1={-120 + off} x2={1200} y1={y} y2={y} stroke="rgba(120,170,210,.10)" strokeWidth={2} strokeDasharray="40 80" />;
    })}
  </g>
);

const Wind: React.FC<{ t: number; k: number; y0?: number; h?: number }> = ({ t, k, y0 = 350, h = 1000 }) => (
  <g opacity={k}>
    {Array.from({ length: 28 }, (_, i) => {
      const y = y0 + ((i * 397) % h), sp = 900 + (i * 131) % 700, len = 120 + (i * 53) % 220;
      const x = ((t * sp + i * 311) % 1600) - 300;
      return <line key={i} x1={x} x2={x + len} y1={y} y2={y + 6} stroke="rgba(255,255,255,.28)" strokeWidth={3} strokeLinecap="round" />;
    })}
  </g>
);

const Big: React.FC<{ children: React.ReactNode; size?: number; top: number; op: number; color?: string }> = ({ children, size = 110, top, op, color = "#fff" }) => (
  <div style={{ position: "absolute", left: 60, right: 60, top, textAlign: "center", opacity: op, transform: `translateY(${(1 - op) * 40}px)`,
    fontFamily: OSW, fontWeight: 700, fontSize: size, lineHeight: 1.04, color, textTransform: "uppercase", textShadow: "0 6px 30px rgba(0,0,0,.8)" }}>{children}</div>
);
const Small: React.FC<{ children: React.ReactNode; top: number; op: number; size?: number; color?: string }> = ({ children, top, op, size = 44, color = "#fff" }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top, textAlign: "center", opacity: op, fontFamily: INT, fontWeight: 800, fontSize: size, color, lineHeight: 1.25, textShadow: "0 4px 20px rgba(0,0,0,.9)" }}>{children}</div>
);
const O: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: OR }}>{children}</span>;

const List: React.FC<{ t: number; a: number; b: number; title: string; color: string; icon: "ok" | "no"; items: string[] }> = ({ t, a, b, title, color, icon, items }) => (
  <AbsoluteFill style={{ opacity: win(t, a, b, 0.3), background: "rgba(7,7,7,.9)" }}>
    <div style={{ position: "absolute", top: 380, left: 0, right: 0, textAlign: "center", fontFamily: OSW, fontWeight: 700, fontSize: 190, color, transform: `scale(${0.8 + 0.2 * io(t, a, a + 0.4)})` }}>{title}</div>
    {items.map((s, i) => {
      const k = io(t, a + 0.7 + i * 1.1, a + 1.1 + i * 1.1);
      return (
        <div key={i} style={{ position: "absolute", left: 90, right: 70, top: 680 + i * 190, display: "flex", alignItems: "center", gap: 34, opacity: k, transform: `translateX(${(1 - k) * 120}px)` }}>
          <div style={{ width: 96, height: 96, minWidth: 96, borderRadius: 48, background: icon === "ok" ? OR : "#2a2a2a", border: icon === "ok" ? "none" : "4px solid #888", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: INT, fontWeight: 800, fontSize: 58, color: "#fff" }}>{icon === "ok" ? "✓" : "✕"}</div>
          <div style={{ fontFamily: INT, fontWeight: 800, fontSize: 52, color: "#fff", lineHeight: 1.15 }}>{s}</div>
        </div>
      );
    })}
  </AbsoluteFill>
);

export const Ponte: React.FC = () => {
  const f = useCurrentFrame(); const t = f / 30;

  // costruzione
  const tw = io(t, 0.2, 1.2), cab = io(t, 1.0, 2.3), deck = io(t, 1.8, 3.0);
  // sisma
  const quake = t > 20.2 && t < 23.2 ? Math.sin(t * 61) * 10 * (1 - io(t, 22.0, 23.2)) : 0;
  const sway = (t > 14.5 && t < 20 ? 4 * Math.sin(t * 5) * win(t, 14.6, 20, 0.6) : 0) + quake * 0.4;
  // camera
  const K = [0, 3.0, 10.0, 10.8, 14.0, 14.6, 24.6, 25.4, 28.2, 28.6];
  const z = interpolate(t, K, [1.15, 1, 1, 3.2, 3.2, 1, 1, 1.7, 1.7, 1], { ...C, easing: Easing.inOut(Easing.cubic) });
  const cy = interpolate(t, K, [1150, 1150, 1150, 1195, 1195, 1150, 1150, 1215, 1215, 1150], { ...C, easing: Easing.inOut(Easing.cubic) });
  const cx = t > 10 && t < 14.6 ? interpolate(t, [10, 14.2], [540, 500], C) : 540;
  const camT = `translate(${540 + quake},1150) scale(${z}) translate(${-cx},${-cy})`;

  // traffico (scena C)
  const traffic = win(t, 10.6, 14.2, 0.3);
  const cars = Array.from({ length: 7 }, (_, i) => {
    const dir = i % 2 ? 1 : -1, sp = 55 + (i * 17) % 30;
    let x = ((t * sp * dir + i * 97) % 740 + 740) % 740 + TL;
    return { x, dir, y: deckY(x) - (dir > 0 ? 7 : 4) };
  });
  const trainX = TL - 200 + ((t - 10.4) * 140);

  // nave (scena D3)
  const shipX = interpolate(t, [24.6, 28.4], [120, 900], C);
  const counter = Math.round(interpolate(t, [4.8, 6.4], [0, 3300], { ...C, easing: Easing.out(Easing.quad) }));
  const endIn = io(t, 47.5, 48.1);

  // Tacoma
  const tac = (k: number) => {
    const A = 26 * Math.sin(t * 7);
    const top = Array.from({ length: 31 }, (_, i) => { const x = 160 + i * 25; const y = 760 - 12 + A * Math.sin(Math.PI * i / 30) * k; return `${i ? "L" : "M"}${x},${y}`; }).join(" ");
    const bot = Array.from({ length: 31 }, (_, i) => { const j = 30 - i; const x = 160 + j * 25; const y = 760 + 12 - A * Math.sin(Math.PI * j / 30) * k; return `L${x},${y}`; }).join(" ");
    return top + " " + bot + " Z";
  };

  return (
    <AbsoluteFill style={{ background: "#070707" }}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#040404" /><stop offset="100%" stopColor="#1b130d" /></linearGradient>
        </defs>
        <rect width={1080} height={1920} fill="url(#sky)" />
        {Array.from({ length: 14 }, (_, i) => <line key={i} x1={0} x2={1080} y1={i * 140} y2={i * 140} stroke="rgba(240,122,53,.05)" />)}
        {Array.from({ length: 9 }, (_, i) => <line key={`v${i}`} y1={0} y2={1920} x1={i * 135} x2={i * 135} stroke="rgba(240,122,53,.05)" />)}
        <g transform={camT}>
          <Sea t={t} />
          <Land />
          <Bridge tw={tw} cab={cab} deck={deck} sway={sway} t={t} />
          {/* quote: campata */}
          <g opacity={win(t, 4.6, 10, 0.3)}>
            <line x1={TL} x2={TL + (TR - TL) * io(t, 4.7, 6.4)} y1={1290} y2={1290} stroke={OR} strokeWidth={4} />
            <line x1={TL} x2={TL} y1={1275} y2={1305} stroke={OR} strokeWidth={4} />
            <line x1={TR} x2={TR} y1={1275} y2={1305} stroke={OR} strokeWidth={4} opacity={io(t, 6.2, 6.4)} />
          </g>
          <g opacity={win(t, 5.8, 10, 0.3)}>
            <line x1={TR + 30} x2={TR + 30} y1={SEA - 25} y2={SEA - 25 - (SEA - 25 - TOP) * io(t, 5.9, 6.8)} stroke="#fff" strokeWidth={3} />
          </g>
          {/* traffico */}
          <g opacity={traffic}>
            {cars.map((c, i) => <rect key={i} x={c.x - 5} y={c.y - 3} width={10} height={4} rx={1} fill={i % 3 ? "#fff" : OR} />)}
            <rect x={trainX} y={deckY(Math.max(TL, Math.min(TR, trainX + 60))) - 6} width={120} height={4.5} rx={2} fill={OR} />
          </g>
          {/* nave */}
          <g opacity={win(t, 24.6, 28.4, 0.3)} transform={`translate(${shipX},${SEA})`}>
            <path d="M-60,0 L-52,-12 L56,-12 L64,0 Z" fill="#ddd" />
            <rect x={-40} y={-24} width={78} height={12} fill="#bbb" /><rect x={-26} y={-34} width={50} height={10} fill="#999" />
          </g>
          <g opacity={win(t, 25.2, 28.4, 0.3)}>
            <line x1={MID + 90} x2={MID + 90} y1={SEA} y2={deckY(MID + 90) + 4} stroke={OR} strokeWidth={2.5} />
            <line x1={MID + 82} x2={MID + 98} y1={SEA} y2={SEA} stroke={OR} strokeWidth={2.5} />
            <line x1={MID + 82} x2={MID + 98} y1={deckY(MID + 90) + 4} y2={deckY(MID + 90) + 4} stroke={OR} strokeWidth={2.5} />
          </g>
        </g>
        <Wind t={t} k={win(t, 14.6, 20.0, 0.4)} />
        {/* crepa del sisma */}
        <path d="M0,1500 L120,1470 L190,1530 L300,1490 L420,1560 L540,1500 L660,1570 L780,1510 L900,1560 L1080,1520" fill="none" stroke={OR} strokeWidth={5}
          pathLength={1} strokeDasharray="1" strokeDashoffset={1 - io(t, 20.3, 21.2)} opacity={win(t, 20.2, 24.6, 0.3)} />
        {/* Tacoma */}
        <g opacity={win(t, 15.4, 17.6, 0.3)} transform="translate(0 -70)">
          <rect x={120} y={600} width={840} height={330} rx={26} fill="rgba(10,10,10,.85)" stroke="#444" strokeWidth={3} />
          <rect x={150} y={650} width={10} height={220} fill="#777" /><rect x={920} y={650} width={10} height={220} fill="#777" />
          <path d={tac(1)} fill="#9a9a9a" stroke="#eee" strokeWidth={2} />
        </g>
        {/* impalcato a 3 cassoni */}
        <g opacity={win(t, 17.6, 20.0, 0.3)} transform="translate(0 -70)">
          <rect x={120} y={600} width={840} height={330} rx={26} fill="rgba(10,10,10,.88)" stroke="#444" strokeWidth={3} />
          {[[170, 290], [510, 60], [620, 290]].map(([x, w], i) => <rect key={i} x={x} y={735} width={w} height={44} rx={18} fill={i === 1 ? OR : "#e8e8e8"} />)}
          {Array.from({ length: 8 }, (_, i) => {
            const x = ((t * 700 + i * 140) % 980) - 60; const gx = [480, 700][i % 2];
            const dy = Math.max(0, 1 - Math.abs(x - gx) / 90) * (i % 2 ? 1 : -1) * 30;
            return <circle key={i} cx={x} cy={757 + (i < 4 ? -70 : 70) + dy * (i < 4 ? -1 : 1) * -1} r={5} fill="rgba(255,255,255,.7)" />;
          })}
          {[[480, 465], [700, 465]].map(([x], i) => <g key={i}><line x1={x} x2={x} y1={690} y2={830} stroke={OR} strokeWidth={4} strokeDasharray="10 8" strokeDashoffset={-t * 60} /></g>)}
        </g>
      </svg>

      {/* logo fisso */}
      <div style={{ position: "absolute", top: 232, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: 1 - endIn }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(7,7,7,.85)", padding: "8px 22px", borderRadius: 40 }}>
          <Img src={staticFile("brands/ingbelcastro/logo-white.png")} style={{ height: 54 }} />
          <span style={{ fontFamily: INT, fontWeight: 800, fontSize: 34, color: "#fff" }}>@ing.belcastro</span>
        </div>
      </div>

      {/* A — gancio */}
      <Big top={420} op={win(t, 0.05, 2.7, 0.2)} size={112}>Il ponte sospeso<br /><O>più lungo</O><br />del mondo…</Big>
      <Big top={470} op={win(t, 2.7, 4.6, 0.2)} size={118}>…che ancora<br /><O>non esiste</O></Big>
      <Small top={1340} op={win(t, 0.6, 4.6, 0.3)} size={34} color="#aaa">SICILIA&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Stretto di Messina&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CALABRIA</Small>
      {/* B — numeri */}
      <Big top={440} op={win(t, 4.7, 6.9, 0.25)} size={200} color={OR}>{counter.toLocaleString("it-IT")} m</Big>
      <Big top={660} op={win(t, 5.0, 6.9, 0.25)} size={70}>una sola campata</Big>
      <Small top={1380} op={win(t, 5.9, 6.9, 0.2)} size={46}>torri alte <span style={{ color: OR }}>399 m</span></Small>
      <div style={{ position: "absolute", top: 420, left: 80, right: 80, opacity: win(t, 6.9, 10.0, 0.3) }}>
        <div style={{ fontFamily: OSW, fontWeight: 700, fontSize: 64, color: "#fff", textTransform: "uppercase", marginBottom: 30 }}>Campata più lunga</div>
        <div style={{ fontFamily: INT, fontWeight: 800, fontSize: 36, color: "#bbb" }}>Çanakkale 1915 (Turchia) · record attuale</div>
        <div style={{ height: 54, width: `${61 * io(t, 7.2, 8.0)}%`, background: "#777", borderRadius: 8, margin: "12px 0 30px", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 14, fontFamily: OSW, fontWeight: 700, fontSize: 38, color: "#fff" }}>2.023 m</div>
        <div style={{ fontFamily: INT, fontWeight: 800, fontSize: 36, color: "#fff" }}>Ponte sullo Stretto · progetto</div>
        <div style={{ height: 54, width: `${100 * io(t, 7.9, 8.9)}%`, background: OR, borderRadius: 8, margin: "12px 0 0", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 14, fontFamily: OSW, fontWeight: 700, fontSize: 38, color: "#fff" }}>3.300 m</div>
      </div>
      {/* C — traffico */}
      <Big top={430} op={win(t, 10.8, 14.3, 0.25)} size={120}><O>6</O> corsie<br /><O>2</O> binari</Big>
      <Small top={720} op={win(t, 11.5, 14.3, 0.25)} size={46}>auto e treni sullo stesso impalcato</Small>
      {/* D1 — vento */}
      <Small top={400} op={win(t, 14.7, 20.0, 0.25)} size={38} color={OR}>DIFFICOLTÀ N. 1</Small>
      <Big top={455} op={win(t, 14.7, 20.0, 0.25)} size={110}>Il vento</Big>
      <Small top={885} op={win(t, 15.5, 17.6, 0.25)} size={38}>1940: il vento fa crollare<br />il ponte di Tacoma (USA)</Small>
      <Small top={885} op={win(t, 17.7, 20.0, 0.25)} size={38}>Qui: impalcato a 3 cassoni, il vento passa<br />nelle fessure · stabile fino a <span style={{ color: OR }}>270 km/h</span></Small>
      {/* D2 — sisma */}
      <Small top={400} op={win(t, 20.1, 24.6, 0.25)} size={38} color={OR}>DIFFICOLTÀ N. 2</Small>
      <Big top={455} op={win(t, 20.1, 24.6, 0.25)} size={110}>Il terremoto</Big>
      <Small top={620} op={win(t, 21.0, 24.6, 0.25)} size={44}>Lo Stretto è la zona<br />del terremoto del 1908</Small>
      <Big top={1600} op={win(t, 22.0, 24.6, 0.25)} size={64}>progettato per <O>magnitudo 7,1</O></Big>
      {/* D3 — navi */}
      <Small top={400} op={win(t, 24.7, 28.5, 0.25)} size={38} color={OR}>DIFFICOLTÀ N. 3</Small>
      <Big top={455} op={win(t, 24.7, 28.5, 0.25)} size={110}>Le navi</Big>
      <Small top={620} op={win(t, 25.3, 28.5, 0.25)} size={44}>Sotto restano <span style={{ color: OR }}>65–70 m</span> di altezza libera.<br />Basteranno per le navi più alte?</Small>
      {/* E/F — pro e contro */}
      <List t={t} a={28.5} b={34.6} title="PRO" color={OR} icon="ok" items={["Lo Stretto in pochi minuti, senza attese", "Treni senza traghetto", "Corridoio europeo Scandinavia–Mediterraneo", "Lavoro e sviluppo al Sud"]} />
      <List t={t} a={34.5} b={40.6} title="CONTRO" color="#fff" icon="no" items={["Costo stimato 13,5 miliardi", "Zona sismica e ventosa", "Strade e ferrovie da adeguare", "Impatto sull'ambiente dello Stretto"]} />
      {/* G — stato */}
      <AbsoluteFill style={{ opacity: win(t, 40.5, 43.6, 0.3), background: "rgba(7,7,7,.94)" }}>
        <Big top={520} op={io(t, 40.6, 41.0)} size={110}>A che punto<br /><O>siamo?</O></Big>
        <Small top={840} op={io(t, 41.1, 41.5)} size={46}>Ottobre 2025: la Corte dei conti<br />nega il visto alla delibera CIPESS.</Small>
        <Small top={1010} op={io(t, 41.9, 42.3)} size={46}>Il progetto attende ancora<br />il <span style={{ color: OR }}>via libera definitivo</span>.</Small>
        <Small top={1220} op={io(t, 41.0, 41.4) * 0.7} size={26}>Fonti: MIT · Stretto di Messina S.p.A. · Corte dei conti · dati di progetto</Small>
      </AbsoluteFill>
      {/* H — e tu? */}
      <AbsoluteFill style={{ opacity: win(t, 43.5, 47.6, 0.3), background: "#070707" }}>
        <Big top={430} op={io(t, 43.6, 44.0)} size={170}>E tu?</Big>
        <div style={{ position: "absolute", top: 720, left: 70, right: 70, display: "flex", gap: 40 }}>
          {[["PRO", OR], ["CONTRO", "#2a2a2a"]].map(([s, c], i) => {
            const k = io(t, 44.2 + i * 0.3, 44.6 + i * 0.3);
            const pulse = 1 + 0.05 * Math.max(0, Math.sin((t - 45) * Math.PI * 1.2 + i * Math.PI));
            return <div key={s} style={{ flex: 1, height: 360, borderRadius: 34, background: c, border: i ? "5px solid #fff" : "none", display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: OSW, fontWeight: 700, fontSize: i ? 96 : 130, color: "#fff", opacity: k, transform: `scale(${(0.7 + 0.3 * k) * pulse})` }}>{s}</div>;
          })}
        </div>
        <Small top={1160} op={io(t, 45.0, 45.4)} size={56}>Scrivilo nei commenti 👇</Small>
      </AbsoluteFill>
      {/* I — chiusura */}
      <AbsoluteFill style={{ opacity: endIn, background: "#000", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 40 }}>
        <Img src={staticFile("brands/ingbelcastro/logo-white.png")} style={{ width: 520, transform: `scale(${0.9 + 0.1 * endIn})` }} />
        <div style={{ fontFamily: OSW, fontWeight: 700, fontSize: 70, color: "#fff", textTransform: "uppercase" }}>Segui <span style={{ color: OR }}>@ing.belcastro</span></div>
        <div style={{ fontFamily: INT, fontWeight: 600, fontSize: 38, color: "#ccc", textAlign: "center", padding: "0 90px" }}>L'ingegneria che non ti hanno mai raccontato</div>
      </AbsoluteFill>
      <Small top={1690} op={win(t, 0.3, 28.5, 0.3) * 0.55} size={22}>Animazione illustrativa · altezze non in scala</Small>
      <Audio src={staticFile("ponte/sound.wav")} />
    </AbsoluteFill>
  );
};
