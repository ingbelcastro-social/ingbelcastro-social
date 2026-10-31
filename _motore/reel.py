"""Reel/Short 1080x1920, 30 s, 30 fps, nello stile @ing.belcastro, con il nostro beat.
Uso: python3 reel.py spec.json out_dir
spec = {"name": "Reel-Nome", "scenes": [{"eyebrow","title","sub","dur"}...],
        "end_ig": {"title": "TI SERVE L'APE?"},           # chiusura IG/FB: Scrivimi in DM
        "end_yt": "full" | "altri"}                         # chiusura Short: Video completo / Altri video sul canale
Le scene di contenuto devono sommare 25.6 s (la chiusura dura 4.4 s). Produce Reel-...-30s.mp4 (IG/FB) e Short-...-30s.mp4 (YT).
"""
import json, sys, os, subprocess, tempfile, shutil
from common import FONTS, LOGO, esc, A

W, H, FPS, DUR, END = 1080, 1920, 30, 30.0, 4.4

CSS = FONTS + """
*{box-sizing:border-box}body{margin:0;background:#111}
#st{width:1080px;height:1920px;position:relative;overflow:hidden;font-family:Inter,sans-serif;color:#fff;
 background-color:#111;background-image:linear-gradient(#1a1a1a 1px,transparent 1px),linear-gradient(90deg,#1a1a1a 1px,transparent 1px);background-size:60px 60px}
.hd{position:absolute;top:100px;left:96px;right:96px;display:flex;justify-content:space-between;align-items:center}
.hd img{height:104px}.hd span{font-size:32px;font-weight:500;color:#D0D0D0}
.sc{position:absolute;left:96px;right:96px;top:300px;height:1240px;opacity:0;display:flex;flex-direction:column;justify-content:center;gap:34px}
.eb{font-size:30px;font-weight:600;letter-spacing:.14em;color:#F07A35;text-transform:uppercase}
.tt{font-family:Oswald;font-weight:700;text-transform:uppercase;line-height:1.02;margin:0}
.sb{font-size:46px;line-height:1.38;color:#E2E2E2;margin:0}
.hl{color:#F07A35}b{font-weight:700;color:#fff}
.pb{position:absolute;left:96px;right:96px;top:1612px;height:6px;background:#2a2a2a;border-radius:3px}
.pb i{display:block;height:100%;width:0;background:#F07A35;border-radius:3px}
.end{position:absolute;left:60px;right:60px;top:420px;display:flex;flex-direction:column;align-items:center;gap:40px;text-align:center;opacity:0}
.end img{height:300px}
.btn{background:#F07A35;color:#111;font-family:Oswald;font-weight:700;font-size:66px;border-radius:18px;padding:22px 60px;text-transform:uppercase}
.es{font-size:40px;line-height:1.38;color:#BEBEBE}
"""

