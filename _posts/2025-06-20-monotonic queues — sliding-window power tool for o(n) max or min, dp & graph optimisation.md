---
layout: post
title: "Monotonic Queues — Sliding-Window Power Tool for O(n) Max/Min, DP & Graph Optimisation"
tags: [algorithms, data-structures, monotonic-queues]
---
Great — I’ll prepare a \~1,200-word article introducing monotonic queues for intermediate-to-advanced software engineers and SDE interview candidates. It’ll include:

* An executive summary
* A narrative article with clear, skimmable headings
* Code examples for core use-cases (like sliding-window max/min, dynamic programming optimizations, and graph/pathfinding applications)
* A cheat-sheet table summarizing operations and costs
* A curated list of 8–10 high-quality resources for further reading

I’ll get started and let you know as soon as it’s ready.


# Monotonic Queues — Sliding-Window Power Tool for O(n) Max/Min, DP & Graph Optimisation

## Executive Summary

A **monotonic queue** (usually implemented as a deque) is a specialized data structure that keeps its elements in sorted order (either non-increasing or non-decreasing) at all times. This simple idea yields powerful results: it lets you fetch the maximum or minimum in a *sliding window* in amortised **O(1)** time per element (total **O(n)** for an array scan). Monotonic queues shine whenever you need to efficiently track an extreme (max/min) over a moving window or range – common in streaming data analytics, rolling metrics, and coding interview problems. They also unlock linear-time solutions to certain dynamic programming recurrences (by turning a costly range-`max` or `min` query into constant time) and even speed up graph algorithms for weighted shortest paths. In scenarios that involve sequential monotonic queries, reaching for a monotonic queue can eliminate heaps or segment trees and **dramatically reduce complexity**, as long as queries are limited to “max” or “min” operations. (For more complex or unordered queries like medians or percentiles, other structures are preferable.) In short, use monotonic queues for sliding extremes and DP optimisations to get *heap-like power* at **deque-like speeds**.

## From FIFO to “FIFO-with-Pruning”: How Monotonic Queues Work

Imagine a normal FIFO queue that, somehow, always *keeps the largest element at the front*. A **monotonic queue** achieves this by **pruning** out weaker elements as new ones arrive. In a **decreasing monotonic queue** (for tracking maximums), every push ejects any smaller values lurking at the back, since they can never be the max if a bigger element came in after them. Dually, an **increasing monotonic queue** pops out any larger values on a push (useful for minimums). This way, the queue’s internal order is maintained as always decreasing (for max-queue) or increasing (for min-queue). Crucially, we still add and remove from opposite ends like a normal deque (new elements go in the back; old elements get removed from the front), preserving FIFO order *except* that some elements get dropped early (“pruned”) by the invariant. The result: at any given time, the front of the deque is the current maximum (or minimum) of all elements in it.

**Why does this help?** Because if you slide a window across an array, you can maintain its max/min in constant time using this deque. As the window moves forward, you **pop from the front** when the oldest element leaves the window, and **push new elements** at the back with the pruning step to drop obsolete smaller values. Each element is added and removed at most once over the whole process, ensuring the total cost stays linear. The deque effectively behaves like a “max queue” or “min queue” supporting three operations: push (with pruning), pop (from front), and peek (front element) – all in amortised O(1) time. This *FIFO-with-pruning* trick is the heart of the monotonic queue’s power.

## Sliding-Window Maximum in O(n) (Step-by-Step)

To cement the idea, consider the classic **Sliding Window Maximum** problem: Given an array `nums` and window size `k`, find the max in each window of length `k` as it slides along. A naïve solution checks all k elements for each window (O(n·k)), and a heap-based solution improves it to O(n log n), but a monotonic deque nails it in **O(n)**. Here’s how it works step-by-step:

* **Initial Fill:** Start by processing the first `k` elements. Initialize an empty deque. For each of the first `k` indices `i` from 0 to k-1, call `push(nums[i])`: compare `nums[i]` with the deque’s tail values, and pop the tail while `nums[i]` is larger. Then push `nums[i]` (or its index) into the deque. This ensures after the first `k` pushes, the deque holds those elements in decreasing order (so the front is the max of the first window).

* **Slide the Window:** Now, for each subsequent index `i = k` to `n-1`, do two operations: (**a**) pop from front if the front element is now out of the new window’s range (i.e. if it has index `i - k` or earlier); (**b**) push the new element `nums[i]` with the same pruning logic (remove all smaller elements at the tail before adding). After this, the front of the deque is the maximum for the window ending at index `i`. Record it, then continue.

