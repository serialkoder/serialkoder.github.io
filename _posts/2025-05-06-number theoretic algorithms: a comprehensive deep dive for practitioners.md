---
layout: post
title: "Number Theoretic Algorithms: A Comprehensive Deep Dive for Practitioners"
tags: [data-structures-and-algorithms,number-theory]
---



Great, I’ll prepare a practitioner-focused, sectioned deep dive into number theoretic algorithms with clear Python code examples, implementation tips, and real-world applications. I’ll organize it to align with your requested structure, emphasizing cryptographic relevance and competitive programming techniques.

I’ll let you know as soon as the full report is ready for your review.


# Number Theoretic Algorithms: A Comprehensive Deep Dive for Practitioners

## 1. Fundamental Concepts and Preliminaries

**Divisibility & GCD/LCM:** An integer 

$

a

$

 *divides* 

$

b

$

 if 

$

b = a k

$

 for some integer 

$

k

$

. The **Greatest Common Divisor (GCD)** of two integers is the largest integer that divides both; the **Least Common Multiple (LCM)** is the smallest positive integer divisible by both. By definition, 

$

\text{lcm}(a,b) \cdot \gcd(a,b) = |a \cdot b|

$

. The GCD can be computed efficiently via the Euclidean algorithm in 

$

O(\log \min(a,b))

$

 time. The extended Euclidean algorithm further finds integers 

$

x,y

$

 such that 

$

ax + by = \gcd(a,b)

$

, which is crucial for solving linear Diophantine equations and finding modular inverses.

**Modular Arithmetic:** For an integer 

$

m>0

$

, 

$

a \equiv b \pmod{m}

$

 means 

$

m

$

 divides 

$

(a-b)

$

. We can perform addition, subtraction, and multiplication under modulo 

$

m

$

 with the identities: 

$

(a+b) \bmod m = ((a \bmod m)+(b \bmod m)) \bmod m

$

, and similarly for multiplication. Modular arithmetic is the backbone of many algorithms (cryptographic included) since it bounds numbers within 

$

0,\dots,m-1

$

. A number 

$

a

$

 has a **modular multiplicative inverse** modulo 

$

m

$

 (i.e., an 

$

x

$

 such that 

$

ax \equiv 1 \pmod{m}

$

) iff 

$

\gcd(a,m)=1

$

.

**Prime Numbers:** A prime is an integer 

$

>1

$

 with no positive divisors other than 1 and itself. Fundamental results in number theory revolve around primes (e.g., the *Fundamental Theorem of Arithmetic* states every positive integer factors uniquely into primes). Primes underpin cryptography (RSA, Diffie-Hellman) and many algorithmic techniques. A noteworthy characterization: **Wilson’s Theorem:** 

$

(p-1)! \equiv -1 \pmod p

$

 if and only if 

$

p

$

 is prime.

**Euler’s & Fermat’s Little Theorem:** Fermat’s Little Theorem (FLI) states that if 

$

p

$

 is prime and 

$

a

$

 is not divisible by 

$

p

$

, then 

$

a^{p-1} \equiv 1 \pmod p

$

. Equivalently, 

$

a^p \equiv a \pmod p

$

 for any integer 

$

a

$

. Euler’s Theorem generalizes this: if 

$

\phi(n)

$

 is **Euler’s totient** of 

$

n

$

 (the count of integers 

$

\le n

$

 that are coprime to 

$

n

$

), then for any 

$

a

$

 coprime with 

$

n

$

, 

$

a^{\phi(n)} \equiv 1 \pmod{n}

$

. For example, 

$

\phi(10)=4

$

 and indeed 

$

3^4 = 81 \equiv 1 \pmod{10}

$

. (When 

$

n

$

 is prime 

$

p

$

, 

$

\phi(p)=p-1

$

 and Euler’s theorem becomes Fermat’s.) These theorems are the basis for modular exponentiation shortcuts and primality tests.

**Chinese Remainder Theorem (CRT):** The CRT guarantees a unique solution modulo 

$

N=\prod_{i=1}^k n_i

$

 for any system of congruences 

$

x \equiv a_i \pmod{n_i}

$

 (for 

$

i=1,\dots,k

$

), provided the moduli 

$

n_i

$

 are pairwise coprime. In simple terms, if we know the remainder of 

$

x

$

 upon division by several pairwise-coprime moduli, then there is exactly one remainder of 

$

x

$

 modulo the product of those moduli that is consistent with all given conditions. CRT is constructive: it provides a method to reconstruct 

$

x

$

 from the residues 

$

a_i

$

. This theorem is extremely useful for breaking computations into smaller moduli and then recombining results.

**Complexity Classes (Big-O basics):** When discussing algorithm efficiency, we use Big-O notation. Key classes for number theory algorithms include:

* **O(log n):** *Logarithmic time*, which grows very slowly. Example: The Euclidean GCD algorithm runs in 

$

O(\log n)

$

 steps (more precisely 

$

O(\log \min(a,b))

$

). This efficiency is why even very large integers’ GCDs can be computed quickly.
* **O(n log log n):** This is near-linear time. The classic Sieve of Eratosthenes for generating primes up to 

$

n

$

 runs in 

$

O(n \log\log n)

$

 time, which is efficient even for large 

$

n

$

 (e.g., 

$

10^7

$

 or more).
* **Polynomial time:** 

$

O(n^c)

$

 for some constant 

$

c

$

. An algorithm whose running time is polynomial in the size of its input (often the number of digits of 

$

n

$

 for number problems) is generally considered feasible. For instance, the AKS primality test is polynomial in the number of digits of 

$

n

$

 (more on that later).
* **Exponential time:** 

$

O(c^n)

$

 or similar, which becomes infeasible even for modest 

$

n

$

. Trial factoring an 

$

n

$

-digit number by checking all possible factors is roughly 

$

O(10^{n/2})

$

, exponential in 

$

n

$

 (the number of digits), which is impractical for large 

$

n

$

. Many brute-force solutions fall here.
* **Sub-exponential:** Between polynomial and exponential. Several important number-theoretic algorithms (like advanced factoring algorithms) run in sub-exponential time: faster than 

$

2^{cn}

$

 but slower than any fixed polynomial. For example, the general number field sieve (GNFS) has heuristic complexity about 

$

\exp\Big((c+o(1))(\ln n)^{1/3}(\ln\ln n)^{2/3}\Big)

$

, which grows slower than any 

$

n^\epsilon

$

 for large 

$

n

$

 but is still super-polynomial.

Understanding these classes helps in choosing algorithms appropriate to input sizes and required performance.

## 2. Essential Number Theoretic Algorithms

### GCD Computation (Euclidean Algorithm & Extended Euclid)

The Euclidean algorithm for GCD is one of the oldest and most important algorithms. It is based on the property 

$

\gcd(a,b) = \gcd(b,,a \bmod b)

$

, iteratively replacing 

$

(a,b)

$

 with 

$

(b,;a \bmod b)

$

 until 

$

b=0

$

, at which point 

$

\gcd(a,0)=a

$

 is the answer. This method is extremely fast: its running time is logarithmic in the input size (it’s bounded by a constant times the number of digits, due to a connection with the Fibonacci sequence as the worst case). In practice, it can compute GCD of numbers with millions of digits efficiently.

The **extended Euclidean algorithm** uses the same steps but additionally tracks how to express the GCD as a linear combination of the inputs. When it terminates, if 

$

d=\gcd(a,b)

$

, it returns coefficients 

$

(x,y)

$

 such that 

$

ax + by = d

$

. This extended form is indispensable for solving equations like 

$

ax + by = c

$

 and for finding modular inverses (since if 

$

\gcd(a,m)=1

$

, then 

$

ax + my = 1

$

 implies 

$

ax \equiv 1 \pmod m

$

, so 

$

x

$

 is the inverse of 

$

a

$

 mod 

$

m

$

).

### Primality Testing Algorithms

Determining if a given number 

$

N

$

 is prime is a fundamental task. Several algorithms of varying complexity and practicality exist:

