# Introduzione al C

Questa documentazione è consigliata a un pubblico con già conoscenze, anche minime, di programmazione. Questa sezione sarà ampiamente improntata alla **pratica** e poco alla teoria.

## Cos'è il C?

Il C è un linguaggio di basso livello (*low level*) che, nonostante l'età, è rimasto estremamente stabile. Negli anni non ha subito stravolgimenti a livello di grammatica o costrutti; le migliorie principali hanno riguardato l'efficienza dei compilatori e la capacità di ottimizzazione sulle macchine moderne.

Il linguaggio C è composto da pochi concetti e pochissime parole chiave (*keywords*). Per questo motivo, tende a essere **semplice da imparare ma difficile da applicare**: è fondamentale interiorizzare i suoi meccanismi di base prima di poterli utilizzare con padronanza.

Sebbene la curva di apprendimento iniziale possa sembrare ripida, i concetti appresi (come la gestione degli indirizzi di memoria) sono universali e ti permetteranno di comprendere molto più facilmente anche i linguaggi di alto livello.

## Caratteristiche Fondamentali

* **Linguaggio Compilato:** Il C non ha bisogno di interpreti. Una volta scritto, il codice viene tradotto in linguaggio macchina (Assembly/Binario) per essere eseguito direttamente dall'hardware.
* **Gestione Manuale della Memoria:** A differenza di Java o Python, il C non ha un *Garbage Collector*. Sei tu a decidere quando allocare e quando liberare la memoria (tramite `malloc` e `free`). Questo garantisce prestazioni massime, ma richiede grande attenzione per evitare bug.
* **Puntatori:** È lo strumento più potente del C. Permette di manipolare direttamente gli indirizzi di memoria, offrendo un controllo totale sui dati e sulla struttura del software.
* **Il Ciclo di Vita del Codice (Build Pipeline):** Programmare in C significa capire come un file di testo diventa un eseguibile attraverso quattro fasi:
    1.  **Preprocessing:** Gestione delle direttive come `#include` e `#define`.
    2.  **Compilazione:** Traduzione del codice in Assembly.
    3.  **Assemblamento:** Creazione dei file oggetto (binari intermedi).
    4.  **Linking:** Unione dei file oggetto e delle librerie in un unico file eseguibile.

## Perché studiare il C oggi?

Studiare il C non significa solo imparare un linguaggio, ma capire **come funziona un computer**. È ancora oggi il cuore pulsante dei sistemi operativi (Linux, Windows, macOS), dei driver, dei sistemi embedded e dei motori grafici ad alte prestazioni.

```{toctree}
:hidden:
:caption: Indice
:maxdepth: 1

01_c_compiler.md
02_c_functions.md
```