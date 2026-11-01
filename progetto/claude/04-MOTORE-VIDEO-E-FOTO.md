# Motore dei video lunghi e archivio foto (dal 31/10/2026)

## Il motore: `_motore/video2.py` (repository GitHub)

Video "dinamico": una scena animata per ogni frase della voce, non slide fisse. Uso:
`python3 video2.py piano.py out.mp4` (anteprima di singoli istanti: `PREVIEW=12,45,90 python3 video2.py piano.py prev/p`).

1. **Audio:** un file per blocco del copione (V4-01, V4-02…), dall'ing. Belcastro. Se il primo blocco ripete «Oggi parleremo di…», si taglia: lo dice già la sigla V0.
2. **Tempi delle frasi:** `python3 align.py blkNN.m4a "testo del blocco"` stampa l'inizio di ogni frase (conta le sillabe e aggancia le pause, senza riconoscimento vocale).
3. **Piano di scene** (`piano.py`): TITLE, SIGLA, BED, BLOCKS con `cap`, `audio`, `scenes`. Esempi completi in `_motore/piani/` (V2 APE, V3 Direttore lavori, V4 Stato legittimo).
4. **Tipi di scena:** `kin` (parole cinetiche), `photo` (foto con Ken Burns), `icons`, `counter`, `classes` (classi energetiche), `doc` (APE), `timeline`, `warn`, `compare`, `cards`, `check`, `listing` (annuncio), `cta`.
5. **Audio finale:** sigla V0 + blocchi, voce ripulita, beat morbido a −36 dB, −16 LUFS.
6. **Capitoli YouTube:** il primo è sempre `0:00 Introduzione`. La sigla dura meno di 10 s e YouTube scarta i capitoli se il primo è troppo corto.
7. **Controllo:** fotogrammi a campione (testi leggibili, niente sovrapposizioni), durata, loudness (−16 LUFS, picco ≤ −1,5 dBTP).

## Regola foto (richiesta dell'ing. Belcastro, 31/10)

**Ogni video ha immagini sue: la stessa foto di cantiere non si riusa in un altro video.** Foto dei clienti: sfocare nomi di committenti, imprese, fornitori e numeri di pratica. Foto dal web solo con licenza libera (Pexels, Wikimedia); in questo ambiente quei siti sono bloccati, quindi si usano le foto dell'ing. e grafiche disegnate.

Archivio: `/home/claude/foto/` (originali + ritagli 16:9 `*-169.jpg`), copia in GitHub `_motore/foto/`.

| Foto | Usata in |
|---|---|
| foto-prima-1/2, foto-dopo-1/2, stanza vecchia con pavimento graniglia | Video 1 (non riusare) |
| render-palazzo, render-villa, cantiere-impianti, facciata-bianca-cestello, consegna-casa, facciata-arancio-balconi, interno-finito-scala, render-terrazza | Video 2 APE |
| ponteggio verde, cartello di cantiere (sfocato), tetto con coppi, frontalini-gru, cad-computo, ponteggio-palazzo, demolizione-tramezzo | Video 3 Direttore lavori |
| pianta-misure, mappa-catastale, tramezzo-nuovo, sopralluogo-misure, planimetrie disegnate | Video 4 Stato legittimo |
| **Non usare mai:** le due foto della serata con amici; la foto di Londra (volti e targa); le schede Weber dei sacchi | — |
| *Libere per i prossimi video:* nessuna. Chiedere foto nuove per argomento (bagni, impianti, facciate, strutture, documenti) | — |
