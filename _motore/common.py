"""Motore grafico @ing.belcastro: stile condiviso (font, colori, logo)."""
import os, html
HERE = os.path.dirname(os.path.abspath(__file__))
A = os.path.join(HERE, 'assets')

ORANGE = '#F07A35'; ORANGE_DARK = '#B8501A'; INK = '#111111'; PAPER = '#F4F4F2'

FONTS = f"""
@font-face{{font-family:Oswald;src:url('file://{A}/Oswald.ttf');font-weight:200 700}}
@font-face{{font-family:Inter;src:url('file://{A}/Inter-Regular.otf');font-weight:400}}
@font-face{{font-family:Inter;src:url('file://{A}/Inter-Medium.otf');font-weight:500}}
@font-face{{font-family:Inter;src:url('file://{A}/Inter-SemiBold.otf');font-weight:600}}
@font-face{{font-family:Inter;src:url('file://{A}/Inter-Bold.otf');font-weight:700}}
"""
LOGO = f"file://{A}/logo-white.png"

def esc(s):
    """Escape, poi consente **grassetto** e [[evidenza arancio]]."""
    s = html.escape(s or '')
    import re
    s = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', s)
    s = re.sub(r'\[\[(.+?)\]\]', r'<span class="hl">\1</span>', s)
    return s.replace('\n', '<br>')
