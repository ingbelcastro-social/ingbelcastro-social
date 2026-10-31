# Piano scene Video 4 – Stato legittimo / comprare casa (audio per blocco V4-1…V4-12, tempi dall'inizio di ogni blkNN.m4a)
# Immagini proprie di questo video (nessuna foto riusata dai video 2 e 3): planimetrie disegnate.
D = '/home/claude/v4n/'
PP, PR, PC = D + 'pianta-progetto.jpg', D + 'pianta-reale.jpg', D + 'pianta-catasto.jpg'
TITLE = 'Stai comprando casa? I controlli prima del compromesso'
SIGLA = {'audio': '/home/claude/v2/V0b.m4a', 'cut': 9.6, 'cues': {'magia': 1.4, 'naa': 2.42, 'ing': 3.7, 'nome': 5.9, 'titolo': 7.45}}
BED = '/home/claude/v2/bed.wav'
KB = (1.0, 1.07, 0, 0)
BLOCKS = [
 {'cap': 'Introduzione', 'audio': D + 'blk01.m4a', 'scenes': [
   {'t': 0, 'type': 'listing', 'img': D + 'pianta-annuncio.jpg', 'kick': 'Hai trovato la casa giusta', 'hl_t': 2.5},
   {'t': 4.9, 'type': 'kin', 'kick': 'Prima di firmare il compromesso', 'lines': [(0.5, '5 [[documenti]]'), (2.4, '+ 1 controllo')], 'size': 150, 'sub': 'che quasi nessuno fa', 'sub_t': 3.6},
   {'t': 11.5, 'type': 'kin', 'lines': [(0.2, 'Quello che, dopo,'), (1.4, 'può [[costarti di più]]')], 'size': 120},
   {'t': 15.1, 'type': 'check', 'kick': 'Vediamo insieme', 'title': 'In questo video', 'items': [(0.5, 'Cosa controllare'), (1.4, 'Quali documenti chiedere'), (2.3, 'Come proteggerti nel compromesso')]}]},
 {'cap': 'Stato legittimo', 'audio': D + 'blk02.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'kick': 'Il controllo più importante', 'lines': [(2.1, 'Lo stato'), (2.6, '[[legittimo]]')], 'size': 170},
   {'t': 5.3, 'type': 'photo', 'img': '/home/claude/foto/pianta-misure-169.jpg', 'kick': 'In parole semplici', 'title': 'La versione\n[[ufficiale]]\ndella casa', 'size': 110, 'kb': KB},
   {'t': 8.4, 'type': 'icons', 'kick': 'Risulta dai titoli edilizi depositati in Comune', 'items': [(3.8, 'contratto', 'Licenza / Permesso', 'con cui è stata costruita'), (7.0, 'martello', 'CILA · SCIA', 'lavori fatti dopo'), (9.4, 'firma', 'Condoni', 'se presenti')]},
   {'t': 21.8, 'type': 'photo', 'img': PR, 'kick': 'Casa reale ≠ progetto', 'title': '= [[difformità]]', 'size': 130, 'kb': KB}]},
 {'cap': 'Il catasto', 'audio': D + 'blk03.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'lines': [(0.3, 'Il primo'), (0.8, '[[equivoco]]')], 'size': 170},
   {'t': 2.9, 'type': 'photo', 'img': PC, 'kick': 'Molti pensano', 'title': '«La planimetria\ncatastale corrisponde,\nè [[tutto a posto]]»', 'size': 84, 'kb': KB},
   {'t': 8.4, 'type': 'photo', 'img': '/home/claude/foto/mappa-catastale-169.jpg', 'kick': 'Il catasto serve a fini fiscali', 'title': '[[NO.]]', 'size': 220, 'kb': (1.0, 1.1, 20, 0), 'sub': 'Non dimostra che la casa sia regolare', 'sub_t': 1.4},
   {'t': 13.4, 'type': 'icons', 'kick': 'Due conformità diverse', 'items': [(0.6, 'regione', 'Catastale', 'la verifica il notaio'), (4.0, 'contratto', 'Edilizia', 'va controllata a parte, sui progetti in Comune')]}]},
 {'cap': 'Chi controlla cosa', 'audio': D + 'blk04.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'lines': [(0.2, 'Chi controlla'), (0.9, '[[cosa]]?')], 'size': 160},
   {'t': 3.4, 'type': 'icons', 'kick': 'Al rogito', 'items': [(0.2, 'firma', 'Notaio', 'proprietà, ipoteche, catasto'), (5.2, 'euro', 'Perito banca', 'stima il valore per il mutuo'), (9.2, 'x', 'Conformità edilizia', 'nessuno dei due, di regola')]},
   {'t': 18.8, 'type': 'kin', 'kick': 'Quel controllo lo fa solo', 'lines': [(0.6, 'Un tecnico'), (1.3, 'che incarichi [[tu]]')], 'size': 130, 'sub': 'Se non lo chiedi, nessuno lo fa al posto tuo.', 'sub_t': 3.6}]},
 {'cap': 'I 5 documenti', 'audio': D + 'blk05.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'kick': 'Prima di firmare chiedi al venditore', 'lines': [(1.2, '5 [[documenti]]')], 'size': 200},
   {'t': 4.5, 'type': 'check', 'kick': 'La lista', 'title': 'I 5 documenti', 'size': 90, 'items': [(0.2, '1 · Titoli edilizi: progetti e pratiche dal Comune'), (5.5, '2 · Agibilità: certificato o SCA'), (10.8, '3 · Planimetria e visura catastale aggiornate'), (14.6, '4 · APE, obbligatorio per vendere'), (18.6, '5 · Spese di condominio e lavori deliberati')]},
   {'t': 31.0, 'type': 'kin', 'lines': [(0.1, 'Uno per [[uno]]')], 'size': 150}]},
 {'cap': 'Agibilità', 'audio': D + 'blk06.m4a', 'scenes': [
   {'t': 0, 'type': 'icons', 'kick': "L'agibilità attesta", 'title': 'Agibilità', 'size': 110, 'items': [(1.8, 'scudo', 'Sicurezza', ''), (2.8, 'goccia', 'Igiene e salubrità', ''), (4.3, 'fiamma', 'Risparmio energetico', ''), (6.5, 'contratto', 'Conforme al progetto', '')]},
   {'t': 9.5, 'type': 'kin', 'kick': 'Oggi si ottiene con la', 'lines': [(0.5, '[[SCA]]')], 'size': 220, 'sub': 'segnalazione certificata per l’agibilità, in Comune a fine lavori', 'sub_t': 1.5},
   {'t': 17.9, 'type': 'kin', 'kick': 'Senza agibilità', 'lines': [(0.3, 'Si può vendere'), (3.0, 'il rogito è [[valido]]')], 'size': 120},
   {'t': 23.1, 'type': 'warn', 'title': 'Ma è un rischio', 'sub': 'Mutuo più difficile · valore più basso\nproblemi quando [[rivendi]]', 'sub_t': 1.2},
   {'t': 30.5, 'type': 'kin', 'kick': 'Se manca', 'lines': [(0.4, 'Fai verificare'), (1.2, 'da un [[tecnico]]')], 'size': 130}]},
 {'cap': 'APE e condominio', 'audio': D + 'blk07.m4a', 'scenes': [
   {'t': 0, 'type': 'classes', 'kick': "L'APE ti dice quanto consuma", 'title': 'Dalla A4 alla G', 'size': 100, 'sub': 'Va consegnato e allegato al contratto', 'sub_t': 6.6},
   {'t': 10.3, 'type': 'kin', 'kick': 'Il condominio', 'lines': [(0.6, 'La sorpresa più [[frequente]]')], 'size': 110},
   {'t': 14.3, 'type': 'timeline', 'kick': 'Per legge chi compra risponde, insieme al venditore', 'title': 'Spese condominiali', 'size': 100, 'grow_d': 4,
    'marks': [(1.0, 0.0, 'Anno precedente', 'rispondi anche tu'), (3.0, 0.5, 'Anno in corso', 'rispondi anche tu'), (6.4, 1.0, 'Lavori deliberati', 'chi li paga?')]},
   {'t': 25.1, 'type': 'check', 'kick': "Chiedi all'amministratore", 'title': 'Una dichiarazione', 'items': [(1.0, 'Spese arretrate'), (1.8, 'Lavori già approvati'), (2.8, 'Tutto scritto nel compromesso')]}]},
 {'cap': 'Difformità', 'audio': D + 'blk08.m4a', 'scenes': [
   {'t': 0, 'type': 'photo', 'img': '/home/claude/foto/tramezzo-nuovo-169.jpg', 'kick': 'Torniamo allo stato legittimo', 'title': 'Le difformità\npiù [[frequenti]]', 'size': 120, 'kb': (1.04, 1.14, -20, 0)},
   {'t': 7.2, 'type': 'icons', 'kick': 'Quelle che trovo più spesso', 'items': [(0.1, 'martello', 'Parete spostata', 'senza pratica'), (2.2, 'infissi', 'Veranda', 'chiusa sul balcone'), (4.2, 'goccia', 'Bagno', 'al posto del ripostiglio'), (6.4, 'infissi', 'Finestra', 'allargata'), (9.4, 'casa', 'Sottotetto', 'diventato mansarda')]},
   {'t': 19.3, 'type': 'photo', 'img': PR, 'kick': 'Lavori di un vecchio proprietario', 'title': 'Comprando casa,\nil problema\ndiventa [[tuo]]', 'size': 104, 'kb': KB}]},
 {'cap': 'Un caso tipo', 'audio': D + 'blk09.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'kick': 'Un esempio, nomi di fantasia', 'lines': [(2.2, 'Laura'), (3.0, 'trilocale con [[veranda]]')], 'size': 120},
   {'t': 8.7, 'type': 'kin', 'kick': 'Il venditore', 'lines': [(1.4, '«È sempre stato così»')], 'size': 110},
   {'t': 11.9, 'type': 'photo', 'img': PP, 'kick': 'Accesso agli atti: il progetto', 'title': 'La veranda\n[[non c’è]]', 'size': 130, 'kb': KB, 'sub': 'in nessuna pratica', 'sub_t': 2.8},
   {'t': 17.6, 'type': 'icons', 'kick': 'Due strade', 'items': [(2.1, 'ok', 'Sanabile', 'il venditore regolarizza prima del rogito'), (5.4, 'x', 'Non sanabile', 'va rimossa')]},
   {'t': 26.4, 'type': 'kin', 'kick': 'Laura lo scopre prima di firmare', 'lines': [(0.6, 'Decide con [[calma]]')], 'size': 130, 'sub': 'Dopo, sarebbe stato un problema suo.', 'sub_t': 4.1}]},
 {'cap': 'Salva Casa', 'audio': D + 'blk10.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'kick': 'Decreto 2024', 'lines': [(0.5, 'Salva [[Casa]]')], 'size': 200},
   {'t': 5.7, 'type': 'kin', 'kick': 'Lavori fino al 24 maggio 2024', 'lines': [(0.4, 'Tolleranze più [[ampie]]')], 'size': 120, 'sub': 'per le piccole differenze di misura', 'sub_t': 1.5},
   {'t': 13.4, 'type': 'counter', 'kick': 'Tolleranza', 'title': 'dal 2% per le unità grandi', 'from': 2, 'to': 6, 'suf': '%', 'count_t': 2.4, 'count_d': 2.0, 'unit': 'sotto i 60 m²', 'icon': 'metro'},
   {'t': 19.5, 'type': 'kin', 'kick': 'Anche', 'lines': [(0.4, 'Sanatoria più [[accessibile]]')], 'size': 110, 'sub': 'per le difformità parziali', 'sub_t': 2.5},
   {'t': 25.0, 'type': 'warn', 'title': 'Attenzione', 'sub': 'Tolleranza non vuol dire che tutto si sistema.\nGli abusi veri [[restano abusi]].', 'sub_t': 1.3}]},
 {'cap': 'La verifica', 'audio': D + 'blk11.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'lines': [(0.2, 'Come si fa la'), (0.8, '[[verifica]]?')], 'size': 150},
   {'t': 3.3, 'type': 'timeline', 'kick': 'Il percorso', 'title': 'Accesso agli atti', 'size': 96, 'grow_d': 14,
    'marks': [(0.3, 0.0, 'Richiesta', 'in Comune'), (5.0, 0.5, 'Progetti e pratiche', 'dell’immobile'), (8.6, 1.0, '30 giorni', 'spesso settimane: muoviti per tempo')]},
   {'t': 19.3, 'type': 'photo', 'img': '/home/claude/foto/sopralluogo-misure-169.jpg', 'kick': 'Poi il sopralluogo', 'title': 'Reale vs\n[[approvato]]', 'size': 130, 'kb': (1.0, 1.1, -30, 0), 'sub': 'misure comprese', 'sub_t': 2.5},
   {'t': 25.9, 'type': 'icons', 'kick': 'Alla fine ti dice', 'items': [(0.3, 'ok', 'Conforme', ''), (1.8, 'martello', 'Difformità sanabili', 'e cosa serve'), (4.6, 'warn', 'Problemi seri', '')]}]},
 {'cap': 'Quando farla', 'audio': D + 'blk12.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'kick': 'Il momento giusto', 'lines': [(0.3, 'Prima del'), (0.9, '[[compromesso]]')], 'size': 150, 'sub': 'oppure con una clausola: valido solo se la verifica va bene', 'sub_t': 3.5},
   {'t': 10.8, 'type': 'kin', 'lines': [(0.1, 'Dopo la firma'), (1.0, 'hai meno [[potere]]')], 'size': 130},
   {'t': 14.3, 'type': 'icons', 'kick': 'Se la trovi prima', 'items': [(1.5, 'martello', 'Sanatoria', 'a spese del venditore'), (5.5, 'prezzo', 'Trattativa', 'sul prezzo')]}]},
 {'cap': 'Il compromesso', 'audio': D + 'blk13.m4a', 'scenes': [
   {'t': 0, 'type': 'check', 'kick': 'Nel compromesso fai scrivere', 'title': 'Poche righe chiare', 'size': 90, 'items': [(3.2, 'Garanzia di regolarità edilizia e catastale'), (7.3, 'Consegna dei documenti entro una data'), (10.7, 'Chi paga condominio e lavori deliberati'), (13.8, 'Difformità: le sistema il venditore, o recedi e riavi la caparra')]},
   {'t': 25.7, 'type': 'kin', 'lines': [(0.1, 'Valgono'), (0.8, '[[moltissimo]]')], 'size': 160}]},
 {'cap': 'I rischi', 'audio': D + 'blk14.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'kick': 'Se non la fai', 'lines': [(0.5, 'Rischi [[concreti]]')], 'size': 150},
   {'t': 4.2, 'type': 'icons', 'kick': 'Cosa può succedere', 'items': [(0.2, 'martello', 'Ristrutturare', 'nessuna pratica su casa non conforme'), (6.1, 'euro', 'Bonus edilizi', 'persi'), (9.0, 'vendita', 'Rivendere', 'sistemare tutto tocca a te')]}]},
 {'cap': 'Riassumendo', 'audio': D + 'blk15.m4a', 'scenes': [
   {'t': 0, 'type': 'check', 'kick': 'Riassumendo', 'title': 'Prima del compromesso', 'size': 96, 'items': [(0.9, 'Il catasto non basta'), (2.9, '5 documenti: titoli, agibilità, catasto, APE, condominio'), (11.1, 'Stato legittimo verificato da un tecnico'), (16.3, 'Spesa piccola rispetto al valore della casa')]},
   {'t': 19.6, 'type': 'cta', 'title': 'Stai comprando casa?', 'sub': 'Scrivimi su Instagram [[@ing.belcastro]] o per email', 'btn': 'Iscriviti e salva il video', 'btn_t': 4.0}]},
]
