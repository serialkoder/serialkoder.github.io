---
layout: quiz
title: "Foundations & Layering of Load Balancing Quiz"
questions:
  - q: "Users in different continents are experiencing high latency when accessing a service hosted in a single data center. How can load balancing help reduce response times for these users?"
    options:
      - "Deploy servers in multiple regions and use a global load-balancing strategy (e.g., geoDNS or anycast) to route each user's request to the nearest server location."
      - "Install a Layer 2 switch in the network to optimize packet routing for long-distance connections."
      - "Increase the number of servers in the original data center so each user's request is handled faster by the expanded pool."
      - "Have users adjust their network OSI-layer settings on their devices to better accommodate long-distance traffic."
    answer: 0

  - q: "After implementing a new load balancer, one backend server is handling significantly more traffic than the others even though all servers have identical capacity. Which configuration issue is MOST likely the cause?"
    options:
      - "The load balancer has session persistence (sticky sessions) enabled, causing many returning users to stick to the same server."
      - "The load balancer is using a simple round-robin algorithm to distribute traffic evenly among servers."
      - "The virtual IP (VIP) was not configured on the load balancer, so only one server is receiving traffic."
      - "Health-check intervals are too frequent, overwhelming one server with probes instead of distributing them."
    answer: 0

  - q: "An organization wants users worldwide to connect to a single URL and be automatically directed to the nearest data center for lower latency. Which load-balancing technique best accomplishes this?"
    options:
      - "Using an Anycast IP address announced from multiple data centers so that user traffic is routed to the nearest location."
      - "Requiring users to manually select their geographic region on the website before connecting."
      - "Deploying a Layer 7 load balancer in one central data center and routing all traffic through it."
      - "Configuring a single large server to proxy and forward requests to all other data centers as needed."
    answer: 0

  - q: "Which scenario is an example of Layer 7 (application-layer) load balancing?"
    options:
      - "Routing HTTP requests to different server pools based on the URL path in the request."
      - "Distributing traffic using round-robin DNS entries without inspecting any request content."
      - "Forwarding network packets to servers based only on destination IP address and port number."
      - "Using BGP anycast routing to send users to the nearest server location without regard to HTTP details."
    answer: 0

  - q: "A new web service uses HTTP/3, which runs over QUIC (UDP). The existing L7 proxy supports only HTTP/1.1 and HTTP/2 over TCP. What must be true for the load balancer to handle HTTP/3 traffic?"
    options:
      - "The load balancer must be capable of handling UDP at the transport layer (either via an upgrade or a new load balancer that supports QUIC)."
      - "No changes are needed; if the load balancer supports HTTP/2, it will automatically support HTTP/3."
      - "The service must force HTTP/3 clients to downgrade to HTTP/1.1 or HTTP/2 so the load balancer can process the traffic."
      - "Replace the load balancer with a DNS-based strategy, since DNS is required for any QUIC traffic."
    answer: 0

  - q: "After switching to a Layer 7 load balancer, backend logs show the load balancer's IP as the client IP. Why, and how can this be fixed?"
    options:
      - "The L7 load balancer terminates the client connection and opens a new one to the server, so the server sees the LB's IP. Enable X-Forwarded-For headers or Proxy Protocol to pass along the original client IP."
      - "The load balancer is using NAT at Layer 4, so the original IP is lost; switching to Layer 7 mode would resolve it."
      - "It is a fundamental requirement of the OSI model that the client IP be hidden when passing through a load balancer."
      - "This wouldn't actually happen; load balancers always preserve the original client IP by default."
    answer: 0

  - q: "A team wants to offload SSL/TLS encryption work from backend servers by terminating TLS at the load balancer. What kind of load balancer do they need?"
    options:
      - "An application-layer (Layer 7) load balancer that can terminate SSL/TLS and inspect HTTP requests before forwarding."
      - "A transport-layer (Layer 4) load balancer, because it can pass through encrypted traffic without handling certificates."
      - "A DNS load balancer, since DNS strategies distribute TLS handshakes across servers."
      - "Any load balancer will automatically handle TLS offloading by default."
    answer: 0

  - q: "A Layer 4 load balancer routes traffic by forwarding packets to backend servers without modifying application content. What information does it primarily use to make routing decisions?"
    options:
      - "Network addresses and transport ports (e.g., client IP, destination IP, and TCP/UDP port numbers)."
      - "HTTP headers such as Host or URL path."
      - "Application-layer data like specific strings in the message body."
      - "The contents of encrypted payloads after decrypting TLS traffic."
    answer: 0

  - q: "During a sudden backend server failure, the load balancer stops sending traffic to that server. What mechanism enables this?"
    options:
      - "Regular health checks that probe backend servers and mark a failed server as out of rotation."
      - "The TCP protocol automatically reroutes traffic when one server in the pool does not respond."
      - "The client's browser detects the server is unresponsive and notifies the load balancer."
      - "A built-in firewall blocks traffic to the failed server's IP."
    answer: 0

  - q: "A low-latency financial service is concerned that adding a load balancer might increase response times. Which type generally introduces the least latency overhead?"
    options:
      - "A Layer 4 load balancer that simply forwards packets between client and server."
      - "A Layer 7 load balancer that fully parses and analyzes each HTTP request."
      - "An application-layer proxy performing deep content inspection and data transformations."
      - "A DNS-based load-balancing approach, since a DNS lookup occurs for each user request."
    answer: 0

  - q: "To achieve zero-downtime deployment, which strategy best uses the load balancer?"
    options:
      - "Gradually draining traffic from servers being updated by marking them out of service on the load balancer."
      - "Restarting all servers simultaneously because the load balancer will queue requests."
      - "Deploying without a load balancer, as it cannot help with deployment processes."
      - "Reducing DNS TTL to zero right before deployment so clients rapidly switch to new servers."
    answer: 0

  - q: "A stateful web application needs all requests from a specific user to go to the same backend server during their session. Which load-balancing feature addresses this?"
    options:
      - "Session persistence (sticky sessions) using cookies or client IP."
      - "DNS load balancing, since DNS will always direct a user to the same server once resolved."
      - "Anycast routing, because the same user will always connect to the geographically nearest data center."
      - "A basic Layer 4 load balancer with a purely random selection algorithm."
    answer: 0

  - q: "Your microservice uses a custom UDP-based protocol. Which type of load balancer is appropriate?"
    options:
      - "A Layer 4 load balancer, as it operates at the transport layer and can handle UDP traffic."
      - "A Layer 7 load balancer, since it can inspect arbitrary UDP payloads in detail."
      - "An HTTP(S) reverse proxy, because HTTP protocols are similar enough to handle UDP traffic."
      - "A DNS round-robin load balancer, because UDP traffic should be balanced via DNS."
    answer: 0

  - q: "Which of the following correctly describes the flow of a client request through a typical load-balanced web service?"
    options:
      - "The client resolves the service's domain to a VIP of a load balancer, connects to the load balancer, which forwards the request to a backend server and returns the response."
      - "The client opens connections to all backend servers simultaneously, and the server that responds fastest handles the request."
      - "The load balancer sends the client a list of backend IPs, and the client directly chooses which server to contact."
      - "The client rotates its requests through each backend server without contacting a load balancer."
    answer: 0

  - q: "A company uses DNS load balancing to direct clients to the nearest regional data center, then Layer 7 load balancing within each region. Which benefit does this multi-tier architecture provide?"
    options:
      - "It reduces user latency and isolates failures to a region by keeping traffic local to the nearest servers."
      - "It simplifies DNS management because records never need to change."
      - "It eliminates the need for health checks at the load balancer level."
      - "It guarantees no single backend server will ever become overloaded."
    answer: 0

  - q: "A critical service uses a pair of load balancer instances sharing a Virtual IP (VIP); the standby takes over if the active fails. What does this achieve?"
    options:
      - "Ensures the service remains reachable at the same IP (high availability) even if one load balancer fails."
      - "Balances load simultaneously at both the network (L3) and application (L7) layers."
      - "Improves performance by splitting the VIP into two physical IPs."
      - "Eliminates the need for health checks on backend servers."
    answer: 0

  - q: "During a sale event, an e-commerce site adds a load balancer in front of multiple identical servers. Which primary goal of load balancing does this address?"
    options:
      - "Distributing traffic across multiple servers (horizontal scaling) to handle more load and avoid a single point of failure."
      - "Minimizing network latency by shortening physical network paths."
      - "Encrypting and decrypting all traffic to secure communications."
      - "Reducing development time by requiring fewer servers."
    answer: 0

  - q: "DNS-based load balancing is configured across two regions. When one region fails, some clients still try to connect there for several minutes. Why?"
    options:
      - "DNS caching at clients or ISPs causes them to keep using the last resolved IP until the DNS TTL expires."
      - "The working region's load balancer is not performing health checks on servers in the failed region."
      - "Clients use an outdated OSI model that doesn't support multi-region failover."
      - "The load balancer was configured at the wrong OSI layer, preventing region failover."
    answer: 0
---
