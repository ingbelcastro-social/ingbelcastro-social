"""Video lungo YouTube/Facebook 1920x1080 nello stile @ing.belcastro.
Uso: python3 longvideo.py spec.json out.mp4
spec = {
 "title": "APE: cos'è, quanto dura, quando serve",       # cartello nella sigla
 "intro_audio": "V0.m4a", "intro_cut": 11.2,             # sigla con la voce (s in cui tagliarla)
 "voice": "V2.m4a",                                      # voce del video (un file unico)
 "bed": "bed.wav",                                       # beat morbido (generato con beat2.py BED=1)
 "bounds": [0, 26.2, ...],                               # inizio di ogni blocco nel file voce (+ durata finale)
 "blocks": [{"cap","title","pts":[...], "classi":bool, "big":"10 ANNI", "end":bool}, ...]
}
"""
import json, sys, os, subprocess, tempfile, shutil
from common import FONTS, LOGO, esc, A

W, H, FPS = 1920, 1080, 30

CSS = FONTS + """
*{box-sizing:border-box}body{margin:0;background:#111}
#st{width:1920px;height:1080px;position:relative;overflow:hidden;font-family:Inter,sans-serif;color:#fff;background-color:#111;
 background-image:linear-gradient(#1a1a1a 1px,transparent 1px),linear-gradient(90deg,#1a1a1a 1px,transparent 1px);background-size:60px 60px}
.hd{position:absolute;top:56px;left:110px;right:110px;display:flex;justify-content:space-between;align-items:center;transition:none}
.hd img{height:92px}.hd span{font-size:30px;font-weight:500;color:#cfcfcf}
.blk{position:absolute;left:110px;top:190px;height:740px;width:1700px;opacity:0;display:flex;align-items:center;gap:80px}
.col{flex:1;display:flex;flex-direction:column;gap:30px}
.eb{font-size:30px;font-weight:600;letter-spacing:.14em;color:#F07A35;text-transform:uppercase}
.tt{font-family:Oswald;font-weight:700;text-transform:uppercase;line-height:1.02;margin:0;font-size:104px}
.pts{display:flex;flex-direction:column;gap:26px;margin-top:20px}
.pt{display:flex;gap:26px;align-items:flex-start;font-size:50px;line-height:1.3;color:#E6E6E6;opacity:0}
.pt i{font-style:normal;font-family:Oswald;font-weight:700;color:#F07A35;min-width:54px}
.side{width:520px;display:flex;align-items:center;justify-content:center}
.big{font-family:Oswald;font-weight:700;color:#F07A35;font-size:190px;line-height:.9;text-align:center}
.bars{display:flex;flex-direction:column;gap:10px;width:460px}
.bars div{height:34px;border-radius:4px;font:700 22px Oswald;color:#111;padding-left:12px;line-height:34px}
.prog{position:absolute;left:110px;right:110px;top:1000px;display:flex;gap:8px}
.prog b{flex:1;height:6px;background:#2a2a2a;border-radius:3px}.prog b.on{background:#F07A35}
.cap{position:absolute;left:110px;top:960px;font-size:22px;color:#8a8a8a;letter-spacing:.08em;text-transform:uppercase}
#intro{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:40px}
#intro img{height:300px}
#ititle{font-family:Oswald;font-weight:700;font-size:84px;text-transform:uppercase;text-align:center;max-width:1500px;line-height:1.05;opacity:0}
#geo{position:absolute;inset:0}
.cta{display:inline-block;background:#F07A35;color:#111;font:700 54px Oswald;text-transform:uppercase;border-radius:16px;padding:18px 44px}
"""

CLASSI = [('A4', '#1E7F3B', 210), ('A3', '#2A8F3F', 235), ('A2', '#3A9D42', 260), ('A1', '#56AD45', 285), ('B', '#8CC142', 310),
          ('C', '#C9CF3A', 335), ('D', '#F0C430', 360), ('E', '#EE9A2C', 385), ('F', '#E7682A', 410), ('G', '#D9372A', 435)]

