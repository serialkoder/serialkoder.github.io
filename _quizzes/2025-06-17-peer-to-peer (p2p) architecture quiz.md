---
layout: quiz
title: "Peer-to-Peer (P2P) Architecture Quiz"
tags: [software-architecture]
questions:
  - q: "Alice is designing a P2P system with a structured DHT overlay, while Bob opts for an unstructured network where peers connect arbitrarily. Which outcome is likely as their networks grow?"
    options:
      - "Alice’s DHT can find data in about O(log N) hops, whereas Bob’s unstructured network may require flooding many peers to find data."
      - "Bob’s unstructured network will always have lower query latency than Alice’s DHT."
      - "Alice’s structured network will completely break down if any peer leaves (high churn)."
      - "Bob’s network won’t need any redundant data storage to locate content."
    answer: 0

  - q: "In a Chord distributed hash table, each node maintains a finger table. What is the purpose of this finger table?"
    options:
      - "It provides long-distance routing shortcuts to faraway nodes, allowing lookups to skip many intermediate hops."
      - "It keeps track of which peers are behind NAT for connection purposes."
      - "It lists all file chunks the node currently holds for swarming."
      - "It serves as an access control list for trusted peers only."
    answer: 0

  - q: "Alice notices her BitTorrent client downloading different pieces of a file from multiple peers at once and that her download speeds up when she uploads to others. Which P2P techniques are at play in this scenario?"
    options:
      - "Splitting the file into chunks for parallel download (swarming) and using a tit-for-tat strategy that favors peers who reciprocate uploads."
      - "Centralizing the file distribution through a single tracker server."
      - "Downloading the file sequentially from one fast source."
      - "Encrypting all chunks to prevent any peer from reading them until complete."
    answer: 0

  - q: "Peer X and Peer Y are both behind NAT routers and want to establish a direct P2P connection. Which technique can allow them to connect without routing all traffic through a server?"
    options:
      - "NAT hole punching, coordinated by a STUN or rendezvous server to exchange their public IP/port info."
      - "Using a dedicated VPN with fixed IP addresses for each peer."
      - "Changing both networks to use IPv6 so NAT is bypassed entirely."
      - "There is no way for two NATed peers to communicate directly."
    answer: 0

  - q: "A file-sharing network relies on a handful of super-nodes to index content and route searches for all peers. What is a major risk of this design?"
    options:
      - "Overloading or losing those super-nodes can bottleneck or even cripple the network, since they form single points of failure."
      - "New peers might not know how to find a super-node when joining the network."
      - "Super-nodes will consume too much bandwidth by design."
      - "There is no way to update or replace super-nodes once the network starts."
    answer: 0

  - q: "In a P2P key-value store, each data item is replicated on multiple peers. Nodes periodically exchange their data checksums and update any missing or out-of-date entries on each other. What is this background process called, enabling eventual consistency?"
    options:
      - "An anti-entropy gossip synchronization that repairs divergent replicas over time."
      - "Two-phase commit, as used in distributed transactions for strong consistency."
      - "Flooding: each peer blindly pushes its data to all others."
      - "Proof-of-work consensus between peers before accepting writes."
    answer: 0

  - q: "A malicious actor floods a decentralized network with hundreds of new nodes under its control, hoping to outweigh honest participants and influence protocol outcomes. What kind of attack is this scenario an example of?"
    options:
      - "Sybil attack – one attacker creates many fake identities to crowd out or out-vote honest nodes."
      - "Eclipse attack – isolating a specific node by surrounding it with malicious peers."
      - "Distributed denial-of-service (DDoS) attack – overloading nodes with traffic."
      - "Man-in-the-middle attack – intercepting messages between honest nodes."
    answer: 0

  - q: "Node Z joins a blockchain’s P2P network but unknowingly connects only to attacker-controlled peers. Those peers filter and alter the information Z receives, effectively cutting Z off from the honest network. What attack is Node Z a victim of?"
    options:
      - "An eclipse attack, where the attacker controls all of Z’s neighbors and thereby isolates Z’s view of the network."
      - "A Sybil attack, since the attacker has many identities (even if Z still sees some honest nodes)."
      - "A routing loop attack, trapping Z’s messages in a cycle."
      - "A replay attack, where old messages are resent to confuse Z."
    answer: 0

  - q: "New decentralized storage networks like Filecoin reward users with blockchain tokens for sharing disk space. Classic P2P networks like BitTorrent lacked such tokens – how did BitTorrent motivate peers to contribute uploads?"
    options:
      - "It used a tit-for-tat mechanism that prioritizes giving download bandwidth to peers who are also uploading to you, encouraging reciprocal sharing."
      - "It required every user to mine a proof-of-work before downloading each file."
      - "It tracked a global reputation score on a central server for each user."
      - "It didn’t need any incentives since users always seed voluntarily."
    answer: 0

  - q: "A large P2P cluster uses an epidemic gossip protocol to disseminate membership and state updates. Which statement describes a key property of such gossip-based updates?"
    options:
      - "Each node periodically shares information with random peers, so updates eventually reach all nodes with high probability (no single point of coordination)."
      - "Only a designated leader node broadcasts updates to all others in a fixed round-robin schedule."
      - "Gossip ensures instant delivery of updates to all nodes simultaneously."
      - "The protocol requires every node to maintain a full list of all other nodes at all times."
    answer: 0

  - q: "A distributed DHT has to operate under high churn (nodes frequently joining and leaving). What is a likely effect if the system isn’t designed to handle this churn?"
    options:
      - "Routing and lookup performance degrade as the overlay must constantly repair itself, leading to increased lookup latency or temporary failures."
      - "The network’s lookup complexity improves (fewer nodes mean shorter paths)."
      - "Data consistency immediately becomes strong because fewer nodes hold each key."
      - "There is no effect – P2P networks are immune to churn by design."
    answer: 0

  - q: "Two peers are behind symmetric NATs, which assign new random ports for each external host. The peers find that UDP hole punching via STUN fails to connect them. What can be used as a fallback to enable communication?"
    options:
      - "A relay service (e.g., a TURN server) to intermediate the traffic between the two NATed peers."
      - "Simply retrying the UDP hole punch multiple times until it works."
      - "Switching to TCP, as NATs only block UDP traffic."
      - "Having one peer periodically change its NAT type via UPnP."
    answer: 0

  - q: "BitTorrent’s Mainline DHT uses the Kademlia algorithm. Suppose your client is looking up a key in this Kademlia DHT. How does it home in on the node responsible for that key?"
    options:
      - "It iteratively queries the closest nodes it knows to the target key; each round returns nodes even closer, until it finds the responsible node."
      - "It broadcasts the query to all nodes in the network at once."
      - "It asks a central index server which then points it to the correct node."
      - "It uses the Chord finger table routing by successor pointers (since Kademlia is ring-based)."
    answer: 0

  - q: "In a geo-distributed P2P database, Node A updates a record, but Node B (a replica) doesn’t reflect the change for a short while. What do we call this delay where Node B serves stale data?"
    options:
      - "Replication lag, caused by asynchronous update propagation in eventually consistent replication."
      - "Network jitter, due to packets arriving out of order."
      - "A Byzantine fault, indicating a malicious replica."
      - "Propagation TTL expiry, as used in gossip protocols."
    answer: 0

  - q: "To counter Sybil attacks in a P2P network, the protocol makes joining identities “expensive.” Which approach reflects this strategy?"
    options:
      - "Requiring each new node identity to expend significant resources (CPU puzzles, stake, etc.), thereby deterring mass identity creation by attackers."
      - "Only allowing one node per geographic region to join the network."
      - "Forcing all peers to use the same cryptographic identity hard-coded by the network."
      - "Assigning very short random node IDs so collisions are more likely."
    answer: 0
---