For example, take `nums = [1,3,-1,-3,5,3,6,7]` with `k=3`. The monotonic deque process would produce:

* Window \[1,3,-1]: Deque becomes \[3,-1] (after pruning 1). Max = **3**.
* Window \[3,-1,-3]: Deque becomes \[3,-1,-3] (3 stays as it’s >= others). Max = **3**.
* Window \[-1,-3,5]: Old 3 leaves (pop front). New 5 enters, prunes all smaller (deque was \[-1,-3], both drop). Deque = \[5]. Max = **5**.
* Window \[-3,5,3]: 5 at front remains (still in window). New 3 enters, prunes nothing (5 > 3). Deque = \[5,3]. Max = **5**.
* Window \[5,3,6]: 5 leaves (pop front). New 6 enters, prunes 3 (since 6 is bigger). Deque = \[6]. Max = **6**.
* Window \[3,6,7]: 3 leaves. New 7 enters, prunes 6. Deque = \[7]. Max = **7**.

This yields outputs `[3,3,5,5,6,7]` which matches the expected results. Each element was enqueued once and dequeued (or pruned) at most once, for a total of \~2n deque operations, guaranteeing linear time overall. In fact, the monotonic queue method is the **fastest possible** for this problem — data structures like heaps or segment trees will be slower by a logarithmic factor.

## Dynamic Programming Speed-ups (Sliding Window DP Optimization)

Monotonic queues aren’t limited to explicit “sliding window” problems – they also excel in dynamic programming optimizations where a state transitions from a *window* of previous states. A common scenario is a DP recurrence like:

$ dp[i] = \text{value}[i] + \max_{j \in [i-k,\; i-1]} dp[j] ,$

where each state depends on the maximum of the last k DP values (or minimum, in other cases). Computing this directly is O(n·k), but we can treat “max of last k dp\[j]” as a sliding-window query and maintain it with a monotonic deque in O(n). This trick turns many seemingly quadratic DP problems into linear ones.

**Jump Game VI** (LeetCode 1696) is a canonical example. You must jump through an array with at most `k` steps at a time, maximizing your score. The straightforward DP is: `dp[i] = nums[i] + max(dp[i-1...i-k])`. Using a deque to hold indices of the best recent dp values (dropping any dp that’s lower than a new candidate) gives a linear solution. Similarly, **Constrained Subsequence Sum** (LC 1425) asks for the maximum sum subsequence with distance ≤ k between elements – which leads to `dp[i] = nums[i] + max(0, dp[i-1...i-k])`. A monotonic queue over the dp array achieves O(n) time. In both cases, the deque logic mirrors the sliding window maximum: as `i` increases, remove dp values that fall out of the \[i-k, i-1] range from the front, and remove any smaller dp values from the back before adding dp\[i-1] or dp\[i] in. This technique can drastically speed up DP solutions that otherwise would timeout, and it’s easier to implement than heavy alternatives like segment trees or heaps (which would give O(n log n) time). Whenever you see a DP that looks at a **min/max over a fixed recent range**, think monotonic queue optimization.

## Graph & Path-Finding: 0–1 BFS and Dial’s Algorithm

Monotonic queues even appear in graph algorithms, notably for shortest paths in graphs with small integer weights. A prime example is the **0–1 BFS** algorithm for graphs where each edge weight is either 0 or 1. Normally, Dijkstra’s algorithm would handle this in O((V+E) log V) time with a priority queue. But we can do better: use a deque to store nodes to visit, and when traversing an edge of weight 0, push the new node to the *front* of the deque (since its distance is the same as the current node), and for weight 1 edges, push the node to the *back*. This way, the deque always processes nodes in increasing order of distance, effectively acting like a monotonic queue of distances. The result is an O(V+E) algorithm – each edge is relaxed exactly once, and the data structure overhead is just O(1) per edge. In essence, the deque here maintains a **monotonic order of distances** (non-decreasing from front to back), without needing a heap.

For example, if you have a deque of nodes sorted by their current tentative distance, and you explore a 0-weight edge, the neighbor gets the same distance and is queued at the front (so it’s processed immediately, as it should be). A 1-weight edge gives a neighbor distance +1, queued at back. This simple tweak keeps the distance queue sorted and eliminates the need for heap operations. This is exactly how 0–1 BFS operates, and it’s widely used for problems with binary weights.

