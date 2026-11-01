# Social @ing.belcastro – Guida operativa (parti da qui)

Questo progetto ("Social_ing.belcastro") è **l'unico posto** dove teniamo i contenuti social di Instagram, YouTube e Facebook: strategia, planning, testi, copioni e procedure. Il 31/10/2026 tutti i documenti del vecchio progetto "Contenuti social" sono stati copiati qui, e questo lo sostituisce.
Ultimo aggiornamento: 31/10/2026, ore 19:45.
**Cosa è uscito e cosa viene dopo: `01-STATO-E-PLANNING.md`. Scaletta, temi e calendario fino al 31/12: `03-PIANO-EDITORIALE-NOV-DIC.md` (prevale sulle regole qui sotto dove sono diverse). Come si montano i video lunghi e quali foto sono già usate: `04-MOTORE-VIDEO-E-FOTO.md`.**

## ★ Regole in vigore dal 2/11/2026 (prevalgono sul resto della guida)

- **Settimana tipo:** lun carosello IG+FB · mar reel IG + Short YT con la voce dell'ing. (annuncia il video) · mer video lungo ~8 min YT+FB · gio carosello · ven reel + Short · sab video lungo · dom riposo (Claude prepara la settimana dopo).
- **Orari (test): novembre tutto alle 19:00, dicembre tutto alle 9:30.**
- **Ogni pubblicazione ha la didascalia completa ed ESATTAMENTE 5 hashtag chiave.** I video YouTube hanno anche titolo, descrizione con capitoli e fonti, tag.
- **Vocali:** video del mercoledì entro lunedì ore 12:00; video del sabato entro giovedì ore 12:00. Un file per blocco del copione. Dallo stesso vocale Claude ricava il reel/Short di ~30 s con la voce.
- **Video lunghi:** motore dinamico `_motore/video2.py` (una scena animata per frase, a tempo con la voce, foto reali nel layout del canale). Si parte direttamente con la sigla V0, niente anteprime rumorose, musica molto bassa, finale completo. Dettagli in `04-MOTORE-VIDEO-E-FOTO.md`.
- **Foto: ogni video ha immagini sue, la stessa foto di cantiere non si riusa in un altro video.** Nelle foto dei cantieri si sfocano nomi di committenti, imprese, fornitori e numeri di pratica.
- **Musica:** il nostro beat originale (lo-fi/elettronico 100 BPM) dentro i file.
- **Notizie flash:** controllo ogni mattina alle 7:06; con fonte ufficiale sostituiscono in automatico carosello o reel del giorno.
- **Produzione:** ogni domenica alle 10:17 una sessione automatica prepara e programma la settimana dopo e manda i copioni.

## ★ Dove stanno i file (per Metricool)

Metricool pubblica da solo all'orario programmato, anche a PC spento: basta che il file sia online quando si programma.
1. **Repository GitHub pubblico `ingbelcastro-social/ingbelcastro-social`** (collegato il 31/10, provato con immagine e video fino a Metricool): si collega alla sessione con add_repo (access push), si clona in /home/claude/ingbelcastro-social, i file vanno in `media/AAAA-MM-GG/` con commit e push su main, e su Metricool si usa il link `https://raw.githubusercontent.com/ingbelcastro-social/ingbelcastro-social/main/media/AAAA-MM-GG/<file>`. Quando si sostituisce un file si usa un nome nuovo (cache). Il motore grafico è in `_motore/` (piani di scena di esempio in `_motore/piani/`). È la strada principale: funziona dal cloud anche a PC spento.
2. **Cartella Google Drive** «000. Social ing.belcastro» (id 123KVizDH93RHa6-H7ksx7CkAGIT5N77E, condivisa con chi ha il link): link `https://drive.google.com/file/d/<ID>/view`. Dal cloud ci si può caricare solo passando dal PC acceso (Google Drive per desktop). Motore grafico in `_motore/`.

## 0. Le regole base

**Obiettivo al 31/12/2026: 50.000 follower su Instagram e 5.000 iscritti su YouTube** (le tappe sono nel planning). Obiettivo di lungo periodo del progetto: 1 milione, ed essere i primi a dare le notizie.

**Vincoli fissi:** l'ing. Belcastro non mostra il volto e non fa dirette.

**Gestione:** dal 31/10/2026 Claude gestisce la pubblicazione tramite **Metricool** (brand id 7777116, fuso Europe/Rome), collegato a Instagram @ing.belcastro, alla Pagina Facebook e al canale YouTube. Claude programma, controlla e registra; prezzi, preventivi, pareri su casi reali e temi legali restano all'ing. Belcastro.

**Storie:** ogni giorno (le fa l'ing. dall'app). Il lunedì box «Le domande della settimana».

