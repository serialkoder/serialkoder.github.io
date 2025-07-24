---
layout: post
title: "Day 1 – Foundations of Hashing in Java: From Direct Addressing to Separate Chaining"
tags: [data-structures-and-algorithms]
---



# Day 1 – Foundations of Hashing in Java: From Direct Addressing to Separate Chaining

## 1. From Arrays to Hash Tables

### a. Narrative intro

Imagine you’re building a phone‑directory service where the key is a user’s 10‑digit
number. With **direct addressing** you would allocate an array so that
`array[key]` gives you the record in **O(1)** time. Great—until you realize the
array must hold up to 10 000 000 000 slots, most of which are empty. Sparse or
huge key spaces turn direct addressing into a memory hog. The fix is to compress
the key space with a **hash function** that maps a large domain to a small,
fixed‑size array—our first **hash table**. Lookups stay *expected* O(1) because
we compute an index rather than scan the structure.

### b. Key take‑aways

* Direct addressing is only practical when the key domain is small and dense.
* A hash function `h(k)` maps keys to array indices `0 … N‑1`.
* Collisions occur when two keys map to the same index; ignoring them loses data.
* Choice of table size `N` and hash quality determines spread and performance.
* Even a poor hash beats sparse direct addressing for huge key ranges.

### c. Java code snippet

```java
// IntIntMap: toy hash table, no collision handling.
// WARNING: put() silently overwrites on collision.
public final class IntIntMap {
    private static final int SIZE = 16;
    private final int[] keys   = new int[SIZE];
    private final int[] values = new int[SIZE];
    private final boolean[] occupied = new boolean[SIZE];

    private int index(int key) {              // key → bucket
        return Math.floorMod(key, SIZE);      // handles negative keys
    }

    public void put(int key, int value) {
        int i = index(key);
        keys[i] = key;
        values[i] = value;
        occupied[i] = true;                   // overwrite if collision
    }

    public Integer get(int key) {
        int i = index(key);
        return occupied[i] && keys[i] == key ? values[i] : null;
    }

    public static void main(String[] args) {
        IntIntMap map = new IntIntMap();
        map.put(42, 900);
        map.put(58, 800);                     // 42 % 16 == 58 % 16 → collision
        System.out.println(map.get(42));      // prints null – data lost!
    }
}
```

### d. Study‑check questions

* Why does direct addressing waste memory when keys are sparse?
* What happens in the demo when two keys share the same `index()`?
* How would you modify the toy map to preserve both values?

## 2. Designing Basic Hash Functions

### a. Narrative intro

A hash table is only as good as its hash function. We need something **fast**
(it runs on every operation), **deterministic** (same key ⇒ same bucket), and
**uniform** (each bucket gets roughly equal traffic). For primitive integers,
`k % N` is often enough. For composite data—strings, tuples, objects—we mix the
bytes so that similar keys land far apart. Overflow, signedness, and the edge
case `hashCode() == Integer.MIN_VALUE` trip up many Java engineers; applying
`Math.abs()` blindly can flip the sign and still yield negative numbers.

### b. Key take‑aways

* Determinism + uniformity + speed = practical hash function.
* Avoid patterns such as powers‑of‑two table sizes combined with `k % N`.
* Handle overflow with 64‑bit intermediates, then fold to 32 bits.
* For strings, polynomial rolling hash gives good distribution in O(L) time.
* Always post‑process with `Math.floorMod(hash, N)` rather than `Math.abs()`.

### c. Java code snippet

```java
public final class Hashes {
    private static final int P = 31;          // small prime base
    private static final long MOD = 0x7FFFFFFFL; // 2^31 - 1, fits in int

    /** Polynomial rolling hash: Σ (s[i] * P^i) mod MOD */
    public static int hashString(String s) {
        long hash = 0;
        long pow  = 1;
        for (int i = 0; i < s.length(); i++) {
            hash = (hash + (s.charAt(i) * pow)) % MOD;
            pow  = (pow * P) % MOD;
        }
        return (int) hash;
    }

    /** Simple sanity driver */
    public static void main(String[] args) {
        String[] samples = {"alpha", "beta", "gamma", "delta", "epsilon"};
        int buckets = 16;
        int[] hits = new int[buckets];

        for (String s : samples) {
            int idx = Math.floorMod(hashString(s), buckets);
            hits[idx]++;
            System.out.printf("%s → %d%n", s, idx);
        }

        System.out.println("\nBucket occupancy:");
        for (int i = 0; i < buckets; i++) {
            System.out.printf(" %2d: %d%n", i, hits[i]);
        }
    }
}
```

