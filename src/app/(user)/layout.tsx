import { PublicNavbar } from "@/components/public/PublicNavbar";
import { logoutAction } from "@/lib/actions/auth.actions";
import { Button } from "@/components/ui/button";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <PublicNavbar />
      <main className="flex-1 bg-muted/10">{children}</main>
      <form action={logoutAction} className="fixed bottom-4 right-4 z-40">
        <Button type="submit" variant="outline" size="sm">Sign out</Button>
      </form>
    </div>
  );
}