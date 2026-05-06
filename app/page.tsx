import Navbar from "./_components/navbar";
import HomeHero from "./_components/home-hero";
import HomeFeatures from "./_components/home-features";
import HomeStats from "./_components/home-stats";
import HomeCta from "./_components/home-cta";
import Footer from "./_components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <HomeHero />
        <div className="mt-16 space-y-10">
          <div className="text-center">
            <h2 className="text-4xl font-semibold text-foreground">
              Why Choose JobPortal?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              We’ve designed the most intuitive job search platform to help you
              find opportunities that align with your career goals.
            </p>
          </div>

          <HomeFeatures />
          <HomeStats />
          <HomeCta />
        </div>
      </main>
      <Footer />
    </div>
  );
}
