import { useEffect, useState } from "react";
import { ArrowRight, LineChart, PieChart, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection = () => {
  const { toast } = useToast();
  const { translate } = useLanguage();
  const isMobile = useIsMobile();

  const [stats, setStats] = useState({
    research: 0,
    registrations: 0,
    visits: 0,
  });

  useEffect(() => {
    fetch("http://localhost:3000/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => {
        toast.error("Не вдалося отримати статистику");
      });
  }, []);

  return (
    <section className="pt-20 pb-8 md:pt-24 md:pb-12 lg:pt-28 lg:pb-16 relative overflow-hidden">
      <div className="absolute top-20 right-20 blur-dot w-64 h-64 opacity-20" />
      <div className="absolute bottom-20 left-10 blur-dot w-40 h-40 opacity-10" />

      <div className="w-full max-w-[1440px] px-6 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16">
          <div className="w-full lg:w-1/2 relative z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold leading-tight text-market-blue mb-4 md:mb-5 animate-fade-up">
              Відкрийте нові ринкові можливості
            </h1>
            <p className="text-base md:text-lg text-market-blue/80 mb-5 md:mb-6 max-w-xl animate-fade-up" style={{ animationDelay: "0.2s" }}>
              Отримайте доступ до комплексних маркетингових досліджень для прийняття рішень на основі даних. Виявляйте тенденції, аналізуйте попит та знаходьте нові бізнес-можливості.
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Link to="/add-research">
                <Button
                  className="group bg-market-blue hover:bg-market-blue/90 text-white rounded-lg px-4 py-2 md:px-6 md:py-3 text-sm md:text-base"
                >
                  Створити дослідження
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/research">
                <Button variant="outline" className="text-market-blue border-market-blue hover:bg-market-blue/5 rounded-lg px-4 py-2 md:px-6 md:py-3 text-sm md:text-base">
                  Переглянути дослідження
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 mt-8 md:mt-10 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <div className="p-3 md:p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                <p className="text-2xl md:text-3xl font-bold text-market-blue">{stats.research}</p>
                <p className="text-xs md:text-sm text-market-blue/70">Досліджень</p>
              </div>
              <div className="p-3 md:p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                <p className="text-2xl md:text-3xl font-bold text-market-blue">{stats.visits}</p>
                <p className="text-xs md:text-sm text-market-blue/70">Відвідали</p>
              </div>
              <div className="p-3 md:p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                <p className="text-2xl md:text-3xl font-bold text-market-blue">{stats.registrations}</p>
                <p className="text-xs md:text-sm text-market-blue/70">Реєстрацій</p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center items-center animate-fade-in mt-6 lg:mt-0" style={{ animationDelay: "0.5s" }}>
            {!isMobile && (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-radial from-market-lightBlue/20 to-transparent rounded-full blur-2xl"></div>
                <div className="p-3 md:p-4 glass-card rounded-2xl shadow-xl relative">
                  <div className="bg-white rounded-xl overflow-hidden">
                    <div className="h-8 md:h-10 lg:h-12 bg-market-gray flex items-center px-3 md:px-4 space-x-2">
                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-400"></div>
                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="p-2 md:p-4 flex justify-center">
                      <img 
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                        alt="Market research dashboard" 
                        className="rounded-lg shadow-sm h-40 md:h-56 lg:h-64 object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 lg:-top-8 lg:-right-8 p-2 md:p-3 lg:p-4 bg-white rounded-xl shadow-lg flex items-center space-x-2 md:space-x-3 animate-pulse-slow">
                    <PieChart className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-market-lightBlue" />
                    <div>
                      <p className="text-xs md:text-sm font-medium">Темп зростання</p>
                      <p className="text-sm md:text-base lg:text-lg font-bold text-market-blue">+24.8%</p>
                    </div>
                  </div>

                  <div className="absolute -bottom-3 -left-3 md:-bottom-4 md:-left-4 lg:-bottom-6 lg:-left-6 p-2 md:p-3 bg-white rounded-xl shadow-lg animate-pulse-slow" style={{ animationDelay: "1s" }}>
                    <BarChart3 className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-market-lightBlue/80" />
                  </div>

                  <div className="absolute top-1/3 -left-4 md:-left-6 lg:-left-10 p-2 md:p-3 bg-white rounded-xl shadow-lg animate-pulse-slow" style={{ animationDelay: "1.5s" }}>
                    <LineChart className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-market-blue" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
