---
layout: quiz
title: "Pipes-and-Filters Pattern Quiz"
questions:
  - q: "A team proposes adding data transformation logic into the pipe connecting two filters to lighten the filters’ workload. According to the pipes-and-filters pattern, what is the proper assignment of responsibilities?"
    options:
      - "Keep pipes only as conduits for data transport, and perform all transformations within filters."
      - "It’s acceptable for pipes to modify data format between filters if it reduces filter complexity."
      - "Pipes should implement any extra logic needed to connect mismatched outputs to inputs between filters."
      - "Combining pipe and filter responsibilities into one component simplifies the design and is recommended."
    answer: 0

  - q: "You are designing two pipelines: one for real-time sensor events (streaming) and another for daily log files (batch). What key difference in execution should you consider for a streaming pipeline versus a batch pipeline?"
    options:
      - "Streaming pipelines handle an unbounded, continuous data flow and require rate control (e.g., back-pressure), whereas batch pipelines process a finite set of data then terminate."
      - "Streaming pipelines must be implemented in a different programming language than batch pipelines."
      - "Batch pipelines cannot be run in parallel, while streaming pipelines inherently support parallel execution."
      - "There is no significant difference—streaming and batch pipelines operate the same way under the pipes-and-filters pattern."
    answer: 0

  - q: "In one project, an entire sequence of processing steps was implemented inside a single filter stage, rather than as separate filters. Which outcome is most likely with this “mega-filter” approach?"
    options:
      - "Greatly reduced modularity and reuse, since one filter now does too much instead of specialized tasks."
      - "Improved performance by removing the overhead of pipes between stages, with no real downsides."
      - "Simplified error isolation, because all logic is in one place and easier to catch exceptions."
      - "Full compliance with pipes-and-filters principles, as it still uses a filter (just a larger one)."
    answer: 0

  - q: "A certain filter was changed to maintain a running aggregate of data (becoming stateful), whereas other filters in the pipeline remain stateless. What is a trade-off of introducing this stateful filter stage?"
    options:
      - "It becomes harder to scale out or recover that stage, since its internal state must be managed and preserved."
      - "It will always run faster than stateless filters, due to state providing quick access to past computations."
      - "There is no impact on the system; the presence of state in one filter is completely inconsequential to scaling or fault tolerance."
      - "The filter automatically becomes idempotent by storing state, eliminating any chance of duplicate processing."
    answer: 0

  - q: "Midway through development, the team needs to add a new validation step between two existing filters in a pipeline. If the pipes-and-filters architecture has been followed properly, how difficult is it to insert this new filter?"
    options:
      - "Straightforward – you can plug in the new filter by connecting it with pipes, as long as data formats match, without affecting other stages."
      - "Impossible – you must redesign the entire pipeline from scratch to add another step in the middle."
      - "Feasible only if all filters share state or global context to accommodate the new step’s data."
      - "Only doable by stopping the pipeline and modifying the existing filters’ code to include the new logic."
    answer: 0

  - q: "One pipeline design uses a push model (upstream elements send data as fast as possible), while another uses a pull model (downstream elements request data when ready). The push-based pipeline sometimes overwhelms a slow filter with too many messages. What mechanism would best prevent the fast producer from flooding the slower consumer?"
    options:
      - "Implement a back-pressure strategy so that when consumers are slow, the upstream producers are signaled to slow down or pause sending."
      - "Continuously drop messages that the slow filter can’t keep up with, to keep the pipeline moving at all costs."
      - "Increase the size of the pipe’s buffer indefinitely to absorb the overflow without addressing the rate difference."
      - "Replace the slow filter with a faster one, as the pattern offers no way to handle rate mismatches between stages."
    answer: 0

  - q: "A malformed input record causes a filter to throw an exception every time it’s processed, blocking the pipeline as it repeatedly retries and fails on this “poison pill” message. What is a robust handling strategy for such a scenario?"
    options:
      - "Detect the bad record and isolate or discard it (e.g., send it to a dead-letter queue), allowing the pipeline to skip that item and continue processing the rest."
      - "Keep retrying the same record indefinitely in case it eventually processes without error, ensuring no data is lost."
      - "Shut down the entire pipeline when one message is unprocessable, to avoid any chance of incorrect results downstream."
      - "Remove the failing filter from the pipeline at runtime so the problematic record can pass through untransformed."
    answer: 0

  - q: "After deploying a pipeline, the team sees that throughput is low and latency is high. They have metrics for total end-to-end processing time but can’t identify which stage is the bottleneck. What should they do to pinpoint the slow filter?"
    options:
      - "Instrument the pipeline by measuring each filter’s performance (e.g., per-filter processing time, queue wait, throughput) to get visibility into where delays occur."
      - "Rely on the existing end-to-end metric and just guess which filter is likely slow based on code complexity."
      - "Add arbitrary log statements inside filters without measuring timing, then infer performance from the logs."
      - "Scale up all filters uniformly by adding more CPU, assuming the added resources will automatically fix the slow stage."
    answer: 0

  - q: "Filter Y in a pipeline expects data in a very specific format produced by Filter X. When Filter X’s output format changed slightly, Filter Y broke, causing a cascade of fixes. What pipeline anti-pattern does this situation represent?"
    options:
      - "Tight coupling between filters via a fragile data contract, making filters dependent on each other’s internal outputs."
      - "Proper encapsulation – filters are supposed to share detailed knowledge of each other’s data formats."
      - "Excessive back-pressure – the downstream filter is overly sensitive to the timing of upstream data."
      - "An idempotency issue – the lack of exactly-once processing caused the data format inconsistency."
    answer: 0

  - q: "One stage of a pipeline sends out email notifications for each input event. During a failure and restart, some events may be processed twice, raising the risk of duplicate emails being sent to users. How can the design prevent duplicates without losing emails?"
    options:
      - "Make the email-sending operation idempotent – for example, track which events have already triggered an email, so re-processing an event doesn’t send a second email."
      - "Switch the pipeline to an at-most-once processing model so that no event is ever processed more than once (accepting that some emails might never be sent)."
      - "Eliminate retries on failure for the email filter, so it never processes the same event twice (at the cost of dropping any event that fails once)."
      - "Always require a manual operator approval before sending emails, to catch and merge potential duplicates by human inspection."
    answer: 0

  - q: "In an image-processing pipeline, a filter that resizes images is significantly slower than other filters, creating a throughput bottleneck. The system needs to handle a high volume of images per second. What is the best way to scale this stage and alleviate the bottleneck?"
    options:
      - "Run multiple instances of the image-resizing filter in parallel (e.g., across multiple threads or servers), partitioning the workload so each instance handles a subset of images simultaneously."
      - "Upgrade the machine running the resizing filter to a very high-performance server, but still use a single filter instance for sequential processing."
      - "Merge the resizing filter with the adjacent filters into a single combined filter, removing the need for a pipe between them."
      - "Remove the image resizing step from the pipeline so that no filter is slower than the others."
    answer: 0

  - q: "A pipeline contains a sequence of ten very lightweight filters, each performing a simple transformation. Profiling shows that the pipeline spends more time handing off data between filters than doing actual work. How can you improve performance without changing the core logic of each filter?"
    options:
      - "Combine adjacent filters into a single processing unit to minimize inter-filter communication (an optimization known as operator fusion in streaming systems)."
      - "Increase buffer sizes between all filters so that data transfer costs are masked by buffering."
      - "Convert each filter into a microservice accessed via RPC to better isolate execution (even though this adds network calls)."
      - "Double the number of filters (split each step into two) so that each does even less work, reducing the workload per filter."
    answer: 0

  - q: "In a long-running stream processing pipeline, if one filter crashes mid-processing, the entire pipeline currently has to be restarted from the beginning of the data stream. What design improvement would allow the pipeline to resume work closer to where it left off after a failure?"
    options:
      - "Implement periodic checkpointing of each filter’s state and progress, so that on recovery the pipeline can replay from the last checkpoint rather than from scratch."
      - "Wrap the entire pipeline in a single distributed transaction, so either all filters complete for a set of messages or none do."
      - "Only run the pipeline in small batch windows so that on failure you only reprocess the last batch of data."
      - "Design every filter to be stateless, so that there is no state to recover and the pipeline can just continue (losing in-flight data on failure)."
    answer: 0

  - q: "A financial transactions pipeline requires exactly-once processing semantics – each transaction must be applied only once even if failures or retries occur. Which approach best achieves an end-to-end exactly-once guarantee in a pipes-and-filters architecture?"
    options:
      - "Use a combination of reliable, at-least-once message delivery with deduplication or idempotent processing in the filters, so that any retried messages do not produce duplicate effects (thus achieving an effective exactly-once outcome)."
      - "Rely on the network and messaging middleware to never duplicate or lose messages, assuming this will naturally yield exactly-once behavior."
      - "Use an at-least-once delivery strategy and simply accept that occasional duplicates are unavoidable, since exactly-once is impossible to achieve."
      - "Perform every transaction twice and compare results to ensure they were processed exactly one time (if a difference is found, adjust accordingly)."
    answer: 0

  - q: "The team refactors the pipeline so that each filter runs as a separate microservice on the network, with pipes implemented as messaging between services. What new challenges might this distributed pipes-and-filters implementation introduce compared to an in-process pipeline?"
    options:
      - "Increased communication latency and potential network failures between filters, since each pipe is now a remote connection rather than an in-memory transfer."
      - "The filters will no longer be able to function correctly because the pattern does not support distribution across multiple services."
      - "Back-pressure can no longer be enforced across the pipeline once the filters are in different processes or machines."
      - "Each filter must be rewritten in a different programming language to support remote communication in a distributed pipeline."
    answer: 0
---
