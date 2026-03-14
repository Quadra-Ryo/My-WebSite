# Architectural Patterns

Architectural patterns define the high-level organization of a software system. They operate at a higher level of abstraction than design patterns: they are not concerned with the relationships between classes or objects, but with the overall structure of the system, the distribution of responsibilities among components, and the mechanisms by which those components communicate.

Their use is neither mandatory nor universal: the choice of an architectural pattern depends on the system's non-functional requirements (scalability, maintainability, performance) and the organizational context in which it is developed.

The main architectural patterns are:

- **Layered**, organizes the system into stacked levels, each of which exposes services to the layer above and consumes services from the layer below (e.g. Presentation → Business Logic → Persistence → Database)
- **MVC (Model-View-Controller)**, separates the representation of data (Model), its rendering (View), and the handling of user interaction (Controller); common variants include MVP and MVVM
- **Event-Driven**, components communicate exclusively through asynchronous events routed via a central broker; no component has direct knowledge of the others
- **Microservices**, the system is decomposed into independent services, each responsible for a functional domain, independently deployable and scalable
- **Pipes and Filters**, data flows through a sequence of independent transformations (filters) connected by channels (pipes); typical of batch processing systems and compilers
- **CQRS (Command Query Responsibility Segregation)**, separates the read and write paths for data, allowing each to be optimized independently

An architectural pattern is not a rigid technical specification but a shared vocabulary among developers and architects: naming the adopted pattern enables precise and efficient communication of design decisions that would otherwise be difficult to describe, reducing ambiguity in system-level discussions.

```{toctree}
:hidden:
:caption: Indice
:maxdepth: 1

01_ultimate_hook.md
```