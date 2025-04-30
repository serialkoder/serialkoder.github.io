---
layout: post
title: "Delegation Pattern in Java"
tags: [design-patters]
---

Great. I’ll prepare a comprehensive explanation of the Delegation Pattern in the context of Java. This will include:
- A precise definition and how it differs from related behavioral patterns like Observer and Strategy
- The design intent and appropriate use cases
- A breakdown of its key participants (e.g., delegate, delegator, and interfaces)
- Detailed contrasts with the Observer and Strategy patterns, supported with Java code examples.
I'll let you know as soon as it's ready.

# Delegation Pattern in Java

**Introduction:** In this report, we explore the Delegation design pattern in Java, detailing its definition, design intent, key participants, and its differences from other behavioral patterns (notably the Observer and Strategy patterns). We also provide Java code examples to illustrate how delegation works in practice, and how it contrasts with Observer and Strategy in structure, purpose, communication flow, and usage scenarios.

## 1. What is the Delegation Pattern?

The **Delegation Pattern** is an object composition technique where one object hands off (delegates) a responsibility or behavior to a second object. Grady Booch described delegation as *“a way to make composition as powerful for reuse as inheritance. In delegation, two objects are involved in handling a request: a receiving object delegates operations to its delegate.”* ([Delegation Pattern: An effective way of replacing Android’s Base Activity with native Kotlin support | by Prokash Sarkar | Medium](https://prokash-sarkar.medium.com/delegation-pattern-an-effective-way-of-replacing-androids-baseactivity-with-native-kotlin-support-b00dee007d69#:~:text=In%20the%20Introduction%20to%20Gamma,Grady%20Booch%20defined%20delegation%20as)) In simpler terms, one object (the *delegator*) relies on a helper object (the *delegate*) to perform a task or provide a result on its behalf ([Delegation Pattern: An effective way of replacing Android’s Base Activity with native Kotlin support | by Prokash Sarkar | Medium](https://prokash-sarkar.medium.com/delegation-pattern-an-effective-way-of-replacing-androids-baseactivity-with-native-kotlin-support-b00dee007d69#:~:text=In%20short%2C%20The%20delegation%20pattern,carrying%20out%20the%20operation%20itself)). The delegator exposes a certain behavior externally, but internally it forwards the work to the delegate object.

**Delegation vs. Other Patterns (High-Level):** Unlike some other behavioral patterns which have very specific intents, delegation is a more fundamental design principle. It is *not* one of the original GoF (Gang of Four) design patterns, but rather a general approach that is used *within* many patterns (for example, the Strategy, Observer, Visitor, State, and others often use delegation under the hood ([Delegation Pattern: An effective way of replacing Android’s Base Activity with native Kotlin support | by Prokash Sarkar | Medium](https://prokash-sarkar.medium.com/delegation-pattern-an-effective-way-of-replacing-androids-baseactivity-with-native-kotlin-support-b00dee007d69#:~:text=In%20delegation%2C%20an%20object%20shows,Observer%2C%20Strategy%2C%20and%20Event%20Listener))). The key idea is that instead of a single object doing everything, it delegates part of the work to another object – promoting better separation of concerns and lower coupling ([Difference between Strategy pattern and Delegation pattern - Stack Overflow](https://stackoverflow.com/questions/1224830/difference-between-strategy-pattern-and-delegation-pattern#:~:text=delegation%20is%20more%20a%20principal,lessening%20coupling%20and%20increasing%20cohesiveness)). This differs from patterns like **Observer** (which defines a one-to-many notification system) or **Strategy** (which defines interchangeable algorithms) that solve more specialized problems. We will delve deeper into these differences in later sections.

## 2. Design Intent and When to Use Delegation

The **intent** behind the delegation pattern is to achieve flexible code reuse and separation of concerns through composition rather than inheritance. By delegating tasks to helper objects, a class can incorporate new behaviors or responsibilities without needing to become a subclass of some base class. This design offers several benefits:

- **Promote Composition Over Inheritance:** Delegation makes it easy to reuse code by composing behaviors at run-time rather than inheriting them at compile-time ([Delegation Pattern: An effective way of replacing Android’s Base Activity with native Kotlin support | by Prokash Sarkar | Medium](https://prokash-sarkar.medium.com/delegation-pattern-an-effective-way-of-replacing-androids-baseactivity-with-native-kotlin-support-b00dee007d69#:~:text=Delegation%20can%20be%20used%20as,express%20a%20relationship%20between%20classes)). It provides a more flexible way to share behavior between classes, helping to simulate multiple inheritance in single-inheritance languages like Java (an object can delegate to multiple helpers to incorporate various behaviors).
- **Reduce Coupling:** The delegator and delegate are only coupled through an interface or contract. The delegator doesn’t need to know the concrete implementation of the delegate, which leads to lower coupling and higher cohesion in the system ([Difference between Strategy pattern and Delegation pattern - Stack Overflow](https://stackoverflow.com/questions/1224830/difference-between-strategy-pattern-and-delegation-pattern#:~:text=delegation%20is%20more%20a%20principal,lessening%20coupling%20and%20increasing%20cohesiveness)).
- **Runtime Flexibility:** Because delegates are typically held via an interface reference, you can swap out the actual delegate object at runtime to change behavior. This allows **dynamic behavior changes** and strategy-like flexibility in how tasks are performed ([Delegation Pattern in Java: Mastering Efficient Task Assignment | Java Design Patterns](https://java-design-patterns.com/patterns/delegation/#:~:text=,of%20your%20classes%20at%20runtime)).
- **Simplify Classes:** A class can offload complex or varying responsibilities to helper classes, keeping the main class simpler and focused. Each delegate can handle a specific concern, following the *Single Responsibility Principle*.

**When to use the Delegation Pattern:** You should consider delegation in scenarios where you want one object to forward certain work to another object, especially if you anticipate the behavior might change or have multiple implementations. Common use cases and triggers for using delegation include:

- When you want to **avoid subclassing** for extending behavior. Instead of creating many subclasses for different behaviors, you create delegate classes and have the main class delegate to them ([Delegation Pattern in Java: Mastering Efficient Task Assignment | Java Design Patterns](https://java-design-patterns.com/patterns/delegation/#:~:text=,interchangeable%20helper%20classes%20at%20runtime)).
- When you need to **swap out or vary part of an object's behavior** at runtime. Delegation allows using different helper objects interchangeably to change how something is done.
- When a class has some responsibility that could be handled by an external helper (to keep the class lightweight or modular).
- To **simulate multiple inheritance** or mixins by composing behaviors. For example, if a class needs features of two unrelated classes, it can hold a delegate for each, rather than inheriting from two classes (which Java doesn’t allow).
- When designing frameworks or APIs where a component needs to **call user-provided code** to customize behavior. (E.g., in UI frameworks, an element might delegate event handling to a listener object provided by the user.)

**Benefits vs. Trade-offs:** By using delegation, we get increased code reuse, flexibility, and a clear separation of concerns (no monolithic classes) ([Delegation Pattern in Java: Mastering Efficient Task Assignment | Java Design Patterns](https://java-design-patterns.com/patterns/delegation/#:~:text=,of%20your%20classes%20at%20runtime)). It also helps in testing (delegates can be mocked or replaced). However, there are trade-offs: it introduces additional layers of indirection (one more object involved in the call), which can add slight runtime overhead and complexity in understanding the flow. In practice, these downsides are usually minor compared to the design clarity gains, but they are worth noting. Overall, delegation is a powerful tool when used in the right contexts to keep designs modular and adaptable.

## 3. Key Participants in the Delegation Pattern

In a typical delegation scenario, there are three key participants or components involved:

- **Delegator (Caller):** The object that receives a request and delegates it to another. The delegator holds a reference to an interface (or abstract class) that the delegate implements. It defines one or more methods that internally forward calls to the delegate. From the outside, the delegator *appears* to provide some behavior, but it actually passes the work to the delegate.
- **Delegate (Helper):** The object that actually does the work on behalf of the delegator. The delegate implements a specific interface (or extends an abstract class) which the delegator expects. The delegate’s implementation contains the actual code for the behavior that has been delegated.
- **Delegate Interface (Contract):** The common interface or protocol that defines the method(s) the delegate must provide. The delegator uses this interface to call the delegate’s methods, without needing to know the concrete class of the delegate. This interface ensures the delegator and delegate can communicate in a decoupled way ([Delegation Pattern: An effective way of replacing Android’s Base Activity with native Kotlin support | by Prokash Sarkar | Medium](https://prokash-sarkar.medium.com/delegation-pattern-an-effective-way-of-replacing-androids-baseactivity-with-native-kotlin-support-b00dee007d69#:~:text=Three%20elements%20make%20up%20the,majority%20of%20this%20pattern)).

 ([Delegation Pattern in Java: Mastering Efficient Task Assignment | Java Design Patterns](https://java-design-patterns.com/patterns/delegation/)) *Sequence diagram of the Delegation pattern: The **Client** calls a method on the **Delegator**, which in turn forwards the request to a **Delegate** object. The Delegate performs the operation and returns the result to the Delegator, which then returns it to the Client.* 

In the sequence diagram above, the delegator acts as an intermediary between the client and the real work performed by the delegate. The client is unaware (and unconcerned) that the delegator is not doing the work itself – this is an implementation detail hidden by the delegator. The delegate could be swapped out for a different implementation without the client knowing, as long as the new delegate adheres to the expected interface.

### Java Example: Delegation Pattern Implementation

Below is a simple Java example illustrating the delegation pattern. In this example, we have a `Printer` interface (the delegate interface) with a `print` method. We provide two concrete implementations of `Printer` (e.g., `CanonPrinter` and `EpsonPrinter` – the delegates), each printing a message in a device-specific way. We also have a `PrinterController` class (the delegator) that implements `Printer` but actually delegates the printing task to an internal `Printer` instance:

```java
// Delegate interface
interface Printer {
    void print(String message);
}

// Concrete Delegate A
class CanonPrinter implements Printer {
    public void print(String message) {
        System.out.println("Canon Printer: " + message);
    }
}

// Concrete Delegate B
class EpsonPrinter implements Printer {
    public void print(String message) {
        System.out.println("Epson Printer: " + message);
    }
}

// Delegator class that implements the interface by delegating to a helper
class PrinterController implements Printer {
    private Printer delegate;  // holds a reference to a Printer (delegate)

    public PrinterController(Printer delegate) {
        this.delegate = delegate;
    }
    public void setDelegate(Printer delegate) {
        this.delegate = delegate;  // allow changing the delegate at runtime
    }

    @Override
    public void print(String message) {
        // Forward the request to the delegate object
        delegate.print(message);
    }
}
```

In the code above, `PrinterController` doesn’t implement the details of printing itself; it simply forwards the call to whatever `Printer` implementation it currently holds. This means `PrinterController` can be treated as a `Printer` (it fulfills the interface), but it’s flexible – the actual printing behavior depends on the delegate it’s given.

Now, consider using these classes:

```java
PrinterController controller = new PrinterController(new CanonPrinter());
controller.print("Hello World");   // Outputs: "Canon Printer: Hello World"

controller.setDelegate(new EpsonPrinter());
controller.print("Hello World");   // Outputs: "Epson Printer: Hello World"
```

Here, at first the controller delegates to a `CanonPrinter`. Later, we swap the delegate to an `EpsonPrinter` at runtime. The `PrinterController` itself didn’t need to change; it continues to accept print requests and delegates them. This demonstrates how delegation allows changing behavior dynamically (**composition** instead of hard-coded inheritance). The client code simply interacts with `PrinterController` via the `Printer` interface, and is unaware of which concrete printer actually handles the call.

## 4. Delegation Pattern vs. Observer Pattern

The **Observer Pattern** (also known as Publish-Subscribe or Listener pattern) is another behavioral design pattern, but it serves a different purpose than delegation. Observer defines a one-to-many relationship between objects so that when one object’s state changes, all its dependents (observers) are notified automatically ([Observer Pattern](https://www.cs.mcgill.ca/~hv/classes/CS400/01.hchen/doc/observer/observer.html#:~:text=Define%20a%20one,are%20notified%20and%20updated%20automatically)) ([Observer](https://refactoring.guru/design-patterns/observer#:~:text=Observer%20is%20a%20behavioral%20design,happen%20to%20the%20object%20they%E2%80%99re%C2%A0observing)). In Java, the observer pattern is often implemented with a *Subject* (or Publisher) class maintaining a list of observers and notifying them of events. For example, a `Subject` might have methods like `registerObserver()`, `removeObserver()`, and `notifyObservers()` to manage the list of observers and broadcast changes.

**Key differences between Delegation and Observer:**

- **Structure:** In delegation, the relationship is typically one-to-one – a single delegator knows about a single delegate (or a small fixed set of delegates for different roles). In the observer pattern, the relationship is one-to-many – a subject (delegator of events) maintains a collection of many observers. The subject in Observer is not tied to a specific observer; observers can be added or removed dynamically. The delegator in a delegation pattern usually has exactly one delegate reference (or one per role) that it calls. Essentially, an observer-based design allows **multiple** objects to receive updates, whereas delegation is centered around a **single** delegate handling the task at a time ([What are the advantages of the delegate pattern over the observer pattern? - Software Engineering Stack Exchange](https://softwareengineering.stackexchange.com/questions/178008/what-are-the-advantages-of-the-delegate-pattern-over-the-observer-pattern#:~:text=Generally%2C%20with%20an%20Observer%20Pattern%2C,just%20calls%20out%20to%20them)).

- **Purpose/Intent:** Delegation is about one object handing off responsibility for a certain behavior to another object to **extend or modify behavior**. Its intent is to compose behaviors and achieve flexibility in code reuse. The Observer pattern’s intent is to **notify interested parties of a change in state or an event**. It’s a notification mechanism to decouple the source of an event from the consumers of that event. In other words, use delegation when an object needs a helper to accomplish a task (often to customize or vary part of its behavior), whereas use Observer when an object needs to broadcast events or changes to multiple other objects without being aware of who they are ([What are the advantages of the delegate pattern over the observer pattern? - Software Engineering Stack Exchange](https://softwareengineering.stackexchange.com/questions/178008/what-are-the-advantages-of-the-delegate-pattern-over-the-observer-pattern#:~:text=Generally%2C%20with%20an%20Observer%20Pattern%2C,just%20calls%20out%20to%20them)).

- **Communication Flow:** In delegation, the communication is a direct method call from the delegator to the delegate (one-to-one *call*). The delegator typically expects the delegate to handle the request immediately and often may get a result back. It’s a **synchronous, tightly coupled interaction** (though decoupled by interface). In Observer, communication is one-to-many: the subject *publishes* an event, and potentially many observers each receive a notification (often via a callback method like `update()` in each observer). The subject typically does not expect a result from observers; it’s a **one-directional notification** (often fire-and-forget from the subject’s perspective). The subject might not even know if any observers are present – it just iterates through a list and notifies all that are registered. The observers, not the subject, decide what to do with the notification. This broadcast nature means Observer is good for **event broadcasting**, whereas delegation is more like a **direct conversation** between two objects ([Delegates vs Observers](https://www.sandofsky.com/control-flow/#:~:text=Use%20observers%20for%20broadcasting%2C%20and,delegation%20for%20conversations)). (Using a metaphor: *delegation* is like a boss assigning a task to a specific employee, *observer* is like a radio station broadcasting a message to all listeners who tuned in.)

- **Lifespan and Dynamics:** In delegation, the delegate is usually set up ahead of time (often at object construction or configuration) and typically remains in place until changed explicitly. In observer, observers can subscribe and unsubscribe at any time, and the subject may have none, one, or many observers over its life. The observer pattern is thus more dynamic in terms of subscribers coming and going freely. Delegation can be dynamic if you allow switching delegates, but often you have one delegate handling things for a period of time (the delegator “trusts” that one helper at a time).

- **Usage Scenarios:** Use the observer pattern when you have a situation where **multiple objects need to react to events or changes in another object’s state**. Common examples include GUI event listeners (multiple components reacting to a button press or menu selection), model-view architectures (model updates notify multiple views), or pub-sub systems in general. Observer is ideal for decoupling *event producers* from *event consumers* in a system. On the other hand, use delegation when **an object wants to expose some behavior but have it handled by a helper**, or when you want to **allow replacing that helper to change behavior**. A classic Java example of delegation is the *event handling model introduced in Swing/AWT:* it is often called the “delegation event model” because a GUI component (like a button) delegates the handling of an event (button click) to listener objects. In fact, a Swing `JButton` can have multiple ActionListeners (which is true Observer pattern behavior – multiple observers), while an Android `Button` uses `setOnClickListener` which allows only one listener at a time (more of a delegation-style one-to-one callback). Another example is in designing classes that use callbacks: if you allow only one callback handler, that’s delegation; if you allow many, that’s observer. 

**Delegate as a specialized Observer:** It’s worth noting that a delegate in the sense of a “single observer” can be viewed as a special case of the observer pattern with exactly one observer. In practice, the patterns are distinguished by intent: a *delegate* usually implies the delegate is taking on a responsibility (often controlling some aspect of the delegator’s behavior), whereas an *observer* is simply being informed of something that happened, with the subject not caring what the observer does with that information ([What are the advantages of the delegate pattern over the observer pattern? - Software Engineering Stack Exchange](https://softwareengineering.stackexchange.com/questions/178008/what-are-the-advantages-of-the-delegate-pattern-over-the-observer-pattern#:~:text=You%27re%20looking%20at%20things%20incorrectly,the%20interface%20to%20the%20event)) ([What are the advantages of the delegate pattern over the observer pattern? - Software Engineering Stack Exchange](https://softwareengineering.stackexchange.com/questions/178008/what-are-the-advantages-of-the-delegate-pattern-over-the-observer-pattern#:~:text=%40MarjanVenema%20,pattern%20with%20only%20one%20observer)). The delegate often has a closer, more specific role in the operation of the delegator (sometimes even able to influence it), whereas observers are kept at arm’s length (just notified of changes). 

### Java Example: Observer Pattern Implementation

To illustrate the observer pattern in Java, consider a simple news agency example. We have a `NewsAgency` class (the Subject) which maintains a list of observers interested in news updates. Observers implement a `Channel` interface (with an `update` method). When the news agency gets new news, it notifies all registered channels by calling their `update` method:

```java
// Observer interface
interface Channel {
    void update(String news);
}

// Concrete Observer
class NewsChannel implements Channel {
    private String news;
    @Override
    public void update(String news) {
        this.news = news;
        System.out.println("[NewsChannel] Breaking News: " + news);
    }
}

// Subject class
class NewsAgency {
    private List<Channel> channels = new ArrayList<>();
    private String latestNews;

    public void addObserver(Channel channel) {
        channels.add(channel);
    }
    public void removeObserver(Channel channel) {
        channels.remove(channel);
    }

    public void setLatestNews(String news) {
        this.latestNews = news;
        notifyObservers();
    }
    private void notifyObservers() {
        for (Channel channel : channels) {
            channel.update(latestNews);
        }
    }
}
```

In this code, `NewsAgency` is the subject that keeps track of subscribed `Channel` observers. Whenever `setLatestNews` is called, it goes through the list of channels and calls `update(...)` on each. The `NewsChannel` observer simply prints the news (in a real scenario it might update a display, etc.). We can use this as follows:

```java
NewsAgency agency = new NewsAgency();
NewsChannel channel1 = new NewsChannel();
NewsChannel channel2 = new NewsChannel();
agency.addObserver(channel1);
agency.addObserver(channel2);

agency.setLatestNews("New Java release 18.0.3");  
// Both channel1 and channel2 will receive the update and print the news.
```

In this observer example, the `NewsAgency` does not know or care what the `NewsChannel` observers do with the news; it simply notifies all of them. This is fundamentally different from delegation where there would be just one delegate (e.g., if `NewsAgency` had a single `Channel` delegate, it would delegate the act of handling news to that one channel rather than broadcasting to many).

## 5. Delegation Pattern vs. Strategy Pattern

The **Strategy Pattern** is another behavioral pattern that, at first glance, looks very similar to delegation. Strategy also involves one object (often called the *Context*) holding a reference to another object (the *Strategy*) which implements a certain interface, and the context delegates a task to it. The key difference is the intent: the strategy pattern’s purpose is to **encapsulate interchangeable algorithms** and allow the client or context to choose which algorithm to use at runtime ([Strategy pattern - Wikipedia](https://en.wikipedia.org/wiki/Strategy_pattern#:~:text=The%20strategy%20pattern%20,selecting%20an%20algorithm%20at%20runtime)) ([Strategy](https://refactoring.guru/design-patterns/strategy#:~:text=Use%20the%20Strategy%20pattern%20when,algorithm%20to%20another%20during%20runtime)). In other words, Strategy is about selecting *how* to do something from a family of algorithms, whereas Delegation (in general) is about assigning responsibility to a helper object. Let’s break down the differences:

- **Structure:** Structurally, strategy and delegation are very similar – both use composition with an interface to call an interchangeable helper. In the strategy pattern, you typically have:
  - A **Strategy interface** that defines an operation (for example, a method `execute()` or `doOperation()`).
  - Multiple **Concrete Strategy** classes that implement this interface, each providing a different algorithm or behavior.
  - A **Context** class that has a reference to a Strategy and uses it to perform the task. The context might allow the strategy to be set or changed at runtime.
  This is essentially a specific application of delegation – the context *delegates* an algorithmic step to the strategy object. The Delegation pattern, as a general concept, might not always involve a family of interchangeable behaviors; it could be a one-off delegation to a helper. Strategy formalizes that the delegate is one of many interchangeable algorithms and the focus is on the ability to **switch algorithms easily**.

- **Purpose/Intent:** The intent of Strategy is *policy/algorithm selection.* It allows an object to change the algorithm it uses without changing its own code, by delegating to different strategy objects. For example, a sorting class might use a `SortingStrategy` to pick between quicksort or mergesort, or a payment processing system might use different payment strategy objects (CreditCardStrategy, PayPalStrategy, etc.). The intent of Delegation (general) is broader – it’s about dividing responsibilities between objects. Often, delegation is used to let one object **use a helper to perform a subtask**. In fact, one could say *Strategy is a specialized case of delegation focused on algorithms*. The difference in intent is subtle but important: if you’re explicitly designing a system to swap algorithmic behaviors, you’re applying the Strategy pattern. If you’re simply offloading work to a helper (and maybe you only have one such helper, not a family of them), you’re using delegation for design flexibility. 

- **Communication and Control:** In both patterns, the flow is one object calling a method on another (one-to-one). The context (delegator) calls the strategy (delegate) to execute the algorithm. The context is in control of when to call the strategy and may use the result. One distinction is that strategies are usually **completely determined by the context or the client** – the context typically doesn’t expect the strategy to call back or influence the context outside of the returned result (the strategy is a servant carrying out a computation). In some delegation scenarios (especially in UI delegate patterns), the delegate might call back into the delegator or be tightly coupled in logic. For example, a delegate could be given a reference to the delegator to inform it of something or query data. In strategy, that kind of two-way interaction is less common; the strategy is self-contained in performing its algorithm. Another difference: **runtime switching** tends to be more central in Strategy. The pattern is designed so that the strategy object can be swapped at runtime to change behavior ([Behavioral Design Patterns — iOS. Patterns I covered here: | by Ahmad G. Sufi | Medium](https://ahmadgsufi.medium.com/behavioral-design-patterns-ios-d233ca2bff29#:~:text=,whereas%20delegates%20are%20usually%20fixed)). Delegation in general also allows swapping delegates (as we showed with `setDelegate()` earlier), but in many cases the delegate might remain the same for a long time or isn’t frequently changed. In Strategy, switching the strategy is a core feature (e.g., changing sorting strategy for different data sets on the fly).

- **Usage Scenarios:** Use the Strategy pattern when you have multiple ways of doing something and you want to **choose the implementation at runtime or easily extend new variants**. Classic scenarios include: various file compression algorithms, routing strategies in a GPS, AI behaviors in a game (easy to swap behaviors), or different business rules that apply in different situations. The code will be structured with a context and multiple strategy classes. On the other hand, use delegation (in general) whenever you want to **delegate any responsibility to another class** – it might not be about interchangeable algorithms at all. For instance, you might delegate to a logger object to handle logging, or delegate to a validator object to handle input validation, etc. These don’t necessarily form a family of strategies, but are simply separating concerns. That said, if you find you have exactly one delegate interface and multiple implementations that the delegator swaps between, you are effectively using the Strategy pattern by another name. The distinction is often one of emphasis and context: Strategy is part of the design pattern catalog with a clear intent to vary algorithms, while delegation is the underlying mechanism enabling it (and many other patterns) ([Delegation Pattern: An effective way of replacing Android’s Base Activity with native Kotlin support | by Prokash Sarkar | Medium](https://prokash-sarkar.medium.com/delegation-pattern-an-effective-way-of-replacing-androids-baseactivity-with-native-kotlin-support-b00dee007d69#:~:text=In%20delegation%2C%20an%20object%20shows,Observer%2C%20Strategy%2C%20and%20Event%20Listener)).

- **Analogy:** If we use an analogy, strategy is like a tool-selection policy – you (the context) decide which tool (strategy) to use for a job, and you can pick a different tool anytime. Delegation, broadly, is like asking someone else to do a task for you. If you always ask the same person to do it, you’re delegating that responsibility to them. If you sometimes ask Alice, sometimes Bob, depending on who’s best for the task, that starts to look like the strategy pattern (choosing the best “strategy” person for the job).

### Java Example: Strategy Pattern Implementation

To clarify the strategy pattern, here’s a Java example. We’ll implement a simple calculator that can use different strategies to perform an operation on two numbers. The strategy interface will define a single method for executing an operation, and we’ll have two concrete strategies: one for addition and one for multiplication. The context class `Calculator` will have a strategy and delegate the computation to it:

```java
// Strategy interface
interface OperationStrategy {
    int execute(int a, int b);
}

// Concrete Strategy 1: Addition
class AdditionStrategy implements OperationStrategy {
    public int execute(int a, int b) {
        return a + b;
    }
}
// Concrete Strategy 2: Multiplication
class MultiplicationStrategy implements OperationStrategy {
    public int execute(int a, int b) {
        return a * b;
    }
}

// Context class that uses a strategy
class Calculator {
    private OperationStrategy strategy;
    public Calculator(OperationStrategy strategy) {
        this.strategy = strategy;
    }
    public void setStrategy(OperationStrategy strategy) {
        this.strategy = strategy;
    }
    public int compute(int x, int y) {
        return strategy.execute(x, y);  // delegate computation to strategy
    }
}
```

Using this `Calculator` context with different strategies:

```java
Calculator calc = new Calculator(new AdditionStrategy());
System.out.println(calc.compute(3, 4));  // Outputs: 7  (uses addition)

calc.setStrategy(new MultiplicationStrategy());
System.out.println(calc.compute(3, 4));  // Outputs: 12 (now uses multiplication)
```

In this example, the `Calculator` initially delegates the `compute` operation to an addition strategy. Later, we swap in a multiplication strategy. This is clearly the Strategy pattern in action – we have a family of algorithms (add, multiply, etc.) encapsulated as strategy objects, and the context can switch between them. Internally, this works exactly via delegation (the `Calculator` calls the `execute` method of whatever `OperationStrategy` it holds). The difference from a generic delegation example is mainly semantic: we identify this as “Strategy pattern” because the focus is on interchangeable algorithms and runtime switching. If the `Calculator` never intended to change strategies (say it always used addition passed in via constructor and never changed it), one could argue it’s just using delegation to perform the operation. The ability to change it is what makes it a clear Strategy usage.

## 6. Summary of Differences

To summarize the differences between **Delegation**, **Observer**, and **Strategy** in Java:

- **Delegation Pattern:** A general design principle where an object (delegator) forwards certain tasks to a helper object (delegate). It’s used to compose behaviors at runtime, avoid tight coupling and large inheritance hierarchies, and improve code reuse. The communication is one-to-one and often bi-directional (the delegator might call the delegate, and the delegate might call back if needed, depending on design). It’s about assigning responsibility and can be used in countless scenarios (including as part of implementing other patterns). The delegate is usually fixed to one object at a time (though it can be changed if needed).

- **Observer Pattern:** A specific behavioral pattern for event notification. A subject maintains a list of observers and notifies all of them when something of interest occurs. It decouples the event source from multiple event receivers. Communication is one-to-many and unidirectional (subject to observers). Each observer is typically unaware of the others; the subject doesn’t customize behavior, it just broadcasts events. Observers are often used in event-driven systems, GUI frameworks (multiple listeners), and any publish-subscribe mechanisms where you need to notify multiple parties.

- **Strategy Pattern:** A specific behavioral pattern for selecting algorithms at runtime. A context class delegates an operation to a Strategy interface, which can have multiple implementations (strategies). The focus is on interchangeability of these delegates to change the *how* part of an operation. Structurally one-to-one (context to strategy) like delegation, but the intent is to easily switch among a family of behaviors. Communication is one-to-one and the context fully controls when/how the strategy is used. Commonly used for things like data processing algorithms, game AI behaviors, formatting or parsing strategies, etc., where you might plug in different logic without changing the context’s code.

In practice, all three involve abstraction and indirection to promote flexibility and decoupling. Delegation as a principle underpins many design patterns (including Strategy and certain implementations of Observer). An advanced Java developer will recognize that these patterns are tools in a toolbox: **Observer** for event systems, **Strategy** for algorithm selection, and **Delegation** for structuring collaborations between objects in a flexible way. By understanding these patterns and the nuances in their structure and intent, one can choose the right approach for a given design problem and write code that is maintainable, extensible, and clear.

**Sources:**

- Gamma et al., *Design Patterns: Elements of Reusable Object-Oriented Software* (1994) – basis for Observer and Strategy patterns.
- Java Design Patterns – Delegation Pattern ([Delegation Pattern in Java: Mastering Efficient Task Assignment | Java Design Patterns](https://java-design-patterns.com/patterns/delegation/#:~:text=When%20to%20Use%20the%20Delegation,Pattern%20in%20Java)) ([Delegation Pattern in Java: Mastering Efficient Task Assignment | Java Design Patterns](https://java-design-patterns.com/patterns/delegation/#:~:text=,of%20your%20classes%20at%20runtime)) (example and use cases in Java).
- Prokash Sarkar, “Delegation Pattern” – Medium (2022) ([Delegation Pattern: An effective way of replacing Android’s Base Activity with native Kotlin support | by Prokash Sarkar | Medium](https://prokash-sarkar.medium.com/delegation-pattern-an-effective-way-of-replacing-androids-baseactivity-with-native-kotlin-support-b00dee007d69#:~:text=In%20the%20Introduction%20to%20Gamma,Grady%20Booch%20defined%20delegation%20as)) ([Delegation Pattern: An effective way of replacing Android’s Base Activity with native Kotlin support | by Prokash Sarkar | Medium](https://prokash-sarkar.medium.com/delegation-pattern-an-effective-way-of-replacing-androids-baseactivity-with-native-kotlin-support-b00dee007d69#:~:text=In%20short%2C%20The%20delegation%20pattern,carrying%20out%20the%20operation%20itself)) ([Delegation Pattern: An effective way of replacing Android’s Base Activity with native Kotlin support | by Prokash Sarkar | Medium](https://prokash-sarkar.medium.com/delegation-pattern-an-effective-way-of-replacing-androids-baseactivity-with-native-kotlin-support-b00dee007d69#:~:text=Three%20elements%20make%20up%20the,majority%20of%20this%20pattern)).
- StackExchange discussions on delegation vs observer ([What are the advantages of the delegate pattern over the observer pattern? - Software Engineering Stack Exchange](https://softwareengineering.stackexchange.com/questions/178008/what-are-the-advantages-of-the-delegate-pattern-over-the-observer-pattern#:~:text=Generally%2C%20with%20an%20Observer%20Pattern%2C,just%20calls%20out%20to%20them)) and delegation vs strategy ([Difference between Strategy pattern and Delegation pattern - Stack Overflow](https://stackoverflow.com/questions/1224830/difference-between-strategy-pattern-and-delegation-pattern#:~:text=delegation%20is%20more%20a%20principal,lessening%20coupling%20and%20increasing%20cohesiveness)).
- Refactoring.Guru – Observer and Strategy pattern descriptions ([Observer](https://refactoring.guru/design-patterns/observer#:~:text=Observer%20is%20a%20behavioral%20design,happen%20to%20the%20object%20they%E2%80%99re%C2%A0observing)) ([Strategy](https://refactoring.guru/design-patterns/strategy#:~:text=Use%20the%20Strategy%20pattern%20when,algorithm%20to%20another%20during%20runtime)).