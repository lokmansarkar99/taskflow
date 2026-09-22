# TaskFlow Prompt Cookbook

Use these prompts with the `TaskFlow Agent` from the agent picker, or paste them into chat with `@TaskFlow Agent`.

The most reliable prompt shape is:

```text
[Action] + [exact scope] + [user outcome] + [known contract] + [constraints] + [validation]
```

Keep one prompt focused on one vertical slice unless you are intentionally doing a batch.

## Quick Start

```text
@TaskFlow Agent
Implement the registration success flow in `src/app/(auth)/register/page.tsx`.
After a successful registration, show the success state and provide a clear link to `/login`.
Preserve the existing Card/Input/Button UI. Keep the current backend request contract unchanged.
Validate with `npm run lint` and `npm run build`.
```

```text
@TaskFlow Agent
Analyze the hydration warning on the public navbar and fix only the controlling components.
Inspect `ThemeToggle`, `DropdownMenuTrigger`, `Button`, and the root layout.
Use Base UI `render`, never `asChild`, and do not redesign the navbar.
Run a focused check, then lint and build.
```

## Page Prompts

### Create a page

```text
@TaskFlow Agent
Build the public Features page at `src/app/(public)/features/page.tsx`.
Use the existing public layout and UI language. Show five feature sections based on the TaskFlow guide: tasks, categories, comments, analytics, and notifications.
Add page metadata, responsive states, and accessible headings. Do not add backend calls.
Validate with `npm run lint` and `npm run build`.
```

### Improve one page

```text
@TaskFlow Agent
Improve only `src/app/(public)/page.tsx` and its directly owned public components.
Make the landing page communicate TaskFlow's task-management value more clearly while preserving the existing visual system, routes, and responsive behavior.
Do not change shared UI primitives or unrelated pages. Check mobile and desktop layout assumptions, then run lint and build.
```

### Add page states

```text
@TaskFlow Agent
Add loading, empty, error, and accessible retry states for the task page at `src/app/(user)/task/page.tsx`.
Use the existing Skeleton, Card, Button, and typography patterns. Keep data fetching and endpoint behavior unchanged.
Do not invent response fields. Validate the route with lint and build.
```

### Page with search params

```text
@TaskFlow Agent
Update the tasks page to read `status`, `priority`, `search`, and `page` from async `searchParams`.
Preserve the current URL when changing one filter and keep the API query construction in `src/lib/api.ts` or a focused helper.
Use Server Components for reads and a small Client Component only for filter interaction.
Confirm the backend query contract before coding. Add the narrowest useful validation, then lint and build.
```

## Component Prompts

### Create a component

```text
@TaskFlow Agent
Create `src/components/tasks/task-filters.tsx` for status, priority, and text search filters.
Use the existing Select, Input, Button, and lucide icon patterns. Update the URL through Next navigation without nesting interactive elements.
Keep it client-side only because it uses browser interaction. Include labels, keyboard focus, reset behavior, and a pending state.
Add or update only the files needed for this component and run lint/build.
```

### Modify a shared component

```text
@TaskFlow Agent
Update `src/components/ui/button.tsx` to support the requested link composition.
This project uses `@base-ui/react`; preserve the existing public API and use Base UI `render`. Do not introduce `asChild` or Radix dependencies.
Check all call sites that could create nested buttons or links. Run lint and build.
```

### Component accessibility

```text
@TaskFlow Agent
Audit and fix accessibility for `src/components/public/PublicNavbar.tsx`.
Check landmark structure, link names, icon-only theme controls, keyboard focus, mobile overflow, and interactive element nesting.
Keep the current design and routes. Report any issue that requires a product decision instead of guessing.
Validate with lint and build.
```

### Component bug

```text
@TaskFlow Agent
Fix the bug where the task action menu renders a nested `<button>` in `src/app/(user)/task/page.tsx`.
Trace the call path through `DropdownMenuTrigger` and `Button`. Use the installed Base UI API and make the smallest fix.
Also scan for the same `asChild` pattern in nearby TaskFlow files. Run lint and build.
```

## API and Auth Prompts

### Normalize the API boundary

```text
@TaskFlow Agent
Refactor `src/lib/api.ts` into the single typed fetch boundary for TaskFlow.
Normalize base URL slashes, JSON headers, non-JSON error responses, and the existing generic response behavior.
Do not invent auth headers or response shapes. Preserve current callers or update them minimally.
Add focused validation and run lint/build.
```

### Backend integration with a known contract

```text
@TaskFlow Agent
Connect the task page to `GET /tasks`.
Verified backend contract: response is `{ success: boolean, data: Task[], meta?: { page: number, limit: number, total: number, totalPages: number } }`; the request accepts `status`, `priority`, `search`, and `page` query parameters.
Keep reads server-first, type the response, handle loading/empty/error states, and do not add optimistic behavior yet.
Validate the integration with lint/build and clearly report anything that cannot be verified locally.
```

### Server Action

