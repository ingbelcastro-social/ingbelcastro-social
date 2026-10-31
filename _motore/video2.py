"""Video lungo DINAMICO 1920x1080 nello stile @ing.belcastro: una scena per frase, sincronizzata alla voce.
Uso: python3 video2.py piano.py out.mp4   (piano.py definisce TITLE, SIGLA, BLOCKS; vedi esempi/piano-video-2-ape.py)
Ogni blocco = un file audio (V2-01.m4a…) + un elenco di scene con l'istante (s, relativo al file) in cui partono.
Tipi di scena: kin, photo, icons, counter, classes, doc, timeline, warn, compare, cards, check, cta.
"""
import json, sys, os, subprocess, tempfile, shutil, runpy, html as H
from concurrent.futures import ProcessPoolExecutor
from common import FONTS, LOGO, A

W, Hh, FPS = 1920, 1080, 30
OR = '#F07A35'
VC = "highpass=f=90,lowpass=f=12000,afftdn=nr=24:nf=-42:tn=1,agate=threshold=0.012:ratio=2.5:attack=5:release=300,acompressor=threshold=-20dB:ratio=3:attack=10:release=200"

def e(s):
    import re
    s = H.escape(s or '')
    s = re.sub(r'\[\[(.+?)\]\]', r'<span class="o">\1</span>', s)
    return s.replace('\n', '<br>')

# ---------- icone (linee, stile tecnico) ----------
IC = {
 'casa': '<path d="M10 46 L50 14 L90 46"/><path d="M20 38 V86 H80 V38"/><path d="M42 86 V62 H58 V86"/>',
 'vendita': '<path d="M14 86 V20"/><path d="M14 24 H76 V52 H14"/><text x="45" y="44" text-anchor="middle" font-size="16" font-family="Oswald" font-weight="700" fill="currentColor" stroke="none">VENDESI</text>',
 'chiave': '<circle cx="32" cy="50" r="16"/><path d="M48 50 H88 M74 50 V62 M84 50 V60"/>',
 'annuncio': '<rect x="14" y="14" width="72" height="72" rx="6"/><path d="M26 30 H74 M26 44 H60"/><rect x="26" y="56" width="22" height="18" fill="currentColor" stroke="none" opacity=".9"/><path d="M54 62 H74 M54 70 H68"/>',
 'gru': '<path d="M30 88 V14 M30 14 H88 M30 14 L14 30 H30 M30 24 L42 14 M76 14 V40"/><rect x="68" y="40" width="16" height="12"/>',
 'martello': '<path d="M30 30 L56 56 M20 40 L40 20 L50 30 L30 50 Z M54 54 L82 82"/>',
 'fiamma': '<path d="M50 86 C26 86 22 62 34 46 C38 58 46 58 46 50 C46 34 56 24 60 14 C70 34 80 46 80 60 C80 76 68 86 50 86 Z"/>',
 'neve': '<path d="M50 10 V90 M15 30 L85 70 M15 70 L85 30 M40 14 L50 24 L60 14 M40 86 L50 76 L60 86"/>',
 'goccia': '<path d="M50 12 C66 36 76 50 76 64 A26 26 0 0 1 24 64 C24 50 34 36 50 12 Z"/>',
 'tecnico': '<circle cx="50" cy="34" r="14"/><path d="M22 88 C22 66 34 56 50 56 C66 56 78 66 78 88"/><path d="M32 30 C32 16 68 16 68 30 H32"/>',
 'scudo': '<path d="M50 10 L84 22 V48 C84 70 68 84 50 90 C32 84 16 70 16 48 V22 Z"/><path d="M34 50 L46 62 L68 38"/>',
 'metro': '<rect x="10" y="38" width="80" height="24" rx="3"/><path d="M20 38 V48 M30 38 V52 M40 38 V48 M50 38 V52 M60 38 V48 M70 38 V52 M80 38 V48"/>',
 'pc': '<rect x="16" y="20" width="68" height="44" rx="4"/><path d="M8 76 H92 L84 64 H16 Z"/><path d="M28 52 L40 40 L50 48 L68 30"/>',
 'regione': '<path d="M20 30 L50 14 L80 30 V70 L50 86 L20 70 Z"/><path d="M38 50 L48 60 L64 42"/>',
 'euro': '<path d="M70 26 A28 28 0 1 0 70 74 M18 44 H60 M18 56 H56"/>',
 'superficie': '<rect x="16" y="16" width="68" height="68"/><path d="M16 30 H84 M30 16 V84" stroke-dasharray="4 5"/>',
 'impianto': '<rect x="22" y="12" width="56" height="76" rx="6"/><circle cx="50" cy="40" r="12"/><path d="M36 70 H64"/>',
 'complessita': '<path d="M14 80 L38 56 L52 68 L86 26"/><path d="M70 26 H86 V42"/>',
 'warn': '<path d="M50 12 L90 84 H10 Z"/><path d="M50 38 V60 M50 70 V72"/>',
 'bolletta': '<path d="M22 10 H78 V90 L68 82 L58 90 L48 82 L38 90 L28 82 L22 90 Z"/><path d="M34 30 H66 M34 44 H66 M34 58 H54"/>',
 'prezzo': '<path d="M14 50 L50 14 H86 V50 L50 86 Z"/><circle cx="70" cy="30" r="6"/>',
 'box': '<rect x="14" y="30" width="72" height="56"/><path d="M14 30 L50 12 L86 30 M28 86 V50 H72 V86"/>',
 'cantina': '<path d="M14 40 H86 V86 H14 Z M14 40 L50 16 L86 40"/><path d="M40 86 V62 H60 V86 M30 52 H70"/>',
 'deposito': '<rect x="12" y="44" width="76" height="42"/><path d="M12 44 L28 22 H72 L88 44 M30 86 V60 H70 V86"/>',
 'infissi': '<rect x="20" y="12" width="60" height="76"/><path d="M50 12 V88 M20 50 H80"/>',
 'pompa': '<rect x="10" y="26" width="80" height="50" rx="4"/><circle cx="36" cy="51" r="16"/><path d="M36 35 V67 M20 51 H52 M64 40 H82 M64 52 H82 M64 64 H82"/>',
 'cappotto': '<path d="M20 12 V88 M30 12 V88"/><path d="M40 12 V88" stroke-dasharray="6 6"/><path d="M56 18 L80 30 M56 40 L80 52 M56 62 L80 74"/>',
 'contratto': '<path d="M24 10 H64 L78 24 V90 H24 Z M64 10 V24 H78"/><path d="M34 40 H68 M34 52 H68 M34 64 H56"/><path d="M38 80 C44 72 48 86 54 78 C58 72 62 82 68 78"/>',
 'calendario': '<rect x="14" y="20" width="72" height="66" rx="4"/><path d="M14 38 H86 M32 12 V28 M68 12 V28"/>',
 'ue': ''.join(f'<circle cx="{50+30*__import__("math").cos(i*0.5236):.1f}" cy="{50+30*__import__("math").sin(i*0.5236):.1f}" r="4.5" fill="currentColor" stroke="none"/>' for i in range(12)),
 'casco': '<path d="M14 70 H86"/><path d="M20 70 C20 40 34 26 50 26 C66 26 80 40 80 70"/><path d="M42 30 L46 48 M50 26 V46 M58 30 L54 48"/>',
 'foto': '<rect x="10" y="28" width="80" height="56" rx="6"/><circle cx="50" cy="56" r="16"/><path d="M34 28 L40 18 H60 L66 28"/>',
 'libro': '<path d="M50 24 C40 16 22 16 12 20 V84 C22 80 40 80 50 88 C60 80 78 80 88 84 V20 C78 16 60 16 50 24 Z M50 24 V88"/>',
 'lente': '<circle cx="42" cy="42" r="26"/><path d="M62 62 L88 88"/>',
 'mattone': '<rect x="10" y="20" width="80" height="60"/><path d="M10 40 H90 M10 60 H90 M50 20 V40 M30 40 V60 M70 40 V60 M50 60 V80"/>',
 'ingranaggio': '<circle cx="50" cy="50" r="14"/><path d="M50 12 V24 M50 76 V88 M12 50 H24 M76 50 H88 M23 23 L32 32 M68 68 L77 77 M23 77 L32 68 M68 32 L77 23"/>',
 'firma': '<path d="M12 74 C26 50 34 86 46 64 C54 50 60 80 72 62 L88 62"/><path d="M12 86 H88"/>',
 'x': '<path d="M24 24 L76 76 M76 24 L24 76"/>',
 'ok': '<path d="M18 52 L40 74 L84 28"/>',
 'freccia': '<path d="M12 50 H82 M60 28 L84 50 L60 72"/>',
}
def icon(n, size=120, col=OR):
    return f'<svg width="{size}" height="{size}" viewBox="0 0 100 100" fill="none" stroke="{col}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" style="color:{col}">{IC[n]}</svg>'

