import React from 'react';
import styles from './FormSection.module.css';

interface FormSectionProps {
  children: React.ReactNode;
  title: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'customer' | 'items' | 'summary';
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({ 
  children, 
  title, 
  icon, 
  variant = 'default',
  className 
}) => {
  return (
    <div className={`${styles.section} ${styles[`section--${variant}`]} ${className || ''}`}>
      <h3 className={styles['section-title']}>
        {icon}
        {title}
      </h3>
      {children}
    </div>
  );
};
