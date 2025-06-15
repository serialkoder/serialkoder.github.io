---

layout: quiz
title: "TCP Networking Quiz (Intermediate to Advanced)"
tags: [system-design]
questions:
  - q: "TCP is a reliable, connection-oriented transport protocol that ensures data is delivered in order and without errors between applications."
    options:
      - "True"
      - "False"
    answer: 0

  - q: "Which of the following fields is NOT found in a TCP header?"
    options:
      - "Sequence Number"
      - "Acknowledgment Number"
      - "Checksum"
      - "Time to Live (TTL)"
    answer: 3

  - q: "Which TCP control flag is used to initiate a new TCP connection via the three-way handshake?"
    options:
      - "SYN (Synchronize)"
      - "ACK (Acknowledgment)"
      - "FIN (Finish)"
      - "RST (Reset)"
    answer: 0

  - q: "The TCP three-way handshake involves a client sending a SYN, the server responding with SYN-ACK, and the client replying with an ACK to establish the connection."
    options:
      - "True"
      - "False"
    answer: 0

  - q: "What mechanism does TCP use to prevent a sender from overwhelming a slow receiver’s buffer?"
    options:
      - "Flow control via the receiver’s advertised window"
      - "Congestion control via the congestion window"
      - "The three-way handshake"
      - "Error detection via checksum"
    answer: 0

  - q: "Which TCP flag indicates a request to gracefully terminate a connection?"
    options:
      - "FIN (Finish)"
      - "SYN (Synchronize)"
      - "PSH (Push)"
      - "URG (Urgent)"
    answer: 0

  - q: "In TCP congestion control, which event triggers the fast retransmit mechanism?"
    options:
      - "A single duplicate ACK"
      - "Receiving three duplicate ACKs for the same data"
      - "An ACK with the ECN-Echo flag"
      - "The expiration of the keep-alive timer"
    answer: 1

  - q: "During slow start, TCP’s congestion window (cwnd) grows exponentially, effectively doubling in size each round-trip time until a loss is detected or a threshold is reached."
    options:
      - "True"
      - "False"
    answer: 0

  - q: "Which statement correctly distinguishes between TCP flow control and congestion control?"
    options:
      - "Flow control protects the receiver from buffer overflow, while congestion control protects the network from overload."
      - "Flow control protects the network from overload, while congestion control protects the receiver’s buffer."
      - "Flow control manages packet sequencing, while congestion control handles error detection."
      - "Flow control and congestion control are identical mechanisms."
    answer: 0

  - q: "Which of the following is true about TCP Cubic?"
    options:
      - "It is the default congestion control algorithm in modern Linux kernels, using a cubic function to grow the congestion window."
      - "It avoids slow start entirely and uses only linear growth."
      - "It predates TCP Reno."
      - "It requires explicit router support to function."
    answer: 0

  - q: "If a TCP segment is sent but the ACK is not received before the retransmission timer expires, what happens to the retransmission timeout (RTO)?"
    options:
      - "It stays the same for the next retransmission."
      - "It doubles (exponential back-off) for the next retry."
      - "It is reduced by half to retry faster."
      - "The sender switches directly to the fast-recovery phase."
    answer: 1

  - q: "A receiver advertises a window size of zero during an active TCP connection. What does this indicate?"
    options:
      - "The connection has encountered a fatal error."
      - "The receiver’s buffer is full and it cannot accept more data at the moment."
      - "The sender has entered slow start."
      - "The network is congested and dropping packets."
    answer: 1

  - q: "During the TCP handshake, each side may advertise its Maximum Segment Size (MSS) option to help avoid IP fragmentation."
    options:
      - "True"
      - "False"
    answer: 0

  - q: "After a TCP connection is closed, the endpoint that sent the final ACK enters the TIME_WAIT state to guard against delayed packets from the old connection."
    options:
      - "True"
      - "False"
    answer: 0

  - q: "How does TCP Reno differ from TCP Tahoe after detecting packet loss via triple duplicate ACKs?"
    options:
      - "Reno enters fast recovery and halves cwnd without dropping to 1 MSS, while Tahoe drops cwnd to 1 MSS and enters slow start."
      - "Reno retransmits all unacknowledged segments, whereas Tahoe retransmits only the lost segment."
      - "Reno ignores triple duplicate ACKs, but Tahoe performs fast recovery."
      - "Reno immediately closes the connection, while Tahoe continues normal operation."
    answer: 0

  - q: "Which statement about TCP Cubic congestion control is correct?"
    options:
      - "It increases the congestion window purely linearly over time like TCP Reno."
      - "It relies solely on packet loss and does not adjust for RTT."
      - "It grows the window using a cubic function of time since the last congestion event, largely independent of RTT."
      - "It was designed to minimize latency on low-bandwidth networks at the expense of throughput."
    answer: 2

  - q: "Selective Acknowledgment (SACK) allows a receiver to acknowledge non-consecutive segments so the sender can retransmit only the missing data."
    options:
      - "True"
      - "False"
    answer: 0

  - q: "Which TCP option increases the maximum receive window size beyond the 65 535-byte limit to improve performance on high bandwidth-delay product networks?"
    options:
      - "Window Scaling (RFC 7323/1323)"
      - "Selective ACK (SACK)"
      - "TCP Fast Open (TFO)"
      - "Timestamps"
    answer: 0

  - q: "Explicit Congestion Notification (ECN) allows routers to mark packets instead of dropping them when congestion is detected, and TCP endpoints react by reducing their sending rate."
    options:
      - "True"
      - "False"
    answer: 0

  - q: "Nagle’s algorithm combines small outgoing messages into fewer, larger packets, which can add latency for interactive applications."
    options:
      - "True"
      - "False"
    answer: 0
---