CLASSI = [('A4', '#1E7F3B'), ('A3', '#2A8F3F'), ('A2', '#3A9D42'), ('A1', '#56AD45'), ('B', '#8CC142'),
          ('C', '#C9CF3A'), ('D', '#F0C430'), ('E', '#EE9A2C'), ('F', '#E7682A'), ('G', '#D9372A')]

CSS = FONTS + """
*{box-sizing:border-box}body{margin:0;background:#0d0d0d}
#st{width:1920px;height:1080px;position:relative;overflow:hidden;font-family:Inter,sans-serif;color:#fff;background:#0d0d0d}
#grid{position:absolute;inset:-120px;background-image:linear-gradient(#191919 1px,transparent 1px),linear-gradient(90deg,#191919 1px,transparent 1px);background-size:60px 60px}
.o{color:#F07A35}
.scn{position:absolute;inset:0;opacity:0}
.hd{position:absolute;top:44px;left:90px;right:90px;display:flex;justify-content:space-between;align-items:center;z-index:50}
.hd img{height:84px}.hd span{font-size:28px;font-weight:500;color:#d6d6d6;text-shadow:0 2px 12px #000}
.prog{position:absolute;left:90px;right:90px;bottom:46px;display:flex;gap:8px;z-index:50}
.prog b{flex:1;height:5px;background:rgba(255,255,255,.18);border-radius:3px;overflow:hidden}.prog b i{display:block;height:100%;width:0;background:#F07A35}
.kick{font:600 30px Inter;letter-spacing:.16em;text-transform:uppercase;color:#F07A35}
.ttl{font:700 118px/1.0 Oswald;text-transform:uppercase;margin:0}
.sub{font:400 44px/1.35 Inter;color:#e4e4e4}
.c{position:absolute;left:0;right:0;top:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:28px;padding:0 160px}
.l{position:absolute;left:140px;top:0;bottom:0;width:1100px;display:flex;flex-direction:column;justify-content:center;gap:26px}
.ph{position:absolute;inset:0;overflow:hidden}
.ph img{position:absolute;left:50%;top:50%;min-width:100%;min-height:100%;width:auto;height:auto;transform-origin:50% 50%}
.shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(10,10,10,.92) 0%,rgba(10,10,10,.75) 42%,rgba(10,10,10,.15) 75%,rgba(10,10,10,.35) 100%)}
.shadeb{position:absolute;inset:0;background:linear-gradient(0deg,rgba(10,10,10,.9) 0%,rgba(10,10,10,.2) 55%,rgba(10,10,10,.5) 100%)}
.chip{display:inline-flex;align-items:center;gap:14px;background:rgba(17,17,17,.85);border:2px solid #F07A35;border-radius:999px;padding:12px 28px;font:600 36px Inter}
.row{display:flex;gap:46px;justify-content:center;align-items:flex-start}
.card{width:340px;display:flex;flex-direction:column;align-items:center;gap:20px;padding:40px 20px;border:2px solid #2c2c2c;border-radius:22px;background:rgba(20,20,20,.9)}
.card span{font:700 40px/1.1 Oswald;text-transform:uppercase}
.card small{font:400 28px/1.3 Inter;color:#bbb}
.big{font:700 230px/0.9 Oswald;color:#F07A35}
.unit{font:600 40px Inter;color:#ddd;letter-spacing:.06em}
.doc{position:absolute;width:640px;height:860px;background:#f6f5f2;border-radius:10px;color:#111;padding:44px;box-shadow:0 30px 80px rgba(0,0,0,.6);font-family:Inter}
.doc h4{margin:0;font:700 34px Oswald;letter-spacing:.04em}
.doc .ln{height:14px;background:#d9d7d1;border-radius:7px;margin:12px 0}
.hl{position:absolute;border:5px solid #F07A35;border-radius:12px;box-shadow:0 0 0 2000px rgba(0,0,0,0)}
.bars{display:flex;flex-direction:column;gap:12px}
.bars div{height:52px;border-radius:6px;font:700 32px/52px Oswald;color:#111;padding-left:16px;width:0;white-space:nowrap;overflow:hidden}
.ptr{position:absolute;font:700 46px Oswald;color:#fff;display:flex;align-items:center;gap:14px}
.tl{position:relative;width:1500px;height:8px;background:#333;border-radius:4px}
.tl i{position:absolute;left:0;top:0;height:8px;background:#F07A35;border-radius:4px;width:0}
.mk{position:absolute;top:-16px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:14px;width:320px;text-align:center}
.mk b{width:40px;height:40px;border-radius:50%;background:#F07A35;border:6px solid #0d0d0d}
.mk span{font:600 30px/1.25 Inter;color:#eee}
.mk em{font:700 40px Oswald;font-style:normal;color:#F07A35}
.warnbox{display:flex;align-items:center;gap:50px;padding:50px 70px;border:4px solid #E7682A;border-radius:26px;background:rgba(40,16,8,.75)}
.cmp{position:absolute;inset:0;display:flex}
.cmp>div{flex:1;position:relative;overflow:hidden}
.cmp .lab{position:absolute;left:60px;bottom:120px;display:flex;flex-direction:column;gap:18px;z-index:3}
.cmp .cls{font:700 150px/1 Oswald}
.mbar{height:34px;border-radius:6px;width:0}
.ncard{display:flex;gap:44px;align-items:center;background:rgba(17,17,17,.88);border-left:10px solid #F07A35;padding:40px 54px;border-radius:12px;max-width:1500px}
.ncard .n{font:700 150px/1 Oswald;color:#F07A35}
.ncard .t{font:700 64px/1.05 Oswald;text-transform:uppercase}
.ncard .s{font:400 38px/1.3 Inter;color:#ddd;margin-top:10px}
.ck{display:flex;align-items:center;gap:30px;font:600 46px/1.25 Inter;text-align:left}
.ck i{flex:0 0 64px;height:64px;border-radius:50%;background:#F07A35;display:flex;align-items:center;justify-content:center}
.btn{background:#F07A35;color:#111;font:700 64px Oswald;text-transform:uppercase;padding:22px 66px;border-radius:18px}
.chapw{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;z-index:40;pointer-events:none}
.chapw .bg{position:absolute;inset:0;background:#0d0d0d}
.chapw .num{font:700 300px/1 Oswald;color:#F07A35}
.chapw .nm{font:700 90px Oswald;text-transform:uppercase;margin-left:40px}
.chapw .bar{position:absolute;left:0;top:0;bottom:0;width:0;background:#F07A35}
.listing{width:980px;background:#fff;color:#111;border-radius:18px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.6);text-align:left}
.listing .img{height:330px;position:relative;overflow:hidden}
.listing .bd{padding:30px 40px;display:flex;flex-direction:column;gap:12px}
.listing h5{margin:0;font:700 46px Oswald}
.listing p{margin:0;font:400 30px Inter;color:#444}
.eclass{display:inline-flex;align-items:center;gap:16px;padding:12px 22px;border:4px solid #F07A35;border-radius:12px;font:700 34px Inter}
"""

