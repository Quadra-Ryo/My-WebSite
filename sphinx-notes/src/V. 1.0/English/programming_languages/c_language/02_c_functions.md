# Functions and Variables
In C, a function is a block of code that performs a specific task and can return a value.  
It serves to organize the program, avoid duplications, and make the code more readable and maintainable.

## Function Declaration
Let's take as an example the code we wrote in the previous documentation pages and analyze the function we wrote, the main:  

```c
#include <stdio.h>

int main(void){
    printf("Hello World\n");
    return 0;
}
```

Let's start by seeing how a function is defined:
- `int main(void)`
- Open the curly braces
- Write the block of code you want to execute
- Close the curly braces

Let's break down this definition to understand it better.  
Let's start with the line `int main(void)`:
- We can see the keyword `int`, this keyword defines the return type of the value returned by the function itself. This value must be present and must be positioned before the function name.  
- Then we can find the function name, in this case `main`
- Finally, within parentheses we find the list of arguments that the function requires as input, in this case `(void)` meaning the function doesn't require any arguments to be executed. 

:::{admonition} INFO
:class: info, sd-bg-info sd-text-white
You can also leave two empty parentheses `main()` as newer, more modern C compilers accept and interpret it correctly, but in older compilers this would result in an error, which is why it's good practice to insert `void` inside the parentheses when there are no parameters to pass.
:::

Let's make an example with a different function:

:::{admonition} INFO
:class: info, sd-bg-info sd-text-white
A good practice is to write all code in English: variable names, function names, and comments.
:::

```c
int sum(int num1, int num2){
    return num1 + num2;
}
```

Let's analyze this function:
- We can notice that the sum function returns a value of type `int` (The int value is an integer number, the various data types will be covered in the documentation pages to come)  
- We can also notice that it needs two distinct parameters, both of integer type, named `num1` and `num2` (These are the names with which you can call the values passed to the function within the function itself)
- It returns the value obtained from the expression `num1 + num2`, once the `return` statement is executed the function will stop being executed and will immediately return the chosen value to the calling function. Obviously the return value type must be equal to the one declared before the function name, but in this case there's no problem since the function actually returns an integer (int + int = int, well-typed function).

Now let's call our function inside the main to check that everything works. To do this we can print the result returned by the function itself with a `printf("The operation: 3 + 4 = %d\n", sum(3,4));` obtaining the following code:

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
Let's delve deeper into the function we're using and the way we wrote the function call itself.  

Let's start by saying that the function name is an abbreviation of **"print formatted"**, that is, a function that can be formatted in a specific way according to our needs.  
In this case we will have two fundamental parts inside the string passed to the function (`"The operation: 3 + 4 = %d\n"`):
- A "format" part
- An identifier (In this case `%d`)

The format part is the "static" part such as "The operation: 3 + 4 = ... \n", this part will be printed exactly as it is written.  
The part preceded by the `%` symbol is called an identifier and serves to indicate that in that position there will be a variable value, in the case of `%d` this variable will be of integer type (In fact our function returns an `int`).  

After the string we can see that another argument is passed: `, sum(3,4)` which is the value we want to overwrite on our identifier.

In the previous lesson we saw how the declaration of the `printf` function is `int printf(const char * restrict format, ...);`, now we can more clearly understand the meaning of those dots present at the end of the function declaration, they serve to symbolize that the function has a variable number of parameters depending on the number of identifiers present inside the string (Functions of this type are called **variadic functions**).  

