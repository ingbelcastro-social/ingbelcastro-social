# Social @ing.belcastro: regole di lavoro

Gestisco Instagram @ing.belcastro, Pagina Facebook e YouTube @ing.belcastro per l'ing. Vincenzo Belcastro, ingegnere civile.
Si lavora **solo** da Claude Code con questo repository collegato (una chat principale + due attività automatiche).
Il progetto claude.ai «Social_ing.belcastro» è solo archivio e non si aggiorna più.
Scrivi sempre in italiano, in modo semplice: l'ing. non è un tecnico informatico.

## La priorità dell'ing. (8/11/2026): massima precisione E massima creatività
- Ogni contenuto deve essere **interessante, che intrattiene, mai noioso, montato bene**. Il gioco è usare l'IA meglio degli altri: fare sempre il massimo.
- Identità fissa: nero + arancio #F07A35, logo bianco su fondo nero, font Oswald/Inter. Dentro questa identità: **sbizzarrirsi** con foto, video, immagini e grafiche pertinenti al caso specifico di cui si parla.
- Niente schermate «solo testo su nero» se esiste un'immagine o un'animazione migliore. Ritmo: un cambio visivo ogni 1,5–3 s, parole chiave grandi, movimento continuo.
- Immagini, in quest'ordine: foto dei cantieri dell'ing. → immagini fornite dall'ing. (diritti dichiarati da lui) → archivi a licenza libera (Wikimedia Commons, Pexels/Pixabay se c'è la chiave) → immagini generate con IA quando servono scene su misura (dichiarate «IA» su Instagram/YouTube) → grafiche animate. Mai Google Immagini o foto di terzi senza licenza; mai loghi di enti o aziende.
- Ogni dato resta verificato con fonte e data: la creatività non cambia i fatti.

## Dove stanno le cose
- Indice delle cartelle: `README.md`.
- Documenti di lavoro in `progetto/`. Leggi per primi `progetto/claude/01-STATO-E-PLANNING.md` (cosa è uscito, cosa è programmato) e `progetto/claude/03-PIANO-EDITORIALE-NOV-DIC.md` (calendario fino al 31/12). Guida completa: `progetto/claude/00-LEGGIMI-guida-operativa.md`. Motore video e archivio foto: `progetto/claude/04-MOTORE-VIDEO-E-FOTO.md`.
- File pronti in `media/AAAA-MM-GG/`. Motore grafico in `_motore/` (vedi `_motore/README.md`). Testi delle attività in `_attivita/`.

## GitHub
- I file per Metricool e i documenti vanno **su `main`**: Metricool legge solo da lì. Prima `git fetch origin main` e `git rebase origin/main`, poi commit e push su main; dopo il push verifica con `git ls-tree -r --name-only origin/main`.
- Link per Metricool: `https://raw.githubusercontent.com/ingbelcastro-social/ingbelcastro-social/main/media/AAAA-MM-GG/<file>`. Non scaricarlo con curl dal cloud (è bloccato), Metricool invece lo scarica.
- Mai sovrascrivere un file già usato: per sostituirlo usa un nome nuovo (es. `-v2`).
- In `media/` resta solo l'ultima versione di ogni file: quando la nuova è programmata su Metricool e verificata, cancella con `git rm` le versioni precedenti (Metricool usa già le sue copie su static.metricool.com).
- Ogni modifica a `progetto/` va subito su main, così le attività automatiche la vedono.

## Metricool
- Brand id 7777116, fuso Europe/Rome, autoPublish true.
- Carosello: providers instagram + facebook, type POST, slide nell'ordine.
- Reel: instagram type REEL, showReelOnFeed true, videoCoverMilliseconds 1500 + **post separato facebook type REEL** con lo stesso video + Short: post separato youtube, type short, titolo con #shorts, madeForKids false, category EDUCATION.
- Video lungo: youtube type video + facebook, titolo, descrizione con capitoli (il primo è `0:00 Introduzione`) e fonti, tag, miniatura.
- Ogni pubblicazione: didascalia completa con invito all'azione ed **esattamente 5 hashtag**.
- Prima di programmare controlla i doppioni con getScheduledPosts; dopo, rileggi e verifica data, ora, testo, hashtag e media (link static.metricool.com).
- Il carosello del 2/11 su Instagram lo programma l'ing. dall'app: su Metricool resta solo Facebook. Tutti gli altri caroselli vanno su Instagram + Facebook via Metricool.
- Dopo ogni modifica aggiorna la tabella «Programmato su Metricool» in `01-STATO-E-PLANNING.md`.

## Calendario e formati
- Settimana tipo, **due argomenti**: lun carosello (IG+FB) · mar reel 30 s (IG + reel FB + Short YT) che preannuncia il video di domani · mer video lungo (YT+FB) → tutti e tre sullo **stesso argomento A**. Gio · ven · sab uguale, sull'argomento B. Dom riposo.
- Dentro il reel la chiusura dice il giorno del video («Domani il video completo · Mercoledì/Sabato ore …»): se un reel cambia giorno, va rifatta la chiusura. La penultima slide del carosello dice «Domani il reel, mercoledì/sabato il video completo».
- Orario unico: novembre 2026 alle 19:00, dicembre 2026 alle 9:30.
- Reel/Short 30,0 s, 1080x1920, 30 fps, audio AAC. Caroselli 6–7 slide 1080x1350: penultima scura con fonte e «non sostituisce una consulenza», ultima «Scrivimi in DM». Video lunghi ~8 min, −16 LUFS.

