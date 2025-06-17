---
layout: flashdeck
title: "GoF Creational Patterns Flash Deck"
intro: |
  Quick-fire revision cards covering the five classic “Gang of Four” creational patterns—
  **Singleton, Factory Method, Abstract Factory, Builder, and Prototype**.
  The deck is tiered roughly *easy → medium → hard* to test both recall and deeper insight.
  Click a card to reveal the answer.
cards:
  - q: "Singleton (Easy) – What problem does the Singleton pattern address?"
    a: |
      Guarantees **exactly one instance** of a class per process **and** provides a global
      access point to it (common for configs, logging, caches, connection pools).

  - q: "Singleton (Medium) – Compare *eager* vs *lazy* Singleton initialization."
    a: |
      • **Eager:** instance built at class-loading time; inherently thread-safe but may
        waste resources if never used.  
      • **Lazy:** instance created on first `getInstance()`; conserves memory but needs
        extra thread-safety (double-checked locking, static-holder idiom).

  - q: "Singleton (Hard) – Give two common pitfalls of Singletons and mitigations."
    a: |
      1. **Hidden dependencies** → prefer DI / pass interfaces.  
      2. **Hard-to-test state** → allow test-only swapping or use service locators.  
      3. **Serialization/Reflection attacks** → guard with `readResolve()` and private
         constructors.

  - q: "Factory Method (Easy) – What does Factory Method add over a direct `new` call?"
    a: |
      Encapsulates creation in a **creator** that returns a **product interface**; concrete
      subclasses choose which product to instantiate, enabling extension without changing
      client code.

  - q: "Factory Method (Medium) – When choose Factory Method over Abstract Factory?"
    a: |
      Use it when you need **only one product** whose variant is determined by subclasses.
      Pick Abstract Factory if you must create **whole families of related products** that
      must remain compatible.

  - q: "Factory Method (Hard) – How does Factory Method uphold the open–closed principle?"
    a: |
      Clients depend only on the creator interface; adding new concrete products extends
      behaviour **without modifying** existing clients. Trade-off: growth of subclasses and
      tighter coupling between creator and concrete products.

  - q: "Abstract Factory (Easy) – Give a real-world analogy for Abstract Factory."
    a: |
      A furniture showroom selling “Victorian” or “Modern” sets—choose one factory to get
      a chair, sofa, and table that match in style.

  - q: "Abstract Factory (Medium) – How does the pattern aid cross-platform UI toolkits?"
    a: |
      App selects a concrete factory at start-up (Windows, macOS, Linux); each factory
      knows how to build native widgets, so application code **never touches
      platform-specific classes**.

  - q: "Abstract Factory (Hard) – Contrast Abstract Factory with Builder."
    a: |
      • **Abstract Factory:** creates multiple **related products** all at once; focuses on
        product *families* & compatibility.  
      • **Builder:** assembles **one complex product** step-by-step, allowing optional
        parts and varying construction sequences.

  - q: "Builder (Easy) – What headache does Builder cure for objects with many parameters?"
    a: |
      Eliminates “telescoping constructors” by letting clients set only needed fields and
      chain optionals fluently; `build()` then returns an immutable object.

  - q: "Builder (Medium) – Why still useful in languages with named/optional params?"
    a: |
      Can **validate progressively**, enforce **ordering rules**, and hide complex default
      logic that would clutter a single constructor call.

  - q: "Builder (Hard) – Identify a performance drawback of classic Java Builders."
    a: |
      Builder holds duplicate fields, so large objects may be copied twice. Mitigate with
      lazy suppliers or use a mutable product plus director for high-volume cases.

  - q: "Prototype (Easy) – Define the Prototype pattern in one sentence."
    a: |
      Creates new objects by **cloning an existing prototype** instead of instantiating a
      class directly.

  - q: "Prototype (Medium) – Differentiate *shallow* vs *deep* copy in Prototype."
    a: |
      • **Shallow:** fields copied by reference; clones share sub-objects → fast but risky
        if internals mutate.  
      • **Deep:** recursively duplicates referenced objects → safe isolation, higher cost.

  - q: "Prototype (Hard) – How clone an acyclic graph with back-references safely?"
    a: |
      Maintain a **map<original, clone>**; DFS/BFS each node: if not in map, create a stub
      clone, store it, then recurse on neighbours and wire cloned edges—each original
      visited once, preventing infinite loops.
---
