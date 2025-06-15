---
layout: quiz
title: "Message-Queue Delivery Semantics & Failure Handling Quiz"
tags: [software-architecture]
questions:
  - q: "EASY: What does the 'at-least-once' delivery guarantee imply for message delivery?"
    options:
      - "It ensures each message is delivered at most one time or not at all."
      - "It ensures each message is delivered exactly one time without duplication or loss."
      - "It ensures no message is lost, though a message may be delivered more than once."
      - "It provides no guarantee; messages might be lost or duplicated."
    answer: 2

  - q: "EASY: What is the purpose of an idempotency key (unique message ID) in a messaging system?"
    options:
      - "To detect and avoid processing duplicate messages."
      - "To ensure messages are delivered in a specific order."
      - "To count how many times a message has been delivered."
      - "To increase the speed of message delivery."
    answer: 0

  - q: "EASY: What is a Dead-Letter Queue (DLQ) used for in message queuing systems?"
    options:
      - "To temporarily hold messages before their initial delivery attempt."
      - "To isolate messages that repeatedly fail processing (poison messages) for later review."
      - "To store higher priority messages for faster handling."
      - "To automatically replicate messages to backup queues."
    answer: 1

  - q: "EASY: Why are exponential backoff and jitter used when retrying message processing failures?"
    options:
      - "To retry failures as quickly as possible without delay."
      - "To ensure all failing messages are retried at the same fixed interval."
      - "To decrease the wait time after each consecutive failure."
      - "To gradually increase delay and add randomness to avoid retry collisions."
    answer: 3

  - q: "EASY: In a message queue with acknowledgments, what happens if a consumer fails to acknowledge a message within the visibility timeout?"
    options:
      - "It is removed from the queue and lost."
      - "It moves immediately to a dead-letter queue."
      - "It becomes visible again on the queue for another consumer."
      - "It gets automatically marked as processed by the broker."
    answer: 2

  - q: "MEDIUM: What is a trade-off of using multiple partitions for a message queue instead of a single FIFO queue?"
    options:
      - "Losing the guarantee of a single global ordering of messages."
      - "Significantly reducing the maximum throughput of the system."
      - "Preventing any ordering of messages even within a partition."
      - "Removing any delivery guarantee for messages."
    answer: 0

  - q: "MEDIUM: What happens to a message when it reaches its TTL (time-to-live) in a message queue?"
    options:
      - "It stays in the queue until a consumer finally picks it up."
      - "It expires and is removed from the queue (possibly sent to a dead-letter queue)."
      - "It triggers an immediate delivery attempt to a consumer, then resets the TTL."
      - "It moves to the front of the queue for priority processing."
    answer: 1

  - q: "MEDIUM: Which statement is true regarding duplicate message detection in messaging systems?"
    options:
      - "Brokers always automatically drop any duplicate message deliveries."
      - "Duplicate messages cannot be detected by any system once sent."
      - "Some brokers support duplicate detection, but consumers may also need idempotency to handle duplicates."
      - "Only consumers can eliminate duplicates; brokers do not offer deduplication features."
    answer: 2

  - q: "MEDIUM: In message queuing, what is commonly referred to as a 'poison message'?"
    options:
      - "A message containing malicious content used to attack consumer systems."
      - "A message that is too large and exceeds the queue's size limit."
      - "A message with invalid formatting that gets deleted on the first failure."
      - "A message that consistently fails processing and ends up in a dead-letter queue."
    answer: 3

  - q: "MEDIUM: In a transactional messaging setup, what problem does the 'Outbox' pattern address?"
    options:
      - "It ensures that a database transaction and a message publish either both succeed or both fail together."
      - "It bundles multiple messages together to send in one batch for efficiency."
      - "It orders messages from multiple producers into a single sequence."
      - "It allows consumers to process messages without acknowledging them."
    answer: 0

  - q: "MEDIUM: In RabbitMQ, what is a Dead Letter Exchange (DLX)?"
    options:
      - "A built-in exchange that automatically broadcasts every message to all queues."
      - "A mechanism for encrypting messages in RabbitMQ."
      - "An exchange that routes messages to a dead-letter queue when they are rejected or expire."
      - "A special queue that stores all unacknowledged messages by default."
    answer: 2

  - q: "HARD: Which of the following is required to achieve exactly-once delivery semantics in Apache Kafka?"
    options:
      - "Enable idempotent producers and use transactions so that writes and acknowledgments are atomic."
      - "Use at-least-once delivery and implement duplicate handling on the consumer side."
      - "Use a single partition topic to naturally achieve exactly one delivery."
      - "Set the producer acknowledgment setting (acks) to 0 to avoid resending messages."
    answer: 0

  - q: "HARD: For an Amazon SQS FIFO queue, how long is a message's deduplication ID retained to prevent duplicate deliveries?"
    options:
      - "About 5 minutes."
      - "Around 24 hours."
      - "Roughly 60 seconds."
      - "Indefinitely, until the queue is purged."
    answer: 0

  - q: "HARD: If messages for the same key arrive out of order from parallel consumers or partitions, how can their correct order be restored before processing?"
    options:
      - "Count on the broker to merge all partitions into a single ordered stream."
      - "Have consumers buffer messages and sort them by key or sequence before processing."
      - "Switch to at-most-once delivery so messages are never retried out of order."
      - "Attach timestamps to messages to guarantee automatic ordering."
    answer: 1

  - q: "HARD: Why is a two-phase commit (2PC) often avoided when integrating a database and message broker for exactly-once processing?"
    options:
      - "It cannot guarantee atomicity across a database and a message broker."
      - "It only works if the system uses at-most-once delivery semantics."
      - "It duplicates messages by design as part of its protocol."
      - "It adds a lot of complexity and can lock resources, severely hurting performance."
    answer: 3
---
