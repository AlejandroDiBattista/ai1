import React from 'react';
import { Edit3, Trash2 } from 'lucide-react';
import { Button } from './Button';
import styles from './FormActions.module.css';

export interface FormActionsProps {
  onCancel: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isSubmitting?: boolean;
  isReadOnly?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  submitDisabled?: boolean;
  mode?: 'create' | 'edit' | 'view';
  entityName?: string;
  className?: string;
}

export const FormActions: React.FC<FormActionsProps> = ({
  onCancel,
  onEdit,
  onDelete,
  isSubmitting = false,
  isReadOnly = false,
  submitLabel,
  cancelLabel = 'Cancelar',
  submitDisabled = false,
  mode = 'create',
  entityName = 'Elemento',
  className
}) => {
  const getSubmitLabel = (): string => {
    if (submitLabel) {
      return submitLabel;
    }
    
    if (isSubmitting) {
      return 'Guardando...';
    }
    
    return mode === 'create' 
      ? `Crear ${entityName}` 
      : 'Guardar Cambios';
  };

  const getCloseLabel = (): string => {
    return isReadOnly ? 'Cerrar' : cancelLabel;
  };

  return (
    <div className={styles['form-footer']}>
      <div className={`${styles['form-actions']} ${className || ''}`}>
        {/* Botones de acción izquierda (solo en modo lectura) */}
        <div className={styles['left-actions']}>
          {isReadOnly && onEdit && (
            <Button 
              variant="secondary" 
              onClick={onEdit}
            >
              <Edit3 size={16} />
              Editar
            </Button>
          )}
          {isReadOnly && onDelete && (
            <Button 
              variant="secondary" 
              onClick={onDelete}
              className={styles['delete-button']}
            >
              <Trash2 size={16} />
              Eliminar
            </Button>
          )}
        </div>

        {/* Botones de acción derecha */}
        <div className={styles['right-actions']}>
          {isReadOnly ? (
            <Button 
              variant="primary" 
              onClick={onCancel}
            >
              {getCloseLabel()}
            </Button>
          ) : (
            <>
              <Button 
                variant="secondary" 
                onClick={onCancel} 
                disabled={isSubmitting}
              >
                {getCloseLabel()}
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting || submitDisabled}
              >
                {getSubmitLabel()}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
