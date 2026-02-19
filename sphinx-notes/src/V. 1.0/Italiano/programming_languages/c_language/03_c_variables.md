# Variabili locali e Memoria

## Variabili locali

Le variabili sono delle celle di memoria alle quali noi "andiamo a dare un nome" per poi poterci salvare dei dati specifici.  

Possiamo vederle come delle piccole scatole all'interno della nostra memoria al cui interno possiamo andare ad inserire i dati che vogliamo salvare in quel momento.  

Proviamo a scrivere un programma che fa la somma di due numeri usando delle variabili locali all'interno del main.  

```c
#include <stdio.h>

int main(void){
    int num1 = 3;
    int num2 = 4;
    int sum = num1 + num2;

    printf("The sum of 3 and 4 is: %d\n", sum);
    return 0;
}
```

Come vedete, anche per dichiarare una variabile abbiamo utilizzato una sintassi simile a quella di una funzione: prima il tipo e poi subito dopo il nome che vogliamo assegnare alla variabile.

In C è necessario tipare esplicitamente le variabili, cioè prima di andare ad assegnare un valore ad una variabile dobbiamo specificare di che tipo sia quella variabile (a differenza di linguaggi come Python dove una sintassi come `a = 5` è permessa).

Quello che siamo andati a fare all'interno del programma che abbiamo appena scritto consiste essenzialmente in due passaggi che avvengono contemporaneamente: la **dichiarazione** di una variabile `int num1` e l'**inizializzazione** della variabile ad un valore di partenza che può essere un numero (`num1 = 3;`) oppure un'espressione (`sum = num1 + num2;`).

Lo stesso programma può essere scritto in altri modi, come ad esempio:

```c
#include <stdio.h>

int main(void){
    int num1, num2, sum;

    num1 = 3;
    num2 = 4;
    sum = num1 + num2;

    printf("The sum of 3 and 4 is: %d\n", sum);
    return 0;
}
```

Questo codice è sostanzialmente identico al codice che abbiamo scritto precedentemente, con l'unica differenza che in questo caso non andiamo ad inizializzare le variabili a nessun valore (che quindi partono da un valore a noi non noto), ma andiamo a fare un'assegnazione di valori successivamente alla dichiarazione.

### Scope delle variabili

Tutte le variabili che abbiamo visto hanno uno **scoping locale**, questo significa che esistono solo all'interno della funzione stessa. Per capire meglio questo concetto torniamo all'esempio della funzione sum.

```c
#include <stdio.h>

int sum(int num1, int num2){
    int sum;

    sum = num1 + num2;

    return sum;
}

int main(void){
    printf("The operation: 3 + 4 = %d\n", sum(3,4));
    return 0;
}
```

In questo caso avremo delle variabili locali all'interno della funzione sum. Cosa succede quindi?

Innanzitutto capiamo come verranno chiamate le funzioni:
1. Essendo l'inizio del programma, verrà chiamato il main
2. Dato che printf ha bisogno di tutti gli argomenti per essere richiamato, come seconda funzione chiameremo sum per avere il risultato da passare alla funzione printf
3. Chiameremo infine la funzione printf con tutti gli argomenti disponibili

Ciò si può vedere anche all'interno del file assembly:

```assembly
call    __main  <-- Main
movl    $4, %edx
movl    $3, %ecx
call    sum     <-- Sum
movl    %eax, %edx
leaq    .LC0(%rip), %rax
movq    %rax, %rcx
call    printf  <-- Printf
```

### Argomenti vs Parametri

È importante distinguere tra:
- **Argomenti**: i valori passati ad una funzione durante una chiamata (es. `sum(3, 4)` → 3 e 4 sono gli argomenti)
- **Parametri**: le variabili utilizzate all'interno della funzione per ricevere il valore degli argomenti (es. `int sum(int num1, int num2)` → num1 e num2 sono i parametri)

I parametri non sono altro che variabili locali loro stesse.

### Ciclo di vita delle variabili locali

Capiamo cosa succede all'interno della memoria quando andiamo a chiamare la funzione sum:

1. Una volta chiamata la funzione, viene allocata della memoria nello stack per le tre variabili num1, num2 e sum. Inizialmente non viene assegnato loro un valore, è come se venissero create "vuote"
2. Le variabili continuano ad esistere finché la funzione è in esecuzione, in quanto stanno venendo usate
3. Una volta eseguito il return, le variabili locali all'interno della funzione vengono "distrutte", cioè vengono deallocate dalla memoria e quelle celle di memoria specifiche potranno essere usate per altre chiamate senza rimanere vincolate alle variabili locali precedenti

