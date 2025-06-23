---
layout: flashdeck
title: "Peer‑to‑Peer Architecture Deck"
tags: [software-architecture]
intro: |
  Click a question to reveal the answer.  
  This deck distills the key ideas, mechanisms, and pitfalls of large‑scale peer‑to‑peer systems.
cards:
  - q: "What core problem do peer‑to‑peer (P2P) networks solve compared with classic client‑server?"
    a: "They remove the single point of failure and performance bottleneck by letting every node act as both client **and** server, so capacity and resilience grow with the number of participants."

  - q: "Define an overlay network in the context of P2P."
    a: "A logical topology built *on top of* the Internet’s IP layer, connecting peers by the rules of the P2P protocol rather than physical links."

  - q: "Structured vs. unstructured overlays—what is the main trade‑off?"
    a: |
      • **Structured (DHT‑based)**: Guaranteed look‑ups in O(log N) hops but more maintenance under churn.  
      • **Unstructured (random mesh)**: Cheap to maintain and tolerant of high churn, but searches are best‑effort (flooding/random walk).

  - q: "Give two well‑known structured‑overlay algorithms."
    a: "Chord (ring with finger table) and Kademlia (XOR metric with buckets)."

  - q: "What is the typical lookup complexity for a DHT such as Chord or Kademlia?"
    a: "O(log N) hops where N is the number of peers."

  - q: "Explain 'swarming' in BitTorrent‑style protocols."
    a: "A file is split into pieces; a downloader fetches different pieces concurrently from many peers and, in turn, uploads the pieces it already has to others."

  - q: "Why does BitTorrent use a 'tit‑for‑tat' algorithm?"
    a: "To incentivize fairness—peers that upload more get higher download priority, discouraging free‑riders."

  - q: "What does an epidemic (gossip) protocol achieve in P2P?"
    a: "Robust, probabilistic dissemination and anti‑entropy: peers randomly exchange state so updates eventually reach everyone without central coordination."

  - q: "How do P2P systems keep data durable when nodes can vanish at any time?"
    a: "Replication—store each piece on multiple peers; if one leaves, others still serve the data."

  - q: "Define 'eventual consistency' in a distributed store."
    a: "All replicas may be temporarily divergent but will converge to the same state once updates stop and anti‑entropy completes."

  - q: "How do Merkle trees help anti‑entropy synchronization?"
    a: "Peers compare hash trees; mismatched branches pinpoint divergent keys so only missing or newer data is exchanged, saving bandwidth and verifying integrity."

  - q: "Why is NAT traversal vital for consumer‑grade P2P apps?"
    a: "Most users sit behind routers/firewalls; without traversal, peers couldn’t form direct connections and the network would fragment."

  - q: "STUN vs. TURN—what’s the difference?"
    a: |
      • **STUN**: Discover a peer’s public address and attempt UDP hole‑punching for a direct path.  
      • **TURN**: Fall‑back relay service that forwards traffic when direct traversal fails.

  - q: "What role does ICE (Interactive Connectivity Establishment) play?"
    a: "It orchestrates all candidate paths (host, STUN, TURN) and picks the first that succeeds, maximizing direct connectivity."

  - q: "What is a Sybil attack and one common mitigation?"
    a: "An attacker floods the network with fake identities to gain undue influence; mitigation: make identity creation expensive (proof‑of‑work, proof‑of‑stake, or stake‑weighted reputation)."

  - q: "Why are reputation systems (e.g., EigenTrust) useful in P2P?"
    a: "They crowd‑source past behavior to prefer trustworthy peers and throttle or avoid malicious ones."

  - q: "Describe the 'free‑rider problem' and a classic cure."
    a: "Peers download but never upload; BitTorrent’s choking algorithm (tit‑for‑tat) reduces their download speed, nudging them to contribute."

  - q: "Name three real‑world P2P systems and their primary focus."
    a: |
      • **BitTorrent** – high‑throughput file distribution.  
      • **IPFS/Filecoin** – content‑addressable storage + tokenized incentives.  
      • **Ethereum/Bitcoin** – decentralized consensus & smart contracts.

  - q: "What network‑health metric signals excessive churn?"
    a: "Rising lookup latency or failure rate—routing tables can’t stabilize fast enough."

  - q: "How does parallelism improve DHT lookup latency?"
    a: "Query k (e.g., 3) nodes in parallel each hop; slow or failed peers no longer block progress, reducing tail latency."

  - q: "Explain locality‑aware routing."
    a: "When multiple candidate neighbors exist, choose the one with lowest RTT / network proximity to reduce path latency and cross‑ISP traffic."

  - q: "What is an eclipse attack?"
    a: "A victim’s neighbor set is taken over by attacker nodes, isolating it and controlling all information it sees."

  - q: "Name a common pitfall when many peers are behind symmetric NATs."
    a: "Connectivity collapses onto a few relay nodes, creating bottlenecks and higher latency."

  - q: "What is protocol ossification and why is it harmful?"
    a: "Middleboxes or legacy clients hard‑code assumptions about packet patterns, making it difficult to upgrade or secure the protocol later."

  - q: "How can a network handle a flash‑crowd on a newly released file?"
    a: "Seed with multiple high‑bandwidth sources initially or pre‑replicate pieces so early downloaders quickly multiply upload capacity."

  - q: "When should you choose an unstructured overlay over a DHT?"
    a: "In highly dynamic or small networks where churn is extreme and deterministic lookup isn’t worth the maintenance overhead."

  - q: "How does BitTorrent combine structured and unstructured approaches?"
    a: "Uses a structured DHT (Kademlia) for peer discovery, then an unstructured *swarm* mesh for actual data transfer."

  - q: "Why must every P2P connection be encrypted and authenticated?"
    a: "No central gatekeeper exists; peers must protect confidentiality, integrity, and prevent impersonation on hostile networks."

  - q: "List three performance 'knobs' a P2P application can tune."
    a: |
      1. Number of parallel piece requests or lookup queries.  
      2. Cache / replicate popular content along query paths.  
      3. Timeouts, retry back‑off, and adaptive congestion control (e.g. LEDBAT).

---
