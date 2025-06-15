---
layout: quiz
title: "Event-Driven Architecture & Event Bus Quiz"
tags: [software-architecture]
questions:
  - q: "In a microservices system, Service A triggers an event internally for its own workflow, while Service B emits an event to notify other services of a data change. What types of events are these respectively?"
    options:
      - "Both are integration events"
      - "The first is a domain event, the second is an integration event"
      - "The first is an integration event, the second is a domain event"
      - "Both are domain events"
    answer: 1

  - q: "A UserRegistered event needs to be processed by three different microservices (Email, Analytics, and Marketing). Which messaging model ensures all three services receive the event?"
    options:
      - "Point-to-point queue with a single consumer group containing all three services"
      - "Publish/Subscribe (topic) – each service subscribes and gets its own copy of the event"
      - "Round-robin delivery to one service at a time"
      - "Direct REST calls to each service sequentially"
    answer: 1

  - q: "The Payment service processes PaymentReceived events. Due to at-least-once delivery, the service occasionally receives duplicate events. How can the service avoid double-charging a customer from duplicate messages?"
    options:
      - "Implement idempotent processing so that repeating the event has no side effects on the payment"
      - "Switch to at-most-once delivery to never get duplicates (but risk missing events)"
      - "Crash the service on a duplicate to prevent double processing"
      - "Use a faster network to ensure each event is only delivered once"
    answer: 0

  - q: "A consumer keeps failing to process a particular message due to invalid data, and it keeps retrying, blocking the queue. What is the best way to handle this “poison” message scenario?"
    options:
      - "Pause all consumers until the upstream data is fixed manually"
      - "Use a dead-letter queue to capture the message after a few failed attempts, and apply exponential back-off on retry attempts"
      - "Continue retrying the message in a tight loop until it processes successfully"
      - "Acknowledge and drop the message immediately to unblock the queue (losing the message)"
    answer: 1

  - q: "A microservice publishes an event for every minor data change (e.g., every item in an order of 100 items results in 100 events). This floods the event bus and consumers. What anti-pattern does this illustrate?"
    options:
      - "Event sourcing – capturing every state change as an event (intended behavior)"
      - "Back-pressure – consumers signaling producers to slow down event publishing"
      - "A chatty event storm – too many fine-grained events overwhelming the system"
      - "Saga orchestration – splitting a workflow into many steps"
    answer: 2

  - q: "You have an event stream partitioned by customer ID and your Order service is scaled to multiple instances (in the same consumer group). All instances consume in parallel, but you need events for the same customer to be processed in order. How can you achieve this?"
    options:
      - "Randomly assign events to consumers and rely on each to handle ordering independently"
      - "Disable parallel consumption by using only one consumer thread for all events"
      - "Use the customer ID as a partition key so all events for a customer go to the same partition (handled by one consumer instance)"
      - "Use a separate consumer group for each instance to ensure they don’t share work"
    answer: 2

  - q: "An order placement saga involves multiple services (Order, Payment, Inventory). The team can either implement a central Saga Orchestrator service to call each step or use choreography where each service listens and reacts to events from the others. Which statement correctly compares these approaches?"
    options:
      - "Choreography cannot handle compensating transactions, whereas orchestration can"
      - "Saga orchestration uses a central controller to direct each step, whereas choreography has no central controller – each service reacts to others' events"
      - "Orchestration always leads to tighter coupling than choreography"
      - "Orchestration makes the flow completely asynchronous, while choreography requires synchronous calls between services"
    answer: 1

  - q: "A service updates a database and then publishes an event. Sometimes the service crashes after the DB transaction commits but before the event is sent, causing missing events. What pattern can ensure the event still gets published reliably even if the service crashes?"
    options:
      - "Use a two-phase commit (distributed transaction) between the database and the message broker"
      - "The Outbox pattern – write the event to a local outbox table in the same DB transaction, then publish it asynchronously (e.g., via a poller or CDC)"
      - "Increase the message broker's durability and hope it catches the event before a crash"
      - "Publish the event first, then commit the database transaction if the publish succeeds"
    answer: 1

  - q: "Your team needs to add a new field to an event’s schema that many services consume. To avoid breaking consumers, what should you do before deploying this change?"
    options:
      - "Embed the field in a JSON string to avoid schema version issues"
      - "Change the event schema in place and require all consumer teams to update their code immediately"
      - "Make a backward-compatible change (e.g., add the new field as optional) and use schema versioning or contract tests to ensure consumers remain unaffected"
      - "Nothing – if consumers break, they will fix it; assume eventual consistency will handle it"
    answer: 2

  - q: "In a streaming system, you notice the consumer lag (backlog of unprocessed messages) for a consumer group is steadily increasing. What does this indicate, and how can you respond?"
    options:
      - "Nothing significant – some lag is always expected, ignore it unless the system crashes"
      - "The consumers are overwhelmed (consumer lag is growing), indicating back-pressure. You should scale out consumers or throttle the producer to reduce the backlog"
      - "The message broker is discarding messages at the end of the queue; increase the retention period"
      - "The producer is too slow, causing lag; increase the producer throughput"
    answer: 1

  - q: "Service A publishes an OrderCreated event containing the entire order object (all item details, user info, etc.). Service B uses this event data directly without calling A. Later, Service A changes its internal data format, and Service B’s processing breaks. What EDA anti-pattern does this scenario illustrate?"
    options:
      - "Using event sourcing for integration"
      - "Publishing \"fat\" events that create hidden coupling between services"
      - "Idempotent event handling"
      - "Proper event-driven design – services are fully decoupled by events"
    answer: 1

  - q: "A financial system requires that each event is processed exactly once (no duplicates, no omissions). The event bus only guarantees at-least-once delivery. How can you achieve effectively exactly-once processing in this design?"
    options:
      - "Turn off retries (at-most-once delivery) to avoid duplicates, accepting potential message loss"
      - "Design for at-least-once by making consumers idempotent and use a transactional outbox to ensure events aren't lost – together this yields an exactly-once outcome"
      - "There is no need – at-least-once already means exactly-once if the code is fast enough"
      - "Rely on the message broker's built-in exactly-once guarantee for all consumers (assume it exists by default)"
    answer: 1

  - q: "Service X needs data from Service Y. The team designs an Event Request-Response: X publishes a RequestData event and then waits for Y to publish a DataResponse event. Why is this usage of the event bus considered an anti-pattern?"
    options:
      - "It turns asynchronous messaging into a pseudo-RPC, introducing tight coupling and timing dependency between services"
      - "It guarantees ordering of requests and responses across services"
      - "It simplifies the architecture by using events for all communication, including queries"
      - "It ensures loose coupling since services communicate only through the event bus"
    answer: 0

  - q: "To maintain consistency, a team considers using a distributed two-phase commit (2PC) across the database and the message broker so either both the DB update and event publish succeed or fail together. What is a major drawback of 2PC in a microservices context, and what is a preferred alternative?"
    options:
      - "2PC is heavy and can block multiple services (reducing availability); instead, use the outbox pattern with local transactions and eventual consistency"
      - "2PC doesn’t actually ensure atomicity across systems; using a single monolithic database is the only solution"
      - "There is no drawback — 2PC is recommended for microservices as the best way to ensure consistency"
      - "2PC is too fast for microservices; a better approach is to deliberately delay events to batch them"
    answer: 0

  - q: "In a saga spanning multiple services, suppose several steps succeeded but one of the later steps failed. How is this partial failure usually handled in an event-driven saga to maintain overall consistency?"
    options:
      - "By triggering compensating transactions (events or actions that undo/revert the effects of the previous steps in the saga)"
      - "By aborting the saga and doing nothing, leaving the systems in a partially updated state"
      - "By automatically rolling back all previously completed service calls via the event bus"
      - "By locking all services involved until an operator manually fixes the inconsistency"
    answer: 0
---