In poche parole, le variabili locali sono variabili che vengono create ogni volta che la funzione viene richiamata e rimangono in vita solo durante l'esecuzione della funzione per poi venire "distrutte".

---

## Approfondimento sulla memoria

### Composizione della memoria

Iniziamo chiarendo meglio come è composta la memoria:

1. I **registri** sono delle piccole unità di memoria all'interno del microprocessore che sono in grado di operare ad altissima velocità.

2. Un livello intermedio costituito dalle **memorie cache** (L1, L2, L3), che rappresentano un compromesso tra velocità e capacità e servono ad ottimizzare l'accesso tra registri e RAM. Ogni livello lavora come un magazzino: in caso tu voglia il dato all'indirizzo 0x1000, prima verrà cercato in L1, poi in L2, poi in L3 e solo infine nella RAM.

3. La **memoria RAM** è un'unità di memorizzazione molto più grande dei registri e delle cache, ma più lenta.

4. Nelle architetture tradizionali, quando un dato deve essere elaborato, è necessario che quest'ultimo si trovi all'interno dei registri. Tuttavia, i processori più moderni hanno istruzioni più complesse che permettono di operare direttamente su dati in memoria, anche se internamente il processore utilizza comunque registri temporanei per eseguire le operazioni.

### Lo Stack

Lo **stack** (pila) è una regione della memoria RAM organizzata secondo il principio **LIFO** (Last In, First Out - "ultimo ad entrare, primo ad uscire"), come una pila di CD: puoi aggiungere o togliere CD solo dalla cima.

#### A cosa serve

Lo stack viene utilizzato principalmente per:

1. **Memorizzare variabili locali** delle funzioni
2. **Salvare indirizzi di ritorno** quando si chiamano funzioni
3. **Passare parametri** alle funzioni
4. **Salvare temporaneamente registri** durante l'esecuzione

#### Come funziona

