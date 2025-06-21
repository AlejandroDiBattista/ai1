import React, { useState, useEffect } from 'react';
import { Hash, FileText, Tag, DollarSign, TrendingUp, Package } from 'lucide-react';
import { InputField } from './ui/InputField';
import { Button } from './ui/Button';
import type { Product, ProductFormData, ProductModalMode } from '../types/product';
import styles from './ProductForm.module.css';

interface ProductFormProps {
  product?: Product;
  mode: ProductModalMode;
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
}

interface FormErrors {
  codigo?: string;
  descripcion?: string;
  marca?: string;
  precio?: string;
  costo?: string;
  stock?: string;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  mode,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState<ProductFormData>({
    codigo: product?.codigo || '',
    descripcion: product?.descripcion || '',
    marca: product?.marca || '',
    precio: product?.precio?.toString() || '',
    costo: product?.costo?.toString() || '',
    stock: product?.stock?.toString() || ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        codigo: product.codigo,
        descripcion: product.descripcion,
        marca: product.marca,
        precio: product.precio.toString(),
        costo: product.costo.toString(),
        stock: product.stock.toString()
      });
    }
  }, [product]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.codigo.trim()) {
      newErrors.codigo = 'El código es obligatorio';
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es obligatoria';
    }

    if (!formData.marca.trim()) {
      newErrors.marca = 'La marca es obligatoria';
    }

    if (!formData.precio.trim()) {
      newErrors.precio = 'El precio es obligatorio';
    } else if (isNaN(parseFloat(formData.precio)) || parseFloat(formData.precio) <= 0) {
      newErrors.precio = 'El precio debe ser un número mayor a 0';
    }

    if (!formData.costo.trim()) {
      newErrors.costo = 'El costo es obligatorio';
    } else if (isNaN(parseFloat(formData.costo)) || parseFloat(formData.costo) <= 0) {
      newErrors.costo = 'El costo debe ser un número mayor a 0';
    }

    if (!formData.stock.trim()) {
      newErrors.stock = 'El stock es obligatorio';
    } else if (isNaN(parseInt(formData.stock)) || parseInt(formData.stock) < 0) {
      newErrors.stock = 'El stock debe ser un número mayor o igual a 0';
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

  const handleChange = (field: keyof ProductFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const isReadOnly = mode === 'view';
  const hasErrors = Object.keys(errors).length > 0;

  // Calcular margen de ganancia
  const precio = parseFloat(formData.precio) || 0;
  const costo = parseFloat(formData.costo) || 0;
  const margen = precio > 0 && costo > 0 ? ((precio - costo) / precio * 100) : 0;
  const ganancia = precio - costo;

  const getProfitClassName = () => {
    if (margen > 20) return `${styles['profit-info']} ${styles['profit-positive']}`;
    if (margen < 10) return `${styles['profit-info']} ${styles['profit-negative']}`;
    return styles['profit-info'];
  };

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
          label="Código *"
          placeholder="SKU001"
          value={formData.codigo}
          onChange={(e) => handleChange('codigo', e.target.value.toUpperCase())}
          error={errors.codigo}
          icon={<Hash size={18} />}
          readOnly={isReadOnly}
          required
        />
        <InputField
          label="Stock *"
          type="number"
          placeholder="0"
          value={formData.stock}
          onChange={(e) => handleChange('stock', e.target.value)}
          error={errors.stock}
          icon={<Package size={18} />}
          readOnly={isReadOnly}
          required
          className={styles['number-input']}
        />
      </div>

      <InputField
        label="Descripción *"
        placeholder="Descripción del producto"
        value={formData.descripcion}
        onChange={(e) => handleChange('descripcion', e.target.value)}
        error={errors.descripcion}
        icon={<FileText size={18} />}
        readOnly={isReadOnly}
        required
      />

      <InputField
        label="Marca *"
        placeholder="Marca del producto"
        value={formData.marca}
        onChange={(e) => handleChange('marca', e.target.value)}
        error={errors.marca}
        icon={<Tag size={18} />}
        readOnly={isReadOnly}
        required
      />

      <div className={styles['form-row']}>
        <InputField
          label="Costo *"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={formData.costo}
          onChange={(e) => handleChange('costo', e.target.value)}
          error={errors.costo}
          icon={<DollarSign size={18} />}
          readOnly={isReadOnly}
          required
          className={styles['currency-input']}
        />
        <InputField
          label="Precio *"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={formData.precio}
          onChange={(e) => handleChange('precio', e.target.value)}
          error={errors.precio}
          icon={<DollarSign size={18} />}
          readOnly={isReadOnly}
          required
          className={styles['currency-input']}
        />
      </div>

      {(precio > 0 && costo > 0) && (
        <div className={getProfitClassName()}>
          <TrendingUp size={16} />
          <span>
            Margen: {margen.toFixed(1)}% | Ganancia: ${ganancia.toFixed(2)}
          </span>
        </div>
      )}

      {!isReadOnly && (
        <div className={styles['form-actions']}>
          <Button variant="secondary" onClick={onCancel} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Guardando...' : mode === 'create' ? 'Crear Producto' : 'Guardar Cambios'}
          </Button>
        </div>
      )}
    </form>
  );
};
