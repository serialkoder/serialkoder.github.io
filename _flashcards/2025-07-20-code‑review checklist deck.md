---
layout: flashdeck
title: "Code‑Review Checklist Deck"
tags: [checklists]
intro: |
  Single deck covering the full checklist.  
  The first card gives the high‑level mnemonic; the next four drill into each bucket.
cards:
  - q: "Mnemonic for the 4 buckets?"
    a: |
       **I Q O D** — *Impact, Qualities, Operability, Design*  
       “I quit outputting dupes.”

  - q: "🟠 Impact — what do I verify?"
    a: |
       • End‑to‑end flow  
       • Impacted use‑cases & workflows  
       • Customer impact

  - q: "🟡 Qualities — how will it behave at scale?"
    a: |
       • Reusability  
       • Scalability  
       • Availability  
       • Traceability

  - q: "🔵 Operability — can we deploy & fix it?"
    a: |
       • Validate after deployment  
       • Troubleshoot during Sev‑2 (logs, metrics, run‑books)

  - q: "🟢 Design — is the shape right?"
    a: |
       • Design & architecture patterns  
       • Service responsibilities  
       • Layers  
       • Data structures & algorithms  
       • SOLID principles  
       • Reduce duplication / DRY  
       • Clear communication
---
