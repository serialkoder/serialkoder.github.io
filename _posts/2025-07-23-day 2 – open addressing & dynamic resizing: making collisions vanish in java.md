---
layout: post
title: "Day 2 – Open Addressing & Dynamic Resizing: Making Collisions Vanish in Java"
tags: [data-structures-and-algorithms]
---


# Day 2 – Open Addressing & Dynamic Resizing: Making Collisions Vanish in Java

## 1. Collision Handling II – Open Addressing

**a. Narrative intro**
Yesterday we parked colliding keys in linked lists. Great—until the CPU’s cache‑lines sat idle and every lookup chased pointers. Open addressing attacks the same congestion from another angle: keep the data in the array and search for the next free slot with a *probe*. Collisions turn into short, predictable walks over contiguous memory—exactly what modern hardware loves.

**b. Key take‑aways**

* Probe sequences are deterministic; no auxiliary nodes are allocated.
* **Linear probing** can snowball into *primary clustering*—long runs of occupied cells.
* **Quadratic probing** skips farther each hop and breaks big clusters into islands.
* **Double hashing** churns the step‑size with a second hash—no more patterns.
* “Table full” occurs when every bucket is non‑null & non‑tombstone.
* Deletions mark *tombstones* so later probes don't end early.

**c. Java code snippet**

```java
import java.util.*;

public class OpenAddressingHashSet<T> {
  private static final Object DEL = new Object();
  private Object[] tab;
  private int size;
  public enum ProbeStrategy { LINEAR, QUADRATIC, DOUBLE }
  private final ProbeStrategy ps;

  public OpenAddressingHashSet(int cap, ProbeStrategy ps) {
    tab = new Object[nextPow2(cap)]; this.ps = ps;
  }
  private int idx(Object k, int i) { int h = k.hashCode() & 0x7fffffff;
    return switch (ps) {
      case LINEAR    -> (h + i) & (tab.length - 1);
      case QUADRATIC -> (h + i*i) & (tab.length - 1);
      case DOUBLE    -> (h + i * ((h >>> 16) | 1)) & (tab.length - 1);
    };
  }
  public boolean add(T k) {
    for (int i = 0; i < tab.length; i++) {
      int j = idx(k, i); Object o = tab[j];
      if (o == null || o == DEL) { tab[j] = k; size++; return true; }
      if (o.equals(k)) return false;
    }
    throw new IllegalStateException("table full");
  }
  public boolean contains(T k) {
    for (int i = 0; i < tab.length; i++) {
      Object o = tab[idx(k, i)];
      if (o == null) return false; if (o.equals(k)) return true;
    }
    return false;
  }
  public boolean remove(T k) {
    for (int i = 0; i < tab.length; i++) {
      int j = idx(k, i); Object o = tab[j];
      if (o == null) return false;
      if (o.equals(k)) { tab[j] = DEL; size--; return true; }
    } return false;
  }
  private static int nextPow2(int n){ int p=1; while(p<n) p<<=1; return p; }
}
```

**d. Study‑check questions**

* Why does linear probing create primary clusters, and how does that hurt performance?
* How does a tombstone differ from `null` during search?
* Why must the second hash in double hashing be odd relative to the table size?

---

## 2. Optimised Open Addressing

**a. Narrative intro**
Simple probes are good, but we can still do better. Two elegant twists—Robin‑Hood and Cuckoo—shrink worst‑case probe lengths and give us stronger guarantees. Both borrow from social metaphors: rob the fortunate bucket of its short probe, or evict a resident into a second house.

**b. Key take‑aways**

* **Robin‑Hood hashing** keeps probe lengths nearly equal; variance drops sharply.
* Insert may *swap* entries many times, but lookups stay short and predictable.
* **Cuckoo hashing** stores two hash functions and two tables; each key lives in one.
* Lookups are constant‑time (check two spots), but inserts can loop → rehash.
* These schemes trade extra moves or extra memory for tighter bounds.

**c. Java code snippet**

