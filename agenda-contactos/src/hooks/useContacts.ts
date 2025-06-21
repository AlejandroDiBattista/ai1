import { useState, useEffect } from 'react';
import type { Contact, ContactFormData } from '../types/contact';

const STORAGE_KEY = 'contacts-agenda';

// Datos de ejemplo para empezar
const initialContacts: Contact[] = [
  {
    id: '1',
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan.perez@email.com',
    phone: '+34 600 123 456',
    company: 'Acme Corp',
    notes: 'Cliente importante',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    firstName: 'María',
    lastName: 'García',
    email: 'maria.garcia@email.com',
    phone: '+34 700 987 654',
    company: 'Tech Solutions',
    notes: '',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10')
  }
];

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Cargar contactos del localStorage al montar el componente
  useEffect(() => {
    const savedContacts = localStorage.getItem(STORAGE_KEY);
    if (savedContacts) {
      try {
        const parsedContacts = JSON.parse(savedContacts).map((contact: any) => ({
          ...contact,
          createdAt: new Date(contact.createdAt),
          updatedAt: new Date(contact.updatedAt)
        }));
        setContacts(parsedContacts);
      } catch (error) {
        console.error('Error al cargar contactos:', error);
        setContacts(initialContacts);
      }
    } else {
      setContacts(initialContacts);
    }
  }, []);

  // Guardar contactos en localStorage cuando cambien
  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    }
  }, [contacts]);

  // Filtrar contactos basado en el término de búsqueda
  const filteredContacts = contacts.filter(contact => {
    const searchLower = searchTerm.toLowerCase();
    return (
      contact.firstName.toLowerCase().includes(searchLower) ||
      contact.lastName.toLowerCase().includes(searchLower) ||
      contact.email.toLowerCase().includes(searchLower) ||
      contact.phone.includes(searchTerm) ||
      (contact.company && contact.company.toLowerCase().includes(searchLower))
    );
  });

  const createContact = (contactData: ContactFormData): Contact => {
    const newContact: Contact = {
      id: Date.now().toString(),
      ...contactData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setContacts(prev => [newContact, ...prev]);
    return newContact;
  };

  const updateContact = (id: string, contactData: ContactFormData): Contact | null => {
    let updatedContact: Contact | null = null;
    
    setContacts(prev => prev.map(contact => {
      if (contact.id === id) {
        updatedContact = {
          ...contact,
          ...contactData,
          updatedAt: new Date()
        };
        return updatedContact;
      }
      return contact;
    }));

    return updatedContact;
  };

  const deleteContact = (id: string): boolean => {
    const contactExists = contacts.some(contact => contact.id === id);
    if (contactExists) {
      setContacts(prev => prev.filter(contact => contact.id !== id));
      return true;
    }
    return false;
  };

  const getContactById = (id: string): Contact | undefined => {
    return contacts.find(contact => contact.id === id);
  };

  return {
    contacts: filteredContacts,
    allContacts: contacts,
    searchTerm,
    setSearchTerm,
    createContact,
    updateContact,
    deleteContact,
    getContactById
  };
};
