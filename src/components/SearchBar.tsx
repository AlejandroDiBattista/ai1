import React from 'react';
import { Search, X } from 'lucide-react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Buscar contactos..."
}) => {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className={styles['search-container']}>
      <Search size={18} className={styles['search-icon']} />
      <input
        type="text"
        className={styles['search-input']}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          className={styles['clear-button']}
          onClick={handleClear}
          aria-label="Limpiar búsqueda"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
