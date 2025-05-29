---
layout: quiz
title: "Resilience, Observability & Modern Trends in Load Balancers Quiz"
questions:
  - q: "A web service is deployed on two load-balancer nodes for high availability. In one configuration, both nodes share traffic simultaneously; in another, one node handles traffic while the second stays on standby until needed. Which statement about these two configurations is correct?"
    options:
      - "Active-active setup has no risk of split-brain issues, so no extra coordination is required."
      - "In active-passive mode, only one load balancer actively handles traffic and the other takes over only if the primary fails."
      - "Active-passive clusters maximize resource utilization by balancing traffic across both nodes in normal operation."
      - "Active-active clusters use one node at a time, keeping the second node completely idle during normal operation."
    answer: 1

  - q: "During a routine deployment, you need to temporarily remove one of the application servers from the load balancer's pool. There are active user sessions on that server. How should the load balancer handle this to avoid dropping users’ connections?"
    options:
      - "Immediately close all connections to that server so deployment can proceed."
      - "Stop sending new requests to that server but allow existing connections to finish (graceful connection draining)."
      - "Divert incoming traffic to the removed server’s IP directly from clients."
      - "Continue sending traffic to the server as normal since it is still online."
    answer: 1

  - q: "The SRE team monitors the load balancer using four key metrics: traffic (requests per second), latency, errors, and saturation (resource usage). They set up alerts when error rates or latency exceed SLO thresholds. What monitoring approach are they following with these metrics?"
    options:
      - "Implementing canary release practices."
      - "Ensuring active-passive failover is working."
      - "Tracking the “golden signals” of system health."
      - "Applying the CAP theorem to operations."
    answer: 2

  - q: "Your web application is under attack from malicious requests containing SQL-injection attempts and other exploits. You want the load balancer to inspect and block these dangerous HTTP payloads before they reach your servers. Which feature should be enabled?"
    options:
      - "Rate limiting for all incoming requests."
      - "A Web Application Firewall (WAF) on the load balancer."
      - "Mutual TLS authentication for all clients."
      - "Round-robin DNS load balancing."
    answer: 1

  - q: "One client is calling your API thousands of times per minute, causing performance issues for other users. The traffic is legitimate but overwhelming. What load-balancer feature can prevent a single client from consuming all resources at the expense of others?"
    options:
      - "Increase the number of server instances indefinitely."
      - "Switch to an active-passive load balancer cluster."
      - "Enforce rate limiting on the client’s requests at the load balancer."
      - "Enable TLS passthrough for that client’s connections."
    answer: 2

  - q: "In an active-passive HA load-balancer setup, the standby instance must detect when the active instance goes down. How is this typically accomplished?"
    options:
      - "The passive node remains idle and only becomes active when manually triggered by an operator."
      - "The passive node uses a slower network link to verify the active node’s status."
      - "The passive node continuously monitors the active via heartbeat messages or health checks and takes over if it stops responding."
      - "The passive node processes the same traffic in parallel to stay in sync with the active node."
    answer: 2

  - q: "You have two load-balancer appliances in an active-active cluster. If the network link between them fails, each one might assume the other is dead and take full control, resulting in both acting as primary (a split-brain scenario). What design measure can prevent this?"
    options:
      - "Fall back to active-passive mode so only one node can ever be primary at a time."
      - "Use a quorum or tie-breaker mechanism so that a majority decision is needed before a node declares itself primary."
      - "Increase the frequency of heartbeat health checks between the two nodes."
      - "Configure both nodes to share the same IP address simultaneously at all times."
    answer: 1

  - q: "Your web service handles normal traffic fine, but when a sudden surge of clients all connect at once, the back-end servers are momentarily overwhelmed by the initial flood of new requests. Which load-balancer feature helps protect the servers by smoothing out such traffic bursts?"
    options:
      - "Using an active-active load balancer setup across data centers."
      - "Surge protection, to queue or throttle incoming connection spikes before they hit the servers."
      - "Connection draining, to gradually remove servers from rotation during deploys."
      - "Weighted round-robin load balancing across servers."
    answer: 1

  - q: "The team has implemented distributed tracing for their microservices. They want the load balancer to participate in traces as well by adding a unique trace-ID header and recording forwarding latency. What does this enable?"
    options:
      - "The load balancer to route repeat requests from the same user to the same server."
      - "End-to-end visibility of each request through the load balancer and onward (full distributed tracing)."
      - "Zero downtime deployments through the load balancer."
      - "The load balancer to perform AI-based traffic-steering decisions."
    answer: 1

  - q: "A company deploys a service mesh with sidecar proxies like Envoy for each microservice instead of relying only on a central load balancer for service-to-service traffic. Which is an advantage of this sidecar-based approach?"
    options:
      - "It removes all network overhead by eliminating the need for proxies or load balancers."
      - "It dramatically simplifies configuration by having a single global load balancer for everything."
      - "It allows fine-grained control over traffic between services (local routing, retries, mTLS encryption) to improve resilience and security."
      - "It uses far less memory and CPU since each service gets its own proxy rather than a shared load balancer."
    answer: 2

  - q: "In a zero-trust architecture, all client-service connections must use mutual TLS (mTLS) for authentication. How can you configure the load balancer to enforce this while keeping the TLS connection end-to-end between client and server?"
    options:
      - "Run the load balancer in TLS passthrough mode so that clients and servers establish a mutual TLS connection directly."
      - "Terminate TLS on the load balancer and use one-way TLS (server-only certificates) on the connections to the servers."
      - "Use unencrypted HTTP between the load balancer and the servers since the client was already authenticated."
      - "Offload TLS at the load balancer and rely on network firewall rules for authentication to the servers."
    answer: 0

  - q: "A startup expects a huge traffic spike during a one-day product launch. Their cloud load balancer can scale up, but it takes a few minutes to provision new capacity once the surge begins. What should they do beforehand?"
    options:
      - "Rely on auto-scaling to react instantly as the traffic spike happens."
      - "Pre-warm the load balancer by gradually sending test traffic or requesting a capacity increase in advance of the event."
      - "Increase the DNS TTL value so clients cache the load balancer’s address longer."
      - "Direct traffic to a single large backend instance to handle the surge temporarily."
    answer: 1

  - q: "A microservices platform notices high CPU usage and added latency from running a sidecar proxy alongside each service for load balancing. To reduce user-space overhead, they consider performing load balancing in the Linux kernel instead. Which technology enables this?"
    options:
      - "Deploying a dedicated hardware load balancer appliance."
      - "Long-lived TCP keep-alives to reduce connection setup overhead."
      - "eBPF with XDP, allowing custom packet processing in the kernel’s networking stack."
      - "DNS round-robin with very low TTL values."
    answer: 2

  - q: "An e-commerce company wants to run custom code (for user authorization and dynamic content) at the edge of the network within CDN or load-balancer nodes. What is this architectural trend called?"
    options:
      - "Active-passive failover clustering."
      - "Horizontal pod autoscaling."
      - "Edge computing – running functions and logic at edge load balancer locations."
      - "Centralized monolithic architecture."
    answer: 2

  - q: "A security policy mandates end-to-end encryption, so the load balancer is configured for TLS passthrough (it forwards encrypted traffic without decrypting). What is one significant limitation of this setup?"
    options:
      - "The load balancer cannot inspect or modify the HTTP payload (e.g., for WAF filtering or header injection) since it never decrypts the traffic."
      - "The load balancer must switch to a non-HTTPS protocol for upstream communication."
      - "Clients that don’t support TLS cannot connect until the policy is removed."
      - "The load balancer can no longer distribute traffic to multiple backend servers."
    answer: 0

  - q: "A popular API is served via load balancers in several regions. The team wants to enforce a global rate limit per user across all these distributed instances. What is a common solution?"
    options:
      - "Set the rate limit threshold higher on each individual load balancer to account for multiple instances."
      - "Use a centralized coordination service (or distributed token bucket) that all load balancers consult to track and enforce the global rate limit."
      - "Let each load balancer enforce its own rate limit independently and hope it naturally balances out across regions."
      - "Only allow one regional load balancer to be active for all users at any given time."
    answer: 1

  - q: "A company’s infrastructure includes global anycast load balancing, a service mesh with sidecar proxies, and eBPF-based optimizations in the kernel. Engineers are finding it challenging to manage. What is a primary drawback of such a highly complex, multi-layer load-balancing architecture?"
    options:
      - "A significant decrease in overall system availability due to too much redundancy."
      - "Increased operational complexity in configuring, coordinating, and debugging across so many interacting layers."
      - "Significantly higher latency for all traffic compared to using a single simple load balancer."
      - "Inability to implement end-to-end encryption (mTLS) with so many components."
    answer: 1

  - q: "In a high-availability pair of load balancers, the secondary needs to seamlessly take over traffic if the primary fails—without clients noticing. What technique is used to achieve this transparent failover?"
    options:
      - "Rely on DNS failover by having the secondary’s IP replace the primary’s in DNS when a failure is detected."
      - "Both load balancers share a virtual IP address, which the secondary will assume (advertise) if the primary goes down."
      - "The secondary hijacks the primary’s MAC address to directly intercept packets intended for the primary."
      - "Each load balancer uses a unique IP, and clients are instructed to connect to the second IP if the first one fails."
    answer: 1
