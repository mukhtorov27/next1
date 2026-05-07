"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import ProtectedAdmin from "../ProtectedAdmin";
import useAdminStore from "../../store/useAdminStore";

export default function AdminCreatePage() {
  const router = useRouter();
  const title = useAdminStore((state) => state.title);
  const company = useAdminStore((state) => state.company);
  const location = useAdminStore((state) => state.location);
  const salary = useAdminStore((state) => state.salary);
  const category = useAdminStore((state) => state.category);
  const type = useAdminStore((state) => state.type);
  const description = useAdminStore((state) => state.description);
  const tags = useAdminStore((state) => state.tags);
  const error = useAdminStore((state) => state.createError);
  const status = useAdminStore((state) => state.createStatus);
  const setTitle = useAdminStore((state) => state.setTitle);
  const setCompany = useAdminStore((state) => state.setCompany);
  const setLocation = useAdminStore((state) => state.setLocation);
  const setSalary = useAdminStore((state) => state.setSalary);
  const setCategory = useAdminStore((state) => state.setCategory);
  const setType = useAdminStore((state) => state.setType);
  const setDescription = useAdminStore((state) => state.setDescription);
  const setTags = useAdminStore((state) => state.setTags);
  const createJob = useAdminStore((state) => state.createJob);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const success = await createJob();
    if (success) {
      router.push("/admin/jobs");
    }
  };

  return (
    <ProtectedAdmin>
      <div className="space-y-6">
        <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm shadow-black/5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                Create Job
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-foreground">
                Add a new job posting
              </h2>
            </div>
            <Link
              href="/admin/jobs"
              className="rounded-2xl border border-border/70 bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-primary/10"
            >
              ← Back to Jobs
            </Link>
          </div>
        </div>

        {error ? (
          <div className="rounded-3xl border border-destructive/70 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        ) : null}

        {status ? (
          <div className="rounded-3xl border border-primary/70 bg-primary/10 p-4 text-sm text-primary">
            {status}
          </div>
        ) : null}

        <form
          className="grid gap-6 rounded-3xl border border-border/70 bg-card p-6 shadow-sm shadow-black/5"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-foreground">
              Job Title *
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-foreground">
              Company *
              <input
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-foreground">
              Location *
              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-foreground">
              Salary (Optional)
              <input
                value={salary}
                onChange={(event) => setSalary(event.target.value)}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-foreground">
              Category
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option>Technology</option>
                <option>Design</option>
                <option>Marketing</option>
                <option>Sales</option>
                <option>Finance</option>
                <option>Other</option>
              </select>
            </label>
            <label className="space-y-2 text-sm font-medium text-foreground">
              Job Type
              <select
                value={type}
                onChange={(event) => setType(event.target.value)}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Remote</option>
                <option>Contract</option>
              </select>
            </label>
          </div>

          <label className="space-y-2 text-sm font-medium text-foreground">
            Description *
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={6}
              className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-foreground">
            Requirements (comma-separated)
            <input
              value={tags}
              onChange={(event) => setTags(event.target.value)}
              placeholder="e.g., React, TypeScript, 5+ years experience, Node.js"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            Add Job
          </button>
        </form>
      </div>
    </ProtectedAdmin>
  );
}
