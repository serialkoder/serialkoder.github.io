---
layout: quiz
title: "Monotonic Queue MCQ Set for SDE Interview Prep"
tags: [data-structures-and-algorithms, monotonic-queues]
questions:
  - q: "In sliding-window maximum, why is the deque-based solution $O(n)$ instead of $O(n \\times k)$?"
    options:
      - "Each element is enqueued and dequeued at most once, making total operations linear."
      - "The inner while-loop never iterates."
      - "The input size $n$ is always small."
      - "It isn’t $O(n)$ – it’s actually $O(nk)$."
    answer: "A"

  - q: "While pushing a new element in a max-monotonic queue, you pop all smaller elements from the back. What is the purpose of this?"
    options:
      - "To maintain a decreasing order by discarding any smaller elements that can’t be maximum."
      - "To eventually sort the entire list."
      - "To avoid overflow of the deque structure."
      - "No real reason – it’s just arbitrary."
    answer: "A"

  - q: "How can you adapt a monotonic-queue solution for sliding-window *minimum* instead of maximum?"
    options:
      - "Remove **larger** elements when inserting, keeping the deque increasing (min at front)."
      - "Use the same approach; a max-queue automatically gives minima."
      - "Reverse the deque every time you need the minimum."
      - "Use a min-heap instead of a deque to get $O(1)$ min."
    answer: "A"

  - q: "If the window size $k$ is 1 or larger than the array length $n$, what will the sliding-window maximum output be?"
    options:
      - "Exactly one value – the maximum of the entire array."
      - "$n$ values – same as the input array."
      - "$n-k+1$ values of 0."
      - "No output (the case is invalid)."
    answer: "A"

  - q: "A common mistake is not removing indices that fall out of the window. What happens if you never pop the front when it’s out of range?"
    options:
      - "The deque may retain an expired index at the front, causing an out-of-window element to appear as the max."
      - "Nothing bad – the logic still works without removals."
      - "The algorithm will throw an index-out-of-bounds error."
      - "The window size effectively shrinks by 1."
    answer: "A"

  - q: "Some implementations pop not only smaller but also equal values when inserting a new element. Why pop an equal value for a max-monotonic queue?"
    options:
      - "An older duplicate can be removed since a newer equal value will serve as the window max for longer."
      - "Equal values must be removed or the deque order breaks."
      - "It’s actually a bug to remove equal values."
      - "To maintain strictly decreasing order for theoretical correctness."
    answer: "A"

  - q: "In a streaming analytics system, you need the maximum of the last $k$ readings at any time. What data structure handles this most efficiently?"
    options:
      - "A monotonic deque, because it updates and fetches the window max in $O(1)$ amortized per new reading."
      - "Recomputing the max by scanning the last $k$ readings on each update."
      - "Maintaining a sorted list of the last $k$ values for direct max access."
      - "A binary max-heap that you clean up periodically."
    answer: "A"

  - q: "Why does the 0–1 BFS algorithm (for graphs with edge weights 0 or 1) use a deque instead of a priority queue like Dijkstra’s?"
    options:
      - "With 0/1 weights, a deque can process vertices in increasing distance order in $O(V+E)$ time."
      - "A deque uses less memory than a priority queue."
      - "Dijkstra’s algorithm fails if there are 0-weight edges."
      - "The deque automatically sorts all edge weights."
    answer: "A"

  - q: "What is an advantage of the deque-based approach over a segment tree for sliding-window maximum in terms of memory?"
    options:
      - "The monotonic deque stores at most $k$ indices (O(k) space) at any time, whereas a segment tree uses additional space proportional to the whole array."
      - "The deque can be allocated on the stack, saving heap memory."
      - "Segment trees store extra data like pointers for each element."
      - "There is no real memory difference – both use linear space."
    answer: "A"

  - q: "Using a max-heap or balanced BST (multiset) for sliding-window maximum leads to what complexity, compared to using a monotonic deque?"
    options:
      - "$O(n \\log n)$ time with a heap/multiset versus $O(n)$ with a deque."
      - "Both achieve $O(n)$ overall; difference is only in constants."
      - "Heap-based approach is $O(n)$ while the deque could degrade to $O(n \\log n)$."
      - "Both approaches are $O(n \\log k)$ per window slide."
    answer: "A"

  - q: "In a “jump game” where $dp[i] = \\text{nums}[i] + \\max(dp[i-1 \\dots i-k])$, how can we compute this efficiently for large $n$?"
    options:
      - "Use a decreasing monotonic deque to always access the max of the last $k$ DP values in $O(1)$."
      - "Pre-compute prefix maxima for every window of size $k$."
      - "Use a min-heap to store DP values and extract the max."
      - "It can’t be optimized below $O(n \\times k)$ in general."
    answer: "A"

  - q: "There’s a trick to get a queue with “max” in constant time by using two stacks (one for incoming, one for outgoing), each tracking their max. What is the time complexity per operation for this two-stack queue?"
    options:
      - "Amortized $O(1)$ per operation, since each element moves between the two stacks at most once."
      - "$O(\\log n)$, due to the stack operations."
      - "$O(1)$ worst-case for every single operation (no amortization needed)."
      - "$O(n)$ for enqueues and $O(1)$ for dequeues."
    answer: "A"

  - q: "Suppose you accidentally use the wrong comparison when maintaining the deque (e.g., `<` instead of `>` in a max-queue). What would be the outcome?"
    options:
      - "The deque would become increasing (min-queue), so you’d end up computing minima instead of maxima."
      - "It still works for maximum, just a bit less efficiently."
      - "It would throw off the indices and potentially crash."
      - "No change – `<` vs `>` doesn’t matter in this context."
    answer: "A"

  - q: "Why do most sliding-window maximum implementations store *indices* in the deque instead of the actual values?"
    options:
      - "Storing indices makes it easy to detect when the front of the deque is outside the current window."
      - "It uses less memory to store an index than a value."
      - "To handle negative numbers correctly."
      - "To support windows of varying sizes."
    answer: "A"

  - q: "The “Constrained Subsequence Sum” problem (max sum of a subsequence with adjacent elements at most $k$ apart) can be solved by DP with a deque. How does the deque help?"
    options:
      - "It keeps track of the maximum DP value in the last $k$ indices, so each $dp[i]$ can be computed in $O(1)$."
      - "It ensures the subsequence elements stay within $k$ distance by their positions."
      - "It keeps the subsequence sorted for maximizing the sum."
      - "It doesn’t help – a priority queue is required for the optimal solution."
    answer: "A"
---


