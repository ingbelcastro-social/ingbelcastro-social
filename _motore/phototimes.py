import runpy, subprocess, sys
p = runpy.run_path(sys.argv[1]); t = p['SIGLA']['cut'] + 0.25; out = []
for b in p['BLOCKS']:
    d = float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',b['audio']],capture_output=True,text=True).stdout)
    for s in b['scenes']:
        if s.get('img') or s['type'] == 'compare': out.append(round(t + max(s['t'], 1.0) + 2.2, 1))
    t += d
print(','.join(map(str, out)))
