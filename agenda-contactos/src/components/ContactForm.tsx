import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Building2, FileText } from 'lucide-react';
import { InputField } from './ui/InputField';
import { Button } from './ui/Button';
import type { Contact, ContactFormData, ContactModalMode } from '../types/contact';
import styles from './ContactForm.module.css';

interface ContactFormProps {
  contact?: Contact;
  mode: ContactModalMode;
  onSubmit: (data: ContactFormData) => void;
  onCancel: () => void;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  contact,
  mode,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: contact?.firstName || '',
    lastName: contact?.lastName || '',
    email: contact?.email || '',
    phone: contact?.phone || '',
    company: contact?.company || '',
    notes: contact?.notes || ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (contact) {
      setFormData({
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone,
        company: contact.company || '',
        notes: contact.notes || ''
      });
    }
  }, [contact]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es obligatorio';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es obligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300)); // Simular delay
      onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const isReadOnly = mode === 'view';
  
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {hasErrors && (
        <div className={styles['error-list']}>
          <p className={styles['error-title']}>Por favor, corrige los siguientes errores:</p>
          {Object.values(errors).map((error, index) => (
            <div key={index} className={styles['error-item']}>• {error}</div>
          ))}
        </div>
      )}

      <div className={styles['form-row']}>
        <InputField
          label="Nombre *"
          placeholder="Nombre"
          value={formData.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
          error={errors.firstName}
          icon={<User size={18} />}
          readOnly={isReadOnly}
          required
        />
        <InputField
          label="Apellidos *"
          placeholder="Apellidos"
          value={formData.lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
          error={errors.lastName}
          icon={<User size={18} />}
          readOnly={isReadOnly}
          required
        />
      </div>

      <InputField
        label="Email *"
        type="email"
        placeholder="ejemplo@email.com"
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
        error={errors.email}
        icon={<Mail size={18} />}
        readOnly={isReadOnly}
        required
      />

      <InputField
        label="Teléfono *"
        type="tel"
        placeholder="+34 600 123 456"
        value={formData.phone}
        onChange={(e) => handleChange('phone', e.target.value)}
        error={errors.phone}
        icon={<Phone size={18} />}
        readOnly={isReadOnly}
        required
      />

      <InputField
        label="Empresa"
        placeholder="Nombre de la empresa"
        value={formData.company}
        onChange={(e) => handleChange('company', e.target.value)}
        icon={<Building2 size={18} />}
        readOnly={isReadOnly}
      />

      <div>
        <label className={styles.label}>
          <FileText size={18} />
          Notas
        </label>
        <textarea
          className={styles.textarea}
          placeholder="Notas adicionales..."
          value={formData.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          readOnly={isReadOnly}
          rows={3}
        />
      </div>

      {!isReadOnly && (
        <div className={styles['form-actions']}>
          <Button variant="secondary" onClick={onCancel} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Guardando...' : mode === 'create' ? 'Crear Contacto' : 'Guardar Cambios'}
          </Button>
        </div>
      )}
    </form>
  );
};
