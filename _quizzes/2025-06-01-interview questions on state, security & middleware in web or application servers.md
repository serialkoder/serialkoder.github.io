---
layout: quiz
title: "Interview Questions on State, Security & Middleware in Web/Application Servers"
questions:
  - q: "A web application is deployed on multiple servers behind a load balancer. Users report being logged out when their requests go to a different server. What is a quick, configuration-only solution to maintain session continuity for each user?"
    options:
      - "Enable session stickiness (session affinity) on the load balancer to keep each user’s traffic on one server."
      - "Store session data in a shared database or in-memory cache accessible by all servers."
      - "Use a JWT (JSON Web Token) stored on the client side to avoid server-side session storage altogether."
      - "Increase the session timeout so that sessions last longer across user interactions."
    answer: 0
  - q: "An internal microservice API must ensure that only clients with valid digital certificates can connect, providing mutual identity verification on top of TLS encryption. Which mechanism best meets this requirement?"
    options:
      - "OAuth 2.0 client credentials grant (two-legged OAuth)."
      - "HTTP Basic Authentication (username/password) over TLS."
      - "Mutual TLS (mTLS), where the client must also present a trusted certificate."
      - "An API gateway that checks for a valid API key on each request."
    answer: 2
  - q: "A developer has added identical request logging code to dozens of handler functions in a web service. What is a better architectural approach to implement request logging across all requests?"
    options:
      - "Create a dedicated logging service and forward each request to it for logging."
      - "Use a middleware or filter component that logs each request in one place before it reaches the handlers."
      - "Use a static global variable to track requests and log them after processing."
      - "Add database triggers to log each request whenever a database write occurs."
    answer: 1
  - q: "To mitigate cross-site scripting (XSS) attacks by controlling which sources of scripts can execute on your web pages, which HTTP header should you configure?"
    options:
      - "Content-Security-Policy (CSP) header specifying allowed script sources."
      - "HTTP Strict-Transport-Security (HSTS) header to enforce use of HTTPS."
      - "X-Frame-Options header to disallow framing of your content by other sites."
      - "Set the HttpOnly and Secure flags on session cookies."
    answer: 0
  - q: "Users can upload files via your web application, but very large uploads are causing memory issues on the server. What’s the best way to prevent excessively large request bodies from impacting the server?"
    options:
      - "Implement client-side checks to prevent users from selecting files above a certain size."
      - "Accept the upload fully, then discard it in the application if it’s above the size limit."
      - "Store uploaded files in the database and rely on a database size constraint to reject huge files."
      - "Configure the server or a middleware component to reject requests larger than a defined size limit."
    answer: 3
  - q: "Your web application cluster uses load balancer session affinity (sticky sessions) to maintain user sessions on one server. What is a potential drawback of relying on sticky sessions for session management?"
    options:
      - "All servers must constantly replicate session data to each other, adding network overhead."
      - "One server can become overloaded if too many users’ sessions are bound to it, causing an imbalance."
      - "Users will be logged out whenever a new server instance is added to the cluster."
      - "It forces the application to only use unencrypted HTTP because encryption breaks session affinity."
    answer: 1
  - q: "You need to allow third-party web applications to act on behalf of your users (with their consent) without sharing user passwords. Which authentication standard is most appropriate for this scenario?"
    options:
      - "SAML 2.0 (Security Assertion Markup Language) federation."
      - "HTTP Basic Authentication with Base64-encoded credentials."
      - "Providing each partner with an API key tied to a user’s account."
      - "OAuth 2.0 Authorization Code flow for third-party delegation."
    answer: 3
  - q: "Several endpoints in your REST API should only be accessible to users with an administrator role. How can you enforce this rule uniformly without duplicating the authorization logic in every endpoint handler?"
    options:
      - "Implement an authorization middleware that runs before those endpoints and verifies the user’s role against allowed roles."
      - "Include role-checking logic in each controller/handler for the protected endpoints."
      - "Rely on the client application to hide or disable admin-only UI features."
      - "Add SQL checks in the database to prevent returning data for unauthorized users."
    answer: 0
  - q: "You plan to extend an open-source web server’s functionality by adding custom request processing logic, but you don’t want to maintain a fork of the server’s code. What’s a proper way to integrate your custom logic?"
    options:
      - "Modify the server’s core source code to include your feature, and recompile it for your needs."
      - "Implement a separate proxy service that intercepts requests before they reach the web server, handling your custom processing."
      - "Use the server’s plugin or middleware extension mechanism to insert a custom request handler module."
      - "Schedule a periodic job that injects your logic into the server’s process at runtime via an API."
    answer: 2
  - q: "Your web application has a state-changing endpoint (e.g. transferring funds) that is being triggered by malicious cross-site requests (CSRF) when a user visits an attacker’s page while logged in. What defense can you implement to prevent such Cross-Site Request Forgery exploits?"
    options:
      - "Only allow the endpoint to be called over HTTPS."
      - "Require a secret, unpredictable CSRF token with each state-changing request and verify it on the server."
      - "Validate all user input to filter out malicious values before processing the request."
      - "Implement IP-based rate limiting on the state-changing endpoint."
    answer: 1
  - q: "Your team is replacing server-side session storage with stateless JWTs for user sessions to improve scalability. What is a known challenge introduced by using stateless JWTs for session management?"
    options:
      - "JWTs will drastically increase memory usage on each server because they store more data than session IDs."
      - "There is no easy way to immediately revoke or invalidate a JWT (e.g. on logout) until it expires, since the server keeps no session state."
      - "JWTs cannot be used over HTTPS due to their size and encoding format."
      - "Using JWTs requires clients to constantly synchronize their clocks with the server."
    answer: 1
  - q: "A web framework lets you register multiple middleware components that process an HTTP request sequentially (each can modify the request/response or decide to stop the propagation). This middleware pipeline is an example of which design pattern?"
    options:
      - "Observer pattern."
      - "Decorator pattern."
      - "Chain of Responsibility pattern."
      - "Factory pattern."
    answer: 2
  - q: "An API gateway in front of your services performs IP-based rate limiting and also verifies OAuth access tokens on incoming requests. To minimize wasted work under high traffic, what is a sensible order to apply these checks?"
    options:
      - "Enforce the IP rate limit first, drop excessive requests immediately, then validate authentication on the remaining requests."
      - "Perform user authentication (token verification) first, then apply rate limiting only to authenticated requests."
      - "Execute token validation and rate limiting in parallel threads to handle the load concurrently."
      - "The order doesn’t matter, since both checks will be done before the request reaches the service."
    answer: 0
  - q: "To ensure no single user exceeds 5 requests per second, an engineer proposes enforcing this limit within the database layer (e.g. rejecting queries if a user’s requests exceed the threshold). What is a major downside of this approach?"
    options:
      - "The database would need to run in a special mode to track request rates, which is impractical."
      - "It could violate ACID properties by mixing transaction logic with rate limiting control."
      - "Each request still goes through the app and hits the DB, so the limit is enforced inefficiently late in the process."
      - "Modern databases already have built-in rate limiting, making custom logic redundant and potentially conflicting."
    answer: 2
  - q: "In a web application, a developer placed a business-specific rule (e.g. calculating a user’s discount eligibility) inside a global request middleware so it runs on every request. Why is implementing business logic in the middleware layer generally discouraged?"
    options:
      - "Middleware cannot access databases or back-end services, so it cannot perform complex business calculations."
      - "The middleware runs at the wrong time in the request cycle, after the response is already generated."
      - "Middleware execution isn’t logged or monitored, making business operations there invisible and non-auditable."
      - "Middleware should handle generic cross-cutting concerns (logging, auth, etc.), so mixing domain logic into it violates separation of concerns."
    answer: 3
---
