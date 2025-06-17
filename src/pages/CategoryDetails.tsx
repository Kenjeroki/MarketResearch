
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import ResearchCard from '@/components/research/ResearchCard';

type Research = {
  _id: string;
  title: string;
  category: string;
  region: string;
  date: string;
  image: string;
  description: string;
};

const CategoryDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<Research[]>([]);
  const { toast } = useToast();
  const { translate } = useLanguage();

  useEffect(() => {
    fetch(`http://localhost:3000/research?category=${slug?.replace(/-/g, ' ')}`)
      .then(res => res.json())
      .then(setData)
      .catch(err => {
        console.error(err);
        toast({
          title: "Помилка",
          description: "Не вдалося завантажити дослідження",
        });
      });
  }, [slug]);

  return (
    <>
      <Header />
      <main className="container-custom py-10">
        <h1 className="text-3xl font-bold text-market-blue capitalize mb-6">{slug?.replace(/-/g, ' ')}</h1>
        {data.length === 0 ? (
          <p className="text-gray-500">Немає досліджень у цій категорії.</p>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {data.map((item) => (
              <ResearchCard key={item._id} research={item} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default CategoryDetails;
