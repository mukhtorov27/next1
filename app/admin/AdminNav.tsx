"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import useAdminStore from "../store/useAdminStore";

export default function AdminNav() {
  const router = useRouter();
  const logout = useAdminStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push("/admin");
  };

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      <Link
        href="/admin/jobs"
        className="rounded-full border border-border/70 bg-background px-4 py-2 text-foreground transition hover:bg-primary/10"
      >
        Jobs
      </Link>
      <Link
        href="/admin/create"
        className="rounded-full border border-border/70 bg-background px-4 py-2 text-foreground transition hover:bg-primary/10"
      >
        Create Job
      </Link>
      <Link
        href="/admin/applies"
        className="rounded-full border border-border/70 bg-background px-4 py-2 text-foreground transition hover:bg-primary/10"
      >
        Applications
      </Link>
      <button
        type="button"
        onClick={handleLogout}
        className="rounded-full border border-border/70 bg-destructive px-4 py-2 text-sm font-medium text-white transition hover:bg-destructive/90"
      >
        Logout
      </button>
    </div>
  );
}
