import Navbar from "../_components/navbar";
import JobsSidebar from "../_components/jobs-sidebar";
import JobsList from "../_components/jobs-list";
import { jobs } from "../_components/jobs-data";

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
          <JobsSidebar />

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

            <JobsList />
          </section>
        </section>
      </main>
    </div>
  );
}
