import React from 'react';
import { Mail, Phone, Building2, Edit, Trash2 } from 'lucide-react';
import type { Contact } from '../types/contact';
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
  const getInitials = (firstName: string, lastName: string): string => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const handleCardClick = (contact: Contact, e: React.MouseEvent) => {
    // No abrir el modal si se hizo clic en un botón de acción
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    onViewContact(contact);
  };

  const handleEdit = (contact: Contact, e: React.MouseEvent) => {
    e.stopPropagation();
    onEditContact(contact);
  };

  const handleDelete = (contact: Contact, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`¿Estás seguro de que quieres eliminar a ${contact.firstName} ${contact.lastName}?`)) {
      onDeleteContact(contact);
    }
  };

  if (contacts.length === 0) {
    return (
      <div className={styles['empty-state']}>
        <h3>No hay contactos</h3>
        <p>Agrega tu primer contacto para empezar</p>
      </div>
    );
  }

  return (
    <div className={styles['list-container']}>
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className={styles['contact-card']}
          onClick={(e) => handleCardClick(contact, e)}
        >
          <div className={styles.avatar}>
            {getInitials(contact.firstName, contact.lastName)}
          </div>
          
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
          
          <div className={styles.actions}>
            <button
              className={`${styles['action-button']} ${styles['edit-button']}`}
              onClick={(e) => handleEdit(contact, e)}
              aria-label="Editar contacto"
            >
              <Edit size={16} />
            </button>
            <button
              className={`${styles['action-button']} ${styles['delete-button']}`}
              onClick={(e) => handleDelete(contact, e)}
              aria-label="Eliminar contacto"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
