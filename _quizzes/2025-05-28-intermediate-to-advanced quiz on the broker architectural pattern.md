---
layout: quiz
title: "Broker Architecture Pattern Quiz"
tags: [software-architecture]
questions:
  - q: "In a broker-based distributed system, a client invokes a remote service using a local proxy object. Which statement best describes the roles of the client proxy and server skeleton?"
    options:
      - "The client proxy acts as the central router, while the server skeleton is a registry for service addresses."
      - "The broker pattern doesn’t use proxies or skeletons; the client and server communicate directly over the network."
      - "The client proxy marshals the request to the broker, and the server skeleton unmarshals it and invokes the target service."
      - "The client proxy contains the full business logic of the service, and the server skeleton simply forwards it to the broker."
    answer: 2

  - q: "In a broker-based system, a new server instance is deployed at a different network location, yet clients can immediately start using it without any code changes. What enables this dynamic re-routing?"
    options:
      - "Clients automatically scan the network to discover new service endpoints on startup."
      - "The broker uses a naming/registry service to dynamically bind client requests to the new service’s address at runtime."
      - "All possible server addresses are pre-programmed into the client proxies, including the new one."
      - "The broker pattern doesn’t support dynamic addition; the scenario described is not possible without recompiling clients."
    answer: 1

  - q: "A client sends a complex object to a remote server via a broker. How is the object transferred over the network?"
    options:
      - "The broker automatically understands all object formats and directly shares the memory between client and server."
      - "The client writes the object to a shared file system that the server then reads from."
      - "The client sends a pointer to the object’s memory, which the server dereferences to access the data."
      - "The client proxy serializes (marshals) the object into a network message format that the server can deserialize."
    answer: 3

  - q: "The broker pattern provides location transparency, allowing remote calls to use the same syntax as local calls. However, a developer notices remote calls are much slower than local calls. What does this illustrate about distributed systems?"
    options:
      - "Even with location transparency, remote calls incur network latency and overhead, so they will always be slower than local calls."
      - "The broker pattern is supposed to make remote calls as fast as local calls, so the slow performance indicates a bug in the broker."
      - "Location transparency eliminates network costs; if remote calls are slow, the network must be misconfigured."
      - "The broker should have cached the results; otherwise remote calls wouldn’t appear slower."
    answer: 0

  - q: "A client application’s GUI becomes unresponsive while waiting for a response from a remote service via the broker. What change would prevent the UI from freezing during remote calls?"
    options:
      - "Replace the broker with direct socket calls to reduce call duration significantly."
      - "Use the broker’s address caching to speed up the remote call and return faster."
      - "Make the service call asynchronously (e.g., on a separate thread or with a callback) so the UI thread isn’t blocked waiting for the response."
      - "Continuously ping the broker from the UI while waiting, to ensure it is still connected."
    answer: 2

  - q: "A client’s remote request through the broker sometimes hangs indefinitely because the target server never responds. What mechanism should be added to handle this gracefully?"
    options:
      - "Allow the call to block indefinitely, assuming the server will eventually recover and respond."
      - "Set a reasonable timeout for remote calls and implement a retry or fallback logic when the call does not return in time."
      - "Remove any timeouts so the call waits as long as necessary for the server to respond."
      - "Rely on the broker to eventually detect the failed server and automatically return a response."
    answer: 1

  - q: "In a broker setup with multiple server instances providing the same service, one instance is getting all the requests and becoming overloaded. How can the broker address this imbalance?"
    options:
      - "Reduce the number of server instances to one, removing the risk of uneven load distribution."
      - "Have clients explicitly choose which server instance to call on each request."
      - "Always send requests to the first server instance until it fails, then switch to the next one."
      - "Introduce a load-balancing strategy (e.g., round-robin or least-load) in the broker to distribute requests evenly among the server instances."
    answer: 3

  - q: "While implementing a custom protocol for the broker, the developer finds that multiple messages sent over a TCP connection sometimes get concatenated or split unpredictably. What is likely missing in the implementation?"
    options:
      - "Using UDP instead of TCP so that each message is guaranteed to be delivered as a separate packet."
      - "Proper message framing (using delimiters or length headers) to delineate where each message starts and ends in the byte stream."
      - "Encryption of the messages before sending, to prevent them from merging in transit."
      - "Nothing – TCP automatically preserves message boundaries, so the issue must lie elsewhere."
    answer: 1

  - q: "One of the services behind the broker has become unresponsive, causing every request to it to time out and hang the client. Which resilience pattern can the broker or client employ to avoid repeatedly waiting on a non-responsive service?"
    options:
      - "Greatly increase the network timeout to give the unresponsive service extra time to respond to each request."
      - "Continuously retry the request in a tight loop until the service responds, to increase the chance of success."
      - "Use a Circuit Breaker that ‘trips’ after a certain number of failures, so further calls fail fast instead of hanging."
      - "Send multiple duplicate requests (hedged requests) simultaneously to the same service instance to get a faster response."
    answer: 2

  - q: "In a secure broker architecture, the team needs to encrypt communications and ensure the end service can authenticate the original user making the request. What should be implemented?"
    options:
      - "Rely on the internal network’s security and have the broker act as the sole trusted identity for all requests."
      - "Use basic HTTP authentication over plain HTTP since the broker is internal and will hide credentials from outside."
      - "Use one-way TLS (server certificates only) and let the broker authenticate users without passing any credentials to the server."
      - "Employ mutual TLS for all connections (client-to-broker and broker-to-server) for encryption and mutual authentication, and have the broker forward the client’s auth token to the service."
    answer: 3

  - q: "In a distributed system using a broker, the team wants to trace requests end-to-end and measure performance across components. What approach will improve observability for calls that go through the broker?"
    options:
      - "Measure overall latency only at the client side, since internal metrics from broker and services aren’t necessary for understanding performance."
      - "Have the broker log all requests and responses to a file and use those logs to manually piece together timing information."
      - "Implement distributed tracing by assigning each request a unique trace ID that the broker and services propagate, and record metrics (like latency) at each hop."
      - "Use the broker’s timestamp for request start and end, and assume the time inside the service is negligible."
    answer: 2

  - q: "A certain service in the broker architecture occasionally experiences very high latency for some requests (long-tail response times). What pattern can help reduce the impact of these outlier slow responses for clients?"
    options:
      - "Throttle requests to that service so it never gets too many concurrent requests, preventing any single request from being slow."
      - "Use hedged requests by sending the same request to multiple service instances in parallel and using the fastest response while discarding slower ones."
      - "Add a caching layer so that slow responses are served from cache instead of hitting the service."
      - "Apply a Circuit Breaker to stop calling the service as soon as one slow response is observed."
    answer: 1

  - q: "The team is choosing between a broker pattern, a message bus, or a service mesh for their system. Which statement correctly distinguishes these options?"
    options:
      - "The broker pattern uses client-side proxies and a central broker for request/reply calls; a message bus enables asynchronous publish/subscribe messaging; a service mesh handles communication concerns (like routing and security) transparently at the infrastructure level."
      - "A service mesh and a broker are essentially the same – both require modifying application code to include proxies for remote communication."
      - "A message bus is just another name for the broker pattern, except a message bus only works for synchronous calls."
      - "Unlike the broker pattern, a service mesh cannot perform load balancing or encryption of traffic between services."
    answer: 0

  - q: "In a system with a single broker instance, the broker has become a single point of failure and is nearing its throughput limit. What is a recommended way to improve availability and scalability of the broker?"
    options:
      - "Bypass the broker by letting clients communicate directly with servers to remove the bottleneck."
      - "Deploy multiple broker instances (a clustered or replicated broker architecture) so that if one fails or becomes overloaded, others can continue handling requests."
      - "Upgrade the broker machine with the fastest hardware possible and continue with the single-broker deployment."
      - "Assume the broker will not fail and focus on optimizing its code for better performance on a single node."
    answer: 1

  - q: "Maintaining the broker pattern has become difficult because developers hand-write every client proxy and server skeleton for each service, leading to bugs when interfaces change. What is a better approach?"
    options:
      - "Let each team implement proxies and skeletons in their own way to encourage creative solutions to integration."
      - "Create one universal client proxy that can handle requests for all services without needing service-specific code."
      - "Embed all service logic directly into the broker to eliminate the need for proxies and skeletons entirely."
      - "Define the service interfaces in an IDL (Interface Definition Language) and auto-generate the client proxies and server skeletons from those definitions."
    answer: 3
---
