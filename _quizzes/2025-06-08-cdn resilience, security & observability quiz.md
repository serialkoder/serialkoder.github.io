---
layout: quiz
title: "CDN Resilience, Security & Observability Quiz"
tags: [system-design]
questions:
  - q: "What does a CDN typically do as part of its auto fail-out/fail-in mechanism when a PoP (Point of Presence) is detected as unhealthy?"
    options:
      - "Temporarily remove the PoP from service (fail-out) until it passes health checks again (fail-in)."
      - "Permanently shut down the PoP and require manual intervention to bring it back."
      - "Redirect additional traffic to that PoP to test if it will recover."
      - "Continue sending traffic to the PoP as normal, assuming it will recover on its own."
    answer: 0

  - q: "Which statement describes a trade-off between using an anycast network for DDoS mitigation and using a centralized scrubbing center?"
    options:
      - "A centralized scrubbing center always has lower latency for all users compared to an anycast approach."
      - "Anycast spreads attack traffic across multiple PoPs to absorb volume, whereas a centralized scrubbing center can deeply filter traffic in one location but may add latency and a potential bottleneck."
      - "Anycast always provides better DDoS protection with no downsides compared to a scrubbing center."
      - "Anycast networks are not used for DDoS defense, only centralized scrubbing can stop attacks."
    answer: 1

  - q: "Which AWS WAF rule would you use to block or allow users based on their country of origin?"
    options:
      - "AWS Shield Advanced with automatic geographic blocking."
      - "An AWS CloudFront signed URL policy with location constraint."
      - "A rate-based rule in AWS WAF configured with request thresholds."
      - "A geo-match rule in AWS WAF to filter requests by country."
    answer: 3

  - q: "What feature can automatically block clients who send too many requests in a short time to your AWS CloudFront distribution?"
    options:
      - "An AWS WAF rate-based rule to throttle or block excessive requests."
      - "AWS Shield Standard DDoS protection."
      - "An AWS WAF geo-match rule restricting requests by country."
      - "An Amazon CloudWatch alarm on high request rate."
    answer: 0

  - q: "Which of the following is NOT a recommended best practice for securing TLS connections in a CDN?"
    options:
      - "Using OCSP stapling for the CDN's TLS certificates."
      - "Enabling support for TLS 1.3 on CDN edge servers."
      - "Disabling mutual TLS (mTLS) between the CDN and origin to simplify configuration."
      - "Regularly rotating and renewing the CDN's TLS certificates and keys."
    answer: 2

  - q: "When would using a signed cookie be more appropriate than using signed URLs for CDN content access control?"
    options:
      - "When the client's browser does not support cookies."
      - "When you need to enforce a unique token for every individual request."
      - "When a user should be granted access to multiple protected resources after a single authentication."
      - "When each file needs a unique URL signature and expiration."
    answer: 2

  - q: "Which of the following describes a behavioral analysis technique for bot detection on a CDN?"
    options:
      - "Fingerprinting the TLS handshake of clients (e.g., using JA3) to identify bots."
      - "Presenting a CAPTCHA challenge that users must solve to proceed."
      - "Blocking requests from IP addresses known to belong to bots or data centers."
      - "Analyzing user interaction patterns (e.g., mouse movements, timing of actions) to detect non-human behavior."
    answer: 3

  - q: 'Which metric is NOT typically considered one of the CDN "golden signal" performance indicators?'
    options:
      - "HTTP error rate (segmented by 4xx and 5xx status codes)."
      - "The total number of PoPs (points of presence) deployed globally."
      - "Cache hit ratio (percentage of requests served from cache)."
      - "Edge network round-trip time (latency from user to edge)."
    answer: 1

  - q: "What is an error budget burn rate in the context of SLO (Service Level Objective) monitoring?"
    options:
      - "The proportion of total requests that result in errors."
      - "The percentage of CPU time spent on serving error responses."
      - "The rate at which the servers are overheating under load."
      - "The speed at which the service is exhausting its allowed error budget (i.e., how fast it's using up its tolerated errors)."
    answer: 3

  - q: "Why would a multi-CDN strategy use Real User Monitoring (RUM) data for routing?"
    options:
      - "To switch all traffic between CDNs on a fixed schedule regardless of performance."
      - "To randomly assign users to different CDNs to spread traffic evenly."
      - "To dynamically route each user to the CDN that is performing best for them based on real user performance metrics."
      - "To send each user request to all CDNs simultaneously for redundancy."
    answer: 2

  - q: "What is the purpose of a surge queue in a CDN architecture?"
    options:
      - "To hold new user requests until previous user sessions have finished."
      - "To intentionally delay responses to throttle user traffic."
      - "To temporarily buffer excess requests during sudden traffic spikes so that origin or backend servers are not overwhelmed."
      - "To process all incoming requests strictly one at a time rather than in parallel."
    answer: 2

  - q: "What is an advantage of maintaining warm-spare PoPs (points of presence) in a CDN?"
    options:
      - "They can quickly take over handling traffic if active PoPs fail or become overloaded, improving resilience."
      - "They compress and cache content without ever serving users, saving bandwidth."
      - "They ensure each user request is processed by two PoPs for redundancy."
      - "They run with zero traffic to conserve energy, incurring no operational cost."
    answer: 0

  - q: "Which of these is a clear indicator that a CDN PoP is nearing capacity saturation?"
    options:
      - "The cache hit ratio at the PoP has increased significantly."
      - "The PoP is handling fewer requests per second over time."
      - "End-user latency to that PoP is steadily decreasing."
      - "The PoP's servers are running at consistently high CPU and bandwidth utilization."
    answer: 3

  - q: "What is one benefit of terminating client connections with TLS 1.3 on a CDN edge server instead of TLS 1.2?"
    options:
      - "TLS 1.3 automatically trusts self-signed certificates, unlike TLS 1.2."
      - "TLS 1.3 allows the CDN to serve content without needing TLS certificates."
      - "TLS 1.3 can establish encrypted connections with fewer round trips (lower handshake latency) than TLS 1.2."
      - "TLS 1.3 does not use encryption, making it faster than TLS 1.2."
    answer: 2

  - q: "Which is a feature of AWS Shield Advanced that is not available with AWS Shield Standard?"
    options:
      - "Globally anycasted traffic distribution across AWS's network."
      - "24/7 access to AWS's DDoS Response Team and financial protection against unexpected DDoS-related cost spikes."
      - "Automatic mitigation of all web application vulnerabilities without configuration."
      - "The ability to absorb any size DDoS attack without any limit."
    answer: 1
---
