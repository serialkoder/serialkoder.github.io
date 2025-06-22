---
layout: flashdeck
title: "Pipes‑and‑Filters Architecture: Streaming & Batch Pipelines"
tags: [software-architecture]
intro: |
  Core ideas, benefits, design choices, and common pitfalls of the Pipes‑and‑Filters pattern.
  Click a question to reveal the answer.
cards:
  - q: "What is the Pipes‑and‑Filters architectural pattern?"
    a: "It decomposes data processing into a linear (or branching) pipeline of **filters** (independent stages) connected by **pipes** that pass data downstream."

  - q: "Why replace a monolithic ETL with a Pipes‑and‑Filters pipeline?"
    a: |
      • Reduces tangled code and duplication  
      • Enables reuse by mixing and matching filters  
      • Scales individual stages, not the whole job  
      • Isolates failures—one bad stage no longer brings down the entire flow

  - q: "Name the three core elements of this pattern."
    a: |
      1. **Filter** – self‑contained processing stage  
      2. **Pipe** – conduit carrying data between filters  
      3. **Pipeline runner / orchestrator** – sets up, schedules, and coordinates the chain

  - q: "Push vs pull dataflow—what’s the difference?"
    a: |
      • **Push**: Producer sends data as soon as it’s ready (low latency, needs back‑pressure).  
      • **Pull**: Consumer requests data when ready (built‑in throttling).

  - q: "How do streaming, micro‑batch, and batch modes differ?"
    a: |
      • **Streaming** – event‑at‑a‑time, near real‑time results  
      • **Micro‑batch** – tiny, frequent batches (seconds)  
      • **Batch** – large, discrete data sets (hours / days)  
      *The pattern itself is agnostic; choice affects latency & complexity.*

  - q: "Stateless vs stateful filter—why prefer stateless?"
    a: |
      • Stateless filters are idempotent, easy to parallelize, and need no checkpointing.  
      • Stateful filters hold running aggregates or joins and require careful state management.

  - q: "What roles do **source** and **sink** filters play?"
    a: "Sources ingest external data (no inbound pipe); sinks emit side‑effects (DB writes, API calls). In between, aim for pure transformations."

  - q: "How does the pattern enable concurrency and parallelism?"
    a: "Each filter can run in its own thread, process, container, or node. Bottleneck stages can be scaled horizontally by adding more filter instances reading from the same inbound pipe."

  - q: "Define back‑pressure."
    a: "A feedback mechanism that slows producers when consumers lag to prevent unbounded queue growth and crashes."

  - q: "Give two serialization formats suited to multi‑process pipes and a key trade‑off."
    a: |
      • **Avro / Protobuf (binary, schema‑enforced)** – compact & fast but not human‑readable.  
      • **JSON Lines (text)** – easy to debug, flexible, but verbose and slower to parse.

  - q: "What is a ‘poison pill’ and how is it handled?"
    a: "A bad record that consistently fails a filter. Route it to a Dead‑Letter Queue (DLQ) after limited retries to keep the pipeline healthy."

  - q: "Why is observability critical in distributed pipelines?"
    a: "Stage‑level metrics (throughput, latency, error rate) and end‑to‑end tracing pinpoint bottlenecks and failures across multiple services."

  - q: "Explain checkpointing in stream processing."
    a: "Periodic snapshots of filter state and input offsets so the pipeline can restart from the last consistent point after a crash."

  - q: "How do idempotent filters aid exactly‑once semantics?"
    a: "If re‑processing the same input doesn’t change the final state or duplicate side‑effects, retries and replays become safe."

  - q: "List two popular frameworks that implement Pipes‑and‑Filters."
    a: |
      • **Apache Beam (Dataflow, Flink runners, etc.)**  
      • **Kafka Streams**  
      *(Flink, Spark Structured Streaming, and cloud ETL services also follow the pattern.)*

  - q: "Name three performance tuning knobs for a pipeline."
    a: |
      • Pipe buffer size  
      • Filter parallelism level  
      • Window size / trigger policy in stateful operators

  - q: "What security measures should accompany inter‑service pipes?"
    a: |
      • Encrypt data in transit (TLS)  
      • Encrypt data at rest (spill files, checkpoints)  
      • Apply PII masking/anonymization early in the pipeline

  - q: "Describe the ‘chatty pipes’ anti‑pattern."
    a: "Filters emit excessively small messages, causing high serialization and network overhead. Batch or fuse operations to improve throughput."

  - q: "Why can a ‘mega‑filter’ undermine the pattern?"
    a: "Combining many responsibilities into one stage kills modularity, reuse, and fine‑grained scaling—reverting to a mini‑monolith."

  - q: "How does schema evolution relate to contract coupling?"
    a: "Rigid, unversioned schemas break downstream filters on change. Versioned schemas with backward compatibility prevent fragile coupling."

  - q: "What is a Dead‑Letter Queue (DLQ)?"
    a: "A separate pipe or topic that stores messages the pipeline failed to process after retries, allowing offline inspection and replay."

  - q: "Give an example of fallback logic in a filter."
    a: "If an enrichment API is down, the filter inserts default values or tags the record for later re‑enrichment instead of blocking the whole pipeline."

  - q: "How does operator fusion improve performance in engines like Flink?"
    a: "Adjacent filters are combined into one physical task to avoid unnecessary serialization and context switching, boosting throughput."

  - q: "What metrics signal that a stage has become a bottleneck?"
    a: "Rising input queue depth, higher per‑item latency, and lower throughput compared to upstream stages."

  - q: "Explain vertical vs horizontal scaling **within** a pipeline context."
    a: |
      • **Vertical**: Give a slow filter more CPU/RAM on one node.  
      • **Horizontal**: Add more parallel instances of that filter, each consuming from the shared pipe.

  - q: "What design principle guides the granularity of filters?"
    a: "Single Responsibility: each filter should perform one conceptual transformation to maximize reuse and testability."

---
