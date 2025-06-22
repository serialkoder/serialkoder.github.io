---
layout: flashdeck
title: "Creational Design Patterns — Implementation Flash Deck"
tags: [design-patterns]
intro: |
  Nail the *how* behind the five classic GoF creational patterns.  
  Each card focuses on a common implementation pitfall or decision,
  then shows the idiomatic fix (Java/Kotlin-like pseudocode unless noted).

cards:
  - q: "Singleton — What’s the most memory-efficient *lazy* and *thread-safe* way to create a Singleton in Java?"
    a: |
      Use the **Initialization-on-Demand Holder** idiom; the JVM loads the inner class only on first call:
      ```java
      final class Config {
          private Config() {}
          private static class Holder { static final Config INSTANCE = new Config(); }
          public static Config get() { return Holder.INSTANCE; }
      }
      ```

  - q: "Singleton — Why is double-checked locking (DCL) broken pre-Java 5 and how was it fixed?"
    a: |
      Older JMM allowed re-ordering; a half-constructed instance could leak.  
      Java 5’s revised **happens-before** rules + declaring the field `volatile`
      make DCL correct:
      ```java
      private static volatile Config inst;
      if (inst == null) { synchronized (Config.class) { … } }
      ```

  - q: "Factory Method — How can you enforce that every concrete product shares a common *interface* but hides construction?"
    a: |
      1. Declare an **abstract creator** with an abstract `create()` returning the interface.  
      2. Subclasses override `create()` to build concrete products.  
      Client holds only the interface reference.

  - q: "Factory Method — Show a concise Kotlin version using *sealed* hierarchy."
    a: |
      ```kotlin
      sealed interface Shape
      data class Circle(val r: Double): Shape
      data class Square(val a: Double): Shape

      object ShapeFactory {
          fun create(type: String): Shape = when (type) {
              "circle" -> Circle(1.0)
              "square" -> Square(1.0)
              else     -> error("Unknown")
          }
      }
      ```

  - q: "Abstract Factory — When do you prefer it over multiple Factory Methods?"
    a: |
      When whole **families of related products** must stay compatible
      (e.g., Mac vs Windows UI widgets).  
      One object produces *all* variants, locking the family at compile time.

  - q: "Abstract Factory — Give a DI-friendly implementation tip."
    a: |
      Register each concrete factory as a **runtime bean** (Spring/Guice).  
      Clients depend on the abstract factory interface, letting DI swap families via config.

  - q: "Builder — How does the *progressive interface* variation prevent illegal call order?"
    a: |
      Each step returns a *narrower* interface exposing only the next valid methods:
      ```java
      interface StepCpu { StepRam cpu(String); }
      interface StepRam { StepDisk ram(int); }
      ...
      ```

  - q: "Builder — Why choose Builder over telescoping constructors for immutable objects?"
    a: |
      Avoids combinatorial constructor explosion, keeps **readability** and **named arguments**,
      yet builds an immutable result object in one go.

  - q: "Builder — Show a Python `@dataclass` + fluent builder hybrid."
    a: |
      ```python
      @dataclass(frozen=True)
      class Pizza: size:str; cheese:bool; pepperoni:bool
      class PizzaBuilder:
          def __init__(self): self.kw={}
          def size(self,s): self.kw['size']=s; return self
          def cheese(self,b=True): self.kw['cheese']=b; return self
          def pep(self,b=True): self.kw['pepperoni']=b; return self
          def build(self): return Pizza(**self.kw)
      ```

  - q: "Prototype — What makes deep cloning tricky in languages with shared references?"
    a: |
      Naïve `clone()` copies **object graph edges**, causing aliasing.  
      Use serialization, copy-constructors, or explicit clone logic per field.

  - q: "Prototype — Give a fast C++ example using the *virtual copy constructor* idiom."
    a: |
      ```cpp
      class Shape { public: virtual unique_ptr<Shape> clone() const = 0; };
      class Circle: public Shape {
          double r; … 
          unique_ptr<Shape> clone() const override { return make_unique<Circle>(*this); }
      };
      ```

  - q: "Builder vs Abstract Factory — Key difference in *product visibility*?"
    a: |
      **Builder** exposes the *incrementally built* single product.  
      **Abstract Factory** hides construction behind a producer that can supply many objects.

  - q: "Factory Method vs Simple Factory (Static Factory) — Which is more *open for extension*?"
    a: |
      Factory **Method** relies on inheritance; new products = new subclasses.  
      Simple static factory requires editing a `switch/if` — **violates OCP**.

  - q: "Singleton — How can dependency injection render Singleton unnecessary?"
    a: |
      DI container already manages **one shared instance** per scope.  
      Drop `getInstance()`; request the dependency and let the container scope it.

  - q: "Prototype — How do you keep clone costs low in a game entity pool?"
    a: |
      Pre-clone a **prototype pool** on level load; `spawn()` pops a ready object, tweaks state,
      then recycles to the pool on despawn.

  - q: "Builder — What’s the trade-off of using Lombok’s `@Builder` in Java?"
    a: |
      **Pros:** zero boilerplate, compile-time safety.  
      **Cons:** adds Lombok dependency & generated code magic, harder debugging if bytecode differs from source.
---
