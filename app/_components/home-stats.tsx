const stats = [
  { value: "500+", label: "Active Jobs" },
  { value: "200+", label: "Top Companies" },
  { value: "50K+", label: "Successful Placements" },
];

export default function HomeStats() {
  return (
    <section className="grid gap-4 sm:grid-cols-3">
      {stats.map((item) => (
        <div
          key={item.label}
          className="rounded-3xl border border-border/70 bg-card p-6 text-center shadow-sm shadow-black/5"
        >
          <p className="text-3xl font-semibold text-foreground">{item.value}</p>
          <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
        </div>
      ))}
    </section>
  );
}
