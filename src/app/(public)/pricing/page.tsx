import Link from "next/link";
import type { Metadata } from "next";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Pricing | TaskFlow",
  description: "Choose the TaskFlow plan that fits the way you work.",
};

const plans = [
  {
    name: "Starter",
    description: "A simple home for personal priorities.",
    price: "Free",
    action: "Start free",
    featured: false,
    benefits: ["Unlimited personal tasks", "Categories and priorities", "Basic progress overview"],
  },
  {
    name: "Team",
    description: "Shared clarity for growing teams.",
    price: "$9",
    action: "Choose Team",
    featured: true,
    benefits: ["Everything in Starter", "Shared projects and ownership", "Comments and team analytics"],
  },
  {
    name: "Scale",
    description: "More control for complex operations.",
    price: "$19",
    action: "Talk to us",
    featured: false,
    benefits: ["Everything in Team", "Advanced workspace insights", "Priority support and controls"],
  },
];

export default function PricingPage() {
  return (
    <div>
      <section className="border-b border-border/60 bg-muted/20 px-4 py-16 text-center sm:py-20 lg:py-24">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Simple plans</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">A plan for your next stage</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          Start with the essentials and add more structure when your work calls for it. No complicated setup required.
        </p>
      </section>

      <section aria-labelledby="plans-heading" className="px-4 py-16 sm:py-20 lg:py-24">
        <h2 id="plans-heading" className="sr-only">TaskFlow plans</h2>
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className={plan.featured ? "relative border-foreground shadow-md" : "relative"}>
              {plan.featured && (
                <p className="absolute right-5 top-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Most popular
                </p>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="min-h-10">{plan.description}</CardDescription>
                <p className="pt-5 text-4xl font-bold tracking-tight">
                  {plan.price}
                  {plan.price !== "Free" && <span className="text-sm font-normal text-muted-foreground"> / month</span>}
                </p>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-3 text-sm text-muted-foreground">
                  {plan.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2">
                      <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-foreground" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.featured ? "default" : "outline"} render={<Link href="/register" />}>
                  {plan.action}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
