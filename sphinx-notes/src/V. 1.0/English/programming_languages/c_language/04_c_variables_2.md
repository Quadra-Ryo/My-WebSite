# Static and Global Variables and Variables in Functions

## Introduction to Global and Static Variables
Let's take an example program called `increment` and make it so that it takes nothing as input, increments a variable, and prints its value.

```{note}
**INFO**  
In the jargon of imperative languages (An imperative language is a programming paradigm in which code describes how to achieve a result through a sequence of instructions that modify the program's state), we say that the `increment` function has only a side effect (a collateral effect, which is to print the value of x).
In other words, it takes no input values, returns nothing, the only value is the effect that occurs during the function's execution itself.
```

```C
#include <stdio.h>

void increment(void){
    int x = 1;
    x = x + 1; // In C the "=" symbol assigns to the left variable the value on the right
               // To check if two variables are equal we use "=="
    printf("%d\n", x);
}


int main(void){
    increment();
    increment();
    increment();
    return 0;
}
```

If we execute this program we will see that it will print "2" three times, not taking into account the number of calls executed.
This is because at each function call the variable x will be created locally, its value will be incremented and subsequently, at the end of the function's execution, it will be destroyed (as we saw in the [previous lesson](https://quadra-ryo.github.io/My-WebSite/blog/V.%201.0/English/programming_languages/c_language/03_c_variables.html)).

## Global Variables
Let's now make a small modification to our code to make our variable `x` global.

```C
#include <stdio.h>

int x = 1; // By declaring a variable outside a function it will have global scope

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
Since now inside the increment function there is no local variable with the name `x`, the compiler will search for the variable among the global variables and will find the global variable.
The main difference between a local and a global variable is that in the case of a global variable, the value of `x` will never be reset. The variable will be created at the beginning of the program's execution and will be destroyed only at the end of the program, when the process terminates.
Besides this, by creating the variable with global scope we will make the variable accessible in all parts of the program, not only in the function where it is declared but in all functions present within our code (this is why I can put the print inside main).
For this reason the program will always increment the same variable and thus by executing the program I will read "2 3 4" and not "2 2 2" anymore.

Let's simulate the program's execution and the change of `x`'s value during the execution of our main:
```
Program start:  
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

## Static Variables
Another way to declare a variable in C is using `static`.
`Static` is a keyword that allows us to create a variable that can be imagined as a middle ground between a local and a global variable.
Static variables are declared inside a function and therefore are visible and accessible only from that function (unlike global variables which are accessible from the entire program) but have a static storage duration like global variables.

Let's see a practical example:

```C
#include <stdio.h>

void increment(void){
    static int x = 1; // The variable is initialized only the first time
    x = x + 1;
    printf("%d\n", x);
}


int main(void){
    increment(); // Prints 2
    increment(); // Prints 3
    increment(); // Prints 4
    return 0;
}
```

In this case the variable `x` is initialized only at the first function call. In subsequent calls it maintains the previous value, but remains accessible only within the `increment` function.

## Problems with Static and Global Variables
Since global variables are accessible from the entire program, this property leads us to have possible problems.
We mainly talk about problems with threading, more precisely when two separate threads (processes) try to access and work on the same global variable simultaneously.
This case could lead to a synchronization problem that we will study soon. Static variables, being accessible only from their function, have fewer problems of this type, but can still cause issues if the same function is called from different threads.

## Managing Values After a Function Call
Let's now slightly modify our increment function so that by taking an integer as input it returns the input value +1.

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

What would happen if we ran this main? What would be printed by the program?
If your answer was "13" you're right! Let's see why:
When we call the `increment` function passing `num` as a parameter, we are not passing the variable `num` but we are simply assigning to `x` (the argument of the increment function) the value contained within `num`.
So what happens is that inside our increment function we will increment `x` which will reach the value of "14" but we will never save it inside main and therefore the value of num will remain "13".
This is because in C normally function arguments are passed by value and not by reference (functions receive a copy of the value that is inside the variable I pass as a parameter but it will not be the same memory cell as the variable passed as a parameter).

To obtain the desired effect we must save the return value of the function:

```C
int main(void){
    int num = 13;
    num = increment(num); // I assign to num the value returned by the function
    printf("%d\n", num);  // Prints 14
    return 0;
}
```

In C all values (even the more complex ones like structures that we will see in the future) are passed **by copy**. The only way to modify the value of the variable passed as a parameter would be to pass the parameter as a **pointer** but we will see this soon.