**Dial’s algorithm** generalizes this idea to small positive weights (say 0 to *k*). Instead of a single deque, it uses an array of `k+1` buckets (queues) to hold nodes by distance mod (k+1), effectively maintaining multiple monotonic queues that cycle through distances. The bucket corresponding to the current minimum distance is processed, and when it’s empty, you move to the next bucket. This yields O(V + E) time for weights up to k (often used for shortest paths in graphs with limited-weight edges). Both 0–1 BFS and Dial’s algorithm demonstrate how maintaining **ordered queues** can replace heavier structures in graph traversal when weight constraints allow.

## Complexity: Amortised O(1) Operations vs. Heaps and Trees

**Time Complexity:** The monotonic queue achieves amortised **O(1)** time per operation (push, pop, peek), which translates to **O(n)** overall for processing n elements. The intuition is that each element is pushed once and popped at most once. Any element can only be removed in two ways: either it’s popped from the front when it becomes stale (leaves the window), or it’s pruned from the back by a larger element entering. Each element thus causes at most one push and one pop, i.e. O(2n) \~ O(n) operations total. Compare this with a **heap/priority queue** approach to sliding window max: every push or pop is O(log n), and you might do \~2n operations (push new, remove old), for O(n log n) in total. A balanced BST or skip list gives similar log-factor overhead. A **segment tree** or Fenwick tree can answer range max queries in O(log n) as well, leading to O(n log n) for n windows. Thus, the monotonic deque is asymptotically *faster* than these, and the difference is significant for large n. It’s also simpler to implement and often has lower constant factors (just a few comparisons and pointer moves per element).

**Space Complexity:** A monotonic queue stores at most one index or element per input element, so in sliding window scenarios it uses O(k) space (in worst case, it could hold all elements if they are strictly monotonic). This is optimal for holding window content. By contrast, a heap might also hold O(k) elements, and a segment tree uses O(n) memory regardless. So memory usage is comparable or better, and often the monotonic approach has better locality (working mostly at ends of a deque).

**When do these gains apply?** Only for **monotone queries** (max or min). If you need arbitrary order-statistics (median, kth largest) or combine results (e.g. sum, average), monotonic queues won’t help because they only maintain one extreme. For those, other data structures or algorithms are needed. But when you specifically need **fast min or max** in a sliding window or range, monotonic queues are the gold standard. They provide an elegant **O(n)** solution where a general data structure would be O(n log n).

## Edge Cases & Pitfalls

Like any technique, monotonic queues have some nuances and edge cases to watch out for:

* **Stale Indices:** In sliding window problems, always remove indices that are no longer in the current window. Typically, we store **indices** in the deque (not just values) so we can check if `deque.front()` is out of range (if its index < current\_index - k + 1) and pop it from front. Forgetting this step will yield incorrect results once the window moves past an element that was the old max.

* **Equal Values:** If array values can repeat, decide how to handle equality to maintain monotonicity. You can use *non-strict* comparisons (e.g. pop while new value is **greater than or equal to** tail for a max-queue) to ensure stability, or strict comparisons (pop only if strictly greater) to let equal values co-exist. Either approach works for correctness (the deque will contain a run of equal values, all valid maxima until they expire), but it affects which index leaves first. A common pattern is to treat new values as “greater or equal” when pruning, so that the deque never holds two equal values in decreasing order – this way the oldest equal will pop out first when it goes out of window, rather than being pruned immediately by the new equal value. Just be consistent, and remember that if you do allow duplicates in the deque, they will eventually be removed when out of range.

* **Window Size 1 or k ≥ n:** If k = 1, every element is trivially its own max/min (the deque logic will still work, effectively always pushing then immediately popping the single element). If k ≥ n (window as large as the array), the answer is just one value – the global max/min – and the algorithm will correctly produce that after processing the full array. Ensure your implementation handles these boundaries (particularly, when k >= n, you’ll end up outputting just one result at the end).

* **Empty Deque on Pop:** If you pop from the front only when an index goes out of range, and you always push new elements, the deque should never be empty when you need an answer (except possibly before filling the first window). However, be mindful in custom scenarios (like using a monotonic queue as a standalone structure) that you check for emptiness before calling front().

* **Data Type Limits:** Monotonic queues themselves don’t have special issues with data types, but remember that if you’re doing DP with large sums, the values in the deque could be large (consider 64-bit if needed). This isn’t a pitfall of the data structure per se, just a general implementation note.

Overall, the pitfalls are minor – just make sure to **index correctly and purge old elements**, and the structure will maintain the correct invariant automatically.

## Variants and Related Structures

