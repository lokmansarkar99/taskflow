import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-background px-4 text-center py-24">
      <div className="relative mb-10 flex h-40 w-40 items-center justify-center">
        {/* Soft background circles to fit the clean UI */}
        <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse"></div>
        <div className="absolute inset-6 rounded-full bg-primary/10"></div>
        
        {/* Animated Ghost icon floating */}
        <div className="relative animate-[bounce_3s_ease-in-out_infinite]">
          <Ghost className="h-16 w-16 text-primary" strokeWidth={1.5} />
        </div>
      </div>
      
      <h2 className="mb-3 text-4xl font-extrabold tracking-tight text-foreground">
        Lost in the void
      </h2>
      <p className="mb-8 max-w-[500px] text-lg text-muted-foreground">
        We couldn&apos;t find the page you were looking for. It might have been moved, deleted, or perhaps it never existed.
      </p>
      
      <Button
        size="lg"
        className="h-12 rounded-full px-8 text-base font-medium"
        render={<Link href="/" />}
      >
        Return Home
      </Button>
    </div>
  );
}
