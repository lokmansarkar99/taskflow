# 🚀 TaskFlow Frontend — Learn Next.js 16 by Building the FULL Project
### One Sequential Guide: Public Site → Auth → User Dashboard → Admin Dashboard
### Every Next.js concept taught exactly when you need it to build the next real screen

---

## 🎯 How This Guide Is Different From Before

This is **not** a list of Next.js topics with TaskFlow examples attached. This is the **actual build sequence** — you build TaskFlow screen by screen, in the order a real product gets built, and each screen teaches you the exact Next.js concept required to build it. By the end, you will have:

- ✅ The **entire TaskFlow site** built (Public + User Dashboard + Admin Dashboard)
- ✅ Every important Next.js 16 concept learned **in context**, not in isolation
- ✅ Every screen wired to your **real Express + MongoDB backend**

```
STAGE 0: Project Setup
STAGE 1: Public Zone (marketing pages)
STAGE 2: Authentication (login/register + role redirect)
STAGE 3: User Dashboard (the core app — tasks, categories, comments, stats)
STAGE 4: Admin Dashboard (reusing patterns, adding admin-only logic)
STAGE 5: Cross-cutting polish (SEO, deployment, optional payments/AI)
```

Follow it top to bottom. Don't skip — each stage assumes the previous one is done.

---

# 🧱 STAGE 0 — Project Setup

## 0.1 — Initialize the Project

