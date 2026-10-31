# Piano scene Video 2 – APE (tempi in secondi dall'inizio di ogni file audio V2-xx)
D = '/home/claude/v2n/'
P1, P2, D1, D2 = D + 'foto-prima-1.jpg', D + 'foto-prima-2.jpg', D + 'foto-dopo-1.jpg', D + 'foto-dopo-2.jpg'
TITLE = "APE: cos'è, quanto dura e quando serve"
SIGLA = {'audio': '/home/claude/v2/V0b.m4a', 'cut': 9.6, 'cues': {'magia': 1.4, 'naa': 2.42, 'ing': 3.7, 'nome': 5.9, 'titolo': 7.45}}
BED = '/home/claude/v2/bed.wav'
BLOCKS = [
 {'cap': 'Introduzione', 'audio': D + 'blk01.m4a', 'scenes': [
   {'t': 0, 'type': 'photo', 'img': '/home/claude/foto/render-palazzo-169.jpg', 'kick': 'Certificazione energetica', 'title': "L'APE", 'size': 200, 'sub': 'Attestato di Prestazione Energetica', 'sub_t': 1.6},
   {'t': 5.6, 'type': 'icons', 'kick': 'Ti serve per forza', 'title': '', 'items': [(0.3, 'vendita', 'Vendi', ''), (1.6, 'chiave', 'Affitti', ''), (4.0, 'annuncio', "L'annuncio", 'classe già indicata')]},
   {'t': 11.8, 'type': 'kin', 'lines': [(0.1, 'Quanto dura?'), (1.6, 'Chi lo fa?'), (2.4, 'Quanto [[rischi]]?')], 'size': 120},
   {'t': 20.2, 'type': 'kin', 'kick': 'Da ingegnere', 'lines': [(0.2, 'Senza giri'), (0.9, 'di [[parole]]')], 'size': 150}]},
 {'cap': "Cos'è", 'audio': D + 'blk02.m4a', 'scenes': [
   {'t': 0, 'type': 'doc', 'kick': "Cos'è", 'title': "La carta d'identità energetica", 'size': 88, 'sub': 'della casa', 'rot': -3},
   {'t': 5.2, 'type': 'icons', 'kick': "Energia che serve in un anno per", 'items': [(0.4, 'fiamma', 'Riscaldare', ''), (1.6, 'neve', 'Raffrescare', ''), (3.0, 'goccia', 'Acqua calda', '')]},
   {'t': 11.5, 'type': 'kin', 'kick': 'Il risultato', 'lines': [(0.2, 'kWh / m² anno')], 'size': 150, 'sub': 'un numero… e una classe', 'sub_t': 2.5},
   {'t': 16.6, 'type': 'classes', 'kick': 'In Italia', 'title': '10 classi', 'size': 150, 'sub': 'da [[A4]], la migliore,\na [[G]], la peggiore', 'sub_t': 1.5},
   {'t': 22.8, 'type': 'doc', 'kick': 'Non solo un\'etichetta', 'title': 'Le raccomandazioni', 'size': 86, 'sub': 'Gli interventi che migliorano la casa e la classe che puoi raggiungere', 'hls': [(1.5, 'racc', 'Interventi consigliati')]}]},
 {'cap': 'Quando serve', 'audio': D + 'blk03.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'lines': [(0.3, 'Quando è'), (0.7, '[[obbligatorio]]?')], 'size': 150},
   {'t': 2.9, 'type': 'icons', 'kick': 'Obbligatorio quando', 'items': [(0.2, 'vendita', 'Vendi', ''), (1.1, 'chiave', 'Affitti', ''), (2.2, 'gru', 'Costruisci', 'edificio nuovo'), (3.6, 'martello', 'Ristrutturi', 'ristrutturazione importante')]},
   {'t': 9.3, 'type': 'kin', 'kick': 'Il caso che molti dimenticano', 'lines': [(1.2, 'Gli [[annunci]]')], 'size': 170},
   {'t': 13.0, 'type': 'listing', 'img': '/home/claude/foto/render-villa-169.jpg', 'kick': 'Portali · vetrine · cartelli', 'hl_t': 1.5, 'sub': 'Classe e indice devono comparire [[in ogni annuncio]]', 'sub_t': 3.0},
   {'t': 22.2, 'type': 'timeline', 'kick': 'Quando farlo', 'title': "Prima dell'annuncio, non al rogito", 'size': 84, 'grow_d': 3,
    'marks': [(0.5, 0.0, 'APE', 'fatto dal tecnico'), (1.5, 0.5, 'Annuncio', 'con la classe'), (2.6, 1.0, 'Rogito', 'APE allegato')]},
   {'t': 27.7, 'type': 'icons', 'kick': 'In genere esclusi · da verificare caso per caso', 'items': [(0.3, 'box', 'Box', ''), (1.1, 'cantina', 'Cantine', ''), (1.9, 'deposito', 'Depositi', '')]}]},
 {'cap': 'Quanto dura', 'audio': D + 'blk04.m4a', 'scenes': [
   {'t': 0, 'type': 'counter', 'kick': "L'APE dura", 'from': 0, 'to': 10, 'count_t': 0.6, 'count_d': 1.6, 'unit': 'ANNI AL MASSIMO', 'icon': 'calendario'},
   {'t': 3.8, 'type': 'kin', 'kick': 'Attenzione', 'lines': [(0.2, '«Al [[massimo]]»')], 'size': 170},
   {'t': 6.5, 'type': 'timeline', 'kick': "Vale solo se l'impianto è in regola", 'title': 'Controlli di efficienza', 'size': 96, 'grow_d': 5,
    'marks': [(0.6, 0.0, 'Anno 0', 'APE'), (2.0, 0.33, 'Controllo', 'sul libretto'), (3.4, 0.66, 'Controllo', 'sul libretto'), (4.8, 1.0, 'Anno 10', 'scadenza')]},
   {'t': 14.2, 'type': 'warn', 'title': 'Salta la manutenzione?', 'sub': "L'attestato decade [[prima]]", 'sub_t': 1.0},
   {'t': 18.0, 'type': 'photo', 'img': '/home/claude/foto/cantiere-impianti-169.jpg', 'kick': 'Decade anche se cambi la prestazione', 'title': 'Lavori = APE nuovo', 'size': 104,
    'chips': [(4.5, 'infissi', 'Nuovi infissi'), (5.6, 'pompa', 'Pompa di calore'), (6.7, 'cappotto', 'Cappotto')]},
   {'t': 26.2, 'type': 'kin', 'lines': [(0.2, 'Serve un'), (0.6, '[[APE nuovo]]')], 'size': 150},
   {'t': 28.4, 'type': 'doc', 'kick': 'Non basta la data in alto', 'title': 'Controlla anche il libretto', 'size': 84, 'hls': [(0.4, 'scadenza', 'Scadenza')]}]},
 {'cap': 'Chi lo fa', 'audio': D + 'blk05.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'lines': [(0.3, 'Chi può'), (0.8, '[[farlo]]?')], 'size': 160},
   {'t': 1.8, 'type': 'icons', 'kick': 'Un tecnico', 'items': [(0.3, 'tecnico', 'Abilitato', ''), (1.6, 'scudo', 'Indipendente', ''), (3.2, 'contratto', 'Certificatore', 'requisiti di legge')]},
   {'t': 8.2, 'type': 'photo', 'img': '/home/claude/foto/facciata-bianca-cestello-169.jpg', 'kick': 'Il sopralluogo', 'title': 'Misura e controlla', 'size': 120, 'kb': (1.05, 1.2, 40, -20),
    'chips': [(2.8, 'metro', 'Misure'), (3.6, 'infissi', 'Infissi'), (4.4, 'impianto', 'Impianto'), (5.2, 'cappotto', 'Murature')]},
   {'t': 14.4, 'type': 'icons', 'kick': 'Poi', 'items': [(0.3, 'pc', 'Calcolo', 'software conforme'), (3.6, 'regione', 'Catasto energetico', 'della Regione + codice')]},
   {'t': 21.9, 'type': 'warn', 'title': 'Niente sopralluogo?', 'sub': 'Solo due foto e una planimetria:\n[[campanello d\'allarme]]', 'sub_t': 1.6}]},
 {'cap': 'Quanto costa', 'audio': D + 'blk06.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'lines': [(0.3, 'Quanto'), (0.7, '[[costa]]?')], 'size': 170},
   {'t': 2.1, 'type': 'icons', 'kick': 'Nessuna tariffa unica · dipende da', 'items': [(2.1, 'superficie', 'Superficie', ''), (3.4, 'impianto', 'Impianto', ''), (4.6, 'complessita', 'Complessità', '')]},
   {'t': 8.8, 'type': 'kin', 'kick': 'Appartamento normale', 'lines': [(0.3, 'Qualche [[centinaio]]'), (0.9, 'di euro')], 'size': 130},
   {'t': 13.2, 'type': 'warn', 'title': 'Offerte troppo basse', 'sub': 'Niente sopralluogo\ne dati stimati a occhio', 'sub_t': 2.9},
   {'t': 19.2, 'type': 'kin', 'kick': 'Un APE sbagliato', 'lines': [(0.3, 'Si [[contesta]]')], 'size': 160, 'sub': 'e chi lo firma ne risponde', 'sub_t': 4.0}]},
 {'cap': 'Le sanzioni', 'audio': D + 'blk07.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'lines': [(0.3, 'Cosa [[rischi]]?')], 'size': 160, 'sub': 'Sanzioni amministrative. E non sono piccole.', 'sub_t': 1.9},
   {'t': 5.6, 'type': 'counter', 'kick': 'Vendi senza APE', 'from': 3000, 'to': 18000, 'count_t': 2.6, 'count_d': 2.0, 'suf': ' €', 'unit': 'DA 3.000 A 18.000 €', 'icon': 'vendita'},
   {'t': 10.6, 'type': 'counter', 'kick': 'Affitti senza APE', 'from': 1000, 'to': 4000, 'count_t': 1.0, 'count_d': 1.6, 'suf': ' €', 'unit': 'DA 1.000 A 4.000 €', 'sub': 'dimezzate per i contratti fino a 3 anni', 'sub_t': 3.5, 'icon': 'chiave'},
   {'t': 17.0, 'type': 'counter', 'kick': 'Annuncio senza classe energetica', 'from': 500, 'to': 3000, 'count_t': 5.0, 'count_d': 1.6, 'suf': ' €', 'unit': 'DA 500 A 3.000 €', 'sub': "risponde chi pubblica l'annuncio, [[anche l'agenzia]]", 'sub_t': 6.5, 'icon': 'annuncio'},
   {'t': 26.9, 'type': 'icons', 'kick': 'In più, nel contratto', 'title': 'La clausola', 'items': [(0.6, 'contratto', '«Ho ricevuto l\'APE»', "acquirente o inquilino")]}]},
 {'cap': 'Come si legge', 'audio': D + 'blk08.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'lines': [(0.3, 'Come si legge'), (0.8, 'un [[APE]]?')], 'size': 140},
   {'t': 2.5, 'type': 'doc', 'kick': 'Prima pagina', 'title': 'Classe e indice', 'size': 100, 'sub': 'kWh/m² anno: [[più è basso, meglio è]]', 'sub_t': 7.5,
    'hls': [(1.0, 'classe', 'Classe'), (3.0, 'indice', 'Indice')]},
   {'t': 12.5, 'type': 'doc', 'kick': 'La parte che nessuno guarda', 'title': 'Vale [[oro]]', 'size': 150, 'hls': [(4.0, 'racc', 'Raccomandazioni')]},
   {'t': 20.4, 'type': 'classes', 'kick': 'Le raccomandazioni ti dicono', 'title': 'Dove puoi arrivare', 'size': 96, 'sub': 'Interventi consigliati\ne classe raggiungibile', 'jump': ('E', 'B', 'dopo i lavori'), 'jump_t': 1.5},
   {'t': 25.2, 'type': 'photo', 'img': '/home/claude/foto/consegna-casa-169.jpg', 'kick': 'Stai comprando casa?', 'title': "Leggila prima dell'offerta", 'size': 100, 'sub': 'È un piccolo [[preventivo]] dei lavori che ti aspettano', 'sub_t': 3.6}]},
 {'cap': 'Perché conta', 'audio': D + 'blk09.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'lines': [(0.3, 'Perché conta'), (0.8, '[[così tanto]]?')], 'size': 140},
   {'t': 3.3, 'type': 'icons', 'kick': 'La classe energetica pesa su', 'items': [(1.6, 'bolletta', 'Bollette', ''), (3.0, 'prezzo', 'Prezzo', '')]},
   {'t': 8.1, 'type': 'compare', 'title': 'Diverse volte i consumi', 'sides': [('/home/claude/foto/facciata-arancio-balconi-169.jpg', 'G', '#D9372A', 640, 'consumi'), ('/home/claude/foto/interno-finito-scala-169.jpg', 'A', '#2A8F3F', 120, 'consumi')]},
   {'t': 16.3, 'type': 'photo', 'img': '/home/claude/foto/render-terrazza-169.jpg', 'kick': 'Le case efficienti', 'title': 'Si vendono prima\ne [[meglio]]', 'size': 120},
   {'t': 19.7, 'type': 'kin', 'kick': 'Se stai comprando', 'lines': [(0.4, 'Classe bassa'), (1.2, '= si [[tratta]] sul prezzo')], 'size': 120, 'sub': 'quei lavori li pagherai tu', 'sub_t': 6.5}]},
 {'cap': 'Case green', 'audio': D + 'blk10.m4a', 'scenes': [
   {'t': 0, 'type': 'icons', 'kick': 'La domanda che mi fate tutti', 'title': 'Case green: cambia tutto?', 'size': 100, 'items': [(2.8, 'ue', 'Direttiva UE', '2024/1275')]},
   {'t': 6.9, 'type': 'kin', 'lines': [(0.2, 'Facciamo [[chiarezza]]')], 'size': 150},
   {'t': 8.3, 'type': 'timeline', 'kick': 'La direttiva', 'title': 'Le date', 'size': 110, 'grow_d': 5,
    'marks': [(0.4, 0.0, '2024', 'direttiva approvata'), (2.5, 0.5, '29/5/2026', 'termine per recepirla'), (5.6, 1.0, 'Oggi', "l'Italia non l'ha recepita")]},
   {'t': 14.3, 'type': 'warn', 'icon': 'warn', 'title': "L'Italia non l'ha ancora recepita", 'size': 76, 'sub': 'Serve un decreto che, a oggi, non c\'è', 'sub_t': 2.2},
   {'t': 18.8, 'type': 'doc', 'kick': 'Solo con quel decreto', 'title': 'Nuova scala europea e nuovo attestato', 'size': 76},
   {'t': 24.7, 'type': 'counter', 'kick': 'Nel frattempo, in vigore dal', 'from': 1, 'to': 3, 'count_t': 0.5, 'count_d': 0.8, 'unit': 'GIUGNO 2026 · NUOVO DECRETO REQUISITI MINIMI', 'sub': "Aggiorna alcuni contenuti tecnici dell'APE", 'sub_t': 4.0, 'icon': 'calendario'},
   {'t': 35.2, 'type': 'check', 'kick': 'Va detto chiaramente', 'title': 'La direttiva non…', 'ic': 'x', 'items': [(1.5, 'obbliga il proprietario a ristrutturare entro una data'), (5.0, 'vieta di vendere o di affittare')]}]},
 {'cap': 'Consigli', 'audio': D + 'blk11.m4a', 'scenes': [
   {'t': 0, 'type': 'kin', 'lines': [(0.3, '3 consigli'), (0.8, 'da [[ingegnere]]')], 'size': 150},
   {'t': 4.7, 'type': 'cards', 'n': '1', 'title': 'Vendi?', 'sub': "Fai l'APE prima dell'annuncio, e fallo bene: ti tutela", 'sub_t': 1.2},
   {'t': 12.3, 'type': 'cards', 'n': '2', 'title': 'Lavori su impianti o infissi?', 'sub': 'Controlla se il tuo APE è ancora valido', 'sub_t': 1.6},
   {'t': 20.4, 'type': 'cards', 'n': '3', 'title': 'Ristrutturi?', 'sub': 'Fai simulare gli interventi prima di farli', 'sub_t': 1.6},
   {'t': 26.3, 'type': 'classes', 'kick': 'Con lo stesso calcolo', 'title': "Scegli l'intervento che rende di più", 'size': 80, 'sub': 'Cappotto, infissi o pompa di calore:\nquante classi guadagni per ogni euro', 'sub_t': 1.8, 'jump': ('F', 'C', 'simulazione'), 'jump_t': 2.5}]},
 {'cap': 'Riassumendo', 'audio': D + 'blk12.m4a', 'scenes': [
   {'t': 0, 'type': 'check', 'kick': 'Riassumendo', 'title': "L'APE", 'items': [(1.6, 'Serve per vendere, affittare e negli annunci'), (4.8, "Dura fino a 10 anni, se l'impianto è in regola"), (8.0, 'Lo fa un tecnico, con il sopralluogo'), (10.6, 'Senza: sanzioni fino a 18.000 €')]},
   {'t': 16.2, 'type': 'cta', 'title': "Ti serve un APE?", 'sub': 'Scrivimi su Instagram [[@ing.belcastro]]\no per email: trovi tutto in descrizione', 'btn': 'Iscriviti al canale', 'btn_t': 9.5}]},
]
