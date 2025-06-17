
import React, { useEffect, useRef, useState } from 'react';
import { X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface MobileSearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const MobileSearchOverlay = ({
  isOpen,
  onClose,
  onSearch,
  searchQuery,
  setSearchQuery,
}: MobileSearchOverlayProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      
      const savedSearches = localStorage.getItem('recentSearches');
      if (savedSearches) {
        setRecentSearches(JSON.parse(savedSearches));
      }
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const updatedSearches = [
        searchQuery, 
        ...recentSearches.filter(s => s !== searchQuery)
      ].slice(0, 5);
      
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      setRecentSearches(updatedSearches);
      
      onSearch(searchQuery);
      onClose();
    }
  };

  const handleRecentSearchClick = (search: string) => {
    setSearchQuery(search);
    onSearch(search);
    onClose();
  };

  const handleClearRecentSearches = () => {
    localStorage.removeItem('recentSearches');
    setRecentSearches([]);
  };

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[999] flex flex-col w-full h-full bg-[#1A1F2C] animate-fade-in"
      )}
    >
      <div className="flex items-center justify-between px-4 py-5 border-b border-[#222] bg-[#1A1F2C]">
        <span className="font-display text-xl font-bold">
          <span className="text-white">Market</span>
          <span className="text-[#1EAEDB]">Research</span>
        </span>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-[#252B3B]/60"
            aria-label="Close search"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex px-4 pt-6 pb-4 bg-[#1A1F2C] border-b border-[#222]"
      >
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="flex-1 pl-10 py-3 px-4 bg-[#222] text-white placeholder-[#8E9196] border-none rounded-l-lg focus:bg-[#252B3B] focus:outline-none focus:ring-2 focus:ring-[#1EAEDB] text-lg w-full"
            autoFocus
          />
        </div>
        <Button
          type="submit"
          className="rounded-none rounded-r-lg min-w-[56px] bg-[#1EAEDB] text-white hover:bg-[#1293be] text-lg font-medium"
        >
          Search
        </Button>
      </form>

      {recentSearches.length > 0 && (
        <div className="px-4 py-4 border-b border-[#222]">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-white text-sm font-medium">Recent Searches</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleClearRecentSearches}
              className="text-[#8E9196] hover:text-white text-xs"
            >
              Clear
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => handleRecentSearchClick(search)}
                className="bg-[#252B3B] text-white px-3 py-1 rounded-full text-sm hover:bg-[#303850] transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto bg-[#1A1F2C] py-2">
        <nav className="flex flex-col">
          {[
            { name: "Home", path: "/" },
            { name: "Research", path: "/research" },
            { name: "Contact", path: "/contact" },
            { name: "Profile", path: "/profile" }
          ].map((item, index) => (
            <Link 
              key={index} 
              to={item.path}
              className="flex items-center px-4 py-4 text-white hover:bg-[#252B3B] border-b border-[#222]"
              onClick={onClose}
            >
              <span className="text-base font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MobileSearchOverlay;
