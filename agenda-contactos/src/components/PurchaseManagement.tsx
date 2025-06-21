import React, { useState } from 'react';
import { Plus, ShoppingCart } from 'lucide-react';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import { SearchBar } from './SearchBar';
import { PurchaseForm } from './PurchaseForm';
import { PurchaseList } from './PurchaseList';
import { usePurchases } from '../hooks/usePurchases';
import type { Purchase, PurchaseFormData, PurchaseModalMode } from '../types/purchase';
import type { Contact } from '../types/contact';
import type { Product } from '../types/product';
import styles from '../App.module.css';

interface PurchaseManagementProps {
  contacts: Contact[];
  products: Product[];
}

export const PurchaseManagement: React.FC<PurchaseManagementProps> = ({
  contacts,
  products
}) => {
  const {
    purchases,
    searchTerm,
    setSearchTerm,
    createPurchase,
    updatePurchase,
    deletePurchase
  } = usePurchases();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<PurchaseModalMode>('create');
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | undefined>();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [purchaseToDelete, setPurchaseToDelete] = useState<Purchase | null>(null);

  const handleCreatePurchase = () => {
    setModalMode('create');
    setSelectedPurchase(undefined);
    setIsModalOpen(true);
  };

  const handleViewPurchase = (purchase: Purchase) => {
    setModalMode('view');
    setSelectedPurchase(purchase);
    setIsModalOpen(true);
  };

  const handleEditPurchase = (purchase: Purchase) => {
    setModalMode('edit');
    setSelectedPurchase(purchase);
    setIsModalOpen(true);
  };

  const handleDeletePurchase = (purchase: Purchase) => {
    setPurchaseToDelete(purchase);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (purchaseToDelete) {
      deletePurchase(purchaseToDelete.id);
      setShowDeleteConfirm(false);
      setPurchaseToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setPurchaseToDelete(null);
  };

  const handleFormSubmit = (formData: PurchaseFormData) => {
    if (modalMode === 'create') {
      createPurchase(formData, products);
    } else if (modalMode === 'edit' && selectedPurchase) {
      updatePurchase(selectedPurchase.id, formData, products);
    }
    setIsModalOpen(false);
    setSelectedPurchase(undefined);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPurchase(undefined);
  };

  const getPurchaseStats = () => {
    const total = purchases.length;
    return `${total} compra${total !== 1 ? 's' : ''}`;
  };

  const getModalTitle = (): string => {
    switch (modalMode) {
      case 'create':
        return 'Nueva Compra';
      case 'edit':
        return 'Editar Compra';
      case 'view':
        return 'Detalles de Compra';
      default:
        return 'Compra';
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles['title-section']}>
          <div className={styles['title-group']}>
            <ShoppingCart size={28} className={styles['title-icon']} />
            <h1 className={styles.title}>Gestión de Compras</h1>
            <span className={styles['title-badge']}>
              {purchases.length}
            </span>
          </div>
          <Button onClick={handleCreatePurchase}>
            <Plus size={18} />
            Nueva Compra
          </Button>
        </div>
        
        <div className={styles['search-section']}>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar por ID, total, estado o notas..."
          />
          <span className={styles.stats}>
            {getPurchaseStats()}
          </span>
        </div>
      </header>

      <PurchaseList
        purchases={purchases}
        contacts={contacts}
        onView={handleViewPurchase}
        onEdit={handleEditPurchase}
        onDelete={handleDeletePurchase}
      />

      {/* Modal para crear/editar/ver compras */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={getModalTitle()}
        size="large"
        footer={modalMode === 'view' ? (
          <Button onClick={handleModalClose}>Cerrar</Button>
        ) : undefined}
      >
        <PurchaseForm
          purchase={selectedPurchase}
          mode={modalMode}
          contacts={contacts}
          products={products}
          onSubmit={handleFormSubmit}
          onCancel={handleModalClose}
        />
      </Modal>

      {/* Modal de confirmación para eliminar */}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={cancelDelete}
        title="Confirmar Eliminación"
      >
        <div className={styles.confirmContainer}>
          <p className={styles.confirmText}>
            ¿Estás seguro de que deseas eliminar la compra #{purchaseToDelete?.id}?
          </p>
          <p className={styles.confirmSubtext}>
            Esta acción no se puede deshacer.
          </p>
          <div className={styles.confirmActions}>
            <Button variant="secondary" onClick={cancelDelete}>
              Cancelar
            </Button>
            <Button onClick={confirmDelete}>
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
