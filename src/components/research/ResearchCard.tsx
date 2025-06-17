import { Link } from "react-router-dom";
import { Calendar, MapPin, Star, ArrowRight } from "lucide-react";
import ImageOrPlaceholder from "./ImageOrPlaceholder";

export interface Research {
  _id: string;
  title: string;
  image: string;
  category: string;
  region: string;
  date: string;
}

interface ResearchCardProps {
  research: Research;
  isAuthenticated?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

const ResearchCard: React.FC<ResearchCardProps> = ({
  research,
  isAuthenticated,
  isFavorite,
  onToggleFavorite,
}) => (
  <div className="w-[280px] sm:w-[300px] lg:w-[320px] shrink-0 snap-start bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-[450px] flex flex-col overflow-hidden relative">
    {isAuthenticated && onToggleFavorite && (
      <button
        onClick={onToggleFavorite}
        className={`absolute top-2 right-2 p-1 rounded-full ${isFavorite ? 'text-yellow-500' : 'text-gray-300'}`}
      >
        <Star fill={isFavorite ? 'currentColor' : 'none'} />
      </button>
    )}
    <ImageOrPlaceholder image={research.image} title={research.title} className="h-64 w-full rounded-t-lg" />
    <div className="p-4 flex flex-col justify-between flex-1">
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-medium text-market-lightBlue bg-blue-50 px-2 py-1 rounded-full">
            {research.category}
          </span>
          <span className="text-xs text-gray-600 flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            {research.region}
          </span>
        </div>
        <h3 className="font-semibold text-gray-800 text-base mb-3 line-clamp-2">
          {research.title}
        </h3>
      </div>
      <div className="flex justify-between items-center pt-4 mt-auto">
        <span className="text-xs text-gray-600 flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          {research.date}
        </span>
        <Link
          to={`/research/${research._id}`}
          className="inline-flex items-center px-3 py-1.5 border border-market-lightBlue text-market-lightBlue rounded hover:bg-market-lightBlue hover:text-white transition text-xs font-medium"
        >
          Дізнатися більше
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  </div>
);

export default ResearchCard;
