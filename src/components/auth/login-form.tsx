"use client";

import Link from "next/link";
import { Check, CheckCircle2, Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction } from "@/lib/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button className="h-11 w-full" disabled={pending} type="submit">
            {pending ? "Signing in..." : "Sign in"}
            {!pending && <Check aria-hidden="true" />}
        </Button>
    );
}

export default function LoginForm() {
    const [state, formAction] = useActionState(loginAction, null);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <main className="min-h-screen bg-muted/30 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl items-center justify-center">
                <div className="grid w-full overflow-hidden rounded-2xl border border-border bg-background shadow-xl shadow-foreground/5 lg:grid-cols-[0.9fr_1.1fr]">
                    <aside className="relative hidden overflow-hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
                        <Link href="/" className="relative inline-flex items-center gap-2 text-sm font-semibold tracking-tight">
                            <CheckCircle2 aria-hidden="true" className="size-6" />
                            TaskFlow
                        </Link>
                        <div className="relative max-w-sm">
                            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground/60">Welcome back</p>
                            <h1 className="text-4xl font-semibold leading-tight tracking-tight">Pick up where good work begins.</h1>
                            <p className="mt-5 text-sm leading-6 text-primary-foreground/70">Your tasks, priorities, and next steps are ready when you are.</p>
                        </div>
                        <p className="relative text-sm text-primary-foreground/70">A calmer way to work.</p>
                    </aside>

                    <section className="flex items-center justify-center p-6 sm:p-10 lg:p-14">
                        <div className="w-full max-w-md">
                            <div className="mb-8 lg:hidden">
                                <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight">
                                    <CheckCircle2 aria-hidden="true" className="size-6" />
                                    TaskFlow
                                </Link>
                            </div>
                            <div className="mb-8">
                                <h2 className="text-3xl font-semibold tracking-tight">Welcome back</h2>
                                <p className="mt-2 text-sm leading-6 text-muted-foreground">Sign in to continue managing your work.</p>
                            </div>

                            <form action={formAction} className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email address</Label>
                                    <Input id="email" name="email" type="email" placeholder="you@company.com" autoComplete="email" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required className="pr-11" />
                                        <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((visible) => !visible)}>
                                            {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                                        </Button>
                                    </div>
                                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><LockKeyhole aria-hidden="true" className="size-3.5" />Your password is sent only to the backend login endpoint.</p>
                                </div>

                                {state?.message && <p aria-live="polite" className="text-sm text-destructive">{state.message}</p>}
                                <SubmitButton />
                            </form>

                            <p className="mt-7 text-center text-sm text-muted-foreground">New to TaskFlow? <Link href="/register" className="font-medium text-foreground underline underline-offset-4 hover:text-foreground/70">Create an account</Link></p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}