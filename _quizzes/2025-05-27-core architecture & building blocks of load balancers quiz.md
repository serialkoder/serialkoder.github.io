---
layout: quiz
title: "Core Architecture & Building Blocks of Load Balancers - Quiz"
questions:

  - q: "1. Which of the following statements about active vs. passive health checks is correct?"
    options:
      - "A) Passive checks proactively send pings to detect failures."
      - "B) Active checks rely solely on observing real user traffic."
      - "C) Passive checks can catch issues under load that basic active probes might miss."
      - "D) Active checks remove the need for any fail-out threshold."
    answer: 2

  - q: "2. True or False: If a load balancer uses a 5-tuple hash, changing the source port on a new connection can lead to a different backend server."
    options: ["True", "False"]
    answer: 0

  - q: "3. Which technique is MOST precise at ensuring each user is consistently routed to the same server in an HTTP-based application?"
    options:
      - "A) IP Affinity (Client IP hashing)"
      - "B) Cookie-Based Session Persistence"
      - "C) Passive Health Checks"
      - "D) VRRP"
    answer: 1

  - q: "4. True or False: Cookie-based persistence typically only works for HTTP(S) traffic and requires that the client accept cookies."
    options: ["True", "False"]
    answer: 0

  - q: "5. Which of the following is a valid trade-off when choosing TLS termination at the load balancer (LB) versus TLS passthrough?"
    options:
      - "A) Termination at the LB offers end-to-end encryption but limits the LB’s ability to inspect traffic."
      - "B) Passthrough forces the LB to handle certificate management but allows deeper content inspection."
      - "C) Termination at the LB enables content-based routing and offloads encryption from the backend servers."
      - "D) Passthrough provides partial encryption and partial LB inspection capabilities."
    answer: 2

  - q: "6. True or False: In TLS passthrough mode, the load balancer can still insert HTTP cookies for session persistence."
    options: ["True", "False"]
    answer: 1

  - q: "7. Which statement about graceful deregistration (connection draining) is FALSE?"
    options:
      - "A) It stops sending new traffic to a server marked for removal."
      - "B) It immediately drops all active connections on a deregistered server."
      - "C) It allows existing sessions or connections to complete before fully removing a server."
      - "D) It helps avoid disrupting users during scale-in or maintenance events."
    answer: 1

  - q: "8. True or False: A load balancer’s data plane handles real-time packet forwarding, while the control plane handles configuration, health checks, and server registration."
    options: ["True", "False"]
    answer: 0

  - q: "9. In a dynamic auto-scaling scenario, how does a new server typically become available to receive traffic from the load balancer?"
    options:
      - "A) The new server must manually inject itself into the load balancer’s data plane code."
      - "B) An API call or service discovery mechanism notifies the LB’s control plane to register it."
      - "C) The user must physically plug the server into the same VLAN as the LB."
      - "D) The LB automatically scans all IP addresses in the subnet and picks new servers."
    answer: 1

  - q: "10. True or False: Session persistence can sometimes lead to imbalanced load if certain users have significantly heavier usage."
    options: ["True", "False"]
    answer: 0

  - q: "11. Which of these is a main benefit of separating control plane and data plane in load balancers?"
    options:
      - "A) It simplifies certificate installation on the servers."
      - "B) It allows the data plane to continue forwarding traffic even if the control plane is busy or restarted."
      - "C) It ensures no external dependencies are needed for traffic management."
      - "D) It prohibits session stickiness from being configured."
    answer: 1

  - q: "12. True or False: VRRP (Virtual Router Redundancy Protocol) can be used in on-premises setups to enable a shared virtual IP between two load balancer nodes for high availability."
    options: ["True", "False"]
    answer: 0

  - q: "13. Which statement BEST describes the concept of fail-out/fail-in thresholds in health checks?"
    options:
      - "A) LB immediately removes a server after the first failed check."
      - "B) LB requires multiple consecutive failures to mark a server unhealthy, and multiple consecutive successes to mark it healthy again."
      - "C) LB only uses passive checks to decide if a server is healthy."
      - "D) LB never reintegrates a server after it has failed a health check."
    answer: 1

  - q: "14. True or False: In an active/active LB HA setup using BGP anycast, multiple LB instances can advertise the same IP address, allowing traffic to be distributed among them."
    options: ["True", "False"]
    answer: 0

  - q: "15. Which of the following is NOT a common session persistence technique?"
    options:
      - "A) Client IP Affinity"
      - "B) HTTP Cookie-Based Affinity"
      - "C) Layer-4 5-Tuple Hashing"
      - "D) Custom Header/Token Affinity"
    answer: 2

  - q: "16. True or False: If load balancers rely solely on passive health checks, a server that fails during a period of no traffic might stay in rotation undetected."
    options: ["True", "False"]
    answer: 0

  - q: "17. Which is a potential drawback of cookie-based session persistence?"
    options:
      - "A) It can lead to issues when multiple NATed clients share one IP."
      - "B) It only provides connection stickiness for the duration of a single TCP connection."
      - "C) It relies on the client’s browser to accept and return cookies."
      - "D) It cannot be used on HTTP(S) protocols."
    answer: 2

  - q: "18. True or False: Session replication on the application side can sometimes remove the need for sticky sessions at the load balancer."
    options: ["True", "False"]
    answer: 0

  - q: "19. When using a stateful (connection table-based) LB approach for flow hashing, what is one main drawback compared to a stateless hash?"
    options:
      - "A) It cannot handle dynamic server membership at all."
      - "B) It uses more memory to store active connection mappings."
      - "C) It’s unable to do any health checks on backends."
      - "D) It is incompatible with TLS termination."
    answer: 1

  - q: "20. True or False: In many cloud environments, the provider’s LB service handles the HA aspect behind the scenes, so you typically don’t configure VRRP or BGP yourself."
    options: ["True", "False"]
    answer: 0

---
