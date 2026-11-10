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

## Calendario e formati (NUOVO dall'ing. il 10/11/2026: niente più video lunghi)
- L'ultimo video lungo è il Video 6 di mercoledì 11/11. Dal 12/11 **nessun video lungo** (il Video 7 è in bozza su Metricool, non esce).
- Settimana tipo, **due argomenti**:
  - **Lunedì** post/carosello (IG + FB) con descrizione e 5 hashtag — argomento A (informazione/normativa).
  - **Martedì** video animato **3D** sullo stesso argomento del post, **massimo 50 s**, senza voce (scritte + suoni, come Taipei 101).
  - **Mercoledì** «Meraviglie dell'ingegneria», sempre sorprendente, **massimo 90 s**.
  - **Giovedì** post/carosello — argomento B. **Venerdì** video 3D sull'argomento B (max 50 s). **Sabato** «Meraviglie dell'ingegneria».
  - **Domenica** nulla.
- Pubblicazione: **Instagram + Facebook**; in più gli stessi video come **Short su YouTube** (scelta dell'ing. del 10/11).
- Penultima slide del carosello e didascalia del post: **«Seguimi per approfondimenti! Domani il video completo!»** (ing. 10/11).
- Nei post e nei video del martedì/venerdì **non si annunciano le «Meraviglie»** né il loro giorno/ora: le Meraviglie escono senza preannuncio.
- Orario unico: novembre 2026 alle 19:00, dicembre 2026 alle 9:30.
- Video verticali 1080x1920, 30 fps, audio AAC −14 LUFS. Caroselli 6–7 slide 1080x1350: penultima scura con fonte e «non sostituisce una consulenza», ultima «Scrivimi in DM».
- Vocali dell'ing.: non servono più (video senza voce).

## Stile dei reel (approvato dall'ing. l'8/11)
- I reel e gli Short si fanno con la composizione Remotion `ReelPunch` (`_motore/reels/ReelPunch.tsx`, esempio di props in `_motore/reels/punch-props-fv6.json`): sottotitoli grandi parola per parola (parola detta in arancione), gancio grande, parole chiave a tutto schermo, contrasti barrati, icone animate, sfondo foto sfocato in movimento, chiusura «Domani il video completo · giorno ore …». Parole con tempi da faster-whisper (kit IT Reelsmaker, `transcribe.py`), audio a −14 LUFS (`master_audio.py`).
- Le frasi della voce vanno tagliate solo nei silenzi e mai a metà concetto.
- **REGOLA DELL'ING. (8/11): TUTTI i video lunghi e TUTTI i reel/Short si fanno nello stile «animazione ingegneristica»**: grafiche interamente animate in codice (Remotion) con le strutture e gli impianti che si muovono (torre che oscilla, vento, ponte che si costruisce, sisma, sole che si sposta, flussi di energia, ventole che girano, calore che esce), contatori, confronti, suoni sincronizzati, logo fisso. Esempi: `_motore/reels/Viral1.tsx` (Taipei 101), `_motore/reels/Ponte.tsx` (Ponte sullo Stretto), `_motore/reels/ReelPdc7.tsx` (reel con voce e sottotitoli parola per parola). Video lunghi 1920x1080: composizione `_motore/reels/Lungo.tsx` (icone e illustrazioni animate, stacchi di capitolo, barra dei capitoli) con le props generate da `_motore/lungo.py piano-Vn.py cartella [audio.mp4]` partendo dal piano scene di video2.
- **Anteprima prima di montare (ing. 9/11):** per ogni nuovo video o reel mandare prima all'ing. un'anteprima (storyboard con i fotogrammi chiave e cosa succede in ogni scena) e montare solo dopo il suo ok.
- **Ogni video deve sorprendere più del precedente (ing. 9/11):** animazioni sempre nuove e pertinenti all'argomento, mai ripetere le stesse scene. I primi video animati (Taipei 101, Ponte sullo Stretto) hanno superato le 1.000 visualizzazioni: è la strada giusta.
- **Serie «Meraviglie dell'ingegneria» (dal 10/11: mercoledì e sabato; #1 Torre di Pisa sab 14/11, #2 Tower Bridge mer 18/11):** reel animati su opere famose nel mondo, numerati (#1, #2…), chiusura con domanda per i commenti e «Segui per la #…». Per i monumenti all'estero (Londra, America, ecc.) testo principale in italiano + **sottotitolo in inglese** più piccolo sotto; per quelli italiani solo italiano. Torri Gemelle e tragedie simili: solo taglio tecnico e rispettoso.
- **3D e innovazione continua (ing. 9/11):** il 3D (Remotion + three.js, `@remotion/three`, render con `--gl=swangle`; esempi `_motore/reels/Build3D.tsx` «dal progetto al cantiere» e `_motore/reels/TowerBridge.tsx`) è piaciuto molto: usarlo quando l'opera si presta (costruzione, apertura, cantiere). Regola: **non standardizzare**, ogni video deve avere un'idea nuova e diversa dai precedenti.
- **Quale stile per quale contenuto (decisione dell'ing. 9/11):**
  - **Costruzioni e «Meraviglie dell'ingegneria»** (edifici, torri, ponti, grandi opere): **modello 3D che si costruisce** (come `_motore/reels/TowerBridge.tsx` e `Build3D.tsx`), poi l'opera in funzione.
  - **Caroselli di informazione e normativa** (bonus, pratiche, leggi, incentivi): **motore dei caroselli di sempre** (`_motore/`, stesso formato e impaginazione usati finora), senza cambiarlo.
  - Reel e video lunghi sui temi normativi/impianti: stile «animazione ingegneristica» 2D con la voce (`ReelPdc7.tsx`, `ReelFv6.tsx`, `Lungo.tsx`).
- **Tempi di lettura:** ogni scritta deve restare a schermo abbastanza da essere letta con calma (l'ing. l'8/11: «è così veloce che non riesco a leggere»). Movimento veloce sì, testi lenti.

## Vocali dell'ing.
- Dal 10/11 non servono più: i video sono senza voce. I vocali V7 e precedenti restano in archivio.

## Controllo qualità (sempre, prima di programmare)
Guarda ogni slide e un montaggio dei fotogrammi di ogni video; ffprobe su durata e formato; nessun testo tagliato; refusi zero.
Ogni dato normativo ha fonte e data. Distingui sempre **proposta** (ddl) e **legge in vigore**.

## Vincoli fissi
- Il volto dell'ing. non compare mai, niente dirette. **Unica eccezione (consenso dell'ing. del 9/11):** la sua foto davanti al Tower Bridge, solo nell'episodio «Meraviglie dell'ingegneria» sul Tower Bridge.
- Prezzi, preventivi e pareri su casi reali non si pubblicano.
- Ogni video ha foto sue: la stessa foto di cantiere non si riusa. Sfoca nomi di committenti, imprese, fornitori e numeri di pratica.
- Obiettivo al 31/12/2026: 50.000 follower su Instagram e 5.000 iscritti su YouTube.
- Le pubblicazioni sui canali dell'ing. si programmano solo con il suo ok in chat, oppure dalle attività automatiche come previsto dai loro testi.
