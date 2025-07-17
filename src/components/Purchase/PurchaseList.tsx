import React from 'react';
import { User, Calendar, DollarSign } from 'lucide-react';
import { ListItemActions, ListCard, ListContainer, Avatar } from '../ui';
import type { Purchase } from '../../types/purchase';
import type { Contact } from '../../types/contact';
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

  if (purchases.length === 0) {
    return (
      <ListContainer
        variant="purchases"
        isEmpty={true}
        emptyStateTitle="No hay compras registradas"
        emptyStateMessage="Comienza creando tu primera compra"
      />
    );
  }

  return (
    <ListContainer variant="purchases">
      {purchases.map((purchase) => (
        <ListCard
          key={purchase.id}
          onClick={(e) => handleCardClick(purchase, e)}
        >
          <Avatar
            type="purchase"
            value={purchase.id}
            size="medium"
          />
          
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
          
          <ListItemActions
            item={purchase}
            onEdit={onEdit}
            onDelete={onDelete}
            editLabel="Editar compra"
            deleteLabel="Eliminar compra"
            confirmationMessage={`¿Estás seguro de que deseas eliminar la compra #${purchase.id}?`}
          />
        </ListCard>
      ))}
    </ListContainer>
  );
};
