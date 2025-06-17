
import { useState } from 'react';
import { Search, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';

const suggestions = [
  "Тенденції ринку електроніки",
  "Зростання індустрії моди",
  "Розмір ринку доставки їжі",
  "Попит на розумні домашні пристрої",
  "Прогноз автомобільної промисловості"
];

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { translate } = useLanguage();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Пошук за запитом:", query);
  };
  
  const clearSearch = () => {
    setQuery('');
  };

  return (
    <section className="py-16 md:py-20 bg-market-blue relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5LTQtNC00cy00IDEuNzkxLTQgNHMxLjc5IDQgNCA0czQtMS43OTEgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
      
      <div className="container-custom text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-5 animate-fade-up">
          {translate('findSpecificResearch')}
        </h2>
        <p className="text-white/80 max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          {translate('searchDescription')}
        </p>
        
        <div className="max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <form 
            onSubmit={handleSubmit}
            className="relative"
          >
            <div className={`flex items-center bg-white rounded-xl transition-shadow duration-300 ${isFocused ? 'shadow-lg shadow-market-lightBlue/20' : 'shadow-md shadow-black/5'}`}>
              <div className="pl-5 pr-3">
                <Search className="h-5 w-5 text-market-blue/60" />
              </div>
              <input
                type="text"
                placeholder={translate('searchPlaceholder')}
                className="w-full py-4 px-2 text-market-blue placeholder:text-market-blue/50 bg-transparent border-none focus:outline-none focus:ring-0"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 100)}
              />
              {query && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="text-market-blue/60 hover:text-market-blue p-2"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
              <Button 
                type="submit" 
                className="m-1 bg-market-lightBlue hover:bg-market-lightBlue/90 text-white rounded-lg px-6"
              >
                {translate('search')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            {isFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg overflow-hidden z-20 text-left animate-fade-in">
                <div className="p-4 border-b border-gray-100">
                  <p className="text-sm font-medium text-market-blue/70">{translate('popularSearches')}</p>
                </div>
                <ul>
                  {suggestions.map((suggestion, index) => (
                    <li key={index}>
                      <button
                        type="button"
                        className="w-full px-4 py-3 text-left text-market-blue hover:bg-market-gray transition-colors flex items-center"
                        onClick={() => setQuery(suggestion)}
                      >
                        <Search className="h-4 w-4 mr-3 text-market-blue/50" />
                        {suggestion}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </form>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <span className="text-white/60 text-sm">{translate('popular')}</span>
            {["Споживча електроніка", "Мода", "Їжа та напої", "Автомобілі", "Розумний дім"].map((tag, index) => (
              <button
                key={index}
                onClick={() => setQuery(tag)}
                className="text-sm px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchBar;
