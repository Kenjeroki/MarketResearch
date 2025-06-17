
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, ExternalLink, AlertCircle, X } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import ImageOrPlaceholder from '@/components/research/ImageOrPlaceholder';

interface Research {
  _id: string;
  title: string;
  category: string;
  region: string;
  date: string;
  image: string;
  description?: string;
}

interface CategoryCount {
  name: string;
  count: number;
}

interface AuthorCount {
  _id: string;
  name: string;
  count: number;
}

const sortOptions = [
  { value: "relevance", label: "Релевантність" },
  { value: "date", label: "Дата" },
  { value: "popularity", label: "Популярність" }
];

const SearchResults = () => {
  const location = useLocation();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const queryParams = new URLSearchParams(location.search);
  const queryFromUrl = queryParams.get('q') || '';
  const categoryFromUrl = queryParams.get('category') || '';
  const regionFromUrl = queryParams.get('region') || '';
  const authorFromUrl = queryParams.get('author') || '';
  
  const [searchTerm, setSearchTerm] = useState(queryFromUrl);
  const [categoryFilter, setCategoryFilter] = useState(categoryFromUrl);
  const [regionFilter, setRegionFilter] = useState(regionFromUrl);
  const [authorFilter, setAuthorFilter] = useState(authorFromUrl);
  const [sortBy, setSortBy] = useState("relevance");
  const [currentTab, setCurrentTab] = useState("research");
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCompactFilters, setIsCompactFilters] = useState(true);
  const [researchResults, setResearchResults] = useState<Research[]>([]);
  const [categoriesData, setCategoriesData] = useState<CategoryCount[]>([]);
  const [authorsData, setAuthorsData] = useState<AuthorCount[]>([]);
  
  useEffect(() => {
    setSearchTerm(queryFromUrl);
    setCategoryFilter(categoryFromUrl);
    setRegionFilter(regionFromUrl);
    setAuthorFilter(authorFromUrl);

    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (queryFromUrl) params.append("q", queryFromUrl);
        if (categoryFromUrl) params.append("category", categoryFromUrl);
        if (regionFromUrl) params.append("region", regionFromUrl);
        if (authorFromUrl) params.append("author", authorFromUrl);
        const res = await fetch(`http://localhost:3000/search?${params.toString()}`);
        if (!res.ok) throw new Error("Fetch error");
        const json = await res.json();
        setResearchResults(json.results || []);
        setCategoriesData(json.categories || []);
        setAuthorsData(json.authors || []);
      } catch (err) {
        setError("Виникла помилка під час пошуку. Будь ласка, спробуйте пізніше.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [queryFromUrl, categoryFromUrl, regionFromUrl, authorFromUrl]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      toast({
        title: "Помилка пошуку",
        description: "Будь ласка, введіть ключові слова для пошуку",
        variant: "destructive",
      });
      return;
    }
    
    const searchParams = new URLSearchParams();
    
    searchParams.set('q', searchTerm);
    
    if (categoryFilter) {
      searchParams.set('category', categoryFilter);
    }

    if (regionFilter) {
      searchParams.set('region', regionFilter);
    }

    if (authorFilter) {
      searchParams.set('author', authorFilter);
    }
    
    window.history.pushState(
      {},
      '',
      `${location.pathname}?${searchParams.toString()}`
    );

    toast({
      title: "Пошук виконано",
      description: `Знайдено результати для "${searchTerm}"`,
    });
  };

  const handleViewResearch = (researchId: string) => {
    toast({
      title: "Дослідження обрано",
      description: `Перегляд дослідження ID: ${researchId}`,
    });
  };
  
  const filteredResearch = researchResults;

  const sortedResearch = [...filteredResearch].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === "popularity") {
      return (b.views || 0) - (a.views || 0);
    }
    
    const aRelevance = a.title.toLowerCase().indexOf(searchTerm.toLowerCase());
    const bRelevance = b.title.toLowerCase().indexOf(searchTerm.toLowerCase());
    
    if (aRelevance === -1 && bRelevance === -1) return 0;
    if (aRelevance === -1) return 1;
    if (bRelevance === -1) return -1;
    return aRelevance - bRelevance;
  });

  const clearFilters = () => {
    setCategoryFilter('');
    setRegionFilter('');
    setAuthorFilter('');
    setSortBy('relevance');
    
    const searchParams = new URLSearchParams();
    if (searchTerm) {
      searchParams.set('q', searchTerm);
    }
    
    window.history.pushState(
      {},
      '',
      `${location.pathname}?${searchParams.toString()}`
    );
  };

  const toggleFiltersDisplay = () => {
    setIsCompactFilters(!isCompactFilters);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 mt-20">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-12 bg-gray-200 rounded w-full"></div>
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-64 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-market-blue mb-2">
            Результати пошуку
          </h1>
          {searchTerm && (
            <p className="text-gray-600">
              Пошук за запитом: <span className="font-semibold">"{searchTerm}"</span>
              {categoryFilter && <span> у категорії <span className="font-semibold">"{categoryFilter}"</span></span>}
              {regionFilter && <span> у регіоні <span className="font-semibold">"{regionFilter}"</span></span>}
            </p>
          )}
        </div>
        
        <div className="mb-8 bg-white rounded-lg shadow-md p-4">
          <form onSubmit={handleSearch} className="flex flex-col gap-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Пошук досліджень ринку, тенденцій, даних..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-base"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(e);
                  }
                }}
              />
            </div>
            
            <div className="flex flex-wrap gap-2 w-full">
              <Button 
                type="submit" 
                className="flex-1 min-h-[44px] bg-market-lightBlue hover:bg-market-lightBlue/90"
              >
                <Search className="mr-2 h-5 w-5" />
                Пошук
              </Button>
              
              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="min-h-[44px] min-w-[130px]">
                    <SelectValue placeholder="Сортувати за" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {sortOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 min-h-[44px]"
                  onClick={() => setIsFiltersVisible(!isFiltersVisible)}
                >
                  <Filter size={16} />
                  Фільтри
                </Button>
              </div>
            </div>
          </form>
          
          {isFiltersVisible && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              {isMobile && (
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Фільтрувати результати</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsFiltersVisible(false)}
                    className="p-1"
                  >
                    <X size={18} />
                  </Button>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Категорія
                  </label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="min-h-[44px]">
                      <SelectValue placeholder="Всі категорії" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="">Всі категорії</SelectItem>
                        {categoriesData.map(category => (
                          <SelectItem key={category.name} value={category.name.toLowerCase()}>
                            {category.name} ({category.count})
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Регіон
                  </label>
                  <Select value={regionFilter} onValueChange={setRegionFilter}>
                    <SelectTrigger className="min-h-[44px]">
                      <SelectValue placeholder="Всі регіони" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="">Всі регіони</SelectItem>
                        <SelectItem value="глобальний">Глобальний</SelectItem>
                        <SelectItem value="північна америка">Північна Америка</SelectItem>
                        <SelectItem value="європа">Європа</SelectItem>
                        <SelectItem value="азія">Азія</SelectItem>
                        <SelectItem value="африка">Африка</SelectItem>
                        <SelectItem value="південна америка">Південна Америка</SelectItem>
                        <SelectItem value="австралія та океанія">Австралія та Океанія</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Автор
                  </label>
                  <Select value={authorFilter} onValueChange={setAuthorFilter}>
                    <SelectTrigger className="min-h-[44px]">
                      <SelectValue placeholder="Всі автори" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="">Всі автори</SelectItem>
                        {authorsData.map(author => (
                          <SelectItem key={author._id} value={author._id}>
                            {author.name} ({author.count})
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Дата
                  </label>
                  <Select>
                    <SelectTrigger className="min-h-[44px]">
                      <SelectValue placeholder="Будь-який час" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="any">Будь-який час</SelectItem>
                        <SelectItem value="lastWeek">Останній тиждень</SelectItem>
                        <SelectItem value="lastMonth">Останній місяць</SelectItem>
                        <SelectItem value="lastYear">Останній рік</SelectItem>
                        <SelectItem value="custom">Користувацький діапазон</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="md:col-span-3 flex justify-end mt-4">
                <Button 
                  variant="outline" 
                  onClick={clearFilters} 
                  className="mr-2 min-h-[44px]"
                >
                  Очистити фільтри
                </Button>
                <Button 
                  type="submit" 
                  onClick={handleSearch} 
                  className="min-h-[44px]"
                >
                  Застосувати фільтри
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}
        
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="mb-6">
          <TabsList className="w-full flex overflow-x-auto no-scrollbar">
            <TabsTrigger value="research" className="flex-1 min-h-[44px]">
              Дослідження ({filteredResearch.length})
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex-1 min-h-[44px]">
              Категорії ({categoriesData.length})
            </TabsTrigger>
            <TabsTrigger value="authors" className="flex-1 min-h-[44px]">
              Автори ({authorsData.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="research">
            <div className="mb-4">
              <p className="text-gray-600">
                {sortedResearch.length} знайдено результатів
              </p>
            </div>
            
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mb-12">
              {sortedResearch.map((research) => (
                <div key={research._id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="h-40 overflow-hidden">
                    <ImageOrPlaceholder
                      image={research.image}
                      title={research.title}
                      className="w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Link to={`/category/${research.category.toLowerCase()}`}>
                        <span className="text-xs font-semibold inline-block px-2 py-1 rounded bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors min-h-[28px]">
                          {research.category}
                        </span>
                      </Link>
                      <span className="text-xs font-semibold inline-block px-2 py-1 rounded bg-gray-100 text-gray-800 min-h-[28px]">
                        {research.region}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-market-blue mb-2 hover:text-market-lightBlue transition-colors duration-200">
                      {research.title}
                    </h3>
                    {research.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {research.description}
                      </p>
                    )}
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-xs text-gray-500">
                        {new Date(research.date).toLocaleDateString()}
                      </span>
                      <Link to={`/research/${research._id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-market-lightBlue border-market-lightBlue hover:bg-market-lightBlue hover:text-white min-h-[36px]"
                          onClick={() => handleViewResearch(research._id)}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          {isMobile ? "Переглянути" : "Переглянути дослідження"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {sortedResearch.length === 0 && !error && (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">Результатів не знайдено</p>
                <p className="text-gray-500 mt-2">Спробуйте інший пошуковий запит або перегляньте категорії</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="categories">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {categoriesData.map((category) => (
                <Link 
                  to={`/category/${category.name.toLowerCase()}`} 
                  key={category.name}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center min-h-[180px]"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-blue-600 font-bold text-xl">{category.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-lg font-bold text-market-blue mb-2">{category.name}</h3>
                  <p className="text-gray-600">
                    {category.count} звітів досліджень
                  </p>
                </Link>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="authors">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12">
              {authorsData.map((author) => (
                <div
                  key={author._id}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-bold">{author.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-market-blue mb-1">{author.name}</h3>
                    <p className="text-gray-600">
                      {author.count} звітів досліджень
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchResults;
