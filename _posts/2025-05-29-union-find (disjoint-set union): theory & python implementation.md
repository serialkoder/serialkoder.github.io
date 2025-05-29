---
layout: post
title: "Union-Find (Disjoint-Set Union): Theory & Python Implementation"
tags: [data-structures-and-algorithms]
---


## 1  Why Union-Find?

*Dynamic connectivity* problems ask: **“Are *x* and *y* in the same group?”**
Typical use-cases include:

| Domain                           | Example                                              |
| -------------------------------- | ---------------------------------------------------- |
| Graph algorithms                 | Kruskal’s MST, connected-components                  |
| Percolation / image segmentation | Label connected pixels/regions                       |
| Dynamic network sims             | “Do these hosts share a VLAN after N cable changes?” |

We need three operations:

* `make(n)` — initialise *n* singleton sets.
* `find(x)` — return the canonical representative (root) of *x*’s set.
* `union(x, y)` — merge the two sets if distinct.

---

## 2  Data representation

A **forest of rooted trees** encoded in two parallel arrays

| Array                    | Meaning                                                       | After `make(n)` |
| ------------------------ | ------------------------------------------------------------- | --------------- |
| `parent[i]`              | Immediate ancestor (root points to itself)                    | `i`             |
| `rank[i]` *or* `size[i]` | Height estimate **or** element count—stored **only** on roots | `0` / `1`       |

We’ll show both variants; pick the one that best fits your needs.

---

## 3  Baseline algorithms (no optimisations)

```text
find(x):
    while parent[x] ≠ x:
        x ← parent[x]
    return x

union(x, y):
    rx ← find(x);  ry ← find(y)
    if rx == ry: return False
    parent[rx] ← ry
    return True
```

*Worst-case cost*: **O(n)** – a chain can grow as tall as *n − 1*.
Good for tiny inputs or white-board demos, terrible at scale.

---

## 4  Two classic heuristics = near-O(1)

| Heuristic                | Where used     | 1-liner intuition                                                   |
| ------------------------ | -------------- | ------------------------------------------------------------------- |
| **Path compression**     | inside `find`  | “While climbing, re-point every visited node straight to the root.” |
| **Union-by-rank / size** | inside `union` | “Attach the shorter/smaller tree under the taller/larger root.”     |

Add both and Tarjan proved the amortised complexity over any sequence of `m` ops on `n` elements is
`O((n + m) · α(n))` where **α(n)** (inverse Ackermann) < 5 for any feasible *n*.
Effectively constant-time.

---

## 5  Python 3 implementation

### 5.1  Naïve (teaching) version

```python
class DSUPlain:
    """Bare-bones Union–Find without optimisations (O(n) worst case)."""

    def __init__(self, n: int):
        self.parent = list(range(n))

    def find(self, x: int) -> int:
        while self.parent[x] != x:
            x = self.parent[x]
        return x

    def union(self, a: int, b: int) -> bool:
        ra, rb = self.find(a), self.find(b)
        if ra == rb:
            return False
        self.parent[ra] = rb
        return True
```

### 5.2  Optimised (path compression + union-by-size)

```python
class DSU:
    """Disjoint-Set Union with path compression + union-by-size."""
    __slots__ = ("parent", "size")          # saves memory in CPython

    def __init__(self, n: int):
        self.parent = list(range(n))
        self.size   = [1] * n               # size[i] valid only if i is root

    def find(self, x: int) -> int:
        """Iterative path compression (stack-safe)."""
        root = x
        while self.parent[root] != root:    # climb to root
            root = self.parent[root]

        # second pass: compress
        while self.parent[x] != root:
            nxt = self.parent[x]
            self.parent[x] = root
            x = nxt
        return root

    def union(self, a: int, b: int) -> bool:
        ra, rb = self.find(a), self.find(b)
        if ra == rb:
            return False                    # already unified

        # attach smaller under larger
        if self.size[ra] < self.size[rb]:
            ra, rb = rb, ra                 # ensure ra is larger
        self.parent[rb] = ra
        self.size[ra] += self.size[rb]
        return True

    # handy helpers
    def connected(self, a: int, b: int) -> bool:
        return self.find(a) == self.find(b)

    def set_size(self, x: int) -> int:
        return self.size[self.find(x)]
```

**Swap in a `rank` array** (initialised to 0) if you only need height heuristics:

```python
# inside union:
if self.rank[ra] < self.rank[rb]:
    self.parent[ra] = rb
elif self.rank[ra] > self.rank[rb]:
    self.parent[rb] = ra
else:
    self.parent[rb] = ra
    self.rank[ra] += 1
```

---

## 6  Mini smoke test

```python
d = DSU(10)
assert d.union(1, 2)
assert d.union(3, 4)
assert d.connected(1, 2)
assert not d.connected(1, 3)
d.union(2, 3)
assert d.connected(1, 4)
assert d.set_size(1) == 4
print("all good ✓")
```

---

## 7  When to choose which variant

| Scenario                        | Use plain DSU | Use path compression only | Use both heuristics |
| ------------------------------- | ------------- | ------------------------- | ------------------- |
| ≤ 1 k ops, quick demo           | ✔︎            | –                         | –                   |
| Coding-interview task (n ≤ 1e5) | –             | ✔︎ (okay)                 | ✔︎ (safer)          |
| Production Kruskal on 1e7 edges | –             | –                         | ✔︎ absolutely       |

---

## 8  Key take-aways

* **One extra array** (`rank` or `size`) + **one line in `find`** collapses complexity from *linear* to “so close to constant it doesn’t matter.”
* Rank bumps only on ties; size only aggregates—no costly maintenance.
* Most practical DSU bugs come from forgetting the “early-exit if same root” or updating the wrong root’s metadata.

---

Happy coding—your Disjoint-Set Union is now production-ready!
