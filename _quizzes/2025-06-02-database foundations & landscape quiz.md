---
layout: quiz
title: "Database Foundations & Landscape Quiz"
questions:
  - q: "Relational vs NoSQL Models: Which of the following correctly characterizes a key difference between relational databases and NoSQL databases?"
    options:
      - "NoSQL databases use the SQL query language for data manipulation, while relational databases do not support SQL."
      - "Relational databases enforce a fixed schema and ACID transactions, whereas many NoSQL databases use flexible schemas and may sacrifice strict consistency for scalability."
      - "Relational databases cannot scale beyond a single machine, whereas NoSQL databases always guarantee strong consistency on every operation."
      - "NoSQL databases strictly enforce foreign keys and joins, whereas relational databases lack support for multi-table joins."
    answer: 1

  - q: "For which application scenario would a NoSQL data store likely be more suitable than a relational database?"
    options:
      - "An inventory system where data relationships and constraints (like foreign keys) must be strictly enforced across tables."
      - "A banking system that requires precise financial transactions with strong consistency and complex multi-table queries."
      - "A social-media application that needs to store varying types of user-generated content with an evolving schema and must scale horizontally to millions of users."
      - "A small library catalog with a well-defined schema and minimal data that fits on a single server."
    answer: 2

  - q: "Which statement best differentiates ACID transactions from BASE principles in databases?"
    options:
      - "ACID emphasizes strong consistency and transactional integrity (all-or-nothing), whereas BASE favors high availability with only eventual consistency (allowing temporary inconsistencies)."
      - "ACID guarantees unlimited horizontal scalability by relaxing consistency, whereas BASE ensures strict immediate consistency at the cost of availability."
      - "ACID transactions cannot guarantee durability, whereas BASE systems always guarantee durability of data."
      - "ACID is used exclusively by NoSQL systems, while BASE is used only by relational SQL systems."
    answer: 0

  - q: "According to the CAP theorem, what must a distributed database sacrifice in the event of a network partition?"
    options:
      - "It must give up either consistency or availability (since it cannot fully provide both under a partition)."
      - "It cannot tolerate network partitions at all and must shut down until connectivity is restored."
      - "It loses both consistency and availability until the partition is resolved."
      - "It sacrifices durability of data in order to maintain consistency and availability."
    answer: 0

  - q: "Which of the following is a characteristic of an OLTP (online transactional processing) system as compared to an OLAP (online analytical processing) system?"
    options:
      - "OLTP systems handle many short, frequent transactions (e.g., inserts/updates) and keep data highly normalized for consistency."
      - "OLTP systems are optimized for complex, long-running queries on historical data and use denormalized schemas like star schemas."
      - "OLTP systems aggregate and pre-summarize large volumes of data for analytical reporting rather than handling individual transactions."
      - "OLTP systems primarily support read-only queries for business-intelligence and data-mining workloads."
    answer: 0

  - q: "A column-oriented storage layout provides which advantage over a traditional row-oriented storage layout?"
    options:
      - "Faster scanning and aggregation of a single field across many records, since the data for one column is stored contiguously on disk (improving analytic query performance)."
      - "Stronger enforcement of relational integrity constraints (foreign keys) due to column-wise data organization."
      - "Elimination of the need for indexes, because data in a column store is always sorted by row by default."
      - "Faster writing of a single transaction’s full record, since all of its fields are stored together in one place on disk."
    answer: 0

  - q: "What is a common performance trade-off when adding more indexes to a database table?"
    options:
      - "Read queries become faster on indexed columns, but write operations (inserts/updates) slow down because each index must be updated on every write."
      - "Both read and write operations become faster uniformly, as indexes speed up all aspects of data access with no downsides."
      - "Adding indexes reduces the storage space needed by the table, improving I/O performance for all queries."
      - "Write operations become faster while read queries slow down, since maintaining indexes optimizes writes at the expense of reads."
    answer: 0

  - q: "Which data structure is most commonly used to implement a general-purpose index that supports range queries in relational databases?"
    options:
      - "A Hash index, which stores keys based on hash values to allow ordered range traversal."
      - "A Linked-List index, which links all rows sequentially to speed up scans."
      - "A B+-Tree index (balanced tree), which keeps keys sorted and allows efficient range lookups."
      - "A Max-Heap index, which maintains the largest elements at the root for priority access."
    answer: 2

  - q: "What is the primary role of the query optimizer in a relational database system?"
    options:
      - "To examine possible execution plans for a SQL query (e.g., different join orders and use of indexes) and choose the plan with the lowest estimated cost, thus minimizing query execution time."
      - "To translate SQL queries directly into machine code without altering the original execution order of operations."
      - "To cache the results of every query in memory so that all future queries always return instantly."
      - "To ensure query results are 100% accurate by sequentially scanning all data and bypassing indexes."
    answer: 0

  - q: "What is the primary purpose of a Write-Ahead Log (WAL) in database systems?"
    options:
      - "To ensure durability by logging changes to a persistent log before applying them to the main database, so that the database can recover to a consistent state after a crash."
      - "To prevent concurrent transactions from interfering with each other by using locks."
      - "To automatically distribute writes across multiple nodes for load balancing."
      - "To speed up read queries by storing precomputed results of frequent queries."
    answer: 0

  - q: "In many database workloads, what is often the primary performance bottleneck as data volumes grow large?"
    options:
      - "Disk I/O (input/output) throughput and latency — reading from or writing to disk is much slower than in-memory operations, often becoming the rate-limiting factor."
      - "CPU computation speed — because database servers spend most of their time doing complex calculations on data."
      - "Random-access memory (RAM) — because memory access is orders of magnitude slower than disk access in database systems."
      - "Display rendering — the time it takes for the database to render query results on the user’s screen."
    answer: 0

  - q: "In a high-concurrency transactional system, many transactions are trying to update the same set of rows. Which bottleneck is likely to degrade performance in this scenario?"
    options:
      - "Lock contention — transactions waiting on locks for shared data, causing delays and reduced throughput as they serialize access."
      - "Network bandwidth — saturation of network capacity when all transactions occur on a single machine with no external calls."
      - "Insufficient CPU cores — the inability to execute more than one transaction at a time due to a single-core processor."
      - "Disk fragmentation — minor data-layout issues on disk preventing concurrent access (even if data fits in memory)."
    answer: 0

  - q: "Which ACID property is specifically responsible for preventing one transaction’s intermediate effects from being visible to other concurrent transactions?"
    options:
      - "Isolation — it ensures that transactions execute as if they were serialized, so other transactions do not see partial results of a concurrent transaction."
      - "Consistency — it ensures database rules are not broken at commit, not about concurrency visibility."
      - "Durability — it guarantees committed data persists after a crash, unrelated to intermediate visibility."
      - "Atomicity — it ensures a transaction is all-or-nothing, but not related to visibility during execution."
    answer: 0

  - q: "The ACID properties are a foundation of transaction management. What do the letters A-C-I-D stand for?"
    options:
      - "Atomicity, Consistency, Isolation, Durability."
      - "Accuracy, Consistency, Isolation, Durability."
      - "Atomicity, Consistency, Integrity, Durability."
      - "Atomicity, Consistency, Isolation, Distribution."
    answer: 0

  - q: "The term \"consistency\" has different meanings in ACID vs the CAP theorem. Which choice correctly distinguishes these two uses of \"consistency\"?"
    options:
      - "In CAP, consistency means every read sees the latest write (all nodes have the same up-to-date data), whereas in ACID, consistency means a transaction brings the database from one valid state to another (enforcing all defined integrity rules)."
      - "ACID uses consistency to mean eventual consistency across nodes, whereas CAP uses it to mean internal consistency of a single node."
      - "CAP’s definition of consistency is about ensuring foreign-key constraints in a single database, while ACID’s consistency is about keeping replicas in sync."
      - "In both CAP and ACID, consistency exactly means that all database replicas are instantly updated with every transaction commit."
    answer: 0
---
