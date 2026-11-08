import React from "react";
import { AbsoluteFill, Audio, Img, OffthreadVideo, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { loadFont as loadOswald } from "@remotion/google-fonts/Oswald";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
const { fontFamily: OSW } = loadOswald("normal", { weights: ["700"], subsets: ["latin", "latin-ext"] });
const { fontFamily: INT } = loadInter("normal", { weights: ["600", "800"], subsets: ["latin", "latin-ext"] });

const OR = "#F07A35", DK = "#111111";
export type W = { text: string; start: number; end: number };
export type Beat =
  | { type: "hook"; start: number; end: number; lines: string[]; accent?: string }
  | { type: "slam"; start: number; end: number; text: string }
  | { type: "contrast"; start: number; end: number; from: string; to: string; switchAt: number; label?: string }
  | { type: "daynight"; start: number; end: number; dayAt: number; nightAt: number; day: string; night: string }
  | { type: "quote"; start: number; end: number; lines: string[]; accent?: string };
export type PunchProps = { video: string; words: W[]; beats: Beat[]; endTitle: string; endButton: string; endSub: string; endDur: number; videoDur: number; logo: string };

const ease = Easing.out(Easing.cubic);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

function chunks(words: W[]) {
  const out: W[][] = []; let cur: W[] = [];
  words.forEach((w, i) => {
    const prev = words[i - 1];
    const gap = prev ? w.start - prev.end : 0;
    if (cur.length && (cur.length >= 3 || gap > 0.35 || /[.,?!:;]$/.test(prev?.text || ""))) { out.push(cur); cur = []; }
    cur.push(w);
  });
  if (cur.length) out.push(cur);
  return out;
}

const Pop: React.FC<{ t: number; start: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ t, start, children, style }) => {
  const p = interpolate(t, [start, start + 0.22], [0, 1], { ...clamp, easing: ease });
  return <div style={{ opacity: p, transform: `scale(${1.25 - 0.25 * p}) translateY(${(1 - p) * 30}px)`, ...style }}>{children}</div>;
};

const Captions: React.FC<{ t: number; words: W[]; hidden: (t: number) => boolean }> = ({ t, words, hidden }) => {
  if (hidden(t)) return null;
  const cs = chunks(words);
  const c = cs.find((g, i) => t >= g[0].start - 0.05 && t < (cs[i + 1] ? cs[i + 1][0].start - 0.05 : g[g.length - 1].end + 0.4));
  if (!c) return null;
  const k = interpolate(t, [c[0].start - 0.05, c[0].start + 0.12], [0.6, 1], { ...clamp, easing: ease });
  return (
    <div style={{ position: "absolute", left: 70, right: 130, top: 1130, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 40px", transform: `scale(${k})`, opacity: k }}>
      {c.map((w, i) => {
        const on = t >= w.start && t < w.end + 0.05;
        const said = t >= w.start;
        const s = on ? interpolate(t, [w.start, w.start + 0.1], [1.0, 1.12], clamp) : 1;
        return <span key={i} style={{ fontFamily: OSW, fontWeight: 700, fontSize: 104, lineHeight: 1.05, textTransform: "uppercase",
          color: on ? OR : said ? "#fff" : "rgba(255,255,255,.55)", transform: `scale(${s})`, display: "inline-block",
          textShadow: "0 6px 30px rgba(0,0,0,.55)" }}>{w.text.replace(/[.,?!:;]$/, "")}</span>;
      })}
    </div>);
};

const Hook: React.FC<{ b: Extract<Beat, { type: "hook" }>; t: number }> = ({ b, t }) => (
  <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 80px 0 70px" }}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginTop: -120 }}>
      {b.lines.map((l, i) => (
        <Pop key={i} t={t} start={b.start + i * 0.55}>
          <div style={{ fontFamily: OSW, fontWeight: 700, fontSize: i === 0 ? 120 : 150, lineHeight: 1, textTransform: "uppercase", textAlign: "center",
            color: "#fff", textShadow: "0 8px 40px rgba(0,0,0,.6)" }}>
            {l.split(" ").map((x, j) => <span key={j} style={{ color: b.accent && x.toLowerCase().startsWith(b.accent) ? OR : "#fff" }}>{x} </span>)}
          </div>
        </Pop>))}
    </div>
  </AbsoluteFill>);

const Slam: React.FC<{ b: Extract<Beat, { type: "slam" }>; t: number }> = ({ b, t }) => {
  const p = interpolate(t, [b.start, b.start + 0.18], [0, 1], { ...clamp, easing: ease });
  const shake = t < b.start + 0.3 ? Math.sin(t * 90) * 6 * (1 - (t - b.start) / 0.3) : 0;
  return (<AbsoluteFill style={{ background: `rgba(240,122,53,${0.92 * p})`, justifyContent: "center", alignItems: "center" }}>
    <div style={{ fontFamily: OSW, fontWeight: 700, fontSize: 230, color: DK, transform: `scale(${2 - p}) translateX(${shake}px)`, opacity: p, letterSpacing: 2 }}>{b.text}</div>
  </AbsoluteFill>);
};

const Contrast: React.FC<{ b: Extract<Beat, { type: "contrast" }>; t: number }> = ({ b, t }) => {
  const a = interpolate(t, [b.start, b.start + 0.25], [0, 1], { ...clamp, easing: ease });
  const strike = interpolate(t, [b.switchAt - 0.4, b.switchAt], [0, 1], { ...clamp, easing: ease });
  const n = interpolate(t, [b.switchAt, b.switchAt + 0.25], [0, 1], { ...clamp, easing: ease });
  return (<AbsoluteFill style={{ justifyContent: "center", alignItems: "center", background: "rgba(10,10,10,.55)" }}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40, marginTop: -140 }}>
      {b.label && <div style={{ fontFamily: INT, fontWeight: 800, fontSize: 40, letterSpacing: 8, color: OR, opacity: a }}>{b.label}</div>}
      <div style={{ position: "relative", opacity: a * (1 - 0.45 * n), transform: `scale(${1 - 0.15 * n})` }}>
        <div style={{ fontFamily: OSW, fontWeight: 700, fontSize: 116, color: "#fff", textTransform: "uppercase", whiteSpace: "nowrap" }}>{b.from}</div>
        <div style={{ position: "absolute", left: -10, top: "52%", height: 14, background: OR, width: `${strike * 104}%`, borderRadius: 7 }} />
      </div>
      <div style={{ opacity: n, transform: `scale(${1.4 - 0.4 * n})`, fontFamily: OSW, fontWeight: 700, fontSize: 124, color: DK, background: OR, padding: "6px 34px", textTransform: "uppercase", whiteSpace: "nowrap" }}>{b.to}</div>
    </div>
  </AbsoluteFill>);
};

