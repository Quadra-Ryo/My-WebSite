# Variable Types

## Introduction to Variable Types
Since the C language was designed to run on every type of machine, from microcontrollers to supercomputers, many versions of C exist to allow the language to run on any machine.  
For this reason, C — unlike other languages such as Python and Java — does not have a standard size for its variables.  
Take the `int` type as an example. In languages like Java, `int` has a standard length of 32 bits (4 bytes) and can hold values ranging from `-2,147,483,648` to `2,147,483,647`. In C we have no such guarantee; we can never be certain of the actual size in memory of a variable.  
The only certainty we have regardless of the C version or the machine we are using is the `unsigned` qualifier (e.g. `unsigned int`), which forces our numbers to be unsigned, removing the ability to represent negative numbers but doubling the range of positive numbers (for `unsigned int` the range is `0 – 4,294,967,295` assuming a 4-byte integer).

## How to Solve It (sizeof function)
A very useful function called `sizeof()` comes to our rescue:  

```C
#include <stdio.h>

int main(void){
    int a = 5;
    printf("The size of int is %d bytes\n", sizeof(a));
    return 0;
}
```

We will see a warning in the console:  
```{warning}
**COMPILER ERROR**
main.c:5:33: warning: format '%d' expects argument of type 'int', but argument 2 has type 'long long unsigned int'
```
 
This is because the `%d` format specifier tells the compiler to expect an integer, while `sizeof()` returns a long unsigned integer, creating a mismatch and a potential data overflow.  
The fix is to use the `%llu` format specifier, which stands for "long long unsigned".  
Now, building and running the program, we will see the output `The size of int is 4 bytes`, meaning we can represent 2^32 symbols (4,294,967,295 symbols — if unsigned, numbers from 0 to 4,294,967,295; if signed, from `-2^31`, i.e. `-2,147,483,648`, to `(2^31) - 1`, i.e. `2,147,483,647` — we subtract 1 from the positive side because one value is taken by "0").

## Including limits.h
Instead of using a calculator to figure out the maximum and minimum value representable by a variable type, we can leverage `limits.h` by including it in our program.  
We can use the definitions it provides by referencing (for integer variables) `INT_MIN` and `INT_MAX` as shown below:  

```C
#include <stdio.h>
#include <limits.h>

int main(void){
    int a = 5;
    printf("The maximum size of int is %d and the minimum size of int is %d", INT_MAX, INT_MIN);
    return 0;
}
```

These two definitions will be automatically replaced by the preprocessor with the maximum and minimum values representable by the `int` type **ON THIS PLATFORM**.  
The output will be: `The maximum size of int is 2147483647 and the minimum size of int is -2147483648`.  


## Variables on Modern 32-bit and 64-bit Systems
Although not guaranteed by the C standard — unlike older machines where nothing could be taken for granted, not even the size of a byte (which in some cases was 9 bits instead of 8) — in modern times we have a certain standardization of C types that you will find on 99% of machines:  

```{list-table} Primitive types in C
:widths: 10 16 5 26 13 20 13
:header-rows: 1

* - Type
  - Unsigned Type
  - Size
  - Description
  - Format specifier
  - Range (signed)
  - Range (unsigned)
* - `bool`
  - —
  - 1 byte
  - Boolean value: true or false
  - `%d`
  - 0 – 1
  - —
* - `char`
  - `unsigned char`
  - 1 byte
  - Character (e.g. `'a'`) or decimal ASCII value
  - `%c` `%d`
  - \-128 – 127
  - 0 – 255
* - `short`
  - `unsigned short`
  - 2 bytes
  - 16-bit integer
  - `%hd`
  - \-32,768 – 32,767
  - 0 – 65,535
* - `int`
  - `unsigned int`
  - 4 bytes
  - 32-bit integer, default integer type
  - `%d`
  - \-2,147,483,648 – 2,147,483,647
  - 0 – 4,294,967,295
* - `long long`
  - `unsigned long long`
  - 8 bytes
  - 64-bit integer
  - `%lld`
  - \-9,223,372,036,854,775,808 – 9,223,372,036,854,775,807
  - 0 – 18,446,744,073,709,551,615
* - `float`
  - —
  - 4 bytes
  - Single-precision floating point, ~6-7 decimal digits
  - `%f` `%e` `%g`
  - ±1.2×10⁻³⁸ – ±3.4×10³⁸
  - —
* - `double`
  - —
  - 8 bytes
  - Double-precision floating point, ~15-16 decimal digits
  - `%lf` `%e` `%g`
  - ±2.3×10⁻³⁰⁸ – ±1.7×10³⁰⁸
  - —
```

