---
layout: quiz
title: "Broker Architecture Pattern Quiz"
questions:
  - q: "Which of the following best describes the Broker Architecture Pattern?"
    options:
      - "An architecture for distributed systems where a broker mediates communication between decoupled components."
      - "An architecture where clients and servers communicate directly without intermediaries."
      - "A design pattern for user interfaces separating data, business logic, and presentation."
      - "A pattern where all components share a global database to exchange information."
    answer: 0

  - q: "What are the three primary component roles in the Broker architecture pattern?"
    answer: "Clients, Broker, and Servers"

  - q: "True or False: In a Broker architecture, the Broker component acts as an intermediary that handles communication between clients and servers."
    options:
      - "True"
      - "False"
    answer: 0

  - q: "Which of the following is a key benefit of using the Broker architecture pattern?"
    options:
      - "It tightly couples clients with servers for faster communication."
      - "It allows clients to invoke services without knowing their network location (location transparency)."
      - "It eliminates the need for any communication protocols or data serialization."
      - "It ensures there is no overhead or latency when calling remote services."
    answer: 1

  - q: "True or False: In a Broker architecture, the broker can become a single point of failure if no backup or fail-over strategy exists."
    options:
      - "True"
      - "False"
    answer: 0

  - q: "Name one disadvantage or challenge of using the Broker architecture pattern."
    answer: "Possible answers include added latency/overhead, broker bottleneck, increased complexity, or risk of a single point of failure."

  - q: "Which statement about the Broker architecture pattern is FALSE?"
    options:
      - "It decouples clients and servers through an intermediary component."
      - "It requires a standardized communication interface or protocol between components."
      - "It eliminates network latency by allowing direct client-to-server communication."
      - "It allows the system to scale by adding or removing services without changing client code."
    answer: 2

  - q: "What is the role of client-side proxies (stubs) in a Broker architecture?"
    answer: "They mimic the server interface on the client, marshal requests, forward them to the broker, and unmarshal responses—making remote calls appear local."

  - q: "How does a broker typically locate the appropriate service provider for a client request?"
    options:
      - "Via a naming/registry service that maps the request to the correct server."
      - "Clients specify the exact network address of the server in every request."
      - "By broadcasting each request to all servers and waiting for a response."
      - "The broker chooses a random server without any lookup."
    answer: 0

  - q: "True or False: Communication between clients and servers in the Broker pattern must be synchronous."
    options:
      - "True"
      - "False"
    answer: 1

  - q: "Briefly outline the sequence of steps that occur when a client invokes a remote service through a Broker."
    answer: |
      1. Client calls its local proxy.
      2. Proxy marshals the request and sends it to the broker.
      3. Broker looks up the target server and forwards the request.
      4. Server processes the request and returns a response to the broker.
      5. Broker relays the response to the client proxy, which unmarshals it for the client.

  - q: "What is a likely performance impact of introducing a broker into an architecture?"
    options:
      - "Lower latency, because the broker removes network hops."
      - "Higher latency, due to an extra hop and processing in the broker."
      - "Clients execute faster, since the broker handles business logic."
      - "No change, because the broker only forwards messages with zero overhead."
    answer: 1

  - q: "The Broker pattern can be viewed as an extension of which fundamental architecture style?"
    options:
      - "Client-Server"
      - "Model-View-Controller (MVC)"
      - "Pipe-and-Filter"
      - "Peer-to-Peer"
    answer: 0

  - q: "Give one real-world scenario where a Broker architecture is appropriate and explain why."
    answer: "Example: An enterprise service bus mediating dozens of heterogeneous services so each can discover and invoke others without tight coupling."

  - q: "True or False: The Broker architecture can facilitate communication between components written in different languages or on different platforms, provided they follow the broker’s protocol."
    options:
      - "True"
      - "False"
    answer: 0

  - q: "True or False: The Broker pattern is essentially the same as a publish-subscribe (pub/sub) pattern."
    options:
      - "True"
      - "False"
    answer: 1

  - q: "Which strategy can help prevent the broker from becoming a single point of failure?"
    options:
      - "Using multiple brokers or a broker cluster for redundancy."
      - "Having clients bypass the broker and connect directly to servers."
      - "Restricting the number of clients allowed to connect."
      - "Running the broker on the fastest single machine available."
    answer: 0

  - q: "In a Broker architecture, what must be standardized between clients and servers to allow them to communicate?"
    answer: "A common communication protocol or message format (interface definition, serialization scheme, etc.)."

  - q: "What is marshalling (serialization) in the context of a Broker system, and why is it important?"
    answer: "Marshalling converts data/objects into a transmittable format; the broker relies on it to send requests and responses across the network and to reconstruct them on the receiving side."

  - q: "Which of the following technologies exemplifies the Broker architecture pattern?"
    options:
      - "A message queue (e.g., RabbitMQ) that mediates communication between services."
      - "A monolithic application where all function calls are in-process."
      - "A client directly connecting to a database using SQL."
      - "An MVC web application with no intermediary."
    answer: 0
---
