import React from 'react';

interface ImageOrPlaceholderProps {
  image?: string;
  title: string;
  className?: string;
}

const ImageOrPlaceholder: React.FC<ImageOrPlaceholderProps> = ({ image, title, className }) => {
  if (!image) {
    return (
      <div className={`w-full h-full bg-[#0077cc] flex items-center justify-center ${className ?? ''}`}>
        <span className="text-white text-sm">Зображення недоступне</span>
      </div>
    );
  }

  return <img src={image} alt={title} className={`w-full h-full object-cover ${className ?? ''}`} />;
};

export default ImageOrPlaceholder;