const Sun: React.FC<{ r: number }> = ({ r }) => (<svg width="260" height="260" viewBox="0 0 100 100" style={{ transform: `rotate(${r}deg)` }}>
  <circle cx="50" cy="50" r="18" fill={OR} />{[...Array(8)].map((_, i) => <rect key={i} x="47" y="6" width="6" height="16" rx="3" fill={OR} transform={`rotate(${i * 45} 50 50)`} />)}</svg>);
const Moon: React.FC = () => (<svg width="230" height="230" viewBox="0 0 100 100"><path d="M64 12 A38 38 0 1 0 88 66 A30 30 0 1 1 64 12 Z" fill="#E8E8E8" /></svg>);

const DayNight: React.FC<{ b: Extract<Beat, { type: "daynight" }>; t: number }> = ({ b, t }) => {
  const d = interpolate(t, [b.dayAt - 0.1, b.dayAt + 0.25], [0, 1], { ...clamp, easing: ease });
  const nn = interpolate(t, [b.nightAt - 0.1, b.nightAt + 0.25], [0, 1], { ...clamp, easing: ease });
  const bat = interpolate(t, [b.dayAt + 0.3, b.nightAt], [0, 1], clamp);
  const bg = interpolate(nn, [0, 1], [0, 1]);
  return (<AbsoluteFill style={{ background: `rgba(${Math.round(30 - 20 * bg)},${Math.round(22 - 12 * bg)},${Math.round(14 + 20 * bg)},.78)`, justifyContent: "center", alignItems: "center" }}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 36, marginTop: -160 }}>
      <div style={{ height: 270, position: "relative", width: 300 }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center", opacity: d * (1 - nn), transform: `translateY(${(1 - d) * 60 + nn * -60}px)` }}><Sun r={t * 40} /></div>
        <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center", opacity: nn, transform: `translateY(${(1 - nn) * 60}px)` }}><Moon /></div>
      </div>
      <div style={{ fontFamily: OSW, fontWeight: 700, fontSize: 120, color: "#fff", textTransform: "uppercase", opacity: Math.max(d, nn) }}>{nn > 0.5 ? b.night : b.day}</div>
      <div style={{ width: 420, height: 120, border: "8px solid #fff", borderRadius: 18, position: "relative", padding: 10, opacity: d }}>
        <div style={{ position: "absolute", right: -30, top: 34, width: 20, height: 52, background: "#fff", borderRadius: 4 }} />
        <div style={{ height: "100%", width: `${(nn > 0 ? 1 - 0.7 * nn : bat) * 100}%`, background: OR, borderRadius: 8 }} />
      </div>
    </div>
  </AbsoluteFill>);
};

