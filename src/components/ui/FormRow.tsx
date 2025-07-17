import React from 'react';
import styles from './FormRow.module.css';

interface FormRowProps {
  children: React.ReactNode;
  className?: string;
}

export const FormRow: React.FC<FormRowProps> = ({ children, className }) => {
  return (
    <div className={`${styles['form-row']} ${className || ''}`}>
      {children}
    </div>
  );
};
