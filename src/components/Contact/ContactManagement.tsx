import { useState } from 'react';
import { Users, Plus } from 'lucide-react';
import { ContactList } from './ContactList';
import { ContactForm } from './ContactForm';
import { Modal } from '../ui/Modal';
import { ManagementHeader } from '../ui/ManagementHeader';
import { useContacts } from '../../hooks/Contact/useContacts';
import type { Contact, ContactModalMode, ContactFormData } from '../../types/contact';
import styles from '../../App.module.css';

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
      <ManagementHeader
        title="Agenda de Contactos"
        icon={Users}
        itemCount={allContacts.length}
        onAddNew={openCreateModal}
        addButtonLabel="Nuevo Contacto"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Buscar por nombre, email, teléfono o empresa..."
        statsText={getContactStats()}
      />

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
      >
        <ContactForm
          contact={selectedContact}
          mode={modalMode}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          onEdit={modalMode === 'view' && selectedContact ? () => {
            closeModal();
            openEditModal(selectedContact);
          } : undefined}
          onDelete={modalMode === 'view' && selectedContact ? () => {
            closeModal();
            handleDeleteContact(selectedContact);
          } : undefined}
        />
      </Modal>
    </>
  );
};