* **Trial Division:** The simplest method, trial dividing 

$

N

$

 by all primes 

$

\le \sqrt{N}

$

, correctly identifies composites but is 

$

O(\sqrt{N})

$

, which is infeasible for large 

$

N

$

. It’s useful only for small limits or as a subroutine to eliminate small factors.

* **Fermat Primality Test:** Based on Fermat’s little theorem, this *probabilistic* test picks a random base 

$

a

$

 and checks if 

$

a^{N-1} \equiv 1 \pmod{N}

$

. If not, 

$

N

$

 is composite (a *Fermat witness* to compositeness). If it is congruent to 1, 

$

N

$

 is likely prime. However, some composites (Carmichael numbers) pass this test for every 

$

a

$

 coprime to 

$

N

$

, so Fermat’s test alone can be fooled. It’s fast (

$

O(\log N)

$

 for mod exponentiation) and still used as a quick screen.

* **Miller–Rabin Test:** An improved probabilistic test that addresses Fermat’s weaknesses. Miller–Rabin checks a stronger condition: write 

$

N-1 = 2^s d

$

 with 

$

d

$

 odd. For a randomly chosen base 

$

a

$

, compute 

$

a^d \bmod N

$

 and 

$

a^{2^r d} \bmod N

$

 for 

$

0 \le r < s

$

. 

$

N

$

 is composite if for **no** 

$

0\le r < s

$

 we have 

$

a^{2^r d} \equiv \pm1 \pmod{N}

$

. If this condition fails (i.e., we found a nontrivial root of 1 mod 

$

N

$

 or 

$

a^d \not\equiv 1

$

), 

$

a

$

 is a witness to 

$

N

$

’s compositeness. Miller-Rabin has the remarkable property that for a given composite 

$

N

$

, *most* bases 

$

a

$

 will detect it as composite. In fact, for any composite 

$

N

$

, at least 75% of bases 

$

a \in {2,\dots,N-2}

$

 are witnesses. Thus, a few random trials give a very high accuracy. In practice, Miller-Rabin is **the standard** primality test for large numbers: e.g., testing 7 random bases gives error 

$

<4^{-7} \approx 2^{-14}

$

, and often specific fixed bases can deterministically test primality up to huge limits (for 32-bit integers, testing bases 2, 7, and 61 is enough for a guaranteed result). Miller-Rabin runs in about 

$

O(k \log^3 N)

$

 time for 

$

k

$

 rounds (since each round does a modular exponentiation), which is extremely fast for 

$

N

$

 up to a few thousand bits.

* **AKS Primality Test:** A breakthrough deterministic algorithm (2002) that runs in polynomial time in the number of digits of 

$

N

$

. AKS is based on polynomial congruences and is guaranteed to determine primality in 

$

\tilde{O}((\log N)^6)

$

 time (originally). Although theoretically important (it proved 

$

PRIMES \in P

$

), AKS is far slower in practice than Miller-Rabin or specialized methods, so it’s not used in practical libraries where randomness is acceptable or for numbers of special forms.

**Note:** There are also other probabilistic tests like Solovay–Strassen and various specialized deterministic tests for special forms of 

$

N

$

 (e.g., checking Mersenne primes 

$

2^p-1

$

 with Lucas–Lehmer). For most applications, Miller–Rabin is the go-to due to its simplicity and reliability.

### Prime Generation – Sieve Algorithms

When we need **all primes up to N**, the Sieve of Eratosthenes is the classic algorithm. It creates a boolean array of size 

$

N

$

 and iteratively marks multiples of each prime starting from 2. The sieve runs in 

$

O(N \log\log N)

$

 time, which is very close to linear. For example, generating all primes up to 10 million (

$

N=10^7

$

) is quite feasible in a fraction of a second in C++ using the sieve. Memory usage is 

$

O(N)

$

. An optimized variant, the **Sieve of Atkin**, uses some mathematical improvements to theoretically reduce operations, but in practice it’s more complex and offers only constant-factor improvements. For extremely large 

$

N

$

 where memory is an issue, a **segmented sieve** is used: it generates primes in fixed-size segments (using base primes up to 

$

\sqrt{N}

$

 to mark multiples), allowing us to find primes in a range \[A, B] without sieving all the way up to B. Segmented sieves are essential in competitive programming when 

$

N

$

 can be up to, say, 

$

10^{12}

$

 and we need primes in a sub-interval of that range.

### Integer Factorization Algorithms

Factoring a composite number into primes is generally hard (in fact, the assumed hardness of factoring underpins RSA security). However, there are many algorithms to tackle factoring:

* **Trial Division (again):** If 

$

N

$

 is small (or has small factors), trial dividing by primes up to a limit is fine. It’s often used to weed out small prime factors before applying heavier methods. For example, trial division by all primes 

$

\le 10^6

$

 will quickly factor any number up to 

$

10^{12}

$

 that has a small factor.

* **Pollard’s Rho Algorithm:** A clever randomized algorithm that excels at finding **smallish factors** of large numbers. It runs in expected time proportional to 

$

\sqrt\[4]{N}

$

 (more formally, expected 

$

O(n^{1/4})

$

 for an 

$

n

$

-digit number, or more precisely proportional to 

$

\sqrt{p}

$

 where 

$

p

$

 is the smallest prime factor). Pollard’s Rho uses a pseudo-random sequence 

$

x_{i+1} = f(x_i)

$

 (often 

$

f(x)=x^2 + c \bmod N

$

) and Floyd’s cycle-finding (tortoise-hare) to detect a cycle modulo an unknown factor. When a cycle is found, the difference of two sequence values tends to reveal a nontrivial gcd with 

$

N

$

. In practice, Pollard’s Rho factors 60- or 70-digit numbers relatively quickly and is simple to implement. It may fail if the random sequence is unlucky (yielding no factor), but one can retry with a different polynomial 

$

f

$

 or seed. It uses minimal memory and often finds a factor faster than a general 

$

O(\sqrt{N})

$

 attempt would.

* **Quadratic Sieve (QS):** This was for a long time the fastest general-purpose factoring algorithm for numbers up to \~100 digits. QS is a complex but deterministic algorithm that works by finding a set of numbers whose squares are all congruent mod 

$

N

$

 to produce a congruence of squares and thus a factor. Its runtime is roughly 

$

L_N\[1/2, 1] = \exp((1+o(1))\sqrt{\ln N \ln\ln N})

$

, i.e., sub-exponential. QS comprises a sieving step to find “smooth” numbers (numbers composed only of small primes) and a linear algebra step to find dependencies. It’s significantly faster than 

$

O(\sqrt{N})

$

 for large 

$

N

$

. Historically, the quadratic sieve was used to factor RSA-129 (129-digit number) in 1994.

* **General Number Field Sieve (GNFS):** The reigning champion for factoring large integers (greater than roughly 100 digits). GNFS is very advanced – it uses algebraic number fields to find smooth relations – but heuristically runs in 

$

L_N\[1/3, (64/9)^{1/3}]

$

 time, which for a 200-digit number is astronomically faster than any of the above methods. GNFS was used to factor RSA-768 (232-digit number) in 2009, a computation that took several CPU-centuries. GNFS has many intricate steps (polynomial selection, sieving in multiple dimensions, matrix solve).

While out of scope to implement here, it’s worth knowing that GNFS (and its variant for special forms) is the reason RSA keys need to be so large (2048+ bits) to be safe.

* **Pollard’s P–1 Algorithm:** A specialized method effective if 

$

N

$

 has a prime factor 

$

p

$

 such that 

$

p-1

$

 has only small prime factors. It runs in time related to the size of those factors. It’s not general-purpose but can be very fast in its niche.

* **Elliptic Curve Method (ECM):** A factorization algorithm that uses elliptic curves to find factors. Like Pollard’s 

$

p-1

$

, ECM is good at finding relatively small factors, but it’s one of the best for very large 

$

N

$

 when you only need one factor. Its running time is roughly 

