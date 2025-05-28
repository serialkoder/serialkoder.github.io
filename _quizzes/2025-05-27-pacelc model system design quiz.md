---
layout: quiz
title: "PACELC Model System Design Quiz"
questions:
  - q: "In distributed system design, what does the acronym **PACELC** stand for?"
    options:
      - "Partitioning Algorithm for Consistency with Eventual Latency Compensation"
      - "If Partition: Availability or Consistency; Else: Latency or Consistency"
      - "Partition, Availability, Consistency, Elastic Latency, Consistency"
      - "Partition Always Consistent, Else Low Consistency"
    answer: 1

  - q: "In PACELC classification, **“PA”** indicates a system chooses what during a network partition?"
    options:
      - "High availability at the cost of immediate consistency"
      - "Strong consistency at the expense of availability"
      - "Reduced latency at the cost of consistency"
      - "To remain consistent by rejecting new writes in a partition"
    answer: 0

  - q: "Under normal conditions (no failures), a distributed database can either wait for all replicas to sync (for consistency) or reply from one replica immediately (for speed). Which PACELC trade-off does this illustrate?"
    options:
      - "Partition tolerance vs Availability"
      - "Throughput vs Durability"
      - "Latency vs Consistency"
      - "Sharding vs Replication strategy"
    answer: 2

  - q: "Which of the following data stores exemplifies a **PA/EL** design, prioritizing availability and low latency over strong consistency?"
    options:
      - "Google Spanner"
      - "Apache Cassandra"
      - "Google Bigtable"
      - "VoltDB"
    answer: 1

  - q: "A company deploys its database in multiple regions to serve users locally. Updates between regions are asynchronous, causing brief inconsistency across sites. According to PACELC, what are they optimizing during normal operation?"
    options:
      - "Strict consistency across regions at all costs"
      - "Partition tolerance over availability"
      - "Lower cost by reducing cross-region traffic"
      - "Faster local latency at the expense of consistency between regions"
    answer: 3

  - q: "Which consistency model lets a distributed system’s replicas lag behind the leader by a limited time or versions (ensuring eventual catch-up) to balance freshness and performance?"
    options:
      - "Bounded staleness consistency"
      - "Strong consistency (linearizability)"
      - "Eventual consistency (no bound on staleness)"
      - "Causal consistency"
    answer: 0

  - q: "In a Dynamo-style database with replication factor 3, you set write quorum **W = 2** and read quorum **R = 1**. What is the likely outcome of this tuning?"
    options:
      - "All reads will be strongly consistent, but a single replica failure causes unavailability"
      - "Some reads may return stale data, but reads are fast and the system stays highly available"
      - "Writes succeed only if all replicas respond, ensuring consistency but risking availability"
      - "The system avoids partitions entirely by requiring only one replica for all operations"
    answer: 1

  - q: "Which application scenario is **best served by a PC/EC system** (favoring consistency) over a PA/EL system (favoring availability and latency)?"
    options:
      - "A social media newsfeed where slightly stale posts are acceptable for faster loading"
      - "A banking ledger where account balances must always be accurate and consistent"
      - "A cached forum timeline that eventually syncs replies across servers"
      - "A logging service where log entries can arrive out of order but quickly"
    answer: 1

  - q: "Google Spanner is known for globally synchronized, strong consistency. Which PACELC designation best matches Spanner’s approach?"
    options:
      - "PA/EL"
      - "PA/EC"
      - "PC/EL"
      - "PC/EC"
    answer: 3

  - q: "In a global message-queue service, one strategy is to **acknowledge a message** after it’s written to a local region, then replicate to other regions asynchronously. What PACELC trade-off does this strategy exemplify?"
    options:
      - "Ensuring strong consistency at the cost of higher latency"
      - "Prioritizing low latency by accepting temporary cross-region inconsistency"
      - "Sacrificing partition tolerance to improve throughput"
      - "Improving durability with no impact on consistency or latency"
    answer: 1

  - q: "A globally distributed service has a strict 99th-percentile latency SLA of 100 ms but also requires up-to-date (strongly consistent) data across regions. According to PACELC, what challenge does this pose?"
    options:
      - "The CAP theorem shows this is impossible even without partitions"
      - "The system can easily achieve both low latency and strong consistency with no trade-offs"
      - "Strong cross-region consistency adds communication delays, risking violation of the 100 ms tail-latency SLA"
      - "Partition tolerance must be sacrificed to meet the 99th-percentile latency requirement"
    answer: 2

  - q: "Service Z runs active-active in two data centers. If network connectivity between them is lost, it continues accepting writes in both sites to avoid downtime. What is a likely consequence, and which PACELC preference does this reflect?"
    options:
      - "The service will remain perfectly consistent, illustrating a PC (partition-consistent) approach"
      - "Divergent or conflicting data versions may occur, since it prioritized availability over consistency (PA approach)"
      - "There will be no inconsistency, and latency will remain unchanged"
      - "The system becomes read-only during the partition, reflecting latency vs consistency trade-off"
    answer: 1

  - q: "A globally distributed database must keep replicas within **5 seconds** of the leader’s state, while still serving reads from the nearest region for low latency. Which approach best meets these requirements?"
    options:
      - "Bounded staleness consistency (replicas lag by at most a fixed window)"
      - "Strong consistency with all reads from a single leader region"
      - "Completely eventual consistency with no guarantees on update delay"
      - "Single-region deployment to avoid multi-region inconsistency"
    answer: 0

  - q: "A distributed cache uses asynchronous replication for speed under normal operation, but if a network partition occurs, it **halts writes** to the isolated partition to preserve consistency. Which PACELC category fits this behavior?"
    options:
      - "PA/EL"
      - "PA/EC"
      - "PC/EL"
      - "PC/EC"
    answer: 2

  - q: "A real-time multiplayer game keeps player state in an in-memory data grid across regions. The game must stay available even if a data center goes down, and it tolerates at most **2 seconds** of out-of-sync state between regions. What strategy best fits these needs?"
    options:
      - "Use a globally locking, strongly consistent (CP) approach so all players see the exact same state at all times"
      - "Adopt an AP approach with eventual replication and **bounded staleness** (e.g., updates propagate within 2 seconds)"
      - "Avoid data replication and keep each region’s state separate to prevent inconsistency"
      - "Synchronously update all regions on every action, even if it adds significant latency for players"
    answer: 1
---
