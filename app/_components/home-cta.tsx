import Link from "next/link";

const trustedStats = [
  { value: "500+", label: "Active Job Listings" },
  { value: "200+", label: "Top Companies" },
  { value: "50K+", label: "Successful Placements" },
  { value: "98%", label: "User Satisfaction" },
];

export default function HomeCta() {
  return (
    <section className="mt-16 rounded-[2rem] bg-primary px-6 py-16 text-white shadow-xl shadow-primary/20 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-primary-foreground/80">
          Trusted by Job Seekers Worldwide
        </p>
        <h2 className="mt-6 text-5xl font-bold tracking-[-0.03em] sm:text-6xl">
          Ready to Advance Your Career?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-primary-foreground/90 sm:text-base">
          Discover hundreds of job opportunities from leading companies. Start
          your journey to your next role today.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/jobs"
            className="inline-flex rounded-2xl bg-background px-6 py-3 text-sm font-semibold text-primary shadow-sm shadow-black/10 transition hover:bg-white/90"
          >
            Explore Jobs
          </Link>
          <Link
            href="/jobs"
            className="inline-flex rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            Post a Job
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustedStats.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-white/10 bg-white/5 px-6 py-8 text-center shadow-sm shadow-black/10"
            >
              <p className="text-3xl font-semibold">{item.value}</p>
              <p className="mt-3 text-sm text-primary-foreground/80">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
