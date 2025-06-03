---
layout: quiz
title: "Broker Architecture Pattern Quiz V2"
questions:
  - q: "Which component in the Broker pattern resides on the **client** side and handles marshalling of requests?"
    options:
      - "Client-side Stub (Proxy)"
      - "Server Skeleton"
      - "Broker"
      - "Naming/Registry Service"
    answer: 0

  - q: "What term describes the Broker pattern’s ability to let a client invoke a service without hard-coding its network address?"
    options:
      - "Protocol Independence"
      - "Location Transparency"
      - "Language Interoperability"
      - "Interface Versioning"
    answer: 1

  - q: "A company’s microservices call each other directly over HTTP. Engineers complain about duplicated auth code, brittle endpoints, and scaling headaches. **Which architectural pattern best addresses these issues?**"
    options:
      - "Broker / ORB pattern"
      - "Shared-Nothing Architecture"
      - "Layered Architecture"
      - "Master–Slave Replication"
    answer: 0

  - q: "Which of the following is **NOT** a typical core component of a Broker-based RPC framework?"
    options: ["Stub", "Skeleton", "Circuit Breaker", "Broker"]
    answer: 2

  - q: "In gRPC, service contracts are defined in files with which extension?"
    options: [".thrift", ".proto", ".idl", ".json"]
    answer: 1

  - q: "What is the primary job of the Naming/Registry service?"
    options:
      - "Encrypt traffic with TLS"
      - "Discover and return current service endpoints"
      - "Serialize objects into binary form"
      - "Pool TCP connections"
    answer: 1

  - q: "Which mechanism below is **least** related to fault tolerance in a Broker setup?"
    options: ["Retries", "Circuit breakers", "Least-connections load balancing", "Mutex locking"]
    answer: 3

  - q: "Marking a Thrift method with the keyword **oneway** results in what kind of invocation?"
    options: ["Synchronous request-reply", "Fire-and-forget (no response expected)", "Streaming response", "Bidirectional streaming"]
    answer: 1

  - q: "Designing an API that requires dozens of tiny remote calls to finish a single business action exemplifies which anti-pattern?"
    options: ["God Broker", "Overly Chatty Interface", "Shared Schema", "Black-box Monitoring"]
    answer: 1

  - q: "Your API gateway has gradually accumulated message transformations, orchestration flows, and conditional business rules, becoming a single giant service. **Which anti-pattern does this illustrate?**"
    options: ["Shared Database", "God Broker", "Bulkhead", "CQRS"]
    answer: 1

  - q: "Which Broker responsibility directly enables distributing traffic across multiple healthy service instances?"
    options: ["Load balancing", "Serialization", "Tracing", "Dependency Injection"]
    answer: 0

  - q: "Generating stubs and skeletons from an IDL primarily enables:"
    options: ["Stronger type safety", "Language and protocol independence", "Higher CPU utilization", "Automatic UI generation"]
    answer: 1

  - q: "If a client should continue working while waiting for the server’s reply, which invocation model is appropriate?"
    options: ["Synchronous blocking", "Asynchronous (future/promise)", "Fire-and-forget", "One-way streaming"]
    answer: 1

  - q: "Mutual TLS (mTLS) between sidecar proxies in a service mesh mainly provides:"
    options: ["Location transparency", "Interface discovery", "Identity authentication for both peers", "Connection pooling"]
    answer: 2

  - q: "In an Istio-style service mesh, which component pair acts as the distributed Broker?"
    options:
      - "Envoy sidecars + control plane"
      - "Kubernetes API server + etcd"
      - "Grafana + Prometheus"
      - "Docker daemon + containerd"
    answer: 0

  - q: "Which observability technique shows the **end-to-end timeline** of a single request through multiple services?"
    options: ["Centralized logging", "Distributed tracing", "Metric aggregation", "Heart-beat monitoring"]
    answer: 1

  - q: "Dynamic binding at runtime primarily depends on:"
    options: ["Static IP allow-lists", "Service discovery via a registry", "Code generation", "CI/CD pipelines"]
    answer: 1

  - q: "You deploy UserService v1 and v2 concurrently. The Broker routes 10 % of traffic to v2 based on request metadata. Which concept best describes this?"
    options: ["Blue-green deployment", "Dynamic version routing", "Monolithic upgrade", "Chaos engineering"]
    answer: 1

  - q: "Which of these **is NOT** a common load-balancing algorithm in Broker/proxy implementations?"
    options: ["Round-robin", "Least connections", "Random", "Bubble sort"]
    answer: 3

  - q: "gRPC uses which underlying transport protocol by default?"
    options: ["HTTP/1.1", "HTTP/2", "WebSockets", "UDP"]
    answer: 1

  - q: "A single, non-replicated Broker node mediates all traffic. What is the **largest architectural risk**?"
    options: ["Excessive serialization cost", "Single point of failure", "Lack of encryption", "Overly chatty interface"]
    answer: 1

  - q: "NATS achieves request-reply RPC semantics by:"
    options:
      - "Embedding HTTP servers in each client"
      - "Using a reply-to subject and correlation ID over a pub/sub broker"
      - "Maintaining long-polling TCP sockets per client"
      - "Extending gRPC with plugins"
    answer: 1

  - q: "Adding an extra network hop through a Broker inevitably introduces:"
    options: ["Zero latency", "Some additional latency", "Guaranteed faster responses", "In-process calls"]
    answer: 1

  - q: "Which statement about a **circuit breaker** in a Broker or stub is true?"
    options:
      - "It accelerates requests that exceed SLA"
      - "It temporarily halts calls to an unstable service after repeated failures"
      - "It pools TCP connections across services"
      - "It serializes payloads into JSON"
    answer: 1

  - q: "Where is **connection pooling** most commonly implemented in a Broker-based stack?"
    options: ["Client stub or Broker proxy", "Business logic layer", "Naming registry", "Database driver"]
    answer: 0

  - q: "Centralizing **authentication and authorization** checks in the Broker provides:"
    options: ["Per-service custom auth flows", "Inconsistent security policies", "Uniform enforcement across all calls", "Elimination of TLS overhead"]
    answer: 2

  - q: "Which technology pair exemplifies a Broker framework that relies on **Protocol Buffers over HTTP/2**?"
    options: ["Thrift + TCP", "SOAP + WS-Addressing", "gRPC + xDS", "RabbitMQ + AMQP"]
    answer: 2

  - q: "Envoy’s overload manager can start shedding requests when resource limits are hit. This feature primarily provides:"
    options: ["Back-pressure and system protection", "Faster marshaling", "Static routing", "Schema migration"]
    answer: 0

  - q: "Which of the following is **NOT** a typical registry technology for service discovery?"
    options: ["Consul", "ZooKeeper", "etcd", "GitHub Issues"]
    answer: 3

  - q: "Apache Thrift natively supports several serialization formats. **Which format below is NOT one of them?**"
    options: ["Binary", "Compact", "JSON", "CSV"]
    answer: 3
---
