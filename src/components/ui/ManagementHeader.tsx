import React from 'react';
import { Plus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from './Button';
import { SearchBar } from '../SearchBar';
import styles from './ManagementHeader.module.css';

export interface ManagementHeaderProps {
  title: string;
  icon: LucideIcon;
  itemCount: number;
  onAddNew: () => void;
  addButtonLabel: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  statsText: string;
  className?: string;
}

export const ManagementHeader: React.FC<ManagementHeaderProps> = ({
  title,
  icon: Icon,
  itemCount,
  onAddNew,
  addButtonLabel,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  statsText,
  className
}) => {
  return (
    <header className={`${styles.header} ${className || ''}`}>
      <div className={styles['title-section']}>
        <div className={styles['title-group']}>
          <Icon size={28} className={styles['title-icon']} />
          <h1 className={styles.title}>{title}</h1>
          <span className={styles['title-badge']}>
            {itemCount}
          </span>
        </div>
        <Button onClick={onAddNew}>
          <Plus size={18} />
          {addButtonLabel}
        </Button>
      </div>
      
      <div className={styles['search-section']}>
        <SearchBar
          value={searchValue}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
        />
        <span className={styles.stats}>
          {statsText}
        </span>
      </div>
    </header>
  );
};
