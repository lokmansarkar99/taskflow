---
name: TaskFlow Feature
description: "Implement one TaskFlow vertical slice from the Next.js 16 build guide with focused context, existing UI reuse, API contract checks, and validation."
argument-hint: "Feature or bug, target route/component, backend endpoint contract if known, and acceptance criteria"
agent: "TaskFlow Agent"
---
Implement the requested TaskFlow slice:

**Request:** ${input}

Use this sequence:
1. Read [taskflow-context](../taskflow-context.md) and the relevant guide section.
2. Identify the owning route/component and inspect its nearest neighboring pattern.
3. Verify API/auth assumptions before wiring data.
4. State one local hypothesis and the cheapest check that can disconfirm it.
5. Make the smallest complete change, including relevant loading, empty, error, accessibility, and responsive states.
6. Run focused validation immediately after editing, followed by `npm run lint` and `npm run build` when application code changed.
7. Report implementation, validation, assumptions/blockers, and one next slice.

Do not scaffold unrelated guide stages or duplicate the full guide.
