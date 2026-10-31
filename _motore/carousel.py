"""Carosello 1080x1350 nello stile @ing.belcastro.
Uso: python3 carousel.py spec.json out_dir
spec = {"name": "Nome-file", "topic": "PRATICHE EDILIZIE", "slides": [ {...}, ... ]}
Tipi di slide: cover, list, steps, compare, stat, news, close, cta (vedi README).
"""
import json, sys, os
from common import FONTS, LOGO, esc, ORANGE, ORANGE_DARK

CSS = FONTS + """
*{box-sizing:border-box}body{margin:0}
.s{width:1080px;height:1350px;padding:88px 96px;display:flex;flex-direction:column;gap:44px;font-family:Inter,sans-serif;overflow:hidden;position:relative}
.dark{background:#111;color:#fff}.light{background:#F4F4F2;color:#111}
.osw{font-family:Oswald,sans-serif;font-weight:700;text-transform:uppercase;line-height:1.02;margin:0}
.eyebrow{font-size:30px;font-weight:600;letter-spacing:.12em;color:#F07A35;text-transform:uppercase}
.light .eyebrow{color:#555}
.head{display:flex;justify-content:space-between;align-items:center;font-size:28px;font-weight:600;letter-spacing:.08em;text-transform:uppercase}
.light .head .n{color:#555}.dark .head .n{color:#BDBDBD}
.dark .head .t{color:#F07A35}
.foot{display:flex;justify-content:space-between;align-items:center;font-size:28px;padding-top:28px;margin-top:auto}
.light .foot{color:#555;border-top:3px solid #111}.light .foot b{color:#111}
.dark .foot{color:#BDBDBD;border-top:3px solid #F07A35}.dark .foot b{color:#fff}
.body{flex:1;display:flex;flex-direction:column;justify-content:center;gap:36px}
p{margin:0}
.txt{font-size:40px;line-height:1.4}.light .txt{color:#333}.dark .txt{color:#DADADA}
.hl{color:#F07A35}.light .hl{color:#B8501A}
b{font-weight:700}
.badge{display:flex;align-items:center;gap:24px}
.badge span:first-child{font-family:Oswald;font-weight:700;font-size:40px;background:#111;color:#fff;border-radius:12px;padding:8px 24px;text-transform:uppercase}
.badge span:last-child{font-size:34px;font-weight:600;color:#555}
.items{display:flex;flex-direction:column;gap:20px;font-size:38px;line-height:1.35}
.items div{display:flex;gap:22px}.items i{font-style:normal;color:#B8501A;font-weight:700}
.note{font-size:32px;line-height:1.4;border-radius:16px;padding:28px 32px}
.light .note{background:#fff;color:#333}.dark .note{border:2px solid #333;color:#DADADA}
.steps{display:flex;flex-direction:column;border-top:2px solid currentColor}
.steps div{display:flex;gap:40px;align-items:flex-start;padding:28px 0;border-bottom:2px solid currentColor}
.dark .steps,.dark .steps div{border-color:#444}.light .steps,.light .steps div{border-color:#111}
.steps i{font-family:Oswald;font-weight:700;font-style:normal;font-size:56px;line-height:1;color:#B8501A;min-width:70px}
.dark .steps i{color:#F07A35}
.steps span{font-size:38px;line-height:1.35}
.cmp{display:grid;grid-template-columns:1fr 1fr;gap:24px}
.cmp>div{border-radius:20px;padding:40px 36px;display:flex;flex-direction:column;gap:18px}
.cmp>div:first-child{background:#fff}.cmp>div:last-child{background:#111;color:#fff}
.cmp h3{font-family:Oswald;font-weight:700;font-size:54px;margin:0;text-transform:uppercase}
.cmp>div:last-child h3{color:#F07A35}
.cmp p{font-size:34px;line-height:1.4}
.num{font-family:Oswald;font-weight:700;color:#F07A35;line-height:.95}
.light .num{color:#B8501A}
.chip{display:inline-block;background:#F07A35;color:#111;font-weight:700;font-size:26px;letter-spacing:.1em;padding:10px 20px;border-radius:8px;text-transform:uppercase}
.src{font-size:24px;line-height:1.45;color:#9A9A9A}
.light .src{color:#666}
.closefoot{display:flex;justify-content:space-between;align-items:flex-end;gap:40px;border-top:3px solid #F07A35;padding-top:28px;margin-top:auto}
.closefoot img{height:120px}
.tags{display:flex;flex-wrap:wrap;justify-content:center;gap:14px;font-size:26px;font-weight:500}
.tags span{border:2px solid #444;border-radius:99px;padding:10px 22px}
.cta{background:#F07A35;color:#111;border-radius:20px;padding:36px 40px;display:flex;flex-direction:column;gap:8px;align-items:center;text-align:center}
.figure{border-radius:18px;overflow:hidden}
.figure img{width:100%;display:block}
"""

