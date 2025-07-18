import React from 'react';
import styles from './SelectField.module.css';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  readOnly?: boolean;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  id?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Seleccionar opción...",
  error,
  readOnly = false,
  disabled = false,
  required = false,
  className = '',
  id
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className={`${styles['select-field']} ${className}`}>
      <label htmlFor={selectId} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <div className={styles['select-container']}>
        <select
          id={selectId}
          className={`${styles.select} ${error ? styles['select--error'] : ''}`}
          value={value}
          onChange={onChange}
          disabled={readOnly || disabled}
          required={required}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}
    </div>
  );
};
