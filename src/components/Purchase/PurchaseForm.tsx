import React, { useState, useEffect } from 'react';
import { User, ShoppingCart, Calculator, Plus, Trash2 } from 'lucide-react';
import { InputField, SelectField, TextAreaField, FormSection, FormContainer } from '../ui';
import type { Purchase, PurchaseFormData, PurchaseModalMode } from '../../types/purchase';
import type { Contact } from '../../types/contact';
import type { Product } from '../../types/product';
import styles from './PurchaseForm.module.css';

interface PurchaseFormProps {
  purchase?: Purchase;
  mode: PurchaseModalMode;
  contacts: Contact[];
  products: Product[];
  onSubmit: (data: PurchaseFormData) => void;
  onCancel: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

interface FormErrors {
  customerContactId?: string;
  items?: string;
  general?: string;
}

const TAX_RATE = 0.21; // 21% IVA

export const PurchaseForm: React.FC<PurchaseFormProps> = ({
  purchase,
  mode,
  contacts,
  products,
  onSubmit,
  onCancel,
  onEdit,
  onDelete
}) => {
  const [formData, setFormData] = useState<PurchaseFormData>({
    customerContactId: purchase?.customerContactId || '',
    items: purchase?.items.map(item => ({
      productId: item.productId,
      quantity: item.quantity.toString()
    })) || [{ productId: '', quantity: '' }],
    notes: purchase?.notes || ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (purchase) {
      setFormData({
        customerContactId: purchase.customerContactId,
        items: purchase.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity.toString()
        })),
        notes: purchase.notes || ''
      });
    }
  }, [purchase]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.customerContactId) {
      newErrors.customerContactId = 'Debe seleccionar un cliente';
    }

    const validItems = formData.items.filter(item => 
      item.productId && item.quantity && parseInt(item.quantity) > 0
    );

    if (validItems.length === 0) {
      newErrors.items = 'Debe agregar al menos un producto con cantidad válida';
    }

    // Verificar duplicados
    const productIds = validItems.map(item => item.productId);
    const duplicates = productIds.filter((id, index) => productIds.indexOf(id) !== index);
    if (duplicates.length > 0) {
      newErrors.items = 'No puede agregar el mismo producto múltiples veces';
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

  const handleCustomerChange = (customerId: string) => {
    setFormData(prev => ({ ...prev, customerContactId: customerId }));
    if (errors.customerContactId) {
      setErrors(prev => ({ ...prev, customerContactId: undefined }));
    }
  };

  const handleItemChange = (index: number, field: 'productId' | 'quantity', value: string) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData(prev => ({ ...prev, items: newItems }));

    if (errors.items) {
      setErrors(prev => ({ ...prev, items: undefined }));
    }
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { productId: '', quantity: '' }]
    }));
  };

  const removeItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const getItemSubtotal = (productId: string, quantity: string): number => {
    const product = products.find(p => p.id === productId);
    const qty = parseInt(quantity) || 0;
    return product ? product.precio * qty : 0;
  };

  const getTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => 
      sum + getItemSubtotal(item.productId, item.quantity), 0
    );
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;
    
    return { subtotal, tax, total };
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const isReadOnly = mode === 'view';
  const { subtotal, tax, total } = getTotals();
  const selectedCustomer = contacts.find(c => c.id === formData.customerContactId);

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
      entityName="Compra"
      submitDisabled={subtotal === 0}
    >
        {/* Sección Cliente */}
        <FormSection title="Cliente" icon={<User size={20} />} variant="customer">
        
        {isReadOnly ? (
          <InputField
            label="Cliente"
            value={selectedCustomer ? `${selectedCustomer.firstName} ${selectedCustomer.lastName}` : 'Cliente no encontrado'}
            readOnly={true}
          />
        ) : (
          <SelectField
            label="Cliente"
            value={formData.customerContactId}
            onChange={(e) => handleCustomerChange(e.target.value)}
            options={contacts.map(contact => ({
              value: contact.id,
              label: `${contact.firstName} ${contact.lastName} - ${contact.email}`
            }))}
            placeholder="Seleccionar cliente..."
            error={errors.customerContactId}
            readOnly={isReadOnly}
            required
          />
        )}

        {selectedCustomer && !isReadOnly && (
          <div className={styles['customer-info']}>
            <strong>{selectedCustomer.firstName} {selectedCustomer.lastName}</strong><br />
            {selectedCustomer.email} • {selectedCustomer.phone}<br />
            {selectedCustomer.company && <span>Empresa: {selectedCustomer.company}</span>}
          </div>
        )}

        {isReadOnly && selectedCustomer && (
          <>
            <InputField
              label="Email"
              value={selectedCustomer.email}
              readOnly={true}
            />
            <InputField
              label="Teléfono"
              value={selectedCustomer.phone}
              readOnly={true}
            />
            {selectedCustomer.company && (
              <InputField
                label="Empresa"
                value={selectedCustomer.company}
                readOnly={true}
              />
            )}
          </>
        )}
        </FormSection>

      {/* Sección Productos */}
      <FormSection title="Productos" icon={<ShoppingCart size={20} />} variant="items">
        <div className={styles['items-container']}>
          {formData.items.map((item, index) => {
            const product = products.find(p => p.id === item.productId);
            const itemSubtotal = getItemSubtotal(item.productId, item.quantity);
            
            return (
              <div key={index} className={styles['item-row']}>
                <div className={styles['item-select']}>
                  {isReadOnly ? (
                    <InputField
                      label="Producto"
                      value={product ? `${product.codigo} - ${product.descripcion}` : 'Producto no encontrado'}
                      readOnly={true}
                    />
                  ) : (
                    <SelectField
                      label="Producto"
                      value={item.productId}
                      onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                      options={products
                        .filter(p => p.stock > 0 || p.id === item.productId)
                        .map(product => ({
                          value: product.id,
                          label: `${product.codigo} - ${product.descripcion} (Stock: ${product.stock})`
                        }))}
                      placeholder="Seleccionar producto..."
                    />
                  )}
                </div>

                <div className={styles['item-quantity']}>
                  <InputField
                    label="Cantidad"
                    type="number"
                    min="1"
                    max={product?.stock || 999}
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    placeholder="0"
                    readOnly={isReadOnly}
                  />
                </div>

                <div className={styles['item-price']}>
                  <InputField
                    label="Precio Unitario"
                    value={product ? formatCurrency(product.precio) : '-'}
                    readOnly={true}
                  />
                </div>

                <div className={styles['item-subtotal-container']}>
                  <InputField
                    label="Subtotal"
                    value={formatCurrency(itemSubtotal)}
                    readOnly={true}
                  />
                </div>

                {!isReadOnly && formData.items.length > 1 && (
                  <button
                    type="button"
                    className={styles['remove-item']}
                    onClick={() => removeItem(index)}
                    aria-label="Eliminar producto"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            );
          })}

          {!isReadOnly && (
            <button
              type="button"
              className={styles['add-item']}
              onClick={addItem}
            >
              <Plus size={16} />
              Agregar producto
            </button>
          )}
        </div>
        </FormSection>

      {/* Sección Resumen */}
      <FormSection title="Resumen" icon={<Calculator size={20} />} variant="summary">
        <div className={styles['summary-grid']}>
          <div className={styles['summary-label']}>Subtotal:</div>
          <div className={styles['summary-value']}>{formatCurrency(subtotal)}</div>
          
          <div className={styles['summary-label']}>IVA (21%):</div>
          <div className={styles['summary-value']}>{formatCurrency(tax)}</div>
          
          <div className={`${styles['summary-label']} ${styles['summary-total']}`}>Total:</div>
          <div className={`${styles['summary-value']} ${styles['summary-total']}`}>
            {formatCurrency(total)}
          </div>
        </div>
        </FormSection>

      {/* Notas */}
            <TextAreaField
        label="Notas"
        placeholder="Observaciones adicionales..."
        value={formData.notes}
        onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
        readOnly={isReadOnly}
        rows={3}
      />
    </FormContainer>
  );
};
