# Funzioni
In C, una funzione è un blocco di codice che esegue un compito specifico e può restituire un valore.  
Serve a organizzare il programma, evitare duplicazioni e rendere il codice più leggibile e manutenibile.

## Dichiarazione di una funzione
Prendiamo come esempio il codice che siamo andati a scrivere nelle pagine di documentazione precedenti ed andiamo ad analizzare la funzione che abbiamo scritto, il main:  

```c
#include <stdio.h>

int main(void){
    printf("Hello World\n");
    return 0;
}
```

Iniziamo andando a vedere come viene definita una funzione:
- `int main(void)`
- Si aprono le parentesi graffe
- Si scrive il blocco di codice che si vuole eseguire
- Si chiudono le parentesi graffe

Andiamo a spezzettare questa definizione per capirla meglio.  
Iniziamo con la riga `int main(void)`:
- Possiamo vedere la key word `int`, questa keyword definisce il tipo di ritorno del valore ritornato dalla funzione stessa. Questo valore deve essere presente e deve essere posizionato prima del nome della funzione.  
- Poi possiamo trovare il nome della funzione, in questo caso `main`
- Infine tra parentesi tonde troviamo la lista di argomenti che la funzione vuole in input, in questo caso `(void)` cioè la funzione non richiede nessun argomento per venire eseguita. 

```{note}
**INFO**  
Si possono anche lasciare due parentesi vuote `main()` in quanto i nuovi compilatori di C più moderni lo accettano e lo interpretano correttamente ma nei compilatori più vecchi questo risulterebbe in un errore e per questo è una buona prassi inserire `void` all'interno delle parentesi in caso non ci siano parametri da passare.
```

Andiamo a fare un esempio con una funzione diversa:

```{note}
**INFO**  
Una buona prassi è quella di scrivere tutto il codice in inglese, nomi di variabili, di funzioni e commenti.
```

```c
int sum(int num1, int num2){
    return num1 + num2;
}
```

