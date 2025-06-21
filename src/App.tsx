import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ContactManagement } from './components/ContactManagement';
import { ProductManagement } from './components/ProductManagement';
import { PurchaseManagement } from './components/PurchaseManagement';
import { useContacts } from './hooks/useContacts';
import { useProducts } from './hooks/useProducts';
import { usePurchases } from './hooks/usePurchases';
import styles from './App.module.css';

type AppSection = 'contacts' | 'products' | 'purchases';

function App() {
  const [activeSection, setActiveSection] = useState<AppSection>('contacts');
  const [isMobile, setIsMobile] = useState(false);
  
  const { allContacts } = useContacts();
  const { allProducts } = useProducts();
  const { allPurchases } = usePurchases();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSectionChange = (section: AppSection) => {
    setActiveSection(section);
  };

  return (
    <div className={styles.app}>
      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        contactsCount={allContacts.length}
        productsCount={allProducts.length}
        purchasesCount={allPurchases.length}
      />
      
      <div className={`${styles['main-content']} ${isMobile ? styles['main-content--collapsed'] : ''}`}>
        <div className={styles.container}>
          {activeSection === 'contacts' && <ContactManagement />}
          {activeSection === 'products' && <ProductManagement />}
          {activeSection === 'purchases' && (
            <PurchaseManagement
              contacts={allContacts}
              products={allProducts}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
