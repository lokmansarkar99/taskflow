---
name: TaskFlow Stage Plan
description: "Plan the next smallest TaskFlow implementation slice from the staged Next.js 16 guide without over-scaffolding or wasting context."
argument-hint: "Stage number or product goal, current route/state, and known backend contract"
agent: "TaskFlow Agent"
---
Plan the next TaskFlow slice for:

**Goal:** ${input}

Return a compact execution brief:
- stage and user-facing outcome
- current files/symbols to inspect
- verified dependencies and missing contracts
- smallest ordered edit set
- focused validation command
- explicit out-of-scope work

Use [taskflow-context](../taskflow-context.md) and the relevant section of [TaskFlow_NextJS_Complete_Build_And_Learn_Guide.md](../../TaskFlow_NextJS_Complete_Build_And_Learn_Guide.md). Do not generate implementation code unless requested.
