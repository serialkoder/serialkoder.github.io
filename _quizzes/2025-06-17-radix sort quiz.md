---
layout: quiz
title: "Radix Sort Quiz"
tags: [data-structures-and-algorithms]
questions:
  - q: "A log-processing service must sort 10 million 32-bit integers that arrive in random order. Which Radix Sort variant typically minimizes passes for this data shape?"
    options:
      - "MSD with base-2"
      - "MSD with base-2¹⁶"
      - "LSD with base-2¹⁶"
      - "LSD with base-10"
    answer: 2

  - q: "Why is Counting Sort the usual sub-routine inside each Radix pass?"
    options:
      - "It is in-place and oblivious to key ranges"
      - "It is stable and O(n + k) where k is digit range"
      - "It supports negative numbers natively"
      - "It compresses data to reduce I/O"
    answer: 1

  - q: "For n keys and b digit positions, LSD Radix Sort using Counting Sort per digit has which time and space complexity?"
    options:
      - "O(n log n) time, O(n) extra space"
      - "O(bn) time, O(n + k) extra space"
      - "O(n b log b) time, O(1) extra space"
      - "O(n) time, O(bn) extra space"
    answer: 1

  - q: "A team boosts radix from 2¹⁶ to 2²⁰ for 64-bit IDs. Which impact is MOST likely?"
    options:
      - "Fewer passes, same memory"
      - "More passes, lower memory"
      - "Fewer passes, larger Counting Sort buckets"
      - "Time increases because digit extraction is cheaper"
    answer: 2

  - q: "Sorting IPv4 addresses (four bytes) stored as dotted strings is slow. Which Radix design speeds it up?"
    options:
      - "MSD on parsed octets with base-256"
      - "LSD on characters, base-10"
      - "Heap Sort after converting to 64-bit integers"
      - "QuickSort on strings with locale collation"
    answer: 0

  - q: "Radix Sort’s asymptotic advantage over comparison sorts most reliably appears when:"
    options:
      - "n ≫ k and keys are long strings"
      - "k is constant and keys fit CPU cache"
      - "n log n < bn"
      - "Keys are partially ordered"
    answer: 1

  - q: "An MSD Radix implementation on variable-length strings produces 'app', 'apple', 'apply' in wrong order. Primary fix?"
    options:
      - "Zero-pad shorter strings before sorting"
      - "Switch to LSD variant"
      - "Reverse digit processing order"
      - "Make Counting Sort unstable"
    answer: 0

  - q: "In a GPU-based Radix Sort, developers choose per-block shared memory histograms, then global prefix sums. This mainly optimizes:"
    options:
      - "Reducing branch mis-predictions"
      - "Maximizing warp occupancy"
      - "Minimizing global memory contention during counting"
      - "Ensuring stability across blocks"
    answer: 2

  - q: "For multi-terabyte logs on disk, an external LSD Radix Sort uses a 2-pass distribution plus merge per digit. Key benefit over external Merge Sort?"
    options:
      - "Less random I/O by streaming fixed-size buckets"
      - "Lower CPU usage due to fewer comparisons"
      - "Handles undefined orderings gracefully"
      - "Requires no temporary storage"
    answer: 0

  - q: "You have 10 million customer IDs where leading digits share long common prefixes. Which variant likely saves work?"
    options:
      - "LSD with base-10"
      - "MSD with early-exit recursion"
      - "LSD with adaptive radix"
      - "Comparison QuickSort"
    answer: 1

  - q: "A 32-bit signed-integer Radix Sort intermittently misorders negatives. What subtle bug best explains this?"
    options:
      - "Using two’s-complement bytes without biasing the sign bit"
      - "Unstable Counting Sort per digit"
      - "Base too small causing overflow"
      - "Missing zero-padding for positives"
    answer: 0

  - q: "Why is truly in-place Radix Sort (O(1) extra memory) seldom implemented for large datasets?"
    options:
      - "It loses stability and needs complex cyclic rotations, hurting locality"
      - "It can’t support strings"
      - "It inflates asymptotic time from O(n) to O(n log n)"
      - "Modern CPUs disallow pointer swaps"
    answer: 0
---
