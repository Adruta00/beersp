import React from 'react';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  icon,
  fullWidth = true,
  className = '',
  ...props
}) => {
  const wrapperClasses = [
    'input-wrapper',
    fullWidth ? 'input-full-width' : '',
    error ? 'input-error' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      {label && (
        <label className="input-label" htmlFor={props.id}>
          {label}
          {props.required && <span className="input-required">*</span>}
        </label>
      )}

      <div className="input-container">
        {icon && <span className="input-icon">{icon}</span>}
        <input
          className={`input-field ${icon ? 'input-with-icon' : ''} ${className}`}
          {...props}
        />
      </div>

      {error && <span className="input-error-text">{error}</span>}
      {helperText && !error && <span className="input-helper-text">{helperText}</span>}
    </div>
  );
};

export default Input;