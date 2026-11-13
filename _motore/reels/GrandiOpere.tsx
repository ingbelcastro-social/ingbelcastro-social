import React from "react";
import { AbsoluteFill, Audio, Img, interpolate, Sequence, staticFile, useCurrentFrame, Easing } from "remotion";
import { loadFont as loadOswald } from "@remotion/google-fonts/Oswald";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { TowerBridge, TB_DUR } from "./TowerBridge";
import { Pisa, PISA_DUR } from "./Pisa";
const { fontFamily: OSW } = loadOswald("normal", { weights: ["700"], subsets: ["latin", "latin-ext"] });
const { fontFamily: INT } = loadInter("normal", { weights: ["600", "800"], subsets: ["latin", "latin-ext"] });
const OR = "#D98A58";
const C = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const INTRO = 4.5;
const io = (t: number, a: number, b: number) => interpolate(t, [a, b], [0, 1], { ...C, easing: Easing.out(Easing.cubic) });

// Sigla di 3 s delle «Grandi Opere»: logo + titolo, poi parte il video
export const GOIntro: React.FC<{ title: string; place: string; num: number }> = ({ title, place, num }) => {
  const f = useCurrentFrame(); const t = f / 30;
  const out = io(t, INTRO - 0.45, INTRO);
  return (
    <AbsoluteFill style={{ background: "#050505", overflow: "hidden" }}>
      <svg width={1080} height={1920} style={{ position: "absolute", opacity: 0.6 * (1 - out) }}>
        {Array.from({ length: 16 }, (_, i) => <line key={i} x1={0} x2={1080 * io(t, 0.05 * i, 0.6 + 0.05 * i)} y1={120 * i} y2={120 * i} stroke="rgba(217,138,88,.18)" strokeWidth={2} />)}
        {Array.from({ length: 10 }, (_, i) => <line key={`v${i}`} x1={120 * i} x2={120 * i} y1={0} y2={1920 * io(t, 0.05 * i, 0.7 + 0.05 * i)} stroke="rgba(217,138,88,.12)" strokeWidth={2} />)}
        <circle cx={540} cy={760} r={900 * io(t, 0.15, 1.2)} fill="none" stroke={OR} strokeWidth={4} opacity={1 - io(t, 0.4, 1.4)} />
      </svg>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 30, transform: `scale(${1 + 0.06 * t}) translateY(${-out * 80}px)`, opacity: 1 - out }}>
        <Img src={staticFile("engiplanet/logo-engiplanet-originale.jpg")} style={{ width: 520, height: 520, borderRadius: 260, boxShadow: "0 0 90px rgba(217,138,88,.35)", opacity: io(t, 0.1, 0.5), transform: `scale(${0.8 + 0.2 * io(t, 0.1, 0.6)})` }} />
        <div style={{ fontFamily: INT, fontWeight: 800, fontSize: 40, letterSpacing: "0.35em", color: OR, opacity: io(t, 0.6, 0.9), marginTop: 20 }}>LE GRANDI OPERE · #{num}</div>
        <div style={{ fontFamily: OSW, fontWeight: 700, fontSize: 124, color: "#fff", textTransform: "uppercase", lineHeight: 1.02, textAlign: "center", padding: "0 50px",
          opacity: io(t, 0.95, 1.3), transform: `translateY(${(1 - io(t, 0.95, 1.4)) * 50}px)`, letterSpacing: `${0.05 - 0.04 * io(t, 0.95, 2.4)}em` }}>{title}</div>
        <div style={{ fontFamily: INT, fontWeight: 600, fontSize: 44, color: "#ccc", opacity: io(t, 1.4, 1.7) }}>{place}</div>
        <div style={{ height: 8, width: 460 * io(t, 1.2, 2.2), background: OR, borderRadius: 4 }} />
        <div style={{ fontFamily: INT, fontWeight: 600, fontSize: 34, color: "#888", opacity: io(t, 2.2, 2.6), marginTop: 10 }}>@engiplanet</div>
      </AbsoluteFill>
      <div style={{ position: "absolute", top: 0, bottom: 0, left: `${-110 + 220 * io(t, INTRO - 0.5, INTRO)}%`, width: "100%", background: OR, opacity: t > INTRO - 0.5 ? 1 : 0 }} />
    </AbsoluteFill>
  );
};


export const GO_TB_DUR = INTRO + TB_DUR;
export const GOTowerBridge: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence durationInFrames={INTRO * 30}><GOIntro title="Tower Bridge" place="Londra · London" num={1} /></Sequence>
    <Sequence from={INTRO * 30}><TowerBridge /></Sequence>
    <Audio src={staticFile("go-tb/mix.wav")} />
  </AbsoluteFill>
);

export const GO_PISA_DUR = INTRO + PISA_DUR;
export const GOPisa: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence durationInFrames={INTRO * 30}><GOIntro title="Torre di Pisa" place="Pisa · Italia" num={2} /></Sequence>
    <Sequence from={INTRO * 30}><Pisa /></Sequence>
    <Audio src={staticFile("go-pisa/mix.wav")} />
  </AbsoluteFill>
);
