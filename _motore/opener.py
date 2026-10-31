"""Apertura dei video lunghi: anteprima (cold open) + sigla animata, 1920x1080, 30 fps, con effetti sonori.
Uso: python3 opener.py spec.json out.mp4
spec = {
 "title": "APE: cos'è, quanto dura e quando serve",
 "voice": "V2.m4a", "cold": [195.3, 205.9],            # spezzone della voce per l'anteprima (inizio, fine in s)
 "cold_lines": [[0.6, "Cosa rischi se non lo fai?"], [2.8, "Le sanzioni non sono piccole"], [6.1, "Se vendi senza APE"]],
 "cold_big": [8.2, "18.000 €", 3000, 18000],            # numero che conta (istante, testo finale, da, a)  opzionale
 "sigla": "V0.m4a", "sigla_cut": 9.6,                    # sigla con la voce: Magia? Naaa, è semplice ingegneria...
 "sigla_cues": {"magia": 0.0, "naa": 1.47, "ing": 2.46, "nome": 4.0, "titolo": 5.95}
}
"""
import json, sys, os, subprocess, tempfile, shutil
import numpy as np, scipy.io.wavfile as wf, scipy.signal as ss
from common import FONTS, LOGO, esc, A

W, H, FPS, SR = 1920, 1080, 30, 48000

CSS = FONTS + """
*{box-sizing:border-box}body{margin:0;background:#000}
#st{width:1920px;height:1080px;position:relative;overflow:hidden;font-family:Inter,sans-serif;color:#fff;background:#0b0b0b}
#grid{position:absolute;inset:0;background-image:linear-gradient(#1a1a1a 1px,transparent 1px),linear-gradient(90deg,#1a1a1a 1px,transparent 1px);background-size:60px 60px}
.cl{position:absolute;left:0;right:0;top:400px;text-align:center;font:700 120px/1.05 Oswald;text-transform:uppercase;opacity:0}
#big{position:absolute;left:0;right:0;top:300px;text-align:center;opacity:0}
#big .n{font:700 260px/1 Oswald;color:#F07A35}
#big .s{font:600 44px Inter;color:#ddd;letter-spacing:.12em;text-transform:uppercase;margin-top:10px}
#flash{position:absolute;inset:0;background:#fff;opacity:0}
#geo{position:absolute;inset:0}
.w{position:absolute;left:0;right:0;text-align:center;font:700 150px/1 Oswald;text-transform:uppercase;opacity:0;text-shadow:0 0 40px #0b0b0b,0 0 18px #0b0b0b}
#logo{position:absolute;left:50%;top:330px;height:300px;transform:translateX(-50%);opacity:0}
#sweep{position:absolute;top:300px;height:360px;width:260px;left:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.55),transparent);mix-blend-mode:overlay;opacity:0}
#nome{position:absolute;left:0;right:0;top:680px;text-align:center;font:600 40px Inter;letter-spacing:.18em;color:#F07A35;text-transform:uppercase;opacity:0}
#tit{position:absolute;left:160px;right:160px;top:690px;text-shadow:0 0 30px #0b0b0b;text-align:center;font:700 92px/1.04 Oswald;text-transform:uppercase;opacity:0}
#bar{position:absolute;left:50%;top:660px;height:6px;width:0;background:#F07A35;transform:translateX(-50%)}
"""

