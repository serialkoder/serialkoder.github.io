---
layout: quiz
title: "Advanced Patterns, Ecosystem & Observability Quiz"
questions:
  - q: 'EASY: Which messaging pattern ensures each message is consumed by only one recipient (and not broadcast to all subscribers)?'
    options:
      - "Publish/subscribe (multiple subscribers receive each message)"
      - "Work-queue (each message goes to only one consumer)"
      - "Fan-out broadcast (deliver every message to all queues)"
      - "Request/reply (one-to-one synchronous communication pattern)"
    answer: 1

  - q: 'EASY: Which AMQP exchange type routes a message to queues whose binding key exactly matches the message’s routing key?'
    options:
      - "Headers exchange"
      - "Topic exchange"
      - "Fan-out exchange"
      - "Direct exchange"
    answer: 3

  - q: 'HARD: In the context of messaging systems, what does exactly-once delivery semantics guarantee?'
    options:
      - "That each message is delivered at least once (no messages are lost, but duplicates are possible)"
      - "That each message is processed only once with no duplicates, even in the event of retries or failures"
      - "That each message is delivered at most once (no duplicates, but some messages may be lost)"
      - "That each published message is received exactly one time by every subscriber"
    answer: 1

  - q: 'HARD: Which Kafka feature allows retaining only the latest record for each key in a topic, enabling state reconstruction for event sourcing use cases?'
    options:
      - "Time-based log retention"
      - "Idempotent message production"
      - "Log compaction"
      - "In-memory caching of messages"
    answer: 2

  - q: 'EASY: Which messaging protocol is a lightweight publish/subscribe system often used for IoT devices?'
    options:
      - "AMQP"
      - "STOMP"
      - "HTTP"
      - "MQTT"
    answer: 3

  - q: 'EASY: Which mechanism is primarily used to encrypt data in transit for messaging systems?'
    options:
      - "SASL (Simple Authentication and Security Layer)"
      - "OAuth 2.0"
      - "TLS (Transport Layer Security)"
      - "ACLs (Access Control Lists)"
    answer: 2

  - q: 'MEDIUM: How does RabbitMQ allow multiple tenants or applications to be isolated on a single cluster?'
    options:
      - "Use a fanout exchange for each tenant to segregate messages"
      - "Apply per-tenant ACL rules in one shared namespace"
      - "Define separate virtual hosts (vhosts) for each tenant on the broker"
      - "Run each tenant on a different network port of the broker"
    answer: 2

  - q: 'EASY: In Kafka, what happens to messages that have exceeded the configured retention period of a topic?'
    options:
      - "They are moved to a Dead Letter Queue for later processing"
      - "They remain available indefinitely"
      - "They are archived to long-term storage automatically"
      - "They are deleted and no longer accessible after expiration"
    answer: 3

  - q: 'MEDIUM: In a Kafka log-compacted topic, how is a "tombstone" used to mark a record as deleted?'
    options:
      - "By writing a message with that key and a null value (a delete marker) to the topic"
      - "By using an administrative tool to remove the record from the log"
      - "By adding a special header flag to the message indicating deletion"
      - "By waiting for the record to be removed by the time-based retention policy"
    answer: 0

  - q: 'MEDIUM: In a streaming platform like Kafka, which metric indicates that a consumer is lagging behind the producer in processing messages?'
    options:
      - "Throughput (messages processed per second)"
      - "Queue depth (number of pending messages in the queue)"
      - "Consumer lag (difference between producer and consumer positions)"
      - "p99 latency (99th percentile processing time)"
    answer: 2

  - q: 'MEDIUM: What does "p99 latency" refer to in the context of message processing performance?'
    options:
      - "The 99th percentile latency (99% of messages are processed within this time threshold)"
      - "The average latency of processing messages (mean latency)"
      - "The median latency of processing (50th percentile latency)"
      - "The maximum observed latency for message processing"
    answer: 0

  - q: 'MEDIUM: Which change is most likely to increase throughput and allow more consumer parallelism for a Kafka topic?'
    options:
      - "Increase the number of partitions for the topic"
      - "Increase the topic's replication factor"
      - "Add more consumers to read from a single partition in the same group"
      - "Use faster disks (SSDs) on brokers to improve IOPS"
    answer: 0

  - q: 'HARD: What is the primary benefit of Kafka’s tiered storage feature?'
    options:
      - "It automatically backs up topic data to a secondary cluster for disaster recovery"
      - "It offloads older log segments to inexpensive storage, enabling longer retention with less local disk usage"
      - "It caches frequently accessed messages in memory for faster retrieval"
      - "It keeps all message data only in RAM instead of on disk"
    answer: 1

  - q: 'HARD: How can you achieve delayed message delivery in RabbitMQ (since RabbitMQ does not natively support delayed queues)?'
    options:
      - "By installing the RabbitMQ Delayed Message Exchange plugin and publishing messages with a delay parameter"
      - "By enabling a built-in queue message delay option in RabbitMQ's settings"
      - "By using a fanout exchange with a message TTL (expiration) to delay forwarding"
      - "By using a priority queue and treating higher priority as a delay mechanism"
    answer: 0

  - q: 'MEDIUM: What happens when you declare a RabbitMQ queue with a maximum priority and publish messages with varying priority values?'
    options:
      - "Messages with lower priority are dropped if a higher priority message arrives"
      - "Messages are delivered strictly in the order they were published (FIFO), regardless of priority"
      - "Priority affects which route a message takes but not the order in the queue"
      - "Higher priority messages will be delivered before lower priority messages"
    answer: 3
---