const Quote: React.FC<{ b: Extract<Beat, { type: "quote" }>; t: number }> = ({ b, t }) => (
  <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", background: "rgba(10,10,10,.5)" }}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, marginTop: -140, padding: "0 70px" }}>
      {b.lines.map((l, i) => (<Pop key={i} t={t} start={b.start + i * 0.35}>
        <div style={{ fontFamily: OSW, fontWeight: 700, fontSize: 140, lineHeight: 1.02, textTransform: "uppercase", textAlign: "center", color: "#fff" }}>
          {l.split(" ").map((x, j) => x.toLowerCase() === b.accent ? <span key={j}><span style={{ background: OR, color: DK, padding: "0 16px" }}>{x}</span> </span> : <span key={j}>{x} </span>)}
        </div></Pop>))}
    </div>
  </AbsoluteFill>);

const EndCard: React.FC<{ p: PunchProps; t: number }> = ({ p, t }) => {
  const s = p.videoDur; const a = interpolate(t, [s, s + 0.3], [0, 1], { ...clamp, easing: ease });
  const b = interpolate(t, [s + 0.35, s + 0.7], [0, 1], { ...clamp, easing: ease });
  return (<AbsoluteFill style={{ background: DK, transform: `translateY(${(1 - a) * 1920}px)`, justifyContent: "center", alignItems: "center" }}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40, marginTop: -100 }}>
      <Img src={staticFile(p.logo)} style={{ height: 260 }} />
      <div style={{ fontFamily: OSW, fontWeight: 700, fontSize: 128, lineHeight: 1, color: "#fff", textAlign: "center", textTransform: "uppercase" }}>{p.endTitle}</div>
      <div style={{ transform: `scale(${0.6 + 0.4 * b})`, opacity: b, fontFamily: OSW, fontWeight: 700, fontSize: 78, background: OR, color: DK, padding: "14px 46px", borderRadius: 20, textTransform: "uppercase" }}>{p.endButton}</div>
      <div style={{ fontFamily: INT, fontWeight: 600, fontSize: 42, color: "#CFCFCF", opacity: b }}>{p.endSub}</div>
    </div>
  </AbsoluteFill>);
};

export const ReelPunch: React.FC<PunchProps> = (p) => {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig(); const t = frame / fps;
  const active = p.beats.filter((b) => t >= b.start && t < b.end);
  const hidden = (tt: number) => p.beats.some((b) => b.type !== "daynight" && tt >= b.start && tt < b.end) || p.beats.some((b) => b.type === "daynight" && tt >= b.start && tt < b.end) || tt >= p.videoDur;
  const punch = p.beats.reduce((z, b) => z + interpolate(t, [b.start, b.start + 0.12, b.start + 0.5], [0, 0.06, 0], clamp), 0);
  const zoom = 1.04 + 0.06 * (t / p.videoDur) + punch;
  const prog = Math.min(1, t / p.videoDur);
  return (<AbsoluteFill style={{ background: DK }}>
    <AbsoluteFill style={{ transform: `scale(${zoom})` }}><OffthreadVideo src={staticFile(p.video)} /></AbsoluteFill>
    <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,.35) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 55%, rgba(0,0,0,.55) 100%)" }} />
    {active.map((b, i) => b.type === "hook" ? <Hook key={i} b={b} t={t} /> : b.type === "slam" ? <Slam key={i} b={b} t={t} /> :
      b.type === "contrast" ? <Contrast key={i} b={b} t={t} /> : b.type === "daynight" ? <DayNight key={i} b={b} t={t} /> : <Quote key={i} b={b} t={t} />)}
    <Captions t={t} words={p.words} hidden={hidden} />
    <div style={{ position: "absolute", top: 230, left: 70, display: "flex", alignItems: "center", gap: 16, opacity: t < p.videoDur ? 1 : 0 }}>
      <Img src={staticFile(p.logo)} style={{ height: 70 }} />
      <span style={{ fontFamily: INT, fontWeight: 600, fontSize: 30, color: "#e6e6e6" }}>@ing.belcastro</span>
    </div>
    <div style={{ position: "absolute", left: 70, right: 130, top: 1470, height: 8, background: "rgba(255,255,255,.2)", borderRadius: 4, opacity: t < p.videoDur ? 1 : 0 }}>
      <div style={{ width: `${prog * 100}%`, height: "100%", background: OR, borderRadius: 4 }} /></div>
    <EndCard p={p} t={t} />
    <Audio src={staticFile("beat100.wav")} volume={(f) => interpolate(f / fps, [0, 0.5, p.videoDur - 0.5, p.videoDur, p.videoDur + p.endDur - 0.6, p.videoDur + p.endDur], [0, 0.09, 0.09, 0.22, 0.22, 0], clamp)} />
  </AbsoluteFill>);
};
