# Local variables and Memory

## Local variables

Variables are memory cells to which we "give a name" so we can save specific data in them.

We can think of them as small boxes inside our memory where we can insert the data we want to save at that moment.

Let's try writing a program that adds two numbers using local variables inside main.

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

As you can see, to declare a variable we used a syntax similar to that of a function: first the type and then immediately after the name we want to assign to the variable.

In C it is necessary to explicitly type variables, that is, before assigning a value to a variable we must specify what type that variable is (unlike languages like Python where a syntax like `a = 5` is allowed).

What we did inside the program we just wrote essentially consists of two steps that happen simultaneously: the **declaration** of a variable `int num1` and the **initialization** of the variable to a starting value which can be a number (`num1 = 3;`) or an expression (`sum = num1 + num2;`).

The same program can be written in other ways, such as:

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

This code is essentially identical to the code we wrote previously, with the only difference that in this case we do not initialize the variables to any value (which therefore start from a value unknown to us), but we make an assignment of values after the declaration.

### Variable Scope

All the variables we have seen have a **local scope**, this means they exist only inside the function itself. To better understand this concept, let's return to the sum function example.

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

In this case we will have local variables inside the sum function. So what happens?

First let's understand how the functions will be called:
1. Being the beginning of the program, main will be called
2. Since printf needs all the arguments to be called, as the second function we will call sum to get the result to pass to the printf function
3. We will finally call the printf function with all available arguments

This can also be seen inside the assembly file:

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

### Arguments vs Parameters

It is important to distinguish between:
- **Arguments**: the values passed to a function during a call (e.g., `sum(3, 4)` → 3 and 4 are the arguments)
- **Parameters**: the variables used inside the function to receive the value of the arguments (e.g., `int sum(int num1, int num2)` → num1 and num2 are the parameters)

Parameters are nothing more than local variables themselves.

### Lifecycle of Local Variables

Let's understand what happens inside memory when we call the sum function:

1. Once the function is called, memory is allocated on the stack for the three variables num1, num2 and sum. Initially no value is assigned to them, it's as if they were created "empty"
2. The variables continue to exist as long as the function is executing, since they are being used
3. Once the return is executed, the local variables inside the function are "destroyed", that is, they are deallocated from memory and those specific memory cells can be used for other calls without remaining bound to the previous local variables

In short, local variables are variables that are created each time the function is called and remain alive only during the execution of the function and then get "destroyed".

---

## Deep Dive into Memory

### Memory Organization

Let's start by clarifying how memory is organized:

1. **Registers** are small memory units inside the microprocessor that can operate at very high speed.

2. An intermediate level consisting of **cache memories** (L1, L2, L3), which represent a compromise between speed and capacity and serve to optimize access between registers and RAM. Each level works like a warehouse: if you want the data at address 0x1000, it will first be searched in L1, then in L2, then in L3 and only finally in RAM.

3. **RAM memory** is a storage unit much larger than registers and caches, but slower.

4. In traditional architectures, when data needs to be processed, it must be in the registers. However, modern processors have more complex instructions that allow operations directly on data in memory, although internally the processor still uses temporary registers to execute operations.

### The Stack

The **stack** is a region of RAM memory organized according to the **LIFO** principle (Last In, First Out - "last in, first out"), like a stack of CDs: you can add or remove CDs only from the top.

#### What It's Used For

The stack is mainly used for:

1. **Storing local variables** of functions
2. **Saving return addresses** when calling functions
3. **Passing parameters** to functions
4. **Temporarily saving registers** during execution

#### How It Works

The processor uses a special register called **Stack Pointer (SP)** that always points to the "top" of the stack (the last element inserted).

#### Main Operations

The operations possible on the stack allow saving the value of a register into the stack and vice versa in a single very fast operation.

- **PUSH**: inserts data into the stack
  - Decrements the stack pointer
  - Writes the data at the new position

- **POP**: removes data from the stack
  - Reads the data from the current position
  - Increments the stack pointer

#### Practical Example

```
Initial stack (empty):
SP → [____]

PUSH 10:
     [____]
SP → [_10_]

PUSH 20:
     [_10_]
SP → [_20_]

POP (returns 20):
SP → [_10_]
     [____]
```

