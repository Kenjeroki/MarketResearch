import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowLeft } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { useIndustryData } from '@/hooks/use-industry-data';
import ResearchCard from '@/components/research/ResearchCard';

interface Research {
  _id: string;
  title: string;
  image: string;
  category: string;
  region: string;
  date: string;
  shortDescription?: string;
}

const industryDescriptions: Record<string, string> = {
  "e-commerce": "Онлайн ритейл, маркетплейси та цифрові тренди покупок",
  "fashion": "Мода, аксесуари та стійкий розвиток індустрії",
  "technology": "Електроніка, програмне забезпечення та ІТ послуги",
  "food": "Виробництво продуктів харчування та споживчі тренди",
  "automotive": "Автомобілі, електрокари та мобільні сервіси",
  "healthcare": "Медицина, фармацевтика та технології охорони здоров’я",
  "finance": "Банківські послуги, інвестиції та фінансові технології",
  "education": "Освіта, онлайн-курси та EdTech рішення"
};

const IndustryPage = () => {
  const { industry } = useParams<{ industry: string }>();
  const { translate } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, industryName } = useIndustryData(industry);

  const researchData: Research[] = Array.isArray(data) ? (data as unknown as Research[]) : [];

  const filteredResearch = researchData.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (item.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto pt-28">
          <p className="text-center text-gray-500">Завантаження...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto pt-10 pb-16">
        <div className="mb-6">
          <Link to="/research">
            <Button variant="ghost" className="flex items-center text-market-blue hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" /> Повернутися
            </Button>
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-market-blue mb-4">{industryName}</h1>
        {industry && industryDescriptions[industry.toLowerCase()] && (
          <p className="text-gray-600 text-base mb-6">
            {industryDescriptions[industry.toLowerCase()]}
          </p>
        )}

        <form onSubmit={handleSearch} className="flex gap-4 mb-6">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Пошук у ${industryName}`}
            className="flex-grow"
          />
          <Button type="submit">
            <Search className="w-4 h-4 mr-2" /> Пошук
          </Button>
        </form>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {filteredResearch.map((item) => (
            <ResearchCard key={item._id} research={item} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default IndustryPage;
