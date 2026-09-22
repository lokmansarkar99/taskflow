import { PublicNavbar } from "@/components/public/PublicNavbar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <PublicNavbar />
      <main className="flex-1 bg-muted/10">{children}</main>
    </div>
  );
}