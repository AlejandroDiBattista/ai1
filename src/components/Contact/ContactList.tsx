import React from 'react';
import { Mail, Phone, Building2 } from 'lucide-react';
import { ListItemActions, ListCard, ListContainer, Avatar } from '../ui';
import type { Contact } from '../../types/contact';
import styles from './ContactList.module.css';

interface ContactListProps {
  contacts: Contact[];
  onEditContact: (contact: Contact) => void;
  onDeleteContact: (contact: Contact) => void;
  onViewContact: (contact: Contact) => void;
}

export const ContactList: React.FC<ContactListProps> = ({
  contacts,
  onEditContact,
  onDeleteContact,
  onViewContact
}) => {
  const handleCardClick = (contact: Contact, e: React.MouseEvent) => {
    // No abrir el modal si se hizo clic en un botón de acción
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    onViewContact(contact);
  };

  if (contacts.length === 0) {
    return (
      <ListContainer
        variant="contacts"
        isEmpty={true}
        emptyStateTitle="No hay contactos"
        emptyStateMessage="Agrega tu primer contacto para empezar"
      />
    );
  }

  return (
    <ListContainer variant="contacts">
      {contacts.map((contact) => (
        <ListCard
          key={contact.id}
          onClick={(e) => handleCardClick(contact, e)}
        >
          <Avatar
            type="contact"
            value=""
            firstName={contact.firstName}
            lastName={contact.lastName}
            size="medium"
          />
          
          <div className={styles.info}>
            <h3 className={styles.name}>
              {contact.firstName} {contact.lastName}
            </h3>
            <div className={styles['contact-info']}>
              <div className={styles['contact-detail']}>
                <Mail size={14} />
                {contact.email}
              </div>
              <div className={styles['contact-detail']}>
                <Phone size={14} />
                {contact.phone}
              </div>
              {contact.company && (
                <div className={styles['contact-detail']}>
                  <Building2 size={14} />
                  {contact.company}
                </div>
              )}
            </div>
          </div>
          
          <ListItemActions
            item={contact}
            onEdit={onEditContact}
            onDelete={onDeleteContact}
            editLabel="Editar contacto"
            deleteLabel="Eliminar contacto"
            confirmationMessage={`¿Estás seguro de que quieres eliminar a ${contact.firstName} ${contact.lastName}?`}
          />
        </ListCard>
      ))}
    </ListContainer>
  );
};
