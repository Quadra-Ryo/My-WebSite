# Ultimate Hook

The "Ultimate Hook" paradigm arises from the need to give the programmer full freedom without sacrificing the standardization of a system (e.g., Windows) in any way.
The solution offered is a system where all interactions have a default way in which they can be handled, but this default is not executed as standard.
The name is very evocative: a "Hook" in computer science is a point where you can "hang" your custom code within an already existing flow. The "Ultimate Hook" is the ultimate hook because it doesn't concern just a small function, but the entire lifecycle of the application.
In fact, the **programmer** is given the ability to handle the event through code, and only if the event is not handled by the programmer do we fall back to the standard handling.

For events such as a mouse click on a window, this paradigm creates an event hierarchy of this kind:
- The event originates in the Operating System, which detects the machine's inputs
- The system checks whether the application handles this interaction
- The application decides whether to intercept the event with custom logic or to ignore it, letting the default handling bubble back up to the operating system (fall-through mechanism)

## Programming by difference

This paradigm (used by both mobile and desktop operating systems) allows the programmer to avoid writing basic event-handling code from scratch every time, such as the code for dragging a window or minimizing it. This concept is closely tied to the principle of **Default Behavior** and drastically reduces **Boilerplate code**, meaning all that repetitive code not specific to the application's logic that would otherwise be necessary just to make it function.
The only events for which code must be written are those we want to handle in a custom way within our application.
The handling of all unimplemented events will be passed to the operating system, which will manage them by default, as if the system were a predefined template and you only intervene when you want to modify a specific behavior.

## Application to Harel's Statecharts

This paradigm can also be applied to state machines.
Imagine having a state machine that must handle a "stop" event within every state. According to classical state machine logic, each state would need to be treated as a standalone final state, requiring a transition arrow originating from every single state.
With hierarchy, instead, it suffices to:
- Create a Super-State that contains all the other states
- Define the stop-handling rule within the Super-State
- States defined inside the Super-State will automatically inherit the rule if it is not handled within the sub-states themselves

This mechanism is called **Event Bubbling**: if an event finds no handler in the current sub-state, it automatically bubbles up to the super-state. It is worth noting that the direction is opposite to the Windows model (where the system "descends" toward the application), but the hierarchical delegation logic is identical.

![Statechart notation for nesting states](_statics/uh-state-charts.png)

Of course, a substate can itself act as a superstate for another substate nested within it, making it possible to create multiply-nested states.