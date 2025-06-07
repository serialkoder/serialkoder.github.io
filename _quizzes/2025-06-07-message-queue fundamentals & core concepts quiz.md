---
layout: quiz
title: "Message-Queue Fundamentals & Core Concepts Quiz"
questions:
  - q: 'EASY: Which of the following best describes the difference between a message queue (point-to-point) and a topic (publish-subscribe)?'
    options:
      - 'In a topic, each message is delivered to exactly one subscriber.'
      - 'A queue requires a broker, but a topic (pub/sub) does not use any broker.'
      - 'All consumers of a queue receive every message published to it.'
      - 'A queue delivers each message to only one consumer, whereas a topic (pub/sub) delivers each message to all subscribed consumers.'
    answer: 3

  - q: 'EASY: What guarantee does a FIFO message queue provide that a standard (unordered) queue typically does not?'
    options:
      - 'That consumers will receive only the messages intended specifically for them.'
      - 'That messages will be delivered to all subscribers rather than just one.'
      - 'That messages are delivered in the exact order in which they were sent (first-in, first-out).'
      - 'That no messages will ever be delivered more than once.'
    answer: 2

  - q: 'EASY: In messaging systems, what is the primary purpose of flow control or back-pressure mechanisms?'
    options:
      - 'To ensure messages are delivered in a strict first-in, first-out order.'
      - 'To prioritize certain messages over others in the queue.'
      - 'To automatically retry messages that failed processing.'
      - 'To prevent producers or brokers from overwhelming a slow consumer by throttling message delivery or production when necessary.'
    answer: 3

  - q: 'EASY: Which statement is true about how consumers retrieve messages from an Amazon SQS queue?'
    options:
      - 'Amazon SQS uses a push model to immediately deliver messages to consumers over persistent connections.'
      - 'Consumers subscribe to an SQS topic to have messages pushed in real-time.'
      - 'Consumers poll the SQS queue for new messages (pull model) rather than having messages pushed to them automatically.'
      - 'Amazon SQS requires a WebSocket connection for the broker to push messages to the consumer.'
    answer: 2

  - q: 'EASY: If a message broker stores queued messages only in memory (non-persistent), what happens to those messages if the broker restarts?'
    options:
      - 'They will be automatically saved to disk just before shutdown and recovered on restart.'
      - 'They will be delivered twice to ensure no message is missed after the restart.'
      - 'Nothing changes – in-memory messages survive a restart intact.'
      - 'All in-memory messages will be lost upon a broker restart, since volatile memory does not persist data.'
    answer: 3

  - q: 'MEDIUM: Which of the following is an advantage of using a brokerless messaging system (no central broker) over a broker-based system?'
    options:
      - 'Simpler reliability, because the system automatically persists messages without a broker.'
      - 'Built-in message routing and transformation capabilities without needing a dedicated server.'
      - 'Stronger decoupling of services, because senders and receivers have no knowledge of each other.'
      - 'Lower end-to-end message latency, since messages can travel directly from producer to consumer without an intermediary (e.g., as in ZeroMQ).'
    answer: 3

  - q: 'MEDIUM: Which statement is true about push-based versus pull-based message consumption models?'
    options:
      - 'Push-based systems inherently do not need flow control since messages are delivered immediately upon arrival.'
      - 'Pull-based consumption has lower latency because consumers retrieve messages only when they need them.'
      - 'Push-based delivery can reduce latency by sending messages to consumers as soon as they arrive, but it requires back-pressure mechanisms to avoid overwhelming slow consumers.'
      - 'In a pull model, the broker decides when to send messages to the consumer without the consumer requesting them.'
    answer: 2

  - q: 'MEDIUM: In RabbitMQ (a broker-based queue), if a consumer receives a message but does NOT acknowledge it (for example, the consumer crashes before acking), what will happen to that message?'
    options:
      - 'The message is lost permanently since it was already removed from the queue on deliver.'
      - 'The message remains stuck and will not be delivered to any consumer until the broker restarts.'
      - 'RabbitMQ will requeue the unacknowledged message and make it available for delivery to another consumer once it detects the original consumer is gone.'
      - 'The broker automatically sends a negative acknowledgment (nack) back to the producer to alert it of the failure.'
    answer: 2

  - q: 'MEDIUM: In Amazon SQS, what is the purpose of the visibility timeout on messages?'
    options:
      - 'It defines a period after a message is delivered to one consumer during which it is hidden from other consumers. If not acknowledged (deleted) within that time, the message becomes visible again for redelivery.'
      - 'It is the delay added before delivering a message to any consumer after it is sent to the queue.'
      - 'It specifies how long a message will remain in the queue before being automatically deleted.'
      - 'It determines how long a received message stays in the consumer''s local memory before processing.'
    answer: 0

  - q: 'MEDIUM: Which of the following is true about Amazon SQS Standard queues (as compared to SQS FIFO queues)?'
    options:
      - 'Standard queues ensure messages are always delivered in first-in, first-out order by default.'
      - 'Standard queues do not support multiple consumers reading from the same queue simultaneously.'
      - 'Standard queues provide high throughput with at-least-once delivery, which means they might deliver duplicates and do not guarantee strict message ordering.'
      - 'Standard queues guarantee messages are delivered exactly once with no duplicates.'
    answer: 2

  - q: 'MEDIUM: In a publish-subscribe messaging system with multiple subscribers, what is a likely effect if one subscriber is much slower at processing messages than the others?'
    options:
      - 'The broker will unsubscribe the slow consumer to preserve performance for the others.'
      - 'The overall publishing rate will slow down automatically until the slow subscriber catches up.'
      - 'There will be no impact at all; the slow subscriber will simply process messages at its own pace indefinitely without issues.'
      - 'The slow subscriber’s backlog of unprocessed messages will grow, potentially using more broker resources (and possibly leading the broker to drop messages for that subscriber if limits are exceeded).'
    answer: 3

  - q: 'HARD: What is "head-of-line blocking" in the context of message queues?'
    options:
      - 'A strategy of using multiple queues to distribute messages equally among consumers.'
      - 'A technique for prioritizing the first message in a queue above others.'
      - 'When messages are delivered out of order to consumers in a queue.'
      - 'A situation where a message at the front of a queue (or in a strictly ordered stream) is not processed (due to a slow or stuck consumer), thereby preventing subsequent messages from being delivered or processed.'
    answer: 3

  - q: 'HARD: You need a messaging solution where every message must be received by multiple independent consumer applications, and consumers should be able to replay or catch up on messages later. Which solution fits best?'
    options:
      - 'Use direct point-to-point socket connections from the producer to each consumer service for every message.'
      - 'Use a single RabbitMQ queue with multiple competing consumers so each consumer gets a copy of every message.'
      - 'Use a log-based messaging system like Apache Kafka, which retains messages for a duration. This allows multiple consumer groups to consume all messages at their own pace and replay them as needed.'
      - 'Set up separate RabbitMQ queues for each consumer and have the producer send duplicate messages to each queue.'
    answer: 2

  - q: 'HARD: For extremely low-latency, high-throughput inter-service messaging with minimal overhead, which approach is most appropriate?'
    options:
      - 'Use a robust broker like RabbitMQ with disk-based persistence for every message to maximize reliability.'
      - 'Use a distributed log system like Apache Kafka with multi-replication to ensure high durability for each message.'
      - 'Use a cloud-based queue service like Amazon SQS to handle all messages between services.'
      - 'Use a brokerless messaging approach (for example, using a library like ZeroMQ) to send messages directly between services, eliminating the overhead of a central broker.'
    answer: 3

  - q: 'HARD: A system provides at-least-once message delivery by default. What is typically required to achieve exactly-once processing of messages in such a system?'
    options:
      - 'Implementing additional mechanisms such as deduplication or transactional processing so that duplicate deliveries are detected and only one instance of each message is processed.'
      - 'No changes are needed — acknowledging messages one time guarantees exactly-once delivery.'
      - 'Using a FIFO queue automatically gives exactly-once semantics without any extra handling.'
      - 'Switching the consumer from a pull model to a push model will ensure exactly-once delivery.'
    answer: 0
---