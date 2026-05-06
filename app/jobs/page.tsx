import Link from "next/link";
import Navbar from "../_components/navbar";
import { Button } from "@/components/ui/button";

const jobs = [
  {
    title: "Senior Frontend Engineer",
    company: "TechCorp",
    location: "Remote",
    salary: "$110,000 - $140,000",
    tags: ["React", "TypeScript", "Remote"],
    description:
      "Build modern interfaces and collaborate with design and product teams to deliver polished web experiences.",
  },
  {
    title: "UX/UI Designer",
    company: "DesignStudio",
    location: "New York, NY",
    salary: "$90,000 - $110,000",
    tags: ["Figma", "User Research", "Product"],
    description:
      "Create intuitive product experiences for web and mobile, working closely with developers and stakeholders.",
  },
  {
    title: "Digital Marketing Manager",
    company: "MarketWave",
    location: "Los Angeles, CA",
    salary: "$95,000 - $120,000",
    tags: ["SEO", "Analytics", "Campaigns"],
    description:
      "Lead marketing growth initiatives across channels and drive measurable performance for product launches.",
  },
];

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm shadow-black/5">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Filter Jobs
            </p>
            <h1 className="mt-4 text-3xl font-semibold text-foreground">
              Search by keyword
            </h1>
            <div className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Job title, company, or keywords"
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <select className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20">
                <option>All Categories</option>
                <option>Engineering</option>
                <option>Design</option>
                <option>Marketing</option>
              </select>
              <Button className="w-full" size="lg">
                Apply Filter
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                Reset Filters
              </Button>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm shadow-black/5">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                    Available Jobs
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold text-foreground">
                    Find your next opportunity
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  {jobs.length} positions available
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {jobs.map((job) => (
                <article
                  key={job.title}
                  className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm shadow-black/5"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-primary">
                        {job.company}
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold text-foreground">
                        {job.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        {job.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-start gap-2 text-sm text-muted-foreground md:items-end">
                      <span>{job.location}</span>
                      <span>{job.salary}</span>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border/70 bg-background px-3 py-1 text-xs text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Button variant="secondary" size="sm">
                      View Details
                    </Button>
                    <Link
                      href="/"
                      className="text-sm font-medium text-primary hover:text-primary/80"
                    >
                      Save job
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
