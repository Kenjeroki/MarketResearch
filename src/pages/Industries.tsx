
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const industries = [
  {
    id: 'e-commerce',
    name: 'E-commerce',
    icon: '/images/categories/E-commerce.png',
    count: 15,
    description: 'Online retail, marketplaces, and digital shopping trends'
  },
  {
    id: 'fashion',
    name: 'Fashion',
    icon: '/images/categories/Fashion.png',
    count: 8,
    description: 'Clothing, accessories, sustainable fashion, and retail trends'
  },
  {
    id: 'technology',
    name: 'Technology',
    icon: '/images/categories/Technology.png',
    count: 12,
    description: 'Consumer electronics, software, telecommunications, and IT services'
  },
  {
    id: 'food',
    name: 'Food',
    icon: '/images/categories/Food.png',
    count: 9,
    description: 'Food production, distribution, restaurants, and consumption trends'
  },
  {
    id: 'automotive',
    name: 'Automotive',
    icon: '/images/categories/Automotive.png',
    count: 7,
    description: 'Vehicles, manufacturing, electric cars, and mobility services'
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: '/images/categories/Healthcare.png',
    count: 11,
    description: 'Medical services, pharmaceuticals, healthcare technology, and wellness'
  },
  {
    id: 'finance',
    name: 'Finance',
    icon: '/images/categories/Finance.png',
    count: 10,
    description: 'Banking, investments, insurance, and financial technology'
  },
  {
    id: 'education',
    name: 'Education',
    icon: '/images/categories/Education.png',
    count: 6,
    description: 'Schools, universities, online learning, and educational technology'
  }
];

const Industries = () => {
  const { translate } = useLanguage();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-market-blue mb-4">
            {translate('researchIndustries') || 'Research Industries'}
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {translate('browseByIndustry') || 'Browse market research by industry to find specialized insights'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {industries.map((industry) => (
            <Link 
              key={industry.id} 
              to={`/industries/${industry.id}`}
              className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img src={industry.icon} alt={industry.name} className="mr-4 h-16 w-16 object-contain" />
                  <div>
                    <h3 className="text-lg font-bold text-market-blue">{industry.name}</h3>
                    <p className="text-sm text-gray-500">{industry.count} {translate('reports') || 'reports'}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {industry.description}
                </p>
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    className="w-full text-market-lightBlue border-market-lightBlue hover:bg-market-lightBlue hover:text-white"
                  >
                    {translate('viewIndustry') || 'View Industry'}
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Industries;