def R(at, anim='up', extra=''):
    return f'data-at="{at:.3f}" data-an="{anim}" {extra}'

# ---------- costruttori di scena ----------
def sc_kin(s, T):  # parole cinetiche: lines=[(t,'testo'),...], kicker
    lines = ''.join(f'<div class="ttl" style="font-size:{s.get("size",130)}px" {R(T+t, "pop")}>{e(x)}</div>' for t, x in s['lines'])
    k = f'<div class="kick" {R(T)}>{e(s["kick"])}</div>' if s.get('kick') else ''
    sub = f'<div class="sub" {R(T+s.get("sub_t",0.6))}>{e(s["sub"])}</div>' if s.get('sub') else ''
    return f'<div class="c">{k}{lines}{sub}</div>'

def photo_el(src, kb):
    s0, s1, dx, dy = kb
    return f'<div class="ph"><img class="kb" src="file://{src}" data-s0="{s0}" data-s1="{s1}" data-dx="{dx}" data-dy="{dy}"></div>'

def sc_photo(s, T):
    chips = ''.join(f'<div class="chip" {R(T+t, "left")}>{icon(ic, 46) if ic else ""}{e(x)}</div>' for t, ic, x in s.get('chips', []))
    k = f'<div class="kick" {R(T+0.1)}>{e(s.get("kick",""))}</div>' if s.get('kick') else ''
    sub = f'<div class="sub" {R(T+s.get("sub_t",0.5))}>{e(s["sub"])}</div>' if s.get('sub') else ''
    ch = f'<div style="display:flex;flex-direction:column;gap:18px;align-items:flex-start;margin-top:16px">{chips}</div>' if chips else ''
    return photo_el(s['img'], s.get('kb', (1.04, 1.16, -30, 0))) + '<div class="shade"></div>' + \
        f'<div class="l">{k}<div class="ttl" style="font-size:{s.get("size",120)}px" {R(T+0.2,"up")}>{e(s["title"])}</div>{sub}{ch}</div>'

