export function PublicFooter() {
  return (
    <footer className="border-t border-border/40 py-6 md:py-0">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4">
        <p className="text-sm leading-loose text-muted-foreground text-center md:text-left">
          Built as part of the TaskFlow Next.js Learning Guide.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a href="#" className="hover:underline underline-offset-4">Terms</a>
          <a href="#" className="hover:underline underline-offset-4">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
