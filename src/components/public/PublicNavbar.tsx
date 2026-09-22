import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { CheckCircle2 } from "lucide-react";

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center mx-auto px-4">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <CheckCircle2 className="h-6 w-6" />
            <span className="font-bold sm:inline-block">TaskFlow</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/task" className="transition-colors hover:text-foreground/80 text-foreground/60">Task</Link>
            <Link href="/features" className="transition-colors hover:text-foreground/80 text-foreground/60">Features</Link>
            <Link href="/pricing" className="transition-colors hover:text-foreground/80 text-foreground/60">Pricing</Link>
            <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">About</Link>
            <Link href="/contact" className="transition-colors hover:text-foreground/80 text-foreground/60">Contact</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search could go here */}
          </div>
          <nav className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" render={<Link href="/login" />}>
              Login
            </Button>
            <Button size="sm" render={<Link href="/register" />}>
              Register
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
