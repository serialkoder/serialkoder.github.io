---
layout: flashmatch
title: "Broker Architecture Pattern – Match the Concepts"
intro: |
  Drag-or-click each term on the left to its definition on the right,
  then press **Check answers** to see how you did.
pairs:
  - left: "Client Stub"
    right: "Generated client-side proxy that marshals requests and hides transport details"
  - left: "Server Skeleton"
    right: "Generated server-side proxy that unmarshals requests and invokes service logic"
  - left: "Broker"
    right: "Intermediary that routes requests, enforces policies, and returns responses"
  - left: "Naming / Registry Service"
    right: "Directory where services register and clients resolve endpoints at runtime"
  - left: "Interface Definition Language (IDL)"
    right: "Language-neutral contract used to generate stubs and skeletons"
  - left: "Location Transparency"
    right: "Calling a service without knowing its physical network address"
  - left: "Load Balancing"
    right: "Distributing requests across multiple service instances for scale and resilience"
  - left: "Connection Pooling"
    right: "Reusing network connections to cut handshake overhead and latency"
  - left: "Circuit Breaker"
    right: "Fail-fast guard that halts calls to an unhealthy service for a cooldown period"
  - left: "Service Discovery"
    right: "Automatic detection of available service instances and their health"
  - left: "Authentication & Authorization"
    right: "Broker-enforced identity verification and access control for each call"
  - left: "TLS Termination / mTLS"
    right: "Encryption (and optional mutual cert checks) handled transparently by the broker"
  - left: "Distributed Tracing"
    right: "Propagating trace IDs so a call can be followed across multiple services"
  - left: "One-way Invocation"
    right: "Fire-and-forget call that sends a request without waiting for a response"
  - left: "God Broker Anti-Pattern"
    right: "Overloading the broker with business logic, turning it into a monolithic bottleneck"
---
