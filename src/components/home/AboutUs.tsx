
import { BarChart3, PieChart, TrendingUp, Users, Globe, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutUs = () => {
  const isMobile = useIsMobile();
  const { translate } = useLanguage();
  
  return (
    <section className="relative overflow-hidden w-full">
      <div className="absolute -top-40 -right-40 w-96 h-96 blur-dot opacity-5" />
      
      <div className="w-full">
        <div className="w-full">
          <div className="inline-block px-3 py-1 mb-3 md:mb-4 text-xs font-semibold bg-market-blue/10 text-market-blue rounded-full animate-fade-up">
            {translate("aboutPlatform") || "Про платформу"}
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-market-blue mb-3 md:mb-4 animate-fade-up">
            {translate("aboutTitle") || "Наша місія — давати бізнесу точні аналітичні дані"}
          </h2>
          <p className="text-sm md:text-base text-market-blue/80 mb-3 md:mb-4 animate-fade-up" style={{
            animationDelay: "0.1s"
          }}>
            {translate("aboutDescription1") || "Ми створили платформу, яка надає компаніям доступ до актуальних і точних маркетингових досліджень. Наші звіти допомагають приймати обґрунтовані бізнес-рішення, виявляти нові можливості та уникати потенційних ризиків."}
          </p>
          <p className="text-sm md:text-base text-market-blue/80 mb-4 md:mb-5 animate-fade-up" style={{
            animationDelay: "0.2s"
          }}>
            {translate("aboutDescription2") || "Наша команда аналітиків постійно моніторить ринкові тенденції, аналізує дані та готує детальні звіти, які охоплюють різні галузі та регіони."}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-5">
            <div className="flex items-start space-x-3 animate-fade-up" style={{
              animationDelay: "0.3s"
            }}>
              <div className="p-2 bg-market-lightBlue/10 rounded-lg text-market-lightBlue mt-1 flex-shrink-0">
                <PieChart className="h-4 w-4 md:h-5 md:w-5" />
              </div>
              <div>
                <h3 className="font-medium text-sm md:text-base text-market-blue mb-1">{translate("dataInsights") || "Глибокі аналітичні дані"}</h3>
                <p className="text-xs md:text-sm text-market-blue/70">{translate("dataInsightsDesc") || "Аналіз великих обсягів даних для виявлення прихованих тенденцій та можливостей"}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 animate-fade-up" style={{
              animationDelay: "0.4s"
            }}>
              <div className="p-2 bg-market-lightBlue/10 rounded-lg text-market-lightBlue mt-1 flex-shrink-0">
                <TrendingUp className="h-4 w-4 md:h-5 md:w-5" />
              </div>
              <div>
                <h3 className="font-medium text-sm md:text-base text-market-blue mb-1">{translate("trendIdentification") || "Виявлення тенденцій"}</h3>
                <p className="text-xs md:text-sm text-market-blue/70">{translate("trendIdentificationDesc") || "Раннє виявлення змін на ринку та прогнозування майбутніх тенденцій"}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 animate-fade-up" style={{
              animationDelay: "0.5s"
            }}>
              <div className="p-2 bg-market-lightBlue/10 rounded-lg text-market-lightBlue mt-1 flex-shrink-0">
                <Users className="h-4 w-4 md:h-5 md:w-5" />
              </div>
              <div>
                <h3 className="font-medium text-sm md:text-base text-market-blue mb-1">{translate("consumerBehavior") || "Поведінка споживачів"}</h3>
                <p className="text-xs md:text-sm text-market-blue/70">{translate("consumerBehaviorDesc") || "Детальний аналіз змін у споживчих перевагах та поведінці"}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 animate-fade-up" style={{
              animationDelay: "0.6s"
            }}>
              <div className="p-2 bg-market-lightBlue/10 rounded-lg text-market-lightBlue mt-1 flex-shrink-0">
                <BarChart3 className="h-4 w-4 md:h-5 md:w-5" />
              </div>
              <div>
                <h3 className="font-medium text-sm md:text-base text-market-blue mb-1">{translate("competitiveAnalysis") || "Конкурентний аналіз"}</h3>
                <p className="text-xs md:text-sm text-market-blue/70">{translate("competitiveAnalysisDesc") || "Порівняльний аналіз стратегій та позицій конкурентів на ринку"}</p>
              </div>
            </div>
          </div>
          
          <div className="mb-4 md:mb-5">
            <h3 className="font-medium text-base md:text-lg text-market-blue mb-2 md:mb-3 animate-fade-up" style={{
              animationDelay: "0.65s"
            }}>
              {translate("platformFeatures") || "Особливості платформи"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div className="flex items-start space-x-3 animate-fade-up" style={{
                animationDelay: "0.7s"
              }}>
                <div className="p-2 bg-market-lightBlue/10 rounded-lg text-market-lightBlue mt-1 flex-shrink-0">
                  <Book className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-sm md:text-base text-market-blue mb-1">{translate("comprehensiveReports") || "Комплексні звіти"}</h3>
                  <p className="text-xs md:text-sm text-market-blue/70">{translate("comprehensiveReportsDesc") || "Детальні звіти з усіма необхідними даними та аналітикою"}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 animate-fade-up" style={{
                animationDelay: "0.75s"
              }}>
                <div className="p-2 bg-market-lightBlue/10 rounded-lg text-market-lightBlue mt-1 flex-shrink-0">
                  <Globe className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-sm md:text-base text-market-blue mb-1">{translate("globalCoverage") || "Глобальне покриття"}</h3>
                  <p className="text-xs md:text-sm text-market-blue/70">{translate("globalCoverageDesc") || "Дослідження ринків у різних регіонах світу"}</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