Monotonic queues come in a few flavors and have cousins useful in similar scenarios:

* **Monotonic Min-Queue vs Max-Queue:** The choice of increasing or decreasing order is straightforward – use a decreasing deque for window maximums, or an increasing deque for window minimums. In fact, many problems (like “sliding window minimum”) are solved by the exact same logic with the inequality reversed. It’s often convenient to implement a single monotonic deque that can be parameterized by a comparison (greater/less) or simply write two versions for clarity. The time complexity remains O(n) either way.

* **Monotonic Stack:** A close cousin, the monotonic stack maintains a sorted order with LIFO (stack) operations instead of queue operations. Monotonic stacks are great for problems like “next greater element” or “nearest smaller element” where you process elements (often in one pass or two passes) and find relationships to neighbors. For example, to find the next greater element to the right of each array item, you can scan from right to left with a decreasing stack (pop smaller elements off the top). Monotonic stacks achieve O(n) for these problems by a similar pruning principle (each element enters and leaves the stack once). They’re used in algorithms for stock span, largest rectangle in histogram, rainwater trapping, etc. While the monotonic *queue* deals with a moving window across an array, a monotonic *stack* deals with span or range problems in one sweep. The underlying concept – maintaining an invariant sorted structure to avoid re-checking many elements – is the same.

* **Two-Stack Queue (for Range Aggregates):** Interestingly, there’s an alternative way to achieve the effect of a monotonic queue using two stacks (often called the **“two-stack trick”** or **sliding window aggregation (SWAG)**). In this approach, you maintain two stacks of elements with precomputed aggregates. For example, for a max-queue, each stack node might store `(value, max_of_stack_from_here)`. One stack (`s1`) is used for incoming elements (push stack) and one (`s2`) for outgoing (pop stack). When the front element needs to be removed, you pop from `s2`. If `s2` becomes empty and you still have elements in `s1`, you move all elements from `s1` to `s2` (popping from `s1` and pushing onto `s2`, while computing new max values as they go in). This reversal puts the oldest element on top of `s2`. The max of the queue at any time is just the greater of the top elements of `s1` and `s2` (each top carries the max of that half). Every element moves from s1 to s2 at most once, so operations are amortised O(1). The two-stack method is more general in that it doesn’t require contiguous “sliding” access patterns – you can push and pop in arbitrary sequence – making it useful for functional programming or scenarios where the sliding window moves in unpredictable ways. However, it’s a bit more complex to implement. In practice, for standard sliding window problems, the direct deque method is simpler, but it’s good to know that a two-stack queue can achieve the same performance characteristics.

* **Deque vs “Double Stack” vs Others:** The monotonic deque and the two-stack queue both achieve **amortised O(1)** per operation for max/min queries. There are even more exotic data structures for sliding window queries (like *treaps* or *splay trees* for order-statistics, or *median heaps* for median windows), but those address different kinds of queries. If your focus is strictly on min/max, the monotonic queue (deque) is usually the easiest and most efficient. Only if you needed something like the *2nd* largest element or a percentile would you consider augmenting the approach (and then you’re out of the monotonic queue’s sweet spot).

## Implementation Patterns and Tips

Implementing a monotonic queue is straightforward, and you can encapsulate it for reuse. The core idea is to **store indices and/or values** and enforce the sorted invariant on each push. Common patterns include:

* **Store Indices:** Often we store the index of each element in the deque (and access the values via the original array). This makes it easy to check if the front index is out of the allowed range (e.g., `if front_index <= i-k then pop_front()` for sliding window). The values can then be compared by looking at `array[index]`. Storing indices is useful if you plan to reuse the monotonic queue structure across different arrays or need to know positions.

* **Store Pairs (Value, Index):** Alternatively, you can store pairs. This is handy if you’re combining the check in one structure – for example, in a DP you might push `(dp_value, index)` and then you can compare by the `dp_value` for pruning and use `index` for range eviction. It’s a bit heavier in memory but clear in intent.

* **Omitting Index (Value Only):** If the pattern of usage ensures you know when to pop front (e.g., always pop front after exactly k pushes for a fixed window), you can sometimes just store values. In such cases, you call a separate `pop(value)` operation by passing the value that’s leaving the window – this method checks if that value at the front equals the leaving value, and if so pops it. This value-only approach can simplify the class interface for certain streaming scenarios, but be cautious: if the same value appears consecutively, a value-only pop might remove more than intended unless you handle it carefully. Generally, index-based is safer for correctness.

