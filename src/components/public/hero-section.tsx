import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32 bg-background">
      {/* Subtle grid background for the dub.co style tech look */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="container relative mx-auto px-4 text-center">
        <div className="mx-auto flex max-w-screen-md flex-col items-center gap-6">
          <div className="inline-flex items-center rounded-full border border-border/50 bg-muted/50 px-3 py-1 text-sm font-medium transition-colors hover:bg-muted/80">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            TaskFlow is now live
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
            Manage Tasks. <br className="hidden sm:block" />
            Track Progress. <br className="hidden sm:block" />
            Stay Organized.
          </h1>
          
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            The all-in-one productivity tool designed to help you and your team stay on top of everything. Simple, fast, and beautifully designed.
          </p>
          
          <div className="mt-4 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <Button size="lg" className="h-12 w-full rounded-full px-8 text-base shadow-sm sm:w-auto" render={<Link href="/register" />}>
              Get Started <ArrowRight aria-hidden="true" className="ml-2 size-4" />
            </Button>
            <Button variant="outline" size="lg" className="h-12 w-full rounded-full px-8 text-base sm:w-auto" render={<Link href="/features" />}>
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
