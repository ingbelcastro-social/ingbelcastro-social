# Piano scene Video 3 – Direttore dei lavori (tempi in s dall'inizio di ogni file V3-xx)
D = '/home/claude/v3n/'; F = '/home/claude/v2n/'
PG, CT, TT = D + 'ponteggio-169.jpg', D + 'cartello-169.jpg', D + 'tetto-169.jpg'
P1, P2, D1, D2 = F + 'foto-prima-1.jpg', F + 'foto-prima-2.jpg', F + 'foto-dopo-1.jpg', F + 'foto-dopo-2.jpg'
TITLE = 'Direttore dei lavori: è solo un costo?'
SIGLA = {'audio': '/home/claude/v2/V0b.m4a', 'cut': 9.6, 'cues': {'magia': 1.4, 'naa': 2.42, 'ing': 3.7, 'nome': 5.9, 'titolo': 7.45}}
BED = '/home/claude/v2/bed.wav'
BLOCKS = [
 {'cap': 'Introduzione', 'audio': D + 'blk01.m4a', 'scenes': [
   {'t': 0, 'type': 'photo', 'img': PG, 'kick': 'Cantiere', 'title': 'Il direttore\ndei lavori', 'size': 150, 'kb': (1.05, 1.18, -40, 10)},
   {'t': 3.9, 'type': 'kin', 'kick': 'Molti lo vedono come', 'lines': [(0.3, 'Un costo in più'), (1.6, 'Una [[firma]] da pagare')], 'size': 120},
   {'t': 7.9, 'type': 'icons', 'kick': 'Io la vedo diversamente', 'title': "L'unica persona che lavora per te", 'size': 84, 'items': [(1.5, 'casco', 'In cantiere', ''), (4.5, 'lente', 'Controlla', 'che quello che paghi sia fatto bene')]},
   {'t': 17.0, 'type': 'check', 'kick': 'Vediamo', 'title': 'In questo video', 'items': [(0.6, 'Cosa fa davvero'), (1.6, 'Quando è obbligatorio'), (2.6, 'Come sceglierlo')]}]},
 {'cap': 'Chi è', 'audio': D + 'blk02.m4a', 'scenes': [
   {'t': 0, 'type': 'icons', 'kick': 'Un tecnico abilitato', 'title': 'Chi è', 'size': 110, 'items': [(2.6, 'casco', 'Ingegnere', ''), (3.6, 'casco', 'Architetto', ''), (4.6, 'casco', 'Geometra', 'nei limiti delle competenze')]},
   {'t': 8.5, 'type': 'kin', 'kick': 'Lo incarica il committente', 'lines': [(0.4, 'Cioè [[tu]]')], 'size': 190},
   {'t': 12.9, 'type': 'photo', 'img': CT, 'kick': "Non lavora per l'impresa", 'title': 'Rappresenta\n[[te]]', 'size': 130, 'kb': (1.0, 1.06, 0, 0)},
   {'t': 16.6, 'type': 'icons', 'kick': 'Tre figure diverse, spesso confuse', 'items': [(1.0, 'scudo', 'Direttore lavori', 'lavora per te'), (2.8, 'casco', 'Capocantiere', "è dell'impresa"), (5.0, 'warn', 'Coord. sicurezza', 'sicurezza dei lavoratori')]}]},
 {'cap': 'Quando è obbligatorio', 'audio': D + 'blk03.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'lines': [(0.3, 'Quando è'), (0.7, '[[obbligatorio]]?')], 'size': 150},
   {'t': 2.7, 'type': 'icons', 'kick': 'Obbligatorio con', 'items': [(0.4, 'contratto', 'Permesso di costruire', 'nome comunicato al Comune'), (7.4, 'contratto', 'SCIA', 'nella pratica'), (10.6, 'mattone', 'Strutture', 'armature, getti, prove')]},
   {'t': 22.2, 'type': 'kin', 'kick': 'Con la CILA', 'lines': [(0.6, '[[Facoltativo]]')], 'size': 180, 'sub': 'salvo richiesta del Comune o relazione sui consumi energetici', 'sub_t': 4.5}]},
 {'cap': 'Prima di iniziare', 'audio': D + 'blk04.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'lines': [(0.3, 'Cosa fa,'), (0.8, 'in [[concreto]]?')], 'size': 150},
   {'t': 3.4, 'type': 'check', 'kick': 'Prima che inizino i lavori', 'title': 'Verifica', 'items': [(1.5, "Che l'impresa abbia capito il progetto"), (4.5, 'Che il preventivo corrisponda ai lavori'), (8.5, 'Redige il verbale di consegna')]},
   {'t': 15.8, 'type': 'photo', 'img': P1, 'kick': 'Verbale di consegna', 'title': 'Nero su bianco', 'size': 130, 'chips': [(0.9, 'calendario', 'Tempi'), (1.8, 'chiave', 'Accessi'), (2.8, 'foto', 'Stato dei luoghi')]},
   {'t': 21.0, 'type': 'kin', 'kick': 'Sembra burocrazia', 'lines': [(0.8, 'Ti [[tutela]]')], 'size': 190, 'sub': 'se a metà cantiere nascono contestazioni', 'sub_t': 2.5}]},
 {'cap': 'Durante i lavori', 'audio': D + 'blk05.m4a', 'scenes': [
   {'t': 0, 'type': 'photo', 'img': PG, 'kick': 'Durante il cantiere', 'title': 'Sopralluoghi:\n3 controlli', 'size': 120, 'kb': (1.08, 1.2, 30, -10)},
   {'t': 4.9, 'type': 'cards', 'img': D2, 'n': '1', 'title': 'Il progetto', 'sub': 'Si costruisce quello che è scritto nel progetto e nel titolo edilizio, misure comprese', 'sub_t': 1.0},
   {'t': 11.7, 'type': 'cards', 'img': P2, 'n': '2', 'title': 'I materiali', 'sub': 'Quelli previsti, certificati; per le strutture, prove di laboratorio', 'sub_t': 1.0},
   {'t': 18.5, 'type': 'cards', 'img': TT, 'n': '3', 'title': "La qualità d'esecuzione", 'sub': '', 'sub_t': 1.0},
   {'t': 21.3, 'type': 'icons', 'kick': 'Errori che, una volta coperti, non si vedono più', 'items': [(0.3, 'goccia', 'Impermeabilizzazione', 'fatta male'), (2.2, 'superficie', 'Massetto', 'senza pendenza'), (4.0, 'cappotto', 'Isolamento', 'con ponti termici')]}]},
 {'cap': 'I tuoi soldi', 'audio': D + 'blk06.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'kick': 'Il tuo portafoglio', 'lines': [(1.5, 'La [[contabilità]]')], 'size': 160},
   {'t': 5.2, 'type': 'timeline', 'kick': 'Stati di avanzamento (SAL)', 'title': 'Misura, poi paghi', 'size': 110, 'grow_d': 6,
    'marks': [(0.8, 0.0, 'Lavori', 'eseguiti davvero'), (3.5, 0.5, 'SAL', 'verificato dal DL'), (6.5, 1.0, 'Pagamento', 'solo dopo')]},
   {'t': 16.3, 'type': 'warn', 'icon': 'euro', 'title': 'Secondo acconto?', 'sub': 'Se i lavori sono quelli del primo,\n[[te lo dice]]', 'sub_t': 2.5},
   {'t': 22.0, 'type': 'kin', 'kick': 'Le voci extra', 'lines': [(1.0, 'Si concordano [[prima]]'), (3.6, 'non in fattura')], 'size': 120}]},
 {'cap': 'Le varianti', 'audio': D + 'blk07.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'lines': [(0.2, 'Le [[varianti]]')], 'size': 190},
   {'t': 2.4, 'type': 'photo', 'img': P1, 'kick': 'In cantiere succede spesso', 'title': '«Togliamo questa parete»', 'size': 104, 'sub': '«Spostiamo questa finestra»', 'sub_t': 2.6},
   {'t': 7.9, 'type': 'kin', 'kick': 'Il direttore dei lavori ti dice', 'lines': [(0.6, 'Serve una pratica'), (1.6, 'in [[variante]]?')], 'size': 120},
   {'t': 13.9, 'type': 'warn', 'title': 'Variante senza pratica', 'sub': '= [[difformità]]\nfino alla vendita della casa', 'sub_t': 1.6},
   {'t': 20.8, 'type': 'check', 'kick': 'La legge è chiara: se vede difformità', 'title': 'Il DL deve', 'items': [(2.8, 'Contestarle'), (4.0, 'Segnalarle al Comune'), (6.0, "Nei casi gravi, rinunciare all'incarico")]}]},
 {'cap': 'Responsabilità', 'audio': D + 'blk08.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'lines': [(0.3, 'Una responsabilità'), (1.0, '[[vera]]')], 'size': 140},
   {'t': 4.8, 'type': 'icons', 'kick': 'Testo unico edilizia · rispondono insieme', 'title': 'Conformità al titolo edilizio', 'size': 76, 'items': [(1.5, 'chiave', 'Committente', ''), (2.4, 'gru', 'Impresa', ''), (3.4, 'casco', 'Direttore lavori', '')]},
   {'t': 14.6, 'type': 'kin', 'kick': 'Non è una firma di cortesia', 'lines': [(0.8, 'Se firma e non controlla'), (2.6, 'ne [[risponde]]')], 'size': 110},
   {'t': 20.2, 'type': 'photo', 'img': P2, 'kick': 'Per questo', 'title': 'Un buon DL\nè [[esigente]]', 'size': 130, 'sub': 'E fa bene.', 'sub_t': 4.1}]},
 {'cap': 'Fine lavori', 'audio': D + 'blk09.m4a', 'scenes': [
   {'t': 0, 'type': 'check', 'kick': 'A fine lavori chiude il cerchio', 'title': 'I documenti', 'items': [(2.0, 'Comunicazione di fine lavori'), (4.5, 'Conformità degli impianti'), (7.5, 'Aggiornamento catastale'), (10.0, 'Agibilità'), (13.5, 'Asseverazioni per i bonus fiscali')]},
   {'t': 19.9, 'type': 'photo', 'img': D2, 'kick': 'Senza questi documenti', 'title': 'Casa finita,\nma [[non in regola]]', 'size': 120}]},
 {'cap': 'Quanto costa', 'audio': D + 'blk10.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'lines': [(0.3, 'Quanto'), (0.7, '[[costa]]?')], 'size': 170},
   {'t': 2.3, 'type': 'icons', 'kick': "Disciplinare d'incarico, per iscritto", 'items': [(1.5, 'contratto', 'Importo', 'dei lavori'), (3.5, 'complessita', 'Complessità', '')]},
   {'t': 8.9, 'type': 'icons', 'kick': 'Un solo errore evitato', 'items': [(1.6, 'superficie', 'Massetto', 'da rifare'), (3.2, 'euro', 'Acconto', 'pagato in anticipo'), (5.0, 'contratto', 'Variante', 'senza pratica')]},
   {'t': 15.5, 'type': 'kin', 'lines': [(0.2, 'Vale più della'), (1.2, '[[parcella]]')], 'size': 150},
   {'t': 20.1, 'type': 'kin', 'lines': [(0.2, 'Il costo vero'), (1.0, 'è [[non averlo]]')], 'size': 150}]},
 {'cap': 'Come sceglierlo', 'audio': D + 'blk11.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'kick': 'Come sceglierlo', 'lines': [(1.1, '3 [[regole]]')], 'size': 190},
   {'t': 3.2, 'type': 'cards', 'img': D1, 'n': '1', 'title': "Indipendente dall'impresa", 'sub': 'Deve poter dire di no', 'sub_t': 2.4},
   {'t': 8.6, 'type': 'cards', 'img': P1, 'n': '2', 'title': 'Incarico scritto', 'sub': 'Compiti, numero di visite e compenso', 'sub_t': 1.4},
   {'t': 13.6, 'type': 'icons', 'kick': '3 · Come ti terrà informato', 'items': [(1.2, 'contratto', 'Verbali', ''), (2.0, 'foto', 'Foto', ''), (2.9, 'libro', 'Giornale dei lavori', '')]},
   {'t': 19.9, 'type': 'photo', 'img': D1, 'kick': 'Un buon direttore dei lavori', 'title': 'Ti informa anche\nquando [[non ci sei]]', 'size': 116}]},
 {'cap': 'Riassumendo', 'audio': D + 'blk12.m4a', 'scenes': [
   {'t': 0, 'type': 'check', 'kick': 'Riassumendo', 'title': 'Il direttore dei lavori', 'items': [(1.5, 'Lavora per te'), (3.5, 'Obbligatorio con permesso, SCIA e strutture'), (7.5, 'Controlla progetto, materiali, qualità e soldi'), (11.5, 'Ne risponde per legge')]},
   {'t': 15.3, 'type': 'cta', 'title': 'Stai per iniziare un cantiere?', 'sub': 'Scrivimi su Instagram [[@ing.belcastro]] o per email', 'btn': 'Iscriviti al canale', 'btn_t': 6.0}]},
]
