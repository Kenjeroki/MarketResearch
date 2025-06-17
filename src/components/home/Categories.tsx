import {
  ArrowRight,
  Smartphone,
  ShoppingBag,
  Car,
  Utensils,
  Home,
  Dumbbell,
  LampDesk,
  Heart,
  GraduationCap,
  BrainCircuit,
  Leaf,
  Factory,
  Rocket,
  Cloud,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

type Category = {
  name: string;
  slug: string;
  count: number;
};

const ICONS = [
  Smartphone,
  ShoppingBag,
  Car,
  Utensils,
  Home,
  Dumbbell,
  LampDesk,
  Heart,
  GraduationCap,
  BrainCircuit,
  Leaf,
  Factory,
  Rocket,
  Cloud,
  ShieldCheck,
];

const bgColors = [
  "bg-blue-50",
  "bg-purple-50",
  "bg-red-50",
  "bg-orange-50",
  "bg-green-50",
  "bg-teal-50",
  "bg-cyan-50",
];

const iconColors = [
  "text-blue-500",
  "text-purple-500",
  "text-red-500",
  "text-orange-500",
  "text-green-500",
  "text-teal-500",
  "text-cyan-500",
];

const Categories = () => {
  const { toast } = useToast();
  const { translate } = useLanguage();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []))
      .catch((err) => {
        console.error("Error fetching categories:", err);
        toast({
          title: "Помилка завантаження",
          description: "Не вдалося отримати список галузей",
        });
      });
  }, []);

  const handleCategoryClick = (category: string) => {
    toast({
      title: translate("categorySelected") || "Категорія вибрана",
      description: `${translate("viewingCategory") || "Перегляд"}: ${category}`,
    });
  };

  return (
    <section className="py-12 md:py-16 bg-white relative">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-market-blue">
            {translate("researchCategories") || "Галузі досліджень"}
          </h2>
          <Link
            to="/categories"
            className="text-market-lightBlue hover:text-market-blue flex items-center transition-colors"
          >
            <span className="mr-1">
              {translate("viewAllCategories") || "Переглянути всі"}
            </span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((category, index) => {
            const Icon = ICONS[index % ICONS.length];
            const bgColor = bgColors[index % bgColors.length];
            const iconColor = iconColors[index % iconColors.length];
            return (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                onClick={() => handleCategoryClick(category.name)}
              >
                <div
                  className={`${bgColor} rounded-lg p-4 h-full flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow duration-300`}
                >
                  <div className={`${iconColor} p-3 rounded-full bg-white mb-3`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="font-medium text-sm">{category.name}</span>
                  <span className="text-xs text-gray-500 mt-1">
                    {category.count} досліджень
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
