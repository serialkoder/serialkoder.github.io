---
layout: quiz
title: "Branch-by-Abstraction Pattern Quiz"
tags: [software-architecture-pattern]
questions:
  - q: "A development team needs to replace a core module without breaking dependencies, so they introduce an interface as an abstraction layer and implement both the old and new module behind it. What is the main benefit of this “branch by abstraction” approach?"
    options:
      - "It allows the system to run old and new implementations in parallel and switch between them safely."
      - "It doubles the coding work with no functional gain."
      - "It permanently ties the code to the legacy implementation."
      - "It requires halting all releases until the new module is finished."
    answer: 0

  - q: "Your team is considering using a compile-time flag (e.g., a build config or #ifdef) versus a runtime feature toggle to control a new feature. Which is a key drawback of a compile-time toggle in this scenario?"
    options:
      - "It requires maintaining separate builds/artifacts and cannot be changed on the fly."
      - "It makes the binary run slower for all users."
      - "It exposes the feature automatically to all users at runtime."
      - "It will automatically merge the new code into mainline."
    answer: 0

  - q: "When rolling out a risky new code path hidden behind a feature flag, what is an effective strategy to minimize user impact?"
    options:
      - "Gradually enable the new implementation for a small subset of users and increase rollout percentage as confidence grows."
      - "Flip the flag for all users at once ('big bang' release) to get it over with quickly."
      - "Immediately retire the old code before the new code is fully tested."
      - "Enable the new code only in a long-lived feature branch, not in the mainline."
    answer: 0

  - q: "In a database migration, the team uses dual-write and read-shadowing: writes go to both old and new databases, and reads execute on both with results compared. Why employ this technique during branch-by-abstraction?"
    options:
      - "To ensure consistency and detect discrepancies by running the old and new systems side-by-side, enabling quick rollback if something deviates."
      - "To double the workload for database servers (as a performance stress test)."
      - "To force all users onto the new database without fallback."
      - "To randomly shuffle data between two databases for no particular reason."
    answer: 0

  - q: "You are refactoring a complex legacy component via branch-by-abstraction. The old logic has no unit tests. What testing approach can help ensure the new implementation’s behavior matches the old before fully switching over?"
    options:
      - "Capture the current outputs as a 'golden master' and compare the new implementation’s outputs against this approved baseline."
      - "Rely on just new unit tests for the rewritten code and hope for the best."
      - "Skip testing and depend on users to report differences after release."
      - "Only test the new code in isolation, without comparing to the old behavior."
    answer: 0

  - q: "During a branch-by-abstraction rollout, the new service is receiving 10% of production traffic. Which practice will best help the team catch problems early and trigger a rollback if the new service misbehaves?"
    options:
      - "Implement strong observability (metrics, logs, alerts) on both old and new paths and define automatic rollback triggers if error rates or latencies for the new path exceed safe thresholds."
      - "Wait for users to complain about issues before doing anything."
      - "Permanently route all traffic to the new service and disable monitoring to avoid false alarms."
      - "Rely on the QA team to manually check the logs once a month."
    answer: 0

  - q: "A large feature is being developed, and one engineer suggests using a long-lived Git feature branch while another suggests branch-by-abstraction on trunk. Why is branch-by-abstraction generally more compatible with Continuous Integration?"
    options:
      - "Because all changes reside in mainline behind an interface toggle, the application stays integrated and releasable at all times, avoiding massive last-minute merges."
      - "Because branch-by-abstraction requires no coordination with other developers at all."
      - "Because feature flags on trunk automatically write unit tests for you."
      - "Because merging back a long-lived branch is effortless and risk-free in CI."
    answer: 0

  - q: "Running two code paths in production (the old and the new) can incur performance overhead. How can teams mitigate the impact of this duplicate execution during a branch-by-abstraction phase?"
    options:
      - "Execute the old and new implementations in parallel asynchronously and use timeouts, so user requests aren’t delayed, and limit the dual-run period to what’s necessary."
      - "Accept permanently that every operation now takes twice as long and use twice the resources."
      - "Throttle all user traffic to half rate to compensate for running both paths."
      - "Disable logging and monitoring to claw back some performance."
    answer: 0

  - q: "Over the past year, numerous feature flags were introduced and toggled on, but not removed from the code after the new features stabilized. What is the danger of accumulating these stale flags, and what should be done?"
    options:
      - "Stale flags become technical debt that complicates the codebase, so teams must regularly retire and clean up flags no longer needed."
      - "Old feature flags automatically become inert and have no effect, so leaving them is harmless."
      - "Having many flags improves runtime performance by short-circuiting old code paths."
      - "It’s best to keep all flags forever in case someone wants to disable a feature in the future."
    answer: 0

  - q: "Your team wants to use feature flags in a disciplined way as part of CI/CD. They wish to gradually roll out features, get feedback, and even let product managers control toggles without code changes. Which approach or tool would best support this?"
    options:
      - "Integrating a dedicated feature flag management service (e.g., LaunchDarkly, Unleash, or Togglz) that provides runtime control, dashboards, and rollout scheduling for flags."
      - "Storing all feature toggles as constants in code, requiring a full redeploy to change them."
      - "Using long-lived branches for each user group and merging them when a feature is ready for that group."
      - "Allowing only developers to toggle features by changing config files on the server manually."
    answer: 0

  - q: "A team opted for a “big bang” cutover—deploying a brand-new service version and turning off the old one at once, without any overlapping run. What is the primary risk of this approach, which branch-by-abstraction seeks to avoid?"
    options:
      - "An all-or-nothing launch has no graceful fallback; any unforeseen bug in the huge change set can cause a major outage and is hard to quickly roll back or debug."
      - "The old code might never get deleted afterward."
      - "Users might not notice the new features immediately."
      - "The team will spend less time in merge conflicts and more time coding."
    answer: 0

  - q: "After migrating all clients to the new implementation under an abstraction, the interface and toggle remain in the code as a vestige of branch-by-abstraction. Why is this “stale seam” considered an anti-pattern?"
    options:
      - "Once the old implementation is fully retired, keeping an unnecessary abstraction layer adds complexity with no benefit—remove the indirection (and any flags) to simplify the design."
      - "Because an abstraction layer can never be removed without breaking everything and must live on forever."
      - "It isn’t an anti-pattern; you should always keep the toggles in case you need to revert in the distant future."
      - "Because feature flag services charge per flag, and unused flags incur extra cost."
    answer: 0

  - q: "In one project, the team implemented a feature flag for a new path but never actually tested the new code in staging or with a subset of users—they simply waited until it was “done” and then flipped the flag to 100% in production. Which best practice did they violate?"
    options:
      - "They failed to perform a safe gradual validation (such as canary or shadow testing) of the new code using the feature flag, nullifying the whole point of branch-by-abstraction’s risk reduction."
      - "They should have deleted the old code before ever turning on the new code."
      - "They didn’t use a big enough flag integer (the flag should have been a 64-bit value)."
      - "They left the flag enabled too long during development."
    answer: 0

  - q: "How does the Branch-by-Abstraction pattern fundamentally differ from the Strangler Fig pattern for evolving legacy systems?"
    options:
      - "Branch-by-abstraction works within the codebase by introducing an interface so old and new implementations can coexist behind it, whereas Strangler Fig operates around the legacy system by gradually routing functionality to new components via an external facade."
      - "Branch-by-abstraction is only for databases, while Strangler Fig is only for UIs."
      - "Strangler Fig requires freezing all development during migration, whereas branch-by-abstraction does not."
      - "They are two names for exactly the same technique."
    answer: 0

  - q: "A product’s codebase now has a tangle of interrelated feature toggles—some features have multiple flags, and certain flags must be on for others to work. What is a likely consequence of this situation?"
    options:
      - "Complex, overlapping flags lead to a combinatorial explosion of feature state combinations to test and maintain, making the system fragile and hard to reason about."
      - "It’s easier to enable many features at once since you just flip all the flags together."
      - "Developers can completely avoid writing integration tests because the flags guarantee isolation."
      - "Feature flags in this configuration automatically self-remove when conflicting with each other."
    answer: 0
---
