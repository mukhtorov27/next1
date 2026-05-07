"use client";

import { useEffect, useMemo } from "react";
import Navbar from "../_components/navbar";
import JobsSidebar from "../_components/jobs-sidebar";
import JobsList from "../_components/jobs-list";
import useJobStore from "../store/useJobStore";

export default function JobsPage() {
  const jobs = useJobStore((state) => state.jobs);
  const search = useJobStore((state) => state.search);
  const category = useJobStore((state) => state.category);
  const jobType = useJobStore((state) => state.jobType);
  const loading = useJobStore((state) => state.loading);
  const selectedJob = useJobStore((state) => state.selectedJob);
  const applicantName = useJobStore((state) => state.applicantName);
  const applicantEmail = useJobStore((state) => state.applicantEmail);
  const applicantMessage = useJobStore((state) => state.applicantMessage);
  const applicationError = useJobStore((state) => state.applicationError);
  const applicationSuccess = useJobStore((state) => state.applicationSuccess);
  const submitting = useJobStore((state) => state.submitting);
  const setJobs = useJobStore((state) => state.setJobs);
  const setSearch = useJobStore((state) => state.setSearch);
  const setCategory = useJobStore((state) => state.setCategory);
  const setJobType = useJobStore((state) => state.setJobType);
  const setLoading = useJobStore((state) => state.setLoading);
  const setApplicantName = useJobStore((state) => state.setApplicantName);
  const setApplicantEmail = useJobStore((state) => state.setApplicantEmail);
  const setApplicantMessage = useJobStore((state) => state.setApplicantMessage);
  const setApplicationError = useJobStore((state) => state.setApplicationError);
  const setApplicationSuccess = useJobStore(
    (state) => state.setApplicationSuccess,
  );
  const setSubmitting = useJobStore((state) => state.setSubmitting);
  const openModal = useJobStore((state) => state.openModal);
  const closeModal = useJobStore((state) => state.closeModal);
  const resetFilters = useJobStore((state) => state.resetFilters);

  useEffect(() => {
    fetch("/api/jobs")
      .then((response) => response.json())
      .then((data) => {
        setJobs(data.jobs ?? []);
      })
      .finally(() => setLoading(false));
  }, [setJobs, setLoading]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearch(params.get("search") ?? "");
  }, [setSearch]);

  const categoryOptions = useMemo(
    () => [
      "All Categories",
      ...Array.from(new Set(jobs.map((job) => job.category))),
    ],
    [jobs],
  );

  const typeOptions = useMemo(
    () => ["All Types", ...Array.from(new Set(jobs.map((job) => job.type)))],
    [jobs],
  );

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = [
        job.title,
        job.company,
        job.location,
        job.description,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All Categories" || job.category === category;
      const matchesType = jobType === "All Types" || job.type === jobType;

      return matchesSearch && matchesCategory && matchesType;
    });
  }, [jobs, search, category, jobType]);

  const handleSubmitApplication = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setApplicationError("");
    setApplicationSuccess("");

    if (!selectedJob) {
      return;
    }

    if (!applicantName || !applicantEmail) {
      setApplicationError("Please provide your name and email.");
      return;
    }

    setSubmitting(true);

    const application = {
      name: applicantName,
      email: applicantEmail,
      message: applicantMessage,
      jobId: selectedJob.id,
      jobTitle: `${selectedJob.title} - ${selectedJob.company}`,
      appliedDate: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const response = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(application),
    });

    if (!response.ok) {
      const data = await response.json();
      setApplicationError(data.error || "Unable to submit application.");
      setSubmitting(false);
      return;
    }

    setApplicationSuccess("Application submitted successfully.");
    setSubmitting(false);
    setApplicantName("");
    setApplicantEmail("");
    setApplicantMessage("");

    setTimeout(() => {
      closeModal();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
          <JobsSidebar
            search={search}
            onSearch={setSearch}
            category={category}
            onCategory={setCategory}
            jobType={jobType}
            onJobType={setJobType}
            categories={categoryOptions}
            types={typeOptions}
            onReset={resetFilters}
          />

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
                  {loading
                    ? "Loading jobs..."
                    : `${filteredJobs.length} positions available`}
                </p>
              </div>
            </div>

            <JobsList
              jobs={filteredJobs}
              loading={loading}
              onViewJob={openModal}
            />
          </section>
        </section>
      </main>

      {selectedJob ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-card shadow-2xl">
            <div className="flex items-center justify-between border-b border-border/70 px-6 py-5">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                  {selectedJob.company}
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-foreground">
                  {selectedJob.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-full border border-border/70 bg-background px-4 py-2 text-sm text-foreground transition hover:bg-primary/10"
              >
                Close
              </button>
            </div>

            <div className="grid gap-6 px-6 py-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <div className="space-y-3 rounded-3xl border border-border/70 bg-background p-6">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="rounded-full bg-muted/70 px-3 py-1">
                      {selectedJob.category}
                    </span>
                    <span className="rounded-full bg-muted/70 px-3 py-1">
                      {selectedJob.type}
                    </span>
                    <span className="rounded-full bg-muted/70 px-3 py-1">
                      {selectedJob.location}
                    </span>
                  </div>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {selectedJob.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border/70 bg-card px-3 py-1 text-xs text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-border/70 bg-background p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                    Salary
                  </p>
                  <p className="mt-2 text-lg font-medium text-foreground">
                    {selectedJob.salary}
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-border/70 bg-background p-6 shadow-sm shadow-black/5">
                <div className="mb-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                    Apply for this role
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Fill out your details and submit your application below.
                  </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmitApplication}>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Full Name
                    </label>
                    <input
                      value={applicantName}
                      onChange={(event) => setApplicantName(event.target.value)}
                      className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Email
                    </label>
                    <input
                      value={applicantEmail}
                      onChange={(event) =>
                        setApplicantEmail(event.target.value)
                      }
                      type="email"
                      className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Message
                    </label>
                    <textarea
                      value={applicantMessage}
                      onChange={(event) =>
                        setApplicantMessage(event.target.value)
                      }
                      rows={4}
                      className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {applicationError ? (
                    <div className="rounded-2xl border border-destructive/70 bg-destructive/10 p-4 text-sm text-destructive">
                      {applicationError}
                    </div>
                  ) : null}

                  {applicationSuccess ? (
                    <div className="rounded-2xl border border-primary/70 bg-primary/10 p-4 text-sm text-primary">
                      {applicationSuccess}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? "Submitting..." : "Submit Application"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
