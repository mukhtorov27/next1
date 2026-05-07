"use client";

import { Button } from "@/components/ui/button";

interface JobsSidebarProps {
  search: string;
  onSearch: (value: string) => void;
  category: string;
  onCategory: (value: string) => void;
  jobType: string;
  onJobType: (value: string) => void;
  categories: string[];
  types: string[];
  onReset: () => void;
}

export default function JobsSidebar({
  search,
  onSearch,
  category,
  onCategory,
  jobType,
  onJobType,
  categories,
  types,
  onReset,
}: JobsSidebarProps) {
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
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Job title, company, or keywords"
          className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <select
          value={category}
          onChange={(event) => onCategory(event.target.value)}
          className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          {categories.map((categoryOption) => (
            <option key={categoryOption} value={categoryOption}>
              {categoryOption}
            </option>
          ))}
        </select>
        <select
          value={jobType}
          onChange={(event) => onJobType(event.target.value)}
          className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          {types.map((typeOption) => (
            <option key={typeOption} value={typeOption}>
              {typeOption}
            </option>
          ))}
        </select>
        
        <Button
          className="w-full"
          size="lg"
          onClick={onReset}
        >
          Reset Filters
        </Button>
      </div>
    </aside>
  );
}