def sc_icons(s, T):
    cards = ''.join(f'<div class="card" {R(T+t, "pop")}>{icon(ic, 130)}<span>{e(x)}</span>{f"<small>{e(sm)}</small>" if sm else ""}</div>' for t, ic, x, sm in s['items'])
    k = f'<div class="kick" {R(T)}>{e(s.get("kick",""))}</div>'
    ttl = f'<div class="ttl" style="font-size:{s.get("size",96)}px" {R(T+0.1)}>{e(s["title"])}</div>' if s.get('title') else ''
    return f'<div class="c" style="gap:56px">{k}{ttl}<div class="row">{cards}</div></div>'

def sc_counter(s, T):
    k = f'<div class="kick" {R(T)}>{e(s.get("kick",""))}</div>'
    ttl = f'<div class="ttl" style="font-size:80px" {R(T+0.1)}>{e(s["title"])}</div>' if s.get('title') else ''
    num = f'<div class="big cnt" data-from="{s["from"]}" data-to="{s["to"]}" data-ct="{T+s.get("count_t",0.4):.3f}" data-d="{s.get("count_d",1.4)}" data-suf="{H.escape(s.get("suf",""))}" data-pre="{H.escape(s.get("pre",""))}" {R(T+0.15,"pop")}>{s.get("pre","")}{s["from"]}{s.get("suf","")}</div>'
    unit = f'<div class="unit" {R(T+0.5)}>{e(s.get("unit",""))}</div>'
    sub = f'<div class="sub" {R(T+s.get("sub_t",1.6))}>{e(s["sub"])}</div>' if s.get('sub') else ''
    side = f'<div style="position:absolute;right:140px;top:50%;transform:translateY(-50%)" {R(T+0.3,"pop")}>{icon(s["icon"], 220)}</div>' if s.get('icon') else ''
    return f'<div class="c">{k}{ttl}{num}{unit}{sub}</div>{side}'

def sc_classes(s, T):
    names = [c[0] for c in CLASSI]; Y = lambda i: 262 + i * 64
    bars = ''.join(f'<div class="grow" data-at="{T+0.3+i*0.12:.3f}" data-w="{250+i*36}" style="background:{c}">{l}</div>' for i, (l, c) in enumerate(CLASSI))
    ptr = ''
    if s.get('ptr'):
        i = names.index(s['ptr']); ptr = f'<div class="ptr" style="left:1640px;top:{Y(i)}px" {R(T+s.get("ptr_t",2.2),"left")}><span class="o">◀</span><span style="font-size:32px">{e(s.get("ptr_lab",""))}</span></div>'
    if s.get('jump'):
        a_, b_, lab = s['jump']; ia, ib = names.index(a_), names.index(b_)
        ptr += (f'<div class="ptr mv" data-at="{T+s.get("jump_t",2.4):.3f}" data-y0="{Y(ia)}" data-y1="{Y(ib)}" data-d="1.6" style="left:1640px;top:{Y(ia)}px">'
                f'<span class="o">◀</span><span style="font-size:32px">{e(lab)}</span></div>')
    k = f'<div class="kick" {R(T)}>{e(s.get("kick",""))}</div>'
    ttl = f'<div class="ttl" style="font-size:{s.get("size",100)}px" {R(T+0.1)}>{e(s["title"])}</div>'
    sub = f'<div class="sub" {R(T+s.get("sub_t",1.2))}>{e(s.get("sub",""))}</div>'
    return f'<div class="l" style="width:820px">{k}{ttl}{sub}</div><div class="bars" style="position:absolute;left:1060px;top:250px">{bars}</div>{ptr}'

