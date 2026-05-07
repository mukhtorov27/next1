"use client";

import Link from "next/link";
import { useEffect } from "react";
import AdminNav from "../AdminNav";
import ProtectedAdmin from "../ProtectedAdmin";
import useAdminStore from "../../store/useAdminStore";

export default function AdminJobsPage() {
  const jobs = useAdminStore((state) => state.jobs);
  const loading = useAdminStore((state) => state.jobsLoading);
  const error = useAdminStore((state) => state.jobsError);
  const loadJobs = useAdminStore((state) => state.loadJobs);
  const deleteJob = useAdminStore((state) => state.deleteJob);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this job posting?")) {
      return;
    }

    await deleteJob(id);
  };

  return (
    <ProtectedAdmin>
      <div className="space-y-6">
        <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm shadow-black/5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                Jobs Management
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-foreground">
                Manage all your job postings
              </h2>
            </div>
            <Link
              href="/admin/create"
              className="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Create New Job
            </Link>
          </div>
        </div>

        {error ? (
          <div className="rounded-3xl border border-destructive/70 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        ) : null}

        <div className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm shadow-black/5">
          <div className="border-b border-border/70 bg-background px-6 py-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                  All Jobs
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {loading
                    ? "Loading jobs..."
                    : `${jobs.length} active postings`}
                </p>
              </div>
            </div>
          </div>

          <div className="min-w-full overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-muted/50 text-left text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} className="border-t border-border/70">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-foreground">
                        {job.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {job.location}
                      </div>
                    </td>
                    <td className="px-6 py-4">{job.company}</td>
                    <td className="px-6 py-4">{job.category}</td>
                    <td className="px-6 py-4">{job.type}</td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => handleDelete(job.id)}
                        className="rounded-2xl bg-destructive px-4 py-2 text-sm font-medium text-white transition hover:bg-destructive/90"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ProtectedAdmin>
  );
}
