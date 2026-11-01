# Attività pianificate (claude.ai/code)

| Attività | Orario (Europe/Rome) | Testo |
|---|---|---|
| Notizie flash ogni mattina (sostituzione automatica) | ogni giorno 7:06 | `A-notizie-flash-prompt.txt` |
| Produzione settimanale social (domenica) | domenica 10:17 | `B-produzione-settimanale-prompt.txt` |

Impostazioni: modello Opus 5.5 · repository `ingbelcastro-social/ingbelcastro-social` · ambiente cloud Default · connettori Metricool e Google Drive.

Differenze rispetto alle vecchie attività Cowork: i documenti si leggono e si scrivono in `progetto/` del repository (con push su `main`) invece che nel progetto claude.ai; la riserva Drive usa il connettore Google Drive, non la cartella del PC.
