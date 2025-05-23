---
layout: quiz
title: "CAP Theorem Quiz"
questions:
  - q: "What does “CAP” stand for in the context of the CAP theorem?"
    options:
      - "Consistency, Availability, Performance"
      - "Consistency, Accuracy, Partition tolerance"
      - "Consistency, Availability, Partition tolerance"
      - "Capacity, Availability, Performance"
    answer: 2

  - q: "True/False: The CAP theorem states that a distributed system can simultaneously provide consistency, availability, and partition tolerance."
    options: ["True", "False"]
    answer: 1

  - q: "In the context of the CAP theorem, what does “consistency” mean?"
    options:
      - "Every read receives the most recent write (or an error if the latest data can't be guaranteed)"
      - "The system is operational 24/7 with minimal downtime"
      - "The system continues to operate despite any number of network failures"
      - "All database transactions preserve integrity and constraints"
    answer: 0

  - q: "True/False: Partition tolerance in CAP means the system continues to function even if network communications between nodes are disrupted."
    options: ["True", "False"]
    answer: 0

  - q: "True/False: If no network partition occurs, a distributed system can potentially provide both consistency and availability simultaneously."
    options: ["True", "False"]
    answer: 0

  - q: "Which of the following systems is an example of a CP system (consistent and partition-tolerant)?"
    options:
      - "Apache Cassandra"
      - "Apache Zookeeper"
      - "Amazon DynamoDB"
      - "CouchDB"
    answer: 1

  - q: "Which statement about CAP theorem trade-offs is true?"
    options:
      - "In an AP system, the system may return stale (out-of-date) data to ensure availability during a network partition."
      - "In a CP system, the system favors availability over consistency when a partition occurs."
      - "“Partition tolerance” means the system stops functioning when network partitions happen."
      - "CAP theorem applies only to NoSQL databases, not to relational databases."
    answer: 0

  - q: "True/False: The term “Consistency” in CAP has the same meaning as the “Consistency” in ACID database transactions."
    options: ["True", "False"]
    answer: 1

  - q: "Which theorem or concept extends CAP by considering the trade-off between latency and consistency (when no partition occurs)?"
    options:
      - "Brewer’s theorem"
      - "ACID"
      - "BASE"
      - "PACELC"
    answer: 3

  - q: "True/False: Systems that prioritize availability (AP systems) often use eventual consistency, meaning all replicas will eventually synchronize to the same data once a network partition is resolved."
    options: ["True", "False"]
    answer: 0
---
