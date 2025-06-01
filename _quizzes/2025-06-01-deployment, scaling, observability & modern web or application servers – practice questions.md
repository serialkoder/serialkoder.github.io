---
layout: quiz
title: "Deployment, Scaling, Observability & Modern Web/Application Servers – Practice Questions"
questions:
  - q: "A company has a web front-end in a public subnet (multiple instances) and an application tier in a private subnet (multiple instances). They want to evenly distribute requests at both tiers and ensure the app tier isn’t directly exposed to the internet. Which architecture meets these requirements?"
    options:
      - "Use an internet-facing load balancer for the web tier, and an internal load balancer between web and app tiers."
      - "Use one internet-facing load balancer that sends traffic directly to app servers in the private subnet."
      - "Assign public IPs to all web servers and have them directly communicate with app servers (no load balancer for app)."
      - "Place a load balancer only in front of the database that the app tier uses."
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
  - q: "Users report slower responses from a web app during peak hours, yet error rates remain low and throughput is steady. Monitoring shows each server’s CPU is near 100 % utilization. According to the Four Golden Signals, which issue is the primary cause of the slowness?"
    options:
      - "Traffic – the number of incoming requests is exceeding normal levels."
      - "Errors – the rate of failing requests is very high."
      - "Latency – network delays between services are increasing."
      - "Saturation – a resource like CPU is fully utilized, creating a bottleneck."
    answer: 3
  - q: "Your news website generates dynamic pages that update every few seconds. Rendering each page is expensive, but users could tolerate content up to 5 s out of date. What approach will dramatically reduce server load and response times with minimal staleness in content?"
    options:
      - "Scale the web servers vertically (upgrade to more powerful machines to handle load)."
      - "Cache each page’s response for a few seconds (micro-caching) at the edge or CDN, so repeated requests serve pre-generated content."
      - "Disable all caching to ensure every request gets fresh data directly from the server."
      - "Only serve content after it’s fully updated to guarantee freshness, even if users have to wait longer."
    answer: 1
  - q: "You run a service in two AWS regions to serve a global user base. You want each user to connect to the nearest region for lower latency. What is an effective approach to route users to the closest regional cluster?"
    options:
      - "Use a single Application Load Balancer in one region and configure it to forward requests to instances in other regions as needed."
      - "Let users manually choose their preferred region in the application settings to ensure they use the closest server."
      - "Use global DNS-based routing (e.g., latency or geolocation routing) to direct each user’s request to the nearest regional endpoint."
      - "Use one Auto Scaling group spanning both regions so instances automatically move to the region closest to each user."
    answer: 2
  - q: "A background processing service pulls tasks from a queue. Even when the queue backlog grows and tasks are delayed, the service’s CPU usage remains low. The auto-scaling policy is currently based on CPU utilization. What’s the better metric to trigger auto-scaling for this workload?"
    options:
      - "Increase the CPU utilization threshold for scaling since CPU isn’t the bottleneck."
      - "Monitor memory usage and scale out when memory consumption rises due to queued tasks."
      - "Switch to manual scaling only when delays become noticeable."
      - "Scale out based on the number of pending tasks in the queue (queue length) instead of CPU usage."
    answer: 3
  - q: "Your team wants to release a new feature to only 10 % of users initially, without deploying a separate version of the application for those users. The new code is already deployed to production but disabled by default. What release technique would best achieve this?"
    options:
      - "Use a feature flag to toggle the feature on for 10 % of users, controlling exposure within the same application deployment."
      - "Deploy a Blue/Green environment and send 10 % of traffic to the new environment with the feature enabled."
      - "Perform a canary deployment by releasing a new application version to 10 % of the servers and gradually increasing it."
      - "Launch a separate “beta” service that implements the new feature and route 10 % of users to it."
    answer: 0
  - q: "A user request in your application goes through five different microservices. Users occasionally experience slow responses, but it’s unclear which service in the chain is causing the delay. What is the best way to pinpoint the bottleneck across these services?"
    options:
      - "Add extensive logging in each service and manually correlate timestamps to follow the request path."
      - "Implement distributed tracing so that each request carries a trace ID and you can see the timing through all microservices."
      - "Monitor CPU and memory usage on each service’s servers to identify which one is under high load during slow requests."
      - "Increase the timeout values between services to mask the delays and prevent user-facing errors."
    answer: 1
  - q: "An AWS Lambda-based web API shows high latency for the first request after the function has been idle. This delay is impacting user experience. What’s the most effective way to reduce the cold-start latency?"
    options:
      - "Move the function to a dedicated always-on server (e.g., run it on an EC2 instance) to avoid cold starts entirely."
      - "Increase the memory allocation for the Lambda function, hoping the increased CPU allocation will speed up initialization."
      - "Enable provisioned concurrency for the Lambda or schedule periodic “warm-up” invocations to keep function instances initialized."
      - "Put a CDN in front of the Lambda function’s API endpoint to cache responses and shield the function from cold traffic."
    answer: 2
  - q: "A social media platform expects a 50× traffic spike during a one-time live event tomorrow. The application is running in AWS with auto-scaling enabled. What should the team do to ensure the service can handle the sudden surge?"
    options:
      - "Pre-scale the system by scheduling a manual scale-out or increasing desired capacity beforehand, and verify AWS quota limits are high enough for a 50× increase."
      - "Rely on the auto-scaling group to launch instances as the traffic spike happens, since it will react and add 50× more instances in time."
      - "Scale vertically by moving the application to a single very large instance that can handle 50× the load, instead of many small instances."
      - "Disable health checks and auto-scaling changes during the event to prevent the system from replacing or adding instances while it’s handling the load."
    answer: 0
  - q: "Your team uses canary deployments to gradually roll out new microservice versions. However, a particular new feature in the latest release should only be available to a small beta tester group even after the new version is fully rolled out to all servers. How can you manage this feature rollout?"
    options:
      - "Continue the canary deployment but never go beyond 10 % traffic, keeping the new feature limited to that fraction of users indefinitely."
      - "Use feature flags in the application to expose the feature only to beta users, even though the new version is deployed to everyone."
      - "Use a Blue/Green deployment strategy and keep the green (new) environment serving only beta users while blue serves all other users."
      - "Create a separate microservice for the new feature and route only beta user requests to that service, keeping it independent of the main release."
    answer: 1
  - q: "During a canary deployment, 5 % of user traffic is routed to version 2.0 of a service while 95 % still use version 1.0. Shortly after starting the canary, you observe the new version has a higher error rate and longer response times than the old version. What is the best course of action?"
    options:
      - "Immediately increase the canary traffic to 50 % to see if the issue persists under higher load."
      - "Ignore the minor degradation since only a small percentage of users are affected, and continue gradually increasing the canary."
      - "Push the new version out to 100 % of users to gather more data faster, then address any problems that arise."
      - "Halt the rollout at 5 % and investigate the cause of the errors/latency before proceeding with a wider release (or consider rolling back)."
    answer: 3
  - q: "Your application uses a global CDN for static content, but dynamic API requests still must reach servers in a single region. Users far from that region experience high latency. The team is considering running some logic on edge servers (e.g., using CloudFront Workers/Functions). Which kinds of tasks are ideal to offload to edge runtime environments to improve performance?"
    options:
      - "Simple, stateless operations or caching of content (for example, request authentication checks or formatting data) that can be done close to the user without needing centralized data."
      - "Intensive database transactions that require strong consistency, by replicating your primary database to every edge location for faster writes."
      - "All business logic and microservices, including those that rely on real-time centralized data, to fully distribute your application globally."
      - "Only serving static images and scripts from edge; dynamic processing should always remain in the central servers."
    answer: 0
  - q: "A legacy web application stores user session data in-memory on the web server, requiring “sticky sessions” (each user is tied to a specific server). This makes scaling and failover difficult. As you modernize this system for better scalability, what change should you implement?"
    options:
      - "Use DNS round-robin to randomly distribute users across servers, letting each server maintain its own session data for its users."
      - "Increase the server hardware resources substantially so it can handle more users on a single instance without needing additional servers."
      - "Scale the application only vertically (one bigger machine) to avoid multi-server session consistency issues altogether."
      - "Externalize session storage (e.g., use a shared cache or database for sessions) so that any server instance can serve any user’s requests without session stickiness."
    answer: 3
---
