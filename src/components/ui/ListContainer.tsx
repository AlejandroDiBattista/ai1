import React from 'react';
import styles from './ListContainer.module.css';

interface ListContainerProps {
  children?: React.ReactNode;
  variant?: 'default' | 'contacts' | 'products' | 'purchases';
  className?: string;
  emptyStateTitle?: string;
  emptyStateMessage?: string;
  isEmpty?: boolean;
}

export const ListContainer: React.FC<ListContainerProps> = ({ 
  children, 
  variant = 'default',
  className,
  emptyStateTitle,
  emptyStateMessage,
  isEmpty = false
}) => {
  if (isEmpty) {
    return (
      <div className={`${styles['list-container']} ${styles[`list-container--${variant}`]} ${className || ''}`}>
        <div className={styles['empty-state']}>
          {emptyStateTitle && <h3>{emptyStateTitle}</h3>}
          {emptyStateMessage && <p>{emptyStateMessage}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles['list-container']} ${styles[`list-container--${variant}`]} ${className || ''}`}>
      {children}
    </div>
  );
};
