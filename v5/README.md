# La bottega del web — v5

Anteprima: https://benpo-python.github.io/bozza-sito-v3/v5/

Nuova direzione estetica, 14 ottobre 2026: nero grafite, arancio e blu elettrico; tipografia condensata monumentale; composizione centrale con una scultura tridimensionale.

## Esperienza

- Hero WebGL con un nodo toroidale, materiale riflettente, illuminazione, orbita e satellite animati.
- Rotazione automatica; trascinamento con mouse; pulsante per ruotare la scultura anche da tastiera o telefono.
- Entrata dei titoli, fascia tipografica in movimento, elementi rotanti e fluttuanti, reveal e parallasse allo scorrimento.
- Quattro progetti dimostrativi a grande formato, con palette e grafica dedicate.
- Metodo, prezzi, presentazione personale, FAQ e contatti completamente ridisegnati.
- Menu mobile e invito al contatto persistente durante la lettura.

## Implementazione

HTML, CSS e JavaScript statici. Three.js 0.170.0 e font serviti localmente, con relative licenze in `assets/`. Non richiede build o installazione. Per la preview, servire la cartella via HTTP.

Il renderer si ferma fuori dalla hero e quando la scheda non è visibile. Il pulsante pausa e la preferenza di sistema per movimento ridotto fermano le animazioni automatiche. Se WebGL non è disponibile, rimane una composizione CSS.

Il modulo prepara un messaggio da inviare tramite WhatsApp o email. Non è collegato a un backend e non invia messaggi automaticamente. Nessun messaggio di prova è stato inviato durante i controlli.

Prezzi e condizioni riprendono il sito esistente: Base 249 €, Completo 449 €, bozza gratuita in 3 giorni, pubblicazione 7 giorni dopo l’ok, dominio e modifiche secondo i dettagli esposti. Le quattro attività del portfolio sono indicate come demo; i lavori reali sono elencati separatamente.

## Verifica

- WebGL effettivamente caricato e renderizzato nel browser.
- Layout desktop a 1440 px e mobile a 390 e 320 px, senza overflow orizzontale.
- Comandi pausa e rotazione, menu mobile e chiusura dopo selezione.
- Scelta pacchetto, preparazione dei link WhatsApp/email e FAQ.
- Asset locali, ancore, ID univoci e sintassi JavaScript.
- Nessun errore nella console durante la verifica.

La bozza ha `noindex,nofollow`. Il sito ufficiale e la v4 restano nei rispettivi percorsi.
