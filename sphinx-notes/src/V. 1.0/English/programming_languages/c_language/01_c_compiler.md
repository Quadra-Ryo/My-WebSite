# C Compiler and Hello World

As already mentioned in the introductory page, a file in C language needs to be compiled before it can be executed.

Let's write a simple "hello world" file in C and call it `main.c`. Even trying to execute it by transforming it into an executable, the latter will not execute correctly.
```c
#include <stdio.h>

int main(void){
    printf("Hello World\n");
    return 0;
}
```

We can compile this file with the command `cc main.c`. Once the command is executed, you will see a file called `a.exe` appear in the folder (if you are using Windows, `a.out` on Unix, Linux and Mac).
Opening a terminal and executing this file using the command `./a.exe` will correctly execute the compiled file and indeed you will see the string "Hello world" as output in the console.

By compiling using the command `cc -S main.c` we can save in our folder an ".s" file that will contain the assembly code of the program itself.
Opening it we can notice a call `bl _printf` with the string `"Hello World\n"`.
```c
bl _printf

...

.asciz "Hello World \n"
```

Now we can introduce a new concept, compiler optimization. When we compile a program we can decide an optimization level that we want to use by adding `-O1`, `-O2` or `-O3`. Obviously the higher the optimization level, the greater the level of optimization applied by the compiler itself.
If the optimization level is not specified, the default will be `-O0`, that is "no optimization".
Optimization is a request that we make to the compiler to give it the possibility to find inefficiencies in our code and that it will translate into a more efficient program but with the exact same behavior as the provided code.
So by calling the command `cc -O2 -S main.c` we can compile our program more efficiently and we can also read the assembly file that derives from it.

We will immediately notice some things:
- The program is much shorter
- The call to the `printf` function has disappeared and in its place there is a call to the `puts` function. Indeed, the latter has a very similar operation to the printf function with two substantial differences: it automatically adds the new line at the end of the string and is simpler and optimized for this specific case.
- The string that is present at the end of the code is no longer `"Hello World\n"` but `"Hello World"` because the compiler has recognized the difference between the two functions by automatically removing the new line.
```c
bl _puts

...

.asciz "Hello World"
```

## Code Analysis
Even though it seems very simple, we can learn a lot from the code we just wrote even though it's just a simple "Hello World".

Let's start with the first instruction:
```c
#include <stdio.h>
```

All instructions that begin with the `#` character in C are considered **preprocessor directives**.
Directives are parts of code that are processed before the program itself is compiled. Sometimes this process can be done by the compiler itself but it is useful to imagine this process as done by a program external to the processor.

The preprocessor that interprets these directives does a very simple action: a transformation action.
Imagine as if the preprocessor went to include the file that is between `<>` inside our file. So it's as if the preprocessor went to overwrite our line of code with the file itself that it finds somewhere in our PC's memory, concatenating the content of the included file with our code.
In this case we are having the library file `stdio.h` included in our code.

Example of how a preprocessor works:
Suppose we have a file named "print.c" with only one line of code inside, that is `printf("Hello World\n");`. Now suppose we have the following code:
```c
#include <stdio.h>

int main(void){
    #include "print.c"
    return 0;
}
```

The output we will have by executing this program will be exactly "Hello World" because the precompiler will have replaced the include with the line of code that we had inserted in the "print.c" file, compiling the following code:
```c
#include <stdio.h>

int main(void){
    printf("Hello World\n");
    return 0;
}
```

## Headers and stdio.h
The `stdio.h` file is a file that contains all the headers (from which the `.h` derives) of the functions that are contained within the stdio library.
Headers serve to give the compiler an idea of how the functions we use in our code are formed, such as `printf`. In fact, `printf` is a function that is part of the C standard library but is not part of the language itself (like for example "int", "void", "for", "return", etc. which are C keywords).
In fact, C files can have two extensions `.h` or `.c`. Both contain C code but in the first case it contains code useful for making the code work but without the logic of the functions themselves, while in the second case the file contains the logic of the functions themselves. Very often `.h` files will be included in different `.c` files using the preprocessor.

