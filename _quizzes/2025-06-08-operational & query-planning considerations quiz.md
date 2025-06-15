---
layout: quiz
title: "Operational & Query-Planning Considerations Quiz"
tags: [system-design]
questions:
  - q: "Which consistency level provides the most up-to-date (strongest) read guarantees at the potential cost of higher latency or reduced availability?"
    options:
      - "Eventual consistency"
      - "Strong consistency"
      - "Causal consistency"
      - "Timeline consistency"
    answer: 1

  - q: "In a cluster with a replication factor of 5, how many replicas must acknowledge a write for the operation to succeed at the “quorum” consistency level?"
    options:
      - "3"
      - "5"
      - "4"
      - "2"
    answer: 0

  - q: "What is a potential effect of replication lag on queries using a secondary index on a read replica?"
    options:
      - "It will have no effect; the query returns the latest data."
      - "It may cause the database to error or crash."
      - "It might return stale or out-of-date results due to the lagging index."
      - "It triggers an automatic redirect of the query to the primary node."
    answer: 2

  - q: "Which scenario could cause a query planner to perform a full table scan despite an index being available on the table?"
    options:
      - "The database server is under heavy CPU load at query time."
      - "The query's filter matches most of the table's rows."
      - "The table has multiple indexes defined on it."
      - "The index is on an integer column instead of a text column."
    answer: 1

  - q: "Which of the following describes a “ghost table” approach to performing an online schema change?"
    options:
      - "Create a new table with the desired schema, copy data gradually into it, then swap it in as the live table with minimal downtime."
      - "Lock the original table and apply the schema changes directly, blocking writes until the operation completes."
      - "Take the database offline, drop the original table, and recreate it with the new schema during a maintenance window."
      - "Apply the schema change on a standby replica, then promote that replica to primary once the change is complete."
    answer: 0

  - q: "What does the “p99 latency” metric represent in database performance monitoring?"
    options:
      - "The average latency of the slowest 1% of queries."
      - "The time it takes to execute 99 queries in a row."
      - "The 99th percentile query latency (the time within which 99% of queries finish)."
      - "The percentage of queries that complete within 99 milliseconds."
    answer: 2

  - q: "Which AWS service provides an interactive dashboard for database performance (showing load, top SQL queries, and wait events)?"
    options:
      - "AWS X-Ray"
      - "Amazon CloudWatch"
      - "AWS CloudTrail"
      - "Amazon RDS Performance Insights"
    answer: 3

  - q: "What is the purpose of DynamoDB’s “adaptive capacity” feature?"
    options:
      - "To automatically boost throughput capacity for partitions that receive disproportionate traffic."
      - "To replicate data across multiple regions for disaster recovery."
      - "To automatically split a partition when its data volume exceeds a threshold."
      - "To compress infrequently accessed data to reduce storage costs."
    answer: 0

  - q: "In a high-availability database cluster, which measure can help prevent a “split-brain” scenario during failover?"
    options:
      - "Rely solely on updating DNS entries to redirect clients to the new primary."
      - "Permit both the old primary and new primary to accept writes briefly to avoid downtime."
      - "Assume the original primary will automatically shut down if it loses connectivity."
      - "Use a quorum-based consensus mechanism to elect a single primary leader."
    answer: 3

  - q: "Which is an advantage of point-in-time recovery (PITR) compared to relying solely on periodic full backups?"
    options:
      - "It eliminates the need to take any full backups of the database."
      - "It allows restoring the database to a specific moment between full backups, minimizing potential data loss."
      - "It significantly reduces the time required to restore a large database from scratch."
      - "It requires no additional storage space beyond the normal backup files."
    answer: 1

  - q: "Which of the following is NOT typically a factor when planning database capacity?"
    options:
      - "Storage IOPS (input/output operations per second) capacity"
      - "Maximum number of concurrent connections"
      - "Programming language used for the application"
      - "Available memory for the database working set"
    answer: 2

  - q: "In a distributed database, what does “timeline consistency” ensure?"
    options:
      - "All replicas apply every write in exactly the same order at the same time."
      - "It is basically the same as eventual consistency, allowing some stale reads."
      - "Any replica can serve reads with no guarantee of ordering between updates."
      - "Once a client has seen a new write, it will never see an earlier state of the data afterward."
    answer: 3

  - q: "In the context of an online schema migration, what does the “dual-write backfill” strategy entail?"
    options:
      - "Writing to both the old schema (or table) and the new schema concurrently while backfilling data to keep them in sync."
      - "Using a two-phase commit to ensure each write is durably stored in multiple locations."
      - "Running two separate database systems in parallel and merging the data after migration."
      - "Duplicating all read queries against both the old and new schema to compare results for consistency."
    answer: 0

  - q: "What is the purpose of a database slow query log?"
    options:
      - "To log every query that runs on the database for auditing."
      - "To record queries that take longer than a defined threshold to execute, for performance analysis."
      - "To automatically identify and optimize queries that are running slowly."
      - "To keep a record of all errors encountered during query execution."
    answer: 1

  - q: "Amazon Aurora is designed for high availability. Which aspect of Aurora’s architecture enables a rapid failover when the primary instance fails?"
    options:
      - "It keeps a fully synchronized standby database instance in a different region at all times."
      - "It runs on a serverless platform that can restart instantly on failure."
      - "It offloads writes to the application tier during failover to avoid downtime."
      - "Its compute nodes share a distributed storage layer, allowing a new instance to quickly take over using the same data."
    answer: 3
---
