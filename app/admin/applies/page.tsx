"use client";

import { useEffect, useState } from "react";
import ProtectedAdmin from "../ProtectedAdmin";
import useAdminStore from "../../store/useAdminStore";
import { Application } from "../../../lib/types";

export default function AdminApplicationsPage() {
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const applications = useAdminStore((state) => state.applications);
  const loading = useAdminStore((state) => state.appsLoading);
  const error = useAdminStore((state) => state.appsError);
  const loadApplications = useAdminStore((state) => state.loadApplications);
  const deleteApplication = useAdminStore((state) => state.deleteApplication);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  const handleDelete = async (id: number) => {
    if (!confirm("Remove this application?")) {
      return;
    }

    await deleteApplication(id);
  };

  const handleView = (application: Application) => {
    setSelectedApplication(application);
  };

  const handleCloseModal = () => {
    setSelectedApplication(null);
  };

  return (
    <ProtectedAdmin>
      <div className="space-y-6">
        <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm shadow-black/5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                Job Applications
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-foreground">
                Review and manage applications
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              {loading
                ? "Loading applications..."
                : `${applications.length} total`}
            </p>
          </div>
        </div>

        {error ? (
          <div className="rounded-3xl border border-destructive/70 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        ) : null}

        {selectedApplication ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
            <div className="w-full max-w-xl rounded-3xl border border-border/70 bg-card p-6 shadow-2xl shadow-black/20">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                    Application Details
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-foreground">
                    {selectedApplication.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded-full border border-border/70 bg-background px-3 py-2 text-sm font-medium text-foreground transition hover:bg-primary/10"
                >
                  Close
                </button>
              </div>

              <div className="mt-6 space-y-4 text-sm text-foreground">
                <div>
                  <span className="font-semibold">Email:</span>{" "}
                  {selectedApplication.email}
                </div>
                <div>
                  <span className="font-semibold">Job:</span>{" "}
                  {selectedApplication.jobTitle}
                </div>
                <div>
                  <span className="font-semibold">Applied:</span>{" "}
                  {selectedApplication.appliedDate}
                </div>
                <div>
                  <span className="font-semibold">Message:</span>
                  <p className="mt-2 rounded-2xl border border-border/70 bg-background p-4">
                    {selectedApplication.message ?? "No message provided."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm shadow-black/5">
          <div className="min-w-full overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-muted/50 text-left text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Job</th>
                  <th className="px-6 py-4">Applied Date</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr
                    key={application.id}
                    className="border-t border-border/70"
                  >
                    <td className="px-6 py-4">{application.name}</td>
                    <td className="px-6 py-4">{application.email}</td>
                    <td className="px-6 py-4">{application.jobTitle}</td>
                    <td className="px-6 py-4">{application.appliedDate}</td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        type="button"
                        onClick={() => handleView(application)}
                        className="rounded-2xl border border-border/70 bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:bg-primary/10"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(application.id)}
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
