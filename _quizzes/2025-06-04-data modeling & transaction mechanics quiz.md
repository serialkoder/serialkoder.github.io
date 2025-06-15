---
layout: quiz
title: "Data Modeling & Transaction Mechanics Quiz"
tags: [system-design]
questions:
  - q: "An application requires complex analytical queries on large datasets with relatively infrequent updates. To optimize query performance, how should the data be modeled?"
    options:
      - "Use a fully normalized (3NF) schema to eliminate all data redundancy."
      - "Use a denormalized schema that pre-joins or duplicates data to minimize expensive join operations at query time."
      - "Keep the schema strictly normalized and rely on heavy query caching for speed."
      - "Partition (shard) the normalized data across multiple servers without changing the schema design."
    answer: 1

  - q: "In which scenario is a highly normalized database schema (minimal redundancy) more appropriate than a denormalized one?"
    options:
      - "An analytics dashboard system that is overwhelmingly read-heavy and rarely updates data."
      - "A content caching service that intentionally duplicates data across regions for faster reads."
      - "A social media news feed where posts from many users are aggregated mostly for read operations."
      - "A banking system with frequent concurrent updates to account balances, where strict consistency and integrity are critical."
    answer: 3

  - q: "Which type of index is generally most suitable for efficiently retrieving records within a continuous range (e.g., all entries in a date range)?"
    options:
      - "Hash index"
      - "Full-text index"
      - "B-Tree index"
      - "Bitmap index"
    answer: 2

  - q: "An application frequently retrieves individual records by a unique identifier (exact matches only) on a very large table. Which indexing approach offers the fastest lookups for this use case?"
    options:
      - "Hash index"
      - "B-Tree index"
      - "Bitmap index"
      - "No index (scan the entire table for each query)"
    answer: 0

  - q: "Which of the following scenarios best illustrates a **phantom read** anomaly in transaction processing?"
    options:
      - "Transaction A reads a record that Transaction B has modified but not yet committed (Transaction A sees uncommitted data)."
      - "Transaction A reads the same record twice and finds different values because Transaction B updated that record in between (A’s second read sees a changed value)."
      - "Transaction A and Transaction B both update the same record; one update overrides the other without any error (one transaction’s update is lost)."
      - "Transaction A queries a set of rows with a condition, Transaction B inserts a new row that meets that condition and commits, and then Transaction A’s repeat query returns the newly inserted row."
    answer: 3

  - q: "In SQL database isolation levels, which level must be used to completely prevent phantom reads (ensuring no new rows can appear in a transaction’s repeated query)?"
    options:
      - "Read Uncommitted"
      - "Read Committed"
      - "Serializable"
      - "Repeatable Read"
    answer: 2

  - q: "For a system where data conflicts between concurrent transactions are rare, which concurrency control method tends to yield the best performance?"
    options:
      - "Optimistic concurrency control (transactions proceed without locks and validate at commit time)."
      - "Pessimistic concurrency control (transactions acquire locks on data before accessing it)."
      - "Executing all transactions in a single thread to avoid any concurrent access."
      - "Using a two-phase commit protocol for every transaction."
    answer: 0

  - q: "In a high-contention environment where many transactions frequently try to update the same records, which concurrency control strategy will maintain correctness while minimizing performance loss?"
    options:
      - "Optimistic concurrency (allow conflicts and retry transactions often)."
      - "Pessimistic concurrency (use locks to prevent conflicting access up front)."
      - "No concurrency control at all (let transactions proceed and handle conflicts at the application level)."
      - "Queue all transactions to run one at a time to eliminate conflicts entirely."
    answer: 1

  - q: "What is the primary purpose of Write-Ahead Logging (WAL) in database systems?"
    options:
      - "To cache query results in memory for faster read performance."
      - "To allow multiple transactions to update the database without using any locks."
      - "To ensure recovery and durability by recording changes in a log before applying them to the main database."
      - "To replicate data across nodes in real time for high availability."
    answer: 2

  - q: "Which of the following is a typical use case for implementing a database trigger?"
    options:
      - "Improving SELECT query speed by automatically duplicating data into extra tables whenever data changes."
      - "Automatically logging changes to a table (e.g., writing to an audit trail table whenever a row is inserted or updated)."
      - "Performing user authentication and authorization checks inside the database engine."
      - "Preventing SQL injection attacks by intercepting and validating queries at runtime."
    answer: 1

  - q: "Which statement is true about a standard (non-materialized) database view?"
    options:
      - "It stores a physical copy of the data from its underlying tables to accelerate queries."
      - "Querying a view will automatically update the data in the underlying base tables."
      - "It represents a virtual table defined by a query, showing results from underlying tables without storing its own data."
      - "A view can only present data from a single table, not from multiple tables joined together."
    answer: 2

  - q: "For handling a one-to-many relationship in a document-oriented NoSQL database (e.g., MongoDB) with emphasis on read performance, which data modeling approach is commonly used?"
    options:
      - "Normalize the data into separate collections and perform multi-document joins on each read."
      - "Use strict foreign key constraints between documents to maintain relationships (just like in an RDBMS)."
      - "Rely on multi-document ACID transactions for every read to assemble related data on the fly."
      - "Embed the related \"many\" objects inside the \"one\" parent document so that reads can retrieve everything in a single query."
    answer: 3

  - q: "What does *eventual consistency* guarantee in a distributed NoSQL system?"
    options:
      - "If no new updates are made to a given piece of data, all replicas will eventually have the same value for that data."
      - "Every read receives the most recently written data, at the cost of higher latency."
      - "Transactions are ACID-compliant across all nodes, ensuring consistency after each operation."
      - "Updates are propagated to all replicas immediately and synchronously after each write."
    answer: 0

  - q: "A SQL query is running very slowly on a large table because it’s scanning the entire table to find matching rows. What is the most likely cause of this performance bottleneck?"
    options:
      - "The database is too highly normalized, which forces it to do full table scans for queries."
      - "The query is missing an appropriate index on the filter condition, so the database must perform a full table scan."
      - "The table has too many indexes, confusing the query optimizer and leading to a table scan."
      - "The database’s cache is turned off, so it cannot utilize indexes and instead scans everything from disk."
    answer: 1

  - q: "In a distributed NoSQL database cluster, what is a common cause of one node (or a subset of nodes) becoming a performance bottleneck?"
    options:
      - "An uneven data distribution where a \"hot\" partition key sends a disproportionate amount of traffic to a single node."
      - "Using eventual consistency instead of strong consistency for replication."
      - "Over-sharding the data into too many partitions, leaving some nodes underutilized."
      - "Deploying the cluster across multiple data centers, introducing high network latency for some nodes."
    answer: 0
---
