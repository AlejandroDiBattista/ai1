import React from 'react';
import { DollarSign, Hash, Building2 } from 'lucide-react';
import { ListItemActions, ListCard, ListContainer, Avatar } from '../ui';
import type { Product } from '../../types/product';
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

  if (products.length === 0) {
    return (
      <ListContainer
        variant="products"
        isEmpty={true}
        emptyStateTitle="No hay productos"
        emptyStateMessage="Agrega tu primer producto para empezar"
      />
    );
  }

  return (
    <ListContainer variant="products">
      {products.map((product) => (
        <ListCard
          key={product.id}
          onClick={(e) => handleCardClick(product, e)}
        >
          <Avatar
            type="product"
            value={product.codigo}
            size="medium"
          />
          
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
          
          <ListItemActions
            item={product}
            onEdit={onEditProduct}
            onDelete={onDeleteProduct}
            editLabel="Editar producto"
            deleteLabel="Eliminar producto"
            confirmationMessage={`¿Estás seguro de que quieres eliminar el producto "${product.descripcion}"?`}
          />
        </ListCard>
      ))}
    </ListContainer>
  );
};
