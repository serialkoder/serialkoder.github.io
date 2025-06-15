---
layout: quiz
title: "Origins, Roles & Protocols of Web and Application Servers Quiz"
tags: [software-architecture]
questions:
  - q: "A developer is using Apache HTTP Server to serve images and static HTML files, while forwarding requests for dynamic API calls to a separate Node.js application server. What does this architecture illustrate?"
    options:
      - "The web server is placed behind the application server"
      - "Separation of concerns: a web server for static content and an application server for dynamic logic"
      - "Node.js is being used primarily as a static file server"
      - "Combining the web server and application server roles into a single tier"
    answer: 1

  - q: "During deployment of a web application, the team separates responsibilities between the web server and the application server. Which of the following is typically handled by the web server (and not by the application server)?"
    options:
      - "Serving static files (like images, CSS, and HTML) directly to clients"
      - "Executing server-side business logic for dynamic content"
      - "Performing database transactions and queries"
      - "Compiling application source code at runtime"
    answer: 0

  - q: "A team notices that their site is slow because the server opens a new TCP connection for every request (HTML, CSS, images). Which HTTP improvement addressed this by allowing a connection to remain open for multiple requests?"
    options:
      - "Persistent connections (HTTP keep-alive) in HTTP/1.1"
      - "HTTP/1.1 pipelining of requests"
      - "HTTP/2 multiplexing of requests"
      - "Chunked transfer encoding for HTTP/1.1"
    answer: 0

  - q: "A developer finds that even with persistent connections, HTTP/1.1 requests often still queue up due to head-of-line blocking. Which protocol feature was introduced to allow multiple concurrent requests over a single connection and avoid this bottleneck?"
    options:
      - "Using multiple TCP connections to fetch resources concurrently"
      - "HTTP/1.1 pipelining of requests"
      - "HTTP/2 multiplexing of requests"
      - "HTTP/3 using QUIC transport"
    answer: 2

  - q: "A user on a high-latency network finds that establishing new HTTPS connections is slow because of the TCP and TLS handshakes. Which HTTP version reduces this setup latency by using a new transport protocol that combines these handshakes?"
    options:
      - "HTTP/1.1 using TLS 1.3"
      - "HTTP/2 with HPACK header compression"
      - "Using a Content Delivery Network (CDN) for static content"
      - "HTTP/3 (QUIC) with combined transport and security handshake"
    answer: 3

  - q: "A company deploys their web application across three layers. Clients connect first to an Nginx server, which then forwards requests to a pool of application servers, which in turn query a database. What architecture style does this represent?"
    options:
      - "Two-tier client-server architecture"
      - "Three-tier architecture (presentation, application, data)"
      - "Peer-to-peer architecture"
      - "Monolithic single-layer architecture"
    answer: 1

  - q: "A startup places an Nginx reverse proxy in front of its application servers. Which of the following is a benefit of this approach?"
    options:
      - "Allowing users to directly query the database from the browser"
      - "Shifting all network latency to the backend servers"
      - "Moving the application's business logic into the web browser"
      - "Load balancing incoming requests across multiple servers"
    answer: 3

  - q: "A company finds its application servers are using high CPU to handle SSL encryption for each request. They want to offload TLS encryption and HTTP compression to another component. What solution should they implement?"
    options:
      - "Introduce a reverse proxy or load balancer to handle TLS termination and compression"
      - "Perform all encryption on the database server instead"
      - "Make the client handle encryption and send plain HTTP to the server"
      - "Disable TLS to eliminate the overhead"
    answer: 0

  - q: "A web application is slow to deliver static assets (images, CSS), and the application servers are overburdened serving these files. What strategy would improve load times and reduce server load?"
    options:
      - "Increase the complexity of database queries for static content"
      - "Have the application regenerate static files on every request"
      - "Use caching or a CDN to offload serving static assets"
      - "Switch from HTTP to FTP for delivering files"
    answer: 2

  - q: "An organization uses Nginx as a front-end server that terminates SSL, compresses responses, serves static files, and routes requests to backend services. Why is this architecture beneficial?"
    options:
      - "It breaks the layered design by handling multiple responsibilities at once"
      - "It offloads work from the application servers (SSL, compression, static content), improving overall performance"
      - "It slows down each request by introducing an extra network hop"
      - "It adds complexity with no performance or manageability benefits"
    answer: 1

  - q: "Which of the following statements is a common misconception about web servers versus application servers?"
    options:
      - "Web servers primarily handle HTTP requests for static content and can forward dynamic requests to an app server"
      - "In a multi-tier setup, a web server or reverse proxy often sits in front of application servers"
      - "Application servers often include built-in web server components to handle HTTP and dynamic content"
      - "Web server and application server mean the same thing, with no difference in roles"
    answer: 3

  - q: "During an interview, a candidate says: \"Our web server handles all the business logic and database calls, and our application server is only used for serving static files.\" What is the problem with this description?"
    options:
      - "Nothing is wrong; that description is perfectly fine"
      - "They should have included a separate database server in the description"
      - "It completely reverses the typical roles: normally the app server handles logic and data while the web server handles static content"
      - "The only problem is that static files should be on a CDN instead of the application server"
    answer: 2

  - q: "Which of these websites would NOT require a separate application server to deliver its content?"
    options:
      - "A complex e-commerce site with user accounts and dynamic pricing"
      - "A real-time analytics dashboard that queries a database for each user"
      - "A personal blog of static HTML pages and images"
      - "A social media platform with interactive user feeds and login"
    answer: 2

  - q: "In the 1990s, a web server executes a Perl script to generate dynamic content, passing request data via environment variables to the script and reading back the output. Which standard mechanism is the server using to interface with the external program?"
    options:
      - "AJAX (Asynchronous JavaScript and XML)"
      - "CGI (Common Gateway Interface)"
      - "ODBC (Open Database Connectivity)"
      - "A reverse proxy pass-through"
    answer: 1

  - q: "A team builds a web application using Node.js and Express without a separate web server (like Apache or Nginx). In this setup, which statement is true about how the server operates?"
    options:
      - "The Node.js application handles HTTP requests and application logic together (acting as both web server and app server)"
      - "Static files cannot be served in this configuration"
      - "A dedicated web server is required for any dynamic content"
      - "The Node.js server cannot handle high traffic without an Apache front-end"
    answer: 0
---
