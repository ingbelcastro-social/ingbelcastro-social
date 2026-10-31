import numpy as np, scipy.signal as ss, scipy.io.wavfile as wf
import os
SR=44100; BPM=100; B=60/BPM; BAR=4*B; DUR=float(os.environ.get("DUR","30")); BED=os.environ.get("BED")=="1"
N=int(SR*(DUR+1)); L=np.zeros(N); R=np.zeros(N)
rng=np.random.default_rng(7)
def add(sig,t,pan=0.0,g=1.0):
    i=int(t*SR)
    if i>=N: return
    j=min(N,i+len(sig)); s=sig[:j-i]*g
    L[i:j]+=s*np.sqrt((1-pan)/2)*1.414; R[i:j]+=s*np.sqrt((1+pan)/2)*1.414
def kick():
    t=np.arange(int(.45*SR))/SR; f=45+75*np.exp(-t*28)
    ph=2*np.pi*np.cumsum(f)/SR; return np.sin(ph)*np.exp(-t*7.5)*1.0
def snare():
    t=np.arange(int(.3*SR))/SR; n=rng.standard_normal(len(t))
    b,a=ss.butter(2,[900/(SR/2),6000/(SR/2)],'band'); n=ss.lfilter(b,a,n)
    return (n*np.exp(-t*18)*.55+np.sin(2*np.pi*185*t)*np.exp(-t*30)*.35)
def hat(o=False):
    t=np.arange(int((.18 if o else .06)*SR))/SR; n=rng.standard_normal(len(t))
    b,a=ss.butter(2,7000/(SR/2),'high'); return ss.lfilter(b,a,n)*np.exp(-t*(15 if o else 70))*.18
def mtof(m): return 440*2**((m-69)/12)
def keys(notes,dur):
    t=np.arange(int(dur*SR))/SR; s=np.zeros(len(t))
    env=(1-np.exp(-t*60))*np.exp(-t*0.55)
    for m in notes:
        f=mtof(m)
        for d,g in [(0,1),(1.003,.5),(0.997,.5)]:
            ff=f*(d if d else 1)
            s+=g*(np.sin(2*np.pi*ff*t)+.25*np.sin(2*np.pi*2*ff*t)*np.exp(-t*4))
    s*=env*(1+.12*np.sin(2*np.pi*4.2*t))
    return s/len(notes)*.6
def bass(m,dur):
    t=np.arange(int(dur*SR))/SR; f=mtof(m)
    s=np.sin(2*np.pi*f*t)+.15*np.sin(2*np.pi*2*f*t)
    return s*(1-np.exp(-t*80))*np.exp(-t*1.8)*.42
# Am9 - Fmaj7 - Cmaj7 - G6 (Em7 color)
prog=[([57,60,64,67,71],45),([53,57,60,64],41),([48,55,59,64],48),([55,59,62,64],43)]
sw=0.09*B  # swing on 8th offbeats
nb=int(np.ceil(DUR/BAR))+1
for bar in range(nb):
    t0=bar*BAR; ch,root=prog[bar%4]
    add(keys(ch,BAR*1.05),t0+0.01,pan=-.15)
    add(keys([ch[-1]+12],B*1.5),t0+2.5*B+sw,pan=.4,g=.5) if (bar%2 and not BED) else None
    add(bass(root-12+12,B*1.6),t0); add(bass(root-12+12,B*.9),t0+2.5*B+sw,g=.8)
    intro = bar==0
    for k in range(4):
        if k in (0,2): add(kick(),t0+k*B,g=(.6 if intro else 1)*(.55 if BED else 1))
        if k==2 and bar%2==1: add(kick(),t0+(k+.5)*B+sw,g=.55)
        if k in (1,3) and not intro: add(snare(),t0+k*B,pan=.05,g=.45 if BED else 1)
        add(hat(),t0+k*B,pan=.3,g=.9+.2*rng.random())
        add(hat(k==3 and bar%4==3),t0+(k+.5)*B+sw,pan=.3,g=.6+.2*rng.random())
# sidechain-ish duck on kicks already summed: simple global pump
t=np.arange(N)/SR; pump=1-.18*np.exp(-((t%B))*9)
L*=pump; R*=pump
# vinyl crackle + hiss
cr=np.zeros(N); idx=rng.integers(0,N,int(DUR*9)); cr[idx]=rng.uniform(-.25,.25,len(idx))
b,a=ss.butter(2,[1500/(SR/2),9000/(SR/2)],'band'); cr=ss.lfilter(b,a,cr)
hiss=ss.lfilter(*ss.butter(1,4000/(SR/2)),rng.standard_normal(N))*.004
L+=cr+hiss; R+=cr*.9+hiss
# lofi lowpass + gentle saturation
b,a=ss.butter(2,5200/(SR/2)); L=ss.lfilter(b,a,L); R=ss.lfilter(b,a,R)
L=np.tanh(L*1.1); R=np.tanh(R*1.1)
n=int(DUR*SR); L=L[:n]; R=R[:n]
fi=int(.03*SR); fo=int((4.0 if BED else 2.0)*SR)
env=np.ones(n); env[:fi]=np.linspace(0,1,fi); env[-fo:]=np.linspace(1,0,fo)**1.5
L*=env; R*=env
pk=max(abs(L).max(),abs(R).max()); L/=pk/0.89; R/=pk/0.89
wf.write(os.environ.get('OUT','/home/claude/v/beat100.wav'),SR,(np.stack([L,R],1)*32767).astype(np.int16))
print('ok',n/SR)