def head(topic, i, n, dark=False):
    return f'<div class="head"><span class="t">{esc(topic)}</span><span class="n">{i} / {n}</span></div>'

def foot(dark=False):
    return '<div class="foot"><span>@ing.belcastro</span><b>Scorri →</b></div>'

def slide(sp, i, n, topic):
    t = sp['type']
    if t == 'cover':
        art = sp.get('art', '')
        return f'''<div class="s dark" style="gap:48px">
<div style="display:flex;justify-content:space-between;align-items:flex-start"><img src="{LOGO}" style="height:150px">
<div style="width:460px;height:360px;display:flex;align-items:center;justify-content:center">{art}</div></div>
<div class="body" style="justify-content:flex-end;gap:36px">
<span class="eyebrow">{esc(sp.get('eyebrow', topic))}</span>
<h1 class="osw" style="font-size:{sp.get('size',108)}px">{esc(sp['title'])}</h1>
<p style="font-size:42px;line-height:1.3;color:#DADADA">{esc(sp.get('sub',''))}</p></div>
<div class="foot" style="color:#BDBDBD"><span>@ing.belcastro</span><span style="font-weight:600;letter-spacing:.08em">1 / {n}</span><b>Scorri →</b></div></div>'''
    dark = sp.get('dark', False)
    cls = 'dark' if dark else 'light'
    parts = []
    if sp.get('badge'):
        parts.append(f'<div class="badge"><span>{esc(sp["badge"])}</span><span>{esc(sp.get("badge_note",""))}</span></div>')
    if sp.get('chip'):
        parts.append(f'<div><span class="chip">{esc(sp["chip"])}</span></div>')
    if sp.get('kicker'):
        parts.append(f'<span class="eyebrow">{esc(sp["kicker"])}</span>')
    if sp.get('title'):
        parts.append(f'<h2 class="osw" style="font-size:{sp.get("size",96)}px">{esc(sp["title"])}</h2>')
    if t == 'stat':
        parts.append(f'<div style="display:flex;align-items:flex-end;gap:36px"><span class="num" style="font-size:{sp.get("numsize",190)}px">{esc(sp["num"])}</span><span class="txt" style="font-size:36px;padding-bottom:18px">{esc(sp.get("num_label",""))}</span></div>')
    for para in sp.get('text', []) if isinstance(sp.get('text'), list) else ([sp['text']] if sp.get('text') else []):
        parts.append(f'<p class="txt">{esc(para)}</p>')
    if sp.get('figure'):
        parts.append(f'<div class="figure"><img src="file://{os.path.abspath(sp["figure"])}"></div>')
    if t in ('list', 'news') and sp.get('items'):
        mark = sp.get('mark', '✓')
        parts.append('<div class="items">' + ''.join(f'<div><i>{esc(mark)}</i><span>{esc(x)}</span></div>' for x in sp['items']) + '</div>')
    if t == 'steps':
        parts.append('<div class="steps">' + ''.join(f'<div><i>{k+1:02d}</i><span>{esc(x)}</span></div>' for k, x in enumerate(sp['steps'])) + '</div>')
    if t == 'compare':
        a, b = sp['left'], sp['right']
        parts.append(f'<div class="cmp"><div><h3>{esc(a[0])}</h3><p>{esc(a[1])}</p></div><div><h3>{esc(b[0])}</h3><p>{esc(b[1])}</p></div></div>')
        if sp.get('after'): parts.append(f'<p class="txt" style="font-weight:600;color:inherit">{esc(sp["after"])}</p>')
    if sp.get('note'):
        parts.append(f'<p class="note">{esc(sp["note"])}</p>')
    if sp.get('save'):
        parts.append(f'<p style="font-size:36px;font-weight:700">{esc(sp["save"])}</p>')
    if t == 'close':
        src = sp.get('source', '') + ' Il post non sostituisce una consulenza.'
        return f'''<div class="s dark" style="gap:40px">{head(topic, i, n, True)}
<div class="body" style="justify-content:flex-start;gap:36px;padding-top:20px">{''.join(parts)}</div>
<div class="closefoot"><p class="src">{esc(src)}</p><img src="{LOGO}"></div></div>'''
    if t == 'news' and sp.get('source'):
        parts.append(f'<p class="src">Fonte: {esc(sp["source"])}</p>')
    return f'<div class="s {cls}">{head(topic, i, n)}<div class="body">{"".join(parts)}</div>{foot()}</div>'

