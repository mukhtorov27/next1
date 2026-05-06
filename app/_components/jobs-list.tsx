import JobCard from "./job-card";
import { jobs } from "./jobs-data";

export default function JobsList() {
  return (
    <div className="space-y-6">
      {jobs.map((job) => (
        <JobCard key={job.title} {...job} />
      ))}
    </div>
  );
}
