---
layout: flashdeck
title: "System-Design Thought-Process Deck"
tags: [thinking]
intro: |
  Twelve quick-hit cards that cover the core concurrent tracks senior engineers keep
  in mind when designing or building systems. Click a question to see the answer.
cards:
  - q: "1️⃣  Problem–Opportunity Framing: what’s the essence?"
    a: "Restate the problem in business, user, and tech terms; get stakeholder buy-in and write one-sentence success criteria."

  - q: "2️⃣  Scenario & Constraint Surfacing: why bother?"
    a: "Turns fuzzy goals into explicit SLIs/SLOs, limits, compliance rules, and edge-case scenarios that a design must satisfy."

  - q: "3️⃣  Quality-Attribute Radar: which ‘-ilities’ stay on the dashboard?"
    a: "Scalability, reliability, operability, maintainability, evolvability, cost-efficiency, security—know which you’re privileging and why."

  - q: "4️⃣  Change-Resilience Thinking: what’s the tactic?"
    a: "Identify high-churn areas early; create seams (interfaces, configs, feature flags) there while freezing stable cores behind clear contracts."

  - q: "5️⃣  Trade-off & Risk Ledger: what is it and why?"
    a: "A lightweight record of options, decisions, and rationale so future teams understand ‘why we did it this way’ and can revisit when context shifts."

  - q: "6️⃣  Systems Thinking: how does it widen perspective?"
    a: "Considers upstream/downstream systems, ops workflows, analytics, billing—preventing local optimisations that create global fragility."

  - q: "7️⃣  Operational Reality Check: key question?"
    a: "\"Can we run it at 3 a.m.?\"—include instrumentation, health endpoints, safe rollout/rollback, capacity model from day one."

  - q: "8️⃣  Feedback Loop Design: what gets built in?"
    a: "Feature flags, shadow traffic, A/B tests, error budgets, multi-layer tests, and CI/CD gates for rapid empirical learning."

  - q: "9️⃣  Developer-Experience Lens: why does DX matter?"
    a: "Smooth builds, clear APIs, good docs multiply iteration speed and code ownership across the team."

  - q: "🔟  Ethics, Safety & Compliance: what’s the stance?"
    a: "Treat security, privacy, accessibility, responsible AI as stop-the-line concerns—cannot be bolted on later."

  - q: "11️⃣  Communication & Narrative: secret weapon?"
    a: "Clear storytelling (context → shape → phased rollout) plus diagrams that show data flow and failure modes align teams faster than perfect UML."

  - q: "12️⃣  Continuous Reflection & Craftsmanship: daily ritual?"
    a: "Post-iteration checks: which tracks did we skip? Run micro-retros, code katas, design-debt reviews to sharpen judgment."
---
