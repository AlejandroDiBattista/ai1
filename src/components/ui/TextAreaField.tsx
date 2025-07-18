import React from 'react';
import type { TextareaHTMLAttributes } from 'react';
import styles from './TextAreaField.module.css';

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({ 
  label, 
  error, 
  className,
  readOnly,
  ...props 
}) => {
  const textareaClassNames = [
    styles.textarea,
    error && styles['textarea--error'],
    readOnly && styles['textarea--readonly'],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles['textarea-container']}>
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