def ape_doc(x, y, rot=-4, inner=''):
    rows = ''.join(f'<div style="height:34px;width:{200+i*18}px;background:{c};border-radius:4px;margin:6px 0;font:700 22px/34px Oswald;padding-left:8px">{l}</div>' for i, (l, c) in enumerate(CLASSI))
    return (f'<div class="doc" style="left:{x}px;top:{y}px;transform:rotate({rot}deg)"><h4>ATTESTATO DI PRESTAZIONE ENERGETICA</h4>'
            '<div class="ln" style="width:70%"></div><div class="ln" style="width:50%"></div>'
            f'<div style="display:flex;gap:40px;margin-top:22px"><div>{rows}</div><div style="display:flex;flex-direction:column;gap:10px;margin-top:4px">'
            '<div style="font:700 28px Oswald">CLASSE</div><div style="font:700 120px/1 Oswald;color:#EE9A2C">E</div>'
            '<div style="font:600 22px Inter;margin-top:30px">EP gl,nren</div><div style="font:700 50px Oswald">175</div><div style="font:500 20px Inter">kWh/m² anno</div></div></div>'
            '<div style="margin-top:24px;font:700 28px Oswald">RACCOMANDAZIONI</div><div class="ln"></div><div class="ln" style="width:85%"></div>'
            '<div style="position:absolute;left:44px;bottom:30px;font:600 22px Inter;color:#555">Valido fino al: ../../....</div>' + inner + '</div>')

DOCHL = {'classe': (450, 190, 190, 185), 'indice': (450, 395, 190, 135), 'racc': (28, 650, 584, 130), 'scadenza': (28, 792, 360, 54)}
def sc_doc(s, T):
    inner = ''
    for t, key, lab in s.get('hls', []):
        x, y, w, h = DOCHL[key]
        inner += (f'<div class="hl" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px" {R(T+t,"pop")}>'
                  f'<span style="position:absolute;right:-5px;bottom:-46px;background:#F07A35;color:#111;font:700 26px Inter;padding:6px 14px;border-radius:8px;white-space:nowrap">{e(lab)}</span></div>')
    k = f'<div class="kick" {R(T)}>{e(s.get("kick",""))}</div>' if s.get('kick') else ''
    ttl = f'<div class="ttl" style="font-size:{s.get("size",96)}px" {R(T+0.1)}>{e(s.get("title",""))}</div>' if s.get('title') else ''
    sub = f'<div class="sub" {R(T+s.get("sub_t",0.8))}>{e(s["sub"])}</div>' if s.get('sub') else ''
    return f'<div class="l" style="left:1000px;width:820px">{k}{ttl}{sub}</div><div class="kb2" data-s0="1.0" data-s1="1.06" style="position:absolute;inset:0;transform-origin:30% 50%">{ape_doc(200, 120, s.get("rot",-3), inner)}</div>'

def sc_timeline(s, T):
    mks = ''.join(f'<div class="mk" style="left:{p*1500:.0f}px"><div {R(T+t,"pop")} style="display:flex;flex-direction:column;align-items:center;gap:14px"><b></b><em>{e(a)}</em><span>{e(b)}</span></div></div>' for t, p, a, b in s['marks'])
    k = f'<div class="kick" {R(T)}>{e(s.get("kick",""))}</div>'
    ttl = f'<div class="ttl" style="font-size:{s.get("size",96)}px" {R(T+0.1)}>{e(s["title"])}</div>'
    return f'<div class="c" style="justify-content:flex-start;padding-top:230px;gap:30px">{k}{ttl}</div><div class="tl" style="position:absolute;left:210px;top:640px"><i class="grow" data-at="{T+0.4:.3f}" data-w="1500" data-d="{s.get("grow_d",3)}"></i>{mks}</div>'

def sc_warn(s, T):
    return (f'<div class="c"><div class="warnbox" {R(T,"pop")}>{icon(s.get("icon","warn"), 200, "#E7682A")}<div style="text-align:left;display:flex;flex-direction:column;gap:18px">'
            f'<div class="ttl" style="font-size:{s.get("size",92)}px">{e(s["title"])}</div><div class="sub" {R(T+s.get("sub_t",0.8))}>{e(s.get("sub",""))}</div></div></div></div>')

def sc_compare(s, T):
    out = '<div class="cmp">'
    for i, (img, cls, col, w, lab) in enumerate(s['sides']):
        out += (f'<div {R(T+i*0.5, "left" if i == 0 else "right")}>{photo_el(img, (1.05, 1.15, 0, -20))}<div class="shadeb"></div>'
                f'<div class="lab"><div class="cls" style="color:{col}">{e(cls)}</div><div class="unit">{e(lab)}</div>'
                f'<div class="mbar grow" data-at="{T+1.2+i*0.4:.3f}" data-w="{w}" style="background:{col}"></div></div></div>')
    out += '</div><div style="position:absolute;left:50%;top:0;bottom:0;width:6px;background:#0d0d0d;transform:translateX(-50%)"></div>'
    if s.get('title'):
        out += f'<div style="position:absolute;left:0;right:0;top:170px;text-align:center"><div class="ttl" style="font-size:84px;text-shadow:0 4px 30px #000" {R(T+0.3)}>{e(s["title"])}</div></div>'
    return out

