---
layout: flashdeck
title: "Broker Pattern Flash Deck"
tags: [software-architecture]
intro: |
  Quick revision deck covering the Broker architecture pattern — foundations, components, invocation
  flow, scalability, security, observability, pitfalls, and best practices. Click a question to
  reveal the answer.
cards:
  - q: "What core problem does the Broker pattern solve?"
    a: "It decouples clients from services in large distributed systems, eliminating brittle point-to-point integrations and enabling location, protocol, and language transparency."

  - q: "Why do direct client-service calls become brittle at scale?"
    a: "Clients must hard-code endpoints, protocols, and cross-cutting concerns; changes or growth require touching every client; retries, authentication, and fail-over logic are duplicated."

  - q: "Name three symptoms of 'point-to-point spaghetti'."
    a: |
       • Tight coupling  
       • Duplicated cross-cutting logic  
       • Chatty/over-frequent network calls

  - q: "Client-side object that hides networking details."
    a: "Stub (proxy)."

  - q: "Server-side object that unpacks requests and invokes the real service."
    a: "Skeleton (server proxy)."

  - q: "Intermediary that routes, enforces policy, and returns responses."
    a: "Broker."

  - q: "Service that maps logical names to live endpoints."
    a: "Naming / Registry service (e.g., Consul, DNS, ZooKeeper)."

  - q: "File that declares language-neutral service APIs."
    a: "IDL (Interface Definition Language)."

  - q: "What does code generation from an IDL produce?"
    a: "Matched client stubs and server skeletons in multiple languages."

  - q: "First step a client takes before calling a service via a broker."
    a: "Look up the service in the registry to resolve an endpoint."

  - q: "What do stubs do with method calls before sending?"
    a: "Marshal (serialize) the method name, parameters, and metadata into a request message."

  - q: "What happens in the broker after receiving a marshalled request?"
    a: "It selects an appropriate service instance (load balances) and forwards the request."

  - q: "Final step before the client receives a return value."
    a: "Stub unmarshals the response and returns it as if it were a local call."

  - q: "Difference between synchronous and asynchronous brokered calls."
    a: "Synchronous calls block until a response arrives; asynchronous calls return immediately and handle the result via callbacks, futures, or polling."

  - q: "Term for a call where no reply is expected."
    a: "One-way / fire-and-forget."

  - q: "Feature that allows multiple messages per invocation or duplex traffic."
    a: "Streaming (e.g., gRPC bidirectional streams)."

  - q: "What is location transparency?"
    a: "Clients call a logical service name without knowing the host or port, letting services move or scale freely."

  - q: "How does the broker enable language interoperability?"
    a: "Via shared IDL definitions and generated stubs/skeletons in each language."

  - q: "Mechanism supporting multiple API versions simultaneously."
    a: "Versioned registrations in the registry plus backward-compatible IDL evolution."

  - q: "Two load-balancing strategies a broker might use."
    a: |
       • Round-robin  
       • Least-connections

  - q: "Purpose of connection pooling in brokers or proxies."
    a: "Reuses established TCP/HTTP-2 channels to reduce handshake overhead and increase throughput."

  - q: "Name three fault-tolerance techniques often built into brokers."
    a: |
       • Health checks  
       • Retries with back-off  
       • Circuit breakers

  - q: "Where are authentication and authorization commonly enforced?"
    a: "At the broker or a sidecar proxy, before forwarding the request."

  - q: "How do brokers simplify transport encryption within a mesh?"
    a: "They terminate external TLS and establish mutual TLS between proxies, sparing service code."

  - q: "How can a broker support tenant isolation?"
    a: "Routing or policy rules keyed by tenant ID plus per-tenant rate limits."

  - q: "Three classes of telemetry brokers naturally collect."
    a: |
       • Metrics (latency, error rate)  
       • Distributed traces  
       • Access logs

  - q: "What broker action mitigates a 'thundering herd' of requests?"
    a: "Back-pressure or load shedding through rate limits, queuing, or dropping excess requests."

  - q: "Google-origin RPC framework that embodies broker ideas via libraries."
    a: "gRPC (with xDS for discovery)."

  - q: "Cross-language RPC framework from Facebook, now Apache."
    a: "Apache Thrift."

  - q: "Lightweight pub-sub system whose request-reply mode acts as a broker."
    a: "NATS."

  - q: "Service-mesh data plane built on per-service proxies implementing broker duties."
    a: "Envoy (used by Istio, Linkerd, Kuma, etc.)."

  - q: "Message brokers that decouple producers and consumers asynchronously."
    a: "Apache Kafka, RabbitMQ, MQTT brokers (supporting RPC patterns via reply queues)."

  - q: "Term for excessive fine-grained remote calls harming performance."
    a: "Chatty interface anti-pattern."

  - q: "Risk when all traffic transits a single or underscaled broker."
    a: "The broker becomes a bottleneck or single point of failure."

  - q: "What is the 'God Broker' anti-pattern?"
    a: "Overloading the broker with business logic, data transformation, or orchestration, making it monolithic and hard to evolve."

  - q: "Why can interface changes still break systems despite the broker?"
    a: "Clients and services remain tightly coupled to the shared API contract; breaking changes ripple across the system."

  - q: "Operational cost often underestimated with brokers."
    a: "Need to deploy, upgrade, and monitor an additional infrastructure layer (or library versions across services)."

  - q: "Guideline for defining service operations to avoid chatty calls."
    a: "Prefer coarse-grained, purpose-focused methods or batch requests."

  - q: "How to prevent a broker single point of failure."
    a: "Deploy multiple stateless broker instances and configure client fail-over."

  - q: "Where should business orchestration live if not in the broker?"
    a: "Dedicated application services or workflow engines; keep the broker focused on transport concerns."

  - q: "Summarize the Broker pattern in one sentence."
    a: "An intermediary layer abstracts and manages all network communication details, letting services and clients evolve, scale, and interoperate cleanly."

  - q: "Primary benefits delivered by brokers at scale."
    a: |
       • Decoupling and service discoverability  
       • Load balancing and fault tolerance  
       • Centralized security  
       • Unified observability

  - q: "Single most important caution when adopting a broker."
    a: "Ensure it remains a lightweight, highly available transport layer — not a monolithic choke point."
---
