import { Search, Star, Sparkles, Zap } from "lucide-react";

const features = [
  {
    title: "Powerful Search",
    description:
      "Advanced filtering by job title, category, and more. Find exactly what you’re looking for in seconds.",
    icon: Search,
  },
  {
    title: "Curated Opportunities",
    description:
      "Carefully selected job postings from trusted companies across industries and experience levels.",
    icon: Star,
  },
  {
    title: "User-Friendly Interface",
    description:
      "Intuitive design makes job hunting simple and enjoyable. Browse, filter, and explore with ease.",
    icon: Sparkles,
  },
  {
    title: "Real-Time Updates",
    description:
      "Instant notifications for new job postings. Never miss an opportunity that matches your profile.",
    icon: Zap,
  },
];

export default function HomeFeatures() {
  return (
    <section className="grid gap-6 md:grid-cols-2">
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <div
            key={feature.title}
            className="rounded-3xl border border-border/70 bg-card p-8 shadow-sm shadow-black/5"
          >
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-muted text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-foreground">
              {feature.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {feature.description}
            </p>
          </div>
        );
      })}
    </section>
  );
}
