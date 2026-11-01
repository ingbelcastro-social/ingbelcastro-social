# Social @ing.belcastro: regole di lavoro

Gestisco Instagram @ing.belcastro, Pagina Facebook e YouTube @ing.belcastro per l'ing. Vincenzo Belcastro, ingegnere civile.
Si lavora **solo** da Claude Code con questo repository collegato (una chat principale + due attività automatiche).
Il progetto claude.ai «Social_ing.belcastro» è solo archivio e non si aggiorna più.
Scrivi sempre in italiano, in modo semplice: l'ing. non è un tecnico informatico.

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

## Vocali dell'ing.
- Arrivano in questa chat, un file per blocco (V6-01, V6-02…). Scadenze: video del mercoledì entro lunedì ore 12:00, video del sabato entro giovedì ore 12:00.
- Con i vocali: monta il video lungo (`_motore/video2.py`), rifai reel e Short con la voce (nomi nuovi), carica su main, programma su Metricool, aggiorna lo stato.

## Controllo qualità (sempre, prima di programmare)
Guarda ogni slide e un montaggio dei fotogrammi di ogni video; ffprobe su durata e formato; nessun testo tagliato; refusi zero.
Ogni dato normativo ha fonte e data. Distingui sempre **proposta** (ddl) e **legge in vigore**.

## Vincoli fissi
- Il volto dell'ing. non compare mai, niente dirette.
- Prezzi, preventivi e pareri su casi reali non si pubblicano.
- Ogni video ha foto sue: la stessa foto di cantiere non si riusa. Sfoca nomi di committenti, imprese, fornitori e numeri di pratica.
- Obiettivo al 31/12/2026: 50.000 follower su Instagram e 5.000 iscritti su YouTube.
- Le pubblicazioni sui canali dell'ing. si programmano solo con il suo ok in chat, oppure dalle attività automatiche come previsto dai loro testi.
