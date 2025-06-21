import React from 'react';
import { Edit, Trash2, DollarSign, Hash, Building2 } from 'lucide-react';
import type { Product } from '../types/product';
import styles from './ProductList.module.css';

interface ProductListProps {
  products: Product[];
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  onEditProduct,
  onDeleteProduct,
  onViewProduct
}) => {
  const getProductIcon = (codigo: string): string => {
    return codigo.substring(0, 2).toUpperCase();
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const handleCardClick = (product: Product, e: React.MouseEvent) => {
    // No abrir el modal si se hizo clic en un botón de acción
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    onViewProduct(product);
  };

  const handleEdit = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onEditProduct(product);
  };

  const handleDelete = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`¿Estás seguro de que quieres eliminar el producto "${product.descripcion}"?`)) {
      onDeleteProduct(product);
    }
  };

  if (products.length === 0) {
    return (
      <div className={styles['empty-state']}>
        <h3>No hay productos</h3>
        <p>Agrega tu primer producto para empezar</p>
      </div>
    );
  }

  return (
    <div className={styles['list-container']}>
      {products.map((product) => (
        <div
          key={product.id}
          className={styles['contact-card']}
          onClick={(e) => handleCardClick(product, e)}
        >
          <div className={styles.avatar}>
            {getProductIcon(product.codigo)}
          </div>
          
          <div className={styles.info}>
            <h3 className={styles.name}>
              {product.descripcion}
            </h3>
            <div className={styles['contact-info']}>
              <div className={styles['contact-detail']}>
                <Hash size={14} />
                {product.codigo}
              </div>
              <div className={styles['contact-detail']}>
                <Building2 size={14} />
                {product.marca}
              </div>
              <div className={styles['contact-detail']}>
                <DollarSign size={14} />
                {formatCurrency(product.precio)}
              </div>
            </div>
          </div>
          
          <div className={styles.actions}>
            <button
              className={`${styles['action-button']} ${styles['edit-button']}`}
              onClick={(e) => handleEdit(product, e)}
              aria-label="Editar producto"
            >
              <Edit size={16} />
            </button>
            <button
              className={`${styles['action-button']} ${styles['delete-button']}`}
              onClick={(e) => handleDelete(product, e)}
              aria-label="Eliminar producto"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