def sc_cards(s, T):  # carta numerata grande (consigli) su foto opzionale
    bg = (photo_el(s['img'], (1.03, 1.12, -20, 0)) + '<div class="shade"></div>') if s.get('img') else ''
    return bg + (f'<div style="position:absolute;left:140px;top:0;bottom:0;display:flex;align-items:center"><div class="ncard" {R(T,"left")}><div class="n">{e(s["n"])}</div>'
                 f'<div><div class="t">{e(s["title"])}</div><div class="s" {R(T+s.get("sub_t",0.8))}>{e(s.get("sub",""))}</div></div></div></div>')

def sc_check(s, T):
    it = ''.join(f'<div class="ck" {R(T+t,"left")}><i>{icon(s.get("ic","ok"),44,"#111")}</i><span>{e(x)}</span></div>' for t, x in s['items'])
    k = f'<div class="kick" {R(T)}>{e(s.get("kick",""))}</div>'
    ttl = f'<div class="ttl" style="font-size:{s.get("size",100)}px" {R(T+0.1)}>{e(s.get("title",""))}</div>'
    return f'<div class="l" style="width:1640px;gap:34px">{k}{ttl}<div style="display:flex;flex-direction:column;gap:30px;margin-top:20px">{it}</div></div>'

def sc_listing(s, T):
    img = photo_el(s['img'], (1.0, 1.08, 0, 0))
    return (f'<div class="c"><div class="kick" {R(T)}>{e(s.get("kick",""))}</div><div class="listing" {R(T+0.2,"pop")}><div class="img">{img}</div>'
            f'<div class="bd"><h5>Vendesi trilocale luminoso</h5><p>85 m² · 2° piano · da ristrutturare</p>'
            f'<div {R(T+s.get("hl_t",1.0),"pop")}><span class="eclass">Classe energetica <b style="color:#EE9A2C;font-size:44px">E</b> · 175 kWh/m² anno</span></div></div></div>'
            f'<div class="sub" {R(T+s.get("sub_t",1.6))}>{e(s.get("sub",""))}</div></div>')

def sc_cta(s, T):
    return (f'<div class="c" style="gap:40px"><img src="{LOGO}" style="height:230px" {R(T,"pop")}><div class="ttl" style="font-size:96px" {R(T+0.3)}>{e(s["title"])}</div>'
            f'<div class="sub" {R(T+0.7)}>{e(s.get("sub",""))}</div><div class="btn" {R(T+s.get("btn_t",1.2),"pop")}>{e(s.get("btn","Iscriviti"))}</div></div>')

BUILD = dict(kin=sc_kin, photo=sc_photo, icons=sc_icons, counter=sc_counter, classes=sc_classes, doc=sc_doc, timeline=sc_timeline,
             warn=sc_warn, compare=sc_compare, cards=sc_cards, check=sc_check, listing=sc_listing, cta=sc_cta)

JS = r"""
function cl(x){return Math.max(0,Math.min(1,x))} function ez(x){return 1-Math.pow(1-x,3)} function eio(x){return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2}
const SC=[...document.querySelectorAll('.scn')], RV=[...document.querySelectorAll('[data-an]')], CN=[...document.querySelectorAll('.cnt')],
GR=[...document.querySelectorAll('.grow')], KB=[...document.querySelectorAll('.kb')], KB2=[...document.querySelectorAll('.kb2')], MV=[...document.querySelectorAll('.mv')],
CH=[...document.querySelectorAll('.chapw')], PB=[...document.querySelectorAll('.prog i')];
function render(t){
 document.getElementById('grid').style.transform='translate('+(-(t*6)%60)+'px,'+(-(t*3)%60)+'px)';
 SC.forEach(s=>{const a=+s.dataset.t0,b=+s.dataset.t1;const i=cl((t-a)/0.45),o=cl((b-t)/0.35);s.style.opacity=Math.min(i,o);
   s.style.display=(t<a-0.05||t>b+0.05)?'none':'block'; s.style.transform='scale('+(1.03-0.03*ez(i))+')'; s._p=(t-a)/Math.max(0.1,b-a)});
 RV.forEach(el=>{const a=+el.dataset.at,an=el.dataset.an;const q=ez(cl((t-a)/0.5));el.style.opacity=cl((t-a)/0.35);
   if(an=='up')el.style.transform='translateY('+(1-q)*50+'px)';else if(an=='left')el.style.transform='translateX('+(1-q)*-80+'px)';
   else if(an=='right')el.style.transform='translateX('+(1-q)*80+'px)';else if(an=='pop')el.style.transform='scale('+(0.82+0.18*q+0.05*Math.sin(Math.PI*cl((t-a)/0.5)))+')'});
 CN.forEach(el=>{const a=+el.dataset.ct,d=+el.dataset.d,f=+el.dataset.from,to=+el.dataset.to;const v=f+(to-f)*eio(cl((t-a)/d));
   el.textContent=el.dataset.pre+Math.round(v).toLocaleString('it-IT')+el.dataset.suf});
 GR.forEach(el=>{const a=+el.dataset.at,d=+(el.dataset.d||0.6);el.style.width=(+el.dataset.w*ez(cl((t-a)/d)))+'px'});
 KB.forEach(el=>{const s=el.closest('.scn');const p=cl(s._p||0);const z=+el.dataset.s0+(+el.dataset.s1-el.dataset.s0)*p;
   el.style.transform='translate(-50%,-50%) translate('+(el.dataset.dx*p)+'px,'+(el.dataset.dy*p)+'px) scale('+z+')'});
 KB2.forEach(el=>{const s=el.closest('.scn');const p=cl(s._p||0);el.style.transform='scale('+(+el.dataset.s0+(el.dataset.s1-el.dataset.s0)*p)+')'});
 MV.forEach(el=>{const a=+el.dataset.at,d=+el.dataset.d;const q=eio(cl((t-a)/d));el.style.top=(+el.dataset.y0+(el.dataset.y1-el.dataset.y0)*q)+'px';el.style.opacity=cl((t-a)/0.3)});
 CH.forEach(c=>{const a=+c.dataset.t0,d=1.25;const p=(t-a)/d; if(p<0||p>1){c.style.display='none';return} c.style.display='flex';
   const bar=c.querySelector('.bar'),bg=c.querySelector('.bg'),tx=c.querySelector('.tx');
   bar.style.left=(p<.35?0:((p-.35)/.65*100))+'%'; bar.style.width=(p<.35?ez(p/.35)*100:100-((p-.35)/.65*100))+'%';
   bg.style.opacity=p<.3?ez(p/.3):(p<.8?1:(1-(p-.8)/.2)); tx.style.opacity=p<.25?0:(p<.8?ez(cl((p-.25)/.2)):1-(p-.8)/.2);
   tx.style.transform='translateX('+(1-ez(cl((p-.25)/.3)))*-60+'px)'});
 PB.forEach(i=>{const a=+i.dataset.a,b=+i.dataset.b;i.style.width=(cl((t-a)/(b-a))*100)+'%'});
 const hd=document.getElementById('hd');hd.style.opacity=cl((t-window.CS)/0.6);document.getElementById('prog').style.opacity=cl((t-window.CS)/0.6);
}"""

