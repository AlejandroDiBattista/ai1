import React from 'react';
import type { InputHTMLAttributes } from 'react';
import styles from './InputField.module.css';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  error, 
  className,
  readOnly,
  ...props 
}) => {
  const inputClassNames = [
    styles.input,
    error && styles['input--error'],
    readOnly && styles['input--readonly'],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles['input-container']}>
        <input
          className={inputClassNames}
          readOnly={readOnly}
          tabIndex={readOnly ? -1 : undefined}
          {...props}
        />
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
