---
layout: quiz
title: "Service-Oriented Architecture (SOA) Quiz"
questions:
  - q: "An e-commerce company changed the internal database structure of its product-catalog service for optimization, but the service’s interface (contract) to consumers remained unchanged and no clients were affected. Which SOA design principle is demonstrated by this scenario?"
    options:
      - "Service autonomy"
      - "Loose coupling"
      - "Service discoverability"
      - "Service statelessness"
    answer: 1

  - q: "A widely used Order service needs to offer new features without disrupting existing consumers. What is the best approach to modify the service in line with SOA best practices?"
    options:
      - "Modify the existing service contract and require all clients to update their integrations immediately"
      - "Version the service by introducing a new interface (e.g., Order Service v2) while continuing to support the original contract"
      - "Freeze the service at its current version to avoid any changes"
      - "Implement the new features internally but keep the contract unchanged, assuming clients will not notice"
    answer: 1

  - q: "Instead of hard-coding service endpoints, a company uses a central directory where services register themselves and clients look up services by name at runtime. What SOA component or concept does this describe?"
    options:
      - "A service registry enabling runtime discovery"
      - "Point-to-point service integration"
      - "Hard-coded endpoint references"
      - "A load balancer with sticky routing"
    answer: 0

  - q: "In an enterprise SOA, a central ESB handles all message routing and transformations but becomes a performance bottleneck. Which alternative integration approach can alleviate this “God ESB” problem?"
    options:
      - "Use decentralized, lightweight API gateways or direct service-to-service communication"
      - "Upgrade the ESB hardware and continue routing all interactions through it"
      - "Enforce a single, enterprise-wide data model so the ESB has less varied work"
      - "Merge multiple services into one larger service to reduce ESB traffic"
    answer: 0

  - q: "Service A places a request for Service B on a message queue because the operation is long-running and Service B may be offline. Which advantage of asynchronous messaging does this illustrate?"
    options:
      - "Improved fault tolerance and decoupling through reliable queuing"
      - "Immediate user response because results return faster than synchronous calls"
      - "Simpler client logic with no error handling required"
      - "Faster overall business-transaction completion"
    answer: 0

  - q: "A financial service requires each SOAP message to be encrypted and signed end-to-end, even through intermediaries. Which security standard best meets this requirement?"
    options:
      - "Transport Layer Security (TLS)"
      - "WS-Security (message-level XML encryption and signatures)"
      - "API keys over HTTP"
      - "A network firewall"
    answer: 1

  - q: "An organization uses SAML tokens in WS-Security for internal SOAP services but is building public REST APIs for partners. Which authentication approach is more appropriate for these new REST services?"
    options:
      - "Continue using WS-Security with SAML tokens in HTTP headers"
      - "Use OAuth 2.0 to issue JSON Web Tokens (JWT)"
      - "Allow anonymous access since partners are trusted"
      - "Use HTTP Basic Authentication over SSL"
    answer: 1

  - q: "A booking service’s payment succeeds, but the subsequent hotel-reservation call fails. Without distributed XA transactions, which pattern maintains consistency?"
    options:
      - "Use a compensating transaction (e.g., refund the payment)"
      - "Wrap both calls in a two-phase commit"
      - "Always perform the hotel reservation before payment"
      - "Lock both databases until all steps complete"
    answer: 0

  - q: "Operations struggles to identify slow services and ensure SLA compliance in a complex SOA. What should be implemented to address this?"
    options:
      - "Comprehensive monitoring, distributed tracing, and dashboards for each service"
      - "Weekly manual testing of all services"
      - "Deploy all services on the same server"
      - "Rely solely on database query logs"
    answer: 0

  - q: "SOA governance enforces a single canonical model and routes every call through a central ESB, causing long design cycles and bottlenecks. Which governance pitfall is exemplified?"
    options:
      - "Over-specification with an overly centralized “God ESB”"
      - "Lack of any service-contract standards"
      - "Building services that are too coarse-grained"
      - "Not having a dedicated governance team"
    answer: 0

  - q: "A user-profile service maintains no session state; every request contains all needed data and is processed independently. Which SOA principle does this illustrate?"
    options:
      - "Service statelessness"
      - "Service discoverability"
      - "Service autonomy"
      - "Service composability"
    answer: 0

  - q: "Three teams independently built customer-profile services, duplicating functionality. Which SOA principle was neglected?"
    options:
      - "Service reusability"
      - "Loose coupling"
      - "Service autonomy"
      - "Service statelessness"
    answer: 0

  - q: "A team created hundreds of ultra-fine-grained services, leading to chatty, high-latency communication. Which design guideline could have prevented this?"
    options:
      - "Design coarse-grained services aligned with business capabilities"
      - "Use as many small services as possible"
      - "Always prefer remote calls over local calls"
      - "Rely on network speed and add hardware"
    answer: 0

  - q: "A business process involving Services X, Y, Z can use a central orchestrator or event-driven choreography. To minimize tight coupling and a single point of failure, which approach is more suitable?"
    options:
      - "Event-driven choreography"
      - "Central orchestration because it simplifies communication"
      - "Central orchestration because it means fewer points of failure"
      - "Both approaches are identical"
    answer: 0

  - q: "A company moving from traditional SOA to microservices keeps a centralized ESB for all communication. Why is this problematic?"
    options:
      - "A central ESB reintroduces a bottleneck and undermines independent deployability"
      - "Microservices require REST, so an ESB cannot be used"
      - "Each microservice must use a different programming language, which an ESB prevents"
      - "There is no difference; ESB usage poses no issues"
    answer: 0
---
