"use client"

import Link from "next/link"
import { AlertTriangle, ArrowLeft, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"

type ErrorProps = {
    error: Error & { digest?: string }
    reset: () => void
}

export default function GlobalError({ error, reset }: ErrorProps) {
    return (
        <main className="flex min-h-[70vh] items-center justify-center bg-background px-4 py-16 sm:px-6">
            <section className="w-full max-w-xl text-center">
                <div className="mx-auto mb-8 flex size-16 items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/10 text-destructive shadow-sm">
                    <AlertTriangle className="size-8" aria-hidden="true" />
                </div>

                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    TaskFlow error
                </p>
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    We hit an unexpected snag
                </h1>
                <p className="mx-auto mt-4 max-w-md text-base leading-7 text-muted-foreground">
                    Something went wrong while loading this page. Try again, or return to
                    the TaskFlow home page.
                </p>

                <div className="mx-auto mt-8 max-w-lg rounded-xl border border-border bg-muted/40 px-4 py-3 text-left">
                      <p className="wrap-break-word font-mono text-xs leading-5 text-muted-foreground">
                        {error.message || "An unknown error occurred."}
                    </p>
                </div>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Button size="lg" onClick={reset}>
                        <RotateCcw aria-hidden="true" />
                        Try again
                    </Button>
                    <Button size="lg" variant="outline" render={<Link href="/" />}>
                        <ArrowLeft aria-hidden="true" />
                        Back to home
                    </Button>
                </div>
            </section>
        </main>
    )
}