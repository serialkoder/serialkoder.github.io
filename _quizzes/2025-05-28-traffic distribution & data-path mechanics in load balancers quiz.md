---
layout: quiz
title: "Traffic Distribution & Data-Path Mechanics in Load Balancers Quiz"
tags: [system-design]
questions:
  - q: "A load balancer uses round-robin to distribute requests to two servers. Server A has double the CPU and memory of Server B. Under round-robin, both servers get equal traffic and Server B overloads. Which algorithm would better utilize Server A’s extra capacity by sending it more requests?"
    options:
      - "Two Random Choices"
      - "Weighted Round Robin"
      - "IP Hashing"
      - "Least Connections"
    answer: 1

  - q: "Two servers have identical specs, but clients connected to Server X tend to stay connected much longer than those on Server Y. Under equal distribution, Server X becomes overloaded with many open connections. Which load-balancing algorithm alleviates this by routing new clients to the server with fewer active connections?"
    options:
      - "Round Robin"
      - "Least Connections"
      - "Consistent Hashing"
      - "Weighted Round Robin"
    answer: 1

  - q: "A web application stores user session data in-memory on each server. Through the load balancer, a user’s later requests sometimes hit a different server and lose their session. What LB feature should be enabled to ensure each user’s requests go to the same backend that holds their session?"
    options:
      - "HTTP keep-alive"
      - "Round-robin distribution"
      - "Session stickiness/affinity (e.g. via cookie or client IP)"
      - "TLS termination"
    answer: 2

  - q: "An Envoy proxy sits between clients and microservice instances. Clients make many short HTTP/1.1 requests, each opening a new TCP connection to the backend. If Envoy reuses persistent connections (keep-alives) to the microservices instead of opening a new connection per request, what is the primary performance benefit?"
    options:
      - "It avoids the overhead of repeated TCP handshakes by sending multiple requests over one connection."
      - "It ensures each client is always pinned to one server."
      - "It allows multiple requests to be sent in parallel over the same connection without waiting (multiplexing)."
      - "It provides stronger encryption for each request."
    answer: 0

  - q: "A data-center load balancer forwards incoming packets to backend servers but is configured so that each server’s response bypasses the LB and goes directly back to the client. What is this high-performance forwarding mode called?"
    options:
      - "Tunneling mode"
      - "Direct Server Return (DSR)"
      - "Full-proxy NAT mode"
      - "DNS Round Robin"
    answer: 1

  - q: "In a NAT-44 “full-proxy” load balancer mode, the LB accepts a client’s connection and opens a new connection to the server, replacing the source IP. What source IP will the backend server typically see for all incoming requests in this mode?"
    options:
      - "The original client’s IP address"
      - "A unique per-client IP chosen by the LB"
      - "The load balancer’s own IP address"
      - "The loopback (127.0.0.1) on the server"
    answer: 2

  - q: "In a microservices deployment, an Envoy load balancer is using a “least request” algorithm: it randomly picks two servers and forwards the new request to whichever has fewer active connections. What is the main advantage of this “power of two choices” approach over simple round-robin?"
    options:
      - "It guarantees the absolute lowest latency by always choosing an idle server."
      - "It greatly reduces the odds that any one server becomes a hotspot by usually avoiding the more loaded server."
      - "It simplifies configuration compared to weighted algorithms."
      - "It doubles the load balancer’s work by checking two servers for every request."
    answer: 1

  - q: "A global service has servers in multiple regions. The load balancer continuously measures each server’s response times and dynamically sends more traffic to the fastest-responding servers and less to slower ones. Which distribution algorithm is this?"
    options:
      - "GeoDNS routing"
      - "Latency-aware (fastest response time) load balancing"
      - "Least Connections"
      - "Weighted Round Robin"
    answer: 1

  - q: "An array of L4 load balancer instances uses stateless ECMP at the network layer to distribute flows (each packet’s 5-tuple hash decides the backend). The LBs do not share session state. What happens if one load balancer instance suddenly fails?"
    options:
      - "Another LB seamlessly takes over the broken instance’s connections with no impact."
      - "Active connections through that instance are broken, and those clients must reconnect (new flows will hash to the surviving nodes)."
      - "All incoming traffic halts, since stateless load balancing cannot recover from an instance failure."
      - "The router will replay any lost packets to other LB instances."
    answer: 1

  - q: "A service initially used source-IP affinity for stickiness (e.g. Kubernetes Service `sessionAffinity: ClientIP`). However, many users share the same public IP (behind NAT), overloading one server. Switching to cookie-based session affinity helped because:"
    options:
      - "It requires no state tracking on either the client or server."
      - "It encrypts each user’s session data in a cookie for security."
      - "It can differentiate individual user sessions even if many users share an IP, by using a unique cookie per client."
      - "It forces the load balancer to redistribute traffic evenly after each session ends."
    answer: 2

  - q: "A web API is served via an L7 proxy load balancer. Clients use HTTP/1.1, so the LB opens a new backend TCP connection for each request. This overhead is high. The team enables HTTP/2 (or HTTP/3/QUIC) between the LB and servers. Why does this improve efficiency?"
    options:
      - "Because HTTP/2 and QUIC force clients to reuse the same server for all requests."
      - "Because HTTP/2 and QUIC can multiplex many requests over a single persistent connection, reducing connection setup and teardown overhead."
      - "Because HTTP/2 and QUIC use binary encoding and compressed headers to speed up each request."
      - "Because HTTP/2 and QUIC avoid TCP entirely, eliminating handshake latency."
    answer: 1

  - q: "A load balancer is set up in Direct Server Return mode, but the back-end servers reside in a different L3 network (no shared subnet with the LB). To still allow servers to respond directly to clients, what forwarding method could the LB use?"
    options:
      - "Use source NAT (SNAT) so that servers send responses back to the LB’s IP."
      - "Send an HTTP 302 redirect to the client, pointing to the server’s IP address."
      - "Encapsulate client packets to the servers using IP-in-IP or GRE tunneling (so servers get client traffic via a tunnel and can reply directly)."
      - "Use DNS to resolve the load balancer’s name to the server’s IP addresses."
    answer: 2

  - q: "A distributed cache system needs the load balancer to consistently send the same client (or key) to the same backend server to maximize cache hits. It also wants minimal disruption when servers are added/removed (only a small portion of clients remap on changes). Which load balancing technique is best suited for this?"
    options:
      - "Weighted Round Robin with server weights updated on changes"
      - "Consistent hashing (e.g. ring hash or Maglev algorithm)"
      - "Active-passive failover mode"
      - "Least Connections scheduling"
    answer: 1

  - q: "After a new server instance is added to a pool, the load balancer immediately starts sending it a full share of traffic. The new server, with cold caches and not yet optimized, becomes overwhelmed. What load balancer feature would help avoid this by gradually increasing traffic to a new or recovered backend?"
    options:
      - "HTTP/2 priority settings"
      - "Source IP hash affinity"
      - "Slow start (ramp-up) for new servers"
      - "Longer health check intervals"
    answer: 2

  - q: "Under heavy load, clients occasionally time out when opening connections through the LB to a backend service. Investigation shows the application isn’t accepting new TCP connections fast enough. Which tuning knob is most likely to help in this scenario?"
    options:
      - "Increase the server’s listen backlog (queue length for pending connections)."
      - "Use a consistent hashing algorithm for the service."
      - "Limit the number of client connections per second."
      - "Decrease the keep-alive timeout on the load balancer."
    answer: 0

  - q: "A load balancer is proxying large file downloads to many users. Some clients on slow networks cause the LB to buffer a lot of data in memory while sending to them, pushing memory limits. How can this be mitigated through tuning?"
    options:
      - "Allocate more memory to the load balancer to handle the buffering."
      - "Use smaller socket/buffer sizes or flow-control to limit buffering, so the LB doesn’t read more data from the server than the client can consume."
      - "Disable TCP congestion control for faster sending."
      - "Switch to a round-robin packet forwarding mode."
    answer: 1

  - q: "A high-traffic website must handle millions of concurrent connections with minimal added latency. Architects are debating using a cluster of L7 proxy load balancers versus a simpler stateless L4 (ECMP) load balancing approach. What is a key reason to choose the stateless L4 ECMP design in this case?"
    options:
      - "It automatically upgrades client protocols (e.g. HTTP/1.1 to HTTP/2) on the fly for performance."
      - "It makes sticky sessions trivial to implement."
      - "It can scale to extremely high throughput with low overhead, since it forwards packets based on hashes without maintaining per-connection state."
      - "It ensures more intelligent routing decisions by inspecting application-layer data."
    answer: 2

  - q: "A load balancer in SNAT mode (using one virtual IP to source NAT backend connections) is nearing the 64 k port limit to one backend server (ephemeral ports are exhausting). What is a practical way to increase the number of concurrent connections the LB can handle to that server?"
    options:
      - "Enable HTTP/3 (QUIC) for that server to avoid the TCP port limit."
      - "Give the LB multiple source IP addresses to use for outbound connections, increasing the available port pool (e.g. using 2 IPs doubles the connections)."
      - "Use a direct return (DSR) mode so the LB doesn’t track ports anymore."
      - "Turn off keep-alives so ports get freed immediately after each request."
    answer: 1
---
