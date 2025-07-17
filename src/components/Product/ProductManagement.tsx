import { useState } from 'react';
import { Package, Plus } from 'lucide-react';
import { ProductList } from './ProductList';
import { ProductForm } from './ProductForm';
import { Modal } from '../ui/Modal';
import { ManagementHeader } from '../ui/ManagementHeader';
import { useProducts } from '../../hooks/Product/useProducts';
import type { Product, ProductModalMode, ProductFormData } from '../../types/product';
import styles from '../../App.module.css';

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
      <ManagementHeader
        title="Gestión de Productos"
        icon={Package}
        itemCount={allProducts.length}
        onAddNew={openCreateModal}
        addButtonLabel="Nuevo Producto"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Buscar por código, descripción, marca o precio..."
        statsText={getProductStats()}
      />

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
      >
        <ProductForm
          product={selectedProduct}
          mode={modalMode}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          onEdit={modalMode === 'view' && selectedProduct ? () => {
            closeModal();
            openEditModal(selectedProduct);
          } : undefined}
          onDelete={modalMode === 'view' && selectedProduct ? () => {
            closeModal();
            handleDeleteProduct(selectedProduct);
          } : undefined}
        />
      </Modal>
    </>
  );
};