$

L_p\[1/2, \sqrt{2}]

$

 where 

$

p

$

 is the smallest factor of 

$

N

$

. ECM is often used in the early stages of factoring to peel off smaller primes before applying NFS on the cofactor.

Each factorization algorithm has use-cases. For competitive programming, Pollard’s Rho combined with some trial division is usually the go-to for up to 18-20 digit numbers (or even more, using 128-bit arithmetic or Python big ints). For extremely large numbers (100+ digits), general algorithms are beyond CP scope, but knowing their existence helps understand cryptographic key sizes and the limits of classical computation.

### Fast Modular Exponentiation and Discrete Logarithms

**Modular Exponentiation:** Computing 

$

a^b \bmod m

$

 for large 

$

b

$

 is crucial in many tasks (primality tests, RSA encryption, etc.). Using the “exponentiation by squaring” method, we can compute this in 

$

O(\log b)

$

 time instead of multiplying 

$

a

$

 by itself 

$

b

$

 times. The method is simple: to compute 

$

a^b

$

, write 

$

b

$

 in binary and square-and-multiply accordingly. For example, to compute 

$

a^{13}

$

: 

$

13_{(10)} = 1101_{(2)}

$

, so 

$

a^{13} = (((a^2)^2)^2) \cdot a = a^{8}\cdot a^{4}\cdot a^1

$

. In Python, the built-in `pow(a, b, m)` uses this method (with some optimizations like Montgomery multiplication) to give the result efficiently even if 

$

b

$

 has hundreds of bits. This algorithm runs in logarithmic time because each squaring doubles the exponent and we handle each binary bit of the exponent with at most one multiply.

**Discrete Logarithms:** The discrete logarithm problem (DLP) is essentially the inverse of modular exponentiation. Given a finite group (like integers mod 

$

p

$

 under multiplication) of order 

$

n

$

, a generator 

$

g

$

, and an element 

$

h = g^x

$

, the DLP asks to find 

$

x

$

. This problem is believed to be hard in general (exponential time), and its assumed difficulty underpins cryptosystems like Diffie–Hellman and ECC. For a generic group of size 

$

n

$

, the best known algorithms (baby-step giant-step and Pollard’s rho for logs) run in roughly 

$

O(\sqrt{n})

$

 time, which is exponential in the bit-length of 

$

n

$

. Key algorithms:

* **Baby-Step Giant-Step:** This is a meet-in-the-middle algorithm by Daniel Shanks for solving 

$

g^x = h

$

. It precomputes 

$

g^{0}, g^{1}, ..., g^{m}

$

 (baby steps) where 

$

m \approx \sqrt{n}

$

, storing these in a hash table. Then it computes “giant steps” by successively multiplying 

$

h

$

 by 

$

g^{-m}

$

: i.e., checks 

$

h \cdot (g^{-m})^j

$

 for 

$

j=0,1,2,...

$

 against the table. When a match is found, we have 

$

g^{im} = h \cdot g^{-jm}

$

, leading to the solution 

$

x = im + j

$

. This uses 

$

O(\sqrt{n})

$

 time and space. For example, to solve 

$

g^x \equiv h \pmod{p}

$

 where 

$

p

$

 is \~64 bits (group size \~

$

p-1 \sim 2^{64}

$

), baby-step giant-step on the order of 

$

2^{32}

$

 operations, which is borderline feasible. The algorithm’s time and memory are both 

$

O(\sqrt{n})

$

.

* **Pollard’s Rho for Discrete Log (Pollard’s Rho DL):** A probabilistic algorithm analogous to Pollard’s rho factorization, which uses random walks in the group to find a collision that yields the discrete log. It also runs in expected 

$

O(\sqrt{n})

$

 time but with much less memory than baby-step giant-step (constant memory). In practice, Pollard’s Rho DL can solve DLP in groups up to around 

$

2^{60}

$

 or 

$

2^{70}

$

 operations – still huge, but feasible for smaller subgroups or when combined with parallelism. (For instance, breaking a 60-bit elliptic curve subgroup might be done with Pollard rho on many machines in parallel.)

Given the large complexity, cryptographic parameters are chosen so that 

$

\sqrt{n}

$

 is infeasible. For Diffie–Hellman mod 

$

p

$

, 

$

p

$

 is chosen around 

$

2^{2048}

$

 so that 

$

\sqrt{p} \approx 2^{1024}

$

 steps are out of reach. For elliptic curves, group order around 

$

2^{256}

$

 is used, since 

$

\sqrt{2^{256}} = 2^{128}

$

 operations is believed infeasible.

## 3. Advanced Techniques

* **Chinese Remainder Theorem (CRT) Application:** Beyond its theoretical guarantee, CRT provides an algorithm for solving systems of congruences. In practice, CRT is used to speed up computations. For example, in RSA decryption, one can use CRT with moduli 

$

p

$

 and 

$

q

$

 (the prime factors of 

$

N

$

) to decrypt much faster by working mod 

$

p

$

 and mod 

$

q

$

 separately and then combining results. The standard CRT construction finds the solution 

$

x

$

 as 

$

x = \sum_{i=1}^k a_i M_i N_i \pmod{N}

$

, where 

$

M_i = N/n_i

$

 and 

$

N_i

$

 is the modular inverse of 

$

M_i

$

 mod 

$

n_i

$

. This gives the unique solution in 

$

\[0,N)

$

. In coding challenges, CRT often appears in problems about finding an 

$

x

$

 that satisfies several remainder conditions (like the classic “find a number that leaves remainders r1, r2, r3 when divided by n1, n2, n3”).

* **Euler’s Totient Function & Computing 

$

\phi(n)

$

:** Euler’s totient 

$

\phi(n)

$

 is multiplicative and for prime powers 

$

p^k

$

, 

$

\phi(p^k) = p^k - p^{k-1} = p^k(1 - \frac{1}{p})

$

. Thus for general 

$

n = \prod p_i^{e_i}

$

, 

$

\displaystyle \phi(n) = n \prod_{p|n}(1 - \frac{1}{p})

$

. To compute 

$

\phi(n)

$

 efficiently, one needs the prime factorization of 

$

n

$

. If 

$

n

$

 is up to say 

$

10^6

$

, one can sieve primes and compute 

$

\phi

$

 for all numbers 

$

1\ldots n

$

 in 

$

O(n \log\log n)

$

 by a sieve-like process (initializing 

$

\phi(i)=i

$

 and for each prime 

$

p

$

 marking 

$

\phi(j*p) = \phi(j*p)/p*(p-1)

$

). For a single large 

$

n

$

, factoring is the hard part – once factors are known, 

$

\phi(n)

$

 is straightforward to compute. Computing 

$

\phi(n)

$

 without factoring 

$

n

$

 is as hard as factoring (no known substantially faster way), which aligns with RSA’s security: an attacker cannot derive 

$

\phi(N)

$

 (and thus the private key) without factoring 

$

N

$

. In competitive programming, if you need 

$

\phi(n)

$

 for many 

$

n

$

, a pre-sieved table or using the formula with precomputed primes is effective. If you need it for one large 

$

n

$

, you likely will attempt a factorization approach.

* **Modular Multiplicative Inverse:** To find 

$

x = a^{-1} \pmod{m}

$

 (with 

$

\gcd(a,m)=1

$

), two common methods exist:

  1. Use the Extended Euclidean Algorithm to solve 

$

ax + my = 1

$

. The coefficient 

$

x

$

 (mod 

$

m

$

) will be the inverse. This runs in 

$

O(\log m)

$

 and works for any mod 

$

m

$

 (not necessarily prime).
  2. If 

$

m

$

 is prime, use Fermat’s little theorem: 

$

a^{m-1} \equiv 1 \pmod m

$

, so multiply both sides by 

$

a^{-1}

$

 to get 

$

a^{m-2} \equiv a^{-1} \pmod m

$

. Thus 

$

a^{-1} = a^{m-2} \bmod m

$

. Computing that with fast exponentiation is 

$

