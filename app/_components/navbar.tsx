import Link from "next/link";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 text-lg font-semibold text-foreground"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            J
          </span>
          JobPortal
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm font-medium text-foreground/70 transition hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/jobs"
            className="text-sm font-medium text-foreground/70 transition hover:text-foreground"
          >
            Jobs
          </Link>
          <Link href="/jobs">
            <Button size="sm">Post a Job</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
