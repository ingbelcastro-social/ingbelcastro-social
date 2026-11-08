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

export const V1_DUR = 34.5;
const GROUND = 1700, PX = 540;
const SPH_Y = 525; // centro sfera (tra 87° e 92° piano, stilizzato)

// Torre stilizzata: podio + 8 segmenti svasati + cima + guglia
const Tower: React.FC<{ xray: number; sphereDx: number; glow: number; stroke?: string }> = ({ xray, sphereDx, glow, stroke = "#2a2a2a" }) => {
  const segs = Array.from({ length: 8 }, (_, i) => {
    const yb = 1560 - i * 140, yt = yb - 140;
    return `M${PX - 100},${yb} L${PX - 125},${yt} L${PX + 125},${yt} L${PX + 100},${yb} Z`;
  });
  const fill = `rgba(${Math.round(40 - 30 * xray)},${Math.round(40 - 30 * xray)},${Math.round(44 - 30 * xray)},${1 - 0.75 * xray})`;
  const line = xray > 0.05 ? OR : stroke;
  return (
    <g>
      <rect x={PX - 150} y={1560} width={300} height={140} fill={fill} stroke={line} strokeWidth={3} />
      {segs.map((d, i) => <path key={i} d={d} fill={fill} stroke={line} strokeWidth={3} />)}
      {Array.from({ length: 8 }, (_, i) => Array.from({ length: 3 }, (_, k) => (
        <line key={`${i}-${k}`} x1={PX - 105} x2={PX + 105} y1={1560 - i * 140 - 40 - k * 32} y2={1560 - i * 140 - 40 - k * 32}
          stroke={xray > 0.05 ? "rgba(240,122,53,.25)" : "rgba(255,255,255,.07)"} strokeWidth={2} />)))}
      <path d={`M${PX - 80},440 L${PX - 60},380 L${PX + 60},380 L${PX + 80},440 Z`} fill={fill} stroke={line} strokeWidth={3} />
      <line x1={PX} x2={PX} y1={380} y2={300} stroke={line === OR ? OR : "#555"} strokeWidth={6} />
      {/* bagliore del "cuore" */}
      <circle cx={PX + sphereDx} cy={SPH_Y} r={40 + 70 * glow} fill={`rgba(240,122,53,${0.5 * glow})`} />
      {/* pendolo: cavi + sfera, visibile ai raggi X */}
      <g opacity={Math.max(xray, glow * 0.9)}>
        <line x1={PX - 30} y1={450} x2={PX + sphereDx - 20} y2={SPH_Y - 30} stroke="#ddd" strokeWidth={2.5} />
        <line x1={PX + 30} y1={450} x2={PX + sphereDx + 20} y2={SPH_Y - 30} stroke="#ddd" strokeWidth={2.5} />
        <circle cx={PX + sphereDx} cy={SPH_Y} r={40} fill="url(#gold)" stroke="#fff" strokeWidth={2} />
      </g>
    </g>
  );
};

const Defs = () => (
  <defs>
    <radialGradient id="gold" cx="35%" cy="35%" r="70%">
      <stop offset="0%" stopColor="#FFE2B0" /><stop offset="45%" stopColor={OR} /><stop offset="100%" stopColor="#7a3510" />
    </radialGradient>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#050505" /><stop offset="100%" stopColor="#1a1410" />
    </linearGradient>
  </defs>
);

const Wind: React.FC<{ t: number; k: number }> = ({ t, k }) => (
  <g opacity={k}>
    {Array.from({ length: 26 }, (_, i) => {
      const y = 300 + ((i * 397) % 1300), sp = 900 + (i * 131) % 700, len = 120 + (i * 53) % 220;
      const x = ((t * sp + i * 311) % 1600) - 300;
      return <line key={i} x1={x} x2={x + len} y1={y} y2={y + 6} stroke="rgba(255,255,255,.28)" strokeWidth={3} strokeLinecap="round" />;
    })}
  </g>
);