**YouTube:** video lungo ~8 minuti ogni giorno B (vedi scaletta). Da fare a mano in YouTube Studio (Metricool non lo gestisce): schermata finale, playlist, commento fissato.

| | Reel (Instagram) | Video lungo (YouTube + Facebook) |
|---|---|---|
| Durata | **30 secondi** | ~8 minuti |
| Ruolo | Il gancio: il punto chiave detto in breve | L'estensione: la spiegazione completa |
| Chiusura | «Scrivimi in DM»; nei giorni con video, in didascalia «Video completo su YouTube · link in bio» | Iscriviti · scrivimi su Instagram o per email |
| Audio | Il nostro beat già nel file | La tua voce + la versione morbida del nostro beat |

## 1. Musica

- **Il nostro beat:** originale lo-fi/elettronico a 100 BPM in La minore, già dentro il file dei reel (−14 LUFS). Sotto la voce nei video lunghi va la versione morbida (a −36 dB sotto la voce; mix finale −16 LUFS). Niente reclami per copyright.
- In alternativa, per singoli reel, Metricool può agganciare un brano del catalogo Instagram (account business collegato alla Pagina).

## 2. Link rapidi

| Cosa | Dove |
|---|---|
| Pannello (settimana 29/10–4/11, storico) | https://claude.ai/artifact/VCmpt2epEtvBKtEXm1zQrQ |
| Copioni YouTube (documento) | https://claude.ai/artifact/65YoixriT2soeUEchHhfL6 |
| Slide modificabili (Design) | https://claude.ai/artifact/JXdZWCMTxxmvAHkffwxmny |
| Strategia originale (modificabile) | https://claude.ai/artifact/U3uo2zesKXc9mCmYngUptw |
| Canale YouTube | https://www.youtube.com/@ing.belcastro |
| Instagram | https://www.instagram.com/ing.belcastro |

**Documenti in questo progetto**
- `00-LEGGIMI-guida-operativa.md`: questa guida.
- `01-STATO-E-PLANNING.md`: obiettivo, tappe, cosa è programmato.
- `03-PIANO-EDITORIALE-NOV-DIC.md`: scaletta, temi settimanali, calendario fino al 31/12.
- `04-MOTORE-VIDEO-E-FOTO.md`: come si montano i video lunghi, archivio delle foto già usate.
- `strategia/strategia.md`: posizionamento, pilastri, testi dei profili, regole per commenti e DM, metriche.
- `instagram/pannello-settimana-29ott-4nov.md`: didascalie della prima settimana.
- `youtube/copioni-…md`: copioni dei video.
- `youtube/video-1-pubblicazione.md`: scheda del Video 1.
- `notizie/AAAA-MM-GG.md`: resoconto del controllo notizie di ogni mattina.

## 3. Ogni giorno

**Claude (via Metricool):** pubblicazioni secondo la scaletta, dopo il controllo qualità (sezione 6). Ogni lunedì aggiorna la tabella delle tappe con le statistiche.

**Tu:**
1. Nella prima ora rispondi ai commenti (o mandami lo screenshot per la bozza).
2. Storia del giorno (sondaggio, domanda o link al video YouTube).
3. I vocali dei video entro le 12:00 del giorno prima.

## 4. Pubblicare un reel (checklist tecnica)

- Formato verticale 9:16, 1080×1920, MP4 H.264, 30 fps, **30 secondi**, audio AAC.
- Testi e invito all'azione nella zona centrale (in alto ~250 px e in basso ~350 px finiscono sotto l'interfaccia). Leggibile anche nel ritaglio 4:5 del feed e 3:4 della griglia.
- Copertina con il titolo grande (fotogramma scelto da Metricool; dopo la pubblicazione non si cambia).
- Nessun watermark di altre piattaforme. Didascalia con parole chiave ed esattamente 5 hashtag. «Condividi anche nel feed» attivo.

## 5. Video YouTube – dal vocale alla pubblicazione

1. Il copione è nel progetto entro la domenica, con norme e date verificate.
2. **Registra** un memo vocale per blocco (es. V4-01 … V4-15): 1 secondo di silenzio all'inizio, 2 alla fine; stanza piccola, telefono a 15–20 cm, leggermente di lato; se sbagli, rifai il blocco intero.
3. **Invia** i file in chat scrivendo *"vocali Video N"*, con eventuali foto di cantiere sul tema.
4. Claude consegna e programma su YouTube e Facebook: video montato nel formato del canale (sigla, logo), miniatura, titolo, descrizione con capitoli e fonti, 5 hashtag, tag, commento da fissare.

## 6. Controllo qualità prima di ogni pubblicazione

