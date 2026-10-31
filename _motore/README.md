# Motore grafico @ing.belcastro

Produce caroselli (1080x1350 PNG) e reel (1080x1920, 30 s, 30 fps, beat a -14 LUFS) nello stile del canale.
Requisiti: Python 3 con playwright (Chromium) e ffmpeg.

1. Copia questa cartella in una directory di lavoro (mantieni `assets/`).
2. Carosello: `python3 carousel.py spec.json out/` → `<name>-slide-N.png` (l'ultima è sempre la slide «Scrivimi in DM»).
   Tipi di slide: cover (eyebrow, title, sub, art=SVG 460x360), list (kicker, title, text[], items[], note),
   steps (title, steps[], note), compare (title, left=[titolo,testo], right=[…], after), stat (kicker, title, num, num_label, text[]),
   news (chip, title, text[], items[], note, source), close (kicker, title, text[], save, source: penultima slide scura con fonte + «non sostituisce una consulenza»).
   Testo: **grassetto**, [[evidenza arancio]], \n per andare a capo. Il programma avvisa se un testo esce dalla slide.
3. Reel: `python3 reel.py spec.json out/` → `Reel-<name>-30s.mp4` (chiusura «Scrivimi in DM») e `Short-<name>-30s.mp4` (chiusura YouTube).
   Le scene (eyebrow, title, sub, dur, size opzionale) devono sommare 25.6 s; la chiusura dura 4.4 s.
4. Esempi di spec: cartella `esempi/` (settimana 2–8 novembre 2026).
5. Controllo qualità: guarda le slide in un montaggio, controlla con ffprobe durata 30.0, 1080x1920, 30 fps, audio aac.
