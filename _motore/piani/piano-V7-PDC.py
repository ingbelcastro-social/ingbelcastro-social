# Piano scene Video 7 – Pompa di calore o caldaia (audio V7-01…V7-13, tempi dall'inizio di ogni file)
# Nessuna foto libera in archivio: solo grafiche disegnate.
D = '/percorso/audio/v7/'
TITLE = 'Pompa di calore o caldaia? Quando conviene davvero'
SIGLA = {'audio': '/percorso/fileV0-sigla.m4a', 'cut': 9.6, 'cues': {'magia': 1.4, 'naa': 2.42, 'ing': 3.7, 'nome': 5.9, 'titolo': 7.45}}
BED = '/percorso/file'
F = '/percorso/foto/'
BLOCKS = [
 {'cap': 'Introduzione', 'audio': D + 'V7-01.m4a', 'scenes': [
   {'t': 0, 'type': 'photo', 'img': F + 'pdc-giardino.jpg', 'kick': 'Riscaldamento', 'title': 'Pompa di calore\no [[caldaia]]?', 'size': 140, 'kb': (1.04, 1.18, -40, 10)},
   {'t': 5.39, 'type': 'kin', 'kick': 'La tua caldaia ha qualche anno?', 'lines': [(0.6, 'Prima o poi'), (1.6, 'te lo [[chiederai]]')], 'size': 130},
   {'t': 10.0, 'type': 'photo', 'img': F + 'condominio.jpg', 'kick': 'La risposta non sta nel catalogo', 'title': 'Sta nella\n[[tua casa]]', 'size': 130, 'kb': (1.02, 1.12, 0, -20), 'chips': [(3.3, 'cappotto', 'Come è isolata'), (4.6, 'impianto', 'Che termosifoni ha'), (6.0, 'superficie', 'Quanto spazio fuori')]},
   {'t': 16.99, 'type': 'check', 'kick': 'In questo video', 'title': 'Da ingegnere', 'items': [(0.6, 'I criteri per scegliere'), (2.6, 'Gli incentivi veri del 2026')]}]},
 {'cap': 'Come funziona una pompa di calore', 'audio': D + 'V7-02.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'lines': [(0.3, 'Come [[funziona]]?')], 'size': 160},
   {'t': 2.99, 'type': 'photo', 'img': F + 'caldaia-murale.jpg', 'kick': 'La caldaia', 'title': 'Brucia [[gas]]', 'size': 150, 'kb': (1.05, 1.15, 20, 0)},
   {'t': 4.76, 'type': 'photo', 'img': F + 'pdc-dettaglio.jpg', 'kick': 'La pompa di calore', 'title': 'Non brucia\n[[niente]]', 'size': 150, 'kb': (1.03, 1.14, -30, 0)},
   {'t': 7.21, 'type': 'photo', 'img': F + 'pdc-neve.jpg', 'kick': "Usa l'elettricità per prendere il calore", 'title': "Dall'[[aria esterna]]", 'size': 130, 'sub': 'anche quando fuori fa freddo', 'sub_t': 3.0, 'kb': (1.04, 1.16, 30, 10)},
   {'t': 13.02, 'type': 'kin', 'kick': 'Lo stesso principio del frigorifero', 'lines': [(0.8, 'Al [[contrario]]')], 'size': 170},
   {'t': 17.25, 'type': 'counter', 'kick': 'Il bello è il rendimento', 'title': '1 kWh di elettricità', 'from': 1, 'to': 4, 'pre': 'fino a ', 'suf': ' kWh', 'unit': 'di calore in casa, in buone condizioni', 'count_t': 2.0, 'count_d': 2.0, 'icon': 'pompa'}]},
 {'cap': 'La caldaia a condensazione', 'audio': D + 'V7-03.m4a', 'scenes': [
   {'t': 0, 'type': 'photo', 'img': F + 'caldaia-cond.jpg', 'kick': 'La caldaia moderna', 'title': 'A [[condensazione]]', 'size': 130, 'kb': (1.03, 1.15, -20, 0)},
   {'t': 4.3, 'type': 'icons', 'kick': 'Recupera anche il calore dei fumi', 'title': 'Rende di più delle vecchie caldaie', 'size': 80, 'items': [(1.0, 'fiamma', 'Fumi', 'vapore recuperato'), (2.4, 'ok', 'Più rendimento', '')]},
   {'t': 9.68, 'type': 'check', 'kick': 'I punti forti', 'title': 'Pratica', 'items': [(0.4, 'Compatta'), (1.3, 'Si installa in fretta'), (2.6, 'Va bene con i radiatori')]},
   {'t': 16.57, 'type': 'warn', 'icon': 'fiamma', 'title': 'Ma resta legata al gas', 'sub': 'Dal 2025 le caldaie solo a gas\n[[non hanno più le detrazioni]]', 'sub_t': 2.0}]},
 {'cap': "La temperatura dell'acqua", 'audio': D + 'V7-04.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'kick': 'Il punto che decide tutto', 'lines': [(2.6, "La temperatura\ndell'[[acqua]]")], 'size': 130},
   {'t': 7.06, 'type': 'photo', 'img': F + 'radiatore.jpg', 'kick': 'Vecchi termosifoni', 'title': 'Acqua a\n[[60–70 °C]]', 'size': 150, 'kb': (1.04, 1.16, 0, 20)},
   {'t': 13.55, 'type': 'kin', 'kick': 'La pompa di calore rende al massimo', 'lines': [(0.6, 'con acqua [[tiepida]]'), (2.6, '35–45 °C')], 'size': 140},
   {'t': 20.11, 'type': 'kin', 'lines': [(0.3, 'Più acqua calda'), (1.6, '= [[meno rendimento]]')], 'size': 130},
   {'t': 24.47, 'type': 'kin', 'kick': 'La domanda giusta', 'lines': [(1.8, 'La mia casa si scalda\ncon acqua [[tiepida]]?')], 'size': 110}]},
 {'cap': 'Un esempio: due case', 'audio': D + 'V7-04B.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'kick': 'Un esempio', 'lines': [(0.6, 'Due case di [[fantasia]]')], 'size': 140},
   {'t': 4.27, 'type': 'cards', 'img': F + 'cappotto.jpg', 'n': '1', 'title': 'Appartamento ristrutturato', 'sub': 'Cappotto e infissi nuovi: si scalda con acqua a 40 °C', 'sub_t': 3.5},
   {'t': 12.93, 'type': 'kin', 'kick': 'Qui la pompa di calore', 'lines': [(0.5, 'Lavora nella sua\n[[zona migliore]]')], 'size': 120},
   {'t': 16.64, 'type': 'cards', 'n': '2', 'title': 'Casa anni Settanta', 'sub': 'Muri senza isolamento, vetro singolo: servono 70 °C', 'sub_t': 4.0},
   {'t': 25.96, 'type': 'warn', 'icon': 'bolletta', 'title': 'Pompa di calore da sola?', 'sub': 'Farebbe fatica\ne i [[consumi salirebbero]]', 'sub_t': 1.5},
   {'t': 31.7, 'type': 'kin', 'lines': [(0.2, 'Stesso impianto'), (1.2, 'risultati [[opposti]]')], 'size': 140}]},
 {'cap': 'Isolamento e infissi', 'audio': D + 'V7-05.m4a', 'scenes': [
   {'t': 0, 'type': 'photo', 'img': F + 'cappotto.jpg', 'kick': "L'involucro", 'title': 'Muri, tetto\ne [[infissi]]', 'size': 130, 'kb': (1.05, 1.18, 30, 0), 'chips': [(1.6, 'mattone', 'Muri'), (2.4, 'casa', 'Tetto'), (3.4, 'infissi', 'Infissi')]},
   {'t': 5.29, 'type': 'kin', 'kick': 'Casa ben isolata', 'lines': [(0.6, 'Disperde poco'), (2.4, 'Si scalda con acqua [[tiepida]]')], 'size': 110, 'sub': 'la situazione ideale per la pompa di calore', 'sub_t': 5.4},
   {'t': 13.45, 'type': 'warn', 'icon': 'infissi', 'title': 'Muri non isolati, infissi vecchi', 'sub': 'Disperde molto e chiede\n[[acqua più calda]]', 'sub_t': 2.5},
   {'t': 19.62, 'type': 'kin', 'kick': 'Il primo intervento da valutare', 'lines': [(0.8, 'Non il generatore:'), (2.6, 'le [[dispersioni]]')], 'size': 130}]},
 {'cap': 'Pavimento, ventilconvettori, radiatori', 'audio': D + 'V7-06.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'kick': 'Quello che scalda le stanze', 'lines': [(0.6, 'I [[terminali]]')], 'size': 170},
   {'t': 5.15, 'type': 'photo', 'img': F + 'pavimento.jpg', 'kick': 'Perfetto con la pompa di calore', 'title': 'Pavimento\n[[radiante]]', 'size': 130, 'sub': 'lavora con acqua a bassa temperatura', 'sub_t': 2.0, 'kb': (1.03, 1.15, -30, 0)},
   {'t': 11.59, 'type': 'photo', 'img': F + 'fancoil.jpg', 'kick': 'Vanno bene anche i', 'title': '[[Ventilconvettori]]', 'size': 120, 'sub': "e d'estate possono raffrescare", 'sub_t': 1.6, 'kb': (1.03, 1.12, 20, 0)},
   {'t': 15.93, 'type': 'photo', 'img': F + 'radiatore.jpg', 'kick': 'Con i radiatori si può fare', 'title': 'Ma vanno\n[[verificati]]', 'size': 130, 'kb': (1.16, 1.04, 0, 0), 'chips': [(3.6, 'ok', 'A volte bastano'), (5.2, 'ingranaggio', 'A volte vanno sostituiti')]},
   {'t': 24.31, 'type': 'kin', 'lines': [(0.3, 'È un [[calcolo]]'), (1.3, "non un'opinione")], 'size': 140}]},
 {'cap': 'Il sistema ibrido', 'audio': D + 'V7-07.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'kick': 'Casa poco isolata, lavori rimandati?', 'lines': [(1.6, 'Una via di mezzo')], 'size': 140},
   {'t': 6.31, 'type': 'icons', 'kick': 'Il sistema ibrido', 'title': 'Una sola regolazione', 'size': 90, 'items': [(1.8, 'pompa', 'Pompa di calore', ''), (3.3, 'fiamma', 'Caldaia a condensazione', '')]},
   {'t': 13.89, 'type': 'icons', 'kick': 'Come lavora', 'items': [(0.4, 'pompa', 'Giornate miti', 'pompa di calore'), (3.4, 'neve', 'Molto freddo', 'interviene la caldaia')]},
   {'t': 20.11, 'type': 'kin', 'kick': 'Da sapere', 'lines': [(0.8, 'Gli ibridi restano'), (2.0, '[[agevolati]]')], 'size': 140}]},
 {'cap': 'Le regole dal 2025', 'audio': D + 'V7-08.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'lines': [(1.9, 'Le [[regole]]')], 'size': 180},
   {'t': 3.32, 'type': 'warn', 'icon': 'fiamma', 'title': 'Legge di Bilancio 2025', 'sub': 'Caldaie uniche a combustibili fossili, anche a condensazione:\n[[escluse]] da ecobonus e bonus ristrutturazioni\nper le spese 2025, 2026 e 2027', 'sub_t': 2.5},
   {'t': 15.32, 'type': 'check', 'kick': 'Agenzia delle Entrate, circolare 8/E del 19/6/2025', 'title': 'Restano agevolati', 'size': 96, 'items': [(5.8, 'Pompe di calore'), (6.8, 'Sistemi ibridi'), (8.0, 'Generatori a biomassa')]}]},
 {'cap': 'Le detrazioni', 'audio': D + 'V7-09.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'kick': 'Caldaia → pompa di calore, nel 2026', 'lines': [(1.5, 'Detrazione')], 'size': 150},
   {'t': 5.0, 'type': 'counter', 'kick': 'Abitazione principale', 'title': 'In dieci anni', 'from': 0, 'to': 50, 'suf': '%', 'unit': '36% sugli altri immobili', 'count_t': 0.6, 'count_d': 1.6, 'icon': 'casa'},
   {'t': 12.68, 'type': 'check', 'kick': 'Servono', 'title': 'I documenti', 'items': [(0.5, 'Bonifico parlante'), (2.2, 'Asseverazione o documentazione tecnica'), (5.5, 'Comunicazione ENEA entro 90 giorni')]},
   {'t': 23.11, 'type': 'kin', 'kick': 'E nel 2027?', 'lines': [(0.8, 'Aliquote confermate'), (2.4, 'ma è una [[proposta]]')], 'size': 120, 'sub': 'finché la legge di bilancio non è approvata', 'sub_t': 3.4}]},
 {'cap': 'Gli errori da evitare', 'audio': D + 'V7-09B.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'kick': 'Quelli che vedo più spesso', 'lines': [(0.3, 'Gli [[errori]]')], 'size': 180},
   {'t': 4.15, 'type': 'cards', 'n': '1', 'title': 'Potenza scelta a occhio', 'sub': 'Senza calcolare le dispersioni della casa', 'sub_t': 1.5},
   {'t': 8.43, 'type': 'cards', 'n': '2', 'title': 'Unità esterna soffocata', 'sub': 'In un posto chiuso o angusto, dove non respira', 'sub_t': 1.5},
   {'t': 14.32, 'type': 'cards', 'n': '3', 'title': 'Pratiche dimenticate', 'sub': 'Comunicazione ENEA o documentazione tecnica: si perde la detrazione', 'sub_t': 1.5},
   {'t': 20.63, 'type': 'cards', 'n': '4', 'title': 'Due incentivi sulla stessa spesa', 'sub': 'Detrazione e Conto Termico insieme: non si può', 'sub_t': 1.2},
   {'t': 25.35, 'type': 'kin', 'lines': [(0.3, 'Tutti evitabili'), (1.3, 'con un [[progetto]] fatto bene')], 'size': 110}]},
 {'cap': 'Il Conto Termico 3.0', 'audio': D + 'V7-10.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'kick': "L'alternativa alla detrazione", 'lines': [(0.6, 'Conto Termico [[3.0]]')], 'size': 140, 'sub': 'in vigore dal 25 dicembre 2025', 'sub_t': 2.4},
   {'t': 4.93, 'type': 'icons', 'kick': 'Non è uno sconto sulle tasse', 'title': 'Un contributo sul conto', 'size': 90, 'items': [(1.6, 'euro', 'Lo versa il GSE', '')]},
   {'t': 9.45, 'type': 'counter', 'kick': 'Pompe di calore, ibridi, solare termico', 'title': 'Della spesa ammissibile', 'from': 0, 'to': 65, 'pre': 'fino al ', 'suf': '%', 'unit': 'sotto i 15.000 € in rata unica', 'count_t': 1.0, 'count_d': 1.8, 'icon': 'euro'},
   {'t': 20.74, 'type': 'icons', 'kick': 'La domanda', 'items': [(0.4, 'calendario', 'Entro 90 giorni', 'dalla fine dei lavori')]},
   {'t': 24.3, 'type': 'warn', 'icon': 'x', 'title': 'Non si somma alla detrazione', 'sub': 'sulle stesse spese:\n[[o l\'uno o l\'altro]]', 'sub_t': 1.0}]},
 {'cap': 'Pompa di calore e fotovoltaico', 'audio': D + 'V7-11.m4a', 'scenes': [
   {'t': 0, 'type': 'photo', 'img': F + 'fotovoltaico.jpg', 'kick': 'Un abbinamento che funziona', 'title': 'Pompa di calore\n+ [[fotovoltaico]]', 'size': 130, 'kb': (1.04, 1.18, -30, 10)},
   {'t': 6.33, 'type': 'kin', 'kick': 'Elettricità dal tuo tetto', 'lines': [(1.2, 'Costo di esercizio\n[[più basso]]')], 'size': 120},
   {'t': 11.61, 'type': 'kin', 'kick': 'Con la batteria', 'lines': [(0.6, "L'energia del giorno"), (1.8, 'anche [[la sera]]')], 'size': 120},
   {'t': 15.69, 'type': 'cta', 'title': 'Il video sul fotovoltaico', 'sub': 'con accumulo: trovi il link qui sopra', 'btn': 'Guarda il video'}]},
 {'cap': 'Spazi, rumore e condominio', 'audio': D + 'V7-12.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'lines': [(1.4, 'Gli aspetti [[pratici]]')], 'size': 150},
   {'t': 3.12, 'type': 'photo', 'img': F + 'pdc-balcone.jpg', 'kick': "L'unità esterna", 'title': 'Prima di\n[[installare]]', 'size': 130, 'kb': (1.04, 1.14, 0, 0), 'chips': [(2.6, 'superficie', 'Spazio ben ventilato'), (4.6, 'warn', 'Rumore verso i vicini')]},
   {'t': 11.01, 'type': 'photo', 'img': F + 'motori-facciata.jpg', 'kick': 'In condominio', 'title': 'Facciata\no [[balcone]]?', 'size': 130, 'kb': (1.03, 1.14, 20, 0), 'chips': [(1.5, 'contratto', 'Regolamento condominiale'), (4.5, 'scudo', 'Zona vincolata: autorizzazione')]},
   {'t': 19.59, 'type': 'photo', 'img': F + 'contatore.jpg', 'kick': 'Impianto elettrico', 'title': 'Deve reggere la\n[[nuova potenza]]', 'size': 120, 'kb': (1.03, 1.12, 0, 0)}]},
 {'cap': 'Riassumendo', 'audio': D + 'V7-13.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'lines': [(0.4, '[[Riassumendo]]')], 'size': 170},
   {'t': 1.93, 'type': 'check', 'kick': 'In breve', 'title': 'Come scegliere', 'size': 96, 'items': [(0.5, 'Casa isolata, acqua tiepida: pompa di calore'), (6.1, 'Poco isolata: prima le dispersioni, o un ibrido'), (10.6, 'Caldaia solo a gas: niente detrazioni dal 2025'), (13.3, 'Detrazione o Conto Termico: uno solo')]},
   {'t': 18.86, 'type': 'cta', 'title': 'Devi cambiare il riscaldamento?', 'sub': 'Scrivimi su Instagram @ing.belcastro o per email', 'btn': 'Iscriviti al canale', 'btn_t': 4.6}]},
]
