---
layout: quiz
title: "Web & Application Servers: Internal Architecture & Execution Models Quiz"
tags: [software-architecture]
questions:
  - q: "You built a web server that spawns a new thread for each client connection. As traffic grows to thousands of concurrent connections, you observe high memory usage and many threads sitting idle waiting for I/O. Which concurrency model would handle this situation more efficiently?"
    options:
      - "Increase the thread pool size to have even more threads handle connections."
      - "Fork a new process for each incoming connection instead of using threads."
      - "Use a single-threaded, event-driven (non-blocking I/O) model to manage all connections."
      - "Handle all connections sequentially on a single thread using blocking I/O."
    answer: 2
  - q: "In an application server, incoming requests need to be dispatched to the appropriate handler logic based on the URL and HTTP method. Which part of the server architecture is responsible for this mapping of requests to the correct handler?"
    options:
      - "The connection pool."
      - "The listening socket (acceptor) for incoming connections."
      - "The router component that matches requests to handlers."
      - "A middleware module that intercepts requests."
    answer: 2
  - q: "Your web application server performs a database query on every incoming request. Opening a new database connection for each request is adding significant latency and overhead. What server-side strategy can help reduce this repeated connection overhead?"
    options:
      - "Use a connection pool to reuse a set of pre-opened database connections across requests."
      - "Deploy a separate database server instance for each incoming request."
      - "Spawn a new worker process specifically to open a fresh database connection on demand."
      - "Serve cached static content from memory instead of querying the database."
    answer: 0
  - q: "A web server is sending out a large static video file to a client. You want to minimize CPU usage during this file transfer. Which technique should the server use to efficiently send the file data to the client?"
    options:
      - "Spawn multiple threads to read different parts of the file simultaneously and send them."
      - "Read the entire file into user-space memory and then write it to the socket in chunks."
      - "Compress the file on the fly before sending it to reduce the amount of data sent over the network."
      - "Utilize an OS-level zero-copy call (e.g. using `sendfile`) to transfer file data directly from disk to the socket."
    answer: 3
  - q: "You need to update your running web server application to a new version without interrupting service or dropping active connections. Which deployment approach can achieve a graceful, zero-downtime upgrade?"
    options:
      - "Terminate the existing server process and immediately start a new process with the updated code."
      - "Start a new instance of the server (or new worker processes) running the updated code, then gradually shift incoming traffic to it and shut down the old instance after it finishes ongoing requests."
      - "Pause the server process, replace the code binaries on disk, and then resume the process to pick up the changes."
      - "Overwrite the server's code files while it is running, relying on the operating system to load the changes on the fly."
    answer: 1
  - q: "On a Linux server, your application uses the `select()` system call to monitor thousands of client sockets for readiness. As concurrency grows, `select()` calls are consuming excessive CPU time scanning many file descriptors. What should you adopt to improve I/O scalability in this situation?"
    options:
      - "Switch to using an event notification interface like `epoll` (Linux) or `kqueue` (BSD) to efficiently handle large numbers of sockets."
      - "Create multiple threads, each running `select()` on a subset of the connections, to split the workload."
      - "Increase the maximum file descriptor limit and the timeout value for `select()` to reduce its overhead."
      - "Replace non-blocking I/O with a tight polling loop that continuously checks each socket for new data."
    answer: 0
  - q: "A server is designed such that when a socket is ready to read data, the main loop gets notified and then explicitly reads the data from that socket and processes it. Which I/O design pattern does this approach represent?"
    options:
      - "Proactor pattern."
      - "One-thread-per-connection pattern."
      - "Reactor pattern."
      - "Observer (publish/subscribe) pattern."
    answer: 2
  - q: "To utilize a machine with multiple CPU cores, a web server is configured to pre-launch several worker processes at startup. Each process accepts and handles a share of incoming requests independently. Which concurrency model does this describe?"
    options:
      - "A multi-threaded worker pool within one process."
      - "An event-driven single-process model."
      - "A coroutine-based cooperative multitasking model."
      - "A pre-fork multi-process architecture with multiple worker processes."
    answer: 3
  - q: "Your web server runs on a single-threaded event loop using asynchronous I/O. When one particular request performs a computationally heavy operation (a long CPU-bound loop), all other requests handled by the server slow down dramatically. Why is this happening?"
    options:
      - "The event loop thread is running at too low a priority, causing it to be deprioritized by the OS."
      - "A CPU-intensive task is blocking the single-threaded event loop, preventing it from handling other events until the task completes."
      - "The thread pool for handling events is not large enough to accommodate the heavy computation."
      - "The asynchronous I/O calls internally turned into blocking calls, causing the event loop to stall."
    answer: 1
  - q: "A web application currently uses CGI, spawning a new process for each request to run a script. You redesign it so that the scripting engine runs inside the server process itself (using a persistent interpreter or JIT-compiled VM). What is the primary performance benefit of this change?"
    options:
      - "It eliminates per-request process startup overhead by reusing a single embedded runtime, significantly reducing latency."
      - "It ensures each request executes in complete isolation from others by running in its own process."
      - "It allows static files to be served directly from memory without hitting the file system."
      - "It improves security by preventing any one request's code from affecting the main server process."
    answer: 0
  - q: "A server initiates an asynchronous read on a socket and registers a callback. The operating system (or I/O library) reads the data in the background and invokes the callback only once the read is fully complete with the data ready to use. Which concurrency pattern does this describe?"
    options:
      - "Proactor pattern."
      - "Reactor pattern."
      - "Half-synchronous/Half-asynchronous architecture."
      - "Producer-consumer pattern."
    answer: 0
  - q: "You have a dedicated listener thread accepting connections and queuing them for worker threads. During traffic spikes, some clients occasionally receive connection refusals even though worker threads are available. What is a likely cause of these refused connections?"
    options:
      - "The network interface is overloaded, causing random packet losses."
      - "The operating system's listen backlog queue is full, so new connection attempts are being dropped."
      - "The server's routing logic is running out of memory when handling too many simultaneous requests."
      - "The thread pool has too many threads, confusing the operating system’s scheduler."
    answer: 1
  - q: "A web server needs to handle many simultaneous idle connections efficiently (mostly waiting on I/O) and also perform occasional CPU-intensive computations (like image resizing). Which architecture best accommodates both high I/O concurrency and CPU-bound tasks?"
    options:
      - "Use a single event loop thread for all I/O and computation."
      - "Use a large pool of worker threads, each handling requests in a blocking manner."
      - "Use an event-driven non-blocking I/O loop for handling connections, and offload CPU-heavy tasks to a separate worker thread pool."
      - "Fork a new process for each request to isolate and handle it entirely in parallel."
    answer: 2
  - q: "An application server written in a managed language needs to perform intensive image processing on each request. Rewriting the entire server in a low-level language isn't feasible. Which approach will boost performance for the image processing task while minimizing changes to the server?"
    options:
      - "Launch an external process for each image processing operation in a low-level optimized binary."
      - "Increase the number of server threads so multiple images can be processed concurrently within the managed runtime."
      - "Rewrite the image processing logic using asynchronous calls to break the work into non-blocking chunks."
      - "Utilize a native library through the runtime's foreign function interface (e.g., JNI/FFI) to perform image processing in optimized native code."
    answer: 3
  - q: "In a Java-based web server, developers enabled hot class reloading to update code on the fly during development. If this technique is used frequently in a long-running production server, what is a potential downside to be aware of?"
    options:
      - "There are no significant downsides – the JVM can reload classes indefinitely without any negative effects."
      - "Repeated class reloading can gradually consume more memory (Metaspace) over time if old classes aren't unloaded, potentially leading to memory leaks or increased GC pressure."
      - "Each class reload wipes out all active user sessions and cached data, forcing users to re-authenticate."
      - "The server must pause or refuse new connections during each class reload, effectively causing brief downtime on every update."
    answer: 1
---