def page(spec, starts, ends):
    n = len(spec['blocks']); blks = ''
    for k, b in enumerate(spec['blocks']):
        mark = lambda j: f'{j+1:02d}' if b.get('numbered') else '—'
        pts = ''.join(f'<div class="pt" id="p{k}_{j}"><i>{mark(j)}</i><span>{esc(p)}</span></div>' for j, p in enumerate(b.get('pts', [])))
        side = ''
        if b.get('classi'):
            side = '<div class="side"><div class="bars">' + ''.join(f'<div style="width:{w}px;background:{c}">{l}</div>' for l, c, w in CLASSI) + '</div></div>'
        elif b.get('big'):
            side = f'<div class="side"><div class="big">{esc(b["big"]).replace(" ", "<br>")}</div></div>'
        elif b.get('end'):
            side = f'<div class="side" style="flex-direction:column;gap:30px"><img src="{LOGO}" style="height:200px"><div class="cta">Iscriviti</div><div style="font-size:30px;color:#bbb;text-align:center">Scrivimi su Instagram<br>@ing.belcastro</div></div>'
        blks += f'<div class="blk" id="b{k}"><div class="col"><span class="eb">{k+1:02d} · {esc(b["cap"])}</span><h1 class="tt" style="font-size:{b.get("size",96)}px">{esc(b["title"])}</h1><div class="pts">{pts}</div></div>{side}</div>'
    prog = ''.join(f'<b id="g{k}"></b>' for k in range(n))
    geo = '<svg id="geo" viewBox="0 0 1920 1080"><g fill="none" stroke="#F07A35" stroke-width="3" stroke-linecap="round">' + \
          '<path id="l1" d="M260 820 H1660"/><path id="l2" d="M560 820 V360 L820 260 V820"/><path id="l3" d="M1100 820 V300 H1360 V820"/><path id="l4" d="M820 520 H1100"/></g></svg>'
    js = """
const S=%s,E=%s,IC=%f,N=%d,PTS=%s;
function cl(x){return Math.max(0,Math.min(1,x))} function ez(x){return 1-Math.pow(1-x,3)}
const geo=['l1','l2','l3','l4'].map(i=>{const e=document.getElementById(i);const L=e.getTotalLength();e.style.strokeDasharray=L;return [e,L]});
function render(t){
 if(IC<0.5){document.getElementById('intro').style.display='none';document.getElementById('geo').style.display='none'}
 const it=document.getElementById('intro'); const io=t<IC?1:cl(1-(t-IC)/0.5);
 it.style.opacity=io; document.getElementById('geo').style.opacity=0.9*io*(1-0.85*cl((t-(IC-3.6))/0.6));
 geo.forEach(([e,L],i)=>{e.style.strokeDashoffset=L*(1-ez(cl((t-0.2-i*0.6)/2.2)))});
 document.getElementById('ilogo').style.opacity=cl((t-1.2)/1.0); document.getElementById('ilogo').style.transform='scale('+(0.9+0.1*ez(cl((t-1.2)/1.0)))+')';
 document.getElementById('ititle').style.opacity=cl((t-(IC-3.2))/0.6);
 document.getElementById('hd').style.opacity=cl((t-IC)/0.6); document.getElementById('pr').style.opacity=cl((t-IC)/0.6);
 let cur=-1;
 for(let k=0;k<N;k++){const b=document.getElementById('b'+k);const a=cl((t-S[k])/0.6)*cl((E[k]+0.3-t)/0.3);
  b.style.opacity=a; b.style.transform='translateY('+(1-ez(cl((t-S[k])/0.6)))*30+'px)'; if(t>=S[k])cur=k;
  PTS[k].forEach((pt,j)=>{const e=document.getElementById('p'+k+'_'+j);const q=cl((t-pt)/0.45);e.style.opacity=q;e.style.transform='translateX('+(1-ez(q))*-24+'px)'})}
 for(let k=0;k<N;k++){document.getElementById('g'+k).className=(k<=cur&&t>=IC)?'on':''}
}""" % (json.dumps(starts), json.dumps(ends), spec['intro_cut'], n, json.dumps(spec['_pts']))
    return f'''<html><head><meta charset="utf-8"><style>{CSS}</style></head><body><div id="st">{geo}
<div id="intro"><img id="ilogo" src="{LOGO}"><div id="ititle">{esc(spec["title"])}</div></div>
<div class="hd" id="hd"><img src="{LOGO}"><span>@ing.belcastro</span></div>{blks}<div class="prog" id="pr">{prog}</div></div><script>{js}</script></body></html>'''