def sigla_html(title, T0, cu):
    return f'''<div class="scn" data-t0="0" data-t1="{T0}" style="opacity:1">
<svg class="geo" viewBox="0 0 1920 1080" style="position:absolute;inset:0"><g fill="none" stroke="#F07A35" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
<path class="dr" data-at="{cu['magia']-0.6:.2f}" data-d="1.6" d="M300 860 H1620"/><path class="dr" data-at="{cu['magia']-0.2:.2f}" data-d="1.8" d="M640 860 V420 L900 300 V860"/>
<path class="dr" data-at="{cu['naa']-0.3:.2f}" data-d="1.8" d="M1020 860 V260 H1280 V860"/><path class="dr" data-at="{cu['naa']:.2f}" data-d="1.6" d="M900 560 H1020 M1060 340 H1240 M1060 420 H1240 M1060 500 H1240 M1060 580 H1240 M680 520 H860 M680 600 H860"/></g></svg>
<div class="wd" data-a="{cu['magia']}" data-b="{cu['naa']}" style="position:absolute;left:0;right:0;top:420px;text-align:center;font:700 160px/1 Oswald;text-transform:uppercase;text-shadow:0 0 40px #0d0d0d">Magia?</div>
<div class="wd" data-a="{cu['naa']}" data-b="{cu['ing']}" style="position:absolute;left:0;right:0;top:420px;text-align:center;font:700 160px/1 Oswald;text-transform:uppercase;color:#F07A35;text-shadow:0 0 40px #0d0d0d">Naaa</div>
<div class="wd" data-a="{cu['ing']}" data-b="{cu['nome']}" style="position:absolute;left:0;right:0;top:370px;text-align:center;font:700 140px/1 Oswald;text-transform:uppercase;text-shadow:0 0 40px #0d0d0d">È semplice<br><span class="o">ingegneria</span></div>
<img class="wd" data-a="{cu['nome']}" data-b="{T0}" src="{LOGO}" style="position:absolute;left:50%;top:250px;height:300px;margin-left:-150px">
<div class="wd" data-a="{cu['nome']+0.2}" data-b="{cu['titolo']}" style="position:absolute;left:0;right:0;top:600px;text-align:center;font:600 42px Inter;letter-spacing:.18em;color:#F07A35;text-transform:uppercase">Ing. Vincenzo Belcastro</div>
<div class="wd" data-a="{cu['titolo']}" data-b="{T0}" style="position:absolute;left:150px;right:150px;top:610px;text-align:center;font:700 96px/1.04 Oswald;text-transform:uppercase;text-shadow:0 0 30px #0d0d0d">{e(title)}</div></div>'''

SIGLA_JS = r"""
const DR=[...document.querySelectorAll('.dr')].map(e=>{const L=e.getTotalLength();e.style.strokeDasharray=L;return [e,L]}), WD=[...document.querySelectorAll('.wd')];
const _r=render; render=function(t){_r(t);
 DR.forEach(([e,L])=>{const a=+e.dataset.at,d=+e.dataset.d;e.style.strokeDashoffset=L*(1-ez(cl((t-a)/d)));e.style.opacity=0.85-0.65*cl((t-window.TT)/0.5)});
 WD.forEach(w=>{const a=+w.dataset.a,b=+w.dataset.b;const q=cl((t-a)/0.15)*cl((b-t)/0.15);w.style.opacity=q;
   const s=1.18-0.18*ez(cl((t-a)/0.3)); w.style.transform=(w.tagName=='IMG'?'':'')+'scale('+s+')'});}
"""

