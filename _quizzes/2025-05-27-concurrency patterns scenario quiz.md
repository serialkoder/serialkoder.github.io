---
layout: quiz
title: "Concurrency Patterns Scenario Quiz"
questions:
  - q: "In a networked printing system, multiple users submit print jobs that are placed in a queue, while a single printer processes them one at a time. Which concurrency pattern does this illustrate?"
    options:
      - "Publish-Subscribe pattern"
      - "Producer-Consumer pattern"
      - "Fork/Join pattern"
      - "Thread Pool pattern"
    answer: 1

  - q: "A search service distributes a user query to five back-end services in parallel, then waits for all to return before combining the results. Which pattern is at work?"
    options:
      - "Fork/Join pattern"
      - "Bulkhead pattern"
      - "Fan-Out/Fan-In pattern"
      - "Producer-Consumer pattern"
    answer: 2

  - q: "A high-traffic web server uses a fixed set of worker threads that pull incoming HTTP requests from a queue instead of spawning a new thread per request. What pattern is this?"
    options:
      - "Producer-Consumer pattern"
      - "Rate Limiter"
      - "Reactor (Event Loop) pattern"
      - "Thread Pool (Worker Pool) pattern"
    answer: 3

  - q: "A mobile app launches three network requests asynchronously and immediately returns control to the UI, receiving placeholder objects for the eventual results. Which concept is being used?"
    options:
      - "Thread Pool"
      - "Futures/Promises"
      - "Reactive Streams"
      - "Producer-Consumer pattern"
    answer: 1

  - q: "An IoT analytics pipeline streams events through filter, transform, and publish stages with built-in backpressure to slow intake if the dashboard lags. Which pattern fits?"
    options:
      - "Publish-Subscribe pattern"
      - "Message Queue processing"
      - "Fan-Out/Fan-In pattern"
      - "Reactive Streams pattern"
    answer: 3

  - q: "A financial system logs every transaction as an immutable event and rebuilds account balances by replaying those events. What architectural pattern is this?"
    options:
      - "Event Sourcing"
      - "Publish-Subscribe"
      - "Message Queue"
      - "Reactive Streams"
    answer: 0

  - q: "After repeated failures calling a remote Payment service, an Order service stops calling it for a cooldown period, then retries later. Which pattern is applied?"
    options:
      - "Bulkhead pattern"
      - "Circuit Breaker pattern"
      - "Rate Limiter"
      - "Thread Pool pattern"
    answer: 1

  - q: "A public API limits each client to 100 requests per second; excess requests are denied or delayed. Which concurrency control mechanism is this?"
    options:
      - "Circuit Breaker"
      - "Bulkhead"
      - "Rate Limiter"
      - "Semaphore"
    answer: 2

  - q: "Two threads must write to the same config file; only one may write at a time, forcing the other to wait. Which synchronization primitive is used?"
    options:
      - "Semaphore"
      - "Monitor (synchronized block)"
      - "Read-Write Lock"
      - "Mutex (Mutual Exclusion Lock)"
    answer: 3

  - q: "An image-processing service allows at most four concurrent processing threads; a fifth must wait until a permit frees up. What primitive enforces this?"
    options:
      - "Semaphore"
      - "Mutex"
      - "Rate Limiter"
      - "Thread Pool"
    answer: 0

  - q: "In a multiplayer game, each character has its own mailbox and state; characters communicate only by sending messages to each other’s inboxes. Which model is this?"
    options:
      - "Monitor"
      - "Message Queue"
      - "Actor Model"
      - "Publish-Subscribe"
    answer: 2

  - q: "An e-commerce site places new orders on a persistent queue; a separate service pulls and processes them asynchronously. What integration pattern is this?"
    options:
      - "Publish-Subscribe"
      - "Producer-Consumer pattern"
      - "Event Sourcing"
      - "Message Queue system"
    answer: 3

  - q: "A sports news broker delivers category-tagged updates (e.g., 'soccer') to all user devices subscribed to that category. Which communication pattern is being used?"
    options:
      - "Fan-Out/Fan-In"
      - "Publish-Subscribe"
      - "Message Queue"
      - "Actor Model"
    answer: 1

  - q: "A cache supports dozens of concurrent readers but grants exclusive access to any thread that needs to update the cache. What type of lock is this?"
    options:
      - "Mutex"
      - "Semaphore"
      - "Read-Write Lock"
      - "Monitor"
    answer: 2

  - q: "A matrix computation splits into four sub-tasks run in parallel on separate cores, then merges results into the final answer. Which pattern applies?"
    options:
      - "Fork/Join pattern"
      - "Fan-Out/Fan-In pattern"
      - "Thread Pool pattern"
      - "Reactive Streams pattern"
    answer: 0

  - q: "An object’s methods are guarded so that only one thread can execute any method at a time; threads may wait inside until signaled when a condition is met. What is this construct?"
    options:
      - "Mutex lock"
      - "Monitor (intrinsic lock with condition)"
      - "Producer-Consumer pattern"
      - "Semaphore"
    answer: 1

  - q: "In a parallel traffic simulation, threads must all reach the end of a time step before any can start the next step. What synchronization mechanism is this?"
    options:
      - "Semaphore"
      - "Mutex"
      - "Fork/Join"
      - "Barrier"
    answer: 3

  - q: "A chat server manages thousands of connections with a single thread that waits for I/O readiness events and dispatches handlers without blocking. Which pattern does this represent?"
    options:
      - "Thread Pool pattern"
      - "Actor Model"
      - "Reactor (Event Loop) pattern"
      - "Producer-Consumer pattern"
    answer: 2

  - q: "A booking system dedicates separate thread pools to flight and hotel services so slowness in one cannot consume resources needed by the other. Which pattern provides this isolation?"
    options:
      - "Bulkhead pattern"
      - "Circuit Breaker pattern"
      - "Rate Limiter"
      - "Producer-Consumer pattern"
    answer: 0

  - q: "A high-frequency trading app increments a shared counter using atomic compare-and-swap operations without locks; threads that clash simply retry until success. What technique is this?"
    options:
      - "Lock-Free (Non-blocking) concurrency"
      - "Semaphore-based synchronization"
      - "Spinlock"
      - "Mutex locking"
    answer: 0
---