def page(spec, T):
    lines = ''.join(f'<div class="cl" id="c{i}">{esc(t)}</div>' for i, (_, t) in enumerate(spec['cold_lines']))
    big = spec.get('cold_big')
    bigh = f'<div id="big"><div class="n" id="bn">0</div><div class="s">di sanzione</div></div>' if big else ''
    geo = ('<svg id="geo" viewBox="0 0 1920 1080"><g fill="none" stroke="#F07A35" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">'
           '<path id="g1" d="M300 860 H1620"/><path id="g2" d="M640 860 V420 L900 300 V860"/><path id="g3" d="M1020 860 V260 H1280 V860"/>'
           '<path id="g4" d="M900 560 H1020 M1060 340 H1240 M1060 420 H1240 M1060 500 H1240 M1060 580 H1240 M680 520 H860 M680 600 H860"/></g></svg>')
    js = """
const T=%s, CL=%s, BIG=%s;
function cl(x){return Math.max(0,Math.min(1,x))} function ez(x){return 1-Math.pow(1-x,3)}
const G=['g1','g2','g3','g4'].map(i=>{const e=document.getElementById(i);const L=e.getTotalLength();e.style.strokeDasharray=L;return [e,L]});
function pulse(t,a,d){return cl((t-a)/0.18)*cl((a+d-t)/0.25)}
function render(t){
 // anteprima
 CL.forEach((c,i)=>{const e=document.getElementById('c'+i);const nx=(i+1<CL.length?CL[i+1][0]:(BIG?BIG[0]:T.coldEnd))+T.c0;
   const o=cl((t-c[0]-T.c0)/0.2)*cl((nx-t)/0.2); e.style.opacity=o; e.style.transform='scale('+(1.08-0.08*ez(cl((t-c[0]-T.c0)/0.35)))+')';
   e.style.color=(i==CL.length-1)?'#F07A35':'#fff'});
 if(BIG){const b=document.getElementById('big');const a=BIG[0]+T.c0;const o=cl((t-a)/0.2)*cl((T.coldEnd+T.c0-t)/0.15);b.style.opacity=o;
   const p=ez(cl((t-a)/1.4)); const v=Math.round((BIG[2]+(BIG[3]-BIG[2])*p)/100)*100; document.getElementById('bn').textContent=v.toLocaleString('it-IT')+' €';
   b.style.transform='scale('+(1+0.04*Math.sin(cl((t-a-1.4)/0.4)*Math.PI))+')'}
 document.getElementById('flash').style.opacity=0;
 // sigla
 const s=t-T.sg; document.getElementById('grid').style.opacity=s<0?0.5:1;
 const ww=[['wm',T.magia,T.naa],['wn',T.naa,T.ing],['wi',T.ing,T.ing+1.3]];
 ww.forEach(([id,a,b])=>{const e=document.getElementById(id);const o=cl((s-a)/0.12)*cl((b-s)/0.15);e.style.opacity=o;e.style.transform='scale('+(1.25-0.25*ez(cl((s-a)/0.3)))+')'});
 G.forEach(([e,L],i)=>{e.style.strokeDashoffset=L*(1-ez(cl((s-0.1-i*0.35)/1.6)))});
 document.getElementById('geo').style.opacity=s<0?0:(0.85-0.6*cl((s-T.ing-1.0)/0.6)-0.2*cl((s-T.titolo)/0.4));
 const lo=cl((s-T.ing-1.0)/0.35); const L=document.getElementById('logo'); L.style.opacity=lo; L.style.transform='translateX(-50%%) scale('+(1.15-0.15*ez(lo))+')';
 const sw=document.getElementById('sweep'); const sp=cl((s-T.ing-1.2)/0.9); sw.style.opacity=sp>0&&sp<1?1:0; sw.style.left=(700+520*sp)+'px';
 document.getElementById('nome').style.opacity=cl((s-T.nome)/0.4)*cl((T.titolo-s)/0.3);
 document.getElementById('bar').style.width=(560*ez(cl((s-T.titolo)/0.5)))+'px';
 const to=cl((s-T.titolo-0.15)/0.5); const ti=document.getElementById('tit'); ti.style.opacity=to; ti.style.transform='translateY('+(1-ez(to))*30+'px)';
 document.getElementById('st').style.opacity=cl((T.end-t)/0.35);
}""" % (json.dumps(T), json.dumps(spec['cold_lines']), json.dumps(big))
    return f'''<html><head><meta charset="utf-8"><style>{CSS}</style></head><body><div id="st"><div id="grid"></div>{lines}{bigh}{geo}
<div class="w" id="wm" style="top:430px">Magia?</div><div class="w" id="wn" style="top:430px;color:#F07A35">Naaa</div>
<div class="w" id="wi" style="top:380px;font-size:130px">È semplice<br>ingegneria</div>
<img id="logo" src="{LOGO}"><div id="sweep"></div><div id="nome">Ing. Vincenzo Belcastro</div><div id="bar"></div>
<div id="tit">{esc(spec["title"])}</div><div id="flash"></div></div><script>{js}</script></body></html>'''

