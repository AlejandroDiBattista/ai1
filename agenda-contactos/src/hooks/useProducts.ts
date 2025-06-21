import { useState, useEffect } from 'react';
import type { Product, ProductFormData } from '../types/product';

const STORAGE_KEY = 'products-inventory';

// Datos de ejemplo para empezar
const initialProducts: Product[] = [
  {
    id: '1',
    codigo: 'LAP001',
    descripcion: 'Laptop HP Pavilion 15"',
    marca: 'HP',
    precio: 899.99,
    costo: 650.00,
    stock: 15,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '2',
    codigo: 'MOU002',
    descripcion: 'Mouse Inalámbrico Logitech MX Master 3',
    marca: 'Logitech',
    precio: 99.99,
    costo: 65.00,
    stock: 8,
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-05')
  },
  {
    id: '3',
    codigo: 'TEC003',
    descripcion: 'Teclado Mecánico RGB Corsair K70',
    marca: 'Corsair',
    precio: 159.99,
    costo: 110.00,
    stock: 12,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  }
];

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Cargar productos del localStorage al montar el componente
  useEffect(() => {
    const savedProducts = localStorage.getItem(STORAGE_KEY);
    if (savedProducts) {
      try {
        const parsedProducts = JSON.parse(savedProducts).map((product: any) => ({
          ...product,
          createdAt: new Date(product.createdAt),
          updatedAt: new Date(product.updatedAt)
        }));
        setProducts(parsedProducts);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        setProducts(initialProducts);
      }
    } else {
      setProducts(initialProducts);
    }
  }, []);

  // Guardar productos en localStorage cuando cambien
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }
  }, [products]);

  // Filtrar productos basado en el término de búsqueda
  const filteredProducts = products.filter(product => {
    const searchLower = searchTerm.toLowerCase();
    return (
      product.codigo.toLowerCase().includes(searchLower) ||
      product.descripcion.toLowerCase().includes(searchLower) ||
      product.marca.toLowerCase().includes(searchLower) ||
      product.precio.toString().includes(searchTerm) ||
      product.stock.toString().includes(searchTerm)
    );
  });

  const createProduct = (productData: ProductFormData): Product => {
    const newProduct: Product = {
      id: Date.now().toString(),
      codigo: productData.codigo,
      descripcion: productData.descripcion,
      marca: productData.marca,
      precio: parseFloat(productData.precio),
      costo: parseFloat(productData.costo),
      stock: parseInt(productData.stock),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id: string, productData: ProductFormData): Product | null => {
    let updatedProduct: Product | null = null;
    
    setProducts(prev => prev.map(product => {
      if (product.id === id) {
        updatedProduct = {
          ...product,
          codigo: productData.codigo,
          descripcion: productData.descripcion,
          marca: productData.marca,
          precio: parseFloat(productData.precio),
          costo: parseFloat(productData.costo),
          stock: parseInt(productData.stock),
          updatedAt: new Date()
        };
        return updatedProduct;
      }
      return product;
    }));

    return updatedProduct;
  };

  const deleteProduct = (id: string): boolean => {
    const productExists = products.some(product => product.id === id);
    if (productExists) {
      setProducts(prev => prev.filter(product => product.id !== id));
      return true;
    }
    return false;
  };

  const getProductById = (id: string): Product | undefined => {
    return products.find(product => product.id === id);
  };

  return {
    products: filteredProducts,
    allProducts: products,
    searchTerm,
    setSearchTerm,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById
  };
};
