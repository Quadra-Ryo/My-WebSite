# Compilatore C e Hello World

Come già accennato nella pagina introduttiva un file in linguaggio C ha bisogno di essere compilato prima di poterlo eseguire.  

Andiamo a scrivere un semplice file di "hello world" in C e andiamolo a chiamare `main.c`, anche provandolo ad eseguire trasformandolo in un eseguibile quest'ultimo non verrà eseguito correttamente.

```c
#include <stdio.h>

int main(void){
    printf("Hello World\n");
    return 0;
}
```

Possiamo andare a compilare questo file con il comando `cc main.c`, una volta eseguito il comando si vedrà apparire nella cartella un file che si chiama `a.exe` (in caso voi stiate usando windows `a.out` su Unix, Linux e Mac).  
Aprendo un terminale ed andando ad eseguire questo file usando il comando `./a.exe` si andrà ad eseguire correttamente il file compilato e infatti si vedrà come output nella console la stringa "Hello world".  

Andando a compilare utilizzando il comando `cc -S main.c` potremo andare a salvare all'interno della nostra cartella un file ".s" che conterrà il codice assembly del programma stesso.  
Aprendolo potremo notare una chiamata `bl _printf` con la stringa `"Hello World\n"`.  

```c
bl _printf

...

.asciz "Hello World \n"
```

Adesso possiamo andare ad introdurre un nuovo concetto, l'ottimizzazione del compilatore, quando andiamo a compilare un programma si può decidere un livello di ottimizzazione del quale si vuole usufruire andando ad aggiungere andando ad aggiungere `-O1`, `-O2` oppure `-O3`, ovviamente più è alto il livello di ottimizzazione maggiore sarà il livello di ottimizzazione applicato dal compilatore stesso.  
In caso non venga specificato il livello di ottimizzazione di default sarà `-O0` cioè "nessuna ottimizzazione".  
L'ottimizzazione è una richiesta che noi facciamo al compilatore per dargli la possibilità di andare a trovare delle inefficienze all'interno del nostro codice e che andrà a tradurre in un programma più efficiente ma con lo stesso identico comportamento del codice fornito.  
Quindi andando a richiamare il comando `cc -O2 -S main.c` potremo andare a compilare in maniera più efficiente il nostro programma e potremo anche andare a leggere il file assembly che ne deriva.  

Noteremo subito alcune cose:
- Il programma è molto più corto
- La chiamata alla funzione `printf` è sparita e al suo posto c'è una chiamata alla funzione `puts`, infatti quest'ultima ha un funzionamento molto simile alla funzione printf con due differenze sostanziali, aggiunge automaticamente il new line a fine stringa ed è più semplice ed ottimizzata per questo caso specifico.
- La stringa che è presente alla fine del codice non è più `"Hello World\n"` bensì `"Hello World"` in quanto il compilatore ha riconosciuto la differenza tra le due funzioni andando a rimuovere automaticamente il new line.

```c
bl _puts

...

.asciz "Hello World"
```

## Analisi del codice
Pur sembrando molto semplice possiamo imparare molto dal codice che abbiamo appena scritto anche essendo solo un semplice "Hello World".  

Iniziamo con la prima istruzione:

```c
#include <stdio.h>
```

Tutte le istruzioni che iniziano con il carattere `#` in C sono considerate **direttive del pre-processore**.  
Le direttive sono delle parti di codice che vengono processate prima che il programma stesso venga compilato. A volte questo processo può essere fatto dal compilatore stesso ma è utile immaginare questo processo come fatto da un programma esterno al processore.  

Il pre-processore che interpreta queste direttive fa un azione molto semplice: un azione di trasformazione.  
Immaginate come se il pre-processore andasse ad includere il file che si trova tra `<>` all'interno del nostro file. Quindi è come se il pre-processore andasse a sovrascrivere la nostra linea di codice con il file stesso che trova da qualche parte nella memoria del nostro pc concatenando il contenuto del file incluso con il nostro codice.  
In questo caso noi stiamo facendo includere il file di libreria `stdio.h` all'interno del nostro codice.  

Esempio di funzionamento di un preprocessore:  
Supponiamo di avere un file di nome "print.c" con all'interno un unica linea di codice, cioè `printf("Hello World\n");`, adesso supponiamo di avere il seguente codice:

```c
#include <stdio.h>

int main(void){
    #include "print.c"
    return 0;
}
```

L'output che avremo eseguendo questo programma sarà esattamente "Hello World" perchè il precompilatore avrà sostituito l'include con la riga di codice che avevamo inserito nel file "print.c" andando a compilare il seguente codice:

```c
#include <stdio.h>

int main(void){
    printf("Hello World\n");
    return 0;
}
```

## Intestazioni e stdio.h
Il file `stdio.h` è un file che contiene tutte le intestazioni (In inglese header dal quale deriva il `.h`) delle funzioni che sono contenute all'interno della libreria stdio.  
Le intestazioni servono a dare un idea al compilatore di come sono formate le funzioni che andiamo ad utilizzare all'interno del nostro codice come ad esempio `printf`. Infatti `printf` è una funzione che fa parte della libreria standard del c ma non fa del linguaggio stesso (Come ad esempio "int", "void", "for", "return", ecc. che sono keywords del c).  
Infatti i file C possono avere due estenzioni `.h` oppure `.c`, entrambi contengono codice in c ma nel primo caso contiene codice utile per far funzionare il codice ma senza logica delle funzioni stesse mentre nel secondo caso il file contiene la logica stessa delle funzioni. Molto spesso i file `.h` verranno inclusi in diversi file `.c` andando ad utilizzare il preprocessore.  

