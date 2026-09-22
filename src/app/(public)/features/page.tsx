import type { Metadata } from "next";
import {
  BarChart3,
  CheckSquare,
  FolderKanban,
  MessageSquare,
  ShieldCheck,
  Zap,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Features | TaskFlow",
  description: "Plan work, collaborate clearly, and understand progress with TaskFlow.",
};

const features = [
  {
    title: "Focused task management",
    description: "Create clear work items with priorities, statuses, schedules, and ownership in one view.",
    icon: CheckSquare,
  },
  {
    title: "Flexible organization",
    description: "Use categories and tags to keep personal work, projects, and team responsibilities easy to scan.",
    icon: FolderKanban,
  },
  {
    title: "Context-rich collaboration",
    description: "Keep decisions close to the work with threaded comments and focused task conversations.",
    icon: MessageSquare,
  },
  {
    title: "Progress you can see",
    description: "Turn task activity into useful insights with status, priority, and productivity analytics.",
    icon: BarChart3,
  },
  {
    title: "Fast by default",
    description: "Move from planning to doing quickly with a quiet interface designed for repeated daily use.",
    icon: Zap,
  },
  {
    title: "Work with confidence",
    description: "Keep access and responsibilities clear as your workspace grows from personal projects to teams.",
    icon: ShieldCheck,
  },
];

export default function FeaturesPage() {
  return (
    <div>
      <section className="border-b border-border/60 bg-muted/20 px-4 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Built for momentum
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Everything your work needs to stay in motion
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            TaskFlow brings planning, collaboration, and progress into one calm workspace so your next action is always clear.
          </p>
        </div>
      </section>

      <section aria-labelledby="feature-list-heading" className="px-4 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <h2 id="feature-list-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
              A practical system for real work
            </h2>
            <p className="mt-3 text-muted-foreground">
              Each part of TaskFlow is designed to reduce the distance between knowing what matters and getting it done.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ title, description, icon: Icon }) => (
              <Card key={title} className="h-full bg-background shadow-sm">
                <CardHeader>
                  <div className="mb-2 flex size-11 items-center justify-center rounded-lg bg-muted text-foreground">
                    <Icon aria-hidden="true" className="size-5" />
                  </div>
                  <CardTitle className="text-xl">{title}</CardTitle>
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
