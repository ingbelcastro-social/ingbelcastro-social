"""Allinea le frasi di un testo a un file audio (senza riconoscimento vocale).
Conta i nuclei sillabici (picchi di energia), li distribuisce in proporzione alle sillabe di ogni frase
e aggancia l'inizio di ogni frase alla pausa più vicina.
Uso: python3 align.py audio.m4a "testo completo"   -> stampa durata e inizi frase (s)
"""
import sys, re, subprocess, numpy as np

def sentences(txt):
    return [s.strip() for s in re.split(r'(?<=[.?!:])\s+', txt.strip()) if s.strip()]

def syl(s):
    return max(1, len(re.findall(r'[aeiouàèéìòóù]+', s.lower())))

def pauses(f):
    r = subprocess.run(['ffmpeg', '-i', f, '-af', 'silencedetect=noise=-35dB:d=0.18', '-f', 'null', '-'], capture_output=True, text=True).stderr
    st = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', r)]
    en = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', r)]
    return list(zip(st, en))

def nuclei(f):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', f, '-ac', '1', '-ar', '16000', '-af', 'highpass=f=300,lowpass=f=3000', '-f', 's16le', '-'], capture_output=True).stdout
    x = np.frombuffer(raw, np.int16).astype(np.float32) / 32768
    hop = 160; n = len(x) // hop
    e = np.sqrt((x[:n * hop].reshape(n, hop) ** 2).mean(1))
    k = np.hanning(7); e = np.convolve(e, k / k.sum(), 'same')
    thr = max(np.percentile(e, 30), e.max() * 0.04)
    pk = [i for i in range(2, n - 2) if e[i] > thr and e[i] == e[max(0, i - 6):i + 7].max()]
    return np.array(pk) * hop / 16000, n * hop / 16000

def align(f, txt):
    ss = sentences(txt); sy = [syl(s) for s in ss]
    pk, dur = nuclei(f); ps = pauses(f)
    cum = np.cumsum([0] + sy[:-1]) / sum(sy)
    out = []
    for c in cum:
        i = min(len(pk) - 1, int(round(c * len(pk))))
        t = pk[i] - 0.12 if i > 0 else (ps[0][1] if ps and ps[0][0] < 0.05 else pk[0] - 0.12)
        near = [b for a, b in ps if abs(b - t) < 0.9 and b < dur - 0.3]
        if near and i > 0: t = min(near, key=lambda b: abs(b - t))
        out.append(round(max(0, t), 2))
    return dur, ss, out

if __name__ == '__main__':
    d, ss, o = align(sys.argv[1], sys.argv[2])
    print(round(d, 2))
    for t, s in zip(o, ss): print(f'{t:6.2f}  {s[:70]}')
