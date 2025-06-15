---
layout: quiz
title: "State, Security & Middleware Ecosystem – Interview Prep Questions"
tags: [software-architecture]
questions:
  - q: "A stateful web app runs on two servers behind a load balancer. Users report being logged out when their requests switch between servers. Session data is stored in-memory on each server. Which solution addresses this issue with minimal changes?"
    options:
      - "Enable session affinity (sticky sessions) on the load balancer."
      - "Have the client send periodic heartbeats to keep the session alive."
      - "Increase the session expiration timeout on the servers."
      - "Remove one server from rotation to force all users onto a single node."
    answer: 0
  - q: "After adding a comment feature, you discover users can include <script> tags in comments that execute in other users’ browsers. What kind of vulnerability is this, and how can it be mitigated?"
    options:
      - "**Cross-Site Request Forgery (CSRF)** – Mitigate with anti-CSRF tokens for state-changing requests."
      - "**Cross-Site Scripting (XSS)** – Mitigate by sanitizing inputs or encoding output on render."
      - "**SQL Injection** – Mitigate by using parameterized queries for database access."
      - "**Command Injection** – Mitigate by validating and escaping inputs used in system commands."
    answer: 1
  - q: "For auditing purposes, your team must log details of every HTTP request in your application. Which approach is the most maintainable?"
    options:
      - "Add logging code to each individual request handler in the application."
      - "Have client applications log the requests and send log files to the server."
      - "Use a middleware component that intercepts and logs every incoming request centrally."
      - "Increase the server’s log verbosity to include all request details."
    answer: 2
  - q: "Multiple malicious IP addresses are bombarding your web service. A junior developer suggests adding an IF check in every endpoint to drop requests from those IPs. What’s a better way to handle this?"
    options:
      - "Implement the IP block check inside each service endpoint as proposed."
      - "Have each microservice maintain its own in-memory blocklist and filter there."
      - "Rely on the clients to stop sending malicious requests on their own."
      - "Block those IPs at the load balancer or firewall before they reach the application."
    answer: 3
  - q: "Your application uses stateless JWTs (JSON Web Tokens) for user authentication instead of server sessions. How should the server manage user state across requests in this model?"
    options:
      - "Create a server-side session on first request and store user data in memory."
      - "Rely on the JWT’s embedded claims on each request without storing session data on the server."
      - "Use sticky sessions so each user’s requests always go to the same server after JWT verification."
      - "Ask the client to switch to a cookie-based session approach for persistence."
    answer: 1
  - q: "Your public API is being abused by a single client sending hundreds of requests per second, starving resources for others. What’s the best mitigation strategy?"
    options:
      - "Launch additional server instances to handle the increased load from that client."
      - "Introduce a fixed 1-second delay in processing each request from that client."
      - "Log the high traffic from that client and continue processing all requests as usual."
      - "Enforce a rate limit for that client via a middleware or API gateway throttle."
    answer: 3
  - q: "Your server receives a JWT bearer token on each request to a protected API. How should the server handle authentication with this token?"
    options:
      - "Verify the token’s signature and claims on every request before allowing access to protected resources."
      - "Assume the token is valid after the first successful verification to avoid repeated checks."
      - "Trust any well-formed token and decode it without verifying the signature each time."
      - "Require users to re-authenticate for each request instead of using the token after login."
    answer: 0
  - q: "You have a web application using cookie-based sessions. How can you prevent malicious third-party websites from tricking a user’s browser into executing unauthorized actions on your site?"
    options:
      - "Rigorously validate and sanitize all user inputs on the server."
      - "Use HTTPS for all user interactions to prevent eavesdropping on traffic."
      - "Implement anti-CSRF tokens and require them for any state-changing requests."
      - "Only accept JSON requests instead of form submissions to the site."
    answer: 2
  - q: "Several API endpoints are meant for administrators only. Right now, each handler function checks if the authenticated user’s role is \"admin.\" How can you enforce this access control more consistently?"
    options:
      - "Continue performing role checks within each endpoint to allow custom handling per route."
      - "Implement a centralized authorization middleware that checks user roles before reaching those endpoints."
      - "Rely on the front-end to hide or disable admin features instead of checking roles on the back-end."
      - "Use a single shared admin API key for all admin requests rather than user-specific roles."
    answer: 1
  - q: "A client occasionally sends extremely large HTTP requests (hundreds of MB of data) to your application server, causing high memory usage. What defensive measure should you implement?"
    options:
      - "Set a maximum acceptable request size and reject any request above that limit."
      - "Stream the request data and accept it completely regardless of size."
      - "Increase the server’s RAM and timeout settings to better handle very large requests."
      - "Automatically compress incoming request bodies to reduce their size in transit."
    answer: 0
  - q: "In a microservices architecture, five different services ended up implementing the same input validation logic, resulting in duplicated code and inconsistent updates. What is a more maintainable way to handle this cross-cutting concern?"
    options:
      - "Accept the duplication to keep each service fully independent and just document the logic."
      - "Refactor the validation into a shared library or a middleware service that all services use."
      - "Remove the validation from most services and assume the first service will validate the data."
      - "Periodically copy and paste updates of the validation code into all five services to keep them in sync."
    answer: 1
  - q: "You are adding three middleware components to your web server: one for authenticating requests, one for compressing responses, and one for encrypting responses. To maximize efficiency and security, in which order should these middleware actions be applied?"
    options:
      - "Compress the response, then encrypt it, then perform authentication last."
      - "Encrypt the response first, then authenticate the request, then compress the data."
      - "Authenticate the request first, then compress the response, then encrypt the response."
      - "Authenticate the request first, then encrypt the response, then compress the encrypted data."
    answer: 2
  - q: "For secure internal service-to-service communication, you need to verify the calling client’s identity without adding a separate authentication request for each call. Which approach meets this requirement best?"
    options:
      - "Use mutual TLS (mTLS) so that each client presents a certificate and is authenticated during the SSL/TLS handshake."
      - "Issue each client an API key and look up the client identity in a database on every request."
      - "Require an OAuth2 authorization code flow for each internal request between services."
      - "Use HTTP Basic Auth with a username and password on each request over HTTPS."
    answer: 0
  - q: "Your REST API uses stateless JWTs for user sessions. Now the security team requires that when a user account is deactivated, any active token for that user should be immediately invalidated. The solution should minimize impact on the API’s stateless, scalable design. What’s the best approach?"
    options:
      - "Take no special action; rely on the JWT’s expiration time to eventually invalidate the token."
      - "Abandon stateless JWTs and switch the application to use server-based sessions for all users."
      - "Increase the JWT lifespan and embed a flag in it so it can be revoked (which still requires waiting)."
      - "Use short-lived JWT access tokens and maintain a server-side revocation list for tokens that should be invalidated early."
    answer: 3
  - q: "You want to let third-party developers extend your web server’s functionality (e.g., adding custom request handling or auth rules) without modifying the core server code. What design approach would allow this?"
    options:
      - "Let third parties fork the server’s source code to implement their custom features independently."
      - "Restrict the server to built-in features only and do not allow any external extensions."
      - "Design a plugin architecture that provides defined extension points where custom modules can plug into the server."
      - "Allow third-party code to be `eval()`ed inside your server’s request handlers at runtime for flexibility."
    answer: 2
---
