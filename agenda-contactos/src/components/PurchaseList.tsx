import React from 'react';
import { Edit, Trash2, User, Calendar, DollarSign } from 'lucide-react';
import type { Purchase } from '../types/purchase';
import type { Contact } from '../types/contact';
import styles from './PurchaseList.module.css';

interface PurchaseListProps {
  purchases: Purchase[];
  contacts: Contact[];
  onView: (purchase: Purchase) => void;
  onEdit: (purchase: Purchase) => void;
  onDelete: (purchase: Purchase) => void;
}

export const PurchaseList: React.FC<PurchaseListProps> = ({
  purchases,
  contacts,
  onView,
  onEdit,
  onDelete
}) => {
  const getCustomerName = (customerContactId: string): string => {
    const contact = contacts.find(c => c.id === customerContactId);
    return contact ? `${contact.firstName} ${contact.lastName}` : 'Cliente no encontrado';
  };

  const getPurchaseIcon = (id: string): string => {
    return id.substring(0, 2).toUpperCase();
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(date));
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const handleCardClick = (purchase: Purchase, e: React.MouseEvent) => {
    // No abrir el modal si se hizo clic en un botón de acción
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    onView(purchase);
  };

  const handleEdit = (purchase: Purchase, e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(purchase);
  };

  const handleDelete = (purchase: Purchase, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`¿Estás seguro de que deseas eliminar la compra #${purchase.id}?`)) {
      onDelete(purchase);
    }
  };

  if (purchases.length === 0) {
    return (
      <div className={styles['empty-state']}>
        <h3>No hay compras registradas</h3>
        <p>Comienza creando tu primera compra</p>
      </div>
    );
  }

  return (
    <div className={styles['list-container']}>
      {purchases.map((purchase) => (
        <div
          key={purchase.id}
          className={styles['contact-card']}
          onClick={(e) => handleCardClick(purchase, e)}
        >
          <div className={styles.avatar}>
            {getPurchaseIcon(purchase.id)}
          </div>
          
          <div className={styles.info}>
            <h3 className={styles.name}>
              Compra #{purchase.id}
            </h3>
            <div className={styles['contact-info']}>
              <div className={styles['contact-detail']}>
                <User size={14} />
                {getCustomerName(purchase.customerContactId)}
              </div>
              <div className={styles['contact-detail']}>
                <Calendar size={14} />
                {formatDate(purchase.createdAt)}
              </div>
              <div className={styles['contact-detail']}>
                <DollarSign size={14} />
                {formatCurrency(purchase.total)}
              </div>
            </div>
          </div>
          
          <div className={styles.actions}>
            <button
              className={`${styles['action-button']} ${styles['edit-button']}`}
              onClick={(e) => handleEdit(purchase, e)}
              aria-label="Editar compra"
            >
              <Edit size={16} />
            </button>
            <button
              className={`${styles['action-button']} ${styles['delete-button']}`}
              onClick={(e) => handleDelete(purchase, e)}
              aria-label="Eliminar compra"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