**Docs to read first:** [Next.js — Installation](https://nextjs.org/docs/app/getting-started/installation)

```bash
npx create-next-app@latest taskflow-frontend --typescript --tailwind --app --turbopack
cd taskflow-frontend
npx shadcn@latest init
```

**Concept learned:** Turbopack is now Next.js 16's **stable default bundler** — faster dev server and builds than Webpack.

## 0.2 — Folder Structure (Matches Your 3-Zone SRS)

```
src/
├── app/
│   ├── (public)/         ← Landing, Features, Pricing, About, Contact
│   ├── (auth)/           ← Login, Register, Forgot Password
│   ├── (user)/            ← User Dashboard (role: CLIENT)
│   ├── (admin)/           ← Admin Dashboard (role: ADMIN)
│   ├── layout.tsx         ← Root layout
│   └── proxy.ts           ← Auth guard (Next.js 16 naming, replaces middleware.ts)
├── components/
│   ├── ui/                ← shadcn/ui primitives
│   ├── public/            ← Landing page sections
│   ├── tasks/             ← Task-related components
│   └── admin/             ← Admin-only components
├── lib/
│   ├── api.ts             ← Fetch wrapper for your Express backend
│   ├── auth.ts             ← BetterAuth config
│   └── validations/        ← Zod schemas (mirror your backend's!)
└── types/
    └── *.types.ts          ← Mirrors your backend interfaces
```

## 0.3 — Environment Variables

**Docs to read:** [Next.js — Environment Variables](https://nextjs.org/docs/app/guides/environment-variables)

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1   # accessible in browser
BETTER_AUTH_SECRET=your-secret                       # server-only, no NEXT_PUBLIC_ prefix
```

**Concept learned:** `NEXT_PUBLIC_` prefix exposes a variable to the browser bundle. Anything without it stays server-only — critical for not leaking secrets.

## 0.4 — API Client Helper

```typescript
// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json(); // your backend's { success, message, data, meta } shape
}
```

**Why this matters:** Every page from here on calls this single helper — one place to add auth headers later.

---

# 🌍 STAGE 1 — Public Zone

*Goal: build the marketing site. No backend auth needed yet. This teaches you Server Components, layouts, and static rendering fundamentals before you touch anything dynamic.*

## 1.1 — Root Layout + First Server Component

**Docs to read:** [Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages) · [Server Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)

**Concept:** Every component in `app/` is a **Server Component by default** — renders on the server, ships zero JS to the browser unless you opt into a Client Component.

**Build:** `app/layout.tsx` (root layout — required, wraps everything):

```typescript
// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "TaskFlow — Manage Tasks Effortlessly",
  description: "A modern task management system",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

## 1.2 — Route Group for Public Pages

**Docs to read:** [Route Groups](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups)

**Concept:** `(folderName)` doesn't appear in the URL — lets you give a section of the site its own layout without affecting routing.

**Build:** `app/(public)/layout.tsx` — public navbar + footer:

```typescript
// app/(public)/layout.tsx
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicNavbar />   {/* logo, nav links, "Login"/"Register" buttons */}
      {children}
      <PublicFooter />
    </>
  );
}
```

## 1.3 — Landing Page (`/`)

**Docs to read:** [next/image](https://nextjs.org/docs/app/api-reference/components/image) · [next/font](https://nextjs.org/docs/app/api-reference/components/font)

**Build:** `app/(public)/page.tsx` — fully static, no backend call:

```typescript
// app/(public)/page.tsx
import Image from "next/image";

export default function LandingPage() {
  return (
    <main>
      <section className="hero">
        <h1>Manage Tasks. Track Progress. Stay Organized.</h1>
        <Image src="/hero-screenshot.png" alt="TaskFlow dashboard preview" width={1200} height={700} priority />
      </section>
      <FeatureHighlights /> {/* static content — mirrors your 5 backend modules */}
    </main>
  );
}
```

**Concept learned — `next/image`:** Automatic lazy loading, responsive `sizes`, blur placeholder. Use `priority` only on above-the-fold images (like this hero).

**Concept learned — `next/font`:** Add once in root layout for zero layout-shift font loading:

```typescript
// app/layout.tsx
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
// apply: <body className={inter.className}>
```

## 1.4 — Features / Pricing / About / Contact Pages

**Docs to read:** [Metadata API](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)

**Build:** `app/(public)/features/page.tsx`, `/pricing`, `/about`, `/contact` — all static Server Components, same pattern as landing.

```typescript
// app/(public)/features/page.tsx
export const metadata = { title: "Features — TaskFlow" };

export default function FeaturesPage() {
  return (
    <div>
      <FeatureCard title="Task Management" desc="Priority, status, tags, scheduling" />
      <FeatureCard title="Categories" desc="Organize tasks with color-coded categories" />
      <FeatureCard title="Threaded Comments" desc="Collaborate with 2-level nested replies" />
      <FeatureCard title="Analytics" desc="Track your productivity with visual stats" />
    </div>
  );
}
```

**Concept learned:** Per-page static `metadata` export — each public page gets its own SEO title/description, crawlable by Google, unlike client-rendered SPAs.

## 1.5 — Loading & Error States (Apply Globally Now)

**Docs to read:** [loading.js](https://nextjs.org/docs/app/api-reference/file-conventions/loading) · [error.js](https://nextjs.org/docs/app/api-reference/file-conventions/error)

**Build:** `app/(public)/loading.tsx`, `app/(public)/error.tsx`, `app/not-found.tsx`:

```typescript
// app/(public)/error.tsx — MUST be a Client Component
'use client';
export default function PublicError({ error, reset }: { error: Error; reset: () => void }) {
  return <div><p>Something went wrong.</p><button onClick={reset}>Try again</button></div>;
}
```

**Checkpoint — Stage 1 Complete:** You should now have a fully navigable public marketing site with SEO metadata, optimized images/fonts, and graceful error handling. **Nothing talks to your backend yet.**

---

# 🔐 STAGE 2 — Authentication

*Goal: Login/Register pages that actually call your Express `/users` endpoints, then redirect based on role. This teaches Client Components, forms, Server Actions, and the Proxy pattern.*

## 2.1 — Auth Route Group + Layout

**Build:** `app/(auth)/layout.tsx` — minimal centered layout (no navbar/footer):

```typescript
// app/(auth)/layout.tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-screen items-center justify-center">{children}</div>;
}
```

## 2.2 — Register Page — Your First Client Component + Server Action

**Docs to read:** [Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components#client-components) · [Server Actions and Mutations](https://nextjs.org/docs/app/getting-started/updating-data)

**Concept:** `'use client'` opts a component into browser-side interactivity (`useState`, event handlers). `'use server'` marks a function that runs on the server but is callable directly from client code — often from a `<form action={...}>`.

**Build the Server Action first:**

```typescript
// lib/actions/auth.actions.ts
'use server';
import { apiFetch } from "@/lib/api";

export async function registerAction(prevState: any, formData: FormData) {
  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const result = await apiFetch("/users/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return { success: true, data: result.data };
  } catch (err) {
    return { success: false, message: "Registration failed. Email may already exist." };
  }
}
```

**Now the form (Client Component, uses `useActionState` + `useFormStatus`):**

**Docs to read:** [useActionState](https://react.dev/reference/react/useActionState) · [useFormStatus](https://react.dev/reference/react-dom/hooks/useFormStatus)

```typescript
// app/(auth)/register/page.tsx
'use client';
import { useActionState } from "react";
import { registerAction } from "@/lib/actions/auth.actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? "Creating account..." : "Register"}</button>;
}

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerAction, null);

  return (
    <form action={formAction}>
      <input name="name" placeholder="Full name" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required minLength={8} />
      {state?.message && <p className="text-red-500">{state.message}</p>}
      <SubmitButton />
    </form>
  );
}
```

**Concept learned — `useFormStatus`:** Only works for the nearest **parent** `<form>` — that's why `SubmitButton` must be a separate component nested inside the `<form>`, not inline in the page.

## 2.3 — Zod Validation in the Server Action

**Docs to read:** [Zod — Basic Usage](https://zod.dev/)

**Concept:** Reuse the exact validation philosophy from your backend's `TaskValidation`/`UserValidation` — never trust client input, validate again server-side even though the browser has `required`/`minLength` HTML attributes.

```typescript
// lib/validations/auth.validation.ts
import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

// Inside registerAction, before calling apiFetch:
const parsed = registerSchema.safeParse(payload);
if (!parsed.success) {
  return { success: false, message: parsed.error.errors[0].message };
}
```

## 2.4 — BetterAuth Setup

**Docs to read:** [BetterAuth — Installation](https://www.better-auth.com/docs/installation)

```bash
npm install better-auth
```

```typescript
// lib/auth.ts
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DATABASE_URL!);

export const auth = betterAuth({
  database: mongodbAdapter(client.db()),
  emailAndPassword: { enabled: true },
});
```

**Key Insight:** This connects to the **same MongoDB database** your Express backend already uses. Your existing `User` collection (with `role: CLIENT/ADMIN`) becomes the source of truth for both systems.

## 2.5 — Login Page + Role-Based Redirect

**Docs to read:** [redirect()](https://nextjs.org/docs/app/api-reference/functions/redirect)

```typescript
// lib/actions/auth.actions.ts
'use server';
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function loginAction(prevState: any, formData: FormData) {
  const session = await auth.api.signInEmail({
    body: { email: formData.get("email"), password: formData.get("password") },
  });

  if (!session) return { success: false, message: "Invalid credentials" };

  // THE KEY MISSING PIECE FROM YOUR EARLIER PLAN — role-based redirect
  if (session.user.role === "ADMIN") redirect("/admin");
  redirect("/dashboard");
}
```

## 2.6 — Proxy: Protecting Dashboard Routes

**Docs to read:** [Proxy (formerly Middleware)](https://nextjs.org/docs/app/api-reference/file-conventions/proxy)

**Concept:** `proxy.ts` (Next.js 16 renamed this from `middleware.ts`) intercepts requests **before** they reach a page — runs on the Node.js runtime now (not Edge), which matters because auth/session checks often need full Node APIs.

```typescript
// app/proxy.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  const path = request.nextUrl.pathname;

  const isUserRoute = path.startsWith("/dashboard");
  const isAdminRoute = path.startsWith("/admin");

  if ((isUserRoute || isAdminRoute) && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAdminRoute && session?.user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", request.url)); // CLIENT trying /admin
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
```

**Checkpoint — Stage 2 Complete:** Register → Login → role-based redirect → protected routes all work end-to-end against your real backend.

---

# 👤 STAGE 3 — User Dashboard (The Core App)

*Goal: build the actual task management interface. This is where most Next.js data-fetching, caching, and interactivity concepts get used.*

## 3.1 — Dashboard Layout + Route Group

**Build:** `app/(user)/layout.tsx` — sidebar (Tasks, Categories, Stats, Notifications, Profile) + navbar with logout.

```typescript
// app/(user)/layout.tsx — Server Component
export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar links={["Tasks", "Categories", "Stats", "Notifications", "Profile"]} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
```

**Concept learned:** This `layout.tsx` **persists across navigation** — clicking between Tasks/Categories/Stats does NOT re-render the sidebar. Compare this to `template.tsx` (re-mounts every time) if you ever want page-transition animations later.

## 3.2 — Dashboard Home — Parallel Fetching + Suspense Streaming

**Docs to read:** [Fetching Data](https://nextjs.org/docs/app/getting-started/fetching-data) · [Loading UI and Streaming](https://nextjs.org/docs/app/getting-started/linking-and-navigating#streaming) · [Suspense](https://react.dev/reference/react/Suspense)

**Concept:** Don't make the whole dashboard wait for your slowest aggregation query. Stream each widget independently.

```typescript
// app/(user)/dashboard/page.tsx
import { Suspense } from "react";

export default function DashboardHome() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Suspense fallback={<StatCardSkeleton />}>
        <StatusBreakdownCard /> {/* calls GET /stats/my-tasks */}
      </Suspense>
      <Suspense fallback={<StatCardSkeleton />}>
        <OverdueAlertBanner /> {/* calls GET /stats/overdue */}
      </Suspense>
      <Suspense fallback={<ListSkeleton />}>
        <RecentTasksList /> {/* calls GET /tasks?limit=5 */}
      </Suspense>
    </div>
  );
}

// Each of these is its own async Server Component:
async function StatusBreakdownCard() {
  const stats = await apiFetch("/stats/my-tasks", { headers: await authHeader() });
  return <PieChart data={stats.data} />;
}
```

**Why this matters for TaskFlow specifically:** Your `getUserTaskStats` and `getPriorityBreakdown` are aggregation pipelines (naturally slower than a simple `find()`). Suspense lets `RecentTasksList` (a fast query) render immediately while the aggregations stream in separately — no more "whole page waits for the slowest thing."

## 3.3 — My Tasks Page — searchParams + QueryBuilder Integration

**Docs to read:** [searchParams](https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional)

**⚠️ Next.js 16 Breaking Change:** `searchParams` is now a **Promise** — must `await` it.

```typescript
// app/(user)/dashboard/tasks/page.tsx
export default async function TasksPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams; // { status: 'TODO', page: '2', ... }
  const query = new URLSearchParams(params).toString();

  const { data: tasks, meta } = await apiFetch(`/tasks?${query}`, {
    headers: await authHeader(),
  });

  return (
    <div>
      <TaskFilters />          {/* Client Component — updates the URL's searchParams */}
      <TaskList tasks={tasks} /> {/* Server Component — just renders the array */}
      <Pagination meta={meta} /> {/* reads meta.page/limit/total/totalPages directly from your QueryBuilder response */}
    </div>
  );
}
```

**Concept learned — the composition pattern:**

```typescript
// components/tasks/TaskFilters.tsx
'use client';
import { useRouter, useSearchParams } from "next/navigation";

export function TaskFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    router.push(`/dashboard/tasks?${params.toString()}`); // triggers page.tsx to re-fetch
  }

  return (
    <select onChange={(e) => updateFilter("status", e.target.value)}>
      <option value="TODO">Todo</option>
      <option value="IN_PROGRESS">In Progress</option>
      <option value="DONE">Done</option>
    </select>
  );
}
```

**Key Insight:** This is exactly how your backend's `getAllTasks` QueryBuilder chain (`.search().filter().sort().paginate()`) gets exercised from the UI — every dropdown/search box here maps to a query param your backend already understands.

## 3.4 — Create Task — Full Server Action + Revalidation Cycle

**Docs to read:** [revalidatePath](https://nextjs.org/docs/app/api-reference/functions/revalidatePath)

```typescript
// lib/actions/task.actions.ts
'use server';
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createTaskSchema = z.object({
  title: z.string().min(5),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
});

export async function createTaskAction(prevState: any, formData: FormData) {
  const parsed = createTaskSchema.safeParse({
    title: formData.get("title"),
    priority: formData.get("priority"),
  });
  if (!parsed.success) return { success: false, message: parsed.error.errors[0].message };

  await apiFetch("/tasks", {
    method: "POST",
    body: JSON.stringify(parsed.data),
    headers: await authHeader(),
  });

  revalidatePath("/dashboard/tasks"); // wipes the cached list so the new task shows up
  return { success: true };
}
```

## 3.5 — Task Detail + Intercepting Route Modal

**Docs to read:** [Parallel Routes](https://nextjs.org/docs/app/api-reference/file-conventions/parallel-routes) · [Intercepting Routes](https://nextjs.org/docs/app/api-reference/file-conventions/intercepting-routes)

**Concept:** Clicking a task from the list should open a **modal**; visiting the URL directly (or refreshing) should show a **full page**. This is the hardest App Router pattern — build it carefully.

```
app/(user)/dashboard/tasks/
├── @modal/
│   ├── (.)[id]/page.tsx     ← Intercepted version (shown as modal when navigated from the list)
│   └── default.tsx          ← Renders nothing when no modal is active
├── [id]/page.tsx            ← Full page (direct visit or refresh)
├── layout.tsx               ← Must accept BOTH {children} and {modal} props
└── page.tsx
```

```typescript
// app/(user)/dashboard/tasks/layout.tsx
export default function TasksLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal} {/* renders the @modal slot's content on top, if intercepted */}
    </>
  );
}
```

```typescript
// app/(user)/dashboard/tasks/@modal/(.)[id]/page.tsx
export default async function TaskModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: task } = await apiFetch(`/tasks/${id}`, { headers: await authHeader() });
  return <Modal><TaskDetailContent task={task} /></Modal>;
}
```

## 3.6 — Task Status Toggle — `useOptimistic`

**Docs to read:** [useOptimistic](https://react.dev/reference/react/useOptimistic)

**Concept:** Update the UI **immediately** on click, before the server responds, then reconcile with the real result. Perfect fit for your backend's `updateTaskStatus` (which is a single atomic `findOneAndUpdate`).

```typescript
// components/tasks/StatusToggle.tsx
'use client';
import { useOptimistic, useTransition } from "react";
import { updateTaskStatusAction } from "@/lib/actions/task.actions";

export function StatusToggle({ taskId, currentStatus }: { taskId: string; currentStatus: string }) {
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(currentStatus);
  const [isPending, startTransition] = useTransition();

  function handleChange(newStatus: string) {
    startTransition(async () => {
      setOptimisticStatus(newStatus);            // instant UI feedback
      await updateTaskStatusAction(taskId, newStatus); // real backend call + revalidatePath
    });
  }

  return (
    <select value={optimisticStatus} onChange={(e) => handleChange(e.target.value)} disabled={isPending}>
      <option value="TODO">Todo</option>
      <option value="DONE">Done</option>
    </select>
  );
}
```

## 3.7 — Comments — Nested Data + Reply Enforcement

**Build:** Inside the Task Detail page, render `getTaskComments` response (root + replies structure, matching your backend's exact shape).

```typescript
// components/tasks/CommentThread.tsx
export function CommentThread({ comments }: { comments: CommentWithReplies[] }) {
  return comments.map((comment) => (
    <div key={comment._id}>
      <CommentCard comment={comment} showReplyButton={comment.parentComment === null} />
      {/* ↑ Proactively hide "Reply" on replies — matches your backend's 2-level nesting rule.
             Prevents the user from ever hitting your 400 "Max 2 level nested" error. */}
      <div className="ml-8">
        {comment.replies.map((reply) => (
          <CommentCard key={reply._id} comment={reply} showReplyButton={false} />
        ))}
      </div>
    </div>
  ));
}
```

**Like button — same `useOptimistic` pattern as status toggle:**

```typescript
'use client';
export function LikeButton({ commentId, initialLiked, initialCount }: LikeButtonProps) {
  const [optimistic, setOptimistic] = useOptimistic(
    { liked: initialLiked, count: initialCount },
    (state, newLiked: boolean) => ({ liked: newLiked, count: state.count + (newLiked ? 1 : -1) })
  );

  async function handleClick() {
    setOptimistic(!optimistic.liked);
    await toggleLikeAction(commentId); // calls your $addToSet/$pull toggleLike endpoint
  }

  return <button onClick={handleClick}>{optimistic.liked ? "❤️" : "🤍"} {optimistic.count}</button>;
}
```

## 3.8 — Categories — Your First `'use cache'` Usage

**Docs to read:** [use cache](https://nextjs.org/docs/app/api-reference/directives/use-cache) · [cacheTag](https://nextjs.org/docs/app/api-reference/functions/cacheTag) · [cacheLife](https://nextjs.org/docs/app/api-reference/functions/cacheLife)

**Concept:** Categories rarely change — perfect candidate for Next.js 16's Cache Components model (the evolution of the old PPR concept).

```typescript
// lib/data/categories.ts
'use cache';
import { cacheLife, cacheTag } from "next/cache";

export async function getCachedCategories() {
  cacheLife("hours");
  cacheTag("categories");
  const res = await apiFetch("/categories/with-task-count");
  return res.data;
}
```

```typescript
// After creating/editing a category — invalidate the cache:
'use server';
import { updateTag } from "next/cache"; // Next.js 16 addition alongside revalidateTag

export async function createCategoryAction(formData: FormData) {
  await apiFetch("/categories", { method: "POST", body: JSON.stringify({ name: formData.get("name") }) });
  updateTag("categories"); // invalidates AND immediately refetches
}
```

**Contrast this with Tasks:** Tasks change constantly per-user — deliberately **do not** add `'use cache'` there. This contrast is the real lesson: cache what's stable, leave dynamic data uncached.

## 3.9 — Stats Page — Parallel Aggregation Fetching

**Docs to read:** [Parallel Data Fetching](https://nextjs.org/docs/app/getting-started/fetching-data#parallel-data-fetching)

```typescript
// app/(user)/dashboard/stats/page.tsx
export default async function StatsPage() {
  const headers = await authHeader();
  const [statusStats, priorityStats, categoryStats, activityStats] = await Promise.all([
    apiFetch("/stats/my-tasks", { headers }),
    apiFetch("/stats/priority", { headers }),
    apiFetch("/stats/by-category", { headers }),
    apiFetch("/stats/activity", { headers }),
  ]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <PieChart data={statusStats.data} />
      <BarChart data={priorityStats.data} />
      <TreemapChart data={categoryStats.data} />
      <LineChart data={activityStats.data} />
    </div>
  );
}
```

**Direct callback to your backend:** This is the **same** `Promise.all` optimization you already applied in your backend's `getAdminDashboard` — now you're applying the identical principle on the frontend, fetching 4 independent aggregations simultaneously instead of sequentially.

## 3.10 — Notifications — Real-Time with Socket.IO Client

**Docs to read (conceptual, not Next.js-specific):** [Socket.IO Client Docs](https://socket.io/docs/v4/client-api/)

```typescript
// components/notifications/NotificationBell.tsx
'use client';
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export function NotificationBell({ userId }: { userId: string }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, { query: { userId } });
    socket.on("notification:new", (data) => setNotifications((prev) => [data, ...prev]));
    return () => { socket.disconnect(); };
  }, [userId]);

  return <BellIcon count={notifications.length} />;
}
```

**Why not SSE/Route Handlers here:** Your backend already emits via Socket.IO (`sendNotification.ts`) — reuse the existing real-time infrastructure instead of building a parallel Server-Sent Events system.

## 3.11 — Profile & Theme Context

**Docs to read:** [Context in Next.js](https://react.dev/learn/passing-data-deeply-with-context)

```typescript
// app/layout.tsx (root — wraps everything)
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider> {/* Client Component Provider wraps Server children */}
      </body>
    </html>
  );
}
```

**Checkpoint — Stage 3 Complete:** The entire User Dashboard works — Tasks (CRUD + filter/search/paginate), Categories (cached), Comments (nested + likes), Stats (parallel charts), Notifications (real-time), Profile.

---

# 🛡️ STAGE 4 — Admin Dashboard

*Goal: reuse everything from Stage 3, add admin-only data scope and access control. This teaches you almost nothing NEW conceptually — which is the point: good architecture means the same patterns repeat.*

## 4.1 — Admin Layout (Separate Route Group)

```typescript
// app/(admin)/layout.tsx
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <AdminSidebar links={["Overview", "Users", "Tasks", "Categories", "Stats"]} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
```

**Reminder:** `proxy.ts` (built in Stage 2.6) already redirects non-admins away from `/admin/*` — you don't need to re-check role in every page, though double-checking server-side in the service layer is still good practice.

## 4.2 — Admin Home — Reusing the Suspense Pattern

```typescript
// app/(admin)/admin/page.tsx
export default function AdminHome() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <SystemStatsWidget /> {/* calls GET /stats/admin — your getAdminDashboard endpoint */}
    </Suspense>
  );
}
```

**No new concept here** — same Suspense + Server Component pattern from Stage 3.2, just pointed at a different endpoint.

## 4.3 — User Management Table — Same QueryBuilder Pattern, Different Model

```typescript
// app/(admin)/admin/users/page.tsx
export default async function AdminUsersPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const params = await searchParams;
  const query = new URLSearchParams(params).toString();
  const { data: users, meta } = await apiFetch(`/users?${query}`, { headers: await authHeader() });

  return (
    <div>
      <UserFilters />          {/* same TaskFilters pattern from 3.3, different fields */}
      <UserTable users={users} />
      <Pagination meta={meta} /> {/* the SAME Pagination component from Stage 3.3, reused! */}
    </div>
  );
}
```

**The lesson here:** Because your backend's `QueryBuilder` produces the **identical** `{ data, meta }` shape for every module, your frontend `<Pagination>` component built once in Stage 3.3 works unchanged here. This is the payoff of consistent backend design.

## 4.4 — Toggle User Status — Business Rule in the UI

```typescript
// components/admin/UserRow.tsx
'use client';
export function UserRow({ user, currentAdminId }: { user: User; currentAdminId: string }) {
  const isSelf = user._id === currentAdminId;
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.role}</td>
      <td>
        <button disabled={isSelf} onClick={() => toggleUserStatusAction(user._id)}>
          {user.isActive ? "Deactivate" : "Activate"}
        </button>
        {/* disabled={isSelf} mirrors your backend rule: "Admin cannot disable themselves" */}
      </td>
    </tr>
  );
}
```

## 4.5 — System-Wide Tasks — Same Endpoint, Admin Sees Everyone

**Key backend fact to remember:** Your `getAllTasks` service already skips the `createdBy` filter when `userRole === ADMIN`. **No new endpoint needed** — the admin frontend calls the exact same `GET /tasks` your user dashboard uses; just add a "Created By" column since the admin needs to see whose task it is.

```typescript
// app/(admin)/admin/tasks/page.tsx — nearly identical to Stage 3.3's TasksPage,
// but the backend automatically returns ALL users' tasks because of the admin role check
```

## 4.6 — Category & Stats Management

Same `'use cache'` pattern (3.8) and parallel-fetch pattern (3.9) — reused directly for `/admin/categories` and `/admin/stats`.

**Checkpoint — Stage 4 Complete:** Full Admin Dashboard built almost entirely by **reusing** Stage 3 patterns — proof that a well-designed Server/Client Component architecture pays for itself.

---

# 🎁 STAGE 5 — Polish & Deploy

## 5.1 — SEO for Public Pages Only

```typescript
// app/(user)/layout.tsx and app/(admin)/layout.tsx
export const metadata = { robots: { index: false, follow: false } }; // keep dashboard out of Google
```

## 5.2 — Route Handlers (If Needed for a BFF Proxy)

**Docs to read:** [Route Handlers](https://nextjs.org/docs/app/api-reference/file-conventions/route)

Only needed if you want to hide your API URL/tokens from client bundles, or for webhook endpoints (Stripe/SSLCommerz).

```typescript
// app/api/webhooks/stripe/route.ts
export async function POST(request: Request) {
  const rawBody = await request.text(); // raw body needed for signature verification, same principle as your Express Stripe webhook comment
  // verify signature, process event
  return Response.json({ received: true });
}
```

## 5.3 — Optional: Payments & AI (Phase 7 equivalent)

Build these **after** Stages 1-4 are fully working — they're additive features (Task AI-suggestions via OpenAI Server Action, premium subscription via Stripe/SSLCommerz webhook).

## 5.4 — Deploy to Vercel

**Docs to read:** [Vercel Deployment](https://nextjs.org/docs/app/getting-started/deploying)

```bash
vercel --prod
```

Set all `.env.local` variables in the Vercel dashboard before deploying.

---

# 🗺️ Full Build Order Summary Table

| Stage | What You Build | Next.js Concepts Learned |
|---|---|---|
| 0 | Project setup | Turbopack, env vars, folder structure |
| 1 | Public site | Server Components, layouts, route groups, `next/image`, `next/font`, Metadata, loading/error states |
| 2 | Auth + role redirect | Client Components, Server Actions, `useActionState`, `useFormStatus`, Zod, `redirect()`, Proxy |
| 3 | User Dashboard | `searchParams`/`params` (async), Suspense/streaming, parallel fetching, composition pattern, Intercepting/Parallel Routes, `useOptimistic`, `'use cache'`, `cacheTag`/`cacheLife`, `updateTag`, Context, Socket.IO client |
| 4 | Admin Dashboard | Reuse of Stage 3 patterns + access control depth |
| 5 | Polish/Deploy | Route Handlers, SEO scoping, Vercel deployment |

---

## 🧠 The Discipline Going Forward

At every stage, before writing code:
1. **Which real TaskFlow screen am I building right now?**
2. **What's the minimum new Next.js concept this screen requires?**
3. Read that one doc section, implement it, connect it to your real backend endpoint.
4. Only then ask AI to review — not generate.

This sequence takes you from an empty Next.js project to the **complete TaskFlow product** — Public, User, and Admin — while ensuring every concept was learned by solving a real problem, not memorized from a list.

---

*TaskFlow — Complete Next.js 16 Build & Learn Guide*
*Companion: TaskFlow Backend Complete Modular Guide · TaskFlow SRS*
