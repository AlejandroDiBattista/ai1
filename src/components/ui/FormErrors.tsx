import React from 'react';
import styles from './FormErrors.module.css';

interface FormErrorsProps {
  errors: Record<string, string | undefined>;
  className?: string;
}

export const FormErrors: React.FC<FormErrorsProps> = ({ errors, className }) => {
  const errorMessages = Object.values(errors).filter(Boolean) as string[];
  
  if (errorMessages.length === 0) {
    return null;
  }

  return (
    <div className={`${styles['form-header']} ${className || ''}`}>
      <div className={styles['error-list']}>
        <p className={styles['error-title']}>Por favor, corrige los siguientes errores:</p>
        {errorMessages.map((error, index) => (
          <div key={index} className={styles['error-item']}>• {error}</div>
        ))}
      </div>
    </div>
  );
};
