---
layout: quiz
title: "Heap Sort Quiz"
tags: [data-structures-and-algorithms]
questions:
  - q: "A streaming service must output the 100 largest user-scores from a daily feed of 10 million scores without storing everything in memory. Which strategy best fits?"
    options:
      - "Run full heap sort after all scores arrive"
      - "Maintain a size-100 min-heap and update per score"
      - "Use quicksort with 100-element pivot sampling"
      - "Append to an array, then shell sort periodically"
    answer: 1

  - q: "An engineer compares two heap-build procedures for sorting 1 million keys: (i) inserting each key into an empty heap, (ii) Floyd’s bottom-up heapify. What time-complexity difference will they observe?"
    options:
      - "Both run in Θ(n log n)"
      - "(i) is Θ(n), (ii) is Θ(n log n)"
      - "(i) is Θ(n log n), (ii) is Θ(n)"
      - "(i) is Θ(n log n), (ii) is Θ(n log log n)"
    answer: 2

  - q: "To produce an ascending array with heap sort, which heap orientation and extraction order is correct?"
    options:
      - "Build min-heap; repeatedly delete-min to front"
      - "Build max-heap; repeatedly delete-max to back"
      - "Build max-heap; repeatedly delete-max to front"
      - "Build min-heap; repeatedly delete-min to back"
    answer: 1

  - q: "A developer’s sift-down for a binary heap uses `while (2*i+1 < n)` as the loop guard on a 1-based index array. What bug is most likely?"
    options:
      - "Sentinel comparisons misordered"
      - "Heap never fully builds"
      - "Off-by-one skips the left child of last internal node"
      - "Extra swap after loop ends"
    answer: 2

  - q: "When heap sort and merge sort both run on data that nearly fit the CPU cache, heap sort often loses despite O(n log n) ties. Why?"
    options:
      - "Heap sort’s branch mispredictions are higher and its jumps span wider memory strides"
      - "Merge sort needs extra memory that evicts cache lines"
      - "Heap sort’s logarithmic depth causes recursion overhead"
      - "Merge sort exploits SIMD instructions by default"
    answer: 0

  - q: "Which statement about heap sort’s stability and space usage is accurate?"
    options:
      - "Stable and in-place (Θ(1) extra)"
      - "Stable but needs Θ(n) extras"
      - "Unstable yet in-place (Θ(1) extra)"
      - "Unstable and needs Θ(log n) extras"
    answer: 2

  - q: "Replacing a binary heap with a 4-ary heap in heap sort primarily reduces:"
    options:
      - "Total comparisons, increasing swaps"
      - "Heap height, cutting cache-cold pointer jumps"
      - "Extra memory from child pointers"
      - "Worst-case time to Θ(n)"
    answer: 1

  - q: "An interviewer asks why bottom-up heapify often beats repeated *sift-up* insertion in practice even when both fit in O(n) vs O(n log n) theory. The main runtime win comes from:"
    options:
      - "Fewer conditional branches inside the inner loop"
      - "Eliminating all swaps via pointer arithmetic"
      - "Better alignment for hardware prefetch during linear leaf scan"
      - "Using tail-recursion elimination"
    answer: 2

  - q: "While profiling, you notice heap sort beating quicksort on a dataset of 500 identical keys and 500 random keys. The most plausible reason is:"
    options:
      - "Quicksort’s average-case matches heap sort here"
      - "Quicksort hits its quadratic worst-case when many equals collapse partitions"
      - "Heap sort becomes stable with duplicates"
      - "Cache alignment favors heap sort on small arrays"
    answer: 1

  - q: "In a system with strict 64 KB stack limits, which variant of heap sort is safest?"
    options:
      - "Recursive heap sort using sift-down recursion"
      - "Bottom-up heap sort with iterative loops only"
      - "Quicksort switching to heap sort on deep recursion"
      - "Heap sort storing per-level swap logs"
    answer: 1

  - q: "You must repeatedly extract the 50 largest items from a 10 000-element array without disturbing the remainder for later processing. Efficient practice is:"
    options:
      - "Full heap sort once, use last 50 positions"
      - "Build max-heap once, perform 50 delete-max operations"
      - "Use introsort, then cut tail"
      - "Quickselect to find 50-th rank, then bubble sort the tail"
    answer: 1

  - q: "On a performance review, a candidate claims “heap sort with a ternary (3-ary) heap is always faster than binary.” Which corner case most disproves that?"
    options:
      - "Arrays whose length is a power of three fill every internal node, maximising compares per sift"
      - "Strictly ascending input ages branch predictor"
      - "Cache line size equals three elements exactly"
      - "Floating-point comparisons cost more than integer"
    answer: 0
---