def page(spec, endkind):
    sc = ''
    for k, s in enumerate(spec['scenes']):
        size = s.get('size', 120 if len(s['title']) < 34 else 100)
        sc += f'<div class="sc" id="s{k}"><span class="eb">{esc(s.get("eyebrow",""))}</span><h1 class="tt" style="font-size:{size}px">{esc(s["title"])}</h1>' + \
              (f'<p class="sb">{esc(s["sub"])}</p>' if s.get('sub') else '') + '</div>'
    if spec.get('teaser'):
        tz = spec['teaser']  # es. {"quando": "Domani", "ora": "ore 19:00"}
        dove = 'su YouTube' if endkind == 'ig' else 'sul canale'
        end = f'<div class="end" id="end"><img src="{LOGO}"><h1 class="tt" style="font-size:112px">{esc(tz.get("quando","Domani"))} il video<br>completo</h1><div class="btn">{dove}</div><div class="es">{esc(tz.get("ora",""))} · @ing.belcastro<br>Attiva le notifiche per non perderlo</div></div>'
    elif endkind == 'ig':
        e = spec['end_ig']
        end = f'<div class="end" id="end"><img src="{LOGO}"><h1 class="tt" style="font-size:112px">{esc(e["title"])}</h1><div class="btn">Scrivimi in DM</div><div class="es">Segui @ing.belcastro: un consiglio sulla<br>casa ogni giorno</div></div>'
    else:
        l1 = 'Video completo' if spec.get('end_yt') == 'full' else 'Altri video'
        sub = 'Tutti i dettagli nel video lungo<br>su YouTube @ing.belcastro' if spec.get('end_yt') == 'full' else 'Un consiglio pratico sulla casa<br>su YouTube @ing.belcastro'
        end = f'<div class="end" id="end"><img src="{LOGO}"><h1 class="tt" style="font-size:112px">{l1}<br>sul canale</h1><div class="btn">Iscriviti</div><div class="es">{sub}</div></div>'
    durs = [s['dur'] for s in spec['scenes']]
    js = """
const D=%s, END=%f, TOT=%f; const F=0.35;
function ease(x){return 1-Math.pow(1-x,3)}
function cl(x){return Math.max(0,Math.min(1,x))}
function render(t){let a=0;for(let k=0;k<D.length;k++){const e=document.getElementById('s'+k);const st=(k==0?-F:a),en=a+D[k];
 const i=cl((t-st)/F), o=i*cl((en+F-t)/F); e.style.opacity=o; e.style.transform='translateY('+((1-ease(i))*40)+'px)'; a=en}
 const ee=document.getElementById('end');const es=TOT-END; const q=cl((t-es)/0.45); ee.style.opacity=q; ee.style.transform='scale('+(0.96+0.04*ease(q))+')';
 document.getElementById('pb').style.width=Math.min(100,t/TOT*100)+'%%';}
""" % (json.dumps(durs), END, DUR)
    return f'<html><head><meta charset="utf-8"><style>{CSS}</style></head><body><div id="st"><div class="hd"><img src="{LOGO}"><span>@ing.belcastro</span></div>{sc}{end}<div class="pb"><i id="pb"></i></div></div><script>{js}</script></body></html>'

def render(spec, endkind, out_mp4):
    from playwright.sync_api import sync_playwright
    assert abs(sum(s['dur'] for s in spec['scenes']) - (DUR - END)) < 0.05, 'Le scene devono sommare 25.6 s'
    tmp = tempfile.mkdtemp()
    with sync_playwright() as p:
        b = p.chromium.launch(); pg = b.new_page(viewport={'width': W, 'height': H})
        hp=os.path.join(tmp,'p.html'); open(hp,'w').write(page(spec, endkind)); pg.goto('file://'+hp); pg.evaluate('document.fonts.ready'); pg.wait_for_timeout(200)
        for f in range(int(DUR * FPS)):
            pg.evaluate(f'render({f / FPS})')
            pg.screenshot(path=f'{tmp}/f{f:04d}.jpg', type='jpeg', quality=93)
        b.close()
    beat = os.path.join(A, 'beat100.wav')
    vo = spec.get('voice')
    if vo:  # reel con la voce dell'ing.: voce pulita in primo piano, beat basso sotto
        VC = "highpass=f=90,lowpass=f=12000,afftdn=nr=24:nf=-42:tn=1,agate=threshold=0.012:ratio=2.5:attack=5:release=300,acompressor=threshold=-20dB:ratio=3:attack=10:release=200"
        af = (f"[1:a]atrim={vo['start']}:{vo['end']},asetpts=PTS-STARTPTS,aresample=48000,{VC},afade=t=in:d=0.05,afade=t=out:st={vo['end']-vo['start']-0.15}:d=0.15,adelay={int(vo.get('at',0.3)*1000)}:all=1,apad=pad_dur=10[v];"
              f"[2:a]aresample=48000,volume=-21dB,apad=pad_dur=2[b];[v][b]amix=inputs=2:duration=longest:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=7,atrim=0:{DUR}[a]")
        aud = ['-i', vo['file'], '-i', beat, '-filter_complex', af, '-map', '0:v', '-map', '[a]']
    else:
        aud = ['-i', beat, '-af', 'loudnorm=I=-14:TP=-1.5:LRA=7', '-map', '0:v', '-map', '1:a']
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-framerate', str(FPS), '-i', f'{tmp}/f%04d.jpg'] + aud + ['-t', str(DUR),
        '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '19', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-r', str(FPS),
        '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-movflags', '+faststart', out_mp4], check=True)
    shutil.rmtree(tmp)
    return out_mp4

if __name__ == '__main__':
    spec = json.load(open(sys.argv[1])); out = sys.argv[2]; os.makedirs(out, exist_ok=True)
    n = spec['name']
    print(render(spec, 'ig', os.path.join(out, f'Reel-{n}-30s.mp4')))
    print(render(spec, 'yt', os.path.join(out, f'Short-{n}-30s.mp4')))
