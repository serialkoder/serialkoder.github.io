---

layout: quiz
title: "Creational Design Patterns Quiz (v2)"
tags: [design-patterns]
questions:
  - q: "What is the primary purpose of creational design patterns?"
    options:
      - "To manage communication between objects"
      - "To control the creation and instantiation of objects"
      - "To define the structure of objects and classes"
      - "To handle behavioral interactions between objects"
    answer: 1

  - q: "Which creational design pattern ensures a class has only one instance and provides a global point of access to it?"
    options:
      - "Factory Method"
      - "Singleton"
      - "Builder"
      - "Prototype"
    answer: 1

  - q: "In which creational pattern is an object cloned to create new instances?"
    options:
      - "Abstract Factory"
      - "Prototype"
      - "Singleton"
      - "Builder"
    answer: 1

  - q: "Which pattern is used to create an object step-by-step, separating the construction process from its representation?"
    options:
      - "Factory Method"
      - "Singleton"
      - "Builder"
      - "Abstract Factory"
    answer: 2

  - q: "Which creational pattern defines an interface for creating an object but lets subclasses decide which class to instantiate?"
    options:
      - "Builder"
      - "Factory Method"
      - "Prototype"
      - "Singleton"
    answer: 1

  - q: "In the Abstract Factory pattern, what is the main role of the abstract factory?"
    options:
      - "To ensure a single instance of a class"
      - "To clone objects for instantiation"
      - "To provide an interface for creating families of related objects"
      - "To separate object construction from its use"
    answer: 2

  - q: "Which pattern would you use to create different configurations of a complex object, such as a car with varying engines and wheels?"
    options:
      - "Singleton"
      - "Builder"
      - "Factory Method"
      - "Prototype"
    answer: 1

  - q: "In the Prototype pattern, what is a key challenge when implementing deep copying of objects?"
    options:
      - "Ensuring thread safety for the prototype"
      - "Handling circular references in the object graph"
      - "Preventing multiple instances of the prototype"
      - "Defining an interface for object creation"
    answer: 1

  - q: "How does the Abstract Factory pattern differ from the Factory Method pattern in terms of scope and flexibility?"
    options:
      - "Abstract Factory creates single objects, while Factory Method creates families of objects"
      - "Factory Method is more flexible as it allows runtime changes to the factory"
      - "Abstract Factory focuses on creating families of related objects, while Factory Method focuses on a single object type"
      - "Factory Method requires concrete factories, while Abstract Factory does not"
    answer: 2

  - q: "In the context of the Builder pattern, what is the role of the Director, and how does it interact with the Builder?"
    options:
      - "The Director defines the interface for object creation, while the Builder implements it"
      - "The Director constructs the object by calling the Builder’s methods in a specific order"
      - "The Director clones the Builder to create new instances"
      - "The Director ensures the Builder creates a single instance of the product"
    answer: 1
---
