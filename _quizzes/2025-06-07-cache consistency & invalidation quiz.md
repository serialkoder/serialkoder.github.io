---
layout: quiz
title: "Cache Consistency & Invalidation Quiz"
tags: [system-design]
questions:
  - q: "EASY: Which statement accurately describes eventual consistency in a distributed cache?"
    options:
      - "Every read receives the most up-to-date value immediately after a write."
      - "It guarantees full ACID properties for all cache operations across nodes."
      - "After a write, some reads may return stale data, but all caches converge to the latest value given enough time."
      - "It sacrifices availability to ensure no stale data in any cache."
    answer: 2

  - q: "EASY: What is a primary benefit of using a TTL (time-to-live) for cache entries?"
    options:
      - "It prevents stale data from lingering indefinitely by evicting entries after a set time."
      - "It guarantees cache entries always reflect the most recent database state."
      - "It triggers an automatic refresh of expired cache entries from the database."
      - "It allows cache entries to remain indefinitely until memory runs out."
    answer: 0

  - q: "EASY: Which of the following is an example of active cache invalidation?"
    options:
      - "Cache entries simply expire after a fixed time interval without external triggers."
      - "Users manually clear or refresh cached content when it becomes outdated."
      - "The application checks the database on every read to validate cache freshness."
      - "An update event is published to all cache nodes to invalidate an entry immediately after a write."
    answer: 3

  - q: "EASY: What is a common strategy to prevent a cache stampede (thundering herd) when a popular item expires?"
    options:
      - "Remove the cache for popular items so data is always fetched directly from the database."
      - "Allow only one request to refresh an expired cache entry while other requests either wait or use the stale value."
      - "Immediately expire a popular cache item for all users, forcing them all to retrieve fresh data at once."
      - "Use an extremely short TTL on popular items so they refresh constantly."
    answer: 1

  - q: "EASY: In a write-through caching strategy, what happens when an application updates a cached data item?"
    options:
      - "The data is written only to the cache, assuming it will later synchronize to the database automatically."
      - "The database is updated first and the cache remains unchanged for this operation."
      - "The data is written to both the cache and the database at the same time."
      - "The cache is updated now, and the database update is deferred to a later time."
    answer: 2

  - q: "MEDIUM: Which metric specifically measures the delay between an update to the source data and the cache reflecting that update?"
    options:
      - "Fresh-hit ratio"
      - "Invalidation latency"
      - "Stale-read count"
      - "Cache hit ratio"
    answer: 1

  - q: "MEDIUM: What is a likely consequence of setting an extremely short TTL (time-to-live) for cache entries?"
    options:
      - "The cache will serve much more stale data than if the TTL were longer."
      - "Cache memory usage will continually increase since expired entries never get evicted."
      - "Clients will rarely need to access the database because the cache constantly refreshes items so frequently."
      - "Many requests will bypass the cache and hit the database, greatly reducing the cache hit rate."
    answer: 3

  - q: "MEDIUM: What is an advantage of active cache invalidation (e.g., via pub/sub) compared to relying solely on TTL expiration?"
    options:
      - "It eliminates the need to ever expire cache entries, since they will all be kept consistent automatically."
      - "It avoids adding any extra complexity or systems beyond the caching layer."
      - "It clears or updates cache entries almost immediately after the source data changes, minimizing stale data duration."
      - "It makes maintaining cache consistency simpler than using TTL expiration policies."
    answer: 2

  - q: "MEDIUM: How does a 'stale-while-revalidate' strategy help in a caching system?"
    options:
      - "It serves the old cached value to requests even after it expires, while triggering a background refresh for the new value."
      - "It locks the cache entry after expiration until the new data is fetched, forcing all requests to wait."
      - "It updates the cache entry just before it expires, so users never see stale data."
      - "It invalidates the cache entry on all nodes at once to avoid any node serving stale data."
    answer: 0

  - q: "MEDIUM: Which of the following is a risk associated with using a write-back (write-behind) cache under concurrent write conditions?"
    options:
      - "All writes become slower because each cache write is immediately followed by a database write."
      - "Write-back caching guarantees the cache and database remain in sync at all times, so consistency is not a concern."
      - "The database may be overwhelmed by a large batch of writes when the cache eventually flushes its updates."
      - "If a cache node crashes before flushing, recent writes held in the cache can be lost and not reach the database."
    answer: 3

  - q: "MEDIUM: What is a common approach to validate that a cached entry is still fresh using versioning?"
    options:
      - "Store a version identifier (e.g., a timestamp or ETag) with the cache entry and compare it to the source version on access."
      - "Rely on an LRU (Least Recently Used) policy to evict older cache entries to keep data fresh."
      - "Clear the entire cache whenever the underlying database has any update."
      - "Use consistent hashing for cache keys to ensure outdated entries are automatically avoided."
    answer: 0

  - q: "HARD: In a distributed cache invalidation system using a message bus, which failure scenario can lead to caches serving stale data?"
    options:
      - "The messaging system guarantees delivery of every invalidation event, so caches cannot miss an update."
      - "A cache node misses an invalidation message due to a network issue, and continues serving an out-of-date entry."
      - "If the invalidation bus goes down, caches automatically refresh all entries by checking the database."
      - "Using a single centralized cache for all clients ensures no stale data even if invalidation messages are lost."
    answer: 1

  - q: "HARD: In a write-back caching scenario with multiple clients updating the same data concurrently, what potential consistency issue can occur?"
    options:
      - "If two updates happen in quick succession, an earlier cached value might be written to the database after a newer one, causing the newer update to be overwritten."
      - "No consistency issues occur; the latest cache write will always end up as the final value in the database."
      - "Write-through caches are actually more likely to lose an update than write-back caches in concurrent scenarios."
      - "The cache will merge both updates and write the combined result to the database automatically."
    answer: 0

  - q: "HARD: What is a trade-off when using strong consistency for distributed caches across multiple nodes?"
    options:
      - "It guarantees the lowest latency reads because each cache node can serve data without any coordination."
      - "It can increase latency or reduce availability under certain conditions, since caches must coordinate to ensure up-to-date data."
      - "It sacrifices data freshness to maintain system availability during network failures."
      - "It provides up-to-date data with no drawbacks in latency or availability for the system."
    answer: 1

  - q: "HARD: If a caching system reports a fresh-hit ratio of 50%, what does this imply?"
    options:
      - "Half of all requests to the system were served from cache rather than the database."
      - "The cache was not reachable for 50% of the time, forcing requests to go to the database."
      - "Only 50% of the cache hits returned non-stale (fresh) data, while the other half of hits were serving stale data."
      - "Half of the entries in the cache have expired at any given time."
    answer: 2
---
