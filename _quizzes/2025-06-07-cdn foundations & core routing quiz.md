---
layout: quiz
title: "CDN Foundations & Core Routing Quiz"
tags: [system-design]
questions:
  - q: "Why does fetching content from a distant origin server typically result in higher latency compared to using a nearby CDN edge server?"
    options:
      - "Because internet protocols add special delays when crossing multiple regional networks."
      - "Because extra DNS lookups are required for distant origin servers, slowing down the response."
      - "Because the data has to travel a longer physical distance over the network, adding propagation delay."
      - "Because the origin server's CPU takes longer to process requests from faraway users."
    answer: 2

  - q: "Which statement correctly compares Anycast routing with Geo-DNS routing in CDNs?"
    options:
      - "Anycast uses one global IP address advertised from many PoPs so that users are routed (via BGP) to the nearest location, whereas Geo-DNS returns region-specific IPs based on the user's DNS query location."
      - "Using Anycast requires assigning different IP addresses for each geographical region, unlike Geo-DNS."
      - "Anycast provides region-specific DNS responses, while Geo-DNS relies on BGP announcements to route traffic."
      - "Geo-DNS typically fails over faster than Anycast because DNS changes propagate almost instantly on the internet."
    answer: 0

  - q: "What is the primary benefit of using an origin shield (mid-tier cache) in a CDN's architecture?"
    options:
      - "It ensures content is permanently stored in cache so it never expires or gets evicted."
      - "It reduces load on the origin by having a centralized cache that aggregates cache misses from edge locations, so the origin sees fewer duplicate requests."
      - "It serves content directly to end-users from within the origin's data center network."
      - "It adds an extra encryption layer between the CDN and origin for enhanced security."
    answer: 1

  - q: "By default, which components of an HTTP request typically make up a CDN cache key?"
    options:
      - "The HTTP method and the content of the request body."
      - "Cookie values and authorization headers from the request."
      - "The client's IP address and the request's User-Agent header."
      - "The request's host (domain) together with the path and query string."
    answer: 3

  - q: "Which HTTP response header instructs a CDN to cache separate variants of a resource based on certain request attributes (for example, caching different content per `User-Agent` or `Accept-Language`)?"
    options:
      - "ETag"
      - "Content-Type"
      - "Vary"
      - "Cache-Control"
    answer: 2

  - q: "Which HTTP header directive would you use to tell a CDN to cache a response for up to one hour?"
    options:
      - "Cache-Control: no-store"
      - "Cache-Control: max-age=3600"
      - "ETag: 3600"
      - "Cache-Control: no-cache"
    answer: 1

  - q: "What is the purpose of the ETag HTTP header in the context of CDN caching?"
    options:
      - "It tags the content so the CDN knows which objects to purge together."
      - "It indicates which content variant (e.g., language or device type) the CDN should serve."
      - "It tells the CDN how long to cache the resource before it expires."
      - "It serves as a unique identifier for a specific version of a resource, allowing a CDN to validate its cached content with the origin (via If-None-Match) instead of refetching the whole object."
    answer: 3

  - q: "In a CDN, what is the difference between a hard purge and a soft purge of cached content?"
    options:
      - "Hard purges only affect one geographic region at a time, whereas soft purges apply globally across all CDN PoPs."
      - "A hard purge immediately invalidates and removes the content from cache (so it won't be served until fetched again), whereas a soft purge marks the content as stale but allows it to be served (and revalidated in the background)."
      - "A soft purge completely deletes the content from all edge servers, while a hard purge leaves it in cache but hidden for a while."
      - "Soft purges are automatic when content expires, whereas hard purges must be triggered manually."
    answer: 1

  - q: "What is an advantage of tag-based cache invalidation (purging by tag) in a CDN?"
    options:
      - "It automatically refreshes any content with that tag whenever one item is updated, without needing a purge call."
      - "It significantly increases the cache lifetime (TTL) of the tagged content."
      - "It is the only way to invalidate content before its TTL expires."
      - "It allows you to invalidate a group of related cached items with a single request by assigning them a common tag (so you don't have to purge each URL one by one)."
    answer: 3

  - q: "Why do content delivery networks typically terminate TLS (SSL) connections at the edge servers?"
    options:
      - "Because browsers only trust certificates presented by CDN edge servers."
      - "To reduce latency for end-users by completing the TLS handshake close to the user, thereby avoiding long round trips to the origin for encryption setup."
      - "Because CDNs cannot pass encrypted traffic to the origin servers."
      - "Because terminating TLS at the edge removes the need to encrypt traffic between the edge and the origin."
    answer: 1

  - q: "Which of the following is a key improvement of the QUIC protocol (used for HTTP/3) compared to traditional HTTP/1.1 or HTTP/2 over TCP?"
    options:
      - "It does not use any encryption, making it faster by avoiding the overhead of TLS."
      - "It runs on top of TCP to ensure reliable delivery, combining the benefits of TCP and UDP."
      - "It establishes connections with lower latency by using UDP with built-in encryption, allowing a secure session to be set up with fewer round-trip handshakes."
      - "It guarantees no packet loss during data transmission, unlike TCP which can lose packets."
    answer: 2

  - q: "In CDN metrics, what does the cache hit ratio represent?"
    options:
      - "The percentage of requests that are served from the cache (without going to the origin) out of the total requests."
      - "The fraction of the CDN's storage capacity currently being used."
      - "The proportion of a cached file that was delivered before the connection closed."
      - "The average time it takes for the CDN to serve a cached object."
    answer: 0

  - q: "What is the 'cache miss penalty' in the context of CDN performance?"
    options:
      - "The extra latency incurred when the CDN must fetch content from the origin because it was not in cache (compared to a cache hit)."
      - "The reduction in cache hit ratio after a piece of content is purged."
      - "A fee charged by the CDN provider each time the origin is contacted for a cache miss."
      - "The longer TTL assigned to content that the CDN had to retrieve from the origin."
    answer: 0

  - q: "In monitoring CDN performance, what does 'p99 latency' refer to?"
    options:
      - "The maximum recorded latency out of every 99 requests."
      - "The 99th percentile latency — the time under which 99% of all requests are completed (only 1% of requests take longer than this)."
      - "The latency experienced by 99 out of 100 users on the site."
      - "The average latency of the fastest 99% of requests."
    answer: 1

  - q: "Which statement correctly describes Amazon CloudFront's caching infrastructure?"
    options:
      - "CloudFront edge locations are only present in a few AWS Regions, rather than globally distributed."
      - "Regional Edge Caches are origin servers provided by AWS that you must use for CloudFront distributions."
      - "CloudFront has a global network of edge locations (PoPs) that serve content to users, and it also uses regional edge caches as a second-tier cache between the edge locations and the origin to improve cache efficiency and reduce origin load."
      - "If an edge location cache misses, CloudFront always goes directly to the origin because it does not have any mid-tier caches."
    answer: 2
---
