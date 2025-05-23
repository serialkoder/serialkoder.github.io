---
layout: quiz
title: "CAP Theorem Quiz (Extended)"
questions:
  - q: "What does CAP stand for in the CAP theorem?"
    options:
      - "Consistency, Accuracy, Performance"
      - "Consistency, Availability, Partition tolerance"
      - "Centralization, Availability, Performance"
      - "Capacity, Availability, Partition tolerance"
    answer: 1

  - q: "Who originally formulated the CAP theorem and in what year?"
    options:
      - "Eric Brewer, 2000"
      - "Seth Gilbert, 2002"
      - "Nancy Lynch, 1998"
      - "Tim Berners-Lee, 1999"
    answer: 0

  - q: "What is another name for the CAP theorem?"
    options:
      - "Gilbert's Theorem"
      - "Lynch's Principle"
      - "Brewer's Theorem"
      - "Distributed Systems Law"
    answer: 2

  - q: "According to the CAP theorem, how many of the three characteristics can a distributed system deliver simultaneously?"
    options:
      - "All three"
      - "Only two"
      - "Only one"
      - "None"
    answer: 1

  - q: "What does 'consistency' mean in the context of the CAP theorem?"
    options:
      - "The system performs consistently fast"
      - "All clients see the same data at the same time, regardless of which node they connect to"
      - "The system has consistent uptime"
      - "Data is stored consistently across time zones"
    answer: 1

  - q: "A database system that prioritizes consistency and partition tolerance at the expense of availability is classified as:"
    options:
      - "CA system"
      - "AP system"
      - "CP system"
      - "CAP system"
    answer: 2

  - q: "In practical distributed systems, why is partition tolerance generally considered mandatory?"
    options:
      - "It's the easiest to implement"
      - "Network failures are inevitable in distributed systems"
      - "It provides the best performance"
      - "It's required by law"
    answer: 1

  - q: "The PACELC theorem extends the CAP theorem by adding which additional consideration?"
    options:
      - "Performance vs. Cost trade-off"
      - "Latency vs. Consistency trade-off during normal operations"
      - "Security vs. Accessibility trade-off"
      - "Scalability vs. Complexity trade-off"
    answer: 1

  - q: "Which of the following best describes the realistic availability approach mentioned in relation to CAP-Consistent systems?"
    options:
      - "CAP-Consistent systems can never be highly available"
      - "High availability is measured as a continuum (like 99.99% uptime) rather than binary terms"
      - "Only AP systems can achieve high availability"
      - "Partition tolerance prevents any form of availability"
    answer: 1

  - q: "In a distributed system following the PC/EL configuration in PACELC space, what choices are made?"
    options:
      - "Partition: Choose availability; Else: Choose latency"
      - "Partition: Choose consistency; Else: Choose latency"
      - "Partition: Choose consistency; Else: Choose consistency"
      - "Partition: Choose latency; Else: Choose consistency"
    answer: 1
---
