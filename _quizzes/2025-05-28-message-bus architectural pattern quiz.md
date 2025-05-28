---
layout: quiz
title: "Message-Bus Architectural Pattern Quiz"
questions:
  - q: "1. Service A sends a message that exactly one instance of Service B should process, while Service C emits an event that multiple other services should react to. Which messaging pattern is appropriate for each scenario?"
    options:
      - "A) Use publish-subscribe (topic) for both to keep the design uniform."
      - "B) Use point-to-point (queue) for both to ensure reliability."
      - "C) Service A → B should use a command (point-to-point), and Service C’s event should use pub-sub (broadcast to subscribers)."
      - "D) Service A → B should use an event bus, and Service C’s events should be direct commands to each consumer."
    answer: 2

  - q: "2. A payment service uses an *at-least-once* delivery message bus. Occasionally a payment message is processed twice, causing double charges. What is the best way to prevent double-processing in this scenario?"
    options:
      - "A) Switch to *at-most-once* delivery so duplicates can’t happen (accepting some messages might be lost)."
      - "B) Implement idempotent processing in the payment handler so repeated messages have no side effects on second receipt."
      - "C) Use a bigger message broker cluster to handle duplicate messages more quickly."
      - "D) Manually delete duplicate messages from the queue whenever they are detected."
    answer: 1

  - q: "3. An analytics service processes user events from a message bus with multiple partitions. Events from the same user sometimes process out of order when consumed in parallel. How can they ensure order for events belonging to the same user?"
    options:
      - "A) Use a single-threaded consumer for all events to maintain a global order."
      - "B) Include timestamps and have consumers sort events for each user after receiving them."
      - "C) Use a partitioning key based on the user’s ID so all of that user’s events go to the same partition (preserving order)."
      - "D) Increase the number of partitions to spread load, which will implicitly fix the ordering issue."
    answer: 2

  - q: "4. A distributed application uses an event bus, and developers struggle to trace a single request’s events as they propagate through multiple services. What practice would best improve observability?"
    options:
      - "A) Include a unique correlation ID with each message that all services pass along through the system."
      - "B) Use a faster message bus to reduce the time events spend in transit."
      - "C) Have all services write events to the same log file to correlate them by timestamp."
      - "D) Limit asynchronous communication to one service at a time to make tracing simpler."
    answer: 0

  - q: "5. One message in a queue keeps failing to process and is delaying subsequent messages. What mechanism allows the system to sideline this “poison” message after repeated failures?"
    options:
      - "A) Automatically increase the priority of other messages to bypass it."
      - "B) Pause all processing until an operator manually removes the bad message."
      - "C) Send the message back to the front of the queue to retry it indefinitely."
      - "D) Move it to a Dead Letter Queue after exceeding a retry limit."
    answer: 3

  - q: "6. A payment, inventory, and shipping service form a multi-step saga using event *choreography*. Which challenge are they likely to face?"
    options:
      - "A) Reduced decoupling, as services become tightly integrated through a central controller."
      - "B) Slower overall performance, because events introduce asynchronous delays at each step."
      - "C) Difficulty tracing and coordinating the saga’s progress, since there’s no central orchestrator."
      - "D) Inability to perform compensating transactions when a step fails."
    answer: 2

  - q: "7. A team adds a new field to a widely used event message type, but some consumers aren’t updated yet. What is the safest approach?"
    options:
      - "A) Immediately upgrade all consumer services before publishing any events with the new field."
      - "B) Send the new field as a separate message on a different topic."
      - "C) Embed a version number in each message and have consumers reject unsupported versions."
      - "D) Design the change to be backward-compatible (e.g., optional field with default) so older consumers can ignore it."
    answer: 3

  - q: "8. A logging service publishes thousands of small messages per second and hits throughput limits due to per-message overhead. How could the team improve throughput without losing data?"
    options:
      - "A) Switch to synchronous HTTP calls instead of the message bus."
      - "B) Batch multiple log entries into a single message, or send messages in batches."
      - "C) Throttle the log generation rate during peak times."
      - "D) Increase the message retention period so the bus can buffer more data."
    answer: 1

  - q: "9. After a downstream service goes down, a client retries failed messages in a tight loop, causing a flood of retry attempts. What strategy best mitigates this retry storm?"
    options:
      - "A) Increase the priority of the failed messages so they’re retried first."
      - "B) Switch to at-most-once delivery to avoid retries."
      - "C) Implement exponential back-off for retries, spacing out attempts."
      - "D) Spin up additional consumer instances to handle the failing messages in parallel."
    answer: 2

  - q: "10. An enterprise uses a single message topic where every service publishes and subscribes to all events, with complex filtering in the bus. What is a likely problem with this “one bus for everything” approach?"
    options:
      - "A) It becomes a centralized bottleneck and single point of failure, known as the “God Bus” anti-pattern."
      - "B) It significantly simplifies debugging since all events go through one central topic."
      - "C) It ensures all services stay perfectly in sync by sharing a common channel."
      - "D) It eliminates the need for careful schema versioning between services."
    answer: 0

  - q: "11. A service must save a new order to its DB and publish an *OrderCreated* event exactly once. What pattern prevents loss or duplication?"
    options:
      - "A) Wrap the DB save and publish in a distributed XA transaction."
      - "B) Switch to at-most-once delivery so events are either sent or dropped."
      - "C) Use the Outbox pattern: store the event with the DB commit and publish it reliably."
      - "D) Continuously retry sending until the bus acknowledges, no matter how long it takes."
    answer: 2

  - q: "12. A generic messaging interface hides broker details (RabbitMQ, Kafka), but broker-specific quirks still leak into code. What does this exemplify?"
    options:
      - "A) A well-designed abstraction; handling quirks is normal."
      - "B) The Saga pattern in practice."
      - "C) Perfect encapsulation—differences are fully hidden."
      - "D) A leaky abstraction—the unified interface can’t fully hide each broker’s behaviour."
    answer: 3

  - q: "13. Producers send messages faster than consumers can handle, causing growing queues. Which design approach prevents overwhelming the system?"
    options:
      - "A) Use a protocol that drops messages when the queue reaches a limit."
      - "B) Implement back-pressure so producers slow down when consumers lag."
      - "C) Increase the queue capacity to an unbounded size."
      - "D) Deploy producers and consumers on the same machine to remove network latency."
    answer: 1

  - q: "14. Another team uses a dedicated Saga *orchestrator* that sends commands via the bus to coordinate each step. What is a potential drawback?"
    options:
      - "A) Compensating actions cannot be handled under a central orchestrator."
      - "B) Orchestration forces every step to be synchronous."
      - "C) The orchestrator can become a single point of failure and limit scalability."
      - "D) All services become fully coupled, since the orchestrator must call each API."
    answer: 2

  - q: "15. Why are sagas often preferred over two-phase commit (XA) for cross-service consistency in microservices?"
    options:
      - "A) Sagas guarantee ACID-style atomic consistency with less complexity."
      - "B) Two-phase commit isn’t supported by most message buses."
      - "C) Sagas require no special error handling."
      - "D) Sagas avoid cross-service locks by using local transactions plus compensations, giving scalability and fault-tolerance."
    answer: 3
---
