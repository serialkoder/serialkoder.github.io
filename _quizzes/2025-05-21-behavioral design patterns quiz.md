---
layout: quiz
title: "Behavioral Design Patterns Quiz"
questions:
  - q: "What is the primary purpose of the Observer pattern?"
    options:
      - "To encapsulate a request as an object"
      - "To allow objects to observe and be notified of changes in other objects"
      - "To define a family of algorithms, encapsulate each one, and make them interchangeable"
      - "To define the skeleton of an algorithm in a method, deferring some steps to subclasses"
    answer: 1

  - q: "Which behavioral design pattern is used to handle requests by passing them along a chain of handlers?"
    options:
      - "Command"
      - "Chain of Responsibility"
      - "Mediator"
      - "State"
    answer: 1

  - q: "What does the Command pattern allow you to do?"
    options:
      - "Pass requests along a chain of handlers"
      - "Encapsulate a request as an object"
      - "Define a family of algorithms and make them interchangeable"
      - "Alter an object's behavior when its internal state changes"
    answer: 1

  - q: "Which pattern is used to sequentially access the elements of a collection without exposing its underlying representation?"
    options:
      - "Iterator"
      - "Observer"
      - "Strategy"
      - "Visitor"
    answer: 0

  - q: "In the State pattern, what happens when an object's internal state changes?"
    options:
      - "The object's behavior changes as if its class had changed"
      - "The object notifies all its observers"
      - "The object encapsulates a request as an object"
      - "The object passes the request along a chain of handlers"
    answer: 0

  - q: "What is the role of the Mediator pattern in a system?"
    options:
      - "To reduce coupling between objects by having them communicate through a mediator object"
      - "To encapsulate a request as an object"
      - "To allow objects to observe and be notified of changes in other objects"
      - "To define a family of algorithms and make them interchangeable"
    answer: 0

  - q: "Which pattern is used to capture and restore an object's internal state without violating encapsulation?"
    options:
      - "Memento"
      - "Command"
      - "State"
      - "Observer"
    answer: 0

  - q: "When would you use the Strategy pattern instead of the State pattern?"
    options:
      - "When you need to alter an object's behavior when its internal state changes"
      - "When you need to define a family of algorithms and make them interchangeable"
      - "When you need to handle requests by passing them along a chain of handlers"
      - "When you need to allow objects to observe and be notified of changes in other objects"
    answer: 1

  - q: "What is a common use case for the Visitor pattern?"
    options:
      - "To add new operations to existing classes without modifying them"
      - "To encapsulate a request as an object"
      - "To define the skeleton of an algorithm in a method, deferring some steps to subclasses"
      - "To reduce coupling between objects by having them communicate through a mediator object"
    answer: 0

  - q: "Which pattern is particularly useful when you need to perform operations on elements of an object structure without modifying their classes?"
    options:
      - "Visitor"
      - "Command"
      - "Iterator"
      - "Mediator"
    answer: 0
---