### d. Study‑check questions

* Why is `Math.floorMod(hash, N)` safer than `Math.abs(hash) % N`?
* How does changing `P` in `hashString` affect collision probability?
* What uniformity pattern would warn you that your hash is poor?

## 3. Collision Handling I – Separate Chaining

### a. Narrative intro

Real workloads collide—guaranteed by the pigeonhole principle. **Separate
chaining** keeps each bucket as an independent list of key–value pairs. When
`h(k)` lands two keys in the same slot, we append to that list instead of
overwriting. Average‑time lookup stays O(α), where **load factor**
`α = size / buckets`. Keeping α below a threshold (commonly 0.75) via **rehash**
gives near‑constant performance. Compared with open addressing, chaining handles
variable bucket growth gracefully and simplifies deletion, at the cost of extra
node objects and pointer chasing.

### b. Key take‑aways

* A chain is usually a linked list or `ArrayList<Node<K,V>>` per bucket.
* Expected cost: O(1 + α); worst‑case O(size) when all keys hash equal.
* Rehash when `size > α * buckets`; double bucket count to keep α stable.
* Chaining tolerates high load factors better than open addressing but uses more
  memory per entry.
* Deletion is O(1) once the bucket is located.

### c. Java code snippet

```java
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class ChainedHashMap<K, V> {
    private static final int DEFAULT_CAP = 16;
    private static final double MAX_LOAD = 0.75;

    private List<Node<K, V>>[] table;
    private int size = 0;

    @SuppressWarnings("unchecked")
    public ChainedHashMap() {
        table = new List[DEFAULT_CAP];
    }

    private static final class Node<K, V> {
        final K key;
        V value;
        Node(K k, V v) { key = k; value = v; }
    }

    private int bucketIndex(Object key) {
        int h = key == null ? 0 : key.hashCode();
        return Math.floorMod(h, table.length);
    }

    public V put(K key, V val) {
        int idx = bucketIndex(key);
        if (table[idx] == null) table[idx] = new ArrayList<>();
        for (Node<K, V> n : table[idx]) {
            if (n.key.equals(key)) {          // update existing
                V old = n.value;
                n.value = val;
                return old;
            }
        }
        table[idx].add(new Node<>(key, val));
        if (++size > MAX_LOAD * table.length) rehash();
        return null;
    }

    public V get(Object key) {
        int idx = bucketIndex(key);
        if (table[idx] != null) {
            for (Node<K, V> n : table[idx])
                if (n.key.equals(key)) return n.value;
        }
        return null;
    }

    public V remove(Object key) {
        int idx = bucketIndex(key);
        List<Node<K, V>> bucket = table[idx];
        if (bucket == null) return null;
        for (int i = 0; i < bucket.size(); i++) {
            if (bucket.get(i).key.equals(key)) {
                V old = bucket.get(i).value;
                bucket.remove(i);
                size--;
                return old;
            }
        }
        return null;
    }

    @SuppressWarnings("unchecked")
    private void rehash() {
        List<Node<K, V>>[] old = table;
        table = new List[old.length << 1];
        size = 0;
        for (List<Node<K, V>> bucket : old)
            if (bucket != null)
                for (Node<K, V> n : bucket) put(n.key, n.value);
    }

    /* ---------- Simple JUnit 5 checks ---------- */
    public static class Tests {
        @Test void putGetRemove() {
            ChainedHashMap<String, Integer> m = new ChainedHashMap<>();
            assertNull(m.put("a", 1));
            assertEquals(1, m.get("a"));
            assertNull(m.get("b"));
            assertEquals(1, m.remove("a"));
            assertNull(m.get("a"));
        }
    }
}
```

### d. Study‑check questions

* How does load factor influence the decision to rehash?
* Why does chaining make deletion easier than open addressing?
* What is the worst‑case time for `get()` and how can it happen?

---

**Up next – Day 2 dives into open addressing strategies (linear probing, quadratic
probing, double hashing) and dynamic resizing for cache‑friendly hash tables.**
