---

layout: quiz
title: "Behavioral Design Patterns Quiz Practical"
tags: [design-patterns]
questions:
  - q: "A navigation app allows users to choose different route calculation methods (fastest, shortest, scenic) at runtime without altering the app’s core logic. Which design pattern does this exemplify?"
    options:
      - "Strategy"
      - "Observer"
      - "State"
      - "Template Method"
    answer: 0

  - q: "A news agency publishes updates that are delivered to multiple news outlets as soon as a story breaks. Each outlet that registered with the agency automatically receives the update. Which design pattern is illustrated by this system?"
    options:
      - "Strategy"
      - "Command"
      - "Observer"
      - "Mediator"
    answer: 2

  - q: "A smart home remote control is configured so each button press triggers a specific action (turning on lights, locking doors, etc.). The remote queues these actions and can even undo the last action if needed. Which design pattern is being used for the remote’s design?"
    options:
      - "Mediator"
      - "Command"
      - "Chain of Responsibility"
      - "Strategy"
    answer: 1

  - q: "A music playlist offers \"next\" and \"previous\" buttons to play songs sequentially without exposing how the playlist is stored. You can traverse all songs one by one regardless of the playlist’s internal structure. Which design pattern is this?"
    options:
      - "Memento"
      - "Strategy"
      - "Observer"
      - "Iterator"
    answer: 3

  - q: "At a busy airport, all pilots communicate with a single control tower rather than contacting other planes directly. The tower coordinates takeoffs and landings by relaying messages between airplanes. Which design pattern does this arrangement follow?"
    options:
      - "Mediator"
      - "Observer"
      - "Chain of Responsibility"
      - "Template Method"
    answer: 0

  - q: "A graphics editor lets users undo an editing action to revert the image to an earlier state. The application achieves this by saving a snapshot of the entire image data whenever a change is made, so it can restore that snapshot on undo. Which design pattern is at work here?"
    options:
      - "Command"
      - "Memento"
      - "State"
      - "Mediator"
    answer: 1

  - q: "A vending machine behaves differently based on its current mode: if no coin is inserted, pressing a product button does nothing; if a coin is inserted, pressing a button dispenses an item and changes the machine to a no-coin mode. Which design pattern does this dynamic behavior represent?"
    options:
      - "Observer"
      - "Strategy"
      - "Memento"
      - "State"
    answer: 3

  - q: "In a factory, a maintenance robot services various machines (robots, conveyor belts, etc.). When it services a machine, it performs diagnostics specific to that machine’s type without modifying the machine’s class code. The robot’s software contains separate routines for each machine type. Which design pattern does this scenario exemplify?"
    options:
      - "Strategy"
      - "Command"
      - "Visitor"
      - "Template Method"
    answer: 2

  - q: "A software component translates high-level instructions into actions. For example, given an input formula \"5 3 + 2 *\", the component parses it according to a defined grammar and computes a result. Classes in the system represent grammar rules (numbers, operators) and are used to evaluate the expression. Which design pattern is being used?"
    options:
      - "Command"
      - "Interpreter"
      - "Visitor"
      - "Strategy"
    answer: 1

  - q: "A customer support system routes help requests through a hierarchy. A level-1 support rep handles a request first; if they can’t resolve it, the issue is passed to level-2 support, and if still unresolved, it goes to a manager. This continues until someone handles the request. Which design pattern does this describe?"
    options:
      - "Chain of Responsibility"
      - "Mediator"
      - "Observer"
      - "Command"
    answer: 0

  - q: "A beverage vending machine follows a fixed procedure to make drinks: boil water, add main ingredient, pour into cup, add condiments. Different drinks (tea, coffee) implement the \"add main ingredient\" step differently but follow the same overall process. Which design pattern is used here?"
    options:
      - "Strategy"
      - "Factory Method"
      - "Observer"
      - "Template Method"
    answer: 3

  - q: "In a video game, when the player character picks up an “invincibility” power-up, the character temporarily behaves differently (e.g., taking no damage from enemies). After a short time, the character returns to normal behavior. Which design pattern is exemplified by the game character’s changing behavior?"
    options:
      - "Strategy"
      - "Observer"
      - "State"
      - "Memento"
    answer: 2

  - q: "A data analysis framework defines a process with steps: load data, analyze data, generate report. The framework runs these steps in order but allows different subclasses to override how each step is performed for different data sources. The overall sequence stays the same. Which design pattern is this design using?"
    options:
      - "Strategy"
      - "Template Method"
      - "Interpreter"
      - "State"
    answer: 1

  - q: "A text editor records every editing command (typing, formatting, etc.) as an object so it can be executed or reversed. The editor keeps a history stack of these command objects to support undo and redo operations. Which design pattern is implemented in this undo system?"
    options:
      - "Memento"
      - "Mediator"
      - "State"
      - "Command"
    answer: 3

  - q: "In a GUI dialog with many elements (text fields, checkboxes, buttons), changing one element needs to update others. Instead of each element updating others directly, they all report changes to a central dialog manager object, which then instructs specific elements to update. Which design pattern is used in this interaction?"
    options:
      - "Observer"
      - "Chain of Responsibility"
      - "Mediator"
      - "Command"
    answer: 2

  - q: "An application has a chain of logging handlers: first a console logger, then a file logger, then an email alert logger. When a log message is generated, the console logger will handle it if possible; if not, it passes the message to the file logger, which does the same before passing to the email logger. Only one logger will ultimately handle the message. Which design pattern is this?"
    options:
      - "Observer"
      - "Chain of Responsibility"
      - "Decorator"
      - "Mediator"
    answer: 1

  - q: "A stock trading platform allows users to subscribe to updates for certain stocks. When the price of a stock changes, only the users who subscribed to that stock are immediately notified of the new price. Which design pattern is at work here?"
    options:
      - "Mediator"
      - "Strategy"
      - "Command"
      - "Observer"
    answer: 3

  - q: "An online store offers multiple payment options at checkout (credit card, PayPal, cryptocurrency). The checkout system uses the same interface to process the payment, and it executes the chosen payment method’s process without altering the rest of the checkout code. Which design pattern does this scenario describe?"
    options:
      - "Strategy"
      - "Template Method"
      - "Chain of Responsibility"
      - "Factory Method"
    answer: 0

  - q: "A video game has a “save game” feature that captures the entire game state (player position, score, inventory, etc.) at a point in time. The saved state can be reloaded later to restore the game exactly to that point. Which design pattern is being used for the save/load system?"
    options:
      - "State"
      - "Memento"
      - "Prototype"
      - "Command"
    answer: 1

  - q: "An e-commerce shopping cart system needs to calculate shipping, tax, and discounts for items of various categories (electronics, groceries, clothing). Each operation (shipping calculation, tax computation, discount application) handles item categories differently. The system implements these operations as separate objects that can be applied to all items, allowing new operations to be added without modifying the item classes. Which design pattern is this?"
    options:
      - "Strategy"
      - "Chain of Responsibility"
      - "Visitor"
      - "Decorator"
    answer: 2
---