def build(plan, out, workers=4):
    from playwright.sync_api import sync_playwright
    title, sig, blocks = plan['TITLE'], plan['SIGLA'], plan['BLOCKS']
    cu = sig['cues']; T0 = sig['cut'] + 0.25
    # tempi assoluti
    t = T0; meta = []
    for b in blocks:
        d = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', b['audio']], capture_output=True, text=True).stdout)
        meta.append((t, d)); t += d
    total = t + 1.2
    body = sigla_html(title, T0, {k: v + 0.25 for k, v in cu.items()})
    prog = ''
    for k, (b, (bt, bd)) in enumerate(zip(blocks, meta)):
        sc = b['scenes']
        body += f'<div class="chapw" data-t0="{bt:.3f}"><div class="bg"></div><div class="bar"></div><div class="tx" style="display:flex;align-items:center;position:relative"><span class="num">{k+1:02d}</span><span class="nm">{e(b["cap"])}</span></div></div>'
        for j, s in enumerate(sc):
            a = bt + max(s['t'], 1.0); z = bt + (sc[j + 1]['t'] if j + 1 < len(sc) else bd)
            body += f'<div class="scn" data-t0="{a:.3f}" data-t1="{z:.3f}">{BUILD[s["type"]](s, a)}</div>'
        prog += f'<b><i data-a="{bt:.3f}" data-b="{bt+bd:.3f}"></i></b>'
    page = (f'<html><head><meta charset="utf-8"><style>{CSS}</style></head><body><div id="st"><div id="grid"></div>{body}'
            f'<div class="hd" id="hd"><img src="{LOGO}"><span>@ing.belcastro</span></div><div class="prog" id="prog">{prog}</div></div>'
            f'<script>window.CS={T0};window.TT={cu["titolo"]+0.25};{JS}{SIGLA_JS}</script></body></html>')
    tmp = tempfile.mkdtemp(); hp = os.path.join(tmp, 'p.html'); open(hp, 'w').write(page)
    if os.environ.get('PREVIEW'):
        from playwright.sync_api import sync_playwright
        ts = [float(x) for x in os.environ['PREVIEW'].split(',')]
        with sync_playwright() as p:
            br = p.chromium.launch(); pg = br.new_page(viewport={'width': W, 'height': Hh}); pg.goto('file://' + hp)
            pg.evaluate('document.fonts.ready'); pg.wait_for_timeout(400)
            for i, tt in enumerate(ts):
                pg.evaluate(f'render({tt})'); pg.screenshot(path=f'{out}_{i:02d}.jpg', type='jpeg', quality=80)
            br.close()
        print('blocchi', [round(m[0], 1) for m in meta]); return out, total, []
    N = int(total * FPS); chunks = [(hp, tmp, i * N // workers, (i + 1) * N // workers) for i in range(workers)]
    with ProcessPoolExecutor(workers) as ex: list(ex.map(_render_chunk, chunks))
    # audio: sigla + blocchi in fila, voce pulita, beat morbido
    ins = ['-i', sig['audio']] + sum([['-i', b['audio']] for b in blocks], []) + ['-i', plan.get('BED', os.path.join(A, 'bed.wav'))]
    n = len(blocks); parts = [f"[1:a]aresample=48000,atrim=0:{sig['cut']},adelay=250:all=1[s0]"] + [f"[{i+2}:a]aresample=48000[s{i+1}]" for i in range(n)]
    parts.append(''.join(f'[s{i}]' for i in range(n + 1)) + f"concat=n={n+1}:v=0:a=1,{VC},apad=pad_dur=6[v]")
    parts.append(f"[{n+2}:a]aresample=48000,atrim=0:{total},volume=-36dB,afade=t=in:st={T0-1}:d=1,afade=t=out:st={total-3}:d=3,apad=pad_dur=6[m]")
    parts.append(f"[v][m]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-16:TP=-2:LRA=9,alimiter=limit=0.84:level=false,atrim=0:{total}[a]")
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-framerate', str(FPS), '-i', f'{tmp}/f%05d.jpg'] + ins + ['-filter_complex', ';'.join(parts),
        '-map', '0:v', '-map', '[a]', '-t', f'{total}', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '19', '-pix_fmt', 'yuv420p', '-r', str(FPS),
        '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', out], check=True)
    shutil.rmtree(tmp)
    chapters = [(0, 'Sigla')] + [(bt, b['cap']) for b, (bt, _) in zip(blocks, meta)]
    return out, total, chapters

def _render_chunk(a):
    hp, tmp, f0, f1 = a
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        br = p.chromium.launch(); pg = br.new_page(viewport={'width': W, 'height': Hh}); pg.goto('file://' + hp)
        pg.evaluate('document.fonts.ready'); pg.wait_for_timeout(400)
        for f in range(f0, f1):
            pg.evaluate(f'render({f / FPS})'); pg.screenshot(path=f'{tmp}/f{f:05d}.jpg', type='jpeg', quality=90)
        br.close()

if __name__ == '__main__':
    plan = runpy.run_path(sys.argv[1]); o, tot, ch = build(plan, sys.argv[2])
    print(o, round(tot, 2)); [print(f'{int(t)//60}:{int(t)%60:02d} {n}') for t, n in ch]
