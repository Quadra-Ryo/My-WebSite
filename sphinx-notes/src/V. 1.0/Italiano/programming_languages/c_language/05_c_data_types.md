# Tipi di variabili

## Introduzione ai tipi di variabili
Essendo che il linguaggio C è nato per poter essere eseguito in ogni tipo di macchina, dai microcontrollori ai super computer, per tale motivo esistono molte versioni del C per dare la possibilità al linguaggio di girare su ogni macchina.  
Per questo motivo il C, a differenza di altri linguaggi come Python e Java, non ha una grandezza standard per le sue variabili.  
Per fare un esempio prendiamo il tipo `int`. Il tipo `int` all'interno di linguaggi come Java ha una lunghezza standard di 32 bit (4 Bytes) e può contenere valori che vanno da `-2.147.483.648` a `2.147.483.647`, in C non abbiamo invece questa certezza, non saremo mai certi dell'effettiva grandezza in memoria di una variabile.  
L'unica certezza che abbiamo indipendentemente dalla versione di C e dalla macchina che stiamo andando ad usare è il campo `unsigned` (Esempio: `unsigned int`) che andrà a forzare i nostri numeri senza segno non dando la possibilità di rappresentare numeri negativi ma andando ovviamente a dare la possibilità di rappresentare il doppio dei numeri positivi (Esempio per `unsigned int` il range va è `0 - 4.294.967.295` considerando un intero di 4 bytes)

## Come risolvere (funzione sizeof)
Per questo motivo però ci viene in soccorso una funzione molto utile chiamata `sizeof()`:  

```C
#include <stdio.h>

int main(void){
    int a = 5;
    printf("The size of int is %d bytes\n", sizeof(a));
    return 0;
}
```

Vedremo che apparirà un warning nella console:  
```{warning}
**COMPILER ERROR**
main.c:5:33: warning: format '%d' expects argument of type 'int', but argument 2 has type 'long long unsigned int'
```
 
Questo è perchè noi con il format specifier `%d` stiamo chiedendo al nostro compiler di aspettarsi un tipo intero mentre la funzione sizeof() ritorna un intero lungo senza segno creando una discrepanza e un possibile overflow di dati.  
Per risolvere questo basterà andare ad usare il format specifier `%llu` che sta per "long long unsigned".  
Adesso buildando ed eseguendo il programma vedremo in output `The size of int is 4 bytes` e quindi sapremo di poter rappresentare 2^32 simboli (4.294.967.295 simboli che possono essere in caso di unsigned numeri da 0 a 4.294.967.295 oppure in caso di intero con segno da `-2^31` cioè `-2.147.483.648` a `(2^31) - 1` cioè `2.147.483.647` sottraiamo 1 dai numeri positivi in quanto un numero viene preso dal carattere "0").

## Include limits.h
Invece di dover fare i calcoli con la calcolatrice per capire il numero massimo e minimo rappresentabile da un tipo di variabile possiamo andare a sfruttare `limits.h` includendola all'interno del nostro programma.  
Si potrà andare ad usare le definizioni contenute all'interno del file andando a richiamare (nel caso di variabili intere) `INT_MIN` e `INT_MAX` come riportato qui sotto:  

```C
#include <stdio.h>
#include <limits.h>

int main(void){
    int a = 5;
    printf("The maximum size of int is %d and the minimum size of int is %d", INT_MAX, INT_MIN);
    return 0;
}
```

Queste due definizioni verranno sostituite automaticamente dal preprocessore con i valori massimi e minimi che può essere rappresentato dal tipo int **IN QUESTA PIATTAFORMA**.  
L'output infatti sarà:  `The maximum size of int is 2147483647 and the minimum size of int is -2147483648`.  


## Variabili nei sistemi moderni a 32 e 64 bit
Pur non essendo garantito dallo standard C, al contrario delle macchine del passato dove nulla poteva essere dato per scontato, nemmeno la grandezza di un Byte a 8 bit in quanto in alcuni casi era 9, nei giorni moderni abbiamo una certa standardizzazione dei tipi in C che troverete nel 99% delle macchine:  

```{list-table} Tipi primitivi in C
:widths: 10 16 5 26 13 20 13
:header-rows: 1

* - Tipo
  - Tipo Unsigned
  - Dim.
  - Descrizione
  - Format specifier
  - Range (signed)
  - Range (unsigned)
* - `bool`
  - —
  - 1 byte
  - Valore booleano: vero o falso
  - `%d`
  - 0 – 1
  - —
* - `char`
  - `unsigned char`
  - 1 byte
  - Carattere (es. `'a'`) o valore decimale ASCII
  - `%c` `%d`
  - \-128 – 127
  - 0 – 255
* - `short`
  - `unsigned short`
  - 2 byte
  - Intero a 16 bit
  - `%hd`
  - \-32.768 – 32.767
  - 0 – 65.535
* - `int`
  - `unsigned int`
  - 4 byte
  - Intero a 32 bit, tipo intero di default
  - `%d`
  - \-2.147.483.648 – 2.147.483.647
  - 0 – 4.294.967.295
* - `long long`
  - `unsigned long long`
  - 8 byte
  - Intero a 64 bit
  - `%lld`
  - \-9.223.372.036.854.775.808 – 9.223.372.036.854.775.807
  - 0 – 18.446.744.073.709.551.615
* - `float`
  - —
  - 4 byte
  - Virgola mobile precisione singola, ~6-7 cifre decimali
  - `%f` `%e` `%g`
  - ±1.2×10⁻³⁸ – ±3.4×10³⁸
  - —
* - `double`
  - —
  - 8 byte
  - Virgola mobile precisione doppia, ~15-16 cifre decimali
  - `%lf` `%e` `%g`
  - ±2.3×10⁻³⁰⁸ – ±1.7×10³⁰⁸
  - —
```

