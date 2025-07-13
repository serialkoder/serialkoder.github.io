---
layout: quiz
title: "Strangler Fig Pattern Quiz"
tags: [software-architecture-pattern]
questions:
  - q: "In a legacy-to-microservices migration using the Strangler Fig pattern, the team introduces an API gateway (façade) in front of the old system. What is this gateway’s primary role?"
    options:
      - "To intercept client requests and route each to either the legacy or new service as appropriate"
      - "To boost the performance of the legacy system via caching"
      - "To translate between different data models in old vs. new systems"
      - "To automatically partition the monolith into microservices"
    answer: 0

  - q: "A team is planning to “strangle” a monolith by carving it into microservices. What is an effective first step to decide where to start extracting functionality?"
    options:
      - "Identify distinct business capabilities or bounded contexts in the monolith"
      - "Rewrite the smallest module line-by-line in a new stack"
      - "Migrate the highest-traffic component first, regardless of dependencies"
      - "Start with the data layer by splitting the monolith’s database into micro-databases"
    answer: 0

  - q: "During a Strangler Fig migration, the team releases a new microservice by initially routing only 5% of user requests to it while 95% still go to the legacy component. This approach is an example of:"
    options:
      - "Blue/green deployment"
      - "Canary release"
      - "Big bang deployment"
      - "Shadow (dark) deployment"
    answer: 1

  - q: "The team wants to test a new service with production traffic without affecting any end users’ experience. Which deployment strategy should they use?"
    options:
      - "Rolling deployment"
      - "Blue/green deployment"
      - "Canary release"
      - "Shadow (dark) deployment"
    answer: 3

  - q: "An e-commerce company has set up two identical production environments, “Blue” (current) and “Green” (new). They plan to switch all traffic to Green only after it passes production testing. What is this migration strategy?"
    options:
      - "Canary release"
      - "Rolling update"
      - "Blue/green deployment"
      - "Dark launching"
    answer: 2

  - q: "To keep data consistent during migration, a team considers using Change Data Capture (CDC) instead of performing dual-writes in both old and new systems. Which tool exemplifies this CDC approach?"
    options:
      - "Jenkins"
      - "GraphQL"
      - "Debezium"
      - "Terraform"
    answer: 2

  - q: "How can the team ensure a newly “strangled” microservice meets the expectations of other components that used the legacy module’s API?"
    options:
      - "Rely on end-to-end UI tests only"
      - "Use schema migration scripts to align data models"
      - "Implement contract tests between the new service and its consumers"
      - "Double the capacity of the new service to handle unknowns"
    answer: 2

  - q: "Even after launching new services, the team keeps a “kill switch” to immediately disable a new feature if issues arise in production. What mechanism provides this safety net?"
    options:
      - "Full database rollback scripts"
      - "Manual code hotfix in production"
      - "Blue/green dual environments"
      - "Feature toggles (feature flags)"
    answer: 3

  - q: "After migrating a portion of the system, which metrics should be closely monitored to detect any regressions introduced by the new service?"
    options:
      - "Lines of code and code coverage percentage"
      - "Response times, error rates, and other service health metrics"
      - "Number of microservices deployed"
      - "Developer velocity (story points per sprint)"
    answer: 1

  - q: "Which of the following is a key advantage of the Strangler Fig approach compared to a “big bang” rewrite?"
    options:
      - "It replaces the entire system in one go to deliver value faster"
      - "It minimizes risk by delivering changes in small, incremental pieces"
      - "It requires no temporary bridging code or proxies during migration"
      - "It completely avoids any need to maintain the legacy system during the transition"
    answer: 1

  - q: "During modernization, one team continues to implement minor updates in the old system (for urgent needs) while another team builds the new services. What is this dual-track approach intended to achieve?"
    options:
      - "It doubles the development effort, hoping one track will succeed"
      - "It balances ongoing business needs with modernization, preventing the legacy system from stagnating"
      - "It ensures competition between teams to speed up migration"
      - "It isolates the legacy team so they don’t interfere with the new system work"
    answer: 1

  - q: "Two years into a strangler migration, half of the original monolith’s functionality still hasn’t been replaced, leaving the organization straddling two systems indefinitely. Which anti-pattern does this scenario illustrate?"
    options:
      - "Frozen façade"
      - "Big bang strangulation"
      - "Partial strangler (incomplete migration)"
      - "Monolith reincarnation"
    answer: 2

  - q: "Suppose a team claims to follow the Strangler Fig pattern, but in practice they build the entire replacement system behind the scenes and then cut over all at once. What risk does this “hidden big-bang” approach carry?"
    options:
      - "It will automatically succeed since it used feature flags"
      - "Less coordination is needed, so actually lower risk than strangling"
      - "High failure risk – it’s effectively a big-bang rewrite in disguise"
      - "Users will seamlessly migrate without noticing any changes"
    answer: 2

  - q: "In a Strangler Fig project, the initial proxy layer was meant to be temporary. Instead, the team keeps enhancing this gateway with more logic and never retires it even after migrating all features. What is the likely consequence of this “frozen façade” anti-pattern?"
    options:
      - "The façade will gracefully become the new system’s core"
      - "It ensures the legacy system can never be turned off"
      - "The façade may become a permanent complexity, potentially a performance bottleneck or single point of failure"
      - "The migration speeds up since all logic goes into the façade"
    answer: 2

  - q: "Which of the following technologies could you use to implement the Strangler Fig façade and gradually route traffic between the monolith and new microservices?"
    options:
      - "Debezium"
      - "PostgreSQL"
      - "Envoy Proxy"
      - "JUnit"
    answer: 2
---
