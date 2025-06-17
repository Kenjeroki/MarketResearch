import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import ResearchCard from "./ResearchCard";

interface Research {
  _id: string;
  title: string;
  image: string;
  views: number;
  category: string;
  region: string;
  date: string;
}

interface CarouselResearchWrapperProps {
  endpoint: string;
  dataKey: string;
  title: string;
}

const CarouselResearchWrapper: React.FC<CarouselResearchWrapperProps> = ({ endpoint, dataKey, title }) => {
  const [researchList, setResearchList] = useState<Research[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { favorites, addFavorite, removeFavorite, isAuthenticated } = useAuth();

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => setResearchList(data[dataKey] || []))
      .catch(err => console.error(`❌ Error fetching ${title}:`, err));
  }, [endpoint, dataKey, title]);

  const scrollPrev = () => {
    scrollContainerRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollNext = () => {
    scrollContainerRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-market-blue mb-6 text-center">
          {title}
        </h2>

        <div className="relative">
          <button
            onClick={scrollPrev}
            className="arrow-left z-10 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div
            ref={scrollContainerRef}
            className="overflow-x-auto flex gap-4 snap-x scroll-smooth px-4 no-scrollbar"
          >
            {researchList.map((item) => (
              <ResearchCard
                key={item._id}
                research={item}
                isAuthenticated={isAuthenticated}
                isFavorite={favorites.includes(item._id)}
                onToggleFavorite={() =>
                  favorites.includes(item._id)
                    ? removeFavorite(item._id)
                    : addFavorite(item._id)
                }
              />
            ))}
          </div>

          <button
            onClick={scrollNext}
            className="arrow-right z-10 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CarouselResearchWrapper;
