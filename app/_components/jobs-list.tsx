import JobCard from "./job-card";
import { Job } from "../../lib/types";

interface JobsListProps {
  jobs: Job[];
  loading: boolean;
  onViewJob: (job: Job) => void;
}

export default function JobsList({ jobs, loading, onViewJob }: JobsListProps) {
  if (loading) {
    return (
      <div className="rounded-3xl border border-border/70 bg-card p-8 text-center text-sm text-muted-foreground">
        Loading jobs from db.json...
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="rounded-3xl border border-border/70 bg-card p-8 text-center text-sm text-muted-foreground">
        No jobs found matching your filter criteria.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          {...job}
          onView={() => onViewJob(job)}
          onApply={() => onViewJob(job)}
        />
      ))}
    </div>
  );
}
