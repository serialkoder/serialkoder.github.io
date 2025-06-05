---
layout: flashdeck
title: "Data-Modeling & Transaction Mechanics Deck"
intro: |
  Key trade-offs, patterns, and pitfalls every architect should recall on-demand.  
  Tap a question to reveal its answer.
cards:
  - q: "Schema-on-write vs. schema-on-read — what’s the core distinction?"
    a: |
       • **Schema-on-write:** Data must conform *before* it’s stored (e.g., relational tables).  
       • **Schema-on-read:** Structure is interpreted *when* data is consumed (e.g., JSON docs).

  - q: "Why might you denormalize part of a relational schema?"
    a: "Eliminate expensive joins and speed up read paths, accepting extra write complexity and possible inconsistencies."

  - q: "Ledger vs. spreadsheet world-view?"
    a: |
       • **Ledger:** Append-only log; flexible, audit-friendly; compute current state on demand.  
       • **Spreadsheet:** Current state table; reads cheap; harder to scale consistent updates.

  - q: "Primary benefit of embedding sub-documents in a document DB?"
    a: "All related data fetched or updated atomically in a single read/write."

  - q: "What is a ‘hot partition’ and how do you defuse it?"
    a: "Shard/key receiving disproportionate traffic; mitigate by re-hashing, adding key randomness, or tiered caching."

  - q: "When are composite indexes preferred?"
    a: "When common queries filter on the same ordered set of columns — one index covers multiple predicates."

  - q: "Hash vs. B-tree index?"
    a: |
       • **Hash:** O(1) equality lookup; no range scans.  
       • **B-tree:** Log-time equality & range; supports ORDER BY and BETWEEN.

  - q: "Read Committed vs. Serializable isolation in one line each."
    a: |
       • **RC:** Blocks dirty reads only.  
       • **Serializable:** Guarantees the outcome equals some single-threaded order; prevents phantoms & lost updates.

  - q: "Dirty read, non-repeatable read, phantom — which isolation levels stop each?"
    a: |
       • **Dirty read:** blocked by RC+.  
       • **Non-repeatable read:** blocked by RR+.  
       • **Phantom:** blocked only by Serializable.

  - q: "MVCC’s super-power?"
    a: "Readers take a snapshot; they never block writers and vice versa—high read concurrency with snapshot consistency."

  - q: "Two-phase locking (2PL) downside compared to MVCC?"
    a: "Pessimistic locks can deadlock and stall readers; throughput drops under contention."

  - q: "WAL: why ‘write ahead’?"
    a: "Changes hit the sequential redo log *before* page flush; crash recovery replays the log to restore durability."

  - q: "Group commit in a sentence."
    a: "Batch several transactions’ log flushes into one disk fsync, trading milliseconds of latency for higher throughput."

  - q: "Checkpoint purpose?"
    a: "Flush dirty pages & mark a log position so recovery only replays records after that point."

  - q: "When to use triggers despite overhead?"
    a: "Mandatory audit trails or integrity actions that *must* fire with every change, independent of application code."

  - q: "Materialized view vs. ordinary view?"
    a: "Materialized stores query results physically for fast reads; ordinary view is a stored query executed on demand."

  - q: "Designing a Cassandra table: first rule?"
    a: "Pick a partition key that evenly distributes data *and* matches primary query pattern; avoid multi-partition fan-out."

  - q: "Why are secondary indexes rare in leaderless KV stores?"
    a: "Index maintenance isn’t globally coordinated; queries would need scatter-gather across all nodes — expensive."

  - q: "Top three transaction anomalies architects cite in interviews?"
    a: "Dirty read, lost update, phantom read."

  - q: "Single-sentence cheat sheet: Money transfer system?"
    a: "Fully normalized ledger tables + account index, one Serializable transaction debiting and crediting rows atomically."

  - q: "How do latches differ from locks?"
    a: "Latches are short, in-memory, spin-based mutexes protecting internal data structures; locks enforce ACID isolation."

  - q: "What is write amplification (index perspective)?"
    a: "Each logical write also updates every affected index page, multiplying I/O cost."

  - q: "Trigger cautionary tale?"
    a: "‘Spaghetti triggers’: hidden cascades that balloon a tiny update into opaque, slow chain reactions — hard to debug."

  - q: "Schema migration with zero downtime — headline steps?"
    a: "Add new columns (backward-compatible), dual-write old+new, background backfill, flip reads, drop legacy fields."

  - q: "Read replica caveat to call out?"
    a: "Staleness — enforce read-your-writes or route user-critical reads to primary."

---
