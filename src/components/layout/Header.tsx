import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X, LogIn, UserPlus, LogOut, User, Filter, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "@/components/auth/LoginModal";
import RegisterModal from "@/components/auth/RegisterModal";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const categories = ["Електроніка", "Мода", "Їжа", "Автомобілі", "Технології"];
const regions = ["Глобальний", "Європа", "Азія", "Північна Америка", "Африка"];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isMobileSearchActive, setIsMobileSearchActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, user, logout } = useAuth();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileSearchActive && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobileSearchActive]);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleRegisterClick = () => {
    setIsRegisterModalOpen(true);
  };

  const handleLogoutClick = () => {
    logout();
  };

  const handleSearchToggle = () => {
    if (isMobile) {
      setIsMobileSearchActive(!isMobileSearchActive);
      
      if (!isMobileSearchActive) {
        setTimeout(() => {
          mobileSearchInputRef.current?.focus();
        }, 100);
      }
    } else {
      setIsSearchActive(!isSearchActive);
      
      if (!isSearchActive) {
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 100);
      }
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast({
        title: "Помилка пошуку",
        description: "Будь ласка, введіть ключові слова для пошуку",
        variant: "destructive",
      });
      return;
    }

    let searchUrl = `/search?q=${encodeURIComponent(searchQuery)}`;
    
    if (selectedCategory) {
      searchUrl += `&category=${encodeURIComponent(selectedCategory)}`;
    }
    
    if (selectedRegion) {
      searchUrl += `&region=${encodeURIComponent(selectedRegion)}`;
    }
    
    navigate(searchUrl);
    
    setIsSearchActive(false);
    setIsMobileSearchActive(false);
    setSearchQuery('');
  };

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6 transition-all duration-300 backdrop-blur-md",
          isScrolled ? "bg-white/80 shadow-sm" : "bg-transparent"
        )}
      >
        <div className="container-custom flex items-center justify-between">
          <Link to="/" className={cn("flex items-center", isMobileSearchActive && "md:hidden")}>
            <span className="text-market-blue font-display text-xl sm:text-2xl font-bold">Market<span className="text-market-lightBlue">Research</span></span>
          </Link>
          
          {isMobileSearchActive && (
            <div className={cn("flex items-center gap-2 flex-grow ml-4", "md:hidden")}>
              <form onSubmit={handleSearchSubmit} className="flex-grow flex gap-2">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    ref={mobileSearchInputRef}
                    type="text"
                    placeholder="Пошук..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-3 py-2 w-full rounded-lg"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSearchSubmit(e);
                      }
                    }}
                  />
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsMobileSearchActive(false)}
                  className="flex-shrink-0"
                  aria-label="Закрити пошук"
                >
                  <X className="h-5 w-5" />
                </Button>
              </form>
            </div>
          )}
          
          <nav className={cn("hidden md:flex items-center space-x-6 lg:space-x-8")}>
            <Link to="/" className="font-medium text-market-blue hover:text-market-lightBlue transition-colors link-hover">
              Головна
            </Link>
            <Link to="/research" className="font-medium text-market-blue hover:text-market-lightBlue transition-colors link-hover">
              Дослідження
            </Link>
            <Link to="/contact" className="font-medium text-market-blue hover:text-market-lightBlue transition-colors link-hover">
              Контакти
            </Link>
            <Link to="/profile" className="font-medium text-market-blue hover:text-market-lightBlue transition-colors link-hover">
              Профіль
            </Link>
          </nav>
          
          <div className={cn("hidden md:flex items-center space-x-3 lg:space-x-4")}>
            {isAuthenticated ? (
              <div className="flex items-center space-x-3 lg:space-x-4">
                <Link to="/profile">
                  <Button variant="outline" size="sm" className="bg-transparent border-market-blue text-market-blue hover:bg-market-blue hover:text-white">
                    <User className="h-4 w-4 mr-2" />
                    {user?.name}
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogoutClick}
                  className="text-market-blue hover:text-market-lightBlue"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Вийти
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-transparent border-market-blue text-market-blue hover:bg-market-blue hover:text-white"
                  onClick={handleLoginClick}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Увійти
                </Button>
                <Button 
                  size="sm" 
                  className="bg-market-lightBlue hover:bg-market-lightBlue/80 text-white"
                  onClick={handleRegisterClick}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Зареєструватися
                </Button>
              </>
            )}
            
            <Popover open={isSearchActive} onOpenChange={setIsSearchActive}>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleSearchToggle}
                  className={isSearchActive ? "bg-gray-100" : ""}
                  aria-label="Пошук"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4" align="end">
                <form onSubmit={handleSearchSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Пошук</h4>
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Введіть ключові слова..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleSearchSubmit(e);
                          }
                        }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium mb-2">Категорія</h5>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          type="button"
                          onClick={() => setSelectedCategory(selectedCategory === category ? '' : category)}
                          className={cn(
                            "text-xs px-2 py-1 rounded-full transition-colors",
                            selectedCategory === category 
                              ? "bg-market-blue text-white" 
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          )}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium mb-2">Регіон</h5>
                    <div className="flex flex-wrap gap-2">
                      {regions.map((region) => (
                        <button
                          key={region}
                          type="button"
                          onClick={() => setSelectedRegion(selectedRegion === region ? '' : region)}
                          className={cn(
                            "text-xs px-2 py-1 rounded-full transition-colors",
                            selectedRegion === region 
                              ? "bg-market-blue text-white" 
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          )}
                        >
                          {region}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('');
                        setSelectedRegion('');
                      }}
                    >
                      Очистити
                    </Button>
                    <Button type="submit" size="sm">
                      <Search className="h-4 w-4 mr-1" />
                      Пошук
                    </Button>
                  </div>
                </form>
              </PopoverContent>
            </Popover>
          </div>
          
          <div className={cn("md:hidden flex items-center gap-3 ml-auto", isMobileSearchActive && "ml-2")}>
            {!isMobileSearchActive && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleSearchToggle}
                aria-label="Пошук"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
            
            <button 
              className="p-2 text-market-blue min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Закрити меню" : "Відкрити меню"}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 p-4 bg-white shadow-md animate-fade-in">
            <nav className="flex flex-col space-y-4 p-4">
              <Link to="/" className="font-medium text-market-blue hover:text-market-lightBlue transition-colors">
                Головна
              </Link>
              <Link to="/research" className="font-medium text-market-blue hover:text-market-lightBlue transition-colors">
                Дослідження
              </Link>
              <Link to="/contact" className="font-medium text-market-blue hover:text-market-lightBlue transition-colors">
                Контакти
              </Link>
              <Link to="/profile" className="font-medium text-market-blue hover:text-market-lightBlue transition-colors">
                Профіль
              </Link>
              <div className="pt-4 border-t border-gray-200 flex flex-col space-y-3">
                {isAuthenticated ? (
                  <>
                    <Link to="/profile">
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent border-market-blue text-market-blue hover:bg-market-blue hover:text-white">
                        <User className="h-4 w-4 mr-2" />
                        {user?.name}
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleLogoutClick}
                      className="w-full justify-start text-market-blue hover:text-market-lightBlue"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Вийти
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start bg-transparent border-market-blue text-market-blue hover:bg-market-blue hover:text-white"
                      onClick={handleLoginClick}
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Увійти
                    </Button>
                    <Button 
                      size="sm" 
                      className="w-full justify-start bg-market-lightBlue hover:bg-market-lightBlue/80 text-white"
                      onClick={handleRegisterClick}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Зареєструватися
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
        
        {isMobileSearchActive && (
          <div className="fixed inset-0 top-16 bg-white z-40 overflow-y-auto">
            <div className="container p-4">
              <div className="flex items-center justify-between mb-6">
                <Button 
                  variant="ghost" 
                  onClick={() => setIsMobileSearchActive(false)}
                  className="p-2 min-h-[44px]"
                  aria-label="Назад"
                >
                  <ChevronLeft className="h-5 w-5 mr-1" /> Назад
                </Button>
                <h2 className="text-lg font-medium">Пошук</h2>
              </div>
              
              <form onSubmit={handleSearchSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="mobileSearch" className="text-sm font-medium">Ключові слова</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      id="mobileSearch"
                      type="text"
                      placeholder="Введіть ключові слова..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 py-3 text-base rounded-lg"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSearchSubmit(e);
                        }
                      }}
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-base font-medium">Категорія</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setSelectedCategory(selectedCategory === category ? '' : category)}
                        className={cn(
                          "text-sm px-4 py-3 rounded-lg transition-colors text-left min-h-[44px]",
                          selectedCategory === category 
                            ? "bg-market-blue text-white" 
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        )}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-base font-medium">Регіон</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {regions.map((region) => (
                      <button
                        key={region}
                        type="button"
                        onClick={() => setSelectedRegion(selectedRegion === region ? '' : region)}
                        className={cn(
                          "text-sm px-4 py-3 rounded-lg transition-colors text-left min-h-[44px]",
                          selectedRegion === region 
                            ? "bg-market-blue text-white" 
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        )}
                      >
                        {region}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 flex gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1 py-3 min-h-[48px]"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('');
                      setSelectedRegion('');
                    }}
                  >
                    Очистити
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 py-3 min-h-[48px] bg-market-lightBlue hover:bg-market-lightBlue/90"
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Пошук
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </header>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        onOpenRegister={() => {
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(true);
        }}
      />

      <RegisterModal 
        isOpen={isRegisterModalOpen} 
        onClose={() => setIsRegisterModalOpen(false)}
        onOpenLogin={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
    </>
  );
};

export default Header;
