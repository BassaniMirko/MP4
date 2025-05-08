# MP4: Compressione, struttura e codec  
Autore: Mirko Bassani  
[https://tuosito.github.io/percorso/progetto](https://bassanimirko.github.io/MP4/index.html))

## Introduzione e tema

Questo progetto esplora il formato `.mp4`, uno dei contenitori multimediali più diffusi al mondo. L'obiettivo è rendere comprensibile in modo visivo e interattivo la struttura a box che lo compone, il funzionamento dei codec che lo rendono leggibile, e le tecniche di compressione utilizzate per renderlo leggero e versatile.  

Tramite un'interfaccia ASCII ispirata ai terminali, l'utente può esplorare i box interni di un file `.mp4` e comprenderne i metadati, i contenuti e la logica che ne determina la riproduzione.

## Riferimenti progettuali

**The Pirate Book**  
Un progetto editoriale curato da Nicolas Maigret e Maria Roszkowska che riflette visivamente, tramite estetica ASCII e tipografia monospazio, pratiche culturali legate alla condivisione e distribuzione dei media.  
Un riferimento per l’approccio editoriale e per la rappresentazione "visuale del codice" nel design dell’interfaccia.

<img src="img/Screenshot 2025-05-08 alle 17.28.52.png" width="200" alt="Landing page" />




## Design dell’interfaccia e modalità di interazione

L'interfaccia si presenta come un terminale interattivo con elementi ASCII stilizzati:

- **Navigazione Box:** l’utente può cliccare su `ftyp`, `moov`, `mdat`, `udta` per visualizzarne la struttura interna.  
- **Esplorazione guidata:** ogni box viene mostrato con un layout a tre colonne: Voce / Significato / Contenuto.  
- **Legenda laterale:** affianca l’interfaccia principale spiegando il ruolo di ogni box.  
- **Tipografia monospazio:** migliora la coerenza visiva e richiama i sistemi di ispezione binaria.

## Tecnologia usata

- **HTML/CSS:** per la struttura e lo stile.
- **JavaScript:** per generare dinamicamente i contenuti dei box e gestire l'interazione utente.
- **JSON:** il file `output.json` rappresenta una simulazione della struttura interna di un file MP4.
- **Font IBM Plex Mono (Google Fonts):** per l’estetica terminale.

## Target e contesto d’uso

Il progetto è pensato per studenti, designer e sviluppatori curiosi di capire come è fatto un file `.mp4` a livello strutturale, e quali ruoli svolgono i box interni e i codec associati. È utile anche in un contesto didattico per introdurre i concetti di compressione, formati container e metadati multimediali.

<img src="img/Screenshot 2025-05-09 alle 00.31.25.png" width="500" alt="Landing page" />

<img src="img/Screenshot 2025-05-09 alle 00.26.47.png" width="500" alt="Box-drawing characters" />

<img src="img/Screenshot 2025-05-09 alle 00.28.01.png" width="500" alt="Esplora un file mp4" />



## Autores

Mirko Bassani 
Corso di Interaction Design – SUPSI DACD, 2025  
