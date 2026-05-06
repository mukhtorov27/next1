import { Button } from "@/components/ui/button";

export default function JobsSidebar() {
  return (
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
  );
}
