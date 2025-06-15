---
layout: quiz
title: "Partitioning & Sharding Fundamentals Quiz"
tags: [system-design]
questions:
  - q: "Horizontal partitioning (dividing a table's rows across multiple servers) is commonly known as:"
    options:
      - "Normalization"
      - "Sharding"
      - "Vertical partitioning"
      - "Replication"
    answer: 1

  - q: "Which sharding strategy partitions data based on a user's geographic location (e.g., region)?"
    options:
      - "Geo (zone) sharding"
      - "Hash-based sharding"
      - "Range-based sharding"
      - "Vertical partitioning"
    answer: 0

  - q: "Which is a desirable property of an effective shard key?"
    options:
      - "Values that increase in a predictable sequence"
      - "Only a few possible values for the key"
      - "Values closely correlated with insertion time"
      - "A high number of distinct key values"
    answer: 3

  - q: "Which of the following is an example of vertical partitioning in a database?"
    options:
      - "Partitioning a table's rows by user ID across multiple servers"
      - "Replicating the entire database to a second server"
      - "Splitting a table into multiple tables, each with a subset of the columns"
      - "Sharding a table by a range of values in its primary key"
    answer: 2

  - q: "Range-based sharding is especially useful when:"
    options:
      - "You need to efficiently retrieve a contiguous range of records by key"
      - "You have unpredictable access patterns and want even load distribution"
      - "You want to partition users by their geographic region"
      - "You need to split a table into multiple tables based on columns"
    answer: 0

  - q: "Which of the following is a drawback of horizontal partitioning (sharding)?"
    options:
      - "It prevents scaling the database beyond a single machine"
      - "It increases the number of columns in each table"
      - "Queries spanning multiple shards require complex coordination (scatter-gather)"
      - "It duplicates all data on every shard"
    answer: 2

  - q: "What problem can occur if a timestamp or auto-incrementing ID is used as the shard key?"
    options:
      - "Data will be duplicated on all shards"
      - "Queries by that key will no longer work"
      - "Data will distribute evenly across all shards"
      - "Most writes will target a single newest shard, causing a hotspot"
    answer: 3

  - q: "What is a primary benefit of using consistent hashing for distributing data among shards?"
    options:
      - "It guarantees perfectly uniform data distribution at all times"
      - "It minimizes how much data needs to be moved when adding or removing shards"
      - "It ensures every shard always stores an equal amount of data"
      - "It makes range queries on the shard key more efficient"
    answer: 1

  - q: "After adding a new shard to a database cluster, how is rebalancing typically accomplished?"
    options:
      - "Copy the full data set of an existing shard to the new shard"
      - "Switch to a consistent hashing scheme to avoid moving data"
      - "Migrate a subset of data (e.g., certain key ranges or chunks) from existing shards to the new shard"
      - "Do nothing; new data will only be written to the new shard"
    answer: 2

  - q: "Which technique can help mitigate the issue of a hot partition key (a key receiving a disproportionate amount of traffic)?"
    options:
      - "Adding a random prefix or salt to the key to spread the load"
      - "Using consistent hashing for all keys in the database"
      - "Partitioning the data vertically by splitting columns into different tables"
      - "Merging less active shards together into a single shard"
    answer: 0

  - q: "Which metric would best indicate that one shard is handling a disproportionate load compared to others?"
    options:
      - "The total QPS (queries per second) across the entire cluster"
      - "The average response time of the database as a whole"
      - "The number of records stored on each shard"
      - "The 99th percentile (p99) query latency on each shard"
    answer: 3

  - q: "How can the progress of ongoing rebalancing (such as chunk migrations or partition splits) be monitored in a sharded system?"
    options:
      - "By observing the average CPU utilization across the cluster"
      - "By tracking the number of remaining data chunks or split/merge tasks to be processed"
      - "By measuring the replication lag between shards"
      - "By checking the total data size of the largest shard"
    answer: 1

  - q: "Which statement about Amazon DynamoDB partitioning is correct?"
    options:
      - "DynamoDB automatically equalizes traffic across partitions, so no partition becomes hot"
      - "Adaptive capacity in DynamoDB is off by default and needs manual activation"
      - "Each DynamoDB partition can handle up to 3000 read capacity units (RCUs) and 1000 write capacity units (WCUs) per second, and adaptive capacity redistributes unused throughput to hot partitions"
      - "A single DynamoDB partition can grow to an unlimited size without splitting"
    answer: 2

  - q: "Which is an advantage of using client-side sharding (with a shard map) over a single routing proxy?"
    options:
      - "It removes the single point of failure and bottleneck that a central router introduces"
      - "Clients do not need any knowledge of the shard key or partition schema"
      - "Clients are guaranteed to always read the most up-to-date data"
      - "It greatly simplifies the client application logic"
    answer: 0

  - q: "What does the key fan-out strategy for handling hot keys involve?"
    options:
      - "Appending a random component to each key to randomize its distribution"
      - "Storing duplicates of a hot item under multiple different keys to spread load across shards"
      - "Caching the hot item in memory to reduce database load"
      - "Isolating the hot item on a single dedicated shard separate from other data"
    answer: 1
---
