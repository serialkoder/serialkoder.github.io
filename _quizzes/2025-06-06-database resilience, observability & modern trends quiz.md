---
layout: quiz
title: "Database Resilience, Observability & Modern Trends Quiz"
questions:
  - q: "[E] Which metric best indicates imminent WAL-archive saturation in a Postgres cluster?"
    options:
      - "Checkpoint duration"
      - "Replication lag seconds"
      - "Archived WAL queue length"
      - "Dead-tuple count"
    answer: 2

  - q: "[E] In a disaster-recovery plan, what does the Recovery Point Objective (RPO) specify for a database?"
    options:
      - "The maximum period of data loss acceptable before harm"
      - "The longest allowable downtime for recovery"
      - "The size of the latest full backup"
      - "The number of standby replicas required"
    answer: 0

  - q: "[M] To guarantee zero data loss in a failover event, which replication mode must a primary–standby database cluster use?"
    options:
      - "Synchronous replication"
      - "Asynchronous replication"
      - "Single-master with nightly backups"
      - "Multi-master eventual consistency"
    answer: 0

  - q: "[H] In a multi-node database cluster, what mechanism prevents a “split-brain” scenario (two primaries) during failover?"
    options:
      - "Requiring a quorum/majority for leader election"
      - "Deploying exactly two nodes with auto-failover"
      - "Client-side load-balancing logic"
      - "Asynchronous replication to all replicas"
    answer: 0

  - q: "[M] Which schema change is backward-compatible for zero-downtime deployments?"
    options:
      - "Adding a new nullable or default-valued column"
      - "Renaming a frequently-used column in a table"
      - "Removing a column currently read by the app"
      - "Changing a column’s type from INT to DATETIME"
    answer: 0

  - q: "[M] A consistently low buffer-cache hit ratio in a database indicates that:"
    options:
      - "The server is often reading data from disk rather than memory"
      - "Queries are perfectly optimized and use the cache fully"
      - "The database has excess memory not being utilized"
      - "CPU, not I/O, is the primary performance bottleneck"
    answer: 0

  - q: "[E] Which feature ensures that database data remains encrypted at rest (on disk)?"
    options:
      - "Transparent Data Encryption (TDE)"
      - "Parameterized SQL queries"
      - "Role-based access control"
      - "TLS (SSL) connection encryption"
    answer: 0

  - q: "[E] When investigating a slow SQL query, what is typically the first step for diagnosing the performance issue?"
    options:
      - "Examine the query’s execution plan (EXPLAIN)"
      - "Add indexes on every column in the query"
      - "Restart the database server to clear caches"
      - "Denormalize the related database tables"
    answer: 0

  - q: "[M] Which statement is true of serverless database services?"
    options:
      - "They auto-scale resources per demand and bill per usage, with no user-managed servers"
      - "They run without using any physical servers or hardware whatsoever"
      - "They require manual capacity planning like traditional databases"
      - "They are limited to development use and cannot handle production loads"
    answer: 0

  - q: "[H] What is a primary characteristic of a Hybrid Transaction/Analytical Processing (HTAP) database?"
    options:
      - "It handles OLTP (transactions) and OLAP (analytics) on the same real-time data simultaneously"
      - "It offloads transactions to an OLTP database and analytics to a separate OLAP warehouse"
      - "It uses GPUs to accelerate transactions"
      - "It performs analytics only on stale read replicas of the primary database"
    answer: 0

  - q: "[M] What are vector databases optimized for?"
    options:
      - "Storing high-dimensional embedding vectors and performing similarity searches on them"
      - "Managing time-series numeric data with time-based queries"
      - "Storing GIS spatial coordinates and performing geometric queries"
      - "Holding relational tables with strict schemas and foreign-key enforcement"
    answer: 0

  - q: "[H] Which emerging I/O technology can drastically reduce write latency by providing persistent storage at near-DRAM speeds?"
    options:
      - "Non-volatile memory (persistent memory like NVDIMM/Optane)"
      - "15k RPM enterprise HDDs"
      - "Standard SATA SSD drives"
      - "Dual 10-Gigabit network cards"
    answer: 0

  - q: "[M] Adding an index on a frequently-filtered column will typically:"
    options:
      - "Speed up SELECT queries on that column, but slightly slow down writes and use more storage"
      - "Speed up all queries (reads and writes) with no downsides"
      - "Make insert/update operations faster while making reads slower"
      - "Eliminate the need for ACID transactions on that table entirely"
    answer: 0

  - q: "[H] A database experiencing high lock contention is likely suffering from:"
    options:
      - "Many concurrent transactions trying to update the same rows simultaneously"
      - "Too many SELECT (read-only) queries running in parallel"
      - "The use of connection pooling across the application"
      - "Excessive checkpointing or logging by the database engine"
    answer: 0

  - q: "[E] Applying the “principle of least privilege” in database security means:"
    options:
      - "Granting each user/service only the minimum permissions needed to perform its tasks"
      - "Using one shared admin account for all application and user access to the DB"
      - "Revoking all privileges from every user as a default security posture"
      - "Giving developers full administrative access in non-production environments"
    answer: 0
---
