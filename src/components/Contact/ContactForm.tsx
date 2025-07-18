import React, { useState, useEffect } from 'react';
import { InputField, TextAreaField, FormRow, FormContainer } from '../ui';
import type { Contact, ContactFormData, ContactModalMode } from '../../types/contact';

interface ContactFormProps {
  contact?: Contact;
  mode: ContactModalMode;
  onSubmit: (data: ContactFormData) => void;
  onCancel: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
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
  onCancel,
  onEdit,
  onDelete
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

  return (
    <FormContainer
      errors={errors as Record<string, string | undefined>}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      onEdit={onEdit}
      onDelete={onDelete}
      isSubmitting={isSubmitting}
      isReadOnly={isReadOnly}
      mode={mode}
      entityName="Contacto"
    >
      <FormRow>
        <InputField
          label="Nombre *"
          placeholder="Nombre"
          value={formData.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
          error={errors.firstName}
          readOnly={isReadOnly}
          required
        />
        <InputField
          label="Apellidos *"
          placeholder="Apellidos"
          value={formData.lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
          error={errors.lastName}
          readOnly={isReadOnly}
          required
        />
      </FormRow>

      <InputField
        label="Email *"
        type="email"
        placeholder="ejemplo@email.com"
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
        error={errors.email}
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
        readOnly={isReadOnly}
        required
      />

      <InputField
        label="Empresa"
        placeholder="Nombre de la empresa"
        value={formData.company}
        onChange={(e) => handleChange('company', e.target.value)}
        readOnly={isReadOnly}
      />

      <TextAreaField
        label="Notas"
        placeholder="Notas adicionales..."
        value={formData.notes}
        onChange={(e) => handleChange('notes', e.target.value)}
        readOnly={isReadOnly}
        rows={3}
      />
    </FormContainer>
  );
};
