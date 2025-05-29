---
layout: quiz
title: "Union-Find (Disjoint-Set) Quick-Practice Quiz"
questions:
  - q: "In a DSU that uses **path compression only** (no rank/size), what is the worst-case time to execute one `find(x)` *before* any path has been compressed?"
    options:
      - "O(1)"
      - "O(log N)"
      - "O(N)"
      - "O(N log N)"
    answer: 2

  - q: "Immediately after construction (`parent[i] = i` for all *i*), what is the **rank** of every element when you use union-by-rank?"
    options:
      - "−1"
      - "0"
      - "1"
      - "Depends on N"
    answer: 1

  - q: "What *always* triggers an increment to a root’s rank in union-by-rank?"
    options:
      - "Attaching the smaller set under the larger set"
      - "Calling `find()` on the root"
      - "Merging two roots whose ranks are equal"
      - "Path compression rewiring an inner node"
    answer: 2

  - q: "Suppose two sets have sizes 4 and 9. Using **union-by-size**, which root becomes the new parent?"
    options:
      - "Size-4 root under size-9 root"
      - "Size-9 root under size-4 root"
      - "Either; sizes don’t matter"
      - "Determined by element IDs, not size"
    answer: 0

  - q: "After a long sequence of mixed operations, the amortised cost per operation with **both** path compression *and* union-by-rank is:"
    options:
      - "Θ(log N)"
      - "Θ(√N)"
      - "Θ(α(N)) where α is the inverse Ackermann function"
      - "Θ(N)"
    answer: 2

  - q: "You call `union(a, b)` and it returns **false**. Which statement is guaranteed true?"
    options:
      - "`rank[a]` was incremented."
      - "`size[a]` now equals `size[b]`."
      - "`find(a)` already equalled `find(b)` before the call."
      - "At least one root pointer was updated."
    answer: 2

  - q: "In an 8-element DSU with rank, the largest rank value you could possibly see *before any path compression* is:"
    options:
      - "1"
      - "2"
      - "3"
      - "7"
    answer: 1

  - q: "Consider the sequence `union(1,2)`, `union(3,4)`, `union(1,4)`, `find(2)`. Using rank and full path compression, what is the **depth of node 3 immediately after the final find**?"
    options:
      - "2"
      - "1"
      - "0"
      - "Cannot be determined without sizes"
    answer: 1

  - q: "Why does **rank never decrease**, even though path compression shortens real heights?"
    options:
      - "Implementation oversight—decreasing it would be faster."
      - "Lowering rank would violate the “shorter-under-taller” invariant retroactively."
      - "Rank is recalculated on every operation, so it does decrease."
      - "Rank is maintained only for debugging."
    answer: 1

  - q: "In a parallel algorithm you keep one DSU instance per thread and later **merge DSUs** pairwise. Which optimisation is most critical during the merge phase to avoid O(N²) work?"
    options:
      - "Path compression inside every `find` while copying"
      - "Disabling union-by-rank temporarily"
      - "Sorting element IDs before merging"
      - "Using 64-bit integers for `parent`"
    answer: 0
---