O(\log m)

$

. This method is often convenient when we know 

$

m

$

 is prime (e.g., mod 

$

10^9+7

$

 in many programming contests).

  Both methods are efficient. The extended Euclid approach is more universal. In implementation, one must be careful with negative results (ensure the inverse is positive modulo 

$

m

$

). Also, note that inverses may not exist if 

$

a

$

 and 

$

m

$

 are not coprime – a common mistake is attempting to invert a number modulo a non-prime where it isn’t invertible. Always check 

$

\gcd(a,m)=1

$

 (if not, either no solution or infinitely many if 

$

\gcd(a,m)

$

 also divides 1, which can’t happen except the trivial case).

* **Solving Linear Congruences:** A congruence 

$

a x \equiv b \pmod m

$

 can be solved by reducing to a simpler one if 

$

\gcd(a,m)=d

$

. If 

$

d \nmid b

$

, no solution exists. If 

$

d \mid b

$

, then we can divide the congruence through by 

$

d

$

: letting 

$

a' = a/d

$

, 

$

b' = b/d

$

, 

$

m' = m/d

$

, we have 

$

a' x \equiv b' \pmod{m'}

$

 with 

$

\gcd(a',m')=1

$

. Now one can find the unique solution mod 

$

m'

$

: 

$

x \equiv b' (a'^{-1} \bmod m') \pmod{m'}

$

. There will be 

$

d

$

 distinct solutions mod 

$

m

$

 (all congruent mod 

$

m'

$

). For example, solve 

$

6x \equiv 4 \pmod{10}

$

. Here 

$

\gcd(6,10)=2

$

 which divides 4, so divide through by 2: 

$

3x \equiv 2 \pmod5

$

. The inverse of 3 mod 5 is 2 (since 

$

3*2=6\equiv1\pmod5

$

), so 

$

x \equiv 2*2 = 4 \pmod5

$

. Lifting back to mod 10, the solutions are 

$

x \equiv 4 \pmod5

$

, i.e. 

$

x \in {4,9} \pmod{10}

$

, which indeed satisfy the original congruence.

* **Solving Linear Diophantine Equations:** Equations of the form 

$

ax + by = c

$

 (where 

$

a,b,c

$

 are integers) either have no solution or infinitely many. A solution exists iff 

$

\gcd(a,b) \mid c

$

. If it exists, extended Euclid can find one particular solution 

$

(x_0,y_0)

$

 satisfying 

$

ax_0 + by_0 = d = \gcd(a,b)

$

. Multiply that solution by 

$

c/d

$

 to get a solution for 

$

c

$

. The general solution is then 

$

x = x_0 \frac{c}{d} + \frac{b}{d}t

$

, 

$

y = y_0 \frac{c}{d} - \frac{a}{d}t

$

 for arbitrary integer 

$

t

$

. For instance, 

$

6x+15y=9

$

 has 

$

\gcd(6,15)=3

$

 dividing 9, so one solution is (via extended Euclid) 

$

6*(-2) + 15*1 = 3

$

, multiply by 3 to get 

$

6*(-6) + 15*3 = 9

$

, so 

$

(x_0,y_0)=(-6,3)

$

. General solution: 

$

x=-6 + 5t

$

, 

$

y=3 - 2t

$

. In computational tasks, you usually either need just one solution (which extended Euclid gives directly), or to parametrize solutions in a form.

## 4. Cryptographic Applications

Modern cryptography heavily leverages number theory. Three pillars to highlight are RSA, Diffie–Hellman, and Elliptic Curve Cryptography:

### RSA (Rivest–Shamir–Adleman Public-Key Encryption)

**Key generation:** Choose two large random primes 

$

p

$

 and 

$

q

$

 (typically each 1024 bits or more). Compute 

$

N = p \cdot q

$

 and 

$

\phi(N) = (p-1)(q-1)

$

. Choose an encryption exponent 

$

e

$

 (by convention, a prime like 65537 is often used) such that 

$

\gcd(e,\phi(N))=1

$

. Then compute the corresponding decryption exponent 

$

d

$

 as the modular inverse of 

$

e

$

 modulo 

$

\phi(N)

$

. Now 

$

(N,e)

$

 is the **public key** and 

$

(N,d)

$

 is the **private key**.

**Encryption:** To encrypt a message 

$

M

$

 (represented as an integer < 

$

N

$

), compute ciphertext 

$

C \equiv M^e \pmod N

$

.

**Decryption:** Compute 

$

M \equiv C^d \pmod N

$

. This works because 

$

M^{ed} \equiv M \pmod N

$

 by Euler’s theorem (since 

$

ed \equiv 1 \pmod{\phi(N)}

$

 and 

$

M^{\phi(N)}\equiv 1 \pmod N

$

 for 

$

M

$

 coprime to 

$

N

$

). In practice, proper padding and formatting are applied to 

$

M

$

 before exponentiation to ensure security against chosen ciphertext attacks, but at its core RSA is just modular exponentiation.

RSA’s security rests on the difficulty of factoring 

$

N

$

. The public key (

$

N,e

$

) reveals 

$

N

$

 (which an attacker knows) but factoring 

$

N

$

 to recover 

$

p,q

$

 (and thus 

$

\phi(N)

$

 and 

$

d

$

) is believed to be intractable for large 

$

N

$

 with current technology. Using known factoring algorithms, 2048-bit 

$

N

$

 is currently out of reach. RSA operations (encryption, decryption, signing) involve exponentiating large numbers mod 

$

N

$

, but with optimizations like CRT for decryption and exponentiation by squaring, they are efficient enough for many applications.

**Signature:** RSA can also be used for digital signatures: to sign a message 

$

M

$

, compute 

$

S \equiv M^d \pmod N

$

 (using the private exponent). Anyone can verify by checking that 

$

S^e \equiv M \pmod N

$

 using the public key. Again, actual implementations use hashes and padding (e.g., PSS) to ensure security.

### Diffie–Hellman Key Exchange

Diffie–Hellman (DH) is a protocol that allows two parties to establish a shared secret over an insecure channel without prior secrets. The classic DH works in the multiplicative group of integers mod 

$

p

$

 (a prime). If 

$

p

$

 is prime and 

$

g

$

 is a primitive root mod 

$

p

$

 (a generator of the multiplicative group 

$

\mathbb{Z}_p^*

$

), then:

* Alice and Bob publicly agree on 

$

(p,g)

$

. These can be global parameters.
* Alice picks a random secret integer 

$

a

$

 and sends Bob 

$

A = g^a \bmod p

$

.
* Bob picks a random secret integer 

$

b

$

 and sends Alice 

$

B = g^b \bmod p

$

.
* Alice computes the shared secret as 

$

K = B^a \bmod p

$

.
* Bob computes the shared secret as 

$

K = A^b \bmod p

$

.

Both obtain the same 

$

K = g^{ab} \bmod p

$

, which serves as the shared secret key (e.g., for symmetric encryption of subsequent communication). An eavesdropper sees 

$

p

$

, 

$

g

$

, 

$

A = g^a

$

, and 

$

B = g^b

$

 but not 

$

a

$

 or 

$

b

$

. Breaking the scheme requires solving for 

$

a

$

 or 

$

b

$

 (the discrete log problem). With 

$

p

$

 large (2048-bit), no efficient algorithm is known for discrete logs, so the scheme is secure. Diffie–Hellman is widely used (e.g., in TLS for ephemeral key exchange denoted as DHE). One must be careful to use a prime 

$

p

$

 where 

$

p-1

$

 has a large prime factor (to avoid small subgroup attacks). Variants like ECDH (Diffie–Hellman on elliptic curve groups) operate similarly but in an elliptic curve group.

### Elliptic Curve Cryptography (ECC)

ECC is a modern approach that provides similar functionality to RSA/DH but with smaller keys. An elliptic curve over a prime field 

$

\mathbb{F}_p

$

 is given by an equation 

$

y^2 = x^3 + ax + b

$

 (with certain non-singularity conditions). The **points** 