def build(spec, out):
    from playwright.sync_api import sync_playwright
    IC = spec['intro_cut']; bd = spec['bounds']; n = len(spec['blocks'])
    starts = [IC + bd[k] for k in range(n)]; ends = [IC + bd[k + 1] for k in range(n)]
    total = ends[-1] + 1.5
    pts = []
    for k, b in enumerate(spec['blocks']):
        d = ends[k] - starts[k]; m = len(b.get('pts', []))
        fr = b.get('pt_at') or [0.12 + 0.62 * j / max(1, m - 1) if m > 1 else 0.2 for j in range(m)]
        pts.append([starts[k] + d * f for f in fr])
    spec['_pts'] = pts
    # tempi dei fotogrammi: tutta la sigla + le animazioni; il resto sono pause tenute ferme
    times = set(round(i / FPS, 4) for i in range(int((IC + 0.6) * FPS)))
    ev = starts + [e for e in ends] + [p for pp in pts for p in pp]
    for e in ev:
        for i in range(-10, 20): times.add(round(e + i / FPS, 4))
    times = sorted(x for x in times if 0 <= x < total); times.append(total)
    tmp = tempfile.mkdtemp(); lst = []
    with sync_playwright() as p:
        br = p.chromium.launch(); pg = br.new_page(viewport={'width': W, 'height': H})
        hp = os.path.join(tmp, 'p.html'); open(hp, 'w').write(page(spec, starts, ends)); pg.goto('file://' + hp)
        pg.evaluate('document.fonts.ready'); pg.wait_for_timeout(300)
        for i, t in enumerate(times[:-1]):
            pg.evaluate(f'render({t})'); f = f'{tmp}/f{i:05d}.jpg'; pg.screenshot(path=f, type='jpeg', quality=92)
            lst.append(f"file '{f}'\nduration {times[i+1]-t:.4f}")
        br.close()
    lst.append(f"file '{tmp}/f{len(times)-2:05d}.jpg'")
    open(f'{tmp}/list.txt', 'w').write('\n'.join(lst))
    # audio: sigla + voce, pulizia voce, beat morbido sotto
    VC = "highpass=f=90,lowpass=f=12000,afftdn=nr=24:nf=-42:tn=1,agate=threshold=0.012:ratio=2.5:attack=5:release=300,acompressor=threshold=-20dB:ratio=3:attack=10:release=200"
    af = (f"[1:a]atrim=0:{IC},asetpts=PTS-STARTPTS,aresample=48000[a0];[2:a]aresample=48000[a1];"
          f"[a0][a1]concat=n=2:v=0:a=1,{VC},apad=pad_dur=6[v];"
          f"[3:a]aresample=48000,atrim=0:{total},volume=-36dB,afade=t=out:st={total-3}:d=3,apad=pad_dur=6[m];"
          f"[v][m]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-16:TP=-2:LRA=9,alimiter=limit=0.84:level=false,atrim=0:{total}[aout]")
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', f'{tmp}/list.txt',
        '-i', spec['intro_audio'], '-i', spec['voice'], '-i', spec['bed'],
        '-filter_complex', af,
        '-map', '0:v', '-map', '[aout]', '-vf', f'fps={FPS},format=yuv420p', '-t', f'{total}',
        '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-profile:v', 'high', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', out], check=True)
    shutil.rmtree(tmp)
    return out

if __name__ == '__main__':
    spec = json.load(open(sys.argv[1])); print(build(spec, sys.argv[2]))
