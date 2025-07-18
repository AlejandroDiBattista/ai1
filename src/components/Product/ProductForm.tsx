import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import { InputField, FormRow, FormContainer } from '../ui';
import type { Product, ProductFormData, ProductModalMode } from '../../types/product';
import styles from './ProductForm.module.css';

interface ProductFormProps {
  product?: Product;
  mode: ProductModalMode;
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
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
  onCancel,
  onEdit,
  onDelete
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
    <FormContainer
      errors={errors as Record<string, string | undefined>}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      onEdit={onEdit}
      onDelete={onDelete}
      isSubmitting={isSubmitting}
      isReadOnly={isReadOnly}
      mode={mode}
      entityName="Producto"
    >
        <FormRow>
          <InputField
            label="Código *"
            placeholder="SKU001"
            value={formData.codigo}
            onChange={(e) => handleChange('codigo', e.target.value.toUpperCase())}
            error={errors.codigo}
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
            readOnly={isReadOnly}
            required
            className={styles['number-input']}
          />
        </FormRow>

        <InputField
          label="Descripción *"
          placeholder="Descripción del producto"
          value={formData.descripcion}
          onChange={(e) => handleChange('descripcion', e.target.value)}
          error={errors.descripcion}
          readOnly={isReadOnly}
          required
        />

        <InputField
          label="Marca *"
          placeholder="Marca del producto"
          value={formData.marca}
          onChange={(e) => handleChange('marca', e.target.value)}
          error={errors.marca}
          readOnly={isReadOnly}
          required
        />

        <FormRow>
          <InputField
            label="Costo *"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={formData.costo}
            onChange={(e) => handleChange('costo', e.target.value)}
            error={errors.costo}
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
            readOnly={isReadOnly}
            required
            className={styles['currency-input']}
          />
        </FormRow>

        {(precio > 0 && costo > 0) && (
          <div className={getProfitClassName()}>
            <TrendingUp size={16} />
            <span>
              Margen: {margen.toFixed(1)}% | Ganancia: ${ganancia.toFixed(2)}
            </span>
          </div>
        )}
      </FormContainer>
    );
};