```java
import java.util.*;
/* ---------- Robin–Hood core ---------- */
class RobinHoodHashMap<K,V>{
  private Object[] k,v; private int n;
  RobinHoodHashMap(){ k=new Object[16]; v=new Object[16]; }
  private int m(){ return k.length-1; }
  private int h(Object x){ return x.hashCode()*0x9e3779b9; }
  @SuppressWarnings("unchecked")
  public V put(K key,V val){
    int cap=k.length, idx=h(key)&m(), d=0;
    for(;;){ if(k[idx]==null){ k[idx]=key; v[idx]=val; n++; return null; }
      if(k[idx].equals(key)){ V old=(V)v[idx]; v[idx]=val; return old; }
      int d2=(idx-(h(k[idx])&m())+cap)&m();
      if(d2<d){ Object tk=k[idx], tv=v[idx];
        k[idx]=key; v[idx]=val; key=(K)tk; val=(V)tv; d=d2; }
      idx=(idx+1)&m(); d++; }
  }
  public V get(K key){
    int cap=k.length, idx=h(key)&m(), d=0;
    for(;;){ if(k[idx]==null) return null;
      if(k[idx].equals(key)) return (V)v[idx];
      int d2=(idx-(h(k[idx])&m())+cap)&m();
      if(d2<d) return null; idx=(idx+1)&m(); d++; }
  }
}

/* ---------- Cuckoo core ---------- */
class CuckooHashMap<K,V>{
  private Entry<K,V>[] a,b;
  static class Entry<K,V>{K k;V v;Entry(K k,V v){this.k=k;this.v=v;}}
  @SuppressWarnings("unchecked")
  CuckooHashMap(){ a=new Entry[16]; b=new Entry[16]; }
  private int h1(Object x){ return x.hashCode(); }
  private int h2(Object x){ return ~x.hashCode(); }
  public V get(K k){ int i=h1(k)&(a.length-1);
    if(a[i]!=null&&a[i].k.equals(k)) return a[i].v;
    int j=h2(k)&(b.length-1);
    return b[j]!=null&&b[j].k.equals(k)?b[j].v:null; }
  public void put(K k,V v){
    for(int cnt=0; cnt<a.length; cnt++){
      int i=h1(k)&(a.length-1);
      if(a[i]==null){ a[i]=new Entry<>(k,v); return; }
      Entry<K,V> e=a[i]; a[i]=new Entry<>(k,v); k=e.k; v=e.v;
      int j=h2(k)&(b.length-1);
      if(b[j]==null){ b[j]=e; return; }
      e=b[j]; b[j]=new Entry<>(k,v); k=e.k; v=e.v; }
    throw new RehashException();
  }
  static class RehashException extends RuntimeException{}
}

/* ---------- tiny timing harness ---------- */
class PerfTest{
  public static void main(String[] a){
    int N=1_000_000;
    var rh=new RobinHoodHashMap<Integer,Integer>();
    var ck=new CuckooHashMap<Integer,Integer>();
    long t0=System.nanoTime();
    for(int i=0;i<N;i++) rh.put(i,i);
    long t1=System.nanoTime();
    for(int i=0;i<N;i++) ck.put(i,i);
    long t2=System.nanoTime();
    System.out.printf("Robin‑Hood %.1f ms%n",(t1-t0)/1e6);
    System.out.printf("Cuckoo     %.1f ms%n",(t2-t1)/1e6);
  }
}
```

**d. Study‑check questions**

* How does swapping in Robin‑Hood reduce variance of probe lengths?
* Why can Cuckoo hashing guarantee ≤ 2 probes for search yet still fail on insert?
* In the timing harness, what table size change would trigger a `RehashException` sooner?

---

## 3. Dynamic Resizing & Load Factor

**a. Narrative intro**
Even the smartest probe scheme crumbles once the table is crammed. Load factor (α = size / capacity) governs that tipping point. Most production sets double capacity around 0.7; some favor primes to dodge poor hash codes, others use powers of two for bit‑wise magic. The hidden cost is *rehash storms*: a single insert pauses the world to relocate thousands of keys. Incremental resizing spreads that cost over many operations.

**b. Key take‑aways**

* Keep α around 0.5–0.75 for open addressing; higher → longer probes.
* Doubling keeps modulo math cheap; primes reduce patterns but complicate masks.
* Amortised O(1) holds because each item moves O(log n) times across its life.
* Incremental rehashing maintains two tables and migrates a few buckets per op.
* Watching latency matters more than Big‑O when tables grow into millions.

**c. Java code snippet**

```java
/* --- growth support added to previous OpenAddressingHashSet --- */
public void ensureCapacity() { if ((double)size/tab.length > 0.7) grow(); }

@SuppressWarnings("unchecked")
private void grow() {
  Object[] old = tab; tab = new Object[old.length << 1]; size = 0;
  for (Object o : old) if (o != null && o != DEL) add((T)o);
}

/* --- micro demo: prints size, capacity, cost per insert --- */
public static void main(String[] args) {
  var set = new OpenAddressingHashSet<Integer>(4,
            OpenAddressingHashSet.ProbeStrategy.LINEAR);
  for (int i = 0; i < 40; i++) {
    long t0 = System.nanoTime();
    set.add(i); set.ensureCapacity();
    System.out.printf("size=%d cap=%d cost=%d ns%n",
                      set.size, set.tab.length, System.nanoTime()-t0);
  }
}
```

**d. Study‑check questions**

* Why does doubling at α ≈ 0.7 minimise average probe length *and* wasted space?
* How would you implement incremental rehashing without blocking writers?
* Explain why resizing keeps amortised insert O(1) despite occasional O(n) moves.

---

*Tomorrow in **Day 3** we turn to Java‑specific nuances—order preservation, weakly consistent iterators, and thread‑safe collision handling.*
