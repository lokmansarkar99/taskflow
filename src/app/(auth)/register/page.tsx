"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type RegisterForm = {
	name: string;
	email: string;
	password: string;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

export default function RegisterPage() {
	const [form, setForm] = useState<RegisterForm>({
		name: "",
		email: "",
		password: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	function updateField(field: keyof RegisterForm, value: string) {
		setForm((currentForm) => ({ ...currentForm, [field]: value }));
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsSubmitting(true);
		setMessage("");
		setError("");

		try {
			const response = await fetch(`${apiUrl?.replace(/\/$/, "") || "http://localhost:5000/api/v1"}/auth/register`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...form, role: "CLIENT" }),
			});
			const responseData = await response.json().catch(() => null);

			if (!response.ok) {
				throw new Error(
					responseData?.message ?? "Registration failed. Please check your details.",
				);
			}
			setMessage("Your account has been created successfully.");
			setForm({ name: "", email: "", password: "" });
		} catch (submitError) {
			setError(
				submitError instanceof Error
					? submitError.message
					: "Registration failed. Please try again.",
			);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4">
			<Card className="w-full max-w-md shadow-sm">
				<CardHeader className="space-y-1 text-center">
					<CardTitle className="text-2xl font-semibold tracking-tight">Create an account</CardTitle>
					<CardDescription>
						Enter your details below to create your account
					</CardDescription>
				</CardHeader>
				<form onSubmit={handleSubmit}>
					<CardContent className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								placeholder="John Doe"
								required
								type="text"
								value={form.name}
								onChange={(event) => updateField("name", event.target.value)}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								placeholder="m@example.com"
								required
								type="email"
								value={form.email}
								onChange={(event) => updateField("email", event.target.value)}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								placeholder="At least 8 characters"
								required
								minLength={8}
								type="password"
								value={form.password}
								onChange={(event) => updateField("password", event.target.value)}
							/>
						</div>

						{error && (
							<div className="text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-md">
								{error}
							</div>
						)}
						{message && (
							<div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 p-3 rounded-md">
								{message}
							</div>
						)}
					</CardContent>
					<CardFooter className="flex flex-col gap-4">
						<Button className="w-full font-medium" type="submit" disabled={isSubmitting}>
							{isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
							{isSubmitting ? "Creating account..." : "Create account"}
						</Button>
						<div className="text-center text-sm text-muted-foreground">
							Already have an account?{" "}
							<Link href="/login" className="underline underline-offset-4 hover:text-foreground transition-colors">
								Login
							</Link>
						</div>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
