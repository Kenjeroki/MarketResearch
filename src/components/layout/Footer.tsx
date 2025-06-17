
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { translate } = useLanguage();

  return (
    <footer className="bg-market-blue text-white py-4">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="mb-2">
              <a href="/" className="inline-block">
                <span className="text-white font-display text-lg font-bold">Market<span className="text-market-lightBlue">Research</span></span>
              </a>
            </div>
            <p className="text-xs md:text-sm text-white/70">
              Ваше надійне джерело комплексної ринкової аналітики. Ми надаємо аналітичні дані для допомоги бізнесу в прийнятті обґрунтованих рішень.
            </p>
          </div>

          <div className="space-y-1 text-sm">
            <div className="flex items-center text-white/70 hover:text-white transition-colors">
              <Mail className="h-3 w-3 mr-1.5 text-market-lightBlue flex-shrink-0" />
              <a href="mailto:contact@marketresearch.com" className="text-xs break-all">contact@marketresearch.com</a>
            </div>
            <div className="flex items-center text-white/70 hover:text-white transition-colors">
              <Phone className="h-3 w-3 mr-1.5 text-market-lightBlue flex-shrink-0" />
              <a href="tel:+1234567890" className="text-xs">+1 (234) 567-890</a>
            </div>
            <div className="flex items-start text-white/70 hover:text-white transition-colors">
              <MapPin className="h-3 w-3 mr-1.5 text-market-lightBlue flex-shrink-0 mt-0.5" />
              <span className="text-xs">123 Market Street, Micro, Україна</span>
            </div>
          </div>
        </div>
        
        <div className="mt-2 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div className="text-white/60 text-xs text-center md:text-left">
            © {new Date().getFullYear()} MarketResearch. {translate('allRightsReserved')}
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              {translate('privacyPolicy')}
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              {translate('termsOfService')}
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              {translate('cookiePolicy')}
            </a>
          </div>
          
          <div className="flex space-x-2">
            <a href="#" className="w-5 h-5 flex items-center justify-center rounded-full bg-white/10 hover:bg-market-lightBlue transition-colors text-white">
              <Facebook className="h-2.5 w-2.5" />
            </a>
            <a href="#" className="w-5 h-5 flex items-center justify-center rounded-full bg-white/10 hover:bg-market-lightBlue transition-colors text-white">
              <Twitter className="h-2.5 w-2.5" />
            </a>
            <a href="#" className="w-5 h-5 flex items-center justify-center rounded-full bg-white/10 hover:bg-market-lightBlue transition-colors text-white">
              <Instagram className="h-2.5 w-2.5" />
            </a>
            <a href="#" className="w-5 h-5 flex items-center justify-center rounded-full bg-white/10 hover:bg-market-lightBlue transition-colors text-white">
              <Linkedin className="h-2.5 w-2.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
