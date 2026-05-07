import AdminNav from "./AdminNav";

export const metadata = {
  title: "Admin Dashboard | JobPortal",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/70 bg-card shadow-sm shadow-black/5">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Admin Panel
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-foreground">
              JobPortal Admin
            </h1>
          </div>
          <AdminNav />
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  );
}