Il processore usa un registro speciale chiamato **Stack Pointer (SP)** che punta sempre alla "cima" dello stack (l'ultimo elemento inserito).

#### Operazioni principali

Le operazioni che sono possibili sullo stack permettono di andare a salvare il valore di un registro all'interno dello stack e viceversa in una singola operazione molto veloce.

- **PUSH**: inserisce un dato nello stack
  - Decrementa lo stack pointer
  - Scrive il dato nella nuova posizione

- **POP**: rimuove un dato dallo stack
  - Legge il dato dalla posizione corrente
  - Incrementa lo stack pointer

#### Esempio pratico

```
Stack iniziale (vuoto):
SP → [____]

PUSH 10:
     [____]
SP → [_10_]

PUSH 20:
     [_10_]
SP → [_20_]

POP (ritorna 20):
SP → [_10_]
     [____]
```

#### Esempio con chiamata a funzione

Quando chiami una funzione, succede questo:

1. I parametri vengono messi sullo stack (PUSH)
2. L'indirizzo di ritorno viene salvato sullo stack (PUSH)
3. Le variabili locali della funzione vengono allocate sullo stack
4. Quando la funzione termina, tutto viene rimosso dallo stack (POP) e il programma torna all'indirizzo salvato

#### Nota importante

Lo stack **cresce verso il basso** in memoria (indirizzi decrescenti), cioè quando fai PUSH, lo stack pointer diminuisce.

---

## Assembly

Ora che abbiamo un'idea di come funziona la memoria all'interno della nostra macchina possiamo andare a vedere come ragiona in assembly il nostro processore per capire meglio come vengono salvati i dati.

Vedremo delle architetture che utilizzano lo stack in maniera principale. Questa non è altro che una convenzione per garantire che gli argomenti vengano sempre accettati perché passati allo stesso modo, anche se il programma che richiama la funzione e quello nel quale si trova la funzione richiamata vengono compilati con compilatori differenti, a patto che l'architettura rimanga la stessa. Questo è anche il motivo per il quale al compilatore basta avere il prototipo della funzione per richiamare correttamente la funzione: dato il prototipo di una funzione, il C saprà come andare a richiamare correttamente quella funzione bastando conoscere l'indirizzo nel quale è registrata.

Ultimo concetto da capire prima di tuffarci all'interno dell'assembly è il **PC** (Program Counter), che altro non è che un registro che salva l'indirizzo dell'istruzione successiva da eseguire. In caso di una chiamata di una funzione, una volta che la funzione ritorna, il programma lo usa per capire da che istruzione riprendere l'esecuzione, visto che quella funzione potrebbe essere chiamata da ovunque nel programma.

### Esempio pratico

Prendiamo come esempio questo codice in un'architettura x86 `x86 msvc v19.14 (ex-WINE)` ([simulatore](https://godbolt.org)):

```c
int sum(int num1, int num2){
    return num1 + num2;
}

int main(void){
    return sum(3,4);
}
```

In assembly vedremo che diventa:

```assembly
_num1$ = 8 ; size = 4
_num2$ = 12 ; size = 4

_sum    PROC
        push    ebp
        mov     ebp, esp
        mov     eax, DWORD PTR _num1$[ebp]
        add     eax, DWORD PTR _num2$[ebp]
        pop     ebp
        ret     0
_sum    ENDP

_main   PROC
        push    ebp
        mov     ebp, esp
        push    4
        push    3
        call    _sum
        add     esp, 8
        pop     ebp
        ret     0
_main   ENDP
```

### Analisi dettagliata del codice

Prima di iniziare, capiamo le costanti definite:
- `_num1$ = 8`: indica che `num1` si trova 8 byte sopra `ebp`
- `_num2$ = 12`: indica che `num2` si trova 12 byte sopra `ebp`

Questi offset sono necessari perché tra `ebp` e i parametri ci sono:
- Il vecchio `ebp` salvato (4 byte)
- L'indirizzo di ritorno (4 byte)
- Quindi il primo parametro è a `ebp + 8` e il secondo a `ebp + 12`

Ora analizziamo passo per passo l'esecuzione con rappresentazioni grafiche dello stack:

---

**Stato iniziale**
```
Stack:
        [...]
ESP →   [...]
EBP →   [vecchio ebp del chiamante]
```

---

**1. `push ebp` (in `_main`)**
Salva il base pointer corrente nello stack.

```assembly
push    ebp
```

```
Stack:
        [...]
ESP →   [vecchio ebp]  ← salvato
EBP →   [vecchio ebp del chiamante]
```

**Cosa succede**: ESP viene decrementato e il valore di EBP viene scritto nella nuova posizione.

---

**2. `mov ebp, esp` (in `_main`)**
Imposta il nuovo base pointer al valore corrente dello stack pointer.

```assembly
mov     ebp, esp
```

```
Stack:
        [...]
ESP →   [vecchio ebp]
EBP →   [vecchio ebp]  ← nuovo frame di stack
```

**Cosa succede**: Ora EBP punta all'inizio del frame di stack della funzione `main`.

---

**3. `push 4` (in `_main`)**
Inserisce il secondo parametro (4) nello stack.

```assembly
push    4
```

```
Stack:
        [vecchio ebp]
ESP →   [4]            ← secondo parametro
EBP →   [vecchio ebp]
```

**Nota**: I parametri vengono inseriti in ordine inverso (da destra a sinistra) per garantire che il primo parametro sia più vicino a EBP.

---

**4. `push 3` (in `_main`)**
Inserisce il primo parametro (3) nello stack.

```assembly
push    3
```

```
Stack:
        [vecchio ebp]
        [4]            ← num2
ESP →   [3]            ← num1
EBP →   [vecchio ebp]
```

---

**5. `call _sum` (in `_main`)**
Chiama la funzione `sum`. Questo salva automaticamente l'indirizzo di ritorno (PC) nello stack e salta alla funzione.

```assembly
call    _sum
```

```
Stack:
        [vecchio ebp]
        [4]            ← num2 (a EBP + 12 della funzione sum)
        [3]            ← num1 (a EBP + 8 della funzione sum)
ESP →   [indirizzo di ritorno (PC)]
EBP →   [vecchio ebp]
```

**Cosa succede**: Il processore salva l'indirizzo dell'istruzione successiva (dopo `call`) nello stack e salta all'inizio di `_sum`.

---

**6. `push ebp` (in `_sum`)**
La funzione `sum` salva il base pointer di `main`.

```assembly
push    ebp
```

```
Stack:
        [vecchio ebp di main]
        [4]            ← num2 (a EBP + 12)
        [3]            ← num1 (a EBP + 8)
        [indirizzo di ritorno]  ← (a EBP + 4)
ESP →   [ebp di main]  ← (diventerà il nuovo EBP)
EBP →   [vecchio ebp di main]
```

---

**7. `mov ebp, esp` (in `_sum`)**
Imposta il nuovo base pointer per la funzione `sum`.

```assembly
mov     ebp, esp
```

```
Stack:
        [vecchio ebp di main]
        [4]            ← num2 (a EBP + 12)
        [3]            ← num1 (a EBP + 8)
        [indirizzo di ritorno]  ← (a EBP + 4)
ESP →   [ebp di main]  ← (a EBP + 0)
EBP →   [ebp di main]  ← nuovo frame di stack per sum
```

**Importante**: Ora possiamo capire gli offset:
- `EBP + 0`: vecchio EBP salvato
- `EBP + 4`: indirizzo di ritorno
- `EBP + 8`: primo parametro (`num1`)
- `EBP + 12`: secondo parametro (`num2`)

---

**8. `mov eax, DWORD PTR _num1$[ebp]` (in `_sum`)**
Carica il primo parametro nel registro EAX.

```assembly
mov     eax, DWORD PTR _num1$[ebp]
```

```
Registri:
EAX = 3  ← caricato da [EBP + 8]

Stack:
        [vecchio ebp di main]
        [4]            ← num2
        [3]            ← num1 (letto)
        [indirizzo di ritorno]
ESP →   [ebp di main]
EBP →   [ebp di main]
```

**Cosa succede**: Il valore all'indirizzo `EBP + 8` (che è 3) viene copiato in EAX.

---

**9. `add eax, DWORD PTR _num2$[ebp]` (in `_sum`)**
Aggiunge il secondo parametro ad EAX.

```assembly
add     eax, DWORD PTR _num2$[ebp]
```

```
Registri:
EAX = 7  ← 3 + 4

Stack:
        [vecchio ebp di main]
        [4]            ← num2 (letto)
        [3]            ← num1
        [indirizzo di ritorno]
ESP →   [ebp di main]
EBP →   [ebp di main]
```

**Cosa succede**: Il valore all'indirizzo `EBP + 12` (che è 4) viene sommato ad EAX. Risultato: 3 + 4 = 7.

---

**10. `pop ebp` (in `_sum`)**
Ripristina il base pointer di `main`.

```assembly
pop     ebp
```

```
Registri:
EAX = 7  ← valore di ritorno

Stack:
        [vecchio ebp di main]
        [4]
        [3]
ESP →   [indirizzo di ritorno]
EBP →   [vecchio ebp di main]  ← ripristinato
```

**Cosa succede**: Il valore salvato viene ripristinato in EBP e ESP viene incrementato.

---

**11. `ret 0` (in `_sum`)**
Ritorna alla funzione chiamante.

```assembly
ret     0
```

```
Registri:
EAX = 7  ← valore di ritorno mantenuto

Stack:
        [vecchio ebp di main]
        [4]
ESP →   [3]
EBP →   [vecchio ebp di main]
```

**Cosa succede**: Il processore fa il pop dell'indirizzo di ritorno e salta a quell'indirizzo (torna in `main` dopo la `call`). Il `0` indica che non ci sono parametri da pulire dallo stack (viene fatto dal chiamante).

---

**12. `add esp, 8` (in `_main`)**
Libera lo spazio utilizzato dai parametri.

```assembly
add     esp, 8
```

```
Registri:
EAX = 7  ← valore di ritorno ancora presente

Stack:
ESP →   [vecchio ebp di main]
EBP →   [vecchio ebp di main]
```

**Cosa succede**: ESP viene incrementato di 8 byte per "rimuovere" i due parametri da 4 byte ciascuno (3 e 4) che erano stati pushati prima della chiamata.

---

**13. `pop ebp` (in `_main`)**
Ripristina il base pointer originale.

```assembly
pop     ebp
```

```
Registri:
EAX = 7  ← valore di ritorno

Stack:
ESP →   [...]
EBP →   [vecchio ebp del chiamante]  ← ripristinato
```

---

**14. `ret 0` (in `_main`)**
Ritorna al chiamante di `main` (tipicamente il sistema operativo).

```assembly
ret     0
```

```
Registri:
EAX = 7  ← valore di ritorno finale
```

**Cosa succede**: Il programma termina restituendo 7 (il risultato di `sum(3, 4)`).

---

### Conclusioni

Questo esempio fa capire perfettamente:
- Come funziona lo stack nelle chiamate a funzione
- Cosa sono le **variabili locali** in C (valori temporanei salvati nello stack)
- Come vengono passati i **parametri** alle funzioni
- Come funziona il **ritorno da una funzione** e il ripristino dello stack
- Perché i parametri vengono inseriti in **ordine inverso** (per mantenere l'ordine corretto rispetto a EBP)

Ogni volta che il nostro programma richiamerà un'altra funzione, questo processo avverrà di nuovo, creando nuovi frame di stack che si sovrappongono temporaneamente, per poi essere rimossi al termine di ogni funzione.