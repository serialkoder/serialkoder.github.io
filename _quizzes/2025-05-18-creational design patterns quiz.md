---
layout: quiz
title: "Creational Design Patterns Quiz"
questions:
  - q: "Which of the following is a creational design pattern?"
    options:
      - "Singleton"
      - "Observer"
      - "Decorator"
      - "Strategy"
    answer: 0

  - q: "What is the main purpose of the Builder pattern?"
    options:
      - "Simplify complex object creation"
      - "Separate interface from implementation"
      - "Allow subclasses to alter behavior"
      - "Dynamically attach responsibilities to objects"
    answer: 0

  - q: "Which pattern ensures that a class has only one instance and provides a global point of access?"
    options:
      - "Prototype"
      - "Abstract Factory"
      - "Singleton"
      - "Factory Method"
    answer: 2

  - q: "In the Factory Method pattern, which component typically decides which class to instantiate?"
    options:
      - "The creator or factory class"
      - "The client directly"
      - "A configuration file"
      - "A third-party library"
    answer: 0

  - q: "What is the difference between the Abstract Factory and Factory Method patterns?"
    options:
      - "Abstract Factory creates one product, while Factory Method creates multiple products"
      - "Abstract Factory uses multiple factory methods internally, while Factory Method is a single method"
      - "There is no difference"
      - "Factory Method is always implemented using inheritance, while Abstract Factory cannot be"
    answer: 1

  - q: "In the Prototype pattern, how are new objects typically created?"
    options:
      - "By cloning an existing instance"
      - "By reflection-based instantiation"
      - "By a chain of creation methods"
      - "By using a pool of pre-created objects"
    answer: 0

  - q: "Which pattern allows the construction of complex objects step by step and separates the object construction from its representation?"
    options:
      - "Factory Method"
      - "Builder"
      - "Abstract Factory"
      - "Singleton"
    answer: 1

  - q: "When using the Singleton pattern, which of the following might be a potential downside?"
    options:
      - "Overly simplified object creation"
      - "Decreased testability or hidden dependencies"
      - "Difficulties in instantiating multiple related objects"
      - "Excessive memory usage because of multiple instances"
    answer: 1

  - q: "In a large-scale application, why might the Abstract Factory pattern be preferred over multiple separate Factory Methods?"
    options:
      - "It ensures the client has no dependency on any interfaces"
      - "It simplifies adding new, related product families"
      - "It guarantees thread-safe object creation"
      - "It has better performance than other creational patterns"
    answer: 1

  - q: "What is a potential drawback of the Builder pattern in terms of design complexity?"
    options:
      - "It forces you to create a new Builder subclass for every type of product"
      - "It ties you into a single product family"
      - "It always requires reflection to instantiate objects"
      - "It can lead to a large number of small, separate builder classes"
    answer: 3
---