#### Example with Function Call

When you call a function, this happens:

1. Parameters are put on the stack (PUSH)
2. The return address is saved on the stack (PUSH)
3. The function's local variables are allocated on the stack
4. When the function ends, everything is removed from the stack (POP) and the program returns to the saved address

#### Important Note

The stack **grows downward** in memory (decreasing addresses), that is, when you do PUSH, the stack pointer decreases.

---

## Assembly

Now that we have an idea of how memory works inside our machine, we can go and see how our processor thinks in assembly to better understand how data is saved.

We will look at architectures that use the stack as the main mechanism. This is nothing more than a convention to ensure that arguments are always accepted because they are passed in the same way, even if the program calling the function and the one containing the called function are compiled with different compilers, as long as the architecture remains the same. This is also why the compiler only needs the function prototype to correctly call the function: given the function prototype, C will know how to correctly call that function, needing only to know the address where it is registered.

The last concept to understand before diving into assembly is the **PC** (Program Counter), which is nothing more than a register that saves the address of the next instruction to execute. In case of a function call, once the function returns, the program uses it to understand from which instruction to resume execution, since that function could be called from anywhere in the program.

### Practical Example

Let's take this code as an example in an x86 architecture `x86 msvc v19.14 (ex-WINE)` ([simulator](https://godbolt.org)):

```c
int sum(int num1, int num2){
    return num1 + num2;
}

int main(void){
    return sum(3,4);
}
```

In assembly we will see it becomes:

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

### Detailed Code Analysis

Before starting, let's understand the defined constants:
- `_num1$ = 8`: indicates that `num1` is located 8 bytes above `ebp`
- `_num2$ = 12`: indicates that `num2` is located 12 bytes above `ebp`

These offsets are necessary because between `ebp` and the parameters there are:
- The saved old `ebp` (4 bytes)
- The return address (4 bytes)
- Therefore the first parameter is at `ebp + 8` and the second at `ebp + 12`

Now let's analyze step by step the execution with graphical representations of the stack:

---

**Initial State**
```
Stack:
        [...]
ESP →   [...]
EBP →   [old caller's ebp]
```

---

**1. `push ebp` (in `_main`)**
Saves the current base pointer onto the stack.

```assembly
push    ebp
```

```
Stack:
        [...]
ESP →   [old ebp]  ← saved
EBP →   [old caller's ebp]
```

**What happens**: ESP is decremented and the value of EBP is written at the new position.

---

**2. `mov ebp, esp` (in `_main`)**
Sets the new base pointer to the current stack pointer value.

```assembly
mov     ebp, esp
```

```
Stack:
        [...]
ESP →   [old ebp]
EBP →   [old ebp]  ← new stack frame
```

**What happens**: Now EBP points to the beginning of the stack frame of the `main` function.

---

**3. `push 4` (in `_main`)**
Inserts the second parameter (4) onto the stack.

```assembly
push    4
```

```
Stack:
        [old ebp]
ESP →   [4]            ← second parameter
EBP →   [old ebp]
```

**Note**: Parameters are inserted in reverse order (right to left) to ensure that the first parameter is closer to EBP.

---

**4. `push 3` (in `_main`)**
Inserts the first parameter (3) onto the stack.

```assembly
push    3
```

```
Stack:
        [old ebp]
        [4]            ← num2
ESP →   [3]            ← num1
EBP →   [old ebp]
```

---

**5. `call _sum` (in `_main`)**
Calls the `sum` function. This automatically saves the return address (PC) onto the stack and jumps to the function.

```assembly
call    _sum
```

```
Stack:
        [old ebp]
        [4]            ← num2 (at EBP + 12 of sum function)
        [3]            ← num1 (at EBP + 8 of sum function)
ESP →   [return address (PC)]
EBP →   [old ebp]
```

**What happens**: The processor saves the address of the next instruction (after `call`) onto the stack and jumps to the beginning of `_sum`.

---

**6. `push ebp` (in `_sum`)**
The `sum` function saves main's base pointer.

```assembly
push    ebp
```

