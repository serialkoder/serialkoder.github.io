---

layout: quiz
title: "Layer-4 Load Balancer Request Flow Quiz"
tags: [system-design]
questions:
  - q: "At a Layer 4 load balancer, which information is used as the key when creating (or looking up) a connection-tracking entry for a new TCP flow?"
    options:
      - "The full HTTP request line"
      - "The 5-tuple (source IP, source port, destination IP, destination port, protocol)"
      - "Only the destination IP and port"
      - "A randomly generated flow ID"
    answer: 1

  - q: "In a DNAT/SNAT (a.k.a. one-arm NAT) forwarding mode, what does the load balancer do to the first packet before sending it to the chosen backend?"
    options:
      - "Adds a Proxy-Protocol header"
      - "Rewrites the destination IP (and sometimes source IP) to the backend’s IP"
      - "Encrypts the payload with TLS"
      - "Fragments the packet to fit the backend MTU"
    answer: 1

  - q: "Which event usually triggers the load balancer to select a backend and create the conntrack entry for a TCP connection?"
    options:
      - "Reception of the first TCP SYN"
      - "Completion of the three-way handshake"
      - "Reception of the first application data byte"
      - "A periodic scheduler tick"
    answer: 0

  - q: "Which Layer 4 forwarding mode lets the backend server send its responses **directly** to the client without passing back through the load balancer?"
    options:
      - "Full TCP Proxy"
      - "DNAT/SNAT"
      - "Direct-Server-Return (DSR)"
      - "TLS Termination"
    answer: 2

  - q: "When a Layer 4 load balancer operates as a full TCP proxy, how many distinct TCP connections exist for a single client flow?"
    options:
      - "1 (end-to-end connection only)"
      - "2 (client→LB and LB→backend)"
      - "3 (client→LB, LB→health-checker, health-checker→backend)"
      - "Variable; depends on the congestion window"
    answer: 1

  - q: "For a pure UDP service handled by an L4 LB, what typically determines how long a flow’s conntrack entry is kept before being removed?"
    options:
      - "The number of packets sent"
      - "A fixed idle-timeout since the last datagram"
      - "The size of the largest datagram"
      - "Whether the LB is in DSR mode"
    answer: 1

  - q: "Which statement best describes the amount of application-layer inspection a classic Layer 4 load balancer performs?"
    options:
      - "It fully parses HTTP headers for routing."
      - "It decrypts TLS to inspect URLs."
      - "It examines only transport-layer headers (IP, TCP/UDP ports, protocol)."
      - "It scans the full payload for malware."
    answer: 2

  - q: "Why does a Layer 4 load balancer run active health checks against its backend targets?"
    options:
      - "To generate detailed HTTP analytics"
      - "To ensure new flows are not sent to unhealthy servers"
      - "To reassemble fragmented IP packets"
      - "To negotiate TLS certificates automatically"
    answer: 1

  - q: "Consistent-hash algorithms like Google-Maglev are often used in L4 load balancers because they primarily provide which benefit?"
    options:
      - "Higher TLS encryption speed"
      - "Minimal flow disruption when backends are added or removed"
      - "Automatic DDoS mitigation"
      - "Support for HTTP/3"
    answer: 1

  - q: "Enabling source-IP stickiness on a Layer 4 load balancer causes which change in behaviour?"
    options:
      - "All new TCP connections from the same client IP are hashed to the same backend for a period of time."
      - "The LB terminates TLS sessions on behalf of the backend."
      - "UDP flows are converted into TCP for reliability."
      - "The LB uses least-connections instead of round-robin."
    answer: 0
---
