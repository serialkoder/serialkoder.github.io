---
layout: quiz
title: "Java Concurrency Patterns Quiz"
questions:
  - q: "Which method must be called on a Thread object to start a new thread of execution?"
    options:
      - "run()"
      - "start()"
      - "execute()"
      - "init()"
    answer: 1

  - q: "To create a task that can be executed by a thread, a class should implement which interface?"
    options:
      - "java.lang.Runnable"
      - "java.util.concurrent.Callable"
      - "java.lang.Thread"
      - "java.util.concurrent.Executor"
    answer: 0

  - q: "What is the effect of marking a method or block of code with the synchronized keyword?"
    options:
      - "Only one thread at a time can execute the synchronized code."
      - "The code will run faster by allowing multiple threads to execute it in parallel."
      - "It stops all other threads in the program while the code is running."
      - "It makes all variable accesses in that block atomic but still allows concurrent execution by multiple threads."
    answer: 0

  - q: "Marking a variable as volatile in Java ensures that:"
    options:
      - "Threads always see the most up-to-date value of the variable immediately."
      - "All operations on that variable are executed atomically."
      - "Only one thread can ever modify that variable."
      - "The variable’s value cannot be changed after initialization."
    answer: 0

  - q: "Which class provides convenient factory methods to create a thread pool in Java?"
    options:
      - "java.util.concurrent.Executors"
      - "java.lang.ThreadGroup"
      - "java.util.concurrent.Semaphore"
      - "java.util.concurrent.FutureTask"
    answer: 0

  - q: "If two threads increment the same counter variable concurrently without any synchronization, what is a likely outcome?"
    options:
      - "The final count may be less than expected due to some increments being lost."
      - "The program will fail to compile."
      - "The threads will automatically take turns, so the count will be correct."
      - "Each increment will definitely be reflected in the final result."
    answer: 0

  - q: "Which of the following classes is thread-safe for use by multiple threads without additional synchronization?"
    options:
      - "java.util.Vector"
      - "java.util.ArrayList"
      - "java.util.HashMap"
      - "java.lang.StringBuilder"
    answer: 0

  - q: "What is the term for a situation in which two threads are each waiting for the other to release a lock, so neither can proceed?"
    options:
      - "Deadlock"
      - "Race condition"
      - "Starvation"
      - "Livelock"
    answer: 0

  - q: "What is a key difference between the Runnable and Callable interfaces in Java?"
    options:
      - "A Callable can return a value and throw checked exceptions, whereas a Runnable cannot."
      - "A Runnable can be executed by only one thread, while a Callable can be executed by multiple threads."
      - "A Callable is intended for long-running tasks, whereas a Runnable is for short tasks."
      - "There is no difference; Callable is just another name for Runnable."
    answer: 0

  - q: "If a Java Future’s result is not yet available, what happens when you call Future.get()?"
    options:
      - "The get() call will block and wait until the result is available."
      - "It immediately returns null since the result isn’t ready."
      - "It throws an exception if the result is not prepared yet."
      - "The associated task is canceled automatically."
    answer: 0

  - q: "Which of the following is commonly used to implement the Producer-Consumer pattern safely in Java?"
    options:
      - "A BlockingQueue to hold produced elements for consumers."
      - "A regular Queue protected by synchronized methods without any wait/notify."
      - "Using Thread.sleep() in a loop to poll for new items."
      - "An AtomicInteger to count produced items and consumed items."
    answer: 0

  - q: "Which statement correctly describes a difference between Object.wait() and Thread.sleep()?"
    options:
      - "wait() releases the monitor lock it holds while waiting, whereas sleep() does not release any locks."
      - "sleep() releases any locks held by the thread, while wait() keeps the lock."
      - "Both wait() and sleep() release all locks held by the thread."
      - "Neither wait() nor sleep() release locks held by the thread."
    answer: 0

  - q: "Which approach ensures that increments on a shared integer counter are atomic (thread-safe)?"
    options:
      - "Use an AtomicInteger and call its incrementAndGet() (or getAndIncrement())."
      - "Declare the counter variable as volatile and use the ++ operator."
      - "Give each thread its own local counter variable instead of a shared one."
      - "No special action is needed; the ++ operation on an int is already atomic in Java."
    answer: 0

  - q: "What must a thread do before calling wait() on an object?"
    options:
      - "Acquire the object's monitor lock by synchronizing on the object."
      - "Call notify() on the same object to ensure it’s not already waiting."
      - "Declare the object as volatile to establish a happens-before relationship."
      - "Nothing special is required; any thread can call wait() at any time."
    answer: 0

  - q: "In a lazy-initialized singleton using the double-checked locking pattern, what is required to make it thread-safe in Java?"
    options:
      - "Declare the instance variable as volatile."
      - "Declare the singleton class as final."
      - "Synchronize the singleton’s constructor."
      - "No special action is needed; double-checked locking is always safe in Java now."
    answer: 0

  - q: "When using Java’s Fork/Join framework, which class should you extend to create a task that returns a result?"
    options:
      - "java.util.concurrent.RecursiveTask"
      - "java.util.concurrent.RecursiveAction"
      - "java.util.concurrent.ForkJoinPool"
      - "java.util.concurrent.FutureTask"
    answer: 0

  - q: "Which feature does ReentrantLock provide that the built-in synchronized mechanism does NOT?"
    options:
      - "The ability to attempt to acquire the lock without waiting (e.g., using tryLock())."
      - "Mutual exclusion to protect critical sections of code."
      - "Automatic release of the lock when execution leaves the guarded block."
      - "A guarantee that deadlocks cannot occur among threads."
    answer: 0

  - q: "When a thread catches an InterruptedException, what is the recommended practice?"
    options:
      - "Preserve the interrupt status (for example, call Thread.currentThread().interrupt()) or propagate the exception upwards."
      - "Ignore the exception so the thread can continue uninterrupted."
      - "Print an error to the console and suppress the exception."
      - "Immediately call System.exit(0) to terminate the program."
    answer: 0

  - q: "Which of the following statements about ConcurrentHashMap is true compared to Hashtable?"
    options:
      - "ConcurrentHashMap allows concurrent access by multiple threads without locking the entire map for each operation."
      - "ConcurrentHashMap permits null keys and values, whereas Hashtable does not."
      - "ConcurrentHashMap has been available since Java 1.4."
      - "ConcurrentHashMap uses a single lock for the whole map, just like Hashtable does."
    answer: 0

  - q: "Which concurrency utility is designed to have multiple threads wait for each other at a common barrier point before continuing?"
    options:
      - "CyclicBarrier"
      - "CountDownLatch"
      - "Semaphore"
      - "ScheduledExecutorService"
    answer: 0
---