```text
@TaskFlow Agent
Add a Server Action for creating a task from the task page.
Verified contract: `POST /tasks` accepts `{ todo: string, priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT" }` and returns the created task in `data`.
Validate the FormData on the server, return stable success/error state, revalidate the task list, and preserve the existing UI primitives.
Do not implement authentication until the session/header contract is confirmed.
```

### Auth and role protection

```text
@TaskFlow Agent
Implement the login vertical slice for the `(auth)` route group.
First inspect the existing registration flow and verify the backend login response and session mechanism. If either contract is missing, report the blocker before editing.
When verified, add server-side validation, role-based redirect to `/admin` or `/task`, pending/error states, and route protection using the Next.js 16 `proxy.ts` convention.
Never rely only on client-side role checks. Validate with lint/build.
```

## Batch Development Prompts

For batch work, define the exact file set, order, shared constraints, and a stop condition. Avoid saying only “build the whole dashboard.”

### Small batch

```text
@TaskFlow Agent
Implement this batch in order:
1. Add `src/app/(public)/features/page.tsx`.
2. Add page metadata.
3. Add navigation from the public navbar.

Use existing public components and styling. Do not modify API code, auth, or shared primitives.
After each substantive edit, run the narrowest check. Finish with lint/build and report each changed file.
Stop after these three items.
```

### User dashboard batch

```text
@TaskFlow Agent
Implement the first user-dashboard batch:
1. Create the dashboard route shell under `src/app/(user)/dashboard`.
2. Add a server-first task list page.
3. Add loading, empty, and error states.
4. Add a client-side filter control for `status`.

Use the verified `GET /tasks` contract below: [paste contract].
Do not implement categories, comments, stats, notifications, admin routes, or optimistic updates in this batch.
Run focused validation after the first slice, then lint/build.
```

### Public-site batch

```text
@TaskFlow Agent
Complete the remaining static public-site pages: features, pricing, about, and contact.
For each page, add route-local metadata and reuse the existing public layout, navbar, footer, Card, Button, and typography patterns.
Do not add backend calls or redesign the landing page. Keep each page independently accessible and responsive.
Validate the full batch with lint/build and list any missing assets or product copy decisions.
```

## Review and Debug Prompts

### Review a file

```text
@TaskFlow Reviewer
Review `src/components/public/PublicNavbar.tsx` for runtime bugs, hydration risks, invalid interactive nesting, accessibility issues, and Base UI composition mistakes.
Findings first, ordered by severity, with file links and line numbers. Do not edit.
```

### Review a feature

```text
@TaskFlow Reviewer
Review the current task-list implementation as a complete user workflow.
Inspect the route, directly owned components, API boundary, and relevant shared primitives.
Prioritize auth/data leaks, guessed response shapes, stale data, hydration errors, invalid HTML, missing loading/error/empty states, and accessibility regressions.
Run the narrowest useful validation and report findings first. Do not edit.
```

### Debug from a browser error

```text
@TaskFlow Agent
Debug this browser error:
[paste the complete error and component stack]

Trace from the first application component in the stack to the controlling primitive. Inspect nearby call sites before editing.
Preserve current UI behavior, fix the root cause, and scan only for the same local pattern. Validate with the smallest executable check, then lint/build.
```

## Guide-Stage Prompts

### Stage 1

```text
@TaskFlow Agent
Continue Stage 1 of the TaskFlow guide from the current repository state.
Implement only the next missing public-site slice. Inspect the existing public layout and landing page first.
Prioritize static Server Components, route-local metadata, responsive UI, and loading/error/not-found behavior. Do not start auth or dashboard work.
Tell me which guide subsection you selected and why, then implement and validate it.
```

### Stage 2

```text
@TaskFlow Agent
Continue Stage 2 authentication from the current repository state.
Start by auditing registration, login route availability, API contracts, and session/auth dependencies.
Implement only the next unblocked auth slice, with server-side validation, pending/error states, and secure role behavior.
Do not claim BetterAuth or proxy integration without verified backend/session details.
```

### Stage 3

```text
@TaskFlow Agent
Continue Stage 3 with the smallest unblocked user-dashboard vertical slice.
Use the guide and current context map, inspect the existing task route/components, and identify the first missing user outcome.
Prefer server-first reads and a focused Client Component for interaction. Include loading, empty, error, accessibility, and responsive states.
Do not scaffold every dashboard feature in one change.
```

### Stage 4

```text
@TaskFlow Agent
Plan the next Stage 4 admin slice only after checking the current auth and authorization contracts.
Reuse the user-dashboard patterns where appropriate, but enforce admin scope server-side.
Return the smallest implementation plan, required verified backend fields, files to inspect, and validation command before editing.
```

## Good Prompt Checklist

Before sending a development prompt, include:

- Exact route, component, or folder.
- User-visible outcome.
- Existing pattern to preserve.
- Verified endpoint/request/response contract, if data is involved.
- What is explicitly out of scope.
- Required validation.
- Whether you want implementation, planning, or review.

Avoid prompts like:

```text
Build the whole app.
Fix everything.
Make the dashboard complete.
Use the backend somehow.
```

Prefer a bounded request with a clear stop condition:

```text
Implement the next unblocked task-list slice only. Stop after list rendering, empty/error states, and status filtering are complete. Do not implement comments, categories, stats, notifications, or admin routes.
```
