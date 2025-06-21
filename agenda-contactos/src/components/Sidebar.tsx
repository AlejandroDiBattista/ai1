import React, { useState, useEffect } from 'react';
import { Users, Package, ShoppingCart, Menu, X, BarChart3 } from 'lucide-react';
import styles from './Sidebar.module.css';

interface SidebarProps {
  activeSection: 'contacts' | 'products' | 'purchases';
  onSectionChange: (section: 'contacts' | 'products' | 'purchases') => void;
  contactsCount: number;
  productsCount: number;
  purchasesCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSectionChange,
  contactsCount,
  productsCount,
  purchasesCount
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
      if (window.innerWidth > 1024) {
        setIsOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSectionChange = (section: 'contacts' | 'products' | 'purchases') => {
    onSectionChange(section);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const handleOverlayClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        className={styles['toggle-button']}
        onClick={toggleSidebar}
        aria-label="Alternar menú"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div
        className={`${styles.overlay} ${isOpen ? styles['overlay--visible'] : ''}`}
        onClick={handleOverlayClick}
      />

      <aside
        className={`${styles.sidebar} ${
          isMobile ? (isOpen ? styles['sidebar--open'] : '') : ''
        }`}
      >
        <div className={styles.header}>
          <div className={styles.logo}>
            <div className={styles['logo-icon']}>
              AG
            </div>
            <div>
              <h1 className={styles['app-title']}>Sistema ABM</h1>
              <p className={styles['app-subtitle']}>Gestión Empresarial</p>
            </div>
          </div>
        </div>

        <nav className={styles.navigation}>
          <div className={styles['nav-section']}>
            <h2 className={styles['nav-title']}>Gestión</h2>
            
            <button
              className={`${styles['nav-item']} ${
                activeSection === 'contacts' ? styles['nav-item--active'] : ''
              }`}
              onClick={() => handleSectionChange('contacts')}
            >
              <Users size={20} />
              <span>Contactos</span>
              <span className={styles['nav-badge']}>{contactsCount}</span>
            </button>

            <button
              className={`${styles['nav-item']} ${
                activeSection === 'products' ? styles['nav-item--active'] : ''
              }`}
              onClick={() => handleSectionChange('products')}
            >
              <Package size={20} />
              <span>Productos</span>
              <span className={styles['nav-badge']}>{productsCount}</span>
            </button>

            <button
              className={`${styles['nav-item']} ${
                activeSection === 'purchases' ? styles['nav-item--active'] : ''
              }`}
              onClick={() => handleSectionChange('purchases')}
            >
              <ShoppingCart size={20} />
              <span>Compras</span>
              <span className={styles['nav-badge']}>{purchasesCount}</span>
            </button>
          </div>

          <div className={styles['nav-section']}>
            <h2 className={styles['nav-title']}>Reportes</h2>
            
            <button
              className={`${styles['nav-item']} ${styles['nav-item--disabled']}`}
              disabled
            >
              <BarChart3 size={20} />
              <span>Estadísticas</span>
              <span className={styles['nav-badge']}>Soon</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};
