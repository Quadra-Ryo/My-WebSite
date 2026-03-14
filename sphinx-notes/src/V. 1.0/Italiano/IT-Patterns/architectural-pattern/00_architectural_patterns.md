# Pattern architetturali

I pattern architetturali definiscono l'organizzazione ad alto livello di un sistema software. Operano a un livello di astrazione superiore rispetto ai design pattern: non riguardano le relazioni tra classi o oggetti, ma la struttura complessiva del sistema, la distribuzione delle responsabilità tra i componenti e i meccanismi di comunicazione tra di essi.

Il loro utilizzo non è obbligatorio né universale: la scelta di un pattern architetturale dipende dai requisiti non funzionali del sistema (scalabilità, manutenibilità, prestazioni) e dal contesto organizzativo in cui viene sviluppato.

I principali pattern architetturali sono:

- **Layered (a strati)**, organizza il sistema in livelli sovrapposti, ciascuno dei quali espone servizi al livello superiore e consuma servizi da quello inferiore (es. Presentation → Business Logic → Persistence → Database)
- **MVC (Model-View-Controller)**, separa la rappresentazione dei dati (Model), la loro visualizzazione (View) e la gestione dell'interazione utente (Controller); varianti comuni includono MVP e MVVM
- **Event-Driven**, i componenti comunicano esclusivamente tramite eventi asincroni instradati attraverso un broker centrale; nessun componente conosce direttamente gli altri
- **Microservizi**, il sistema è decomposto in servizi indipendenti, ciascuno responsabile di un dominio funzionale, deployabili e scalabili autonomamente
- **Pipes and Filters**, i dati fluiscono attraverso una sequenza di trasformazioni indipendenti (filtri) collegate da canali (pipe); tipico dei sistemi di elaborazione batch e dei compilatori
- **CQRS (Command Query Responsibility Segregation)**, separa i percorsi di lettura e scrittura dei dati, permettendo di ottimizzarli indipendentemente

Un pattern architetturale non è una specifica tecnica rigida ma un vocabolario condiviso tra sviluppatori e architetti: nominare il pattern adottato consente di comunicare in modo preciso ed efficiente scelte progettuali altrimenti difficili da descrivere, riducendo l'ambiguità nelle discussioni di sistema.

```{toctree}
:hidden:
:caption: Indice
:maxdepth: 1

01_ultimate_hook.md
```