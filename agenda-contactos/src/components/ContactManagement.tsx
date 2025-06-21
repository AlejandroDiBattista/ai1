import { useState } from 'react';
import { Plus, Users } from 'lucide-react';
import { ContactList } from './ContactList';
import { ContactForm } from './ContactForm';
import { SearchBar } from './SearchBar';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { useContacts } from '../hooks/useContacts';
import type { Contact, ContactModalMode, ContactFormData } from '../types/contact';
import styles from '../App.module.css';

export const ContactManagement = () => {
  const {
    contacts,
    allContacts,
    searchTerm,
    setSearchTerm,
    createContact,
    updateContact,
    deleteContact
  } = useContacts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ContactModalMode>('create');
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>();

  const openCreateModal = () => {
    setSelectedContact(undefined);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const openEditModal = (contact: Contact) => {
    setSelectedContact(contact);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const openViewModal = (contact: Contact) => {
    setSelectedContact(contact);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContact(undefined);
  };

  const handleSubmit = (data: ContactFormData) => {
    if (modalMode === 'create') {
      createContact(data);
    } else if (modalMode === 'edit' && selectedContact) {
      updateContact(selectedContact.id, data);
    }
    closeModal();
  };

  const handleDeleteContact = (contact: Contact) => {
    deleteContact(contact.id);
  };

  const getModalTitle = () => {
    switch (modalMode) {
      case 'create':
        return 'Nuevo Contacto';
      case 'edit':
        return 'Editar Contacto';
      case 'view':
        return `${selectedContact?.firstName} ${selectedContact?.lastName}`;
      default:
        return 'Contacto';
    }
  };

  const getContactStats = () => {
    const total = allContacts.length;
    const showing = contacts.length;
    if (searchTerm) {
      return `Mostrando ${showing} de ${total} contactos`;
    }
    return `${total} contacto${total !== 1 ? 's' : ''}`;
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles['title-section']}>
          <div className={styles['title-group']}>
            <Users size={28} className={styles['title-icon']} />
            <h1 className={styles.title}>Agenda de Contactos</h1>
            <span className={styles['title-badge']}>
              {allContacts.length}
            </span>
          </div>
          <Button onClick={openCreateModal}>
            <Plus size={18} />
            Nuevo Contacto
          </Button>
        </div>
        
        <div className={styles['search-section']}>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar por nombre, email, teléfono o empresa..."
          />
          <span className={styles.stats}>
            {getContactStats()}
          </span>
        </div>
      </header>

      <ContactList
        contacts={contacts}
        onEditContact={openEditModal}
        onDeleteContact={handleDeleteContact}
        onViewContact={openViewModal}
      />

      <button
        className={styles.fab}
        onClick={openCreateModal}
        aria-label="Agregar nuevo contacto"
      >
        <Plus size={24} />
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={getModalTitle()}
        footer={modalMode === 'view' ? (
          <Button onClick={closeModal}>Cerrar</Button>
        ) : undefined}
      >
        <ContactForm
          contact={selectedContact}
          mode={modalMode}
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      </Modal>
    </>
  );
};
