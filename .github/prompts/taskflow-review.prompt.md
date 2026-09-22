---
name: TaskFlow Review
description: "Review TaskFlow changes for runtime bugs, hydration, invalid HTML, Next.js 16 mistakes, auth/API risks, accessibility, and missing tests."
argument-hint: "Describe the diff, route, feature, or files to review"
agent: "TaskFlow Reviewer"
---
Review this TaskFlow scope:

**Scope:** ${input}

Read [taskflow-context](../taskflow-context.md), inspect only the relevant files, and run the narrowest useful validation. Findings come first, ordered by severity, with workspace-relative file links and line numbers. Then provide open questions, validation performed, and residual risk. Do not edit files.
