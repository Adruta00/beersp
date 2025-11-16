import React, { useState } from 'react';
import './Rating.css';

interface RatingProps {
  value?: number;
  onChange?: (rating: number) => void;
  maxRating?: number;
  size?: 'small' | 'medium' | 'large';
  readonly?: boolean;
  showValue?: boolean;
}

const Rating: React.FC<RatingProps> = ({
  value = 0,
  onChange,
  maxRating = 5,
  size = 'medium',
  readonly = false,
  showValue = false,
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (rating: number) => {
    if (!readonly && onChange) {
      onChange(rating);
    }
  };

  const handleMouseEnter = (rating: number) => {
    if (!readonly) {
      setHoverRating(rating);
    }
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const displayRating = hoverRating || value;

  return (
    <div className={`rating rating-${size}`}>
      <div className="rating-stars">
        {Array.from({ length: maxRating }, (_, i) => {
          const starValue = i + 1;
          const isFilled = starValue <= displayRating;
          const isHalf = !isFilled && starValue - 0.5 === displayRating;

          return (
            <span
              key={i}
              className={`rating-star ${isFilled ? 'rating-star-filled' : ''} ${
                isHalf ? 'rating-star-half' : ''
              } ${!readonly ? 'rating-star-interactive' : ''}`}
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={handleMouseLeave}
            >
              ⭐
            </span>
          );
        })}
      </div>
      {showValue && (
        <span className="rating-value">
          {value.toFixed(1)} / {maxRating}
        </span>
      )}
    </div>
  );
};

export default Rating;