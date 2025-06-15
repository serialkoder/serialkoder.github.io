---
layout: quiz
title: "Union-Find (Disjoint-Set Union) Quiz"
tags: [data-structures-and-algorithms]
questions:
  - q: "What does **path compression** do during a `find(x)` call?"
    options:
      - "Rewrites every visited node’s parent to point directly to the root, flattening the tree."
      - "Attaches the smaller tree under the larger tree during a merge."
      - "Stores the number of elements in each set for O(1) size look-ups."
      - "Doubles the rank of the new root after every union."
    answer: 0

  - q: "With both path compression and union-by-rank/size enabled, what is the amortized time per `find` or `union` operation?"
    options:
      - "O(log n)"
      - "O(α(n)) – the inverse Ackermann function (effectively constant)"
      - "O(n)"
      - "O(1) worst-case for every single call"
    answer: 1

  - q: "In **union-by-rank**, when the two roots have **different** ranks, which root becomes the parent?"
    options:
      - "The higher-rank root is attached under the lower-rank root."
      - "The lower-rank root is attached under the higher-rank root."
      - "Both roots stay separate and only their ranks are incremented."
      - "No merge occurs; the call returns immediately."
    answer: 1

  - q: "When do you increment the rank of a root in union-by-rank?"
    options:
      - "After every successful union."
      - "Only when the two roots have equal rank at merge time."
      - "Only when the two sets have equal **size** at merge time."
      - "Never; rank is fixed after initialization."
    answer: 1

  - q: "Which auxiliary array lets you answer **“how many elements are in this set?”** in O(1) time?"
    options:
      - "`parent[]`"
      - "`rank[]`"
      - "`size[]`"
      - "`path[]`"
    answer: 2

  - q: "Without any optimizations (no rank/size, no path compression), what is the worst-case time complexity of `find(x)`?"
    options:
      - "O(1)"
      - "O(log n)"
      - "O(n)"
      - "O(α(n))"
    answer: 2

  - q: "Which union policy is **most likely** to create a deep chain and hurt performance?"
    options:
      - "Always attach the second argument’s root under the first argument’s root."
      - "Always attach the smaller set under the larger set."
      - "Attach roots at random."
      - "Perform frequent path-compressed `find` operations between unions."
    answer: 0

  - q: "In **union-by-size**, if set A has 3 elements and set B has 5 elements, which root becomes the new parent after `union(A, B)`?"
    options:
      - "The root of the smaller (size 3) set becomes the parent."
      - "The larger (size 5) root is attached under the smaller root."
      - "The root of the larger (size 5) set becomes the parent."
      - "The root with the smaller **rank** becomes the parent, regardless of size."
    answer: 2

  - q: "After calling `find(x)` with path compression on a deep node, what happens to that node’s `parent` pointer?"
    options:
      - "It remains unchanged."
      - "It is updated to point directly to the root found by the call."
      - "It is updated to point to its grand-parent (path halving)."
      - "It is removed entirely."
    answer: 1

  - q: "Which combination of heuristics is required to achieve the classic **α(n) amortized** performance bound?"
    options:
      - "Path compression only."
      - "Union-by-rank (or size) only."
      - "Both path compression **and** union-by-rank (or size)."
      - "No heuristics; the naive structure already guarantees it."
    answer: 2
---