In case you make an error like `printf("The operation: 3 + 4 = %d, %d\n", sum(3,4));` (Insert two identifiers but only one value to substitute) the code will compile correctly even if it will generate a warning (If you don't see it try compiling using the command `cc -W -Wall main.c`), this is because this error leads to undefined behavior, the value overwritten to the second identifier could be anything and could also cause the program itself to crash.  
In fact, if you tried to run the function as written above you would most likely receive a different output string than mine: `The operation: 3 + 4 = 7, -1836453600`

## Main
The **Main** function instead is a special function, as you could see to call the sum function we wrote we had to make an explicit call (call it with `sum(3,4)`) but main is never called.
This is because the main function is a special function, it is the starting point of every program, when a program is launched the code that is executed is actually the one inside the main function itself.  
This implies that in C code cannot be written in a global scope outside of a function (as happens in Python for example) and that every program must necessarily have a function named main.

Error! ❌:
```c
#include <stdio.h>

printf("Hello World")
int main(void){
    return 0;
}
```

Error! ❌:
```c
#include <stdio.h>

int sum(int num1, int num2){
    return num1 + num2;
}
```

Having established that the "special" main function must be present in the code, we can notice that the function returns an integer and that by default we wrote `return 0`.  
Although it may seem strange since the main function is not called from anywhere inside the program, the return value of main is fundamental to signal to the operating system whether our program had a positive or negative outcome.  
By convention (Unix) a "main" program is considered executed without errors when the return value is 0, in any other case specific values are used to symbolize different errors.  
In addition to this, in case programs are called in a concatenated way using a logical and like this `./a.exe && ls` this command will execute both distinct commands only if the first program doesn't encounter an error, in case a.exe returned a number different from 0 in fact the ls command would not be executed (This is because thanks to a **short circuit** mechanism knowing that just one false expression is enough to make the logical and between two expressions return false, the second command is not even executed since its outcome couldn't influence the expression's return anyway) this way we can be certain that at the first error found my program stops without going forward.

## Variables
Variables are memory cells to which we "give a name" so we can then save specific data in them.  
We can see them as small boxes inside our memory in which we can insert the data we want to save at that moment.  
Let's try to write the sum function with local variables to add two numbers inside the main.  

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

As you can see, to declare a variable we also used a syntax similar to that of a function, first the type and then immediately after the name we want to assign to the variable.   
In C it is necessary to explicitly type variables, meaning before assigning a value to a variable we must specify what type that variable is (unlike languages like Python where syntax like `a = 5` is allowed).   
What we did inside the program we just wrote essentially consists of two steps that happen simultaneously, the creation of a variable `int num1` and the initialization of the variable to a starting value which can be a number (`num1 = 3;`) or an expression (`sum = num1 + num2;`).  

The same program can be written in other ways such as:  

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

This code is substantially identical to the code we wrote previously with the only difference that in this case we don't initialize the variables to any value, so they start from a default value (Assigned by the compiler itself) but we make an assignment of values after the declaration.  
All the variables we've seen have local scoping, this means they exist only inside the function itself. To better understand this concept let's return to the sum function example.

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
1. Being the beginning of the command, main will be called
2. Since printf needs all arguments to be called, as a second function we'll call sum to have the result to pass to the printf function
3. We will finally call the printf function with all available arguments

This can also be seen in the assembly file:

```assembly
call	__main  <-- Main
movl	$4, %edx
movl	$3, %ecx
call	sum     <-- Sum
movl	%eax, %edx
leaq	.LC0(%rip), %rax
movq	%rax, %rcx
call	printf  <-- Printf
```

Instead, at the memory level, what happens?  
Once the sum function is called from main with **arguments** (the values passed to a function during a call are called **arguments**) 3 and 4, these values are saved inside the **parameters** (the variables used inside the function to save the argument values are called **parameters**) num1 and num2.  
The latter (num1 and num2) are nothing but local variables themselves.   
Let's understand what happens inside memory when we call the sum function:
1. Once the function is called, memory is allocated on the stack for the three variables num1, num2 and sum and no value is assigned to them, it's as if they were created "empty"  
2. The variables continue to exist as long as the function is running because they are being used
3. Once the return is executed, the local variables inside the function are "destroyed," meaning they are deallocated from memory and those specific memory cells can be used for other calls without remaining bound to the local variables

In short, local variables are variables that are created every time the function is called and remain alive only during the function's execution before being "destroyed".