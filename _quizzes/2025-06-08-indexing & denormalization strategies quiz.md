---
layout: quiz
title: "Indexing & Denormalization Strategies Quiz"
tags: [system-design]
questions:
  - q: "Which index structure is optimized for high write throughput by batching writes and later merging data (compaction)?"
    options:
      - "B-tree index"
      - "Log-Structured Merge tree (LSM-tree)"
      - "Inverted index"
      - "Bitmap index"
    answer: 1

  - q: "Which type of index is typically used for full-text search, storing a mapping from terms to the documents or rows that contain them?"
    options:
      - "Inverted index"
      - "Hash index"
      - "B-tree index"
      - "Bitmap index"
    answer: 0

  - q: "Which of the following best describes a covering index?"
    options:
      - "An index on multiple columns of a table."
      - "An index that includes all columns of the table."
      - "An index created to enforce foreign key constraints."
      - "An index that contains all columns needed by a query, allowing it to be answered from the index alone."
    answer: 3

  - q: "Which is an example of a composite index?"
    options:
      - "An index on (Column1, Column2) of a table."
      - "An index on a subset of rows satisfying a condition."
      - "An index including all columns needed by a query (covering index)."
      - "An index on a computed expression, e.g. LOWER(Column1)."
    answer: 0

  - q: "What is a partial index in a relational database?"
    options:
      - "An index that includes only some columns of the table."
      - "An index that spans multiple tables to speed up joins."
      - "An index defined with a WHERE clause so it only indexes certain rows."
      - "An index that is not fully built until a query is executed."
    answer: 2

  - q: "What is a likely effect of having many secondary indexes on a heavily updated (write-intensive) table?"
    options:
      - "Each write will be slower because it must update multiple indexes (increasing write amplification)."
      - "Write performance stays the same, since indexes only affect read queries."
      - "The database will automatically reorganize the table into third normal form to reduce writes."
      - "The table's primary key changes every time a new secondary index is added."
    answer: 0

  - q: "In an eventually consistent database, what issue can arise with secondary indexes?"
    options:
      - "They eliminate the need for a primary key on the data."
      - "Index updates might lag behind, so index queries can return stale data."
      - "All queries using secondary indexes become strongly consistent reads."
      - "They avoid writing to the base table, improving write throughput."
    answer: 1

  - q: "Why might a database design deliberately denormalize data?"
    options:
      - "To strictly enforce third normal form (3NF)."
      - "To reduce data redundancy and save storage space."
      - "Because relational databases cannot perform join operations."
      - "To speed up read queries by avoiding joins, at the cost of duplicating data and complicating writes."
    answer: 3

  - q: "Which index type is most suitable for efficiently querying a JSONB column for a specific key-value pair in PostgreSQL?"
    options:
      - "A GIN index on the JSONB column."
      - "A B-tree index on the JSONB column (treating it as text)."
      - "A GIST index on the JSONB column."
      - "A hash index on the JSONB data."
    answer: 0

  - q: "How can you index a computed value or expression (e.g. LOWER(column)) in PostgreSQL?"
    options:
      - "Create a partial index that covers only the computed values."
      - "It isn't possible to index a computed expression in a SQL database."
      - "Create a functional index on the expression (e.g., an index on LOWER(column))."
      - "Use a GIN index, since it can index arbitrary expressions."
    answer: 2

  - q: "What do database statistics (e.g., histograms on column data) help the query optimizer do?"
    options:
      - "Store precomputed results of frequent queries for faster retrieval."
      - "Estimate how many rows a query will return and the cost of operations, to choose an efficient plan."
      - "Ensure the query returns only distinct (non-duplicate) results."
      - "Enforce referential integrity (foreign keys) during query execution."
    answer: 1

  - q: "What does the SQL EXPLAIN command do?"
    options:
      - "Executes the query and returns the result along with performance metrics."
      - "Checks the query for syntax errors without executing it."
      - "Rebuilds all indexes used by the query to ensure they're optimal."
      - "Displays the query execution plan with estimated costs, without actually running the query."
    answer: 3

  - q: "Which maintenance task can help reduce index bloat in a PostgreSQL database?"
    options:
      - "Increasing the index fill factor to 100%."
      - "Backing up the table and restoring it from the backup."
      - "Running VACUUM or REINDEX to reclaim space from the index."
      - "Running EXPLAIN on the table to update index statistics."
    answer: 2

  - q: "If the 99th percentile (p99) query latency is high while the average latency remains low, what does this suggest?"
    options:
      - "All queries are running slower than normal."
      - "A small subset of queries are much slower than most (high tail latency), perhaps due to issues like index bloat or other outliers."
      - "The median latency is equally high (close to the 99th percentile)."
      - "There's no performance issue as long as the average latency is low."
    answer: 1

  - q: "Which of the following accurately describes a difference between a DynamoDB Global Secondary Index (GSI) and a Local Secondary Index (LSI)?"
    options:
      - "Global Secondary Indexes must be defined when the table is created, whereas Local Secondary Indexes can be added to an existing table."
      - "Local Secondary Indexes each have their own separate throughput capacity, unlike Global Secondary Indexes."
      - "A Global Secondary Index can use a different partition key than the base table, whereas a Local Secondary Index shares the base table's partition key."
      - "DynamoDB secondary indexes are always strongly consistent, similar to indexes in relational databases."
    answer: 2
---
