"""Miniatura YouTube 1280x720. Uso: python3 thumb.py out.jpg "RIGA ARANCIO" "RIGA BIANCA" "chip" [classi]"""
import sys, os
from common import FONTS, LOGO, esc
from longvideo import CLASSI
out, big, line2, chip = sys.argv[1:5]; classi = len(sys.argv) > 5
bars = ''.join(f'<div style="width:{int(w*0.75)}px;background:{c}">{l}</div>' for l, c, w in CLASSI) if classi else ''
html = f'''<html><head><meta charset="utf-8"><style>{FONTS}
body{{margin:0}}#t{{width:1280px;height:720px;background:#111;position:relative;overflow:hidden;font-family:Inter;
background-image:linear-gradient(#1c1c1c 2px,transparent 2px),linear-gradient(90deg,#1c1c1c 2px,transparent 2px);background-size:80px 80px}}
.l{{position:absolute;left:70px;top:90px;width:760px}}
.b{{font:700 230px/0.9 Oswald;color:#F07A35;text-transform:uppercase}}
.w{{font:700 74px/1.02 Oswald;color:#fff;text-transform:uppercase;margin-top:14px}}
.c{{display:inline-block;margin-top:28px;background:#fff;color:#111;font:700 44px Oswald;padding:10px 24px;border-radius:10px;text-transform:uppercase}}
.bars{{position:absolute;right:70px;top:60px;display:flex;flex-direction:column;gap:9px;align-items:flex-start}}
.bars div{{height:38px;border-radius:5px;font:700 26px/38px Oswald;color:#111;padding-left:14px}}
img{{position:absolute;right:70px;bottom:22px;height:96px}}</style></head><body><div id="t">
<div class="l"><div class="b">{esc(big)}</div><div class="w">{esc(line2)}</div><div class="c">{esc(chip)}</div></div>
<div class="bars">{bars}</div><img src="{LOGO}"></div></body></html>'''
from playwright.sync_api import sync_playwright
hp = os.path.abspath(out) + '.html'; open(hp, 'w').write(html)
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={'width': 1280, 'height': 720}); pg.goto('file://' + hp)
    pg.evaluate('document.fonts.ready'); pg.wait_for_timeout(200); pg.screenshot(path=out, type='jpeg', quality=92); b.close()
os.remove(hp); print(out)
