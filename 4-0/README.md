# La bottega del web — Bozza estetica 4.0

Anteprima: https://benpo-python.github.io/bozza-sito-v3/4-0/

Restyling realizzato il 14 ottobre 2026. Proposta autonoma in `/4-0/`; non modifica il sito ufficiale o le bozze precedenti.

## Analisi e direzione

Fonti esaminate:
- https://labottegadelweb.it/
- https://benpo-python.github.io/bozza-sito-v3/3-2/

Il sito ufficiale comunica bene destinatari, prezzo fisso e bozza gratuita. La prima schermata è però dominata dal testo e da un singolo mockup verticale: i lavori e la personalità del servizio emergono più tardi. La bozza 3.2 valorizza già il verde e il portfolio; questa versione ne sviluppa una direzione più editoriale e visiva.

Scelte principali:
- Palette verde bosco, avorio e lime; tipografia sans con accenti serif in corsivo.
- Hero con messaggio breve, offerta leggibile, mockup desktop e mobile e anteprime selezionabili.
- Orbite, elementi flottanti, movimento al passaggio del puntatore e ingressi allo scorrimento.
- Portfolio subito dopo la hero, con quattro demo cliccabili e chiaramente identificate come attività inventate.
- Illustrazione originale costruita in HTML/CSS per raccontare il collegamento tra bottega fisica e presenza online.
- Metodo, prezzi, identità personale, progetti reali, FAQ e contatti con una gerarchia coerente.
- Pulsante di contatto persistente su mobile, nascosto durante la hero e in prossimità del modulo.

I prezzi (249/449 €), le tempistiche e le condizioni derivano dai contenuti esistenti. Non sono state aggiunte recensioni, clienti o metriche inventate. La proposta è una valutazione di design, non una misurazione del tasso di conversione.

## Funzionamento

Sito statico senza dipendenze di esecuzione, font e immagini locali. Aprire `index.html` o servire la cartella con un server HTTP.

Il modulo valida attività e città e prepara link WhatsApp/email con il testo compilato. Non invia richieste a un backend: la persona sceglie il canale e conferma l'invio nella propria applicazione. I link Privacy, Cookie e dettagli dell'offerta rimandano al sito ufficiale.

La bozza usa `noindex,nofollow`. Prima di adottarla sul dominio ufficiale occorre configurare i metadati definitivi e decidere se mantenere il flusso contatti attuale o collegare un servizio di invio diretto.

## Verifiche eseguite

- Sintassi JavaScript con `node --check`.
- Esistenza degli asset locali, ancore interne, ID univoci e un solo H1.
- Verifica visuale desktop e mobile a 390 px; assenza di overflow anche a 320 px.
- Cambio anteprima, selezione pacchetto, apertura FAQ e menu mobile.
- Validazione e generazione dei link di contatto senza inviare messaggi di prova.
- Comando pausa animazioni; supporto CSS a `prefers-reduced-motion`.
- Nessun errore JavaScript rilevato nella console durante i controlli.

Il test non costituisce una certificazione completa di accessibilità o prestazioni.
