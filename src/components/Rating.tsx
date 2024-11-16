import React from "react";
import { Star } from "lucide-react";

interface ProductProps {
  product: {
    rating: {
      rate: number;
    };
  };
}

const Rating: React.FC<ProductProps> = ({ product }) => {
  const rating = product?.rating?.rate || 0;

  const renderStars = () => {
    const totalStars = 5;
    let stars = [];

    for (let i = 0; i < totalStars; i++) {
      if (i < Math.floor(rating)) {
        stars.push(<Star key={i} className="text-yellow-500" size={15} />);
      } else if (i < rating) {
        stars.push(
          <Star key={i} className="text-yellow-500" size={15} opacity={0.5} />
        );
      } else {
        stars.push(
          <Star key={i} className="text-gray-400" size={15} opacity={0.5} />
        );
      }
    }

    return stars;
  };

  return (
    <div className="flex items-center space-x-1">
      <div className="flex">{renderStars()}</div>
      <p className="ml-2 text-gray-500">({rating.toFixed(1)})</p>
    </div>
  );
};

export default Rating;
