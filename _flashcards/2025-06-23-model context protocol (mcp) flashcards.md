---
layout: flashdeck
title: "Model Context Protocol (MCP) Flashcards"
tags: [ai-integration]
intro: |
  A bite‑size review of the Model Context Protocol — click each card to reveal the answer.
cards:
  - q: "Who open‑sourced the Model Context Protocol (MCP) and when?"
    a: "Anthropic released MCP as an open, vendor‑neutral standard in late 2024."

  - q: "What pain point does MCP primarily address?"
    a: "It eliminates the need for bespoke connectors between every AI model and every external data source, providing a universal, plug‑and‑play interface."

  - q: "MCP is often compared to which everyday hardware standard?"
    a: "USB‑C — a single, universal port that connects many devices."

  - q: "Name the three core roles in MCP’s architecture."
    a: |
       • **Host** – the AI application/platform  
       • **Client** – an in‑host adapter that manages one server connection  
       • **Server** – a lightweight connector exposing data or tools

  - q: "Which side advertises its capabilities during the handshake?"
    a: "The MCP **Server** lists the capabilities (resources, tools, prompts, sampling) it offers."

  - q: "What transport layers does MCP officially support today?"
    a: "Local stdio streams and remote HTTP/SSE; WebSocket support is on the roadmap."

  - q: "Why did MCP pick JSON‑RPC 2.0 as its message format?"
    a: "JSON‑RPC is simple, language‑agnostic, and already well‑supported, enabling structured request/response plus notifications."

  - q: "What three‑step sequence establishes an MCP session?"
    a: "**initialize → server responds → initialized** notification."

  - q: "Which capability type lets the AI *read* external context?"
    a: "**Resources** – read‑only files, database rows, documents, etc."

  - q: "Which capability type empowers the AI to *act* on external systems?"
    a: "**Tools** – function‑like actions the model can invoke."

  - q: "How do ‘Prompts’ differ from ‘Tools’ in MCP?"
    a: "Prompts are reusable template workflows (often user‑triggered), whereas Tools are direct action calls initiated by the model."

  - q: "What does the Sampling capability allow an MCP server to do?"
    a: "Request an LLM completion from the host, effectively letting the server ‘ask’ the model for help."

  - q: "Give an example of a Resource URI an MCP server might expose."
    a: "`drive://reports/q1.pdf` from a Google Drive connector."

  - q: "Give an example of a Tool an MCP Slack server could provide."
    a: "`post_message` to send a Slack notification."

  - q: "How does MCP support low‑latency partial results for long tasks?"
    a: "Servers can stream chunks through HTTP Server‑Sent Events (SSE) before sending the final result."

  - q: "What security framework underpins MCP authentication?"
    a: "OAuth 2.0 bearer tokens with fine‑grained scopes."

  - q: "Why does MCP require explicit user consent for most tool calls?"
    a: "To keep humans in the loop, preventing unintended or destructive actions by the AI."

  - q: "List two common threat vectors MCP’s security model mitigates."
    a: |
       • **Token misuse / confused‑deputy attacks** via audience‑bound tokens  
       • **Prompt or tool injection** through sandboxing, scope limits, and user approval

  - q: "Contrast MCP with ChatGPT plug‑ins in one sentence."
    a: "Plug‑ins are proprietary to OpenAI and focus on API calls, while MCP is an open, model‑agnostic standard covering data, tools, prompts, and more."

  - q: "How does MCP complement (rather than compete with) LangChain?"
    a: "LangChain defines in‑process Python/TS tools; MCP standardizes how any agent discovers and calls such tools across process or network boundaries."

  - q: "Which Google protocol focuses on agent‑to‑agent coordination, not agent‑to‑tool, and therefore pairs well with MCP?"
    a: "Google’s Agent‑to‑Agent (A2A) protocol."

  - q: "First two steps a Host takes to make a new MCP tool callable by its LLM?"
    a: |
       1. Call **tools/list** to fetch the tool’s JSON schema.  
       2. Register that schema as a callable function in the model’s context.

  - q: "When should a server send progress notifications instead of blocking?"
    a: "For long‑running operations (e.g., bulk database export) where immediate feedback or status updates are helpful."

  - q: "Why is robust logging essential in MCP deployments?"
    a: "For auditing tool usage, debugging model behavior, and tracking security‑relevant events across client and server."

  - q: "How do Client and Server agree on protocol evolution without breakage?"
    a: "Date‑stamped version negotiation during **initialize**; they pick the highest mutually supported spec."

  - q: "Local vs. remote MCP server: give one advantage of each."
    a: |
       • **Local (stdio)** – keeps sensitive data on‑device, ultra‑low latency.  
       • **Remote (HTTP)** – scales out, shares one connector with many agents.

  - q: "Name three high‑profile companies that announced MCP support by 2025."
    a: "OpenAI, Google, Microsoft (Azure)."

  - q: "What are two early flagship MCP connectors many demos use?"
    a: "GitHub (code) and Google Drive (files)."

  - q: "Biggest UX challenge highlighted for MCP going forward?"
    a: "Designing granular yet user‑friendly permission and consent flows."

  - q: "Which upcoming transport feature is slated to improve true bidirectional streaming?"
    a: "Native WebSocket support."

  - q: "Planned enhancement to better handle images, audio, and video?"
    a: "First‑class multimodal content types and chunked binary transfer."

  - q: "What governance effort is forming to avoid protocol fragmentation?"
    a: "A neutral MCP working group / standards foundation to steward spec changes."

  - q: "Approximate latency for a local **resources/list** call on a small set?"
    a: "A few milliseconds (often < 10 ms)."

  - q: "Typical latency for a remote **tools/call** that hits an external SaaS API?"
    a: "Roughly 50–200 ms for quick calls, longer if the API itself is slow."

  - q: "Describe the defense‑in‑depth idea behind MCP’s sandbox model."
    a: "Each server is isolated with its own auth scope and directory/API limits, so compromise of one connector doesn’t grant broad system access."

  - q: "How does streaming improve user experience during large resource reads?"
    a: "Partial content arrives quickly, letting the AI or user start reading while the rest downloads."

  - q: "Key roadmap item to standardize common schemas and aid discovery?"
    a: "A public MCP Registry with typed schema definitions and connector metadata."

  - q: "Why can adding dozens of MCP servers bloat an LLM’s prompt?"
    a: "Each server’s tool/function description consumes tokens; too many simultaneously can exceed context length or confuse the model."

  - q: "Operational best practice when upgrading MCP libraries?"
    a: "Run integration tests to catch version or schema mismatches before deployment."

  - q: "What is a simple analogy summarizing MCP’s value proposition in one line?"
    a: "MCP is the ‘universal API socket’ that lets any AI model plug into any data or tool securely and consistently."
---
