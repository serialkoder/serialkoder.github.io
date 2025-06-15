---
layout: quiz
title: "CDN Architecture & Data-Path Mechanics Quiz"
tags: [system-design]
questions:
  - q: "Which of the following best describes a tiered caching architecture in a CDN (with edge, mid-tier, and origin shield layers)?"
    options:
      - "Edge servers forward cache misses to a designated mid-tier 'shield' cache, which consolidates requests and caches content to reduce load on the origin."
      - "User requests are routed through multiple edge servers in sequence to balance traffic load before reaching the origin."
      - "Edge caches skip any intermediate cache and always contact the origin on a cache miss to ensure up-to-date content."
      - "Each caching tier simply stores an extra copy of data for redundancy, not to reduce origin traffic."
    answer: 0

  - q: "Which statement correctly highlights a difference between HTTP/2 and HTTP/3 (QUIC)?"
    options:
      - "HTTP/2 cannot multiplex multiple requests on one TCP connection, but HTTP/3 (QUIC) can."
      - "HTTP/3 runs over QUIC (UDP) and avoids head-of-line blocking by handling streams independently, whereas HTTP/2 multiplexes streams over one TCP connection and can suffer head-of-line blocking on packet loss."
      - "HTTP/3 uses TCP but with improved header compression to eliminate delays that HTTP/2 experiences."
      - "HTTP/2 opens a new TCP connection for each request, while HTTP/3 can send all requests over a single connection."
    answer: 1

  - q: "Which of the following correctly compares Anycast routing with DNS-based routing (Geo-DNS) in a CDN?"
    options:
      - "Anycast requires different IP addresses for different PoPs, whereas Geo-DNS uses one global IP address for all PoPs."
      - "Geo-DNS uses BGP routing updates to direct traffic, while Anycast relies on DNS responses to find the nearest PoP."
      - "Anycast uses a single IP address advertised via BGP from multiple PoPs so that traffic is routed to the nearest site, whereas Geo-DNS returns a region-specific IP address via DNS to direct users to a nearby server."
      - "Anycast guarantees instant failover with no routing convergence delay, unlike Geo-DNS which is slow to reroute traffic."
    answer: 2

  - q: "Why do CDNs often terminate TLS (SSL) connections at the edge servers instead of at the origin?"
    options:
      - "Edge servers cannot forward encrypted traffic, so they must decrypt (terminate TLS) and re-encrypt everything."
      - "It allows the CDN to inspect and modify content, but it has no effect on performance or latency."
      - "TLS termination is required at the edge for newer protocols like HTTP/2 and HTTP/3 to function."
      - "It reduces latency for users and offloads the origin server – the TLS handshake is done closer to the client, and the CDN can reuse optimized connections to the origin."
    answer: 3

  - q: "What is the impact of using a larger initial TCP congestion window on content delivery?"
    options:
      - "It allows sending more data immediately when a new connection starts, which can reduce latency for delivering content (especially small objects) by requiring fewer round trips."
      - "It slows down the start of a connection to avoid potential congestion on the network."
      - "It mostly benefits very large file transfers and has no impact on small object delivery."
      - "CDNs avoid increasing the congestion window because sending more than one packet initially always causes packet loss."
    answer: 0

  - q: "In AWS CloudFront, what is the role of a Regional Edge Cache?"
    options:
      - "It is a data center in each AWS region that directly serves as the origin for CloudFront distributions."
      - "It is an additional caching layer between CloudFront edge locations and the origin, with a larger cache that holds objects longer to reduce repeated origin fetches."
      - "It is a feature that routes user requests to the closest CloudFront edge location using regional DNS."
      - "It is an AWS service that automatically replicates your origin data to multiple regions."
    answer: 1

  - q: "How does the connection handshake in HTTP/3 (QUIC) differ from HTTP/2's handshake process?"
    options:
      - "HTTP/3 requires an additional handshake step compared to HTTP/2, making initial connections slower."
      - "HTTP/2 and HTTP/3 use the exact same TLS-over-TCP handshake to establish connections."
      - "HTTP/3 uses a combined QUIC+TLS handshake that can complete with fewer round trips (often 1-RTT) versus HTTP/2's separate TCP and TLS handshakes, reducing connection setup time."
      - "HTTP/2's handshake is faster than HTTP/3's because HTTP/2 doesn't encrypt the initial handshake packets."
    answer: 2

  - q: "Which of the following is true about how CDNs handle large file delivery using techniques like byte-range requests and chunked transfer encoding?"
    options:
      - "If a user requests a byte range of a large file, CDNs typically cannot cache it and must always fetch the entire file from the origin."
      - "Chunked transfer encoding compresses the content of large files to speed up their delivery over the CDN."
      - "CDNs require the entire file to be downloaded from origin before sending any data to the client for large objects."
      - "CDNs can fetch and cache large files in smaller parts via byte-range requests, and often stream these chunks to the client using chunked transfer without waiting for the whole file."
    answer: 3

  - q: "What is a common approach CDNs use to handle a failure of the primary origin server?"
    options:
      - "Configure a secondary (backup) origin and have the CDN automatically switch to it when the primary origin fails health checks."
      - "Simultaneously send every request to both a primary and secondary origin so if one fails, the other already has the response."
      - "Rely on the user's browser to detect the origin is down and automatically retry a different endpoint."
      - "Use Anycast routing to have another origin IP take over the same address instantly on failure."
    answer: 0

  - q: "Why might a CDN server use both NVMe (SSD) and HDD storage tiers for caching, and how are objects managed between these tiers?"
    options:
      - "To ensure every object is stored twice for redundancy — once on NVMe and once on HDD — with no performance consideration."
      - "To use fast but smaller NVMe storage for highly popular content and cheaper, larger HDD storage for infrequently accessed content; the cache automatically moves (promotes) items to NVMe if they become hot."
      - "Because NVMe cannot handle large files, the CDN places large files on HDD and only small files on NVMe."
      - "It isn't actually beneficial — having two storage tiers is just for testing new hardware and doesn't affect content delivery."
    answer: 1

  - q: "Which of the following describes a CDN prefetching strategy and its benefit?"
    options:
      - "It means the CDN only fetches content from origin after the first user request (on a cache miss), which is just normal caching."
      - "Prefetching refers to a browser feature and is not something CDNs do."
      - "The CDN proactively retrieves content from the origin before any user requests it (based on predictions or hints), so the content is already cached and can be served with lower latency when needed."
      - "It involves caching the entire website on every edge server regardless of whether it will be requested, to eliminate origin traffic."
    answer: 2

  - q: "When a CDN PoP goes offline, how do Anycast and DNS-based routing differ in their failover behavior?"
    options:
      - "Anycast will keep sending traffic to the offline PoP until the CDN manually removes it, since the IP address is fixed."
      - "With DNS-based routing, users can be moved away from a failed PoP immediately without waiting, because the CDN updates the DNS entry instantly for all users."
      - "Both Anycast and Geo-DNS rely on the same mechanism (DNS TTL expiry) to redirect traffic when a PoP fails, so they have similar failover times."
      - "Anycast routing will automatically divert users to the next closest PoP once BGP withdraws the failed location (usually within seconds), whereas DNS-based routing must wait for DNS changes to propagate (TTL expiry) to reroute users."
    answer: 3

  - q: "What is request collapsing (also known as request coalescing) in the context of a CDN?"
    options:
      - "Consolidating multiple simultaneous requests for the same resource into one origin fetch and then sharing the response among all the requesting clients."
      - "Breaking a large request into many smaller requests to different origin servers to speed up delivery."
      - "Fetching content from the origin before it's requested (based on prediction) to populate the cache ahead of time."
      - "Using multiple origins to serve different parts of a single request in parallel."
    answer: 0

  - q: "What is a 'surge queue' in CDN architecture, and why is it used?"
    options:
      - "A feature that delays all responses by a small amount to accumulate and batch requests for efficiency."
      - "A mechanism to temporarily hold excess incoming requests when traffic surges beyond capacity, so that the CDN or origin is not overwhelmed and can process them gradually."
      - "A queue where users wait (a virtual waiting room) when the CDN has reached maximum capacity."
      - "An algorithm for prioritizing video streaming traffic during peak times by queueing other content types."
    answer: 1

  - q: "What does enabling Origin Shield in Amazon CloudFront do?"
    options:
      - "It adds an extra TLS encryption layer for all traffic between CloudFront and the origin."
      - "It replicates the origin server's content to every edge location ahead of time to completely avoid origin fetches."
      - "It routes all cache misses from CloudFront edges through a single designated 'Origin Shield' cache location first, which increases cache hit rates and reduces the load on the actual origin server."
      - "It is Amazon's DDoS protection service that blocks malicious traffic from reaching your origin."
    answer: 2
---
