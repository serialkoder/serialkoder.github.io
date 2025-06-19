---
layout: quiz
title: "Layered (N-Tier) Architecture Quiz"
tags: [software-architecture]
questions:
  - q: "Your team is building a 4-layer application with presentation (UI), service, domain, and persistence layers. A developer needs to write an SQL query to fetch user records. According to layered architecture best practices, in which layer should this database query code reside?"
    options:
      - "In the UI (presentation) layer."
      - "In the service (business logic) layer."
      - "In the persistence (data access) layer."
      - "In the domain (model) layer."
    answer: 2

  - q: "In a 3-tier web application (UI → service → persistence), the UI needs to display customer data stored in a database. Which approach follows proper layered communication rules?"
    options:
      - "The UI calls the service layer, which then calls the persistence layer to get the data."
      - "The UI directly queries the database for the data to improve performance."
      - "The persistence layer initiates a call to the UI to send the data."
      - "The UI and persistence layers are merged to avoid extra calls."
    answer: 0

  - q: "The service layer produces a complex `Order` domain object with many details, but the UI only needs to display a summary (order ID, date, total). How can you send only the required data to the UI without exposing the entire domain object?"
    options:
      - "Map the `Order` object to a simpler Data Transfer Object (DTO) that contains just the needed fields for the UI."
      - "Return the full `Order` domain object to the UI and let the UI ignore the unused fields."
      - "Have the UI directly query the database for only the fields it needs."
      - "Embed additional business logic in the UI to filter and construct the summary."
    answer: 0

  - q: "A small team built a 2-tier application where a desktop UI directly connects to a database. They consider refactoring to a 3-tier architecture by adding a separate service layer. What is a key benefit of introducing a dedicated service (business logic) layer between the UI and database?"
    options:
      - "It allows centralizing business rules on the server, so multiple clients can reuse the same logic."
      - "It makes the system infinitely faster by adding an extra network hop for every request."
      - "It removes the need for any validation in the UI layer."
      - "It simplifies the architecture by reducing the number of components to manage."
    answer: 0

  - q: "An application’s service layer calls the database for a list of reference data on every request, even though this data rarely changes. This causes unnecessary load and latency. What is a good solution to improve performance in this scenario while preserving the layered design?"
    options:
      - "Use caching for that reference data so subsequent requests don’t hit the database each time."
      - "Have the UI open its own database connection to fetch this data directly."
      - "Upgrade the database server hardware to handle the extra repeated load."
      - "Always fetch fresh data from the database to avoid any chance of stale information."
    answer: 0

  - q: "The domain layer of an application needs to retrieve data, but you want to keep it independent of any specific database technology. The team defines an interface `CustomerRepository` in the domain layer and lets the persistence layer implement it. Which design principle is being applied here?"
    options:
      - "Dependency Inversion Principle."
      - "Open/Closed Principle."
      - "Layer Bypass."
      - "Separation of Concerns."
    answer: 0

  - q: "A team wants to log every time a service layer method is invoked, without cluttering each method with logging calls. What is the best way to implement this cross-cutting concern in a layered architecture?"
    options:
      - "Use an aspect-oriented programming (AOP) aspect or middleware to automatically log entries/exits around service layer methods."
      - "Manually add `logger.log()` calls at the start and end of every service method."
      - "Let the database layer handle logging by recording every query execution."
      - "Only log actions in the UI layer instead of the service layer."
    answer: 0

  - q: "You are writing unit tests for a service layer function that computes an order total. This function calls a repository/DAO to get pricing data from a database. What is a recommended approach to test the service’s logic in isolation?"
    options:
      - "Replace the real repository with a mock or stub that returns expected data, so the service logic can be tested without a real database."
      - "Use a test database with test data and have the unit test call the actual repository and database."
      - "Skip testing this function because it depends on an external data source that is hard to control."
      - "Rewrite the service method to avoid calling the repository so it can be tested."
    answer: 0

  - q: "A web application validates user input in the browser (UI) via JavaScript before sending it to the server. According to best practices for layered security, what else should be done on the server side?"
    options:
      - "Validate and sanitize the input again in the service/domain layer before processing it, enforcing all critical rules on the server."
      - "Trust the client-side validation completely to avoid duplicate checks and reduce server workload."
      - "Rely only on database constraints to catch invalid data and skip validation in the service layer."
      - "Use HTTPS on the network so input validation in code is not necessary."
    answer: 0

  - q: "During a code review of a layered application, you find that some service layer methods construct SQL queries and directly access the database. What is the main issue with this design, and how should it be addressed?"
    options:
      - "The service layer is doing persistence logic, which violates layer separation; the fix is to move database calls into a dedicated persistence layer (e.g., use DAO/repository classes)."
      - "The service layer is following an anemic domain model, so the fix is to put more logic into the domain objects instead."
      - "There is no issue – combining business logic and database calls in one layer is a common efficiency technique."
      - "The architecture has too many layers – removing the persistence layer and letting the UI call the database would simplify the design."
    answer: 0

  - q: "A legacy application uses a traditional layered design where business logic classes directly call specific database APIs. The team is refactoring toward a hexagonal (ports-and-adapters) architecture. What is one key change in how dependencies are managed after this refactoring?"
    options:
      - "The core domain layer will define interfaces (ports) for data access, and the database implementation will become an outer adapter that depends on those interfaces."
      - "The UI layer will start calling the database directly, skipping the service layer to reduce latency."
      - "All layers will be merged into a single layer to eliminate the need for managing dependencies altogether."
      - "There will be no real change – hexagonal architecture is just a renaming of the same layered approach."
    answer: 0

  - q: "In a large application, a single `UserService` class has grown to handle everything – from validating user input and applying business rules to making database calls and sending emails – all in one place. Which anti-pattern does this scenario illustrate?"
    options:
      - "God Service (a single service taking on too many responsibilities)."
      - "Service-Oriented Architecture."
      - "Dependency Injection."
      - "Proper Layered Architecture."
    answer: 0

  - q: "In an e-commerce system, classes like `Product` and `Order` have only fields with getters/setters, and all business logic (pricing rules, stock checks, etc.) is implemented in service layer classes. What design issue does this describe?"
    options:
      - "Anemic Domain Model (domain objects are mere data holders with no business behavior)."
      - "Rich Domain Model (domain objects encapsulate significant business logic)."
      - "Layered Domain Architecture."
      - "Microservices Architecture."
    answer: 0

  - q: "A software project that started with a simple 3-layer architecture has grown to a 6-layer architecture (adding separate layers for things like validation and integration). After deployment, the team notices higher latency and more complexity in debugging issues. What is a likely downside of having too many layers (an overdone N-tier architecture)?"
    options:
      - "Each additional layer introduces call overhead and added complexity, which can slow down the system and make troubleshooting more difficult."
      - "More layers always improve performance because each layer can cache and optimize its own work."
      - "Adding layers removes the need for other optimizations like caching or connection pooling."
      - "Increasing the number of layers automatically makes the system more secure and easier to debug."
    answer: 0

  - q: "Your front-end client (UI) consumes a REST API provided by a back-end service. To ensure that changes in the back-end do not break the front-end’s expected data format or behavior, which testing approach is most appropriate?"
    options:
      - "Implement consumer-driven contract tests between the front-end and the back-end service to verify their integration assumptions."
      - "Rely only on unit tests of the back-end service’s internal methods for catching integration issues."
      - "Do manual end-to-end testing in a browser after each deployment to see if the UI still works."
      - "Write integration tests for the service’s database interactions instead of testing the UI-service interaction."
    answer: 0
---