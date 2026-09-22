# TaskFlow Agent Context

This is a compact map for agents. The full requirements, learning sequence, and target architecture are in [TaskFlow_NextJS_Complete_Build_And_Learn_Guide.md](../TaskFlow_NextJS_Complete_Build_And_Learn_Guide.md).

## Baseline

- Next.js `16.3.5`, React `19.2.8`, TypeScript, Tailwind CSS v4, Turbopack.
- App Router with `src/app` and route groups.
- Base UI primitives from `@base-ui/react`, shadcn base-nova styling, lucide icons.
- Theme provider uses `next-themes` with class mode and system theme.
- Current validation commands: `npm run lint`, `npm run build`.

## Implemented surface

- Public `/`: hero, feature highlights, navbar, footer.
- Auth `/register`: client-side registration form calling the configured backend URL.
- User `/task`: task list UI with menu actions.
- Shared primitives: Button, Card, Dialog, DropdownMenu, Input, Label, Select, Textarea, etc.
- API boundary: `src/lib/api.ts`.
- Responsive baseline: all routes and components are mobile-first; the public navbar has a client-side hamburger menu below the `md` breakpoint.

## Known gaps from the guide

- Public features, pricing, about, and contact routes.
- Auth login, server actions, validation schemas, session/auth provider, and role redirects.
- Next.js 16 `proxy.ts` route protection.
- User dashboard route structure, task CRUD/actions, filters, pagination, task detail modal, optimistic status updates, comments, categories, stats, notifications, and profile.
- Admin routes, admin authorization, users/tasks/categories/stats management.
- Shared types, backend contract tests, loading/error boundaries, scoped dashboard metadata, and deployment configuration.

## Delivery order

1. Stabilize public and auth route shells.
2. Establish typed API/auth boundaries and validation.
3. Build the user dashboard vertical slice: list, create/update, detail, and states.
4. Add categories/comments/stats/notifications as separate slices.
5. Reuse those patterns for admin with server-side authorization.
6. Finish SEO, accessibility, tests, observability, and deployment.

## Agent rule

Choose one vertical slice per task. Before editing, identify the controlling route/component and a cheap validation. Do not implement the next guide stage by scaffolding every missing route at once.

## Permanent UI rule

Design and implement mobile-first. Verify phone, tablet, and desktop widths for every UI change. Preserve responsive behavior as a first-class acceptance criterion, not a later polish task.
