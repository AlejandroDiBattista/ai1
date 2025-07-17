import React from 'react';
import styles from './ListCard.module.css';

interface ListCardProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

export const ListCard: React.FC<ListCardProps> = ({ 
  children, 
  onClick,
  className = ''
}) => {
  return (
    <div 
      className={`${styles.card} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
