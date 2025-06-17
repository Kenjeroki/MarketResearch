
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileSearchOverlay from './MobileSearchOverlay';
import { cn } from '@/lib/utils';

const SearchForm = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isMobileOverlayOpen, setIsMobileOverlayOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search Error",
        description: "Please enter keywords to search",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  if (isMobile) {
    return (
      <>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setIsMobileOverlayOpen(true)}
          className={cn(
            "min-h-[44px] min-w-[44px]",
            isMobileOverlayOpen && "hidden"
          )}
          aria-label="Open search"
        >
          <Search className="h-5 w-5" />
        </Button>

        <MobileSearchOverlay 
          isOpen={isMobileOverlayOpen}
          onClose={() => setIsMobileOverlayOpen(false)}
          onSearch={handleSearch}
          searchQuery={query}
          setSearchQuery={setQuery}
        />
      </>
    );
  }

  return (
    <div className="search-form-container">
      <form onSubmit={handleSubmit} className="relative flex w-full">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-3 py-2 w-full rounded-lg search-input"
          />
        </div>
        <Button 
          type="submit"
          className="ml-2 bg-market-lightBlue hover:bg-market-lightBlue/90 search-button"
          disabled={isSearching}
        >
          <Search className="h-5 w-5 mr-1" />
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchForm;
