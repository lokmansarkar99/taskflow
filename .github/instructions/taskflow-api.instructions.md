---
description: "Use when changing API clients, backend integration, auth headers, Server Actions, validation schemas, response types, caching, or data fetching in TaskFlow."
applyTo: "src/lib/**/*.ts,src/lib/**/*.tsx,src/app/**/*.ts,src/app/**/*.tsx"
---
# TaskFlow Data Rules

- Treat `src/lib/api.ts` as the single fetch boundary. Centralize base URL normalization, JSON headers, credentials, and consistent error parsing there.
- Do not scatter `process.env.NEXT_PUBLIC_API_URL` or hand-built fetch wrappers through pages and components.
- Never guess endpoint paths, authentication headers, or `{ success, message, data, meta }` fields. Verify the backend contract or mark the integration as blocked.
- Validate untrusted form data on the server even when client HTML validation exists. Prefer typed schemas and return stable action state for form errors.
- Keep secrets and server-only credentials out of `NEXT_PUBLIC_*` variables and Client Components.
- Use parallel fetching for independent dashboard reads. Add caching only for data whose ownership, invalidation, and user scope are explicit.
- Mutations must define their refresh behavior: `revalidatePath`, tag invalidation, or an explicit client update. Do not leave stale lists as an accidental behavior.
- Add or update response/request types near the API boundary before duplicating anonymous object shapes across the UI.