## Tipi particolari

I più attenti avranno notato che dalla tabella sopra mancano due tipi specifici: il tipo `long` e il tipo `long double`.  
Questo perchè questi due tipi sono tipi speciali che seguono delle regole specifiche importanti che ne fanno cambiare la dimensione al variare della macchina.

### Tipo long
Il tipo long viene pensato (su sistemi Linux e su sistemi macOS) come tipo di riferimento per rappresentare perfettamente una "parola". Una `parola` non è altro che il termine tecnico per indicare la dimensione di un registro di memoria che sarà quindi `4 Bytes` per i sistemi a 32 bit mentre sarà `8 Bytes` per i sistemi a 64 bit.  
Per Windows invece il discorso è più semplice in quanto Windows non segue lo standard della variabile di tipo long in quanto forza anche sui sistemi a 64 bit la lunghezza di 4 Bytes per i tipi long per via del Windows ABI chiamato "LLP64".

```{note}
**INFO**  
LLP64 è un modello ABI (Application Binary Interface) che definisce la dimensione in byte dei tipi primitivi del C su una determinata piattaforma.
Il nome è un acronimo che descrive proprio le dimensioni:

- Long → 32 bit (4 byte)
- Long long → 64 bit (8 byte)
- Pointer → 64 bit (8 byte)

È il modello usato da Windows a 64 bit. La scelta di Microsoft fu mantenere long a 32 bit per compatibilità con il codice Windows a 32 bit già esistente, evitando di dover riscrivere milioni di righe di codice legacy che assumevano long = 4 byte.
Lo si contrappone al modello LP64, usato invece da Linux, macOS e tutti i sistemi Unix-like a 64 bit, dove:

- Long → 64 bit (8 byte)
- Pointer → 64 bit (8 byte)
```

Nel passato per salvare in memoria dei puntatori veniva spesso usato il tipo intero non andando a considerare la possibilità di avere sistemi a 64 bit e per questo molti codici del passato se eseguiti su macchine moderne porterebbero ad unexpected behaviours oppure, molto spesso, al crash diretto.

### Long Double
Il tipo Long Double è ancora più strano con 3 dimensioni possibili:  
Per sistemi Linux e per sistemi macOS la dimensione è di `10 Bytes` (Permette di rappresentare numeri con 18-19 cifre significative) per sistemi a 32 bit e di `16 Bytes` (Permette di rappresentare numeri con 33-34 cifre significative) per architetture a 64 bit.  
Al contrario Windows semplicemente considera i `long double` come semplici `double`.

```{note}
**INFO**  
La ragione per cui Windows tratta `long double` come un semplice `double` (64 bit) è legata alle stesse scelte architetturali dell'ABI LLP64. Il formato a 80 bit (extended precision x87) esiste a livello hardware nelle CPU x86 fin dagli anni '80, ma Microsoft scelse di non esporlo nell'ABI x64 per due motivi principali:

- **Performance**: le operazioni x87 a 80 bit sono più lente rispetto alle operazioni SSE2 a 64 bit. Microsoft abbracciò SSE2 come standard per i floating point su x64, abbandonando lo stack x87.
- **Compatibilità**: mantenere `long double == double` semplifica il porting di codice cross-platform evitando sorprese legate alla precisione estesa.

Il risultato pratico è che `sizeof(long double)` restituisce `12` o `16` su Linux/macOS (a seconda dell'allineamento) e `8` su Windows, identico a `sizeof(double)`.
```

## Tipi avanzati
Per avere una sicurezza a livello di memoria ci vengono in soccorso i tipi avanzati del C importabili grazie a `stdint.h` all'interno del nostro programma.  
Questi sono tipi "nuovi" che non sono nati con il C e che all'inizio non facevano parte della specifica ma che ci permettono di specificare il tipo e la grandezza precisa della variabile che voglio.  
Esempio: `uint64_t` ad esempio è un intero (`int`), unsigned (`u`) di grandezza 64 bit (`64_t`).  

Un elemento importante di questa libreria è `size_t` che rappresenta la grandezza teoricamente massima che può avere un oggetto di qualsiasi tipo (Array, matrice, file) all'interno del nostro programma. Una grandezza che non può essere superata che decidiamo noi.  
Altri tipi speciali di questa specifica sono `intptr_t` e `uintptr_t`. Il primo è pensato per essere la grandezza perfetta per salvare in memoria un puntatore ad una cella di memoria indipendentemente dalla macchina su cui operiamo ed è un tipo con segno (può quindi rappresentare valori negativi). Il secondo è uguale al primo ma senza segno (unsigned), utile quando si lavora con indirizzi di memoria puri. Il tipo con segno `intptr_t` può sembrare di funzionalità dubbia in quanto non andrò mai ad avere un indirizzo di memoria negativo, ma viene usato per fare operazioni di sottrazione sui puntatori per vedere, ad esempio, se un valore è salvato prima di un altro all'interno della mia memoria.