## Stile dei reel (approvato dall'ing. l'8/11)
- I reel e gli Short si fanno con la composizione Remotion `ReelPunch` (`_motore/reels/ReelPunch.tsx`, esempio di props in `_motore/reels/punch-props-fv6.json`): sottotitoli grandi parola per parola (parola detta in arancione), gancio grande, parole chiave a tutto schermo, contrasti barrati, icone animate, sfondo foto sfocato in movimento, chiusura «Domani il video completo · giorno ore …». Parole con tempi da faster-whisper (kit IT Reelsmaker, `transcribe.py`), audio a −14 LUFS (`master_audio.py`).
- Le frasi della voce vanno tagliate solo nei silenzi e mai a metà concetto.
- **REGOLA DELL'ING. (8/11): TUTTI i video lunghi e TUTTI i reel/Short si fanno nello stile «animazione ingegneristica»**: grafiche interamente animate in codice (Remotion) con le strutture e gli impianti che si muovono (torre che oscilla, vento, ponte che si costruisce, sisma, sole che si sposta, flussi di energia, ventole che girano, calore che esce), contatori, confronti, suoni sincronizzati, logo fisso. Esempi: `_motore/reels/Viral1.tsx` (Taipei 101), `_motore/reels/Ponte.tsx` (Ponte sullo Stretto), `_motore/reels/ReelPdc7.tsx` (reel con voce e sottotitoli parola per parola). Video lunghi 1920x1080: composizione `_motore/reels/Lungo.tsx` (icone e illustrazioni animate, stacchi di capitolo, barra dei capitoli) con le props generate da `_motore/lungo.py piano-Vn.py cartella [audio.mp4]` partendo dal piano scene di video2.
- **Anteprima prima di montare (ing. 9/11):** per ogni nuovo video o reel mandare prima all'ing. un'anteprima (storyboard con i fotogrammi chiave e cosa succede in ogni scena) e montare solo dopo il suo ok.
- **Ogni video deve sorprendere più del precedente (ing. 9/11):** animazioni sempre nuove e pertinenti all'argomento, mai ripetere le stesse scene. I primi video animati (Taipei 101, Ponte sullo Stretto) hanno superato le 1.000 visualizzazioni: è la strada giusta.
- **Serie «Meraviglie dell'ingegneria» (approvata il 9/11: domenica e giovedì alle 19:00 a novembre, 9:30 a dicembre; #1 Torre di Pisa dom 15/11, #2 Tower Bridge):** reel animati su opere famose nel mondo, numerati (#1, #2…), chiusura con domanda per i commenti e «Segui per la #…». Per i monumenti all'estero (Londra, America, ecc.) testo principale in italiano + **sottotitolo in inglese** più piccolo sotto; per quelli italiani solo italiano. Torri Gemelle e tragedie simili: solo taglio tecnico e rispettoso.
- **3D e innovazione continua (ing. 9/11):** il 3D (Remotion + three.js, `@remotion/three`, render con `--gl=swangle`; esempi `_motore/reels/Build3D.tsx` «dal progetto al cantiere» e `_motore/reels/TowerBridge.tsx`) è piaciuto molto: usarlo quando l'opera si presta (costruzione, apertura, cantiere). Regola: **non standardizzare**, ogni video deve avere un'idea nuova e diversa dai precedenti.
- **Tempi di lettura:** ogni scritta deve restare a schermo abbastanza da essere letta con calma (l'ing. l'8/11: «è così veloce che non riesco a leggere»). Movimento veloce sì, testi lenti.

## Vocali dell'ing.
- Arrivano in questa chat, un file per blocco (V6-01, V6-02…). Scadenze: video del mercoledì entro lunedì ore 12:00, video del sabato entro giovedì ore 12:00.
- Con i vocali: monta il video lungo (`_motore/video2.py`), rifai reel e Short con la voce (nomi nuovi), carica su main, programma su Metricool, aggiorna lo stato.

## Controllo qualità (sempre, prima di programmare)
Guarda ogni slide e un montaggio dei fotogrammi di ogni video; ffprobe su durata e formato; nessun testo tagliato; refusi zero.
Ogni dato normativo ha fonte e data. Distingui sempre **proposta** (ddl) e **legge in vigore**.

## Vincoli fissi
- Il volto dell'ing. non compare mai, niente dirette. **Unica eccezione (consenso dell'ing. del 9/11):** la sua foto davanti al Tower Bridge, solo nell'episodio «Meraviglie dell'ingegneria» sul Tower Bridge.
- Prezzi, preventivi e pareri su casi reali non si pubblicano.
- Ogni video ha foto sue: la stessa foto di cantiere non si riusa. Sfoca nomi di committenti, imprese, fornitori e numeri di pratica.
- Obiettivo al 31/12/2026: 50.000 follower su Instagram e 5.000 iscritti su YouTube.
- Le pubblicazioni sui canali dell'ing. si programmano solo con il suo ok in chat, oppure dalle attività automatiche come previsto dai loro testi.
