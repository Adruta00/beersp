import React from 'react';
import './Card.css';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  headerAction,
  footer,
  className = '',
  hoverable = false,
  onClick,
}) => {
  const cardClasses = [
    'custom-card',
    hoverable ? 'custom-card-hoverable' : '',
    onClick ? 'custom-card-clickable' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} onClick={onClick}>
      {(title || subtitle || headerAction) && (
        <div className="custom-card-header">
          <div className="custom-card-header-text">
            {title && <h3 className="custom-card-title">{title}</h3>}
            {subtitle && <p className="custom-card-subtitle">{subtitle}</p>}
          </div>
          {headerAction && <div className="custom-card-header-action">{headerAction}</div>}
        </div>
      )}

      <div className="custom-card-content">{children}</div>

      {footer && <div className="custom-card-footer">{footer}</div>}
    </div>
  );
};

export default Card;