Let's try to eliminate the line of code `#include <stdio.h>` to see what happens.
```c
int main(void){
    printf("Hello World\n");
    return 0;
}
```

:::{admonition} COMPILER ERROR
:class: error, sd-bg-danger sd-text-white
main.c:2:5: error: implicit declaration of function 'printf' [-Wimplicit-function-declaration]
:::

The error is telling us that inside our `main.c` file at line 2, column 5 an implicit declaration of a function named `printf` was found. This is because the compiler cannot understand the correct arguments and return type for the function it finds.
Now, instead of including the header file again, let's try to include the declaration that is found in the official documentation of the function inside the file.
```c
int printf(const char * restrict format, ...);

int main(void){
    printf("Hello world\n");
    return 0;
}
```

As you can see, this line of code that we inserted is very similar to our `main` with the only difference that curly braces are not present and the logic of the function itself is not present, but after defining the function arguments, there is a semicolon.
This is called **function prototyping**. It serves to explicitly declare the return type and parameter types of the function so that when another program calls the desired function (in this case `printf`), even without having the code of the function itself available, it is able to know what type of variable it returns and what type of arguments to pass to the function, giving the minimum information necessary to the compiler to be able to produce the assembly code to compile.

In fact, if we tried to compile this code and execute it, we would see that it will compile smoothly and will have the exact same function as the code in which `<stdio.h>` was included.

## Linker
You may have wondered "But how is it possible that just by using the function header, the program reads the code inside the function I call?".
This happens thanks to a program called **Linker**.
This program takes care of taking the code you wrote, intercepting the functions you used but did not define (external functions whose body is not present in your code), linking your code with the libraries in which that code is located and finally returning as output the complete executable (`.out` or `.exe`).

### The Complete Compilation Process
When we compile a C program, several phases actually occur in sequence:
```
Source code (.c) 
    ↓ [PREPROCESSOR]
Preprocessed code 
    ↓ [COMPILER]
Assembly code (.s)
    ↓ [ASSEMBLER]
Object code (.o or .obj)
    ↓ [LINKER]
Final executable (a.out or a.exe)
```

### How It Works in Practice
Let's take as an example our code with `printf`:
```c
int printf(const char * restrict format, ...);

int main(void){
    printf("Hello world\n");
    return 0;
}
```

**During compilation:**
- The compiler sees the prototype of `printf`
- It knows that `printf` takes a string and returns an `int`
- It generates assembly code that makes a call to `printf` (e.g. `bl _printf`)
- The compiler does **NOT** need the actual code of `printf`, only its "signature"
- It produces an object file `main.o`

**During linking:**
- The linker takes `main.o`
- It sees that there is a reference to `printf` but the code of `printf` is not in `main.o`
- It goes to look for `printf` in the C standard library (usually `libc.so` on Linux or `msvcrt.dll` on Windows)
- It links your code with the library, creating the final executable

The linker is a separate program (often called `ld`), but it is invoked automatically by the `cc` or `gcc` command:

### Why Does It Work Even Without `#include <stdio.h>`?
This is the reason why our example works even by manually providing the prototype:

- **With `#include <stdio.h>`**: The compiler knows the prototype of `printf`, compiles without errors, the linker then links the C standard library
- **With manual prototype**: The compiler knows the prototype (because we provided it), compiles without errors, the linker then links the C standard library (exactly as before)

In both cases, the linker always does the same thing: it automatically links the C standard library.

### Example of Linker Error
If instead we try to call a function that doesn't exist anywhere:
```c
void non_existent_function(void);

int main(void){
    non_existent_function();
    return 0;
}
```

**Compilation**: Ok (the compiler knows the prototype)  
**Linking**: Error

:::{admonition} COMPILER ERROR (Given by the linker)
:class: error, sd-bg-danger sd-text-white
undefined reference to `non_existent_function'
:::

The linker cannot find the function code in any library and therefore produces an error.