```
Stack:
        [old main's ebp]
        [4]            ← num2 (at EBP + 12)
        [3]            ← num1 (at EBP + 8)
        [return address]  ← (at EBP + 4)
ESP →   [main's ebp]  ← (will become the new EBP)
EBP →   [old main's ebp]
```

---

**7. `mov ebp, esp` (in `_sum`)**
Sets the new base pointer for the `sum` function.

```assembly
mov     ebp, esp
```

```
Stack:
        [old main's ebp]
        [4]            ← num2 (at EBP + 12)
        [3]            ← num1 (at EBP + 8)
        [return address]  ← (at EBP + 4)
ESP →   [main's ebp]  ← (at EBP + 0)
EBP →   [main's ebp]  ← new stack frame for sum
```

**Important**: Now we can understand the offsets:
- `EBP + 0`: saved old EBP
- `EBP + 4`: return address
- `EBP + 8`: first parameter (`num1`)
- `EBP + 12`: second parameter (`num2`)

---

**8. `mov eax, DWORD PTR _num1$[ebp]` (in `_sum`)**
Loads the first parameter into the EAX register.

```assembly
mov     eax, DWORD PTR _num1$[ebp]
```

```
Registers:
EAX = 3  ← loaded from [EBP + 8]

Stack:
        [old main's ebp]
        [4]            ← num2
        [3]            ← num1 (read)
        [return address]
ESP →   [main's ebp]
EBP →   [main's ebp]
```

**What happens**: The value at address `EBP + 8` (which is 3) is copied into EAX.

---

**9. `add eax, DWORD PTR _num2$[ebp]` (in `_sum`)**
Adds the second parameter to EAX.

```assembly
add     eax, DWORD PTR _num2$[ebp]
```

```
Registers:
EAX = 7  ← 3 + 4

Stack:
        [old main's ebp]
        [4]            ← num2 (read)
        [3]            ← num1
        [return address]
ESP →   [main's ebp]
EBP →   [main's ebp]
```

**What happens**: The value at address `EBP + 12` (which is 4) is added to EAX. Result: 3 + 4 = 7.

---

**10. `pop ebp` (in `_sum`)**
Restores main's base pointer.

```assembly
pop     ebp
```

```
Registers:
EAX = 7  ← return value

Stack:
        [old main's ebp]
        [4]
        [3]
ESP →   [return address]
EBP →   [old main's ebp]  ← restored
```

**What happens**: The saved value is restored to EBP and ESP is incremented.

---

**11. `ret 0` (in `_sum`)**
Returns to the calling function.

```assembly
ret     0
```

```
Registers:
EAX = 7  ← return value maintained

Stack:
        [old main's ebp]
        [4]
ESP →   [3]
EBP →   [old main's ebp]
```

**What happens**: The processor pops the return address and jumps to that address (returns to `main` after the `call`). The `0` indicates that there are no parameters to clean from the stack (it's done by the caller).

---

**12. `add esp, 8` (in `_main`)**
Frees the space used by the parameters.

```assembly
add     esp, 8
```

```
Registers:
EAX = 7  ← return value still present

Stack:
ESP →   [old main's ebp]
EBP →   [old main's ebp]
```

**What happens**: ESP is incremented by 8 bytes to "remove" the two 4-byte parameters (3 and 4) that were pushed before the call.

---

**13. `pop ebp` (in `_main`)**
Restores the original base pointer.

```assembly
pop     ebp
```

```
Registers:
EAX = 7  ← return value

Stack:
ESP →   [...]
EBP →   [old caller's ebp]  ← restored
```

---

**14. `ret 0` (in `_main`)**
Returns to main's caller (typically the operating system).

```assembly
ret     0
```

```
Registers:
EAX = 7  ← final return value
```

**What happens**: The program terminates returning 7 (the result of `sum(3, 4)`).

---

### Conclusions

This example perfectly demonstrates:
- How the stack works in function calls
- What **local variables** are in C (temporary values saved on the stack)
- How **parameters** are passed to functions
- How **returning from a function** and stack restoration works
- Why parameters are inserted in **reverse order** (to maintain the correct order relative to EBP)

Every time our program calls another function, this process will happen again, creating new stack frames that temporarily overlap, and then are removed at the end of each function.