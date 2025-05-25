---
layout: quiz
title: "Structural Design Patterns Quiz"
questions:
  - q: "Which pattern allows incompatible interfaces to work together?"
    options:
      - "Singleton"
      - "Adapter"
      - "Strategy"
      - "Observer"
    answer: 1

  - q: "Which structural pattern decouples an abstraction from its implementation, allowing the two to vary independently?"
    options:
      - "Bridge"
      - "Adapter"
      - "Strategy"
      - "Singleton"
    answer: 0

  - q: "Which pattern composes objects into tree structures so that clients can treat individual objects and compositions uniformly (i.e., as part-whole hierarchies)?"
    options:
      - "Composite"
      - "Decorator"
      - "Chain of Responsibility"
      - "Singleton"
    answer: 0

  - q: "Which pattern attaches additional responsibilities to an object dynamically without altering its class?"
    options:
      - "Decorator"
      - "Adapter"
      - "Proxy"
      - "Chain of Responsibility"
    answer: 0

  - q: "Which pattern provides a unified interface to a complex subsystem, making it easier for clients to access its functionality?"
    options:
      - "Facade"
      - "Adapter"
      - "Proxy"
      - "Composite"
    answer: 0

  - q: "Which pattern uses sharing to support large numbers of fine-grained objects efficiently by keeping their common state in one place?"
    options:
      - "Flyweight"
      - "Prototype"
      - "Singleton"
      - "Decorator"
    answer: 0

  - q: "Which pattern provides a surrogate or placeholder for another object to control access to it?"
    options:
      - "Proxy"
      - "Decorator"
      - "Adapter"
      - "Facade"
    answer: 0

  - q: "Your project needs to integrate a third-party library that expects data in a different format than your system produces. Which pattern should you use to reconcile these differences?"
    options:
      - "Adapter"
      - "Template Method"
      - "Proxy"
      - "Observer"
    answer: 0

  - q: "You are designing a drawing application that must support multiple rendering engines for various shapes. Which structural pattern allows you to independently vary the shape abstractions and the rendering implementations?"
    options:
      - "Bridge"
      - "Decorator"
      - "Abstract Factory"
      - "Adapter"
    answer: 0

  - q: "In a GUI framework, you have a Window component. You want to add features like scroll bars or borders to specific Window instances at runtime without modifying the Window class. Which pattern is most suitable?"
    options:
      - "Decorator"
      - "Builder"
      - "Prototype"
      - "Facade"
    answer: 0

  - q: "A certain subsystem in your application is very complex. You decide to create a class that encapsulates the entire subsystem’s workflow and provides one simple method process() for client code. Which pattern does this describe?"
    options:
      - "Facade"
      - "Adapter"
      - "Composite"
      - "Decorator"
    answer: 0

  - q: "In an image viewer, loading high-resolution images is slow. You want to load an image only when it’s scrolled into view while the rest of the code uses an Image interface transparently. Which pattern would you apply?"
    options:
      - "Proxy"
      - "Flyweight"
      - "Memento"
      - "Decorator"
    answer: 0

  - q: "A text editor must handle thousands of character objects, many identical in font and style. Which pattern helps reduce memory usage?"
    options:
      - "Flyweight"
      - "Singleton"
      - "Prototype"
      - "Composite"
    answer: 0

  - q: "The Decorator and Proxy patterns both wrap another object and implement the same interface. Which statement correctly distinguishes their intents?"
    options:
      - "A Proxy controls access to an object, whereas a Decorator adds new behavior or responsibilities."
      - "A Proxy changes the interface of the object it wraps, while a Decorator preserves the original interface."
      - "A Decorator is primarily used for security, while a Proxy is used for adding features at runtime."
      - "There is no real difference – Proxy and Decorator essentially serve the same purpose."
    answer: 0

  - q: "One drawback of the Decorator pattern is that:"
    options:
      - "It can result in a system with many small wrapper objects, making debugging and maintenance more complex."
      - "It permanently changes the interface of the component it wraps."
      - "It restricts you from adding more than one new behavior to the same object."
      - "It tightly couples the decorator class to a specific concrete component class."
    answer: 0

  - q: "What is a potential disadvantage of using the Flyweight pattern?"
    options:
      - "The code can become more complex due to managing shared versus unique state."
      - "It tends to increase memory consumption since state is duplicated."
      - "It requires altering all existing classes to extract their state."
      - "Flyweight objects cannot be used in multi-threaded programs."
    answer: 0

  - q: "When applying the Composite pattern, a design challenge is that:"
    options:
      - "The design becomes overly general, making it hard to restrict or enforce certain constraints."
      - "Leaf objects cannot be added or removed at runtime once the tree is created."
      - "All components must be of the exact same concrete class type."
      - "Clients must explicitly distinguish between composite and leaf nodes."
    answer: 0

  - q: "A graphics editing application allows grouping shapes, dynamically adding scrollbars or borders, and deferring loading of detailed images until needed. Which set of structural patterns is being used (in order)?"
    options:
      - "Composite, Decorator, Proxy"
      - "Composite, Facade, Proxy"
      - "Prototype, Decorator, Flyweight"
      - "Decorator, Adapter, Proxy"
    answer: 0

  - q: "What happens if you apply the Bridge pattern where an abstraction has only one fixed implementation?"
    options:
      - "It adds unnecessary complexity by splitting code into abstraction and implementation layers without a clear benefit."
      - "It will not work unless the language supports multiple inheritance."
      - "It prevents future extension of the system because the abstraction is fixed."
      - "It ties the abstraction and implementation more tightly together."
    answer: 0

  - q: "A potential drawback of using the Facade pattern is that:"
    options:
      - "By providing a simplified interface, it might not expose all functionality of the underlying subsystem."
      - "Clients become tightly coupled to every class of the subsystem."
      - "It adds significant memory and performance overhead."
      - "You must rewrite or modify the entire subsystem to implement a facade."
    answer: 0
---