Proviamo ad andare ad eliminare la linea di codice `#include <stdio.h>` per vedere cosa succede.

```c
int main(void){
    printf("Hello World\n");
    return 0;
}
```

:::{admonition} ERRORE DEL COMPILATORE
:class: error, sd-bg-danger sd-text-white
main.c:2:5: error: implicit declaration of function 'printf' [-Wimplicit-function-declaration]
:::

L'errore ci sta dicendo che all'interno del nostro file `main.c` alla riga 2, colonna 5 è stata trovata una dichiarazione implicita di una funzione di nome `printf` questo perchè il compilatore non riesce a capire che argomenti e il tipo di ritorno corretti per la funzione che trova.  
Adesso, invece di includere di nuovo il file header, proviamo ad andare ad includere la dichiarazione che si trova all'interno della documentazione ufficiale della funzione all'interno del file.  

```c
int printf(const char * restrict format, ...);

int main(void){
    printf("Hello world\n");
    return 0;
}
```

Come è possibile vedere questa linea di codice che abbiamo inserito è molto simile al nostro `main` con l'unica differenza che non sono presenti le parentesi graffe e non è presente la logica stessa della funzione ma che, dopo aver definito gli argomenti della funzione, si trova un punto e virgola.  
Questo si chiama **prototipazione di una funzione**, serve a dichiarare esplicitamente il tipo di ritorno e i tipi dei parametri della funzione affinchè quando un altro programma chiama la funzione voluta (In questo caso `printf`) anche non avendo a disposizione il codice della funzione stessa è in grado di sapere che tipo di variabile ritorna e che tipo di argomenti passare alla funzione dando le informazioni minime necessarie al compilatore per poter produrre il codice assembly da compilare.
quest'ultimo non verrà eseguito correttamente
Infatti se provassimo a compilare questo codice ed ad eseguirlo vedremo che compilerà tranquillamente e che avrà la stessa identica funzione del codice nel quale veniva incluso `<stdio.h>`

## Linker 
Vi sarete chiesti "Ma come è possibile che solo utilizzando l'intestazione della funzione il programma vada a leggere il codice all'interno della funzione che richiamo?".  
Questo avviene grazie ad un programma chiamato **Linker**.  
Questo programma si occupa di prendere il codice che hai scritto, intercettare le funzioni che hai utilizzato ma non definito (le funzioni esterne il quale corpo non è presente all'interno del tuo codice), collegare il tuo codice con le librerie all'interno delle quali si trova quel codice ed infine ritornare in output l'eseguibile completo (`.out` o `.exe`).  

### Il processo completo di compilazione
Quando compiliamo un programma C, in realtà avvengono diverse fasi in sequenza:
```
Codice sorgente (.c) 
    ↓ [PREPROCESSORE]
Codice preprocessato 
    ↓ [COMPILATORE]
Codice assembly (.s)
    ↓ [ASSEMBLER]
Codice oggetto (.o o .obj)
    ↓ [LINKER]
Eseguibile finale (a.out o a.exe)
```

### Come funziona nella pratica
Prendiamo come esempio il nostro codice con `printf`:
```c
int printf(const char * restrict format, ...);

int main(void){
    printf("Hello world\n");
    return 0;
}
```

**Durante la compilazione:**
- Il compilatore vede il prototipo di `printf`
- Sa che `printf` prende una stringa e ritorna un `int`
- Genera codice assembly che fa una chiamata a `printf` (es. `bl _printf`)
- Il compilatore **NON** ha bisogno del codice effettivo di `printf`, solo della sua "firma"
- Produce un file oggetto `main.o`

**Durante il linking:**
- Il linker prende `main.o`
- Vede che c'è un riferimento a `printf` ma il codice di `printf` non è in `main.o`
- Va a cercare `printf` nella libreria standard C (di solito `libc.so` su Linux o `msvcrt.dll` su Windows)
- Collega il tuo codice con la libreria, creando l'eseguibile finale

Il linker è un programma separato (spesso chiamato `ld`), ma viene invocato automaticamente dal comando `cc` o `gcc`:

### Perché funziona anche senza `#include <stdio.h>`?
Questo è il motivo per cui il nostro esempio funziona anche fornendo manualmente il prototipo:

- **Con `#include <stdio.h>`**: Il compilatore conosce il prototipo di `printf`, compila senza errori, il linker poi collega la libreria C standard
- **Con prototipo manuale**: Il compilatore conosce il prototipo (perché glielo abbiamo fornito noi), compila senza errori, il linker poi collega la libreria C standard (esattamente come prima)

In entrambi i casi, il linker fa sempre la stessa cosa: collega automaticamente la libreria standard C.

### Esempio di errore del linker
Se invece proviamo a chiamare una funzione che non esiste da nessuna parte:
```c
void funzione_inesistente(void);

int main(void){
    funzione_inesistente();
    return 0;
}
```

**Compilazione**: Ok (il compilatore conosce il prototipo)  
**Linking**: Errore

:::{admonition} ERRORE DEL COMPILATORE (Dato dal linker)
:class: error, sd-bg-danger sd-text-white
undefined reference to `funzione_inesistente'
:::

Il linker non riesce a trovare il codice della funzione in nessuna libreria e quindi produce un errore.