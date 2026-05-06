import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border/70 bg-background/80 px-6 py-14 text-sm text-muted-foreground sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:justify-between">
        <div className="max-w-xs">
          <p className="text-base font-semibold text-foreground">
            About JobPortal
          </p>
          <p className="mt-4 leading-7">
            Your trusted platform for connecting with career opportunities.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:w-full lg:grid-cols-3">
          <div>
            <p className="text-base font-semibold text-foreground">
              Quick Links
            </p>
            <div className="mt-4 space-y-3 text-sm">
              <Link href="/jobs" className="block hover:text-foreground">
                Browse Jobs
              </Link>
              <Link href="/jobs" className="block hover:text-foreground">
                Post a Job
              </Link>
            </div>
          </div>

          <div>
            <p className="text-base font-semibold text-foreground">Contact</p>
            <p className="mt-4 text-sm">support@jobportal.com</p>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-border/70 pt-6 text-center text-xs text-muted-foreground">
        © 2024 JobPortal. All rights reserved.
      </div>
    </footer>
  );
}