CTA = f'''<div class="s dark" style="gap:52px"><div style="display:flex;justify-content:center"><img src="{LOGO}" style="height:230px"></div>
<h2 class="osw" style="font-size:92px;line-height:1.05;text-align:center">Hai un progetto o un dubbio sulla tua casa?</h2>
<div class="tags"><span>Ristrutturazioni</span><span>Direzione lavori</span><span>Pratiche edilizie</span><span>Certificati energetici APE</span><span>Modellazione 3D</span><span>Sicurezza CSP / CSE</span></div>
<div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;gap:24px"><div class="cta"><span class="osw" style="font-size:64px;line-height:1.05">Scrivimi in DM</span><span style="font-size:30px;font-weight:600">@ing.belcastro</span></div>
<p style="text-align:center;font-size:28px;color:#BDBDBD">Segui il profilo: un consiglio pratico sulla casa ogni giorno.</p></div></div>'''

def build(spec, out):
    from playwright.sync_api import sync_playwright
    os.makedirs(out, exist_ok=True)
    slides = spec['slides'] + [{'type': 'cta'}]
    n = len(slides); files = []
    with sync_playwright() as p:
        b = p.chromium.launch(); pg = b.new_page(viewport={'width': 1080, 'height': 1350})
        for k, sp in enumerate(slides, 1):
            body = CTA if sp['type'] == 'cta' else slide(sp, k, n, spec['topic'])
            hp=os.path.join(out,'_tmp.html'); open(hp,'w').write(f'<html><head><meta charset="utf-8"><style>{CSS}</style></head><body>{body}</body></html>'); pg.goto('file://'+os.path.abspath(hp))
            pg.evaluate('document.fonts.ready'); pg.wait_for_timeout(150)
            # controllo overflow: nessun testo deve uscire dalla slide
            ov = pg.evaluate('''()=>{const s=document.querySelector('.s');const r=s.getBoundingClientRect();let bad=[];
              s.querySelectorAll('*').forEach(e=>{const q=e.getBoundingClientRect();if(q.bottom>r.bottom+1||q.right>r.right+1)bad.push(e.tagName+':'+(e.textContent||'').slice(0,30))});
              const bd=s.querySelector('.body'); if(bd&&bd.scrollHeight>bd.clientHeight+2)bad.push('BODY-OVERFLOW');return bad}''')
            if ov: print(f'ATTENZIONE slide {k}: {ov[:3]}')
            f = os.path.join(out, f"{spec['name']}-slide-{k}.png"); pg.screenshot(path=f); files.append(f)
        b.close()
    os.remove(os.path.join(out,'_tmp.html'))
    return files

if __name__ == '__main__':
    spec = json.load(open(sys.argv[1])); print('\n'.join(build(spec, sys.argv[2])))
