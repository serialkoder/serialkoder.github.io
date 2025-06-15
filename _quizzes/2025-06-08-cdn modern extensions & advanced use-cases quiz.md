---
layout: quiz
title: "CDN Modern Extensions & Advanced Use-Cases Quiz"
tags: [system-design]
questions:
  - q: "In serverless edge computing, what does the term 'cold start' refer to?"
    options:
      - "The practice of caching content on edge servers on the first request"
      - "The initial delay when an edge function is invoked and its runtime is not already warm"
      - "A technique for cooling down servers at edge data centers"
      - "The time it takes for DNS to propagate to edge locations"
    answer: 1

  - q: "Which approach can help minimize cold start times for code running at the edge?"
    options:
      - "Use lightweight isolate-based runtimes (e.g., V8 engine isolates) instead of heavy containerized VMs"
      - "Increase the size of the function's deployment package significantly"
      - "Choose a language runtime that has a longer startup time, like a Java VM"
      - "Add an artificial delay at the beginning of the function"
    answer: 0

  - q: "In the context of edge storage, what is a key difference between a global key-value store and a Durable Object (as offered by Cloudflare)?"
    options:
      - "Durable Objects are eventually consistent across regions, while the key-value store is strongly consistent"
      - "The key-value store is strongly consistent, replicating writes instantly worldwide"
      - "Durable Objects cannot retain any state between requests"
      - "A key-value store is eventually consistent globally, whereas a Durable Object provides strong consistency by routing all requests to a single instance"
    answer: 3

  - q: "What is a common way to implement an A/B test for content while using a CDN's caching?"
    options:
      - "Bypassing the CDN entirely so each variant is always fetched from origin"
      - "Using the client's IP address as the cache key for different variants"
      - "Assigning users a variant via a cookie or header and caching separate versions per that value"
      - "Letting the CDN randomly change the content for each user"
    answer: 2

  - q: "Which streaming technology is best suited for real-time, sub-second latency video interactions (e.g., live video chat)?"
    options:
      - "Apple HLS (HTTP Live Streaming)"
      - "MPEG-DASH"
      - "Progressive MP4 download"
      - "WebRTC"
    answer: 3

  - q: "HLS and MPEG-DASH are similar because both:"
    options:
      - "deliver video in small HTTP-based segments and adjust quality to the user's connection"
      - "use UDP instead of TCP to minimize stream latency"
      - "were developed by the same company"
      - "guarantee sub-second latency for live streams by default"
    answer: 0

  - q: "What is a primary benefit of using modern image formats like AVIF or WebP on a website via CDN?"
    options:
      - "They significantly degrade image quality to achieve smaller file sizes"
      - "They require users to install a special plugin or browser update to see the images"
      - "They drastically reduce image file sizes for comparable quality, resulting in faster loading times"
      - "They are mainly beneficial for video files rather than images"
    answer: 2

  - q: "What is the purpose of the HTTP 103 Early Hints status code?"
    options:
      - "To acknowledge a request and tell the client to continue sending it (like a '100 Continue')"
      - "To send the browser preliminary hints (e.g. preload links) while the server prepares the full response"
      - "To negotiate an upgrade to the HTTP/3 protocol"
      - "To indicate a temporary redirect that the client should follow"
    answer: 1

  - q: "In a multi-CDN strategy, how is Real User Monitoring (RUM) data used?"
    options:
      - "To distribute traffic evenly among CDNs in round-robin fashion"
      - "To allow each end user to manually choose which CDN to use"
      - "To dynamically route users to the CDN that currently offers the best performance for them"
      - "To always send traffic to one primary CDN unless it completely fails"
    answer: 2

  - q: "Why might a company use a private or federated CDN with security zones?"
    options:
      - "To restrict content delivery to authorized users or networks for security compliance"
      - "To intentionally slow down the delivery of its content"
      - "To allow anyone on the internet to access confidential assets"
      - "Because public CDNs cannot deliver video or dynamic content"
    answer: 0

  - q: "How do technologies like eBPF and XDP improve performance in CDN edge servers?"
    options:
      - "By compressing all images and videos on-the-fly at the edge"
      - "By allowing the server to filter or drop unwanted traffic in the kernel before it reaches the application"
      - "By offloading the CDN caching logic to the end user's browser"
      - "By adding additional network hops for processing"
    answer: 1

  - q: "What is one benefit of using Kernel TLS (kTLS) on CDN servers?"
    options:
      - "It lets the CDN operate without any SSL certificates"
      - "It sends data over the network unencrypted to reduce CPU usage"
      - "It offloads all encryption tasks to the client side"
      - "It performs TLS encryption in kernel space, reducing context switches and improving performance"
    answer: 3

  - q: "Which of the following is true about AWS CloudFront Functions compared to Lambda@Edge?"
    options:
      - "Lambda@Edge runs code inside the client's browser, whereas CloudFront Functions run on edge servers"
      - "CloudFront Functions are designed for short, fast execution and limited logic, whereas Lambda@Edge can run more complex code but with higher latency"
      - "CloudFront Functions support many programming languages, but Lambda@Edge only supports Node.js"
      - "Lambda@Edge is a newer service that has completely replaced CloudFront Functions"
    answer: 1

  - q: "In a multi-CDN environment, what does 'SLA arbitration' typically involve?"
    options:
      - "Mediating contract disputes between CDN providers"
      - "Using blockchain to automatically enforce CDN service agreements"
      - "Shifting user traffic to whichever CDN is meeting performance and uptime targets at a given time"
      - "Dividing traffic evenly across all CDNs regardless of performance"
    answer: 2

  - q: "What does the HTTP 'Vary' header do in the context of CDN caching?"
    options:
      - "Sets an IP address restriction on who can access the cached content"
      - "Makes the CDN serve a random variant of the content on each request"
      - "Forces the CDN to revalidate the cached content with the origin server on every request"
      - "Instructs caches to store separate versions of the response based on specified request headers (e.g., Cookie, User-Agent)"
    answer: 3
---
