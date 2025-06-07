---
layout: quiz
title: "Scaling & Distributed Databases Quiz"
questions:
  - q: "In a Dynamo-style system with N = 3 replicas, which R/W quorum pair guarantees that every read sees the latest successful write?"
    options:
      - "R = 1, W = 1"
      - "R = 2, W = 2"
      - "R = 1, W = 2"
      - "R = 2, W = 1"
    answer: 1

  - q: "An application is deployed across multiple data centers and must continue accepting writes even if network connectivity between sites is lost. Which replication strategy is most appropriate for this scenario?"
    options:
      - "Single-leader (primary-follower) replication"
      - "Multi-leader (active-active) replication"
      - "Leaderless quorum-based replication"
      - "Vertical scaling on a single server"
    answer: 1

  - q: "In a primary-secondary database setup using asynchronous replication, what is a notable drawback compared to synchronous replication?"
    options:
      - "Write latency significantly increases on the primary"
      - "The primary cannot serve reads while replicating"
      - "A crash of the primary may lead to recent writes not being replicated to secondaries"
      - "Secondary nodes cannot serve read traffic at all in this mode"
    answer: 2

  - q: "You need to shard a time-series database by timestamp. Which sharding approach makes range queries (by time) efficient but risks hotspots if the data is unevenly distributed?"
    options:
      - "Hash-based sharding on the timestamp"
      - "Consistent hashing on the record ID"
      - "Random sharding of records to nodes"
      - "Range-based sharding by timestamp values"
    answer: 3

  - q: "What is the main benefit of using consistent hashing to distribute keys across nodes?"
    options:
      - "It guarantees perfect balance of load across all nodes at all times"
      - "It eliminates the need for replication of data"
      - "When nodes are added or removed, only a minimal portion of the data needs to move"
      - "It ensures all writes are strongly consistent without coordination"
    answer: 2

  - q: "If the primary node of a database cluster fails, which mechanism helps the remaining nodes agree on electing a new primary leader?"
    options:
      - "Running a consensus algorithm (like Paxos or Raft) among the nodes"
      - "Initiating a two-phase commit (2PC) across all replica nodes"
      - "Using vector clock timestamps to pick the latest node"
      - "Relying on manual failover procedures only"
    answer: 0

  - q: "In a microservices distributed transaction, what is an advantage of using the Saga pattern over two-phase commit (2PC)?"
    options:
      - "A Saga allows each service to commit locally and uses compensating transactions on failure, avoiding a global lock/blocking on one coordinator"
      - "A Saga guarantees strict serializable consistency across all services just like 2PC"
      - "The Saga pattern uses a single coordinator to enforce atomic commits across services"
      - "The Saga pattern will roll back all services immediately on any failure, rather than doing partial commits"
    answer: 0

  - q: "Google Spanner can perform distributed transactions across data centers with strong consistency. What technology does Spanner use to achieve externally-consistent timestamps globally?"
    options:
      - "Two-phase commit protocol with retries"
      - "Vector clocks to order transactions"
      - "The TrueTime API based on atomic clocks and GPS clocks"
      - "A logical clock derived purely from message ordering"
    answer: 2

  - q: "In Amazon’s Dynamo system, vector clocks are used to:"
    options:
      - "Synchronize physical clocks of all nodes to the same time"
      - "Detect conflicting concurrent updates by capturing causality of updates"
      - "Elect a leader among replicas during failures"
      - "Optimize the two-phase commit process"
    answer: 1

  - q: "Which statement about Conflict-Free Replicated Data Types (CRDTs) is correct?"
    options:
      - "They rely on a central coordinator to resolve conflicts"
      - "They require all updates to go through a single leader"
      - "They only work if all updates are applied in the same order on every node"
      - "They allow concurrent updates on multiple nodes to merge automatically into a consistent state without conflicts"
    answer: 3

  - q: "According to the CAP theorem, an “AP” distributed database (Available and Partition-tolerant) will sacrifice which property during a network partition?"
    options:
      - "Availability"
      - "Partition tolerance"
      - "Consistency"
      - "Durability"
    answer: 2

  - q: "In the two-phase commit (2PC) protocol, if the coordinator crashes after sending the “prepare to commit” messages (and all participants replied ready) but before sending a commit/abort, what happens to the participant nodes?"
    options:
      - "They automatically commit since they voted to commit"
      - "They automatically abort the transaction to avoid inconsistency"
      - "They elect a new coordinator to decide commit or abort immediately"
      - "They wait blocked, holding the transaction in doubt until the coordinator (or a recovery process) resolves it"
    answer: 3

  - q: "One database shard has become a hotspot because a single key is receiving an extremely high volume of traffic. Which strategy helps mitigate this hot-key issue?"
    options:
      - "Reducing the total number of shards to concentrate capacity"
      - "Splitting or salting the key (e.g., add a random prefix/hash) to distribute data across multiple shards"
      - "Disabling replication for that particular key’s data"
      - "Using a single-threaded server to serialize all operations on that key"
    answer: 1

  - q: "Which guarantee is provided by an eventually consistent database system?"
    options:
      - "Every read receives the very latest write value"
      - "No need for any conflict resolution, as conflicts cannot occur"
      - "Writes are immediately visible on all replicas"
      - "If no new updates are made to an item, all replicas will eventually have the same last updated value for that item"
    answer: 3

  - q: "In a distributed database cluster, a “split-brain” scenario refers to:"
    options:
      - "A network partition splitting the cluster into two groups that each think they are the primary cluster, leading to conflicting state"
      - "A situation where the database’s memory is exhausted and it can no longer process requests"
      - "A design where the database is sharded into two halves for scaling"
      - "A backup system that is out of sync with the primary database"
    answer: 0
---