## Special Types

The more attentive readers will have noticed that two specific types are missing from the table above: `long` and `long double`.  
This is because these two types follow specific rules that cause their size to vary depending on the machine.

### The long Type
The `long` type is designed (on Linux and macOS systems) as the reference type for perfectly representing a "word". A `word` is simply the technical term for the size of a memory register: `4 bytes` on 32-bit systems and `8 bytes` on 64-bit systems.  
On Windows, things are simpler: Windows does not follow the standard for `long` and forces a length of 4 bytes even on 64-bit systems, due to the Windows ABI known as "LLP64".

```{note}
**INFO**  
LLP64 is an ABI (Application Binary Interface) model that defines the byte size of C primitive types on a given platform.
The name is an acronym describing the sizes:

- Long → 32 bit (4 bytes)
- Long long → 64 bit (8 bytes)
- Pointer → 64 bit (8 bytes)

It is the model used by 64-bit Windows. Microsoft's choice to keep `long` at 32 bits was made for compatibility with existing 32-bit Windows code, avoiding the need to rewrite millions of lines of legacy code that assumed `long = 4 bytes`.
It contrasts with the LP64 model, used by Linux, macOS, and all Unix-like 64-bit systems, where:

- Long → 64 bit (8 bytes)
- Pointer → 64 bit (8 bytes)
```

In the past, integer types were often used to store memory pointers without considering the possibility of 64-bit systems, and as a result much legacy code would cause unexpected behaviours — or often direct crashes — if run on modern machines.

### Long Double
The `long double` type is even stranger, with 3 possible sizes:  
On Linux and macOS systems its size is `10 bytes` (representing numbers with 18–19 significant digits) on 32-bit systems, and `16 bytes` (representing numbers with 33–34 significant digits) on 64-bit architectures.  
Windows, on the other hand, simply treats `long double` as a plain `double`.

```{note}
**INFO**  
The reason Windows treats `long double` as a plain `double` (64 bit) is tied to the same architectural choices of the LLP64 ABI. The 80-bit extended-precision x87 format has existed at the hardware level in x86 CPUs since the 1980s, but Microsoft chose not to expose it in the x64 ABI for two main reasons:

- **Performance**: 80-bit x87 operations are slower than 64-bit SSE2 operations. Microsoft embraced SSE2 as the standard for floating-point operations on x64, abandoning the x87 stack.
- **Compatibility**: keeping `long double == double` simplifies cross-platform porting and avoids surprises related to extended precision.

The practical result is that `sizeof(long double)` returns `12` or `16` on Linux/macOS (depending on alignment) and `8` on Windows, identical to `sizeof(double)`.
```

## Advanced Types
For greater memory-level certainty, we can use the advanced types of C, importable via `stdint.h`.  
These are "new" types that were not part of the original C specification but allow us to specify both the type and the exact size of the variable we want.  
For example, `uint64_t` is an unsigned (`u`) integer (`int`) of size 64 bits (`64_t`).  

An important element of this library is `size_t`, which represents the theoretically maximum size that an object of any type (array, matrix, file) can have within our program — a maximum we define ourselves.  
Other special types in this specification are `intptr_t` and `uintptr_t`. The first is a **signed** integer type designed to be exactly the right size to store a memory pointer regardless of the machine we are running on. The second is the same but **unsigned**. The signed `intptr_t` might seem of dubious utility since memory addresses are never negative, but it is used to perform pointer subtraction — to determine, for example, whether one value is stored before another in memory.