import React from 'react';
import type { InputHTMLAttributes } from 'react';
import styles from './InputField.module.css';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  error, 
  icon, 
  className,
  readOnly,
  ...props 
}) => {
  const inputClassNames = [
    styles.input,
    icon && styles['input--with-icon'],
    error && styles['input--error'],
    readOnly && styles['input--readonly'],
    className
  ].filter(Boolean).join(' ');

  const iconClassNames = [
    styles.icon,
    readOnly && styles['icon--readonly']
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles['input-container']}>
        {icon && <div className={iconClassNames}>{icon}</div>}
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
