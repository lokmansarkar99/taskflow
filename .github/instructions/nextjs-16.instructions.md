---
description: "Use when changing Next.js 16 App Router routes, layouts, metadata, loading/error boundaries, server/client components, actions, params, searchParams, or proxy.ts."
applyTo: "src/app/**/*.ts,src/app/**/*.tsx"
---
# Next.js 16 Rules

- Read the relevant local Next.js guide under `node_modules/next/dist/docs/` before using an unfamiliar or recently changed API. The repository's `AGENTS.md` requires this.
- Treat `app` files as Server Components unless a browser event, hook, browser API, or client-only library requires `"use client"`.
- Keep client boundaries small. Pass serializable data into Client Components and keep data access/mutations on the server when the contract supports it.
- In Next.js 16, await dynamic `params` and `searchParams` before reading values.
- Use route groups for layout ownership; do not assume a route group changes its URL.
- Use `proxy.ts` for request-time protection only after the auth/session contract is verified. Authorization must also be enforced by the server/backend boundary.
- Keep `metadata`, `loading`, `error`, `not-found`, and route handlers close to the route they own. `error.tsx` must be a Client Component.
- Avoid hydration-sensitive output such as locale-dependent dates, random values, or client-only theme values in server markup. For the root theme mutation, retain `suppressHydrationWarning` on `<html>`.
- Validate route changes with the narrowest relevant check, then `npm run lint` and `npm run build`.
