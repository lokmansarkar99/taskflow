import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, LayoutList, MessageSquare, BarChart3 } from "lucide-react";

const features = [
  {
    title: "Task Management",
    description: "Create, assign, and track tasks with priority, status, and precise scheduling.",
    icon: CheckSquare,
  },
  {
    title: "Categories & Tags",
    description: "Organize your workflow perfectly with color-coded categories and custom tags.",
    icon: LayoutList,
  },
  {
    title: "Threaded Comments",
    description: "Collaborate seamlessly with 2-level nested replies on every task.",
    icon: MessageSquare,
  },
  {
    title: "Powerful Analytics",
    description: "Track your team's productivity with rich, visual data and charts.",
    icon: BarChart3,
  },
];

export function FeatureHighlights() {
  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Features that empower you</h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Everything you need to manage your personal and professional projects, all in one place. Built for speed and focus.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <Card key={i} className="bg-background border-border/50 shadow-sm transition-all hover:shadow-md hover:border-border">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/5">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