$

(x,y)

$

 satisfying this form a finite abelian group under a chord-and-tangent addition rule. In elliptic curve cryptography, we choose a curve and a base point 

$

G

$

 on it of large prime order 

$

n

$

. The security comes from the **Elliptic Curve Discrete Log Problem (ECDLP)**: given points 

$

G

$

 and 

$

Q = k \cdot G

$

 on the curve, find 

$

k

$

. This is believed to be hard – analogous to the difficulty of DLP in 

$

\mathbb{Z}_p^*

$

, but seemingly harder per bit. The fastest known algorithms for ECDLP (Pollard’s rho) run in 

$

O(\sqrt{n})

$

, which for 

$

n \sim 2^{256}

$

 is 

$

2^{128}

$

 steps, far beyond reach.

**Key exchange (ECDH):** If Alice picks secret 

$

a

$

 and Bob 

$

b

$

, and they exchange 

$

A = aG

$

, 

$

B = bG

$

, then the shared secret is 

$

S = aB = bA = abG

$

, just like Diffie–Hellman. An eavesdropper sees 

$

G

$

, 

$

A

$

, 

$

B

$

 but not 

$

a

$

 or 

$

b

$

, and must solve ECDLP to find the secret.

**Signatures (ECDSA):** ECC also provides efficient signature algorithms. ECDSA (Elliptic Curve Digital Signature Algorithm) is analogous to DSA but on elliptic curves, widely used in practice (for instance, Bitcoin uses ECDSA on the secp256k1 curve for transaction signatures).

**Advantages:** ECC offers **equivalent security with much smaller keys**. For example, a 256-bit ECC key is comparable to a 3072-bit RSA key in strength. This means faster computations and lower storage/transmission costs.

Smaller key sizes make ECC attractive for constrained environments (smart cards, IoT devices). As an example, Bitcoin’s security relies on the secp256k1 curve, where keys are 256-bit and the difficulty of ECDLP protects the funds.

ECC requires careful implementation (to avoid side-channel leaks, ensure no “weak” curves or parameters). The standardized curves (like NIST P-256, curve25519, secp256k1) are designed with large group order and no known structure that eases ECDLP. Given the same level of security, ECC operations are generally faster than RSA (especially for key generation and signing) because of the smaller operand sizes, though encryption/decryption might be comparable or slightly slower than RSA’s, depending on implementation.

## 5. Competitive Programming and Optimization

In programming contests, number theory problems are common, and efficient implementation is key. Some tips and considerations:

* **Precomputation:** If multiple queries are expected (e.g., many GCD computations, many primality checks, etc.), precompute where possible. For example, if asked to answer many “is this number prime?” queries for numbers up to 

$

10^6

$

 or 

$

10^7

$

, it’s far more efficient to sieve once and answer in 

$

O(1)

$

 per query than to test each number individually. Similarly, precompute factorials or inverses under mod 

$

p

$

 for combinatorial computations rather than recomputing from scratch.

* **Choosing the Right Algorithm:** Always consider input constraints. If 

$

n \le 10^{12}

$

 and you need to factor it, trial division up to 

$

10^6

$

 (the square root of 

$

10^{12}

$

) might be borderline but Pollard’s Rho would be fast. If 

$

n \le 10^6

$

 and you need 

$

\phi(n)

$

 for many values, sieve all 

$

\phi

$

 values in 

$

O(n \log\log n)

$

. If you need the 

$

k

$

-th prime or something involving distribution of primes up to large 

$

N

$

, the sieve or perhaps a segmented sieve is the way. For checking primality of a single large (say 18-digit or 19-digit) number, Miller–Rabin with a few bases is extremely fast and simpler to implement than a full sieve to that range. Understanding constraint-driven decisions is crucial in contests.

* **Use of Built-in Functions:** Many languages offer built-ins that are highly optimized in C or assembly. For instance, in Python, `math.gcd(a,b)` is very fast (in C). Python’s `pow(a, b, m)` does fast modular exponentiation (with an added bonus of using efficient algorithms for large 

$

b

$

). These are often more reliable and faster than a naïve Python reimplementation. Similarly, Python’s big integers use efficient algorithms (Karatsuba and FFT multiplication) so they can handle operations on 1000-bit numbers; you just need to be mindful of algorithmic complexity (don’t do 

$

O(n)

$

 loops with n \~ 10^9 in Python – that’s too slow in pure Python, even if the big-integer arithmetic can handle the magnitude).

* **Avoiding Pitfalls with Mod Arithmetic:** When implementing, be careful with negative mods (in some languages like C++, -1 % m might be -1, not m-1 as mathematicians expect). Ensure to add mod and adjust to positive if needed. Watch out for overflow in languages like C++ when multiplying large numbers before mod (use 128-bit builtins or languages like Python/Java that handle big ints).

In competitive programming, if using C++ for example, one might implement a custom 128-bit multiplication or use builtin `__int128` to safely multiply two 64-bit numbers mod a 64-bit modulus (for Miller-Rabin on 64-bit range).

* **Probabilistic Algorithms in Contests:** Generally, it’s safe to use Miller-Rabin for primality testing up to 

$

2^{64}

$

 (with a fixed small set of bases that guarantee correctness) or as a probabilistic test for larger numbers (with a negligible chance of error). Similarly, Pollard’s Rho is often used as a probabilistic factorizer. Contest problems typically are designed so that these randomized approaches succeed quickly (and the probability of failing is astronomically low).

Just ensure to implement a check for trivial factors (like even numbers) to avoid getting stuck in a worst-case for Pollard’s Rho.

* **Memory and Precision Considerations:** For extremely large numbers (hundreds of digits), Python can handle them but slowly; C++ with GMP or Python with specialized libraries (like `gmpy2`) can be faster. However, if the problem expects operations on such huge numbers, often the nature of the problem is theoretical or involves pattern finding rather than raw computation. Know your language’s limits: Python big ints can multiply 10,000-digit numbers in milliseconds, but multiplying two million-digit numbers might take noticeable time.

In contests, you rarely need to operate on numbers that large unless it’s a logic puzzle.

* **Common Bugs:** Off-by-one errors in loops (especially in sieve implementations – remember to mark from 

$

p^2

$

, or handle edge cases like 0 and 1 which are not prime). Forgetting to reset data between test cases in interactive problems. Using `%` in a way that can overflow (in C, `(a*b) % m` can overflow before the mod; one should use a 128-bit intermediate or modular multiplication routines).

Not accounting for negative exponents or modulo inverses when they might appear (e.g., using Fermat’s little theorem for inverse when modulus is not prime is a mistake). Another common pitfall: assuming a number fits in 32 bits when it might not – e.g. factorial of 20 fits in 64-bit but factorial of 21 does not, if one is not careful.

* **Optimization Tricks:** Use bit operations where possible for speed (some languages, e.g., using `__builtin_ctz` to count factors of 2, etc.). For multiple GCD computations, note that 

$

\gcd

$

 is associative so you can do it in a reduce or pairwise fashion. If computing many inverses mod 

$

p

$

, one can compute them all in linear time using the fact that 

$

