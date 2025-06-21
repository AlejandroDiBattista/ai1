import React, { useState, useEffect } from 'react';
import { User, ShoppingCart, Calculator, Plus, Trash2, FileText } from 'lucide-react';
import { Button } from './ui/Button';
import { InputField } from './ui/InputField';
import type { Purchase, PurchaseFormData, PurchaseModalMode } from '../types/purchase';
import type { Contact } from '../types/contact';
import type { Product } from '../types/product';
import styles from './PurchaseForm.module.css';

interface PurchaseFormProps {
  purchase?: Purchase;
  mode: PurchaseModalMode;
  contacts: Contact[];
  products: Product[];
  onSubmit: (data: PurchaseFormData) => void;
  onCancel: () => void;
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
  onCancel
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
  const hasErrors = Object.keys(errors).length > 0;
  const { subtotal, tax, total } = getTotals();
  const selectedCustomer = contacts.find(c => c.id === formData.customerContactId);

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

      {/* Sección Cliente */}
      <div className={`${styles.section} ${styles['customer-section']}`}>
        <h3 className={styles['section-title']}>
          <User size={20} />
          Cliente
        </h3>
        
        {isReadOnly ? (
          <InputField
            label="Cliente"
            value={selectedCustomer ? `${selectedCustomer.firstName} ${selectedCustomer.lastName}` : 'Cliente no encontrado'}
            icon={<User size={18} />}
            readOnly={true}
          />
        ) : (
          <div>
            <label htmlFor="customer">Cliente *</label>
            <select
              id="customer"
              className={`${styles.select} ${errors.customerContactId ? styles['select--error'] : ''}`}
              value={formData.customerContactId}
              onChange={(e) => handleCustomerChange(e.target.value)}
              disabled={isReadOnly}
              required
            >
              <option value="">Seleccionar cliente...</option>
              {contacts.map(contact => (
                <option key={contact.id} value={contact.id}>
                  {contact.firstName} {contact.lastName} - {contact.email}
                </option>
              ))}
            </select>
          </div>
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
              icon={<User size={18} />}
              readOnly={true}
            />
            <InputField
              label="Teléfono"
              value={selectedCustomer.phone}
              icon={<User size={18} />}
              readOnly={true}
            />
            {selectedCustomer.company && (
              <InputField
                label="Empresa"
                value={selectedCustomer.company}
                icon={<User size={18} />}
                readOnly={true}
              />
            )}
          </>
        )}
      </div>

      {/* Sección Productos */}
      <div className={`${styles.section} ${styles['items-section']}`}>
        <h3 className={styles['section-title']}>
          <ShoppingCart size={20} />
          Productos
        </h3>
        
        {isReadOnly ? (
          <div className={styles['items-readonly']}>
            {formData.items.map((item, index) => {
              const product = products.find(p => p.id === item.productId);
              const itemSubtotal = getItemSubtotal(item.productId, item.quantity);
              
              return (
                <div key={index} className={styles['readonly-item']}>
                  <div className={styles['form-row']}>
                    <InputField
                      label="Producto"
                      value={product ? `${product.codigo} - ${product.descripcion}` : 'Producto no encontrado'}
                      icon={<ShoppingCart size={18} />}
                      readOnly={true}
                    />
                    <InputField
                      label="Cantidad"
                      value={item.quantity}
                      icon={<ShoppingCart size={18} />}
                      readOnly={true}
                    />
                  </div>
                  <div className={styles['form-row']}>
                    <InputField
                      label="Precio Unitario"
                      value={product ? formatCurrency(product.precio) : '-'}
                      icon={<ShoppingCart size={18} />}
                      readOnly={true}
                    />
                    <InputField
                      label="Subtotal"
                      value={formatCurrency(itemSubtotal)}
                      icon={<ShoppingCart size={18} />}
                      readOnly={true}
                    />
                  </div>
                  {index < formData.items.length - 1 && <hr className={styles['item-separator']} />}
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles['items-container']}>
            {formData.items.map((item, index) => {
              const product = products.find(p => p.id === item.productId);
              const itemSubtotal = getItemSubtotal(item.productId, item.quantity);
              
              return (
                <div key={index} className={styles['item-row']}>
                  <div className={styles['item-select']}>
                    <label htmlFor={`product-${index}`}>Producto</label>
                    <select
                      id={`product-${index}`}
                      className={styles.select}
                      value={item.productId}
                      onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                      disabled={isReadOnly}
                    >
                      <option value="">Seleccionar producto...</option>
                      {products
                        .filter(p => p.stock > 0 || p.id === item.productId)
                        .map(product => (
                          <option key={product.id} value={product.id}>
                            {product.codigo} - {product.descripcion} (Stock: {product.stock})
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className={styles['item-quantity']}>
                    <label htmlFor={`quantity-${index}`}>Cantidad</label>
                    <input
                      id={`quantity-${index}`}
                      type="number"
                      min="1"
                      max={product?.stock || 999}
                      className={styles.select}
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      disabled={isReadOnly}
                      placeholder="0"
                    />
                  </div>

                  <div className={styles['item-price']}>
                    <label>Precio Unitario</label>
                    <div className={styles['item-subtotal']}>
                      {product ? formatCurrency(product.precio) : '-'}
                    </div>
                  </div>

                  <div className={styles['item-subtotal']}>
                    <label>Subtotal</label>
                    <div className={styles['item-subtotal']}>
                      {formatCurrency(itemSubtotal)}
                    </div>
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
        )}
      </div>

      {/* Sección Resumen */}
      <div className={`${styles.section} ${styles['summary-section']}`}>
        <h3 className={styles['section-title']}>
          <Calculator size={20} />
          Resumen
        </h3>
        
        {isReadOnly ? (
          <div className={styles['form-row']}>
            <InputField
              label="Subtotal"
              value={formatCurrency(subtotal)}
              icon={<Calculator size={18} />}
              readOnly={true}
            />
            <InputField
              label="IVA (21%)"
              value={formatCurrency(tax)}
              icon={<Calculator size={18} />}
              readOnly={true}
            />
            <InputField
              label="Total"
              value={formatCurrency(total)}
              icon={<Calculator size={18} />}
              readOnly={true}
            />
          </div>
        ) : (
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
        )}
      </div>

      {/* Notas */}
      <div>
        <label htmlFor="notes" className={styles['section-title']}>
          <FileText size={20} />
          Notas
        </label>
        <textarea
          id="notes"
          className={styles.textarea}
          placeholder="Notas adicionales sobre la compra..."
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          readOnly={isReadOnly}
          rows={3}
        />
      </div>

      {!isReadOnly && (
        <div className={styles['form-actions']}>
          <Button variant="secondary" onClick={onCancel} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting || subtotal === 0}>
            {isSubmitting ? 'Guardando...' : mode === 'create' ? 'Crear Compra' : 'Guardar Cambios'}
          </Button>
        </div>
      )}
    </form>
  );
};
