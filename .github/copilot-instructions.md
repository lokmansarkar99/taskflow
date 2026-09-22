# TaskFlow Workspace Contract

TaskFlow is a Next.js 16 App Router frontend for a task-management product. The product specification and teaching sequence live in [TaskFlow_NextJS_Complete_Build_And_Learn_Guide.md](../TaskFlow_NextJS_Complete_Build_And_Learn_Guide.md). Read only the relevant stage section for the current task; do not copy the guide into responses or new files.

## Operating loop

1. Classify the request by guide stage and route/component ownership.
2. Read the nearest implementation, its call sites, and one neighboring pattern before editing.
3. State a short hypothesis about the controlling code path and the cheapest check that can disconfirm it.
4. Make the smallest coherent change. Preserve unrelated user changes.
5. Validate the touched slice first, then run `npm run lint` and `npm run build` when the change affects application code.
6. Report changed files, validation, and any unrelated blocker. Do not claim backend integration without a verified contract.

## Current architecture

- Routes are under `src/app`; route groups are `(public)`, `(auth)`, `(user)`, and `(admin)`.
- Shared UI is under `src/components/ui`; feature components are grouped by `public`, `tasks`, `user`, and `admin`.
- `@/*` maps to `src/*`.
- The UI kit uses `@base-ui/react`, not Radix. Use Base UI `render` composition; never add Radix-style `asChild`.
- `src/lib/api.ts` is the fetch boundary. Normalize API paths there rather than duplicating URL logic in pages.
- `next-themes` intentionally injects a theme script and changes `<html>`; preserve `suppressHydrationWarning` on the root element.

## Product boundaries

- Public pages are static/server-first and use the public layout.
- Auth pages are isolated from public navigation and must validate server-side before backend mutation.
- User and admin areas must remain role-scoped; do not expose admin data through client-only checks.
- Prefer Server Components for data reads, Client Components only for browser interaction, and Server Actions for mutations when the backend/session contract is ready.
- Do not invent endpoint response shapes. Confirm them from existing code, environment/config, or an explicitly supplied backend contract.

## UI correctness

- Never nest `<button>`, `<a>`, or interactive controls. Compose links with buttons using the shared Button's `render` prop.
- Keep the existing Base UI/shadcn visual language and lucide icons.
- Do not introduce broad redesigns while implementing a feature unless requested.
- Keep accessibility labels, keyboard behavior, focus states, loading, empty, and error states in the same change.

## Scope discipline

Use the smallest context that can answer the task. Do not scan the whole repository when a local route, component, or instruction file is enough. Do not add dependencies unless the task and existing architecture require them. Do not commit or reset the repository.
