import Link from "next/link";
import Navbar from "./_components/navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <section className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">
                Career Opportunities
              </p>
              <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-[-0.03em] text-foreground sm:text-6xl">
                Find Your Perfect <span className="text-primary">Career</span>
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Discover career opportunities from top companies. Search,
                filter, and apply to roles that match your skills and
                aspirations.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex-1 rounded-2xl border border-border bg-card p-3 shadow-sm shadow-black/5">
                <label className="sr-only" htmlFor="hero-search">
                  Search jobs
                </label>
                <div className="flex gap-2">
                  <input
                    id="hero-search"
                    type="text"
                    placeholder="Search by job title, company, or keywords..."
                    className="flex-1 rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <Button className="whitespace-nowrap" size="lg">
                    Search
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/jobs">
                <Button size="lg">Browse All Jobs</Button>
              </Link>
              <Link href="/jobs">
                <Button variant="outline" size="lg">
                  Post a Job
                </Button>
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { value: "500+", label: "Active Jobs" },
                { value: "200+", label: "Top Companies" },
                { value: "50K+", label: "Successful Placements" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-border/70 bg-card p-6 text-center shadow-sm shadow-black/5"
                >
                  <p className="text-3xl font-semibold text-foreground">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-primary px-8 py-12 text-white shadow-xl shadow-primary/20 sm:px-10">
            <p className="text-sm uppercase tracking-[0.35em] text-primary-foreground/80">
              Trusted by Job Seekers Worldwide
            </p>
            <h2 className="mt-5 text-4xl font-bold leading-tight">
              Ready to Advance Your Career?
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-primary-foreground/90">
              Discover hundreds of job opportunities from leading companies.
              Start your journey to your next role today.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/jobs">
                <Button size="lg">Explore Jobs</Button>
              </Link>
              <Link href="/jobs">
                <Button variant="outline" size="lg">
                  Post a Job
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
