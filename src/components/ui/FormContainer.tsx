import React from 'react';
import { FormErrors } from './FormErrors';
import { FormActions } from './FormActions';
import styles from './FormContainer.module.css';

interface FormContainerProps {
  children: React.ReactNode;
  errors?: Record<string, string | undefined>;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isSubmitting?: boolean;
  isReadOnly?: boolean;
  mode?: 'create' | 'edit' | 'view';
  entityName?: string;
  submitDisabled?: boolean;
  className?: string;
}

export const FormContainer: React.FC<FormContainerProps> = ({
  children,
  errors,
  onSubmit,
  onCancel,
  onEdit,
  onDelete,
  isSubmitting = false,
  isReadOnly = false,
  mode = 'create',
  entityName = 'Elemento',
  submitDisabled = false,
  className = ''
}) => {
  return (
    <form className={`${styles.form} ${className}`} onSubmit={onSubmit}>
      {errors && <FormErrors errors={errors} />}
      
      <div className={styles['form-body']}>
        {children}
      </div>
      
      <FormActions
        onCancel={onCancel}
        onEdit={onEdit}
        onDelete={onDelete}
        isSubmitting={isSubmitting}
        isReadOnly={isReadOnly}
        mode={mode}
        entityName={entityName}
        submitDisabled={submitDisabled}
      />
    </form>
  );
};
