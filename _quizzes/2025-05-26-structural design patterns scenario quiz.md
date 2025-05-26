---
layout: quiz
title: "Structural Design Patterns Scenario Quiz"
questions:
  - q: "You are designing a menu system for an application where a menu can contain menu items as well as sub-menus. A single call like display() or enable() should work uniformly on both. Which design pattern would you use?"
    options:
      - "Decorator"
      - "Facade"
      - "Composite"
      - "Adapter"
    answer: 2

  - q: "You need to wrap a third-party logging library that has an incompatible interface so it matches your codebase’s logger interface. Which design pattern is most suitable?"
    options:
      - "Bridge"
      - "Decorator"
      - "Facade"
      - "Adapter"
    answer: 3

  - q: "In a home-automation system, a single MovieNightMode.startMovieNight() method internally dims lights, lowers blinds, turns on TV/audio, and adjusts the thermostat. Which design pattern does this illustrate?"
    options:
      - "Facade"
      - "Adapter"
      - "Proxy"
      - "Composite"
    answer: 0

  - q: "GUI windows can gain features like borders, scroll bars, or shadows at runtime by wrapping them in other objects that add behavior. Which design pattern enables this?"
    options:
      - "Composite"
      - "Decorator"
      - "Facade"
      - "Adapter"
    answer: 1

  - q: "You want to decouple shape classes (Circle, Square) from rendering back-ends (SVG, OpenGL) so either side can vary independently. Which structural pattern achieves this?"
    options:
      - "Bridge"
      - "Adapter"
      - "Composite"
      - "Decorator"
    answer: 0

  - q: "A text editor reuses shared glyph objects (font, size) for thousands of characters while storing each character’s position separately to save memory. Which pattern is this?"
    options:
      - "Decorator"
      - "Proxy"
      - "Adapter"
      - "Flyweight"
    answer: 3

  - q: "A CachingFetcher object checks permissions and caches results before delegating to a costly DocumentFetcher service. Which design pattern does CachingFetcher represent?"
    options:
      - "Decorator"
      - "Proxy"
      - "Adapter"
      - "Facade"
    answer: 1

  - q: "For each external payment gateway, you implement a class that converts the common PaymentProcessor interface to that gateway’s API. Which pattern are these classes applying?"
    options:
      - "Facade"
      - "Bridge"
      - "Proxy"
      - "Adapter"
    answer: 3

  - q: "Your data-access layer defines a Database interface and separate MySQLDatabase and PostgreSQLDatabase implementations that can be swapped at runtime. Which design pattern is exemplified?"
    options:
      - "Adapter"
      - "Facade"
      - "Bridge"
      - "Composite"
    answer: 2

  - q: "Managers contain subordinates and calling getSalary() on a manager aggregates all team salaries, while the same call on an employee returns just their own. Which pattern would you use?"
    options:
      - "Decorator"
      - "Adapter"
      - "Facade"
      - "Composite"
    answer: 3

  - q: "You wrap a DataService with LoggingService and TimingService objects that implement the same interface and add extra behavior around fetchData(). Which pattern is this?"
    options:
      - "Proxy"
      - "Decorator"
      - "Adapter"
      - "Facade"
    answer: 1

  - q: "A ReportGenerator.generateReport() method hides several steps of a complex analytics library behind one call. Which pattern have you implemented?"
    options:
      - "Facade"
      - "Adapter"
      - "Proxy"
      - "Decorator"
    answer: 0

  - q: "XmlToJsonAdapter implements a JSON-producing interface but internally converts XML data to JSON on the fly. Which design pattern does it embody?"
    options:
      - "Facade"
      - "Proxy"
      - "Bridge"
      - "Adapter"
    answer: 3

  - q: "An ImageProxy delays loading a high-resolution image from disk until display() is called, then delegates to the real image object. Which pattern is ImageProxy using?"
    options:
      - "Decorator"
      - "Adapter"
      - "Proxy"
      - "Facade"
    answer: 2

  - q: "BufferedInputStream and EncryptedInputStream wrap another InputStream and add functionality like buffering or encryption, and wrappers can be stacked. What design pattern are they using?"
    options:
      - "Proxy"
      - "Decorator"
      - "Adapter"
      - "Facade"
    answer: 1

  - q: "A 2-D game shares one sprite per enemy type among hundreds of enemies, each storing only position and health. Which design pattern does this correspond to?"
    options:
      - "Proxy"
      - "Decorator"
      - "Flyweight"
      - "Composite"
    answer: 2

  - q: "UI elements hold a reference to a Renderer interface so you can switch between DirectXRenderer and OpenGLRenderer at runtime without changing UI classes. Which pattern allows this flexibility?"
    options:
      - "Bridge"
      - "Proxy"
      - "Adapter"
      - "Decorator"
    answer: 0

  - q: "A SystemFacade wraps low-level file, network, and graphics APIs so the rest of the code calls SystemFacade methods instead of the underlying libraries. Which pattern does this demonstrate?"
    options:
      - "Adapter"
      - "Facade"
      - "Proxy"
      - "Decorator"
    answer: 1

  - q: "A calculator builds an expression tree where each node has evaluate(); numbers return a value, operations evaluate children and combine results. Which pattern is at work?"
    options:
      - "Decorator"
      - "Adapter"
      - "Composite"
      - "Facade"
    answer: 2

  - q: "RemoteServiceProxy implements the same methods as a remote service but handles network communication transparently so callers treat it as a local object. What pattern is used?"
    options:
      - "Proxy"
      - "Facade"
      - "Adapter"
      - "Decorator"
    answer: 0
---
