# Piano scene Video 6 – Fotovoltaico con accumulo (audio V6-01…V6-13)
D = '/percorso/audio/v6/'; F = '/percorso/foto/'
TITLE = 'Fotovoltaico con batteria: conviene davvero?'
SIGLA = {'audio': '/percorso/fileV0-sigla.m4a', 'cut': 9.6, 'cues': {'magia': 1.4, 'naa': 2.42, 'ing': 3.7, 'nome': 5.9, 'titolo': 7.45}}
BED = '/percorso/file'
BLOCKS = [
 {'cap': 'Introduzione', 'audio': D + 'V6-01.m4a', 'scenes': [
   {'t': 0, 'type': 'icons', 'kick': 'Energia', 'title': 'Fotovoltaico con [[batteria]]', 'size': 110, 'items': [(0.8, 'pannello', 'Pannelli', ''), (2.2, 'batteria', 'Accumulo', '')]},
   {'t': 4.86, 'type': 'kin', 'kick': 'La domanda che mi fanno più spesso', 'lines': [(2.4, 'Conviene davvero\nla [[batteria]]?')], 'size': 130},
   {'t': 10.52, 'type': 'kin', 'kick': 'La risposta onesta', 'lines': [(2.7, '[[Dipende]]')], 'size': 200},
   {'t': 15.05, 'type': 'icons', 'kick': 'Non da quanto consumi', 'title': 'Ma da [[quando]] consumi', 'size': 100, 'items': [(0.6, 'sole', 'Di giorno', ''), (1.6, 'luna', 'Di sera', '')]},
   {'t': 18.11, 'type': 'check', 'kick': 'In questo video', 'title': 'Da ingegnere', 'items': [(0.8, 'Come ragionare sui consumi'), (2.6, 'Gli incentivi del 2026'), (4.6, 'Cosa cambia nel 2027')]}]},
 {'cap': 'Come produce un impianto', 'audio': D + 'V6-02.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'lines': [(0.5, 'Partiamo dalle [[basi]]')], 'size': 150},
   {'t': 2.69, 'type': 'timeline', 'kick': 'Produce solo quando c\'è il sole', 'title': 'Una giornata di sole', 'size': 96, 'grow_d': 6,
    'marks': [(1.5, 0.0, 'Mattina', 'poco'), (4.2, 0.5, 'Mezzogiorno', 'il massimo'), (6.8, 1.0, 'Tramonto', 'cala a zero')]},
   {'t': 12.81, 'type': 'icons', 'kick': 'Le stagioni contano', 'items': [(0.3, 'sole', 'Estate', 'produce molto'), (1.4, 'neve', 'Inverno', 'produce meno')]},
   {'t': 15.38, 'type': 'kin', 'kick': 'La taglia si misura in kW di picco', 'lines': [(1.0, 'Famiglia: [[3–6 kW]]')], 'size': 140, 'sub': 'ma la taglia giusta si decide guardando le bollette', 'sub_t': 4.5}]},
 {'cap': 'Produci di giorno, consumi di sera', 'audio': D + 'V6-03.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'lines': [(1.2, 'Ecco il [[problema]]')], 'size': 160},
   {'t': 2.76, 'type': 'icons', 'kick': 'Di giorno la casa è vuota', 'items': [(0.4, 'casa', 'Casa vuota', ''), (2.9, 'contratto', 'Lavoro', ''), (3.6, 'libro', 'Scuola', '')]},
   {'t': 7.72, 'type': 'icons', 'kick': 'I consumi veri arrivano la sera', 'items': [(2.9, 'induzione', 'Cucina', ''), (3.6, 'ingranaggio', 'Lavatrice', ''), (4.3, 'luna', 'Luci e TV', '')]},
   {'t': 13.82, 'type': 'warn', 'icon': 'sole', 'title': 'Quando produce di più', 'sub': 'in casa [[non c\'è nessuno]]', 'sub_t': 2.5},
   {'t': 19.44, 'type': 'icons', 'kick': "L'energia che non usi subito", 'title': 'Finisce in [[rete]]', 'size': 110, 'items': [(1.2, 'rete', 'Rete elettrica', '')]}]},
 {'cap': 'Cosa fa la batteria', 'audio': D + 'V6-04.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'kick': 'La batteria serve proprio a questo', 'lines': [(0.6, 'Accumulo')], 'size': 190},
   {'t': 4.67, 'type': 'icons', 'kick': 'Di giorno', 'title': "Immagazzina l'energia in più", 'size': 90, 'items': [(0.4, 'sole', 'Pannelli', ''), (1.8, 'freccia', '', ''), (2.6, 'batteria', 'Batteria', '')]},
   {'t': 8.5, 'type': 'icons', 'kick': 'La sera', 'title': "Usi l'energia della batteria", 'size': 90, 'items': [(0.6, 'batteria', 'Batteria', ''), (2.0, 'freccia', '', ''), (2.8, 'casa', 'Casa', 'invece di comprarla')]},
   {'t': 16.05, 'type': 'kin', 'kick': 'In parole semplici', 'lines': [(1.4, 'Sposta il [[mezzogiorno]]'), (2.6, 'alla [[sera]]')], 'size': 130},
   {'t': 20.02, 'type': 'kin', 'kick': 'Ogni kWh che usi invece di comprarlo', 'lines': [(1.4, 'Risparmio [[pieno]]'), (2.8, 'in bolletta')], 'size': 130}]},
 {'cap': 'Autoconsumo: i numeri', 'audio': D + 'V6-05.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'kick': 'Il numero che conta', 'lines': [(1.9, '[[Autoconsumo]]')], 'size': 170, 'sub': "la parte dell'energia prodotta che usi in casa", 'sub_t': 3.2},
   {'t': 9.34, 'type': 'counter', 'kick': 'Senza batteria, casa vuota di giorno', 'title': 'Autoconsumo', 'from': 0, 'to': 33, 'pre': 'circa ', 'suf': '%', 'unit': 'più o meno un terzo', 'count_t': 1.0, 'count_d': 2.0, 'icon': 'sole'},
   {'t': 15.33, 'type': 'counter', 'kick': 'Con una batteria ben dimensionata', 'title': 'Autoconsumo', 'from': 33, 'to': 50, 'pre': 'oltre il ', 'suf': '%', 'unit': 'e in alcuni casi due terzi o più', 'count_t': 1.0, 'count_d': 2.4, 'icon': 'batteria'},
   {'t': 22.92, 'type': 'warn', 'icon': 'lente', 'title': 'Valori indicativi', 'sub': "Il tuo dipende dalle abitudini:\nserve un'[[analisi dei consumi]]", 'sub_t': 1.6}]},
 {'cap': 'Un esempio con i numeri', 'audio': D + 'V6-05B.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'kick': 'Esempio indicativo, solo energia', 'lines': [(3.2, 'Facciamo i [[conti]]')], 'size': 150},
   {'t': 6.72, 'type': 'icons', 'kick': 'Una famiglia al Sud', 'items': [(0.6, 'casa', '3.500 kWh', "consumi all'anno"), (4.6, 'pannello', '4,5 kW', 'impianto'), (8.6, 'sole', '≈ 5.500 kWh', 'prodotti')]},
   {'t': 19.17, 'type': 'counter', 'kick': 'Senza batteria', 'title': 'Usati in casa', 'from': 0, 'to': 1200, 'pre': '≈ ', 'suf': ' kWh', 'unit': 'il resto va in rete', 'count_t': 0.6, 'count_d': 2.0, 'icon': 'rete'},
   {'t': 23.6, 'type': 'counter', 'kick': 'Con una batteria di qualche kWh', 'title': 'In più, la sera', 'from': 0, 'to': 1000, 'pre': '+ ', 'suf': ' kWh', 'unit': 'non comprati dal fornitore', 'count_t': 1.5, 'count_d': 2.2, 'icon': 'batteria'},
   {'t': 35.56, 'type': 'kin', 'kick': 'Il guadagno della batteria', 'lines': [(0.8, 'Va confrontato'), (2.0, 'con quanto [[costa]]')], 'size': 130}]},
 {'cap': "L'energia che va in rete", 'audio': D + 'V6-06.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'lines': [(3.3, "E l'energia\nche va in [[rete]]?")], 'size': 140},
   {'t': 5.75, 'type': 'timeline', 'kick': 'Cosa è cambiato', 'title': 'Dallo scambio sul posto al ritiro dedicato', 'size': 76, 'grow_d': 9,
    'marks': [(0.8, 0.0, 'Prima', 'scambio sul posto'), (7.8, 0.5, 'Nuove regole ARERA', 'chiuso ai nuovi impianti'), (11.6, 1.0, 'Oggi', 'ritiro dedicato GSE')]},
   {'t': 24.41, 'type': 'icons', 'kick': "L'energia in eccesso", 'items': [(0.4, 'euro', 'Ti pagano qualcosa', ''), (2.0, 'bolletta', 'Molto meno', 'di quanto paghi tu')]},
   {'t': 29.42, 'type': 'kin', 'kick': 'Ecco perché, oggi,', 'lines': [(0.8, "l'[[autoconsumo]]"), (1.8, 'pesa di più')], 'size': 140}]},
 {'cap': 'Quando la batteria conviene', 'audio': D + 'V6-07.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'lines': [(0.8, 'Quando [[conviene]]?')], 'size': 170},
   {'t': 3.38, 'type': 'icons', 'kick': 'Di solito conviene se', 'items': [(0.6, 'casa', 'Casa vuota di giorno', ''), (2.6, 'luna', 'Consumi la sera', '')]},
   {'t': 8.64, 'type': 'icons', 'kick': 'Conviene di più se hai o avrai', 'items': [(1.6, 'pompa', 'Pompa di calore', ''), (2.7, 'auto', 'Auto elettrica', ''), (3.9, 'induzione', 'Piano a induzione', '')]},
   {'t': 16.42, 'type': 'kin', 'kick': 'Carichi elettrici importanti', 'lines': [(1.0, 'Li sposti sul [[sole]]')], 'size': 150},
   {'t': 21.41, 'type': 'warn', 'icon': 'batteria', 'title': 'Riserva in caso di blackout?', 'sub': 'Va prevista nel progetto:\n[[non tutte le batterie la offrono]]', 'sub_t': 4.6}]},
 {'cap': 'Quando non conviene', 'audio': D + 'V6-08.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'lines': [(0.7, 'Quando conviene [[poco]]')], 'size': 150},
   {'t': 3.87, 'type': 'icons', 'kick': 'Qualcuno è in casa tutto il giorno?', 'title': 'Autoconsumo già alto', 'size': 90, 'items': [(2.5, 'sole', 'Consumi nelle ore di sole', ''), (5.0, 'ok', 'Anche senza batteria', '')]},
   {'t': 13.28, 'type': 'warn', 'icon': 'batteria', 'title': "L'errore più comune", 'sub': 'La batteria [[troppo grande]]', 'sub_t': 1.2},
   {'t': 16.29, 'type': 'kin', 'kick': 'Se non la riempi e svuoti quasi ogni giorno', 'lines': [(1.8, 'Hai pagato capacità'), (3.4, 'che resta [[ferma]]')], 'size': 120},
   {'t': 23.19, 'type': 'cards', 'n': '!', 'title': 'La regola', 'sub': 'Si dimensiona sui consumi serali, non sulla produzione', 'sub_t': 1.0}]},
 {'cap': 'Dove trovi i tuoi consumi', 'audio': D + 'V6-08B.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'lines': [(1.1, 'Dove trovi\ni tuoi [[dati]]?')], 'size': 140},
   {'t': 4.2, 'type': 'icons', 'kick': 'Consumi ora per ora', 'title': 'Dove scaricarli', 'size': 96, 'items': [(0.6, 'pc', 'Area clienti', 'del fornitore'), (3.0, 'bolletta', 'Portale Consumi', 'di ARERA')]},
   {'t': 12.07, 'type': 'icons', 'kick': 'Con un anno di dati il tecnico vede', 'items': [(1.2, 'sole', 'Di giorno', ''), (2.0, 'luna', 'Di sera', ''), (3.4, 'sole', "D'estate", ''), (4.2, 'neve', "D'inverno", '')]},
   {'t': 20.04, 'type': 'kin', 'kick': 'Il punto di partenza di ogni progetto serio', 'lines': [(2.4, 'Senza dati è solo\nuna [[stima]]')], 'size': 120}]},
 {'cap': 'Gli incentivi del 2026', 'audio': D + 'V6-09.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'lines': [(0.9, 'Gli [[incentivi]]')], 'size': 170},
   {'t': 3.11, 'type': 'kin', 'kick': 'Nel 2026: bonus ristrutturazioni', 'lines': [(0.6, 'Impianto + batteria'), (2.6, 'se collegata all\'impianto')], 'size': 110},
   {'t': 9.75, 'type': 'counter', 'kick': 'Abitazione principale', 'title': 'Detrazione', 'from': 0, 'to': 50, 'suf': '%', 'unit': '36% sugli altri immobili', 'count_t': 0.5, 'count_d': 1.6, 'icon': 'casa'},
   {'t': 15.47, 'type': 'counter', 'kick': 'Limite di spesa per unità immobiliare', 'title': 'In 10 rate annuali', 'from': 0, 'to': 96000, 'suf': ' €', 'unit': 'detrazione recuperata in dieci anni', 'count_t': 0.6, 'count_d': 2.0, 'icon': 'euro'},
   {'t': 22.55, 'type': 'check', 'kick': 'Servono', 'title': 'Le carte', 'items': [(0.5, 'Bonifico parlante'), (2.2, 'Comunicazione ENEA entro 90 giorni'), (7.6, 'In fattura IVA al 10% per le abitazioni')]}]},
 {'cap': 'E nel 2027?', 'audio': D + 'V6-10.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'lines': [(1.9, 'E dal 1° gennaio\n[[2027]]?')], 'size': 150},
   {'t': 4.55, 'type': 'kin', 'kick': 'Disegno di legge di bilancio (CdM 28/10)', 'lines': [(1.6, '50% e 36%'), (3.0, 'anche nel 2027')], 'size': 140},
   {'t': 14.84, 'type': 'warn', 'icon': 'contratto', 'title': 'Ma è una proposta', 'sub': 'Diventa legge solo se il Parlamento\nla approva [[entro il 31 dicembre]]', 'sub_t': 1.2},
   {'t': 21.23, 'type': 'kin', 'kick': 'Senza proroga', 'lines': [(0.8, 'Le aliquote [[scendono]]')], 'size': 130},
   {'t': 25.6, 'type': 'icons', 'kick': 'Per i privati conta la data del bonifico', 'title': 'Paghi entro il 31/12/2026?', 'size': 90, 'items': [(2.8, 'calendario', 'Aliquote di oggi', '')]}]},
 {'cap': 'Conto Termico e comunità energetiche', 'audio': D + 'V6-11.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'lines': [(1.5, 'Due domande\n[[frequenti]]')], 'size': 150},
   {'t': 3.65, 'type': 'icons', 'kick': 'Il Conto Termico 3.0 copre il fotovoltaico?', 'title': 'Sulla tua abitazione: [[no]]', 'size': 96, 'items': [(1.9, 'x', 'Privato a casa sua', '')]},
   {'t': 9.55, 'type': 'check', 'kick': 'Il fotovoltaico nel Conto Termico', 'title': 'Solo se', 'items': [(1.0, 'Edifici pubblici o del terziario'), (5.5, 'Insieme a una pompa di calore elettrica')]},
   {'t': 22.97, 'type': 'kin', 'kick': 'Per la casa', 'lines': [(0.8, 'La strada resta'), (1.8, 'la [[detrazione]]')], 'size': 140},
   {'t': 26.48, 'type': 'icons', 'kick': 'E le comunità energetiche?', 'title': "Un'altra strada", 'size': 96, 'items': [(3.7, 'rete', 'Energia condivisa', 'con incentivo')]}]},
 {'cap': 'Le pratiche', 'audio': D + 'V6-12.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'kick': "Un'ultima cosa, da ingegnere", 'lines': [(2.8, 'Le [[pratiche]]')], 'size': 170},
   {'t': 3.98, 'type': 'check', 'kick': 'In genere', 'title': 'Pannelli aderenti al tetto', 'size': 90, 'items': [(2.5, 'Fuori dalle zone vincolate: edilizia libera'), (6.5, 'Connessione: modello unico tramite il distributore')]},
   {'t': 14.32, 'type': 'warn', 'icon': 'scudo', 'title': 'Centro storico o zona paesaggistica', 'sub': 'serve [[l\'autorizzazione]]', 'sub_t': 1.2},
   {'t': 18.42, 'type': 'icons', 'kick': 'In condominio, tetto comune', 'items': [(1.4, 'contratto', "Informa l'amministratore", '')]},
   {'t': 22.72, 'type': 'icons', 'kick': 'La batteria', 'title': 'In un locale adatto', 'size': 96, 'items': [(1.6, 'libro', 'Indicazioni del produttore', ''), (3.2, 'fiamma', 'Norme antincendio', '')]}]},
 {'cap': 'Riassumendo', 'audio': D + 'V6-13.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'lines': [(0.6, '[[Riassumendo]]')], 'size': 170},
   {'t': 2.07, 'type': 'check', 'kick': 'In breve', 'title': 'La batteria conviene', 'size': 96, 'items': [(0.4, 'Se sposta sulla sera energia venduta a poco'), (6.8, 'Scelta sui consumi di un anno, ora per ora'), (10.0, 'Dimensionata sui consumi serali'), (13.0, '2026: 50% prima casa · 2027: si attende la legge')]},
   {'t': 21.06, 'type': 'cta', 'title': 'Stai pensando a un impianto?', 'sub': 'Scrivimi su Instagram @ing.belcastro o per email', 'btn': 'Iscriviti al canale', 'btn_t': 3.8},
   {'t': 26.91, 'type': 'kin', 'kick': 'Sabato sul canale', 'lines': [(0.5, 'Pompa di calore'), (1.4, 'o [[caldaia]]?')], 'size': 140}]},
]