Andiamo ad analizzare la seguente funzione:
- Possiamo notare che la funzione somma (sum) ritorna un valore di tipo `int` (Il valore int è un numero intero, i vari tipi di dato verranno trattati nelle pagine di documentazione a venire)  
- Possiamo anche notare che ha bisogno di due parametri distinti, entrambi di tipo intero, di nome `num1` e `num2` (Questi sono i nomi con i quali si possono richiamare i valori passati alla funzione all'interno della funzione stessa)
- Ritorna il valore ottenuto dall'espressione `num1 + num2`, una volta eseguito lo statement `return` la funzione smetterà di essere eseguita e tornerà immediatamente il valore scelto alla funzione richiamante. Ovviamente il tipo del valore di ritorno dovrà essere uguale a quello dichiarato prima del nome della funzione ma in questo caso non c'è problemi visto che la funzione ritorna effettivamente un numero intero (int + int = int, funzione ben tipata).

Adesso andiamo a richiamare la nostra funzione all'interno del main per controllare che funzioni tutto. Per fare questo possiamo stampare il risultato ritornato dalla funzione stessa con un `printf("The operation: 3 + 4 = %d\n", sum(3,4));` ottenendo il seguente codice:

```c
#include <stdio.h>

int sum(int num1, int num2){
    return num1 + num2;
}

int main(void){
    printf("The operation: 3 + 4 = %d\n", sum(3,4));
    return 0;
}
```

## Printf
Approfondiamo un po' la funzione che andiamo ad utilizzare e il modo in cui abbiamo scritto la chiamata alla funzione stessa.  

Iniziamo con il dire che il nome della funzione è una abbreviazione di **"print formatted"**, cioè una funzione che può essere formattata in un modo specifico in base alle nostre esigenze.  
in questo caso noi avremo all'interno della stringa passata alla funzione (`"The operation: 3 + 4 = %d\n"`) due parti fondamentali:
- Una parte di "formato"
- Un identificatore (In questo caso `%d`)

La parte di formato è la parte "statica" come ad esempio "The operation: 3 + 4 = ... \n", questa parte verrà stampata esattamente come è scritta.  
La parte invece preceduta dal simbolo `%` è chiamata identificatore e serve a dire che in quella posizione lì ci sarà un valore di una variabile, nel caso di `%d` questa variabile sarà di tipo intero (Infatti la nostra funzione ritorna un `int`).  

Dopo la stringa possiamo vedere che si passa un altro argomento: `, sum(3,4)` che è il valore che vogliamo andare a sovrascrivere sopra al nostro identificatore.

Nella lezione precedente abbiamo visto come la dichiarazione della funzione `printf` sia `int printf(const char * restrict format, ...);`, adesso possiamo capire più chiaramente quale sia il significato di quei puntini presenti alla fine della dichiarazione della funzione, servono a simboleggiare che la funzione ha un numero di parametri variabili in funzione del numero di identificatori presenti all'interno della stringa (Funzioni di questo tipo vengono chiamate **funzioni variadiche**).  

Nel caso si faccia un errore del tipo `printf("The operation: 3 + 4 = %d, %d\n", sum(3,4));` (Inserire due identificatori ma un solo valore da andare a sostituire) il codice compilerà correttamente anche se genererà un warning (In caso non lo vediate provate a compilare utilizzando il comando `cc -W -Wall main.c`), questo perché questo errore porta a comportamento indefinito, il valore sovrascritto al secondo identificatore potrebbe essere qualsiasi cosa e potrebbe anche causare il crash del programma stesso.  
Infatti se voi provaste a lanciare la funzione come scritto sopra molto probabilmente ricevereste in output una stringa diversa dalla mia: `The operation: 3 + 4 = 7, -1836453600`

## Main
La funzione **Main** invece è una funzione speciale, come avete potuto vedere per richiamare la funzione sum che abbiamo scritto abbiamo dovuto fare una chiamata esplicita (richiamarla con `sum(3,4)`) ma il main non viene mai richiamato.
Questo perché la funzione main è una funzione speciale, è il punto di partenza di ogni programma, quando un programma viene lanciato il codice che viene eseguito è in realtà quello all'interno della funzione main stessa.  
Questo implica che in C non può essere scritto codice in uno scope globale all'esterno di una funzione (come accade in python per esempio) e che ogni programma dovrà necessariamente avere una funzione di nome main.

Errore! ❌:
```c
#include <stdio.h>

printf("Hello World")
int main(void){
    return 0;
}
```

Errore! ❌:
```c
#include <stdio.h>

int sum(int num1, int num2){
    return num1 + num2;
}
```

Appurato che la funzione "speciale" main deve essere presente all'interno del codice possiamo notare che la funzione ritorna un intero e che di default noi abbiamo scritto `return 0`.  
Pur sembrando strano in quanto la funzione main non viene richiamata da nessuna parte all'interno del programma il valore di ritorno del main è fondamentale per segnalare al sistema operativo se il nostro programma ha avuto un esito positivo o negativo.  
Per convenzione (Unix) un programma "main" viene considerato eseguito senza errori quando il valore di ritorno è 0, in ogni altro caso vengono usati valori specifici per simboleggiare errori diversi.  
Oltre a questo in caso dei programmi vengano richiamati in modo concatenato utilizzando un and logico in questo modo `./a.exe && ls` questo comando andrà ad eseguire entrambi i comandi distinti solo se il primo programma non incontra un errore, in caso a.exe ritornasse un numero diverso da 0 infatti il comando ls non verrebbe eseguito (Questo perché grazie ad un meccanismo di **short circuit** sapendo che basta un'espressione falsa per fare sì che l'and logico tra due espressioni ritorni falso il secondo comando non viene nemmeno eseguito in quanto il suo esito non potrebbe andare comunque ad influenzare il ritorno dell'espressione) così facendo possiamo essere certi che al primo errore trovato il mio programma si blocchi senza andare avanti.