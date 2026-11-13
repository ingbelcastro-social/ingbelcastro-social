import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, Easing } from "remotion";
import { loadFont as loadOswald } from "@remotion/google-fonts/Oswald";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
const { fontFamily: OSW } = loadOswald("normal", { weights: ["700"], subsets: ["latin", "latin-ext"] });
const { fontFamily: INT } = loadInter("normal", { weights: ["600", "800"], subsets: ["latin", "latin-ext"] });
const OR = "#D98A58";
const C = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const io = (t: number, a: number, b: number) => interpolate(t, [a, b], [0, 1], { ...C, easing: Easing.out(Easing.cubic) });

// Foto reale dell'opera, prima della conclusione (regola dell'ing. del 14/11)
export const FotoReale: React.FC<{ R: number; a: number; b: number; img: string; place: string; credit: string }> = ({ R, a, b, img, place, credit }) => {
  const op = Math.min(io(R, a, a + 0.4), 1 - io(R, b - 0.3, b)); if (op <= 0) return null;
  const k = io(R, a, a + 0.6);
  return (
    <AbsoluteFill style={{ opacity: op, background: "#05070b" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 330, textAlign: "center", fontFamily: OSW, fontWeight: 700, fontSize: 84, color: "#fff", textTransform: "uppercase" }}>Dal vero <span style={{ color: OR }}>·</span> <span style={{ color: OR }}>In real life</span></div>
      <div style={{ position: "absolute", left: 80, right: 80, top: 470, height: 1040, borderRadius: 34, overflow: "hidden", border: `6px solid ${OR}`, boxShadow: "0 30px 90px rgba(0,0,0,.7)", transform: `scale(${0.93 + 0.07 * k})` }}>
        <Img src={staticFile(img)} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${1.03 + 0.07 * interpolate(R, [a, b], [0, 1], C)})` }} /></div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1535, textAlign: "center", fontFamily: INT, fontWeight: 800, fontSize: 44, color: "#fff" }}>{place}</div>
      <div style={{ position: "absolute", left: 60, right: 60, top: 1600, textAlign: "center", fontFamily: INT, fontWeight: 600, fontSize: 24, color: "#aaa" }}>{credit}</div>
    </AbsoluteFill>
  );
};
