---
layout: flashdeck
title: "Message Bus & Event-Driven Architecture"
intro: |
  A comprehensive deck covering core message bus concepts, delivery guarantees, reliability patterns,
  distributed transactions, schema versioning, observability, pitfalls, and real-world implementations.
cards:
  - q: "Why does a growing microservices system often abandon direct API calls in favor of a message bus?"
    a: |
      Direct synchronous calls create tight coupling, cascading failures, and “integration spider-webs.”
      A message bus buffers work, decouples producers/consumers in time and space, and simplifies many-to-many interactions.

  - q: "What are the four fundamental building blocks of a message bus?"
    a: |
      • **Bus & channels** (topics/queues)  
      • **Message envelopes** (payload + metadata)  
      • **Publishers** (producers)  
      • **Handlers** (consumers/subscribers)

  - q: "What key metadata often lives in a message envelope?"
    a: |
      Unique ID, type/name, timestamp/origin, routing key, correlation ID, and schema/version headers.

  - q: "One-to-one or one-to-many: which bus type is which?"
    a: |
      • **Command bus** ⇒ one-to-one (single handler)  
      • **Event bus** ⇒ one-to-many (fan-out)

  - q: "What happens if no handler exists for a command?"
    a: |
      It’s typically considered an error—the sender expected an action to occur.

  - q: "What happens if no handler exists for an event?"
    a: |
      Nothing; the publisher is unaffected. Events are notifications of fact, not requests.

  - q: "Which bus type generally carries stronger logical coupling and why?"
    a: |
      **Command bus**, because the sender assumes a specific responsibility will be fulfilled.

  - q: "What primary benefit does asynchronous messaging provide?"
    a: |
      The producer proceeds immediately; failures or slowness downstream don’t block it.

  - q: "Name two scenarios where synchronous messaging over a bus is useful."
    a: |
      1. In-process mediator patterns (method-call replacement)  
      2. Request-reply workflows that need an immediate answer

  - q: "Define at-most-once delivery."
    a: |
      A message is delivered 0 or 1 times—no retries; possible loss.

  - q: "Define at-least-once delivery."
    a: |
      A message is delivered ≥ 1 times until acknowledged, risking duplicates.

  - q: "Why is true exactly-once delivery difficult, and how is it usually approximated?"
    a: |
      Distributed duplicates/ack gaps are hard to eliminate; systems use at-least-once + deduplication or
      idempotent processing to achieve “effectively once.”

  - q: "How do idempotent consumers mitigate at-least-once duplicates?"
    a: |
      They detect duplicate message IDs or design operations so re-execution has no additional effect.

  - q: "What is a dead-letter queue (DLQ)?"
    a: |
      A quarantine channel where messages go after repeated processing failures, for manual inspection or special handling.

  - q: "Give two reasons ordering may break even on an ordered queue."
    a: |
      1. Multiple parallel consumers  
      2. Sharding/partitioning of topics

  - q: "Why employ exponential backoff on retries?"
    a: |
      To avoid hammering a struggling service and worsening the outage.

  - q: "What problem do sagas address?"
    a: |
      Maintaining consistency across multiple services without two-phase commits.

  - q: "Contrast saga choreography with saga orchestration."
    a: |
      • **Choreography:** events trigger each step, no central controller  
      • **Orchestration:** a coordinator issues commands and decides on compensations

  - q: "What is the Transactional Outbox pattern used for?"
    a: |
      Atomically persisting both DB changes and the event that announces them, preventing “write-to-DB-but-lost-event” gaps.

  - q: "Why is a message schema a 'public API'?"
    a: |
      Multiple independent services rely on its structure and semantics.

  - q: "What is the safest first choice when evolving a message schema?"
    a: |
      Make backward-compatible additions (e.g., add optional fields).

  - q: "How does a schema registry help?"
    a: |
      Enforces compatibility rules and tracks versions so producers/consumers can’t publish or consume unknown/breaking schemas.

  - q: "Name three bus-level metrics worth monitoring."
    a: |
      Queue/topic length, consumer lag, throughput (msgs/sec or bytes/sec).

  - q: "What role do correlation IDs play in debugging?"
    a: |
      They stitch together logs/traces across asynchronous hops to rebuild end-to-end flow.

  - q: "Define back-pressure."
    a: |
      Mechanisms that slow or block producers when consumers fall behind, preventing unbounded queue growth or OOM failures.

  - q: "What is hidden coupling in an event-driven system?"
    a: |
      Undocumented dependencies on event order, timing, or schema that break when any publisher or consumer changes.

  - q: "Why can the message bus itself become a single point of failure?"
    a: |
      All traffic flows through it; if the broker cluster is down, inter-service communication halts.

  - q: "How does complexity creep manifest in event-driven designs?"
    a: |
      Circular dependencies, hard-to-trace workflows, and difficulty predicting the impact of a change.

  - q: "Give one key trait of a lightweight in-process bus (e.g., MediatR/EventEmitter)."
    a: |
      Runs entirely in memory inside one process—great for modular monolith decoupling, not cross-service.

  - q: "Why is a Kafka-style log considered an 'event store'?"
    a: |
      It durably retains the ordered stream so consumers can replay history or join late.

  - q: "What integration tasks might a traditional Enterprise Service Bus (ESB) handle beyond routing?"
    a: |
      Message transformation, protocol bridging, policy enforcement, and workflow orchestration.

  - q: "Command vs. Event—Which implies required business action?"
    a: |
      Command.

  - q: "Command vs. Event—Which is safer to publish without expecting responses?"
    a: |
      Event.

  - q: "At-least-once vs. At-most-once—Which demands idempotency?"
    a: |
      At-least-once (due to duplicate risk).

  - q: "Ordered processing—Which two common strategies enforce it?"
    a: |
      1. Single consumer per queue  
      2. Partition-by-key with per-partition FIFO

  - q: "DLQ threshold—Why keep it low?"
    a: |
      A spike indicates systemic failure; silent buildup hides critical issues.

  - q: "Saga orchestration trade-off?"
    a: |
      Central logic visibility vs. a new single point of control.

  - q: "Schema change—Add field vs. rename field: which one breaks consumers?"
    a: |
      Rename (non-backward compatible).

  - q: "Back-pressure in pull vs. push systems—Who controls the pace?"
    a: |
      • Pull: consumer  
      • Push: broker (may block publishers)

  - q: "List three elements you’d log for robust traceability of each message."
    a: |
      1. Correlation ID  
      2. Message type/version  
      3. Processing outcome (success/error + duration)

  - q: "If a high-priority queue starts lagging, name two immediate mitigation steps."
    a: |
      1. Scale consumer instances  
      2. Throttle lower-priority producers

  - q: "True or False: Exactly-once delivery rules out the need for idempotency."
    a: |
      False—defensive idempotency still protects against logic or configuration errors.

  - q: "In an event bus, why is 'publish-subscribe' called loosely coupled yet still risky?"
    a: |
      Publishers don’t know receivers, but all share implicit schema/semantic contracts that can break silently.

  - q: "What does 'D.R.I.V.E.' remind you to design for in a message bus?"
    a: |
      **D**ecoupling, **R**eliability, **I**dempotency, **V**ersioning, **E**xposure (observability).

  - q: "Summarize the golden rule for message schemas in one sentence."
    a: |
      “Change slowly, version explicitly, and stay backward-compatible whenever humanly possible.”
---
