---
layout: quiz
title: "Cache Integration Patterns Quiz"
tags: [system-design]
questions:
  - q: "EASY: Which of the following is a drawback of using only client-side (local) caches compared to a distributed cache?"
    options:
      - "Different clients might have inconsistent or stale data because the cache isn't shared."
      - "Using a client-side cache always reduces load on the database more than a distributed cache would."
      - "Network latency is higher for client-side caches because every lookup goes over the network."
      - "Client-side caches ensure all clients see updates simultaneously without extra coordination."
    answer: 0
  - q: "EASY: In the cache-aside (lazy loading) pattern, what happens when an application encounters a cache miss?"
    options:
      - "The application aborts the request since the data was not in cache."
      - "The cache returns a default value while the data store is never accessed."
      - "The application fetches the data from the data store and then populates the cache with that data."
      - "The cache automatically fetches the data from the data store without involving the application."
    answer: 2
  - q: "EASY: How does a read-through cache handle data retrieval on a cache miss?"
    options:
      - "The application reads directly from the database and bypasses the cache entirely on a miss."
      - "The data is fetched from a secondary cache tier instead of the primary backing store."
      - "The caching layer itself fetches the requested data from the backing store and returns it, populating the cache."
      - "The cache returns an error to the application on a miss, and the application must retry later."
    answer: 2
  - q: "EASY: In a write-through caching strategy, what is a key effect on write operations?"
    options:
      - "Writes are buffered in the cache and only sent to the database after a delay."
      - "Only the cache is updated on write, and the database is updated on the next read."
      - "Every write operation goes through the cache and is immediately written to the backing store, ensuring cache and database remain in sync."
      - "Write-through caching mainly aims to reduce write latency by skipping database writes."
    answer: 2
  - q: "EASY: What is the primary difference between lazy loading (cache-aside) and eager loading (cache warming) in caching strategies?"
    options:
      - "Lazy loading adds significant startup time, while eager loading delays each request."
      - "Lazy loading means loading all cache entries at application start, eager loading means loading on first access."
      - "Lazy loading populates the cache on-demand when data is first requested, whereas eager loading pre-populates the cache ahead of time (such as on startup or prior to use)."
      - "Eager loading always results in stale data, while lazy loading guarantees fresh data."
    answer: 2
  - q: "MEDIUM: Which of the following is a common pitfall when using the cache-aside pattern?"
    options:
      - "Cache-aside requires the cache to push updates to the application on every write."
      - "Using cache-aside always doubles the number of database calls for each read."
      - "It forces all reads to go through the cache even if the data is already loaded in memory."
      - "Forgetting to invalidate or update the cache when underlying data changes, leading to stale data being served."
    answer: 3
  - q: "MEDIUM: What is a potential drawback of the write-around caching pattern?"
    options:
      - "It caches data on write but skips updating the database until later."
      - "Data written to the database is not immediately cached, so if the same data is read shortly after, it will miss the cache and hit the database (read amplification)."
      - "Write-around caches data in a separate cache specifically for write operations."
      - "Every write triggers a cache eviction for unrelated data due to write-around logic."
    answer: 1
  - q: "MEDIUM: TTL-based cache invalidation vs. event-driven invalidation – which statement correctly contrasts them?"
    options:
      - "TTL-based invalidation relies on timeouts to eventually expire entries (potentially serving stale data until expiry), whereas event-driven invalidation actively removes or updates cache entries when a data change is detected."
      - "Event-driven invalidation cannot be used in distributed systems due to coordination complexity."
      - "TTL-based invalidation requires an external message or signal to expire an entry."
      - "Event-driven invalidation can lead to more stale data than TTL-based because it waits for timeouts."
    answer: 0
  - q: "MEDIUM: A Content Delivery Network (CDN) that fetches content from the origin on a cache miss is an example of which caching strategy?"
    options:
      - "Write-around caching, since the CDN bypasses the origin on cache misses."
      - "Cache-aside caching, since the browser decides when to fetch new content."
      - "Write-through caching, since the CDN writes content to the origin on each request."
      - "Read-through caching, since the edge cache automatically retrieves the content from the origin when it isn't present."
    answer: 3
  - q: "MEDIUM: Amazon DynamoDB Accelerator (DAX) is an example of which type of caching integration pattern for database queries?"
    options:
      - "A cache-aside implementation where the application manually manages DynamoDB data caching."
      - "A distributed read-through cache that also supports write-through behavior to keep DynamoDB and cache synchronized."
      - "A write-behind cache that buffers writes to DynamoDB and applies them asynchronously."
      - "A purely client-side (in-app) cache library used by the application for DynamoDB queries."
    answer: 1
  - q: "MEDIUM: What is a recommended approach to mitigate a cache stampede (dog-pile effect) when many clients request the same item that just expired?"
    options:
      - "Have every client immediately bypass the cache and hit the database on expiration."
      - "Set the cache entry's TTL to 0 so it never expires and a stampede can't occur."
      - "Disable caching for highly contended keys so that only the database is used for those items."
      - "Use a locking or 'single flight' mechanism so that only one request recomputes or fetches the data while others wait, then all can use the refreshed cache entry."
    answer: 3
  - q: "HARD: In a write-behind caching scenario, what is a key risk and how can it be addressed?"
    options:
      - "There's a risk of data loss if the cache node fails before pending writes are flushed to the database. To address this, use measures like persistent write queues or cache replication to ensure durability of queued updates."
      - "Write-behind caches always lock the database during flush, which can be addressed by using a single-threaded database connection."
      - "The database might get overwhelmed by instantaneous writes, which is solved by completely skipping writes to the database."
      - "Clients might read stale data because writes are immediate in write-behind, which is resolved by adding a TTL to every cache entry."
    answer: 0
  - q: "HARD: Netflix's EVCache (built on Memcached and used across AWS regions) primarily replicates cached data across multiple zones for what benefit?"
    options:
      - "To ensure strong consistency by using cross-zone synchronization on every write."
      - "To allow client-side caching without any server-side component."
      - "To implement a write-around strategy that keeps the cache consistent with the database automatically."
      - "To achieve high availability and low-latency access by serving reads from multiple locations and providing redundancy if a node or zone goes down."
    answer: 3
  - q: "HARD: Which metric would be most useful for monitoring a write-behind cache's health in terms of pending writes to the database?"
    options:
      - "Memory usage of the cache server."
      - "Stale-hit ratio, to measure how many cache hits returned expired data."
      - "Cache hit ratio, to see how often reads are served from cache versus the database."
      - "The backlog size of the cache (the number or size of write operations waiting to be flushed to the database)."
    answer: 3
  - q: "HARD: What does a high stale-hit ratio indicate in a caching system's metrics?"
    options:
      - "A significant portion of cache hits are returning data that is outdated (stale), meaning the cache is serving content that has expired or is no longer fresh relative to the source."
      - "The cache is experiencing a high number of failed lookups and errors."
      - "Most of the cache entries are near expiration but still being served before refreshing."
      - "The write throughput to the cache is high compared to read throughput."
    answer: 0
---
