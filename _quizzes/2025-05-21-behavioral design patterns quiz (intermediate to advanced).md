---
layout: quiz
title: "Behavioral Design Patterns Quiz (Intermediate to Advanced)"
questions:
  - q: "In a GUI application, when a user clicks a button, multiple parts of the program (such as other UI components and logging systems) need to react to this event without the button explicitly knowing about those components. Which design pattern enables this kind of one-to-many notification?"
    options:
      - "Command"
      - "Mediator"
      - "Observer"
      - "Chain of Responsibility"
    answer: 2

  - q: "You have multiple algorithms for sorting a list (quick sort, merge sort, etc.), and you want to choose the sorting algorithm at runtime based on the data or user preference without changing the code that uses it. Which design pattern allows you to swap out these algorithms dynamically?"
    options:
      - "Strategy"
      - "State"
      - "Template Method"
      - "Observer"
    answer: 0

  - q: "For a custom data structure (such as a complex tree or graph), you want to provide a way to access its elements sequentially without revealing the complexities of its internal representation. Which design pattern is this describing?"
    options:
      - "Iterator"
      - "Visitor"
      - "Composite"
      - "Memento"
    answer: 0

  - q: "You're building a framework where different subclasses need to implement certain steps of an algorithm, but the overall structure of the algorithm remains the same across all subclasses. You define the high-level workflow in a base class method and allow subclasses to override specific steps. Which design pattern does this scenario follow?"
    options:
      - "Strategy"
      - "Factory Method"
      - "Template Method"
      - "Decorator"
    answer: 2

  - q: "In a text editor, you want to implement features like undo and redo for user actions (typing, formatting, etc.). You decide to encapsulate each user action (such as 'insert text' or 'apply style') as an object so that you can queue these actions, log them, or reverse them for an undo operation. Which design pattern are you using in this situation?"
    options:
      - "Command"
      - "Memento"
      - "Chain of Responsibility"
      - "Strategy"
    answer: 0

  - q: "In a company's expense approval system, an expense request is first sent to a team lead for approval. If the amount exceeds the team lead's approval limit, the request is forwarded to the department manager; if the manager cannot approve it, it goes to a director, and so on until the request is handled or reaches the top. Which design pattern does this delegation of requests exemplify?"
    options:
      - "Observer"
      - "Mediator"
      - "Chain of Responsibility"
      - "Decorator"
    answer: 2

  - q: "A network connection object can be in states like 'Connecting', 'Connected', or 'Disconnected'. Instead of using numerous if/else statements inside the connection methods to handle behavior for each state, you create separate classes for each state and have the connection object delegate actions to its current state object. Which design pattern is being used here?"
    options:
      - "State"
      - "Strategy"
      - "Observer"
      - "Memento"
    answer: 0

  - q: "In an air traffic control system, aircraft do not communicate directly with one another. Instead, each plane sends messages to a central control tower, which then coordinates and relays the messages to the appropriate planes. This centralized communication mechanism is an example of which design pattern?"
    options:
      - "Observer"
      - "Chain of Responsibility"
      - "Facade"
      - "Mediator"
    answer: 3

  - q: "A graphic design application allows users to save the current state of a drawing and restore it later. The implementation captures all the necessary state of the drawing in a separate object so that the state can be restored without exposing the internals of the drawing object. Which design pattern is used to implement this 'snapshot' capability?"
    options:
      - "Prototype"
      - "Command"
      - "Memento"
      - "State"
    answer: 2

  - q: "You have classes to represent elements of a scripting language (e.g., NumberExpression, AddExpression). You want to perform various operations on the AST—such as evaluating, pretty-printing, or optimizing—without modifying the node classes each time you add an operation. Which design pattern allows you to define new operations on the AST nodes without changing their classes?"
    options:
      - "Interpreter"
      - "Composite"
      - "Template Method"
      - "Visitor"
    answer: 3
---
