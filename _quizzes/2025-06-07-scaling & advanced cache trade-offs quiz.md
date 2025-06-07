---
layout: quiz
title: "Scaling & Advanced Cache Trade-offs Quiz"
questions:
  - q: "EASY: In a distributed caching cluster, what is a primary benefit of using consistent hashing for key distribution when resharding (adding or removing nodes)?"
    options:
      - "It eliminates the need to rebalance data when the cluster size changes"
      - "It guarantees each node has an identical share of keys at all times"
      - "It stores each key on every node to achieve consistency"
      - "It minimizes the number of keys that need to be moved when a node is added or removed"
    answer: 3

  - q: "EASY: What is an example of horizontal scaling in a caching system?"
    options:
      - "Upgrading the cache server with more memory and a faster CPU"
      - "Adding more cache servers in parallel to handle increased load"
      - "Using a single cache server to eliminate network overhead"
      - "Reducing the amount of cached data to keep it within one server"
    answer: 1

  - q: "EASY: In system performance metrics, what does 'p99 latency' refer to?"
    options:
      - "The maximum latency observed for any request"
      - "The average latency of the slowest 1% of requests"
      - "The 99th percentile latency (the time under which 99% of requests complete)"
      - "The latency of the 99th request in a batch of 100 requests"
    answer: 2

  - q: "EASY: Which of the following lists cache storage mediums in order from lowest latency to highest latency?"
    options:
      - "DRAM < Persistent Memory (PMEM) < SSD"
      - "SSD < DRAM < PMEM"
      - "DRAM < SSD < PMEM"
      - "SSD < PMEM < DRAM"
    answer: 0

  - q: "EASY: What is a primary benefit of geo-replicating cache data across multiple regions?"
    options:
      - "It guarantees identical response times for users worldwide"
      - "It eliminates the need to ever invalidate cached data"
      - "It reduces access latency by serving data from the nearest location to the user"
      - "It halves the storage requirements by duplicating data in multiple places"
    answer: 2

  - q: "MEDIUM: In a replicated cache cluster using quorum-based failover, why is a quorum (majority) of nodes required to agree on leader changes?"
    options:
      - "To guarantee zero increase in latency during a failover event"
      - "To prevent split-brain by ensuring only one group of nodes can elect a new leader"
      - "So that one node can always be kept idle as a hot standby leader"
      - "Because reads must be served from a majority of nodes to maintain consistency"
    answer: 1

  - q: "MEDIUM: In a multi-tier cache hierarchy (for example, an L1 cache on the app server and an L2 distributed cache), what is one advantage of having an L1 cache?"
    options:
      - "It requires using twice the memory but provides no performance benefit"
      - "It ensures the cache is always consistent with the database without any invalidation"
      - "It eliminates the need for an L2 cache entirely if an L1 cache is present"
      - "It reduces latency by serving frequently accessed data from a cache local to the application"
    answer: 3

  - q: "MEDIUM: A certain cache key is receiving an extremely high volume of requests, creating a hotspot. Which technique can help distribute this load?"
    options:
      - "Using an indirection layer to map the hot key to multiple cache keys across nodes (key fanning) to spread the traffic"
      - "Disabling caching for that hot key so all requests go directly to the database"
      - "Moving the hot key's data to a slower storage medium to reduce request frequency"
      - "Using a single dedicated cache server exclusively for that hot key"
    answer: 0

  - q: "MEDIUM: Why might a large-scale cache disable compression for very small objects?"
    options:
      - "Because compressing small objects always risks corrupting their data in the cache"
      - "Because the compression overhead (CPU and metadata) can outweigh any size savings for tiny objects"
      - "Because caches cannot compress objects below a certain size due to system limitations"
      - "Because small objects are too tiny for any compression algorithm to handle"
    answer: 1

  - q: "MEDIUM: Cloudflare's CDN uses an edge microcache in its architecture. What is the role of this edge microcache?"
    options:
      - "It permanently stores all content at every edge server to completely eliminate origin traffic"
      - "It is a cache in the end-user's browser controlled by Cloudflare to speed up repeat visits"
      - "It only caches large media files (images and videos) at the edge and ignores other content"
      - "It caches content at edge servers for a short time to absorb traffic bursts and reduce load on the origin"
    answer: 3

  - q: "MEDIUM: Facebook's Memcached tier scaled to handle billions of requests per second. Which approach was key to achieving this scale?"
    options:
      - "They replaced Memcached with a relational database to handle all read requests"
      - "They used a single gigantic cache server with terabytes of RAM to avoid sharding"
      - "They deployed a two-tier caching system with a local L1 cache on each app server and a large L2 Memcached cluster"
      - "They offloaded caching to user browsers (via cookies) instead of using server-side caches"
    answer: 2

  - q: "HARD: In a distributed cache cluster, coordinating evictions across nodes and using an admission policy (like TinyLFU) can improve efficiency. What is the main purpose of an admission policy?"
    options:
      - "To prevent cache thrashing by filtering out low-value (one-hit) items from being inserted, reducing unnecessary evictions"
      - "To replicate every cached item to all nodes upon insertion for strong consistency"
      - "To only evict items after every node in the cluster agrees on it via consensus"
      - "To bypass the cache for all write operations, caching only read operations"
    answer: 0

  - q: "HARD: To reduce tail latency in a distributed service, a technique called 'request hedging' can be used. What does request hedging involve?"
    options:
      - "Partitioning a single client request into multiple sub-requests processed in parallel on one server"
      - "Sending the same request to multiple servers or replicas and using whichever response arrives first"
      - "Delaying incoming requests slightly to see if a faster path becomes available before processing"
      - "Automatically canceling any request that exceeds a predefined p99 latency threshold"
    answer: 1

  - q: "HARD: In a multi-tier caching setup, what is a potential issue caused by propagation delay between the L1 and L2 caches?"
    options:
      - "The application may read stale data from the L1 cache if it hasn't been updated or invalidated yet with the latest write"
      - "The L2 cache will always have more up-to-date data than the origin database"
      - "The L1 cache might overwrite newer data in L2 due to asynchronous writes"
      - "Propagation delays cause both L1 and L2 caches to evict the same item at exactly the same time"
    answer: 0

  - q: "HARD: In a distributed cache cluster, one shard shows a much higher eviction rate and slower p99 latency than others. What is the most likely explanation?"
    options:
      - "That shard is running on faster hardware, which causes it to evict items more frequently"
      - "The consistent hashing algorithm designates one node to evict data on behalf of the entire cluster"
      - "Other shards have effectively infinite capacity, so only this shard performs evictions"
      - "That shard is handling a disproportionately large share of requests or data (a shard imbalance/hotspot), leading to more evictions and higher tail latency"
    answer: 3
