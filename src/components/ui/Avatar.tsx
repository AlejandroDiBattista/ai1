import React from 'react';
import styles from './Avatar.module.css';

export interface AvatarProps {
  type: 'contact' | 'product' | 'purchase';
  value: string;
  firstName?: string;
  lastName?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  type,
  value,
  firstName,
  lastName,
  size = 'medium',
  className
}) => {
  const getDisplayText = (): string => {
    switch (type) {
      case 'contact':
        if (firstName && lastName) {
          return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
        }
        return value.substring(0, 2).toUpperCase();
      
      case 'product':
        return value.substring(0, 2).toUpperCase();
      
      case 'purchase':
        return value.substring(0, 2).toUpperCase();
      
      default:
        return value.substring(0, 2).toUpperCase();
    }
  };

  return (
    <div 
      className={`${styles.avatar} ${styles[`avatar--${size}`]} ${styles[`avatar--${type}`]} ${className || ''}`}
    >
      {getDisplayText()}
    </div>
  );
};