- [ ] Ogni dato normativo o fiscale ha **fonte e data**, verificate nella settimana di pubblicazione
- [ ] È detto chiaramente se si tratta di una **proposta** (DDL) o di una **legge in vigore**
- [ ] Reel da **30 secondi**, gancio nei primi 2 secondi (ffprobe: durata, 1080×1920, 30 fps, audio)
- [ ] Video lungo intorno agli 8 minuti: testo a tempo con la voce, nessuna sovrapposizione, finale completo, −16 LUFS
- [ ] Nessuna foto già usata in un altro video; dati personali sfocati
- [ ] Caroselli: fonte e «Il post non sostituisce una consulenza» nella penultima slide, «Scrivimi in DM» nell'ultima
- [ ] Didascalia completa ed **esattamente 5 hashtag**
- [ ] Nessun doppione: controllo del calendario Metricool e di quanto già programmato dall'app
- [ ] Nei commenti nessun parere su casi specifici: si rimanda in DM o all'email

## 7. Cosa scrivere a Claude

| Scrivi | Cosa succede |
|---|---|
| "prepara la settimana" | Claude prepara e programma subito la settimana dopo (lo fa comunque da solo ogni domenica) |
| "vocali Video N" + file audio | Video montato, miniatura, testi, programmato su YouTube e Facebook |
| "vai" (dopo l'avviso delle notizie) | Post notizia preparato e programmato |
| "rispondi a questo commento" + screenshot | Bozza di risposta |

## 8. Commenti e DM in breve

Si risponde a tutti entro 24 ore; le prime 2 ore contano di più.
- **Domanda generale**: risposta breve, poi rimando al post o al video utile.
- **Caso specifico**: "Dipende dai documenti: scrivimi in DM o per email e vediamo."
- **Preventivo**: chiedi città e tipo di lavoro, poi sposta la conversazione in DM, al telefono o all'email (ing.belcastro@hotmail.com).
- **Critica fondata**: ringrazia, correggi e fissa la correzione.
- **Spam o polemica**: nascondi o elimina.

Prezzi, preventivi, pareri su casi reali e temi legali li decidi sempre tu.

## 9. Registro decisioni

- **30/10**: data del CdM sulla Manovra 2027 verificata (28 ottobre 2026).
- **30/10**: posizionamento allargato a tutta l'ingegneria; slogan "Non è magia, è semplice ingegneria"; 5 pilastri.
- **31/10**: Video 1 pubblicato su YouTube (5:22). Sigla definitiva senza scritte.
- **31/10**: obiettivo 50.000 follower su Instagram e 5.000 iscritti su YouTube al 31/12; niente volto e niente dirette.
- **31/10**: reel da **30 secondi**; musica originale (beat lo-fi/elettronico a 100 BPM).
- **31/10**: tutto il lavoro passa nel progetto "Social_ing.belcastro".
- **31/10, 12:50**: Metricool collegato (Instagram, Pagina Facebook, YouTube). La pubblicazione la gestisce Claude.
- **31/10, 14:35**: primo Short YouTube pubblicato da Metricool (youtube.com/shorts/8WQBi3cmnCI).
- **31/10, 15:00**: nuova scaletta 7 su 7 (carosello IG+FB / reel IG + video lungo YT+FB), tema settimanale, orari 19-17-15, piano fino al 31/12. Notizie flash con sostituzione automatica se la fonte è ufficiale. Produzione automatica il giovedì.
- **31/10, 16:15**: settimana tipo con 2 video lunghi (mer, sab) e reel con la voce il giorno prima; domenica riposo e produzione; orari unici: novembre 19:00, dicembre 9:30.
- **31/10, 15:20**: ogni pubblicazione con didascalia ed esattamente 5 hashtag chiave. Per lavorare a PC spento si usa il repository GitHub pubblico ingbelcastro-social/ingbelcastro-social (provato con immagine e video).
- **31/10, 19:00**: video lunghi rifatti col motore dinamico (una scena per frase, audio per blocco, foto reali). L'ing. approva i video 2 e 3; regola: nessuna foto di cantiere ripetuta tra un video e l'altro.

## 10. Punti aperti

- [x] Repository GitHub pubblico `ingbelcastro-social/ingbelcastro-social` collegato e provato fino a Metricool (31/10)
- [x] Short YouTube da 30 s con musica rifatti e programmati (31/10)
- [x] Reel dell'1/11 e del 3/11 rifatti da 30 s con audio e programmati da Metricool (31/10)
- [x] Calendario fino al 31/12 in `03-PIANO-EDITORIALE-NOV-DIC.md`
- [ ] Verificare il link YouTube → Instagram in YouTube Studio e il primo link della bio Instagram
- [ ] Ridurre gradualmente i profili seguiti sotto i 500
- [ ] Lista di 10 pagine per le collaborazioni (entro il 9/11)
- [ ] Nuove foto di cantiere per argomento (bagni, impianti, facciate, strutture, documenti) per i prossimi video
