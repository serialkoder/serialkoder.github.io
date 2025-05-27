---
layout: quiz
title: "Concurrency Patterns Quiz"
questions:
  - q: "Concurrency means tasks run at the exact same time on multiple CPU cores."
    options: ["True", "False"]
    answer: 1

  - q: "Using immutable objects in a multi-threaded program can help prevent race conditions."
    options: ["True", "False"]
    answer: 0

  - q: "Which of the following describes a race condition in a concurrent program?"
    options:
      - "Two threads wait forever for each other to release resources."
      - "Two threads access and try to change the same shared data at the same time."
      - "A program runs out of stack space due to deep recursion in multiple threads."
      - "Threads rapidly switch execution on the CPU due to the scheduler."
    answer: 1

  - q: "A deadlock can happen if two threads each hold a lock and are waiting to acquire the other thread’s lock."
    options: ["True", "False"]
    answer: 0

  - q: "Which of the following is NOT a thread-safe practice for incrementing a shared counter from multiple threads?"
    options:
      - "Protecting the increment with a mutex."
      - "Using an atomic increment instruction."
      - "Giving each thread its own counter and combining later."
      - "Updating a shared global counter with no synchronization."
    answer: 3

  - q: "In a classic Producer-Consumer scenario with a fixed-size buffer, how can we prevent the producer from overfilling the buffer or the consumer from reading an empty buffer?"
    options:
      - "Use synchronization primitives so producers/consumers block when the buffer is full/empty."
      - "Use a busy-wait loop where threads continuously check the buffer."
      - "No synchronization is needed; the OS will alternate them properly."
      - "Use multiple mutex locks on the buffer for each item slot."
    answer: 0

  - q: "Which concurrency pattern is characterized by splitting a task into subtasks that run in parallel and then joining the results?"
    options: ["Fork/Join pattern", "Producer/Consumer pattern", "Actor model", "Mutual exclusion pattern"]
    answer: 0

  - q: "Which statement is true about futures and promises?"
    options:
      - "A Future represents a result that may not yet be available."
      - "Futures require a dedicated polling thread."
      - "A Promise is basically a thread object."
      - "Using futures forces the main thread to block immediately."
    answer: 0

  - q: "In the Actor model of concurrency, which of the following is true?"
    options:
      - "Actors do not share memory; they communicate exclusively by sending messages."
      - "Actors use shared variables and locks to synchronize."
      - "An actor can process multiple messages in parallel at the same time."
      - "The Actor model only works in distributed systems, not on a single machine."
    answer: 0

  - q: "Which concurrency pattern reuses a fixed pool of worker threads to execute tasks from a queue?"
    options: ["Thread Pool", "Spinlock", "Map-Reduce", "Pipeline pattern"]
    answer: 0

  - q: "What is a key difference between a mutex (lock) and a counting semaphore?"
    options:
      - "A semaphore can allow several threads concurrently; a mutex allows only one."
      - "A mutex can be unlocked by any thread; a semaphore can only be released by the locking thread."
      - "They are identical; a counting semaphore is just another name for a mutex."
      - "A mutex uses busy-waiting, whereas a semaphore always blocks waiting threads."
    answer: 0

  - q: "Two threads each perform counter++ 1000 times without synchronization. What is a possible final value of the counter?"
    options:
      - "Always exactly 2000"
      - "Always less than 2000"
      - "Any value from 0 to 2000, including 0"
      - "Non-deterministic but at most 2000 and likely less due to lost updates"
    answer: 3

  - q: "Thread 1 acquires Lock X then Lock Y, while Thread 2 acquires Lock Y then Lock X. What concurrency issue can occur?"
    options: ["Deadlock", "Livelock", "Benign race condition", "No issue"]
    answer: 0

  - q: "Starvation is a situation where a thread never gets the CPU time or resources it needs to make progress."
    options: ["True", "False"]
    answer: 0

  - q: "Adding more threads to a program will always improve performance."
    options: ["True", "False"]
    answer: 1

  - q: "A lock-free algorithm guarantees that overall progress is always made without using mutual-exclusion locks."
    options: ["True", "False"]
    answer: 0

  - q: "In a livelock, two or more threads are actively running and responding to each other, yet no thread is making forward progress."
    options: ["True", "False"]
    answer: 0

  - q: "Which of the following is NOT one of Coffman’s four necessary deadlock conditions?"
    options:
      - "Mutual exclusion"
      - "Circular wait"
      - "Resource preemption"
      - "Hold and wait"
    answer: 2

  - q: "What is a common strategy to prevent deadlocks when a program must acquire multiple locks?"
    options:
      - "Always acquire locks in a consistent global order."
      - "Use at least as many threads as locks."
      - "Hold all locks for the entire program duration."
      - "Retry in a tight loop if acquisition fails."
    answer: 0

  - q: "Typically, a Future is a read-only placeholder for a result supplied later, whereas a Promise is a write-once object used to provide that result."
    options: ["True", "False"]
    answer: 0
---
