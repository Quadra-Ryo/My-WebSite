# Variabili statiche e globali e variabili nelle funzioni

## Introduzione alle variabili globali e statiche
Andiamo a prendere un programma di esempio chiamato `increment` e facciamo si che non prenda nulla in input, incrementi una variabile e che stampi il suo valore.  

```{note}
**INFO**  
Nel gergo dei linguaggi imperativi (Un linguaggio imperativo è un paradigma di programmazione in cui il codice descrive come raggiungere un risultato attraverso una sequenza di istruzioni che modificano lo stato del programma) si dice che la funzione `increment` abbia solo un side effect (un effetto collaterale, cioè quello di stampare il valore di x).  
In poche parole non prende valori in input, non ritorna nulla, l'unico valore è l'effetto che si ha nell'esecuzione della funzione stessa.
```

```C
#include <stdio.h>

void increment(void){
    int x = 1;
    x = x + 1; // In C il simbolo "=" assegna alla variabile a sinistra il valore di destra
               // Per controllare se due variabili sono uguali si usa "=="
    printf("%d\n", x);
}


int main(void){
    increment();
    increment();
    increment();
    return 0;
}
```

Se andiamo ad eseguire questo programma vedremo che stamperà "2" tre volte, non tenendo in considerazione il numero di chiamate eseguite.  
Questo perchè ad ogni chiamata di funzione la variabile x verrà creata localmente, il suo valore verrà incrementato e successivamente, al termine dell'esecuzione della funzione questa verrà distrutta (Come abbiamo visto nella [lezione precedente](https://quadra-ryo.github.io/My-WebSite/blog/V.%201.0/English/programming_languages/c_language/03_c_variables.html)).

## Variabili globali
Andiamo ora a fare una piccola modifica al nostro codice per rendere la nostra variabile `x` globale.

```C
#include <stdio.h>

int x = 1; // Andando a dichiarare una variabile fuori da una funzione questa avrà scoping globale

void increment(void){
    x = x + 1;
}


int main(void){
    increment();
    printf("%d\n", x);
    increment();
    printf("%d\n", x);
    increment();
    printf("%d\n", x);
    return 0;
}
```
Essendo che adesso all'interno della funzione increment non esiste una variabile locale con il nome `x`, il compilatore andrà a cercare la variabile all'interno delle variabili globali e troverà la variabile globale.  
La principale differenza tra una variabile locale ed una globale è che nel caso della variabile globale il valore di `x` non verrà mai azzerato. La variabile verrà creata all'inizio dell'esecuzione del programma e verrà distrutta solo alla fine del programma, quando il processo terminerà. 
Oltre a questo andando a creare la variabile con scoping globale andremo a rendere accessibile la variabile in tutte le parti del programma, non solo nella funzione in cui viene dichiarata ma in tutte le funzioni presenti all'interno del nostro codice (Per questo posso permettermi di mettere il print all'interno del main). 
Per questo motivo il programma andrà ad incrementare sempre la stessa variabile e così facendo andando ad eseguire il programma leggerò "2 3 4" e non più "2 2 2".  

Andiamo a simulare l'esecuzione del programma e il cambiamento del valore di `x` durante l'esecuzione del nostro main:
```
Inizio programma:  
X → [1]  
increment()  
X → [X+1] (1 + 1)  
X → [2]  
printf(x) -> 2  
increment()  
X → [X+1] (2 + 1)  
X → [3]  
printf(x) -> 3  
increment()  
X → [X+1] (3 + 1)  
X → [4]  
printf(x) -> 4 
``` 

## Variabili statiche
Un altro modo in cui si può dichiarare una variabile in C è utilizzando `static`.  
`Static` è una keyword che ci permette di creare una variabile che si può immaginare come una via di mezzo tra una variabile locale ed una globale.  
Le variabili statiche si dichiarano all'interno di una funzione e per questo sono visualizzabili e accessibili solo da quella funzione (al contrario delle variabili globali che sono accessibili da tutto il programma) ma hanno una durata statica (static storage duration) come le variabili globali.  

Vediamo un esempio pratico:

```C
#include <stdio.h>

void increment(void){
    static int x = 1; // La variabile viene inizializzata solo la prima volta
    x = x + 1;
    printf("%d\n", x);
}


int main(void){
    increment(); // Stampa 2
    increment(); // Stampa 3
    increment(); // Stampa 4
    return 0;
}
```

In questo caso la variabile `x` viene inizializzata solo alla prima chiamata della funzione. Nelle chiamate successive mantiene il valore precedente, ma rimane accessibile solo all'interno della funzione `increment`.

## Problemi con variabili statiche e globali
Essendo che le variabili globali sono accessibili da tutto il programma, questa proprietà ci porta ad avere dei possibili problemi.  
Principalmente parliamo di problemi con il threading, più precisamente quando due thread (processi) separati provano ad accedere e a lavorare sulla stessa variabile globale contemporaneamente.   
Questa casistica potrebbe portare ad un problema di sincronizzazione che andremo a studiare prossimamente. Le variabili statiche, essendo accessibili solo dalla loro funzione, hanno meno problemi di questo tipo, ma possono comunque causare problemi se la stessa funzione viene chiamata da thread diversi.

## Gestione dei valori dopo una chiamata a funzione
Andiamo ora a modificare leggermente la nostra funzione increment per far si che prendendo un intero in input questa ritorni il valore in input +1.

```C
#include <stdio.h>

int increment(int x){
    x = x + 1;
    return x;
}


int main(void){
    int num = 13;
    increment(num);
    printf("%d\n", num);
    return 0;
}
```

Cosa succederebbe se runnassimo questo main? Che cosa verrebbe printato dal programma?   
Se la tua risposta è stata "13" hai ragione! Andiamo a vedere il perchè:  
Quando andiamo a richiamare la funzione `increment` passando come parametro `num` noi non andiamo a passare la variabile `num` ma andiamo semplicemente ad assegnare ad `x` (argomento della funzione increment) il valore contenuto all'interno di `num`.  
Quindi quello che succede è che all'interno della nostra funzione increment noi andremo ad incrementare `x` che arriverà al valore di "14" ma non andremo mai a salvarlo all'interno del main e quindi il valore di num rimarrà "13".  
Questo perchè in C di norma gli argomenti delle funzioni vengono passati per valore e non per riferimento (le funzioni ricevono una copia del valore che è presente all'interno della variabile che passo come parametro ma non sarà la stessa cella di memoria della variabile passata come parametro).  

Per ottenere l'effetto desiderato dobbiamo salvare il valore di ritorno della funzione:

```C
int main(void){
    int num = 13;
    num = increment(num); // Assegno a num il valore ritornato dalla funzione
    printf("%d\n", num);  // Stampa 14
    return 0;
}
```

In C tutti i valori (anche quelli più complessi come le strutture che vedremo in futuro) sono passati **per copia**. L'unico modo per fare si che si possa modificare il valore della variabile passata come parametro sarebbe quello di passare il parametro come un **puntatore** ma questo lo vedremo prossimamente.