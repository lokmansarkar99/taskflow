'use client'

import Link from "next/link"
import { Check, CheckCircle2, Eye, EyeOff, LockKeyhole, Sparkles } from "lucide-react"
import { useActionState, useState } from "react"
import { useFormStatus } from "react-dom"
import { registerAction } from "@/lib/actions/auth.actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function SubmitButton() {
	const { pending } = useFormStatus()

	return (
		<Button className="h-11 w-full" disabled={pending} type="submit">
			{pending ? "Creating your account..." : "Create account"}
			{!pending && <Check aria-hidden="true" />}
		</Button>
	)
}

export default function RegisterPage() {
	const [state, formAction] = useActionState(registerAction, null)
	const [showPassword, setShowPassword] = useState(false)

	return (
		<main className="min-h-screen bg-muted/30 px-4 py-6 sm:px-6 lg:px-8">
			<div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl items-center justify-center">
				<div className="grid w-full overflow-hidden rounded-2xl border border-border bg-background shadow-xl shadow-foreground/5 lg:grid-cols-[0.9fr_1.1fr]">
					<aside className="relative hidden overflow-hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
						<div className="absolute -right-20 -top-20 size-64 rounded-full border border-primary-foreground/10" />
						<div className="absolute -bottom-32 -left-24 size-72 rounded-full border border-primary-foreground/10" />

						<div className="relative">
							<Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight">
								<CheckCircle2 aria-hidden="true" className="size-6" />
								TaskFlow
							</Link>
							<div className="mt-24 max-w-sm">
								<p className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground/60">
									<Sparkles aria-hidden="true" className="size-3.5" />
									A calmer way to work
								</p>
								<h1 className="text-4xl font-semibold leading-tight tracking-tight">
									Make room for meaningful progress.
								</h1>
								<p className="mt-5 text-sm leading-6 text-primary-foreground/70">
									Bring your tasks, priorities, and next steps into one clear place your whole team can trust.
								</p>
							</div>
						</div>

						<div className="relative space-y-3 text-sm text-primary-foreground/75">
							{["Organize work without the noise", "See what matters next", "Keep momentum visible"].map((item) => (
								<div key={item} className="flex items-center gap-3">
									<span className="flex size-5 items-center justify-center rounded-full bg-primary-foreground/15">
										<Check aria-hidden="true" className="size-3" />
									</span>
									{item}
								</div>
							))}
						</div>
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
								
								<h2 className="text-3xl font-semibold tracking-tight">Create your account</h2>
								<p className="mt-2 text-sm leading-6 text-muted-foreground">
									Set up your workspace in less than a minute.
								</p>
							</div>

							<form action={formAction} className="space-y-5">
								<div className="space-y-2">
									<Label htmlFor="name">Your name</Label>
									<Input id="name" name="name" placeholder="Alex Morgan" autoComplete="name" required />
								</div>

								<div className="space-y-2">
									<Label htmlFor="email">Email address</Label>
									<Input id="email" name="email" type="email" placeholder="alex@company.com" autoComplete="email" required />
								</div>

								<div className="space-y-2">
									<Label htmlFor="password">Password</Label>
									<div className="relative">
										<Input
											id="password"
											name="password"
											type={showPassword ? "text" : "password"}
											placeholder="At least 8 characters"
											autoComplete="new-password"
											minLength={8}
											className="pr-11"
											required
										/>
										<Button
											type="button"
											variant="ghost"
											size="icon"
											className="absolute right-1 top-1/2 -translate-y-1/2"
											aria-label={showPassword ? "Hide password" : "Show password"}
											onClick={() => setShowPassword((visible) => !visible)}
										>
											{showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
										</Button>
									</div>
									<p className="flex items-center gap-1.5 text-xs text-muted-foreground">
										<LockKeyhole aria-hidden="true" className="size-3.5" />
										Use 8 or more characters for a stronger password.
									</p>
								</div>

								{state?.message && (
									<p
										aria-live="polite"
										className={state.success ? "flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400" : "text-sm text-destructive"}
									>
										{state.success && <CheckCircle2 aria-hidden="true" className="size-4" />}
										{state.message}
									</p>
								)}

								<SubmitButton />
							</form>

							<p className="mt-7 text-center text-sm text-muted-foreground">
								Already have an account?{" "}
								<Link href="/login" className="font-medium text-foreground underline underline-offset-4 hover:text-foreground/70">
									Sign in
								</Link>
							</p>
						</div>
					</section>
				</div>
			</div>
		</main>
	)
}