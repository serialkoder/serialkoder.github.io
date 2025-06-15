---

layout: quiz
title: "Creational Design Patterns Quiz (Practical)"
tags: [design-patterns]
questions:
  - q: "In a cross-platform UI framework, the code needs to generate a family of related UI components (windows, buttons, menus) for different operating systems. Which creational design pattern is exemplified by this scenario?"
    options:
      - "Builder"
      - "Prototype"
      - "Factory Method"
      - "Abstract Factory"
    answer: 3

  - q: "A logging utility ensures every part of an application receives the same single logger instance. Which creational design pattern is used?"
    options:
      - "Singleton"
      - "Factory Method"
      - "Abstract Factory"
      - "Builder"
    answer: 0

  - q: "A reporting tool builds reports in different formats (PDF, HTML, text) through a step-by-step construction process, supplying a different formatter object for each format. Which pattern is being applied?"
    options:
      - "Abstract Factory"
      - "Prototype"
      - "Builder"
      - "Factory Method"
    answer: 2

  - q: "A framework defines an abstract DocumentProcessor with process(), which calls an abstract createParser() implemented by subclasses XMLProcessor and JSONProcessor. Which creational design pattern is exemplified?"
    options:
      - "Singleton"
      - "Factory Method"
      - "Abstract Factory"
      - "Builder"
    answer: 1

  - q: "A graphics editor duplicates existing shapes to create new ones with the same properties, then modifies them independently. Which creational design pattern is illustrated?"
    options:
      - "Factory Method"
      - "Abstract Factory"
      - "Builder"
      - "Prototype"
    answer: 3

  - q: "A cloud services SDK works with multiple providers. At runtime it uses a factory object that supplies related resource objects for the selected provider. Which creational design pattern is implemented?"
    options:
      - "Factory Method"
      - "Abstract Factory"
      - "Prototype"
      - "Singleton"
    answer: 1

  - q: "An online food-ordering system assembles a Meal object step by step using a MealAssembler, adding components based on customer choices. Which creational pattern does this approach illustrate?"
    options:
      - "Builder"
      - "Abstract Factory"
      - "Factory Method"
      - "Prototype"
    answer: 0

  - q: "A plugin architecture for media importers defines importFile() in a base class, which calls an abstract createDecoder() overridden by each plugin subtype. Which creational design pattern is used?"
    options:
      - "Abstract Factory"
      - "Prototype"
      - "Factory Method"
      - "Builder"
    answer: 2

  - q: "A web server clones a fully initialized template session object for each new user to avoid repeating heavy setup. Which creational design pattern is applied?"
    options:
      - "Prototype"
      - "Singleton"
      - "Builder"
      - "Abstract Factory"
    answer: 0

  - q: "A print server uses a single spooler instance to manage all print jobs across the application. Which creational design pattern ensures this single point of control?"
    options:
      - "Abstract Factory"
      - "Factory Method"
      - "Prototype"
      - "Singleton"
    answer: 3
---
