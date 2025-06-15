---
layout: post
title: "Fundamental Sorting Algorithms (Quick Cheat Sheet)"
tags: [algorithms, python]
---
## Merge Sort — `O(n log n)`, *stable*

Recursively split until each sub-array has one element, then merge the halves by repeatedly taking the smaller front element.
Splitting costs `log n`, merging at each depth touches every item, yielding `n log n`.

```python
def merge_sort(a):
    if len(a) <= 1:
        return a
    mid = len(a) // 2
    left  = merge_sort(a[:mid])
    right = merge_sort(a[mid:])
    res, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            res.append(left[i]); i += 1
        else:
            res.append(right[j]); j += 1
    res.extend(left[i:]); res.extend(right[j:])
    return res
```



## Quick Sort — `O(n log n)` *average*, `O(n²)` *worst*, in-placeish

Pick a pivot, partition into `< pivot`, `== pivot`, `> pivot`, then recurse on the outer parts.
Randomizing the pivot avoids the degenerate `n²` case and keeps the algorithm cache-friendly.

```python
import random

def quick_sort(a):
    if len(a) <= 1:
        return a
    pivot = random.choice(a)
    lo = [x for x in a if x <  pivot]
    eq = [x for x in a if x == pivot]
    hi = [x for x in a if x >  pivot]
    return quick_sort(lo) + eq + quick_sort(hi)
```


## Heap Sort — `O(n log n)`, in-place

Treat the array as a max-heap:
1️⃣ build the heap; 2️⃣ repeatedly swap the root (largest) with the last unsorted element and sift-down.
Uses only `O(1)` extra space.

```python
def heap_sort(arr):
    def sift_down(parent, end):
        # Re-heapify the subtree rooted at *parent* up to index *end*
        while (left := 2 * parent + 1) <= end:          # left child exists
            right = left + 1                            # right child index
            largest = left                              # assume left is larger
            if right <= end and arr[right] > arr[left]:
                largest = right                         # pick right if larger
            if arr[parent] >= arr[largest]:
                return                                  # heap property satisfied
            arr[parent], arr[largest] = arr[largest], arr[parent]
            parent = largest                            # continue sifting

    n = len(arr)

    # 1️⃣ Build the max-heap (heapify)
    for parent in range((n - 2) // 2, -1, -1):
        sift_down(parent, n - 1)

    # 2️⃣ Extract elements one by one
    for end in range(n - 1, 0, -1):
        arr[0], arr[end] = arr[end], arr[0]             # move current max to its spot
        sift_down(0, end - 1)                           # restore heap property

    return arr
```


## Radix Sort — `O(k n)`, *stable* (LSD variant)

Process digits from least- to most-significant; a stable bucket (counting) sort on each digit preserves prior order, so the list ends up fully sorted.
Best for fixed-length integers or strings; `k` is the number of digit positions.

```python
def radix_sort(a, base=10):
    if not a:
        return a
    max_val, exp = max(a), 1
    while max_val // exp:
        buckets = [[] for _ in range(base)]
        for num in a:
            buckets[(num // exp) % base].append(num)
        a = [num for bucket in buckets for num in bucket]
        exp *= base
    return a
```


## Counting Sort — `O(n + k)`, *stable*

When keys fall in a small range `0…k`, count occurrences, compute prefix sums for final positions, and place each item.
Linear time when `k ≈ n`; memory cost is `O(k)`.

```python
def counting_sort(a, k=None):
    if not a:
        return a
    k = k if k is not None else max(a)
    count = [0]*(k + 1)
    for num in a:
        count[num] += 1
    for i in range(1, k + 1):          # prefix sums
        count[i] += count[i - 1]
    out = [0]*len(a)
    for num in reversed(a):            # backward for stability
        count[num] -= 1
        out[count[num]] = num
    return out
```


## Bucket Sort — `O(n + k)` average, *stable* with stable sub-sort

Spread values into `m` buckets using a hash or numeric range, sort each bucket (often insertion sort), then concatenate.
Assumes input is roughly uniform; worst-case devolves to `O(n²)` if everything lands in one bucket.

```python
def bucket_sort(a, bucket_size=10):
    if not a:
        return a
    min_val, max_val = min(a), max(a)
    count = (max_val - min_val)//bucket_size + 1
    buckets = [[] for _ in range(count)]
    for num in a:
        buckets[(num - min_val)//bucket_size].append(num)

    def insertion(lst):                # stable sub-sort
        for i in range(1, len(lst)):
            key, j = lst[i], i - 1
            while j >= 0 and lst[j] > key:
                lst[j + 1] = lst[j]; j -= 1
            lst[j + 1] = key
        return lst

    return [x for b in buckets for x in insertion(b)]
```


## Quick Comparison Table

| Algorithm    | Stable | Extra Space | Best / Avg / Worst            |
| ------------ | ------ | ----------- | ----------------------------- |
| **Merge**    | Yes    | `O(n)`      | `n log n / n log n / n log n` |
| **Quick**    | No     | `O(log n)`  | `n log n / n log n / n²`      |
| **Heap**     | No     | `O(1)`      | `n log n` everywhere          |
| **Counting** | Yes    | `O(k)`      | `n` if `k ≤ n`                |
| **Radix**    | Yes    | `O(n + k)`  | `k n` (k = digits)            |
| **Bucket**   | Yes\*  | `O(n + k)`  | `n / n + k / n²`              |

\* Stable when the per-bucket sort is stable (insertion sort above is).


### Quick Test Snippet

```python
data = [5, 1, 3, 4, 2]
print(heap_sort(data.copy()))
```

Use `.copy()` to keep the original list intact; swap in any of the functions above to verify correctness or benchmark performance.
