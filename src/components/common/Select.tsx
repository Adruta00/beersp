import React from 'react';
import './Select.css';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  fullWidth?: boolean;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  options,
  fullWidth = true,
  placeholder,
  className = '',
  ...props
}) => {
  const wrapperClasses = [
    'select-wrapper',
    fullWidth ? 'select-full-width' : '',
    error ? 'select-error' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      {label && (
        <label className="select-label" htmlFor={props.id}>
          {label}
          {props.required && <span className="select-required">*</span>}
        </label>
      )}

      <div className="select-container">
        <select className={`select-field ${className}`} {...props}>
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="select-arrow">▼</span>
      </div>

      {error && <span className="select-error-text">{error}</span>}
      {helperText && !error && <span className="select-helper-text">{helperText}</span>}
    </div>
  );
};

export default Select;