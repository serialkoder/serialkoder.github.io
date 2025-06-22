---
layout: flashdeck
title: "Message-Bus Architecture Deck"
tags: [software-architecture]
intro: |
  Forty concise cards on the principles, patterns, and operational realities of
  message buses. Click a question to test yourself—click again to reveal the
  answer.
cards:
  - q: "What core problem does a message bus solve in a growing microservices system?"
    a: "It removes tight, brittle point-to-point links by introducing an intermediary (the bus), enabling asynchronous, resilient, many-to-many communication."

  - q: "Name the four primary logical parts of a message bus."
    a: |
       • Bus & channels (topics/queues)  
       • Message envelope  
       • Publishers (producers)  
       • Handlers (consumers/subscribers)

  - q: "What metadata is typically found in a message envelope?"
    a: |
       • Message type/name  
       • Unique ID  
       • Timestamp/origin  
       • Headers such as routing keys, correlation IDs, or schema version

  - q: "How does a command bus differ from an event bus in delivery semantics?"
    a: "Command bus delivers each command to exactly one handler (one-to-one); event bus fans out each event to zero, one, or many handlers (one-to-many)."

  - q: "Why is “no consumer” usually an error for commands but acceptable for events?"
    a: "Commands expect the action to be performed; events simply announce facts and impose no obligation to react."

  - q: "Define synchronous vs. asynchronous messaging in the context of a bus."
    a: |
       • **Synchronous** – sender blocks, waiting for handling/response via the bus.  
       • **Asynchronous** – sender publishes and continues; processing is decoupled in time.

  - q: "What is the most common delivery guarantee used in robust systems and why?"
    a: "At-least-once delivery—ensures messages aren’t lost, accepting that duplicates may occur and must be handled."

  - q: "Explain idempotency and its role in message processing."
    a: "An operation is idempotent if reapplying it has no additional effect; it makes consumers safe against duplicate deliveries in at-least-once systems."

  - q: "What purpose does a dead-letter queue (DLQ) serve?"
    a: "It isolates messages that repeatedly fail processing, preventing them from blocking the main flow and allowing manual inspection or repair."

  - q: "Give two strategies for preserving message ordering when it matters."
    a: |
       1) Guarantee FIFO per channel/partition and use a single consumer group.  
       2) Key related messages to the same partition or process sequentially in one consumer.

  - q: "What is the Saga pattern?"
    a: "A series of local transactions across services coordinated by messages, with compensating actions to maintain consistency without global ACID transactions."

  - q: "Contrast saga choreography with saga orchestration."
    a: |
       • **Choreography** – each service reacts to events and emits the next event; no central brain.  
       • **Orchestration** – a dedicated coordinator sends commands and awaits results, centralising the workflow.

  - q: "Why is the Transactional Outbox pattern used with sagas?"
    a: "To atomically persist both the local DB change and the outbound message, eliminating the “commit-then-crash before publish” window."

  - q: "What is schema coupling in an event-driven system?"
    a: "The implicit dependency producers and consumers share on message structure and meaning, even though they’re decoupled in space and time."

  - q: "List two safe, backward-compatible schema changes."
    a: |
       • Add a new optional field.  
       • Publish a new event version/channel while still emitting the old one during transition.

  - q: "How can a schema registry aid message evolution?"
    a: "It stores versions, enforces compatibility rules, and prevents producers from publishing breaking changes."

  - q: "Why are correlation IDs critical for observability in async flows?"
    a: "They let logs and tracing systems stitch together the causal chain of events across services and time."

  - q: "Define back-pressure and one broker-level mechanism to enforce it."
    a: "Controlling producer rate when consumers lag; e.g., RabbitMQ can stop acknowledging new publishes until queue depth drops."

  - q: "Give an application-level back-pressure strategy for non-critical data."
    a: "Drop or sample low-priority messages when lag or queue size exceeds a threshold."

  - q: "What hidden coupling pitfall can arise from event ordering assumptions?"
    a: "If Service B silently relies on Event X arriving before Event Y, a re-ordering bug can silently corrupt state."

  - q: "How can the message bus itself become a single point of failure, and one mitigation?"
    a: "All traffic flows through it; mitigate with clustered, highly-available broker deployments and fail-over configs."

  - q: "Briefly describe a lightweight in-process bus use case."
    a: "In a modular monolith, components publish domain events inside the same process (e.g., .NET MediatR) for clean layering without external infrastructure."

  - q: "What distinguishes a log-based bus like Kafka from a simple queue?"
    a: |
       • Durable, replayable, append-only topics  
       • Consumer-controlled offsets  
       • High throughput  
       • Multiple independent consumer groups

  - q: "Mention one advantage and one disadvantage of an Enterprise Service Bus (ESB)."
    a: |
       • **Advantage:** rich routing, transformation, orchestration in one place.  
       • **Disadvantage:** central complexity and potential performance bottleneck.

  - q: "When might exactly-once semantics be worth the extra complexity?"
    a: "Financial or inventory operations where duplicate effects are unacceptable and cannot be made idempotent downstream."

  - q: "What is exponential backoff in retry logic?"
    a: "Increasing the wait time between successive retries to reduce load on a failing service."

  - q: "Name two metrics that indicate consumer lag or bottleneck on a bus."
    a: |
       • Queue/topic length  
       • Consumer-group offset lag (messages behind)

  - q: "Why should large binary payloads generally not be sent through the bus?"
    a: "They bloat broker storage, increase network overhead, and slow consumers; better to send a reference (URL or object ID)."

  - q: "Give an example of a fire-and-forget use case ideal for an event bus."
    a: "Publishing a “UserRegistered” event that triggers welcome-email and analytics services independently."

  - q: "How does a request-reply pattern use a message bus synchronously?"
    a: "Sender publishes a request message and blocks, waiting for a correlated response message before continuing."

  - q: "What business rule signals an architecture might need to switch from direct APIs to a bus?"
    a: "When cascading failures or slowdowns in one service frequently propagate to others, causing widespread outages."

  - q: "In terms of coupling, which is looser: event bus or command bus, and why?"
    a: "Event bus—publishers don’t assume any listener exists; commands assume one handler must exist to fulfil intent."

  - q: "Explain the term fan-out delivery."
    a: "The broker copies a published event to every subscribed consumer, enabling one-to-many communication."

  - q: "What does temporal decoupling mean?"
    a: "Producers and consumers don’t need to be online at the same time; the bus buffers messages until consumption."

  - q: "Why are compensating actions required in sagas?"
    a: "Because each local transaction may succeed independently; a later failure must be undone to maintain overall consistency."

  - q: "What is the primary trade-off when enforcing global message ordering?"
    a: "Lower throughput and parallelism, because messages must be processed sequentially or pinned to a single consumer."

  - q: "State the “dumb pipe, smart endpoints” principle in event-driven systems."
    a: "Keep the bus simple—just transport messages—and push business logic into services, avoiding ESB-style over-centralisation."

  - q: "How can consumer-driven contracts reduce integration breakage?"
    a: "Consumers publish their expected schemas; producers run tests to ensure any change still meets those expectations."

  - q: "What operational tool alerts engineers to poisoned messages stuck in DLQs?"
    a: "Monitoring DLQ size and alerting when the message count exceeds a threshold."

  - q: "Summarise the key advantage of adopting a message bus early in scaling microservices."
    a: "It establishes a uniform, resilient communication backbone, preventing ad-hoc sprawl and easing future growth, observability, and fault tolerance."
---
