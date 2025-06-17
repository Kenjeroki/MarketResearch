import { useEffect, useState } from "react";

interface Research {
  id: string;
  title: string;
  category: string;
  region: string;
  date: string;
  shortDescription: string;
  imageUrl: string;
  popularityScore?: number;
}

const baseCategories = [
  { id: 'e-commerce', name: 'E-commerce' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'technology', name: 'Technology' },
  { id: 'food', name: 'Food' },
  { id: 'automotive', name: 'Automotive' },
  { id: 'healthcare', name: 'Healthcare' },
  { id: 'finance', name: 'Finance' },
  { id: 'education', name: 'Education' },
];

export function useIndustryData(slug: string | undefined) {
  const [data, setData] = useState<Research[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [industryName, setIndustryName] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const category = baseCategories.find((c) => c.id === slug);
    if (!category) {
      setIsLoading(false);
      return;
    }

    setIndustryName(category.name);

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:3000/research?category=${encodeURIComponent(category.name)}`);
        const json = await res.json();
        setData(json.research || []);
      } catch (error) {
        console.error("Помилка завантаження досліджень:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  return {
    data,
    isLoading,
    industryName
  };
}
