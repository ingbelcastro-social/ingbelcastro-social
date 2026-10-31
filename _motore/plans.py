# Planimetrie disegnate per il Video 4: progetto approvato / casa reale con difformità / catastale
from PIL import Image, ImageDraw, ImageFont
A = '/home/claude/engine/assets/'
W, H = 1920, 1080
OR, WH, GR = (240, 122, 53), (235, 235, 235), (120, 120, 120)
fI = lambda s: ImageFont.truetype(A + 'Inter-SemiBold.otf', s)
fO = lambda s: ImageFont.truetype(A + 'Oswald.ttf', s)

def base(bgcol=(18, 18, 18), grid=(30, 30, 30)):
    im = Image.new('RGB', (W, H), bgcol); d = ImageDraw.Draw(im)
    for x in range(0, W, 40): d.line((x, 0, x, H), fill=grid)
    for y in range(0, H, 40): d.line((0, y, W, y), fill=grid)
    return im, d

# pianta (coordinate) — area disegno x 860..1820, y 180..940
X0, Y0 = 860, 200
def walls(d, col=WH, moved=False, veranda=False, bagno2=False):
    w = 14
    R = lambda a, b, c, e: d.rectangle((X0 + a, Y0 + b, X0 + c, Y0 + e), fill=col)
    # perimetro 900x620
    R(0, 0, 900, w); R(0, 620 - w, 900, 620); R(0, 0, w, 620); R(900 - w, 0, 900, 620)
    # muro centrale orizzontale (con porte)
    R(0, 330, 260, 330 + w); R(340, 330, 560, 330 + w); R(640, 330, 900, 330 + w)
    # tramezzo soggiorno/cucina (verticale)
    if moved:
        R(470, 0, 470 + w, 140); R(470, 220, 470 + w, 330)
    else:
        R(380, 0, 380 + w, 140); R(380, 220, 380 + w, 330)
    # camere sotto
    R(430, 330, 430 + w, 620); R(700, 330, 700 + w, 470); R(700, 470, 900, 470 + w)
    # finestre (aperture sul perimetro)
    for a, b in [(120, 260), (560, 760)]:
        d.rectangle((X0 + a, Y0, X0 + b, Y0 + w), fill=(18, 18, 18)); d.line((X0 + a, Y0 + 7, X0 + b, Y0 + 7), fill=col, width=3)
    # balcone
    if veranda:
        d.rectangle((X0 + 100, Y0 + 620, X0 + 600, Y0 + 740), fill=(70, 38, 20), outline=OR, width=10)
    else:
        d.rectangle((X0 + 100, Y0 + 620, X0 + 600, Y0 + 740), outline=GR, width=4)

def labels(d, col=WH, moved=False, veranda=False, bagno2=False):
    f = fI(30)
    L = [((190 if not moved else 230), 160, 'SOGGIORNO'), ((640 if not moved else 690), 160, 'CUCINA'), (215, 470, 'CAMERA'), (565, 470, 'CAMERA'),
         (800, 400, 'BAGNO'), (790, 562, 'BAGNO' if bagno2 else 'RIPOST.'), (350, 680, 'VERANDA' if veranda else 'BALCONE')]
    for x, y, t in L:
        c = OR if (t == 'VERANDA' or (bagno2 and y == 562)) else col
        d.text((X0 + x, Y0 + y), t, font=f, fill=c, anchor='mm')

def title(d, kick, big, col=OR):
    d.text((120, 380), kick, font=fI(34), fill=col)
    d.text((116, 430), big, font=fO(96), fill=WH)

# 1) progetto approvato
im, d = base(); walls(d); labels(d)
d.text((X0, Y0 - 60), 'PROGETTO APPROVATO · archivio del Comune', font=fI(28), fill=GR)
im.save('pianta-progetto.jpg', quality=93)
# 2) casa reale con difformità evidenziate
im, d = base(); walls(d, moved=True, veranda=True, bagno2=True); labels(d, moved=True, veranda=True, bagno2=True)
for y0, y1 in [(0, 140), (220, 330)]:
    for y in range(y0, y1, 22): d.line((X0 + 387, Y0 + y, X0 + 387, Y0 + min(y + 12, y1)), fill=OR, width=4)
d.text((X0 + 387, Y0 + 290 + 20), '', font=fI(20), fill=OR)
for cx, cy, n in [(430, 70, '1'), (600, 680, '2'), (868, 498, '3')]:
    d.ellipse((X0 + cx - 28, Y0 + cy - 28, X0 + cx + 28, Y0 + cy + 28), fill=OR); d.text((X0 + cx, Y0 + cy), n, font=fO(36), fill=(17, 17, 17), anchor='mm')
d.text((X0, Y0 - 60), 'STATO REALE · sopralluogo', font=fI(28), fill=OR)
im.save('pianta-reale.jpg', quality=93)
# 3) planimetria catastale (stile grigio, più schematica)
im, d = base((26, 26, 26), (34, 34, 34)); walls(d, col=(170, 170, 170), moved=True); labels(d, col=(170, 170, 170), moved=True)
d.text((X0, Y0 - 60), 'PLANIMETRIA CATASTALE · fini fiscali', font=fI(28), fill=GR)
im.save('pianta-catasto.jpg', quality=93)
print('ok')