const Big: React.FC<{ children: React.ReactNode; size?: number; top: number; op: number; dy?: number; color?: string }> = ({ children, size = 120, top, op, dy = 0, color = "#fff" }) => (
  <div style={{ position: "absolute", left: 60, right: 60, top, textAlign: "center", opacity: op, transform: `translateY(${(1 - op) * 40 + dy}px)`,
    fontFamily: OSW, fontWeight: 700, fontSize: size, lineHeight: 1.02, color, textTransform: "uppercase", textShadow: "0 6px 30px rgba(0,0,0,.8)" }}>{children}</div>
);
const Small: React.FC<{ children: React.ReactNode; top: number; op: number; size?: number }> = ({ children, top, op, size = 46 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top, textAlign: "center", opacity: op, fontFamily: INT, fontWeight: 800, fontSize: size, color: "#fff", lineHeight: 1.25 }}>{children}</div>
);
const O: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: OR }}>{children}</span>;

export const Viral1: React.FC = () => {
  const f = useCurrentFrame(); const t = f / 30;
  const w = 2 * Math.PI / 2.2; // periodo di oscillazione (animazione)

  // ---- oscillazione torre principale
  const swayAmp = interpolate(t, [3.2, 5.0, 7.0, 9.0], [0, 4.2, 4.2, 0.6], C);
  const theta = swayAmp * Math.sin(w * (t - 3.2));
  const beat = (x: number) => Math.exp(-((x % 1) * 9)); // battito ogni secondo
  const heart = t < 3.4 ? Math.max(beat(t), beat(t - 0.33) * 0.7) : 0;
  const xray = io(t, 7.3, 8.2) * (1 - io(t, 12.2, 12.5));
  const sphereDx = -swayAmp * 9 * Math.sin(w * (t - 3.2)) + (t > 7 && t < 12.5 ? -30 * Math.sin(w * (t - 7)) * io(t, 7.5, 8.5) : 0);
  // camera: zoom sulla cima
  const zoom = interpolate(t, [7.0, 8.4, 12.0, 12.5], [1, 2.5, 2.6, 1], { ...C, easing: Easing.inOut(Easing.cubic) });
  const camY = interpolate(zoom, [1, 2.6], [0, 175], C);
  const shake = t > 3.2 && t < 7 ? Math.sin(t * 47) * 4 * swayAmp / 4.2 : 0;

  const showMain = t < 12.5;
  const showSplit = t >= 12.5 && t < 19.2;
  const showMech = t >= 19.0 && t < 24.6;
  const counter = Math.round(interpolate(t, [8.4, 10.0], [0, 660], { ...C, easing: Easing.out(Easing.quad) }));

  // split: SENZA / CON
  const ts = t - 12.5;
  const thA = 5.5 * Math.sin(w * ts) * io(t, 12.7, 13.6);
  const thB = 1.3 * Math.sin(w * ts) * io(t, 12.7, 13.6);
  const dxB = -48 * Math.sin(w * ts) * io(t, 12.7, 13.6);

  // meccanismo
  const tm = t - 19;
  const amp3 = interpolate(tm, [0, 1.6, 4.5], [4, 4, 0.6], C);
  const th3 = amp3 * Math.sin(w * tm);
  const dx3 = -amp3 * 12 * Math.sin(w * tm);

  const endIn = io(t, 31.5, 32.1);

  return (
    <AbsoluteFill style={{ background: "#070707" }}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
        <Defs />
        <rect width={1080} height={1920} fill="url(#sky)" />
        {/* griglia tecnica */}
        {Array.from({ length: 14 }, (_, i) => <line key={i} x1={0} x2={1080} y1={i * 140} y2={i * 140} stroke="rgba(240,122,53,.05)" />)}
        {Array.from({ length: 9 }, (_, i) => <line key={`v${i}`} y1={0} y2={1920} x1={i * 135} x2={i * 135} stroke="rgba(240,122,53,.05)" />)}

        {showMain && (
          <g transform={`translate(${shake},${camY}) translate(540 ${SPH_Y}) scale(${zoom}) translate(-540 ${-SPH_Y})`}>
            <rect x={0} y={GROUND} width={1080} height={400} fill="#0d0d0d" />
            <line x1={0} x2={1080} y1={GROUND} y2={GROUND} stroke="#333" strokeWidth={3} />
            <g transform={`rotate(${theta} ${PX} ${GROUND})`}>
              <Tower xray={xray} sphereDx={sphereDx} glow={heart} />
            </g>
          </g>
        )}
        {showMain && <Wind t={t} k={win(t, 3.3, 7.4, 0.4)} />}

        {showSplit && (
          <g opacity={win(t, 12.5, 19.2, 0.3)}>
            <g transform="translate(-61 230) scale(0.65)">
              <g transform={`translate(540 0) rotate(${thA} ${PX} ${GROUND}) translate(-540 0)`}><Tower xray={0} sphereDx={0} glow={0} stroke="#555" /></g>
            </g>
            <g transform="translate(439 230) scale(0.65)">
              <g transform={`translate(540 0) rotate(${thB} ${PX} ${GROUND}) translate(-540 0)`}><Tower xray={1} sphereDx={dxB} glow={0} /></g>
            </g>
            <Wind t={t} k={0.8} />
          </g>
        )}

        {showMech && (
          <g opacity={win(t, 19.0, 24.6, 0.3)} transform="translate(0 -40) translate(540 1700) scale(1.05) translate(-540 -1700)">
            <rect x={0} y={GROUND} width={1080} height={400} fill="#0d0d0d" />
            <g transform={`rotate(${th3} ${PX} ${GROUND})`}><Tower xray={1} sphereDx={dx3} glow={0} /></g>
            {/* frecce */}
            <g opacity={io(t, 19.4, 19.8) * (tm < 4.2 ? 1 : 0.3)}>
              <line x1={120} x2={360} y1={560} y2={560} stroke="#fff" strokeWidth={10} />
              <path d="M360,535 L410,560 L360,585 Z" fill="#fff" />
            </g>
            <g opacity={io(t, 20.9, 21.3)}>
              <line x1={960} x2={720} y1={SPH_Y + 120} y2={SPH_Y + 120} stroke={OR} strokeWidth={10} />
              <path d={`M720,${SPH_Y + 95} L670,${SPH_Y + 120} L720,${SPH_Y + 145} Z`} fill={OR} />
            </g>
          </g>
        )}
      </svg>

      <div style={{ position: "absolute", left: 0, right: 0, top: 1050, height: 700, opacity: win(t, 8.0, 12.4, 0.4), background: "linear-gradient(rgba(7,7,7,0), rgba(7,7,7,.85) 30%, rgba(7,7,7,.85) 80%, rgba(7,7,7,0))" }} />
      {/* logo fisso */}
      <div style={{ position: "absolute", top: 232, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 14, opacity: 1 - endIn }}><div style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(7,7,7,.85)", padding: "8px 22px", borderRadius: 40 }}>
        <Img src={staticFile("brands/ingbelcastro/logo-white.png")} style={{ height: 54 }} />
        <span style={{ fontFamily: INT, fontWeight: 800, fontSize: 34, color: "#fff" }}>@ing.belcastro</span>
      </div></div>

      {/* A — gancio */}
      <Big top={1140} op={win(t, 0.05, 3.25, 0.2)} size={104}>Questo grattacielo<br />ha un <O>cuore</O></Big>
      <Big top={1380} op={win(t, 0.9, 3.25, 0.2)} size={150} color={OR}>660 tonnellate</Big>
      {/* B — tifone */}
      <Big top={1150} op={win(t, 3.4, 5.2, 0.25)} size={96}>Arriva un <O>tifone</O>…</Big>
      <Big top={1150} op={win(t, 5.2, 7.1, 0.2)} size={128}>Perché non <O>crolla?</O></Big>
      {/* C — rivelazione */}
      <Big top={1180} op={win(t, 8.3, 12.3, 0.3)} size={190} color={OR}>{counter}</Big>
      <Big top={1390} op={win(t, 8.5, 12.3, 0.3)} size={74}>tonnellate d'acciaio</Big>
      <Small top={1490} op={win(t, 9.6, 12.3, 0.3)} size={40}>una sfera appesa tra l'87° e il 92° piano</Small>
      {/* D — confronto */}
      <div style={{ position: "absolute", top: 330, left: 0, right: 0, display: "flex", justifyContent: "space-around", opacity: win(t, 12.8, 19.2, 0.3) }}>
        <span style={{ fontFamily: OSW, fontWeight: 700, fontSize: 84, color: "#999" }}>SENZA</span>
        <span style={{ fontFamily: OSW, fontWeight: 700, fontSize: 84, color: OR }}>CON</span>
      </div>
      <Big top={1400} op={win(t, 14.2, 19.2, 0.3)} size={84}>La sfera si muove<br /><O>al contrario</O></Big>
      <Small top={1640} op={win(t, 13.0, 19.2, 0.3) * 0.6} size={26}>movimenti esagerati per renderli visibili</Small>
      {/* E — meccanismo */}
      <Big top={1150} op={win(t, 19.4, 20.9, 0.2)} size={92}>1 · Il vento <O>spinge</O></Big>
      <Big top={1150} op={win(t, 20.9, 22.5, 0.2)} size={92}>2 · La sfera va<br /><O>dall'altra parte</O></Big>
      <Big top={1150} op={win(t, 22.5, 24.6, 0.2)} size={88}>3 · Pistoni idraulici<br /><O>assorbono</O> l'energia</Big>
      {/* F — nome */}
      <AbsoluteFill style={{ opacity: win(t, 24.6, 28.6, 0.3), background: "rgba(7,7,7,.92)" }}>
        <Small top={560} op={io(t, 24.7, 25.1)} size={44}>Si chiama</Small>
        <Big top={650} op={io(t, 24.9, 25.4)} size={124}>Smorzatore<br />a <O>massa</O><br /><O>accordata</O></Big>
        <Small top={1130} op={io(t, 25.8, 26.2)} size={44}>Taipei 101 · Taiwan · 508 m</Small>
        <Small top={1260} op={io(t, 26.6, 27.0)} size={50}>Ed è così bello che<br />i turisti pagano <span style={{ color: OR }}>per vederlo</span></Small>
      </AbsoluteFill>
      {/* G — frase finale */}
      <AbsoluteFill style={{ opacity: win(t, 28.6, 31.6, 0.3), background: "#070707" }}>
        <Big top={640} op={io(t, 28.7, 29.1)} size={92}>L'ingegneria<br />non combatte<br />la natura.</Big>
        <Big top={1030} op={io(t, 29.9, 30.3)} size={150} color={OR}>La asseconda.</Big>
      </AbsoluteFill>
      {/* H — chiusura */}
      <AbsoluteFill style={{ opacity: endIn, background: "#000", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 40 }}>
        <Img src={staticFile("brands/ingbelcastro/logo-white.png")} style={{ width: 520, transform: `scale(${0.9 + 0.1 * endIn})` }} />
        <div style={{ fontFamily: OSW, fontWeight: 700, fontSize: 70, color: "#fff", textTransform: "uppercase" }}>Segui <span style={{ color: OR }}>@ing.belcastro</span></div>
        <div style={{ fontFamily: INT, fontWeight: 600, fontSize: 38, color: "#ccc", textAlign: "center", padding: "0 90px" }}>L'ingegneria che non ti hanno mai raccontato</div>
      </AbsoluteFill>
      <Audio src={staticFile("v1/sound.wav")} />
    </AbsoluteFill>
  );
};
