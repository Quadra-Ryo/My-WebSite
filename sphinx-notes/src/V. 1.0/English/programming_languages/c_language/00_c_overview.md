# Introduction to C

This documentation is intended for an audience that already possesses at least basic programming knowledge. It is designed to be **highly practical** with minimal theoretical overhead.

## What is C?

C is a low-level, legacy language that has remained remarkably stable over the decades. While its grammar, constructs, and standard libraries have seen little change, the most significant improvements have occurred at the compiler level and in the efficiency of the underlying hardware assumptions.

The C language is built upon a few core concepts and a very limited set of keywords. Because of this simplicity, it is **easy to learn but difficult to master**. Internalizing these core ideas is essential before they can be applied effectively. 

While the initial learning curve can be steep, the concepts you master in C—such as memory addressing and data representation—will be directly applicable to almost any other programming language, including high-level ones.

## Key Characteristics

* **Compiled Language:** C does not require an interpreter. Once compiled, the code is translated into machine language (Binary/Assembly) to be executed directly by the CPU.
* **Manual Memory Management:** Unlike modern languages with Garbage Collection (like Java or Python), C gives you full control over memory. You are responsible for allocating and freeing memory, which allows for extreme optimization but requires high precision.
* **The Power of Pointers:** C allows direct manipulation of memory addresses. This is the language's most powerful feature, enabling efficient data structure handling and system-level programming.
* **The Build Pipeline:** Understanding C means understanding how a program is built. The process follows a specific flow: 
    1. **Preprocessing** (handling `#include` and `#define`)
    2. **Compiling** (translation to assembly)
    3. **Assembling** (creating object files)
    4. **Linking** (combining object files and libraries into an executable)

## Why study C today?

Even though it is "old," C remains the backbone of modern computing. It is the language of operating systems (Windows, Linux, macOS), embedded systems, high-performance engines, and even the compilers of other languages. Learning C isn't just about writing code; it's about understanding **how a computer actually works**.


```{toctree}
:hidden:
:caption: Indice
:maxdepth: 1

01_c_compiler.md
02_c_functions.md
03_c_variables.md
04_c_variables_2.md

```