import Link from "next/link";
import { Button } from "@/components/ui/button";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  salary: string;
  tags: string[];
  description: string;
}

export default function JobCard({
  title,
  company,
  location,
  salary,
  tags,
  description,
}: JobCardProps) {
  return (
    <article className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm shadow-black/5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary">{company}</p>
          <h3 className="mt-2 text-2xl font-semibold text-foreground">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 text-sm text-muted-foreground md:items-end">
          <span>{location}</span>
          <span>{salary}</span>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {tags.map((tag) => (
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
  );
}