* **Reusable Class:** You can implement a monotonic queue as a class with methods `push(x)`, `pop()` (pop front), and perhaps `top()` or `max()` to get the current extreme. For example, in Python:

  ```python
  from collections import deque
  class MonotonicQueue:
      def __init__(self):
          self.dq = deque()
      def push(self, x):
          # Pop smaller values from back
          while self.dq and self.dq[-1] < x:
              self.dq.pop()
          self.dq.append(x)
      def max(self):
          return self.dq[0]  # front of deque
      def pop(self, x):
          # Remove x from front if it is the front value
          if self.dq and self.dq[0] == x:
              self.dq.popleft()
  ```

  This example maintains a decreasing queue for maximums. Before pushing a new value `x`, it pops all smaller elements from the tail to keep the deque sorted. The `pop(x)` method is called when the element `x` (about to leave the window) is known; if `x` is at the front, it pops it from the deque. This pattern allows you to slide a window by first calling `push(new_value)` then, if needed, `pop(old_value)`. In many code solutions, this little routine suffices to handle sliding window max/min elegantly.

* **Language-Specific Tips:** In C++ you might use `std::deque` and do similar operations. Be mindful to compare values correctly (for min-queue invert the comparison). In Java, a LinkedList used as deque works, or you can implement a custom deque logic. Python’s `collections.deque` is ideal for this. Always test on simple cases (including edge cases above) to ensure your implementation handles them.

By encapsulating the logic, you avoid off-by-one errors each time and can reuse it for any window size or even unbounded streaming scenarios (where you manually decide when to pop from front).

## Real-World Scenarios

Monotonic queues aren’t just theoretical interview tools; they appear in real systems wherever a rolling max/min needs to be computed efficiently:

* **Streaming Analytics and Telemetry:** Suppose you are monitoring a server and want the max CPU usage in the last 5 minutes at any given time. As metrics stream in, a monotonic queue can keep the last 5 minutes of data and give you the max in O(1) time per update, far cheaper than recomputing from scratch each time. Logging frameworks and telemetry systems often maintain running windows of metrics (throughput, latency, etc.), where monotonic queues help maintain high-frequency analytics with low overhead.

* **High-Frequency Trading (Order Books):** In financial trading, an order book has price levels that constantly change. If one wanted to track the highest bid or lowest ask in the last N orders or within a time window, a monotonic queue could maintain that quickly. Even though order books have their own specialized data structures, the concept of maintaining extremes over sliding windows can be useful for analytics on trading streams (e.g., detect if the last X trades contained an anomalously high price).

* **Network Traffic and Rate Limiting:** Networking systems may use sliding window algorithms to track the maximum or minimum throughput, packet sizes, or latencies over recent intervals for congestion control or anomaly detection. Monotonic queues can efficiently support these operations at line speed. For instance, a router might need the min RTT (round-trip-time) seen in the last 100 packets to adjust its sending rate – a monotonic min-queue does this in constant time per packet.

* **Sensor Data and IoT:** Any scenario with continuous sensor readings (temperature, voltage, etc.) might require computing a rolling max/min to trigger alerts (e.g., if temperature max over last hour exceeds a threshold). Devices with limited compute need the O(1) update that a monotonic queue provides, to avoid expensive recomputation as the window slides.

In short, whenever you have a continuous stream and you’re interested in extremes over a recent window, monotonic queues are likely the data structure of choice in production systems due to their efficiency.

## When *Not* to Use a Monotonic Queue

While monotonic queues are powerful for what they do, it’s important to recognize when they are **not** the right tool:

* **Non-Monotonic Queries:** If you need something other than the minimum or maximum (e.g., median, arbitrary percentile, sum, average, count of elements meeting a condition), a monotonic queue won’t help, because its invariant only tracks one extreme. For sum or average, a simple running total might suffice (and a queue to drop old values), but that’s a different approach. For medians or percentiles, you’d need more complex structures like balanced BSTs, heaps (median of two heaps technique), or order statistics trees. Monotonic queues answer “What is the max/min in this window?” extremely well – but that’s all they answer.

* **k-th Order Statistics:** Generalizing the above, if you need the *k-th largest* or any order statistic beyond min/max in a sliding window, monotonic queue can’t directly provide it. You might maintain multiple monotonic structures or use a heap-of-heaps, but then complexity rises. It’s usually better to use a different data structure in those cases (e.g., a two-heap median structure or an indexed tree).