inv\[i] = -(p//i) * inv\[p \bmod i] \bmod p

$

 for prime 

$

p

$

 – a useful formula to populate an inverse table in O(n). Use fast I/O for large output (printing 100k primes can be slow if done naively in some languages).

In summary, match your approach to the problem size. Competitive programming problems are often crafted so that a specific known 

$

O(n)

$

 or 

$

O(n \log\log n)

$

 or 

$

O(\sqrt{n})

$

 solution is needed – recognizing which algorithm fits the input limits is half the challenge.

## 6. Case Studies

**Cryptocurrency (Blockchain):** Number theory enables cryptocurrencies. Bitcoin, for example, uses **ECDSA** (elliptic curve digital signatures) over the secp256k1 curve. The security of Bitcoin addresses essentially relies on the difficulty of the elliptic curve discrete log problem – an address is (roughly) a hash of an ECDSA public key, and “sending” bitcoin requires producing a valid ECDSA signature with the corresponding private key.

The strength of secp256k1 (256-bit ECC) means that even with massive computing power, forging a signature or deriving a private key from a public key is not feasible. Additionally, in consensus algorithms like Proof-of-Work, while not directly number theory, miners repeatedly compute SHA-256 hashes (which involve bitwise arithmetic and modular additions extensively). Blockchain implementations also use big integers and mod arithmetic for various features (e.g., Ethereum’s RLP uses big ints, and some smart contract languages have mod operations, etc.).

Another aspect: **zero-knowledge proofs** (like zk-SNARKs used in Zcash) rely on advanced number theory over elliptic curve pairings and modular arithmetic in large prime fields.

**Coding Theory:** Error-correcting codes, which ensure data integrity over noisy channels, use finite field arithmetic (a branch of number theory). For instance, **Reed–Solomon codes** operate over 

$

\mathbb{F}*{q}

$

 (often 

$

q=2^8

$

 or 

$

2^{16}

$

) and rely on polynomial interpolation in that field. The mathematics of constructing a code that can correct 

$

e

$

 errors involves understanding polynomials over finite fields and their divisibility (BCH codes use the concept of generator polynomials, which are factors of 

$

x^n-1

$

 over 

$

\mathbb{F}*{q}

$

). While typical competitive programming might not delve into implementing Reed–Solomon from scratch, understanding that these codes are number theoretic can be useful. A related area is **cryptographic coding**: for example, the algebra behind CRC (Cyclic Redundancy Check) is polynomial arithmetic mod a binary polynomial.

**Algorithmic Challenges:** Many contest problems are essentially direct applications of number theory algorithms:

* **RSA-like problems:** Given 

$

p,q,e,d

$

 or some mix and asking to compute something. E.g., given 

$

p, q, e

$

 and a message, compute the ciphertext (just mod exponentiation), or given 

$

p, q, e, C

$

 compute 

$

M

$

 (requires computing 

$

d

$

 by extended Euclid on 

$

e

$

 and 

$

\phi(pq)

$

, then 

$

M = C^d \bmod pq

$

).
* **CRT problems:** A classic example: “Find the smallest 

$

x

$

 such that 

$

x \equiv a \pmod{n_1}

$

, 

$

x \equiv b \pmod{n_2}

$

” – directly solved by CRT. Some contest problems disguise this as a schedule or calendar problem (“when will these traffic lights all turn green simultaneously?”).
* **Primality and Factorization puzzles:** Project Euler problems often involve prime generation or testing (e.g., summing primes up to 2 million, or finding the 10001st prime). Others ask for the largest prime factor of a big number (Pollard Rho), or the number of divisors of a large number (factor and use the divisor formula).
* **Discrete log problems:** Rare in contests because generic DLP is hard. But sometimes a problem may restrict the modulus or structure (for example, compute the discrete log in 

$

\mathbb{Z}_p

$

 for small 

$

p

$

 or with additional hints). Or ask for something like “find an 

$

x

$

 such that 

$

a^x \equiv b \pmod{m}

$

” where 

$

m

$

 might be smooth or something, making it easier.
* **Combinatorial number theory:** Many problems involve computing binomial coefficients or Catalan numbers modulo a prime. Using inverses and factorial precomputation (and Lucas’s Theorem for factorial mod primes) is a typical approach.
* **Game theory with number theory:** e.g., playing a game where moves correspond to removing divisors – analyzing such games might involve properties of numbers (like if a position’s moves correspond to proper divisors, primes might be winning positions, etc.).

A concrete case: **2019 ICPC World Finals “C” problem** (an example, hypothetical) might involve analyzing a fraction’s decimal representation period, which requires computing the order of 10 modulo a number (number theory: the length of repetend of 1/n is the order of 10 mod n, related to 

$

\phi(n)

$

 and factors 2,5). Solving it needs understanding of factors and Euler’s totient.

**Real-world cryptography vs. contests:** In real systems, primes are hundreds of digits and special algorithms are needed. In contests, primes and numbers are smaller but the range of techniques is the same. Learning number theory algorithms in a contest setting often mirrors learning what’s needed to implement real cryptosystems (just with smaller parameters).

## 7. Best Practices and Common Mistakes

* **Validate Inputs and Mathematical Preconditions:** A common mistake is assuming an inverse or solution exists without checking conditions. For example, trying to compute 

$

a^{-1} \pmod m

$

 via Fermat when 

$

m

$

 is not prime, or when 

$

\gcd(a,m)\neq1

$

. Always validate that prerequisites (like coprimality) are met, and handle cases like 

$

\gcd(a,m)\neq1

$

 gracefully (no inverse or infinite solutions for congruences).

* **Use Safe Arithmetic Operations:** In low-level languages, beware of overflow. When implementing Miller–Rabin in C/C++ for 64-bit numbers, use 128-bit intermediate for multiplication (or built-in functions) to avoid overflow before taking mod. Another trick: Python handles big ints but C++ does not, so avoid using normal `int` for values that can grow beyond limits.

Also, watch out for shifting or multiplying large indices (like computing a power of 2 as `1<<k` will overflow if k is large in typical int).

* **Optimize Inner Loops:** If you have a triple nested loop and one of them can be eliminated by a formula or a known number theory result, do it. For instance, summing over all divisors of numbers from 1 to N can be optimized by counting how many numbers have a given divisor. In code, prefer vectorized operations and eliminate redundant calculations (cache results like prime checks or factorials instead of recomputing).

* **Leverage Symmetries:** If computing something like 

$

\sum_{i=1}^N \gcd(i, N)

$

, one can use the fact that 

$

\gcd(i,N)

$

 will repeat in patterns. Breaking a sum by divisor structure or using Euler’s totient function can reduce complexity.

* **Test on Edge Cases:** For GCD and LCM, test small values (0 or 1) since gcd

$

(0,b)=b

$

 and lcm

$

(0,b)=0

$

 (sometimes defined that way). For primality, test 

$

N=1

$

 (not prime), 

$

N=2

$

 (prime, small edge case), 

$

N

$

 even, 

$

N

$

 a prime power, 

$

N

$

 a Carmichael number (make sure Miller–Rabin isn’t using only a single base that could be a liar for it). For CRT, test cases where moduli are not coprime to ensure your code handles or rejects them appropriately. For modular inverse, test 

$

a=0

$

 or 

$

a

$

 not coprime to 

$

m

$

.

* **Avoid Endless Loops in Randomized Algorithms:** If using Pollard’s Rho, include a fail-safe (e.g., if a sequence doesn’t find a factor in some number of steps, restart with a different polynomial or constant). In rare cases, a poor choice of 

$

f(x)

$

 in Pollard’s Rho might cycle without finding a factor (e.g., if 

$

f(x)

$

 is such that 

$

x_i

$

 never changes mod some factor). A random restart fixes it.

* **Know Common Prime Lists and Witnesses:** If implementing Miller–Rabin deterministically for 32-bit or 64-bit integers, remember known small sets of bases: e.g., for 32-bit, testing 

$

a=2,7,61

$

 suffices. For 64-bit, there are known minimal sets (often 6–7 bases like 2,325,9375,28178,450775,9780504,1795265022 for 64-bit range). This avoids any probability at all and guarantees correctness for those ranges.

* **Be Mindful of Time for Big Results:** If a problem asks for a result like a huge factorial modulo a number, ensure to use efficient modular arithmetic rather than computing the huge number outright. Always reduce mod 

$

m

$

 as you go to keep numbers small. Similarly, if outputting a huge number (like 1000-digit prime), Python can handle big ints but converting to string is also heavy – in contests it’s acceptable, but just remember to only compute what’s needed.

* **Precision in Languages:** In languages like Python, all int are arbitrary precision (big int). In C/C++, use appropriate data types (e.g., `long long` for up to 9e18, `__int128` for up to 1.7e38 which is enough for 64-bit multiplications). For floating point (if used in some approximation or probability), be careful – but in number theory, floating is rarely used except maybe in using Math library functions like `log` or `sqrt` for initial estimates.

* **Algorithm Selection Strategy:** For each number theory task:

  * If it’s prime-related and 

$

N

$

 is large: primality test vs. sieve vs. factorization? Decide based on 

$

N

$

 size and number of queries.
  * If it’s factorization and 

$

N

$

 is \~12-18 digits: Pollard Rho (maybe combined with trial division for small factors).
  * If it’s many queries of small range: sieve or precompute mu/phi etc.
  * If it involves modulo arithmetic with primes: utilize Fermat’s little theorem for inverses, maybe NTT (Number Theoretic Transform) if doing polynomial convolution mod a prime, etc.

* **Keep Code Clean and Well-Commented:** Especially for complex math like implementing CRT or Pollard’s Rho, comment the steps. This not only helps you avoid mistakes but is crucial if you need to debug under contest pressure. For example, explicitly state “// Now compute the solution modulo N by summing a_i * M_i * inv(M_i mod n_i)” in CRT implementation – a misplaced multiplication or addition could break the logic.

By adhering to these practices, you minimize the chance of error in your number theory implementations and ensure they run optimally. Remember that a solid understanding of the theory behind the algorithms will guide you in writing correct and efficient code.

## 8. Implementation and Code Walkthrough

We now present Python implementations of key number theoretic algorithms, with comments to explain their workings. The code is written for clarity and educational value, focusing on practical usage in scripts or contests.

#### Sieve of Eratosthenes (Prime Generation)

This function returns a list of primes up to `n`. We use a boolean array to mark composites. Complexity: 

$

O(n \log\log n)

$

.

```python
def sieve_primes(n):
    """Return a list of all prime numbers <= n."""
    is_prime = [True] * (n+1)
    is_prime[0:2] = [False, False]  # 0 and 1 are not prime
    p = 2
    while p * p <= n:
        if is_prime[p]:
            # Mark multiples of p starting from p*p
            for multiple in range(p*p, n+1, p):
                is_prime[multiple] = False
        p += 1
    # Gather primes
    return [i for i, prime in enumerate(is_prime) if prime]

# Example usage:
primes_up_to_50 = sieve_primes(50)
print(primes_up_to_50)  # [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
```

*Explanation:* We start marking from 

$

p^2

$

 because all smaller non-prime multiples of 

$

p

$

 (like 

$

2p,3p,\dots,(p-1)p

$

) would have been marked by smaller primes. The inner loop uses a step of 

$

p

$

 to mark `False`. After sieving, we collect all indices still marked `True`. (In a contest, we might not actually build the list but rather use the boolean array directly for primality queries.)

#### Miller-Rabin Primality Test

A deterministic Miller-Rabin for 64-bit integers using known bases, or a probabilistic version for larger integers. Here we implement a version that works well for typical 32/64-bit ranges (deterministically).

```python
import math

def is_probable_prime(n):
    """Miller-Rabin primality test for 32-bit/64-bit integers."""
    if n < 2:
        return False
    # Small primes check
    small_primes = [2,3,5,7,11,13,17,19,23,29]
    for p in small_primes:
        if n % p == 0:
            return n == p  # if n is one of these primes, it's prime; otherwise not
    # Write n-1 as d*2^s
    s = 0
    d = n-1
    while d % 2 == 0:
        s += 1
        d //= 2
    # Test a few bases
    # For 64-bit determinism, we could use a specific set of bases. Here we use a generic approach with some random bases.
    test_bases = [2, 325, 9375, 28178, 450775, 9780504, 1795265022]  # these bases work for testing up to 2^64
    for a in test_bases:
        if a % n == 0:
            return True
        x = pow(a, d, n)
        if x == 1 or x == n-1:
            continue
        # Square x repeatedly
        for _ in range(s-1):
            x = (x * x) % n
            if x == n-1:
                break
        else:
            return False
    return True

# Example usage:
print(is_probable_prime(97))   # True (97 is prime)
print(is_probable_prime(100))  # False
```

*Explanation:* We first handle trivial cases (if 

$

n<2

$

 or small primes). Then we express 

$

n-1 = 2^s \cdot d

$

 with 

$

d

$

 odd. We choose a set of test bases (carefully chosen to cover the 64-bit range). For each base 

$

a

$

, we compute 

$

x = a^d \bmod n

$

. If 

$

x

$

 is 1 or 

$

n-1

$

, this base passes (it either shows 

$

a^d \equiv 1

$

 or one of the later squared values will hit 

$

-1

$

). Otherwise, we square 

$

x

$

 up to 

$

s-1

$

 times (since we already have one exponent 

$

d

$

 and need to check 

$

d\cdot2^{s-1}

$

) to see if we get 

$

n-1

$

. If none of these are 

$

n-1

$

, then 

$

a

$

 is a witness that 

$

n

$

 is composite, so we return False. If all bases pass, we return True (likely prime).

The chosen bases in `test_bases` ensure correctness for 

$

n < 2^{64}

$

 (this is a known result: testing these specific bases is sufficient for 64-bit range). For larger 

$

n

$

, Miller-Rabin is still accurate with a handful of random bases (the error probability 

$

<4^{-k}

$

 for k bases).

#### Extended Euclidean Algorithm (GCD and Inverse)

We implement the extended GCD to return 

$

(g, x, y)

$

 such that 

$

ax + by = g = \gcd(a,b)

$

. Additionally, we show using it to find a modular inverse.

```python
def extended_gcd(a, b):
    """Return (g, x, y) such that a*x + b*y = g = gcd(a, b)."""
    if b == 0:
        return (a, 1, 0)
    else:
        g, x1, y1 = extended_gcd(b, a % b)
        # Back-substitute to get x, y
        # from: b*x1 + (a % b)*y1 = g, where a % b = a - floor(a/b)*b
        # => b*x1 + (a - floor(a/b)*b)*y1 = g
        # => a*y1 + b*(x1 - floor(a/b)*y1) = g
        x = y1
        y = x1 - (a // b) * y1
        return (g, x, y)

def mod_inverse(a, m):
    """Return the modular inverse of a mod m, if it exists."""
    g, x, y = extended_gcd(a, m)
    if g != 1:
        raise ValueError("Inverse does not exist since gcd(a,m) != 1")
    else:
        return x % m

# Example usage:
g, x, y = extended_gcd(30, 18)
print(g, x, y)  # gcd(30,18)=6, and 6 = 30*x + 18*y for some x,y
inv = mod_inverse(3, 11)
print(inv)      # 4, since 3*4 % 11 = 1
```

*Explanation:* The `extended_gcd` function uses recursion: 

$

\gcd(a,b) = \gcd(b, a \bmod b)

$

, and when it unravels, it computes the coefficients. In the recursive step, we find 

$

x1,y1

$

 for 

$

\gcd(b, a \bmod b)

$

, then update them to 

$

(x,y)

$

 for 

$

\gcd(a,b)

$

 using the relationship 

$

a \bmod b = a - \lfloor a/b\rfloor \cdot b

$

. The modular inverse function simply calls `extended_gcd(a,m)`; if the gcd is 1, it returns 

$

x \bmod m

$

 (the coefficient for 

$

a

$

). In the example, 

$

\gcd(30,18)=6

$

 and the output might be `6 1 -1` meaning 

$

30*1 + 18*(-1) = 12

$

 (if we got a different combination, that’s fine as long as it satisfies the equation). For the inverse, `mod_inverse(3,11)` returns 4 because 

$

3*4 = 12 \equiv 1 \pmod{11}

$

.

#### Fast Modular Exponentiation

We demonstrate a simple recursive or iterative method to compute 

$

a^b \bmod m

$

. Python’s built-in `pow` does this, but implementing it helps understanding.

```python
def mod_exp(a, b, m):
    """Compute a^b mod m efficiently."""
    result = 1
    base = a % m
    exp = b
    while exp > 0:
        if exp & 1:         # if exponent is odd
            result = (result * base) % m
        base = (base * base) % m
        exp >>= 1           # divide exponent by 2
    return result

# Example usage:
print(mod_exp(5, 117, 19))   # Should compute 5^117 mod 19
print(pow(5, 117, 19))       # Using Python's built-in for comparison
```

*Explanation:* This uses the binary exponentiation algorithm. It iteratively squares the base and halves the exponent, multiplying the result whenever a binary 1 is encountered in the exponent. The loop runs 

$

O(\log b)

$

 times. In the example, both outputs should match; 

$

5^{117} \bmod 19 = 1

$

 in fact (which demonstrates Fermat’s little theorem since 19 is prime and 117 is a multiple of 18, i.e., 

$

5^{18} \equiv 1

$

 mod 19 so 

$

5^{117} = 5^{18*6+9} = (5^{18})^6 * 5^9 \equiv 1^6 * 5^9 = 5^9

$

; one could further reduce 

$

5^9 \mod 19

$

 to verify it equals 1).

#### Pollard’s Rho Factorization

A probabilistic algorithm to find a nontrivial factor of 

$

n

$

. We’ll implement the core function that returns a factor (not necessarily prime), and use it recursively to fully factorize.

```python
import random

def pollard_rho(n):
    """Return a random factor of n (not necessarily prime), or n if fails."""
    if n % 2 == 0:
        return 2
    # Choose random function: f(x) = x^2 + c mod n, with random c
    c = random.randrange(1, n)
    f = lambda x: (x*x + c) % n
    # Initial x, y
    x = random.randrange(2, n)
    y = x
    d = 1
    while d == 1:
        x = f(x)
        y = f(f(y))
        d = math.gcd(abs(x-y), n)
        if d == n:
            # Retry with a different constant c
            return pollard_rho(n)
    return d

def factorize(n):
    """Return the prime factorization of n as a dictionary {prime: exponent}."""
    if n == 1:
        return {}
    if is_probable_prime(n):
        return {n: 1}
    # Find a factor
    factor = pollard_rho(n)
    # Recur on factor and n/factor
    factors1 = factorize(factor)
    factors2 = factorize(n // factor)
    # Merge factor dictionaries
    for p, exp in factors2.items():
        factors1[p] = factors1.get(p, 0) + exp
    return factors1

# Example usage:
n =  2**4 * 3**2 * 17 * 19  # 16 * 9 * 17 * 19
n *= 23  # multiply by another prime
print(factorize(n))  # expect {2:4, 3:2, 17:1, 19:1, 23:1}
```

*Explanation:* `pollard_rho(n)` picks a random polynomial 

$

f(x) = x^2 + c

$

 mod 

$

n

$

 and uses Floyd’s cycle-finding: 

$

x

$

 moves one step at a time, 

$

y

$

 moves two steps (notice `y = f(f(y))`). It computes 

$

d = \gcd(|x-y|, n)

$

 at each step. The theory is that 

$

x

$

 and 

$

y

$

 will eventually repeat mod some factor of 

$

n

$

, causing their difference to be a multiple of that factor, hence 

$

\gcd(x-y, n)

$

 reveals the factor. If 

$

d

$

 becomes 

$

n

$

, the random choice was bad (the sequence got a cycle that didn’t reveal a factor), so we retry with a different random constant. The function returns a factor (which could be composite). Then `factorize(n)` uses recursion: if `n` is prime (we check by `is_probable_prime`), we’re done.

Otherwise, find a factor by Pollard’s Rho, factorize that factor and the cofactor recursively. We merge the prime factors found.

The example constructs 

$

n = 2^4 \cdot 3^2 \cdot 17 \cdot 19 \cdot 23

$

. The output should correctly list those primes with their exponents. Pollard’s Rho will find some factor (say it finds 17, then it factors the rest, etc.). Running this code multiple times should yield the correct factorization (randomness doesn’t affect correctness, only possibly which factor is found first).

This implementation is straightforward; in a production or contest setting, one might add a pre-check for small primes and ensure the random choices are good, but this suffices to demonstrate the concept.

Each of these code snippets demonstrates a critical algorithm or method described in this deep dive. They can be used as building blocks in solving more complex problems or integrated into larger programs. The Python code trades some constant-factor speed for clarity, but the algorithms themselves are efficient.

In a lower-level language, careful implementation of these would be needed for maximum performance, but Python often suffices for moderate input sizes, especially when using these efficient algorithms (e.g., Pollard’s Rho can factor 64-bit numbers in milliseconds, Miller-Rabin can test large primes very fast, etc.).

## 9. References and Further Reading

* **CP-Algorithms (e-maxx) – Number Theory Articles:** An excellent online resource covering many of these topics (GCD, modular arithmetic, primality tests, CRT, etc.) with code snippets and proofs. It’s geared towards competitive programming and is available in multiple languages.

* **GeeksforGeeks – Mathematical Algorithms:** A collection of tutorials on fundamental algorithms like GCD, Euler’s totient, modular inverse, Chinese Remainder Theorem, primality tests, etc., with examples. Good for a quick overview and basic implementations, though not always covering the most advanced aspects.

* **Handbook of Applied Cryptography** by Menezes, van Oorschot, Vanstone – *Chapter 2 (Math Background)* and *Chapter 3 (Number-Theoretic Problems)* provide a thorough theoretical foundation, including proofs of Fermat/Euler, discussion of discrete log and factoring problems. Later chapters cover RSA, Diffie–Hellman, ECC in depth. This book is available for free online and is a standard reference in cryptography.

* **“Prime Numbers: A Computational Perspective”** by Crandall & Pomerance – A comprehensive book focusing on computational aspects of prime testing and factoring. It covers everything from basic algorithms to advanced ones like QS and NFS, with practical considerations. For example, it discusses various primality proving algorithms and gives a deep dive into the Number Field Sieve.

The second edition (2005) is a bit dated on newest developments but still extremely relevant.

* **The Art of Computer Programming, Vol. 2: Seminumerical Algorithms** by Donald Knuth – Classic reference that includes chapters on random number generation and arithmetic algorithms. It covers the Euclidean algorithm, primality tests (including probabilistic ones), and some factoring methods.

Knuth’s discussion is more theoretical, but it’s illuminating (with fantastic historical context). Keep in mind it predates some modern algorithms (e.g., AKS primality test, NFS factoring) but covers the foundational ones and analysis.

* **Intro to Cryptography Courses (Coursera / edX):** For a practitioner, online courses like Stanford’s *Cryptography I* (Dan Boneh) explain RSA, Diffie–Hellman, ECC in a very accessible way (focusing on why they work and how they’re used). They don’t delve deeply into implementing big-number arithmetic, but they solidify understanding of the number theory assumptions behind security.

* **Project Euler Problems:** If you want hands-on practice with these algorithms, Project Euler has many problems that require efficient number theoretic computations. For instance, problems on prime summation, totient maximum, consecutive primes, large non-Mersenne primes, etc. Solving those will often require implementing a fast sieve, prime check, or using properties like CRT or combinatorial number theory tricks.

* **Academic Papers on Specific Algorithms:** If interested in the theoretical side or latest improvements, look up Miller’s original paper on his test (deterministic under GRH), Rabin’s paper making it probabilistic, the AKS primality test paper (2002), or Pollard’s original papers on rho algorithm (1975) and lambda algorithm for discrete logs (1978). These can usually be found online. They provide more insight into correctness and complexity analyses.

* **Open-Source Libraries:** Exploring the source of libraries can be educational. GMP (GNU Multiple Precision library) implements fast big integer arithmetic; OpenSSL implements bignum routines for RSA, Miller-Rabin, etc. Seeing how these production libraries handle the same problems (with optimizations in C) is instructive if you’re interested in writing highly optimized code beyond Python prototypes.

Each of these references and resources can deepen your understanding and ability to apply number theoretic algorithms. Whether your goal is winning programming contests or building secure systems, a firm grasp of these algorithms and when to use them is invaluable. Happy number crunching!
