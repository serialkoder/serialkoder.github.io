---
layout: quiz
title: "Core Architecture & Building Blocks of Load Balancers Quiz"
questions:
  - q: "If a backend server fails its health checks consecutively (exceeding the failure threshold), how does a typical load balancer react?"
    options:
      - "It marks the server as unhealthy and stops sending new traffic to it until it is healthy again."
      - "It continues to send traffic to the server but records the failures in a log."
      - "It immediately terminates the server instance to remove it from the pool."
      - "It forwards all traffic to the server's backup without marking the server itself unhealthy."
    answer: 0

  - q: "A client opens two connections to a service through a layer-4 load balancer using 5-tuple hashing. The second connection comes from the same client IP but with a different source port. What is likely to happen with the second connection?"
    options:
      - "The load balancer will drop the second connection, thinking it is a duplicate of the first."
      - "The load balancer will merge it with the first connection and send it to the same server."
      - "It will definitely go to the same backend server as the first connection, since the client IP is the same."
      - "It may go to a different backend server, because the changed source port alters the hash for the new connection."
    answer: 3

  - q: "A load balancer is configured to use the client’s IP address for session stickiness. What issue can occur if many users are accessing through a single NAT gateway (sharing one IP)?"
    options:
      - "All users behind the same NAT IP may be sent to one backend server, causing uneven load distribution."
      - "The load balancer will block traffic from the NAT address, assuming it’s a single user making too many connections."
      - "Each user behind the NAT will still be sent to a different server because the load balancer uses the source port instead."
      - "Session stickiness will not work at all when clients are behind a NAT gateway."
    answer: 0

  - q: "A company wants the load balancer to inspect incoming HTTP requests and direct traffic based on URL patterns. Which TLS configuration is required to enable this?"
    options:
      - "TLS termination at the load balancer (decrypt incoming HTTPS traffic at the LB)."
      - "TLS passthrough, keeping all traffic encrypted end-to-end to the backend."
      - "End-to-end TLS with the load balancer in active-passive mode."
      - "Mutual TLS authentication between the load balancer and clients."
    answer: 0

  - q: "What is the purpose of enabling connection draining (graceful shutdown) on a load balancer when removing a backend instance?"
    options:
      - "To allow the instance to finish serving ongoing requests before stopping new traffic to it."
      - "To gradually increase traffic to the instance until it drains its resources."
      - "To immediately remove the instance from rotation and terminate all active connections."
      - "To redirect current connections from that instance to other healthy instances."
    answer: 0

  - q: "In a pair of on-premises load balancers configured for high availability, what is the role of VRRP (Virtual Router Redundancy Protocol)?"
    options:
      - "It allows two load balancer appliances to share one virtual IP address, so if one fails the other takes over."
      - "It replicates active session data between the two load balancers in real time for failover."
      - "It automatically routes clients to the least busy load balancer of the pair."
      - "It checks the health of backend servers and reports failures to the peer load balancer."
    answer: 0

  - q: "A backend web server’s process has hung, so it isn’t responding to real requests, but the server still accepts TCP connections. Which type of health check would catch this failure (that a simple TCP check would miss)?"
    options:
      - "An HTTP(S) health check that requests a specific page and expects a valid response."
      - "An ICMP ping check to verify the server’s network connectivity."
      - "A TCP handshake check on the server’s port, with a shorter timeout."
      - "A health check that monitors CPU and memory usage on the server."
    answer: 0

  - q: "Why do many layer-4 load balancers maintain a table of active connections (flows)?"
    options:
      - "To ensure that response packets from servers are forwarded to the correct client by tracking the connection’s 5-tuple."
      - "To keep a history of all client connections for auditing purposes."
      - "To store session cookies for clients using the load balancer."
      - "To periodically rebalance active connections across backend servers."
    answer: 0

  - q: "You need session persistence for an HTTP application where users often share IP addresses (for example, behind a proxy). Which stickiness method would best ensure each user’s requests go to the same backend server?"
    options:
      - "Use a load balancer–generated cookie to track and persist each user’s session to one backend."
      - "Use the client’s source IP address to always direct that IP to the same backend server."
      - "Use a consistent hash on the destination IP (virtual IP) to select the backend server."
      - "Use the client’s TCP source port to keep the connection on the same server."
    answer: 0

  - q: "Due to strict security compliance, a company requires end-to-end encryption for user traffic; the load balancer is not allowed to decrypt incoming data. Which configuration meets this requirement?"
    options:
      - "Configure the load balancer for TLS passthrough, sending encrypted traffic directly to the backend servers."
      - "Configure TLS termination at the load balancer and re-encrypt traffic to the backends."
      - "Use a self-signed certificate on the load balancer for encryption."
      - "Offload TLS decryption to a separate proxy before the load balancer."
    answer: 0

  - q: "After an auto-scaling event adds new backend instances, they do not immediately receive traffic from the load balancer. What is a common reason for this initial delay?"
    options:
      - "Each new instance must pass the load balancer’s health checks to be deemed healthy before receiving traffic."
      - "The load balancer only updates its pool at fixed intervals, causing a deliberate delay."
      - "The auto-scaling group hasn’t sent the new instance details to the load balancer’s control-plane."
      - "New instances always start in a standby mode and must be manually activated on the load balancer."
    answer: 0

  - q: "In a high-availability setup using BGP for two load balancers, what happens when the primary (active) load balancer goes down?"
    options:
      - "The primary stops advertising the service IP via BGP, and the secondary starts advertising it, redirecting traffic to the secondary."
      - "The secondary takes over the IP using VRRP announcements to the local network."
      - "Clients detect the outage and automatically retry on a backup IP address."
      - "BGP is not used for failover in load balancers because it can’t withdraw routes dynamically."
    answer: 0

  - q: "Two load balancer nodes are configured in an active-active cluster, both serving traffic for the same virtual IP. Which measure is necessary to ensure traffic is handled correctly in this design?"
    options:
      - "Implement consistent hashing or state synchronization so each connection is handled by only one node reliably."
      - "Set up VRRP between the two nodes so that only one node is active at a time."
      - "Assign each load balancer node a distinct virtual IP and require clients to alternate between them."
      - "Nothing special is required—traffic will naturally balance evenly without any additional measures."
    answer: 0

  - q: "If the load balancer’s control-plane fails but the data-plane continues running, what is the typical impact on traffic?"
    options:
      - "Ongoing connections continue, but the system won’t adapt to changes until the control-plane recovers."
      - "All current connections are dropped, but new connections will still be accepted."
      - "The load balancer stops forwarding any traffic until the control-plane is restored."
      - "The data-plane nodes will also shut down, since the control-plane is required for them to function."
    answer: 0

  - q: "For an HTTP application, each client’s requests include an “X-User-ID” header identifying the user. To ensure all requests from the same user go to the same backend server, which persistence method would be most effective?"
    options:
      - "Use the \"X-User-ID\" header value for session persistence mapping to backends."
      - "Use the client’s source IP for persistence."
      - "Issue a session cookie to each user and persist based on that cookie."
      - "Rely on the default 5-tuple hashing."
    answer: 0

  - q: "When a load balancer is configured for TLS passthrough (no TLS termination at the LB), which of the following is NOT possible for the load balancer to do?"
    options:
      - "Make routing decisions based on the content of HTTP headers or URLs."
      - "Distribute incoming traffic across multiple backend servers."
      - "Maintain end-to-end encryption between clients and backend servers."
      - "Forward TCP connections to a designated backend port."
    answer: 0

  - q: "In a cloud provider’s managed load balancer service, how is high availability of the load balancer typically achieved without customer intervention?"
    options:
      - "The provider runs multiple load balancer instances behind one IP, so if one fails another continues serving traffic."
      - "The customer must configure VRRP on the provided load balancers."
      - "The load balancer is a single instance but the hardware never fails."
      - "Clients must use a DNS name that rotates through multiple load balancer IPs."
    answer: 0

  - q: "Under heavy load, one backend server starts timing out on some requests, but active health checks still show it healthy. What feature helps the load balancer detect and respond to this partial failure faster?"
    options:
      - "Passive health checks that mark a server unhealthy if real traffic fails."
      - "Round-robin load balancing to rotate traffic evenly."
      - "Disabling TLS on the load balancer to reduce overhead on the backend."
      - "Increasing the frequency of active health checks to the highest rate."
    answer: 0
---
