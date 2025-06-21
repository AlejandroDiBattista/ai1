import { useState } from 'react';
import { Plus, Package } from 'lucide-react';
import { ProductList } from './ProductList';
import { ProductForm } from './ProductForm';
import { SearchBar } from './SearchBar';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { useProducts } from '../hooks/useProducts';
import type { Product, ProductModalMode, ProductFormData } from '../types/product';
import styles from '../App.module.css';

export const ProductManagement = () => {
  const {
    products,
    allProducts,
    searchTerm,
    setSearchTerm,
    createProduct,
    updateProduct,
    deleteProduct
  } = useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ProductModalMode>('create');
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();

  const openCreateModal = () => {
    setSelectedProduct(undefined);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const openViewModal = (product: Product) => {
    setSelectedProduct(product);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(undefined);
  };

  const handleSubmit = (data: ProductFormData) => {
    if (modalMode === 'create') {
      createProduct(data);
    } else if (modalMode === 'edit' && selectedProduct) {
      updateProduct(selectedProduct.id, data);
    }
    closeModal();
  };

  const handleDeleteProduct = (product: Product) => {
    deleteProduct(product.id);
  };

  const getModalTitle = () => {
    switch (modalMode) {
      case 'create':
        return 'Nuevo Producto';
      case 'edit':
        return 'Editar Producto';
      case 'view':
        return `${selectedProduct?.codigo} - ${selectedProduct?.descripcion}`;
      default:
        return 'Producto';
    }
  };

  const getProductStats = () => {
    const total = allProducts.length;
    const showing = products.length;
    const totalValue = allProducts.reduce((sum, product) => sum + (product.precio * product.stock), 0);
    
    if (searchTerm) {
      return `Mostrando ${showing} de ${total} productos`;
    }
    return `${total} producto${total !== 1 ? 's' : ''} • Valor total: €${totalValue.toFixed(2)}`;
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles['title-section']}>
          <div className={styles['title-group']}>
            <Package size={28} className={styles['title-icon']} />
            <h1 className={styles.title}>Gestión de Productos</h1>
            <span className={styles['title-badge']}>
              {allProducts.length}
            </span>
          </div>
          <Button onClick={openCreateModal}>
            <Plus size={18} />
            Nuevo Producto
          </Button>
        </div>
        
        <div className={styles['search-section']}>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar por código, descripción, marca o precio..."
          />
          <span className={styles.stats}>
            {getProductStats()}
          </span>
        </div>
      </header>

      <ProductList
        products={products}
        onEditProduct={openEditModal}
        onDeleteProduct={handleDeleteProduct}
        onViewProduct={openViewModal}
      />

      <button
        className={styles.fab}
        onClick={openCreateModal}
        aria-label="Agregar nuevo producto"
      >
        <Plus size={24} />
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={getModalTitle()}
        footer={modalMode === 'view' ? (
          <Button onClick={closeModal}>Cerrar</Button>
        ) : undefined}
      >
        <ProductForm
          product={selectedProduct}
          mode={modalMode}
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      </Modal>
    </>
  );
};