def sfx(T, total):
    n = int(total * SR); out = np.zeros(n); rng = np.random.default_rng(3)
    def put(sig, t):
        i = int(t * SR); j = min(n, i + len(sig)); out[i:j] += sig[:j - i]
    # riser sotto l'anteprima
    d = T['sg'] - T['c0']; t = np.arange(int(d * SR)) / SR; nz = rng.standard_normal(len(t))
    sos = ss.butter(2, [400 / (SR / 2), 4000 / (SR / 2)], 'band', output='sos'); nz = ss.sosfilt(sos, nz)
    put(nz * (t / d) ** 2 * 0.10 + 0.05 * np.sin(2 * np.pi * (60 + 140 * (t / d) ** 2) * t) * (t / d), T['c0'])
    # whoosh nel passaggio
    t = np.arange(int(0.7 * SR)) / SR; nz = rng.standard_normal(len(t)); env = np.sin(np.pi * t / 0.7) ** 2
    sos = ss.butter(2, [800 / (SR / 2), 6000 / (SR / 2)], 'band', output='sos'); put(ss.sosfilt(sos, nz) * env * 0.35, T['sg'] - 0.45)
    # impatti: inizio sigla e arrivo del logo
    def hit(g):
        t = np.arange(int(1.6 * SR)) / SR
        return g * (np.sin(2 * np.pi * (45 + 60 * np.exp(-t * 12)) * t) * np.exp(-t * 2.5) + 0.25 * rng.standard_normal(len(t)) * np.exp(-t * 18))
    put(hit(0.6), T['sg']); put(hit(0.9), T['sg'] + T['ing'] + 1.0)
    return out

def build(spec, out):
    from playwright.sync_api import sync_playwright
    cold = spec.get('cold')
    c0 = 0.3 if cold else 0.0; cs, ce = cold if cold else (0, 0); cold_len = ce - cs
    cu = spec['sigla_cues']; sg = (c0 + cold_len + 0.5) if cold else 0.25; end = sg + spec['sigla_cut']
    T = {'c0': c0, 'coldEnd': cold_len, 'sg': sg, 'end': end, 'magia': cu['magia'], 'naa': cu['naa'], 'ing': cu['ing'], 'nome': cu['nome'], 'titolo': cu['titolo']}
    tmp = tempfile.mkdtemp()
    with sync_playwright() as p:
        br = p.chromium.launch(); pg = br.new_page(viewport={'width': W, 'height': H})
        hp = os.path.join(tmp, 'p.html'); open(hp, 'w').write(page(spec, T)); pg.goto('file://' + hp)
        pg.evaluate('document.fonts.ready'); pg.wait_for_timeout(300)
        for f in range(int(end * FPS)):
            pg.evaluate(f'render({f / FPS})'); pg.screenshot(path=f'{tmp}/f{f:05d}.jpg', type='jpeg', quality=92)
        br.close()
    beat = os.path.join(A, 'beat100.wav')
    VC = "highpass=f=90,lowpass=f=12000,afftdn=nr=24:nf=-42:tn=1,agate=threshold=0.012:ratio=2.5:attack=5:release=300,acompressor=threshold=-20dB:ratio=3:attack=10:release=200"
    parts = []; ins = ['-i', spec['sigla'], '-i', beat]; k = 2
    parts.append(f"[1:a]aresample={SR},atrim=0:{spec['sigla_cut']},{VC},adelay={int(sg*1000)}:all=1,apad=pad_dur=4[sv]")
    parts.append(f"[2:a]aresample={SR},atrim=0:{end - sg - T['ing']},volume=-31dB,afade=t=in:d=0.4,afade=t=out:st={max(0.1, end - sg - T['ing'] - 1.0)}:d=1.0,adelay={int((sg + T['ing'])*1000)}:all=1,apad=pad_dur=4[bt]")
    mix = '[sv][bt]'; nmix = 2
    if cold:
        ins += ['-i', spec['voice']]; k += 1
        parts.append(f"[{k}:a]atrim={cs}:{ce},asetpts=PTS-STARTPTS,aresample={SR},{VC},adelay={int(c0*1000)}:all=1,apad=pad_dur=4[cv]"); mix += '[cv]'; nmix += 1
    af = ';'.join(parts) + f";{mix}amix=inputs={nmix}:duration=longest:normalize=0,loudnorm=I=-16:TP=-2:LRA=9,alimiter=limit=0.84:level=false,atrim=0:{end}[a]"
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-framerate', str(FPS), '-i', f'{tmp}/f%05d.jpg'] + ins +
                   ['-filter_complex', af, '-map', '0:v', '-map', '[a]', '-t', f'{end}', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20',
                    '-pix_fmt', 'yuv420p', '-r', str(FPS), '-c:a', 'aac', '-b:a', '192k', '-ar', str(SR), out], check=True)
    shutil.rmtree(tmp)
    return out, end

if __name__ == '__main__':
    spec = json.load(open(sys.argv[1])); print(build(spec, sys.argv[2]))
