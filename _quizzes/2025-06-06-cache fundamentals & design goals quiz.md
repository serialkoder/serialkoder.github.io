---
layout: quiz
title: "Cache Fundamentals & Design Goals Quiz"
tags: [system-design]
questions:
  - q: "EASY: Which of the following best describes temporal locality in the context of caching?"
    options:
      - "Recently accessed items are likely to be accessed again soon."
      - "Accesses tend to occur in memory addresses that are close to one another."
      - "Data that has not been used recently is quickly evicted from the cache."
      - "Cache entries are stored based on the time at which they were added."
    answer: 0
  - q: "EASY: Which of the following is NOT a recognized category of cache miss?"
    options:
      - "Capacity miss"
      - "Concurrent miss"
      - "Conflict miss"
      - "Compulsory miss"
    answer: 1
  - q: "EASY: In caching, what does the acronym LRU stand for?"
    options:
      - "Longest Retained Unit"
      - "Least Regularly Used"
      - "Least Recently Used"
      - "Last Recorded Usage"
    answer: 2
  - q: "EASY: Memcached and Redis are primarily used as:"
    options:
      - "Distributed file systems for persistent storage"
      - "Web server software for serving HTTP requests"
      - "Relational database engines for transaction processing"
      - "In-memory caches to store key-value data and reduce database load"
    answer: 3
  - q: "EASY: A cache hit ratio of 90% means that:"
    options:
      - "90% of all requests are being served from the cache rather than the origin."
      - "90% of the cache's capacity is filled with data."
      - "90% of requests must go to the backend data source."
      - "Each cached item is accessed 90 times before expiration."
    answer: 0
  - q: "MEDIUM: Which cache write strategy ensures that data is written to main memory at the same time it is written to the cache?"
    options:
      - "Write-back"
      - "Write-around"
      - "Write-through"
      - "No-write allocate"
    answer: 2
  - q: "MEDIUM: What is the primary benefit of using a CDN (Content Delivery Network) for caching web content?"
    options:
      - "It intentionally increases traffic to the origin server."
      - "It reduces content delivery latency by serving users from edge caches closer to them."
      - "It guarantees that cached content will never expire or be evicted."
      - "It doubles the amount of data a user must download."
    answer: 1
  - q: "MEDIUM: A certain cache has a 95% hit rate, a 1 ns hit latency, and a 50 ns miss penalty. Approximately what is the average memory access time (AMAT)?"
    options:
      - "About 3.5 ns"
      - "About 1 ns"
      - "About 2.5 ns"
      - "About 50 ns"
    answer: 0
  - q: "MEDIUM: Which cache eviction algorithm uses multiple lists to track both recency and frequency of access, adapting its behavior to the workload?"
    options:
      - "LRU (Least Recently Used)"
      - "LFU (Least Frequently Used)"
      - "Random replacement"
      - "ARC (Adaptive Replacement Cache)"
    answer: 3
  - q: "MEDIUM: What is an effective way to mitigate a cache stampede (thundering herd) when a highly requested cached item expires?"
    options:
      - "Use a very short TTL (expiration) for that item to reduce load."
      - "Disable caching for that item entirely."
      - "Have only one request populate the cache (using locks or stale-while-revalidate) while others wait or serve stale data."
      - "Switch the cache to a write-through policy for that item."
    answer: 2
  - q: "MEDIUM: What is a potential drawback of storing cache entries in a compressed form?"
    options:
      - "It significantly increases the memory required to store data in the cache."
      - "It adds CPU overhead and latency to compress/decompress data on each cache access."
      - "It prevents the cache from evicting items when needed."
      - "It causes a higher cache miss rate for frequently accessed items."
    answer: 1
  - q: "HARD: If a single cache key becomes extremely hot (receiving a huge fraction of traffic) in a distributed cache, what is one way to avoid overloading the cache node responsible for that key?"
    options:
      - "Reduce the key's time-to-live (TTL) so it gets evicted more frequently."
      - "Use a write-around caching policy for that key."
      - "Turn off consistent hashing in the cache cluster."
      - "Replicate that key's data to multiple cache nodes and distribute the read requests among them."
    answer: 3
  - q: "HARD: In a multi-CPU system with each core having its own cache, what problem can arise with a write-back cache if one core updates a data item in its cache?"
    options:
      - "The updated cache line will be immediately evicted from all other caches."
      - "Other cores may have stale data in their caches, requiring a cache coherence mechanism."
      - "The memory will leak because write-back caches do not free data."
      - "The hashing of cache keys becomes inconsistent across cores."
    answer: 1
  - q: "HARD: A consistently high number of evictions per second in a cache is likely a sign of what?"
    options:
      - "The working set of data is too large for the cache, causing constant replacement (thrashing)."
      - "The cache's hit ratio is nearly 100%."
      - "The cache is using a write-through policy."
      - "Clients are not reading from the cache at all."
    answer: 0
  - q: "HARD: Why do cache performance metrics often include latency percentiles (e.g., p99) instead of just average latency?"
    options:
      - "Because the 99th percentile latency is always lower than the average latency."
      - "Because percentile metrics show the cache's hit ratio over time."
      - "Because percentiles highlight tail latencies (slowest requests) that averages can mask."
      - "Because an average cannot be computed for cache access times."
    answer: 2
---
