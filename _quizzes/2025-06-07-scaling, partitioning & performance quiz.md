---
layout: quiz
title: "Scaling, Partitioning & Performance Quiz"
questions:
  - q: "EASY: In a streaming system, which metric best indicates that consumers are not keeping up with producers?"
    options:
      - "A growing consumer lag (increasing backlog of unprocessed messages)."
      - "A high 99th percentile (p99) processing latency."
      - "A high producer throughput (messages per second)."
      - "An increased number of partitions in the system."
    answer: 0
  - q: "EASY: What is one effect of using large batch sizes and compressing messages in a messaging system?"
    options:
      - "Improved throughput and lower latency per message."
      - "Lower network usage with no impact on latency."
      - "Higher overall throughput but potentially increased end-to-end latency."
      - "Reduced throughput and improved latency per message."
    answer: 2
  - q: "EASY: If one partition in a distributed system becomes a hot partition (receiving much more traffic than others), how can you mitigate this hotspot?"
    options:
      - "Increase the partition's replication factor to spread load."
      - "Reduce the total number of partitions to concentrate resources."
      - "Route all traffic through a single broker to avoid imbalance."
      - "Modify the partitioning strategy (e.g., add a random key prefix) to better distribute traffic."
    answer: 3
  - q: "EASY: In a messaging pipeline, what is the main purpose of implementing back-pressure?"
    options:
      - "To maximize throughput by sending messages at the fastest rate possible."
      - "To prevent producers from overwhelming slower consumers."
      - "To replicate messages to multiple consumers simultaneously."
      - "To randomly drop messages when load is high."
    answer: 1
  - q: "EASY: What is a typical trade-off when replicating data across multiple availability zones or regions?"
    options:
      - "Improved fault tolerance and availability, but higher network latency."
      - "Lower latency for all users due to multiple data copies."
      - "Elimination of the need for data backups or durability measures."
      - "Reduced data durability because of long-distance replication."
    answer: 0
  - q: "MEDIUM: Which partitioning strategy minimizes data movement when new partitions or nodes are added?"
    options:
      - "Hashing keys by taking the key mod the current number of partitions."
      - "Partitioning by sorted key ranges."
      - "Using a single partition for all data."
      - "Using a consistent hashing scheme for key distribution."
    answer: 3
  - q: "MEDIUM: In a system with consumer groups, what is the purpose of tracking an offset for each group?"
    options:
      - "To evenly distribute messages across all partitions in the cluster."
      - "To throttle producers from sending messages too quickly."
      - "To keep track of the last consumed position in each partition for that group."
      - "To measure the network delay between producers and consumers."
    answer: 2
  - q: "MEDIUM: In a replicated messaging cluster, how is a new leader chosen for a partition after its leader fails?"
    options:
      - "All client applications vote to elect a new partition leader."
      - "An in-sync follower replica is promoted to become the new leader."
      - "The partition remains unavailable until the original leader restarts."
      - "The broker with the longest uptime takes over as leader automatically."
    answer: 1
  - q: "MEDIUM: Why do many high-throughput systems use an append-only log on disk instead of random writes or only in-memory storage?"
    options:
      - "In-memory storage ensures data will persist even after a server restart."
      - "Sequential disk writes are faster than random writes and still provide durability unlike memory."
      - "Random writes on modern SSDs are faster than sequential writes."
      - "Using an append-only log eliminates the need for any memory caching."
    answer: 1
  - q: "MEDIUM: Compared to standard queues, what is a known limitation of Amazon SQS FIFO queues?"
    options:
      - "They cannot preserve the ordering of messages."
      - "They do not support sending messages in batches."
      - "They have a much lower maximum throughput (around 300 messages per second by default)."
      - "They are not replicated across multiple availability zones."
    answer: 2
  - q: "MEDIUM: In Apache Kafka, what happens during a consumer group rebalance event?"
    options:
      - "Consumers pause consuming messages while partition assignments are rearranged."
      - "All committed offsets for the group are reset to the earliest position."
      - "No new messages can be produced to the topic during the rebalance."
      - "The replication factor of each partition is automatically increased."
    answer: 0
  - q: "HARD: In the context of high-throughput messaging, what does 'zero-copy' data transfer mean?"
    options:
      - "Using specialized hardware so that message latency is virtually zero."
      - "Moving data from disk to network without copying it through user-space memory."
      - "Replicating messages to a backup node with zero CPU overhead."
      - "Compressing messages so they occupy zero space until needed."
    answer: 1
  - q: "HARD: In a replicated log, when would a follower be removed from the In-Sync Replicas (ISR) set?"
    options:
      - "When it falls too far behind the leader in keeping up with new messages."
      - "When it acknowledges writes faster than the leader does."
      - "When it is promoted to leader for a different partition."
      - "When it runs a newer software version than the leader."
    answer: 0
  - q: "HARD: Which design choice helps a messaging system avoid back-pressure issues?"
    options:
      - "Using an unbounded queue on the consumer side to buffer incoming messages."
      - "Having producers push messages to consumers as quickly as possible."
      - "Disabling acknowledgments to maximize producer throughput."
      - "Letting consumers pull messages from the queue at their own pace."
    answer: 3
  - q: "HARD: Requiring acknowledgments from all in-sync replicas (acks=all) instead of only the leader (acks=1) will generally:"
    options:
      - "Reduce durability of messages but significantly improve throughput."
      - "Have no effect on overall throughput or message loss risk."
      - "Increase reliability (less risk of data loss) but at the cost of some throughput."
      - "Improve throughput by writing to all replicas in parallel."
    answer: 2
---