* **Huge Window vs. Memory/Latency:** If your window size `k` is extremely large (approaching millions), a monotonic queue will still function in O(n) time, but the constant memory usage (O(k)) might be a consideration. Storing millions of elements in a deque is possible but might stress memory cache or even physical memory. Also, the amortised O(1) nature means occasional operations might take a bit more than O(1) (e.g. one push could trigger a long chain of pops if many smaller elements are pruned). In **real-time systems** where consistent response time is critical, these amortised spikes might be undesirable (in such cases, algorithms exist to achieve true worst-case O(1) by more complex means, beyond the scope here). However, for most practical purposes, even very large windows are fine with monotonic queues – just be mindful if you’re truly at extreme scales. If memory is too limited to even store the window, that’s not the monotonic queue’s fault – the problem itself demands holding that many elements. But you might consider approximate methods or summarize data if you cannot afford to keep an entire huge window.

* **Very Small Windows:** Ironically, if the window is extremely small (like k=1 or k=2), you don’t really need the complexity of a monotonic queue; trivial logic or a couple of comparisons will do. Monotonic queue overhead is minimal, but it’s overkill if a simple `max(a,b)` suffices for k=2, for instance.

In summary, don’t use a monotonic queue when the query isn’t max/min, or when the window size or performance constraints demand a different approach. But whenever you specifically need sliding maxima or minima, a well-implemented monotonic queue is usually unbeatable in simplicity and speed.

## Monotonic Queue Cheat-Sheet 📝

| Operation        | Description                                                                                                                                                              | Amortised Cost | Typical Use-Case                          |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- | ----------------------------------------- |
| **push(x)**      | Insert new element `x`, **popping all smaller elements** from the back to maintain sorted order (for max-queue; pop larger for min-queue).                               | O(1) amortised | Add next element of sliding window        |
| **pop\_front()** | Remove the element from the front if it **falls out of the window** (i.e. its index is out of range). In a generic queue context, this just dequeues the oldest element. | O(1)           | Slide window, remove old element          |
| **peek()/front** | Query the current extreme (max or min) at the front of the deque. This is always valid in O(1) time because of the maintained invariant (the front is the max/min).      | O(1)           | Get current window’s max or min           |
| **Size/Space**   | At most `k` elements in deque for window size k (worst-case all elements in monotonic order). Uses O(n) in worst case overall (each element stored once).                | –              | Bounded by window length `k` (or n total) |

*Amortised O(1)* means that although a single `push` might do multiple pops, each element can cause at most one pop, so across the whole sequence the average cost per operation stays constant. Monotonic queues thus combine the **output sensitivity** of a deque with the **query power** of a heap. Use this cheat-sheet as a quick reference when implementing or analyzing a monotonic queue structure.

## Further Reading

* **Monotonic Queue Explained (Li Yin, 2018)** – An approachable tutorial with examples of monotonic queues and stacks on LeetCode problems.
* **Jojo Zhuang’s Monotonic Queue Guide (2021)** – Definition, stack vs queue solutions, and code patterns for monotonic queue applications.
* **“Coding Algorithms: Monotonic Stacks and Queues” (Abhijit M., 2020)** – Blog series illustrating how monotonic structures solve next-greater-element and sliding window problems, with complexity analysis.
* **LeetCode 1696 – *Jump Game VI* (Huahua’s Tech Road)** – Solution using DP + monotonic deque to achieve O(n) time for a sliding-window max DP formula.
* **LeetCode 1425 – *Constrained Subsequence Sum* (Huahua’s Tech Road)** – Discusses using a deque to maintain the max of the last k DP states instead of a multiset, with code and complexity.
* **CP-Algorithms: Minimum Queue** – Competitive programming tutorial on maintaining min (or max) in a queue, including multiple methods (deque, two-stack) and their implementations.
* **CP-Algorithms: 0-1 BFS** – Explains the deque-based BFS approach for 0/1 edge weights and why it runs in linear time, as well as an intro to Dial’s algorithm for small weights.
* **Anthony Huang, “Monotonic Queue” (2016)** – Blog post deriving a monotonic queue solution from a DP problem, comparing it with segment tree and providing code for a min-queue with indices.
* **USACO Guide – Sliding Window section** – Covers the sliding window maximum problem and introduces both deque and two-stack solutions with code snippets and analysis.
* **“Low-Latency Sliding-Window Aggregation” (Arasu et al., 2004)** – Research paper on advanced techniques for sliding window queries (beyond amortised, ensuring worst-case constant time). A deep dive for those interested in the theory behind why two-stack/monotonic algorithms are optimal and how to avoid latency spikes in real-time systems.
