import React from 'react';
import type { TextareaHTMLAttributes } from 'react';
import styles from './TextAreaField.module.css';

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({ 
  label, 
  error, 
  icon, 
  className,
  readOnly,
  ...props 
}) => {
  const textareaClassNames = [
    styles.textarea,
    icon && styles['textarea--with-icon'],
    error && styles['textarea--error'],
    readOnly && styles['textarea--readonly'],
    className
  ].filter(Boolean).join(' ');

  const iconClassNames = [
    styles.icon,
    readOnly && styles['icon--readonly']
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles['textarea-container']}>
        {icon && <div className={iconClassNames}>{icon}</div>}
        <textarea
          className={textareaClassNames}
          readOnly={readOnly}
          tabIndex={readOnly ? -1 : undefined}
          {...props}
        />
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
