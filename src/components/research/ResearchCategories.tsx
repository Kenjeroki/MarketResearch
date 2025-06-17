import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const baseCategories = [
  { 
    id: 'e-commerce', 
    name: 'E-commerce', 
    icon: '/images/categories/E-commerce.png', 
    description: 'Онлайн ритейл, маркетплейси та цифрові тренди покупок'
  },
  { 
    id: 'fashion', 
    name: 'Fashion', 
    icon: '/images/categories/Fashion.png', 
    description: 'Мода, аксесуари та стійкий розвиток індустрії'
  },
  { 
    id: 'technology', 
    name: 'Technology', 
    icon: '/images/categories/Technology.png', 
    description: 'Електроніка, програмне забезпечення та ІТ послуги'
  },
  { 
    id: 'food', 
    name: 'Food', 
    icon: '/images/categories/Food.png', 
    description: 'Виробництво продуктів харчування та споживчі тренди'
  },
  { 
    id: 'automotive', 
    name: 'Automotive', 
    icon: '/images/categories/Automotive.png', 
    description: 'Автомобілі, електрокари та мобільні сервіси'
  },
  { 
    id: 'healthcare', 
    name: 'Healthcare', 
    icon: '/images/categories/Healthcare.png', 
    description: 'Медицина, фармацевтика та технології охорони здоров’я'
  },
  { 
    id: 'finance', 
    name: 'Finance', 
    icon: '/images/categories/Finance.png', 
    description: 'Банківські послуги, інвестиції та фінансові технології'
  },
  { 
    id: 'education', 
    name: 'Education', 
    icon: '/images/categories/Education.png', 
    description: 'Освіта, онлайн-курси та EdTech рішення'
  }
];

const ResearchCategories = () => {
  const [categoryCounts, setCategoryCounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => {
        const counts: { [key: string]: number } = {};
        data.categories?.forEach((cat: { slug: string; count: number }) => {
          counts[cat.slug] = cat.count;
        });
        setCategoryCounts(counts);
      });
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center justify-center sm:flex-row sm:justify-between mb-6">
        <h2 className="text-2xl font-bold text-market-blue mb-4 sm:mb-0">
          Галузі досліджень
        </h2>
        <Link to="/add-research">
          <Button
            variant="outline"
            className="text-market-lightBlue border-market-lightBlue hover:bg-market-lightBlue hover:text-white"
          >
            Додати дослідження
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {baseCategories.map((industry) => (
          <div 
            key={industry.id} 
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
          >
            <img 
              src={industry.icon} 
              alt={industry.name} 
              className="w-16 h-16 mb-4 object-contain"
            />
            <h3 className="text-lg font-bold text-market-blue mb-2">{industry.name}</h3>
            <p className="text-gray-500 text-sm mb-2">
              {categoryCounts[industry.name.toLowerCase()] ?? 0} досліджень
            </p>
            <p className="text-gray-600 text-sm mb-4">{industry.description}</p>
            <Link to={`/industries/${industry.id}`} className="w-full">
              <Button 
                variant="outline" 
                className="w-full text-market-lightBlue border-market-lightBlue hover:bg-market-lightBlue hover:text-white"
              >
                Переглянути галузь
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchCategories;
