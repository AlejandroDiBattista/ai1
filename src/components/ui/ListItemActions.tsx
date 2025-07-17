import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import styles from './ListItemActions.module.css';

export interface ListItemActionsProps<T = any> {
  item: T;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  editLabel?: string;
  deleteLabel?: string;
  showConfirmation?: boolean;
  confirmationMessage?: string;
  className?: string;
}

export const ListItemActions = <T extends { id: string }>({
  item,
  onEdit,
  onDelete,
  editLabel = "Editar",
  deleteLabel = "Eliminar",
  showConfirmation = true,
  confirmationMessage,
  className
}: ListItemActionsProps<T>) => {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(item);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (showConfirmation) {
      const message = confirmationMessage || `¿Estás seguro de que quieres eliminar este elemento?`;
      if (window.confirm(message)) {
        onDelete(item);
      }
    } else {
      onDelete(item);
    }
  };

  return (
    <div className={`${styles.actions} ${className || ''}`}>
      <button
        className={`${styles['action-button']} ${styles['edit-button']}`}
        onClick={handleEdit}
        aria-label={editLabel}
      >
        <Edit size={16} />
      </button>
      <button
        className={`${styles['action-button']} ${styles['delete-button']}`}
        onClick={handleDelete}
        aria-label={deleteLabel}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};
