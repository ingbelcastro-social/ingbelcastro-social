# Esporta un piano video2 (piano-Vn.py) in props per la composizione Remotion «Lungo» + traccia audio
# uso: python3 lungo.py piano.py out_dir [audio_esistente.mp4]
import runpy, sys, os, json, subprocess, shutil
plan = runpy.run_path(sys.argv[1]); out = sys.argv[2]; os.makedirs(out, exist_ok=True)
import re; V2 = {'VC': re.search(r'^VC = "(.*)"', open('/home/user/ingbelcastro-social/_motore/video2.py').read(), re.M).group(1)}
sig, blocks = plan['SIGLA'], plan['BLOCKS']; T0 = sig['cut'] + 0.25
PUB = os.path.dirname(os.path.abspath(__file__)) + '/reels/remotion/public/'
MAPIMG = {'fotovoltaico.jpg': 'ing/img10.png', 'installazione-fv.jpg': 'ing/img9.png', 'contatore.jpg': 'ing/img7.png',
          'pdc-giardino.jpg': 'ing/img14.png', 'pdc-balcone.jpg': 'ing/img13.png', 'pdc-dettaglio.jpg': 'ing/pdc-dettaglio.jpg'}
MAPILL = {'pdc-neve.jpg': 'pdcneve', 'caldaia-murale.jpg': 'caldaia', 'caldaia-cond.jpg': 'caldaia', 'radiatore.jpg': 'radiatore',
          'pavimento.jpg': 'pavimento', 'fancoil.jpg': 'fancoil', 'cappotto.jpg': 'cappotto', 'condominio.jpg': 'condominio', 'motori-facciata.jpg': 'facciata'}
if 'V7' in sys.argv[1]: MAPIMG['fotovoltaico.jpg'] = 'ing/img8.png'
shutil.copy(os.path.dirname(os.path.abspath(__file__)) + '/v7/foto/pdc-dettaglio.jpg', PUB + 'ing/pdc-dettaglio.jpg')
dur = lambda p: float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p], capture_output=True, text=True).stdout)
t = T0; B = []; SC = []
for k, b in enumerate(blocks):
    d = dur(b['audio']); B.append({'t': round(t, 3), 'd': round(d, 3), 'cap': b['cap']})
    sc = b['scenes']
    for j, s in enumerate(sc):
        s = dict(s); a = t + max(s['t'], 1.0); z = t + (sc[j + 1]['t'] if j + 1 < len(sc) else d)
        img = os.path.basename(s.pop('img', '') or '')
        if img in MAPIMG: s['img'] = MAPIMG[img]
        elif img in MAPILL: s['illus'] = MAPILL[img]
        its = [x[1] for x in s.get('items', [])] if s['type'] == 'icons' else []
        if 'freccia' in its: s['type'] = 'energia'; s['mode'] = 'day' if its[0] == 'sole' else 'night'
        elif its == ['rete']: s['type'] = 'energia'; s['mode'] = 'grid'
        if s['type'] == 'timeline' and 'sole' in s.get('title', ''): s['type'] = 'giornata'
        s.pop('kb', None); s['a'] = round(a, 3); s['z'] = round(z, 3); s['blk'] = k
        SC.append(s)
    t += d
total = round(t + 1.2, 3)
props = {'title': plan['TITLE'], 'T0': T0, 'cues': {k: v + 0.25 for k, v in sig['cues'].items()}, 'blocks': B, 'scenes': SC, 'total': total,
         'audio': os.path.basename(out.rstrip('/')) + '/audio.wav'}
json.dump(props, open(out + '/props.json', 'w'), ensure_ascii=False, indent=1)
# audio
wav = out + '/audio.wav'
if len(sys.argv) > 3:
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', sys.argv[3], '-vn', '-ar', '48000', '-ac', '2', wav], check=True)
else:
    ins = ['-i', sig['audio']] + sum([['-i', b['audio']] for b in blocks], []) + ['-i', plan['BED']]
    n = len(blocks); parts = [f"[0:a]aresample=48000,atrim=0:{sig['cut']},adelay=250:all=1[s0]"] + [f"[{i+1}:a]aresample=48000[s{i+1}]" for i in range(n)]
    parts.append(''.join(f'[s{i}]' for i in range(n + 1)) + f"concat=n={n+1}:v=0:a=1,{V2['VC']},apad=pad_dur=6[v]")
    parts.append(f"[{n+1}:a]aresample=48000,atrim=0:{total},volume=-36dB,afade=t=in:st={T0-1}:d=1,afade=t=out:st={total-3}:d=3,apad=pad_dur=6[m]")
    parts.append(f"[v][m]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-16:TP=-2:LRA=9,alimiter=limit=0.84:level=false,atrim=0:{total}[a]")
    subprocess.run(['ffmpeg', '-v', 'error', '-y'] + ins + ['-filter_complex', ';'.join(parts), '-map', '[a]', '-ac', '2', wav], check=True)
print('totale', total, 'scene', len(SC))
for b in B: print(f"{int(b['t'])//60}:{int(b['t'])%60:02d} {b['cap']}")
