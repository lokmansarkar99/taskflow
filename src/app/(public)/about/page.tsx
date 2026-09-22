import type { Metadata } from "next";
import { Compass, HeartHandshake, Target } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About | TaskFlow",
  description: "Learn why TaskFlow is built to make focused work easier.",
};

const principles = [
  {
    title: "Clarity over clutter",
    description: "Good tools make the important thing easier to see. TaskFlow keeps work structured without making it feel heavy.",
    icon: Compass,
  },
  {
    title: "Progress over performance",
    description: "We measure success by helping people move meaningful work forward, not by adding more noise to their day.",
    icon: Target,
  },
  {
    title: "People stay in control",
    description: "Teams should understand their work, their responsibilities, and their progress at a glance.",
    icon: HeartHandshake,
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-border/60 bg-muted/20 px-4 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">About TaskFlow</p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Make the work clearer, then make progress.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            TaskFlow is a focused task-management workspace for people and teams who want less time organizing work and more time doing it.
          </p>
        </div>
      </section>

      <section aria-labelledby="principles-heading" className="px-4 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <h2 id="principles-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">What guides the product</h2>
            <p className="mt-3 text-muted-foreground">The best productivity system is one people can understand and return to every day.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {principles.map(({ title, description, icon: Icon }) => (
              <Card key={title} className="h-full">
                <CardHeader>
                  <div className="mb-2 flex size-11 items-center justify-center rounded-lg bg-muted">
                    <Icon aria-hidden="true" className="size-5" />
                  </div>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">{description}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
