import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ResearchHero from "@/components/research/ResearchHero";
import PopularResearch from "@/components/research/PopularResearch";
import ResearchCategories from "@/components/research/ResearchCategories";
import LatestResearch from "@/components/research/LatestResearch";


const Research = () => {

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow p-4 md:p-8 mt-20 space-y-6">
        <section className="py-4">
          <ResearchHero />
        </section>

        <section className="py-4">
          <ResearchCategories />
        </section>

        <section className="py-2">
          <PopularResearch />
        </section>

        <section className="py-4">
          <LatestResearch />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Research;
