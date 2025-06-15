---

layout: quiz
title: "Behavioral Design Patterns Quiz (v3)"
tags: [design-patterns]
questions:
  - q: "What is the primary focus of behavioral design patterns?"
    options:
      - "Creating objects and instances"
      - "How classes and objects interact and distribute responsibility"
      - "Simplifying the structure of complex class hierarchies"
      - "Optimizing database transactions"
    answer: 1

  - q: "Which behavioral design pattern allows objects to notify other objects about changes in their state?"
    options:
      - "Strategy Pattern"
      - "Observer Pattern"
      - "Mediator Pattern"
      - "Memento Pattern"
    answer: 1

  - q: "In the Chain of Responsibility pattern, what happens when a request is received?"
    options:
      - "It is simultaneously processed by all handlers"
      - "It is processed by a central dispatcher"
      - "It is passed along a chain of handlers until one handles it"
      - "It is transformed into a different request type"
    answer: 2

  - q: "The Template Method pattern establishes:"
    options:
      - "A flexible way to compose objects"
      - "A skeleton of an algorithm with some steps deferred to subclasses"
      - "A way to create objects without specifying their concrete classes"
      - "A unified interface to a set of interfaces in a subsystem"
    answer: 1

  - q: "Which behavioral pattern would be most appropriate for implementing an undo functionality in a text editor?"
    options:
      - "Command Pattern"
      - "Iterator Pattern"
      - "Memento Pattern"
      - "Visitor Pattern"
    answer: 2

  - q: "How does the Observer pattern differ from the Mediator pattern?"
    options:
      - "Observer allows one-to-many dependencies while Mediator handles many-to-many"
      - "Observer works with collections while Mediator works with individual objects"
      - "Observer is a behavioral pattern while Mediator is a structural pattern"
      - "Observer requires concrete classes while Mediator uses only interfaces"
    answer: 0

  - q: "In which scenario would the State pattern be most appropriate?"
    options:
      - "When an algorithm needs to vary independently from the clients that use it"
      - "When an object needs to change its behavior based on its internal state"
      - "When a complex object needs to be built step by step"
      - "When operations need to be added to an object without modifying it"
    answer: 1

  - q: "Which combination of patterns would best address a system where multiple UI components need to respond to events, maintain a history of states, and support undo operations?"
    options:
      - "Factory, Singleton, and Decorator"
      - "Observer, Command, and Memento"
      - "Template Method, Bridge, and Proxy"
      - "Chain of Responsibility, Strategy, and Adapter"
    answer: 1

  - q: "Consider a complex validation system that performs sequential checks on data with the ability to stop at any point if validation fails. Which pattern implementation would be most effective if new validation rules need to be frequently added or removed without modifying existing code?"
    options:
      - "A Visitor pattern with composite validators"
      - "A Chain of Responsibility with dynamic handler registration"
      - "A Strategy pattern with conditional execution"
      - "A Template Method with hook methods for each validation step"
    answer: 1

  - q: "What potential issue might arise when implementing the Observer pattern in a multi-threaded environment?"
    options:
      - "Memory leaks due to circular references"
      - "Race conditions during notification of multiple observers"
      - "Increased coupling between the subject and observers"
      - "All of the above"
    answer: 1
---
